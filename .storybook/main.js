module.exports = {
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
  framework: '@storybook/react',
  webpackFinal: async (config, { configType }) => {
    // Make whatever fine-grained changes you need
    // Return the altered config
    return config;
  },
}