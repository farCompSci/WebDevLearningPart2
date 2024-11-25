import pg from 'pg';

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'world',
    password: password,
    port: 5432
});

db.connect();

db.query('SELECT * FROM country', (err, res) => {
    if (err) {
        console.log(err.stack);
    } else {
        quiz = res.rows;
    }
    db.end();
});