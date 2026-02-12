const express = require('express');
const crypto = require('crypto');
const path = require('path');
const {
  initDb,
  listPatients,
  addPatient,
  updatePatientStage,
  listResources,
  dashboardMetrics,
  stages,
  statuses
} = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const DEMO_USERNAME = process.env.DEMO_USERNAME || 'admin';
const DEMO_PASSWORD = process.env.DEMO_PASSWORD || 'admin123';
const priorities = ['Regular', 'Elderly', 'Emergency'];
const activeSessions = new Map();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

function normalizeName(value) {
  return String(value || '').trim().replace(/\s+/g, ' ');
}

function parseAge(value) {
  const age = Number(value);
  return Number.isInteger(age) && age > 0 && age <= 120 ? age : null;
}

function requireAuth(req, res, next) {
  const token = req.header('x-session-token');
  if (!token || !activeSessions.has(token)) {
    return res.status(401).json({ error: 'Unauthorized. Please login first.' });
  }
  req.user = activeSessions.get(token);
  req.sessionToken = token;
  return next();
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'patient-flow-monitoring' });
});

app.post('/api/login', (req, res) => {
  const username = String(req.body?.username || '').trim();
  const password = String(req.body?.password || '');

  if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required' });
  }

  if (username !== DEMO_USERNAME || password !== DEMO_PASSWORD) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = crypto.randomUUID();
  activeSessions.set(token, { username, createdAt: Date.now() });
  return res.json({ token, username });
});

app.post('/api/logout', requireAuth, (req, res) => {
  activeSessions.delete(req.sessionToken);
  res.json({ ok: true });
});

app.get('/api/me', requireAuth, (req, res) => {
  res.json({ username: req.user.username });
});

app.get('/api/patients', requireAuth, asyncHandler(async (req, res) => {
  const patients = await listPatients();
  res.json(patients);
}));

app.post('/api/patients', requireAuth, asyncHandler(async (req, res) => {
  const name = normalizeName(req.body?.name);
  const age = parseAge(req.body?.age);
  const priority = req.body?.priority || 'Regular';

  if (!name || !age) {
    return res.status(400).json({ error: 'valid name and age are required' });
  }

  if (!priorities.includes(priority)) {
    return res.status(400).json({ error: `priority must be one of ${priorities.join(', ')}` });
  }

  const patient = await addPatient({ name, age, priority });
  return res.status(201).json(patient);
}));

app.patch('/api/patients/:id', requireAuth, asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const { stage, status } = req.body || {};

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'patient id must be a positive integer' });
  }

  if (!stages.includes(stage) || !statuses.includes(status)) {
    return res
      .status(400)
      .json({ error: `stage must be one of ${stages.join(', ')} and status one of ${statuses.join(', ')}` });
  }

  const updated = await updatePatientStage(id, { stage, status });
  if (!updated) return res.status(404).json({ error: 'patient not found' });
  return res.json(updated);
}));

app.get('/api/resources', requireAuth, asyncHandler(async (req, res) => {
  const resources = await listResources();
  res.json(resources);
}));

app.get('/api/metrics', requireAuth, asyncHandler(async (req, res) => {
  const metrics = await dashboardMetrics();
  res.json(metrics);
}));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize database', error);
    process.exit(1);
  });
