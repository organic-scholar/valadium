var validator = require('../src/index');

validator.validate({username: 'h'}, {username: {notBlank: true}}).then(function(errors){
    console.log(errors);
});


