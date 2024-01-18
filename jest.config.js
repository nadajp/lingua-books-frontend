const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  setupFiles: ['<rootDir>/src/testing/testEnvVars.js'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  modulePaths: ['src'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  collectCoverage: true,
  transformIgnorePatterns: [
    "node_modules/(?!(jose)/)"
  ] 
};

module.exports = createJestConfig(config);
