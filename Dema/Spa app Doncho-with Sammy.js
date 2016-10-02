// var sammyApp = Sammy('#content', function () {
//     //butonite si stoqt, smenqme samo contenta na diva
//     // this.get('#/', function () {
//     //     $('#content').html('Home');
//     // });
//     // this.get('#/details', function () {
//     //     $('#content').html('Details');
//     // });
//     this.get('#/', function () {
//         this.redirect('#/home');
//     });
//     this.get('#/home', function () {
//         $('#content').html('Home');
//     });
//     this.get('#/items', function () {
//         //moje da se podava query parametur
//         //.html#/items?page=2&size=10
//         //tova e pageirane
//         var page = this.params.page,
//         size = this.params.size;
//         console.log(page, size);

//         var items = ['1', '2', '3'];
//         items.forEach(function (item) {
//             $('<a />').css('display', 'block')
//             .attr('href', '#/items/' + item)
//             .html('Go to item ' + item)
//             .appendTo('#content');
//         });
//     });
//     this.get('#/items/:id', function () {
//         $('#content').html('Items with id ' + this.params.id);
//     });
// });
//Demo 2
var db = function () {
    var items = [{name: 'John', id: 1000}, {name: 'Jane', id: 1001}, {name: 'Pesho', id: 1002}];
    function get() {
        return new Promise((resolve, reject) => {
            resolve({result: items});
        });
    }
    //su6toto no s Ajax
    function getAjax() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'api/items',
                method: 'GET',
                contentType: 'application/json',
                success: (res) => {
                    resolve(res);
                },
                error: (err) => {
                    reject(err);
                }
            });
            resolve({
                result: items,
                length: items.length
                });
        });
    }
    function getById(id) {
        return new Promise((resolve, reject) => {
            for (var i = 0; i < items.length; i+=1) {
                if (items[i].id === id) {
                    resolve({
                        result: items[i]}
                    );
                    return;
                }             
            }
            reject({
                msg: 'Invalid id'
            });
        });
    }
    var lastId = 0;
    function save(obj) {
        return new Promise((resolve, reject) => {
            obj.id = lastId +=1;
            items.push(obj);
            resolve(obj);
        });
    }

   return {
       get: get,
       getById: getById,
       save: save
   };
}();
var sammyApp = Sammy('#content', function () {
    this.get('#/', function () {
        this.redirect('#/home');
    });
    this.get('#/home', function () {
        $('#content').html('Home');
    });
    this.get('#/items', function () {
        db.get()
        .then(function (res) {
            var items = res.result;
            var $container = $('<div />');
            items.forEach(function (item) {
            $('<a />')
            .css('display', 'block')
            .attr('href', '#/items/' + item.id)
            .html(item.name)
            .appendTo($container);
            });
            $('#content').html($container.html());
        });
    });
    this.get('#/items/:id', function () {
        db.getById(this.params.id)
        .then(function (res) {
            $('#content').html(
                $('<h1 />')
                .html(res.result.name)
                .html()
            );
        });
    });

});
$(function() {
    sammyApp.run('#/');
});
