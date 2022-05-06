// 安全的工厂方法
var Factory = function (type, content) {
    if (this instanceof Factory) {
        return new this[type](content);
    } else {
        return new Factory(type,content);
    }
};
Factory.prototype.Java = function (content) { 
    // 此时的this指的是new出来的实例对象，而并不是指的是Factory
    console.log(this);
    this.content = content;
    this.type = 'testJava';
};
Factory.prototype.PHP = function (content) { 
    this.content = content;
};
export default Factory;