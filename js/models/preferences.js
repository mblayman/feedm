// The preferences are the global user settings for the app.
define([
    'backbone',
    'backbone.localStorage'
    ],

function(Backbone) {
    // Track the user's preferences. This is sort of abusing Backbone
    // localStorage because it will only ever be fetching one item.
    var PreferencesContainer = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage('Feedm.Preferences')
    });
    var preferencesContainer = new PreferencesContainer();

    var Preferences = {};

    Preferences.amounts = function() {
        // FIXME: Pull from the container.
        return [1, 2, 3, 4, 5, 6, 7, 8];
    }

    Preferences.unit = function() {
        // FIXME: Pull from the container.
        return 'oz';
    };

    return Preferences;
});

