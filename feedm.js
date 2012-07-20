$(function() {
    // The basic unit of measure is a feeding.
    var Feeding = Backbone.Model.extend({});

    var Feedings = Backbone.Collection.extend({
        model: Feeding,
        localStorage: new Backbone.LocalStorage('Feedings')
    });
    var feedings = new Feedings;

    var FeedingView = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#feeding-template').html()),
        render: function() {
            // TODO: Add li in ul.
            return this;
        }
    });

    var FeedingsHistory = Backbone.View.extend({
        el: 'ul',
        id: 'history',
        render: function() {
            if (this.collection.isEmpty()) {
                $('#no-feedings').show();
                return this;
            }

            var self = this;

            // Show about a day's worth of feedings, ~10.
            var someFeedings = this.collection.first(10);
            _.each(someFeedings, function(feeding) {
                var view = new FeedingView({model: feeding});
                self.$el.append(view.render().el);
            });

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
