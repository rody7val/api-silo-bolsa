var Sensor  = require('../models/sensor');
var moment  = require('moment');

exports.excel_export = function (req, res) {
	var nodeExcel = require('excel-export');
  console.log(req.params.date);

  Sensor
  .find({ created: { $gt: new Date(req.params.date) } })
  .exec(function (err, sensors) {

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
      { caption: 'Prefijo', type: 'string' }
    ];

    // Filas
    conf.rows = [];
    // Por cada registro en la base de datos
    sensors.forEach(function (sensor) {
      // y por cada registro de temperatura
      sensor.temp.forEach(function (temp, key) {
        // crear nueva fila
        conf.rows.push([
          moment(sensor.created).subtract(10, 'days').calendar(),
          moment(sensor.created).format('LT'),
          sensor.temp[key],
          parseFloat( Number(sensor.vcc / 10000).toFixed(2) ),
          sensor.placa,
          sensor.sector,
          sensor.pin,
          sensor.prefix[key]
        ]);
      });
    });

    // Exportar archivo binario *.xlsx
    var result = nodeExcel.execute(conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader('Content-Disposition', 'attachment; filename=' + 'Temperaturas_' + moment(req.params.date).format('DD-MM-YYYY') +'.xlsx');
    res.end(result, 'binary');
  });
}