export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.(jpg|jpeg|png|gif|svg)$": "jest-transform-stub",
  },

  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-transformer-svg",
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // collectCoverage: true,
  // collectCoverageFrom: [
  //   "src/**/*.{ts,tsx}",   // Collect coverage for test files in src/components
  //   "src/**/*.test.{ts,tsx}",    // Exclude test files themselves from coverage
  // ],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["text", "lcov"],
  
  // testMatch: [
  //   "**/__tests__/**/*.(test|spec).{ts,tsx}",
  // ],
};