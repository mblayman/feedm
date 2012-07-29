// Extend Date to return some human readable dates and times.

// Check to see if the two dates match.
Date.datesMatch = function(date, anotherDate) {
    return date.getFullYear() === anotherDate.getFullYear() &&
           date.getMonth() === anotherDate.getMonth() &&
           date.getDate() === anotherDate.getDate();
};

// Display the date from the time (in milliseconds).
Date._date = function(time) {
    var date = new Date(time),
        month;
    month = date.getMonth() + 1;
    return date.getFullYear() + '-' + month + '-' + date.getDate();
};

Date.date = function(time) {
    var delta,
        msPerDay = 86400000,
        now = Date.now(),
        then = new Date(time),
        today,
        yesterday;
    delta = now - time;
    today = new Date(now);
    // Subtracting a day's worth of milliseconds put the date into yesterday.
    yesterday = new Date(now - msPerDay);

    if (Date.datesMatch(today, then)) {
        return 'Today';
    }
    else if (Date.datesMatch(yesterday, then)) {
        return 'Yesterday';
    }
    else if (delta < (msPerDay * 7)) {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
            'Friday', 'Saturday'];
        var day = new Date(time);
        return days[day.getDay()];
    }
    else {
        return Date._date(time);
    }
};

// Get the readable time from the milliseconds.
Date.time = function(ms) {
    var d = new Date(ms),
        hour,
        meridiem,
        minutes;
    hour = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
    // Midnight should be 12 not 0.
    hour = hour === 0 ? 12 : hour;
    meridiem = d.getHours() > 12 ? 'pm' : 'am';
    minutes = d.getMinutes() <= 9 ? '0' + d.getMinutes() : d.getMinutes();
    return hour + ':' + minutes + meridiem;
};

$(function() {
    //TODO: Put all the globals into a namespace like FEEDM.

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

        // Cache the template function.
        template: _.template($('#now-template').html()),

        render: function() {
            this.$el.html(this.template());
            return this;
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

        // Generic method for showing a form.
        showForm: function(formView) {
            this.buttons.animate({opacity: 0}, 'fast');
            var view = new formView({controller: this});
            this.$el.append(view.render().$el.hide());
            this.$el.animate({height: view.$el.height()});
            this.buttons.hide();
            view.$el.fadeIn();
            return;
        },

        // Show the view for adding something now.
        showAddNow: function() {
            this.showForm(NowFormView);
            return;
            //feedings.create({
            //    time: Date.now(),
            //    oz: 4,
            //    ml: 125,
            //    relativeSize: 'same'
            //});
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
