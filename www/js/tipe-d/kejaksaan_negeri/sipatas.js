var pendaftaran_sipatas = {
  path: '/tipe-d/kejaksaan_negeri/pendaftaran_sipatas/',
  url: './pages/tipe-d/kejaksaan_negeri/pendaftaran_sipatas.html',
  name: 'sipatas',
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
          url: site_url_mobile_layanan + '/pendaftaran_sipatas/get_data/0',
          data: iamthedoor,
          type: 'GET'
        },
        columns: [{
          data: 'id'
        },
        {
          data: 'nama_pelanggar'
        },
        {
          data: 'no_reg'
        },
        {
          data: 'tanggal_sidang'
        },
        {
          data: 'alamat_tujuan'
        },
        {
          data: 'no_wa'
        },
        {
          data: 'status_transfer'
        },
        ],
        initComplete: function (settings, json) {
          app.dialog.close();
          $$('#datatables_length').hide();
          $$('#datatables_filter').hide();
        },
        rowCallback: function (row, data) {
          if (datauser.role_id == 4) {
            $('td:eq(0)', row).html('<a href="/tipe-d/kejaksaan_negeri/edit_pendaftaran_sipatas/' + data.id + '/edit/" class="button button-small button-fill color-blue">' +
              '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');
          } else {
            $('td:eq(0)', row).html('<a href="/tipe-d/kejaksaan_negeri/edit_pendaftaran_sipatas/' + data.id + '/view/" class="button button-small button-fill color-green">' +
              '<i class="icon f7-icons" style="font-size: 12pt;">zoom_in</i> Lihat</a>');
          }
          var status_transfer = ''
          if (data.status_transfer == '0') {
            color = '#DE4E42';
            status_transfer = 'Belum Transfer';
          } else if (data.status_transfer == '1') {
            color = '#46A046';
            status_transfer = 'Sudah Transfer';
          }
          $('td:eq(6)', row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px; color:white;">' + status_transfer + '</span>');
        }
      });

      var statusselect = app.smartSelect.create({
        el: '.statusselect',
        on: {
          close: function () {
            app.dialog.preloader('Loading...');
            datatables.context[0].ajax.url = site_url_mobile_layanan + '/pendaftaran_sipatas/get_data/' + $$('#statusselect').val();
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

var new_pendaftaran_sipatas = {
  path: '/tipe-d/new_pendaftaran_sipatas/',
  url: './pages/tipe-d/kejaksaan_negeri/new_pendaftaran_sipatas.html',
  name: 'new_sipatas',
  on: {
    pageInit: function () {
      var calendar_tanggal_sidang = app.calendar.create({
        inputEl: '#tanggal_sidang',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      $$("#tanggal_sidang").val(get_current_date());

      $$('#nama_pelanggar').val(datauser.nama);
      $$('#alamat_tujuan').val(datauser.alamat);
      $$('#no_wa').val(datauser.no_telp_pendaftar);

      $('#status_transfer').change();
      // $('.e-tilang').fadeOut();
      $('.bukti').fadeOut();

      $('#status_transfer').on('change', function () {
        var pembayaran = this.value;
        if (pembayaran == '0') {
          $('.e-tilang').fadeIn();
          $('.bukti').fadeOut();
        } else if (pembayaran == '1') {
          $('.e-tilang').fadeOut();
          $('.bukti').fadeIn();
        }
      });

      app.dialog.preloader('Loading...');
      app.dialog.close();

      $$('#simpan').on('click', function () {
        app.input.validateInputs('#new_sipatas');
        if ($$('#new_sipatas')[0].checkValidity() == true) {
          let form_data = app.form.convertToData('#new_sipatas');

          keteranganid = [];
          filecode = [];
          $('input[name^=keteranganid]').each(function () {
            keteranganid.push($(this).val());
          });
          $('input[name^=filecode]').each(function () {
            filecode.push($(this).val());
          });

          let ajax_data = new Array();
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);

          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/pendaftaran_sipatas/create_pendaftaran_sipatas', ajax_data, function (callback) {
            app.dialog.close();
            if (callback) {
              app.dialog.alert('Data Berhasil Diajukan');
              mainView.router.back();
              $('#datatables').DataTable().ajax.reload();
            } else {
              app.dialog.alert('Terjadi Kesalahan');
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
var edit_pendaftaran_sipatas = {
  path: '/tipe-d/kejaksaan_negeri/edit_pendaftaran_sipatas/:id/:tipe',
  url: './pages/tipe-d/kejaksaan_negeri/edit_pendaftaran_sipatas.html',
  name: 'edit_sipatas',
  on: {
    pageInit: function () {
      var id = mainView.router.currentRoute.params.id;
      var tipe = mainView.router.currentRoute.params.tipe;

      // var calendar_tanggal_sidang = app.calendar.create({
      //   inputEl: '#tanggal_sidang',
      //   closeOnSelect: true,
      //   dateFormat: 'dd-MM-yyyy',
      // });
      $$('.checked_approval_button').hide();
      if (datauser.role_id == '4' || tipe == 'edit') {
        $$('#select2').hide();
      }
      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/pendaftaran_sipatas/get_id/' + id, iamthedoor, function (callback) {
        app.dialog.close()
        if (tipe == 'edit') {
          $$('#status_operator').remove();
          if (callback.sipatas.status_user == 0 && callback.sipatas.status == 1 && (callback.sipatas.status_transfer == 0 || callback.sipatas.ongkir_denda > 0)) {
            app.dialog.confirm('Apakah Anda Mau Membayar Tagihan Biaya dan Ongkir yang tertera ?', 'SIPATAS', function () {
              app.dialog.preloader('Loading...');
              app.request.post(site_url_mobile_layanan + '/pendaftaran_sipatas/konfirmasi_user/1/' + id, iamthedoor, function (data) {
                if (data) {
                  app.dialog.close()
                  $$('#save_btn').show()
                  app.dialog.alert('Terimakasih atas konfirmasinya, Mohon cek deskripsi pembayaran yang tertera.')
                }
              })
            }, function () {
              app.dialog.preloader('Loading...');
              app.request.post(site_url_mobile_layanan + '/pendaftaran_sipatas/konfirmasi_user/2/' + id, iamthedoor, function (data) {
                if (data) {
                  app.dialog.close()
                  app.dialog.alert('Terimakasih atas konfirmasinya')
                }
              })
            });
          } else if (callback.sipatas.status_user == 1 || callback.sipatas.status_transfer == 1) {
            $$('#save_btn').show()
          }
        } else if (tipe == 'view') {
          $('#denda_tilang').attr('type', 'number');
          $('#ongkir_denda').attr('type', 'number');
          $('#denda_tilang').prop('readonly', false);
          $('#status_transfer').prop('readonly', true);
          $('#ongkir_denda').prop('readonly', false);
          if (callback.sipatas.status == 0) {
            $$('#save_btn').show()
          }
          $('#status').trigger('chosen:updated').change();

          $('#status').on('change', function () {
            var status_operator = this.value;
            if (status_operator == '1') {
              $('#status_verif').show();
              $('#status_tolak').hide();
            } else if (status_operator == '2') {
              $('#status_tolak').show();
              $('#status_verif').hide();
            }
          });
          $('.file_upload').hide()
        }

        $$('#nama_pelanggar').val(callback.sipatas.nama_pelanggar);
        $$('#no_reg').val(callback.sipatas.no_reg);
        $$('#tanggal_sidang').val(new Date(callback.sipatas.tanggal_sidang).toMonthString());
        $$('#alamat_tujuan').val(callback.sipatas.alamat_tujuan);
        $$('#no_wa').val(callback.sipatas.no_wa);
        $$('#status_transfer').val(callback.sipatas.status_transfer);
        $$('#keterangan_operator').val(callback.sipatas.keterangan_operator);
        $$('#status').val((callback.sipatas.status != 0) ? callback.sipatas.status : 1);
        $$('#denda_tilang').val((callback.sipatas.denda_tilang) ? callback.sipatas.denda_tilang : datauser.role_id == 4 ? 'Denda belum ditentukan' : 0);
        $$('#ongkir_denda').val((callback.sipatas.ongkir_denda) ? callback.sipatas.ongkir_denda : datauser.role_id == 4 ? 'Ongkir belum ditentukan' : 0);
        // $('.e-tilang').fadeOut();
        $('.bukti').fadeOut();

        if (callback.get_attachments) {
          $('#file_code').val(callback.get_attachments.code);
          $('#file_code_path').val(callback.get_attachments.file_name);
          var preview_files = '<a id="preview_pas_foto_button" onclick="preview_files(' + callback.get_attachments.id + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
          $$('.preview_file_code').html(preview_files);
        }

        $('#status_transfer').on('change', function () {
          var pembayaran = this.value;
          if (pembayaran == '0') {
            $('.e-tilang').fadeIn();
            $('.bukti').fadeOut();
          } else if (pembayaran == '1') {
            $('.e-tilang').fadeOut();
            $('.bukti').fadeIn();
          }
        });
        $('#status_transfer').trigger('chosen:updated').change();
        var smartSelect = app.smartSelect.create({
          el: '#select2',
          on: {
            close: function () {
            }
          }
        })

      }, function () {
        app.dialog.close();
        app.dialog.alert('Gagal Mendapatkan Data Anda, Mohon Coba Lagi Nanti');
      }, 'json');

      $$('#simpan').on('click', function () {
        app.input.validateInputs('#edit_pendaftaran_sipatas');
        if ($$('#edit_pendaftaran_sipatas')[0].checkValidity() == true) {
          let form_data = app.form.convertToData('#edit_pendaftaran_sipatas');
          let ajax_data = new Array();
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);
          // console.log(form_data);
          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/pendaftaran_sipatas/update_pendaftaran_sipatas/' + id, ajax_data, function (callback) {
            app.dialog.close();
            if (callback) {
              app.dialog.alert('Data Berhasil Diedit');
              mainView.router.back();
              $('#datatables').DataTable().ajax.reload();
            } else {
              app.dialog.alert('Terjadi Kesalahan');
            }
          }, function () {
            app.dialog.close();
            app.dialog.alert('Data Gagal Diedit, Mohon Coba Lagi Nanti');
          }, 'json');
        }
      });
    }
  }
}

function uploadfoto(uploadfileid) {
  Attachment.openGallery({
    onSuccess: function (fileURL, fileName) {
      let params = { subdir: 'layanan' };
      Attachment.upload(fileURL, fileName, params, function (success) {
        // var data = JSON.parse(success.response);
        var data = JSON.parse(success.data);
        addformupload_status = true;
        $$('.file_code_path').val(fileName);
        $$('.file_code').val(data[0].code);
        var preview_files = '<a id="preview_pas_foto_button" onclick="preview_files(' + data[0].id + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
        $$('.preview_file_code').html(preview_files);
      });
    },
  });
}