<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input, true);
//terima data dari mobile
$nama_barang = trim($data['nama_barang']);
$status_peminjaman = trim($data['status_peminjaman']);
http_response_code(201);

if ($nama_barang != '' and $status_peminjaman != '') {
    $query = mysqli_query($koneksi, "insert into peminjaman(nama_barang,status_peminjaman) values('$nama_barang','$status_peminjaman')");
    $pesan = true;
} else {
    $pesan = false;
}
echo json_encode($pesan);
echo mysqli_error($koneksi);
