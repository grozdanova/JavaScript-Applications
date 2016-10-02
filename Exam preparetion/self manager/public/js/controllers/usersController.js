var usersController = function () {
    function login(context) {
    templates.get('login')
      .then(function(template) {
        context.$element().html(template()); 
        $('#btn-login').on('click', function () {
            var user = {
                username: $('#tb-username').val(), 
                password: $('#tb-password').val()
            };
            data.users.login(user)
            .then(function () {
                toastr.success('User logged in!');
                context.redirect('#/');
            });
        });
      });
    }

    function register(context) {
    templates.get('register')
      .then(function(template) {
        context.$element().html(template()); 
        //atach events
        $('#btn-register').on('click', function () {
            var user = {
                username: $('#tb-username').val(),  //vzimame stoinostta ot inputa
                password: $('#tb-password').val()
            };
            data.users.register(user)
            .then(function () {
                toastr.success('User registred!');
            });
        });
      });
    }
    return {
        login: login,
        register: register
    };
}();