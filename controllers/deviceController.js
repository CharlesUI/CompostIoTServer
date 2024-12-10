// controllers/deviceController.js
const Device = require("../model/Device"); // Assuming Device model is defined independently

// Get real-time data for a specific device
const getRealTimeData = async (req, res) => {
  const { deviceNumber } = req.params;
  try {
    const device = await Device.findOne({ deviceNumber });
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    res.json(device.realTimeData);
  } catch (error) {
    console.error("Error fetching real-time data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Post (update) real-time data for a specific device
const postRealTimeData = async (req, res) => {
  const { deviceNumber } = req.params;
  const realTimeData = req.body;
  console.log(realTimeData);
  try {
    const device = await Device.findOneAndUpdate(
      { deviceNumber },
      { realTimeData },
      { new: true, upsert: true } // Create device if it doesn't exist
    );
    res.json(device.realTimeData);
  } catch (error) {
    console.error("Error updating real-time data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get saved time-frame data for a specific device
const getSavedTimeFrameData = async (req, res) => {
  const { deviceNumber } = req.params;
  try {
    const device = await Device.findOne({ deviceNumber });
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    res.json(device.savedTimeFrameData);
  } catch (error) {
    console.error("Error fetching saved time-frame data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Post new saved time-frame data entry for a specific device
const postSavedTimeFrameData = async (req, res) => {
  const { deviceNumber } = req.params;
  const newEntry = req.body;
  try {
    const device = await Device.findOneAndUpdate(
      { deviceNumber },
      { $push: { savedTimeFrameData: newEntry } },
      { new: true, upsert: true } // Create device if it doesn't exist
    );
    res.json(device.savedTimeFrameData);
  } catch (error) {
    console.error("Error updating saved time-frame data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const addNewDevice = async (req, res) => {
  const { deviceNumber } = req.body;

  try {
    // Check if the device number already exists
    const existingDevice = await Device.findOne({ deviceNumber });
    if (existingDevice) {
      return res
        .status(400)
        .json({ message: "Device with this device number already exists" });
    }

    // Create the new device with default values initialized to 0
    const newDevice = new Device({
      deviceNumber,
      realTimeData: {
        temperature: 0,
        humidity: 0,
        moisture: 0,
        currentFlow: 0,
        voltageFlow: 0,
        wattage: 0,
        timestamp: Date.now(), // Or use default Date.now in the schema itself
      },
      savedTimeFrameData: [], // Initialize as empty array
    });

    await newDevice.save();
    res
      .status(201)
      .json({ message: "Device created successfully", device: newDevice });
  } catch (error) {
    console.error("Error adding new device:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getRealTimeData,
  postRealTimeData,
  getSavedTimeFrameData,
  postSavedTimeFrameData,
  addNewDevice, // Export the new function
};
