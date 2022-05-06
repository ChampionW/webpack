reqeustAnimation 不要一提到,就是动画动画. 它仅仅是一个浏览器在每一帧渲染之间给予我们的一个切片时机.仅此而已.


node 单线程，非阻塞，应用场景，io密集型（文件读写），不适合处理cpu密集型（压缩、加密）
node中处理多个异步操作同一个文件的场景（靠队列实现）
可以解析js语法，服务端渲染vue、react
可以做中间层（主要解决跨越）
前端用node可以实现很多工具

node中this指的是[],存在一个global对象 _filename _dirname exports module require这五个变量可以直接使用
process：进程 { platform, cwd, env, argv, nextTick }
commender 命令行管家