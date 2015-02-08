'use strict';


var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	photo = mongoose.model('Photo'),
	_ = require('lodash');


exports.create = function(req, res) {
	var photo = new photo(req.body);
	photo.user = req.user;

	photo.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(photo);
		}
	});
};

exports.read = function(req, res) {
	res.json(req.photo);
};


exports.update = function(req, res) {
	var photo = req.photo;

	photo = _.extend(photo, req.body);

	photo.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(photo);
		}
	});
};

exports.delete = function(req, res) {
	var photo = req.photo;

	photo.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(photo);
		}
	});
};

exports.list = function(req, res) {
	photo.find().sort('-created').populate('user', 'displayName').exec(function(err, photos) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(photos);
		}
	});
};

exports.photoByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'photo is invalid'
		});
	}

	photo.findById(id).populate('user', 'displayName').exec(function(err, photo) {
		if (err) return next(err);
		if (!photo) {
			return res.status(404).send({
  				message: 'photo not found'
  			});
		}
		req.photo = photo;
		next();
	});
};

exports.hasAuthorization = function(req, res, next) {
	if (req.photo.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
