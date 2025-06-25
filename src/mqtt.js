// Import dependencies
import mqtt from 'mqtt';
import { v4 as uuidv4 } from 'uuid';
import db from './db.js';
import { broadcast } from './websocket.js';

// Connect to local MQTT broker
const client = mqtt.connect('mqtt://localhost:1883');

// On successful MQTT connection
client.on('connect', () => {
  console.log('Connected to MQTT broker');

  // Subscribe to all sensor data topics (e.g. sensors/temp/data)
  client.subscribe('sensors/+/data');
});

// Handle incoming MQTT messages
client.on('message', (topic, message) => {
  try {
    const data = JSON.parse(message.toString()); // Parse JSON payload
    console.log(`Received on ${topic}:`, data);

    // Find device in db by name
    const deviceIndex = db.data.devices.findIndex(d => d.name === data.name);

    if (deviceIndex !== -1) {
      // If device exists, update it
      Object.assign(db.data.devices[deviceIndex], data);
      broadcast({ type: 'update', device: db.data.devices[deviceIndex] });
    } else {
      // If device does not exist, create a new one with UUID
      const newDevice = { id: uuidv4(), ...data };
      db.data.devices.push(newDevice);
      broadcast({ type: 'new', device: newDevice });
    }

    db.write(); // Save updated device list to db.json
  } catch (err) {
    console.error('Error parsing MQTT message:', err.message);
  }
});

export default client; // Export MQTT client (optional if needed elsewhere)
