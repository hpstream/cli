var cheerio = require('cheerio')

function MyPlugin(options) {
  // Configure your plugin with options...
  this.options = options||{};
}

MyPlugin.prototype.apply = function (compiler) {
  compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
    compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync('MyPlugin', (data, cb) => {
      // 将 html 转化成jquery对象
      $ = cheerio.load(data.html);
      let str = `<script src="//wechatfe.github.io/vconsole/lib/vconsole.min.js?v=3.2.0"></script>
      <script >
        var vConsole = new VConsole();
        console.log('Hello world');
        console.log(location.href);
      </script>
      `
      $('head').append(str)
      data.html = $.html();
      cb(null, data)
    })
  })
}

module.exports = MyPlugin;