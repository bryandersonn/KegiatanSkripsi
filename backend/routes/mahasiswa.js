var express = require('express');
var router = express.Router();
var mysql = require('../mysql');

// get all mahasiswa
router.get('/', async (req, res) => {
    try {
        const [result] = await mysql.query('SELECT * FROM mahasiswa');
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// create mahasiswa
router.post('/create', async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const [result] = await mysql.query(
            'INSERT INTO mahasiswa (name, email, password) VALUES (?, ?, ?)'
            , [name, email, password]);
        res.status(201).json({ id: result.insertId, name, email });
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// get mahasiswa by id
router.get('/:mahasiswaID', async (req, res) => {
    const { mahasiswaID } = req.params;
    try {
        const [result] = await mysql.query(
            'SELECT * FROM mahasiswa WHERE mahasiswaID = ?'
            , [mahasiswaID]);
        if (rows.length === 0) return res.status(404).send('mahasiswa not found');
        res.json(result[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// update
router.put('/:mahasiswaID/update', async (req, res) => {
    const { mahasiswaID } = req.params;
    const {name, email, password} = req.body;
    try {
        const [result] = await mysql.query(
            'UPDATE mahasiswa SET Name = ?, Email = ?, Password = ? WHERE mahasiswaID = ?'
            , [name, email, password, mahasiswaID]);
        res.status(201).send('mahasiswa updated');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// delete
router.delete('/:mahasiswaID/delete', async (req, res) => {
    const { mahasiswaID } = req.params;
    try {
        const [result] = await mysql.query(
            'DELETE FROM mahasiswa WHERE mahasiswaID = ?'
            , [mahasiswaID]);
            res.status(201).send('mahasiswa deleted');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
