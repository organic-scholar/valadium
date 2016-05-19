var helpers = require('../helpers');

function length(val, key, opts){
    if(val === undefined || val === '') return;
    if(val.length < opts.min){
        return key+' is too short use at least '+opts.min+' characters.';
    }
    if(val.length > opts.max ){
        return key+' too long '+opts.max+' charaters allowed';
    }
}

function email(val, key, opts){
    if(helpers.isBlank(val)) return;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(false == re.test(val)){
        return helpers.place(email.msg, {key: key});
    }
}
email.msg = '{key} is not valid email address';


module.exports = {
    length: length,
    email: email
};