import * as handlebars from 'handlebars';

let loader = (function () {

    let cache = {};

    function get(templateName) {
        return new Promise(function (resolve, reject) {
            let url = `/handlebars/${templateName}.handlebars`;
            if (cache[templateName]) {
                resolve(cache[templateName]);
            } else {
                $.get(url, function (templateHTML) {
                    let template = handlebars.compile(templateHTML);
                    cache[templateName] = template;
                    resolve(template);
                })
            }
        });
    }

    return {
        get
    }
} ());

export { loader };