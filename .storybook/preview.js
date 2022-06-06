import React from 'react'
import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { AppContextProvider } from '../src/app/contexts/App.context'
import { UserContextProvider } from '../src/app/contexts/User.context'
import { MainContextProvider } from '../src/app/contexts/Main.context'
import { MemoryRouter as Router } from 'react-router-dom'
import '../src/app/styles/tailwind.css';


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const withGlobal = (cb) => {
  return (
    <Router>
      <AppContextProvider>
        <UserContextProvider>
          <MainContextProvider>
            {cb()}
          </MainContextProvider>
        </UserContextProvider>
      </AppContextProvider>
    </Router>
  )
}

addParameters(parameters)
addDecorator(withGlobal)
addDecorator(withKnobs)