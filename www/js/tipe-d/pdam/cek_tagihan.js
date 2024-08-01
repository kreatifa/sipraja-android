var tagihan_pdam = {
  path: '/tipe-d/pdam/cek_tagihan/:nomor',
  url: './pages/tipe-d/pdam/cek_tagihan.html',
  name: 'cek_tagihan_pdam',
  on: {
    pageInit: function () {
      let nomor = mainView.router.currentRoute.params.nomor;
      
      if(nomor != '000'){
        nomor = atob(nomor);
        $('#id').val(nomor);
        $$('#cek').click();
        setTimeout(function () {
          $('#cek').trigger('click');
        }, 100);
      }

      $$('#cek').on('click', function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.input.validateInputs('#cek_tagihan_pdam_form');
        if ($$('#cek_tagihan_pdam_form')[0].checkValidity() == true) {
          let ajax_data = new Array();
          let form_data = app.form.convertToData('#cek_tagihan_pdam_form');
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);
          app.request.post(site_url_mobile_layanan + '/pdam/cek_tagihan', ajax_data, function (data) {
            if (data.status == 0) {
              app.dialog.close();
              $$('#card_tagihan').show();
              $$('#nama').val(data.rows.nama);
              $$('#nominal').val(toIdrFormat(data.rows.nominal));
              $$('#alamat').val(data.rows.alamat);
              // $$('#bayar').prop('href', '/tipe-e/pdam/' + $$('#id').val());
            } else {
              app.dialog.close();
              $$('#card_tagihan').hide();
              app.dialog.alert(data.msg);
            }
          }, function () {
            app.dialog.close();
            $$('#card_tagihan').hide();
            app.dialog.alert('Periksa koneksi internet anda.');
          }, 'json');
        } else {
          app.dialog.close();
          $$('#card_tagihan').hide();
          app.dialog.alert('Mohon masukkan ID Pelanggan PDAM anda');
        }
      });

      $$('#bayar').on('click', function () {
        mainView.router.navigate('/tipe-e/pdam/' + $$('#id').val(), {
          ignoreCache: true,
          reloadCurrent: true
        });
      });
    }
  }
}