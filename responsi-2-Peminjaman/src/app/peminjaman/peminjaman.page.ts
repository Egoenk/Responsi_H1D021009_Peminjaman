import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peminjaman',
  templateUrl: './peminjaman.page.html',
  styleUrls: ['./peminjaman.page.scss'],
})
export class PeminjamanPage implements OnInit {
  dataPeminjaman: any = [];
  id: number | null = null;
  nama_barang: string = '';
  status_peminjaman: string = '';
  modal_tambah: boolean = false;
  modal_edit: boolean = false;

  constructor(
    private _apiService: ApiService,
    private modal: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPeminjaman();
  }

  getPeminjaman() {
    this._apiService.tampil('tampilPeminjaman.php').subscribe({
      next: (res: any) => {
        this.dataPeminjaman = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  reset_model() {
    this.id = null;
    this.nama_barang = '';
    this.status_peminjaman = '';
  }

  cancel() {
    this.modal.dismiss();
    this.modal_tambah = false;
    this.reset_model();
  }

  open_modal_tambah(isOpen: boolean) {
    this.modal_tambah = isOpen;
    this.reset_model();
    this.modal_tambah = true;
    this.modal_edit = false;
  }

  open_modal_edit(isOpen: boolean, idget: any) {
    this.modal_edit = isOpen;
    this.id = idget;
    this.ambilPeminjaman(this.id);
    this.modal_tambah = false;
    this.modal_edit = true;
  }

  tambahPeminjaman() {
    if (this.nama_barang != '' && this.status_peminjaman != '') {
      let data = {
        nama_barang: this.nama_barang,
        status_peminjaman: this.status_peminjaman
      }
      this._apiService.tambah(data, '/tambahPeminjaman.php').subscribe({
        next: (hasil: any) => {
          this.reset_model();
          this.getPeminjaman();
          this.modal_tambah = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('gagal tambah Catatan');
        },
      })
    } else {
      console.log('gagal tambah Catatan karena masih ada data yg kosong');
    }
  }

  hapusPeminjaman(id: any) {
    this._apiService.hapus(id, '/hapusPeminjaman.php?id=').subscribe({
      next: (res: any) => {
        this.getPeminjaman();
      },
      error: (error: any) => {
        console.log('gagal');
      },
    });
  }

  ambilPeminjaman(id: any) {
    this._apiService.lihat(id, '/lihatPeminjaman.php?id=').subscribe({
      next: (hasil: any) => {
        let Catatan = hasil;
        this.id = Catatan.id;
        this.nama_barang = Catatan.nama_barang;
        this.status_peminjaman = Catatan.status_peminjaman;
      },
      error: (error: any) => {
        console.log('gagal ambil data');
      },
    });
  }

  editPeminjaman() {
    let data = {
      id: this.id,
      nama_barang: this.nama_barang,
      status_peminjaman: this.status_peminjaman,
    };
    this._apiService.edit(data, 'editPeminjaman.php').subscribe({
      next: (hasil: any) => {
        this.reset_model();
        this.getPeminjaman();
        this.modal_edit = false;
        this.modal.dismiss();
      },
      error: (err: any) => {
        console.log('gagal edit Catatan ' + err.message);
      },
    });
  }

  logout() {
    localStorage.removeItem('token-saya');
    localStorage.removeItem('namasaya');
    this.router.navigate(['/login']);
  }
}
