var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

// Modelo Sensor
var SensorSchema = new Schema({
    luz: Number,
    _boardID: String,
    pin: String,
    created: { type: Date, default: Date.now }
});

SensorSchema.plugin(deepPopulate);

module.exports = mongoose.model('Sensor', SensorSchema);
