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
                //amounts: Preferences.amounts()
                amounts: [1, 2, 3, 4, 5, 6, 7, 8]
            }));
            return this;
        },

        add: function(ev) {
            alert('You added a feeding');
            // Pull the data and pass along the unit type.
//            var amount = parseInt($(ev.currentTarget).data().amount, 10);
//            feeding = {
//                time: Date.now()
//            };
//            feeding[Preferences.unit()] = amount;
//            this.feedings.addOne(feeding, Preferences.unit());
        }
    });

    return NowForm;
});
