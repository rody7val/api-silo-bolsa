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
			freq: 60000	// 1 min.
		});
		// cada 5 seg
		sensor.on('data', function() {
			// Obtener lecturas
			var photo = new Sensor({
				luz: this.value,
				_boardID: board.id,
				pin: this.pin
			});
			// Guardar lecturas
			photo.save();
		});

	});

}