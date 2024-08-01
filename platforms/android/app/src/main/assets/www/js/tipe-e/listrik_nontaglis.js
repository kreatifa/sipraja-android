var listrik_nontaglis = {
  path: '/tipe-e/listrik_nontaglis',
  url: './pages/tipe-e/listrik_nontaglis/index.html',
  name: 'listrik_nontaglis',
  on: {
    pageInit: function() {
      $$('#cek').on('click', function() {
        app.input.validateInputs('#listrik_non_taglis_form');
        if ($$('#listrik_non_taglis_form')[0].checkValidity() == true) {
          let ajax_data = new Array();
          let form_data = app.form.convertToData('#listrik_non_taglis_form');
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);

          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/tipe_e/tagihan_pln_non_taglis', ajax_data, function(data) {
            app.dialog.close();
            if (data.status == '00') {
              if (data.nama_pelanggan == '') {
                $$('#tagihan_non_taglis_form').hide();
                app.dialog.alert('Maaf ID Pelanggan yang anda cari tidak ditemukan');
              } else {
                let jumlah = parseFloat(data.nominal) + parseFloat(data.admin);
                $$('#tagihan_non_taglis_form').show();
                $$('#id').val(data.id_pelanggan);
                $$('#nama').val(data.nama_pelanggan);
                $$('#periode').val(data.periode);
                $$('#nominal').val('Rp. ' + toIdrFormat(data.nominal));
                $$('#admin').val('Rp. ' + toIdrFormat(data.admin));
                $$('#total_bayar').val('Rp. ' + toIdrFormat(jumlah));
              }
            } else {
              $$('#tagihan_non_taglis_form').hide();
              app.dialog.alert(data.message);
            }
          }, function() {
            $$('#tagihan_non_taglis_form').hide();
            app.dialog.alert('Periksa koneksi internet anda.');
          }, 'json');
        } else {
          $$('#tagihan_non_taglis_form').hide();
          app.dialog.alert('Mohon masukkan ID Pelanggan anda');
        }
      });

      $$('#bayar').on('click', function() {
        let ajax_data = new Array();
        let form_data = app.form.convertToData('#tagihan_non_taglis_form');
        ajax_data.push(iamthedoor);
        ajax_data.push(form_data);
        console.log(ajax_data);
      });
    },
  }
};