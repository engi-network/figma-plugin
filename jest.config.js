module.exports = {
  moduleNameMapper: {
    // Make sure this is the last mapper, since it will match any file extension
    '^~/(.*)$': '<rootDir>/src/app/$1',
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
}
