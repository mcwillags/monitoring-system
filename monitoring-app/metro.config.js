// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts },
  } = await getDefaultConfig(__dirname);
  return {
    resolver: {
      sourceExts: [...sourceExts, 'scss', 'sass'],
    },
  };
})();
