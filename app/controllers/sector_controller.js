var Sector = require('../models/sector');

exports.create = function (req, res, next) {
	console.log(req.body.sector)
	var sector = new Sector(req.body.sector);
	sector.save(function (err){
        if (err) return res.status(500).json({
            status: 500, 
            err: err.errors
        });
		next();
    });
}

exports.count = function (req, res) {
	Sector
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
	Sector.find({})
	.exec(function (err, sectors) {
		if (err) return res.status(500).json({
			status: 500, 
			err: err
		})
		res.status(200).json({
			status: 200, 
			sectors: sectors
		})
	})
}