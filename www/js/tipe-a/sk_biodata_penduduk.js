tablename = "sk_biodata_penduduk";
var new_sk_biodata_penduduk = {
  path: '/tipe-a/new_sk_biodata_penduduk/',
  url: './pages/tipe-a/new_sk_biodata_penduduk.html',
  name: 'new_sk_biodata_penduduk',
  on: {
    pageInit: function () {
      add_attachment_pendaftar(datauser.attachments);
      anggota_keluarga = new Array();
      $$("#addkeluarga").on("touchend", function () {
        popup_tambah_biodata_anggota_keluarga();
      });
      $$("#addformupload").on("touchend", addrow);
      $$("#simpan").on("click", function () {
        app.input.validateInputs("#new_sk_biodata_penduduk");
        if ($$('#new_sk_biodata_penduduk')[0].checkValidity() == true) {
          data = new Array();
          keteranganid = [];
          filecode = [];
          $('input[name^=keteranganid]').each(function () {
            keteranganid.push($(this).val());
          });
          $('input[name^=filecode]').each(function () {
            filecode.push($(this).val());
          });
          mydata = app.form.convertToData("#new_sk_biodata_penduduk");
          data.push(mydata);
          data.push(iamthedoor);
          data.push(keteranganid);
          data.push(filecode);
          data.push(anggota_keluarga);
          app.request.post(site_url_mobile_layanan + '/sk_biodata_penduduk/save_sk_biodata_penduduk', data, function (data) {
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
var sk_biodata_penduduk = {
  path: '/tipe-a/sk_biodata_penduduk',
  url: './pages/tipe-a/sk_biodata_penduduk.html',
  name: 'sk_biodata_penduduk',
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
            datatables.context[0].ajax.url = site_url_mobile_layanan + '/sk_biodata_penduduk/layanan/' + $$('#statusselect').val();
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
          "url": site_url_mobile_layanan + '/sk_biodata_penduduk/layanan/1',
          "data": iamthedoor,
          "type": "GET"
        },
        "columns": [
          { "data": "id" },
          { "data": "kode_transaksi" },
          { "data": "nomor" },
          { "data": "kepala_keluarga" },
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
          $('td:eq(6)', row).html('<span style="background-color:transparent; padding:5px; border-radius:10px; ">Bisa<br>Diambil</span>');
          if (data.val_status) {
            var color = 'transparent';
            if (data.val_status == 'Ditolak') var color = 'transparent';
            if (data.val_status == 'Menunggu') var color = 'transparent';
            if (data.val_status == 'Belum Dikirim') var color = 'transparent';
            $('td:eq(6)', row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px;">' + data.val_status + '</span>');
          }
          if (data.val_status == 'Menunggu') {
            if (datauser.role_id == '4') {
              $('td:eq(0)', row).html('<a href="/tipe-a/edit_sk_biodata_penduduk/' + data.id + '/edit/" class="button button-small button-fill color-blue">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');
            } else {
              $('td:eq(0)', row).html('<a href="/tipe-a/edit_sk_biodata_penduduk/' + data.id + '/approve/" class="button button-small button-fill color-green">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Approve</a>');
            }
          } else {
            $('td:eq(0)', row).html('<a href="/tipe-a/edit_sk_biodata_penduduk/' + data.id + '/lihat/" class="button button-small button-fill color-green">' +
              '<i class="icon f7-icons" style="font-size: 12pt;">zoom_in</i> Lihat</a>');
          }
          if (!data.nomor) {
            $('td:eq(2)', row).html('---');
          }
          if (!data.display_name) {
            $('td:eq(5)', row).html('---');
          }
        }
      });
    }
  }
};
var edit_sk_biodata_penduduk = {
  path: '/tipe-a/edit_sk_biodata_penduduk/:id/:tipe',
  url: './pages/tipe-a/edit_sk_biodata_penduduk.html',
  name: 'edit_sk_biodata_penduduk',
  on: {
    pageInit: function () {
      tablename = "sk_biodata_penduduk";
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
          popup_tambah_biodata_anggota_keluarga();
        });
      }
      $$("#print_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/sk_biodata_penduduk/print_doc/' + id, iamthedoor, function (doc_path) {
          download_doc(doc_path);
        }, 'json');
      });
      $$("#print_preview_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/sk_biodata_penduduk/print_doc/' + id, iamthedoor, function (doc_path) {
          preview_doc(doc_path);
        }, 'json');
      });
      data = [];
      data.push(iamthedoor);
      app.dialog.preloader('Loading...');
      $$(".checked_approval_button").hide();
      app.request.post(site_url_mobile_layanan + '/sk_biodata_penduduk/find_layanan/' + id + '/' + datauser.bf_users_id, data, function (data) {
        if (data == false) {
          app.dialog.close();
          app.dialog.alert('Data tidak ditemukan');
          mainView.router.back();
        } else {
          this_user_is_the_last_index = data.this_user_is_the_last_index;
          app.request.post(site_url_mobile + '/siurban_mobile/get_kecamatan_kelurahan/' + data.pemohon.kecamatan + '/' + data.pemohon.kode_desa, function (keckel) {
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
            $$("input[name='kepala_keluarga']").val(data.layanan.kepala_keluarga);
            $$("textarea[name='alamat']").val(data.layanan.alamat);
            $$("input[name='rt']").val(data.layanan.rt);
            $$("input[name='rw']").val(data.layanan.rw);
            anggota_keluarga = data.anggota_keluarga;
            for (var i = 0; i < anggota_keluarga.length; i++) {
              anggota_keluarga[i].status = 'tersimpan';
            }
            reload_anggota_table(anggota_keluarga);
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
                $$('#edit_sk_biodata_penduduk input').prop("disabled", true);
                $$('#edit_sk_biodata_penduduk textarea').prop("disabled", true);
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
              $$('#edit_sk_biodata_penduduk input').prop("disabled", true);
              $$('#edit_sk_biodata_penduduk textarea').prop("disabled", true);
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
                app.request.post(site_url_mobile_layanan + '/sk_biodata_penduduk/delete_layanan/' + id, data, function (data) {
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
          }, 'json');
        }
      }, function () {
        app.dialog.close();
        app.dialog.alert('Gagal');
        mainView.router.back();
      }, 'json');

      function prep_penyimpanan() {
        $$("#simpan").on("click", function () {
          app.input.validateInputs("#edit_sk_biodata_penduduk");
          if ($$('#edit_sk_biodata_penduduk')[0].checkValidity() == true) {
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
              mydata = app.form.convertToData("#edit_sk_biodata_penduduk");
              data.push(mydata);
              data.push(iamthedoor);
              data.push(keteranganid);
              data.push(filecode);
              data.push(anggota_keluarga);
              var url = site_url_mobile_layanan + '/sk_biodata_penduduk/save_sk_biodata_penduduk/update/' + id;
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
                  approve('/sk_biodata_penduduk/save_sk_biodata_penduduk/ustatus/' + id, this_user_is_the_last_index, $$('#esign').val());
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
                  approve('/sk_biodata_penduduk/save_sk_biodata_penduduk/ustatus/' + id, this_user_is_the_last_index);
                  approval.close();
                });
              }
            }
          }
        })
      }
    },
  }
};

