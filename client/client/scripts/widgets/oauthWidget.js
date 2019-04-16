define([
    "dojo/_base/declare",
    "dojo/request",
    "dojo/Deferred",
    "widgets/toastBase",
    "dojo/_base/lang",
    "dojo/_base/config",
    "dojo/dom-construct",
    "dojo/dom",
    "dojo/dom-class",
    "dojo/domReady!"
], function (
    declare, request, Deferred,
    toastBase, lang,
    config, construct, dom, domClass) {
        return declare("oathWidget", toastBase, {
            isAuthenticated: null,
            authenticatedUser: null,
            authUrlToken: '__Auth__',
            startUp: function () {
                return this.isAuthenticated()
                    .then(
                        this.handleAuthenticated.bind(this),
                        this.handleNotAuthenticated.bind(this)
                    );
            },

            isAuthenticated: function () {
                const def = new Deferred();

                request.get(config.localServices.IsAuthed, {
                    handleAs: "json"
                }).then((data) => {
                    if (data.is_authenticated) {
                        this.isAuthenticated = true;
                        def.resolve();
                    } else {
                        this.isAuthenticated = false;
                        def.reject();
                    }
                }, () => {
                    def.reject();
                });

                return def;
            },

            handleNotAuthenticated: function () {
                return request.post(config.localServices.GetNotAuthed).then((data) => {
                    //data.replace(authUrlToken, config.remoteServices.GithubAuth);
                    construct.place(construct.toDom(data), "container");
                    domClass.add(dom.byId("map"), "inactive");
                });
            },

            handleAuthenticated: function () {
                return request.get(config.localServices.GetAuthedUserName, {
                    handleAs: "json"
                }).then(lang.hitch(this, (data) => {
                    if (data.user) {
                        this.showMessage(`Welcome: ${data.user}.`, 12000);
                        this.authenticatedUser = data.user;
                    }
                }));
            }
        });
    });