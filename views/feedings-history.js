define([
    'backbone',
    'jquery',
    'underscore',
    'views/feeding'
    ],

function(Backbone, $, _, FeedingView) {

    var FeedingsHistory = Backbone.View.extend({
        el: 'ul#history',

        initialize: function() {
            this.collection.on('add', this.addFeeding, this);
        },

        render: function() {
            if (!this.collection.isEmpty()) {
                var that = this;
                // Show about a day's worth of feedings, ~10.
                var someFeedings = this.collection.last(10);
                _.each(someFeedings, function(feeding) {
                    that.addFeeding(feeding, 0);
                });
            }
            else {
                // FIXME: Make sure this works.
                $('#no-feedings').show();
            }
        },

        // Add a feeding to the view.
        addFeeding: function(feeding, duration) {
            var view = new FeedingView({model: feeding});
            // TODO: Should there be animation?
//            this.$el.prepend(view.render().$el.hide().fadeIn(duration));
            this.$el.prepend(view.render().$el.hide().fadeIn(duration)).
                listview('refresh');
        }
    });

    return FeedingsHistory;
});

