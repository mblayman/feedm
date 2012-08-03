define([
    'backbone',
    'jquery',
    'underscore',
    'views/feeding'],
    function(Backbone, $, _, FeedingView) {

    var FeedingsHistory = Backbone.View.extend({
        el: 'ul#history',

        initialize: function() {
            this.collection.on('add', this.addFeeding, this);
        },

        render: function() {
            if (this.collection.isEmpty()) {
                $('#no-feedings').show();
                return this;
            }

            var self = this;
            // Show about a day's worth of feedings, ~10.
            var someFeedings = this.collection.last(10);
            _.each(someFeedings, function(feeding) {
                self.addFeeding(feeding, 0);
            });

            return this;
        },

        // Add a feeding to the view.
        addFeeding: function(feeding, duration) {
            var view = new FeedingView({model: feeding});
            this.$el.prepend(view.render().$el.hide().fadeIn(duration));
        }
    });

    return FeedingsHistory;
});
