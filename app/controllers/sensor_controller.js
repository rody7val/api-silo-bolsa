var Sensor = require('../models/sensor');

/**
 * @api {post} /sensors Crear Sensor
 * @apiGroup Sensor
 * @apiVersion 0.1.0
 *
 * @apiParam {Float[]} temp Temperaturas registradas.
 * @apiParam {String[]} prefix Prefijo del identificador crc8 de los sensores DS18B20.
 * @apiParam {Number} time Tiempo en milisegundos del registro de la temperatura desde la placa ESP8266.
 * @apiParam {Number} vcc Voltje en voltios del registro de la temperatura desde la placa ESP8266.
 * @apiParam {String} placa Nombre de la placa ESP8266.
 * @apiParam {String} sector Nombre del sector.
 * @apiParam {Number} pin Numero del pin al cual estan conectados los sensores.
 * @apiParam {Number} unix Tiempo en formato unix del momento en que se guarda el registro en la base de datos.
 * @apiParam {Date} created Tiempo en formato date del momento en que se guarda el registro en la base de datos.
 *
 * @apiSuccess {Number} status Código de estado HTTP.
 * @apiSuccess {Object} sensor Objeto Sensor.
 *
 * @apiSuccessExample Respuesta de ejemplo de exito al crear un sensor.
 * {
 *     status: 200,
 *     sensor: {
 *        _id: "5941a7b29c046c155c50fed0",
 *        temp: [18.6, 17.3],
 *        prefix: ["E01", "E02"],
 *        time: 543239,
 *        vcc: 65535,
 *        placa: "A",
 *        sector: "eje-1",
 *        pin: 2,
 *        unix: 1497474994181.0,
 *        created: "2017-06-14T21:16:34.181Z"
 *     }
 * }
 *
 */
exports.save = function (req, res) {
	console.log(req.body);
	var snsr = new Sensor({
		temp: req.body.temp || [],
		hr: req.body.hr || [],
		placa: req.body.placa || '',
		sector: req.body.sector || '',
		pin: req.body.pin || '',
		prefix: req.body.prefix || ''
	});
	
	snsr.save(function (err, sensor) {
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

/**
 * @api {get} /sensors Obtener Sensores
 * @apiGroup Sensor
 * @apiVersion 0.1.0
 *
 * @apiSuccess {Number} status Código de estado HTTP.
 * @apiSuccess {Object[]} users Arreglo de todos los sensores.
 *
 * @apiSuccessExample Respuesta de ejemplo con dos sensores en la Base de Datos:
 * {
 *     status: 200,
 *     sensors: [{
 *        _id: "5941a7b29c046c155c50fed0",
 *        temp: [18.6, 17.31],
 *        prefix: ["E01", "E02"],
 *        time: 543239,
 *        vcc: 65535,
 *        placa: "A",
 *        sector: "eje-1",
 *        pin: 2,
 *        unix: 1497474994181.0,
 *        created: "2017-06-14T21:16:34.181Z"
 *     },{
 *        _id: "5941a7b29c046c155c50fed1",
 *        temp: [18.43, 17.4],
 *        prefix: ["E01", "E02"],
 *        time: 593239,
 *        vcc: 65435,
 *        placa: "A",
 *        sector: "eje-1",
 *        pin: 2,
 *        unix: 1497474998356.0,
 *        created: "2017-06-14T23:34:15.181Z"
 *     }]
 *}
 */
exports.count = function (req, res) {
	Sensor.count({})
	.exec(function (err, count) {
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
	Sensor.find({})
	.exec(function (err, sensors) {
		if (err) return res.status(500).json({
			status: 500, 
			err: err
		})
		res.status(200).json({
			status: 200, 
			sensors: sensors
		})
	})
}

exports.getLastBySector = function (sector) {

	Sensor.findOne({ sector: sector })
	.sort({ created: -1 })
	.exec(function (err, sensor) {
		if (err) return {success: false, err: err};

		console.log('ctrl', sensor);
		return {success: true, data: sensor};
	});

}
