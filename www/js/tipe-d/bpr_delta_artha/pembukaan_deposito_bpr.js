var pembukaan_deposito_bpr = {
  path: '/tipe-d/pembukaan_deposito_bpr/',
  url: './pages/tipe-d/bpr_delta_artha/pembukaan_deposito_bpr.html',
  name: 'pembukaan_deposito_bpr',
  on: {
    pageInit: function () {
      $$('#btnnew').hide();
      if (datauser.role_id == '4') {
        let ajax_data = new Array();
        ajax_data.push(iamthedoor);
        $$('#btnnew').show();
      }

      app.dialog.preloader('Loading...');
      var datatables = $('#datatables').DataTable({
        serverSide: true,
        ajax: {
          "url": site_url_mobile_layanan + '/pembukaan_deposito_bpr/get_data/' + $$('#statusselect').val(),
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
          $('td:eq(0)', row).html('<a href="/tipe-d/pembukaan_deposito_bpr_edit/' + data.id + '/edit/" class="button button-small button-fill color-blue">' +
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
            datatables.context[0].ajax.url = site_url_mobile_layanan + '/pembukaan_deposito_bpr/get_data/' + $$('#statusselect').val();
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

var pembukaan_deposito_bpr_new = {
  path: '/tipe-d/pembukaan_deposito_bpr_new/',
  url: './pages/tipe-d/bpr_delta_artha/pembukaan_deposito_bpr_new.html',
  name: 'pembukaan_deposito_bpr_new',
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

      get_kode_deposito('#kode_produk');

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
      app.request.post(site_url_mobile_layanan + '/pembukaan_deposito_bpr/get_list_lampiran', iamthedoor, function (data) {
        app.dialog.close();

        get_berkas(data);
      }, function () {
        app.dialog.close();
        app.dialog.alert('Gagal Mendapatkan Data Anda, Mohon Coba Lagi Nanti');
      }, 'json');

      $$('#simpan').on('click', function () {
        app.input.validateInputs('#pembukaan_deposito_bpr_new');
        // if ($$('#pembukaan_deposito_bpr_new')[0].checkValidity() == true) {

        let form_data = app.form.convertToData('#pembukaan_deposito_bpr_new');
        let filecode = new Array();
        $('.filecode').each((i, el) => filecode.push(el.value));
        let filedesc = new Array();
        $('.filedesc').each((i, el) => filedesc.push(el.value));

        let ajax_data = new Array();
        ajax_data.push(iamthedoor);
        ajax_data.push(form_data);
        ajax_data.push(filecode);
        ajax_data.push(filedesc);

        app.request.post(site_url_mobile_layanan + '/pembukaan_deposito_bpr/cek_data', ajax_data, function (cek) {
          if (cek.count > 0) {
            app.dialog.alert('Anda telah memiliki produk deposito yang sama. Silakan mengajukan produk yang lain');
          } else {
            app.request.post(site_url_mobile_layanan + '/pembukaan_deposito_bpr/save_pembukaan_deposito_bpr', ajax_data, function (data) {
              if (data) {
                app.dialog.alert('Penyimpanan Berhasil');
                mainView.router.back();
                $('#datatables').DataTable().ajax.reload();
              }
            });
          }
        }, function () {
          app.dialog.alert('Penyimpanan Gagal, Coba lagi di lain waktu');
        }, 'json');
        // }
      });
    }
  }
};

var pembukaan_deposito_bpr_edit = {
  path: '/tipe-d/pembukaan_deposito_bpr_edit/:id/:tipe',
  url: './pages/tipe-d/bpr_delta_artha/pembukaan_deposito_bpr_edit.html',
  name: 'pembukaan_deposito_bpr_edit',
  on: {
    pageInit: function () {
      var id = mainView.router.currentRoute.params.id;
      var tipe = mainView.router.currentRoute.params.tipe;

      $$('.checked_approval_button').hide();
      if (tipe == 'edit') {
        $$('#approval').hide();
      }

      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/pembukaan_deposito_bpr/find_layanan/' + id, iamthedoor, function (callback) {
        app.dialog.close();

        $$('#nik_pemohon').val(callback.layanan.nik);
        $$('#nama_pemohon').val(callback.layanan.nama_lengkap);
        $$('#telepon').val(callback.layanan.no_telpon);
        $$('#email').val(callback.layanan.email);
        $$('#alamat').val(callback.layanan.alamat);

        $$('#kode_produk').prop('disabled', true);
        get_kode_deposito('#kode_produk', callback.layanan.kode_produk);

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