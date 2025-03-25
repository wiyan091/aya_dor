<?php
// simpan_jawaban.php

// Koneksi ke database
$host = 'sql12.freesqldatabase.com';
$user = 'sql12769512';
$password = 'qRUNM6UfgY';
$dbname = 'sql12769512';

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die('Koneksi database gagal: ' . $conn->connect_error);
}
date_default_timezone_set('Asia/Jakarta');
// Ambil data dari AJAX
$keterangan = $_POST['keterangan'];
$jawaban = $_POST['jawaban'];
$tanggal = date('Y-m-d H:i:s');

// Query insert data
$stmt = $conn->prepare("INSERT INTO aya_tahir (Kererangan, jawaban, tanggal) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $keterangan, $jawaban, $tanggal);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Data berhasil disimpan']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Data gagal disimpan']);
}

$stmt->close();
$conn->close();
