### 📡 MQTT Test Script

This guide helps you simulate IoT device messages using `mosquitto_pub` (MQTT client) to test the backend's MQTT integration.

---

### ✅ Requirements

Ensure the following are running:

- The backend server (`npm run dev`)
- Mosquitto broker (e.g., via Homebrew):

```bash
brew services start mosquitto
```

---

### 🧪 Test Commands

Send a test message simulating a temperature sensor:

```bash
mosquitto_pub -h localhost -t sensors/temp/data -m '{
  "name": "Temperature Sensor",
  "type": "sensor",
  "status": "active",
  "config": { "unit": "C" }
}'
```

Update the same device:

```bash
mosquitto_pub -h localhost -t sensors/temp/data -m '{
  "name": "Temperature Sensor",
  "type": "sensor",
  "status": "active",
  "config": { "unit": "22C" }
}'
```

Add a new humidity sensor:

```bash
mosquitto_pub -h localhost -t sensors/humidity/data -m '{
  "name": "Humidity Sensor",
  "type": "sensor",
  "status": "active",
  "config": { "unit": "50%" }
}'
```

---

### 🔍 Verify via API

After publishing, confirm via REST API:

```bash
curl http://localhost:3000/devices
```

You should see the added/updated devices in the JSON response.

---

### 🧼 Notes

- MQTT topic pattern: `sensors/+/data`
- JSON payload must include `name`, `type`, and `status`
- The backend will:
  - Add new devices if `name` doesn't exist
  - Update existing devices if `name` matches
  - Broadcast changes via WebSocket