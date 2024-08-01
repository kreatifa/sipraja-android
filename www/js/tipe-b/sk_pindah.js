var new_sk_pindah = {
  path: '/tipe-b/new_sk_pindah/',
  url: './pages/tipe-b/new_sk_pindah.html',
  name: 'new_sk_pindah',
  on: {
    pageInit: function () {
      add_attachment_pendaftar(datauser.attachments);
      $$('#nomor_kk').val(datauser.no_kk);
      $$('#alamat_kk').val(datauser.alamat);
      $$('#telepon_kk').val(datauser.no_telp_pendaftar);

      get_provinsi_new('#id_provinsi_kk');
      $$('#id_provinsi_kk').on('change', function () {
        get_kabupaten_new($$('#id_provinsi_kk').val(), '#id_kabupaten_kk');
      });
      $$('#id_kabupaten_kk').on('change', function () {
        get_kecamatan_new($$('#id_kabupaten_kk').val(), '#id_kecamatan_kk');
      });
      $$('#id_kecamatan_kk').on('change', function () {
        get_kelurahan_new($$('#id_kecamatan_kk').val(), '#id_desa_kk');
      });

      $$('#nik').val(datauser.nik);
      $$('#nama').val(datauser.nama);
      $$('#tempat_tinggal').val(datauser.alamat);
      $$('#jenis_kelamin_individu').val(datauser.jenis_kelamin);
      $$('#tempat_lahir_individu').val(datauser.tempat_lahir);
      $$('#tanggal_lahir').val(datauser.tanggal_lahir);
      $$('#agama_individu').val(datauser.agama);
      $$('#status_kawin').val(datauser.status_kawin);
      $$('#email').val(datauser.email);
      $$('#telepon').val(datauser.no_telp_pendaftar);
      $('.bs-timepicker').timepicker();
      $$('#jam_lahir').val(new Date().toHourFormat());
      get_pilihan_umum({
        gol_dar_elem: '#gol_darah_individu', gol_dar_def: datauser.gol_dar,
        hub_elem: '#hubungan_kel',
        kelainan_elem: '#kelainan_individu',
        kecacatan_elem: '#penyandang_cacat',
        pend_elem: '#pendidikan_terakhir', pend_def: datauser.pendidikan_terakhir,
        kerja_elem: '#jenis_pekerjaan', kerja_def: datauser.pekerjaan,
      });

      get_provinsi_new('#id_provinsi');
      $$('#id_provinsi').on('change', function () {
        get_kabupaten_new($$('#id_provinsi').val(), '#id_kabupaten');
        $$('#provinsi').val($('#id_provinsi :selected').text());
      });
      $$('#id_kabupaten').on('change', function () {
        get_kecamatan_new($$('#id_kabupaten').val(), '#id_kecamatan');
        $$('#kabupaten').val($('#id_kabupaten :selected').text());
      });
      $$('#id_kecamatan').on('change', function () {
        get_kelurahan_new($$('#id_kecamatan').val(), '#id_desa');
        $$('#kecamatan').val($('#id_kecamatan :selected').text());
      });
      $$('#id_desa').on('change', function () {
        $$('#desa').val($('#id_desa :selected').text());
      });

      $$('#subkategori').on('change', function () {
        if (this.value == 'PINDAH KELUAR' && $$('#klasifikasi').val() != 'Antar Kab/Kota' && $$('#klasifikasi').val() != 'Antar Provinsi') {
          $$('#form_tinggal').show();
        } else {
          $$('#form_tinggal').hide();
        }
      });
      $$('#klasifikasi').on('change', function () {
        if ($$('#subkategori').val() == 'PINDAH KELUAR' && this.value != 'Antar Kab/Kota' && this.value != 'Antar Provinsi') {
          $$('#form_tinggal').show();
        } else {
          $$('#form_tinggal').hide();
        }
      });
      $$('#tanggal_pindah').val(new Date().toDateFormat());

      anggota_keluarga = new Array();
      $$('#addkeluarga').on('touchend', function () {
        popup_tambah_anggota_pindah();
      });
      anggota_keluarga_ditinggal = new Array();
      $$('#addkeluargaditinggal').on('touchend', function () {
        popup_tambah_anggota_ditinggal();
      });
      $$('#addformupload').on('touchend', addrow);

      $$('#simpan').on('click', function () {
        data = new Array();
        keteranganid = [];
        filecode = [];
        $('input[name^=keteranganid]').each(function () {
          keteranganid.push($(this).val());
        });
        $('input[name^=filecode]').each(function () {
          filecode.push($(this).val());
        });

        mydata = app.form.convertToData('#new_sk_pindah');
        data.push(mydata);
        data.push(iamthedoor);
        data.push(keteranganid);
        data.push(filecode);
        data.push(anggota_keluarga);
        data.push(anggota_keluarga_ditinggal);
        app.request.post(site_url_mobile_layanan + '/sk_pindah/save_sk_pindah', data, function (data) {
          if (isNaN(data)) {
            app.dialog.alert(data.desc);
          } else {
            app.dialog.alert('Penyimpanan Berhasil');
            mainView.router.back();
            $('#datatables').DataTable().ajax.reload();
          }
        }, function () {
          app.dialog.alert('Penyimpanan Gagal, Coba lagi di lain waktu');
        }, 'json');
      });
    },
  }
};

