'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('photos')
.factory('Photos', ['$resource',
	function($resource) {
		return $resource('photos/:photoId', {
			photoId: '@_id'
		},
		 {
			update: {
				method: 'PUT'
			}
		});
	}
]);