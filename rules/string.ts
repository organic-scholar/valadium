import * as helpers from '../helpers';

export function length(min:number, max:number){
    return function(val, key){
        if(helpers.isBlank(val)) return;
        if(val.length < min){
            return key+' is too short use at least '+min+' characters.';
        }
        if(val.length > max ){
            return key+' too long '+max+' characters allowed';
        }
    }
}

let emailMsg = '{key} is not valid email address';
function email(){
    return function(val, key){
        if(helpers.isBlank(val)) return;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(false == re.test(val)){
            return helpers.place(emailMsg, {key: key});
        }
    }
}


