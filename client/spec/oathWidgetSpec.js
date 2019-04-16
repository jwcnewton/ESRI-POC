define([
    "widgets/oauthWidget",
    "dojo/Deferred",
    "dojo/request",
    "dojo/_base/config",
    "dojo/dom-construct",
    "dojo/dom",
    "dojo/_base/window"
], (OauthWidget, Deferred, request, config, construct, dom, win) => {
    describe("oathWidget Tests", () => {
        var oauthWidget;
        beforeEach(() => {
            construct.create("div", { id: "toast", class: 'show' }, win.body());

            oauthWidget = new OauthWidget();
        });

        afterEach(() => {
            construct.destroy("toast");
        });

        describe("Smoke", () => {
            //Act
            it("Can create instance of 'oathWidget'", () => {
                //Assert
                expect(oauthWidget.declaredClass)
                    .toEqual('oathWidget');
            });
        });

        describe("startUp", () => {
            beforeEach(() => {
                spyOn(oauthWidget, "isAuthenticated")
                    .and
                    .returnValue(new Deferred().resolve());

                spyOn(oauthWidget, "handleAuthenticated");
                spyOn(oauthWidget, "handleNotAuthenticated");
            });

            it("Calls isAuthenticated", (done) => {
                //Act
                oauthWidget.startUp().then(() => {
                    //Assert
                    expect(oauthWidget.isAuthenticated)
                        .toHaveBeenCalled();
                }).then(done);
            });

            it("Calls handleAuthenticated with the resolve value if isAuthenticated resolves", (done) => {
                //Arrange
                oauthWidget.isAuthenticated.and.returnValue(new Deferred().resolve({ auth: true }))
                //Act
                oauthWidget.startUp().then(() => {
                    //Assert
                    expect(oauthWidget.handleAuthenticated)
                        .toHaveBeenCalledWith({ auth: true });
                }).then(done);
            });

            it("Calls handleNotAuthenticated with the reject value if isAuthenticated rejects", (done) => {
                //Arrange
                oauthWidget.isAuthenticated.and.returnValue(new Deferred().reject({ auth: false }))
                //Act
                oauthWidget.startUp().then(() => {
                    //Assert
                    expect(oauthWidget.handleNotAuthenticated)
                        .toHaveBeenCalledWith({ auth: false });
                }).then(done);
            });
        });

        describe("isAuthenticated", () => {
            beforeEach(() => {
                spyOn(request, 'get')
                    .and
                    .returnValue(new Deferred().resolve({ is_authenticated: true }));
            });

            it("Calls request 'get' with the expected url", (done) => {
                //Arrange
                const expectUrl = config.localServices.IsAuthed;
                const expectRequestArgs = {
                    handleAs: "json"
                };

                //Act
                oauthWidget.isAuthenticated().then(() => {
                    //Assert
                    expect(request.get)
                        .toHaveBeenCalledWith(expectUrl, expectRequestArgs);
                }, () => {
                    fail('Rest call failed to resolve');
                }).then(done);
            });

            it("Calls sets 'isAuthenticated' to true if isAuthenticated resolves", (done) => {
                //Act
                oauthWidget.isAuthenticated().then(() => {
                    //Assert
                    expect(oauthWidget.isAuthenticated)
                        .toEqual(true);
                }, () => {
                    fail('Rest call failed to resolve');
                }).then(done);
            });

            it("Calls sets 'isAuthenticated' to false if isAuthenticated resolves", (done) => {
                //Arrange
                request.get.and.returnValue(
                    new Deferred().resolve({ is_authenticated: false })
                );

                //Act
                oauthWidget.isAuthenticated().then(() => {
                    fail('Rest call should have been rejected');
                }, () => {
                    //Assert
                    expect(oauthWidget.isAuthenticated)
                        .toEqual(false);
                }).then(done);
            });
        });

        describe("handleNotAuthenticated", () => {
            beforeEach(() => {
                construct.create("div", { id: "container" }, win.body());
                construct.create("div", { id: "map" }, win.body());

                spyOn(request, 'post').and.returnValue(
                    new Deferred().resolve('<div id="test">Test</div>')
                );
            });

            afterEach(() => {
                construct.destroy("container");
                construct.destroy("map");
            });

            it("Calls post with expected service location", (done) => {
                //Arrange
                const expectUrl = config.localServices.GetNotAuthed;
                //Act
                oauthWidget.handleNotAuthenticated().then(() => {
                    //Assert
                    expect(request.post)
                        .toHaveBeenCalledWith(expectUrl);
                }, () => {
                    fail('Rest call failed to resolve');
                }).then(done);
            });

            it("Appends resolved html into dom", (done) => {
                //Act
                oauthWidget.handleNotAuthenticated().then(() => {
                    //Assert
                    expect(dom.byId('test').innerText).toEqual("Test");
                }, () => {
                    fail('Rest call failed to resolve');
                }).then(done);
            });

            it("Add 'inactive' class to map element", (done) => {
                //Act
                oauthWidget.handleNotAuthenticated().then(() => {
                    //Assert
                    expect(dom.byId('map').className).toEqual("inactive");
                }, () => {
                    fail('Rest call failed to resolve');
                }).then(done);
            });
        });

        describe("handleAuthenticated", () => {
            beforeEach(() => {
                spyOn(request, 'get').and.returnValue(
                    new Deferred().resolve({})
                );

                spyOn(oauthWidget, 'showMessage');
            });

            it("Calls request 'get' with the expected url", (done) => {
                //Arrange
                const expectUrl = config.localServices.GetAuthedUserName;
                const expectRequestArgs = {
                    handleAs: "json"
                };

                //Act
                oauthWidget.handleAuthenticated().then(() => {
                    //Assert
                    expect(request.get)
                        .toHaveBeenCalledWith(expectUrl, expectRequestArgs);
                }, () => {
                    fail('Rest call failed to resolve');
                }).then(done);
            });

            it("Calls showMessage with expected message and timeout", (done) => {
                //Arrange
                const expectedMessage = 'Welcome: Jonathan.'
                const expectedTimeout = 12000;

                request.get.and.returnValue(
                    new Deferred().resolve({ user: 'Jonathan' })
                );

                //Act
                oauthWidget.handleAuthenticated().then(() => {
                    //Assert
                    expect(oauthWidget.showMessage)
                        .toHaveBeenCalledWith(expectedMessage, expectedTimeout);
                }, () => {
                    fail('Rest call failed to resolve');
                }).then(done);
            });

            it("Sets authenticatedUser to the expected user", (done) => {
                //Arrange
                const expectedUser = 'John';

                request.get.and.returnValue(
                    new Deferred().resolve({ user: 'John' })
                );

                //Act
                oauthWidget.handleAuthenticated().then(() => {
                    //Assert
                    expect(oauthWidget.authenticatedUser)
                        .toEqual(expectedUser);
                }, () => {
                    fail('Rest call failed to resolve');
                }).then(done);
            });
        });
    });
});