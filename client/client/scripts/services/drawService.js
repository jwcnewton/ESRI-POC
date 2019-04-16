define([
    "dojo/_base/declare",
    "widgets/toastBase",
    "esri/widgets/Sketch",
    "esri/layers/GraphicsLayer",
    "esri/Graphic",
    "dojo/request",
    "dojo/dom-construct",
    "dojo/dom",
    "dojo/on",
    "dojo/_base/config",
], function (declare, toastBase, Sketch, GraphicsLayer, Graphic, request, construct, dom, on, config) {
    return declare("DrawService", toastBase, {
        sketchGraphLayer: null,
        view: null,
        mapViewId: 'map',

        constructor: function (view, map) {
            this.view = view;
            this.sketchGraphLayer = new GraphicsLayer();

            map.layers.add(this.sketchGraphLayer);
        },

        startUp: function () {
            const sketch = new Sketch({
                layer: this.sketchGraphLayer,
                view: this.view
            });

            this.view.ui.add(sketch, {
                position: "bottom-right"
            });

            this.getAllDrawings()
                .then(this.drawAllDrawings.bind(this))
                .then(this.addSaveDrawingsButtonToUi.bind(this));
        },

        addSaveDrawingsButtonToUi: function () {
            return request.post(config.localServices.GetSaveButton).then((data) => {
                construct.place(construct.toDom(data), this.mapViewId);

                on(dom.byId("save-all-drawings"), "click", this.saveNewDrawings.bind(this));
            });

        },

        saveAllDrawnFeatures: function (features) {
            return request.post(config.remoteServices.SaveAllShapes, {
                data: {
                    features: JSON.stringify(features)
                },
            });
        },

        getAllDrawings: function () {
            return request.get(config.remoteServices.GetAllShapes, {
                handleAs: "json"
            });
        },

        drawAllDrawings: function (drawings) {
            if (drawings) {
                var graphics = [];
                for (let i = 0; i < drawings.length; i++) {
                    const draw = drawings[i];
                    graphics.push(Graphic.fromJSON(draw));
                }
                if (graphics.length > 0) {
                    this.sketchGraphLayer.addMany(graphics);
                }

            }
        },

        saveNewDrawings: function () {
            const features = this.formatAllGraphicsToFeatures();
            this.saveAllDrawnFeatures(features).then(() => {
                this.showMessage(`Saved features.`, 12000);
            });
        },

        formatAllGraphicsToFeatures: function () {
            const graphics = this.sketchGraphLayer.graphics._items;
            const features = [];
            for (let i = 0; i < graphics.length; i++) {
                const graphic = graphics[i];
                features.push(graphic.toJSON())
            }
            return features;
        }
    });
});