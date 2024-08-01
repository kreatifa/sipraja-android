tablename = "kt_market_product";

var seller_marketplace = {
  path: "/tipe-f/seller_marketplace",
  url: "./pages/tipe-f/seller/index.html",
  name: "seller_marketplace",
  on: {
    pageInit: function () {
      var datatables = $("#datatables").DataTable({
        ajax: {
          url: site_url_mobile_layanan + "/seller_marketplace/get_toko",
          data: iamthedoor,
          type: "GET",
        },
        columns: [{ data: "kode_toko" }, { data: "kode_toko" }, { data: "nama_usaha" }, { data: "kelembagaan" }, { data: "jenis_usaha" }, { data: "alamat_usaha" }],
        initComplete: function (settings, json) {
          app.dialog.close();
          $$("#datatables_length").hide();
          $$("#datatables_filter").hide();
        },
        rowCallback: function (row, data) {
          $("td:eq(0)", row).html(
            '<a href="/tipe-f/seller_marketplace/shop/' +
              data.kode_toko +
              '" class="button button-small button-fill color-blue">' +
              '<i class="icon f7-icons" style="font-size: 12pt;">archivebox</i> Kelola Produk</a>'
          );
        },
      });
    },
  },
};
var shop = {
  path: "/tipe-f/seller_marketplace/shop/:kode_toko",
  url: "./pages/tipe-f/seller/shop.html",
  name: "shop",
  on: {
    pageInit: function () {
      var kode_toko = mainView.router.currentRoute.params.kode_toko;
      $$("#btnnew").attr("href", "/tipe-f/seller_marketplace/new_produk_marketplace/" + kode_toko);
      var datatables = $("#shop").DataTable({
        ajax: {
          url: site_url_mobile_layanan + "/seller_marketplace/get_product/" + kode_toko,
          data: iamthedoor,
          type: "GET",
        },
        columns: [{ data: "id" }, { data: "nama" }, { data: "variasi" }, { data: "harga" }, { data: "sisa_stok" }],
        initComplete: function (settings, json) {
          app.dialog.close();
          $$("#shop_length").hide();
          $$("#shop_filter").hide();
        },
        rowCallback: function (row, data) {
          $("td:eq(0)", row).html(
            '<a href="/tipe-f/seller_marketplace/edit_produk_marketplace/' +
              kode_toko +
              "/" +
              data.id +
              '" class="button button-small button-fill color-blue">' +
              '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>'
          );
        },
      });
    },
  },
};
var new_produk_marketplace = {
  path: "/tipe-f/seller_marketplace/new_produk_marketplace/:kode_toko",
  url: "./pages/tipe-f/seller/new_produk_marketplace.html",
  name: "new_produk_marketplace",
  on: {
    pageInit: function () {
      anggota_pengunduran = new Array();
      $$("#addpengunduranjkn").on("touchend", function () {
        popup_tambah_anggota_pengunduran();
      });
      $("#variasi-table").on("click", ".hapus-btn", function () {
        $(this)
          .parent()
          .parent()
          .hide("slow", function () {
            $(this).remove();
          });
      });
      app.request.post(site_url_mobile_layanan + "/seller_marketplace/kategori", iamthedoor,
      function(callback){
        var kategori = '';        
        callback.forEach(function(item, index){
          kategori += '<option value="'+ item.id +'">' + item.nama + '</option>';
        });
        $('#kategori').html(kategori);
        $('#kategori').show();
      },'json');
      $$("#addformupload").on("touchend", addrow);
      $$("#simpan").on("click", function () {
        app.input.validateInputs("#new_produk_marketplace");
        if ($$("#new_produk_marketplace")[0].checkValidity() == true) {
          if (anggota_pengunduran.length < 1) {
            app.dialog.alert('Mohon masukkan informasi penjualan terlebih dahulu.');
            return false;
          }
          var kode_toko = mainView.router.currentRoute.params.kode_toko;
          let form_data = app.form.convertToData("#new_produk_marketplace");
          ajax_data = new Array();
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);
          ajax_data.push(kode_toko);
          ajax_data.push(anggota_pengunduran);
          app.dialog.preloader("Loading...");
          app.request.post(
            site_url_mobile_layanan + "/seller_marketplace/save_produk",
            ajax_data,
            function (ajax_data) {
              app.dialog.close();
              if (ajax_data) {
                app.dialog.alert("Data Gagal Diajukan");
              }
              return false;
            },
            function (ajax_data) {
              app.dialog.close();
              app.dialog.alert("Data Berhasil Tersimpan");
              mainView.router.back();
              $("#shop").DataTable().ajax.reload();
            },
            "json"
          );
        }
      });
    },
  },
};
var edit_produk_marketplace = {
  path: "/tipe-f/seller_marketplace/edit_produk_marketplace/:kode_toko/:id",
  url: "./pages/tipe-f/seller/edit_produk_marketplace.html",
  name: "edit_produk_marketplace",
  on: {
    pageInit: function () {
      var id = mainView.router.currentRoute.params.id;
      var kode_toko = mainView.router.currentRoute.params.kode_toko;

      $$(".checked_approval_button").hide();
      if (datauser.role_id == "4" || tipe == "edit") {
        $$("#approval").hide();
      }

      anggota_pengunduran = new Array();
      $$("#addpengunduranjkn").on("touchend", function() {
        popup_tambah_anggota_pengunduran();
      });

      app.request.post(site_url_mobile_layanan + "/seller_marketplace/kategori", iamthedoor,
      function(callback){
        var kategori = '';        
        callback.forEach(function(item, index){
          kategori += '<option value="'+ item.id +'">' + item.nama + '</option>';
        });
        $('#kategori').html(kategori);
        $('#kategori').show();
      },'json');

      app.dialog.preloader("Loading...");
      app.request.post(
        site_url_mobile_layanan + "/seller_marketplace/get_kode/" + id,
        iamthedoor,
        function (callback) {
          var produk = callback.produk[0];
          app.dialog.close();
          $$("#nama_produk").val(produk.nama);
          $$("#deskripsi").val(produk.deskripsi);
          $$("#merk").val(produk.merk);
          $$("#bahan").val(produk.bahan);
          $$("#berat").val(produk.berat);
          $$("#kategori").val(produk.kategori);
          $$("#ukuran_paket_l").val(produk.ukuran_paket_l);
          $$("#ukuran_paket_p").val(produk.ukuran_paket_p);
          $$("#ukuran_paket_t").val(produk.ukuran_paket_t);
          anggota_pengunduran = callback.produk;
          for (var i = 0; i < anggota_pengunduran.length; i++) {
            anggota_pengunduran[i].status = 'tersimpan';
          }
          reload_anggota_pengunduran_table(anggota_pengunduran);

          var smartSelect = app.smartSelect.create({
            el: "#select2",
            on: {
              close: function () {
                console.log("Smart select opened");
              },
            },
          });
        },
        function () {
          app.dialog.close();
          app.dialog.alert("Gagal Mendapatkan Data Anda, Mohon Coba Lagi Nanti");
        },
        "json"
      );
      $$("#btndeletelayanan").html('<a class="button button-round button-fill color-red" id="deletelayanan" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Hapus Data</span></a>');
      $$("#deletelayanan").on("click", function () {
        app.dialog.preloader("Loading...");
        app.request.post(
          site_url_mobile_layanan + "/seller_marketplace/delete_produk_marketplace/" + id,
          iamthedoor,
          function () {
            app.dialog.close();
            app.dialog.alert("Data Gagal Dihapus");
            mainView.router.back();
            $("#shop").DataTable().ajax.reload();
          },
          function(){
            app.dialog.close();
            app.dialog.alert("Data Berhasil Dihapus");
            mainView.router.back();
            $("#shop").DataTable().ajax.reload();
          }, "json"
        );
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

            app.request.post(
              site_url_mobile_layanan + "/seller_marketplace/update_produk_marketplace/" + id,
              ajax_data,
              function () {
                app.dialog.close();
                app.dialog.alert("Data Gagal Diedit");
                mainView.router.back();
                $("#shop").DataTable().ajax.reload();
              },
              function () {
                // app.dialog.close();
                mainView.router.back();
                $("#shop").DataTable().ajax.reload();
                app.dialog.alert("Data Berhasil Diedit");
              },
              "json"
            );
          }
        }
      });
    },
  },
};
function popup_tambah_anggota_pengunduran() {
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
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Stok</div>' +
      '<input type="number" name="sisa_stok">' +
      '<span class="input-clear-button"></span>' +
      "</div>" +
      "</div>" +
      "</li>" +
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
      open: function (popup) {},
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
    reload_anggota_pengunduran_table(anggota_pengunduran);
  });
}

