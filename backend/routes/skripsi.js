const express = require('express');
const router = express.Router();
const mysql = require('../mysql');

// Middleware
const validateEmail = async (req, res, next) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).send('Email is required');
    }

    try {
        const [user] = await mysql.query('SELECT NIM FROM mahasiswa WHERE Email = ?', [email]);
        if (user.length === 0) {
            return res.status(404).send('Mahasiswa not found');
        }

        req.nim = user[0].NIM;
        next();
    } catch (err) {
        console.error('Error validating email:', err.message);
        return res.status(500).send('Internal Server Error');
    }
};

// check skripsi by mahasiswa's email
router.get('/check-skripsi-by-email', validateEmail, async (req, res) => {
    const { nim } = req;

    try {
        const [rows] = await mysql.query('SELECT * FROM skripsi WHERE nim = ?', [nim]);

        if (rows.length > 0) {
            return res.status(200).json({ hasSkripsi: true, skripsi: rows[0] });
        }

        res.status(200).json({ hasSkripsi: false });
    } catch (err) {
        console.error('Error checking skripsi:', err.message);
        res.status(500).send('Error checking skripsi');
    }
});

// add proposal
router.post('/apply-skripsi', async (req, res) => {
    const { nim, dosenID, judulSkripsi, linkFile } = req.body;

    if (!nim || !dosenID || !judulSkripsi || !linkFile) {
        return res.status(400).send('All fields are required');
    }

    try {
        await mysql.query(
            `INSERT INTO skripsi (nim, dosenID, JudulSkripsi, LinkFile, StatusSkripsi, staffID) 
            VALUES (?, ?, ?, ?, 'Pending', NULL)`,
            [nim, dosenID, judulSkripsi, linkFile]
        );

        res.status(200).send('Skripsi application successful');
    } catch (err) {
        console.error('Error applying skripsi:', err.message);
        res.status(500).send('Error applying skripsi');
    }
});

// approve proposal
router.put('/approve-skripsi/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send('Skripsi ID is required');
    }

    try {
        await mysql.query(
            `UPDATE skripsi SET StatusSkripsi = 'Accepted' WHERE ID = ?`,
            [id]
        );

        res.status(200).send('Skripsi approved');
    } catch (err) {
        console.error('Error approving skripsi:', err.message);
        res.status(500).send('Error approving skripsi');
    }
});

// delete skripsi proposal
router.delete('/delete-skripsi/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send('Skripsi ID is required');
    }

    try {
        await mysql.query(`DELETE FROM skripsi WHERE ID = ?`, [id]);

        res.status(200).send('Skripsi denied and deleted');
    } catch (err) {
        console.error('Error deleting skripsi:', err.message);
        res.status(500).send('Error deleting skripsi');
    }
});


// get available dosen
router.get('/available-dosen', async (req, res) => {
    try {
        
        const [assignedDosen] = await mysql.query(
            `SELECT DISTINCT dosenID FROM skripsi`
        );

        const assignedDosenIDs = assignedDosen.map(item => item.dosenID);

        
        let query = 'SELECT DosenID, Nama FROM dosen';
        if (assignedDosenIDs.length > 0) {
            query += ` WHERE DosenID NOT IN (${assignedDosenIDs.map(id => `'${id}'`).join(',')})`;
        }

        const [availableDosen] = await mysql.query(query);

        

        
        if (!availableDosen.length) {
            return res.status(404).send('No available dosen found');
        }
        

        res.status(200).json({ availableDosen });
    } catch (err) {
        console.error('Error fetching dosen:', err.message);
        res.status(500).send('Error fetching available dosen');
    }
});


router.get('/skripsi-by-dosen/:dosenID', async (req, res) => {
    const { dosenID } = req.params;

    try {
        const [rows] = await mysql.query(
            `SELECT * FROM skripsi WHERE dosenID = ?`,
            [dosenID]
        );

        if (rows.length > 0) {
            return res.status(200).json(rows);
        }

        res.status(404).send('No skripsi proposals found for this dosen');
    } catch (err) {
        console.error('Error fetching skripsi for dosen:', err.message);
        res.status(500).send('Error fetching skripsi');
    }
});

// get all skripsi data
router.get('/skripsi', async (req, res) => {
    try {
        const [results] = await mysql.query('SELECT * FROM skripsi WHERE StatusSkripsi = "Accepted" OR StatusSkripsi = "Scheduled" ');
        res.json(results);
    } catch (error) {
        console.error('Error fetching skripsi:', error);
        res.status(500).json({ error: 'Failed to fetch skripsi' });
    }
});

// update skripsi based on skripsi id
router.put('/:skripsiID', async (req, res) => {
    const { skripsiID } = req.params;
    const { TanggalSidang, TempatSidang, CurrStaffID } = req.body;

    try {
        await mysql.query(
            `UPDATE skripsi SET TanggalSidang = ?, TempatSidang = ?, staffID = ?, StatusSkripsi = ? WHERE ID = ?`,
            [TanggalSidang, TempatSidang, CurrStaffID, 'Scheduled', skripsiID]
        );
        res.json({ message: 'Skripsi updated successfully' });
    } catch (error) {
        console.error('Error updating skripsi:', error);
        res.status(500).json({ error: 'Failed to update skripsi' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const [rows] = await mysql.query('SELECT * FROM skripsi WHERE ID = ?', [id]);
  
      if (rows.length === 0) {
        return res.status(404).send('Skripsi not found');
      }
  
      res.json(rows[0]);
    } catch (err) {
      console.error('Error fetching skripsi by ID:', err.message);
      res.status(500).send('Error fetching skripsi');
    }
  });

module.exports = router;
