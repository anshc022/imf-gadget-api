module.exports = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  testMatch: ['**/__tests__/**/*.test.js'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/'
  ]
};
