var pengangkatan_anak = {
  path: '/tipe-d/pengangkatan_anak/',
  url: './pages/tipe-d/dinsos/pengangkatan_anak.html',
  name: 'pengangkatan_anak',
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
          url: site_url_mobile_layanan + '/pengangkatan_anak/get_data/1',
          data: iamthedoor,
          type: 'GET'
        },
        columns: [
          { data: 'id' },
          { data: 'kode_transaksi' },
          { data: 'nik' },
          { data: 'nama' },
          { data: 'anak_asuh' },
          { data: 'telp' },
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
              $('td:eq(0)', row).html('<a href="/tipe-d/edit_pengangkatan_anak/' + data.id + '/edit/" class="button button-small button-fill color-blue">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');
            } else {
              $('td:eq(0)', row).html('<a href="/tipe-d/edit_pengangkatan_anak/' + data.id + '/approve/" class="button button-small button-fill color-green">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Approve</a>');
            }
          } else {
            $('td:eq(0)', row).html('<a href="/tipe-d/edit_pengangkatan_anak/' + data.id + '/view/" class="button button-small button-fill color-green">' +
              '<i class="icon f7-icons" style="font-size: 12pt;">zoom_in</i> Lihat</a>');
          }

          var color = '#17A05E';
          $('td:eq(7)', row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px; color:white;">Bisa Diambil</span>');
          if (data.val_status) {
            if (data.val_status == 'Ditolak') {
              color = '#DE4E42';
            } else if (data.val_status == 'Menunggu') {
              color = '#FF9800';
            }
            $('td:eq(7)', row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px; color:white;">' + data.val_status + '</span>');
          }
        }
      });

      var statusselect = app.smartSelect.create({
        el: '.statusselect',
        on: {
          close: function () {
            app.dialog.preloader('Loading...');
            datatables.context[0].ajax.url = site_url_mobile_layanan + '/pengangkatan_anak/get_data/' + $$('#statusselect').val();
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

var new_pengangkatan_anak = {
  path: '/tipe-d/new_pengangkatan_anak/',
  url: './pages/tipe-d/dinsos/new_pengangkatan_anak.html',
  name: 'new_pengangkatan_anak',
  on: {
    pageInit: function () {
      $$('#nik_pemohon').val(datauser.nik);
      $$('#nama_pemohon').val(datauser.nama);
      $$('#tempat_lahir').val(datauser.tempat_lahir);
      $$('#tanggal_lahir').val(new Date(datauser.tanggal_lahir).toDateIndoFormat());
      $$('#jenis_kelamin').val(datauser.jenis_kelamin);
      $$('#telp_pemohon').val(datauser.no_telp_pendaftar);
      $$('#kec_pemohon').val(datauser.nama_kec);
      $$('#kel_pemohon').val(datauser.nama_kel);
      $$('#alamat_pemohon').val(datauser.alamat);
      $$('#email_pemohon').val(datauser.email);

      $$('#nama').val(datauser.nama);
      $$('#telp').val(datauser.no_telp_pendaftar);

      app.request.post(site_url_mobile_layanan + '/pengangkatan_anak/get_berkas', iamthedoor, function (result) {
        get_berkas(result.berkas);
      }, 'json');

      $$('#simpan').on('click', function () {
        app.input.validateInputs('#new_pengangkatan_anak');
        if ($$('#new_pengangkatan_anak')[0].checkValidity() == true) {
          let form_data = app.form.convertToData('#new_pengangkatan_anak');
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
          app.request.post(site_url_mobile_layanan + '/pengangkatan_anak/create_pengangkatan_anak', ajax_data, function (callback) {
            app.dialog.close();
            if (callback) {
              app.dialog.alert('Data Berhasil Disimpan');
              mainView.router.back();
              $('#datatables').DataTable().ajax.reload();
            } else {
              app.dialog.alert(callback.desc);
            }
          }, function () {
            app.dialog.close();
            app.dialog.alert('Data Gagal Disimpan, Mohon Coba Lagi Nanti');
          }, 'json');
        }
      });
    }
  }
};

var edit_pengangkatan_anak = {
  path: '/tipe-d/edit_pengangkatan_anak/:id/:tipe/',
  url: './pages/tipe-d/dinsos/edit_pengangkatan_anak.html',
  name: 'edit_pengangkatan_anak',
  on: {
    pageInit: function () {
      var id = mainView.router.currentRoute.params.id;
      var tipe = mainView.router.currentRoute.params.tipe;
      var file_code_report_pengangkatan_anak = '';

      $$('.checked_approval_button').hide();
      if (tipe == 'edit') {
        $$('#approval').hide();
      } else if (tipe == 'approve') {
        $$('#simpan').html('<i class="icon f7-icons">checkmark_seal_fill</i> Approve');
        $$('#print_preview_button').show();
        $('.form-group input').prop('readonly', true);
      } else if (tipe == 'view') {
        $$('.save_button').remove();
        $$('#btndeletelayanan').remove();
        $('.form-group input').prop('readonly', true);
      }

      $$('#print_button').on('click', function () {
        // app.dialog.preloader('Mohon Tunggu Sebentar...');
        // app.request.post(site_url_mobile_layanan + '/pengangkatan_anak/print_doc/' + id, iamthedoor, function (doc_path) {
        //   download_doc(doc_path);
        // }, 'json');
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        download_external('layanan', file_code_report_pengangkatan_anak);
      });

      $$('#print_preview_button').on('click', function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/pengangkatan_anak/print_doc/' + id, iamthedoor, function (doc_path) {
          preview_doc(doc_path);
        }, 'json');
      });

      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/pengangkatan_anak/find/' + id, iamthedoor, function (data) {
        app.dialog.close();

        $$('#nik_pemohon').val(data.user_cred.nik);
        $$('#nama_pemohon').val(data.user_cred.nama);
        $$('#tempat_lahir').val(data.user_cred.tempat_lahir);
        $$('#tanggal_lahir').val(new Date(data.user_cred.tanggal_lahir).toDateIndoFormat());
        $$('#jenis_kelamin').val(data.user_cred.jenis_kelamin);
        $$('#telp_pemohon').val(data.user_cred.no_telp_pendaftar);
        $$('#kec_pemohon').val(data.user_cred.nama_kec);
        $$('#kel_pemohon').val(data.user_cred.nama_kel);
        $$('#alamat_pemohon').val(data.user_cred.alamat);
        $$('#email_pemohon').val(data.user_cred.email);

        $$('#nama').val(data.layanan.nama);
        $$('#anak_asuh').val(data.layanan.anak_asuh);
        $$('#telp').val(data.layanan.telp);

        if (tipe == 'view') {
          get_berkas(data.berkas, data.attachments, tipe);
        } else {
          get_berkas(data.berkas, data.attachments);
        }

        if (data.approve) {
          $$("input[name='approve_items_id']").val(data.approve.approval_item_id);
          $$("input[name='type_ttd']").val(data.approve.author_type);
        }

        let table_chron = '';
        if (data.chron.length) {
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
        $$('.table-chron').html(table_chron);

        this_user_is_the_last_index = data.this_user_is_the_last_index;
        if (data.check_approved) {
          $$('.save_button').hide();
          if (data.report_pengangkatan_anak != '') {
            $$('.checked_approval_button').show();
            file_code_report_pengangkatan_anak = data.report_pengangkatan_anak;
          }
        }
      }, function () {
        app.dialog.close();
        app.dialog.alert('Data Gagal Ditemukan, Mohon Coba Lagi Nanti');
      }, 'json');

      $$('#deletelayanan').on('click', function () {
        app.dialog.preloader('Loading...');
        app.request.post(site_url_mobile_layanan + '/pengangkatan_anak/delete_pengangkatan_anak/' + id, iamthedoor, function (callback) {
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
        app.input.validateInputs('#edit_pengangkatan_anak');
        if ($$('#edit_pengangkatan_anak')[0].checkValidity() == true) {
          if (datauser.role_id == 4) {
            let form_data = app.form.convertToData('#edit_pengangkatan_anak');
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
            app.request.post(site_url_mobile_layanan + '/pengangkatan_anak/update_pengangkatan_anak/' + id, ajax_data, function (callback) {
              app.dialog.close();
              if (callback) {
                app.dialog.alert('Data Berhasil Disimpan');
                mainView.router.back();
                $('#datatables').DataTable().ajax.reload();
              } else {
                app.dialog.alert(callback.desc);
              }
            }, function () {
              app.dialog.close();
              app.dialog.alert('Data Gagal Disimpan, Mohon Coba Lagi Nanti');
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
    }
  }
}
