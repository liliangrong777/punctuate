import type { Config } from 'jest';
const config: Config = {
  transform: {
    '\\.[jt]s?$': 'babel-jest'
  },
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
};

module.exports = config;
