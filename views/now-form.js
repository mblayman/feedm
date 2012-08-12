define([
    'backbone',
    'jquery',
    'underscore',
    'text!templates/now-form.html'
    ],
    function(Backbone, $, _, template) {
    var NowFormView = Backbone.View.extend({
        initialize: function(options) {
            // XXX: Should use a preferences object to get amounts and unit.
            this.controller = options.controller;
        },

        events: {
            'click .add': 'add',
            'click .cancel': 'cancel'
        },

        // Cache the template function.
        template: _.template(template),

        render: function() {
            var amounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            this.$el.html(this.template({
                amounts: amounts
            }));
            return this;
        },

        add: function() {
            //feedings.create({
            //    time: Date.now(),
            //    oz: 4,
            //    ml: 125,
            //    relativeSize: 'same'
            //});
            alert('added!');
            this.controller.showButtons();
        },

        cancel: function() {
            this.controller.showButtons();
        }
    });

    return NowFormView;
});
