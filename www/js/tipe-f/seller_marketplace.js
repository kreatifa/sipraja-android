tablename = "kt_market_product";

var seller_marketplace = {
  path: "/tipe-f/seller_marketplace/:kode_toko",
  url: "./pages/tipe-f/seller/index.html",
  name: "seller_marketplace",
  on: {
    pageInit: function () {
      const kode_toko = mainView.router.currentRoute.params.kode_toko;
      $$('#menu').attr('href', '/tipe-f/packing/' + kode_toko);
      $$('#menu_jasa').attr('href', '/tipe-f/packing_jasa/' + kode_toko);
      $$('#menu_food').attr('href', '/tipe-f/packing_food/' + kode_toko);
      var datatables = $("#toko_table").DataTable({
        ajax: {
          url: site_url_mobile_layanan + "/seller_marketplace/get_toko/" + kode_toko,
          data: iamthedoor,
          type: "GET",
        },
        columns: [
          { data: 'kode_toko' },
          { data: 'kode_toko' },
          { data: 'nama_usaha' },
          { data: 'status_usaha' },
          { data: 'alamat_usaha' },
        ],
        lengthChange: false,
        searching: false,
        initComplete: function (settings, json) {
          app.dialog.close();
          $$("#datatables_length").hide();
          $$("#datatables_filter").hide();
        },
        rowCallback: function (row, data) {
          var usaha = '';
          if (data.status_usaha == 0) {
            usaha += 'Badan Usaha';
          } else {
            usaha += 'Perorangan';
          }
          $('td:eq(3)', row).html(usaha);

          let kategori = `
            <a style="width: 110px;" href="/tipe-f/seller_marketplace/shop/${data.kode_toko}/0" class="button button-small button-fill color-blue">Produk</a>
            <a style="width: 110px;" href="/tipe-f/seller_marketplace/shop/${data.kode_toko}/1" class="button button-small button-fill color-green">Jasa</a>
            <a style="width: 110px;" href="/tipe-f/seller_marketplace/shop/${data.kode_toko}/2" class="button button-small button-fill color-orange">Food</a>
          `;
          $('td:eq(0)', row).html(kategori);
          if (data.status_marketplace == 1) {
            $('input[type="checkbox"]').prop('checked', true);
            $('#label-action').html('ON');
          }
        },
      });
      var toggle = app.toggle.create({
        el: '.toggle',
        on: {
          change: function () {
            ajax_data = new Array();
            ajax_data.push(iamthedoor);
            if (toggle.checked) {
              ajax_data.push('1');
              $('#label-action').html('ON');
            } else {
              ajax_data.push('0');
              $('#label-action').html('OFF');
            }
            app.request.post(site_url_mobile_layanan + "/seller_marketplace/update_marketplace/" + kode_toko, ajax_data, function (callback) {
              if (callback) {
                app.dialog.alert("Berhasil");
              }
            }, function () {
              app.dialog.alert("Gagal Memuat, Mohon Coba Lagi Nanti");
            }, 'json');
          }
        }
      })
    },
  },
};

