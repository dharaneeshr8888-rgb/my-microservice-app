const express = require('express');
const client = require('prom-client');

const app = express();

// Default metrics (CPU, memory, etc.)
client.collectDefaultMetrics();

// Custom metric
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of requests'
});

app.get('/', (req, res) => {
  httpRequestCounter.inc();
  res.send('Hello from Microservice');
});

// Prometheus endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});
