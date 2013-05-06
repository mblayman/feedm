// Provide some unit conversion functions.
define(function() {

    var Units = {},
        ml_lookup,
        oz_lookup;

    // A lookup table to provide millileter amounts (keyed by ounces)
    // and rounded to the nearest millileter
    ml_lookup = {
        1: 30,
        2: 59,
        3: 89,
        4: 118,
        5: 148,
        6: 177,
        7: 207,
        8: 237,
    };

    Units.oz_to_ml = function(oz) {
        return ml_lookup[oz];
    };

    // A lookup table to provide ounces amounts (keyed by millileters)
    // and rounded to the nearest tenth
    oz_lookup = {
        40: 1.4,
        60: 2.0,
        80: 2.7,
        100: 3.4,
        120: 4.1,
        140: 4.7,
        160: 5.4,
        180: 6.1,
        200: 6.8,
    };

    Units.ml_to_oz = function(ml) {
        return oz_lookup[ml];
    };

    return Units;
});
