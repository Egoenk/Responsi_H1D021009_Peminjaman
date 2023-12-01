<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input, true);
//terima data dari mobile

$id = trim($data['id']);
$nama_barang = trim($data['nama_barang']);
$status_peminjaman = trim($data['status_peminjaman']);

http_response_code(201);
if ($nama_barang != '' and $status_peminjaman != '') {
    $query = mysqli_query($koneksi, "update peminjaman set nama_barang='$nama_barang',status_peminjaman='$status_peminjaman' where 
id='$id'");
    $pesan = true;
} else {
    $pesan = false;
}
echo json_encode($pesan);
echo mysqli_error($koneksi);
