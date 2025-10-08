import React from 'react'
import { FileText, ArrowRight, ArrowLeft, CheckCircle, Sparkles, Rocket, Wand2, Image as ImageIcon, Code2, BarChart3 } from 'lucide-react'
import TemplateSelector from '../TemplateSelector/TemplateSelector'
import DynamicForm from '../DynamicForm/DynamicForm'
import { useTemplateStore } from '../../store/templateStore'
import templates from '../../data/templates'
import ThemeToggle from '../Layout/ThemeToggle'

const InputPage = () => {
  const { 
    selectedTemplate, 
    formData, 
    goToOutputPage, 
    setSelectedTemplate, 
    updateFormData,
    mobileStep,
    nextMobileStep,
    prevMobileStep,
    setMobileStep
  } = useTemplateStore()

  const handleGeneratePrompt = () => {
    if (selectedTemplate && Object.keys(formData).length > 0) {
      goToOutputPage()
    }
  }
  
  const handleMobileNext = () => {
    if (mobileStep === 1 && selectedTemplate) {
      nextMobileStep() // Go to form filling
    } else if (mobileStep === 2 && isFormValid()) {
      nextMobileStep() // Go to review
    } else if (mobileStep === 3) {
      goToOutputPage() // Go to output page
      setMobileStep(4)
    }
  }
  
  const handleMobileBack = () => {
    if (mobileStep > 1) {
      prevMobileStep()
    }
  }

  const isFormValid = () => {
    if (!selectedTemplate) return false
    
    // Check if required fields are filled
    const requiredFields = selectedTemplate.fields.filter(field => field.required)
    return requiredFields.every(field => {
      const value = formData[field.key]
      return value !== undefined && value !== '' && value !== null
    })
  }

  const getProgress = () => {
    if (!selectedTemplate) return 0
    
    const totalFields = selectedTemplate.fields.length
    const filledFields = selectedTemplate.fields.filter(field => {
      const value = formData[field.key]
      return value !== undefined && value !== '' && value !== null
    }).length
    
    return Math.round((filledFields / totalFields) * 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Mobile Header with Steps */}
      <header className="lg:hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-3 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Sparkles className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" />
            <div>
              <h1 className="text-lg font-bold text-gray-800 dark:text-white">
                JSON Prompt Generator
              </h1>
            </div>
          </div>
          <ThemeToggle />
        </div>
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  mobileStep >= step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  {step}
                </div>
                <span className={`text-xs mt-1 ${
                  mobileStep >= step 
                    ? 'text-blue-600 dark:text-blue-400 font-medium' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {step === 1 ? 'Select' : step === 2 ? 'Configure' : 'Review'}
                </span>
              </div>
              {step < 3 && (
                <div className={`h-0.5 flex-1 mx-2 ${
                  mobileStep > step 
                    ? 'bg-blue-600' 
                    : 'bg-gray-200 dark:bg-gray-700'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:block bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-2 sm:mr-3 flex-shrink-0" />
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">
                JSON Prompt Generator
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                Step 1: Create Your AI Prompt
              </p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <ThemeToggle />
            {selectedTemplate && (
            <div className="flex items-center gap-2 sm:gap-4 flex-1 sm:flex-initial">
              <div className="flex-1 sm:w-48">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Progress
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {getProgress()}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgress()}%` }}
                  ></div>
                </div>
              </div>
              
              <button
                onClick={handleGeneratePrompt}
                disabled={!isFormValid()}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base whitespace-nowrap ${
                  isFormValid()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                {isFormValid() ? (
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
                <span className="hidden sm:inline">Generate Prompt</span>
                <span className="sm:hidden">Generate</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          )}
          </div>
        </div>
      </header>

      {/* Mobile Content - Wizard Steps */}
      <div className="lg:hidden flex-1 min-h-0 flex flex-col overflow-hidden">
        {/* Step 1: Template Selection */}
        {mobileStep === 1 && (
          <div className="flex-1 min-h-0 flex flex-col bg-white dark:bg-gray-800 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Choose a Template
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Select a template to get started
              </p>
            </div>
            <div className="flex-1 min-h-0 p-4 overflow-hidden">
              <div className="h-full min-h-0 overflow-y-auto">
                <TemplateSelector />
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shrink-0 sticky bottom-0">
              <button
                onClick={handleMobileNext}
                disabled={!selectedTemplate}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedTemplate
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                Next: Configure
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Form Filling */}
        {mobileStep === 2 && selectedTemplate && (
          <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Configure Your Prompt
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {selectedTemplate.name}
              </p>
            </div>
            <div className="flex-1 min-h-0 p-4 overflow-hidden">
              <DynamicForm />
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 space-y-2">
              {!isFormValid() && (
                <p className="text-sm text-yellow-600 dark:text-yellow-400 text-center">
                  Please fill all required fields (*)
                </p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={handleMobileBack}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
                <button
                  onClick={handleMobileNext}
                  disabled={!isFormValid()}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    isFormValid()
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Next: Review
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {mobileStep === 3 && selectedTemplate && (
          <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Review & Generate
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Check your configuration before generating
              </p>
            </div>
            <div className="flex-1 min-h-0 p-4 overflow-hidden">
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Template
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {selectedTemplate.name}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    {selectedTemplate.category}
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
                    Configured Fields
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(formData).filter(([_, value]) => value !== '' && value !== null && value !== undefined).map(([key, value]) => {
                      const field = selectedTemplate.fields.find(f => f.key === key)
                      return (
                        <div key={key} className="text-sm">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {field?.label || key}:
                          </span>
                          <span className="text-gray-600 dark:text-gray-400 ml-2">
                            {Array.isArray(value) ? value.join(', ') : String(value).substring(0, 50)}
                            {String(value).length > 50 ? '...' : ''}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex gap-2">
                <button
                  onClick={handleMobileBack}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
                <button
                  onClick={handleMobileNext}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium bg-green-600 hover:bg-green-700 text-white transition-all"
                >
                  <CheckCircle className="w-5 h-5" />
                  Generate
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Content - Side by Side Layout */}
      <div className="hidden lg:flex flex-1 flex-col lg:flex-row overflow-hidden">
        {/* Left Panel - Template Selection */}
        <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col max-h-[50vh] lg:max-h-none">
          <div className="p-3 sm:p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2 sm:mr-3" />
              <h2 className="text-base sm:text-xl font-semibold text-gray-800 dark:text-white">
                Choose Template
              </h2>
            </div>
          </div>
          
          <div className="flex-1 min-h-0 p-3 sm:p-6 overflow-hidden">
            <div className="h-full min-h-0 overflow-y-auto">
              <TemplateSelector />
            </div>
          </div>
        </div>

        {/* Right Panel - Form Configuration */}
        <div className="w-full lg:w-1/2 bg-gray-50 dark:bg-gray-900 flex flex-col flex-1 lg:flex-initial overflow-auto">
          {selectedTemplate ? (
            <>
              <div className="p-3 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <h2 className="text-base sm:text-xl font-semibold text-gray-800 dark:text-white">
                  Configure Your Prompt
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {selectedTemplate.name} • {selectedTemplate.category}
                </p>
              </div>
              
              <div className="flex-1 p-3 sm:p-6 overflow-auto">
                <DynamicForm />
              </div>
              
              {!isFormValid() && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-t border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center">
                    Please fill in all required fields (marked with *) to generate your prompt
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="relative max-w-2xl w-full">
                {/* Decorative gradient blob */}
                <div className="absolute inset-0 -z-10">
                  <div className="w-72 h-72 bg-gradient-to-tr from-blue-400/30 to-indigo-400/30 rounded-full blur-3xl absolute -top-10 -left-10 animate-pulse" />
                  <div className="w-56 h-56 bg-gradient-to-tr from-violet-400/20 to-fuchsia-400/20 rounded-full blur-3xl absolute -bottom-10 -right-10 animate-pulse" />
                </div>

                {/* Mobile message */}
                <div className="lg:hidden text-center px-4">
                  <div className="text-4xl mb-4">👈</div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    Select a Template
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Choose a template from the list above to get started
                  </p>
                </div>

                {/* Desktop Quick Start */}
                <div className="hidden lg:block">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 text-sm font-medium">
                      <Rocket className="w-4 h-4" />
                      Quick Start
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-3">
                      Pick a starter to auto-fill an example
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      We'll load a great sample for you. You can tweak anything after.
                    </p>
                  </div>

                  {/* Quick Start Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { id: 'ai-image-generation', icon: <ImageIcon className="w-5 h-5" />, label: 'AI Image Prompt' },
                    { id: 'code-review', icon: <Code2 className="w-5 h-5" />, label: 'Code Review' },
                    { id: 'seo-optimization', icon: <BarChart3 className="w-5 h-5" />, label: 'SEO Brief' },
                    { id: 'content-repurposing', icon: <Wand2 className="w-5 h-5" />, label: 'Repurpose Content' },
                  ].map((q) => {
                    const tpl = templates.find(t => t.id === q.id)
                    if (!tpl) return null
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => {
                          setSelectedTemplate(tpl)
                          // Prefill example data
                          if (tpl.example) {
                            Object.entries(tpl.example).forEach(([k, v]) => updateFormData(k, v))
                          }
                        }}
                        className="group relative text-left p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out overflow-hidden hover:-translate-y-0.5 hover:bg-white/70 dark:hover:bg-gray-800/70 hover:border-white/80 dark:hover:border-white/40 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white/40 dark:focus:ring-white/20 active:translate-y-0"
                      >
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 transition-transform duration-200 group-hover:scale-105 group-hover:-translate-y-0.5 flex-shrink-0">
                            {q.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-sm sm:text-base text-gray-800 dark:text-white truncate">{q.label}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                              {tpl.description}
                            </div>
                            <div className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
                              {tpl.fields.length} fields • {tpl.category}
                            </div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                  </div>

                  {/* Tip */}
                  <div className="mt-5 text-center text-xs text-gray-600 dark:text-gray-400">
                    You can also search and pick any template from the left panel.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InputPage
