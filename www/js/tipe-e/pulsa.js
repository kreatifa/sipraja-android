// var data_pulsa = {
//     "status": "00",
//     "message": "SUKSES",
//     "data": [
//         { "kode": "I5H", "keterangan": "ISAT IM3 / MENTARI REGULER 5RB", "harga": "5925", "admin": "0", "status": "AKTIF" },
//         { "kode": "I10H", "keterangan": "ISAT IM3 / MENTARI REGULER 10RB", "harga": "11000", "admin": "0", "status": "AKTIF" },
//         { "kode": "I12H", "keterangan": "ISAT IM3 / MENTARI REGULER 12RB", "harga": "11967", "admin": "0", "status": "AKTIF" }
//     ]
// };

var pulsa = {
  path: '/tipe-e/pulsa',
  url: './pages/tipe-e/pulsa/index.html',
  name: 'pulsa',
  on: {
    pageInit: function () {
      var prefix = '';

      $$('#telp').on('input', function () {
        if ($$('#telp').val().length >= 4) {
          if ($$('#telp').val().slice(0, 4) != prefix) {
            prefix = $$('#telp').val().slice(0, 4);

            // preses cek prefix nomor HP dan request list data produk dari server
            let ajax_data = new Array();
            ajax_data.push(iamthedoor);
            ajax_data.push(prefix);

            app.request.post(site_url_mobile_layanan + '/tipe_e/get_produk_pulsa', ajax_data, function (data_pulsa) {
              var print = '';
              if (data_pulsa.status == '00') {
                if (data_pulsa.kartu == 'ISAT') {
                  $$('#img-profider').prop('src', 'images/tipe_e/ISAT.png');
                } else if (data_pulsa.kartu == 'KARTU3') {
                  $$('#img-profider').prop('src', 'images/tipe_e/KARTU3.png');
                } else if (data_pulsa.kartu == 'TELKOMSEL') {
                  $$('#img-profider').prop('src', 'images/tipe_e/TELKOMSEL.png');
                } else if (data_pulsa.kartu == 'AXIS / XL') {
                  $$('#img-profider').prop('src', 'images/tipe_e/AXIS XL.png');
                } else if (data_pulsa.kartu == 'SMART') {
                  $$('#img-profider').prop('src', 'images/tipe_e/SMART.png');
                }

                data_pulsa.data.forEach(function (item, index) {
                  if (item.status == 'AKTIF') {
                    let jumlah = parseFloat(item.harga) + parseFloat(item.admin);
                    print += '<div class="card grey-border" id="list-product-' + index + '">' +
                      '<div class="card-content card-content-padding list-product" id="list-product" data-index="' + index + '" style="position: relative;">' +
                      '<div class="product-name text-color-blue" id="product-name-' + index + '">' + item.keterangan + '</div>' +
                      '<div class="product-price">' +
                      '<span>Harga :</span>' +
                      '<div class="text-color-blue" id="product-price-' + index + '">Rp. ' + toIdrFormat(jumlah) + '</div>' +
                      '<div id="product-kode-' + index + '" style="display: none;">' + item.kode + '</div>' +
                      '<div id="product-nominal-' + index + '" style="display: none;">' + item.harga + '</div>' +
                      '<div id="product-admin-' + index + '" style="display: none;">' + item.admin + '</div>' +
                      '</div>' +
                      '</div>' +
                      '</div>';
                  }
                });
              } else {
                app.dialog.alert(data_pulsa.message);
              }
              $$('#list_data').html(print);

              // fungsi klik list produk
              $('div[id^=list-product]').each(function () {
                var index = $(this).data("index");
                $$('#list-product-' + index).on('click', function () {
                  var nomor_telp = $$('#telp').val();
                  var kode_produk = $$('#product-kode-' + index).text();
                  var nama_produk = $$('#product-name-' + index).text();
                  var nominal_produk = $$('#product-nominal-' + index).text();
                  var admin_produk = $$('#product-admin-' + index).text();
                  if (nomor_telp.length < 11 || nomor_telp.length > 14) {
                    app.dialog.alert('Nomor Telepon yang anda masukkan salah. Mohon periksa ulang.');
                    return false;
                  }

                  app.dialog.confirm(
                    'Apakah anda yakin ingin membeli ' + nama_produk + ' dengan Nomor Telepon ' + nomor_telp + '?',
                    function () {
                      // proses pembelian
                      let ajax_data = new Array();
                      ajax_data.push(iamthedoor);
                      ajax_data.push({
                        'telp': nomor_telp,
                        'kode': kode_produk,
                        'nominal': nominal_produk,
                        'admin': admin_produk,
                        'nama': nama_produk
                      });

                      app.dialog.preloader('Loading...');
                      app.request.post(site_url_mobile_layanan + '/tipe_e/pembayaran_pulsa', ajax_data, function (data) {
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
            }, function () {
              app.dialog.alert('Periksa koneksi internet anda.');
            }, 'json');
          }
        } else {
          prefix = ''
          $$('#list_data').html('');
          $$('#img-profider').prop('src', '');
        }
      });

      $('#btn_contact').on('click', function () {
        window.ContactsX.requestPermission(function (success) {
          window.ContactsX.find(function (success) {
            var char_code = success[0].displayName.charCodeAt(0);

            var content = '<div class="list contacts-list">' +
              '<div class="list-group">' +
              '<ul>' +
              '<li class="list-group-title">' + String.fromCharCode(char_code) + '</li>';

            success.forEach(function (contact, index) {
              if (contact.displayName.charCodeAt(0) != char_code) {
                do {
                  char_code++;
                } while (contact.displayName.charCodeAt(0) != char_code);

                content += '<div class="list-group">' +
                  '<ul>' +
                  '<li class="list-group-title">' + String.fromCharCode(char_code) + '</li>';
              }

              var tempNumbers = [];
              contact.phoneNumbers.forEach(function (n, i) {
                if (n.normalized)
                  tempNumbers[i] = n.normalized;
              });
              contact.phoneNumbers = [...new Set(tempNumbers)];
              contact.phoneNumbers.forEach(function (number) {
                content += '<li>' +
                  '<div class="item-content">' +
                  '<div class="item-inner">' +
                  '<div class="item-title">' +
                  '<a href="#" class="link text-color-black popup-close">' + contact.displayName + ' (' + number + ')' + '</a>' +
                  '</div>' +
                  '</div>' +
                  '</div>' +
                  '</li>';
              });

              if (success[index + 1] && success[index + 1].displayName.charCodeAt(0) != char_code) {
                content += '</ul>' +
                  '</div>';
              }
            });
            content += '</div>';

            var contactPopup = app.popup.create({
              content: '<div class="popup">' +
                '<div class="page-content">' +
                '<div class="block">' +
                content +
                '</div>' +
                '</div>' +
                '</div>'
            });
            contactPopup.open();

            $$('.contacts-list .popup-close').on('click', function () {
              let number = '0' + $(this).text().split(' (+')[1].slice(2).slice(0, -1);
              $$('#telp').val(number).trigger('input');
            });
          }, function (error) {
            app.dialog.alert(JSON.stringify(error));
          }, {
            fields: {
              phoneNumbers: true
            },
            baseCountryCode: 'ID'
          });
        }, function (error) {
          app.dialog.alert(JSON.stringify(error));
        });
      });
    },
  }
};