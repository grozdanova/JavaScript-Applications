var profileController = function () {
    function all(context) {
    var profiles;
        data.profiles.all()
        .then(function (resMaterials) {
            console.log(resMaterials);
        profiles = resMaterials.result;
           return templates.get('profiles');
        })
        .then(function(template){
            context.$element().html(template(profiles));
        });   
    }
    function getCurrent(context) {
         var profiles;

        data.profiles.get()
        .then(function (resMaterials) {

        profiles = resMaterials.result;
        console.log(profiles);
           return templates.get('home');
        })
        .then(function(template){
            context.$element().html(template(material));
        }); 
           
    }

    return {
        all: all,
        get: getCurrent
    };
}();