module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-knobs',
  ],
  "core": {
    "builder": "webpack5"
  },
  // related to https://github.com/webpack/webpack/issues/13691
  // TODO remove when fixed by webpack
  "webpackFinal": async (config) => {
    config.cache = false;
    return config;
  },
}