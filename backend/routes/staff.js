var express = require('express');
var router = express.Router();
var mysql = require('../mysql');

// get all staff
router.get('/', async (req, res) => {
    try {
        const [result] = await mysql.query('SELECT * FROM staff');
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// create staff
router.post('/create', async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const [result] = await mysql.query(
            'INSERT INTO staff (name, email, password) VALUES (?, ?, ?)'
            , [name, email, password]);
        res.status(201).json({ id: result.insertId, name, email });
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// get staff by id
router.get('/:staffID', async (req, res) => {
    const { staffID } = req.params;
    try {
        const [result] = await mysql.query(
            'SELECT * FROM staff WHERE staffID = ?'
            , [staffID]);
        if (rows.length === 0) return res.status(404).send('staff not found');
        res.json(result[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// update
router.put('/:staffID/update', async (req, res) => {
    const { staffID } = req.params;
    const {name, email, password} = req.body;
    try {
        const [result] = await mysql.query(
            'UPDATE staff SET Name = ?, Email = ?, Password = ? WHERE staffID = ?'
            , [name, email, password, staffID]);
        res.status(201).send('staff updated');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// delete
router.delete('/:staffID/delete', async (req, res) => {
    const { staffID } = req.params;
    try {
        const [result] = await mysql.query(
            'DELETE FROM staff WHERE staffID = ?'
            , [staffID]);
            res.status(201).send('staff deleted');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
