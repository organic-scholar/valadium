var validator = require('../src/index');
console.log(validator);

validator.validate({username: 'h'}, {username: {notBlank: true}}).then(function(errors){
    console.log(errors);
});


