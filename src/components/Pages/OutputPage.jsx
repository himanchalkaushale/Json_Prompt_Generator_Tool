import React from 'react'
import { ArrowLeft, Code, RefreshCw, Sparkles, CheckCircle } from 'lucide-react'
import JSONPreview from '../JSONPreview/JSONPreview'
import { useTemplateStore } from '../../store/templateStore'
import ThemeToggle from '../Layout/ThemeToggle'

const OutputPage = () => {
  const { selectedTemplate, formData, goToInputPage, getFormattedJSON, resetFormData, setMobileStep, resetMobileFlow } = useTemplateStore()

  const handleBackToInput = () => {
    setMobileStep(3) // Go back to review step on mobile
    goToInputPage()
  }

  const handleStartOver = () => {
    resetMobileFlow()
    resetFormData()
    goToInputPage()
  }

  const jsonData = getFormattedJSON()

  if (!selectedTemplate) {
    return (
      <div className="h-screen bg-gradient-to-r from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            No Template Selected
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Please go back and select a template first.
          </p>
          <button
            onClick={handleBackToInput}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Input
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mr-2 sm:mr-3 flex-shrink-0" />
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">
                Your JSON Prompt
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                Step 2: Copy and use with your AI tools
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto flex-wrap">
            <ThemeToggle />
            {/* Template Info */}
            <div className="text-left sm:text-right flex-1 sm:flex-initial">
              <div className="text-xs sm:text-sm font-medium text-gray-800 dark:text-white truncate">
                {selectedTemplate.name}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">
                {Object.keys(jsonData).length} fields • {selectedTemplate.category}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleBackToInput}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-xs sm:text-sm"
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                Edit
              </button>
              <button
                onClick={handleStartOver}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs sm:text-sm"
              >
                <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
                New
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Responsive Layout */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel - JSON Output */}
        <div className="w-full lg:w-2/3 bg-white dark:bg-gray-800 flex flex-col max-h-[60vh] lg:max-h-none">
          <div className="p-3 sm:p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Code className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mr-2 sm:mr-3" />
                <h2 className="text-base sm:text-xl font-semibold text-gray-800 dark:text-white">
                  Generated JSON
                </h2>
              </div>
              
              {/* Success Indicator */}
              {Object.keys(jsonData).length > 0 && (
                <div className="flex items-center gap-1 sm:gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-medium hidden sm:inline">Ready to use</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-1 min-h-0 p-3 sm:p-6 overflow-auto">
            <JSONPreview data={jsonData} />
          </div>
        </div>

        {/* Right Panel - Instructions and Info */}
        <div className="w-full lg:w-1/3 bg-gray-50 dark:bg-gray-900 flex flex-col border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 flex-1 lg:flex-initial overflow-auto">
          <div className="p-3 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-2">
              How to Use
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              Follow these steps to use your generated prompt
            </p>
          </div>
          
          <div className="flex-1 p-3 sm:p-6 overflow-auto">
            {/* Usage Instructions */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white text-sm">Copy JSON</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                    Use the "Copy" button in the JSON panel
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white text-sm">Paste to AI Tool</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                    ChatGPT, Claude, Gemini, or any AI assistant
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white text-sm">Get Results</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                    Receive structured, high-quality responses
                  </p>
                </div>
              </div>
            </div>

            {/* Template Details */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 text-sm mb-2">
                Template Details
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-blue-700 dark:text-blue-300">Category:</span>
                  <span className="text-blue-800 dark:text-blue-200 font-medium">
                    {selectedTemplate.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700 dark:text-blue-300">Fields:</span>
                  <span className="text-blue-800 dark:text-blue-200 font-medium">
                    {Object.keys(jsonData).length} configured
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700 dark:text-blue-300">Size:</span>
                  <span className="text-blue-800 dark:text-blue-200 font-medium">
                    {JSON.stringify(jsonData).length} chars
                  </span>
                </div>
              </div>
            </div>

            {/* Success Message */}
            {Object.keys(jsonData).length > 0 && (
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="font-medium text-green-800 dark:text-green-200 text-sm">
                    Prompt Generated!
                  </span>
                </div>
                <p className="text-xs text-green-700 dark:text-green-300">
                  Your structured prompt is ready to use with any AI tool.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OutputPage
