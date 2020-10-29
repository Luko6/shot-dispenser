// Relay on pin 9.
#define Relay 9

void setup() {
  // Initalize relay, and open it.
  pinMode(Relay, OUTPUT);
  openRelay();

  // Start serial communication
  Serial.begin(9600);
}

void loop() {
  // If Serial is started, execute.
  if(Serial.available() > 0) {

    // Recieve message, and copy last character itno variable
    String msg = Serial.readString();
    char command = msg[strlen(msg)-1]

    // Inspect the last character, and execute the command
    switch (command)
    {
    // Close the relay for 34 seconds
    // This is equivalent to ~4cl fluid through the pump
    case 'r':
      pourDrink(34000);
      break;
    // DEBUG COMMANDS
    // Close the relay 
    case 's':
      closeRelay();
    // Open the relay
    case 't':
      openRelay();
    default:
      break;
    }
  }
}

// Opens the relay, and 
void openRelay(){
  digitalWrite(Relay, HIGH);
}

void closeRelay(){
  digitalWrite(Relay, LOW);
}

void pourDrink(int dt){
  closeRelay();
  delay(dt);
  openRelay();
}