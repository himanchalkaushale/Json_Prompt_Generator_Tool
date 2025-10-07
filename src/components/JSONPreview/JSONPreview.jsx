import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow, prism } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check, Download, Minimize2, Maximize2 } from 'lucide-react'

const JSONPreview = ({ data }) => {
  const [copied, setCopied] = useState(false)
  const [isMinified, setIsMinified] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

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

  const cleanedData = cleanData(data || {})
  const jsonString = isMinified 
    ? JSON.stringify(cleanedData)
    : JSON.stringify(cleanedData, null, 2)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'prompt.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinified(!isMinified)}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
          >
            {isMinified ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            {isMinified ? 'Format' : 'Minify'}
          </button>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
          >
            {isDarkMode ? 'Light' : 'Dark'} Theme
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 hover:bg-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      {/* JSON Display */}
      <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
        {Object.keys(cleanedData).length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            <div className="text-4xl mb-4">📝</div>
            <p className="text-lg font-medium mb-2">No data to preview</p>
            <p className="text-sm">Fill out the form fields to see the JSON output here.</p>
          </div>
        ) : (
          <div className="relative">
            <SyntaxHighlighter
              language="json"
              style={isDarkMode ? tomorrow : prism}
              customStyle={{
                margin: 0,
                borderRadius: 0,
                fontSize: '14px',
                lineHeight: '1.5'
              }}
              showLineNumbers={!isMinified}
              wrapLines={true}
              wrapLongLines={true}
            >
              {jsonString}
            </SyntaxHighlighter>
          </div>
        )}
      </div>

      {/* Stats */}
      {Object.keys(cleanedData).length > 0 && (
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>
            {Object.keys(cleanedData).length} field{Object.keys(cleanedData).length !== 1 ? 's' : ''}
          </span>
          <span>
            {jsonString.length} characters
          </span>
        </div>
      )}
    </div>
  )
}

JSONPreview.propTypes = {
  data: PropTypes.object
}

JSONPreview.defaultProps = {
  data: {}
}

export default JSONPreview
