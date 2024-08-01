// Set Variables
var inAppBrowser;
var Base64Decode = function (string) {
  try {
    return window.atob(string);
  } catch (error) {
    return 'false';
  }
}

var scanner_view = {
  path: '/scanner/',
  url: './pages/scanner.html',
  name: 'scanner',
  on: {
    pageInit: function () {
      $$('#scan').on('click', function () {
        QRScanner.prepare(onPrepare);
      });

      function onPrepare(err, status) {
        if (status.authorized) {
          $$('#app').hide();

          QRScanner.show(function () {
            $$('#qr_view').show();

            QRScanner.scan(onScan);
          });
        }
      }

      function onScan(err, contents) {
        if (contents) {
          $$('#qr_view').hide();

          QRScanner.hide(function () {
            $$('#app').show();
            let decoded = Base64Decode(contents);
            let sliced = decoded.slice(0, 5);
            if (sliced == 'EDOCX') {
              let doc_path = decoded.slice(5);
              let encoded = window.btoa(doc_path + '_signed.pdf' + 'dasarnakal' + 'dummy').replace(/=/g, '');
              // let url = 'https://docs.google.com/gview?embedded=true&url=' + site_url_mobile + '/esign/access_doc/' + encoded;
              let url = base_url + '/pdfjs/web/viewer.php?encoded=' + encoded;
              inAppBrowser = cordova.InAppBrowser.open(url, '_blank', 'hidden=yes,location=no,zoom=no');
              inAppBrowser.addEventListener('loadstart', function () {
                app.dialog.preloader('Mohon Tunggu Sebentar...');
              });
              inAppBrowser.addEventListener('loadstop', function () {
                app.dialog.close();
                inAppBrowser.show();
              });
              inAppBrowser.addEventListener('loaderror', function () {
                app.dialog.close();
                inAppBrowser.close();
                app.dialog.alert('Mohon Maaf, Sedang Terjadi Kesalahan.');
              });
            } else if (sliced == 'ESIGN') {
              var id = decoded.slice(5, decoded.length - 3);
              var kode = decoded.slice(-3);
              if (kode.includes('.')) {
                var id = decoded.slice(5, decoded.length - 5);
                var kode = decoded.slice(-5);
              }
              let code = window.btoa(kode);
              mainView.router.navigate('/tracking/' + id + '/' + code);
            } else {
              app.dialog.alert('Mohon Aplikasi Ini Digunakan Untuk Scan Dokumen Sipraja Saja.');
            }
          });
        }
      }

      $$('#qr_light').on('click', function () {
        if ($$('#qr_light').prop('src').match('off')) {
          QRScanner.enableLight(function (err, status) {
            $$('#qr_light').prop('src', 'images/light_on.png');
          });
        } else {
          QRScanner.disableLight(function (err, status) {
            $$('#qr_light').prop('src', 'images/light_off.png');
          })
        }
      });

      $$('#qr_cancel').on('click', function () {
        $$('#qr_view').hide();
        QRScanner.hide(function () {
          $$('#app').show();
        });
      });
    }
  }
};

var tracking_view = {
  path: '/tracking/:id/:kode',
  url: './pages/tracking.html',
  name: 'tracking',
  on: {
    pageInit: function () {
      let id = mainView.router.currentRoute.params.id;
      let kode = window.atob(mainView.router.currentRoute.params.kode);
      app.dialog.preloader('Mohon Tunggu Sebentar...');
      app.request.post(site_url_mobile + '/esign/get_tracking', { apvitemid: id, kode: kode }, function (data) {
        if (data) {
          app.dialog.close();
          let date = new Date(data.time);
          let options = {
            year: 'numeric', month: 'long', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          };
          let datetime = date.toLocaleString('id-ID', options);
          let content = '<div class="card">' +
            '<div class="card-header bg-color-blue text-color-white">' + data.prefix + '</div>' +
            '<div class="card-content card-content-padding">' +
            '<div class="list media-list">' +
            '<ul>' +
            '<li>' +
            '<div class="item-content">' +
            '<div class="item-media">' +
            '<i class="icon f7-icons color-green">checkmark_seal_fill</i>' +
            '</div>' +
            '<div class="item-inner">' +
            '<div class="item-title-row">' +
            '<div class="item-title"><b>' + data.kepala + '</b></div>' +
            '</div>' +
            '<div class="item-subtitle">' +
            '<span class="text-color-green">' + (data.nip != 0 ? 'NIP. ' + data.nip : '-') + '</span>' +
            '</div>' +
            '<div class="item-subtitle">' +
            '<span class="badge color-green">' + datetime + '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>';
          $$('#tracking_card').append(content);
        } else {
          app.dialog.close();
          app.dialog.alert('Terjadi Kesalahan');
        }
      }, 'json');
    }
  }
};
