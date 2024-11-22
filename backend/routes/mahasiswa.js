var express = require('express');
var router = express.Router();
var mysql = require('../mysql');

// register mahasiwa
router.post('/registermahasiswa', async (req, res) => {
    const {NIM, Nama, Email, Password, TanggalLahir, Alamat} = req.body;
    try {
        const intomahasiswa =
        'INSERT INTO mahasiswa (NIM, Nama, Email, TanggalLahir, Alamat) VALUES (?, ?, ?, ?, ?)';
        const intouser = 'INSERT INTO user (Email, Password, Role) VALUES (?, ?, "Mahasiswa")';
        await mysql.query(intouser, [Email, Password]);
        await mysql.query(intomahasiswa, [NIM, Nama, Email, TanggalLahir, Alamat]);
        res.status(200).send('Register Success');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// see mahasiswa
router.get('/mahasiswa', async (req, res) => {
    try {
        const query = 'SELECT * FROM mahasiswa';
        const [rows] = await mysql.query(query);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


router.get('/mahasiswa/:nim', async (req, res) => {
    const { nim } = req.params;
    try {
        const query = 'SELECT * FROM mahasiswa WHERE NIM = ?';
        const [rows] = await mysql.query(query, [nim]);
        if (rows.length === 0) {
            return res.status(404).send('Mahasiswa not found');
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


router.put('/mahasiswa/:nim', async (req, res) => {
    const { nim } = req.params;
    const { Nama, Email, Password, TanggalLahir, Alamat } = req.body;
    try {
        const updateUser = 'UPDATE user SET Email = ?, Password = ? WHERE Email = (SELECT Email FROM mahasiswa WHERE NIM = ?)';
        const updateMahasiswa =
            'UPDATE mahasiswa SET Nama = ?, Email = ?, TanggalLahir = ?, Alamat = ? WHERE NIM = ?';
        await mysql.query(updateUser, [Email, Password, nim]);
        await mysql.query(updateMahasiswa, [Nama, Email, TanggalLahir, Alamat, nim]);
        res.status(200).send('Mahasiswa updated successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});


router.delete('/mahasiswa/:nim', async (req, res) => {
    const { nim } = req.params;
    try {
        const deleteUser = 'DELETE FROM user WHERE Email = (SELECT Email FROM mahasiswa WHERE NIM = ?)';
        const deleteMahasiswa = 'DELETE FROM mahasiswa WHERE NIM = ?';
        await mysql.query(deleteUser, [nim]);
        await mysql.query(deleteMahasiswa, [nim]);
        res.status(200).send('Mahasiswa deleted successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
