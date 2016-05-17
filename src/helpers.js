function getIn(obj, path){
    for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
        obj = obj[path[i]];
    }
    return obj;
}
function setIn(obj, path, value) {
    var current = obj;
    var stack = path.split('.');

    while ( stack.length > 1 ) {
        var i = stack.shift();
        if(current[i] == undefined){
            current[i] = {};
        }
        current = current[i];
    }
    current[stack.shift()] = value;

    return obj;
}

module.exports = {
    getIn: getIn,
    setIn: setIn,
}