var shop = {
  path: "/tipe-f/seller_marketplace/shop/:kode_toko/:kategori",
  url: "./pages/tipe-f/seller/shop.html",
  name: "shop",
  on: {
    pageInit: function () {
      const kode_toko = mainView.router.currentRoute.params.kode_toko;
      const kategori = mainView.router.currentRoute.params.kategori;
      let sub_path = '/';

      if (kategori == 2) {
        sub_path = '_food/';

        $('.settings').show();
        $('#app').on('change', '#data_status_buka', function () {
          let html = 'Tutup';
          if (this.checked) {
            html = 'Buka';
          }
          $('#label-buka').text(html);
        });

        $$('#settings_food').on('click', function () {
          app.request.get(site_url_mobile_layanan + "/seller_marketplace/shop/" + kode_toko, iamthedoor, function (response) {
            let checked = '';
            let desc = 'Tutup';
            if (parseInt(response.status_buka)) {
              desc = 'Buka';
              checked = "checked";
            }

            app.dialog.confirm(`
              <div>
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label tipe">Jam buka</div>
                    <input type="time" value="${response.jam_buka}" id="data_jam_buka" style="width:100%">
                  </div>
                </div><br>
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label tipe">Jam tutup</div>
                      <input type="time" value="${response.jam_tutup}" id="data_jam_tutup" style="width:100%">
                  </div>
                </div><br>
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <span id="label-buka">${desc}</span>
                    <label id="status_buka_toogle" class="toggle toggle-init color-blue">
                      <input id="data_status_buka" ${checked} type="checkbox" value="1">
                      <span class="toggle-icon"></span>
                    </label>
                  </div>
                </div>
              </div>
              `,
              'Settings',
              function () {
                let status_buka = 0;

                if ($('#data_status_buka').is(':checked')) status_buka = 1;

                let data = [];
                data[0] = iamthedoor;
                data[1] = {
                  jam_buka: $('#data_jam_buka').val(),
                  jam_tutup: $('#data_jam_tutup').val(),
                  status_buka: status_buka
                };

                if (!Math.min(data[1].jam_buka.length, data[1].jam_tutup.length)) {
                  app.dialog.alert('Mohon isi data dengan benar.', 'SIPRAJA');
                  return false;
                }

                app.dialog.preloader('Loading...');

                app.request.post(site_url_mobile_layanan + "/seller_marketplace/settings_toko_food/" + kode_toko, data, function (data) {
                  if (data) {
                    app.dialog.close();
                    app.dialog.alert(data.message, 'SIPRAJA');
                  }
                }, function (error) {
                  alert(error);
                }, 'json');
              }
            );
          }, 'json');
        });
      }

      var sub_kat = ['Produk', 'Jasa', 'Food'];
      $$('.kategori').html('List ' + sub_kat[kategori]);
      $$('#btnnew').html('New ' + sub_kat[kategori]);
      $$("#btnnew").attr("href", "/tipe-f/seller_marketplace/new_produk_marketplace" + sub_path + kode_toko + '/' + kategori);

      var datatables = $("#shop").DataTable({
        ajax: {
          url: site_url_mobile_layanan + "/seller_marketplace/get_product/" + kode_toko + '/' + kategori,
          data: iamthedoor,
          type: "GET",
        },
        columns: [
          { data: "id" },
          { data: "nama" },
          { data: "variasi" },
          { data: "harga" },
          { data: "sisa_stok" }
        ],
        initComplete: function (settings, json) {
          app.dialog.close();
          $$("#shop_length").hide();
          $$("#shop_filter").hide();
        },
        rowCallback: function (row, data) {
          const aksi = `<a href="/tipe-f/seller_marketplace/edit_produk_marketplace${sub_path + kode_toko}/${kategori}/${data.id}" class="button button-small button-fill color-blue"><i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>`;
          $("td:eq(0)", row).html(aksi);
        },
      });

    },
  },
};

var new_produk_marketplace = {
  path: "/tipe-f/seller_marketplace/new_produk_marketplace/:kode_toko/:tipe",
  url: "./pages/tipe-f/seller/new_produk_marketplace.html",
  name: "new_produk_marketplace",
  on: {
    pageInit: function () {
      let kode_toko = mainView.router.currentRoute.params.kode_toko;
      let tipe = mainView.router.currentRoute.params.tipe;

      if (tipe == 1) {
        $$('.tipe').html('Nama Jasa*');
        $$('.merk').remove();
        $$('.bahan').remove();
        $$('#anggota_pengunduran_table .stok').remove();
        $$('.pengiriman').remove();
        $$('.pengiriman-data').remove();
        $$('.foto-penjual').html('Foto Jasa');
      }

      anggota_pengunduran = new Array();
      $$("#addpengunduranjkn").on("touchend", function () {
        popup_tambah_pengiriman_data(tipe);
      });

      $("#variasi-table").on("click", ".hapus-btn", function () {
        $(this)
          .parent()
          .parent()
          .hide("slow", function () {
            $(this).remove();
          });
      });

      $$("#addformupload").on("touchend", addrow);

      app.request.post(site_url_mobile_layanan + "/seller_marketplace/kategori/" + tipe, iamthedoor,
        function (callback) {
          var kategori = '';
          callback.forEach(function (item, index) {
            kategori += '<option value="' + item.id + '">' + item.nama + '</option>';
          });
          $('#kategori').html(kategori);
          $('#kategori').show();
        }, 'json');

      $$("#simpan").on("click", function () {
        app.input.validateInputs("#new_produk_marketplace");
        if ($$("#new_produk_marketplace")[0].checkValidity() == true) {
          if (anggota_pengunduran.length < 1) {
            app.dialog.alert('Mohon masukkan informasi penjualan terlebih dahulu.');
            return false;
          }
          let form_data = app.form.convertToData("#new_produk_marketplace");
          ajax_data = new Array();
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);
          ajax_data.push(kode_toko);
          ajax_data.push(anggota_pengunduran);
          app.dialog.preloader("Loading...");
          app.request.post(site_url_mobile_layanan + "/seller_marketplace/save_produk/" + tipe, ajax_data, function (response) {
            app.dialog.close();
            app.dialog.alert(response);
            mainView.router.back();
            $("#shop").DataTable().ajax.reload();
          }, "json");
        }
      });
    },
  },
};

