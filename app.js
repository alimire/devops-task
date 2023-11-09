const express = require('express');
const app = express();
const dotenv = require('dotenv');
const promBundle = require('express-prom-bundle');

dotenv.config();

const PORT = process.env.PORT || 3000;
const APP_SECRET = process.env.APP_SECRET || 'DefaultSecretValue';

// Instrument the application with Prometheus metrics
const prometheusMiddleware = promBundle({
  autoregister: true,
  includeMethod: true,
  includePath: true,
});

app.use(prometheusMiddleware);

// GET /login endpoint
app.get('/login', (req, res) => {
  res.sendStatus(200); // Always returns 200
});

// GET /secret endpoint
app.get('/secret', (req, res) => {
  res.json({ secret: APP_SECRET });
});

// /metrics endpoint for Prometheus metrics
app.get('/metrics', (req, res) => {
  res.set('Content-Type', prometheusMiddleware.Prometheus.register.contentType);
  res.end(prometheusMiddleware.Prometheus.register.metrics());
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
