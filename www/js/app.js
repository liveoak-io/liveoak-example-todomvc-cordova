/*global angular */
/*jshint unused:false */
'use strict';

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
var todomvc = angular.module('todomvc', [ 'ngRoute', 'ngResource' ]);

var init = function () {
    var liveOak = LiveOak({
        auth: {
            realm: 'todomvc-cordova',
            clientId: 'todomvc'
        }
    });

    liveOak.auth.onAuthLogout = function () {
        window.open('', '_self');
    }

    liveOak.auth.onAuthError = function () {
        window.open('', '_self');
    }

    liveOak.auth.init('login-required').success(function () {
        if (liveOak.auth.hasResourceRole('admin', 'todomvc')) {
            liveOak.connect(function () {
                liveOak.create('/todomvc-cordova/storage', { id: 'todos' }, {
                    success: function (data) {
                    },
                    error: function (data) {
                    }
                });
            });
        }

        todomvc.factory('LiveOak', function () {
            return liveOak;
        });

        angular.bootstrap(document, ["todomvc"]);
    });
}

document.addEventListener('deviceready', init, false);
