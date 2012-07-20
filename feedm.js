$(function() {
    //TODO: Put all the globals into a namespace like FEEDM.

    // The basic unit of measure is a feeding.
    var Feeding = Backbone.Model.extend({});

    var Feedings = Backbone.Collection.extend({
        model: Feeding,
        localStorage: new Backbone.LocalStorage('Feedings')
    });
    var feedings = new Feedings;

    var FeedingView = Backbone.View.extend({
        tagName: 'li',

        // Cache the template function.
        template: _.template($('#feeding-template').html()),

        // Display the date from the time (in milliseconds).
        date: function(time) {
            var date = new Date(time),
                month;
            month = date.getMonth() + 1;
            // XXX: This should be friendlier (like Yesterday, Monday, etc.)
            return date.getFullYear() + '-' + month + '-' + date.getDate()
        },

        // Get the readable time from the milliseconds.
        time: function(ms) {
            var d = new Date(ms),
                hour,
                meridiem;
            hour = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
            // Midnight should be 12 not 0.
            hour = hour === 0 ? 12 : hour;
            meridiem = d.getHours() > 12 ? 'pm' : 'am'
            return hour + ':' + d.getMinutes() + meridiem;
        },

        render: function() {
            var model = this.model.toJSON();
            console.log(model);
            model.date = this.date(model.time);
            model.time = this.time(model.time);
            this.$el.html(this.template(model));
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

    var Router = Backbone.Router.extend({
        routes: {
            'addNow': 'addNow',
            'addFrom': 'addFrom'
        },

        addNow: function() {
            // Show the view for adding something now.
            feedings.create({
                time: Date.now(),
                oz: 4,
                ml: 125,
                relativeSize: 'same'
            });
            console.log(feedings);
            alert('Adding now!');
        },

        addFrom: function() {
            alert('Adding sometime!');
        }
    });
    var router = new Router;
    Backbone.history.start();

    // Kick things off and fetch the past feedings to display.
    feedings.on('reset', feedingsHistory.render, feedingsHistory);
    feedings.fetch();
});
