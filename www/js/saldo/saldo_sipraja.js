var saldo_sipraja = {
  path: '/saldo_sipraja/index',
  url: './pages/saldo/index.html',
  name: 'saldo_sipraja',
  on: {
    pageInit: function () {
      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/saldo/riwayat_transaksi', iamthedoor, function (result) {
        app.dialog.close();
        var print = '';
        if (result.length > 0) {
          result.forEach(function (item, index) {
            if (item.status == '3') {
              var status = 'Sukses';
              var color = 'text-color-green';
              var link = '/saldo_sipraja/detail_transaksi/' + item.id + ((item.transaksi == 'Top up') ? '/top_up' : '/pembayaran');
            } else if (item.status == '2') {
              var status = 'Dibatalkan';
              var color = 'text-color-red';
              var link = '/saldo_sipraja/detail_transaksi/' + item.id + ((item.transaksi == 'Top up') ? '/top_up' : '/pembayaran');
            } else {
              var status = 'Sedang Berjalan';
              var color = '';
              var link = '/saldo_sipraja/bayar_isi_saldo/' + item.id;
            };

            if (item.transaksi == 'Top up') {
              var subtitle = 'Dari Transfer Bank';
              var plus_minus = '+';
              var icon = '<img src="images/tipe_e/wallet_plus.png" width="28">';
            } else if (item.transaksi == 'Transaksi') {
              var subtitle = item.kategori_transaksi + ' ' + item.jenis_transaksi;
              var plus_minus = '-';
              var icon = '<img src="images/tipe_e/shopping_bag.svg" width="36">';
            }

            var jumlah = toIdrFormat(parseFloat(item.nominal) + ((item.admin != '' || item.admin != null) ? parseFloat(item.admin) : 0));
            print += '<li class="card">' +
              '<a href="' + link + '" class="card-content item-link item-content">' +
              '<div class="item-media">' +
              icon +
              '</div>' +
              '<div class="item-inner">' +
              '<div class="item-title-row" style="background-image: none;">' +
              '<div class="item-title">' + item.transaksi + '</div>' +
              '<div class="item-after ' + color + '">' + status + '</div>' +
              '</div>' +
              '<div class="item-title-row">' +
              '<div class="item-subtitle">' + subtitle + '</div>' +
              '<div class="item-after">' + plus_minus + ' Rp. ' + jumlah + '</div>' +
              '</div>' +
              '<div class="item-text">' + format_date_time_indo(item.tgl_buat) + '</div>' +
              '</div>' +
              '</a>' +
              '</li>';
          });
        } else {
          print = '';
        }
        $$('#list_transaksi').html(print);
      }, function () {
        app.dialog.close();
        app.dialog.alert('Terjadi Kesalahan, Mohon Coba Lagi Nanti');
      }, 'json');
    }
  }
}

var form_isi_saldo = {
  path: '/saldo_sipraja/form_isi_saldo',
  url: './pages/saldo/form.html',
  name: 'form_isi_saldo',
  on: {
    pageInit: function () {
      $$('#lanjutkan').on('click', function () {
        app.input.validateInputs('#isi_saldo_form');
        if ($$('#isi_saldo_form')[0].checkValidity() == true) {
          let form_data = app.form.convertToData('#isi_saldo_form');
          let ajax_data = new Array();
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);

          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/saldo/isi_saldo', ajax_data, function (data) {
            app.dialog.close();

            mainView.router.navigate('/saldo_sipraja/bayar_isi_saldo/' + data, {
              ignoreCache: true,
              force: true
            });
          }, function () {
            app.dialog.close();
            app.dialog.alert('Terjadi Kesalahan, Mohon Coba Lagi Nanti');
          }, 'json');
        }
      });
    }
  }
}

var bayar_isi_saldo = {
  path: '/saldo_sipraja/bayar_isi_saldo/:id',
  url: './pages/saldo/bayar.html',
  name: 'bayar_isi_saldo',
  on: {
    pageInit: function () {
      var id = mainView.router.currentRoute.params.id;

      let ajax_data = new Array();
      ajax_data.push(iamthedoor);
      ajax_data.push(id);

      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/saldo/cek_transaksi', ajax_data, function (result) {
        app.dialog.close();
        if (result.status == '00') {
          var data = result.data;

          $$('#rekening').val(data.va);
          $$('#nominal_transfer').val('Rp. ' + toIdrFormat(parseFloat(data.nominal) + parseFloat(data.unix_nominal)));
          $$('#id_transaksi span').html(data.id_transaksi);
          $$('#tanggal_buat').val(format_date_time_indo(data.tgl_buat));
          $$('#batas_pembayaran p').html('Selesaikan pembayaran sebelum ' + add_two_hours(data.tgl_buat) + ' atau transaksi akan dibatalkan otomatis oleh sistem.');
        } else {
          app.dialog.alert(result.message, function () {
            mainView.router.navigate('/saldo_sipraja/index', {
              ignoreCache: true,
              force: true
            });
          });
        }
      }, function () {
        app.dialog.close();
        app.dialog.alert('Terjadi Kesalahan, Mohon Coba Lagi Nanti');
      }, 'json');
    }
  }
}

