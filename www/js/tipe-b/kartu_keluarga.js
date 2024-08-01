tablename = "kt_kartu_keluarga";
var new_kartu_keluarga = {
  path: '/tipe-b/new_kartu_keluarga/',
  url: './pages/tipe-b/new_kartu_keluarga.html',
  name: 'new_kartu_keluarga',
  on: {
    pageInit: function () {
      add_attachment_pendaftar(datauser.attachments);
      var calendar_tgl_berakhir_paspor = app.calendar.create({
        inputEl: '#tgl_berakhir_paspor',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_lahir = app.calendar.create({
        inputEl: '#tanggal_lahir',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_kawin = app.calendar.create({
        inputEl: '#tanggal_kawin',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_cerai = app.calendar.create({
        inputEl: '#tanggal_cerai',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });

      $$("#tgl_berakhir_paspor").val(get_current_date());
      $$("#tanggal_lahir").val(get_current_date());
      $$("#tanggal_kawin").val(get_current_date());
      $$("#tanggal_cerai").val(get_current_date());

      if ($$('.bs-timepicker').length) {
        $('.bs-timepicker').timepicker();
      }

      get_provinsi_new('#id_provinsi');
      $$('#id_provinsi').on('change', function () {
        get_kabupaten_new($$('#id_provinsi').val(), '#id_kabupaten');
      });
      $$('#id_kabupaten').on('change', function () {
        get_kecamatan_new($$('#id_kabupaten').val(), '#id_kecamatan');
      });
      $$('#id_kecamatan').on('change', function () {
        get_kelurahan_new($$('#id_kecamatan').val(), '#id_desa');
      });

      get_pilihan_umum({
        gol_dar_elem: '#gol_darah_individu', gol_dar_def: datauser.gol_dar,
        hub_elem: '#hubungan_kel',
        kelainan_elem: '#kelainan_individu',
        kecacatan_elem: '#penyandang_cacat',
        pend_elem: '#pendidikan_terakhir', pend_def: datauser.pendidikan_terakhir,
        kerja_elem: '#jenis_pekerjaan', kerja_def: datauser.pekerjaan,
      });

      anggota_keluarga = new Array();
      $$("#addkeluarga").on("touchend", function () {
        popup_tambah_anggota_kk();
      });
      $$("#addformupload").on("touchend", addrow);
      $$("#simpan").on("click", function () {
        app.input.validateInputs("#new_kartu_keluarga");
        if ($$('#new_kartu_keluarga')[0].checkValidity() == true) {
          data = new Array();
          keteranganid = [];
          filecode = [];
          $('input[name^=keteranganid]').each(function () {
            keteranganid.push($(this).val());
          });
          $('input[name^=filecode]').each(function () {
            filecode.push($(this).val());
          });
          mydata = app.form.convertToData("#new_kartu_keluarga");
          data.push(mydata);
          data.push(iamthedoor);
          data.push(keteranganid);
          data.push(filecode);
          data.push(anggota_keluarga);
          app.request.post(site_url_mobile_layanan + '/kartu_keluarga/save_kartu_keluarga', data, function (data) {
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
        }
      });
    },
  }
};
var kartu_keluarga = {
  path: '/tipe-b/kartu_keluarga',
  url: './pages/tipe-b/kartu_keluarga.html',
  name: 'kartu_keluarga',
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
            datatables.context[0].ajax.url = site_url_mobile_layanan + '/kartu_keluarga/layanan/' + $$('#statusselect').val();
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
          "url": site_url_mobile_layanan + '/kartu_keluarga/layanan/1',
          "data": iamthedoor,
          "type": "GET"
        },
        "columns": [
          { "data": "id" },
          { "data": "kode_transaksi" },
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
              $('td:eq(0)', row).html('<a href="/tipe-b/edit_kartu_keluarga/' + data.id + '/edit/" class="button button-small button-fill color-blue">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');
            } else {
              $('td:eq(0)', row).html('<a href="/tipe-b/edit_kartu_keluarga/' + data.id + '/approve/" class="button button-small button-fill color-green">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Approve</a>');
            }
          } else {
            $('td:eq(0)', row).html('<a href="/tipe-b/edit_kartu_keluarga/' + data.id + '/lihat/" class="button button-small button-fill color-green">' +
              '<i class="icon f7-icons" style="font-size: 12pt;">zoom_in</i> Lihat</a>');
          }
          if (!data.nomor) {
            $('td:eq(2)', row).html('---');
          }
          if (!data.display_name) {
            $('td:eq(6)', row).html('---');
          }
        }
      });
    }
  }
};
var edit_kartu_keluarga = {
  path: '/tipe-b/edit_kartu_keluarga/:id/:tipe',
  url: './pages/tipe-b/edit_kartu_keluarga.html',
  name: 'edit_kartu_keluarga',
  on: {
    pageInit: function () {
      var calendar_tgl_berakhir_paspor = app.calendar.create({
        inputEl: '#tgl_berakhir_paspor',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_lahir = app.calendar.create({
        inputEl: '#tanggal_lahir',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_kawin = app.calendar.create({
        inputEl: '#tanggal_kawin',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_cerai = app.calendar.create({
        inputEl: '#tanggal_cerai',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });

      $$("#tgl_berakhir_paspor").val(get_current_date());
      $$("#tanggal_lahir").val(get_current_date());
      $$("#tanggal_kawin").val(get_current_date());
      $$("#tanggal_cerai").val(get_current_date());

      if ($$('.bs-timepicker').length) {
        $('.bs-timepicker').timepicker();
      }

      get_pilihan_umum({
        gol_dar_elem: '#gol_darah_individu',
        hub_elem: '#hubungan_kel',
        kelainan_elem: '#kelainan_individu',
        kecacatan_elem: '#penyandang_cacat',
        pend_elem: '#pendidikan_terakhir',
        kerja_elem: '#jenis_pekerjaan',
      });

      tablename = "kt_kartu_keluarga";
      anggota_keluarga = new Array();
      $$("#addformupload").hide();
      var this_user_is_the_last_index = false;
      var id = mainView.router.currentRoute.params.id;
      var tipe = mainView.router.currentRoute.params.tipe;
      if (tipe == 'edit') {
        $$('#approval').hide();
        $$("#addformupload").show();
        $$("#addformupload").on("touchend", addrow);
        $$("#addkeluarga").on("touchend", function () {
          popup_tambah_anggota_kk();
        });
      }
      $$("#print_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/kartu_keluarga/print_doc/' + id, iamthedoor, function (doc_path) {
          download_doc(doc_path);
        }, 'json');
      });
      $$("#print_form_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/kartu_keluarga/print_form/' + id, iamthedoor, function (doc_path) {
          download_doc(doc_path);
        }, 'json');
      });
      $$("#print_form_ubah_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/kartu_keluarga/print_form_ubah/' + id, iamthedoor, function (doc_path) {
          download_doc(doc_path);
        }, 'json');
      });
      $$("#print_preview_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/kartu_keluarga/print_doc/' + id, iamthedoor, function (doc_path) {
          preview_doc(doc_path);
        }, 'json');
      });
      $$(".checked_approval_button").hide();
      var data = [];
      data.push(iamthedoor);
      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/kartu_keluarga/find_layanan/' + id + '/' + datauser.bf_users_id, data, function (data) {
        if (data == false) {
          app.dialog.close();
          app.dialog.alert('Data tidak ditemukan');
          mainView.router.back();
        } else {
          this_user_is_the_last_index = data.this_user_is_the_last_index;
          app.request.post(site_url_mobile + '/siurban_mobile/get_kecamatan_kelurahan/' + data.pemohon.kecamatan + '/' + data.pemohon.kode_desa, data, function (keckel) {
            $$("input[name='nik_pemohon']").val(data.pemohon.nik);
            $$("input[name='nama_pemohon']").val(data.pemohon.nama);
            $$("input[name='jenis_kelamin_pemohon']").val(data.pemohon.jenis_kelamin);
            $$("input[name='tempat_lahir_pemohon']").val(data.pemohon.tempat_lahir);
            $$("input[name='tanggal_lahir_pemohon']").val(data.pemohon.tanggal_lahir);
            $$("input[name='agama_pemohon']").val(data.pemohon.agama);
            $$("input[name='status_kawin_pemohon']").val(data.pemohon.status_kawin);
            $$("input[name='pekerjaan_pemohon']").val(data.pemohon.pekerjaan);
            $$("input[name='alamat_pemohon']").val(data.pemohon.alamat);
            $$("input[name='kecamatan_pemohon']").val(keckel.kecamatan);
            $$("input[name='kelurahan_pemohon']").val(keckel.kelurahan);
            $$("input[name='email_pelapor']").val(data.pemohon.email);
            $$("input[name='telp_pemohon']").val(data.pemohon.no_telp_pendaftar);
            if (data.approve !== null) {
              $$("input[name='approve_items_id']").val(data.approve.id);
              $$("input[name='type_ttd']").val(data.approve.author_type);
              document_look(data.latest_status.status_approval, data.latest_status.display_name);
              if (data.approve.ttd !== null) {
                ttdview(data.approve.ttd);
              }
            }
            $$("input[name='nomor_kk']").val(data.layanan.nomor_kk);
            $$("input[name='nik_kepala_kk']").val(data.layanan.nik_kepala_kk);
            $$("input[name='kepala_kk']").val(data.layanan.kepala_kk);
            $$("textarea[name='alamat_kk']").val(data.layanan.alamat_kk);
            $$("input[name='rt']").val(data.layanan.rt);
            $$("input[name='rw']").val(data.layanan.rw);
            $$("input[name='kodepos_kk']").val(data.layanan.kodepos_kk);
            get_provinsi_new('#id_provinsi', data.layanan.id_provinsi);
            $$('#id_provinsi').on('change', function () {
              get_kabupaten_new($$('#id_provinsi').val(), '#id_kabupaten', data.layanan.id_kabupaten);
            });
            $$('#id_kabupaten').on('change', function () {
              get_kecamatan_new($$('#id_kabupaten').val(), '#id_kecamatan', data.layanan.id_kecamatan);
            });
            $$('#id_kecamatan').on('change', function () {
              get_kelurahan_new($$('#id_kecamatan').val(), '#id_desa', data.layanan.id_desa);
            });
            $$("input[name='dusun']").val(data.layanan.dusun);
            $$("input[name='telepon_kk']").val(data.layanan.telepon_kk);

            $$("input[name='nik']").val(data.layanan.nik);
            $$("input[name='nama']").val(data.layanan.nama);
            $$("input[name='tempat_tinggal']").val(data.layanan.tempat_tinggal);
            $$("input[name='no_paspor_individu']").val(data.layanan.no_paspor_individu);
            $$("input[name='tgl_berakhir_paspor']").val(data.layanan.tgl_berakhir_paspor);
            $$("select[name='jenis_kelamin_individu']").val(data.layanan.jenis_kelamin_individu).change();
            $$("select[name='gol_darah_individu']").val(data.layanan.gol_darah_individu).change();
            $$("input[name='tempat_lahir_individu']").val(data.layanan.tempat_lahir_individu);
            $$("input[name='tanggal_lahir']").val(data.layanan.tanggal_lahir);
            $$("input[name='jam_lahir']").val(data.layanan.jam_lahir);
            $$("input[name='no_akta_lahir']").val(data.layanan.no_akta_lahir);
            $$("select[name='agama_individu']").val(data.layanan.agama_individu).change();
            $$("select[name='status_kawin']").val(data.layanan.status_kawin).change();
            $$("input[name='catatan_kawin']").val(data.layanan.catatan_kawin);
            $$("input[name='no_akta_kawin']").val(data.layanan.no_akta_kawin);
            $$("input[name='tanggal_kawin']").val(data.layanan.tanggal_kawin);
            $$("input[name='no_akta_cerai']").val(data.layanan.no_akta_cerai);
            $$("input[name='tanggal_cerai']").val(data.layanan.tanggal_cerai);
            $$("select[name='hubungan_kel']").val(data.layanan.hubungan_kel).change();
            $$("select[name='kelainan_individu']").val(data.layanan.kelainan_individu).change();
            $$("select[name='penyandang_cacat']").val(data.layanan.penyandang_cacat).change();
            $$("select[name='pendidikan_terakhir']").val(data.layanan.pendidikan_terakhir).change();
            $$("select[name='jenis_pekerjaan']").val(data.layanan.jenis_pekerjaan).change();
            $$("input[name='email']").val(data.layanan.email);
            $$("input[name='no_telp']").val(data.layanan.no_telp);

            $$("input[name='nik_ibu_ortu']").val(data.layanan.nik_ibu_ortu);
            $$("input[name='nama_ibu']").val(data.layanan.nama_ibu);
            $$("input[name='nik_ayah_ortu']").val(data.layanan.nik_ayah_ortu);
            $$("input[name='nama_ayah']").val(data.layanan.nama_ayah);

            $$("input[name='ketua_rt']").val(data.layanan.ketua_rt);
            $$("input[name='ketua_rw']").val(data.layanan.ketua_rw);

            $$("select[name='kategori']").val(data.layanan.kategori).change();
            $$("select[name='alasan_pisah_kk']").val(data.layanan.alasan_pisah_kk).change();
            $$("textarea[name='keterangan']").val(data.layanan.keterangan);
            anggota_keluarga = data.anggota_keluarga;
            for (var i = 0; i < anggota_keluarga.length; i++) {
              anggota_keluarga[i].status = 'tersimpan';
            }
            reload_anggota_kk_table(anggota_keluarga);
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
                $$('#edit_kartu_keluarga input').prop("disabled", true);
                $$('#edit_kartu_keluarga textarea').prop("disabled", true);
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
              $$('#edit_kartu_keluarga input').prop("disabled", true);
              $$('#edit_kartu_keluarga textarea').prop("disabled", true);
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
                app.request.post(site_url_mobile_layanan + '/kartu_keluarga/delete_layanan/' + id, data, function (data) {
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
            mydata = app.form.convertToData("#edit_kartu_keluarga");
            data.push(mydata);
            data.push(iamthedoor);
            data.push(keteranganid);
            data.push(filecode);
            data.push(anggota_keluarga);
            var url = site_url_mobile_layanan + '/kartu_keluarga/save_kartu_keluarga/update/' + id;
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
                approve('/kartu_keluarga/save_kartu_keluarga/ustatus/' + id, this_user_is_the_last_index, $$('#esign').val());
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
                approve('/kartu_keluarga/save_kartu_keluarga/ustatus/' + id, this_user_is_the_last_index);
                approval.close();
              });
            }
          }
        })
      }
    },
  }
};

