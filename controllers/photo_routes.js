const Photo = require('../models/photo')
const aws = require('aws-sdk')
const config = require('../config')

const AWS_ACCESS_KEY = config.aws_access
const AWS_SECRET_KEY = config.aws_secret
const S3_BUCKET = config.bucket

exports.sign = function(req, res, next) {
    aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});

    var s3 = new aws.S3()
    var options = {
      Bucket: S3_BUCKET,
      Key: req.query.file_name,
      Expires: 60,
      ContentType: req.query.file_type,
      ACL: 'public-read'
    }

    s3.getSignedUrl('putObject', options, function(err, data){
    	if(err) { return next(err) }

    	const url = 'https://s3.amazonaws.com/' + S3_BUCKET + '/' + req.query.file_name
    	const photo = new Photo({
    		url: url,
    		title: req.body.title,
    		user: req.user
    	})

    	photo.save(function(err) {
    		if(err) { return next(err) }

    		res.json({
	    		signed_request: data,
	    		url: url,
	    		photo: photo
	    	})
    	})
    })
}

exports.all = function(req, res, next) {
	Photo.find({}, function(err, photos) {
		if (err) { return next(err) }
		res.json(photos)
	})
}

exports.mine = function(req, res, next) {
	Photo.find({user: req.user}, function(err, photos) {
		if (err) { return next(err) }
		res.json(photos)
	})
}

exports.add = function(req, res, next) {
	const url = req.body.url
	const title = req.body.title

	const photo = new Photo({
		url: url,
		title: title,
		user: req.user
	})

	photo.save(function(err) {
		if(err) { return next(err) }

		res.json(photo)
	})

	console.log(photo)
}