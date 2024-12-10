// routes/deviceRoutes.js
const express = require('express');
const router = express.Router();
const { 
    getRealTimeData, 
    postRealTimeData, 
    getSavedTimeFrameData, 
    postSavedTimeFrameData,
    addNewDevice // New controller for adding devices
} = require('../controllers/deviceController');

// Route to add a new device
router.post('/add', addNewDevice);

// Other routes
router.get('/:deviceNumber/real-time', getRealTimeData);
router.post('/:deviceNumber/real-time', postRealTimeData);
router.get('/:deviceNumber/saved-time-frame', getSavedTimeFrameData);
router.post('/:deviceNumber/saved-time-frame', postSavedTimeFrameData);

module.exports = router;
