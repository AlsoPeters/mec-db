import Database from 'better-sqlite3';
const db = new Database('mec.db', { verbose: console.log });
const query = `
    CREATE TABLE students (
        student_id INTEGER PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        age INTEGER NOT NULL,
        level TEXT NOT NULL
    )
`;
db.exec(query);
//Seed Database
const studentData = [
    { first_name: 'Soan', last_name: 'Garcia', age: 5, level: 'E-1' },
    { first_name: 'Yune', last_name: 'Garcia', age: 3, level: 'K-1' },
    { first_name: 'Ui', last_name: 'Garcia', age: 36, level: 'ADULT' },
];
const insert = db.prepare('INSERT INTO students (first_name, last_name, age, level) VALUES (@first_name, @last_name, @age, @level)');
const insertData = db.transaction((student) => {
    for (const student of studentData)
        insert.run(student);
});
insertData([studentData]);
