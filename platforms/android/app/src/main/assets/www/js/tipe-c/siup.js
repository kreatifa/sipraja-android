tablename = "siup";
var siup_new = {
  path: '/tipe-c/siup_new/',
  url: './pages/tipe-c/siup_new.html',
  name: 'siup_new',
  on: {
    pageInit: function () {
      $$("#hapus_kbli").hide();
      get_kbli();
      var kbli_ss = app.smartSelect.create({
        el: '.kbli_ss',
        searchbar: true,
        searchbarPlaceholder: 'Cari Kode KBLI',
        on: {
          opened: function () {
            $$(".smart-select-page .page-content").addClass('cari_kbli');
          },
          close: function () {
            data_kbli = $$(".kbli_ss .item-after").html();
            data_kbli = data_kbli.split(', ');
            $$(".kbli_ss .item-after").hide();
            $$("textarea[name='kbli_detail']").val(data_kbli.join('\n'));
            join_kbli = $$("select[name='kbli']").val().join(';');
            $$("input[name='kode_kbli']").val(join_kbli);
            if ($$("input[name='kode_kbli']").val() == "") {
              $$("#hapus_kbli").hide();
            } else {
              $$("#hapus_kbli").show();
            }
          }
        }
      });
      get_kecamatan_dom('#kec_usaha', '#kel_usaha');
      $$('#kec_usaha').on('change', function () {
        get_kelurahan_dom($$('#kec_usaha').val(), '#kel_usaha');
      });
      var tanggal_siup = app.calendar.create({
        inputEl: '#tanggal_siup',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
        on: {}
      });
      $$("#tanggal_akta").addClass('white-input');
      $$("#tanggal_siup").addClass('white-input');
      $$("#tanggal_pengesahan").addClass('white-input');
      $$("#addformupload").on("touchend", addrow);
      $$("#simpan").on("click", function () {
        app.input.validateInputs("#new_siup");
        if ($$('#new_siup')[0].checkValidity() == true) {
          data = new Array();
          keteranganid = [];
          filecode = [];
          $('input[name^=keteranganid]').each(function () {
            keteranganid.push($(this).val());
          });
          $('input[name^=filecode]').each(function () {
            filecode.push($(this).val());
          });
          if (!$('#pas_foto').val()) {
            mainView.router.back();
            $('#datatables').DataTable().ajax.reload();
            app.dialog.alert('Gagal Simpan! Mohon mengisi Foto!');
            return false;
          }
          mydata = app.form.convertToData("#new_siup");
          data.push(mydata);
          data.push(iamthedoor);
          data.push(keteranganid);
          data.push(filecode);
          app.request.post(site_url_mobile_layanan + '/siup/save_siup', data, function (data) {
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
      })
    },
  }
};
var siup = {
  path: '/tipe-c/siup',
  url: './pages/tipe-c/siup.html',
  name: 'siup',
  on: {
    pageInit: function () {
      $$("#btnnew").hide();
      $$("#btnperpanjangan").hide();
      $$("#btnperubahan").hide();
      if (datauser.role_id == "4") {
        $$("#btnnew").show();
        $$("#btnperpanjangan").show();
        $$("#btnperubahan").show();
      }
      var statusselect = app.smartSelect.create({
        el: '.statusselect',
        on: {
          close: function () {
            app.dialog.preloader('Loading...');
            datatables.context[0].ajax.url = site_url_mobile_layanan + '/siup/layanan/' + $$('#statusselect').val();
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
          "url": site_url_mobile_layanan + '/siup/layanan/1',
          "data": iamthedoor,
          "type": "GET"
        },
        "columns": [
          { "data": "id" },
          { "data": "kode_transaksi" },
          { "data": "nomor" },
          { "data": "nama_usaha" },
          { "data": "tanggal_siup" },
          { "data": "permohonan_tipe" },
          { "data": "display_name" },
          { "data": "val_status", "width": "20%" },
          { "data": "status_fix", "width": "20%" },
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
          if (data.status_fix) {
            var color = '#transparent';
            var text = 'Aktif';
            if (data.status_fix == 2) {
              var color = '#transparent';
              var text = 'Tidak Aktif';
            }
            if (data.status_fix == 0) {
              var color = '#transparent';
              var text = 'Proses';
            }
            $('td:eq(8)', row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px;">' + text + '</span>');
          }
          if (data.val_status == 'Menunggu') {
            if (datauser.role_id == '4') {
              $('td:eq(0)', row).html('<a href="/tipe-c/siup_edit/' + data.id + '/edit/" class="button button-small button-fill color-blue">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');
            } else {
              $('td:eq(0)', row).html('<a href="/tipe-c/siup_edit/' + data.id + '/approve/" class="button button-small button-fill color-green">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Approve</a>');
            }
          } else {
            $('td:eq(0)', row).html('<a href="/tipe-c/siup_edit/' + data.id + '/lihat/" class="button button-small button-fill color-green">' +
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
var siup_edit = {
  path: '/tipe-c/siup_edit/:id/:tipe',
  url: './pages/tipe-c/siup_edit.html',
  name: 'siup_edit',
  on: {
    pageInit: function () {
      tablename = "siup";
      if (datauser.role_id == '4') {
        $$('.remove-when-user').remove();
      }
      get_kbli();
      $$("#addformupload").hide();
      var tanggal_pengajuan = app.calendar.create({
        inputEl: '#tanggal_pengajuan',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
        on: {
          calendarClosed: function () {
            cektanggal();
          }
        }
      });
      var tanggal_siup = app.calendar.create({
        inputEl: '#tanggal_siup',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
        on: {}
      });
      get_kecamatan_dom('#kec_usaha', '#kel_usaha');
      $$('#kec_usaha').on('change', function () {
        get_kelurahan_dom($$('#kec_usaha').val(), '#kel_usaha');
      });
      $$("#print_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/siup/print_doc/' + id, iamthedoor, function (doc_path) {
          download_doc(doc_path);
        }, 'json');
      });
      $$("#print_preview_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/siup/print_doc/' + id, iamthedoor, function (doc_path) {
          preview_doc(doc_path);
        }, 'json');
      });
      $$("#tanggal_akta").addClass('white-input');
      $$("#tanggal_siup").addClass('white-input');
      $$("#tanggal_pengesahan").addClass('white-input');
      $$("#tanggal_pengajuan").addClass('white-input');
      $$(".checked_approval_button").hide();
      kbli_ss = app.smartSelect.create({
        el: '.kbli_ss',
        searchbar: true,
        searchbarPlaceholder: 'Cari Kode KBLI',
        on: {
          opened: function () {
            $$(".smart-select-page .page-content").addClass('cari_kbli');
          },
          close: function () {
            data_kbli = $$(".kbli_ss .item-after").html();
            data_kbli = data_kbli.split(', ');
            $$(".kbli_ss .item-after").hide();
            $$("textarea[name='kbli_detail']").val(data_kbli.join('\n'));
            join_kbli = $$("select[name='kbli']").val().join(';');
            $$("input[name='kode_kbli']").val(join_kbli);
            if ($$("input[name='kode_kbli']").val() == "") {
              $$("#hapus_kbli").hide();
            } else {
              $$("#hapus_kbli").show();
            }
          }
        }
      });
      var this_user_is_the_last_index = false;
      var id = mainView.router.currentRoute.params.id;
      var tipe = mainView.router.currentRoute.params.tipe;
      if (tipe == 'edit') {
        $$('#approval').hide();
        $$("#addformupload").show();
        $$("#addformupload").on("touchend", addrow);
      }
      get_data_by_id(id, tipe);
    },
  }
};
var siup_sub = {
  path: '/tipe-c/siup_sub/:sub_tipe',
  url: './pages/tipe-c/siup_sub.html',
  name: 'siup_sub',
  on: {
    pageInit: function () {
      var sub_tipe = mainView.router.currentRoute.params.sub_tipe;
      app.dialog.alert(sub_tipe);
      $$(".checked_approval_button").hide();
    }
  }
};

function cektanggal() {
  mulai_berlaku = $$("#mulai_berlaku").val();
  berakhir_tanggal = $$("#berakhir_tanggal").val();
  if (mulai_berlaku != '' && berakhir_tanggal != '') {
    if (mulai_berlaku > berakhir_tanggal) {
      app.dialog.alert('Tanggal berakhir harus lebih dari tanggal mulai berlaku')
    }
  }
}

function get_kbli() {
  app.request.post(site_url_mobile + '/siurban_mobile/get_kbli/', function (kbli) {
    var html = '';
    for (var i = 0; i < kbli.length; i++) {
      html += '<option value="' + kbli[i].kelompok + '">(' + kbli[i].kelompok + ') ' + kbli[i].judul_deskripsi + '</option>';
    }
    $$("select[name='kbli']").html(html);
  }, 'json');
}

function hapus_kbli() {
  app.dialog.confirm('Apakah anda yakin akan menghapus?', function () {
    $$("select[name='kbli']").val('');
    $$("textarea[name='kbli_detail']").val('');
    $$("input[name='kode_kbli']").val('');
  }, function () {});
}

function get_data_by_id(id, tipe) {
  data = [];
  data.push(iamthedoor);
  app.dialog.preloader('Loading...');
  app.request.post(site_url_mobile_layanan + '/siup/find_layanan/' + id + '/' + datauser.bf_users_id, data, function (data) {
    if (data == false) {
      app.dialog.close();
      app.dialog.alert('Data tidak ditemukan');
      mainView.router.back();
    } else {
      this_user_is_the_last_index = data.this_user_is_the_last_index;
      app.request.post(site_url_mobile + '/siurban_mobile/get_kecamatan_kelurahan/' + data.pemohon.kecamatan + '/' + data.pemohon.kode_desa, function (keckel) {
        $$("input[name='kode_transaksi']").val(data.layanan.kode_transaksi);
        $$("input[name='nomor']").val(data.layanan.nomor);
        $$("input[name='kecamatan_pemohon']").val(keckel.kecamatan);
        $$("input[name='kelurahan_pemohon']").val(keckel.kelurahan);
        $$("input[name='nama_pemohon']").val(data.pemohon.nama);
        $$("input[name='alamat_pemohon']").val(data.pemohon.alamat);
        $$("input[name='nik_pemohon']").val(data.pemohon.nik);
        if (data.approve !== null) {
          $$("input[name='approve_items_id']").val(data.approve.id);
          $$("input[name='type_ttd']").val(data.approve.author_type);
          document_look(data.latest_status.status_approval, data.latest_status.display_name);
          if (data.approve.ttd !== null) {
            ttdview(data.approve.ttd);
          }
        }
        $$("input[name='nik_pemohon']").val(data.pemohon.nik);
        $$("input[name='nama_pemohon']").val(data.pemohon.nama);
        $$("input[name='tempat_lahir_pemohon']").val(data.pemohon.tempat_lahir);
        $$("input[name='jenis_kelamin_pemohon']").val(data.pemohon.jenis_kelamin);
        $$("input[name='agama_pemohon']").val(data.pemohon.agama);
        $$("input[name='status_kawin_pemohon']").val(data.pemohon.status_kawin);
        $$("input[name='tanggal_lahir_pemohon']").val(data.pemohon.tanggal_lahir);
        $$("input[name='pekerjaan_pemohon']").val(data.pemohon.pekerjaan);
        $$("input[name='alamat_pemohon']").val(data.pemohon.alamat);
        $$("input[name='email_pemohon']").val(data.pemohon.email);
        $$("input[name='kwn_pemohon']").val(data.pemohon.kwn);
        $$("input[name='nama_usaha']").val(data.layanan.nama_usaha);
        $$("input[name='npwp_usaha']").val(data.layanan.npwp_usaha);
        $$("input[name='status_usaha']").val(data.layanan.status_usaha);
        $$("input[name='alamat_usaha']").val(data.layanan.alamat_usaha);
        $$("select[name='kec_usaha']").val(data.layanan.kec_usaha).change();
        app.request.post(site_url_mobile_layanan + '/user_support/get_kelurahan/' + data.layanan.kec_usaha, function (callback) {
          let options = '';
          for (var i = 0; i < callback.length; i++) {
            options += '<option value="' + callback[i].kode + '">' + callback[i].nama + '</option>';
          }
          $$('#kel_usaha').html(options).change();
          $$("select[name='kel_usaha']").val(data.layanan.kel_usaha).change();
        }, 'json');
        $$("input[name='pos_usaha']").val(data.layanan.pos_usaha);
        $$("input[name='telp_usaha']").val(data.layanan.telp_usaha);
        $$("input[name='fax_usaha']").val(data.layanan.fax_usaha);
        $$("input[name='email_usaha']").val(data.layanan.email_usaha);
        $$("input[name='modal_usaha']").val(data.layanan.modal_usaha);
        $$("input[name='omzet_usaha']").val(data.layanan.omzet_usaha);
        $$("input[name='tenaga_jumlah_usaha']").val(data.layanan.tenaga_jumlah_usaha);
        $$("input[name='tenaga_putra_usaha']").val(data.layanan.tenaga_putra_usaha);
        $$("input[name='tenaga_putri_usaha']").val(data.layanan.tenaga_putri_usaha);
        $$("input[name='pas_foto']").val(data.layanan.pas_foto);
        if (data.file != null) {
          $$("input[name='pas_foto_path']").val(data.file.file_actual);
        }
        $$("input[name='pendidikan']").val(data.layanan.pendidikan);
        $$("select[name='bentuk_usaha']").val(data.layanan.bentuk_usaha).change();
        $$("input[name='nomor_akta']").val(data.layanan.nomor_akta);
        $$("input[name='tanggal_siup']").val(data.layanan.tanggal_siup);
        $$("input[name='tanggal_akta']").val(data.layanan.tanggal_akta);
        $$("input[name='tanggal_pengesahan']").val(data.layanan.tanggal_pengesahan);
        $$("input[name='kelembagaan']").val(data.layanan.kelembagaan);
        $$("input[name='sarana_usaha']").val(data.layanan.sarana_usaha);
        $$("select[name='kbli']").val(data.layanan.kode_kbli.split(';'));
        $$("input[name='kode_kbli']").val(data.layanan.kode_kbli);
        if (data.layanan.kode_kbli == '') {
          $$("#hapus_kbli").hide();
        }
        data_kbli = data.kbli;
        kbli_detail = '';
        for (var i = 0; i < data_kbli.length; i++) {
          if (i == 0) {
            kbli_detail += '(' + data_kbli[i].kelompok + ') ' + data_kbli[i].judul_deskripsi;
          } else {
            kbli_detail += '\n(' + data_kbli[i].kelompok + ') ' + data_kbli[i].judul_deskripsi;
          }
        }
        $$("textarea[name='kbli_detail']").val(kbli_detail);
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
          $$('.admin-only').hide();
          $$("#btndeletelayanan").html('<a class="button button-round button-fill color-red" id="deletelayanan" style="margin-top: 10px;">' +
            '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Hapus Data</span></a>');
          if (data.file != null) {
            var preview_files = '<a id="preview_pas_foto_button" onclick="preview_foto_tdp(' + data.file.id + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
            $$('.preview_pas_foto').html(preview_files);
          }
          if (tipe == 'edit') {
            prep_penyimpanan_edit(id);
          } else {
            $$('#edit_siup input').prop("disabled", true);
            $$('#edit_siup textarea').prop("disabled", true);
            if (data.check_approved) {
              $$('.savebutton').hide();
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
          $$('#edit_siup input').prop("readonly", true);
          $$('#edit_siup textarea').prop("disabled", true);
          if (tipe == 'approve') {
            $$('#simpan').html('<i class="icon f7-icons">checkmark_seal_fill</i> Approve');
            $$('#print_preview_button').show();
            prep_penyimpanan_edit(id);
          } else {
            if (data.check_approved) {
              $$('.savebutton').hide();
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
          app.dialog.alert('Proses Hapus Data');
          data = [];
          data.push(iamthedoor);
          app.request.post(site_url_mobile_layanan + '/siup/delete_layanan/' + id, data, function (data) {
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
        app.dialog.close();
      }, function () {}, 'json');
    }
  }, function () {
    app.dialog.close();
    app.dialog.alert('Gagal');
    mainView.router.back();
  }, 'json');
}

function prep_penyimpanan_edit(id) {
  $$("#simpan").on("click", function () {
    if ($$('#tanggal_siup').val() == '') {
      app.dialog.alert('Tanggal berlaku IUMK tidak boleh kosong');
      $$('.page-content').scrollTop(0, 600);
      return;
    }
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
      mydata = app.form.convertToData("#edit_siup");
      data.push(mydata);
      data.push(iamthedoor);
      data.push(keteranganid);
      data.push(filecode);
      var url = site_url_mobile_layanan + '/siup/save_siup/update/' + id;
      app.request.post(url, data, function (data) {
        if (isNaN(data)) {
          app.dialog.close();
          if (data.status == 'fail') {
            app.dialog.alert('Proses Gagal');
          } else if (data.status == 'success') {
            app.dialog.alert('Berhasil !');
          } else {
            app.dialog.alert('Proses Gagal');
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
        app.dialog.alert('Proses Selesai');
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
          approve('/siup/save_siup/ustatus/' + id, this_user_is_the_last_index, $$('#esign').val());
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
          approve('/siup/save_siup/ustatus/' + id, this_user_is_the_last_index);
          approval.close();
        });
      }
    }
  });
  $$("#simpan_operator").on("click", function () {
    data = new Array();
    app.dialog.preloader('Proses Penyimpanan...');
    keteranganid = [];
    filecode = [];
    $('input[name^=keteranganid]').each(function () {
      keteranganid.push($(this).val());
    });
    $('input[name^=filecode]').each(function () {
      filecode.push($(this).val());
    });
    mydata = app.form.convertToData("#edit_siup");
    data.push(mydata);
    data.push(iamthedoor);
    data.push(keteranganid);
    data.push(filecode);
    var url = site_url_mobile_layanan + '/siup/save_siup/update/' + id;
    app.request.post(url, data, function (data) {
      if (isNaN(data)) {
        app.dialog.close();
        if (data.status == 'fail') {
          app.dialog.alert('Proses Gagal');
        } else if (data.status == 'success') {
          app.dialog.alert('Berhasil !');
        } else {
          app.dialog.alert('Proses Gagal');
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
  });
}