var new_produk_marketplace_food = {
  path: "/tipe-f/seller_marketplace/new_produk_marketplace_food/:kode_toko/:tipe",
  url: "./pages/tipe-f/seller/new_produk_marketplace_food.html",
  name: "new_produk_marketplace_food",
  on: {
    pageInit: function () {
      let kode_toko = mainView.router.currentRoute.params.kode_toko;
      let tipe = mainView.router.currentRoute.params.tipe;

      sub_food = new Array();
      $$("#addfood").on("touchend", function () {
        popup_tambah_sub_food();
      });

      $("#variasi-table").on("click", ".hapus-btn", function () {
        $(this)
          .parent()
          .parent()
          .hide("slow", function () {
            $(this).remove();
          });
      });

      app.request.post(site_url_mobile_layanan + "/seller_marketplace/kategori/2", iamthedoor,
        function (callback) {
          var kategori = '';
          callback.forEach(function (item, index) {
            kategori += '<option value="' + item.id + '">' + item.nama + '</option>';
          });
          $('#kategori').html(kategori);
          $('#kategori').show();
        }, 'json');

      $$("#simpan").on("click", function () {
        app.input.validateInputs("#new_food_marketplace");
        if ($$("#new_food_marketplace")[0].checkValidity() == true) {
          if (sub_food.length < 1) {
            app.dialog.alert('Mohon masukkan informasi penjualan terlebih dahulu.');
            return false;
          }
          let form_data = app.form.convertToData("#new_food_marketplace");
          ajax_data = new Array();
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);
          ajax_data.push(kode_toko);
          ajax_data.push(sub_food);
          app.dialog.preloader("Loading...");
          app.request.post(site_url_mobile_layanan + "/seller_marketplace/save_produk/" + tipe, ajax_data, function (response) {
            app.dialog.close();
            app.dialog.alert(response);
            mainView.router.back();
            $("#shop").DataTable().ajax.reload();
          }, "json");
        }
      });
    },
  },
};

