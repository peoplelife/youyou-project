const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            // target:"https://shark-touched-presently.ngrok-free.app", 
            // target:"http://hcf4cu.natappfree.cc", // 后台服务地址
            // target:"http://eypwt4.natappfree.cc",
            target:"http://ftckb9.natappfree.cc",
            // 后台服务地址以及端口号   我的热点：192.168.181.71    aheadwife:10.10.148.183
            // target:"http://10.10.144.201:9528",
            changeOrigin: true, // 是否开启代理
            pathRewrite: {
                "/api": "", // 代理名称
            },
        })
    );
};