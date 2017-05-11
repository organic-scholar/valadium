export function callback(cb:Function){
    return function(val, key:string){
        return cb(val, cb);
    }
}
