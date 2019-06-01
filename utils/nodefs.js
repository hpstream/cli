const fs = require('fs');
const path = require('path');
const rm = require('rimraf').sync // 删除文件
// rm('./src/app')
/**
 * [getdirinfo description]
 *
 * @param   {[type]}  url  文件路径
 *
 * @return  {[type]}   文件类型{}
 */
function getdirInfo(url) {
  var info = fs.readdirSync(url);
  var dirs = [];
  var files = []
  var infos = []
  info.forEach(file => {
    infos.push(path.join(url, file));
    var stats = fs.statSync(path.join(url, file));
    if (stats.isFile()) {
      files.push(path.join(url, file));
    } else if (stats.isDirectory()) {
      dirs.push(path.join(url, file));
    }
  });
  return {
    infos,
    dirs,
    files
  }
}

function getdirAllInfo(url) {
  var opt = {
    info: [],
    dirs: [],
    files: []
  }
  get(url, opt);

  function get(url, opt) {
    var {
      infos,
      dirs,
      files
    } = getdirInfo(url);
    opt.info = opt.info.concat(infos);
    opt.dirs = opt.dirs.concat(dirs);
    opt.files = opt.files.concat(files);

    dirs.forEach(file => {
      get(file, opt);
    });
  }

  // console.log(opt);
}

// 读取json文件
function jsonFile(url) {
  var json = fs.readFileSync(url, 'utf8');
  return JSON.parse(json);
}
module.exports = {
  getdirInfo,
  getdirAllInfo,
  jsonFile
}
// console.log(getdirInfo('./'));
