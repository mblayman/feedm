requirejs.config({
    paths: {
        backbone: 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min',
        'backbone.localStorage': 'backbone.localStorage-min',
        jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min',
        underscore: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min'
    },
    shim: {
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'backbone.localStorage': {
            deps: ['backbone'],
            exports: 'Backbone.LocalStorage'
        },
        jquery: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        }
    }
});

require([
    'models/feedings',
    'views/controller',
    'views/feedings-history',
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
