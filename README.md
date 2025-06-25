# Smart Home Backend API

A simple RESTful API for managing IoT devices in a smart home environment. Built using **Node.js**, **Express**, and **lowdb** (lightweight JSON-based database).

---

## 🚀 Features

- Register new IoT devices
- List all registered devices
- Retrieve a device by ID
- Update a device’s status or config
- Delete a device
- Data persists to `db.json`

---

## 📦 Tech Stack

- Node.js (ES Modules)
- Express.js
- lowdb v7 (file-based database)
- UUID for unique device IDs

---

## 🔧 Installation

```bash
git clone https://github.com/willis-poon-github/smart-home-backend.git
cd smart-home-backend
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

## 📎 Notes

- Uses `lowdb` for local file-based persistence
- All data is written to `db.json`
- UUIDs ensure unique device identifiers
- No authentication or real-time features included

---

## 🧑‍💻 Author

Willis Poon  
GitHub: [@willis-poon-github](https://github.com/willis-poon-github)

---

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)