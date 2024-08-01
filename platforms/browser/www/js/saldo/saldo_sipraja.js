var saldo_sipraja = {
  path: '/saldo_sipraja/index',
  url: './pages/saldo/index.html',
  name: 'saldo_sipraja',
  on:{
    pageInit: function() {
      
    }
  }
}

var form_isi_saldo = {
  path: '/saldo_sipraja/form_isi_saldo',
  url: './pages/saldo/form.html',
  name: 'form_isi_saldo',
  on:{
    pageInit: function() {
      $$('#lanjutkan').on('click', function() {
        app.input.validateInputs('#isi_saldo_form');
        if ($$('#isi_saldo_form')[0].checkValidity() == true) {
          let form_data = app.form.convertToData('#isi_saldo_form');
          let ajax_data = new Array();
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);

          // app.dialog.preloader('Loading...');
          // app.request.post(site_url_mobile_layanan + '/siprajapay/isi_saldo', ajax_data, function(data) {
          //   app.dialog.close();
          //   console.log(data);
            var data = {
              'id' : 1,
            }
            mainView.router.navigate('/saldo_sipraja/bayar_isi_saldo/' + data.id, {
              ignoreCache: true,
              force: true
            });
          // }, function() {
          //   app.dialog.close();
          //   app.dialog.alert('Terjadi Kesalahan, Mohon Coba Lagi Nanti');
          // }, 'json');
        }
      });
    }
  }
}

var bayar_isi_saldo = {
  path: '/saldo_sipraja/bayar_isi_saldo/:id',
  url: './pages/saldo/bayar.html',
  name: 'bayar_isi_saldo',
  on:{
    pageInit: function() {
      var id = mainView.router.currentRoute.params.id;

      // app.dialog.preloader('Loading...');
      // app.request.post(site_url_mobile_layanan + '/siprajapay/isi_saldo', ajax_data, function(data) {
      //   app.dialog.close();
      //   console.log(data);
        var data = {
          'id' : 1,
          'id_transaksi' : 'SLF73044638',
          'va' : '8558151502903018',
          'nominal' : 200548,
          'tgl_buat' : '09-05-2022 23:52:01.516532',
          'status' : 'Berjalan'
        };

        $$('#rekening').val(data.va);
        $$('#nominal_transfer').val('Rp. ' + toIdrFormat(data.nominal));
        $$('#id_transaksi span').html(data.id_transaksi);
        $$('#tanggal_buat').val(format_date_time_indo(data.tgl_buat));
        $$('#batas_pembayaran p').html('Selesaikan pembayaran sebelum ' + add_two_hours(data.tgl_buat) + ' atau transaksi akan dibatalkan otomatis oleh sistem.');

      //   mainView.router.navigate('/saldo_sipraja/bayar_isi_saldo/' + data.id, {
      //     ignoreCache: true,
      //     reloadCurrent: true
      //   });
      // }, function() {
      //   app.dialog.close();
      //   app.dialog.alert('Terjadi Kesalahan, Mohon Coba Lagi Nanti');
      // }, 'json');
    }
  }
}

function add_two_hours(date) {
  var dt = new Date(date);
  dt.setHours(dt.getHours() + 2);

  return format_date_time_indo(dt);
}

function format_date_time_indo(date) {
  var dt = new Date(date);
  let day = padFloor(dt.getDate());
  let month = padFloor(dt.getMonth() + 1);
  let year = padFloor(dt.getFullYear());

  let hour = padFloor(dt.getHours());
  let minute = padFloor(dt.getMinutes());
  let second = padFloor(dt.getSeconds());

  return day + '-' + month + '-' + year + ' ' + hour + ':' + minute + ':' + second;
}