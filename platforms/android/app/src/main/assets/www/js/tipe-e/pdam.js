var pdam = {
  path: '/tipe-e/pdam/:id',
  url: './pages/tipe-e/pdam/index.html',
  name: 'pdam',
  on: {
    pageInit: function() {
      var id_pelanggan = mainView.router.currentRoute.params.id;

      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/tipe_e/get_wilayah_pdam', iamthedoor, function(data) {
        app.dialog.close();
        var wilayah = '';
        data.data.forEach(function(item, index) {
          wilayah += '<option value="' + item.nama + '">' + item.nama + '</option>';
        })
        $$('#wilayah').html(wilayah);
        $$('#wilayah').val('JAWA TIMUR');

        let ajax_data = new Array();
        ajax_data.push(iamthedoor);
        ajax_data.push($$('#wilayah').val());
        app.request.post(site_url_mobile_layanan + '/tipe_e/get_daerah_pdam', ajax_data, function(result) {
          var daerah = '';
          if (result.status != '00') {
            daerah = '<option value="">' + result.message + '</option>';
          } else {
            result.data.forEach(function(item, index) {
              daerah += '<option value="' + item.kode + '">' + item.keterangan + '</option>';
            })
          }
          $$('#daerah').html(daerah);
          $$('#daerah').val('WASDA');

          if (id_pelanggan != 0) {
            $$('#id_tagihan').val(id_pelanggan);

            app.input.validateInputs('#pdam_form');
            if ($$('#pdam_form')[0].checkValidity() == true) {
              let ajax_data = new Array();
              let form_data = app.form.convertToData('#pdam_form');
              ajax_data.push(iamthedoor);
              ajax_data.push(form_data);

              app.dialog.preloader('Loading...');
              app.request.post(site_url_mobile_layanan + '/tipe_e/tagihan_pdam', ajax_data, function(response) {
                app.dialog.close();
                if (response.status == '00') {
                  if (response.nama_pelanggan == '') {
                    $$('#tagihan_pdam_form').hide();
                    app.dialog.alert('Maaf ID Pelanggan yang anda cari tidak ditemukan');
                  } else {
                    let jumlah = parseFloat(response.nominal) + parseFloat(response.admin);
                    $$('#tagihan_pdam_form').show();
                    $$('#kode_produk').val(response.kode_produk);
                    $$('#id').val(response.id_pelanggan);
                    $$('#nama').val(response.nama_pelanggan);
                    $$('#periode').val(response.periode);
                    $$('#nominal').val('Rp. ' + toIdrFormat(response.nominal));
                    $$('#admin').val('Rp. ' + toIdrFormat(response.admin));
                    $$('#total_bayar').val('Rp. ' + toIdrFormat(jumlah));
                  }
                } else {
                  $$('#tagihan_pdam_form').hide();
                  app.dialog.alert(response.message);
                }
              }, function() {
                $$('#tagihan_pdam_form').hide();
                app.dialog.alert('Periksa koneksi internet anda.');
              }, 'json');
            } else {
              $$('#tagihan_pdam_form').hide();
              app.dialog.alert('Mohon masukkan ID Pelanggan anda');
            }
          }
        }, function() {
          app.dialog.alert('Periksa koneksi internet anda.');
        }, 'json');
      }, function() {
        app.dialog.alert('Periksa koneksi internet anda.');
      }, 'json');

      $$('#wilayah').on('change', function() {
        let ajax_data = new Array();
        ajax_data.push(iamthedoor);
        ajax_data.push($$('#wilayah').val());
        app.dialog.preloader('Loading...');
        app.request.post(site_url_mobile_layanan + '/tipe_e/get_daerah_pdam', ajax_data, function(result) {
          app.dialog.close();
          var daerah = '';
          if (result.status != '00') {
            daerah = '<option value="">' + result.message + '</option>';
          } else {
            result.data.forEach(function(item, index) {
              daerah += '<option value="' + item.kode + '">' + item.keterangan + '</option>';
            })
          }
          $$('#daerah').html(daerah);
        }, function() {
          app.dialog.alert('Periksa koneksi internet anda.');
        }, 'json');
      });

      $$('#cek').on('click', function() {
        app.input.validateInputs('#pdam_form');
        if ($$('#pdam_form')[0].checkValidity() == true) {
          let ajax_data = new Array();
          let form_data = app.form.convertToData('#pdam_form');
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);

          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/tipe_e/tagihan_pdam', ajax_data, function(data) {
            app.dialog.close();
            if (data.status == '00') {
              if (data.nama_pelanggan == '') {
                $$('#tagihan_pdam_form').hide();
                app.dialog.alert('Maaf ID Pelanggan yang anda cari tidak ditemukan');
              } else {
                let jumlah = parseFloat(data.nominal) + parseFloat(data.admin);
                $$('#tagihan_pdam_form').show();
                $$('#kode_produk').val(data.kode_produk);
                $$('#id').val(data.id_pelanggan);
                $$('#nama').val(data.nama_pelanggan);
                $$('#periode').val(data.periode);
                $$('#nominal').val('Rp. ' + toIdrFormat(data.nominal));
                $$('#admin').val('Rp. ' + toIdrFormat(data.admin));
                $$('#total_bayar').val('Rp. ' + toIdrFormat(jumlah));
              }
            } else {
              $$('#tagihan_pdam_form').hide();
              app.dialog.alert(data.message);
            }
          }, function() {
            $$('#tagihan_pdam_form').hide();
            app.dialog.alert('Periksa koneksi internet anda.');
          }, 'json');
        } else {
          $$('#tagihan_pdam_form').hide();
          app.dialog.alert('Mohon masukkan ID Pelanggan anda');
        }
      });

      $$('#bayar').on('click', function() {
        let ajax_data = new Array();
        let form_data = app.form.convertToData('#tagihan_pdam_form');
        ajax_data.push(iamthedoor);
        ajax_data.push(form_data);
        console.log(ajax_data);
      });
    },
  }
};