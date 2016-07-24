function isBlank(val){
    if(val === '' || val === null || val === undefined){
        return true;
    }
    return false;
}
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

place = function (str, o) {
    return str.replace(
        /{([^{}]*)}/g, 
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};


module.exports = {
    getIn: getIn,
    setIn: setIn,
    place: place,
    isBlank: isBlank,
}
