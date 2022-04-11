module.exports = {
  presets: [
    "@emotion/babel-preset-css-prop", 
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  "plugins": ["@emotion/babel-plugin"]
}
