import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './', // project root
  roots: ['<rootDir>/src'],
  testRegex: '.*\\.spec\\.ts$', // match unit test files
  transform: { '^.+\\.(t|j)s$': 'ts-jest' },
  collectCoverageFrom: ['src/**/*.(t|j)s'], // match source files only
  coverageDirectory: 'coverage', // output folder
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  silent: true,
};

export default config;
