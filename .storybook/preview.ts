import type { Preview } from '@storybook/nextjs'
import React from 'react'
import { StorybookProvider } from '../src/providers/StorybookProvider'
import '../src/styles/base.css'
import '../src/styles/country-card.css'
import '../src/styles/detailed-layout.css'
import '../src/styles/main-layout.css'
import '../src/styles/search.css'
import '../src/styles/page-layout.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => React.createElement(StorybookProvider, {}, Story()),
  ],
};

export default preview;