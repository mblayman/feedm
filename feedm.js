$(function() {
    // The basic unit of measure is a feeding.
    var Feeding = Backbone.Model.extend({});

    var Feedings = Backbone.Collection.extend({
        model: Feeding,
        localStorage: new Backbone.LocalStorage('Feedings')
    });
    var feedings = new Feedings;

    var FeedingsHistory = Backbone.View.extend({
        render: function() {
            console.log('I would have rendered');
            console.log(this.collection);
            return this;
        }
    });
    var feedingsHistory = new FeedingsHistory({collection: feedings});

    //var Router = Backbone.Router.extend({
    //    routes: {
    //        '': 'root'
    //    }
    //});
    //var router = new Router;
    //Backbone.history.start({pushState: true});

    // Kick things off and fetch the past feedings to display.
    feedings.on('reset', feedingsHistory.render, feedingsHistory);
    feedings.fetch();
});
