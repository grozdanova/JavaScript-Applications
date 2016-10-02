import 'navigo';
import { loader } from 'template-loader';
import {data} from './data.js';

let router = (function () {

    function init() {
        let navigo = new Navigo(null, false);

        navigo
            .on('/gallery', function () {
                Promise.all([data.gallery.get(), loader.get('gallery')])
                    .then(([data, template]) => {
                        $('#content').html(template(data));
                    })

            })
            .on('/threads/:id', function (params) {
                Promise.all([data.threads.getById(params.id), loader.get('messages')])
                    .then(([data, template]) => {
                        console.log(data);
                        $('#content').append(template(data));
                    })
            })
            .on('/threads', function () {
                Promise.all([data.threads.get(), loader.get('threads')])
                    .then(([data, template]) => {
                        $('#content').html(template(data));
                    })
            })
            .resolve();
    }

    return {
        init
    }

} ());

export { router };