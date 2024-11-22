var express = require("express");
var mysql = require("./mysql");

async function run() {
  try {
    // await mysql.query(`DROP TABLE IF EXISTS skripsi`);
    // await mysql.query(`DROP TABLE IF EXISTS dosen`);
    // await mysql.query(`DROP TABLE IF EXISTS mahasiswa`);
    // await mysql.query(`DROP TABLE IF EXISTS staff`);
    // await mysql.query(`DROP TABLE IF EXISTS user`);
    // console.log("Refresh Database");

    await mysql.query(
      `CREATE TABLE IF NOT EXISTS user (
                Email VARCHAR(255) PRIMARY KEY,
                Password VARCHAR(255) NOT NULL,
                Role VARCHAR(55) NOT NULL
            )`
    );
    console.log("User table created");

    await mysql.query(
      `CREATE TABLE IF NOT EXISTS dosen (
                DosenID VARCHAR(255) PRIMARY KEY,
                Nama VARCHAR(255) NOT NULL,
                Email VARCHAR(255) NOT NULL,
                FOREIGN KEY (Email) REFERENCES user(Email) ON DELETE CASCADE
            )`
    );
    console.log("Dosen table created");

    await mysql.query(
      `CREATE TABLE IF NOT EXISTS mahasiswa (
                NIM VARCHAR(255) PRIMARY KEY,
                Nama VARCHAR(255) NOT NULL,
                Email VARCHAR(255) NOT NULL UNIQUE,
                TanggalLahir DATE,
                Alamat VARCHAR(255),
                FOREIGN KEY (Email) REFERENCES user(Email) ON DELETE CASCADE
            )`
    );
    console.log("Mahasiswa table created");

    await mysql.query(
      `CREATE TABLE IF NOT EXISTS staff (
                StaffID VARCHAR(255) PRIMARY KEY,
                Nama VARCHAR(255) NOT NULL,
                Email VARCHAR(255) NOT NULL UNIQUE,
                FOREIGN KEY (Email) REFERENCES user(Email) ON DELETE CASCADE
            )`
    );
    console.log("Staff table created");

    await mysql.query(
      `CREATE TABLE IF NOT EXISTS skripsi (
                ID INT PRIMARY KEY AUTO_INCREMENT,
                nim VARCHAR(255) NOT NULL,
                dosenID VARCHAR(255) NOT NULL,
                staffID VARCHAR(255) NULL,
                JudulSkripsi VARCHAR(255),
                LinkFile VARCHAR(255),
                StatusSkripsi VARCHAR(255),
                TanggalSidang DATE NULL,
                TempatSidang VARCHAR(255) NULL,
                FOREIGN KEY (nim) REFERENCES mahasiswa(NIM) ON DELETE CASCADE,
                FOREIGN KEY (dosenID) REFERENCES dosen(DosenID) ON DELETE CASCADE,
                FOREIGN KEY (staffID) REFERENCES staff(StaffID) ON DELETE CASCADE
            )`
    );
    console.log("Skripsi table created");

    await mysql.query(
      `INSERT INTO user (Email, Password, Role) VALUES
            -- Dosen
            ('agus.setiawan@binus.ac.id', 'hashedpassword1', 'Dosen'),
            ('budi.santoso@binus.ac.id', 'hashedpassword2', 'Dosen'),
            ('lisa.halim@binus.ac.id', 'hashedpassword3', 'Dosen'),
            ('herman.tan@binus.ac.id', 'hashedpassword4', 'Dosen'),
            ('cynthia.andini@binus.ac.id', 'hashedpassword5', 'Dosen'),
            -- Mahasiswa
            ('maria.lestari@binus.ac.id', 'hashedpassword6', 'Mahasiswa'),
            ('rizky.pratama@binus.ac.id', 'hashedpassword7', 'Mahasiswa'),
            ('andi.setyawan@binus.ac.id', 'hashedpassword8', 'Mahasiswa'),
            ('dewi.anggraini@binus.ac.id', 'hashedpassword9', 'Mahasiswa'),
            ('susilo.widodo@binus.ac.id', 'hashedpassword10', 'Mahasiswa'),
            ('tiara.putri@binus.ac.id', 'hashedpassword11', 'Mahasiswa'),
            ('fadli.hakim@binus.ac.id', 'hashedpassword12', 'Mahasiswa'),
            ('angela.suri@binus.ac.id', 'hashedpassword13', 'Mahasiswa'),
            ('ivan.anggoro@binus.ac.id', 'hashedpassword14', 'Mahasiswa'),
            ('johan.tjahyadi@binus.ac.id', 'hashedpassword15', 'Mahasiswa'),
            -- Staff
            ('toni.kurniawan@binus.ac.id', 'hashedpassword16', 'Staff'),
            ('linda.wijaya@binus.ac.id', 'hashedpassword17', 'Staff'),
            ('ferdiansyah@binus.ac.id', 'hashedpassword18', 'Staff');
            `
    );

    await mysql.query(
      `INSERT INTO dosen (DosenID, Nama, Email) VALUES
            ('D001', 'Agus Setiawan', 'agus.setiawan@binus.ac.id'),
            ('D002', 'Budi Santoso', 'budi.santoso@binus.ac.id'),
            ('D003', 'Lisa Halim', 'lisa.halim@binus.ac.id'),
            ('D004', 'Herman Tan', 'herman.tan@binus.ac.id'),
            ('D005', 'Cynthia Andini', 'cynthia.andini@binus.ac.id');`
    );

    console.log("Dosen data inserted");

    await mysql.query(
      `INSERT INTO mahasiswa (NIM, Nama, Email, TanggalLahir, Alamat) VALUES
            ('2440012345', 'Maria Lestari', 'maria.lestari@binus.ac.id', '2002-11-21', 'Jl. K.H. Syahdan No.9, Kemanggisan, Jakarta Barat'),
            ('2440016789', 'Rizky Pratama', 'rizky.pratama@binus.ac.id', '2001-08-15', 'Jl. Hang Lekir II No.12, Kebayoran Baru, Jakarta Selatan'),
            ('2440013456', 'Andi Setyawan', 'andi.setyawan@binus.ac.id', '2003-02-10', 'Jl. Tanjung Duren Raya, Jakarta Barat'),
            ('2440015678', 'Dewi Anggraini', 'dewi.anggraini@binus.ac.id', '2002-07-05', 'Jl. Jend. Sudirman, Jakarta Pusat'),
            ('2440017890', 'Susilo Widodo', 'susilo.widodo@binus.ac.id', '2002-09-12', 'Jl. Tomang Raya No.50, Jakarta Barat'),
            ('2440018901', 'Tiara Putri', 'tiara.putri@binus.ac.id', '2003-03-18', 'Jl. Kebon Jeruk, Jakarta Barat'),
            ('2440015679', 'Fadli Hakim', 'fadli.hakim@binus.ac.id', '2001-06-25', 'Jl. Palmerah Utara No.12, Jakarta Barat'),
            ('2440011234', 'Angela Suri', 'angela.suri@binus.ac.id', '2002-08-05', 'Jl. Permata Hijau, Jakarta Selatan'),
            ('2440014567', 'Ivan Anggoro', 'ivan.anggoro@binus.ac.id', '2002-10-20', 'Jl. Pasar Minggu, Jakarta Selatan'),
            ('2440019999', 'Johan Tjahyadi', 'johan.tjahyadi@binus.ac.id', '2003-01-30', 'Jl. Gatot Subroto, Jakarta Selatan');
        `
    );

    console.log("Mahasiswa data inserted");

    await mysql.query(
      `INSERT INTO staff (StaffID, Nama, Email) VALUES
            ('S001', 'Toni Kurniawan', 'toni.kurniawan@binus.ac.id'),
            ('S002', 'Linda Wijaya', 'linda.wijaya@binus.ac.id'),
            ('S003', 'Ferdiansyah', 'ferdiansyah@binus.ac.id');
        `
    );

    console.log("Staff data inserted");

    // await mysql.query(
    //   `INSERT INTO skripsi (nim, dosenID, staffID, JudulSkripsi, LinkFile, StatusSkripsi, TanggalSidang, TempatSidang) VALUES
    //         ('2440012345', 'D001', 'S001', 'Penerapan Machine Learning dalam Analisis Sentimen di Media Sosial', 'https://drive.google.com/file/d/123456789abcdef/view', 'Pending', '2024-12-15', 'Ruangan R-305'),
    //         ('2440016789', 'D002', 'S002', 'Optimalisasi Algoritma K-Means untuk Pemetaan Wilayah UMKM', 'https://drive.google.com/file/d/abcdef123456789/view', 'Accepted', '2024-11-30', 'Ruangan R-202'),
    //         ('2440013456', 'D003', 'S003', 'Pengembangan Sistem Pakar untuk Diagnosa Penyakit Tanaman Padi', 'https://drive.google.com/file/d/abcd1234efgh5678/view', 'Scheduled', '2024-12-01', 'Ruangan R-204'),
    //     `
    // );

    console.log("Skripsi data inserted");
  } catch (err) {
    console.log(err);
  }
}

module.exports = run;
