import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';

// ⚙️ Create a JSON file adapter (data stored in db.json)
const adapter = new JSONFileSync('db.json');

// 📦 Initialize LowDB with default structure
const db = new LowSync(adapter, {
  defaultData: { devices: [] } // required in lowdb v7+ to initialize structure
});

// 🔄 Load the database from file
db.read();

// 🛠 If file is empty or improperly structured, initialize with default data
if (!db.data || !db.data.devices) {
  db.data = { devices: [] };
  db.write(); // ✅ Persist the default structure to disk
}

// 🚀 Export the db instance for use in other modules
export default db;
