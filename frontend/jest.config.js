const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },

  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/**/layout.js",
  ],
};

module.exports = createJestConfig(customJestConfig);
