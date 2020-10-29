const express = require('express');
const app = express();
var SerialPort = require("serialport");

var port = 6969;

var arduinoCOMPort = "/dev/ttyUSB0";

var arduinoSerialPort = new SerialPort(arduinoCOMPort, {
	baudRate: 9600
});

arduinoSerialPort.on('open', function(){
	console.log('Serial Port ' + arduinoCOMPort + ' is opened.');
});

/*app.get('/', function (req, res) {
	return res.send('<h1>Home Page</h1><br><a href="r">Red</a><br><a href="g">Green</a><br><a href="b">Blue</a><br><a href="y">Yellow</a>');
})*/
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/html/kutyahome.html');
});

app.get('/:action', function (req, res) {

   var action = req.params.action || req.param('action');

    if(action == 'r'){
        arduinoSerialPort.write("r");
				return res.sendFile(__dirname + '/html/kutya.html');
    }
		if(action == 'debug'){
				return res.sendFile(__dirname + '/html/debug.html');
		}
		if(action == 'dr'){
        arduinoSerialPort.write("r");
				return res.sendFile(__dirname + '/html/debug.html');
    }
    if(action == 'ds') {
        arduinoSerialPort.write("s");
        return res.sendFile(__dirname + '/html/debug.html');
    }
		if(action == 'dt') {
        arduinoSerialPort.write("t");
        return res.sendFile(__dirname + '/html/debug.html');
    }/*
		if(action == 'y') {
        arduinoSerialPort.write("10");
        return res.sendFile(__dirname + '/html/test.html');
    }*/

    return res.send('Action: ' + action);

});

app.listen(port, function() {
	console.log('Kutya app listening on port localhost:' + port + '!');
});
