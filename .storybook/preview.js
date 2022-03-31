import React from 'react'
import "../src/app/styles/tailwind.css";
import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { AppContextProvider } from '../src/app/contexts/App.context'


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
  return <>
    <AppContextProvider>
      {cb()}
    </AppContextProvider>
  </>
}

addParameters(parameters)
addDecorator(withGlobal)
addDecorator(withKnobs)