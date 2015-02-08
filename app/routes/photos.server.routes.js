'use strict';

var users = require('../../app/controllers/users.server.controller'),
	photos = require('../../app/controllers/photos.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/photos')
		.get(photos.list)
		.post(users.requiresLogin, photos.create);

	app.route('/photos/:photoId')
		.get(photos.read)
		.put(users.requiresLogin, photos.hasAuthorization, photos.update)
		.delete(users.requiresLogin, photos.hasAuthorization, photos.delete);

	// Finish by binding the photo middleware
	app.param('photoId', photos.photoByID);
};