var edit_produk_marketplace = {
  path: "/tipe-f/seller_marketplace/edit_produk_marketplace/:kode_toko/:tipe/:id",
  url: "./pages/tipe-f/seller/edit_produk_marketplace.html",
  name: "edit_produk_marketplace",
  on: {
    pageInit: function () {
      let id = mainView.router.currentRoute.params.id;
      let tipe = mainView.router.currentRoute.params.tipe;
      let kode_toko = mainView.router.currentRoute.params.kode_toko;

      if (tipe == 1) {
        $$('.tipe').html('Nama Jasa*');
        $$('.merk').remove();
        $$('.bahan').remove();
        $$('#anggota_pengunduran_table .stok').remove();
        $$('.pengiriman').remove();
        $$('.pengiriman-data').remove();
        $$('.foto-penjual').html('Foto Jasa');
      }

      anggota_pengunduran = new Array();
      $$("#addpengunduranjkn").on("touchend", function () {
        popup_tambah_pengiriman_data(tipe);
      });

      $$("#addformupload").on("touchend", addrow);

      app.request.post(site_url_mobile_layanan + "/seller_marketplace/kategori/" + tipe, iamthedoor, function (callback) {
        var kategori = '';
        callback.forEach(function (item, index) {
          kategori += '<option value="' + item.id + '">' + item.nama + '</option>';
        });
        $('#kategori').html(kategori);
        $('#kategori').show();
      }, 'json');

      app.dialog.preloader("Loading...");
      app.request.post(site_url_mobile_layanan + "/seller_marketplace/get_kode/" + id, iamthedoor, function (callback) {
        var produk = callback.produk[0];
        app.dialog.close();
        $$("#nama_produk").val(produk.nama);
        $$("#deskripsi").val(produk.deskripsi);
        $$("#merk").val(produk.merk);
        $$("#bahan").val(produk.bahan);
        $$("#volume").val(produk.volume);
        $$("#berat").val(produk.berat);
        $$("#kategori").val(produk.kategori);
        $$("#ukuran_paket_l").val(produk.ukuran_paket_l);
        $$("#ukuran_paket_p").val(produk.ukuran_paket_p);
        $$("#ukuran_paket_t").val(produk.ukuran_paket_t);
        anggota_pengunduran = callback.produk;
        for (var i = 0; i < anggota_pengunduran.length; i++) {
          anggota_pengunduran[i].status = 'tersimpan';
        }
        reload_pengiriman_data_table(anggota_pengunduran, tipe);
        find_document(id, false);
      }, function () {
        app.dialog.close();
        app.dialog.alert("Gagal Mendapatkan Data Anda, Mohon Coba Lagi Nanti");
      }, "json");

      $$("#btndeletelayanan").html('<a class="button button-round button-fill color-red" id="deletelayanan" style="margin-top: 10px;">' +
        '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Hapus Data</span></a>');

      $$("#deletelayanan").on("click", function () {
        app.dialog.confirm("Apakah anda yakin Menghapus data?", function () {
          app.dialog.preloader("Loading...");
          app.request.post(site_url_mobile_layanan + "/seller_marketplace/delete_produk_marketplace/" + id, iamthedoor, function () {
            app.dialog.close();
            app.dialog.alert("Data Gagal Dihapus");
            mainView.router.back();
            $("#shop").DataTable().ajax.reload();
          }, function () {
            app.dialog.close();
            app.dialog.alert("Data Berhasil Dihapus");
            mainView.router.back();
            $("#shop").DataTable().ajax.reload();
          }, "json");
        });
      });

      $$("#simpan").on("click", function () {
        app.input.validateInputs("#edit_produk_marketplace");
        if ($$("#edit_produk_marketplace")[0].checkValidity() == true) {
          if (datauser.role_id == 4) {
            let form_data = app.form.convertToData("#edit_produk_marketplace");

            let ajax_data = new Array();
            ajax_data.push(iamthedoor);
            ajax_data.push(form_data);
            ajax_data.push(kode_toko);
            ajax_data.push(anggota_pengunduran);

            app.request.post(site_url_mobile_layanan + "/seller_marketplace/update_produk_marketplace/" + id + '/' + tipe, ajax_data, function (response) {
              // app.dialog.close();
              mainView.router.back();
              $("#shop").DataTable().ajax.reload();
              app.dialog.alert(response);
            }, "json");
          }
        }
      });
    },
  },
};

