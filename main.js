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
    'jquery',
    'models/feedings',
    'views/feedings-history',
    'views/now-form',
    'jquery.mobile'
    ],

function($, Feedings, FeedingsHistory, NowForm) {

    var feedings = new Feedings();

    // Views reference DOM elements and should only be instantiated onReady.
    $(function() {
        // TODO: Do I need a loading animation?

        var nowForm = new NowForm({feedings: feedings});
        nowForm.render();

        // 1. Render an li.
        // 2. Prepend to the list.
        // 3. Call $('feedings').listview('refresh')
        // 4. Do this from another page if it looks awkward.
        // Sample
//        $('#feedings').prepend($('<li/>', {    //here appending `<li>`
//            'data-icon': 'false'
//        }).append($('<a/>', {    //here appending `<a>` into `<li>`
//            'href': 'test.html',
//            'text': 'hello'
//        }))).listview('refresh');

        // Kick things off and fetch the past feedings to display.
        var feedingsHistory = new FeedingsHistory({collection: feedings});
        feedings.on('reset', feedingsHistory.render, feedingsHistory);
        feedings.fetch();

        // Prevent flash of unstyled content by hiding the body then showing
        // when jQuery is ready.
        $('body').show();

    });
});
