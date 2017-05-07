var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

// Modelo Photo
var PhotoSchema = new Schema({
    luz: Number,
    board: String,
    created: { type: Date, default: Date.now }
});

PhotoSchema.plugin(deepPopulate);

module.exports = mongoose.model('Photo', PhotoSchema);
