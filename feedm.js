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
    'jquery',
    'models/feedings',
    'views/controller',
    'views/feedings-history'
    ],
    function($, Feedings, ControllerView, FeedingsHistory) {

    // Views reference DOM elements and should only be instantiated onReady.
    $(function() {
        var feedings = new Feedings();

        // Create a controller so Backbone can handle the button events.
        var controller = new ControllerView({feedings: feedings});

        // Kick things off and fetch the past feedings to display.
        var feedingsHistory = new FeedingsHistory({collection: feedings});
        feedings.on('reset', feedingsHistory.render, feedingsHistory);
        feedings.fetch();
    });
});
