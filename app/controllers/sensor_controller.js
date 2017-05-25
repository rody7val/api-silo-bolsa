var five = require('johnny-five');
var Sensor = require('../models/sensor');
var Board = require('../models/board');

exports.init_A = function (board, type, pins) {
	// Guardar board en la BD.
	var placa = new Board({
		_id: board.id,
		sensors: { 
			tipo: type,
			pins: pins
		}
	})
	placa.save();

	// Guardar registro de sensores en la BD
	pins.forEach(function (pin, key) {
		var sensor = new five.Sensor({
			pin: pin,
			freq: 5000	// 1 min = 60000.
		});

		sensor.on('data', function() {
			// Obtener lecturas
			var photo = new Sensor({
				luz: this.value,
				placa: board.id,
				pin: this.pin
			});
			// Guardar lecturas
			photo.save();
		});

	});

}