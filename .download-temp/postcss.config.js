// postcss.config.js
module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {
      "browsers": [
        "> 0.1%",
        "Android >= 4.1",
        "ios >= 8",
        'not ie < 12'
      ]
    }
  }
}