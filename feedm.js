requirejs.config({
    paths: {
        backbone: 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min',
        'backbone.localStorage': 'backbone.localStorage-min',
        jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min',
        underscore: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min'
    },
    shim: {
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'backbone.localStorage': {
            deps: ['backbone'],
            exports: 'Backbone.LocalStorage'
        },
        jquery: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        }
    }
});

require([
    'date',
    'backbone',
    'jquery',
    'underscore',
    'backbone.localStorage'],
    function(Date, Backbone, $, _) {

$(function() {
    // The basic unit of measure is a feeding.
    var Feeding = Backbone.Model.extend({});

    var Feedings = Backbone.Collection.extend({
        model: Feeding,
        localStorage: new Backbone.LocalStorage('Feedings')
    });
    var feedings = new Feedings();

    var FeedingView = Backbone.View.extend({
        tagName: 'li',
        className: 'feeding',

        // Cache the template function.
        template: _.template($('#feeding-template').html()),

        render: function() {
            var model = this.model.toJSON();
            model.date = Date.date(model.time);
            model.time = Date.time(model.time);
            this.$el.html(this.template(model));
            return this;
        }
    });

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
    var feedingsHistory = new FeedingsHistory({collection: feedings});

    var NowFormView = Backbone.View.extend({
        initialize: function(options) {
            this.controller = options.controller;
        },

        events: {
            'click .add': 'add',
            'click .cancel': 'cancel'
        },

        // Cache the template function.
        template: _.template($('#now-template').html()),

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

    // The view that contains all the controls and entry forms.
    var ControllerView = Backbone.View.extend({
        el: '#controller',

        events: {
            'click #addNow': 'showAddNow',
            'click #addFrom': 'addFrom'
        },

        buttons: $('#buttons'),

        // When the buttons are hidden, this animates them back.
        showButtons: function() {
            var self = this;
            var form = this.buttons.next();
            form.fadeOut('fast', function() {
                // The form is done so remove it from the DOM.
                form.remove();
                self.$el.animate({height: self.buttons.height()}, {
                    complete: function() {
                        self.buttons.fadeIn('fast');
                    },
                    duration: 'fast'
                });
            });
        },

        // Generic method for showing a form.
        showForm: function(formView) {
            var self = this;
            this.buttons.fadeOut('fast', function() {
                var view = new formView({controller: self});
                self.$el.append(view.render().$el.hide());
                self.$el.animate({height: view.$el.height()}, {
                    complete: function() {
                        self.buttons.hide();
                        view.$el.fadeIn('fast');
                    },
                    duration: 'fast'
                });
            });
            return;
        },

        // Show the view for adding something now.
        showAddNow: function() {
            this.showForm(NowFormView);
            return;
        },

        addFrom: function() {
            alert('Adding sometime!');
        }
    });
    var controllerView = new ControllerView();

    // Kick things off and fetch the past feedings to display.
    feedings.on('reset', feedingsHistory.render, feedingsHistory);
    feedings.fetch();
});
});
