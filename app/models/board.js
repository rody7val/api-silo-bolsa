var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

// Modelo Board
var BoardSchema = new Schema({
    _id: String,
    actuators: {
    	tipo: String,
    	pins: [Number]
    },
    sensors: {
    	tipo: String,
    	pins: [Number]
    },
    created: { type: Date, default: Date.now }
});

BoardSchema.plugin(deepPopulate);

module.exports = mongoose.model('Board', BoardSchema);
