process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';

require('ignore-styles');

require('@babel/register')({
  ignore: [ /(node_modules)/ ],
  presets: ['@babel/preset-env', '@babel/preset-react']
});

require('./index');
