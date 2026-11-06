
const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve HTML, CSS and JavaScript files
app.use(express.static(__dirname));

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "jobportal"
});

// Connect Database
db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed:", err.message);
        return;
    }

    console.log("MySQL Connected Successfully!");
});

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Get All Jobs
app.get("/jobs", (req, res) => {
    db.query("SELECT * FROM jobs", (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

// Get Single Job
app.get("/jobs/:job_id", (req, res) => {
    const id = req.params.job_id;

    db.query(
        "SELECT * FROM jobs WHERE job_id = ?",
        [id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(result);
        }
    );
});

// Add New Job
app.post("/jobs", (req, res) => {
    const { title, company, location, salary, skills, interview_date } = req.body;

    const sql = `INSERT INTO jobs
    (title, company, location, salary, skills, interview_date)
    VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(
        sql,
        [title, company, location, salary, skills, interview_date],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({
                message: "Job Added Successfully!",
                job_id: result.insertId
            });
        }
    );
});

// Update Job
app.put("/jobs/:job_id", (req, res) => {
    const id = req.params.job_id;
    const { title, company, location, salary, skills, interview_date } = req.body;

    const sql = `UPDATE jobs SET
    title=?, company=?, location=?, salary=?, skills=?, interview_date=?
    WHERE job_id=?`;

    db.query(
        sql,
        [title, company, location, salary, skills, interview_date, id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Job Updated Successfully!" });
        }
    );
});

// Delete Job
app.delete("/jobs/:job_id", (req, res) => {
    const id = req.params.job_id;

    db.query(
        "DELETE FROM jobs WHERE job_id = ?",
        [id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Job Deleted Successfully!" });
        }
    );
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