var sk_pindah = {
  path: '/tipe-b/sk_pindah',
  url: './pages/tipe-b/sk_pindah.html',
  name: 'sk_pindah',
  on: {
    pageInit: function () {
      $$("#btnnew").hide();
      if (datauser.role_id == "4") {
        $$("#btnnew").show();
      }
      var statusselect = app.smartSelect.create({
        el: '.statusselect',
        on: {
          close: function () {
            app.dialog.preloader('Loading...');
            datatables.context[0].ajax.url = site_url_mobile_layanan + '/sk_pindah/layanan/' + $$('#statusselect').val();
            $('#datatables').DataTable().ajax.reload(function (json) {
              if (json.data) {
                app.dialog.close();
              } else {
                app.dialog.close();
                app.dialog.alert('Data tidak dapat ditemukan');
              }
            });
          }
        }
      });
      app.dialog.preloader('Loading...');
      var datatables = $('#datatables').DataTable({
        "serverSide": true,
        "ajax": {
          "url": site_url_mobile_layanan + '/sk_pindah/layanan/1',
          "data": iamthedoor,
          "type": "GET"
        },
        "columns": [
          { "data": "id" },
          { "data": "nomor" },
          { "data": "nik" },
          { "data": "nama" },
          { "data": "alamat" },
          { "data": "display_name" },
          { "data": "val_status", "width": "20%" },
        ],
        "initComplete": function (settings, json) {
          app.dialog.close();
          $$('#datatables_length').hide();
          $$('#datatables_filter').hide();
          $$('#datatables_paginate').hide();
        },
        "rowCallback": function (row, data) {
          $('td:eq(7)', row).html('<span style="background-color:transparent; padding:5px; border-radius:10px; ">Bisa<br>Diambil</span>');
          if (data.val_status) {
            var color = 'transparent';
            if (data.val_status == 'Ditolak') var color = 'transparent';
            if (data.val_status == 'Menunggu') var color = 'transparent';
            if (data.val_status == 'Belum Dikirim') var color = 'transparent';
            $('td:eq(7)', row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px;">' + data.val_status + '</span>');
          }
          if (data.val_status == 'Menunggu') {
            if (datauser.role_id == '4') {
              $('td:eq(0)', row).html('<a href="/tipe-b/edit_sk_pindah/' + data.id + '/edit/" class="button button-small button-fill color-blue">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');
            } else {
              $('td:eq(0)', row).html('<a href="/tipe-b/edit_sk_pindah/' + data.id + '/approve/" class="button button-small button-fill color-green">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Approve</a>');
            }
          } else {
            $('td:eq(0)', row).html('<a href="/tipe-b/edit_sk_pindah/' + data.id + '/lihat/" class="button button-small button-fill color-green">' +
              '<i class="icon f7-icons" style="font-size: 12pt;">zoom_in</i> Lihat</a>');
          }
          if (!data.nomor) {
            $('td:eq(1)', row).html('---');
          }
          if (!data.display_name) {
            $('td:eq(5)', row).html('---');
          }
        }
      });
    }
  }
};

var edit_sk_pindah = {
  path: '/tipe-b/edit_sk_pindah/:id/:tipe',
  url: './pages/tipe-b/edit_sk_pindah.html',
  name: 'edit_sk_pindah',
  on: {
    pageInit: function () {
      var this_user_is_the_last_index = false;
      var id = mainView.router.currentRoute.params.id;
      var tipe = mainView.router.currentRoute.params.tipe;
      tablename = "skpindah";
      anggota_keluarga = new Array();
      anggota_keluarga_ditinggal = new Array();
      $$("#addformupload").hide();

      if (tipe == 'edit') {
        $$('#approval').hide();
        $$("#addformupload").show();
        $$("#addformupload").on("touchend", addrow);
        $$("#addkeluarga").on("touchend", function () {
          popup_tambah_anggota_pindah();
        });
        $$("#addkeluargaditinggal").on("touchend", function () {
          popup_tambah_anggota_ditinggal();
        });

        $('.bs-timepicker').timepicker();
        $$('#subkategori').on('change', function () {
          if (this.value == 'PINDAH KELUAR' && $$('#klasifikasi').val() != 'Antar Kab/Kota' && $$('#klasifikasi').val() != 'Antar Provinsi') {
            $$('#form_tinggal').show();
          } else {
            $$('#form_tinggal').hide();
          }
        });
        $$('#klasifikasi').on('change', function () {
          if ($$('#subkategori').val() == 'PINDAH KELUAR' && this.value != 'Antar Kab/Kota' && this.value != 'Antar Provinsi') {
            $$('#form_tinggal').show();
          } else {
            $$('#form_tinggal').hide();
          }
        });
      }

      $$("#print_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/sk_pindah/print_doc/' + id, iamthedoor, function (doc_path) {
          download_doc(doc_path);
        }, 'json');
      });
      $$("#print_form_datang_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/sk_pindah/print_form_datang/' + id, iamthedoor, function (doc_path) {
          download_doc(doc_path);
        }, 'json');
      });
      $$("#print_form_ubah_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/sk_pindah/print_form_ubah/' + id, iamthedoor, function (doc_path) {
          download_doc(doc_path);
        }, 'json');
      });
      $$("#print_form_pengantar_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/sk_pindah/print_form_pengantar/' + id, iamthedoor, function (doc_path) {
          download_doc(doc_path);
        }, 'json');
      });
      $$("#print_preview_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/sk_pindah/print_doc/' + id, iamthedoor, function (doc_path) {
          preview_doc(doc_path);
        }, 'json');
      });
      $$(".checked_approval_button").hide();

      data = [];
      data.push(iamthedoor);
      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/sk_pindah/find_layanan/' + id + '/' + datauser.bf_users_id, data, function (data) {
        if (data == false) {
          app.dialog.close();
          app.dialog.alert('Data tidak ditemukan');
          mainView.router.back();
        } else {
          this_user_is_the_last_index = data.this_user_is_the_last_index;
          app.request.post(site_url_mobile + '/siurban_mobile/get_kecamatan_kelurahan/' + data.pemohon.kecamatan + '/' + data.pemohon.kode_desa, function (keckel) {
            $$('#nik_pemohon').val(data.pemohon.nik);
            $$('#nama_pemohon').val(data.pemohon.nama);
            $$('#jenis_kelamin_pemohon').val(data.pemohon.jenis_kelamin);
            $$('#tempat_lahir_pemohon').val(data.pemohon.tempat_lahir);
            $$('#tanggal_lahir_pemohon').val(data.pemohon.tanggal_lahir);
            $$('#status_kawin_pemohon').val(data.pemohon.status_kawin);
            $$('#pekerjaan_pemohon').val(data.pemohon.pekerjaan);
            $$('#alamat_pemohon').val(data.pemohon.alamat);
            $$('#kecamatan_pemohon').val(keckel.kecamatan);
            $$('#kelurahan_pemohon').val(keckel.kelurahan);

            if (data.approve !== null) {
              $$('#approve_items_id').val(data.approve.id);
              $$('#type_ttd').val(data.approve.author_type);
              document_look(data.latest_status.status_approval, data.latest_status.display_name);
              if (data.approve.ttd !== null) {
                ttdview(data.approve.ttd);
              }
            }

            $$('#nomor_kk').val(data.layanan.nomor_kk);
            $$('#nik_kepala_kk').val(data.layanan.nik_kepala_kk);
            $$('#kepala_kk').val(data.layanan.kepala_kk);
            $$('#alamat_kk').val(data.layanan.alamat_kk);
            $$('#rt').val(data.layanan.rt);
            $$('#rw').val(data.layanan.rw);
            $$('#kodepos_kk').val(data.layanan.kodepos_kk);
            $$('#dusun_kk').val(data.layanan.dusun_kk);
            $$('#telepon_kk').val(data.layanan.telepon_kk);
            get_provinsi_new('#id_provinsi_kk', data.layanan.id_provinsi_kk);
            $$('#id_provinsi_kk').on('change', function () {
              get_kabupaten_new($$('#id_provinsi_kk').val(), '#id_kabupaten_kk', data.layanan.id_kabupaten_kk);
            });
            $$('#id_kabupaten_kk').on('change', function () {
              get_kecamatan_new($$('#id_kabupaten_kk').val(), '#id_kecamatan_kk', data.layanan.id_kecamatan_kk);
            });
            $$('#id_kecamatan_kk').on('change', function () {
              get_kelurahan_new($$('#id_kecamatan_kk').val(), '#id_desa_kk', data.layanan.id_desa_kk);
            });

            $$('#nik').val(data.layanan.nik);
            $$('#nama').val(data.layanan.nama);
            $$('#tempat_tinggal').val(data.layanan.tempat_tinggal);
            $$('#kode_pos').val(data.layanan.kode_pos);
            $$('#no_paspor_individu').val(data.layanan.no_paspor_individu);
            $$('#tgl_berakhir_paspor').val(data.layanan.tgl_berakhir_paspor);
            $$('#jenis_kelamin_individu').val(data.layanan.jenis_kelamin_individu);
            $$('#tempat_lahir_individu').val(data.layanan.tempat_lahir_individu);
            $$('#tanggal_lahir').val(data.layanan.tanggal_lahir);
            $$('#jam_lahir').val(data.layanan.jam_lahir);
            $$('#no_akta_lahir').val(data.layanan.no_akta_lahir);
            $$('#agama_individu').val(data.layanan.agama_individu);
            $$('#status_kawin').val(data.layanan.status_kawin);
            $$('#catatan_kawin').val(data.layanan.catatan_kawin);
            $$('#no_akta_kawin').val(data.layanan.no_akta_kawin);
            $$('#tanggal_kawin').val(data.layanan.tanggal_kawin);
            $$('#no_akta_cerai').val(data.layanan.no_akta_cerai);
            $$('#tanggal_cerai').val(data.layanan.tanggal_cerai);
            $$('#email').val(data.layanan.email);
            $$('#telepon').val(data.layanan.telepon);
            get_pilihan_umum({
              gol_dar_elem: '#gol_darah_individu', gol_dar_def: data.layanan.gol_darah_individu,
              hub_elem: '#hubungan_kel', hub_def: data.layanan.hubungan_kel,
              kelainan_elem: '#kelainan_individu', kelainan_def: data.layanan.kelainan_individu,
              kecacatan_elem: '#penyandang_cacat', kecacatan_def: data.layanan.penyandang_cacat,
              pend_elem: '#pendidikan_terakhir', pend_def: data.layanan.pendidikan_terakhir,
              kerja_elem: '#jenis_pekerjaan', kerja_def: data.layanan.jenis_pekerjaan,
            });

            $$('#nik_ibu_ortu').val(data.layanan.nik_ibu_ortu);
            $$('#nama_ibu').val(data.layanan.nama_ibu);
            $$('#nik_ayah_ortu').val(data.layanan.nik_ayah_ortu);
            $$('#nama_ayah').val(data.layanan.nama_ayah);

            $$('#ketua_rt').val(data.layanan.ketua_rt);
            $$('#ketua_rw').val(data.layanan.ketua_rw);

            $$('#kategori').val(data.layanan.kategori);
            $$('#subkategori').val(data.layanan.subkategori).change();
            $$('#no_surat_pindah').val(data.layanan.no_surat_pindah);
            $$('#alasan').val(data.layanan.alasan);
            $$('#klasifikasi').val(data.layanan.klasifikasi).change();
            $$('#alamat').val(data.layanan.alamat);
            $$('#dusun_tujuan').val(data.layanan.dusun_tujuan);
            $$('#kode_pos_tujuan').val(data.layanan.kode_pos_tujuan);
            $$('#rt_tujuan').val(data.layanan.rt_tujuan);
            $$('#rw_tujuan').val(data.layanan.rw_tujuan);
            $$('#provinsi').val(data.layanan.provinsi);
            $$('#kabupaten').val(data.layanan.kabupaten);
            $$('#kecamatan').val(data.layanan.kecamatan);
            $$('#desa').val(data.layanan.desa);
            $$('#no_telp_tujuan').val(data.layanan.no_telp_tujuan);
            $$('#jenis_pindah').val(data.layanan.jenis_pindah);
            $$('#nomor_kk_tujuan').val(data.layanan.nomor_kk_tujuan);
            $$('#nik_kk_tujuan').val(data.layanan.nik_kk_tujuan);
            $$('#kepala_kk_tujuan').val(data.layanan.kepala_kk_tujuan);
            $$('#kk_tp').val(data.layanan.kk_tp);
            $$('#kk_p').val(data.layanan.kk_p);
            $$('#tanggal_pindah').val(data.layanan.tanggal_pindah);
            if (data.layanan.subkategori == 'PINDAH KELUAR' && data.layanan.klasifikasi != 'Antar Kab/Kota' && data.layanan.klasifikasi != 'Antar Provinsi') {
              $$('#form_tinggal').show();
            } else {
              $$('#form_tinggal').hide();
            }
            get_provinsi_new('#id_provinsi', data.layanan.id_provinsi);
            $$('#id_provinsi').on('change', function () {
              get_kabupaten_new($$('#id_provinsi').val(), '#id_kabupaten', data.layanan.id_kabupaten);
              $$('#provinsi').val($('#id_provinsi :selected').text());
            });
            $$('#id_kabupaten').on('change', function () {
              get_kecamatan_new($$('#id_kabupaten').val(), '#id_kecamatan', data.layanan.id_kecamatan);
              $$('#kabupaten').val($('#id_kabupaten :selected').text());
            });
            $$('#id_kecamatan').on('change', function () {
              get_kelurahan_new($$('#id_kecamatan').val(), '#id_desa', data.layanan.id_desa);
              $$('#kecamatan').val($('#id_kecamatan :selected').text());
            });
            $$('#id_desa').on('change', function () {
              $$('#desa').val($('#id_desa :selected').text());
            });
            $$('#keterangan').val(data.layanan.keterangan);

            if (data.anggota_keluarga) {
              anggota_keluarga = data.anggota_keluarga;
              for (var i = 0; i < anggota_keluarga.length; i++) {
                anggota_keluarga[i].status = 'tersimpan';
              }
              reload_anggota_pindah_table(anggota_keluarga);
            }

            if (data.anggota_keluarga_ditinggal) {
              anggota_keluarga_ditinggal = data.anggota_keluarga_ditinggal;
              for (var i = 0; i < anggota_keluarga_ditinggal.length; i++) {
                anggota_keluarga_ditinggal[i].status = 'tersimpan';
              }
              reload_anggota_ditinggal_table(anggota_keluarga_ditinggal);
            }

            table_chron = '';
            if (data.chron.length) {
              $$('#btndeletelayanan').hide();
              for (var i = 0; i < data.chron.length; i++) {
                table_chron += '<tr>' +
                  '<td>' + data.chron[i].val_status + '</td>' +
                  '<td>' + data.chron[i].author_type + '</td>' +
                  '<td>' + data.chron[i].name + '</td>' +
                  '<td>' + data.chron[i].keterangan + '</td>' +
                  '<td>' + data.chron[i].tglinsert + '</td>' +
                  '</tr>';
              }
            } else {
              table_chron = '<tr>' + '<td></td>' + '<td>Belum Ada Approval</td>' + '<td></td>' + '<td></td>' + '<td></td>' + '</tr>';
            }
            $$(".table-chron").html(table_chron);

            if (datauser.role_id == '4') {
              $$("#btndeletelayanan").html('<a class="button button-round button-fill color-red" id="deletelayanan" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Hapus Data</span></a>');
              if (tipe == 'edit') {
                prep_penyimpanan();
              } else {
                $$('#edit_sk_pindah input').prop("disabled", true);
                $$('#edit_sk_pindah textarea').prop("disabled", true);
                if (data.check_approved) {
                  $$('.save_button').hide();
                  $$('.checked_approval_button').show();
                } else {
                  $$('#simpan').html('<i class="icon f7-icons">arrow_left_circle_fill</i> Kembali');
                  $$("#simpan").on("click", function () {
                    mainView.router.back();
                    $('#datatables').DataTable().ajax.reload();
                  });
                }
              }
            } else {
              $$('#edit_sk_pindah input').prop("disabled", true);
              $$('#edit_sk_pindah textarea').prop("disabled", true);
              if (tipe == 'approve') {
                $$('#simpan').html('<i class="icon f7-icons">checkmark_seal_fill</i> Approve');
                $$('#print_preview_button').show();
                prep_penyimpanan();
              } else {
                if (data.check_approved) {
                  $$('.save_button').hide();
                  $$('.checked_approval_button').show();
                } else {
                  $$('#simpan').html('<i class="icon f7-icons">arrow_left_circle_fill</i> Kembali');
                  $$("#simpan").on("click", function () {
                    mainView.router.back();
                    $('#datatables').DataTable().ajax.reload();
                  });
                }
              }
            }
            if (data.layanan.file_code !== null) {
              if (tipe == 'edit') {
                find_document(id, false);
              } else {
                find_document(id, true);
              }
            }
            $$('#deletelayanan').on('click', function () {
              app.dialog.confirm('Apakah anda yakin menghapus data ini?', function () {
                data = [];
                data.push(iamthedoor);
                app.request.post(site_url_mobile_layanan + '/sk_pindah/delete_layanan/' + id, data, function (data) {
                  if (data == false) {
                    app.dialog.close();
                    app.dialog.alert('Data tidak ditemukan');
                    mainView.router.back();
                    $('#datatables').DataTable().ajax.reload();
                  } else {
                    app.dialog.close();
                    app.dialog.alert('Berhasil Menghapus Data');
                    mainView.router.back();
                    $('#datatables').DataTable().ajax.reload();
                  }
                }, function () {
                  app.dialog.close();
                  app.dialog.alert('Data Gagal dihapus, Coba lagi di lain waktu');
                }, 'json');
              });
            });
            app.dialog.close();
          }, function () { }, 'json');
        }
      }, function () {
        app.dialog.close();
        app.dialog.alert('Gagal');
        mainView.router.back();
      }, 'json');

      function prep_penyimpanan() {
        $$("#simpan").on("click", function () {
          data = new Array();
          if (datauser.role_id == '4') {
            app.dialog.preloader('Proses Penyimpanan...');
            keteranganid = [];
            filecode = [];
            $('input[name^=keteranganid]').each(function () {
              keteranganid.push($(this).val());
            });
            $('input[name^=filecode]').each(function () {
              filecode.push($(this).val());
            });
            mydata = app.form.convertToData("#edit_sk_pindah");
            data.push(mydata);
            data.push(iamthedoor);
            data.push(keteranganid);
            data.push(filecode);
            data.push(anggota_keluarga);
            data.push(anggota_keluarga_ditinggal);
            var url = site_url_mobile_layanan + '/sk_pindah/save_sk_pindah/update/' + id;
            app.request.post(url, data, function (data) {
              if (isNaN(data)) {
                app.dialog.close();
                if (data.status == 'fail') {
                  app.dialog.alert('Proses Gagal');
                } else if (data.status == 'success') {
                  app.dialog.alert('Berhasil !');
                } else {
                  app.dialog.alert('proses gagal');
                }
                $('#datatables').DataTable().ajax.reload();
                mainView.router.back();
              } else {
                app.dialog.close();
                app.dialog.alert('Penyimpanan Berhasil');
                mainView.router.back();
                $('#datatables').DataTable().ajax.reload();
              }
            }, function () {
              app.dialog.close();
              app.dialog.alert('Penyimpanan Gagal, Coba lagi di lain waktu');
              mainView.router.back();
              $('#datatables').DataTable().ajax.reload();
            }, 'json');
          } else {
            if (this_user_is_the_last_index == true && $$("select[name='status']").val() == 2) {
              var approval = app.popup.create({
                content: '<div class="popup">' +
                  '<div class="block">' +
                  '<p class="row"><a href="#" class="col-25 button button-raised button-fill popup-close">TUTUP</a></p>' +
                  '<p style="text-align: center;">Ketika Anda mengubah status, maka status dokumen ini <b>tidak dapat diubah kembali</b>.</p>' +
                  '<div class="list">' +
                  '<ul>' +
                  '<li class="item-content item-input">' +
                  '<div class="item-inner">' +
                  '<div class="item-title item-label">Masukkan Passphrase Anda</div>' +
                  '<div class="item-input-wrap">' +
                  '<input type="password" id="esign" name="esign" placeholder="Passphrase Anda" autocomplete="off">' +
                  '<span class="input-clear-button"></span>' +
                  '</div>' +
                  '</div>' +
                  '</li>' +
                  '</ul>' +
                  '</div>' +
                  '<br><button class="col color-green button button-big button-raised button-fill" id="approve_button">APPROVE</button>' +
                  '</div>' +
                  '</div>'
              });
              approval.open();
              $$('#approve_button').on('click', function () {
                approve('/sk_pindah/save_sk_pindah/ustatus/' + id, this_user_is_the_last_index, $$('#esign').val());
                approval.close();
              });
            } else {
              var approval = app.popup.create({
                content: '<div class="popup">' +
                  '<div class="block">' +
                  '<p><a href="#" class="link popup-close">< Kembali</a></p><br>' +
                  '<h3 style="text-align:center;">Ketika Anda mengubah status, maka status dokumen ini <b>tidak dapat diubah kembali</b></h3>' +
                  '<button class="col button button-big button-raised button-fill" id="approve_button">APPROVE</button>' +
                  '</div>' +
                  '</div>',
              });
              approval.open();
              $$("#approve_button").on("touchend", function () {
                approve('/sk_pindah/save_sk_pindah/ustatus/' + id, this_user_is_the_last_index);
                approval.close();
              });
            }
          }
        })
      }
    },
  }
};

