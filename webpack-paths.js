'use strict';

const path = require('path');
const src = path.join(__dirname, 'src');

module.exports = {
  config:       path.join(__dirname, 'config'),
  src:          src,
  dist:         path.join(__dirname, 'dist'),
  css:          path.join(__dirname, 'dist/css'),
  components:   path.join(src, '/components'),
  containers:   path.join(src, '/containers'),
};
