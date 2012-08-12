define(['backbone', 'backbone.localStorage'], function(Backbone) {
    // The basic unit of measure is a feeding.
    var Feeding = Backbone.Model.extend({});

    var Feedings = Backbone.Collection.extend({
        model: Feeding,
        localStorage: new Backbone.LocalStorage('Feedings'),

        // Add a new feeding. The feeding object should already include the
        // time and one unit.
        addOne: function(feeding, unit) {
            // Use the unit to record the equivalent in the opposite unit.
            if (unit === 'oz') {
                // FIXME: create a conversion function.
                feeding.ml = 100;
            }
            else if (unit === 'ml') {
                // FIXME: create a conversion function.
                feeding.oz = 4;
            }

            // Determine what the relative size should be.
            if (!this.isEmpty()) {
                // FIXME: When the feeding is inserted between two other
                // feedings, the relative size of the later feeding needs to be
                // updated.
                // TODO: Find the previous feeding to determine relative size.
                feeding.relativeSize = 'bigger';
            }
            else {
                feeding.relativeSize = 'same';
            }

            this.create(feeding);
        }
    });

    return Feedings;
});
