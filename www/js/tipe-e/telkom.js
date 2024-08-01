var telkom = {
  path: '/tipe-e/telkom',
  url: './pages/tipe-e/telkom/index.html',
  name: 'telkom',
  on: {
    pageInit: function () {
      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/tipe_e/get_operator_telkom', iamthedoor, function (data) {
        app.dialog.close();
        var produk_telkom = '';
        if (data.status == '00') {
          data.data.forEach(function (item, index) {
            produk_telkom += '<option value="' + item.kode + '">' + item.keterangan + '</option>';
          });
          $$('#produk_telkom').html(produk_telkom);
        } else {
          $$('#produk_telkom').html(produk_telkom);
          app.dialog.alert(data.message);
        }
      }, 'json');

      $$('#cek').on('click', function () {
        app.input.validateInputs('#telkom_form');
        if ($$('#telkom_form')[0].checkValidity() == true) {
          let ajax_data = new Array();
          let form_data = app.form.convertToData('#telkom_form');
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);

          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/tipe_e/tagihan_telkom', ajax_data, function (data) {
            app.dialog.close();
            if (data.status == '00') {
              if (data.nama_pelanggan == '') {
                $$('#tagihan_telkom_form').hide();
                app.dialog.alert('Maaf ID Pelanggan yang anda cari tidak ditemukan');
              } else {
                let jumlah = parseFloat(data.nominal) + parseFloat(data.admin);
                $$('#tagihan_telkom_form').show();
                $$('#kode_produk').val(data.kode_produk);
                $$('#id').val(data.id_pelanggan);
                $$('#nama').val(data.nama_pelanggan);
                $$('#periode').val(data.periode);
                $$('#text_nominal').val('Rp. ' + toIdrFormat(data.nominal));
                $$('#text_admin').val('Rp. ' + toIdrFormat(data.admin));
                $$('#total_bayar').val('Rp. ' + toIdrFormat(jumlah));
                $$('#nominal').val(data.nominal);
                $$('#admin').val(data.admin);
              }
            } else {
              $$('#tagihan_telkom_form').hide();
              app.dialog.alert(data.message);
            }
          }, function () {
            $$('#tagihan_telkom_form').hide();
            app.dialog.alert('Periksa koneksi internet anda.');
          }, 'json');
        } else {
          $$('#tagihan_telkom_form').hide();
          app.dialog.alert('Mohon masukkan ID Pelanggan anda');
        }
      });

      $$('#bayar').on('click', function () {
        app.dialog.confirm(
          'Apakah anda yakin ingin membayar tagihan TELKOM dengan ID Pelanggan ' + $$('#id').val() +
          ' atas nama ' + $$('#nama').val() + ' sejumlah ' + $$('#text_nominal').val() + '?',
          function () {
            let ajax_data = new Array();
            let form_data = app.form.convertToData('#tagihan_telkom_form');
            ajax_data.push(iamthedoor);
            ajax_data.push(form_data);

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile_layanan + '/tipe_e/pembayaran_telkom', ajax_data, function (data) {
              app.dialog.close();

              if (data.status == '00') {
                app.dialog.alert(data.message, function () {
                  mainView.router.navigate('/home/', {
                    ignoreCache: true,
                    force: true
                  });
                });
              } else {
                app.dialog.alert(data.message);
              }
            }, function () {
              app.dialog.alert('Periksa koneksi internet anda.');
            }, 'json');
          }
        );
      });
    },
  }
};