function popup_tambah_anggota_pindah() {
  var popup_anggota = app.popup.create({
    content: '<div class="popup page-content">' +
      '<div class="block">' +
      '<form class="list" id="tambah_anggota_keluarga" data-id="null">' +
      '<div class="block-title">' +
      '<div class="row">' +
      '<div class="col-60">' +
      '<div class="chip color-blue">' +
      '<div class="chip-label">Form Anggota Keluarga</div>' +
      '</div>' +
      '</div>' +
      '<div class="col-40">' +
      '<a class="button button-round popup-close button-fill color-red" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">close_round</i> <span>Batal</span></a>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<ul>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Nama Lengkap</div>' +
      '<input type="text" name="nama_lengkap" placeholder="Nama Lengkap">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">NIK</div>' +
      '<input type="text" name="nik_anggota" placeholder="NIK">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Masa Berlaku KTP</div>' +
      '<input type="text" name="masa_berlaku" id="masa_berlaku_anggota" placeholder="Masa Berlaku KTP">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">SHDK</div>' +
      '<select name="hubungan" id="hubungan">' +
      '</select>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Jenis Kelamin</div>' +
      '<select name="jenis_kelamin" id="jenis_kelamin">' +
      '<option value="Laki-Laki">Laki-Laki</option>' +
      '<option value="Perempuan">Perempuan</option>' +
      '</select>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Tempat Lahir</div>' +
      '<input type="text" name="tempat_lahir" placeholder="Tempat Lahir">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Tanggal Lahir</div>' +
      '<input type="date" name="tgl_lahir" id="tgl_lahir_anggota" value="' + new Date().toDateFormat() + '">' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Golongan Darah</div>' +
      '<select name="gol_dar" id="gol_dar">' +
      '</select>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Status Kawin</div>' +
      '<select name="status_perkawinan" id="status_perkawinan">' +
      '<option value="Kawin">Kawin</option>' +
      '<option value="Belum Kawin">Belum Kawin</option>' +
      '<option value="Cerai Mati">Cerai Mati</option>' +
      '<option value="Cerai Hidup">Cerai Hidup</option>' +
      '</select>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Agama</div>' +
      '<select name="agama" id="agama">' +
      '<option value="Islam">Islam</option>' +
      '<option value="Kristen">Kristen</option>' +
      '<option value="Hindu">Hindu</option>' +
      '<option value="Budha">Budha</option>' +
      '<option value="Konghucu">Konghucu</option>' +
      '</select>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Pendidikan</div>' +
      '<select name="pendidikan" id="pendidikan">' +
      '</select>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Pekerjaan</div>' +
      '<select name="pekerjaan" id="pekerjaan">' +
      '</select>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Alamat Sebelumnya</div>' +
      '<input type="text" name="alamat_anggota" placeholder="Alamat Sebelumnya">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Nomor Paspor (Bila Ada)</div>' +
      '<input type="text" name="no_paspor" placeholder="Nomor Paspor" value="-">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Akta Kelahiran (Bila Ada)</div>' +
      '<input type="text" name="akta_lahir" placeholder="Akta Kelahiran" value="-">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Akta Perkawinan (Bila Ada)</div>' +
      '<input type="text" name="akta_kawin" placeholder="Akta Perkawinan" value="-">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Tanggal Perkawinan</div>' +
      '<input type="text" name="tgl_kawin" placeholder="Tanggal Perkawinan" value="-">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Akta Perceraian (Bila Ada)</div>' +
      '<input type="text" name="akta_cerai" placeholder="Akta Perceraian" value="-">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Tanggal Perceraian</div>' +
      '<input type="text" name="tgl_cerai" placeholder="Tanggal Perceraian" value="-">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Kelainan Fisik & Mental</div>' +
      '<select name="kelainan" id="kelainan">' +
      '</select>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Penyandang Cacat</div>' +
      '<select name="cacat" id="cacat">' +
      '</select>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Nama Ayah</div>' +
      '<input type="text" name="ayah" placeholder="Nama Ayah">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">NIK Ayah</div>' +
      '<input type="text" name="nik_ayah" placeholder="NIK Ayah">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Nama Ibu</div>' +
      '<input type="text" name="ibu" placeholder="Nama Ibu">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">NIK Ibu</div>' +
      '<input type="text" name="nik_ibu" placeholder="NIK Ibu">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '</ul>' +
      '<input type="hidden" name="status" value="tersimpan">' +
      '</form>' +
      '<a class="button button-round popup-close button-fill color-green" id="save_anggota" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">check</i> <span>Simpan</span></a>' +
      '</div>' +
      '</div>'
  });
  popup_anggota.open();
  get_pilihan_umum({
    hub_elem: '#tambah_anggota_keluarga #hubungan',
    gol_dar_elem: '#tambah_anggota_keluarga #gol_dar',
    pend_elem: '#tambah_anggota_keluarga #pendidikan',
    kerja_elem: '#tambah_anggota_keluarga #pekerjaan',
    kelainan_elem: '#tambah_anggota_keluarga #kelainan',
    kecacatan_elem: '#tambah_anggota_keluarga #cacat',
  });

  $$("#save_anggota").on('click', function () {
    popup_anggota.close();
    if ($("#tambah_anggota_keluarga").data("id") !== null) {
      anggota_id = $("#tambah_anggota_keluarga").data("id");
      anggota_keluarga[anggota_id] = app.form.convertToData("#tambah_anggota_keluarga");
    } else {
      anggota_keluarga.push(app.form.convertToData("#tambah_anggota_keluarga"));
    }
    reload_anggota_pindah_table(anggota_keluarga);
  });
}

