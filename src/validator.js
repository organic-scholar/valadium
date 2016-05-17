var helpers = require('./helpers');

var validator = {
    rules: {}
};

validator.only = function(value, path, rules, data){


    var results = Object.keys(rules).map(function(key){
        if(!validator.rules.hasOwnProperty(key)){
            throw new Error('validator '+key+' is not registered');
        }
        var rule = validator.rules[key];
        var opts = rules[key];
        var result = rule(value, path, opts);
        return Promise.resolve(result);
    });

    return Promise.all(results).then(function(errors){
        return errors.filter(function(error){
            return error != undefined;
        });

    });
    
};

validator.validate = function(data, rules){

    data = data || {};

    var errors = {};

    var results = Object.keys(rules).map(function (key) {

        var val = helpers.getIn(data, key);

        return validator.only(val, key, rules[key],data).then(function(err){
            if(err.length == 0) return;
            helpers.setIn(errors, key, err);
            return err;
        });
    });

    return new Promise(function(resolve, reject){
        Promise.all(results).then(function(){
            if(Object.keys(errors).length == 0){
                return resolve(false);
            }
            resolve(errors);
        });
    });
};


validator.register = function(validators){
    Object.keys(validators).forEach(function(name){
        var v = validators[name];
        if(typeof v === 'function'){
            validator.rules[name] = v;
        }
    });
};


var basic = require('./rules/basic');
var string = require('./rules/string');

[basic, string].forEach(function(validators){
    validator.register(validators);
});

module.exports = validator;