var edit_produk_marketplace_food = {
  path: "/tipe-f/seller_marketplace/edit_produk_marketplace_food/:kode_toko/:tipe/:id",
  url: "./pages/tipe-f/seller/edit_produk_marketplace_food.html",
  name: "edit_produk_marketplace_food",
  on: {
    pageInit: function () {
      let id = mainView.router.currentRoute.params.id;
      let tipe = mainView.router.currentRoute.params.tipe;
      let kode_toko = mainView.router.currentRoute.params.kode_toko;


      sub_food = new Array();
      $$("#addfood").on("touchend", function () {
        popup_tambah_sub_food();
      });

      $("#variasi-table").on("click", ".hapus-btn", function () {
        $(this)
          .parent()
          .parent()
          .hide("slow", function () {
            $(this).remove();
          });
      });

      app.request.post(site_url_mobile_layanan + "/seller_marketplace/kategori/2", iamthedoor, function (callback) {
        var kategori = '';
        callback.forEach(function (item, index) {
          kategori += '<option value="' + item.id + '">' + item.nama + '</option>';
        });
        $('#kategori').html(kategori);
        $('#kategori').show();
      }, 'json');

      app.dialog.preloader("Loading...");
      app.request.post(site_url_mobile_layanan + "/seller_marketplace/get_kode/" + id, iamthedoor, function (callback) {
        var produk = callback.produk[0];
        app.dialog.close();
        $$("#nama_produk").val(produk.nama);
        $$("#deskripsi").val(produk.deskripsi);
        $$("#volume").val(produk.volume);
        $$("#berat").val(produk.berat);
        $$("#kategori").val(produk.kategori);
        $$("#ukuran_paket_l").val(produk.ukuran_paket_l);
        $$("#ukuran_paket_p").val(produk.ukuran_paket_p);
        $$("#ukuran_paket_t").val(produk.ukuran_paket_t);
        sub_food = callback.produk;
        for (var i = 0; i < sub_food.length; i++) {
          sub_food[i].status = 'tersimpan';
          sub_food[i]['fileurl[' + i + ']'] = sub_food[i].fileurl;
          sub_food[i]['fileid[' + i + ']'] = sub_food[i].fileid;
        }
        reload_sub_food_table(sub_food, tipe);
      }, function () {
        app.dialog.close();
        app.dialog.alert("Gagal Mendapatkan Data Anda, Mohon Coba Lagi Nanti");
      }, "json");

      $$("#btndeletelayanan").html('<a class="button button-round button-fill color-red" id="deletelayanan" style="margin-top: 10px;">' +
        '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Hapus Data</span></a>');

      $$("#deletelayanan").on("click", function () {
        app.dialog.confirm("Apakah anda yakin Menghapus data?", function () {
          app.dialog.preloader("Loading...");
          app.request.post(site_url_mobile_layanan + "/seller_marketplace/delete_produk_marketplace/" + id, iamthedoor, function () {
            app.dialog.close();
            app.dialog.alert("Data Gagal Dihapus");
            mainView.router.back();
            $("#shop").DataTable().ajax.reload();
          }, function () {
            app.dialog.close();
            app.dialog.alert("Data Berhasil Dihapus");
            mainView.router.back();
            $("#shop").DataTable().ajax.reload();
          }, "json");
        });
      });

      $$("#simpan").on("click", function () {
        app.input.validateInputs("#edit_food_marketplace");
        if ($$("#edit_food_marketplace")[0].checkValidity() == true) {
          if (datauser.role_id == 4) {
            let form_data = app.form.convertToData("#edit_food_marketplace");

            let ajax_data = new Array();
            ajax_data.push(iamthedoor);
            ajax_data.push(form_data);
            ajax_data.push(kode_toko);
            ajax_data.push(sub_food);

            app.request.post(site_url_mobile_layanan + "/seller_marketplace/update_produk_marketplace/" + id + '/' + tipe, ajax_data, function (response) {
              // app.dialog.close();
              mainView.router.back();
              $("#shop").DataTable().ajax.reload();
              app.dialog.alert(response);
            }, "json");
          }
        }
      });
    },
  },
};

