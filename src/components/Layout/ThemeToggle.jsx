import React from 'react'
import { Sun, Moon } from 'lucide-react'

const getSystemPrefersDark = () => (
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
)

const getDomTheme = () => {
  if (typeof document === 'undefined') return null
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

const applyTheme = (theme) => {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

const ThemeToggle = () => {
  const [theme, setTheme] = React.useState('light')

  // Initialize from DOM (set by preload script) or localStorage on mount
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'light' || saved === 'dark') {
        setTheme(saved)
        applyTheme(saved)
        return
      }
      const domTheme = getDomTheme()
      if (domTheme) {
        setTheme(domTheme)
        return
      }
      const sys = getSystemPrefersDark() ? 'dark' : 'light'
      setTheme(sys)
      applyTheme(sys)
    } catch {
      const fallback = 'light'
      setTheme(fallback)
      applyTheme(fallback)
    }
  }, [])

  React.useEffect(() => {
    applyTheme(theme)
    try { localStorage.setItem('theme', theme) } catch {}
  }, [theme])

  // Keep in sync across tabs
  React.useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
        setTheme(e.newValue)
        applyTheme(e.newValue)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 hover:bg-white hover:shadow transition"
      aria-label="Toggle theme"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
      <span className="text-sm hidden sm:inline">
        {theme === 'dark' ? 'Light' : 'Dark'}
      </span>
    </button>
  )
}

export default ThemeToggle
