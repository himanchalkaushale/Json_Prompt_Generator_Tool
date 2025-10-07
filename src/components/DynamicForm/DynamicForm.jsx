import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTemplateStore } from '../../store/templateStore'
import FormField from './FormField'

const DynamicForm = () => {
  const { selectedTemplate, formData, updateFormData } = useTemplateStore()

  // Create dynamic Zod schema based on template fields
  const createSchema = (fields) => {
    const schemaObject = {}
    
    fields.forEach(field => {
      let fieldSchema
      
      switch (field.type) {
        case 'text':
        case 'textarea':
          fieldSchema = z.string()
          break
        case 'select':
          fieldSchema = z.string()
          break
        case 'number':
          fieldSchema = z.number()
          break
        case 'boolean':
          fieldSchema = z.boolean()
          break
        case 'array':
          fieldSchema = z.array(z.string())
          break
        default:
          fieldSchema = z.string()
      }
      
      if (field.required) {
        fieldSchema = fieldSchema.min(1, `${field.label} is required`)
      } else {
        fieldSchema = fieldSchema.optional()
      }
      
      schemaObject[field.key] = fieldSchema
    })
    
    return z.object(schemaObject)
  }

  const schema = selectedTemplate ? createSchema(selectedTemplate.fields) : z.object({})

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: formData,
    mode: 'onChange'
  })

  // Watch all form values and update store
  const watchedValues = watch()
  React.useEffect(() => {
    Object.keys(watchedValues).forEach(key => {
      if (watchedValues[key] !== formData[key]) {
        updateFormData(key, watchedValues[key])
      }
    })
  }, [watchedValues, formData, updateFormData])

  if (!selectedTemplate) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        Please select a template to configure the prompt.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
          {selectedTemplate.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {selectedTemplate.description}
        </p>
      </div>

      <form className="space-y-4">
        {selectedTemplate.fields.map(field => (
          <FormField
            key={field.key}
            field={field}
            register={register}
            setValue={setValue}
            error={errors[field.key]}
            value={formData[field.key] || field.defaultValue || ''}
          />
        ))}
      </form>

      {/* Load Example Button */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
        <button
          type="button"
          onClick={() => {
            // Load example data
            Object.keys(selectedTemplate.example).forEach(key => {
              setValue(key, selectedTemplate.example[key])
              updateFormData(key, selectedTemplate.example[key])
            })
          }}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
        >
          Load Example
        </button>
      </div>
    </div>
  )
}

export default DynamicForm
