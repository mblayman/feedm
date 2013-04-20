requirejs.config({
    paths: {
        backbone: 'vendor/backbone-1.0.0',
        'backbone.localStorage': 'vendor/backbone.localStorage-1.1.0',
        domReady: 'vendor/domReady',
        jquery: 'vendor/jquery-1.9.1',
        'jquery.mobile': 'vendor/jquery.mobile-1.3.0',
        json2: 'vendor/json2',
        text: 'vendor/text',
        underscore: 'vendor/underscore-1.4.4'
    },
    shim: {
        backbone: {
            deps: ['jquery', 'underscore', 'json2'],
            exports: 'Backbone',
            init: function($) {
                // Backbone is referencing $ directly in setElement and this is
                // blowing up during optimization. Therefore, set jQuery.
                // FIXME: With the new RequireJS, exports does not work like
                // it used to. I don't know if setDomLibrary is still needed.
                //Backbone.setDomLibrary($);
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
    'domReady',
    'jquery',
    'models/feedings',
    'views/feedings-history',
    'views/now-form',
    'jquery.mobile'
    ],

function(domReady, $, Feedings, FeedingsHistory, NowForm) {

    // Views reference DOM elements and should only be instantiated onReady.
    domReady(function() {

        var onDeviceReady = function(desktop) {
            if (desktop !== true)
                cordova.exec(null, null, 'SplashScreen', 'hide', []);

            var feedings = new Feedings();

            var nowForm = new NowForm({feedings: feedings});
            nowForm.render();

            // Kick things off and fetch the past feedings to display.
            var feedingsHistory = new FeedingsHistory({collection: feedings});
            feedings.on('reset', feedingsHistory.render, feedingsHistory);
            feedings.fetch({reset: true});

            // Prevent flash of unstyled content by hiding the body then
            // showing when jQuery is ready.
            $('body').show();
        };

        if (navigator.userAgent.match(/(iPad|iPhone|Android)/)) {
            // This is running on a device so waiting for deviceready event
            document.addEventListener('deviceready', onDeviceReady, false);
        } else {
            // On the desktop, there is nothing to wait for.
            onDeviceReady(true);
        }
    });
});
