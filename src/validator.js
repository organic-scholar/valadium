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
        var result = rule(value, path, opts, data);
        return Promise.resolve(result);
    });

    return new Promise(function(resolve, reject){
        Promise.all(results).then(function(errors){
            return errors.filter(function(error){
                return error != undefined;
            });
        }).then(function(errors){
            errors.length == 0 ? resolve(): reject(errors);
        });
    });

};

validator.validate = function(data, rules){

    data = data || {};

    var errors = {};

    var results = Object.keys(rules).map(function (key) {

        var val = helpers.getIn(data, key);

        return new Promise(function(resolve, reject){
            validator.only(val, key, rules[key],data).then(
                function(){
                    resolve();
                },
                function(errors){
                    helpers.setIn(errors, key, errors);
                    resolve();
                });
        });

    });

    return new Promise(function(resolve, reject){
        Promise.all(results).then(function(){
            if(Object.keys(errors).length == 0){
                return resolve();
            }
            reject(errors);
        });
    });
};

validator.register = function(name, func){
    if(typeof func === 'function'){
        validator.rules[name] = func;
    }
};


function registerMany(validators){
    Object.keys(validators).forEach(function(name){
        validator.register(name, validators[name]);
    });
}

var basic = require('./rules/basic');
var string = require('./rules/string');

[basic, string].forEach(function(validators){
    registerMany(validators);
});

validator.helpers = helpers;

module.exports = validator;