"use strict";
var helpers = require("../helpers");
var notBlankMsg = '{key} cannot be blank';
function notBlank(val, key) {
    if (val === '' || val === null || val === undefined) {
        return helpers.place(notBlankMsg, { key: key });
    }
}
exports.notBlank = notBlank;
var notNullMsg = '{key} cannot be blank';
function notNull(val, key) {
    if (val === null || val === undefined) {
        return helpers.place(notBlankMsg, { key: key });
    }
}
exports.notNull = notNull;
function isTrue(val) {
    if (val !== true) {
        return "is not a true value.";
    }
}
exports.isTrue = isTrue;
function isFalse(val) {
    if (val !== false) {
        return "is not a false value.";
    }
}
exports.isFalse = isFalse;
function type() {
}
