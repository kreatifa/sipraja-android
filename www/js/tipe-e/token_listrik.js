// var data_token_listrik = {
//   "status": "00",
//   "message": "SUKSES",
//   "data": [
//     { "kode": "01", "nominal": "20000", "ket": "TOKEN PLN PRABAYAR 20000" },
//     { "kode": "02", "nominal": "50000", "ket": "TOKEN PLN PRABAYAR 50000" },
//     { "kode": "03", "nominal": "100000", "ket": "TOKEN PLN PRABAYAR 100000" },
//     { "kode": "04", "nominal": "200000", "ket": "TOKEN PLN PRABAYAR 200000" },
//     { "kode": "05", "nominal": "500000", "ket": "TOKEN PLN PRABAYAR 500000" },
//     { "kode": "06", "nominal": "1000000", "ket": "TOKEN PLN PRABAYAR 1000000" }
//   ]
// }

var token_listrik = {
  path: '/tipe-e/token_listrik',
  url: './pages/tipe-e/token_listrik/index.html',
  name: 'token_listrik',
  on: {
    pageInit: function () {
      var print = '';
      app.dialog.preloader('Loading');
      // get list produk token listrik
      app.request.post(site_url_mobile_layanan + '/tipe_e/get_produk_token_listrik', iamthedoor, function (data_token_listrik) {
        if (data_token_listrik?.status == '00') {
          data_token_listrik.data.forEach(function (item, index) {
            print += '<div class="card grey-border" id="list-product-' + index + '">' +
              '<div class="card-content card-content-padding list-product" id="list-product" data-index="' + index + '" style="position: relative;">' +
              '<div class="product-name text-color-blue" id="product-name-' + index + '">' + item.ket + '</div>' +
              '<div class="product-price">' +
              '<span>Harga :</span>' +
              '<div class="text-color-blue" id="product-price-' + index + '">Rp. ' + toIdrFormat(item.nominal) + '</div>' +
              '<div id="product-kode-' + index + '" style="display: none;">' + item.kode + '</div>' +
              '<div id="product-nominal-' + index + '" style="display: none;">' + item.nominal + '</div>' +
              '</div>' +
              '</div>' +
              '</div>';
          });
          $$('#list_data').html(print);
          app.dialog.close();
        } else {
          app.dialog.close();
          app.dialog.alert(data_token_listrik?.message || "Terjadi kesalahan");
        }

        $('div[id^=list-product]').each(function () {
          var index = $(this).data("index");
          $$('#list-product-' + index).on('click', function () {
            var no_tagihan = $$('#no_tagihan').val();
            var nama_produk = $$('#product-name-' + index).text();
            var harga = $$('#product-nominal-' + index).text();
            var kode_produk = $$('#product-kode-' + index).text();

            if (no_tagihan.length <= 5) {
              app.dialog.alert('Nomor listrik yang anda masukkan salah. Mohon periksa ulang.');
              return false;
            }

            app.dialog.confirm(
              'Apakah anda yakin ingin membeli ' + nama_produk + ' dengan Nomor Listrik ' + no_tagihan + '?',
              function () {
                // Proses pembelian
                let ajax_data = new Array();
                ajax_data.push(iamthedoor);
                ajax_data.push({
                  'id_pelanggan': no_tagihan,
                  'kode': kode_produk,
                  'nominal': harga,
                  'admin': '00',
                  'nama': nama_produk
                });

                app.dialog.preloader('Loading...');
                app.request.post(site_url_mobile_layanan + '/tipe_e/pembayaran_token_listrik', ajax_data, function (data) {
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
          })
        });
      }, 'json');
    },
  }
};