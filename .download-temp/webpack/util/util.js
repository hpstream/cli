const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const flatten = require('array-flatten');
const {common} = require('../../config/index.js');
var root = common.root;


// path.resolve();
// 遍历自定目录生成 入口文件 entry
//构建上面说的 entries 结构
var entries = [];
// entries 的格式是这样的，每一个表示一组html/js，比方说 app/advise/index 就代表了 app/advise/index.html 和 app/advise/js/index.js, 后一个js是 前一个html的 chunk, 将会在HtmlWebpackPlugin里使用到
// const entries = [
//   'app/advise/index',
//   'app/webpack-test/index',
// ]
walkingTree([path.resolve(root, 'src')]).map(file => {
 
  if (file.match(/\.(html|php)$/)) {
    var entry = file.replace(path.resolve(root, 'src') + path.sep, ''); //去掉路径里前面的部分
    entry = entry.split('.')[0] //去掉扩展名部分
    entries.push(entry);
  }
})

// console.log(entries);
var entriesarr = injectEntry(entries);
var configPlugins = injectHtml(entries);




//深度优先递归遍历
function walkingTree(files) {
  return flatten(files.map(file => {
    let stats = fs.statSync(file);
    if (stats.isFile()) {
      return file;
    } else if (stats.isDirectory()) {
      let subfiles = fs.readdirSync(file);
      return walkingTree(subfiles.map(subfile => {
        return path.join(file, subfile);
      }))
    }
  }));
}


//生成不同的chunk name
function chunks(item, type) {
  let s = item.split(path.sep);
  s.splice(s.length - 1, 0, type); // js文件会放在 /js/ 目录下，所以如果 entry是 app/test/index, 那么这里会把js定位到 app/test/js/index.js 上
  let chunk = s.join("/");
  return chunk;
}
//生成入口;
function injectEntry(entries) {
  //entry
  const entry = {};
  entries.forEach((item) => {
    let chunk = chunks(item, 'js');
    entry[item] = ['@babel/polyfill', '.' + path.sep + 'src' + path.sep + '' + chunk + '.js']
  })

  return entry;
}

//生成html
function injectHtml(entries) {
  //plugin
  const configPlugins = []
  entries.forEach((item) => {
    const ext = fs.existsSync(`src${path.sep}${item}.php`) ? 'php' : 'html';
    const htmlPlugin = new HtmlWebpackPlugin({
      filename: path.resolve('build',`.${path.sep}${item}.html`),
      template: `src${path.sep}${item}.${ext}`,
      chunks: [item, 'common', 'nocommon'], //这里针对每个 entry 找到对应的js的chunk(通过chunks函数 )
      chunksSortMode: "manual",
      minify: true,
      xhtml: true,
    });

    configPlugins.push(htmlPlugin);
  });
  return configPlugins;
}
// console.log(configPlugins)
module.exports = {
  entriesarr,
  configPlugins
};
