import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';

// Set up adapter and db instance with default structure
const adapter = new JSONFileSync('db.json');
const db = new LowSync(adapter, {
  defaultData: { devices: [] } // required in lowdb v7+
});

db.read();

// 🛠 If file is new, this ensures it's created
if (!db.data || !db.data.devices) {
  db.data = { devices: [] };
  db.write(); // ✅ This actually writes db.json to disk
}

export default db;
