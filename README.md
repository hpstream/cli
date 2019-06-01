# cli从零开始教你搭建脚手架

**脚手架的好处不用多说，现在开始一步一步的教大家搭建一个脚手架**

# 搭建之前
  1. 假设我们工程叫做cli
  2. 执行npm link命令
  3. 在package.json 增加bin字段。
   
**解释: npm link 就是把当前模块link到全局模块中。这样不管在那个文件夹里面都能直接执行命令了**
**解释:bin字段就是全局可以直接执行的命令**

# 1.写一个简单的命令

```
在package.json中增加此命令，记得在当前目录建立index.js
"bin":{
    "hpCli":"./index.js"
  }
```
```

```


