define([
    'backbone',
    'jquery',
    'underscore',
    'date',
    'text!templates/feeding.html'
    ],

function(Backbone, $, _, Date, template) {

    var FeedingView = Backbone.View.extend({
        tagName: 'li',

        attributes: {
            'data-icon': 'false'
        },

        // Cache the template function.
        template: _.template(template),

        render: function() {
            var model = this.model.toJSON();
            model.date = Date.date(model.time);
            model.time = Date.time(model.time);

            if (this.model.get('relativeSize') === 'bigger') {
                this.$el.data('icon', 'arrow-u');
            }
            else if (this.model.get('relativeSize') === 'smaller') {
                this.$el.data('icon', 'arrow-d');
            }

            this.$el.html(this.template(model));
            return this;
        }
    });

    return FeedingView;
});
