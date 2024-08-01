var pengunduran_jkn_kis = {
  path: '/tipe-d/pengunduran_jkn_kis/',
  url: './pages/tipe-d/dinsos/pengunduran_jkn_kis.html',
  name: 'pengunduran_jkn_kis',
  on: {
    pageInit: function() {
      $$('#btnnew').hide();
      if (datauser.role_id == '4') {
        $$('#btnnew').show();
      }

      app.dialog.preloader('Loading...');
      var datatables = $('#datatables').DataTable({
        serverSide: true,
        ajax: {
          "url": site_url_mobile_layanan + '/pengunduran_jkn_kis/get_data/1',
          "data": iamthedoor,
          "type": "GET"
        },
        columns: [
          { "data": "id"},
          { "data": "kode_transaksi"},
          { "data": "nik"},
          { "data": "nama"},
          { "data": "email"},
          { "data": "telp"},
          { "data": 'display_name' },
          { "data": "val_status"},
        ],
        initComplete: function(settings, json) {
          app.dialog.close();
          $$('#datatables_length').hide();
          $$('#datatables_filter').hide();
        },
        rowCallback: function(row, data) {
          if (data.val_status == 'Menunggu') {
            if (datauser.role_id == '4') {
              $('td:eq(0)', row).html('<a href="/tipe-d/edit_pengunduran_jkn_kis/' + data.id + '/edit/" class="button button-small button-fill color-blue">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');
            } else {
              $('td:eq(0)', row).html('<a href="/tipe-d/edit_pengunduran_jkn_kis/' + data.id + '/approve/" class="button button-small button-fill color-green">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Approve</a>');
            }
          } else {
            $('td:eq(0)', row).html('<a href="/tipe-d/edit_pengunduran_jkn_kis/' + data.id + '/view/" class="button button-small button-fill color-green">' +
              '<i class="icon f7-icons" style="font-size: 12pt;">zoom_in</i> Lihat</a>');
          }

          var color = '#17A05E';
          $('td:eq(7)', row).html('<span style="background-color:'+color+'; padding:5px; border-radius:10px; color:white;">Bisa Diambil</span>');
          if (data.val_status) {
            if (data.val_status == 'Ditolak') {
              color = '#DE4E42';
            } else if (data.val_status == 'Menunggu') {
              color = '#FF9800';
            }
            $('td:eq(7)', row).html('<span style="background-color:'+color+'; padding:5px; border-radius:10px; color:white;">'+data.val_status+'</span>');
          }
        }
      });

      var statusselect = app.smartSelect.create({
        el: '.statusselect',
        on: {
          close: function() {
            app.dialog.preloader('Loading...');
            datatables.context[0].ajax.url = site_url_mobile_layanan + '/pengunduran_jkn_kis/get_data/' + $$('#statusselect').val();
            $('#datatables').DataTable().ajax.reload(function(json) {
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
    }
  }
};

var new_pengunduran_jkn_kis = {
  path: '/tipe-d/new_pengunduran_jkn_kis/',
  url: './pages/tipe-d/dinsos/new_pengunduran_jkn_kis.html',
  name: 'new_pengunduran_jkn_kis',
  on: {
    pageInit: function() {
      $$('#nik_pemohon').val(datauser.nik);
      $$('#nama_pemohon').val(datauser.nama);
      $$('#tempat_lahir').val(datauser.tempat_lahir);
      $$('#tanggal_lahir').val(new Date(datauser.tanggal_lahir).toDateIndoFormat());
      $$('#jenis_kelamin').val(datauser.jenis_kelamin);
      $$('#telepon').val(datauser.no_telp_pendaftar);
      $$('#kecamatan').val(datauser.namakec);
      $$('#kelurahan').val(datauser.namakel);
      $$('#email').val(datauser.email);
      $$('#alamat').val(datauser.alamat);
      $$('#id_kec').val(datauser.kecamatan);
      $$('#id_kel').val(datauser.kode_desa);

      anggota_pengunduran = new Array();
      $$("#addpengunduranjkn").on("touchend", function() {
        popup_tambah_anggota_pengunduran();
      });

      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/pengunduran_jkn_kis/get_list_lampiran', iamthedoor, function(data) {
        app.dialog.close();

        get_berkas(data);
      }, function() {
        app.dialog.close();
        app.dialog.alert('Gagal Mendapatkan Data Anda, Mohon Coba Lagi Nanti');
      }, 'json');

      $$('#simpan').on('click', function() {
        app.input.validateInputs('#new_pengunduran_jkn_kis');
        if ($$('#new_pengunduran_jkn_kis')[0].checkValidity() == true) {
          if (anggota_pengunduran.length < 1) {
            app.dialog.alert('Mohon masukkan data pendukung terlebih dahulu.');
            return false;
          }

          let form_data = app.form.convertToData('#new_pengunduran_jkn_kis');
          let filecode = new Array();
          $('.filecode').each((i, el) => filecode.push(el.value));
          let filedesc = new Array();
          $('.filedesc').each((i, el) => filedesc.push(el.value));

          let ajax_data = new Array();
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);
          ajax_data.push(anggota_pengunduran);
          ajax_data.push(filecode);
          ajax_data.push(filedesc);

          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/pengunduran_jkn_kis/create_pengunduran_jkn_kis', ajax_data, function(callback) {
            app.dialog.close();
            if (callback) {
              app.dialog.alert('Data Berhasil Diajukan');
              mainView.router.back();
              $('#datatables').DataTable().ajax.reload();
            } else {
              app.dialog.alert(callback.desc);
            }
          }, function() {
            app.dialog.close();
            app.dialog.alert('Data Gagal Diajukan, Mohon Coba Lagi Nanti');
          }, 'json');
        }
      });
    }
  }
};

var edit_pengunduran_jkn_kis = {
  path: '/tipe-d/edit_pengunduran_jkn_kis/:id/:tipe',
  url: './pages/tipe-d/dinsos/edit_pengunduran_jkn_kis.html',
  name: 'edit_pengunduran_jkn_kis',
  on: {
    pageInit: function() {
      var id = mainView.router.currentRoute.params.id;
      var tipe = mainView.router.currentRoute.params.tipe;

      $$('.checked_approval_button').hide();
      if (tipe == 'edit') {
        $$('#approval').hide();
      } else if (tipe == 'approve') {
        $$('#simpan').html('<i class="icon f7-icons">checkmark_seal_fill</i> Approve');
        $$('#print_preview_button').show();
        $('.form-group input').prop('readonly', true);
      } else if (tipe == 'view') {
        $$('.savebutton').remove();
        $$('#btndeletelayanan').remove();
        $('.form-group input').prop('readonly', true);
      }

      $$('#print_button').on('click', function() {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/pengunduran_jkn_kis/print_doc/' + id, iamthedoor, function (doc_path) {
          download_doc(doc_path);
        }, 'json');
      });
      
      $$('#print_preview_button').on('click', function() {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/pengunduran_jkn_kis/print_doc/' + id, iamthedoor, function (doc_path) {
          preview_doc(doc_path);
        }, 'json');
      });

      anggota_pengunduran = new Array();
      $$("#addpengunduranjkn").on("touchend", function() {
        popup_tambah_anggota_pengunduran();
      });

      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/pengunduran_jkn_kis/get_id/' + id, iamthedoor, function(callback) {
        app.dialog.close();
        console.log(callback);

        $$('#nik_pemohon').val(callback.jkn_kis.nik);
        $$('#nama_pemohon').val(callback.jkn_kis.nama);
        $$('#tempat_lahir').val(callback.jkn_kis.tempat_lahir);
        $$('#tanggal_lahir').val(new Date(callback.jkn_kis.tanggal_lahir).toDateIndoFormat());
        $$('#jenis_kelamin').val(callback.jkn_kis.jenis_kelamin);
        $$('#telepon').val(callback.jkn_kis.telp);
        $$('#kecamatan').val(callback.jkn_kis.nama_kecamatan);
        $$('#kelurahan').val(callback.jkn_kis.nama_kelurahan);
        $$('#email').val(callback.jkn_kis.email);
        $$('#alamat').val(callback.jkn_kis.alamat);

        anggota_pengunduran = callback.anggota;
        for (var i = 0; i < anggota_pengunduran.length; i++) {
          anggota_pengunduran[i].status = 'tersimpan';
        }
        reload_anggota_pengunduran_table(anggota_pengunduran);

        if (tipe == 'view') {
          $$('.aksi-table').remove();
          get_berkas(callback.deskripsi_dokumen, callback.attachments, tipe);
        } else {
          get_berkas(callback.deskripsi_dokumen, callback.attachments);
        }

        if (callback.approve) {
          $$("input[name='approve_items_id']").val(callback.approve.approval_item_id);
          $$("input[name='type_ttd']").val(callback.approve.author_type);
        }

        let table_chron = '';
        if (callback.chron.length) {
          for (var i = 0; i < callback.chron.length; i++) {
            table_chron += '<tr>' +
                '<td>' + callback.chron[i].val_status + '</td>' +
                '<td>' + callback.chron[i].author_type + '</td>' +
                '<td>' + callback.chron[i].name + '</td>' +
                '<td>' + callback.chron[i].keterangan + '</td>' +
                '<td>' + callback.chron[i].tglinsert + '</td>' +
              '</tr>';
          }
        } else {
          table_chron = '<tr>' + '<td></td>' + '<td>Belum Ada Approval</td>' + '<td></td>' + '<td></td>' + '<td></td>' + '</tr>';
        }
        $$('.table-chron').html(table_chron);

        if (callback.approve.sum_approval > 1) {
          $$('#btndeletelayanan').remove();
          $$('.aksi-table').remove();
          $$('#addpengunduranjkn').remove();
        }

        this_user_is_the_last_index = callback.this_user_is_the_last_index;
        if (callback.check_approved) {
          $$('.savebutton').hide();
          $$('.checked_approval_button').show();
          $$("textarea[name='deskripsi']").prop('disabled', true);
        }
      }, function() {
        app.dialog.close();
        app.dialog.alert('Gagal Mendapatkan Data Anda, Mohon Coba Lagi Nanti');
      }, 'json');

      $$('#simpan').on('click', function() {
        app.input.validateInputs('#edit_pengunduran_jkn_kis');
        if ($$('#edit_pengunduran_jkn_kis')[0].checkValidity() == true) {
          if (datauser.role_id == 4) {
            let form_data = app.form.convertToData('#edit_pengunduran_jkn_kis');
            let filecode = new Array();
            $('.filecode').each((i, el) => filecode.push(el.value));
            let filedesc = new Array();
            $('.filedesc').each((i, el) => filedesc.push(el.value));

            let ajax_data = new Array();
            ajax_data.push(iamthedoor);
            ajax_data.push(form_data);
            ajax_data.push(anggota_pengunduran);
            ajax_data.push(filecode);
            ajax_data.push(filedesc);

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile_layanan + '/pengunduran_jkn_kis/update_pengunduran_jkn_kis/' + id, ajax_data, function(callback) {
              app.dialog.close();
              if (callback) {
                app.dialog.alert('Data Berhasil Diedit');
                mainView.router.back();
                $('#datatables').DataTable().ajax.reload();
              } else {
                app.dialog.alert(callback.desc);
              }
            }, function() {
              app.dialog.close();
              app.dialog.alert('Data Gagal Diedit, Mohon Coba Lagi Nanti');
            }, 'json');            
          } else {
            if (this_user_is_the_last_index == true && $$('#status').val() == 2) {
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
                approve('/pengunduran_jkn_kis/approve_pengunduran_jkn_kis/' + id, this_user_is_the_last_index, $$('#esign').val());
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
                approve('/pengunduran_jkn_kis/approve_pengunduran_jkn_kis/' + id, this_user_is_the_last_index);
                approval.close();
              });
            }
          }
        }
      });

      $$('#deletelayanan').on('click', function() {
        app.dialog.confirm('Apakah anda yakin Menghapus Data ini?', function() {
          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/pengunduran_jkn_kis/delete_pengunduran_jkn_kis/' + id, iamthedoor, function(callback) {
            app.dialog.close();
            if (callback.success) {
              app.dialog.alert('Data Berhasil Dihapus');
              mainView.router.back();
              $('#datatables').DataTable().ajax.reload();
            } else {
              app.dialog.alert(callback.desc);
            }
          }, function() {
            app.dialog.close();
            app.dialog.alert('Data Gagal Dihapus, Mohon Coba Lagi Nanti');
          }, 'json');
        });
      });
    }
  }
}

