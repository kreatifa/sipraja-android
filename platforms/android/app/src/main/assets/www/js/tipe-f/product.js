var product_by_id = {
    path: '/tipe-f/product/:id',
    url: './pages/tipe-f/product/product_by_id.html',
    name: 'product_by_id',
    on: {
        pageInit: function () {
            var id = mainView.router.currentRoute.params.id
            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile_layanan + '/marketplace/product/' + id, iamthedoor, function (callback) {
                app.dialog.close();
                $$('#nama').html(callback.product.nama);
                // $$('#harga').html(callback.product.harga);
                $$('#deskripsi').html(callback.product.deskripsi);
                $$("#logo").attr("src", base_url + '/' + callback.logo_toko);
                $$("#detail_toko").attr("href", '/tipe-f/toko/' + callback.info_toko.kode_toko);
                $$('#variasi').val(callback.product_item.variasi);
                $$('#merk').html(callback.product_item[0].merk);
                $$('#bahan').html(callback.product_item[0].bahan);
                $$('#harga').html('Rp' + toIdrFormat(callback.product_item[0].harga));
                $$('#stock').val(callback.total_stok);
                $$('#nama_usaha').html(callback.info_toko.nama_usaha);
                $$('#detail_toko').attr("href", '/tipe-f/toko/' + callback.info_toko.kode_toko);
                var produk_id = callback.product.id;
                var variasi = '';
                callback.product_item.forEach(function (item, index) {
                    variasi +=
                        '<label style="margin-right:5px" class="radio"><input type="radio" value="' + item.id + '" name="radio_variasi" id="radio_variasi">' +
                        '<i class="icon-radio"></i>' + item.variasi +
                        '</label>'
                });

                $$('#variasi').html(variasi);


                $('#kuantitas_minus').on('click', function () {
                    var kuantitas_now = $('#kuantitas_input').val();
                    if (kuantitas_now > 1) {
                        kuantitas_now = parseInt(kuantitas_now) - 1;
                        $('#kuantitas_input').val(kuantitas_now);
                        console.log(kuantitas_now)
                    }
                });
                $('#kuantitas_plus').on('click', function () {
                    var kuantitas_now = $('#kuantitas_input').val();
                    // $$('#kuantitas_input').attr("max", $$('#stock').val());
                    if (kuantitas_now < parseInt($$('#stock').val())) {
                        kuantitas_now = parseInt(kuantitas_now) + 1;
                        $('#kuantitas_input').val(kuantitas_now);
                        console.log(kuantitas_now)
                        $("#kuantitas_input").attr("max", kuantitas_now);
                    }
                });

                $('input[name=radio_variasi]').change(function () {
                    var id_produk_item = $('input[name=radio_variasi]:checked').val();
                    $.post(site_url_mobile_layanan + '/marketplace/get_product_item/' + id_produk_item, iamthedoor, function (data) {
                        $$('#harga').html('Rp' + toIdrFormat(data.harga));
                        $$('#stock').val(data.sisa_stok);
                    }
                        , 'json');
                });


                var swiper = app.swiper.create('.swiper-container', {
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },

                    speed: 400,
                    spaceBetween: 40,
                    observer: true,
                });
                // var swiper = app.swiper.get('.swiper-container');

                // swiper.slideNext();
                var foto_produk = '';
                callback.foto_produk.forEach(function (item, index) {
                    foto_produk += `<div class="swiper-slide"><img
                    src="${site_url_image_layanan}/${item.file_actual}" width="100%" alt=""></div>`
                });

                $('#foto_produk').html(foto_produk);
                
                // var detail_foto = '';
                // detail_foto += '<div class="row">';
                // callback.foto_produk.forEach(function(item, index){
                //     detail_foto+= '<div class="col">' +
                //     '<div class="card" width="30%">' +
                //         '<img src="'+ site_url_image_layanan + '/'+ item.file_actual +'" width="30%" style="width: 30%; height: 30%;" >' +
                //     '</div>' +
                //     '</div>';
                // });
                // detail_foto += '</div>';
                // $('#fullimage').html(detail_foto);
                // $('#fullimage').show();
                $('#masukkan_keranjang').click(function(){
                    if ($('input[name=radio_variasi]:checked').val() == null) {
                        $$('.open-alert').on('click', function () {
                            app.dialog.alert('Mohon pilih variasi produk terlebih dahulu');
                          });
                        return false;
                    }

                    let produk = {
                        'id_produk': produk_id,
                        'variasi': $('input[name=radio_variasi]:checked').val(),
                        'kuantitas': $('#kuantitas_input').val(),
                    };
                    ajax_data = new Array();
                    ajax_data.push(iamthedoor);
                    ajax_data.push(produk);
                    
                    app.request.post(site_url_mobile_layanan + '/marketplace/masukkan_keranjang', ajax_data, function(data){
                        app.dialog.close();
                        if (data.success) {
                            app.dialog.alert(data.message);
                        } else {
                            app.dialog.alert(data.message);
                        }
                    }, 'json');
                });

            }, function () {
                app.dialog.close();
                app.dialog.alert('Gagal Mendapatkan Data Anda, Mohon Coba Lagi Nanti');
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
    
            $$('#pencarian').on('keyup search', delay(function (e) {
                cek_kata(this.value);
            }, 500));
            
            $$('#cari_produk').on('click', function() {
                cek_kata($$('#pencarian').val());
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
                    $('#search-proto-id').html('');
                    $('#search-proto-id').hide();
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
    
                $('#search-proto-id').html(list_produk + list_toko + kosong);
                $('#search-proto-id').show();
                }, 'json');
            }
        }
    }
}