function popup_tambah_biodata_anggota_keluarga() {
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
      '<input type="text" name="nik">' +
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
      '<div class="item-title item-label">Nama Ayah</div>' +
      '<input type="text" name="ayah">' +
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
    kerja_elem: '#tambah_anggota_keluarga #pekerjaan'
  });
  $$("#save_anggota").on('click', function () {
    popup_anggota.close();
    if ($("#tambah_anggota_keluarga").data("id") !== null) {
      anggota_id = $("#tambah_anggota_keluarga").data("id");
      anggota_keluarga[anggota_id] = app.form.convertToData("#tambah_anggota_keluarga");
    } else {
      anggota_keluarga.push(app.form.convertToData("#tambah_anggota_keluarga"));
    }
    reload_anggota_table(anggota_keluarga);
  })
}

function reload_anggota_table(anggota_keluarga_key) {
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
        '<td class="numeric-cell">' + anggota_keluarga_key[i].nik + '</td>' +
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
      reload_anggota_table(anggota_keluarga_key);
    });
  });
  $$(".edit_anggota").on('click', function () {
    anggota_id = $(this).data("id");
    app.dialog.confirm('Apakah anda yakin akan merubah data?', function () {
      popup_tambah_biodata_anggota_keluarga();
      $$("#tambah_anggota_keluarga").attr("data-id", anggota_id);
      if (typeof anggota_keluarga_key[anggota_id].nama_lengkap === "undefined") {
      }
      $$("input[name='nama_lengkap']").val(anggota_keluarga_key[anggota_id].nama_lengkap);
      $$("input[name='nik']").val(anggota_keluarga_key[anggota_id].nik);
      $$("select[name='jenis_kelamin']").val(anggota_keluarga_key[anggota_id].jenis_kelamin).change();
      $$("input[name='tempat_lahir']").val(anggota_keluarga_key[anggota_id].tempat_lahir);
      $$("#tgl_lahir_anggota").val(anggota_keluarga_key[anggota_id].tgl_lahir);
      $$("select[name='pendidikan']").val(anggota_keluarga_key[anggota_id].pendidikan).change();
      $$("select[name='gol_dar']").val(anggota_keluarga_key[anggota_id].gol_dar).change();
      $$("select[name='status_perkawinan']").val(anggota_keluarga_key[anggota_id].status_perkawinan).change();
      $$("select[name='agama']").val(anggota_keluarga_key[anggota_id].agama).change();
      $$("select[name='hubungan']").val(anggota_keluarga_key[anggota_id].hubungan).change();
      $$("select[name='pekerjaan']").val(anggota_keluarga_key[anggota_id].pekerjaan).change();
      $$("input[name='ayah']").val(anggota_keluarga_key[anggota_id].ayah);
      $$("input[name='ibu']").val(anggota_keluarga_key[anggota_id].ibu);
    });
  });
}