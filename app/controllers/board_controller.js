var Board = require('../models/board');

exports.count = function (req, res) {
	Board
	.count({})
	.exec(function (err, count) {
		console.log(count)
		if (err) res.status(500).json({
			status: 500, 
			err: err
		})
		else res.status(200).json({
			status: 200, 
			count: count
		})
	})
}

exports.all = function (req, res) {
	Board
	.find({})
	.exec(function (err, boards) {
		if (err) return res.status(500).json({
			status: 500, 
			err: err
		})
		res.status(200).json({
			status: 200, 
			boards: boards
		})
	})
}