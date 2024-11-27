const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const dbCon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "fytiafytia22$",
    database: "my_database",
    port: 3306
});

dbCon.connect((err) => {
    if (err) throw err;
    console.log("Successfully connected to MySQL!");
});

app.post('/add', (req, res) => {
    const { name, email } = req.body;
    const sql = `INSERT INTO users (name, email) VALUES (?, ?)`;
    dbCon.query(sql, [name, email], (err, result) => {
        if (err) throw err;
        console.log(`User added: ${name}, ${email}`);
        res.send('User added successfully!');
    });
});

app.get('/records', (req, res) => {
    const sql = `SELECT * FROM users`;
    dbCon.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.json(results);
    });
});

app.get('/record/:id', (req, res) => {
    const sql = `SELECT * FROM users WHERE id = ?`;
    dbCon.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});