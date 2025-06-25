
# app.js - Express App Entry Point

This is the main entry point for the Smart Home Backend API. It sets up the HTTP server, RESTful routes, and integrates the MQTT and WebSocket modules.

## Key Responsibilities

- Initializes Express and JSON middleware
- Sets up routes to manage IoT devices:
  - `GET /devices` — list all
  - `POST /devices` — create new
  - `GET /devices/:id` — retrieve by ID
  - `PATCH /devices/:id` — update
  - `DELETE /devices/:id` — delete
- Uses UUIDs for device IDs
- Persists changes with `lowdb`
- Initializes WebSocket and HTTP server on port 3000

## Server Startup

```js
const server = http.createServer(app);
initWebSocket(server);
server.listen(3000);
```

Logs `✅ Server + WebSocket listening on port 3000`.
