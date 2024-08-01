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
                var kode_toko = callback.info_toko.kode_toko;
                $$('#nama_toko').html(callback.info_toko.nama_usaha);
                $$('#telp_toko').html('<i style="border: 1px;" class="f7-icons">phone</i> ' + callback.info_toko.telp);
                $$('#alamat_toko').html('<i style="border: 1px;" class="f7-icons">house</i> ' + callback.info_toko.alamat_usaha);
                $$('#deskripsi_toko').html(callback.info_toko.deskripsi);
                $$("#logo_toko").attr("src", base_url + '/' + callback.logo_toko);
                
                $$("#all_produk_toko").attr("href", "/tipe-f/shop/all_produk_toko/" + kode_toko + '/0');
                $$("#all_jasa_toko").attr("href", "/tipe-f/shop/all_produk_toko/" + kode_toko + '/1');

                // kategoriPerToko
                var kategoriPerToko = '';

                kategoriPerToko += '<div class="row">';

                callback.kategori.forEach(function (item, index) {
                    kategoriPerToko += '<div class="col-33">' +
                        '<a class="link" href="/tipe-f/toko/' + callback.info_toko.kode_toko + '/' + item.id + '">' +
                        '<center>' +
                        '<div class="card">' +
                        '<div class="card-content-padding">' +
                        '<img src="' + base_url + "/assets/images/portfolio/tipe_f/" + item.icons + '" style="width: 100%; height: 100%;">' +
                        '</div>' +
                        '</div>' +
                        '<span>' + item.nama + '</span>' +
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
                        <a class="link" href="/tipe-f/product/${item.id}">
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
                                </div>
                            </center>
                        </a>
                    </div>`
                });
                produkPerToko +=
                    '</div>';

                $$('#produkPerToko').html(produkPerToko);

                // jasaPerToko
                var jasaPerToko = '';

                jasaPerToko +=
                    '<div class="row">';

                callback.jasa.forEach(function (item, index) {
                    jasaPerToko +=
                        `<div class="col-50">
                        <a class="link" href="/tipe-f/jasa/${item.id}">
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
                                </div>
                            </center>
                        </a>
                    </div>`
                });
                jasaPerToko +=
                    '</div>';

                $$('#jasaPerToko').html(jasaPerToko);

                // foodPerToko
                var foodPerToko = '';

                foodPerToko +=
                    '<div class="row">';

                callback.food.forEach(function (item, index) {
                    foodPerToko +=
                        `<div class="col-50">
                        <a class="link" href="/tipe-f/food/${item.id}">
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
                                </div>
                            </center>
                        </a>
                    </div>`
                });
                foodPerToko +=
                    '</div>';

                $$('#foodPerToko').html(foodPerToko);
            }, 'json');
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
            app.request.post(site_url_mobile_layanan + '/marketplace/produkPerKategori/' + kode_toko + '/' + kategori, iamthedoor, function (data) {
                $$('#produk_kategori').html('Produk ' + data.info_toko.nama_usaha)
                $$('#judul').html('Kategori ' + data.kategori.nama)
                
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

var all_product_toko = {
    path: '/tipe-f/shop/all_produk_toko/:kode_toko/:type',
    url: './pages/tipe-f/toko/all_product_toko.html',
    name: 'all_product_toko',
    on: {
        pageInit: function () {
            let kode_toko   = mainView.router.currentRoute.params.kode_toko;
            let type        = mainView.router.currentRoute.params.type;
            $$('#judul').html('Semua produk toko');
            if(type == 1){
                $$('#judul').html('Semua jasa toko');
            }
            var post = new Array();
            post.push(iamthedoor);
            post.push(10);
            post.push(0);
            post.push(kode_toko);
            app.request.post(site_url_mobile_layanan + "/seller_marketplace/all_produk_toko/" + type, post, function (callback) {
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
                        post.push(kode_toko);
                        app.request.post(site_url_mobile_layanan + "/seller_marketplace/all_produk_toko/" + type, post, function (callback) {
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

                        // Update last loaded index
                        lastItemIndex = $$('.list .col-50').length;
                    }, 1000);
                });
                $('#all-produk').show();
            }, 'json');
        }
    }
}