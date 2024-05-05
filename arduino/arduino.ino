void setup() {
  Serial.begin(9600);
  pinMode(8, OUTPUT);

  digitalWrite(8, HIGH);
}

void loop() {
  if (Serial.available() > 0) {
    digitalWrite(8, LOW);
    Serial.println("Shock started");
    delay(1000);
    digitalWrite(8, HIGH);
    Serial.println("Shock ended");
    Serial.read();
  }
}