function reload_anggota_pindah_table(anggota_keluarga_key) {
  anggota_keluarga_html = '<tr>' +
    '<td>Data Kosong</td>' +
    '<td></td>' +
    '<td></td>' +
    '<td></td>' +
    '<td></td>' +
    '<td></td>' +
    '</tr>';
  $$("#anggota_keluarga_table table tbody").html(anggota_keluarga_html);
  anggota_keluarga_row = '';
  for (var i = 0; i < anggota_keluarga_key.length; i++) {
    if (anggota_keluarga_key[i].status == "tersimpan") {
      anggota_keluarga_row += '<tr>' +
        '<td><a data-id="' + [i] + '" class="edit_anggota button button-small button-fill color-blue">EDIT</a></td>' +
        '<td><a data-id="' + [i] + '" class="hapus_anggota button button-small button-fill color-red">HAPUS</a></td>' +
        '<td>' + anggota_keluarga_key[i].nama_lengkap + '</td>' +
        '<td>' + anggota_keluarga_key[i].nik_anggota + '</td>' +
        '<td>' + anggota_keluarga_key[i].masa_berlaku + '</td>' +
        '<td>' + anggota_keluarga_key[i].hubungan + '</td>' +
        '</tr>';
    }
  }
  if (anggota_keluarga_row !== '') {
    $$("#anggota_keluarga_table table tbody").html(anggota_keluarga_row);
  }
  $$(".hapus_anggota").on('click', function () {
    anggota_id = $(this).data("id");
    app.dialog.confirm('Apakah anda yakin Menghapus data?', function () {
      anggota_keluarga_key[anggota_id].status = 'terhapus';
      reload_anggota_pindah_table(anggota_keluarga_key);
    });
  });
  $$(".edit_anggota").on('click', function () {
    anggota_id = $(this).data("id");
    app.dialog.confirm('Apakah anda yakin akan merubah data?', function () {
      popup_tambah_anggota_pindah();
      $$("#tambah_anggota_keluarga").attr("data-id", anggota_id);
      $$("input[name='nama_lengkap']").val(anggota_keluarga_key[anggota_id].nama_lengkap);
      $$("input[name='nik_anggota']").val(anggota_keluarga_key[anggota_id].nik_anggota);
      $$("#masa_berlaku_anggota").val(anggota_keluarga_key[anggota_id].masa_berlaku);
      $$("select[name='hubungan']").val(anggota_keluarga_key[anggota_id].hubungan).change();
      $$("select[name='jenis_kelamin']").val(anggota_keluarga_key[anggota_id].jenis_kelamin).change();
      $$("input[name='tempat_lahir']").val(anggota_keluarga_key[anggota_id].tempat_lahir);
      $$("#tgl_lahir_anggota").val(anggota_keluarga_key[anggota_id].tgl_lahir);
      $$("select[name='pendidikan']").val(anggota_keluarga_key[anggota_id].pendidikan).change();
      $$("select[name='gol_dar']").val(anggota_keluarga_key[anggota_id].gol_dar).change();
      $$("select[name='status_perkawinan']").val(anggota_keluarga_key[anggota_id].status_perkawinan).change();
      $$("select[name='agama']").val(anggota_keluarga_key[anggota_id].agama).change();
      $$("select[name='pekerjaan']").val(anggota_keluarga_key[anggota_id].pekerjaan).change();
      $$("input[name='alamat_anggota']").val(anggota_keluarga_key[anggota_id].alamat_anggota);
      $$("input[name='no_paspor']").val(anggota_keluarga_key[anggota_id].no_paspor);
      $$("input[name='akta_lahir']").val(anggota_keluarga_key[anggota_id].akta_lahir);
      $$("input[name='akta_kawin']").val(anggota_keluarga_key[anggota_id].akta_kawin);
      $$("input[name='tgl_kawin']").val(anggota_keluarga_key[anggota_id].tgl_kawin);
      $$("input[name='akta_cerai']").val(anggota_keluarga_key[anggota_id].akta_cerai);
      $$("input[name='tgl_cerai']").val(anggota_keluarga_key[anggota_id].tgl_cerai);
      $$("select[name='kelainan']").val(anggota_keluarga_key[anggota_id].kelainan).change();
      $$("select[name='cacat']").val(anggota_keluarga_key[anggota_id].cacat).change();
      $$("input[name='ayah']").val(anggota_keluarga_key[anggota_id].ayah);
      $$("input[name='nik_ayah']").val(anggota_keluarga_key[anggota_id].nik_ayah);
      $$("input[name='ibu']").val(anggota_keluarga_key[anggota_id].ibu);
      $$("input[name='nik_ibu']").val(anggota_keluarga_key[anggota_id].nik_ibu);
    });
  });
}

