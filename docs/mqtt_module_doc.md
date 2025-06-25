
# mqtt.js - MQTT Integration

This module sets up an MQTT client to subscribe to sensor data topics and update the local database accordingly.

## Key Responsibilities

- Connects to MQTT broker at `mqtt://localhost:1883`
- Subscribes to `sensors/+/data` topic
- Parses incoming messages and:
  - Updates existing device by name
  - Or adds a new device with a UUID
- Persists the device to `db.json`
- Broadcasts updates to WebSocket clients using `broadcast()`

## Example Topic

`sensors/temp/data` with payload:
```json
{
  "name": "Living Room Sensor",
  "type": "sensor",
  "status": "on",
  "config": { "value": 21.5 }
}
```
