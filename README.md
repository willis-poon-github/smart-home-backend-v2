# 🔌 Smart Home Backend API (v2)

A simple RESTful API for managing IoT devices in a smart home. Built using **Node.js**, **Express**, **lowdb**, **MQTT.js**, and **WebSockets**.

---

## 🚀 Features

- Register, update, list, and delete IoT devices via REST API
- Real-time sensor data ingestion via MQTT
- WebSocket broadcasting of device updates to connected clients
- JSON-based storage using lowdb (`db.json`)
- Basic input validation and error handling

---

## 🧱 Tech Stack

- Node.js (ES Modules)
- Express.js
- LowDB (v7)
- MQTT.js (client)
- `ws` (WebSocket server)
- UUID for device IDs

---

## 📦 Installation

```bash
git clone https://github.com/willis-poon-github/smart-home-backend-v2.git
cd smart-home-backend-v2
npm install
```

---

## ▶️ Start the Server

```bash
npm run dev
```

- Server runs at: `http://localhost:3000`
- WebSocket available at: `ws://localhost:3000/`
- MQTT broker expected at: `mqtt://localhost:1883`

To start a local MQTT broker:

```bash
brew services start mosquitto
```

---

## 📘 REST API Endpoints

| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| POST   | `/devices`        | Register a new device    |
| GET    | `/devices`        | List all devices         |
| GET    | `/devices/:id`    | Get device by ID         |
| PATCH  | `/devices/:id`    | Update device data       |
| DELETE | `/devices/:id`    | Delete device by ID      |

### Example `POST /devices` Request Body

```json
{
  "name": "Living Room Light",
  "type": "light",
  "status": "off",
  "config": { "brightness": 80 }
}
```

---

## 📡 MQTT Integration

- Subscribes to: `sensors/+/data`
- Parses incoming JSON payloads:
  - If name matches an existing device → update
  - Else → add new device with UUID
- Updates saved to `db.json`
- Broadcasted to all WebSocket clients

### Example Payload

```json
{
  "name": "Temperature Sensor",
  "type": "sensor",
  "status": "active",
  "config": { "unit": "C" }
}
```

### Simulate MQTT Data

```bash
node test/mqtt-test.js
```

Or using CLI:

```bash
mosquitto_pub -h localhost -t sensors/temp/data -m '{"name":"Sensor A","type":"sensor","status":"on","config":{"value":25}}'
```

---

## 🧪 Test Examples

### ✅ MQTT Test Commands

```bash
# New sensor
mosquitto_pub -h localhost -t sensors/temp/data -m '{
  "name": "Temperature Sensor",
  "type": "sensor",
  "status": "active",
  "config": { "unit": "20C" }
}'

# Update sensor config
mosquitto_pub -h localhost -t sensors/temp/data -m '{
  "name": "Temperature Sensor",
  "config": { "unit": "21C" }
}'
```

### 🌐 REST API (using curl)

```bash
# List all devices
curl http://localhost:3000/devices

# Get by ID
curl http://localhost:3000/devices/<id>
```

### 🔌 WebSocket Testing

1. Open `test/test.html` in a browser using `file:///` protocol  
2. Messages will log in DevTools console on real-time updates

---

## 🔐 Validation & Error Handling

| Scenario                   | Response                      |
|---------------------------|-------------------------------|
| Missing required fields    | `400 Bad Request`              |
| Invalid `config` format    | `400 Bad Request`              |
| Nonexistent device ID      | `404 Not Found`                |
| `PATCH` modifies `id`      | `id` field is ignored          |

---

## 📁 Example db.json

```json
{
  "devices": [
    {
      "id": "uuid-1234",
      "name": "Living Room Light",
      "type": "light",
      "status": "off",
      "config": { "brightness": 80 }
    }
  ]
}
```

---

## 👨‍💻 Author

Willis Poon  
GitHub: [@willis-poon-github](https://github.com/willis-poon-github)

---

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)