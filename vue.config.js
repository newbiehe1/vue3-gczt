const myProduction = process.env.NODE_ENV === "production" ? true : false;

let config = {};
if (myProduction) {
    config = {
        publicPath: "./",
        assetsDir: "view",
        css: {
            requireModuleExtension: false,
        },
        productionSourceMap: false,
        configureWebpack: {
            performance: {
                hints: "warning",
                //入口起点的最大体积
                maxEntrypointSize: 1048576,
                //生成文件的最大体积
                maxAssetSize: 1048576,
                //只给出 js 文件的性能提示
                assetFilter: function (assetFilename) {
                    return assetFilename.endsWith(".js");
                },
            },
        },
    };
} else {
    config.devServer = {
        proxy: {
            "/gczt": {
                target: "http://127.0.0.1",
                ws: true,
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    "^/gczt": "/gczt",
                },
            },
        },
    };
}
Object.assign(config, {
    chainWebpack: (data) => {
        data.module
            .rule("images")
            .use("url-loader")
            .loader("url-loader")
            .tap((options) => Object.assign(options, { limit: 20480 }));
        // 移除 prefetch 插件
        // data.plugins.delete('prefetch');
        // 或者
        // 修改它的选项：
        // data.plugin('prefetch').tap(options => {
        //     console.log(options)
        //     options[0].fileBlacklist = options[0].fileBlacklist || []
        //     options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
        //     return options
        // });
    },
});

module.exports = config;
