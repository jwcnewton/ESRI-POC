(function (window) {
  'use strict';

  var allTestFiles = [];
  var TEST_REGEXP = /.*Spec\.js$/;

  for (var file in window.__karma__.files) {
    if (TEST_REGEXP.test(file)) {
      allTestFiles.push(file);
    }
  }

  window.dojoConfig = {
    packages: [
      // local packages to test
      {
        name: "scripts",
        location: "/base/client/scripts"
      },
      {
        name: 'widgets',
        location: `/base/client/scripts/widgets`
      },
      {
        name: "services",
        location: "/base/client/scripts/services"
      },
      // esri/dojo packages
      {
        name: 'dijit',
        location: 'http://js.arcgis.com/4.10/dijit'
      }, {
        name: 'esri',
        location: 'http://js.arcgis.com/4.10/esri'
      }, {
        name: 'dojo',
        location: 'http://js.arcgis.com/4.10/dojo'
      }, {
        name: 'dojox',
        location: 'http://js.arcgis.com/4.10/dojox'
      },
    ],
    async: true,

    localServices: {
      IsAuthed: '/IsAuthenticated',
      GetNotAuthed: '/GetAuthView',
      GetAuthedUserName: '/GetUser'
    }
  };


  /**
   * This function must be defined and is called back by the dojo adapter
   * @returns {string} a list of dojo spec/test modules to register with your testing framework
   */
  window.__karma__.dojoStart = function () {
    return allTestFiles;
  };
})(window);
