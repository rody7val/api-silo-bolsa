var Sector  = require('../models/sector');
var Sensor  = require('../models/sensor');
var moment  = require('moment');

exports.excel_export = function (req, res) {
	var nodeExcel = require('excel-export');
  // console.log(req.params);

  Sector.findOne({
    _id: req.params.id
  })
  .exec(function (err, sector) {

    Sensor.find({ 
      date: { $gt: req.params.date }
      // ,
      // placa: device.placa,
      // pin: device.pin
    })
    .exec(function (err, sensors) {

      var conf = {};
      conf.name = 'temp';

      //Columnas
      conf.cols = [
        { caption: 'Fecha', type: 'string' },
        { caption: 'Hora', type: 'string' },
        { caption: 'A_1', type: 'number' },
        { caption: 'A_2', type: 'number' }
      ];
      // sector.devices.map(function (device) {
      //   conf.cols.push({ caption: device.prefix, type: 'number' });
      // })

      //Filas
      conf.rows = [];
      // var _devices = sector.devices.map(function (device) {
      //   // return { placa: device.placa, pin: device.pin };
      // });

      sensors.forEach(function (sensor, key) {
        conf.rows.push([
          moment(sensor.created).subtract(10, 'days').calendar(),
          moment(sensor.created).format('LT'), 
          sensor.luz,
          sensor.luz
        ]);
      });

      console.log(conf)
      var result = nodeExcel.execute(conf);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats');
      res.setHeader('Content-Disposition', 'attachment; filename=' + 'Report_' + moment(req.params.date).format('DD-MM-YYYY') +'.xlsx');
      res.end(result, 'binary');
    });

  });
}