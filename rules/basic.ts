import * as helpers from '../helpers';

let notBlankMsg = '{key} cannot be blank';
export function notBlank(){
    return function(val, key){
        if(val === '' || val === null || val === undefined){
            return helpers.place(notBlankMsg, {key: key});
        }
    }
}

let notNullMsg = '{key} cannot be null';
export function notNull(){
    return function(val, key){
        if(val === null || val === undefined){
            return helpers.place(notNullMsg, {key: key});
        }
    }
}

export function isTrue(val){
    return function(val){
        if(val !== true){
            return "is not a true value."
        }
    }
}


export function isFalse(){
    return function(val){
        if(val !== false){
            return "is not a false value."
        }
    }
}
function type(){

}

