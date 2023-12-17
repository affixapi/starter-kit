module.exports = {
  coverageReporters: ['lcov'],
  moduleFileExtensions: ['ts', 'json', 'js'],
  preset: 'ts-jest',
  rootDir: './',
  testEnvironment: 'node',
  testMatch: ['**/test.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json',
      },
    ],
  },
};
