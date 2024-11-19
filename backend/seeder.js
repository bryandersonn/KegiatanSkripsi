var express = require('express');
var mysql = require('./mysql');

async function run(){
    try {
        await mysql.query(
            `DROP TABLE IF EXISTS skripsi`
        );
        await mysql.query(
            `DROP TABLE IF EXISTS dosen`
        );
        await mysql.query(
            `DROP TABLE IF EXISTS mahasiswa`
        );
        await mysql.query(
            `DROP TABLE IF EXISTS staff`
        );
        console.log("Refresh Database");

        await mysql.query(
            `CREATE TABLE IF NOT EXISTS dosen (
                DosenID VARCHAR(255) PRIMARY KEY,
                Nama VARCHAR(255) NOT NULL,
                Email VARCHAR(255) NOT NULL,
                Password VARCHAR(255) NOT NULL,
                Kampus VARCHAR(255) NOT NULL,
                Jurusan VARCHAR(255) NOT NULL
            )`
        );
        console.log("Dosen table created");

        await mysql.query(
            `CREATE TABLE IF NOT EXISTS mahasiswa (
                NIM VARCHAR(255) PRIMARY KEY,
                Nama VARCHAR(255) NOT NULL,
                Email VARCHAR(255) NOT NULL UNIQUE,
                Password VARCHAR(32) NOT NULL,
                Kampus VARCHAR(50),
                TanggalLahir DATE,
                Gender VARCHAR(30),
                Alamat VARCHAR(255),
                Agama VARCHAR(50),
                Jurusan VARCHAR(255)
            )`
        );
        console.log("Mahasiswa table created");

        await mysql.query(
            `CREATE TABLE IF NOT EXISTS staff (
                StaffID VARCHAR(255) PRIMARY KEY,
                Nama VARCHAR(255) NOT NULL,
                Email VARCHAR(255) NOT NULL UNIQUE,
                Password VARCHAR(255) NOT NULL,
                Kampus VARCHAR(50)
            )`
        );
        console.log("Staff table created");

        await mysql.query(
            `CREATE TABLE IF NOT EXISTS skripsi (
                ID INT PRIMARY KEY AUTO_INCREMENT,
                nim VARCHAR(255) NOT NULL,
                dosenID VARCHAR(255) NOT NULL,
                staffID VARCHAR(255) NOT NULL,
                JudulSkripsi VARCHAR(255),
                TopikSkripsi VARCHAR(255),
                TipeSkripsi VARCHAR(255),
                StatusSkripsi VARCHAR(255),
                LinkSkripsi VARCHAR(255),
                FOREIGN KEY (nim) REFERENCES mahasiswa(NIM) ON DELETE CASCADE,
                FOREIGN KEY (dosenID) REFERENCES dosen(DosenID) ON DELETE CASCADE,
                FOREIGN KEY (staffID) REFERENCES staff(StaffID) ON DELETE CASCADE
            )`
        );
        console.log("Skripsi table created");

        await mysql.query(
            `INSERT INTO dosen (DosenID, Nama, Email, Password, Kampus, Jurusan)
            VALUES
            ('D0001', 'Dosen 1', 'dosen1@example.com', 'password1', 'Kampus A', 'Jurusan A'),
            ('D0002', 'Dosen 2', 'dosen2@example.com', 'password2', 'Kampus B', 'Jurusan B'),
            ('D0003', 'Dosen 3', 'dosen3@example.com', 'password3', 'Kampus A', 'Jurusan C'),
            ('D0004', 'Dosen 4', 'dosen4@example.com', 'password4', 'Kampus C', 'Jurusan D'),
            ('D0005', 'Dosen 5', 'dosen5@example.com', 'password5', 'Kampus A', 'Jurusan E'),
            ('D0006', 'Dosen 6', 'dosen6@example.com', 'password6', 'Kampus B', 'Jurusan F'),
            ('D0007', 'Dosen 7', 'dosen7@example.com', 'password7', 'Kampus D', 'Jurusan A'),
            ('D0008', 'Dosen 8', 'dosen8@example.com', 'password8', 'Kampus C', 'Jurusan B')`
        );
        
        console.log("Dosen data inserted");
        
        await mysql.query(
            `INSERT INTO mahasiswa (NIM, Nama, Email, Password, Kampus, TanggalLahir, Gender, Alamat, Agama, Jurusan)
            VALUES
            ('2602003001', 'Mahasiswa 1', 'mahasiswa1@example.com', 'password1', 'Kampus A', '2000-01-01', 'Laki-laki', 'Jalan A', 'Islam', 'Jurusan A'),
            ('2602003002', 'Mahasiswa 2', 'mahasiswa2@example.com', 'password2', 'Kampus B', '2000-02-01', 'Perempuan', 'Jalan B', 'Kristen', 'Jurusan B'),
            ('2602003003', 'Mahasiswa 3', 'mahasiswa3@example.com', 'password3', 'Kampus A', '2000-03-01', 'Laki-laki', 'Jalan C', 'Hindu', 'Jurusan C'),
            ('2602003004', 'Mahasiswa 4', 'mahasiswa4@example.com', 'password4', 'Kampus B', '2000-04-01', 'Perempuan', 'Jalan D', 'Islam', 'Jurusan D'),
            ('2602003005', 'Mahasiswa 5', 'mahasiswa5@example.com', 'password5', 'Kampus C', '2000-05-01', 'Laki-laki', 'Jalan E', 'Buddha', 'Jurusan A'),
            ('2602003006', 'Mahasiswa 6', 'mahasiswa6@example.com', 'password6', 'Kampus A', '2000-06-01', 'Perempuan', 'Jalan F', 'Kristen', 'Jurusan B'),
            ('2602003007', 'Mahasiswa 7', 'mahasiswa7@example.com', 'password7', 'Kampus D', '2000-07-01', 'Laki-laki', 'Jalan G', 'Islam', 'Jurusan C'),
            ('2602003008', 'Mahasiswa 8', 'mahasiswa8@example.com', 'password8', 'Kampus B', '2000-08-01', 'Perempuan', 'Jalan H', 'Hindu', 'Jurusan D'),
            ('2602003009', 'Mahasiswa 9', 'mahasiswa9@example.com', 'password9', 'Kampus C', '2000-09-01', 'Laki-laki', 'Jalan I', 'Buddha', 'Jurusan E'),
            ('2602003010', 'Mahasiswa 10', 'mahasiswa10@example.com', 'password10', 'Kampus A', '2000-10-01', 'Perempuan', 'Jalan J', 'Kristen', 'Jurusan F')`
        );
        
        console.log("Mahasiswa data inserted");
        
        await mysql.query(
            `INSERT INTO staff (StaffID, Nama, Email, Password, Kampus)
            VALUES
            ('S0001', 'Staff 1', 'staff1@example.com', 'password1', 'Kampus A'),
            ('S0002', 'Staff 2', 'staff2@example.com', 'password2', 'Kampus B'),
            ('S0003', 'Staff 3', 'staff3@example.com', 'password3', 'Kampus A'),
            ('S0004', 'Staff 4', 'staff4@example.com', 'password4', 'Kampus C'),
            ('S0005', 'Staff 5', 'staff5@example.com', 'password5', 'Kampus D'),
            ('S0006', 'Staff 6', 'staff6@example.com', 'password6', 'Kampus A'),
            ('S0007', 'Staff 7', 'staff7@example.com', 'password7', 'Kampus B'),
            ('S0008', 'Staff 8', 'staff8@example.com', 'password8', 'Kampus D'),
            ('S0009', 'Staff 9', 'staff9@example.com', 'password9', 'Kampus C'),
            ('S0010', 'Staff 10', 'staff10@example.com', 'password10', 'Kampus A')`
        );
        
        console.log("Staff data inserted");
        
        await mysql.query(
            `INSERT INTO skripsi (nim, dosenID, staffID, JudulSkripsi, TopikSkripsi, TipeSkripsi, StatusSkripsi, LinkSkripsi)
            VALUES
            ('2602003001', 'D0001', 'S0001', 'Skripsi 1', 'Topik 1', 'Tipe 1', 'Pending', '/images/skripsi1.pdf'),
            ('2602003002', 'D0002', 'S0002', 'Skripsi 2', 'Topik 2', 'Tipe 2', 'Accepted', '/images/skripsi2.pdf'),
            ('2602003003', 'D0003', 'S0003', 'Skripsi 3', 'Topik 3', 'Tipe 3', 'Scheduled', '/images/skripsi3.pdf'),
            ('2602003004', 'D0004', 'S0004', 'Skripsi 4', 'Topik 4', 'Tipe 4', 'Accepted', '/images/skripsi4.pdf'),
            ('2602003005', 'D0003', 'S0005', 'Skripsi 5', 'Topik 5', 'Tipe 5', 'Pending', '/images/skripsi5.pdf'),
            ('2602003006', 'D0004', 'S0006', 'Skripsi 6', 'Topik 6', 'Tipe 6', 'Pending', '/images/skripsi6.pdf'),
            ('2602003007', 'D0005', 'S0007', 'Skripsi 7', 'Topik 7', 'Tipe 7', 'Scheduled', '/images/skripsi7.pdf'),
            ('2602003008', 'D0006', 'S0008', 'Skripsi 8', 'Topik 8', 'Tipe 8', 'Pending', '/images/skripsi8.pdf'),
            ('2602003009', 'D0007', 'S0009', 'Skripsi 9', 'Topik 9', 'Tipe 9', 'Accepted', '/images/skripsi9.pdf'),
            ('2602003010', 'D0008', 'S0010', 'Skripsi 10', 'Topik 10', 'Tipe 10', 'Scheduled', '/images/skripsi10.pdf')`
        );
        
        console.log("Skripsi data inserted");
    } catch (err) {
        console.log(err);
    }
}

module.exports = run;