# 🏗️ Project Architecture Overview

This document outlines the architecture of the **Smart Home Backend** application, which manages IoT devices using a combination of RESTful APIs, MQTT, and WebSocket communication.

---

## 📁 Folder Structure

```
smart-home-backend/
│
├── src/
│   ├── app.js             # Main Express app and HTTP server setup
│   ├── mqtt.js            # MQTT client for subscribing to sensor data
│   ├── websocket.js       # WebSocket server to broadcast device updates
│   ├── db.js              # lowdb database instance setup
│
├── db.json                # Local JSON-based database file
├── test/
│   ├── mqtt-test.js       # Utility script to simulate MQTT messages
│   ├── test.html          # Test WebSocket integration from MQTT messages to frontend
│
├── docs/                  # Documentation folder
│   ├── README.md          # Project overview and API reference
│   ├── architecture.md    # This file
│   ├── mqtt_test_script.md# MQTT testing guide
│   └── ws_browser_test.md # WebSocket testing in browser
│
└── package.json           # NPM dependencies and scripts
```

---

## 🧩 Components

### 1. **REST API (Express.js)**
- Provides CRUD endpoints for `/devices`.
- Handles JSON requests and responses.
- All data changes are persisted to `db.json`.

### 2. **MQTT Listener**
- Connects to a local broker (`mqtt://localhost:1883`).
- Subscribes to `sensors/+/data` topics.
- Parses and processes messages into device records.
- New or updated devices are saved and broadcasted via WebSocket.

### 3. **WebSocket Server**
- Starts alongside the HTTP server on port `3000`.
- Accepts connections from browser-based clients.
- Broadcasts device updates in real time using `broadcast()`.

---

## 🔄 Data Flow

1. **MQTT Device Message → MQTT Listener**
2. **Listener updates/inserts device in db.json**
3. **Changes are broadcast via WebSocket**
4. **Frontend displays live update**
5. **API (Express) allows manual device CRUD**

---

## 🗃️ Database

- Based on [`lowdb`](https://github.com/typicode/lowdb) (file-based)
- Schema:
```json
{
  "devices": [
    {
      "id": "uuid",
      "name": "string",
      "type": "sensor | light | other",
      "status": "on | off | active",
      "config": { "any additional config" }
    }
  ]
}
```

---

## ✅ Summary

This system is ideal for lightweight IoT projects or prototypes that:
- Require local device data handling.
- Need real-time updates.
- Prefer file-based persistence over full databases like MongoDB or PostgreSQL.

For scaling, consider:
- Switching `lowdb` to a cloud DB.
- Deploying MQTT broker (e.g. AWS IoT Core).
- Adding authentication.

---