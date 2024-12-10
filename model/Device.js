const mongoose = require("mongoose");

// Define schema for sensor data parameters
const sensorDataSchema = new mongoose.Schema(
  {
    temperature: Number,
    humidity: Number,
    moisture: Number,
    currentFlow: Number,
    voltageFlow: Number,
    wattage: Number,
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

// Define schema for each device
const deviceSchema = new mongoose.Schema({
  deviceNumber: { type: String, required: true, unique: true }, // Unique identifier for each device
  realTimeData: sensorDataSchema, // Stores current, frequently updated values
  savedTimeFrameData: [sensorDataSchema], // Stores historical data for graphing
});

const Device = mongoose.model("Device", deviceSchema);

module.exports = Device;
