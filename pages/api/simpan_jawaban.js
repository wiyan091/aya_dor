import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  const { keterangan, jawaban } = req.body;
  const tanggal = new Date().toLocaleString('sv-SE', {
    timeZone: 'Asia/Jakarta',
  }).replace(' ', 'T');

  try {
    const connection = await mysql.createConnection({
      host: 'sql.freedb.tech',
      user: 'freedb_aya_tahir',
      password: 'yDtQ#H!wy2kjXZP',
      database: 'freedb_aya_tahir',
    });

    await connection.execute(
      'INSERT INTO aya_tahir (keterangan, jawaban, tanggal) VALUES (?, ?, ?)',
      [keterangan, jawaban, tanggal]
    );

    await connection.end();
    res.status(200).json({ status: 'success', message: 'Berhasil disimpan' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Gagal menyimpan' });
  }
}