var detail_transaksi_saldo = {
  path: '/saldo_sipraja/detail_transaksi/:id/:method',
  url: './pages/saldo/detail.html',
  name: 'detail_transaksi_saldo',
  on: {
    pageInit: function () {
      var id = mainView.router.currentRoute.params.id;
      var method = mainView.router.currentRoute.params.method;
      var link_request = '';

      if (method == 'top_up') {
        link_request = '/saldo/detail_transaksi_pemasukan/' + id;
        $$('#form_pembelian').show();
      } else if (method == 'pembayaran') {
        link_request = '/saldo/detail_transaksi_pengeluaran/' + id;
        $$('#jenis_transaksi').show();
        $$('#telp').show();
        $$('#nama_produk').show();
      }

      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + link_request, iamthedoor, function (result) {
        app.dialog.close();
        if (result.status == '00') {
          let jumlah = toIdrFormat(parseFloat(result.data.nominal) + parseFloat(result.data.admin));
          $$('#nominal span').text(jumlah);
          $$('#tgl_buat span').text(format_date_time_indo(result.data.tgl_buat));
          $$('#no_transaksi').val(result.data.id_transaksi);
          $$('#no_referensi').val(result.data.referensi);
          $$('#metode_pembayaran').val(result.data.metode_pembayaran);
          $$('#ket_jenis_transaksi').val(result.data.kategori_transaksi + ' ' + result.data.jenis_transaksi);

          $$('#form_pembayaran #no_transaksi').val(result.data.id_transaksi);
          $$('#form_pembayaran #no_referensi').val(result.data.referensi);
          $$('#form_pembayaran #ket_jenis_transaksi').val(result.data.kategori_transaksi + ' ' + result.data.jenis_transaksi);
          $$('#form_pembayaran #id_pelanggan').val(result.data.id_pelanggan);
          $$('#form_pembayaran #nama_pelanggan').val(result.data.nama_pelanggan);
          $$('#form_pembayaran #periode').val(result.data.periode);
          $$('#form_pembayaran #nominal').val('Rp. ' + toIdrFormat(result.data.nominal));
          $$('#form_pembayaran #biaya_admin').val('Rp. ' + toIdrFormat(result.data.admin));
          $$('#form_pembayaran #metode_pembayaran').val(result.data.metode_pembayaran);

          if (result.data.kategori_transaksi == 'Pembelian') {
            $$('#form_pembelian').show();
          } else if (result.data.kategori_transaksi == 'Pembayaran') {
            $$('#form_pembayaran').show();
          }

          if (method == 'pembayaran') {
            $$('#ket_telp').val(result.data.id_pelanggan);
            $$('#ket_nama_produk').val(result.data.nama_produk);
          }

          if (result.data.jenis_transaksi == 'TOKEN LISTRIK') {
            $$('#kode_token_listrik').show();
            $$('#ket_kode_token_listrik').val(result.data.token_listrik);
          }

          if (result.data.status == '3') {
            $$('#status_transaksi').html('<i class="icon f7-icons size-10">checkmark_shield_fill</i> Berhasil');
            $$('#status_transaksi').addClass('text-color-green');
          } else if (result.data.status == '2') {
            $$('#status_transaksi').html('<i class="icon f7-icons size-10">exclamationmark_shield_fill</i> Dibatalkan');
            $$('#status_transaksi').addClass('text-color-red');
          } else {
            $$('#status_transaksi').html('Sedang Berjalan');
          }

        } else {
          app.dialog.alert(result.message, function () {
            mainView.router.navigate('/saldo_sipraja/index', {
              ignoreCache: true,
              force: true
            });
          });
        }
      }, function () {
        app.dialog.alert('Terjadi Kesalahan, Mohon Coba Lagi Nanti');
      }, 'json');
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