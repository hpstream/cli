var cheerio = require('cheerio')

function Rem(options) {
  // Configure your plugin with options...
  this.options = options||{};
}

Rem.prototype.apply = function (compiler) {
  compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
    compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync('MyPlugin', (data, cb) => {
      // 将 html 转化成jquery对象
      $ = cheerio.load(data.html);
      let str = `<script src="${this.options.options}common/copy/rem.min.js"></script>
      `
      $('head').prepend(str)
      data.html = $.html();
      cb(null, data)
    })
  })
}

module.exports = Rem;