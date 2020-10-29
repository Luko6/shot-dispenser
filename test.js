const express = require('express');
const app = express();
var SerialPort = require("serialport");

var port = 3000;

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
    res.sendFile(__dirname + '/html/test.html');
});

app.get('/:action', function (req, res) {

   var action = req.params.action || req.param('action');

    if(action == 'r'){
        arduinoSerialPort.write("6");
				return res.sendFile(__dirname + '/html/test.html');
    }
    if(action == 'g') {
        arduinoSerialPort.write("11");
        return res.sendFile(__dirname + '/html/test.html');
    }
		if(action == 'b') {
        arduinoSerialPort.write("5");
        return res.sendFile(__dirname + '/html/test.html');
    }
		if(action == 'y') {
        arduinoSerialPort.write("10");
        return res.sendFile(__dirname + '/html/test.html');
    }

    return res.send('Action: ' + action);

});

app.listen(port, function() {
	console.log('Example app listening on port localhost:' + port + '!');
});
