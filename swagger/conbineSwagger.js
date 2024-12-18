const path = require('path');

const mainSwagger = require('./main.swagger.json');
const authSwagger = require('./auth.swagger.json');
const rootSwagger = require('./root.swagger.json');

mainSwagger.paths = {
  ...mainSwagger.paths,
  ...authSwagger.paths,
  ...rootSwagger.paths,
};

module.exports = mainSwagger;
