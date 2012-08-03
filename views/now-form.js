define([
    'backbone',
    'jquery',
    'underscore',
    'text!templates/now-form.html'
    ],
    function(Backbone, $, _, template) {
    var NowFormView = Backbone.View.extend({
        initialize: function(options) {
            this.controller = options.controller;
        },

        events: {
            'click .add': 'add',
            'click .cancel': 'cancel'
        },

        // Cache the template function.
        template: _.template(template),

        render: function() {
            this.$el.html(this.template());
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
