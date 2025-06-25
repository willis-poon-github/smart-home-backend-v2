📄 db.js – Local Database Module
================================

This module configures and manages a lightweight JSON-based database using `lowdb`.

✅ Purpose
---------
- Store and persist IoT device records in a local file (`db.json`)
- Used as the central data store for your Express and MQTT logic
- Automatically initializes with default structure if file is missing or empty

🛠 Architecture Overview
------------------------
          +----------------------+
          |    Application Code  |
          |   (Express + MQTT)   |
          +----------+-----------+
                     |
                     v
            +-----------------+
            |    db.js        |
            |   (LowDB v7)    |
            +--------+--------+
                     |
                     v
            +-----------------+
            |   db.json file  |
            | (local storage) |
            +-----------------+

⚙️ How It Works
---------------
1. Adapter Setup:
   const adapter = new JSONFileSync('db.json');

2. Database Instance:
   const db = new LowSync(adapter, {
     defaultData: { devices: [] }
   });

3. Initial Read:
   db.read();

4. Default Initialization:
   if (!db.data || !db.data.devices) {
     db.data = { devices: [] };
     db.write();
   }

📁 Example db.json
------------------
{
  "devices": [
    {
      "id": "abc123",
      "name": "Living Room Light",
      "type": "light",
      "status": "on",
      "config": { "brightness": 80 }
    }
  ]
}
