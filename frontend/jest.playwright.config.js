module.exports = {
  browsers: ["chromium"],
  launchOptions: {
    headless: true,
  },
  contextOptions: {
    recordVideo: {
      dir: "screenshots/videos",
    },
  },
};
