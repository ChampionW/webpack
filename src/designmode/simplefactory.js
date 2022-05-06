// 简单工厂模式： 由一个工厂对象决定创建某一种产品对象类的实例
// 不用再关注创建这些对象到底依赖于哪个基类了，而我们只要知道这个函数就可以了。这个函数通常被称为工厂函数，也叫做简单工厂模式

var Basketball = function () {
    this.intro = '篮球盛于美国';
};
var FootBall = function () {
    this.intro = '足球在世界范围内都很流行';
};

// 运动工厂（售货员）
var sportFactory = function (name) {
    switch (name) {
        case 'NBA':
            return new Basketball();
        case 'wordcup':
            return new FootBall();
    }
};

export default sportFactory;
