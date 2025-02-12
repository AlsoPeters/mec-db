import Database from 'better-sqlite3';

const db = new Database('mec.db', { verbose: console.log });

// grab all users from db
export function getStudents() {
  const query = 'SELECT * FROM students';
  const students = db.prepare(query).all();

  console.log(students);
}
