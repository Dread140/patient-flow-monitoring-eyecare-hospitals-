const express = require('express');
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

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'patient-flow-monitoring' });
});

app.get('/api/patients', async (req, res) => {
  const patients = await listPatients();
  res.json(patients);
});

app.post('/api/patients', async (req, res) => {
  const { name, age, priority = 'Regular' } = req.body || {};
  if (!name || !age) {
    return res.status(400).json({ error: 'name and age are required' });
  }

  const patient = await addPatient({ name, age: Number(age), priority });
  return res.status(201).json(patient);
});

app.patch('/api/patients/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { stage, status } = req.body || {};

  if (!stages.includes(stage) || !statuses.includes(status)) {
    return res
      .status(400)
      .json({ error: `stage must be one of ${stages.join(', ')} and status one of ${statuses.join(', ')}` });
  }

  const updated = await updatePatientStage(id, { stage, status });
  if (!updated) return res.status(404).json({ error: 'patient not found' });
  return res.json(updated);
});

app.get('/api/resources', async (req, res) => {
  const resources = await listResources();
  res.json(resources);
});

app.get('/api/metrics', async (req, res) => {
  const metrics = await dashboardMetrics();
  res.json(metrics);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
