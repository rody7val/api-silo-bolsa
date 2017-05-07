var five = require('johnny-five');
var Photo = require('../models/photo');

exports.init = function (board) {
	var photo = new five.Sensor({
		pin: 'A2',
		freq: 5000
	});
	photo.on('data', function() {
		var photo = new Photo({
			luz: this.value,
			board: board.id
		});
		photo.save();
	});
}

exports.all = function (req, res) {
	Photo.find({})
	.exec(function (err, photos) {
		if (err) return res.status(500).json({
			status: 500, 
			err: err
		})
		res.status(200).json({
			status: 200, 
			photos: photos
		})
	})
}