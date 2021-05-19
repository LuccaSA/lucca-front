const fs = require('fs');
const path = require('path');

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
  ]
}

// création de la liste des icônes
// fs.readdir('packages/icons/svg/', function (err, files) {
//   let filenames = [];
//   if (err) {
//     return console.log('Unable to scan directory: ' + err);
//   }
//   files
//     .filter((file) => file.substr(-4) === '.svg')
//     .forEach(function (file) {
//       filenames.push('#lucca-icon-' + file.slice(0, -4));
//     });
//   let data = JSON.stringify(filenames);
//   fs.writeFileSync('stories/icons/files.json', data);
// });