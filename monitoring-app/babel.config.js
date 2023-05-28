module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['@babel/plugin-transform-flow-strip-types'],
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      [
        'module-resolver',
        {
          alias: {
            '@components': './src/components',
            '@lib': './src/lib',
            '@utils': './src/utils',
            '@store': './src/store',
            '@models': './src/models',
            '@screens': './src/screens',
            '@routes': './src/routes',
            '@common': './src/common',
            '@hooks': './src/hooks',
            '@src': './src',
            '@assets': './assets',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
    ],
  };
};
