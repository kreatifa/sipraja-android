var detail_toko = {
    path: '/tipe-f/toko/:kode_toko',
    url: './pages/tipe-f/toko/detail_toko.html',
    name: 'detail_toko',
    on: {
        pageInit: function () {
            var kode_toko = mainView.router.currentRoute.params.kode_toko
            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile_layanan + '/marketplace/shop/' + kode_toko, iamthedoor, function (callback) {
                app.dialog.close();
                $$('#nama_toko').html(callback.info_toko.nama_usaha);
                $$('#telp_toko').html('<i style="border: 1px;" class="f7-icons">phone</i>' + callback.info_toko.telp);
                $$('#alamat_toko').html('<i style="border: 1px;" class="f7-icons">location</i>' + callback.info_toko.alamat_usaha);
                $$('#deskripsi_toko').html(callback.info_toko.deskripsi);
                $$("#logo_toko").attr("src", base_url + '/' + callback.logo_toko);

                // kategoriPerToko
                var kategoriPerToko = '';

                kategoriPerToko += '<div class="row">';

                callback.kategori.forEach(function (item, index) {
                    kategoriPerToko += '<div class="col-33">' +
                    '<a class="link" href="/tipe-f/toko/'+ callback.info_toko.kode_toko +'/'+ item.id +'">' +
                        '<center>' +
                            '<div class="card">' +
                                '<div class="card-content-padding">' +
                                    '<img src="' + base_url + "/assets/images/portfolio/tipe_f/" + item.icons +'" style="width: 100%; height: 100%;">' +
                                '</div>' +
                            '</div>' +
                            '<span>'+ item.nama +'</span>' +
                        '</center>' +
                    '</a>' +
                    '</div>';
                });

                kategoriPerToko += '</div>';

                $('#kategoriPerToko').html(kategoriPerToko);
                $('#kategoriPerToko').show();

                // produkPerToko
                var produkPerToko = '';

                produkPerToko +=
                    '<div class="row">';

                callback.produk.forEach(function (item, index) {
                    produkPerToko +=
                        `<div class="col-50">
                    <a class="link" href="/tipe-f/product/toko/${item.id}">
                        <center>
                            <div class="card">
                                <div class="card-header">
                                    <img src="${site_url_image_layanan}/${item.foto}" style="width: 100%; height: 100%;">
                                </div>
                                <div class="card-outline">
                                    <div class="card-content card-content-padding">
                                        <p class="title" style="color: #000000;">${item.nama}</p>
                                        <p class="title text-color-black" style="margin-top: 3px;">
                                            Rp .
                                            <span>${item.harga}</span>
                                        </p>
                                    </div>
                                </div>
                               <!-- <div align="right" style="font-size: 12px">
                                    <p>160 Terjual</p>
                                </div> -->
                            </div>
                        </center>
                    </a>
                </div>`
                });

                produkPerToko +=
                    '</div>';

                $$('#produkPerToko').html(produkPerToko);


            }, function () {
                app.dialog.close();
                app.dialog.alert('Gagal Mendapatkan Data, Mohon Coba Beberapa Saat Lagi')
            }, 'json');
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
    
            $$('#pencarian-ditoko').on('keyup search', delay(function (e) {
                cek_kata(this.value);
            }, 500));
            
            $$('#cari_produk').on('click', function() {
                cek_kata($$('#pencarian-ditoko').val());
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
                    $('#search-toko').html('');
                    $('#search-toko').hide();
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
                        list_produk += '<a href="' + site_url_mobile_layanan + '/marketplace/get_search_product/' + item.id + '">' +
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
                        list_toko += '<a href="/tipe-f/toko/'+ item.kode_toko +'">' +
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
    
                $('#search-toko').html(list_produk + list_toko + kosong);
                $('#search-toko').show();
                }, 'json');
            }
        }
    }
}

var produkPerkategori = {
    path: '/tipe-f/toko/:kode_toko/:kategori',
    url: './pages/tipe-f/toko/produkPerkategori.html',
    name: 'detail_toko',
    on: {
        pageInit: function () {
            var kode_toko = mainView.router.currentRoute.params.kode_toko
            var kategori = mainView.router.currentRoute.params.kategori
            // app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile_layanan + '/z_tes/produkPerKategori/' + kode_toko + '/' + kategori, iamthedoor, function (data) {
                $$('#produk_kategori').html('Produk ' + data.info_toko.nama_usaha)

                // produkPerKategori
                var produkPerKategori = '';

                produkPerKategori +=
                    '<div class="row">';

                data.produk.forEach(function (item, index) {
                    produkPerKategori +=
                        '<div class="col-50">' +
                        '<a class="link" href="/tipe-f/product/' + item.id + '">' +
                        // '<center>' +
                        '<div class="card">' +
                        '<div class="card-header">' +
                        '<img src="' + site_url_image_layanan + item.foto + '" style="width: 100%; height: 100%;">' +
                        '</div>' +
                        '<div class="card-outline">' +
                        '<div class="card-content card-content-padding">' +
                        '<p class="title" style="color: #000000;">' + item.nama + '</p>' +
                        '<p class="title text-color-black" style="margin-top: 3px;">Rp .<span>' + item.harga + '</span> </p>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        // '<div align="right" style="font-size: 12px">' +
                        //   '<p>160 Terjual</p>' +
                        // '</div>' +
                        // '</center>' +
                        '</a>' +
                        '</div>';

                });

                produkPerKategori +=
                    '</div>';

                $$('#produkPerKategori').html(produkPerKategori);

            }, function () {
                app.dialog.close();
                app.dialog.alert('Gagal Mendapatkan Data, Mohon Coba Beberapa Saat Lagi')
            }, 'json');
        }
    }
}