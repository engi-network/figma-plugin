module.exports = {
  moduleNameMapper: {
    // Make sure this is the last mapper, since it will match any file extension
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.svg$': 'jest-raw-loader',
  },
}
