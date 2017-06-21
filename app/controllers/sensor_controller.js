var Sensor = require('../models/sensor');

exports.save = function (req, res) {

	var temp = new Sensor({
		temp: req.body.temp,
		time: req.body.time,
		vcc: req.body.vcc,
		placa: req.body.placa,
		sector: req.body.sector,
		pin: req.body.pin
	});
	
	temp.save(function (err, sensor) {
		if (err) return res.status(500).json({
			status: 500, 
			err: err
		});
		res.status(200).json({
			status: 200, 
			sensor: sensor
		});
	});
}
