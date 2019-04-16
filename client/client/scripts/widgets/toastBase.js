define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojo/_base/lang",
    "dojo/domReady!"
], function (declare, dom, lang) {
    return declare("Toast", null, {
        toast: dom.byId("toast"),

        constructor: function () {
            dom.byId("toast").className = ''
            dom.byId("toast").innerHTML = '';
        },

        showMessage: function (message, timeout) {
            this.toast.className = 'show'
            this.toast.innerHTML = message;

            setTimeout(lang.hitch(this, function () {
                this.toast.className = '';
                this.toast.innerHTML = '';
            }), timeout);
        },
    });
});