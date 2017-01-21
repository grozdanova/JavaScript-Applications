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
                $('#login-hide').hide();
  
            });
        });
      });
    }

    function register(context) {
    templates.get('register')
      .then(function(template) {
        context.$element().html(template()); 
        $('#btn-register').on('click', function () {
            var user = {
                username: $('#tb-username').val(), 
                password: $('#tb-password').val()
            };
            if (!Validator.validateUser(user.username)) {
                        toastr.error('Username is not in the correct format!');
                        Cleaner.cleanInputs($('#tb-username'))
                        return;
            }
            if (!Validator.validatePassword(user.password)) {
                        toastr.error('Password is not in the correct format!');
                        Cleaner.cleanInputs($('#tb-password'))
                        return;
            }
            data.users.register(user)
            .then(function () {
                toastr.success('User registred!');
            });
        });
      });
    }
    function logout(context) {
        data.users.logout()
            .then(function(data) {
                toastr.success('Logged out');
                context.redirect('#/login');
                $('#login-hide').show();
                $('#logout-hide').hide();
            })
            .catch(function(err) {
                notifier.error(err);
            }); 
    }
    return {
        login: login,
        register: register,
        logout: logout
    };
}();