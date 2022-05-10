reqeustAnimation 不要一提到,就是动画动画. 它仅仅是一个浏览器在每一帧渲染之间给予我们的一个切片时机.仅此而已.


node 单线程，非阻塞，应用场景，io密集型（文件读写），不适合处理cpu密集型（压缩、加密）
node中处理多个异步操作同一个文件的场景（靠队列实现）
可以解析js语法，服务端渲染vue、react
可以做中间层（主要解决跨越）
前端用node可以实现很多工具

node中this指的是[],存在一个global对象 _filename _dirname exports module require这五个变量可以直接使用
process：进程 { platform, cwd, env, argv, nextTick }
commender 命令行管家 

node中常用的模块
1.内置模块 node自己带的
2.文件模块 （使用的时候用相对路径或者绝对路径）
3.第三方模块
fs path vm

模块规范：
commonjs规范 动态导入，不支持tree-shaking,读取文件
esmodule规范 静态导入,可以实现tree-shaking，http请求 使用export{}导出的是一个变量（接口），如果内部对应的值发生变化是有影响的
import demo from 'xxx'
module.exports = 'hello'

一个包中含有多个模块，每个模块必须配置一个package.json文件
1.读取文件 2.包装函数，设置参数 3.默认返回modue.exports对象

1.把文件路径解析成一个绝对路径
2.实现模块的缓存
3.创建一个模块 根据文件路径来创建（一个模块必须要有三个属性 id path export（后续文件导出的结果需要保存到这个变量上））
4.模块的加载，根据创建的模块进行模块的加载
5.记载模块时会构建一个paths属性，这个属性是第三方模块的查找路径
6.取出文件的后缀，调用对应的加载模块的策略
7.读取文件的内容
8.在文件内容外面包裹一个函数
9.module.exports === exports = 'hello'
this = exports = mudule.exports = {}
最终导出的值是以module.exports为准
const exports = module.exports
const thisValue = exports
compileFunction.call(thisValue,exports,module,....)

编码 后端需要读取文件，需要用到编码
前端早期不能操作文件夹的，无法操作二进制数据，node就实现了一个buffer用于描述内存的
内存，2进制值 Buffer是16进制（目的是为了简洁）
基本的进制转换  node只支持utf-8编码 一个汉字三个字节
一个字节由8个位（二进制）组成
js编码
base64：开发中能替换路径，而且可以同于传输 是一个编码规范
存在电脑内存中的都是二进制数据，再通过一些指定的编码规范如base64，将其转化为适合base64的规范的代码
字符串（js）=》 asicc编码 =》6a 73 =》 存储 =》 buffer（通常位于计算机中的RAM中）

高阶函数， 函数柯里化，反函数柯里化， 防抖（不停的调用只能执行一次），节流（有规律的执行） 类型判断（深拷贝）
回调解决异步问题 （并发，串行）
前端设计模式： 发布订阅（on emit off once） 观察者模式（被观察者，要放在观察身上）
手写promise  高阶函数 发布订阅 一些回调的处理
promise的finally、all、race  promise-limit（设置请求上线）
generator + co原理 （异步递归的核心思想） =》 asyn + await
promise如何终止 如何将node中的回调api转成promise的方式 promisfy；
浏览器的事件环 同步异步 阻塞非阻塞 线程进程的关系，浏览器中哪些线程，线程如何调度的
宏任务队列 微任务队列 + 浏览器渲染（requestIdleCallback）

node
全局对象 setImerdiate process（env,argv,cwd()）commander
require dirname filename module.exports 如何实现的commonjs实现原理
node EventLoop和浏览器事件环的区别 poll timer check
npm模块的使用 内置 文件 第三方
编码 怎么进行编码的转化 base64编码


文件流 是文件操作中自己实现的流，文件流是继承于stream的，底层的实现用的是fs.read fs.open...


