import express from 'express';
import db from './db.js';
import { v4 as uuidv4 } from 'uuid';

const app = express();

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Smart Home API is running');
});

app.post('/devices', (req, res) => {
    const { name, type, status, config } = req.body;

    if (!name || !type || !status) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newDevice = {
        id: uuidv4(),
        name,
        type,
        status,
        config: config || {}
    };

    db.data.devices.push(newDevice);
    db.write();
    res.status(201).json(newDevice);
});
  

app.get('/devices', (req, res) => {
res.json(db.data.devices);
});

app.get('/devices/:id', (req, res) => {
const id = req.params.id;
const device = db.data.devices.find(d => d.id === id);

if (!device) {
    return res.status(404).json({ error: 'Device not found' });
}

res.json(device);
});

app.patch('/devices/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body;
  
    const device = db.data.devices.find(d => d.id === id);
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }
  
    // Update fields
    if ('id' in updates) delete updates.id;
    Object.assign(device, updates);
  
    db.write(); // persist changes
    res.json(device);
  });

app.delete('/devices/:id', (req, res) => {
const id = req.params.id;
const index = db.data.devices.findIndex(d => d.id === id);

if (index === -1) {
    return res.status(404).json({ error: 'Device not found' });
}

db.data.devices.splice(index, 1);
db.write(); // persist changes

res.json({ message: 'Device deleted successfully' });
});

// Start server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
