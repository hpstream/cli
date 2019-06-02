# 自定义搭建cli脚手架

> 前端开发攻城狮应该都知道一个叫cli脚手架的工具，他可以简化我们对工程的配置。使我们专心于业务代码。不需要过多于在乎工程搭建的细节。这篇文章带你了解cli的原理与脚手架的制作。

**
<a name="yiUBA"></a>
# 原理
 不管什么语言都有自己的包管理工具，js也一样。它的包管理工具叫npm。在建立包的时候最重要的一个文件叫做package.json。这个文件有一个bin字段，主要是它的能力。如果不了解，请点击[这里](https://javascript.ruanyifeng.com/nodejs/packagejson.html)，下面是简单的解释。

![image.png](https://cdn.nlark.com/yuque/0/2019/png/119800/1559397729783-07caec86-2999-416a-975d-b9c65b0e02f7.png#align=left&display=inline&height=603&name=image.png&originHeight=1206&originWidth=1836&size=444105&status=done&width=918)

> 上图，描述了很清楚了。接下俩我们开始学习搭建一个脚手架。


<a name="YzEff"></a>
# 搭建脚手架之前的准备工作

1. 建立一个hpcli工程（工程名称可以自定义）
1. 执行npm init 命令 创建一个package.json文件。(需要使用这个文件)
1. 执行npm link 命令（为了方便测试和使用，这个步骤主要是把当前文件夹挂载到全局上）。


<a name="C26OG"></a>
# 进入hello word 世界

 **步骤** 

1. 在package.json里面加入

```json
"bin": {
    "hpCli": "./index.js"
  },
```

2. 在当前文件夹里面添加index.js

```javascript
#!/usr/bin/env node    
// 上面这句话必须加，是让它以node脚本执行，不加会出错。
console.log('hello word!');
```

**注意：#!/usr/bin/env node必须加** 

> 接下来在任意文件下面运行hpCli ,则可以打印出来hellow word!!!,第一步完成。



**好了，万里长城的第一步已经完成了。结下来实现一个比较完整的功能，去远程拉去被人仓库的代码。并且自动执行npm install。**


> 在完成实现功能之前，我们先来了解一些常用的脚手架工具。


1. commander 命令行控制工具
1. chalk  颜色显示工具
1. log-symbols 显示信息标志
1. shelljs   执行 控制台命令
1. ora  进度条
1. download-git-repo 下载git仓库

<a name="Lg1Mb"></a>
## commander
具体的不多介绍了：如果不懂可以百度看下，这是[commander中文文档](https://www.cnblogs.com/mirandachen/p/9826886.html).

```javascript
var program = require('commander');
 
program
  .version('0.1.0')
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);
 
console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbqSauce) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);
```

上线这个代码大家应该比较熟悉，可以自己尝试运行效果，这里不多讲了。

**注意事项：** 
> 当.command（）用description参数时，不应调用.action（回调）来处理子命令，否则会出错。 这是告诉commander你要为子命令使用单独的可执行文件，就像git（1）和其他流行的工具一样。
> 这时commander将尝试使用名称program-command搜索条目脚本目录中的可执行文件（如./examples/index），如index-install，index-search。

<a name="k7xii"></a>
## shelljs
应用这个库可以使用linux命令操作系统，主要是兼容个个平台的差异，非常好用。使用时参考文[文档]()就可以了。

**剩下的插件比较简单这里不做介绍，不过名字已经写出来了，可以自行查阅了解**。


<a name="2dAqW"></a>
# 开始完成自己的功能

<a name="kDQAO"></a>
## 实现步骤
1.去远程拉去仓库。<br />2.拉去远仓库，后执行npm install

> 说起来简单，但是实现起来还是要费一番功夫的。这个就像问把大象放在冰箱里需要三个步骤，**第一步打开冰箱，第二步，把大象放进去，第三步，把冰箱门关上。**结束。但是现实你放个大象给我看看～～。理论很简单，现实很骨干。开始介绍代码吧。


目录结构：<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/119800/1559402304034-06d0acc3-c986-4677-9c85-809c8b646d94.png#align=left&display=inline&height=102&name=image.png&originHeight=204&originWidth=688&size=20568&status=done&width=344)<br />package.json

```json
"bin": {
    "hpCli": "./bin/bin.js"
  },
```

bin.js

```javascript
#!/usr/bin/env node

const chalk = require('chalk');
const program = require('commander');
console.log(chalk.green('👏 环境搭建自己的脚手架1'));
program.version('1.0.0')
  .usage('<command> [项目名称]')
  .command('git', '获取远程仓库')
  .parse(process.argv)
```
hpCli-git.js

```javascript

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


```


这样子简单的功能就完成了。[git仓库](https://github.com/hpstream/cli)在这里可以拉去查看。


