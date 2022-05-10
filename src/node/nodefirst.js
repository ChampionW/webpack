// node api一般有两种一种是同步的  另外一种是异步的
// require就是同步读取文件的操作
// import fs from 'fs';
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync('./redme.md', 'utf-8');
// console.log(data);
// eslint-disable-next-line no-undef
// console.log(path.join('a', 'b'), __dirname,__filename);//__dirname当前路径文件路径
// // eslint-disable-next-line no-undef
// console.log(path.join(__dirname, 'a', '/b'));//遇到/ 表示回到根目录
// console.log(path.basename('a.js', 'js')); //用路径做减法
// console.log(path.extname('a.js'));//取最后一个后缀名，作为路径
// console.log(path.relative('a/b/c','c'));//获取当前的相对路径
// console.log(this);

// 导出结果 每个文件就是一个模块
// eslint-disable-next-line no-undef
module.exports = 'hello2';
exports = 'hello';
console.log(module);