var edit_produk_keranjang = {
    path: '/tipe-f/product/edit_produk_keranjang/:id_product/:id',
    url: './pages/tipe-f/product/edit_produk_keranjang.html',
    name: 'edit_produk_keranjang',
    on: {
        pageInit: function () {
            var id = mainView.router.currentRoute.params.id;
            var id_product = mainView.router.currentRoute.params.id_product;
            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile_layanan + '/marketplace/get_produk_keranjang/' + id_product, iamthedoor, function (callback) {
                console.log(callback);
                app.dialog.close();
                $$('#title_produk_keranjang').html('Edit Produk ' + callback.product.nama);
                $$('#nama').html(callback.product.nama);
                $$('#deskripsi').html(callback.product.deskripsi);
                $$("#logo").attr("src", base_url + '/' + callback.logo_toko);
                $$("#detail_toko").attr("href", '/tipe-f/toko/' + callback.info_toko.kode_toko);
                $$('#variasi').val(callback.produk_keranjang.variasi);
                $$('#merk').html(callback.product_item[0].merk);
                $$('#bahan').html(callback.product_item[0].bahan);
                $$('#harga').html('Rp' + toIdrFormat(callback.product_item[0].harga));
                $$('#stock').val(callback.total_stok);
                $$('#nama_usaha').html(callback.info_toko.nama_usaha);
                var produk_id = callback.product.id;
                var variasi = '';
                callback.product_item.forEach(function (item, index) {
                    variasi +=
                        '<label style="margin-right:5px" class="radio"><input type="radio" value="' + item.id + '" name="radio_variasi" id="radio_variasi">' +
                        '<i class="icon-radio"></i>' + item.variasi +
                        '</label>'
                });

                $$('#variasi').html(variasi);
                
                $('#kuantitas_minus').on('click', function () {
                    var kuantitas_now = $('#kuantitas_input').val();
                    if (kuantitas_now > 1) {
                        kuantitas_now = parseInt(kuantitas_now) - 1;
                        $('#kuantitas_input').val(kuantitas_now);
                        console.log(kuantitas_now)
                    }
                })
                $('#kuantitas_plus').on('click', function () {
                    var kuantitas_now = $('#kuantitas_input').val();
                    // $$('#kuantitas_input').attr("max", $$('#stock').val());
                    if (kuantitas_now < parseInt($$('#stock').val())) {
                        kuantitas_now = parseInt(kuantitas_now) + 1;
                        $('#kuantitas_input').val(kuantitas_now);
                        console.log(kuantitas_now)
                        $("#kuantitas_input").attr("max", kuantitas_now);
                    }
                });

                $('input[name=radio_variasi]').change(function () {
                    var id_produk_item = $('input[name=radio_variasi]:checked').val();
                    $.post(site_url_mobile_layanan + '/marketplace/get_product_item/' + id_produk_item, iamthedoor, function (data) {
                        $$('#harga').html('Rp' + toIdrFormat(data.harga));
                        $$('#stock').val(data.sisa_stok);
                    }
                        , 'json');
                });


                var swiper = app.swiper.create('.swiper-container', {
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },

                    speed: 400,
                    spaceBetween: 40,
                    observer: true,
                });
                // var swiper = app.swiper.get('.swiper-container');

                // swiper.slideNext();
                var foto_produk = '';
                callback.foto_produk.forEach(function (item, index) {
                    foto_produk += `<div class="swiper-slide"><img
                    src="${site_url_image_layanan}/${item.file_actual}" width="100%" alt=""></div>`
                });

                $('#foto_produk').html(foto_produk);

                $('#masukkan_keranjang').click(function(){
                    if ($('input[name=radio_variasi]:checked').val() == null) {
                        $$('.open-alert').on('click', function () {
                            app.dialog.alert('Mohon pilih variasi produk terlebih dahulu');
                          });
                        return false;
                    }

                    let produk = {
                        'id_produk': produk_id,
                        'variasi': $('input[name=radio_variasi]:checked').val(),
                        'kuantitas': $('#kuantitas_input').val(),
                    };
                    ajax_data = new Array();
                    ajax_data.push(iamthedoor);
                    ajax_data.push(produk);
                    
                    app.request.post(site_url_mobile_layanan + '/marketplace/masukkan_keranjang', ajax_data, function(data){
                        app.dialog.close();
                        if (data.success) {
                            app.dialog.alert(data.message);
                        } else {
                            app.dialog.alert(data.message);
                        }
                    }, 'json');
                });

            }, function () {
                app.dialog.close();
                app.dialog.alert('Gagal Mendapatkan Data Anda, Mohon Coba Lagi Nanti');
            }, 'json');
            $$('#simpan').on('click', function(){
                let ajax_data = new Array();
                let produk = {
                    'variasi': $('input[name=radio_variasi]:checked').val(),
                    'kuantitas': $('#kuantitas_input').val(),
                };
                ajax_data.push(iamthedoor);
                ajax_data.push(produk);
                app.request.post(site_url_mobile_layanan + "/marketplace/edit_produk_keranjang/" + id, ajax_data,
                function(){
                    app.dialog.close();
                    app.dialog.alert("Data Berhasil Diubah");
                    mainView.router.back();
                    $("#keranjang_reload").location.reload();
                }, function(){
                    app.dialog.close();
                    mainView.router.back();
                    $("#keranjang_reload").location.reload();
                    app.dialog.alert("Data Gagal Diubah");
                },'json');
            })
        }
    }
}

