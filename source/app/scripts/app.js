/*!
 * PROJECTNAME
 * Main application file compiled with r.js via Grunt
 */
require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        'jquery': '../../../vendor/jquery.min',
        'jqueryScrollTo': '../../../vendor/jquery.scrollTo.min',
        'jqueryValidate': '../../../vendor/jquery.validate.min',

        /* Components
         ****************************/
        'consoleShim': 'components/consoleShim',
        'externalLinks': 'components/externalLinks',
        'menuPanel': 'components/menuPanel',
    },
    shim: {
        jquery: {
            exports: '$'
        }
    },
    deps: ['require', 'jquery'],
    callback: function(require, $) {
        'use strict';

        // Load all those common modules at once
        require(['consoleShim']);
        require(['jqueryScrollTo']);
        require(['jqueryValidate']);
        require(['externalLinks']);
        require(['menuPanel']);


        /* Load submodule
        ******************************************************/
        var filename = $('[data-main]').eq(0).data('module'),
            modulename;

        if (typeof filename !== 'undefined' && filename !== '') {
            modulename = [ 'pages', filename, 'main'].join('/');
            require([modulename]);
        } else {
            if (window.console) {
                console.info('no modulename found via data-module of requirejs.. idle');
            }
        }
    }
});