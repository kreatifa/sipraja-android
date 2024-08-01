var e_wallet = {
  path: '/tipe-e/e_wallet',
  url: './pages/tipe-e/e_wallet/index.html',
  name: 'e_wallet',
  on: {
    pageInit: function () {
    },
  }
}

var e_wallet_dana = {
  path: '/tipe-e/e_wallet/dana',
  url: './pages/tipe-e/e_wallet/dana.html',
  name: 'e_wallet_dana',
  on: {
    pageInit: function () {
      app.dialog.preloader('Loading...');
      let ajax_data = new Array();
      ajax_data.push(iamthedoor);
      ajax_data.push('E_MONEY_DANA');
      app.request.post(site_url_mobile_layanan + '/tipe_e/get_produk_e_wallet', ajax_data, function (data) {
        app.dialog.close();
        var print = '';
        if (data.status == '00') {
          if (data.data.length < 1) {
            print = '<center style="margin-top: 125px;">Maaf Produk tidak tersedia saat ini</center>';
          }

          data.data.forEach(function (item, index) {
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
          app.dialog.alert(data.message);
        }
        $$('#list_data').html(print);

        // fungsi klik list produk
        $('div[id^=list-product]').each(function () {
          var index = $(this).data("index");
          $$('#list-product-' + index).on('click', function () {
            var nomor_telp = $$('#telp').val();
            var kode_produk = $$('#product-kode-' + index).text();
            var nominal_produk = $$('#product-nominal-' + index).text();
            var admin_produk = $$('#product-admin-' + index).text();
            var nama_produk = $$('#product-name-' + index).text();
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
                app.request.post(site_url_mobile_layanan + '/tipe_e/pembayaran_dana', ajax_data, function (data) {
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
    },
  }
}

var e_wallet_grab_driver = {
  path: '/tipe-e/e_wallet/grab_driver',
  url: './pages/tipe-e/e_wallet/grab_driver.html',
  name: 'e_wallet_grab_driver',
  on: {
    pageInit: function () {
      app.dialog.preloader('Loading...');
      let ajax_data = new Array();
      ajax_data.push(iamthedoor);
      ajax_data.push('E_MONEY_SALDO GRAB DRIVER');
      app.request.post(site_url_mobile_layanan + '/tipe_e/get_produk_e_wallet', ajax_data, function (data) {
        app.dialog.close();
        var print = '';
        if (data.status == '00') {
          if (data.data.length < 1) {
            print = '<center style="margin-top: 125px;">Maaf Produk tidak tersedia saat ini</center>';
          }

          data.data.forEach(function (item, index) {
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
          app.dialog.alert(data.message);
        }
        $$('#list_data').html(print);

        // fungsi klik list produk
        $('div[id^=list-product]').each(function () {
          var index = $(this).data("index");
          $$('#list-product-' + index).on('click', function () {
            var nomor_telp = $$('#telp').val();
            var kode_produk = $$('#product-kode-' + index).text();
            var nominal_produk = $$('#product-nominal-' + index).text();
            var admin_produk = $$('#product-admin-' + index).text();
            var nama_produk = $$('#product-name-' + index).text();
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
                app.request.post(site_url_mobile_layanan + '/tipe_e/pembayaran_grab_driver', ajax_data, function (data) {
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
    },
  }
}

var e_wallet_gopay = {
  path: '/tipe-e/e_wallet/gopay',
  url: './pages/tipe-e/e_wallet/gopay.html',
  name: 'e_wallet_gopay',
  on: {
    pageInit: function () {
      app.dialog.preloader('Loading...');
      let ajax_data = new Array();
      ajax_data.push(iamthedoor);
      ajax_data.push('E_MONEY_GOPAY/GOJEK');
      app.request.post(site_url_mobile_layanan + '/tipe_e/get_produk_e_wallet', ajax_data, function (data) {
        app.dialog.close();
        var print = '';
        if (data.status == '00') {
          if (data.data.length < 1) {
            print = '<center style="margin-top: 125px;">Maaf Produk tidak tersedia saat ini</center>';
          }

          data.data.forEach(function (item, index) {
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
          app.dialog.alert(data.message);
        }
        $$('#list_data').html(print);

        // fungsi klik list produk
        $('div[id^=list-product]').each(function () {
          var index = $(this).data("index");
          $$('#list-product-' + index).on('click', function () {
            var nomor_telp = $$('#telp').val();
            var kode_produk = $$('#product-kode-' + index).text();
            var nominal_produk = $$('#product-nominal-' + index).text();
            var admin_produk = $$('#product-admin-' + index).text();
            var nama_produk = $$('#product-name-' + index).text();
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
                app.request.post(site_url_mobile_layanan + '/tipe_e/pembayaran_gopay', ajax_data, function (data) {
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
    },
  }
}

var e_wallet_gojek_driver = {
  path: '/tipe-e/e_wallet/gojek_driver',
  url: './pages/tipe-e/e_wallet/gojek_driver.html',
  name: 'e_wallet_gojek_driver',
  on: {
    pageInit: function () {
      app.dialog.preloader('Loading...');
      let ajax_data = new Array();
      ajax_data.push(iamthedoor);
      ajax_data.push('E_MONEY_SALDO GOJEK DRIVER');
      app.request.post(site_url_mobile_layanan + '/tipe_e/get_produk_e_wallet', ajax_data, function (data) {
        app.dialog.close();
        var print = '';
        if (data.status == '00') {
          if (data.data.length < 1) {
            print = '<center style="margin-top: 125px;">Maaf Produk tidak tersedia saat ini</center>';
          }

          data.data.forEach(function (item, index) {
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
          app.dialog.alert(data.message);
        }
        $$('#list_data').html(print);

        // fungsi klik list produk
        $('div[id^=list-product]').each(function () {
          var index = $(this).data("index");
          $$('#list-product-' + index).on('click', function () {
            var nomor_telp = $$('#telp').val();
            var kode_produk = $$('#product-kode-' + index).text();
            var nominal_produk = $$('#product-nominal-' + index).text();
            var admin_produk = $$('#product-admin-' + index).text();
            var nama_produk = $$('#product-name-' + index).text();
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
                app.request.post(site_url_mobile_layanan + '/tipe_e/pembayaran_gojek_driver', ajax_data, function (data) {
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
    },
  }
}

var e_wallet_shopee_pay = {
  path: '/tipe-e/e_wallet/shopee_pay',
  url: './pages/tipe-e/e_wallet/shopee_pay.html',
  name: 'e_wallet_shopee_pay',
  on: {
    pageInit: function () {
      app.dialog.preloader('Loading...');
      let ajax_data = new Array();
      ajax_data.push(iamthedoor);
      ajax_data.push('E_MONEY_SHOPEE PAY');
      app.request.post(site_url_mobile_layanan + '/tipe_e/get_produk_e_wallet', ajax_data, function (data) {
        app.dialog.close();
        var print = '';
        if (data.status == '00') {
          if (data.data.length < 1) {
            print = '<center style="margin-top: 125px;">Maaf Produk tidak tersedia saat ini</center>';
          }

          data.data.forEach(function (item, index) {
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
          app.dialog.alert(data.message);
        }
        $$('#list_data').html(print);

        // fungsi klik list produk
        $('div[id^=list-product]').each(function () {
          var index = $(this).data("index");
          $$('#list-product-' + index).on('click', function () {
            var nomor_telp = $$('#telp').val();
            var kode_produk = $$('#product-kode-' + index).text();
            var nominal_produk = $$('#product-nominal-' + index).text();
            var admin_produk = $$('#product-admin-' + index).text();
            var nama_produk = $$('#product-name-' + index).text();
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
                app.request.post(site_url_mobile_layanan + '/tipe_e/pembayaran_shopee_pay', ajax_data, function (data) {
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
    },
  }
}

var e_wallet_ovo = {
  path: '/tipe-e/e_wallet/ovo',
  url: './pages/tipe-e/e_wallet/ovo.html',
  name: 'e_wallet_ovo',
  on: {
    pageInit: function () {
      app.dialog.preloader('Loading...');
      let ajax_data = new Array();
      ajax_data.push(iamthedoor);
      ajax_data.push('E_MONEY_OVO');
      app.request.post(site_url_mobile_layanan + '/tipe_e/get_produk_e_wallet', ajax_data, function (data) {
        app.dialog.close();
        var print = '';
        if (data.status == '00') {
          if (data.data.length < 1) {
            print = '<center style="margin-top: 125px;">Maaf Produk tidak tersedia saat ini</center>';
          }

          data.data.forEach(function (item, index) {
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
          app.dialog.alert(data.message);
        }
        $$('#list_data').html(print);

        // fungsi klik list produk
        $('div[id^=list-product]').each(function () {
          var index = $(this).data("index");
          $$('#list-product-' + index).on('click', function () {
            var nomor_telp = $$('#telp').val();
            var kode_produk = $$('#product-kode-' + index).text();
            var nominal_produk = $$('#product-nominal-' + index).text();
            var admin_produk = $$('#product-admin-' + index).text();
            var nama_produk = $$('#product-name-' + index).text();
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
                app.request.post(site_url_mobile_layanan + '/tipe_e/pembayaran_ovo', ajax_data, function (data) {
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
    },
  }
}

var e_wallet_link_aja = {
  path: '/tipe-e/e_wallet/link_aja',
  url: './pages/tipe-e/e_wallet/link_aja.html',
  name: 'e_wallet_link_aja',
  on: {
    pageInit: function () {
      app.dialog.preloader('Loading...');
      let ajax_data = new Array();
      ajax_data.push(iamthedoor);
      ajax_data.push('E_MONEY_LINKAJA');
      app.request.post(site_url_mobile_layanan + '/tipe_e/get_produk_e_wallet', ajax_data, function (data) {
        app.dialog.close();
        var print = '';
        if (data.status == '00') {
          if (data.data.length < 1) {
            print = '<center style="margin-top: 125px;">Maaf Produk tidak tersedia saat ini</center>';
          }

          data.data.forEach(function (item, index) {
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
          app.dialog.alert(data.message);
        }
        $$('#list_data').html(print);

        // fungsi klik list produk
        $('div[id^=list-product]').each(function () {
          var index = $(this).data("index");
          $$('#list-product-' + index).on('click', function () {
            var nomor_telp = $$('#telp').val();
            var kode_produk = $$('#product-kode-' + index).text();
            var nominal_produk = $$('#product-nominal-' + index).text();
            var admin_produk = $$('#product-admin-' + index).text();
            var nama_produk = $$('#product-name-' + index).text();
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
                app.request.post(site_url_mobile_layanan + '/tipe_e/pembayaran_link_aja', ajax_data, function (data) {
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
    },
  }
}

var e_wallet_m_cash = {
  path: '/tipe-e/e_wallet/m_cash',
  url: './pages/tipe-e/e_wallet/m_cash.html',
  name: 'e_wallet_m_cash',
  on: {
    pageInit: function () {
      app.dialog.preloader('Loading...');
      let ajax_data = new Array();
      ajax_data.push(iamthedoor);
      ajax_data.push('E_MONEY_MCASH');
      app.request.post(site_url_mobile_layanan + '/tipe_e/get_produk_e_wallet', ajax_data, function (data) {
        app.dialog.close();
        var print = '';
        if (data.status == '00') {
          if (data.data.length < 1) {
            print = '<center style="margin-top: 125px;">Maaf Produk tidak tersedia saat ini</center>';
          }

          data.data.forEach(function (item, index) {
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
          app.dialog.alert(data.message);
        }
        $$('#list_data').html(print);

        // fungsi klik list produk
        $('div[id^=list-product]').each(function () {
          var index = $(this).data("index");
          $$('#list-product-' + index).on('click', function () {
            var nomor_telp = $$('#telp').val();
            var kode_produk = $$('#product-kode-' + index).text();
            var nominal_produk = $$('#product-nominal-' + index).text();
            var admin_produk = $$('#product-admin-' + index).text();
            var nama_produk = $$('#product-name-' + index).text();
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
                app.request.post(site_url_mobile_layanan + '/tipe_e/pembayaran_m_cash', ajax_data, function (data) {
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
    },
  }
}

var e_wallet_qiwi_card = {
  path: '/tipe-e/e_wallet/qiwi_card',
  url: './pages/tipe-e/e_wallet/qiwi_card.html',
  name: 'e_wallet_qiwi_card',
  on: {
    pageInit: function () {
      app.dialog.preloader('Loading...');
      let ajax_data = new Array();
      ajax_data.push(iamthedoor);
      ajax_data.push('E_MONEY_KIWICARD');
      app.request.post(site_url_mobile_layanan + '/tipe_e/get_produk_e_wallet', ajax_data, function (data) {
        app.dialog.close();
        var print = '';
        if (data.status == '00') {
          if (data.data.length < 1) {
            print = '<center style="margin-top: 125px;">Maaf Produk tidak tersedia saat ini</center>';
          }

          data.data.forEach(function (item, index) {
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
          app.dialog.alert(data.message);
        }
        $$('#list_data').html(print);

        // fungsi klik list produk
        $('div[id^=list-product]').each(function () {
          var index = $(this).data("index");
          $$('#list-product-' + index).on('click', function () {
            var nomor_telp = $$('#telp').val();
            var kode_produk = $$('#product-kode-' + index).text();
            var nominal_produk = $$('#product-nominal-' + index).text();
            var admin_produk = $$('#product-admin-' + index).text();
            var nama_produk = $$('#product-name-' + index).text();
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
                app.request.post(site_url_mobile_layanan + '/tipe_e/pembayaran_qiwi', ajax_data, function (data) {
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
    },
  }
}

var e_wallet_my_card = {
  path: '/tipe-e/e_wallet/my_card',
  url: './pages/tipe-e/e_wallet/my_card.html',
  name: 'e_wallet_my_card',
  on: {
    pageInit: function () {
      app.dialog.preloader('Loading...');
      let ajax_data = new Array();
      ajax_data.push(iamthedoor);
      ajax_data.push('E_MONEY_MYCARD');
      app.request.post(site_url_mobile_layanan + '/tipe_e/get_produk_e_wallet', ajax_data, function (data) {
        app.dialog.close();
        var print = '';
        if (data.status == '00') {
          if (data.data.length < 1) {
            print = '<center style="margin-top: 125px;">Maaf Produk tidak tersedia saat ini</center>';
          }

          data.data.forEach(function (item, index) {
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
          app.dialog.alert(data.message);
        }
        $$('#list_data').html(print);

        // fungsi klik list produk
        $('div[id^=list-product]').each(function () {
          var index = $(this).data("index");
          $$('#list-product-' + index).on('click', function () {
            var nomor_telp = $$('#telp').val();
            var kode_produk = $$('#product-kode-' + index).text();
            var nominal_produk = $$('#product-nominal-' + index).text();
            var admin_produk = $$('#product-admin-' + index).text();
            var nama_produk = $$('#product-name-' + index).text();
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
                app.request.post(site_url_mobile_layanan + '/tipe_e/pembayaran_my_card', ajax_data, function (data) {
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
    },
  }
}

var e_wallet_mtix = {
  path: '/tipe-e/e_wallet/mtix',
  url: './pages/tipe-e/e_wallet/mtix.html',
  name: 'e_wallet_mtix',
  on: {
    pageInit: function () {
      app.dialog.preloader('Loading...');
      let ajax_data = new Array();
      ajax_data.push(iamthedoor);
      ajax_data.push('E_MONEY_MTIX');
      app.request.post(site_url_mobile_layanan + '/tipe_e/get_produk_e_wallet', ajax_data, function (data) {
        app.dialog.close();
        var print = '';
        if (data.status == '00') {
          if (data.data.length < 1) {
            print = '<center style="margin-top: 125px;">Maaf Produk tidak tersedia saat ini</center>';
          }

          data.data.forEach(function (item, index) {
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
          app.dialog.alert(data.message);
        }
        $$('#list_data').html(print);

        // fungsi klik list produk
        $('div[id^=list-product]').each(function () {
          var index = $(this).data("index");
          $$('#list-product-' + index).on('click', function () {
            var nomor_telp = $$('#telp').val();
            var kode_produk = $$('#product-kode-' + index).text();
            var nominal_produk = $$('#product-nominal-' + index).text();
            var admin_produk = $$('#product-admin-' + index).text();
            var nama_produk = $$('#product-name-' + index).text();
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
                app.request.post(site_url_mobile_layanan + '/tipe_e/pembayaran_mtix', ajax_data, function (data) {
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
    },
  }
}

var e_wallet_tixid = {
  path: '/tipe-e/e_wallet/tixid',
  url: './pages/tipe-e/e_wallet/tixid.html',
  name: 'e_wallet_tixid',
  on: {
    pageInit: function () {
      app.dialog.preloader('Loading...');
      let ajax_data = new Array();
      ajax_data.push(iamthedoor);
      ajax_data.push('E_MONEY_TIXID');
      app.request.post(site_url_mobile_layanan + '/tipe_e/get_produk_e_wallet', ajax_data, function (data) {
        app.dialog.close();
        var print = '';
        if (data.status == '00') {
          if (data.data.length < 1) {
            print = '<center style="margin-top: 125px;">Maaf Produk tidak tersedia saat ini</center>';
          }

          data.data.forEach(function (item, index) {
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
          app.dialog.alert(data.message);
        }
        $$('#list_data').html(print);

        // fungsi klik list produk
        $('div[id^=list-product]').each(function () {
          var index = $(this).data("index");
          $$('#list-product-' + index).on('click', function () {
            var nomor_telp = $$('#telp').val();
            var kode_produk = $$('#product-kode-' + index).text();
            var nominal_produk = $$('#product-nominal-' + index).text();
            var admin_produk = $$('#product-admin-' + index).text();
            var nama_produk = $$('#product-name-' + index).text();
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
                app.request.post(site_url_mobile_layanan + '/tipe_e/pembayaran_tixid', ajax_data, function (data) {
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
    },
  }
}

var e_wallet_e_tol = {
  path: '/tipe-e/e_wallet/e_tol',
  url: './pages/tipe-e/e_wallet/e_tol.html',
  name: 'e_wallet_e_tol',
  on: {
    pageInit: function () {
      app.dialog.preloader('Loading...');
      let ajax_data = new Array();
      ajax_data.push(iamthedoor);
      ajax_data.push('E_MONEY_TOL');
      app.request.post(site_url_mobile_layanan + '/tipe_e/get_produk_e_wallet', ajax_data, function (data) {
        app.dialog.close();
        var print = '';
        if (data.status == '00') {
          if (data.data.length < 1) {
            print = '<center style="margin-top: 125px;">Maaf Produk tidak tersedia saat ini</center>';
          }

          data.data.forEach(function (item, index) {
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
          app.dialog.alert(data.message);
        }
        $$('#list_data').html(print);

        // fungsi klik list produk
        $('div[id^=list-product]').each(function () {
          var index = $(this).data("index");
          $$('#list-product-' + index).on('click', function () {
            var nomor_telp = $$('#telp').val();
            var kode_produk = $$('#product-kode-' + index).text();
            var nominal_produk = $$('#product-nominal-' + index).text();
            var admin_produk = $$('#product-admin-' + index).text();
            var nama_produk = $$('#product-name-' + index).text();
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
                app.request.post(site_url_mobile_layanan + '/tipe_e/pembayaran_e_toll', ajax_data, function (data) {
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
    },
  }
}

var e_wallet_cherry_credit = {
  path: '/tipe-e/e_wallet/cherry_credit',
  url: './pages/tipe-e/e_wallet/cherry_credit.html',
  name: 'e_wallet_cherry_credit',
  on: {
    pageInit: function () {
      app.dialog.preloader('Loading...');
      let ajax_data = new Array();
      ajax_data.push(iamthedoor);
      ajax_data.push('E_MONEY_CHERRY CREDIT');
      app.request.post(site_url_mobile_layanan + '/tipe_e/get_produk_e_wallet', ajax_data, function (data) {
        app.dialog.close();
        var print = '';
        if (data.status == '00') {
          if (data.data.length < 1) {
            print = '<center style="margin-top: 125px;">Maaf Produk tidak tersedia saat ini</center>';
          }

          data.data.forEach(function (item, index) {
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
          app.dialog.alert(data.message);
        }
        $$('#list_data').html(print);

        // fungsi klik list produk
        $('div[id^=list-product]').each(function () {
          var index = $(this).data("index");
          $$('#list-product-' + index).on('click', function () {
            var nomor_telp = $$('#telp').val();
            var kode_produk = $$('#product-kode-' + index).text();
            var nominal_produk = $$('#product-nominal-' + index).text();
            var admin_produk = $$('#product-admin-' + index).text();
            var nama_produk = $$('#product-name-' + index).text();
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
                app.request.post(site_url_mobile_layanan + '/tipe_e/pembayaran_cherry_credit', ajax_data, function (data) {
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
    },
  }
}