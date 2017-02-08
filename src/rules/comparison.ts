export function equalTo(val, key, opt){
    if(val != opt){
        return 'not equal to '+opt
    }
}
export function identicalTo(val, key, opt){
    if(val !== opt){
        return 'not equal to '+opt
    }
}

