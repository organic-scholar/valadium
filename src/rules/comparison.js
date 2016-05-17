function equalTo(val, key, opt){
    if(val != opt){
        return 'not equal to '+opt
    }
}
function identicalTo(val, key, opt){
    if(val !== opt){
        return 'not equal to '+opt
    }
}

module.exports = {
    equalTo: equalTo,
    identicalTo: identicalTo,
};
