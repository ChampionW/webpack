// Buffer代表的是内存 如果一旦声明 不能扩展（随意更改大小的） 如果想去更改buffer的大小，改小直接截取内存，改大的话需要创造一个大的内存空间，将数据copy过去
// 声明buffer的时候需要指定大小（@types/node）大小的单位指的是字节,最小单位是字节
// 主要应用buffer 可以存储数据，数据可以全部用buffer表示出来，可以和字符串相互转化
// 当我们进行读取操作的时候，不指定编码，全部都是buffer类型，如果取出来的buffer中的某一项都是10进制
// buffer中存储的都是内存地址
// let buf1 = Buffer.alloc(3);
// console.log(buf1);
// let buf2 = Buffer.from('champion');
// let buf3 = Buffer.from('架构');
// console.log(buf2,buf2.toString(),buf2.toString('base64'),Buffer.concat([buf2,buf3]).toString());
// Buffer.prototype.copy = function(target,targetStart,sourceStart,sourceEnd) { // }
// 对于大文件操作读取，用流比较好一些，底层的文件操作，防止淹没可用内存

// r： 读取  w： 写入  a： 追加
const { Console } = require('console');
const fs = require('fs');
const path = require('path');
// fs.open(path.resolve(__dirname,'nodefirst.js'),'r',438,function(err,fd){
//     // fd文件描述符, 用完需要关闭掉
//     console.log(fd);
//     fs.read(fd,buf,0,3,0,function(error,bytesRead){
//         // 实际读取的个数
//         console.log(bytesRead);
//         fs.open(path.resolve(__dirname,'copy.js'),'w',438,function(err,wfd){
//             console.log(wfd);
//             fs.write(wfd,buf,0,3,0,function(err,bytesWrite){
//                 console.log(bytesWrite);
//             });
//         });
//     });
// });

fs.open(path.resolve(__dirname, 'redme.md'), 'r', 438, function (err, fd) {
    // fd文件描述符, 用完需要关闭掉
    fs.open(path.resolve(__dirname, 'copy.md'), 'w', function (err, wfd) {
        let time = 0;
        function close() {
            fs.close(fd, () => { });
            fs.close(wfd, () => { });
        }
        function next() {
            const buf = Buffer.alloc(100);
            time++;
            fs.read(fd, buf, 0, 100, time * 100, function (error, bytesRead) {
                // 实际读取的个数
                // console.log(bytesRead);
                if (bytesRead == 0) {
                    return close();
                }
                fs.write(wfd, buf, 0, 100, time * 100, function (err, bytesWrite) {
                    // console.log(bytesWrite);
                    next();
                });
            });
        }
        next();
    });
    // console.log(fd);
    // fs.read(fd, buf, 0, 3, 0, function (error, bytesRead) {
    //     // 实际读取的个数
    //     console.log(bytesRead);
    //     fs.open(path.resolve(__dirname, 'copy.js'), 'w', 438, function (err, wfd) {
    //         console.log(wfd);
    //         fs.write(wfd, buf, 0, 3, 0, function (err, bytesWrite) {
    //             console.log(bytesWrite);
    //         });
    //     });
    // });
});

// const rs = fs.createReadStream(path.resolve(__dirname,'redme.md'),{
//     flags: 'r',
//     encoding: null,//默认读取出的是buffer类型
//     autoClose: true,// 读取完毕后，是否需要关闭liu fs.close
//     emitClose: true,// 读取完毕后要触发close事件 emit（'close')
//     start: 0,
//     // end: 5,
//     highWaterMark: 200 //每次读取几个
// });
// rs.on('open',function(fd){ //open close是文件流特有的
//     console.log(fd,'OPEN');
// });
// const arr = [];
// rs.on('data',function(data){
//     // console.log(data);
//     rs.pause();
//     arr.push(data);
// });
// rs.on('end',function(){
//     // console.log(Buffer.concat(arr).toString());
// console.log('读取结束');
// });
// rs.on('close',function(){ //open close是文件流特有的
//     console.log('close');
// });
// setInterval(()=>{
//     rs.resume();
// },10);