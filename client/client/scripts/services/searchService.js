define([
    "dojo/_base/declare",
    "esri/widgets/Search",
], function (declare, Search) {
    return declare("SearchService", null, {
        view: null,

        constructor: function (view) {
            this.view = view;
        },

        startUp: function () {
            var searchWidget = new Search({
                view: this.view
            });

            this.view.ui.add(searchWidget, {
                position: "top-right",
                index: 2
            });
        }
    });
});