function popup_tambah_anggota_kk() {
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
      '<a class="button button-round popup-close button-fill color-red" id="addformupload" style="margin-top: 10px;">' +
      '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Batal</span>' +
      '</a>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<ul>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Nama Lengkap</div>' +
      '<input type="text" name="nama_lengkap">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">NIK</div>' +
      '<input type="text" name="nik_anggota">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-title item-label">Jenis Kelamin</div>' +
      '<div class="item-input-wrap">' +
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
      '<input type="text" name="tempat_lahir">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Tanggal Lahir</div>' +
      '<input type="date" name="tgl_lahir" id="tgl_lahir_anggota" value="' + new Date().toDateFormat() + '">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-title item-label">Pendidikan</div>' +
      '<div class="item-input-wrap">' +
      '<select name="pendidikan" id="pendidikan">' +
      '</select>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-title item-label">Golongan Darah</div>' +
      '<div class="item-input-wrap">' +
      '<select name="gol_dar" id="gol_dar">' +
      '</select>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li>' +
      '<div class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-title item-label">Status Kawin</div>' +
      '<div class="item-input-wrap">' +
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
      '<div class="item-title item-label">Agama</div>' +
      '<div class="item-input-wrap">' +
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
      '<div class="item-title item-label">Hubungan</div>' +
      '<div class="item-input-wrap">' +
      '<select name="hubungan" id="hubungan">' +
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
      '<input type="text" name="alamat_anggota">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Nomor Paspor (Bila Ada)</div>' +
      '<input type="text" name="no_paspor" value="-">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Akta Kelahiran (Bila Ada)</div>' +
      '<input type="text" name="akta_lahir" value="-">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Akta Perkawinan (Bila Ada)</div>' +
      '<input type="text" name="akta_kawin" value="-">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Tanggal Perkawinan</div>' +
      '<input type="text" name="tgl_kawin" value="-">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Akta Perceraian (Bila Ada)</div>' +
      '<input type="text" name="akta_cerai" value="-">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Tanggal Perceraian</div>' +
      '<input type="text" name="tgl_cerai" value="-">' +
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
      '<input type="text" name="ayah">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">NIK Ayah</div>' +
      '<input type="text" name="nik_ayah">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Nama Ibu</div>' +
      '<input type="text" name="ibu">' +
      '<input type="hidden" name="status" value="tersimpan">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">NIK Ibu</div>' +
      '<input type="text" name="nik_ibu">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '</ul>' +
      '</form>' +
      '<a class="button button-round popup-close button-fill color-green" id="save_anggota" style="margin-top: 10px;">' +
      '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
      '</a>' +
      '</div>' +
      '</div>',
    on: {
      open: function (popup) { },
    }
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
    reload_anggota_kk_table(anggota_keluarga);
  });
}

