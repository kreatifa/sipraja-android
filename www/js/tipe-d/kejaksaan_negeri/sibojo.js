var pendaftaran_sibojo = {
  path: '/tipe-d/kejaksaan_negeri/pendaftaran_sibojo/',
  url: './pages/tipe-d/kejaksaan_negeri/pendaftaran_sibojo.html',
  name: 'sibojo',
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
          url: site_url_mobile_layanan + '/pendaftaran_sibojo/get_data/0',
          data: iamthedoor,
          type: 'GET'
        },
        columns: [
          { data: 'id' },
          { data: 'nama_pelanggar' },
          { data: 'no_reg' },
          { data: 'tanggal_sidang' },
          { data: 'barang_bukti' },
          { data: 'tanggal_pengambilan' },
          { data: 'no_wa' },
          { data: 'status_transfer' },
          { data: 'status_transfer' }
        ],
        initComplete: function (settings, json) {
          app.dialog.close();
          $$('#datatables_length').hide();
          $$('#datatables_filter').hide();
        },
        rowCallback: function (row, data) {
          if (data.status == '0') {
            $('td:eq(0)', row).html('<a href="/tipe-d/kejaksaan_negeri/edit_pendaftaran_sibojo/' + data.id + '/edit/" class="button button-small button-fill color-blue">' +
              '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');
          } else {
            $('td:eq(0)', row).html('<a href="/tipe-d/kejaksaan_negeri/edit_pendaftaran_sibojo/' + data.id + '/view/" class="button button-small button-fill color-green">' +
              '<i class="icon f7-icons" style="font-size: 12pt;">zoom_in</i> Lihat</a>');
          }

          if (data.status) {
            var color, status;
            if (data.status == '0') {
              color = '#DE4E42';
              status = 'Belum';
            } else if (data.status == '1') {
              color = '#46A046';
              status = 'Sudah';
            }
            $('td:eq(7)', row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px; color:white;">' + status + '</span>');
          }
          $('td:eq(8)', row).html('<button class="col button button-fill" onclick="cetak_antrian_sibojo(' + data.id + ')"><i class="icon f7-icons color-white">printer_fill</i> Cetak</button>');
        }
      });
      var statusselect = app.smartSelect.create({
        el: '.statusselect',
        on: {
          close: function () {
            app.dialog.preloader('Loading...');
            datatables.context[0].ajax.url = site_url_mobile_layanan + '/pendaftaran_sibojo/get_data/' + $$('#statusselect').val();
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

function cetak_antrian_sibojo(id) {
  app.dialog.preloader('Mohon Tunggu Sebentar...');
  app.request.post(site_url_mobile_layanan + '/pendaftaran_sibojo/print_doc/' + id, iamthedoor, function (doc_path) {
    download_doc(doc_path);
  }, 'json');
}

var new_pendaftaran_sibojo = {
  path: '/tipe-d/new_pendaftaran_sibojo/',
  url: './pages/tipe-d/kejaksaan_negeri/new_pendaftaran_sibojo.html',
  name: 'new_sibojo',
  on: {
    pageInit: function () {
      var calendar_tanggal_sidang = app.calendar.create({
        inputEl: '#tanggal_sidang',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_pengambilan = app.calendar.create({
        inputEl: '#tanggal_pengambilan',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      // default awal agar tidak bisa d ubah kecuali opsi lainnya
      $('#opsi_barang_bukti').prop('readonly', true);

      $('#barang_bukti').on('change', function () {
        if (this.value == 'SIM') {
          $('#opsi_barang_bukti').val('SIM');
          $('#opsi_barang_bukti').prop('readonly', true);
        } else if (this.value == 'STNK') {
          $('#opsi_barang_bukti').val('STNK');
          $('#opsi_barang_bukti').prop('readonly', true);
        } else if (this.value == 'BUKU KIR') {
          $('#opsi_barang_bukti').val('BUKU KIR');
          $('#opsi_barang_bukti').prop('readonly', true);
        } else if (this.value == 'SEPEDA MOTOR') {
          $('#opsi_barang_bukti').val('SEPEDA MOTOR');
          $('#opsi_barang_bukti').prop('readonly', true);
        } else if (this.value == 'Lainnya') {
          $('#opsi_barang_bukti').val('');
          $('#opsi_barang_bukti').prop('readonly', false);
        }
      });
      $$("#tanggal_sidang").val(get_current_date());
      $$("#tanggal_pengambilan").val(get_current_date());

      $$('#nama').val(datauser.nama);
      $$('#tanggal_lahir').val(new Date(datauser.tanggal_lahir).toDateIndoFormat());
      $$('#alamat').val(datauser.alamat);
      $$('#nama').val(datauser.nama);
      $$('#waktu_buat').val(new Date().toDateFormat() + ' ' + new Date().toTimeFormat());

      app.dialog.preloader('Loading...');
      app.dialog.close();

      $$('#simpan').on('click', function () {
        app.input.validateInputs('#new_sibojo');
        if ($$('#new_sibojo')[0].checkValidity() == true) {
          let form_data = app.form.convertToData('#new_sibojo');

          let ajax_data = new Array();
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);

          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/pendaftaran_sibojo/create_pendaftaran_sibojo', ajax_data, function (callback) {
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

var edit_pendaftaran_sibojo = {
  path: '/tipe-d/kejaksaan_negeri/edit_pendaftaran_sibojo/:id/:tipe',
  url: './pages/tipe-d/kejaksaan_negeri/edit_pendaftaran_sibojo.html',
  name: 'edit_pendaftaran_sibojo',
  on: {
    pageInit: function () {
      var id = mainView.router.currentRoute.params.id;
      var tipe = mainView.router.currentRoute.params.tipe;
      var calendar_tanggal_sidang = app.calendar.create({
        inputEl: '#tanggal_sidang',
        closeOnSelect: true,
        dateFormat: 'yyyy-mm-dd',
      });
      var calendar_tanggal_pengambilan = app.calendar.create({
        inputEl: '#tanggal_pengambilan',
        closeOnSelect: true,
        dateFormat: 'yyyy-mm-dd',
      });

      // default awal agar tidak bisa d ubah kecuali opsi lainnya
      $('#opsi_barang_bukti').prop('readonly', true);

      $('#barang_bukti').on('change', function () {
        if (this.value == 'SIM') {
          $('#opsi_barang_bukti').val('SIM');
          $('#opsi_barang_bukti').prop('readonly', true);
        } else if (this.value == 'STNK') {
          $('#opsi_barang_bukti').val('STNK');
          $('#opsi_barang_bukti').prop('readonly', true);
        } else if (this.value == 'BUKU KIR') {
          $('#opsi_barang_bukti').val('BUKU KIR');
          $('#opsi_barang_bukti').prop('readonly', true);
        } else if (this.value == 'SEPEDA MOTOR') {
          $('#opsi_barang_bukti').val('SEPEDA MOTOR');
          $('#opsi_barang_bukti').prop('readonly', true);
        } else if (this.value == 'Lainnya') {
          $('#opsi_barang_bukti').val('');
          $('#opsi_barang_bukti').prop('readonly', false);
        }
      });

      $$('.checked_approval_button').hide();
      if (datauser.role_id == '4' || tipe == 'edit') {
        $$('#approval').hide();
      }

      if (tipe == 'view') {
        $$('#btndeletelayanan').remove();
        $$('.save_button').remove();
        $('#nama_pelanggar').prop('readonly', true);
        $('#no_reg').prop('readonly', true);
        $('#tanggal_sidang').prop('readonly', true);
        $('#barang_bukti').prop('readonly', true);
        $('#tanggal_pengambilan').prop('readonly', true);
        $('#no_wa').prop('readonly', true);
        $('#status_transfer').prop('readonly', true);
      }else if(tipe == 'edit'){
        if(datauser.role_id == 4){
          $('#status_operator').remove()
        }else if(datauser.role_id == 38){
          $$('#btndeletelayanan').remove();
          $('#nama_pelanggar').prop('readonly', true);
          $('#no_reg').prop('readonly', true);
          $('#tanggal_sidang').prop('readonly', true);
          $('#barang_bukti').prop('readonly', true);
          $('#tanggal_pengambilan').prop('readonly', true);
          $('#no_wa').prop('readonly', true);
          $('#status_transfer').prop('readonly', true);
        }
      }

      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/pendaftaran_sibojo/get_id/' + id, iamthedoor, function (callback) {
        app.dialog.close();
        $$('#nama_pelanggar').val(callback.sibojo.nama_pelanggar);
        $$('#no_reg').val(callback.sibojo.no_reg);
        $$('#tanggal_sidang').val(new Date(callback.sibojo.tanggal_sidang).toDateFormat());
        $$('#barang_bukti').val(callback.sibojo.barang_bukti);
        $$('#tanggal_pengambilan').val(new Date(callback.sibojo.tanggal_pengambilan).toDateFormat());
        $$('#no_wa').val(callback.sibojo.no_wa);
        $$('#status_transfer').val(callback.sibojo.status_transfer);
        $$('#status').val(callback.sibojo.status);
        $$('#opsi_barang_bukti').val(callback.sibojo.opsi_barang_bukti);
        if ($$('#status').val() == "0") {
          $$('.item-after').text('Belum')
        } else {
          $$('.item-after').text('Sudah')
        }

        if (callback.sibojo.barang_bukti == 'Lainnya') {
          $('#opsi_barang_bukti').prop('readonly', false);
        }

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

      $$('#deletelayanan').on('click', function () {
        app.dialog.preloader('Loading...');
        app.request.post(site_url_mobile_layanan + '/pendaftaran_sibojo/delete_pendaftaran_sibojo/' + id, iamthedoor, function (callback) {
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
        app.input.validateInputs('#edit_pendaftaran_sibojo');
        if ($$('#edit_pendaftaran_sibojo')[0].checkValidity() == true) {
          if (datauser.role_id == 4 || datauser.role_id == 38) {
            let form_data = app.form.convertToData('#edit_pendaftaran_sibojo');

            let ajax_data = new Array();
            ajax_data.push(iamthedoor);
            ajax_data.push(form_data);

            app.request.post(site_url_mobile_layanan + '/pendaftaran_sibojo/update_pendaftaran_sibojo/' + id, ajax_data, function (callback) {
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
          }
        }
      });
    }
  }
}