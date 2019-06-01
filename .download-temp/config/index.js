/**
 * 功能：存放不同文件的打包区别
 */
const path = require('path');
module.exports = {
  common:{
    // entry: path.resolve('./src'),
    root: path.resolve(__dirname,'../')// 根目录
  },
  test:{
    publicPath: 'https://t1.zhuhuiyao.cn/web/front-app/'
  },
  prod:{
    publicPath: 'https://qiniuh5.wodidashi.com/web/'
  }
}