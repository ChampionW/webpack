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