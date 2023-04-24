const { CracoAliasPlugin, configPaths } = require("react-app-alias");

const aliasMap = configPaths("./jsconfig.paths.json");

module.exports = {
  style: {
    sass: {
      loaderOptions: {
        // 적용할 스타일 imoprt하기
        additionalData: `
                @import "@scss/abstracts/_variables.scss";
                @import "@scss/abstracts/_responsive.scss";
                `,
      },
    },
  },
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {
        alias: aliasMap,
      },
    },
  ],
};
