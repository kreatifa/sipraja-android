var list_all = {
    path: "/tipe-f/marketplace/list_all",
    url: "./pages/tipe-f/marketplace/index.html",
    name: "list_all",
    on: {
        pageInit: function () {
            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile_layanan + "/marketplace/notifikasi", iamthedoor, function (data) {
                $$('.check_keranjang').html(data);
            }, 'json');

            app.request.post(site_url_mobile_layanan + "/marketplace/kategori_byid", iamthedoor,
                async function (callback) {
                    var list_kategori = '';
                    list_kategori += '<div class="row">';
                    await callback.forEach(function (item, index) {
                        list_kategori += '<div class="col-33">' +
                            '<a href="/tipe-f/marketplace/kategori_produk/' + item.id + '/0">' +
                            '<center>' +
                            '<div class="card">' +
                            '<div class="card-content card-content-padding">' +
                            // '<img src="'+ site_url_image_layanan + item.icons +'" style="width: 100%; height: 100%;">' +
                            '<img src="' + base_url + "/assets/images/portfolio/tipe_f/" + item.icons + '" style="width: 100%; height: 100%;">' +
                            '</div>' +
                            '</div>' +
                            '<h5>' + item.nama + '</h5>' +
                            '</center>' +
                            '</a>' +
                            '</div>';
                    });
                    list_kategori += '</div>';
                    $('#kategori_produk').html(list_kategori);
                    $('#kategori_produk').show();
                }, 'json');

            app.request.get(site_url_mobile_layanan + "/marketplace/rekomendasi_product", iamthedoor,
                async function (callback) {
                    app.dialog.close();
                    var list_rekomendasi = '';
                    list_rekomendasi += '<div class="row">';
                    await callback.forEach(function (item, index) {
                        list_rekomendasi += '<div class="col-50">' +
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
                    list_rekomendasi += '</div>';
                    $('#rekomendasi-result').html(list_rekomendasi);
                    $('#rekomendasi-result').show();
                }, 'json');

            $$('#pencarian_produk').on('keyup search', delay(function (e) {
                cek_kata(this.value);
            }, 500));

            $$('#cari_produk').on('click', function () {
                cek_kata($$('#pencarian_produk').val());
            })
        }
    }
}

var kategori_produk = {
    path: "/tipe-f/marketplace/kategori_produk/:id/:kode",
    url: "./pages/tipe-f/marketplace/kategori_produk.html",
    name: "kategori_produk",
    on: {
        pageInit: function () {
            var id = mainView.router.currentRoute.params.id;
            var kode = mainView.router.currentRoute.params.kode;
            app.request.get(site_url_mobile_layanan + "/marketplace/search/" + id + '/' + kode, iamthedoor,
                function (callback) {
                    $('#kategori').html(callback.nama_kategori);
                    var list_kategori_produk = '';
                    list_kategori_produk += '<div class="row">';
                    callback.product.forEach(function (item, index) {
                        list_kategori_produk += '<div class="col-50">' +
                            '<a class="link" href="/tipe-f/product/' + item.id + '">' +
                            '<div class="card">' +
                            '<div class="card-header">' +
                            '<img src="' + site_url_image_layanan + item.foto + '" style="width: 100%; height: 100%;">' +
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

            $$('#pencarian_produk').on('keyup search', delay(function (e) {
                cek_kata(this.value);
            }, 500));

            $$('#cari_produk').on('click', function () {
                cek_kata($$('#pencarian_produk').val());
            })
        }
    }
}

var keranjang = {
    path: "/tipe-f/marketplace/keranjang",
    url: "./pages/tipe-f/marketplace/keranjang.html",
    name: "keranjang",
    on: {
        pageInit: function () {
            app.request.post(site_url_mobile_layanan + "/marketplace/keranjang", iamthedoor,
                function (data) {

                    // Jika ada barang dicheckout pembeli tetapi barang tersebut sudah dihapus oleh seller akan muncul alert
                    if (data.checkout > 0) {
                        app.dialog.alert('Barang dicheckout anda tidak ditemukan', function () {
                            app.request.post(site_url_mobile_layanan + "/marketplace/save_pembatalan/checkout", iamthedoor, function (response) {
                            }, 'json');
                        });
                    }

                    $$('#subtotal').html(': Rp ' + toIdrFormat(data.sub_total));
                    $$('#totalpembayaran').html(': Rp ' + toIdrFormat(data.pembayaran));

                    var keranjang = '';
                    if (data.keranjang != '') {
                        keranjang += '<ul>';

                        const groupByCategory = data.keranjang.reduce((group, product) => {
                            const { nama_usaha } = product;
                            group[nama_usaha] = group[nama_usaha] ?? [];
                            group[nama_usaha].push(product);
                            return group;
                        }, {});

                        $.each(groupByCategory, function (key, value) {
                            keranjang += '<label class="item-checkbox item-content">' +
                                '<input type="button" onClick="checkall(\'' + value[0].kode_toko + '\')" value="Check all" id="checkall-' + value[0].kode_toko + '" style="width: 35%;" class="button button-small button-round button-fill">';
                            keranjang += '<div class="item-inner">' +
                                '<div class="item-inner-row">' +
                                '<p class="item-title" style="margin-left: 15px;">' + key + '</p>' +
                                '</div>' +
                                '</div>' +
                                '</label>';
                            for (var i = 0; i < value.length; i++) {
                                keranjang += `<li><div class="card-content card-content-padding">
                                <label class="item-content">
                                    <input type="checkbox" name="checkout[]" value="${value[i].id}" class="demo-media-checkbox" id="checkbox-${value[i].kode_toko}">
                                    <a href="/tipe-f/product/edit_produk_keranjang/${value[i].id_product}/${value[i].id}" class="item-link item-content">
                                        <div class="item-media">
                                            <img src="${site_url_image_layanan + value[i].foto}" width="50" height="50">
                                        </div>
                                        <div class="item-inner" style="width: 180px;">
                                            <div class="item-text">${value[i].nama}</div>
                                            <div class="item-text">Variasi : ${value[i].variasi}</div>
                                            <div class="item-footer">Rp. <span>${toIdrFormat(value[i].harga)}</span></div>
                                        </div>
                                    </a>
                                    <div class="text-align-right" onclick="delete_keranjang(${value[i].id})" data-id="${value[i].id}">✖</div>
                                </label>
                            </div></li><br>`;
                            }
                        });
                        keranjang += '</ul>';
                    } else {
                        keranjang += '<center>Tidak ada produk</center>';
                        $('#beli').remove();
                    }
                    $('#keranjang').html(keranjang);
                    $('#keranjang').show();
                }, 'json');

            $$('#beli').on('click', function () {
                if ($$('input[type="checkbox"]:checked').length < 1) {
                    app.dialog.alert('Mohon pilih produk terlebih dahulu');
                }

                let ajax_data = new Array();
                let form_data = $('input[name="checkout[]"]:checked').serializeArray();
                ajax_data.push(iamthedoor);
                ajax_data.push(form_data);
                app.request.post(site_url_mobile_layanan + '/marketplace/save_keranjang', ajax_data, function (data) {
                    if (data.status) {
                        app.dialog.alert(data.message, function () {
                            mainView.router.navigate('/tipe-f/marketplace/checkout');
                        });
                    } else {
                        app.dialog.alert(data.message, function () {
                            mainView.router.refreshPage();
                        });
                    }
                }, 'json');
            });
        }
    }
}

var checkout = {
    path: "/tipe-f/marketplace/checkout",
    url: "./pages/tipe-f/marketplace/checkout.html",
    name: "checkout",
    on: {
        pageInit: function () {
            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile_layanan + "/marketplace/checkout", iamthedoor, function (data) {
                app.dialog.close();
                var alamat = '';
                if (data.alamat != null) {
                    alamat = data.alamat.nama_lengkap + ' | ' + data.alamat.no_telp + ' | ' + data.alamat.nama_jalan + ' | ' + data.alamat.detail_alamat + ' | ' + data.alamat.prov + ' | ' + data.alamat.kab + ' | ' + data.alamat.kec + ' | ' + data.alamat.kel;
                } else {
                    alamat = 'Mohon mengisi alamat pengiriman terlebih dahulu';
                }
                $$('#alamat').html(alamat);
                $$('#alamat').attr('href', '/tipe-f/alamat/list');
                $$('#maps').attr('href', '/tipe-f/marketplace/maps/' + data.alamat.id);

                $$('#total_produk').val(data.checkout.length);
                $$('#total').html('Rp ' + toIdrFormat(data.sub_total));
                $$('#service').html('Rp ' + toIdrFormat(data.biaya_service));
                $$('#ongkir').html('Rp ' + toIdrFormat(data.ongkir));
                $$('#pembayaran').html('Rp ' + toIdrFormat(data.pembayaran));

                $$('#id_alamat_pengiriman').val(data.alamat.id);
                $$('#biaya_ongkir').val(data.ongkir);
                $$('#harga_barang').val(data.sub_total);
                $$('#biaya_service').val(data.biaya_service);
                $$('#total_biaya').val(data.pembayaran);
                $$('#total_berat').val(data.total_berat);
                $$('#total_volume').val(data.total_volume);
                $$('#jarak_tempuh').val(data.jarak);

                const groupByCategory = data.checkout.reduce((group, product) => {
                    const { nama_usaha } = product;
                    group[nama_usaha] = group[nama_usaha] ?? [];
                    group[nama_usaha].push(product);
                    return group;
                }, {});

                var checkout = '';
                if (data.checkout != '') {
                    checkout += '<ul>';
                    $.each(groupByCategory, function (key, value) {
                        checkout += '<label class="item-checkbox item-content">' +
                            '<div class="item-inner">' +
                            '<div class="item-inner-row">' +
                            '<p class="item-title text-align-center" style="margin-left: 15px;">' + key + '</p>' +
                            '</div>' +
                            '</div>' +
                            '</label>';
                        for (var i = 0; i < value.length; i++) {
                            checkout += `<li><div class="card-content card-content-padding">
                                <label class="item-content">
                                    <div class="item-media">
                                        <img src="${site_url_image_layanan + value[i].foto}" width="60">
                                    </div>
                                    <div class="item-inner" style="width: 180px;">
                                        <div class="item-text">${value[i].nama}</div>
                                        <div class="item-text">Variasi : ${value[i].variasi}</div>
                                        <div class="item-text">Kuantitas : ${value[i].kuantitas}</div>
                                        <div class="item-footer">Rp. <span>${toIdrFormat(value[i].harga)}</span></div>
                                    </div>
                                </label>
                            </div></li>`;
                        }
                    });
                    checkout += '</ul>';
                } else {
                    checkout += '<center>Tidak ada produk</center>';
                    $('#action').remove();
                }
                $('#checkout').html(checkout);
            }, 'json');

            $$('#pembatalan').on('click', function () {
                app.dialog.confirm('Apakah Anda yakin membatalkan pesanan?', function () {
                    app.request.post(site_url_mobile_layanan + '/marketplace/save_pembatalan/checkout', iamthedoor, function (data) {
                        app.dialog.alert('Berhasil ' + data, function () {
                            mainView.router.navigate('/tipe-f/marketplace/keranjang');
                        });
                    }, 'json');
                });
            });

            $$('#save_checkout').on('click', function () {
                let form_data = {};
                let ajax_data = new Array();
                $('#form_checkout').serializeArray().forEach(function (item) {
                    form_data[item.name] = item.value;
                });
                ajax_data.push(iamthedoor);
                ajax_data.push(form_data);

                app.request.post(site_url_mobile_layanan + '/marketplace/save_pesanan', ajax_data, function (data) {
                    app.dialog.alert(data.message, function () {
                        if (data.status) {
                            mainView.router.navigate('/tipe-f/marketplace/list_menu/belum_bayar');
                        }
                    });
                }, 'json');
            });
        }
    }
}

var menu = {
    path: "/tipe-f/marketplace/menu",
    url: "./pages/tipe-f/marketplace/menu.html",
    name: "menu",
    on: {
        pageInit: function () {
            app.request.post(site_url_mobile_layanan + '/marketplace/menu', iamthedoor, function (response) {
                var menu = '';
                const fieldMenu = response.fieldMenu;
                const fieldImage = response.fieldImage;
                for (key in fieldImage) {
                    menu += `<div class="col-50">
                        <a href="/tipe-f/marketplace/list_menu/${fieldImage[key]}" class="link icon-only">
                            <article class="photo">
                                <div class="text-align-right"><span class="badge color-red">${response.notifikasi[fieldImage[key]]}</span></div>
                                <div style="width:100%; text-align:center">
                                    <img src="images/tipe_f/${key}" style="width:50%; height:50%;">
                                </div>
                                <div class="overlay-gradient-tall-dark"/>
                                <section>
                                    <p class="text-align-center">${fieldMenu[fieldImage[key]]}</p>
                                </section>
                            </article>
                        </a>
                    </div>`;
                }
                $('#menu').html(menu);
            }, 'json')
        }
    }
}

var list_menu = {
    path: "/tipe-f/marketplace/list_menu/:kode",
    url: "./pages/tipe-f/marketplace/list_menu.html",
    name: "list_menu",
    on: {
        pageInit: function () {
            let kode = mainView.router.currentRoute.params.kode;

            var status = 0;
            if (kode == 'dibatalkan') {
                status = 1;
            } else if (kode == 'pengembalian') {
                status = 2;
            }
            app.dialog.preloader('Loading...');

            var $ptrContentListMenu = $$('.ptr-content');
            $ptrContentListMenu.on('ptr:refresh', function () {
                reload_list();
                app.ptr.done();
            });

            reload_list();
            function reload_list() {
                app.request.post(site_url_mobile_layanan + '/marketplace/list_menu/' + kode, iamthedoor, function (response) {

                    var list_menu = '';
                    $('#list_menu').empty();
                    app.dialog.close();
                    $$('#title').html('Menu ' + kode.replace('_', ' '));
                    $$('#note').html('Note* Jika barang dibatalkan maka dana orderan akan diproses dimenu refund');
                    if (response.pesanan.length == 0) {
                        list_menu = '<p class="text-align-center">Belum ada transaksi</p>';
                    } else {
                        response.pesanan.forEach(function (item, index) {
                            var buttonAksi = '';
                            var komplain = '';
                            if (kode == 'belum_bayar') {
                                buttonAksi = `<div class="col-50">
                                    <button class="button button-fill button-small color-red pembatalan-pesanan" data-id="${item.id}">
                                        Batalkan
                                    </button>
                                </div>`;
                            } else if (kode == 'dikirim') {
                                if (item.status == 3) {
                                    if (item.id_komplain === null) {
                                        komplain = `<div class="col">
                                            <a href="/tipe-f/marketplace/komplain/${item.id}/${item.kode_toko}" class="button button-fill button-small color-red">
                                                Komplain
                                            </a>
                                        </div>`;
                                    }
                                    buttonAksi = `<div class="col">
                                            <a href="/tipe-f/marketplace/return/${item.id}" class="button button-fill button-small color-yellow">
                                                Return
                                            </a>
                                        </div>
                                        ${komplain}
                                        <div class="col">
                                            <a href="/tipe-f/marketplace/penilaian/${item.id}" class="button button-fill button-small color-green">
                                                Nilai
                                            </a>
                                        </div>`;
                                }
                            } else if (kode == 'komplain') {
                                buttonAksi = `<div class="col">
                                        <a href="/tipe-f/packing/edit_komplain/${item.id_komplain}/marketplace" class="button button-fill button-small color-blue">
                                            Lihat
                                        </a>
                                    </div>`;
                            } else if (kode == 'refund') {
                                buttonAksi = `<div class="col-50">
                                    <button class="button button-fill button-small color-blue">
                                        Proses
                                    </button>
                                </div>`;
                            }

                            list_menu += `
                            <div class="card" id="list_menu-${item.id}" style="background-color: ghostwhite">
                                <div class="card-content card-content-padding">
                                    <a href="/tipe-f/marketplace/tracking_pesanan/${item.id}/${status}" class="item-link item-content">
                                        <div class="item-media"><img src="${site_url_image_layanan + item.foto}" width="80"/></div>
                                        <div class="item-inner">
                                            <div class="item-title">
                                                <div class="item-title">${item.nama}</div>
                                            </div>
                                            <div class="item-text">Total Rp. <span>${toIdrFormat(item.total_biaya)}</span></div>
                                            <div class="item-text">Variasi <span>${item.variasi}</span></div>
                                        </div>
                                    </a>
                                    <div class="row">
                                        ${buttonAksi}
                                    </div>
                                </div>
                            </div><br>`;
                        });
                    }
                    $('#list_menu').html(list_menu);

                    var pembatalanSheet = app.sheet.create({
                        content: `<div class="sheet-modal">
                            <div class="toolbar">
                                <div class="toolbar-inner">
                                <div class="left"></div>
                                <div class="right">
                                    <a class="link sheet-close">Close</a>
                                </div>
                                </div>
                            </div>
                            <div class="sheet-modal-inner">
                                <div class="page-content">
                                    <div class="list no-margin">
                                        <form id="form_pembatalan_pesanan">
                                            <input type="hidden" id="id" name="id" value="">
                                            <ul>
                                                <li>
                                                    <label class="item-radio item-content">
                                                        <input type="radio" class="alasan" name="alasan" value="Ingin mengubah alamat pengiriman">
                                                        <i class="icon icon-radio"></i>
                                                        <div class="item-inner">
                                                            <div class="item-title">Ingin mengubah alamat pengiriman</div>
                                                        </div>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="item-radio item-content">
                                                        <input type="radio" class="alasan" name="alasan" value="Ingin mengubah pesanan (ukuran, warna, jumlah, dll)">
                                                        <i class="icon icon-radio"></i>
                                                        <div class="item-inner">
                                                        <div class="item-title">Ingin mengubah pesanan (ukuran, warna, jumlah, dll)</div>
                                                        </div>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="item-radio item-content">
                                                        <input type="radio" class="alasan" name="alasan" value="Menemukan harga yang lebih murah di toko lain">
                                                        <i class="icon icon-radio"></i>
                                                        
                                                        <div class="item-inner">
                                                        <div class="item-title">Menemukan harga yang lebih murah di toko lain</div>
                                                        </div>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="item-radio item-content">
                                                        <input type="radio" class="alasan" name="alasan" value="Tidak ingin membeli lagi">
                                                        <i class="icon icon-radio"></i>
                                                        
                                                        <div class="item-inner">
                                                        <div class="item-title">Tidak ingin membeli lagi</div>
                                                        </div>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="item-radio item-content">
                                                        <input type="radio" class="alasan" name="alasan" value="Lainnya">
                                                        <i class="icon icon-radio"></i>
                                                        
                                                        <div class="item-inner">
                                                        <div class="item-title">Lainnya</div>
                                                        </div>
                                                    </label>
                                                </li>
                                                <li id="ket_alasan" style="display: none;">
                                                    <div class="item-content item-input">
                                                        <div class="item-inner">
                                                        <div class="item-title item-label">Alasan</div>
                                                        <div class="item-input-wrap">
                                                            <input type="text" name="keterangan_alasan" placeholder="Masukan alasan anda">
                                                        </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div id="save_pembatalan" class="button button-fill">Simpan</div>
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>`,
                        on: {
                            open: function () {

                                $$('#form_pembatalan_pesanan input[name="alasan"]').on('change', function () {
                                    var value = $$('#form_pembatalan_pesanan input[name="alasan"]:checked').val();
                                    (value == 'Lainnya') ? $$('#ket_alasan').attr('style', 'display:block;') : $$('#ket_alasan').attr('style', 'display:none;'), $$('#keterangan_alasan').val('');
                                });

                                $$('#form_pembatalan_pesanan #save_pembatalan').on('click', function () {
                                    if ($('#form_pembatalan_pesanan input[name="alasan"]').is(':checked') == false) {
                                        app.dialog.alert('Mohon pilih alasan pembatalan terlebih dahulu');
                                        return false;
                                    }

                                    let form_data = {};
                                    let ajax_data = new Array();
                                    $('#form_pembatalan_pesanan').serializeArray().forEach(function (item) {
                                        form_data[item.name] = item.value;
                                    });

                                    ajax_data.push(iamthedoor);
                                    ajax_data.push(form_data);

                                    app.request.post(site_url_mobile_layanan + '/marketplace/save_pembatalan/pesanan', ajax_data, function (response) {
                                        app.dialog.alert(response, function () {
                                            app.sheet.close();
                                            mainView.router.refreshPage();
                                        });
                                    }, 'json');
                                });
                            },
                        }
                    });

                    $$('.pembatalan-pesanan').on('click', async function () {
                        await pembatalanSheet.open();
                        $$('#id').val($$(this).data('id'))
                    });
                }, 'json');
            }
        }
    }
}

var penilaian = {
    path: "/tipe-f/marketplace/penilaian/:product_id",
    url: "./pages/tipe-f/marketplace/penilaian.html",
    name: "penilaian",
    on: {
        pageInit: function () {
            let product_id = mainView.router.currentRoute.params.product_id;
            app.request.post(site_url_mobile_layanan + "/marketplace/penilaian_produk/" + product_id, iamthedoor, function (resp) {
                $('#id_pesanan').val(resp.pesanan.id);
            }, 'json');

            var kualitas_produk = new StarRating('.kualitas_produk', { tooltip: 'Nilai' });
            var pelayanan_penjual = new StarRating('.pelayanan_penjual', { tooltip: 'Nilai' });
            var pelayanan_penjual = new StarRating('.kecepatan_jasa_kirim', { tooltip: 'Nilai' });

            $('select[name="kualitas_produk"]').on('change', function () {
                if (this.value != 5) {
                    $('.desc_kualitas').show()
                } else {
                    $('.desc_kualitas').hide()
                    $('textarea[name="desc_kualitas"]').val('');
                }
            })

            $('select[name="pelayanan_penjual"]').on('change', function () {
                if (this.value != 5) {
                    $('.desc_pelayanan').show()
                } else {
                    $('.desc_pelayanan').hide()
                    $('textarea[name="desc_pelayanan"]').val('');
                }
            })

            $('select[name="kecepatan_jasa_kirim"]').on('change', function () {
                if (this.value != 5) {
                    $('.desc_kecepatan').show()
                } else {
                    $('.desc_kecepatan').hide()
                    $('textarea[name="desc_kecepatan"]').val('');
                }
            })

            $('#simpan-penilaian').on('click', function () {
                if ($('#marketplace_penilaian_produk')[0].checkValidity() == true) {
                    app.dialog.preloader();
                    let form_data = app.form.convertToData('#marketplace_penilaian_produk');

                    let ajax_data = new Array();
                    ajax_data.push(iamthedoor);
                    ajax_data.push(form_data);
                    app.request.post(site_url_mobile_layanan + '/marketplace/save_penilaian', ajax_data, function (resp) {
                        app.dialog.close();
                        if (resp.status) {
                            app.dialog.alert(resp.message, function () {
                                mainView.router.navigate('/tipe-f/marketplace/menu');
                            });
                        } else {
                            app.dialog.alert(resp.message);
                        }

                    }, function (error) {
                        app.dialog.close();
                        app.dialog.alert("Gagal menyimpan, mohon coba lagi");
                    }, 'json');

                } else {
                    app.dialog.close();
                    app.dialog.alert("Mohon lengkapi form yang kosong sebelum menyimpan");
                }
            });
        }
    }
}

var komplain = {
    path: "/tipe-f/marketplace/komplain/:product_id/:kode_toko",
    url: "./pages/tipe-f/marketplace/komplain.html",
    name: "komplain",
    on: {
        pageInit: function () {
            app.dialog.preloader();
            let product_id = mainView.router.currentRoute.params.product_id;
            let kode_toko = mainView.router.currentRoute.params.kode_toko;
            $('#id_pesanan').val(product_id);
            $('#kode_toko').val(kode_toko);
            app.request.post(site_url_mobile_layanan + '/marketplace/get_kategori_komplain', iamthedoor, function (response) {
                app.dialog.close();
                var kategori = '<select name="kategori" id="kategori">';
                for (key in response) {
                    kategori += '<option value="' + key + '">' + response[key] + '</option>';
                }
                kategori += '</select>';
                $('#dropdown-kategori').html(kategori);
            }, function (error) {
                app.dialog.close();
                app.dialog.alert("Gagal memuat, mohon coba lagi");
            }, 'json');

            $('#simpan-komplain').on('click', function () {
                if ($('#marketplace_komplain_produk')[0].checkValidity() == true) {
                    app.dialog.preloader();
                    let form_data = app.form.convertToData('#marketplace_komplain_produk');

                    let ajax_data = new Array();
                    ajax_data.push(iamthedoor);
                    ajax_data.push(form_data);
                    app.request.post(site_url_mobile_layanan + '/marketplace/save_komplain', ajax_data, function (resp) {
                        app.dialog.close();
                        if (resp.status) {
                            app.dialog.alert(resp.message, function () {
                                mainView.router.navigate('/tipe-f/marketplace/list_menu/komplain');
                            });
                        } else {
                            app.dialog.alert(resp.message);
                        }

                    }, function (error) {
                        app.dialog.close();
                        app.dialog.alert("Gagal menyimpan, mohon coba lagi");
                    }, 'json');

                } else {
                    app.dialog.close();
                    app.dialog.alert("Mohon lengkapi form yang kosong sebelum menyimpan");
                }
            });
        }
    }
}

var pengembalian = {
    path: "/tipe-f/marketplace/return/:id",
    url: "./pages/tipe-f/marketplace/return.html",
    name: "return",
    on: {
        pageInit: function () {
            let id = mainView.router.currentRoute.params.id;
            var pesanan = '';
            app.dialog.preloader('Loading...');
            $('#id').val(id);
            app.request.post(site_url_mobile_layanan + "/marketplace/return/" + id, iamthedoor, function (response) {
                app.dialog.close();
                response.pesanan.forEach(function (item, index) {
                    pesanan += `<div class="list media-list sortable">
                        <ul>
                            <li>
							    <input type="hidden" name="id_pesanan[]" value="${item.id}">
                                <div class="item-content">
                                    <div class="item-media"><img src="${site_url_image_layanan + item.foto}" width="80"/></div>
                                    <div class="item-inner">
                                        <div class="item-title-row">
                                            <div class="item-title">${item.nama}</div>
                                            <div class="item-after"></div>
                                        </div>
                                        <div class="item-subtitle">Variasi : ${item.variasi}</div>
                                        <div class="item-subtitle">Kuantitas : ${item.kuantitas}</div>
                                        <div class="item-text">Rp. ${toIdrFormat(item.harga)}</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>`;
                });
                $('#pesanan').html(pesanan);
            }, 'json');

            $('#simpan-return').on('click', function () {
                if ($('#marketplace_return')[0].checkValidity() == true) {
                    app.dialog.preloader();
                    let form_data = app.form.convertToData('#marketplace_return');

                    let ajax_data = new Array();
                    ajax_data.push(iamthedoor);
                    ajax_data.push(form_data);
                    app.request.post(site_url_mobile_layanan + '/marketplace/save_return', ajax_data, function (resp) {
                        app.dialog.close();
                        if (resp.status) {
                            app.dialog.alert(resp.message, function () {
                                mainView.router.navigate('/tipe-f/marketplace/list_menu/pengembalian');
                            });
                        } else {
                            app.dialog.alert(resp.message);
                        }
                    }, function (error) {
                        app.dialog.close();
                        app.dialog.alert("Gagal menyimpan, mohon coba lagi");
                    }, 'json');

                } else {
                    app.dialog.close();
                    app.dialog.alert("Mohon lengkapi form yang kosong sebelum menyimpan");
                }
            });
        }
    }
}

var maps_checkout = {
    name: 'maps_checkout',
    path: '/tipe-f/marketplace/maps/:id',
    url: './pages/tipe-f/marketplace/maps.html',
    on: {
        pageInit: function () {
            const id = mainView.router.currentRoute.params.id;
            var maplet; var maplayer;

            if (!maplet) {
                app.request.post(site_url_mobile_layanan + "/marketplace/maps/" + id, iamthedoor, function (data) {
                    maplet = L.map('mapid', { minZoom: 2 }).setView([
                        data.latitude, data.longitude
                    ], 14);
                    let osmLayer = new L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    });
                    maplet.addLayer(osmLayer);
                    maplayer = L.layerGroup().addTo(maplet);
                    L.marker([data.latitude, data.longitude]).addTo(maplayer);
                }, 'json');
            }
        }
    }
}

var tracking_pesanan = {
    path: "/tipe-f/marketplace/tracking_pesanan/:id/:kode",
    url: "./pages/tipe-f/marketplace/tracking_pesanan.html",
    name: "tracking_pesanan",
    on: {
        pageInit: function () {
            let id = mainView.router.currentRoute.params.id;
            let kode = mainView.router.currentRoute.params.kode;

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile_layanan + "/marketplace/detail_pesanan/" + id + '/' + kode, iamthedoor, function (data) {
                app.dialog.close();

                // Informasi Pengiriman
                $$('#informasi_pengiriman').attr('href', '/informasi_pengiriman/' + data.pesanan.id);

                $$('#ekspedisi_pengiriman').html(data.pesanan.opsi_pengiriman);
                $$('#payment').html(data.pesanan.metode_pembayaran);
                // Total Pesanan
                $$('#harga').html('Rp ' + toIdrFormat(data.pesanan.harga_barang));
                $$('#biaya_service').html('Rp ' + toIdrFormat(data.pesanan.biaya_service));
                $$('#ongkir').html('Rp ' + toIdrFormat(data.pesanan.biaya_ongkir));
                $$('#total_pembayaran').html('Rp ' + toIdrFormat(data.pesanan.total_biaya));

                $$('#kode_transaksi').html(data.pesanan.kode_transaksi);
                $$('#waktu_pemesanan').html(data.pesanan.waktu_pemesanan);
                $$('#waktu_pembayaran').html(data.pesanan.waktu_pembayaran);
                $$('#waktu_pengiriman').html(data.pesanan.waktu_pengiriman);
                $$('#waktu_selesai_pesanan').html(data.pesanan.waktu_selesai_pesanan);

                var pesanan = '';
                pesanan += '<ul>';
                const groupByCategory = data.detail.reduce((group, product) => {
                    const { nama_usaha } = product;
                    group[nama_usaha] = group[nama_usaha] ?? [];
                    group[nama_usaha].push(product);
                    return group;
                }, {});

                $.each(groupByCategory, function (key, value) {
                    pesanan += '<label class="item-checkbox item-content">' +
                        '<p class="item-title" style="margin-left: 15px;">' + key + '</p>' +
                        '</label>';
                    for (var i = 0; i < value.length; i++) {
                        pesanan += '<li id="pesanan-' + value[i].id + '">' +
                            '<label class="item-content">' +
                            '<div class="item-media">' +
                            '<img src="' + site_url_image_layanan + value[i].foto + '" width="50">' +
                            '</div>' +
                            '<div class="item-inner">' +
                            '<div class="item-title-row">' +
                            '<div class="item-title"><span>' + value[i].nama + '</span></div>' +
                            '</div>' +
                            '<div class="item-subtitle"> Variasi : ' + value[i].variasi + '</div>' +
                            '<div class="item-subtitle"> Kuantitas : ' + value[i].kuantitas + '</div>' +
                            '<div class="item-subtitle">Rp. <span>' + toIdrFormat(value[i].harga) + '</span></div>' +
                            '</div>' +
                            '</label>' +
                            '</li>';
                    }
                });
                pesanan += '</ul>';
                $('#pesanan').html(pesanan);
                $('#pesanan').show();

                // if (data.pesanan[0].bukti_photo != null) {
                //     $('#bukti_photo').attr('style', 'display:block;');
                //     data.bukti_photo.forEach(function (val, index) {
                //         $$('#fileurl_bk_pengiriman').val(val.file_name);
                //         $$('#filecode_bk_pengiriman').val(val.code);
                //         var preview_file_bk_pengiriman = '<a id="_bk_pengiriman" onclick="preview_files_bukti(' + val.id + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                //         $$(".preview_file_bk_pengiriman").html(preview_file_bk_pengiriman);
                //     })
                // }
            }, 'json');
        }
    }
}

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
        $('#search-results').html('');
        $('#search-results').hide();
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

            $('#search-results').html(list_produk + list_toko + kosong);
            $('#search-results').show();
        }, 'json');
}

