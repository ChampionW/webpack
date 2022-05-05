var SuperClass = (function () {
    var superStaticMode = true;
    function superInstance() {
        if (this instanceof superInstance) {
            this.superValue = 'superValue';
        } else {
            return new superInstance();
        }
    }
    superInstance.prototype.getMode = () => {
        return superStaticMode;
    };
    return superInstance;
})();
var SubClass = (function () {
    var superStaticMode = false;
    function subClass() {
        // instanceof 是通过判断对象的prototype链来确定这个对象是否是某个类的实例，而不关心对象与类的自身结构
        // 用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
        if (this instanceof subClass) {
            this.subValue = 'subValue';
        } else {
            return new subClass();
        }
    }
    // 但是这样的继承存在一个问题，当实例化出来的对象，修改了继承的原型对象上面的一个属性之后，也会影响到其他的原型对象属性值
    subClass.prototype = new SuperClass();
    subClass.prototype.getSubMode = () => {
        return superStaticMode;
    };
    return subClass;
})();
export default SubClass;