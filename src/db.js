const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, '..', 'data', 'patient-flow.db');
const db = new sqlite3.Database(dbPath);

const stages = ['Vision Test', 'Imaging', 'Consultation', 'Treatment', 'Completed'];
const statuses = ['Waiting', 'In Test', 'With Doctor', 'Completed'];

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

async function initDb() {
  await run(`CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    priority TEXT NOT NULL,
    stage TEXT NOT NULL,
    status TEXT NOT NULL,
    createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);

  await run(`CREATE TABLE IF NOT EXISTS resources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    status TEXT NOT NULL,
    utilization INTEGER NOT NULL,
    updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);

  const existing = await get('SELECT COUNT(*) as count FROM patients');
  if (!existing || existing.count === 0) {
    const samplePatients = [
      ['T001', 'Anita Rao', 67, 'Elderly', 'Vision Test', 'Waiting'],
      ['T002', 'Suresh N', 42, 'Regular', 'Imaging', 'In Test'],
      ['T003', 'Mary Joseph', 71, 'Emergency', 'Consultation', 'With Doctor'],
      ['T004', 'Dinesh K', 34, 'Regular', 'Vision Test', 'Waiting'],
      ['T005', 'Lakshmi P', 59, 'Regular', 'Treatment', 'In Test']
    ];

    for (const p of samplePatients) {
      await run(
        `INSERT INTO patients (token, name, age, priority, stage, status) VALUES (?, ?, ?, ?, ?, ?)`,
        p
      );
    }
  }

  const resourceCount = await get('SELECT COUNT(*) as count FROM resources');
  if (!resourceCount || resourceCount.count === 0) {
    const sampleResources = [
      ['Doctor', 'Dr. Meena', 'Available', 60],
      ['Doctor', 'Dr. Arvind', 'Busy', 85],
      ['Equipment', 'OCT Machine', 'Busy', 90],
      ['Equipment', 'Fundus Camera', 'Available', 45],
      ['Equipment', 'Slit Lamp', 'Busy', 75]
    ];

    for (const resource of sampleResources) {
      await run(
        `INSERT INTO resources (type, name, status, utilization) VALUES (?, ?, ?, ?)`,
        resource
      );
    }
  }
}

async function listPatients() {
  return all('SELECT * FROM patients ORDER BY id');
}

async function addPatient({ name, age, priority }) {
  const row = await get('SELECT COUNT(*) as count FROM patients');
  const token = `T${String((row?.count || 0) + 1).padStart(3, '0')}`;
  const result = await run(
    `INSERT INTO patients (token, name, age, priority, stage, status) VALUES (?, ?, ?, ?, ?, ?)`,
    [token, name, age, priority, stages[0], statuses[0]]
  );
  return get('SELECT * FROM patients WHERE id = ?', [result.id]);
}

async function updatePatientStage(id, { stage, status }) {
  await run(
    `UPDATE patients SET stage = ?, status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
    [stage, status, id]
  );
  return get('SELECT * FROM patients WHERE id = ?', [id]);
}

async function listResources() {
  return all('SELECT * FROM resources ORDER BY id');
}

async function dashboardMetrics() {
  const waiting = await get("SELECT COUNT(*) as count FROM patients WHERE status = 'Waiting'");
  const withDoctor = await get("SELECT COUNT(*) as count FROM patients WHERE status = 'With Doctor'");
  const inTest = await get("SELECT COUNT(*) as count FROM patients WHERE status = 'In Test'");
  const completed = await get("SELECT COUNT(*) as count FROM patients WHERE stage = 'Completed'");

  const byStage = await all(
    `SELECT stage, COUNT(*) as count FROM patients GROUP BY stage ORDER BY count DESC`
  );

  const avgUtilization = await get('SELECT ROUND(AVG(utilization), 1) as avg FROM resources');

  return {
    queue: {
      waiting: waiting.count,
      inTest: inTest.count,
      withDoctor: withDoctor.count,
      completed: completed.count
    },
    avgUtilization: avgUtilization?.avg || 0,
    byStage
  };
}

module.exports = {
  initDb,
  listPatients,
  addPatient,
  updatePatientStage,
  listResources,
  dashboardMetrics,
  stages,
  statuses
};