var all_produk = {
  path: "/tipe-f/seller_marketplace/all_produk/:kode",
  url: "./pages/tipe-f/seller/all_produk.html",
  name: "all_produk",
  on: {
    pageInit: function () {
      const kode = mainView.router.currentRoute.params.kode;
      $$('.title').html('Semua Produk');
      if (kode == 1) {
        $$('.title').html('Semua Jasa');
      }
      var post = new Array();
      post.push(iamthedoor);
      post.push(10);
      post.push(0);
      app.request.post(site_url_mobile_layanan + "/seller_marketplace/all_produk/" + kode, post, function (callback) {
        var setup_produk = '';
        callback.product.forEach(function (item, index) {
          setup_produk += '<div class="col-50"><center>' +
            '<a href="/tipe-f/product/' + item.id + '" class="link">' +
            '<div class="card">' +
            '<div class="card-header">' +
            '<img src="' + site_url_image_layanan + item.foto + '" style="width: 100%; height: 100%;">' +
            '</div>' +
            '<div class="card-outline">' +
            '<div class="card-content card-content-padding">' +
            '<p class="title" style="color: #000000;">' +
            item.nama +
            '</p>' +
            '<p class="title text-color-black" style="margin-top: 3px;"> Rp.<span>' + item.harga + '</span>' +
            '</p>' +
            // '<p class="title text-align-right text-color-black" style="font-size:small;">' +
            //   'Terjual 421' +
            // '</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</a>' +
            '</center></div>';
        });
        $$('.list .row').append(setup_produk);

        var allowInfinite = true;

        var lastItemIndex = $$('.list .col-50').length;

        var maxItems = callback.count;

        var itemsPerLoad = 10;

        $$('.infinite-scroll-content').on('infinite', function () {
          if (!allowInfinite) return;

          allowInfinite = false;

          setTimeout(function () {
            allowInfinite = true;

            if (lastItemIndex >= maxItems) {
              app.infiniteScroll.destroy('.infinite-scroll-content');
              $$('.infinite-scroll-preloader').remove();
              return;
            }

            var post = new Array();
            post.push(iamthedoor);
            post.push(itemsPerLoad);
            post.push(lastItemIndex);
            app.request.post(site_url_mobile_layanan + "/seller_marketplace/all_produk/" + kode, post, function (callback) {
              var html = '';
              callback.product.forEach(function (item, index) {
                html += '<div class="col-50"><center>' +
                  '<a href="/tipe-f/product/' + item.id + '" class="link">' +
                  '<div class="card">' +
                  '<div class="card-header">' +
                  '<img src="' + site_url_image_layanan + item.foto + '" style="width: 100%; height: 100%;">' +
                  '</div>' +
                  '<div class="card-outline">' +
                  '<div class="card-content card-content-padding">' +
                  '<p class="title" style="color: #000000;">' +
                  item.nama +
                  '</p>' +
                  '<p class="title text-color-black" style="margin-top: 3px;"> Rp.<span>' + item.harga + '</span>' +
                  '</p>' +
                  // '<p class="title text-align-right text-color-black" style="font-size:small;">' +
                  //   'Terjual 421' +
                  // '</p>' +
                  '</div>' +
                  '</div>' +
                  '</div>' +
                  '</a>' +
                  '</center></div>';
              });
              $$('.list .row').append(html);
            }, 'json');

            lastItemIndex = $$('.list .col-50').length;
          }, 1000);
        });
        // $('#all-produk').html(html);
        $('#all-produk').show();
      }, 'json');
    }
  }
}

function popup_tambah_pengiriman_data(tipe = 0) {
  var stok = '';
  if (tipe == 0) {
    stok = `<li class="item-content item-input">
      <div class="item-inner">
        <div class="item-input-wrap">
          <div class="item-title item-label">Stok</div>
          <input type="number" name="sisa_stok">
          <span class="input-clear-button"></span>
        </div>
      </div>
    </li>`;
  }

  var popup_anggota = app.popup.create({
    content:
      '<div class="popup page-content">' +
      '<div class="block">' +
      '<form class="list" id="tambah_anggota_pengunduran" data-id="null">' +
      '<div class="block-title">' +
      '<div class="row">' +
      '<div class="col-100">' +
      '<div class="chip color-blue">' +
      '<div class="chip-label">Form Tambah Variasi Produk</div>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "<ul>" +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Nama</div>' +
      '<input type="text" name="variasi">' +
      '<span class="input-clear-button"></span>' +
      "</div>" +
      "</div>" +
      "</li>" +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Harga</div>' +
      '<input type="number" name="harga">' +
      '<span class="input-clear-button"></span>' +
      "</div>" +
      "</div>" +
      "</li>" +
      stok +
      '<input type="hidden" name="status" value="tersimpan">' +
      "</ul>" +
      "</form>" +
      '<div class="row">' +
      '<div class="col-40">' +
      '<a class="button button-round popup-close button-fill color-red" style="margin-top: 10px;">' +
      '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Batal</span>' +
      "</a>" +
      "</div>" +
      '<div class="col-60">' +
      '<a class="button button-round popup-close button-fill color-green" id="save_anggota" style="margin-top: 10px;">' +
      '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
      "</a>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>",
    on: {
      open: function (popup) { },
    },
  });
  popup_anggota.open();
  $$("#save_anggota").on("click", function () {
    popup_anggota.close();
    if ($("#tambah_anggota_pengunduran").data("id") !== null) {
      anggota_id = $("#tambah_anggota_pengunduran").data("id");
      anggota_pengunduran[anggota_id] = app.form.convertToData("#tambah_anggota_pengunduran");
    } else {
      anggota_pengunduran.push(app.form.convertToData("#tambah_anggota_pengunduran"));
    }
    reload_pengiriman_data_table(anggota_pengunduran, tipe);
  });
}

