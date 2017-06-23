// Dependencias Arduino
// var five    = require('johnny-five');
// var boards  = new five.Boards(['A']);

// Controladores Globales del API
var Auth    = require('../controllers/auth_controller');
var General = require('../controllers/general_controller');
var Session = require('../controllers/session_controller');

var User    = require('../controllers/user_controller');
var Sensor  = require('../controllers/sensor_controller');
var Excel   = require('../controllers/excel_controller');

module.exports = function (express) {
    // Motor de rutas API
    var api = express.Router();

    // Documentación
    api.get('/', General.doc);

    // Autoload de comandos
    api.param('userId', User.load);

    // Auth
    api.post('/auth/signup', Auth.emailSignup);
    api.post('/auth/login', Auth.emailLogin);
    api.post('/auth/forgot', Auth.forgot);
    api.get('/auth/reset/:token', Auth.reset_isNotExpired);
    api.post('/auth/reset/:token', Auth.reset);

    // Users
    api.get('/users', User.all);
    api.get('/users/count', User.count);
    api.get('/users/:userId', User.one);
    api.get('/users/:userId/active', User.active, User.all);
    api.get('/users/:userId/block', User.block, User.all);
    api.get('/users/:userId/delete', User.delete, User.all);
    
    // Sensors
    api.post('/sensors', Session.ensureAuthenticated, Sensor.save);
    api.get('/sensors', Sensor.all);
    api.get('/sensors', Sensor.count);

    // Excel exports
    api.get('/excel/:date', Excel.excel_export);

    // Restricción de rutas
    api.get('*', General.restrict);

    // Retornar rutas API
    return api;
}
