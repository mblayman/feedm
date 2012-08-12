define([
    'backbone',
    'jquery',
    'underscore',
    'models/preferences',
    'text!templates/now-form.html'
    ],
    function(Backbone, $, _, Preferences, template) {
    var NowFormView = Backbone.View.extend({
        initialize: function(options) {
            this.controller = options.controller;
            this.feedings = options.feedings;
        },

        events: {
            'click .add': 'add',
            'click .cancel': 'cancel'
        },

        // Cache the template function.
        template: _.template(template),

        render: function() {
            this.$el.html(this.template({
                amounts: Preferences.amounts()
            }));
            return this;
        },

        add: function(ev) {
            // Pull the data and pass along the unit type.
            var amount = parseInt($(ev.currentTarget).data().amount, 10);
            feeding = {
                time: Date.now()
            };
            feeding[Preferences.unit()] = amount;
            this.feedings.addOne(feeding, Preferences.unit());

            this.controller.showButtons();
        },

        cancel: function() {
            this.controller.showButtons();
        }
    });

    return NowFormView;
});
