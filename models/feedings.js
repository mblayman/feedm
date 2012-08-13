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

            // Add a model to the collection to grab the index after the save.
            var model = new Feeding(feeding);
            this.add(model, {silent: true});
            model.save();

            // Check out the previous to determine relative size.
            var previous = this.at(this.indexOf(model) - 1);
            if (previous !== -1) {
                // FIXME: When the feeding is inserted between two other
                // feedings, the relative size of the later feeding needs to be
                // updated.

                // It doesn't matter if oz or ml is compared so just pick one.
                if (model.get('oz') > previous.get('oz')) {
                    model.set('relativeSize', 'bigger');
                }
                else if (model.get('oz') < previous.get('oz')) {
                    model.set('relativeSize', 'smaller');
                }
                else {
                    model.set('relativeSize', 'same');
                }
            }
            else {
                model.set('relativeSize', 'same');
            }

            // Now that all properties are set, save and tell the views.
            model.save();
            this.trigger('add', model);
        }
    });

    return Feedings;
});
