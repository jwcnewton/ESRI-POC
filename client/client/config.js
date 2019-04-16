// configure dojo loader
(function () {
    var path = location.pathname.replace(/\/[^/]+$/, '/');
    var remoteApi = 'http://localhost:8000';
    window.dojoConfig = {
        parseOnLoad: false,
        async: true,
        packages: [
            {
                name: 'scripts',
                location: `${path}scripts`
            },
            {
                name: 'widgets',
                location: `${path}scripts/widgets`
            },
            {
                name: 'services',
                location: `${path}scripts/services`
            }
        ],
        localServices: {
            IsAuthed: '/IsAuthenticated',
            GetNotAuthed: '/GetAuthView',
            GetAuthedUserName: '/GetUser',
            GetSaveButton: '/GetSaveButtonView'
        },
        remoteServices: {
            GithubAuth: `${remoteApi}/auth`,
            GetAllShapes: `${remoteApi}/allShapes`,
            SaveAllShapes: `${remoteApi}/saveShape`
        }
    };
}());