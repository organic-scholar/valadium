"use strict";
function isBlank(val) {
    return val === '' || val === null || val === undefined;
}
exports.isBlank = isBlank;
function getIn(obj, path) {
    for (var i = 0, p = path.split('.'), len = path.length; i < len; i++) {
        obj = obj[p[i]];
    }
    return obj;
}
exports.getIn = getIn;
function setIn(obj, path, value) {
    var current = obj;
    var stack = path.split('.');
    while (stack.length > 1) {
        var i = stack.shift();
        if (current[i] == undefined) {
            current[i] = {};
        }
        current = current[i];
    }
    current[stack.shift()] = value;
    return obj;
}
exports.setIn = setIn;
function place(str, o) {
    return str.replace(/{([^{}]*)}/g, function (a, b) {
        var r = o[b];
        return typeof r === 'string' || typeof r === 'number' ? r : a;
    });
}
exports.place = place;
