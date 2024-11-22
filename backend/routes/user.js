var express = require('express');
var router = express.Router();
var mysql = require('../mysql');

// get user based on role by email and password
router.post('/login', async (req, res) => {
    const { Email, Password } = req.body;
    try {
        console.log('Received login request with Email:', Email);
        const [result] = await mysql.query('SELECT Role FROM user WHERE Email = ? AND Password = ?', [Email, Password]);

        console.log('Database result:', result);

        if (result.length === 0) {
            return res.status(401).send('Invalid email or password');
        }

        res.status(200).json(result[0].Role);
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).send('Server Error');
    }
});

// get mahasiswa's NIM by local email
router.get('/get-nim', async (req, res) => {
    console.log('tes2 = ');
    const { email } = req.query;

    if (!email) {
        return res.status(400).send('Email is required');   
    }

    try {
        console.log('tes1 = ');
        const [result] = await mysql.query('SELECT NIM FROM mahasiswa WHERE Email = ?', [email]);
        console.log('tes = ' + result[0]);

        if (result.length === 0) {
            return res.status(404).send('Mahasiswa not found');
        }

        res.status(200).json({ nim: result[0].NIM });
    } catch (err) {
        console.error('Error fetching NIM:', err.message);
        res.status(500).send('Error fetching NIM');
    }
});

module.exports = router;
