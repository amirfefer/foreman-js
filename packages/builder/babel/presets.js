/* eslint-disable no-console */
const path = require('path');

const presets = [
  require.resolve('@babel/preset-env'),
  require.resolve('@babel/preset-react'),
];

// Try to load `@theforeman/env/babel` from the consumer
try {
  const consumerNodeModulesPath = path.resolve(process.cwd(), './node_modules');

  const envPreset = require.resolve('@theforeman/env/babel', {
    paths: [consumerNodeModulesPath],
  });

  presets.push(envPreset);
} catch (error) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      'Unable to load @theforeman/env/babel for a none production environment'
    );
    console.log(error);
  }
}

module.exports = presets;
