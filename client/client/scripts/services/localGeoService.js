define([
    "dojo/_base/declare",
    "esri/geometry/Point",
    "dojo/_base/lang"
], function (declare, Point, lang) {
    return declare("LocalGeoService", null, {
        canGeolocate: null,
        view: null,

        constructor: function (view) {
            this.canGeolocate = this.browserCanGeolocate();
            this.view = view;
        },

        updateMapToUsersGeolocation: function () {
            if (this.canGeolocate) {
                return this.getUserLocationLocation(lang.hitch(this, (res) => {
                    this.view.goTo(new Point({
                        latitude: res.lat,
                        longitude: res.long
                    }));
                }));
            }
            return this.canGeolocate;
        },

        getUserLocationLocation: function () {
            return new Promise(function (resolve, reject) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    resolve({
                        lat: position.coords.latitude,
                        long: position.coords.longitude
                    });
                }, reject, {
                        enableHighAccuracy: true,
                        timeout: 20000,
                        maximumAge: 0
                    });
            });
        },

        browserCanGeolocate: function () {
            return "geolocation" in navigator;
        }
    });
});