function reload_anggota_pengunduran_table(anggota_pengunduran_key) {
  anggota_pengunduran_key = anggota_pengunduran_key;
  anggota_pengunduran_html = "<tr><td></td><td>Data Kosong</td><td></td></tr>";
  $$("#anggota_pengunduran_table table tbody").html(anggota_pengunduran_html);
  anggota_pengunduran_row = "";
  for (var i = 0; i < anggota_pengunduran_key.length; i++) {
    if (anggota_pengunduran_key[i].status == "tersimpan") {
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
        '<td class="label-cell">' +
        anggota_pengunduran_key[i].sisa_stok +
        "</td>";
    }
  }
  if (anggota_pengunduran_row !== "") {
    $$("#anggota_pengunduran_table table tbody").html(anggota_pengunduran_row);
  }
  $$(".hapus_anggota").on("click", function () {
    anggota_id = $(this).data("id");
    app.dialog.confirm("Apakah anda yakin Menghapus data?", function () {
      anggota_pengunduran_key[anggota_id].status = "terhapus";
      reload_anggota_pengunduran_table(anggota_pengunduran_key);
    });
  });
  $$(".edit_anggota").on("click", function () {
    anggota_id = $(this).data("id");
    app.dialog.confirm("Apakah anda yakin akan merubah data?", function () {
      popup_tambah_anggota_pengunduran();
      $$("#tambah_anggota_pengunduran").attr("data-id", anggota_id);
      $$("input[name='variasi']").val(anggota_pengunduran_key[anggota_id].variasi);
      $$("input[name='harga']").val(anggota_pengunduran_key[anggota_id].harga);
      $$("input[name='sisa_stok']").val(anggota_pengunduran_key[anggota_id].sisa_stok);
    });
  });
}
var all_produk = {
  path: "/tipe-f/seller_marketplace/all_produk",
  url: "./pages/tipe-f/seller/all_produk.html",
  name: "all_produk",
  on: {
    pageInit: function(){
      var post = new Array();
      post.push(iamthedoor);
      post.push(10);
      post.push(0);
      app.request.post(site_url_mobile_layanan + "/seller_marketplace/all_produk", post, function(callback){
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
                    '<p class="title text-color-black" style="margin-top: 3px;"> Rp.<span>'+ item.harga +'</span>' +
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

        // Loading flag
        var allowInfinite = true;

        // Last loaded index
        var lastItemIndex = $$('.list .col-50').length;

        // Max items to load
        var maxItems = callback.count;

        // Append items per load
        var itemsPerLoad = 10;

        // Attach 'infinite' event handler
        $$('.infinite-scroll-content').on('infinite', function () {
          // Exit, if loading in progress
          if (!allowInfinite) return;

          // Set loading flag
          allowInfinite = false;

          // Emulate 1s loading
          setTimeout(function () {
            // Reset loading flag
            allowInfinite = true;

            if (lastItemIndex >= maxItems) {
              // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
              app.infiniteScroll.destroy('.infinite-scroll-content');
              // Remove preloader
              $$('.infinite-scroll-preloader').remove();
              return;
            }

            // Generate new items HTML
            var post = new Array();
            post.push(iamthedoor);
            post.push(itemsPerLoad);
            post.push(lastItemIndex);
            app.request.post(site_url_mobile_layanan + "/seller_marketplace/all_produk", post, function(callback){
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
                          '<p class="title text-color-black" style="margin-top: 3px;"> Rp.<span>'+ item.harga +'</span>' +
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
            },'json');

            // Update last loaded index
            lastItemIndex = $$('.list .col-50').length;
          }, 1000);
        });
        // $('#all-produk').html(html);
        $('#all-produk').show();
      },'json');
      
      var response = {
          'produk': [
              { "id": "1", "name": "Produk A" },
              { "id": "2", "name": "Produk B" },
              { "id": "3", "name": "Produk C" },
              { "id": "4", "name": "Produk D" },
          ],
          'toko': [
              { "id": "1", "name": "Toko 1", "img": "gambar" },
              { "id": "2", "name": "Toko 2", "img": "gambar" },
              { "id": "3", "name": "Toko 3", "img": "gambar" },
          ]
      }

      $$('#pencarian_produk_all_produk').on('keyup search', delay(function (e) {
          cek_kata(this.value);
      }, 500));
      
      $$('#cari_produk').on('click', function() {
          cek_kata($$('#pencarian_produk_all_produk').val());
      })
      
      function delay(callback, ms) {
          var timer = 0;
          return function() {
              var context = this, args = arguments;
              clearTimeout(timer);
              timer = setTimeout(function () {
                  callback.apply(context, args);
              }, ms || 0);
          };
      }
      
      function cek_kata(kata) {
          if (kata.length > 2) {
              pencarian(kata);
          } else {
              $('#search-all-produk').html('');
              $('#search-all-produk').hide();
          }
      }
      
      function pencarian(kata) {
        var ajax_data = new Array();
        ajax_data.push(iamthedoor);
        ajax_data.push(kata);

        app.request.post(site_url_mobile_layanan + '/marketplace/search_product', 
        ajax_data,
        function(callback) {
        var list_produk = '';
        if (callback.produk.length > 0) {
            // print header pencarian produk
            list_produk += '<div class="card">' +
                '<div class="card-header">' +
                    '<p class="title">Produk Ditemukan</p>' +
                '</div>';

                callback.produk.forEach(function(item, index) {
                list_produk += '<a href="/tipe-f/product/' + item.id + '">' +
                // list_produk += '<a href="' + site_url_mobile_layanan + '/marketplace/get_search_product/' + item.id + '">' +
                        '<div class="row">' +
                            '<div class="col-25">' +
                                '<img src="' + site_url_image_layanan + item.foto + '" style="width: 100%; height: 100%;">' +
                            '</div>' +
                            '<div class="col-75">' +
                                '<h4 class="title">' + item.nama + '</h4>' +
                            '</div>' +
                        '</div>' +
                    '</a>';
                });

            // print tutup header pencarian produk
            list_produk += '</div>';
        }

        var list_toko = '';
        if (callback.toko.length > 0) {
            // print header pencarian toko
            list_toko += '<div class="card">' +
                '<div class="card-header">' +
                    '<h3 class="title">Toko Ditemukan</h3>' +
                '</div>';

                callback.toko.forEach(function(item, index) {
                list_toko += '<a href="/tipe-f/toko/'+ item.kode_toko + '">' +
                        '<div class="row">' +
                            '<div class="col-25">' +
                                '<img src="' + site_url_image_layanan + item.logo + '" style="width: 100%; height: 100%;">' +
                            '</div>' +
                            '<div class="col-75">' +
                                '<h4 class="title">' + item.nama_usaha + '</h4>' +
                            '</div>' +
                        '</div>' +
                    '</a>';
                });

            // print tutup header pencarian toko
            list_toko += '</div>';
        }

        var kosong = '';
        if (callback.produk.length === 0 && callback.toko.length === 0) {
            kosong += '<div class="list-group" style="margin-bottom: 0px;">' +
                '<div class="list-group-item" style="margin-bottom: 0;">' +
                    '<h4 style="margin-bottom: 5px; margin-top: 10px;">Produk / Toko yang anda cari tidak ditemukan</h4>' +
                '</div>';
        }

        $('#search-all-produk').html(list_produk + list_toko + kosong);
        $('#search-all-produk').show();
        }, 'json');
      }
    }
  }
}