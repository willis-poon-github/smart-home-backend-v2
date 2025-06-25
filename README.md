# Smart Home Backend API (Version 2)

A simple RESTful API for managing IoT devices in a smart home environment. Built using **Node.js**, **Express**, and **lowdb** (lightweight JSON-based database).

- ✅ Real-time MQTT data ingestion from sensors
- ✅ Live updates via WebSocket

---

## 🚀 Features

- Register new IoT devices
- List all registered devices
- Retrieve a device by ID
- Update a device’s status or config
- Delete a device
- Receive sensor updates in real-time via MQTT
- Broadcast device updates to clients via WebSocket
- Data persists to `db.json`

---

## 📦 Tech Stack

- Node.js (ES Modules)
- Express.js
- lowdb v7 (file-based database)
- UUID for unique device IDs
- MQTT.js for MQTT client
- ws for WebSocket server

---

## 🔧 Installation

```bash
git clone https://github.com/willis-poon-github/smart-home-backend-v2.git
cd smart-home-backend-v2
npm install
```

---

## ▶️ Usage

Start the development server:

```bash
npm run dev
```

Server runs at:  
`http://localhost:3000`

---

## 📘 API Endpoints

### ✅ Register a new device  
**POST** `/devices`  
Request body:
```json
{
  "name": "Living Room Light",
  "type": "light",
  "status": "off",
  "config": { "brightness": 80 }
}
```

---

### 📋 List all devices  
**GET** `/devices`  

---

### 🔍 Get device by ID  
**GET** `/devices/:id`

---

### 🔄 Update a device  
**PATCH** `/devices/:id`  
Request body:
```json
{
  "status": "on",
  "config": { "brightness": 100 }
}
```

---

### ❌ Delete a device  
**DELETE** `/devices/:id`

---

## 📁 Data Example (`db.json`)

```json
{
  "devices": [
    {
      "id": "6a207124-0036-48e6-83d0-5d9f7c7d723b",
      "name": "Living Room Light",
      "type": "light",
      "status": "off",
      "config": {}
    }
  ]
}
```

---

## 📡 MQTT Integration

- Connects to a local MQTT broker at `mqtt://localhost:1883`
- Subscribes to topics like `sensors/+/data`
- Parses incoming JSON payloads and either:
  - Updates existing device if name matches
  - Adds a new device with `uuid` as ID
- Broadcasts updates to connected WebSocket clients
- Persists all changes to `db.json`

### Example MQTT Payload

```json
{
  "name": "Temperature Sensor",
  "type": "sensor",
  "status": "active",
  "config": {
    "unit": "C"
  }
}
```

### To Test MQTT

Run:

```bash
node mqtt-test.js
```

This script publishes sample sensor data to your MQTT broker to simulate incoming device messages.

---

## 🧪 Testing Setup

```bash
npm install
npm run dev
```

Ensure you have an MQTT broker running:

```bash
brew services start mosquitto
```

Open a WebSocket client or browser dev console to connect to:

```
ws://localhost:3000/
```

---


# ✅ MQTT and REST API Test Examples for Smart Home Backend

---

## ✅ MQTT Test Examples (via `mosquitto_pub`)

### 1. Send simple message to a test topic
```bash
mosquitto_pub -h localhost -t "sensors/temp/data" -m "hello world"
```

---

### 2. Publish a new temperature sensor via MQTT
```bash
mosquitto_pub -h localhost -t sensors/temp/data -m '{
  "name": "Temperature Sensor",
  "type": "sensor",
  "status": "active",
  "config": { "unit": "20C" }
}'
```

---

### 3. Update the temperature sensor config (simulate new data)
```bash
mosquitto_pub -h localhost -t sensors/temp/data -m '{
  "name": "Temperature Sensor",
  "type": "sensor",
  "status": "active",
  "config": { "unit": "21C" }
}'
```

---

### 4. Add a humidity sensor
```bash
mosquitto_pub -h localhost -t sensors/temp/data -m '{
  "name": "Humidity Sensor",
  "type": "sensor",
  "status": "active",
  "config": { "unit": "60%" }
}'
```

---

### 5. Simulate frequent updates from "Living Room Sensor"
```bash
mosquitto_pub -h localhost -t sensors/temp/data -m '{
  "name": "Living Room Sensor",
  "type": "sensor",
  "status": "on",
  "config": { "value": 22.5 }
}'
```

---

## 🌐 REST API Test Examples (via `curl`)

### 1. Get all devices
```bash
curl http://localhost:3000/devices
```

---

### 2. Get device by ID (example: Temperature Sensor)
```bash
curl http://localhost:3000/devices/92137558-3f01-4e26-a5de-84f423ce2db1
```

---

## 🔌 WebSocket Testing

You can test real-time WebSocket updates using a simple HTML page.

### Example: `test.html` in root directory

Open it in your browser using:

```
file:///path/to/your/test.html
```

Once opened, it will connect to your WebSocket server and log messages in the browser console.

---

## 🔐 Validation & Error Handling

The API includes basic error handling for common edge cases:

- **Missing Required Fields:**  
  `POST /devices` returns `400 Bad Request` if `name`, `type`, or `status` is missing.

- **Invalid `config` Format:**  
  Both `POST` and `PATCH` endpoints validate that `config` (if provided) is a valid JSON object.

- **Nonexistent Device ID:**  
  `GET`, `PATCH`, and `DELETE /devices/:id` return `404 Not Found` if the ID does not match any existing device.

- **Sanitization:**  
  `PATCH` requests ignore and discard any attempt to modify the `id` field.

---

## 🧑‍💻 Author

Willis Poon  
GitHub: [@willis-poon-github](https://github.com/willis-poon-github)

---

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)