# WebSocket Browser Test for Smart Home Backend

This guide explains how to test the real-time WebSocket updates from your Smart Home backend.

---

## 📄 Prerequisites

- WebSocket server running at `ws://localhost:3000`
- Devices sending updates via MQTT
- Backend and WebSocket properly configured and running (`npm run dev`)

---

## 🔍 Steps

1. **Create an HTML file:**

Save the following as `test.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>WebSocket Test</title>
</head>
<body>
  <h1>WebSocket Test</h1>
  <pre id="output">Connecting...</pre>

  <script>
    const output = document.getElementById('output');
    const socket = new WebSocket('ws://localhost:3000');

    socket.onopen = () => {
      output.textContent = '✅ Connected';
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      output.textContent += `\n📨 Message: ${JSON.stringify(msg, null, 2)}`;
    };

    socket.onclose = () => {
      output.textContent += '\n❌ Disconnected';
    };

    socket.onerror = (err) => {
      output.textContent += '\n⚠️ Error: ' + err.message;
    };
  </script>
</body>
</html>
```

---

2. **Open in Browser:**

Open the file directly from your file system (no need to host it):

```bash
file:///absolute/path/to/test.html
```

Example: `file:///Users/willispoonuk/Documents/test.html`

> ✅ You should see messages appear when MQTT devices send updates and trigger WebSocket broadcasts.

---

## ✅ Done!

This confirms WebSocket integration from MQTT messages to frontend.

