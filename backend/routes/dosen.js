var express = require('express');
var router = express.Router();
var mysql = require('../mysql');


router.post('/registerdosen', async (req, res) => {
    const {BNID, Nama, Email, Password} = req.body;
    try {
        const intodosen =
        'INSERT INTO dosen (DosenID, Nama, Email) VALUES (?, ?, ?)';
        const intouser = 'INSERT INTO user (Email, Password, Role) VALUES (?, ?, "Dosen")';
        await mysql.query(intouser, [Email, Password]);
        await mysql.query(intodosen, [BNID, Nama, Email]);
        res.status(200).send('Register Success');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// get dosen by local email
router.get('/dosen-by-email', async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).send('Email is required');
    }

    try {
        const [dosen] = await mysql.query('SELECT * FROM dosen WHERE Email = ?', [email]);

        if (dosen.length === 0) {
            return res.status(404).send('Dosen not found');
        }

        res.status(200).json(dosen[0]);
    } catch (err) {
        console.error('Error fetching dosen by email:', err.message);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;
