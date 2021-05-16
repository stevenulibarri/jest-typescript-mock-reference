module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  coverageDirectory: './coverage',
  coverageReporters: [
    'text',
    'text-summary',
  ],
  collectCoverageFrom: [
    './src/**/*.ts',
  ],
};