function popup_tambah_anggota_ditinggal() {
  var popup_anggota_ditinggal = app.popup.create({
    content: '<div class="popup page-content">' +
      '<div class="block">' +
      '<form class="list" id="tambah_anggota_keluarga_ditinggal" data-id="null">' +
      '<div class="block-title">' +
      '<div class="row">' +
      '<div class="col-60">' +
      '<div class="chip color-blue">' +
      '<div class="chip-label">Form Anggota Keluarga</div>' +
      '</div>' +
      '</div>' +
      '<div class="col-40">' +
      '<a class="button button-round popup-close button-fill color-red" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">close_round</i> <span>Batal</span></a>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<ul>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Nama Lengkap</div>' +
      '<input type="text" name="nama_lengkap_tgl" placeholder="Nama Lengkap">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">NIK</div>' +
      '<input type="text" name="nik_anggota_tgl" placeholder="NIK">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Masa Berlaku KTP</div>' +
      '<input type="text" name="masa_berlaku_tgl" id="masa_berlaku_anggota_tgl" placeholder="Masa Berlaku KTP">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">SHDK</div>' +
      '<select name="hubungan_tgl" id="hubungan_tgl">' +
      '</select>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Jenis Kelamin</div>' +
      '<select name="jenis_kelamin_tgl" id="jenis_kelamin_tgl">' +
      '<option value="Laki-Laki">Laki-Laki</option>' +
      '<option value="Perempuan">Perempuan</option>' +
      '</select>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Tempat Lahir</div>' +
      '<input type="text" name="tempat_lahir_tgl" placeholder="Tempat Lahir">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Tanggal Lahir</div>' +
      '<input type="date" name="tgl_lahir_tgl" id="tgl_lahir_anggota_tgl" value="' + new Date().toDateFormat() + '">' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Golongan Darah</div>' +
      '<select name="gol_dar_tgl" id="gol_dar_tgl">' +
      '</select>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Status Kawin</div>' +
      '<select name="status_perkawinan_tgl" id="status_perkawinan_tgl">' +
      '<option value="Kawin">Kawin</option>' +
      '<option value="Belum Kawin">Belum Kawin</option>' +
      '<option value="Cerai Mati">Cerai Mati</option>' +
      '<option value="Cerai Hidup">Cerai Hidup</option>' +
      '</select>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Agama</div>' +
      '<select name="agama_tgl" id="agama_tgl">' +
      '<option value="Islam">Islam</option>' +
      '<option value="Kristen">Kristen</option>' +
      '<option value="Hindu">Hindu</option>' +
      '<option value="Budha">Budha</option>' +
      '<option value="Konghucu">Konghucu</option>' +
      '</select>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Pendidikan</div>' +
      '<select name="pendidikan_tgl" id="pendidikan_tgl">' +
      '</select>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Pekerjaan</div>' +
      '<select name="pekerjaan_tgl" id="pekerjaan_tgl">' +
      '</select>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Alamat Sebelumnya</div>' +
      '<input type="text" name="alamat_anggota_tgl" placeholder="Alamat Sebelumnya">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Nomor Paspor (Bila Ada)</div>' +
      '<input type="text" name="no_paspor_tgl" placeholder="Nomor Paspor" value="-">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Akta Kelahiran (Bila Ada)</div>' +
      '<input type="text" name="akta_lahir_tgl" placeholder="Akta Kelahiran" value="-">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Akta Perkawinan (Bila Ada)</div>' +
      '<input type="text" name="akta_kawin_tgl" placeholder="Akta Perkawinan" value="-">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Tanggal Perkawinan</div>' +
      '<input type="text" name="tgl_kawin_tgl" placeholder="Tanggal Perkawinan" value="-">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Akta Perceraian (Bila Ada)</div>' +
      '<input type="text" name="akta_cerai_tgl" placeholder="Akta Perceraian" value="-">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Tanggal Perceraian</div>' +
      '<input type="text" name="tgl_cerai_tgl" placeholder="Tanggal Perceraian" value="-">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Kelainan Fisik & Mental</div>' +
      '<select name="kelainan_tgl" id="kelainan_tgl">' +
      '</select>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Penyandang Cacat</div>' +
      '<select name="cacat_tgl" id="cacat_tgl">' +
      '</select>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Nama Ayah</div>' +
      '<input type="text" name="ayah_tgl" placeholder="Nama Ayah">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">NIK Ayah</div>' +
      '<input type="text" name="nik_ayah_tgl" placeholder="NIK Ayah">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Nama Ibu</div>' +
      '<input type="text" name="ibu_tgl" placeholder="Nama Ibu">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">NIK Ibu</div>' +
      '<input type="text" name="nik_ibu_tgl" placeholder="NIK Ibu">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '</ul>' +
      '<input type="hidden" name="status" value="tersimpan">' +
      '</form>' +
      '<a class="button button-round popup-close button-fill color-green" id="save_anggota_ditinggal" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">check</i> <span>Simpan</span></a>' +
      '</div>' +
      '</div>'
  });
  popup_anggota_ditinggal.open();
  get_pilihan_umum({
    hub_elem: '#tambah_anggota_keluarga_ditinggal #hubungan_tgl',
    gol_dar_elem: '#tambah_anggota_keluarga_ditinggal #gol_dar_tgl',
    pend_elem: '#tambah_anggota_keluarga_ditinggal #pendidikan_tgl',
    kerja_elem: '#tambah_anggota_keluarga_ditinggal #pekerjaan_tgl',
    kelainan_elem: '#tambah_anggota_keluarga_ditinggal #kelainan_tgl',
    kecacatan_elem: '#tambah_anggota_keluarga_ditinggal #cacat_tgl',
  });

  $$("#save_anggota_ditinggal").on('click', function () {
    popup_anggota_ditinggal.close();
    if ($("#tambah_anggota_keluarga_ditinggal").data("id") !== null) {
      anggota_id_tgl = $("#tambah_anggota_keluarga_ditinggal").data("id");
      anggota_keluarga_ditinggal[anggota_id_tgl] = app.form.convertToData("#tambah_anggota_keluarga_ditinggal");
    } else {
      anggota_keluarga_ditinggal.push(app.form.convertToData("#tambah_anggota_keluarga_ditinggal"));
    }
    reload_anggota_ditinggal_table(anggota_keluarga_ditinggal);
  });
}

