var bpjs = {
  path: '/tipe-e/bpjs',
  url: './pages/tipe-e/bpjs/index.html',
  name: 'bpjs',
  on: {
    pageInit: function() {
      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/tipe_e/get_asuransi', iamthedoor, function(data) {
        app.dialog.close();
        var kategori_bpjs = '';
        if (data.status == '00') {
          data.data.forEach(function(item, index) {
            kategori_bpjs += '<option value="' + item.kode + '">' + item.keterangan + '</option>';
          });
        } else {
          kategori_bpjs = '<option value="">Pilih BPJS</option>';
          app.dialog.alert('Terjadi kesalahan sistem.');
        }
        $$('#jenis_bpjs').html(kategori_bpjs);
      }, function() {
        app.dialog.alert('Periksa koneksi internet anda.');
      }, 'json');

      $$('#cek').on('click', function() {
        app.input.validateInputs('#bpjs_form');
        if ($$('#bpjs_form')[0].checkValidity() == true) {
          let ajax_data = new Array();
          let form_data = app.form.convertToData('#bpjs_form');
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);

          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/tipe_e/tagihan_asuransi', ajax_data, function(data) {
            app.dialog.close();
            if (data.status == '00') {
              if (data.nama_pelanggan == '') {
                $$('#tagihan_bpjs_form').hide();
                app.dialog.alert('Maaf ID Pelanggan yang anda cari tidak ditemukan');
              } else {
                let jumlah = parseFloat(data.nominal) + parseFloat(data.admin);
                $$('#tagihan_bpjs_form').show();
                $$('#kode_produk').val(data.kode_produk);
                $$('#id').val(data.id_pelanggan);
                $$('#nama').val(data.nama_pelanggan);
                $$('#periode').val(data.periode);
                $$('#nominal').val('Rp. ' + toIdrFormat(data.nominal));
                $$('#admin').val('Rp. ' + toIdrFormat(data.admin));
                $$('#total_bayar').val('Rp. ' + toIdrFormat(jumlah));
              }
            } else {
              $$('#tagihan_bpjs_form').hide();
              app.dialog.alert(data.message);
            }
          }, function() {
            $$('#tagihan_bpjs_form').hide();
            app.dialog.alert('Periksa koneksi internet anda.');
          }, 'json');
        } else {
          $$('#tagihan_bpjs_form').hide();
          app.dialog.alert('Mohon lengkapi semua form');
        }
      });

      $$('#bayar').on('click', function() {
        let ajax_data = new Array();
        let form_data = app.form.convertToData('#tagihan_bpjs_form');
        ajax_data.push(iamthedoor);
        ajax_data.push(form_data);
        console.log(ajax_data);
      });
    },
  }
};