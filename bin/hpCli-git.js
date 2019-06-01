
const chalk = require('chalk');
const program = require('commander');

const ora = require('ora');
const download = require('download-git-repo');
const nodefs = require('../utils/nodefs.js');
const path = require('path');
const logSymbols = require('log-symbols');
const rimraf = require("rimraf");
const fs = require('fs');
const shelljs = require('shelljs');
let giturl = `direct:https://github.com/hpstream/webpack4.git#master`;

// 如果是根目录下载模版
const spinner = ora(`正在下载项目模板，源地址：${giturl}`)
target = path.join(process.cwd(), '.download-temp');

rimraf.sync(target);
spinner.start()
download(giturl,
  target, {
    clone: true
  }, (err) => {
    console.log(err);
    if (err) {
      spinner.fail();
      console.log(logSymbols.error, chalk.red('下载失败'))
    } else {
      // 下载的模板存放在一个临时路径中，下载完成后，可以向下通知这个临时路径，以便后续处理
      spinner.succeed();
      console.log(logSymbols.success, chalk.green('下载成功'));
      shelljs.cd('.download-temp')
      if (shelljs.exec('sudo cnpm install').code !== 0) {
        shelljs.echo('npm install 完成');
        shelljs.exit(1);
      }
    }
  })

