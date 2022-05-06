// 抽象类： 抽象类是一种声明，但不能使用的类，当你使用的时候就会报错

var Car = function(){};
Car.prototype = {
    getPrice: function() {
        return new Error('抽象方法不能调用');
    },
    getSpeed: function() {
        return new Error('抽象方法不能调用');
    }
};