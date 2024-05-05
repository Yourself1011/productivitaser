import { SerialPort } from "serialport";

const port = new SerialPort({
    path: "/dev/tty.usbmodem14101",
    baudRate: 9600,
});

console.log(port)
