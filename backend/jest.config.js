module.exports = {
  testEnvironment: "node",        // Node environment
  coverageDirectory: "./coverage", // Coverage output folder
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js"], // Track all JS in src/
  coverageThreshold: {               // Force 100% coverage
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  reporters: [
    "default",
    ["jest-html-reporter", {
      pageTitle: "Backend Test Report",
      outputPath: "./coverage/report.html",
      includeFailureMsg: true,
      includeSuiteFailure: true
    }]
  ]
};
