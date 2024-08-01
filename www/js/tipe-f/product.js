var product_by_id = {
    path: '/tipe-f/product/:id',
    url: './pages/tipe-f/product/product_by_id.html',
    name: 'product_by_id',
    on: {
        pageInit: function () {
            var id = mainView.router.currentRoute.params.id
            app.request.post(site_url_mobile_layanan + "/marketplace/notifikasi", iamthedoor, function (data) {
                $$('.check_keranjang').html(data);
            }, 'json');

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile_layanan + '/marketplace/product/' + id, iamthedoor, function (callback) {
                app.dialog.close();
                if (callback.info_toko.status_marketplace == 0) {
                    mainView.router.navigate('/tipe-f/marketplace/list_all')
                }
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
                    }
                });
                $('#kuantitas_plus').on('click', function () {
                    var kuantitas_now = $('#kuantitas_input').val();
                    // $$('#kuantitas_input').attr("max", $$('#stock').val());
                    if (kuantitas_now < parseInt($$('#stock').val())) {
                        kuantitas_now = parseInt(kuantitas_now) + 1;
                        $('#kuantitas_input').val(kuantitas_now);
                        $("#kuantitas_input").attr("max", kuantitas_now);
                    }
                });

                $('input[name=radio_variasi]').change(function () {
                    var id_produk_item = $('input[name=radio_variasi]:checked').val();
                    $.post(site_url_mobile_layanan + '/marketplace/get_product_item/' + id_produk_item, iamthedoor, function (data) {
                        $$('#harga').html('Rp' + toIdrFormat(data.harga));
                        $$('#stock').val(data.sisa_stok);
                        if (data.sisa_stok == 0) {
                            $$('#masukkan_keranjang').hide();
                        } else {
                            $$('#masukkan_keranjang').show();
                        }
                    }, 'json');
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
                    foto_produk += `<div class="swiper-slide">
                        <img src="${site_url_image_layanan}/${item.file_actual}" width="100%" alt="">
                    </div>`;
                });

                $('#foto_produk').html(foto_produk);

                $('#masukkan_keranjang').click(function () {
                    if ($('input[name=radio_variasi]:checked').length < 1) {
                        app.dialog.alert('Mohon pilih variasi produk terlebih dahulu');
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

                    app.request.post(site_url_mobile_layanan + '/marketplace/masukkan_keranjang', ajax_data, function (data) {
                        app.dialog.close();
                        if (data.success) {
                            app.dialog.alert(data.message, function () {
                                mainView.router.refreshPage();
                            });
                        } else {
                            app.dialog.alert(data.message);
                        }
                    }, 'json');
                });

            }, function () {
                app.dialog.close();
                app.dialog.alert('Gagal Mendapatkan Data Anda, Mohon Coba Lagi Nanti');
            }, 'json');

            $$('#pencarian').on('keyup search', delay(function (e) {
                cek_kata(this.value);
            }, 500));

            $$('#cari_produk').on('click', function () {
                cek_kata($$('#pencarian').val());
            })

            function delay(callback, ms) {
                var timer = 0;
                return function () {
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

                app.request.post(site_url_mobile_layanan + '/marketplace/search_product/0',
                    ajax_data,
                    function (callback) {
                        var list_produk = '';
                        if (callback.produk.length > 0) {
                            // print header pencarian produk
                            list_produk += '<div class="card">' +
                                '<div class="card-header">' +
                                '<p class="title">Produk Ditemukan</p>' +
                                '</div>';

                            callback.produk.forEach(function (item, index) {
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

                            callback.toko.forEach(function (item, index) {
                                list_toko += '<a href="/tipe-f/toko/' + item.kode_toko + '">' +
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

var jasa_by_id = {
    path: '/tipe-f/jasa/:id',
    url: './pages/tipe-f/product/jasa_by_id.html',
    name: 'jasa_by_id',
    on: {
        pageInit: function () {
            var id = mainView.router.currentRoute.params.id
            app.request.post(site_url_mobile_layanan + "/marketplace_jasa/notifikasi", iamthedoor, function (data) {
                $$('.check_keranjang').html(data);
            }, 'json');

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile_layanan + '/marketplace_jasa/jasa/' + id, iamthedoor, function (callback) {
                app.dialog.close();
                // if(callback.info_toko.status_marketplace == 0){
                //     mainView.router.navigate('/tipe-f/marketplace_jasa/list_all')
                // }
                $$('#nama').html(callback.product.nama);
                $$('#deskripsi').html(callback.product.deskripsi);
                $$('#kategori').html(callback.product.nama_kategori);
                $$("#logo").attr("src", base_url + '/' + callback.logo_toko);
                $$("#detail_toko").attr("href", '/tipe-f/toko/' + callback.info_toko.kode_toko);
                $$('#variasi').val(callback.product_item.variasi);
                $$('#harga').html('Rp' + toIdrFormat(callback.product_item[0].harga));
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

                $('input[name=radio_variasi]').change(function () {
                    var id_produk_item = $('input[name=radio_variasi]:checked').val();
                    $.post(site_url_mobile_layanan + '/marketplace_jasa/get_product_item/' + id_produk_item, iamthedoor, function (data) {
                        $$('#harga').html('Rp' + toIdrFormat(data.harga));
                        $$('#stock').val(data.sisa_stok);
                        if (data.sisa_stok == 0) {
                            $$('#masukkan_keranjang').hide();
                        } else {
                            $$('#masukkan_keranjang').show();
                        }
                    }, 'json');
                });

                var foto_produk = '';
                callback.foto_produk.forEach(function (item, index) {
                    foto_produk += `<div class="swiper-slide"><img
                    src="${site_url_image_layanan}/${item.file_actual}" width="100%" alt=""></div>`
                });

                $('#foto_produk').html(foto_produk);

                $('#masukkan_keranjang').click(function () {
                    if ($('input[name=radio_variasi]:checked').length < 1) {
                        app.dialog.alert('Mohon pilih variasi produk terlebih dahulu');
                        return false;
                    }

                    let produk = {
                        'id_produk': produk_id,
                        'variasi': $('input[name=radio_variasi]:checked').val(),
                    };

                    ajax_data = new Array();
                    ajax_data.push(iamthedoor);
                    ajax_data.push(produk);

                    app.request.post(site_url_mobile_layanan + '/marketplace_jasa/masukkan_keranjang', ajax_data, function (data) {
                        app.dialog.close();
                        if (data.success) {
                            app.dialog.alert(data.message, function () {
                                mainView.router.refreshPage();
                            });
                        } else {
                            app.dialog.alert(data.message);
                        }
                    }, 'json');
                });

            }, function () {
                app.dialog.close();
                app.dialog.alert('Gagal Mendapatkan Data Anda, Mohon Coba Lagi Nanti');
            }, 'json');

            $$('#pencarian').on('keyup search', delay(function (e) {
                cek_kata(this.value);
            }, 500));

            $$('#cari_produk').on('click', function () {
                cek_kata($$('#pencarian').val());
            })

            function delay(callback, ms) {
                var timer = 0;
                return function () {
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

                app.request.post(site_url_mobile_layanan + '/marketplace/search_product/1',
                    ajax_data,
                    function (callback) {
                        var list_produk = '';
                        if (callback.produk.length > 0) {
                            // print header pencarian produk
                            list_produk += '<div class="card">' +
                                '<div class="card-header">' +
                                '<p class="title">Produk Ditemukan</p>' +
                                '</div>';

                            callback.produk.forEach(function (item, index) {
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

                            callback.toko.forEach(function (item, index) {
                                list_toko += '<a href="/tipe-f/toko/' + item.kode_toko + '">' +
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

var food_by_id = {
    path: '/tipe-f/food/:id',
    url: './pages/tipe-f/product/food_by_id.html',
    name: 'food_by_id',
    on: {
        pageInit: function () {
            var id = mainView.router.currentRoute.params.id
            app.request.post(site_url_mobile_layanan + "/marketplace_food/notifikasi", iamthedoor, function (data) {
                $$('.check_keranjang').html(data);
            }, 'json');

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile_layanan + '/marketplace_food/product/' + id, iamthedoor, function (callback) {
                app.dialog.close();
                if (callback.info_toko.status_marketplace == 0) {
                    mainView.router.navigate('/tipe-f/marketplace_food/list_all')
                }
                $$('#nama').html(callback.product.nama);
                $$('#deskripsi').html(callback.product.deskripsi);
                $$("#logo").attr("src", base_url + '/' + callback.logo_toko);
                $$("#detail_toko").attr("href", '/tipe-f/toko/' + callback.info_toko.kode_toko);
                $$('#variasi').val(callback.product_item.variasi);
                $$('#harga').html('Rp' + toIdrFormat(callback.product_item[0].harga));
                $$('#stock').val(callback.product_item[0]?.sisa_stok);
                $$('#nama_usaha').html(callback.info_toko.nama_usaha);
                var produk_id = callback.product.id;
                var variasi = '';
                callback.product_item.forEach(function (item, index) {
                    let checked = '';
                    if (index == 0) checked = 'checked="checked"';

                    variasi +=
                        '<label style="margin-right:5px" class="radio"><input ' + checked + ' type="radio" value="' + item.id + '" name="radio_variasi" id="radio_variasi">' +
                        '<i class="icon-radio"></i>' + item.variasi +
                        '</label>'
                });
                $$('#variasi').html(variasi);

                $('#kuantitas_minus').on('click', function () {
                    var kuantitas_now = $('#kuantitas_input').val();
                    if (kuantitas_now > 1) {
                        kuantitas_now = parseInt(kuantitas_now) - 1;
                        $('#kuantitas_input').val(kuantitas_now);
                    }
                });
                $('#kuantitas_plus').on('click', function () {
                    var kuantitas_now = $('#kuantitas_input').val();
                    // $$('#kuantitas_input').attr("max", $$('#stock').val());
                    if (kuantitas_now < parseInt($$('#stock').val())) {
                        kuantitas_now = parseInt(kuantitas_now) + 1;
                        $('#kuantitas_input').val(kuantitas_now);
                        $("#kuantitas_input").attr("max", kuantitas_now);
                    }
                });

                $('input[name=radio_variasi]').change(function () {
                    var id_produk_item = $('input[name=radio_variasi]:checked').val();
                    $.post(site_url_mobile_layanan + '/marketplace_food/get_product_item/' + id_produk_item, iamthedoor, function (data) {
                        $$('#harga').html('Rp' + toIdrFormat(data.harga));
                        $$('#stock').val(data.sisa_stok);
                        $('#foto_produk').attr('src', site_url_image_layanan + '/' + data.file_actual);
                        $('#nama').html(data.variasi);

                        if (data.sisa_stok == 0) {
                            $$('#masukkan_keranjang').hide();
                        } else {
                            $$('#masukkan_keranjang').show();
                        }
                    }, 'json');
                });

                $('#foto_produk').attr('src', site_url_image_layanan + '/' + callback.product_item[0]?.foto);

                $('#masukkan_keranjang').click(function () {
                    if ($('input[name=radio_variasi]:checked').length < 1) {
                        app.dialog.alert('Mohon pilih variasi produk terlebih dahulu');
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

                    app.request.post(site_url_mobile_layanan + '/marketplace_food/masukkan_keranjang', ajax_data, function (data) {
                        app.dialog.close();
                        if (data.success) {
                            app.dialog.alert(data.message, function () {
                                mainView.router.refreshPage();
                            });
                        } else {
                            app.dialog.alert(data.message);
                        }
                    }, 'json');
                });

            }, function () {
                app.dialog.close();
                app.dialog.alert('Gagal Mendapatkan Data Anda, Mohon Coba Lagi Nanti');
            }, 'json');

            $$('#pencarian').on('keyup search', delay(function (e) {
                cek_kata(this.value);
            }, 500));

            $$('#cari_produk').on('click', function () {
                cek_kata($$('#pencarian').val());
            })

            function delay(callback, ms) {
                var timer = 0;
                return function () {
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

                app.request.post(site_url_mobile_layanan + '/marketplace_food/search_product/0',
                    ajax_data,
                    function (callback) {
                        var list_produk = '';
                        if (callback.produk.length > 0) {
                            // print header pencarian produk
                            list_produk += '<div class="card">' +
                                '<div class="card-header">' +
                                '<p class="title">Produk Ditemukan</p>' +
                                '</div>';

                            callback.produk.forEach(function (item, index) {
                                list_produk += '<a href="' + site_url_mobile_layanan + '/marketplace_food/get_search_product/' + item.id + '">' +
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

                            callback.toko.forEach(function (item, index) {
                                list_toko += '<a href="/tipe-f/toko/' + item.kode_toko + '">' +
                                    '<div class="row">' +
                                    '<div class="col-25">' +
                                    '<img src="' + base_url + '/' + item.logo + '" style="width: 100%; height: 100%;">' +
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
                app.dialog.close();
                console.log(callback)
                $$('#title_produk_keranjang').html('Edit Produk ' + callback.product.nama);
                $$('#nama').html(callback.product.nama);
                $$('#variasi').html('Variasi : ' + callback.produk_keranjang.variasi);
                $$('#merk').html(callback.product_item[0].merk);
                $$('#bahan').html(callback.product_item[0].bahan);
                $$('#harga').html('Rp' + toIdrFormat(callback.product_item[0].harga));
                $$('#stock').val(callback.total_stok);
                $$('#kuantitas_input').val(callback.produk_keranjang.kuantitas);

                $('#kuantitas_minus').on('click', function () {
                    var kuantitas_now = $('#kuantitas_input').val();
                    if (kuantitas_now > 1) {
                        kuantitas_now = parseInt(kuantitas_now) - 1;
                        $('#kuantitas_input').val(kuantitas_now);
                    }
                })

                $('#kuantitas_plus').on('click', function () {
                    var kuantitas_now = $('#kuantitas_input').val();
                    if (kuantitas_now < parseInt($$('#stock').val())) {
                        kuantitas_now = parseInt(kuantitas_now) + 1;
                        $('#kuantitas_input').val(kuantitas_now);
                        $("#kuantitas_input").attr("max", kuantitas_now);
                    }
                });

                $('input[name=radio_variasi]').change(function () {
                    var id_produk_item = $('input[name=radio_variasi]:checked').val();
                    $.post(site_url_mobile_layanan + '/marketplace/get_product_item/' + id_produk_item, iamthedoor, function (data) {
                        $$('#harga').html('Rp' + toIdrFormat(data.harga));
                        $$('#stock').val(data.sisa_stok);
                    }, 'json');
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

                // swiper.slideNext();
                var foto_produk = '';
                callback.foto_produk.forEach(function (item, index) {
                    foto_produk += `<div class="swiper-slide"><img
                    src="${site_url_image_layanan}/${item.file_actual}" width="100%" alt=""></div>`
                });
                $('#foto_produk').html(foto_produk);

            }, function () {
                app.dialog.close();
                app.dialog.alert('Gagal Mendapatkan Data Anda, Mohon Coba Lagi Nanti');
            }, 'json');

            $$('#simpan').on('click', function () {
                let ajax_data = new Array();
                let produk = {
                    'kuantitas': $('#kuantitas_input').val(),
                };
                ajax_data.push(iamthedoor);
                ajax_data.push(produk);
                app.request.post(site_url_mobile_layanan + "/marketplace/edit_produk_keranjang/" + id, ajax_data,
                    function () {
                        app.dialog.close();
                        app.dialog.alert("Data Berhasil Diubah");
                        mainView.router.back();
                        mainView.router.refreshPage();
                    }, function () {
                        app.dialog.close();
                        app.dialog.alert("Data Gagal Diubah");
                        mainView.router.back();
                        mainView.router.refreshPage();
                    }, 'json');
            })
        }
    }
}

var edit_food_keranjang = {
    path: '/tipe-f/product/edit_food_keranjang/:id_product/:id/:id_product_item',
    url: './pages/tipe-f/product/edit_food_keranjang.html',
    name: 'edit_food_keranjang',
    on: {
        pageInit: function () {
            var id = mainView.router.currentRoute.params.id;
            var id_product = mainView.router.currentRoute.params.id_product;
            var id_product_item = mainView.router.currentRoute.params.id_product_item;
            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile_layanan + '/marketplace_food/get_produk_keranjang/' + id_product, iamthedoor, function (callback) {
                app.dialog.close();
                
                let product_selected = callback.product_item.filter(function(item){
                    return (item.id == id_product_item)
                })[0];

                $$('#title_food_keranjang').html('Edit Food ' + callback.product.nama);
                $$('#nama').html(callback.product.nama);
                $$('#deskripsi').html(callback.product.deskripsi);
                $$("#logo").attr("src", base_url + '/' + callback.logo_toko);
                $$("#detail_toko").attr("href", '/tipe-f/toko/' + callback.info_toko.kode_toko);
                $$('#variasi').val(callback.produk_keranjang.variasi);
                $$('#harga').html('Rp' + toIdrFormat(product_selected.harga));
                $$('#stock').val(product_selected?.sisa_stok);
                $$('#nama_usaha').html(callback.info_toko.nama_usaha);

                var produk_id = callback.product.id;
                var variasi = '';
                callback.product_item.forEach(function (item, index) {
                    let checked = '';
                    if (item.id == id_product_item) checked = 'checked="checked"';

                    variasi +=
                        '<label style="margin-right:5px" class="radio"><input ' + checked + ' type="radio" value="' + item.id + '" name="radio_variasi" id="radio_variasi">' +
                        '<i class="icon-radio"></i>' + item.variasi +
                        '</label>'
                });

                $$('#variasi').html(variasi);

                $('#kuantitas_minus').on('click', function () {
                    var kuantitas_now = $('#kuantitas_input').val();
                    if (kuantitas_now > 1) {
                        kuantitas_now = parseInt(kuantitas_now) - 1;
                        $('#kuantitas_input').val(kuantitas_now);
                    }
                })
                $('#kuantitas_plus').on('click', function () {
                    var kuantitas_now = $('#kuantitas_input').val();
                    // $$('#kuantitas_input').attr("max", $$('#stock').val());
                    if (kuantitas_now < parseInt($$('#stock').val())) {
                        kuantitas_now = parseInt(kuantitas_now) + 1;
                        $('#kuantitas_input').val(kuantitas_now);
                        $("#kuantitas_input").attr("max", kuantitas_now);
                    }
                });

               $('input[name=radio_variasi]').change(function () {
                    var id_produk_item = $('input[name=radio_variasi]:checked').val();
                    $.post(site_url_mobile_layanan + '/marketplace_food/get_product_item/' + id_produk_item, iamthedoor, function (data) {
                        $$('#harga').html('Rp' + toIdrFormat(data.harga));
                        $$('#stock').val(data.sisa_stok);
                        $('#foto_produk').attr('src', site_url_image_layanan + '/' + data.file_actual);
                        $('#nama').html(data.variasi);

                        if (data.sisa_stok == 0) {
                            $$('#masukkan_keranjang').hide();
                        } else {
                            $$('#masukkan_keranjang').show();
                        }
                    }
                        , 'json');
                });
                

                $('#foto_produk').attr('src', site_url_image_layanan + '/' + product_selected.foto);

            }, function () {
                app.dialog.close();
                app.dialog.alert('Gagal Mendapatkan Data Anda, Mohon Coba Lagi Nanti');
            }, 'json');

            $$('#simpan').on('click', function () {
                let ajax_data = new Array();
                let produk = {
                    'variasi': $('input[name=radio_variasi]:checked').val(),
                    'kuantitas': $('#kuantitas_input').val(),
                };
                ajax_data.push(iamthedoor);
                ajax_data.push(produk);
                app.request.post(site_url_mobile_layanan + "/marketplace_food/edit_produk_keranjang/" + id, ajax_data,
                    function () {
                        app.dialog.close();
                        app.dialog.alert("Data Berhasil Diubah");
                        mainView.router.navigate('/tipe-f/marketplace_food/keranjang', {
                            reloadAll : true
                        });
                    }, function () {
                        app.dialog.close();
                        app.dialog.alert("Data Gagal Diubah");
                        mainView.router.navigate('/tipe-f/marketplace_food/keranjang', {
                            reloadAll : true
                        });
                    }, 'json');
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
                    }
                });
                $('#kuantitas_plus').on('click', function () {
                    var kuantitas_now = $('#kuantitas_input').val();
                    // $$('#kuantitas_input').attr("max", $$('#stock').val());
                    if (kuantitas_now < parseInt($$('#stock').val())) {
                        kuantitas_now = parseInt(kuantitas_now) + 1;
                        $('#kuantitas_input').val(kuantitas_now);
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

                $('#masukkan_keranjang').click(function () {
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

                    app.request.post(site_url_mobile_layanan + '/marketplace/masukkan_keranjang', ajax_data, function (data) {
                        app.dialog.close();
                        if (data.success) {
                            app.dialog.alert(data.message);
                        } else {
                            app.dialog.alert(data.message);
                        }
                    }, 'json');
                });

            }, 'json');

            $$('#pencarian').on('keyup search', delay(function (e) {
                cek_kata(this.value);
            }, 500));

            $$('#cari_produk').on('click', function () {
                cek_kata($$('#pencarian').val());
            })

            function delay(callback, ms) {
                var timer = 0;
                return function () {
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
                    function (callback) {
                        var list_produk = '';
                        if (callback.produk.length > 0) {
                            // print header pencarian produk
                            list_produk += '<div class="card">' +
                                '<div class="card-header">' +
                                '<p class="title">Produk Ditemukan</p>' +
                                '</div>';

                            callback.produk.forEach(function (item, index) {
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

                            callback.toko.forEach(function (item, index) {
                                list_toko += '<a href="/tipe-f/toko/' + item.kode_toko + '">' +
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