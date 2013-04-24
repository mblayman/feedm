define([
    'backbone',
    'units',
    'backbone.localStorage',
    ],

function(Backbone, Units) {
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
                feeding.ml = Units.oz_to_ml(feeding.oz);
            }
            else if (feeding['ml']) {
                feeding.oz = Units.ml_to_oz(feeding.ml);
            }

            this.create(feeding);
        }
    });

    return Feedings;
});

