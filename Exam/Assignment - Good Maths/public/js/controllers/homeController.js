var homeController = function () {
    function add(context) {
        templates.get('material-add')
        .then(function(template){
        context.$element().html(template());

            $('#btn-material-add').on('click', function(){
                var material = {
                    title: $('#tb-material-title').val(),
                    description: $('#tb-material-desc').val()
                };  
                console.log(material);          
                data.materials.add(material)
                .then(function(material){
                    material = material.result;
                    toastr.success('Material '+ material.title + ' added!');
                    context.redirect('#/materials');
                });
            });
        });
    }

    function all(context) {
        var filter = context.params.filter;
        if(filter){
            filter = filter.toLowerCase();
        }
        var materials;
        data.materials.get()
        .then(function (resMaterials) {
        materials = resMaterials.result;
           return templates.get('home');
        })
        .then(function(template){
            context.$element().html(template(materials));
        });     
    }
    function getCurrent(context) {
        var materials;
        var id;
        $('#title').on('click', function () {
            id = $(this).parents('.item').attr('data-id');
        });
        console.log(id);
        data.materials.getById()
        .then(function (resMaterials) {
            console.log(resMaterials.id);
        materials = resMaterials.result;
        console.log(materials);
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