function checkall(kode_toko) {
    app.request.post(site_url_mobile_layanan + "/marketplace/get_keranjang_toko/" + kode_toko, iamthedoor, function (data) {
        data.produk.forEach(function (item, index) {
            var inputs = document.querySelectorAll('#checkbox-' + item.kode_toko + '');
            for (var i = 0; i < inputs.length; i++) {
                // inputs[i].checked = true; 
                inputs[i].checked = !inputs[i].checked;
            }
        });
    }, "json");
}

function delete_keranjang(id) {
    app.request.post(site_url_mobile_layanan + '/marketplace/delete_keranjang/' + id, iamthedoor, function (response) {
        if (response.success) {
            $$('#keranjang-' + id).remove();
            $$('#subtotal').html(toIdrFormat(response.sub_total));
            $$('#totalpembayaran').html(toIdrFormat(response.sub_total));
            if (response.sub_total == '0') {
                app.dialog.alert('keranjang sudah kosong', function () {
                    mainView.router.refreshPage();
                });
            }
        } else {
            app.dialog.alert(response.message);
        }
    }, 'json');
}

function preview_file(id, path = 'layanan') {
    if (!id || id == undefined) {
        app.dialog.alert('File tidak ada');
        return false;
    }

    app.request.post(site_url_mobile + '/siurban_mobile/preview_files/' + id, '', function (image_url) {
        if (image_url == null) {
            app.dialog.alert('File tidak ditemukan');
        } else {
            let preview_files = app.sheet.create({
                content:
                    `<div class="sheet-modal page-content" style="height: 100%">
              <div class="block">
                <p class="row">
                  <a href="#" class="col-25 button button-raised button-fill sheet-close">TUTUP</a>
                </p>
                <img src="${site_url_files + path + '/' + image_url}" width="100%">
              </div>
            </div>`,
            });
            preview_files.open();
        }
    }, 'json');
}

function upload_foto(upload_file_id, path = 'layanan') {
    Attachment.openGallery({
        onSuccess: function (fileURL, fileName) {
            app.dialog.preloader('Mohon Tunggu Sebentar...');
            let params = { subdir: path };
            Attachment.upload(fileURL, fileName, params, function (success) {
                app.dialog.close();
                var data = JSON.parse(success.data);
                addformupload_status = true;
                $$('#file_id_' + upload_file_id).val(data[0].id);
                $$('#file_url_' + upload_file_id).val(fileName);
                $$('#file_code_' + upload_file_id).val(data[0].code);
                $$('.preview_file_' + upload_file_id).html('<a onClick="preview_file(' + data[0].id + ', \'' + path + '\')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>');
            });
        },
    });
}