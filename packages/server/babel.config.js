module.exports = api => {
  api.cache(true);
  return {
    compact: false,
    presets: [
      '@babel/preset-typescript',
      [
        '@babel/preset-env',
        {
          targets: { node: true },
          modules: false
        }
      ]
    ],
    plugins: [
      '@babel/plugin-proposal-optional-chaining',
      'babel-plugin-dynamic-import-node',
      '@babel/plugin-transform-destructuring',
      '@babel/plugin-transform-runtime',
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-class-properties'
    ],
    env: {
      production: {
        compact: true,
        plugins: []
      }
    }
  };
};