function popup_tambah_anggota_pengunduran() {
  var popup_anggota = app.popup.create({
    content: '<div class="popup page-content">'+
      '<div class="block">'+
        '<form class="list" id="tambah_anggota_pengunduran" data-id="null">'+
          '<div class="block-title">'+
            '<div class="row">'+
              '<div class="col-100">'+
                '<div class="chip color-blue">'+
                  '<div class="chip-label">Form Anggota Pengunduran Diri JKN KIS</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<ul>'+
            '<li class="item-content item-input">'+
              '<div class="item-inner">'+
                '<div class="item-input-wrap">'+
                  '<div class="item-title item-label">Nomor BPJS</div>'+
                  '<input type="text" name="nomor_bpjs">'+
                  '<span class="input-clear-button"></span>'+
                '</div>'+
              '</div>'+
            '</li>'+
            '<li class="item-content item-input">'+
              '<div class="item-inner">'+
                '<div class="item-input-wrap">'+
                  '<div class="item-title item-label">NIK Anggota</div>'+
                  '<input type="text" name="nik_anggota">'+
                  '<span class="input-clear-button"></span>'+
                '</div>'+
              '</div>'+
            '</li>'+
            '<li class="item-content item-input">'+
              '<div class="item-inner">'+
                '<div class="item-input-wrap">'+
                  '<div class="item-title item-label">Nama Lengkap</div>'+
                  '<input type="text" name="nama_lengkap">'+
                  '<span class="input-clear-button"></span>'+
                '</div>'+
              '</div>'+
            '</li>'+
            '<li class="item-content item-input">'+
              '<div class="item-inner">'+
                '<div class="item-input-wrap">'+
                  '<div class="item-title item-label">Alamat</div>'+
                  '<input type="text" name="alamat_anggota">'+
                  '<span class="input-clear-button"></span>'+
                '</div>'+
              '</div>'+
            '</li>'+
            '<input type="hidden" name="status" value="tersimpan">'+
          '</ul>'+
        '</form>'+
        '<div class="row">'+
          '<div class="col-40">'+
            '<a class="button button-round popup-close button-fill color-red" style="margin-top: 10px;">' +
              '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Batal</span>' +
            '</a>'+
          '</div>'+
          '<div class="col-60">'+
            '<a class="button button-round popup-close button-fill color-green" id="save_anggota" style="margin-top: 10px;">' +
              '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
            '</a>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>',
    on: {
      open: function(popup) {},
    }
  });
  popup_anggota.open();
  $$("#save_anggota").on('click', function() {
    popup_anggota.close();
    if ($("#tambah_anggota_pengunduran").data("id") !== null) {
      anggota_id = $("#tambah_anggota_pengunduran").data("id");
      anggota_pengunduran[anggota_id] = app.form.convertToData("#tambah_anggota_pengunduran");
    } else {
      anggota_pengunduran.push(app.form.convertToData("#tambah_anggota_pengunduran"));
    }
    reload_anggota_pengunduran_table(anggota_pengunduran);
  });
}

