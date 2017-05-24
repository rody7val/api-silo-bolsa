var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

// Modelo Sector
var SectorSchema = new Schema({
    name: String,
    devices: [{
    	prefix: String,
    	placa: String,
    	pin: Number
    }],
    created: { type: Date, default: Date.now }
});

SectorSchema.plugin(deepPopulate);

module.exports = mongoose.model('Sector', SectorSchema);
