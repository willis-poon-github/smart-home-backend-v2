import mqtt from 'mqtt';

const client = mqtt.connect('mqtt://localhost:1883');

const testMessages = [
  {
    topic: 'sensors/temp/data',
    message: {
      name: 'Temperature Sensor',
      type: 'sensor',
      status: 'active',
      config: { unit: '20C' }
    }
  },
  {
    topic: 'sensors/smoke/data',
    message: {
      name: 'Smoke Alarm',
      type: 'alarm',
      status: 'inactive',
      config: { sensitivity: 'high' }
    }
  },
  {
    topic: 'sensors/humidity/data',
    message: {
      name: 'Humidity Sensor',
      type: 'sensor',
      status: 'active',
      config: { unit: '50%' }
    }
  }
];

client.on('connect', () => {
  console.log('✅ MQTT Test Client Connected');

  testMessages.forEach(({ topic, message }, index) => {
    setTimeout(() => {
      const payload = JSON.stringify(message);
      client.publish(topic, payload, {}, () => {
        console.log(`📤 Published to ${topic}: ${payload}`);
        if (index === testMessages.length - 1) {
          setTimeout(() => client.end(), 1000); // Clean disconnect
        }
      });
    }, index * 500); // small delay between messages
  });
});
