// Import the WebSocket server module
import { WebSocketServer } from 'ws';

let wss; // Global WebSocket server reference

// Initialize WebSocket server on top of existing HTTP server
export const initWebSocket = (server) => {
  // Create WebSocket server and attach to existing HTTP server
  wss = new WebSocketServer({ server });

  // Event: new client connection
  wss.on('connection', (ws) => {
    console.log('Client connected via WebSocket');

    // Event: client disconnected
    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });

  return wss;
};

// Broadcast a JSON message to all connected clients
export const broadcast = (data) => {
  if (!wss) return; // Ensure WebSocket server is initialized

  const message = JSON.stringify(data); // Serialize data

  // Iterate through all connected clients
  wss.clients.forEach((client) => {
    // Check if connection is open (readyState === 1)
    if (client.readyState === 1) {
      client.send(message); // Send message
    }
  });
};
