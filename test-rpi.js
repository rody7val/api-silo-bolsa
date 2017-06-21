var five = require("johnny-five");
var EtherPortClient = require('etherport-client').EtherPortClient;

var board = new five.Board({
    port: new EtherPortClient({
            host: '192.168.43.139',
            port: 3000
        }),
    timeout: 1e5,
    repl: true
});

board.on('ready', function(){
  var thermometer = new five.Thermometer({
    controller: "DS18B20",
    pin: 2
  });

  thermometer.on("change", function() {
    console.log(this.celsius + "°C");
  });
});