const Photo = require('../models/photo')

exports.all = function(req, res, next) {
	Photo.find({user: req.user}, function(err, photos) {
		if (err) { return next(err) }
		res.json(photos)
	})
}

exports.add = function(req, res, next) {
	const photo = new Photo({
		url: 'http://www.samandgreg.wedding/engagement_picture.jpg',
		title: 'Engagement Picture',
		user: req.user
	})

	photo.save(function(err) {
		if(err) { return next(err) }

		res.json(photo)
	})

	console.log(photo)
}