var product_toko = {
    path: '/tipe-f/product/toko/:id',
    url: './pages/tipe-f/toko/product_toko.html',
    name: 'product_toko',
    on: {
        pageInit: function () {
            var id = mainView.router.currentRoute.params.id
            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile_layanan + '/marketplace/product/' + id, iamthedoor, function (callback) {
                app.dialog.close();
                $$('#nama').html(callback.product.nama);
                $$('#deskripsi').html(callback.product.deskripsi);
                $$("#logo").attr("src", base_url + '/' + callback.logo_toko);
                $$("#detail_toko").attr("href", '/tipe-f/toko/' + callback.info_toko.kode_toko);
                $$('#variasi').val(callback.product_item.variasi);
                $$('#merk').html(callback.product_item[0].merk);
                $$('#bahan').html(callback.product_item[0].bahan);
                $$('#harga').html('Rp' + toIdrFormat(callback.product_item[0].harga));
                $$('#stock').val(callback.total_stok);
                $$('#nama_usaha').html(callback.info_toko.nama_usaha);
                $$('#detail_toko').attr("href", '/tipe-f/toko/' + callback.info_toko.kode_toko);
                var produk_id = callback.product.id;
                var variasi = '';
                callback.product_item.forEach(function (item, index) {
                    variasi +=
                        '<label style="margin-right:5px" class="radio"><input type="radio" value="' + item.id + '" name="radio_variasi" id="radio_variasi">' +
                        '<i class="icon-radio"></i>' + item.variasi +
                        '</label>'
                });

                $$('#variasi').html(variasi);


                $('#kuantitas_minus').on('click', function () {
                    var kuantitas_now = $('#kuantitas_input').val();
                    if (kuantitas_now > 1) {
                        kuantitas_now = parseInt(kuantitas_now) - 1;
                        $('#kuantitas_input').val(kuantitas_now);
                        console.log(kuantitas_now)
                    }
                });
                $('#kuantitas_plus').on('click', function () {
                    var kuantitas_now = $('#kuantitas_input').val();
                    // $$('#kuantitas_input').attr("max", $$('#stock').val());
                    if (kuantitas_now < parseInt($$('#stock').val())) {
                        kuantitas_now = parseInt(kuantitas_now) + 1;
                        $('#kuantitas_input').val(kuantitas_now);
                        console.log(kuantitas_now)
                        $("#kuantitas_input").attr("max", kuantitas_now);
                    }
                });

                $('input[name=radio_variasi]').change(function () {
                    var id_produk_item = $('input[name=radio_variasi]:checked').val();
                    $.post(site_url_mobile_layanan + '/marketplace/get_product_item/' + id_produk_item, iamthedoor, function (data) {
                        $$('#harga').html('Rp' + toIdrFormat(data.harga));
                        $$('#stock').val(data.sisa_stok);
                    }
                        , 'json');
                });


                var swiper = app.swiper.create('.swiper-container', {
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },

                    speed: 400,
                    spaceBetween: 40,
                    observer: true,
                });
                var foto_produk = '';
                callback.foto_produk.forEach(function (item, index) {
                    foto_produk += `<div class="swiper-slide"><img
                    src="${site_url_image_layanan}/${item.file_actual}" width="100%" alt=""></div>`
                });

                $('#foto_produk').html(foto_produk);

                $('#masukkan_keranjang').click(function(){
                    if ($('input[name=radio_variasi]:checked').val() == null) {
                        $$('.open-alert').on('click', function () {
                            app.dialog.alert('Mohon pilih variasi produk terlebih dahulu');
                          });
                        return false;
                    }

                    let produk = {
                        'id_produk': produk_id,
                        'variasi': $('input[name=radio_variasi]:checked').val(),
                        'kuantitas': $('#kuantitas_input').val(),
                    };
                    ajax_data = new Array();
                    ajax_data.push(iamthedoor);
                    ajax_data.push(produk);
                    
                    app.request.post(site_url_mobile_layanan + '/marketplace/masukkan_keranjang', ajax_data, function(data){
                        app.dialog.close();
                        if (data.success) {
                            app.dialog.alert(data.message);
                        } else {
                            app.dialog.alert(data.message);
                        }
                    }, 'json');
                });

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
    
            $$('#pencarian').on('keyup search', delay(function (e) {
                cek_kata(this.value);
            }, 500));
            
            $$('#cari_produk').on('click', function() {
                cek_kata($$('#pencarian').val());
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
                    $('#search-market').html('');
                    $('#search-market').hide();
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
    
                $('#search-market').html(list_produk + list_toko + kosong);
                $('#search-market').show();
                }, 'json');
            }
        }
    }
}