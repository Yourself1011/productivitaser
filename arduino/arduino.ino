void setup() {
  Serial.begin(9600);
  pinMode(8, OUTPUT);

  digitalWrite(8, HIGH);
}

void loop() {

  if (Serial.available() > 0) {
    digitalWrite(8, LOW);
    delay(10);
    Serial.println("Shock administered");
    Serial.read();
  }
}