
# websocket.js - WebSocket Server

This module initializes a WebSocket server and provides a `broadcast()` utility for real-time communication with clients.

## Key Responsibilities

- Starts a WebSocket server on the provided HTTP server
- Listens for client `connection` and `close` events
- `broadcast(data)` sends JSON messages to all connected clients

## Broadcast Example

```js
broadcast({
  type: 'update',
  device: { id, name, type, status, config }
});
```

Ensures real-time updates are sent to clients when MQTT data is received or devices are updated.
