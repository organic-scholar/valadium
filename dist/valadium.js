(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.valadium = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function isBlank(val){
    if(val === '' || val === null || val === undefined){
        return true;
    }
    return false;
}
function getIn(obj, path){
    for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
        obj = obj[path[i]];
    }
    return obj;
}
function setIn(obj, path, value) {
    var current = obj;
    var stack = path.split('.');

    while ( stack.length > 1 ) {
        var i = stack.shift();
        if(current[i] == undefined){
            current[i] = {};
        }
        current = current[i];
    }
    current[stack.shift()] = value;

    return obj;
}

place = function (str, o) {
    return str.replace(
        /{([^{}]*)}/g, 
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};


module.exports = {
    getIn: getIn,
    setIn: setIn,
    place: place,
    isBlank: isBlank,
}

},{}],2:[function(require,module,exports){
module.exports =  require('./validator');
},{"./validator":5}],3:[function(require,module,exports){
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

},{"../helpers":1}],4:[function(require,module,exports){
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
},{"../helpers":1}],5:[function(require,module,exports){
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

validator.helpers = helpers;
module.exports = validator;
},{"./helpers":1,"./rules/basic":3,"./rules/string":4}]},{},[2])(2)
});