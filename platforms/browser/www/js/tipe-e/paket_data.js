// var json_paket_data = {
//   "status": "00",
//   "message": "SUKSES",
//   "kartu": "ISAT", // hasil cek prefix nomor hp
//   "data": [
//     {
//       "harga": "900",
//       "admin": "100",
//       "kode_produk": "P001",
//       "produk": "Data Pure 100MB 30H",
//       "group_produk": "INDOSAT",
//       "status": "AKTIF"
//     },{
//       "harga": "1750",
//       "admin": "100",
//       "kode_produk": "P002",
//       "produk": "Data Pure 200MB 30H",
//       "group_produk": "INDOSAT",
//       "status": "AKTIF"
//     },{
//       "harga": "3950",
//       "admin": "100",
//       "kode_produk": "P003",
//       "produk": "Data Pure 1GB 1H",
//       "group_produk": "INDOSAT",
//       "status": "AKTIF"
//     },{
//       "harga": "4100",
//       "admin": "0",
//       "kode_produk": "P004",
//       "produk": "Data Pure 500MB 30H",
//       "group_produk": "INDOSAT",
//       "status": "AKTIF"
//     }
//   ]
// };

var paket_data = {
  path: '/tipe-e/paket_data',
  url: './pages/tipe-e/paket_data/index.html',
  name: 'paket_data',
  on: {
    pageInit: function() {

      var prefix = '';
      $$('#telp').on('input', function() {
        if ($$('#telp').val().length >= 4) {
          if ($$('#telp').val().slice(0, 4) != prefix) {
            prefix = $$('#telp').val().slice(0, 4);

            // preses cek prefix nomor HP dan request list data produk dari server
            let ajax_data = new Array();
            ajax_data.push(iamthedoor);
            ajax_data.push(prefix);

            app.request.post(site_url_mobile_layanan + '/tipe_e/get_produk_paket_data', ajax_data, function(json_paket_data) {
              var print = '';
              if (json_paket_data.status == '00') {
                if (json_paket_data.kartu == 'ISAT') {
                  $$('#img-profider').prop('src', 'images/tipe_e/ISAT.png');
                } else if (json_paket_data.kartu == 'KARTU3') {
                  $$('#img-profider').prop('src', 'images/tipe_e/KARTU3.png');
                } else if (json_paket_data.kartu == 'TELKOMSEL') {
                  $$('#img-profider').prop('src', 'images/tipe_e/TELKOMSEL.png');
                } else if (json_paket_data.kartu == 'AXIS / XL') {
                  $$('#img-profider').prop('src', 'images/tipe_e/AXIS XL.png');
                } else if (json_paket_data.kartu == 'SMART') {
                  $$('#img-profider').prop('src', 'images/tipe_e/SMART.png');
                }

                json_paket_data.data.forEach(function(item, index) {
                  if (item.status == 'AKTIF') {
                    let jumlah = parseFloat(item.harga) + parseFloat(item.admin);
                    print += '<div class="card grey-border" id="list-product-'+index+'">'+
                        '<div class="card-content card-content-padding list-product" id="list-product" data-index="' + index + '" style="position: relative;">'+
                          '<div class="product-name text-color-blue" id="product-name-'+index+'">' + item.keterangan + '</div>'+
                          '<div class="product-price">'+
                            '<span>Harga :</span>'+
                            '<div class="text-color-blue" id="product-price-'+index+'">Rp. ' + toIdrFormat(jumlah) + '</div>'+
                            '<div id="product-kode-'+index+'" style="display: none;">' + item.kode + '</div>'+
                          '</div>'+
                        '</div>'+
                      '</div>';
                  }
                });
              } else {
                app.dialog.alert(json_paket_data.message);
              }
              $$('#list_data').html(print);

              // fungsi klik list produk
              $('div[id^=list-product]').each(function () {
                var index = $(this).data("index");
                $$('#list-product-'+index).on('click', function() {
                  var nomor_telp = $$('#telp').val();
                  var nama_produk = $$('#product-name-'+index).text();
                  var total_harga = $$('#product-price-'+index).text();
                  var kode_produk = $$('#product-kode-'+index).text();
                  if (nomor_telp.length < 11 || nomor_telp.length > 14) {
                    app.dialog.alert('Nomor Telepon yang anda masukkan salah. Mohon periksa ulang.');
                    return false;
                  }

                  app.dialog.confirm(
                    'Apakah anda yakin ingin membeli ' + nama_produk + ' dengan Nomor Telepon ' + nomor_telp + '?',
                    function () {
                      // proses pembelian
                      console.log('kode = '+kode_produk+', nama = '+nama_produk+', total harga = '+total_harga);
                    }
                  );
                })
              });
            }, function() {
              app.dialog.alert('Periksa koneksi internet anda.');
            }, 'json');
          }
        } else {
          prefix = ''
          $$('#list_data').html('');
          $$('#img-profider').prop('src', '');
        }
      });

      $('#btn_contact').on('click', function() {
        window.ContactsX.requestPermission(function(success) {
          window.ContactsX.find(function(success) {
            var char_code = success[0].displayName.charCodeAt(0);

            var content = '<div class="list contacts-list">' +
                '<div class="list-group">' +
                  '<ul>' +
                    '<li class="list-group-title">' + String.fromCharCode(char_code) + '</li>';

            success.forEach(function(contact, index) {
              if (contact.displayName.charCodeAt(0) != char_code) {
                do {
                  char_code++;
                } while (contact.displayName.charCodeAt(0) != char_code);

                content +=  '<div class="list-group">' +
                  '<ul>' +
                    '<li class="list-group-title">' + String.fromCharCode(char_code) + '</li>';
              }

              var tempNumbers = [];
              contact.phoneNumbers.forEach(function(n, i) {
                if (n.normalized)
                  tempNumbers[i] = n.normalized;
              });
              contact.phoneNumbers = [...new Set(tempNumbers)];
              contact.phoneNumbers.forEach(function(number) {
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

            $$('.contacts-list .popup-close').on('click', function() {
              let number = '0' + $(this).text().split(' (+')[1].slice(2).slice(0, -1);
              $$('#telp').val(number).trigger('input');
            });
          }, function(error) {
            alert(JSON.stringify(error));
          }, {
            fields: {
              phoneNumbers: true
            },
            baseCountryCode : 'ID'
          });
        }, function(error) {
          alert(JSON.stringify(error));
        });
      });
    },
  }
};