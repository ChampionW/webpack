export function curring(fn) {
    let arr = [];
    let inner = (params = []) => {
        arr.push(...params);
        return arr.length >= 2 ? fn(...arr) : (...arr) => {
            inner(arr);
        };
    };
   return inner();
}