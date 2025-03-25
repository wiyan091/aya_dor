const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint simpan jawaban
app.post('/api/simpan_jawaban', async (req, res) => {
  const { keterangan, jawaban } = req.body;
  const tanggal = new Date().toLocaleString('sv-SE', {
    timeZone: 'Asia/Jakarta',
  }).replace(' ', 'T');

  try {
    const connection = await mysql.createConnection({
      host: 'sql12.freesqldatabase.com',
      user: 'sql12769512',
      password: 'qRUNM6UfgY',
      database: 'sql12769512',
    });

    await connection.execute(
      'INSERT INTO aya_tahir (keterangan, jawaban, tanggal) VALUES (?, ?, ?)',
      [keterangan, jawaban, tanggal]
    );

    await connection.end();
    res.status(200).json({ status: 'success', message: 'Data berhasil disimpan' });
  } catch (error) {
    console.error('Gagal simpan:', error);
    res.status(500).json({ status: 'error', message: 'Gagal menyimpan data' });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
