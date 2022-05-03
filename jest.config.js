module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/*.styles.ts',
    '!**/*.types.ts',
    '!**/node_modules/**',
    '!**/*.stories.tsx',
    '!**/dist/**',
    '!**/script/**',
    '!**/*.config.{js,ts}',
    '!**/.*.{js,ts}',
    '!**/.storybook/**',
    '!**/coverage/**',
    '!**/@types/**',
    '!**/models/*.ts',
    '!**/jest.emotionSerializer.ts',
    '!**/*/Icons/**',
  ],
  moduleNameMapper: {
    // Make sure this is the last mapper, since it will match any file extension
    '^~/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less)$': '<rootDir>/src/app/__mocks__/styleMock.js',
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  snapshotSerializers: ['<rootDir>/jest.emotionSerializer.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.svg$': 'jest-raw-loader',
  },
  transformIgnorePatterns: ['node_modules/(?!react-syntax-highlighter/)'],
}
