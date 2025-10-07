import React from 'react'
import InputPage from './components/Pages/InputPage'
import OutputPage from './components/Pages/OutputPage'
import { useTemplateStore } from './store/templateStore'

function App() {
  const { currentPage } = useTemplateStore()

  return (
    <>
      {currentPage === 'input' ? <InputPage /> : <OutputPage />}
    </>
  )
}

export default App
