"use strict";
function equalTo(val, key, opt) {
    if (val != opt) {
        return 'not equal to ' + opt;
    }
}
exports.equalTo = equalTo;
function identicalTo(val, key, opt) {
    if (val !== opt) {
        return 'not equal to ' + opt;
    }
}
exports.identicalTo = identicalTo;
