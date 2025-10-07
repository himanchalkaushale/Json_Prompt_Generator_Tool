import React from 'react'
import { FileText, ArrowRight, CheckCircle, Sparkles, Rocket, Wand2, Image as ImageIcon, Code2, BarChart3 } from 'lucide-react'
import TemplateSelector from '../TemplateSelector/TemplateSelector'
import DynamicForm from '../DynamicForm/DynamicForm'
import { useTemplateStore } from '../../store/templateStore'
import templates from '../../data/templates'
import ThemeToggle from '../Layout/ThemeToggle'

const InputPage = () => {
  const { selectedTemplate, formData, goToOutputPage, setSelectedTemplate, updateFormData } = useTemplateStore()

  const handleGeneratePrompt = () => {
    if (selectedTemplate && Object.keys(formData).length > 0) {
      goToOutputPage()
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
    <div className="h-screen bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Sparkles className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                JSON Prompt Generator
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Step 1: Create Your AI Prompt
              </p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {selectedTemplate && (
            <div className="flex items-center gap-4">
              <div className="w-48">
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
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isFormValid()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                {isFormValid() ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <FileText className="w-5 h-5" />
                )}
                Generate Prompt
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
          </div>
        </div>
      </header>

      {/* Main Content - Horizontal Layout */}
      <div className="h-[calc(100vh-80px)] flex">
        {/* Left Panel - Template Selection */}
        <div className="w-1/2 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Choose Template
              </h2>
            </div>
          </div>
          
          <div className="flex-1 p-6 overflow-hidden">
            <TemplateSelector />
          </div>
        </div>

        {/* Right Panel - Form Configuration */}
        <div className="w-1/2 bg-gray-50 dark:bg-gray-900 flex flex-col">
          {selectedTemplate ? (
            <>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Configure Your Prompt
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {selectedTemplate.name} • {selectedTemplate.category}
                </p>
              </div>
              
              <div className="flex-1 p-6 overflow-auto">
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

                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 text-sm font-medium">
                    <Rocket className="w-4 h-4" />
                    Quick Start
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-3">
                    Pick a starter to auto-fill an example
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    We’ll load a great sample for you. You can tweak anything after.
                  </p>
                </div>

                {/* Quick Start Cards */}
                <div className="grid grid-cols-2 gap-4">
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
                        className="group relative text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out overflow-hidden hover:-translate-y-0.5 hover:bg-white/70 dark:hover:bg-gray-800/70 hover:border-white/80 dark:hover:border-white/40 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white/40 dark:focus:ring-white/20 active:translate-y-0"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 transition-transform duration-200 group-hover:scale-105 group-hover:-translate-y-0.5">
                            {q.icon}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-gray-800 dark:text-white truncate">{q.label}</div>
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
          )}
        </div>
      </div>
    </div>
  )
}

export default InputPage