function reload_anggota_ditinggal_table(anggota_keluarga_tgl_key) {
  anggota_keluarga_ditinggal_html = '<tr>' +
    '<td>Data Kosong</td>' +
    '<td></td>' +
    '<td></td>' +
    '<td></td>' +
    '<td></td>' +
    '<td></td>' +
    '</tr>';
  $$("#anggota_keluarga_ditinggal_table table tbody").html(anggota_keluarga_ditinggal_html);
  anggota_keluarga_tgl_row = '';
  for (var i = 0; i < anggota_keluarga_tgl_key.length; i++) {
    if (anggota_keluarga_tgl_key[i].status == "tersimpan") {
      anggota_keluarga_tgl_row += '<tr>' +
        '<td><a data-id="' + [i] + '" class="edit_anggota_ditinggal button button-small button-fill color-blue">EDIT</a></td>' +
        '<td><a data-id="' + [i] + '" class="hapus_anggota_ditinggal button button-small button-fill color-red">HAPUS</a></td>' +
        '<td>' + anggota_keluarga_tgl_key[i].nama_lengkap_tgl + '</td>' +
        '<td>' + anggota_keluarga_tgl_key[i].nik_anggota_tgl + '</td>' +
        '<td>' + anggota_keluarga_tgl_key[i].masa_berlaku_tgl + '</td>' +
        '<td>' + anggota_keluarga_tgl_key[i].hubungan_tgl + '</td>' +
        '</tr>';
    }
  }
  if (anggota_keluarga_tgl_row !== '') {
    $$("#anggota_keluarga_ditinggal_table table tbody").html(anggota_keluarga_tgl_row);
  }
  $$(".hapus_anggota_ditinggal").on('click', function () {
    anggota_id_tgl = $(this).data("id");
    app.dialog.confirm('Apakah anda yakin Menghapus data?', function () {
      anggota_keluarga_tgl_key[anggota_id_tgl].status = 'terhapus';
      reload_anggota_ditinggal_table(anggota_keluarga_tgl_key);
    });
  });
  $$(".edit_anggota_ditinggal").on('click', function () {
    anggota_id_tgl = $(this).data("id");
    app.dialog.confirm('Apakah anda yakin akan merubah data?', function () {
      popup_tambah_anggota_ditinggal();
      $$("#tambah_anggota_keluarga_ditinggal").attr("data-id", anggota_id_tgl);
      $$("input[name='nama_lengkap_tgl']").val(anggota_keluarga_tgl_key[anggota_id_tgl].nama_lengkap_tgl);
      $$("input[name='nik_anggota_tgl']").val(anggota_keluarga_tgl_key[anggota_id_tgl].nik_anggota_tgl);
      $$("#masa_berlaku_anggota_tgl").val(anggota_keluarga_tgl_key[anggota_id_tgl].masa_berlaku_tgl);
      $$("select[name='hubungan_tgl']").val(anggota_keluarga_tgl_key[anggota_id_tgl].hubungan_tgl).change();
      $$("select[name='jenis_kelamin_tgl']").val(anggota_keluarga_tgl_key[anggota_id_tgl].jenis_kelamin_tgl).change();
      $$("input[name='tempat_lahir_tgl']").val(anggota_keluarga_tgl_key[anggota_id_tgl].tempat_lahir_tgl);
      $$("#tgl_lahir_anggota_tgl").val(anggota_keluarga_tgl_key[anggota_id_tgl].tgl_lahir_tgl);
      $$("select[name='pendidikan_tgl']").val(anggota_keluarga_tgl_key[anggota_id_tgl].pendidikan_tgl).change();
      $$("select[name='gol_dar_tgl']").val(anggota_keluarga_tgl_key[anggota_id_tgl].gol_dar_tgl).change();
      $$("select[name='status_perkawinan_tgl']").val(anggota_keluarga_tgl_key[anggota_id_tgl].status_perkawinan_tgl).change();
      $$("select[name='agama_tgl']").val(anggota_keluarga_tgl_key[anggota_id_tgl].agama_tgl).change();
      $$("select[name='pekerjaan_tgl']").val(anggota_keluarga_tgl_key[anggota_id_tgl].pekerjaan_tgl).change();
      $$("input[name='alamat_anggota_tgl']").val(anggota_keluarga_tgl_key[anggota_id_tgl].alamat_anggota_tgl);
      $$("input[name='no_paspor_tgl']").val(anggota_keluarga_tgl_key[anggota_id_tgl].no_paspor_tgl);
      $$("input[name='akta_lahir_tgl']").val(anggota_keluarga_tgl_key[anggota_id_tgl].akta_lahir_tgl);
      $$("input[name='akta_kawin_tgl']").val(anggota_keluarga_tgl_key[anggota_id_tgl].akta_kawin_tgl);
      $$("input[name='tgl_kawin_tgl']").val(anggota_keluarga_tgl_key[anggota_id_tgl].tgl_kawin_tgl);
      $$("input[name='akta_cerai_tgl']").val(anggota_keluarga_tgl_key[anggota_id_tgl].akta_cerai_tgl);
      $$("input[name='tgl_cerai_tgl']").val(anggota_keluarga_tgl_key[anggota_id_tgl].tgl_cerai_tgl);
      $$("select[name='kelainan_tgl']").val(anggota_keluarga_tgl_key[anggota_id_tgl].kelainan_tgl).change();
      $$("select[name='cacat_tgl']").val(anggota_keluarga_tgl_key[anggota_id_tgl].cacat_tgl).change();
      $$("input[name='ayah_tgl']").val(anggota_keluarga_tgl_key[anggota_id_tgl].ayah_tgl);
      $$("input[name='nik_ayah_tgl']").val(anggota_keluarga_tgl_key[anggota_id_tgl].nik_ayah_tgl);
      $$("input[name='ibu_tgl']").val(anggota_keluarga_tgl_key[anggota_id_tgl].ibu_tgl);
      $$("input[name='nik_ibu_tgl']").val(anggota_keluarga_tgl_key[anggota_id_tgl].nik_ibu_tgl);
    });
  });
}