function popup_tambah_sub_food(idx = null) {
  let index = sub_food.length;

  if (typeof idx == 'number') index = idx;

  var popup_food = app.popup.create({
    content:
      '<div class="popup page-content">' +
      '<div class="block">' +
      '<form class="list" id="tambah_sub_food" data-id="null">' +
      '<div class="block-title">' +
      '<div class="row">' +
      '<div class="col-100">' +
      '<div class="chip color-blue">' +
      '<div class="chip-label">Form Tambah Variasi Produk</div>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "<ul>" +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Nama</div>' +
      '<input type="text" name="variasi">' +
      '<span class="input-clear-button"></span>' +
      "</div>" +
      "</div>" +
      "</li>" +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Harga</div>' +
      '<input type="number" name="harga">' +
      '<span class="input-clear-button"></span>' +
      "</div>" +
      "</div>" +
      "</li>" +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Stok</div>' +
      '<input type="number" name="sisa_stok">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li>' +
      '<div id="formupload-wrapper">' +
      '<ul id="formupload-wrapper-list">' +
      '<li data-index="' + index + '">' +
      '<ul>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="row">' +
      '<div class="col-60">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Foto</div>' +
      '<input id="fileid' + index + '" class="fileid" type="hidden" name="fileid[' + index + ']">' +
      '<input class="filecode" id="filecode' + index + '" type="hidden" readonly="" name="filecode">' +
      '<input class="fileurl" id="fileurl' + index + '" type="text" readonly="" name="fileurl[' + index + ']"placeholder="URL file">' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="col-20 preview_files">' +
      '</div>' +
      '<div class="col-20">' +
      '<a id="' + index + '" onclick="uploadfile(this.id)" class="button button-round button-fill" style="margin-top: 10px;">' +
      '<i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i>' +
      '</a>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '</ul>' +
      '</li>' +
      '</ul>' +
      '</div>' +
      '</li>' +
      '<input type="hidden" name="status" value="tersimpan">' +
      "</ul>" +
      "</form>" +
      '<div class="row">' +
      '<div class="col-40">' +
      '<a class="button button-round popup-close button-fill color-red" style="margin-top: 10px;">' +
      '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Batal</span>' +
      "</a>" +
      "</div>" +
      '<div class="col-60">' +
      '<a class="button button-round popup-close button-fill color-green" id="save_food" style="margin-top: 10px;">' +
      '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
      "</a>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>",
    on: {
      open: function (popup) { },
    },
  });
  popup_food.open();
  $$("#save_food").on("click", function () {
    if (!$('.filecode').val().length) {
      app.dialog.alert("Mohon isi Foto");
      return false;
    }

    popup_food.close();
    if ($("#tambah_sub_food").data("id") !== null) {
      food_id = $("#tambah_sub_food").data("id");
      sub_food[food_id] = app.form.convertToData("#tambah_sub_food");
    } else {
      sub_food.push(app.form.convertToData("#tambah_sub_food"));
    }
    reload_sub_food_table(sub_food);
  });
}

