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
    {
      /**
       * Fix Storybook issue with PostCSS@8
       * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
       */
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  babel: async (options) => ({
    ...options,
  }),
  webpackFinal: async (config, { configType }) => {
    // Make whatever fine-grained changes you need
    // Return the altered config
    config.resolve.alias['~'] = path.resolve(__dirname + '/../src');
    // config.module.rules.push({
    //   test: /\.css$/,
    //   use: [
    //     {
    //       loader: 'postcss-loader',
    //       options: {
    //         postcssOptions: {
    //           plugins: [
    //             require('tailwindcss')('./tailwind.config.js'),
    //             require('autoprefixer'),
    //             require('cssnano'),
    //           ],
    //         },
    //       },
    //     },
    //   ],
    //   include: path.resolve(__dirname, '../'),
    // })

    return config;
  },
}