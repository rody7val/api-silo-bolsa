var Sensor  = require('../models/sensor');
var moment  = require('moment');

exports.check_export = function (req, res) {
  var nodeExcel = require('excel-export');
  var inputUnix_Init = req.params.date;
  var inputUnix_End = moment.unix(req.params.date).add(1, 'day').subtract(1, 'minutes').unix();
  var hoy = moment.unix(req.params.date).format('DD-MM-YYYY');

  Sensor.find({
    unix: {
      $gte: inputUnix_Init * 1000,
      $lt: inputUnix_End * 1000
    }
  }).exec(function (err, sensors) {

    if (err) return res.status(500).json({
      status: 500, 
      err: err.errors
    })

    else if (!sensors.length) return res.status(500).json({
      status: 500, 
      message: 'No se encontraron registros para el día ' + hoy
    })

    res.status(200).json({
      status: 200,
      sensors: sensors
    });

  });
}

exports.excel_export = function (req, res) {
	var nodeExcel = require('excel-export');
  var inputUnix_Init = req.params.date;
  var inputUnix_End = moment.unix(req.params.date).add(1, 'day').subtract(1, 'minutes').unix();
  var hoy = moment.unix(req.params.date).format('DD-MM-YYYY');

  Sensor.find({
    unix: {
      $gte: inputUnix_Init * 1000,
      $lt: inputUnix_End * 1000
    }
  }).exec(function (err, sensors) {

    var conf = {};
    conf.name = 'BASE_DE_DATOS';

    // Columnas
    conf.cols = [
      { caption: 'Fecha'  , type: 'date' },
      { caption: 'Hora'   , type: 'date' },
      { caption: 'Temp'   , type: 'number' },
      { caption: 'Vcc'    , type: 'number' },
      { caption: 'Placa'  , type: 'string' },
      { caption: 'Sector' , type: 'string' },
      { caption: 'Pin'    , type: 'number' },
      { caption: 'Prefijo', type: 'string' },
    ];

    // Filas
    conf.rows = [];
    // Por cada registro en la base de datos
    sensors.forEach(function (sensor, key) {
      var _key = key;
      // y por cada registro de temperatura
      sensor.temp.forEach(function (temp, key) {
        // crear nueva fila
        conf.rows.push([
          moment.unix( sensor.unix / 1000 ).format('DD-MM-YYYY'),
          moment.unix( sensor.unix / 1000 ).format('LT'),
          sensor.temp[key],
          parseFloat( Number(sensor.vcc / 10000).toFixed(2) ),
          sensor.placa,
          sensor.sector,
          sensor.pin,
          sensor.prefix[key] || "x"+key
        ]);
      });
    });

    // Exportar archivo binario *.xlsx
    var result = nodeExcel.execute(conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader('Content-Disposition', 'attachment; filename=' + 'Temperaturas_' + hoy +'.xlsx');
    res.end(result, 'binary');
  });
}