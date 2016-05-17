function length(val, key, opts){
    if(val === undefined || val === '') return;
    if(val.length < opts.min){
        return 'Too short use at least '+opts.min+' characters.';
    }
    if(val.length > opts.max ){
        return 'Too long '+opts.max+' charaters ';
    }
}
function email(val, key, opts){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(false == re.test(val)){
        return 'This is not a valid email address';
    }
}


module.exports = {
    length: length,
    email: email
};