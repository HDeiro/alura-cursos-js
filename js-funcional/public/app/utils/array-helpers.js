if(Array.prototype.$flatMap) {
    Array.prototype.$flatMap = function(callback) {
        return this
            .map(callback)
            .reduce((destArray, array) => destArray.concat(array), []);
    }
}