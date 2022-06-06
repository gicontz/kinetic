const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.base');

module.exports = {
  roots: [
    '<rootDir>/__tests__',
    '<rootDir>/src'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: `<rootDir>/${compilerOptions.baseUrl}/`,
  }),
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
  ],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/build/',
    '<rootDir>/common/node-ts-unit-test-utils',
    '<rootDir>/common/node-ts-common-config',
    '<rootDir>/src/App.ts',
    '<rootDir>/src/Server.ts',
    '<rootDir>/src/.*.ioc.ts',
    '<rootDir>/src/.*.data.ts',
    '<rootDir>/src/apis/swagger/',
    '<rootDir>/src/config/',
    '<rootDir>/src/database/mongoose/Database.ts',
    '<rootDir>/src/errors/',
    '<rootDir>/src/mq/',
  ],
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80
  //   }
  // },
  coverageReporters: ['html', 'text-summary'],
};
