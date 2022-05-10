const fs = require('fs');
const path = require('path');
const ws = fs.createWriteStream(path.resolve(__dirname,'demo.md'),{
    flags: 'w',
    encoding: null,//默认读取出的是buffer类型
    autoClose: true,// 读取完毕后，是否需要关闭liu fs.close
    emitClose: true,// 读取完毕后要触发close事件 emit（'close')
    start: 0,
    // end: 5,
    highWaterMark: 2 //每次写几个 水位线 我预期能放到多少  我预期多少空间来做这件事情，超过预期，依然可用 字节长度
});

ws.on('open',function(fd){ //open close是文件流特有的
    console.log(fd,'OPEN');
});
// 达到预期 返回false
// 会浪费内存 只有第一次是真实的写入后续用了一个缓存区，存储其他操作
// 写入是一个异步操作，按道理来说肯定会乱的
let flag1 = ws.write('1','utf-8',function(){
    console.log('写入成功1');
});
let flag2 = ws.write('2','utf-8',function(){
    console.log('写入成功2');
});
// 我期望用两个字节来完成写入操作
// 会浪费内存 只有第一次会真实的写入，后续用了一个缓存区，存储其他操作

ws.on('drain',function(){//此方法需要保证当写入的数据到达预期后，并且数据被清空了，写入到文件中了
    console.log('drain');
});
setTimeout(() => {
    ws.end('写入完成');//表示写入完成
}, 100);

// 各个默认参数初始化实例对象
// 打开文件fs.open() => 获取到fd,即文件标识符
// 实例对象的write方法（同步操作），第一次直接写入到文件中，写完之后，处理回调，接着要处理缓存中的数据
// 如果不是第一次写入，则存入到缓存中去
// this._write(chunk,encoding,ccb) 属于异步操作

// 读取一点，写一点 =》 支持大文件的操作

// 封装为pipline操作 也就是管道
// rs.on('data',function(chunk){
//     let flag = ws.write(chunk);
//     // 达到预期，暂停继续读取
//     if(!flag){
//         rs.pause()
//     }
// })
// ws.on('drain',function(){
//     rs.resume();
// })
