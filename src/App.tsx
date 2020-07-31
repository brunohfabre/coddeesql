import React from 'react'
import { render } from 'react-dom'
import { GlobalStyle } from './styles/GlobalStyle'

import Greetings from './components/Greetings'
import AppProvider from './hooks'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const App = () => {
  return (
    <AppProvider>
      <GlobalStyle />
      <Greetings />
    </AppProvider>
  )
}

render(<App />, mainElement)
