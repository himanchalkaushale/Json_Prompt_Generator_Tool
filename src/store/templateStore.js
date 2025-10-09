import { create } from 'zustand'

export const useTemplateStore = create((set, get) => ({
  selectedTemplate: null,
  formData: {},
  templates: [],
  currentPage: 'input', // 'input' or 'output'
  mobileStep: 1, // 1: template selection, 2: form filling, 3: review, 4: output
  
  setSelectedTemplate: (template) => set({ 
    selectedTemplate: template,
    formData: {} // Reset form data when template changes
  }),
  
  setMobileStep: (step) => set({ mobileStep: step }),
  
  nextMobileStep: () => set((state) => ({ 
    mobileStep: Math.min(state.mobileStep + 1, 4) 
  })),
  
  prevMobileStep: () => set((state) => ({ 
    mobileStep: Math.max(state.mobileStep - 1, 1) 
  })),
  
  resetMobileFlow: () => set({ 
    mobileStep: 1,
    selectedTemplate: null,
    formData: {}
  }),
  
  updateFormData: (fieldKey, value) => set((state) => {
    const prev = state.formData[fieldKey]
    // Primitive equality fast path
    if (prev === value) return state
    // Simple structural equality for arrays/objects
    if (
      (typeof value === 'object' && value !== null) &&
      (typeof prev === 'object' && prev !== null) &&
      JSON.stringify(prev) === JSON.stringify(value)
    ) {
      return state
    }
    return {
      formData: {
        ...state.formData,
        [fieldKey]: value
      }
    }
  }),
  
  resetFormData: () => set({ formData: {} }),
  
  setTemplates: (templates) => set({ templates }),
  
  setCurrentPage: (page) => set({ currentPage: page }),
  
  goToOutputPage: () => set({ currentPage: 'output' }),
  
  goToInputPage: () => set({ currentPage: 'input' }),
  
  getFormattedJSON: () => {
    const { formData, selectedTemplate } = get()
    if (!selectedTemplate) return {}
    
    // Clean up the data by removing empty values
    const cleanData = (obj) => {
      const cleaned = {}
      Object.keys(obj).forEach(key => {
        const value = obj[key]
        if (value !== '' && value !== null && value !== undefined) {
          if (Array.isArray(value)) {
            const filteredArray = value.filter(item => item !== '' && item !== null && item !== undefined)
            if (filteredArray.length > 0) {
              cleaned[key] = filteredArray
            }
          } else {
            cleaned[key] = value
          }
        }
      })
      return cleaned
    }
    
    // Merge template defaults with form data
    const result = cleanData(formData)
    
    // Add required fields with default values if not present
    selectedTemplate.fields.forEach(field => {
      if (field.required && !(field.key in result)) {
        result[field.key] = field.defaultValue || ''
      }
    })
    
    return result
  }
}))
