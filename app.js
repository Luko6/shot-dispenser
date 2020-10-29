// Import the required packages
const express = require('express');
var SerialPort = require("serialport");

// Call the express package
const app = express();

// Set the port for the website
var port = 5000;

// Set the serial port for the Arduino
var arduinoCOMPort = "/dev/ttyUSB0";
var arduinoSerialPort = new SerialPort(arduinoCOMPort, {
	baudRate: 9600
});

// Start the serial communication
arduinoSerialPort.on('open', function(){
	console.log('Serial Port ' + arduinoCOMPort + ' is opened.');
});


app.use(express.static(__dirname + '/public'))

// Main page
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/html/kutyahome.html');
});

// Action page
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
    }

    // Send the action on the serial port for the arduino
    return res.send('Action: ' + action);

});

// Start up the server
app.listen(port, function() {
	console.log('Kutya app listening on port localhost:' + port + '!');
});