function reload_anggota_kk_table(anggota_keluarga_key) {
  anggota_keluarga_key = anggota_keluarga_key;
  anggota_keluarga_html = '<tr><td></td><td>Data Kosong</td><td></td></tr>';
  $$("#anggota_keluarga_table table tbody").html(anggota_keluarga_html);
  anggota_keluarga_row = '';
  for (var i = 0; i < anggota_keluarga_key.length; i++) {
    if (anggota_keluarga_key[i].status == "tersimpan") {
      anggota_keluarga_row += '<tr>' +
        '<td class="label-cell"><a data-id="' + [i] + '" class="edit_anggota button button-small color-blue button-fill">EDIT</a></td>' +
        '<td class="label-cell"><a data-id="' + [i] + '"  class="hapus_anggota button color-red button-fill button-small">HAPUS</a></td>' +
        '<td class="label-cell">' + anggota_keluarga_key[i].nama_lengkap + '</td>' +
        '<td class="numeric-cell">' + anggota_keluarga_key[i].nik_anggota + '</td>' +
        '<td class="label-cell">' + anggota_keluarga_key[i].jenis_kelamin + '</td>' +
        '<td class="label-cell">' + anggota_keluarga_key[i].tempat_lahir + '</td>' +
        '<td class="label-cell">' + anggota_keluarga_key[i].tgl_lahir + '</td>' +
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
      reload_anggota_kk_table(anggota_keluarga_key);
    });
  });
  $$(".edit_anggota").on('click', function () {
    anggota_id = $(this).data("id");
    app.dialog.confirm('Apakah anda yakin akan merubah data?', function () {
      popup_tambah_anggota_kk();
      $$("#tambah_anggota_keluarga").attr("data-id", anggota_id);
      $$("input[name='nama_lengkap']").val(anggota_keluarga_key[anggota_id].nama_lengkap);
      $$("input[name='nik_anggota']").val(anggota_keluarga_key[anggota_id].nik_anggota);
      $$("select[name='jenis_kelamin']").val(anggota_keluarga_key[anggota_id].jenis_kelamin).change();
      $$("input[name='tempat_lahir']").val(anggota_keluarga_key[anggota_id].tempat_lahir);
      $$("#tgl_lahir_anggota").val(anggota_keluarga_key[anggota_id].tgl_lahir);
      $$("select[name='pendidikan']").val(anggota_keluarga_key[anggota_id].pendidikan).change();
      $$("select[name='gol_dar']").val(anggota_keluarga_key[anggota_id].gol_dar).change();
      $$("select[name='status_perkawinan']").val(anggota_keluarga_key[anggota_id].status_perkawinan).change();
      $$("select[name='agama']").val(anggota_keluarga_key[anggota_id].agama).change();
      $$("select[name='hubungan']").val(anggota_keluarga_key[anggota_id].hubungan).change();
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