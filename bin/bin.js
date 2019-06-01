#!/usr/bin/env node

const chalk = require('chalk');
const program = require('commander');
console.log(chalk.green('👏 环境搭建自己的脚手架1'));
program.version('1.0.0')
  .usage('<command> [项目名称]')
  .command('git', '获取远程仓库')
  .parse(process.argv)