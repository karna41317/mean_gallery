'use strict';

angular.module('photos').controller('PhotosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Photos',
	function($scope, $stateParams, $location, Authentication, Photos) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var photo = new Photos({
				title: this.title,
				content: this.content
			});
			photo.$save(function(response) {
				$location.path('photos/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(photo) {
			if (photo) {
				photo.$remove();

				for (var i in $scope.photos) {
					if ($scope.photos[i] === photo) {
						$scope.photos.splice(i, 1);
					}
				}
			} else {
				$scope.photo.$remove(function() {
					$location.path('photos');
				});
			}
		};

		$scope.update = function() {
			var photo = $scope.photo;

			photo.$update(function() {
				$location.path('photos/' + photo._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.photos = Photos.query();
		};

		$scope.findOne = function() {
			$scope.photo = Photos.get({
				photoId: $stateParams.photoId
			});
		};
	}
]);