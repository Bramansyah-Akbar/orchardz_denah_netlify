<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    // Sesuaikan passwordnya dengan yang ada di Connection String Neon
    $dsn = "pgsql:host=ep-solitary-art-a1foqz5n-pooler.ap-southeast-1.aws.neon.tech;port=5432;dbname=neondb;sslmode=require";
    $pdo = new PDO($dsn, 'neondb_owner', 'npg_05jZQeWnNXEu');
    echo "<h1>Koneksi ke Neon SUKSES!</h1>";
} catch (Exception $e) {
    echo "<h1>Koneksi GAGAL</h1>";
    echo "<p>Pesan Error: " . $e->getMessage() . "</p>";
}
?>