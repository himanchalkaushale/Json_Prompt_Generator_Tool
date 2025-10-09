import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Search, Filter, Star } from 'lucide-react'
import { useTemplateStore } from '../../store/templateStore'
import templates, { TEMPLATE_CATEGORIES } from '../../data/templates'

const TemplateSelector = () => {
  const { selectedTemplate, setSelectedTemplate } = useTemplateStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredTemplates, setFilteredTemplates] = useState(templates)
  const [isMobile, setIsMobile] = useState(false)
  const [page, setPage] = useState(1)
  const itemsPerPage = 4

  useEffect(() => {
    let filtered = templates

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(template => template.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredTemplates(filtered)
    // Reset to first page when filters change
    setPage(1)
  }, [searchTerm, selectedCategory])

  // Detect mobile (Tailwind lg breakpoint: 1024px)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023.98px)')
    const handler = (e) => setIsMobile(e.matches)
    handler(mq)
    mq.addEventListener?.('change', handler)
    return () => mq.removeEventListener?.('change', handler)
  }, [])

  const categories = ['All', ...Object.values(TEMPLATE_CATEGORIES)]

  // Compute visible templates (mobile paginated, desktop full)
  const totalPages = Math.max(1, Math.ceil(filteredTemplates.length / itemsPerPage))
  const startIndex = (page - 1) * itemsPerPage
  const visibleTemplates = isMobile
    ? filteredTemplates.slice(startIndex, startIndex + itemsPerPage)
    : filteredTemplates

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div className="relative w-full sm:w-auto">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto pl-10 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white appearance-none bg-white"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Template Grid */}
      <div className="flex-1 min-h-0 grid grid-cols-1 gap-2 sm:gap-3 overflow-y-auto">
        {visibleTemplates.map(template => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={selectedTemplate?.id === template.id}
            onSelect={() => setSelectedTemplate(template)}
          />
        ))}
      </div>

      {/* Mobile Pagination */}
      {isMobile && totalPages > 1 && (
        <div className="sm:hidden flex items-center justify-center gap-2">
          {/* Prev */}
          <button
            type="button"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="px-2 py-1 text-xs rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50"
            disabled={page === 1}
          >
            Prev
          </button>
          {/* Pages */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pn => (
              <button
                key={pn}
                type="button"
                onClick={() => setPage(pn)}
                className={`w-7 h-7 rounded-md text-xs border ${
                  pn === page
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                {pn}
              </button>
            ))}
          </div>
          {/* Next */}
          <button
            type="button"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            className="px-2 py-1 text-xs rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50"
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {filteredTemplates.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No templates found matching your criteria.
        </div>
      )}
    </div>
  )
}

const TemplateCard = ({ template, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`p-2 sm:p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-800 dark:text-white text-xs sm:text-sm truncate">
              {template.name}
            </h3>
            {isSelected && (
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 fill-current flex-shrink-0" />
            )}
          </div>
          <span className="inline-block px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full mb-1 sm:mb-2">
            {template.category}
          </span>
          <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-1">
            {template.description}
          </p>
          <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
            {template.fields.length} fields
          </div>
        </div>
      </div>
    </div>
  )
}

TemplateCard.propTypes = {
  template: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default TemplateSelector
