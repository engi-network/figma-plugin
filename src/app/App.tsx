import './styles/global.css'

import { useEffect } from 'react'

import Button from '~/components/global/Button/Button'

function App() {
  useEffect(() => {
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage
      if (type === 'create-rectangles') {
        console.info(`Figma Says: ${message}`)
      }
    }
  }, [])

  return (
    <div className="bg-gray-50" css={{ background: 'gray' }}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Ready to dive in?</span>
          <span className="block text-indigo-600">Hello world</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get started2
            </a>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Learn more
            </a>
          </div>
          <Button label="Cool" />
        </div>
      </div>
    </div>
  )
}

export default App
