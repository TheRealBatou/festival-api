/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',                         // connects Jest with TypeScript
  testEnvironment: 'node',                   // simulates a Node.js environment
  testMatch: ['**/__tests__/**/*.test.ts'],  // searches for tests im __tests__ folder
  moduleFileExtensions: ['ts', 'js'],        // needed file types
  roots: ['<rootDir>/src'],                  // only looks in src for tests (optional)
  clearMocks: true                           // automatic reset of mocks  (clean tests)
};
