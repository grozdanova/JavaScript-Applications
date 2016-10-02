SystemJS.config({
    // tell SystemJS which transpiler to use
    transpiler: 'plugin-babel',
    // tell SystemJS where to look for the dependencies
    map: {
        'plugin-babel':
        './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build':
        './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        'navigo': './node_modules/navigo/lib/navigo.js',
        // app start script
        'main': './scripts/main.js',
        'handlebars': './../node_modules/handlebars/dist/handlebars.min.js',
        'routing': './scripts/routing.js',
        'data': './scripts/data.js',
        'template-loader': './scripts/template-loader.js'
    }
});


