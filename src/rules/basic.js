var helpers = require('../helpers')
function notBlank(val, key){
    if(val === '' || val === null || val === undefined){
        return helpers.place(notBlank.msg, {key: key});
    }
}
notBlank.msg = '{key} cannot be balnk'

function notNull(val){
    if(val === null || val === undefined){
        return helpers.place(notBlank.msg, {key: key});
    }
}
notNull.msg = '{key} cannot be balnk'

function isTrue(val){
    if(val !== true){
        return "is not a true value."
    }
}


function isFalse(val){
    if(val !== false){
        return "is not a false value."
    }
}
function type(){

}


module.exports = {
    notBlank: notBlank,
    notNull: notNull,
    isTrue: isTrue,
    isFalse: isFalse,
    type: type
};
