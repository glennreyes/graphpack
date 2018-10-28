module.exports = api => {
  api.cache(true);

  return {
    plugins: ['@babel/plugin-syntax-dynamic-import'],
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' }, modules: false }],
      '@babel/preset-typescript',
    ],
  };
};
