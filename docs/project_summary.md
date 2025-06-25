### Summary of My Approach and Challenges

For this project, I developed a lightweight Smart Home Backend API using **Node.js**, **Express**, and **lowdb**. The architecture was designed with simplicity and clarity in mind, separating concerns across RESTful device management, MQTT data ingestion, and WebSocket broadcasting.

**Key implementation highlights:**
- Connected to an MQTT broker to simulate real-time IoT device data.
- Broadcast device updates to connected WebSocket clients.
- Used UUIDs for unique device identifiers and `lowdb` for JSON-based persistence.
- Included input validation and robust error handling to manage malformed input and invalid device access.

**Challenges encountered:**
- Establishing stable WebSocket connections alongside live reload (`nodemon`) required coordination between client reconnection logic and backend stability (resolved via `nodemon.json` config).
- Ensuring MQTT messages updated devices correctly required multiple test iterations and payload adjustments.
- Installing and running Mosquitto on **macOS Sequoia 15** involved resolving permissions and dealing with partial Homebrew support for the new OS.

**Potential improvements if more time were available:**
- Updated Structure:
  - Refactor source files into folders like `/controllers`, `/routes`, and `/services` to enforce separation of concerns.
  - Move app setup out of the root directory and rename entry point as `index.js` or `server.js`.
- Integrate schema validation.
- Add authentication and user-level device access controls.
- Implement reconnection strategies on the WebSocket client side.
- Dockerize the app for portable deployment and consistent development environments.
