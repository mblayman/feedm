define(['backbone', 'backbone.localStorage'], function(Backbone) {
    // The basic unit of measure is a feeding.
    var Feeding = Backbone.Model.extend({});

    var Feedings = Backbone.Collection.extend({
        model: Feeding,
        localStorage: new Backbone.LocalStorage('Feedm.Feedings'),

        // Add a new feeding. The feeding object should already include the
        // time and one unit.
        addOne: function(feeding) {
            // Use the unit to record the equivalent in the opposite unit.
            if (feeding['oz']) {
                // FIXME: create a conversion function.
                feeding.ml = 100;
            }
            else if (feeding['ml']) {
                // FIXME: create a conversion function.
                feeding.oz = 4;
            }

            this.create(feeding);
        }
    });

    return Feedings;
});
