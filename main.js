requirejs.config({
    paths: {
        backbone: 'vendor/backbone-1.0.0',
        'backbone.localStorage': 'vendor/backbone.localStorage-1.1.0',
        jquery: 'vendor/jquery-1.9.1',
        'jquery.mobile': 'vendor/jquery.mobile-1.3.0',
        json2: 'vendor/json2',
        text: 'vendor/text',
        underscore: 'vendor/underscore-1.4.4'
    },
    shim: {
        backbone: {
            deps: ['jquery', 'underscore', 'json2'],
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
        'jquery.mobile': {
            deps: ['jquery']
        },
        underscore: {
            exports: '_'
        }
    }
});

require([
    'jquery',
    'jquery.mobile'
    ],
    function($) {

    // Views reference DOM elements and should only be instantiated onReady.
    $(function() {
        // Prevent flash of unstyled content by hiding the body then showing
        // when jQuery is ready.
        $('body').show();

        // TODO: Finally time to do something.
    });
});
