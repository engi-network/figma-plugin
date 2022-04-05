module.exports = {
  presets: [
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        importScripts: '@emotion/react',
      },
    ],
  ],
  "plugins": ["@emotion/babel-plugin"]
}
