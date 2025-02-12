import express, { application, Request, Response } from 'express';
import chalk from 'chalk';
import Database from 'better-sqlite3';

const app = express();
const port = 3000;
const db = new Database('./mec.db', { verbose: console.log });

// API endpoint to get all Students
app.get('/students', (req, res) => {
  try {
    const students = db.prepare('SELECT * FROM students').all();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to get a single student by ID

app.get('/students/:id', (req, res) => {
  try {
    const student = db
      .prepare('SELECT * FROM students WHERE student_id = ?')
      .get(req.params.id);
    if (!student) {
      res.status(404).json({ error: 'Student not found' });
      return;
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
});

app.listen(port, () => {
  console.log(
    chalk.blueBright.bold(`:: Listening on port ${chalk.greenBright(port)} ::`)
  );
});
