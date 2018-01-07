require('./check-versions')();
// 引入配置文件
var config = require('../config');
// 如果 Node 的环境无法判断当前是 dev / product 环境
// 使用 config.dev.env.NODE_ENV 作为当前的环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
// 可以强制打开浏览器并跳转到指定 url 的插件
// https://github.com/sindresorhus/opn
var opn = require('opn');
// node自带的文件路径工具
var path = require('path');
// express框架
var express = require('express');

var webpack = require('webpack');
/*
   http-proxy-middleware 是一个 node 代理中间件，可以将http请求代理到其他服务器
   详情文档：https://github.com/chimurai/http-proxy-middleware
*/
var proxyMiddleware = require('http-proxy-middleware');
// 使用 dev 开发环境的配置
var webpackConfig = require('./webpack.dev.conf');

// default port where dev server listens for incoming traffic
// 端口号为命令行输入的PORT参数或者配置文件中的默认值
var port = process.env.PORT || config.dev.port;
// automatically open browser, if not set will be false
// 配置文件中 是否自动打开浏览器
var autoOpenBrowser = !!config.dev.autoOpenBrowser;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// 配置文件中 http代理配置
var proxyTable = config.dev.proxyTable;
// 启动 express 服务
var app = express();
// 启动 webpack 编译
var compiler = webpack(webpackConfig);
// 可以将编译后的文件暂存到内存中的插件
// https://github.com/webpack/webpack-dev-middleware
/*
    webpack-dev-middleware
    用来在内存中生成打包好的文件，而不用写到磁盘上，它提供从 webpack 到服务器的文件传输，用来配合进行热重载

    第一个参数：webpack 实例
    第二个参数：配置 只有 publicPath 必填，
    其他参考文档 https://www.npmjs.com/package/webpack-dev-middleware
 */
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  // 公共路径，与webpack的publicPath一样
  publicPath: webpackConfig.output.publicPath,
  // 不打印
  quiet: true
});
// Hot-reload 热重载插件
// https://github.com/glenjamin/webpack-hot-middleware
/*
   webpack-hot-middleware
   用来接受 webpack 传递来的更新，并将其反应到浏览器客户端，需要与 webpack-dev-middleware 一起使用

   使用文档：https://www.npmjs.com/package/webpack-hot-middleware
*/
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {
  },
  heartbeat: 2000
});
// force page reload when html-webpack-plugin template changes
// 当tml-webpack-plugin template更改之后，强制刷新浏览器
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'});
    cb()
  })
});

// proxy api requests
// 将 proxyTable 中的请求配置挂在到启动的 express 服务上
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context];
  // 如果options的数据类型为string，则表示只设置了url，
  // 所以需要将url设置为对象中的 target的值
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
});

// 使用 connect-history-api-fallback 匹配资源
// 如果不匹配就可以重定向到指定地址
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// 将暂存到内存中的 webpack 编译后的文件挂在到 express 服务上
// serve webpack bundle output
app.use(devMiddleware);

// 将 Hot-reload 挂在到 express 服务上
// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// 拼接 static 文件夹的静态资源路径
// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// 静态文件服务
app.use(staticPath, express.static('./static'));
// 应用的地址信息
var uri = 'http://localhost:' + port;

var _resolve;
var readyPromise = new Promise(resolve => {
  _resolve = resolve
});

console.log('> Starting dev server...');
// 编译成功 有效后 执行回调
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n');
  // 如果配置了自动打开浏览器，且不是测试环境，则自动打开浏览器并跳到我们的开发地址
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
});

var server = app.listen(port);

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
};
