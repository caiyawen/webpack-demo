const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common');
// Create multiple instances
const extractLESS = new ExtractTextPlugin('./[name].css');

module.exports = {
  //插件项
  plugins: [commonsPlugin, extractLESS],
  //页面入口文件配置
  entry: {
    index: './src/js/page/index.js'
  },
  //入口文件输出配置
  output: {
		path: path.resolve(__dirname, './dist/js/page/'),
    filename: '[name].js'
  },
  module: {
    //加载器配置
    loaders: [
      //.css 文件使用 style-loader 和 css-loader 来处理
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      //.js 文件使用 jsx-loader 来编译处理
      { test: /\.jsx$/, loader: 'jsx-loader?harmony' },
      {	test: /\.jsx?$/, loader: 'babel-loader' },
      //.less 文件使用 style-loader、css-loader 和 less-loader 来编译处理
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader?sourceMap' },
      //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
    ],
    rules: [
      {
        test: /\.less$/i,
        use: extractLESS.extract([ 'css-loader', 'less-loader' ])
      },
    ]
  },
  //其它解决方案配置
  resolve: {
    //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    extensions: ['*', '.js', '.ts', '.json', '.less'],
    //模块别名定义，方便后续直接引用别名，无须多写长长的地址
    alias: {
      // AppStore: 'js/stores/AppStores.js', //后续直接 require('AppStore') 即可
      // ActionType: 'js/actions/ActionType.js',
      // AppAction: 'js/actions/AppAction.js'
      "@": path.resolve(__dirname, './dist/js/page/')
    }
  }
};