(function () {
    var sammyApp = Sammy('#content', function () {
        this.get('#/', function(){
            this.redirect('#/home');
        });
        this.get('#/home', homeController.all);
        this.get('#/login', usersController.login);
        this.get('#/register', usersController.register);
        this.get('#/logout', usersController.logout);

        this.get('#/materials', homeController.all);
        this.get('#/materials/:id', homeController.get);
        this.get('#/materials/add', homeController.add);

        this.get('#/profiles', profilesController.all);
        this.get('#/profiles/:username', profilesController.get);

    });
    $(function () {
        sammyApp.run('#/');
    });
}());