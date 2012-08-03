define([
    'backbone',
    'jquery',
    'views/now-form'
    ],
    function(Backbone, $, NowFormView) {

    // The view that contains all the controls and entry forms.
    var ControllerView = Backbone.View.extend({
        el: '#controller',

        events: {
            'click #addNow': 'showAddNow',
            'click #addFrom': 'addFrom'
        },

        initialize: function() {
            this.buttons = $('#buttons');
        },

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

    return ControllerView;
});
