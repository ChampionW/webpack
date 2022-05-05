/**
 * 面向对象编程，就是将你的需求抽象成一个对象，然后针对这个对象分析其特征(属性与动作【方法】)
 */
var checkObject = (function () {
    // 静态公有属性
    var mode = 'test2';
    function Check() {
        // 私有属性
        var id = 1;
        // 私有方法
        var checkId = () => {
            console.log('验证id', id, this, mode);
        };
        // this类型的判断，以防止使用这个类的时候，没有采用new形式
        if (this instanceof Check) {
            // 对象公有属性与方法
            this.checkName = () => {
                console.log('验证姓名');
            };
            this.checkEmail = () => {
                console.log('验证邮箱', this);
                // 如果需要进行链式调用的时候
                return this;
            };
            this.getId = () => {
                checkId();
            };
        }else{
            return new Check();
        }
    }
    // 这个地方如果使用到this，尽量不要使用箭头函数的形式，会导致this丢失的问题
    Check.prototype.checkUsrname = function () {
        console.log('验证用户名称', this);
    };
    return Check;
})();
// 静态公有属性
// checkObject.mode = 'test';

export default checkObject;