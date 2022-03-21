const path = require('path');

module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  typescript: {
    reactDocgen: 'none',
  },
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    // "@storybook/addon-postcss",
    {
      /**
       * Fix Storybook issue with PostCSS@8
       * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
       * @see https://github.com/tailwindlabs/tailwindcss/issues/6314#issuecomment-991824049
       */
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  framework: '@storybook/react',
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