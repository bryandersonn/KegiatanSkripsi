var express = require('express');
var router = express.Router();
var mysql = require('../mysql');

// get all Dosen
router.get('/', async (req, res) => {
    try {
        const [result] = await mysql.query('SELECT * FROM dosen');
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// create Dosen
router.post('/create', async (req, res) => {
    const {DosenID, Nama, Email, Password, Kampus, Jurusan} = req.body;
    try {
        const [result] = await mysql.query(
            'INSERT INTO dosen (DosenID, Nama, Email, Password, Kampus, Jurusan) VALUES (?, ?, ?, ?, ?, ?)'
            , [DosenID, Nama, Email, Password, Kampus, Jurusan]);
        res.status(201).send('Dosen created');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// get Dosen by id
router.get('/:DosenID', async (req, res) => {
    const { DosenID } = req.params;
    console.log(DosenID);
    try {
        const [result] = await mysql.query(
            'SELECT * FROM dosen WHERE DosenID = ?'
            , [DosenID]);
        if (result.length === 0) return res.status(404).send('Dosen not found');
        res.json(result[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// update
router.put('/:DosenID/update', async (req, res) => {
    const { DosenID } = req.params;
    const {Nama, Email, Password, Kampus, Jurusan} = req.body;
    try {
        const [result] = await mysql.query(
            'UPDATE dosen SET Nama = ?, Email = ?, Password = ?, Kampus = ?, Jurusan = ? WHERE DosenID = ?'
            , [Nama, Email, Password, Kampus, Jurusan, DosenID]);
        res.status(201).send('Dosen updated');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// delete
router.delete('/:DosenID/delete', async (req, res) => {
    const { DosenID } = req.params;
    try {
        const [result] = await mysql.query(
            'DELETE FROM dosen WHERE DosenID = ?'
            , [DosenID]);
            res.status(201).send('Dosen deleted');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
