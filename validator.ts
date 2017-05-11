import * as helpers from './helpers';

export function only(value:any, path:string, validators:Array<Function>, data:any){
    let result = validators.map((v)=>{
        return Promise.resolve(v(value, path, data));
    });
    return new Promise(function(resolve, reject){
        Promise.all(result).then(function(errors){
            return errors.filter(function(error){
                return error != undefined;
            });
        }).then(function(errors){
            errors.length == 0 ? resolve(): reject(errors);
        });
    });

}

export function validate(data:any, rules){

    data = data || {};

    let errors = {};

    let results = Object.keys(rules).map(function (key) {

        let val = data[key];

        return new Promise(function(resolve, reject){
            only(val, key, rules[key], data).then(
                function(){
                    resolve();
                },
                function(e){
                    helpers.setIn(errors, key, e);
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

// validator.register = function(name, func){
//     if(typeof func === 'function'){
//         validator.rules[name] = func;
//     }
// };


// function registerMany(validators){
//     Object.keys(validators).forEach(function(name){
//         validator.register(name, validators[name]);
//     });
// }
//
// [basic, string].forEach(function(validators){
//     registerMany(validators);
// });