function reload_anggota_pengunduran_table(anggota_pengunduran_key) {
  anggota_pengunduran_key = anggota_pengunduran_key;
  anggota_pengunduran_html = '<tr><td></td><td>Data Kosong</td><td></td></tr>';
  $$("#anggota_pengunduran_table table tbody").html(anggota_pengunduran_html);
  anggota_pengunduran_row = '';
  for (var i = 0; i < anggota_pengunduran_key.length; i++) {
    if (anggota_pengunduran_key[i].status == "tersimpan") {
      anggota_pengunduran_row += '<tr>' +
        '<td class="label-cell aksi-table" style="padding: 0 8px;"><a data-id="' + [i] + '" class="edit_anggota button button-small color-blue button-fill">EDIT</a></td>' +
        '<td class="label-cell aksi-table" style="padding: 0 8px;"><a data-id="' + [i] + '"  class="hapus_anggota button color-red button-fill button-small">HAPUS</a></td>' +
        '<td class="label-cell">' + anggota_pengunduran_key[i].nomor_bpjs + '</td>' +
        '<td class="label-cell">' + anggota_pengunduran_key[i].nik_anggota + '</td>' +
        '<td class="label-cell">' + anggota_pengunduran_key[i].nama_lengkap + '</td>' +
        '<td class="label-cell">' + anggota_pengunduran_key[i].alamat_anggota + '</td>' +
      '</tr>';
    }
  }
  if (anggota_pengunduran_row !== '') {
    $$("#anggota_pengunduran_table table tbody").html(anggota_pengunduran_row);
  }
  $$(".hapus_anggota").on('click', function() {
    anggota_id = $(this).data("id");
    app.dialog.confirm('Apakah anda yakin Menghapus data?', function() {
      anggota_pengunduran_key[anggota_id].status = 'terhapus';
      reload_anggota_pengunduran_table(anggota_pengunduran_key);
    });
  });
  $$(".edit_anggota").on('click', function() {
    anggota_id = $(this).data("id");
    app.dialog.confirm('Apakah anda yakin akan merubah data?', function() {
      popup_tambah_anggota_pengunduran();
      $$("#tambah_anggota_pengunduran").attr("data-id", anggota_id);
      $$("input[name='nomor_bpjs']").val(anggota_pengunduran_key[anggota_id].nomor_bpjs);
      $$("input[name='nama_lengkap']").val(anggota_pengunduran_key[anggota_id].nama_lengkap);
      $$("input[name='nik_anggota']").val(anggota_pengunduran_key[anggota_id].nik_anggota);
      $$("input[name='alamat_anggota']").val(anggota_pengunduran_key[anggota_id].alamat_anggota);
    });
  });
}