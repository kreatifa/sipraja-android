var penerbitan_stp = {
  path: '/tipe-d/penerbitan_stp/',
  url: './pages/tipe-d/dinsos/penerbitan_stp.html',
  name: 'penerbitan_stp',
  on: {
    pageInit: function () {
      $$('#btnnew').hide();
      if (datauser.role_id == '4') {
        $$('#btnnew').show();
      }

      app.dialog.preloader('Loading...');
      var datatables = $('#datatables').DataTable({
        serverSide: true,
        ajax: {
          url: site_url_mobile_layanan + '/penerbitan_stp/get_data/1',
          data: iamthedoor,
          type: 'GET'
        },
        columns: [
          { data: 'id' },
          { data: 'kode_transaksi' },
          { data: 'nama_yayasan' },
          { data: 'nama_pemohon' },
          { data: 'status_jabatan' },
          { data: 'telp_pengurus_yayasan' },
          { data: 'bidang_yayasan' },
          { data: 'display_name' },
          { data: 'val_status' },
        ],
        initComplete: function (settings, json) {
          app.dialog.close();
          $$('#datatables_length').hide();
          $$('#datatables_filter').hide();
        },
        rowCallback: function (row, data) {
          if (data.val_status == 'Menunggu') {
            if (datauser.role_id == '4') {
              $('td:eq(0)', row).html('<a href="/tipe-d/edit_penerbitan_stp/' + data.id + '/edit/" class="button button-small button-fill color-blue">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');
            } else {
              $('td:eq(0)', row).html('<a href="/tipe-d/edit_penerbitan_stp/' + data.id + '/approve/" class="button button-small button-fill color-green">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Approve</a>');
            }
          } else {
            $('td:eq(0)', row).html('<a href="/tipe-d/edit_penerbitan_stp/' + data.id + '/view/" class="button button-small button-fill color-green">' +
              '<i class="icon f7-icons" style="font-size: 12pt;">zoom_in</i> Lihat</a>');
          }

          var color = '#17A05E';
          $('td:eq(8)', row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px; color:white;">Bisa Diambil</span>');
          if (data.val_status) {
            if (data.val_status == 'Ditolak') {
              color = '#DE4E42';
            } else if (data.val_status == 'Menunggu') {
              color = '#FF9800';
            }
            $('td:eq(8)', row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px; color:white;">' + data.val_status + '</span>');
          }
        }
      });

      var statusselect = app.smartSelect.create({
        el: '.statusselect',
        on: {
          close: function () {
            app.dialog.preloader('Loading...');
            datatables.context[0].ajax.url = site_url_mobile_layanan + '/penerbitan_stp/get_data/' + $$('#statusselect').val();
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
    }
  }
};

var new_penerbitan_stp = {
  path: '/tipe-d/new_penerbitan_stp/',
  url: './pages/tipe-d/dinsos/new_penerbitan_stp.html',
  name: 'new_penerbitan_stp',
  on: {
    pageInit: function () {
      $$('#nik_pemohon').val(datauser.nik);
      $$('#nama').val(datauser.nama);
      $$('#tempat_lahir').val(datauser.tempat_lahir);
      $$('#tanggal_lahir').val(new Date(datauser.tanggal_lahir).toDateIndoFormat());
      $$('#jenis_kelamin').val(datauser.jenis_kelamin);
      $$('#telepon').val(datauser.no_telp_pendaftar);
      $$('#kecamatan').val(datauser.nama_kec);
      $$('#kelurahan').val(datauser.nama_kel);
      $$('#email').val(datauser.email);
      $$('#alamat').val(datauser.alamat);
      $$('#nama_pemohon').val(datauser.nama);
      $$('#id_kec').val(datauser.kecamatan);
      $$('#id_kel').val(datauser.kode_desa);

      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/penerbitan_stp/get_list_lampiran', iamthedoor, function (data) {
        app.dialog.close();

        get_berkas(data);
      }, function () {
        app.dialog.close();
        app.dialog.alert('Gagal Mendapatkan Data Anda, Mohon Coba Lagi Nanti');
      }, 'json');

      $$('#simpan').on('click', function () {
        app.input.validateInputs('#new_penerbitan_stp');
        if ($$('#new_penerbitan_stp')[0].checkValidity() == true) {
          let form_data = app.form.convertToData('#new_penerbitan_stp');
          let filecode = new Array();
          $('.filecode').each((i, el) => filecode.push(el.value));
          let filedesc = new Array();
          $('.filedesc').each((i, el) => filedesc.push(el.value));

          let ajax_data = new Array();
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);
          ajax_data.push(filecode);
          ajax_data.push(filedesc);

          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/penerbitan_stp/create_penerbitan_stp', ajax_data, function (callback) {
            app.dialog.close();
            if (callback) {
              app.dialog.alert('Data Berhasil Diajukan');
              mainView.router.back();
              $('#datatables').DataTable().ajax.reload();
            } else {
              app.dialog.alert(callback.desc);
            }
          }, function () {
            app.dialog.close();
            app.dialog.alert('Data Gagal Diajukan, Mohon Coba Lagi Nanti');
          }, 'json');
        }
      });
    }
  }
};

var edit_penerbitan_stp = {
  path: '/tipe-d/edit_penerbitan_stp/:id/:tipe',
  url: './pages/tipe-d/dinsos/edit_penerbitan_stp.html',
  name: 'edit_penerbitan_stp',
  on: {
    pageInit: function () {
      var id = mainView.router.currentRoute.params.id;
      var tipe = mainView.router.currentRoute.params.tipe;
      var file_code_report_stp = '';

      $$('.checked_approval_button').hide();
      if (tipe == 'edit') {
        $$('#approval').hide();
      } else if (tipe == 'approve') {
        $$('#simpan').html('<i class="icon f7-icons">checkmark_seal_fill</i> Approve');
        $$('#print_preview_button').show();
        $('#nama_pemohon').prop('readonly', true);
        $('#status_jabatan').prop('readonly', true);
        $('#nama_yayasan').prop('readonly', true);
        $('#telp_pengurus').prop('readonly', true);
        $('#bidang_yayasan').prop('readonly', true);
        $('#alamat_yayasan').prop('readonly', true);
      } else if (tipe == 'view') {
        $$('.save_button').remove();
        $$('#btndeletelayanan').remove();
        $('#nama_pemohon').prop('readonly', true);
        $('#status_jabatan').prop('readonly', true);
        $('#nama_yayasan').prop('readonly', true);
        $('#telp_pengurus').prop('readonly', true);
        $('#bidang_yayasan').prop('readonly', true);
        $('#alamat_yayasan').prop('readonly', true);
      }

      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/penerbitan_stp/get_id/' + id, iamthedoor, function (callback) {
        app.dialog.close();

        $$('#nik_pemohon').val(callback.stp.nik);
        $$('#nama').val(callback.stp.nama_user);
        $$('#tempat_lahir').val(callback.stp.tempat_lahir);
        $$('#tanggal_lahir').val(new Date(callback.stp.tanggal_lahir).toDateIndoFormat());
        $$('#jenis_kelamin').val(callback.stp.jenis_kelamin);
        $$('#telepon').val(callback.stp.no_telp_pendaftar);
        $$('#kecamatan').val(callback.stp.nama_kecamatan);
        $$('#kelurahan').val(callback.stp.nama_kelurahan);
        $$('#email').val(callback.stp.email);
        $$('#alamat').val(callback.stp.alamat);
        $$('#nama_pemohon').val(callback.stp.nama_pemohon);
        $$('#status_jabatan').val(callback.stp.status_jabatan);
        $$('#nama_yayasan').val(callback.stp.nama_yayasan);
        $$('#telp_pengurus').val(callback.stp.telp_pengurus_yayasan);
        $$('#bidang_yayasan').val(callback.stp.bidang_yayasan);
        $$('#alamat_yayasan').text(callback.stp.alamat_yayasan);

        if (tipe == 'view') {
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

        this_user_is_the_last_index = callback.this_user_is_the_last_index;
        if (callback.check_approved) {
          $$('.save_button').hide();
          if (callback.report_stp != '') {
            file_code_report_stp = callback.report_stp;
            $$('.checked_approval_button').show();
          }
        }
      }, function () {
        app.dialog.close();
        app.dialog.alert('Gagal Mendapatkan Data Anda, Mohon Coba Lagi Nanti');
      }, 'json');

      $$('#deletelayanan').on('click', function () {
        app.dialog.preloader('Loading...');
        app.request.post(site_url_mobile_layanan + '/penerbitan_stp/delete_penerbitan_stp/' + id, iamthedoor, function (callback) {
          app.dialog.close();
          if (callback.success) {
            app.dialog.alert('Data Berhasil Dihapus');
            mainView.router.back();
            $('#datatables').DataTable().ajax.reload();
          } else {
            app.dialog.alert(callback.desc);
          }
        }, function () {
          app.dialog.close();
          app.dialog.alert('Data Gagal Dihapus, Mohon Coba Lagi Nanti');
        }, 'json');
      });

      $$('#simpan').on('click', function () {
        app.input.validateInputs('#edit_penerbitan_stp');
        if ($$('#edit_penerbitan_stp')[0].checkValidity() == true) {
          if (datauser.role_id == 4) {
            let form_data = app.form.convertToData('#edit_penerbitan_stp');
            let filecode = new Array();
            $('.filecode').each((i, el) => filecode.push(el.value));
            let filedesc = new Array();
            $('.filedesc').each((i, el) => filedesc.push(el.value));

            let ajax_data = new Array();
            ajax_data.push(iamthedoor);
            ajax_data.push(form_data);
            ajax_data.push(filecode);
            ajax_data.push(filedesc);

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile_layanan + '/penerbitan_stp/update_penerbitan_stp/' + id, ajax_data, function (callback) {
              app.dialog.close();
              if (callback) {
                app.dialog.alert('Data Berhasil Diedit');
                mainView.router.back();
                $('#datatables').DataTable().ajax.reload();
              } else {
                app.dialog.alert(callback.desc);
              }
            }, function () {
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
                approve('/pengangkatan_anak/approve_pengangkatan_anak/' + id, this_user_is_the_last_index, $$('#esign').val());
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
                approve('/pengangkatan_anak/approve_pengangkatan_anak/' + id, this_user_is_the_last_index);
                approval.close();
              });
            }
          }
        }
      });

      $$('#print_button').on('click', function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        download_external('layanan', file_code_report_stp);
      });
    }
  }
}
