import * as helpers from '../helpers';

let notBlankMsg = '{key} cannot be blank';
export function notBlank(val, key){
    if(val === '' || val === null || val === undefined){
        return helpers.place(notBlankMsg, {key: key});
    }
}

let notNullMsg = '{key} cannot be blank';
export function notNull(val, key){
    if(val === null || val === undefined){
        return helpers.place(notBlankMsg, {key: key});
    }
}

export function isTrue(val){
    if(val !== true){
        return "is not a true value."
    }
}


export function isFalse(val){
    if(val !== false){
        return "is not a false value."
    }
}
function type(){

}

