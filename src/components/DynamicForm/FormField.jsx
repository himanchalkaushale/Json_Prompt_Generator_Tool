import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Plus, X, HelpCircle } from 'lucide-react'

const FormField = ({ field, register, setValue, error, value }) => {
  const [arrayItems, setArrayItems] = useState(
    Array.isArray(value) ? value : []
  )
  const [showTooltip, setShowTooltip] = useState(false)

  const handleArrayAdd = () => {
    const newItems = [...arrayItems, '']
    setArrayItems(newItems)
    setValue(field.key, newItems)
  }

  const handleArrayRemove = (index) => {
    const newItems = arrayItems.filter((_, i) => i !== index)
    setArrayItems(newItems)
    setValue(field.key, newItems)
  }

  const handleArrayItemChange = (index, newValue) => {
    const newItems = [...arrayItems]
    newItems[index] = newValue
    setArrayItems(newItems)
    setValue(field.key, newItems)
  }

  const renderField = () => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            {...register(field.key)}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        )

      case 'textarea':
        return (
          <textarea
            {...register(field.key)}
            placeholder={field.placeholder}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-vertical"
          />
        )

      case 'select':
        return (
          <select
            {...register(field.key)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select an option...</option>
            {field.options?.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )

      case 'number':
        return (
          <input
            type="number"
            {...register(field.key, { valueAsNumber: true })}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        )

      case 'boolean':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register(field.key)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {field.description || 'Enable this option'}
            </label>
          </div>
        )

      case 'array':
        return (
          <div className="space-y-3">
            {arrayItems.map((item, index) => (
              <div key={index} className="flex gap-2">
                {field.options ? (
                  <select
                    value={item}
                    onChange={(e) => handleArrayItemChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Select an option...</option>
                    {field.options.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayItemChange(index, e.target.value)}
                    placeholder={field.placeholder}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                )}
                <button
                  type="button"
                  onClick={() => handleArrayRemove(index)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleArrayAdd}
              className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </button>
          </div>
        )

      default:
        return (
          <input
            type="text"
            {...register(field.key)}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        )
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {field.description && (
          <div className="relative">
            <button
              type="button"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            {showTooltip && (
              <div className="absolute z-10 w-64 p-2 mt-1 text-sm text-white bg-gray-800 rounded-lg shadow-lg -translate-x-1/2 left-1/2">
                {field.description}
                <div className="absolute w-2 h-2 bg-gray-800 rotate-45 -top-1 left-1/2 transform -translate-x-1/2"></div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {renderField()}
      
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {error.message}
        </p>
      )}
    </div>
  )
}

FormField.propTypes = {
  field: PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    required: PropTypes.bool,
    description: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.array,
    defaultValue: PropTypes.any
  }).isRequired,
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  error: PropTypes.object,
  value: PropTypes.any
}

export default FormField
