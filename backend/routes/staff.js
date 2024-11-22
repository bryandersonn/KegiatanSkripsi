var express = require('express');
var router = express.Router();
var mysql = require('../mysql');

// register Staff
router.post('/registerstaff', async (req, res) => {
    const {BNID, Nama, Email, Password} = req.body;
    try {
        const intostaff =
        'INSERT INTO staff (StaffID, Nama, Email) VALUES (?, ?, ?)';
        const intouser = 'INSERT INTO user (Email, Password, Role) VALUES (?, ?, "Staff")';
        await mysql.query(intouser, [Email, Password]);
        await mysql.query(intostaff, [BNID, Nama, Email]);
        res.status(200).send('Register Success');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// take StaffID by local email
router.get('/staff-id', async (req, res) => {
    const { email } = req.query; // Expecting the email as a query parameter

    if (!email) {
        return res.status(400).send('Email is required');
    }

    try {
        const [rows] = await mysql.query('SELECT StaffID FROM staff WHERE Email = ?', [email]);
        if (rows.length > 0) {
            res.status(200).json({ StaffID: rows[0].StaffID });
        } else {
            res.status(404).send('Staff not found');
        }
    } catch (err) {
        console.error('Error fetching StaffID:', err.message);
        res.status(500).send('Error fetching StaffID');
    }
});



module.exports = router;
