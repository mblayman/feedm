define([
    'backbone',
    'jquery',
    'underscore',
    'models/preferences',
    'text!templates/now-form.html',
    'jquery.mobile'
    ],

function(Backbone, $, _, Preferences, template) {
    var NowForm = Backbone.View.extend({
        el: 'ul#NowForm',

        initialize: function(options) {
            this.feedings = options.feedings;
        },

        events: {
            'click .add': 'add',
        },

        // Cache the template function.
        template: _.template(template),

        render: function() {
            this.$el.html(this.template({
                amounts: Preferences.amounts()
            }));
        },

        add: function(ev) {
            // Create a feeding from right now.
            feeding = {
                time: Date.now()
            };

            // Pull the data and pass along the unit type.
            var amount = parseInt($(ev.currentTarget).data().amount, 10);
            feeding[Preferences.unit()] = amount;

            this.feedings.addOne(feeding);

            // Go back to the main screen.
            history.back();
        }
    });

    return NowForm;
});

