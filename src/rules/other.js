"use strict";
function callback(val, key, cb) {
    return cb(val, cb);
}
exports.callback = callback;
