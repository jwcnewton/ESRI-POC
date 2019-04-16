require([
    "esri/Map",
    "esri/views/MapView",
    "services/localGeoService",
    "services/searchService",
    "services/drawService",
    "widgets/oauthWidget",
], function (Map, MapView, LocalGeoService, SearchService, DrawService, OAuthWidget) {
    const oauthWidget = new OAuthWidget();
    oauthWidget.startUp();

    const map = new Map({
        basemap: "dark-gray"
    });

    const view = new MapView({
        container: "map",
        map: map,
        zoom: 15,
        center: [-3.1029300, 51.0149400]
    });

    const localGeoService = new LocalGeoService(view);
    const searchService = new SearchService(view);
    const drawService = new DrawService(view, map);

    view.when(() => {
        localGeoService.updateMapToUsersGeolocation();
        searchService.startUp();
        drawService.startUp();
    });
});