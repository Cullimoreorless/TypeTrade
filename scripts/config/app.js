/// <reference path="../../TypeDefinitionFiles/angular.d.ts" />
var tradierApp;
(function (tradierApp) {
    (function () {
        'use strict';
        angular.module('tradierApp', ['ngRoute'])
            .service('httpCallsService', tradierApp.HttpCallsService)
            .controller('quotesController', tradierApp.QuotesController);
    })();
})(tradierApp || (tradierApp = {}));
//# sourceMappingURL=app.js.map