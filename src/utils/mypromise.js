

const PENDING = 'PENDING'; // 等待
const FULFILLED = 'FULFILLED'; // 成功
const REJECTED = 'REJECTED'; // 失败
/**
 * 
 * @param {*} x 
 * @param {*} promise2 
 * @param {*} resolve 
 * @param {*} reject 
 */
function resolvePromise(x, promise2, resolve, reject) {
    // 如果x是一个普通的值，则直接调用resolve即可

    // 如果x是一个promise，则应该采用promise的状态决定调用的是resolve还是reject
}
class MyPromise {
    /**
     * 
     * @param {*} executor 执行器
     */
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolveCallBacks = [];
        this.onRejectedCallBacks = [];
        const resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value;
                this.status = FULFILLED;
                // 发布
                this.onResolveCallBacks.forEach(fn => fn());
            }
        };
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED;
                // 发布
                this.onRejectedCallBacks.forEach(fn => fn());
            }
        };
        try {
            executor(resolve, reject);// 默认new Promise()执行
        } catch (e) {
            reject(e);
        }
    }
    // 可以在then方法（成功和失败中）,返回一个promise，promise会采用返回的promise的成功的值或者失败原因，传递到外层下一次then中
    // then方法中，成功的或者失败的回调返回一个普通值（不是promise）,会将返回的结果传递到下一次then的成功中去
    // then方法中报错的话，将会走下一层then方法的失败中去
    then(onFulfilled, onRejected) {
        // 每次调用then方法都会返回一个全新的promise
        let promise2 = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        // resolve(x);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        // resolve(x);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);

            }
            // 非同步的情况，暂存成功与失败的回调
            if (this.status === PENDING) {
                // 发布订阅模式
                // 订阅
                // 注意push的时候一定要用箭头函数，这样可以保存住this的指向，如果用正常的函数形式，将会导致this丢失
                this.onResolveCallBacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            // resolve(x);
                            resolvePromise(x, promise2, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
                this.onRejectedCallBacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            // resolve(x);
                            resolvePromise(x, promise2, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
            }
        });
        return promise2;
    }
}
export default MyPromise;