var pembukaan_rekening_tabungan = {
  path: '/tipe-d/pembukaan_rekening_tabungan/',
  url: './pages/tipe-d/bpr_delta_artha/pembukaan_rekening_tabungan.html',
  name: 'pembukaan_rekening_tabungan',
  on: {
    pageInit: function () {
      $$('#btnnew').hide();
      if (datauser.role_id == '4') {
        let ajax_data = new Array();
        ajax_data.push(iamthedoor);
        var cek_data = app.request.post(site_url_mobile_layanan + '/pembukaan_rekening_tabungan/cek_data', ajax_data, function (data) {
          if (data > 1) {
            $$('#btnnew').hide();
          } else {
            $$('#btnnew').show();
          }
        }, 'json');
      }

      app.dialog.preloader('Loading...');
      var datatables = $('#datatables').DataTable({
        serverSide: true,
        ajax: {
          "url": site_url_mobile_layanan + '/pembukaan_rekening_tabungan/get_data/' + $$('#statusselect').val(),
          "data": iamthedoor,
          "type": "GET"
        },
        columns: [
          { "data": "id" },
          { "data": "nik" },
          { "data": 'nama_lengkap' },
          { "data": 'no_telpon' },
          { "data": 'email' },
          { "data": 'nama_produk' },
          { "data": 'status' }
        ],
        initComplete: function (settings, json) {
          app.dialog.close();
          $$('#datatables_length').hide();
          $$('#datatables_filter').hide();
        },
        rowCallback: function (row, data) {
          $('td:eq(0)', row).html('<a href="/tipe-d/edit_pembukaan_rekening_tabungan/' + data.id + '/edit/" class="button button-small button-fill color-blue">' +
            '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> View</a>');

          var color = '#DE4E42';
          if (data.status) {
            if (data.status == 0) {
              color = '#FF9800';
              val_status = 'Menunggu'
            } else if (data.status == 1) {
              color = '#17A05E';
              val_status = 'Terverifikasi'
            }
            $('td:eq(6)', row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px; color:white;">' + val_status + '</span>');
          }
        }
      });

      var statusselect = app.smartSelect.create({
        el: '.statusselect',
        on: {
          close: function () {
            app.dialog.preloader('Loading...');
            datatables.context[0].ajax.url = site_url_mobile_layanan + '/pembukaan_rekening_tabungan/get_data/' + $$('#statusselect').val();
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

var new_pembukaan_rekening_tabungan = {
  path: '/tipe-d/new_pembukaan_rekening_tabungan/',
  url: './pages/tipe-d/bpr_delta_artha/new_pembukaan_rekening_tabungan.html',
  name: 'new_pembukaan_rekening_tabungan',
  on: {
    pageInit: function () {
      $$('#nik_pemohon').val(datauser.nik);
      $$('#nama_pemohon').val(datauser.nama);
      $$('#tempat_lahir').val(datauser.tempat_lahir);
      $$('#tanggal_lahir').val(new Date(datauser.tanggal_lahir).toDateIndoFormat());
      $$('#jenis_kelamin').val(datauser.jenis_kelamin);
      $$('#telepon').val(datauser.no_telp_pendaftar);
      $$('#email').val(datauser.email);
      $$('#alamat').val(datauser.alamat);
      $$('#id_kec').val(datauser.kecamatan);
      $$('#id_kel').val(datauser.kode_desa);

      $$('#provinsi').prop("disabled", true);
      $$('#kota').prop("disabled", true);
      $$('#kecamatan').prop("disabled", true);
      $$('#kelurahan').prop("disabled", true);

      get_kode_produk('#kode_produk');

      get_provinsi_new('#provinsi');
      $$('#provinsi').on('change', function () {
        get_kabupaten_new($$('#provinsi').val(), '#kota');
      });
      $$('#kota').on('change', function () {
        get_kecamatan_new($$('#kota').val(), '#kecamatan');
      });
      $$('#kecamatan').on('change', function () {
        get_kelurahan_new($$('#kecamatan').val(), '#kelurahan');
      });

      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/pembukaan_rekening_tabungan/get_list_lampiran', iamthedoor, function (data) {
        app.dialog.close();

        get_berkas(data);
      }, function () {
        app.dialog.close();
        app.dialog.alert('Gagal Mendapatkan Data Anda, Mohon Coba Lagi Nanti');
      }, 'json');

      $$('#simpan').on('click', function () {
        app.input.validateInputs('#new_pembukaan_rekening_tabungan');
        // if ($$('#new_pembukaan_rekening_tabungan')[0].checkValidity() == true) {

        let form_data = app.form.convertToData('#new_pembukaan_rekening_tabungan');
        let filecode = new Array();
        $('.filecode').each((i, el) => filecode.push(el.value));
        let filedesc = new Array();
        $('.filedesc').each((i, el) => filedesc.push(el.value));

        let ajax_data = new Array();
        ajax_data.push(iamthedoor);
        ajax_data.push(form_data);
        ajax_data.push(filecode);
        ajax_data.push(filedesc);

        app.request.post(site_url_mobile_layanan + '/pembukaan_rekening_tabungan/save_pembukaan_rekening_tabungan', ajax_data, function (data) {

          if (data.status == '00') {
            app.dialog.alert('Penyimpanan Berhasil');
          } else if (data.status == '01') {
            app.dialog.alert('Gagal, silakan coba lagi nanti');
          } else if (data.status == '02') {
            app.dialog.alert('Pending, silakan coba lagi nanti');
          } else if (data.status == '03') {
            app.dialog.alert('Tidak dapat ditemukan, silakan coba lagi nanti');
          } else {
            app.dialog.alert('Error, silakan coba lagi nanti');
          }

          mainView.router.back();
          $('#datatables').DataTable().ajax.reload();

        }, function () {
          app.dialog.alert('Penyimpanan Gagal, Coba lagi di lain waktu');
        }, 'json');
        // }
      });
    }
  }
};

var edit_pembukaan_rekening_tabungan = {
  path: '/tipe-d/edit_pembukaan_rekening_tabungan/:id/:tipe',
  url: './pages/tipe-d/bpr_delta_artha/edit_pembukaan_rekening_tabungan.html',
  name: 'edit_pembukaan_rekening_tabungan',
  on: {
    pageInit: function () {
      var id = mainView.router.currentRoute.params.id;
      var tipe = mainView.router.currentRoute.params.tipe;

      $$('.checked_approval_button').hide();
      if (tipe == 'edit') {
        $$('#approval').hide();
      }

      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/pembukaan_rekening_tabungan/find_layanan/' + id, iamthedoor, function (callback) {
        app.dialog.close();

        $$('#nik_pemohon').val(callback.layanan.nik);
        $$('#nama_pemohon').val(callback.layanan.nama_lengkap);
        $$('#telepon').val(callback.layanan.no_telpon);
        $$('#email').val(callback.layanan.email);
        $$('#alamat').val(callback.layanan.alamat);

        get_kode_produk('#kode_produk', callback.layanan.kode_produk);

        get_provinsi_new('#provinsi', callback.layanan.provinsi);
        $$('#provinsi').on('change', function () {
          get_kabupaten_new($$('#provinsi').val(), '#kota', callback.layanan.kota);
        });
        $$('#kota').on('change', function () {
          get_kecamatan_new($$('#kota').val(), '#kecamatan', callback.layanan.kecamatan);
        });
        $$('#kecamatan').on('change', function () {
          get_kelurahan_new($$('#kecamatan').val(), '#kelurahan', callback.layanan.kelurahan);
        });

        get_berkas(callback.deskripsi_dokumen, callback.attachments);

      }, function () {
        app.dialog.close();
        app.dialog.alert('Gagal Mendapatkan Data Anda, Mohon Coba Lagi Nanti');
      }, 'json');
    }
  }
}