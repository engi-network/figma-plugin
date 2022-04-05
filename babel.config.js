module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        importScripts: '@emotion/react',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: ['@emotion/babel-plugin'],
}
