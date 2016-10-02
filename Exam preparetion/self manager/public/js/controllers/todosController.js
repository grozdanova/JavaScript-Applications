var todosController = function () {
    function all(context) {
//vzimame query parametrite - /toos?category=free time
        var category = context.params.category;
        if(category){
            category = category.toLowerCase();
        }
        var todos;
        data.todos.get()
        .then(function (resTodos) {
//sled kato vidqhme, 4e vrushtaniq obekt ima propurti result go dobavqme. Ina4e nqma da se vizualizira
            todos = resTodos.result;
            return templates.get('todos');
        })
        .then(function (template) {
//pravim grupiraneto s lodash i veche podavame na teplata ne todos, a groups
 var groups = _.chain(todos).groupBy('category')
    .map(function (todos, categoryName) {
        return {
            category: categoryName,
            todos: todos
        };
    })
    .filter(function(group){
        return !category || group.category.toLowerCase() === category;
    })
    .value();
            context.$element().html(template(groups));
//dobavqme event na checkbox
        $('.todo-state').on('change', function () {
            var id = $(this).parents('.todo-item').attr('data-id');
            var state = !!$(this).prop('checked');
            data.todos.updateState(id, state)
            .then(function () {
                toastr.success('State updated!');
            });
        });
        });
    }

    function add(context) {
        templates.get('todo-add')
        .then(function(template){
        context.$element().html(template());
        //zakachame event
            $('#btn-todo-add').on('click', function(){
//vzimame stoinostta ot formata
                var todo = {
                    text: $('#tb-todo-text').val(),
                    category: $('#tb-todo-category').val()
                };
                
                data.todos.add(todo)
                .then(function(todo){
                    todo = todo.result;
                    toastr.success('TODO '+ todo.text + ' added!');
                    context.redirect('#/todos');
                });
            });
//dobavqme autocomplete 
            return data.categories.get();
        }).then(function(categories){
            $('#tb-todo-category').autocomplete({
            source: categories.result
        });
        });
    }
    return {
        all: all,
        add: add
    };
}();