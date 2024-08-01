tablename = "kt_market_product";

var list_all = {
    path: "/tipe-f/marketplace/list_all",
    url: "./pages/tipe-f/marketplace/index.html",
    name: "all_produk",
    on: {
      pageInit: function(){
        app.request.post(site_url_mobile_layanan + "/marketplace/kategori_byid", iamthedoor,
        function(callback){
            var list_kategori = '';
            // if(Array.isArray(callback)){
                list_kategori += '<div class="row">';
                callback.forEach(function(item, index){
                    list_kategori +=  '<div class="col-33">' +
                        '<a href="/tipe-f/marketplace/kategori_produk/'+ item.id +'">' +
                            '<center>' +
                                '<div class="card">' +
                                    '<div class="card-content card-content-padding">' +
                                        // '<img src="'+ site_url_image_layanan + item.icons +'" style="width: 100%; height: 100%;">' +
                                        '<img src="' + base_url + "/assets/images/portfolio/tipe_f/" + item.icons +'" style="width: 100%; height: 100%;">' +
                                    '</div>' +
                                '</div>' +
                                '<h5>' + item.nama +'</h5>' +
                            '</center>' +
                        '</a>' +
                    '</div>';
                });
                list_kategori += '</div>';
            // }
            $('#kategori_produk').html(list_kategori);
            $('#kategori_produk').show();
        },'json');
        
        app.request.get(site_url_mobile_layanan + "/marketplace/rekomendasi_product", iamthedoor, 
        function(callback){
            var list_rekomendasi = '';
            list_rekomendasi += '<div class="row">';
            callback.forEach(function(item, index){
                list_rekomendasi += '<div class="col-50">' +
                    '<a class="link" href="/tipe-f/product/' + item.id + '">' +
                        // '<center>' +
                            '<div class="card">' +
                                '<div class="card-header">' +
                                    '<img src="'+ site_url_image_layanan + item.foto +'" style="width: 100%; height: 100%;">' +
                                '</div>' +
                                '<div class="card-outline">' +
                                    '<div class="card-content card-content-padding">' +
                                        '<p class="title" style="color: #000000;">' + item.nama + '</p>' +
                                        '<p class="title text-color-black" style="margin-top: 3px;">Rp .<span>' + item.harga +'</span> </p>' +
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
            list_rekomendasi += '</div>';
            $('#rekomendasi-result').html(list_rekomendasi);
            $('#rekomendasi-result').show();
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

        $$('#pencarian_produk').on('keyup search', delay(function (e) {
            cek_kata(this.value);
        }, 500));
        
        $$('#cari_produk').on('click', function() {
            cek_kata($$('#pencarian_produk').val());
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
                $('#search-results').html('');
                $('#search-results').hide();
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

            $('#search-results').html(list_produk + list_toko + kosong);
            $('#search-results').show();
            }, 'json');
        }
      }
    }
}

var kategori_produk = {
    path: "/tipe-f/marketplace/kategori_produk/:id",
    url: "./pages/tipe-f/marketplace/kategori_produk.html",
    name: "kategori_produk",
    on: {
        pageInit : function(){
            var id = mainView.router.currentRoute.params.id;
            app.request.get(site_url_mobile_layanan + "/marketplace/search/" + id, iamthedoor,
            function(callback){
                $('#kategori').html(callback.nama_kategori);
                var list_kategori_produk = '';
                list_kategori_produk += '<div class="row">';
                callback.product.forEach(function(item, index){
                    list_kategori_produk +=  '<div class="col-50">' +
                    '<a class="link" href="//'+ item.id +'">' +
                        '<div class="card">' +
                            '<div class="card-header">' +
                                '<img src="'+ site_url_image_layanan + item.foto +'" style="width: 100%; height: 100%;">' +
                            '</div>' +
                            '<div class="card-content card-content-padding">' +
                                '<p class="title">' + item.nama + '</p>' +
                                '<p class="title">Rp. ' + item.harga + '</p>' +
                            '</div>' +
                        '</div>' +
                    '</a>' +
                    '</div>';
                });
                list_kategori_produk += '</div>';
                $('#kategori-product').html(list_kategori_produk);
                $('#kategori-product').show();

                
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
    
            $$('#pencarian_produk').on('keyup search', delay(function (e) {
                cek_kata(this.value);
            }, 500));
            
            $$('#cari_produk').on('click', function() {
                cek_kata($$('#pencarian_produk').val());
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
                    $('#search-results').html('');
                    $('#search-results').hide();
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
    
                $('#search-results').html(list_produk + list_toko + kosong);
                $('#search-results').show();
                }, 'json');
            }
        }
    }
}
var keranjang = {
    path: "/tipe-f/marketplace/keranjang",
    url: "./pages/tipe-f/marketplace/keranjang.html",
    name: "keranjang",
    on: {
        pageInit : function(){
            app.request.post(site_url_mobile_layanan + "/marketplace/keranjang", iamthedoor,
            function(data){
                $$('#subtotal').html(': Rp ' + toIdrFormat(data.sub_total));
                $$('#totalpembayaran').html(': Rp ' + toIdrFormat(data.pembayaran));

                var keranjang = '';
                keranjang += '<ul>';
                data.keranjang.forEach(function(item,index){
                    keranjang += '<li class="item-content" id="keranjang-'+ item.id +'">' +
                    '<a href="/tipe-f/product/edit_produk_keranjang/' + item.id_product + '/' + item.id + '" class="link">' +
                        '<div class="item-media">' +
                            '<img src="'+ site_url_image_layanan + item.foto +'" width="44">' +
                        '</div>' +
                        '<div class="item-inner">' +
                            '<div class="item-title-row">' +
                                '<div class="item-title"><span>' + item.nama + '</span></div>' +
                            '</div>' +
                            '<div class="item-subtitle"> Variasi : <span>'+ item.variasi +'</span></div>' +
                            '<div class="item-subtitle"> Kuantitas : <span>'+ item.kuantitas +'</span></div>' +
                            '<div class="item-subtitle">Rp.<span>'+ toIdrFormat(item.harga) +'</span></div>' +
                        '</div>' +
                    '</a>' +
                    '<div class="absolute text-align-right" onclick="delete_keranjang('+ item.id +')" data-id="'+ item.id +'">&#10006;</div>' +
                    // '<div class="text-align-right">' +
                    //     '<h5 id="total-harga-list">Sub Total : Rp<span>'+ item.total +'</span></h5>' +
                    // '</div>' +
                    '</li>';
                });

                keranjang += '</ul>';
                $('#keranjang').html(keranjang);
	            $('#keranjang').show();
                
                // if(data.keranjang === ""){
                //     .hide();
                // }else{
                //     $('#checkout').html('Checkout');
                //     $('#checkout').show();
                // }
            },'json');
        }
        
    }
}
function delete_keranjang(id){
    app.request.post(site_url_mobile_layanan + '/marketplace/delete_keranjang/' +id , iamthedoor, function(response) {
        if (response.success) {
            $$('#keranjang-'+id).remove();
            $$('#subtotal').html(toIdrFormat(response.sub_total));
            $$('#totalpembayaran').html(toIdrFormat(response.sub_total));
            if (response.sub_total == '0') {
                app.dialog.alert('keranjang sudah kosong');
            }
            //  else {
            //     app.dialog.alert('keranjang masih ada barangnya');
            // }
        } else {
            app.dialog.alert(response.message);
        }
    }, 'json');
}