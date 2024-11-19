var express = require('express');
var router = express.Router();
var mysql = require('../mysql');

// get all skripsi
router.get('/', async (req, res) => {
    try {
        const [result] = await mysql.query('SELECT * FROM skripsi');
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// create skripsi
router.post('/create', async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const [result] = await mysql.query(
            'INSERT INTO skripsi (name, email, password) VALUES (?, ?, ?)'
            , [name, email, password]);
        res.status(201).json({ id: result.insertId, name, email });
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// get skripsi by id
router.get('/:skripsiID', async (req, res) => {
    const { skripsiID } = req.params;
    try {
        const [result] = await mysql.query(
            'SELECT * FROM skripsi WHERE skripsiID = ?'
            , [skripsiID]);
        if (rows.length === 0) return res.status(404).send('skripsi not found');
        res.json(result[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// update
router.put('/:skripsiID/update', async (req, res) => {
    const { skripsiID } = req.params;
    const {name, email, password} = req.body;
    try {
        const [result] = await mysql.query(
            'UPDATE skripsi SET Name = ?, Email = ?, Password = ? WHERE skripsiID = ?'
            , [name, email, password, skripsiID]);
        res.status(201).send('skripsi updated');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// delete
router.delete('/:skripsiID/delete', async (req, res) => {
    const { skripsiID } = req.params;
    try {
        const [result] = await mysql.query(
            'DELETE FROM skripsi WHERE skripsiID = ?'
            , [skripsiID]);
            res.status(201).send('skripsi deleted');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
