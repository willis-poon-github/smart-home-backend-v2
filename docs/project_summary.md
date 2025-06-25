### Summary of My Approach and Challenges

In this project, I built a lightweight Smart Home Backend API using Node.js, Express, and lowdb. The architecture emphasizes modularity and simplicity, with separate modules for MQTT data ingestion, WebSocket broadcasting, and RESTful device management.

**Key implementation highlights:**
- Integrated an MQTT broker to simulate real-time IoT device data.
- Broadcast device updates to connected WebSocket clients.
- Used UUIDs for unique device identifiers and lowdb for JSON-based persistence.
- Implemented input validation and robust error handling to guard against malformed data and invalid device access.

**Interesting challenges:**
- Getting WebSocket connections to work consistently when using live reload (nodemon) required coordination between client reconnect logic and backend stability.
- Managing MQTT message parsing and ensuring idempotent device updates demanded careful design to avoid duplicates or partial overwrites.
- Debugging permission issues on macOS during Mosquitto and Homebrew installation required fine-grained command-line adjustments.

**If more time were available**, improvements would include:
- Better schema validation (e.g., using Joi or Zod).
- Real authentication and user-specific device filtering.
- WebSocket reconnection strategies for clients.
- Dockerization for easier deployment and testing.