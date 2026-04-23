const express = require('express');
const client = require('prom-client');

const app = express();
const port = 3000;

client.collectDefaultMetrics();

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of requests'
});

app.get('/', (req, res) => {
  httpRequestCounter.inc();

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Microservice Apps</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        body {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a, #1e3a8a);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          color: #fff;
        }

        .card {
          width: 100%;
          max-width: 850px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.25);
          backdrop-filter: blur(10px);
        }

        .badge {
          display: inline-block;
          background: #22c55e;
          color: #052e16;
          font-size: 14px;
          font-weight: bold;
          padding: 8px 14px;
          border-radius: 999px;
          margin-bottom: 20px;
        }

        h1 {
          font-size: 42px;
          margin-bottom: 12px;
        }

        .subtitle {
          font-size: 18px;
          color: #dbeafe;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
          margin-bottom: 30px;
        }

        .box {
          background: rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 20px;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .box h3 {
          color: #93c5fd;
          margin-bottom: 8px;
          font-size: 18px;
        }

        .box p {
          color: #e5e7eb;
          line-height: 1.5;
          font-size: 15px;
        }

        .buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn {
          text-decoration: none;
          background: #2563eb;
          color: white;
          padding: 12px 18px;
          border-radius: 12px;
          font-weight: bold;
          transition: 0.2s ease;
        }

        .btn:hover {
          background: #1d4ed8;
        }

        .btn.secondary {
          background: #334155;
        }

        .btn.secondary:hover {
          background: #475569;
        }

        .footer {
          margin-top: 24px;
          font-size: 14px;
          color: #cbd5e1;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="badge">Running Successfully</div>
        <h1>Microservice Dashboard</h1>
        <p class="subtitle">
          A simple and easy microservice application deployed with Jenkins, Docker, Kubernetes, Prometheus, and Grafana.
        </p>

        <div class="grid">
          <div class="box">
            <h3>Jenkins CI/CD</h3>
            <p>Build, test, Docker image creation, push, and Kubernetes deployment are automated.</p>
          </div>
          <div class="box">
            <h3>Docker</h3>
            <p>The application is containerized for portability and consistent deployment.</p>
          </div>
          <div class="box">
            <h3>Kubernetes</h3>
            <p>The service runs in your Minikube cluster and is exposed using a NodePort service.</p>
          </div>
          <div class="box">
            <h3>Monitoring</h3>
            <p>Prometheus collects metrics, and Grafana visualizes them using dashboards.</p>
          </div>
        </div>

        <div class="buttons">
          <a class="btn" href="/metrics">View Metrics</a>
          <a class="btn secondary" href="/">Refresh</a>
        </div>

        <div class="footer">
          Node.js + Express Microservice UI.
        </div>
      </div>
    </body>
    </html>
  `);
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
