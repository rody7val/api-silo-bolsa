var mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose, 2);
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

// Modelo Sensor
var SensorSchema = new Schema({
    temp: [Float],
    prefix: [String],
    time: Number,
    vcc: Number,
    placa: String,
    sector: String,
    pin: Number,
    unix: { type: Number, default: Date.now },
    created: { type: Date, default: Date.now },
});

SensorSchema.plugin(deepPopulate);

module.exports = mongoose.model('Sensor', SensorSchema);