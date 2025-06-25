// Import dependencies
import express from 'express';
import db from './db.js';
import { v4 as uuidv4 } from 'uuid';
import './mqtt.js'; // MQTT integration for sensor data
import http from 'http';
import { initWebSocket } from './websocket.js';

const app = express();
app.use(express.json()); // Enable JSON body parsing

// Create HTTP server and attach WebSocket support
const server = http.createServer(app);
initWebSocket(server); // Initialize WebSocket server on same port

// --- ROUTES ---

// Root route - basic status check
app.get('/', (req, res) => {
  res.send('Smart Home API is running');
});

// Create a new device
app.post('/devices', (req, res) => {
  const { name, type, status, config } = req.body;

  // Basic validation
  if (!name || !type || !status) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (config && typeof config !== 'object') {
  return res.status(400).json({ error: 'Config must be an object if provided' });
}

  const newDevice = {
    id: uuidv4(),
    name,
    type,
    status,
    config: config || {}
  };

  db.data.devices.push(newDevice);
  db.write(); // Persist to file
  res.status(201).json(newDevice);
});

// List all devices
app.get('/devices', (req, res) => {
  res.json(db.data.devices);
});

// Get a single device by ID
app.get('/devices/:id', (req, res) => {
  const id = req.params.id;
  const device = db.data.devices.find(d => d.id === id);

  if (!device) {
    return res.status(404).json({ error: 'Device not found' });
  }

  res.json(device);
});

// Update a device by ID
app.patch('/devices/:id', (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  if (!updates || typeof updates !== 'object' || Array.isArray(updates) || !Object.keys(updates).length) {
  return res.status(400).json({ error: 'Invalid or empty update payload' });
}

  const device = db.data.devices.find(d => d.id === id);
  if (!device) {
    return res.status(404).json({ error: 'Device not found' });
  }

  // Prevent ID from being overwritten
  if ('id' in updates) delete updates.id;
  Object.assign(device, updates);

  db.write(); // Save changes
  res.json(device);
});

// Delete a device by ID
app.delete('/devices/:id', (req, res) => {
  const id = req.params.id;
  const index = db.data.devices.findIndex(d => d.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Device not found' });
  }

  db.data.devices.splice(index, 1);
  db.write(); // Persist removal

  res.json({ message: 'Device deleted successfully' });
});

// --- START SERVER ---

server.listen(3000, () => {
  console.log('Server + WebSocket listening on port 3000');
});
