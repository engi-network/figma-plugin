const path = require('path');

module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: ['../src/**/*.stories.tsx'],
  typescript: {
    reactDocgen: 'none',
  },
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  babel: async (options) => ({
    ...options,
  }),
  webpackFinal: async (config, { configType }) => {
    // Make whatever fine-grained changes you need
    // Return the altered config
    config.resolve.alias['~'] = path.resolve(__dirname + '/../src');
    
    return config;
  },
}