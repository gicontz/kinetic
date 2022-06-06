const fs = require('fs');

const config = JSON.parse(
  fs.readFileSync('./common/node-ts-common-config/.eslintrc.json'),
);
config.settings['import/resolver'].typescript = {
  project: './tsconfig.base.json',
};

module.exports = config;
