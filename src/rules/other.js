function callback(val, key, cb){
    return cb(val, cb);
}
module.exports = {
    callback: callback
}