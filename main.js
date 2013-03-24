requirejs.config({
    paths: {
        backbone: 'vendor/backbone',
        'backbone.localStorage': 'vendor/backbone.localStorage',
        jquery: 'vendor/jquery',
        text: 'vendor/text',
        underscore: 'vendor/underscore'
    },
    shim: {
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: function($) {
                // Backbone is referencing $ directly in setElement and this is
                // blowing up during optimization. Therefore, set jQuery.
                Backbone.setDomLibrary($);
                return Backbone;
            }
        },
        'backbone.localStorage': {
            deps: ['backbone'],
            exports: 'Backbone.LocalStorage'
        },
        underscore: {
            exports: '_'
        }
    }
});

require([
    'jquery'
    ],
    function($) {

    // Views reference DOM elements and should only be instantiated onReady.
    $(function() {
        // TODO: Finally time to do something.
    });
});