function reload_pengiriman_data_table(anggota_pengunduran_key, tipe = 0) {
  anggota_pengunduran_key = anggota_pengunduran_key;
  var anggota_pengunduran_html = "<tr><td></td><td>Data Kosong</td><td></td></tr>";
  $$("#anggota_pengunduran_table table tbody").html(anggota_pengunduran_html);
  var anggota_pengunduran_row = "";
  var stok = '';
  for (var i = 0; i < anggota_pengunduran_key.length; i++) {
    if (anggota_pengunduran_key[i].status == "tersimpan") {
      if (tipe == 0) {
        stok = `<td class="label-cell">${anggota_pengunduran_key[i].sisa_stok}</td>`;
      }
      anggota_pengunduran_row +=
        "<tr>" +
        '<td class="label-cell aksi-table" style="padding: 0 8px;"><a data-id="' +
        [i] +
        '" class="edit_anggota button button-small color-blue button-fill">EDIT</a></td>' +
        '<td class="label-cell aksi-table" style="padding: 0 8px;"><a data-id="' +
        [i] +
        '"  class="hapus_anggota button color-red button-fill button-small">HAPUS</a></td>' +
        '<td class="label-cell">' +
        anggota_pengunduran_key[i].variasi +
        "</td>" +
        '<td class="label-cell">' +
        anggota_pengunduran_key[i].harga +
        "</td>" +
        stok;
    }
  }
  if (anggota_pengunduran_row !== "") {
    $$("#anggota_pengunduran_table table tbody").html(anggota_pengunduran_row);
  }
  $$(".hapus_anggota").on("click", function () {
    anggota_id = $(this).data("id");
    app.dialog.confirm("Apakah anda yakin Menghapus data?", function () {
      anggota_pengunduran_key[anggota_id].status = "terhapus";
      reload_pengiriman_data_table(anggota_pengunduran_key, tipe);
    });
  });
  $$(".edit_anggota").on("click", function () {
    anggota_id = $(this).data("id");
    app.dialog.confirm("Apakah anda yakin akan merubah data?", function () {
      popup_tambah_pengiriman_data(tipe);
      $$("#tambah_anggota_pengunduran").attr("data-id", anggota_id);
      $$("input[name='variasi']").val(anggota_pengunduran_key[anggota_id].variasi);
      $$("input[name='harga']").val(anggota_pengunduran_key[anggota_id].harga);
      $$("input[name='sisa_stok']").val(anggota_pengunduran_key[anggota_id].sisa_stok);
    });
  });
}

function reload_sub_food_table(sub_food_key) {
  sub_food_key = sub_food_key;
  var sub_food_html = "<tr><td></td><td>Data Kosong</td><td></td></tr>";
  $$("#sub_food_table table tbody").html(sub_food_html);
  var sub_food_row = "";
  for (var i = 0; i < sub_food_key.length; i++) {
    if (sub_food_key[i].status == "tersimpan") {
      sub_food_row +=
        "<tr>" +
        '<td class="label-cell aksi-table" style="padding: 0 8px;"><a data-id="' +
        [i] +
        '" class="edit_sub_food button button-small color-blue button-fill">EDIT</a></td>' +
        '<td class="label-cell aksi-table" style="padding: 0 8px;"><a data-id="' +
        [i] +
        '"  class="hapus_sub_food button color-red button-fill button-small">HAPUS</a></td>' +
        '<td class="label-cell">' +
        sub_food_key[i].variasi +
        "</td>" +
        '<td class="label-cell">' +
        sub_food_key[i].harga +
        "</td>" +
        '<td class="label-cell">' + sub_food_key[i].sisa_stok + '</td>' +
        '<td class="label-cell">' + sub_food_key[i]['fileurl[' + i + ']'] + '</td>';
    }
  }
  if (sub_food_row !== "") {
    $$("#sub_food_table table tbody").html(sub_food_row);
  }
  $$(".hapus_sub_food").on("click", function () {
    sub_food_id = $(this).data("id");
    app.dialog.confirm("Apakah anda yakin Menghapus data?", function () {
      sub_food_key[sub_food_id].status = "terhapus";
      reload_sub_food_table(sub_food_key);
    });
  });

  $$(".edit_sub_food").on("click", function () {
    sub_food_id = $(this).data("id");
    app.dialog.confirm("Apakah anda yakin akan merubah data?", function () {
      popup_tambah_sub_food(sub_food_id);
      $$("#tambah_sub_food").attr("data-id", sub_food_id);
      $$("input[name='variasi']").val(sub_food_key[sub_food_id].variasi);
      $$("input[name='harga']").val(sub_food_key[sub_food_id].harga);
      $$("input[name='sisa_stok']").val(sub_food_key[sub_food_id].sisa_stok);
      $$("input[name='filecode']").val(sub_food_key[sub_food_id].filecode);
      $$("input[name^='fileurl']").val(sub_food_key[sub_food_id]['fileurl[' + sub_food_id + ']']);

      if (sub_food_key[sub_food_id]['fileid[' + sub_food_id + ']']) {
        var preview_files = '<a id="' + sub_food_id + '" onclick="preview_files(' + sub_food_key[sub_food_id]['fileid[' + sub_food_id + ']'] + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
        $$('.preview_files').html(preview_files);
      }
    });
  });
}