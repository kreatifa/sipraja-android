var seluler_pascabayar = {
  path: '/tipe-e/seluler_pascabayar',
  url: './pages/tipe-e/seluler_pascabayar/index.html',
  name: 'seluler_pascabayar',
  on: {
    pageInit: function() {
      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/tipe_e/get_operator_pascabayar', iamthedoor, function(data) {
        app.dialog.close();
        var operator_seluler_pascabayar = '';
        if (data.status == '00') {
          data.data.forEach(function(item, index) {
            operator_seluler_pascabayar += '<option value="' + item.kode + '">' + item.keterangan + '</option>';
          });
        } else {
          operator_seluler_pascabayar = '<option value="">Pilih Operator</option>';
          app.dialog.alert('Terjadi kesalahan sistem.');
        }
        $$('#operator').html(operator_seluler_pascabayar);
      }, function() {
        app.dialog.alert('Periksa koneksi internet anda.');
      }, 'json');

      $$('#cek').on('click', function() {
        app.input.validateInputs('#seluler_pascabayar_form');
        if ($$('#seluler_pascabayar_form')[0].checkValidity() == true) {
          let ajax_data = new Array();
          let form_data = app.form.convertToData('#seluler_pascabayar_form');
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);

          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/tipe_e/tagihan_seluler_pascabayar', ajax_data, function(data) {
            app.dialog.close();
            if (data.status == '00') {
              if (data.nama_pelanggan == '') {
                $$('#tagihan_seluler_pascabayar_form').hide();
                app.dialog.alert('Maaf data yang anda cari tidak ditemukan');
              } else {
                let jumlah = parseFloat(data.nominal) + parseFloat(data.admin);
                $$('#tagihan_seluler_pascabayar_form').show();
                $$('#kode_produk').val(data.kode_produk);
                $$('#id').val(data.id_pelanggan);
                $$('#nama').val(data.nama_pelanggan);
                $$('#periode').val(data.periode);
                $$('#nominal').val('Rp. ' + toIdrFormat(data.nominal));
                $$('#admin').val('Rp. ' + toIdrFormat(data.admin));
                $$('#total_bayar').val('Rp. ' + toIdrFormat(jumlah));
              }
            } else {
              $$('#tagihan_seluler_pascabayar_form').hide();
              app.dialog.alert(data.message);
            }
          }, function() {
            $$('#tagihan_seluler_pascabayar_form').hide();
            app.dialog.alert('Periksa koneksi internet anda.');
          }, 'json');
        } else {
          $$('#tagihan_seluler_pascabayar_form').hide();
          app.dialog.alert('Mohon lengkapi semua form');
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

      $$('#bayar').on('click', function() {
        let ajax_data = new Array();
        let form_data = app.form.convertToData('#tagihan_seluler_pascabayar_form');
        ajax_data.push(iamthedoor);
        ajax_data.push(form_data);
        console.log(ajax_data);
      });
    },
  }
};