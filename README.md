# Shot Dispenser
Vanity project made for the summer holidays.
Arduino controlled fluid dispenser machine, controlled from a Node.JS hosted website.

## app.js 
This is the website's backend, it gets requests, and send the Arduino serial data according to that request.

## dispenser.ino
This is the arduino code that is controlling the pump

## Dispenser setup
Arduino is wired to a relay that is either opening or closing the pump's circuit.
# Arduino
Arduino uno is used.
# Pump
The pump is a peristaltic pump.

## Future
The relay could be swapped with a TIP122 transistor to be more compact