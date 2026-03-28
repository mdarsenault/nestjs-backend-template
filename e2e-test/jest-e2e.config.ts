/* eslint-disable @typescript-eslint/naming-convention */
import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from '../tsconfig.json';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../',
  testRegex: '.e2e.spec.ts$',
  transform: { '^.+\\.(t|j)s$': 'ts-jest' },
  setupFiles: ['dotenv/config'],

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/',
  }),

  testEnvironment: 'node',

  testTimeout: 120_000,

  silent: true,
};

export default config;
