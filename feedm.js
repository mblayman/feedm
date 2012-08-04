requirejs.config({
    paths: {
        jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min'
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
    'models/feedings',
    'views/controller',
    'views/feedings-history'
    ],
    function(Feedings, ControllerView, FeedingsHistory) {

    // Views reference DOM elements and should only be instantiated onReady.
    $(function() {
        // Create a controller so Backbone can handle the button events.
        var controller = new ControllerView();

        // Kick things off and fetch the past feedings to display.
        var feedings = new Feedings();
        var feedingsHistory = new FeedingsHistory({collection: feedings});
        feedings.on('reset', feedingsHistory.render, feedingsHistory);
        feedings.fetch();
    });
});
