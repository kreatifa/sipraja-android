var packing_food = {
    path: "/tipe-f/packing_food/:kode_toko",
    url: "./pages/tipe-f/packing_food/index.html",
    name: "packing",
    on: {
        pageInit: function () {
            const kode_toko = mainView.router.currentRoute.params.kode_toko;

            var packing = '';
            app.request.post(site_url_mobile_layanan + '/packing_food/menu/' + kode_toko, iamthedoor, function (response) {
                const fieldMenu = response.fieldMenu;
                const fieldImage = response.fieldImage;
                for (key in fieldImage) {
                    let total_notif = response.notifikasi[fieldImage[key]];
                    packing += `<div class="col-50">
                        <a href="/tipe-f/packing_food/list_menu/${fieldImage[key]}/${kode_toko}" class="link icon-only">
                            <article class="photo">
                                <div class="text-align-right"><span class="badge color-red">${total_notif}</span></div>
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
                $('#packing').html(packing);
            }, 'json');
        }
    }
}

var orderan_food = {
    path: "/tipe-f/packing_food/list_menu/orderan/:kode_toko",
    url: "./pages/tipe-f/packing_food/orderan.html",
    name: "orderan",
    on: {
        pageInit: function () {
            const kode_toko = mainView.router.currentRoute.params.kode_toko;
            $$('#menu').attr('href', '/tipe-f/packing_food/' + kode_toko + '');

            var statusselect = app.smartSelect.create({
                el: '.statusselect',
                on: {
                    close: function () {
                        app.dialog.preloader('Loading...');
                        datatables.context[0].ajax.url = site_url_mobile_layanan + '/packing_food/get_data_orderan/' + $$('#statusselect').val() + '/' + kode_toko;
                        $('#table_orderan').DataTable().ajax.reload(function (json) {
                            if (json.data) {
                                app.dialog.close();
                            } else {
                                app.dialog.close();
                                app.dialog.alert('Data tidak dapat ditemukan');
                            }
                        });
                    }
                }
            });

            app.dialog.preloader('Loading...');
            var datatables = $('#table_orderan').DataTable({
                "serverSide": true,
                "ajax": {
                    "url": site_url_mobile_layanan + '/packing_food/get_data_orderan/0/' + kode_toko,
                    "data": iamthedoor,
                    "type": "GET"
                },
                "columns": [
                    { "data": 'id' },
                    { "data": 'kode_transaksi' },
                    { "data": 'nama' },
                    { "data": 'harga_barang' },
                    { "data": 'berat' },
                    { "data": 'id' },
                ],
                // lengthChange: false,
                searching: false,
                "initComplete": function (settings, json) {
                    app.dialog.close();
                    $$('#datatables_length').hide();
                    $$('#datatables_filter').hide();
                    $$('#datatables_paginate').hide();
                },
                "rowCallback": function (row, data) {
                    $('td:eq(0)', row).html(`<a href="/tipe-f/edit_orderan_food/0/${data.id}" class="button button-small button-fill color-blue"><i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>`);

                    $("td:eq(5)", row).html('<div class="button button-small button-fill color-red pembatalan-pesanan" data-id="' + data.id + '">Batalkan Pesanan</div>');
                }
            });



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
                                            <div class="item-content item-input">
                                                <div class="item-inner">
                                                <div class="item-title item-label">Alasan</div>
                                                <div class="item-input-wrap">
                                                    <textarea name="keterangan_alasan" placeholder="Masukan alasan anda" cols="30" rows="10"></textarea>
                                                </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div id="save_pembatalan" class="button button-fill" style="margin-top:25px;">Simpan</div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>`,
                on: {
                    open: function () {
                        $$('#form_pembatalan_pesanan #save_pembatalan').on('click', function () {
                            let form_data = {};
                            let ajax_data = new Array();
                            $('#form_pembatalan_pesanan').serializeArray().forEach(function (item) {
                                form_data[item.name] = item.value;
                            });

                            ajax_data.push(iamthedoor);
                            ajax_data.push(form_data);

                            app.request.post(site_url_mobile_layanan + '/packing_food/action_pembatalan', ajax_data, function (response) {
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
            });

            $$('#table_orderan').on('click', '.pembatalan-pesanan', async function () {
                await pembatalanSheet.open();
                $$('#id').val($(this).data('id'))
            });
        }
    }
}

var edit_orderan_food = {
    path: "/tipe-f/edit_orderan_food/:kode/:id",
    url: "./pages/tipe-f/packing_food/edit_orderan.html",
    name: "edit_orderan",
    on: {
        pageInit: function () {
            let kode = mainView.router.currentRoute.params.kode;
            let id = mainView.router.currentRoute.params.id;

            app.request.post(site_url_mobile_layanan + '/packing_food/get_orderan_byid/' + kode + '/' + id, iamthedoor, function (response) {
                $$('#back').attr('href', '/tipe-f/packing_food/' + response.pesanan[0].kode_toko + '');
                if (response.packing.status_packing != 0 || response.packing.status_pembatalan != 0) {
                    $$('.save_button').remove();
                }
                // Ekspedisi Pengiriman
                $$('#ekspedisi_pengiriman').html(response.packing.opsi_pengiriman);
                $$('#tracking_pesanan').attr('href', '/tipe-f/packing_food/tracking/' + response.packing.id + '');

                // Alamat Pengiriman
                $$('#nama_lengkap').html(response.tujuan.nama_lengkap);
                $$('#no_telp').html(response.tujuan.no_telp);
                $$('#nama_jalan').html(response.tujuan.nama_jalan);
                $$('#detail_alamat').html(response.tujuan.detail_alamat);
                $$('#prov').html(response.tujuan.prov);
                $$('#kab').html(response.tujuan.kab);
                $$('#kec').html(response.tujuan.kec);
                $$('#kel').html(response.tujuan.kel);

                $$('#total_barang').html("Rp " + toIdrFormat(response.packing.harga_barang));

                // Detail Pesanan
                var produk = '';
                response.pesanan.forEach(async function (val, index) {
                    produk += `<li id="checkout-${val.id}">
                        <input type="hidden" id="kendaraan_kurir" name="kendaraan_kurir" value="${val.berat * val.kuantitas}">
                        <label class="item-content">
                            <a href="/tipe-f/packing_food/detail/${val.id_product}/${val.id_product_item}" class="item-link item-content" style="margin-right: 150px;">
                                <div class="item-media">
                                    <img src="${site_url_image_layanan + val.foto}" width="50">
                                </div>
                                <div class="item-title">
                                    <div class="item-header padding-left" style="font-size: 1rem">${val.nama}</div>
                                    <div class="item-header padding-left" style="font-size: 1rem">Variasi <span>${val.variasi}</span></div>
                                    <div class="padding-left">Kuantitas <span>${val.kuantitas}</span></div>
                                    <div class="item-footer padding-left" style="font-weight: bold;">Rp <span>${toIdrFormat(val.harga)}</span></div>
                                </div>
                            </a>
                        </label>
                    </li>`;
                });
                $('#daftar_pesanan').html(produk);

                // Metode Pembayaran
                $$('#payment').html(response.packing.metode_pembayaran);

                // if(response.packing.status_pembatalan == 1){
                //     $$('.save_button').remove();
                //     let form_data = {};
                //     let ajax_data = new Array();
                //     $('#edit_produk_marketplace').serializeArray().forEach(function (item) {
                //         form_data[item.name] = item.value;
                //     });
                //     ajax_data.push(iamthedoor);
                //     ajax_data.push(form_data);
                //     const keterangan = (response.packing.alasan_pembatalan == 'Lainnya') ? response.packing.keterangan_alasan : response.packing.alasan_pembatalan
                //     app.dialog.confirm('Pembelian product dibatalkan oleh pembeli Karena ' + keterangan, function () {
                //         app.request.post(site_url_mobile_layanan + '/packing_food/action_pembatalan/' + id + '/0', ajax_data, function (response) {
                //             app.dialog.alert('Berhasil membatalkan pesanan', function(){
                //                 mainView.router.back();
                //                 $('#table_orderan').DataTable().ajax.reload();
                //             });
                //         },'json');
                //     }, function () {
                //         app.request.post(site_url_mobile_layanan + '/packing_food/action_pembatalan/' + id + '/1', ajax_data, function (response) {
                //             app.dialog.alert('Berhasil packing product', function(){
                //                 mainView.router.back();
                //                 $('#table_orderan').DataTable().ajax.reload();
                //             });
                //         },'json');
                //     });
                // }
            }, 'json');

            $$('#simpan').on('click', function () {
                let form_data = {};
                let ajax_data = new Array();
                $('#edit_produk_marketplace').serializeArray().forEach(function (item) {
                    form_data[item.name] = item.value;
                });
                ajax_data.push(iamthedoor);
                ajax_data.push(form_data);

                app.request.post(site_url_mobile_layanan + '/packing_food/save_packing/' + id, ajax_data, function (response) {
                    if (response) {
                        app.dialog.alert('Berhasil terima pesanan', function () {
                            mainView.router.back();
                            $('#table_orderan').DataTable().ajax.reload();
                        })
                    }
                }, 'json')
            })
        }
    }
}

var history_toko_food = {
    path: "/tipe-f/packing_food/list_menu/history/:kode_toko",
    url: "./pages/tipe-f/packing_food/history.html",
    name: "history",
    on: {
        pageInit: function () {
            const kode_toko = mainView.router.currentRoute.params.kode_toko;
            $$('#menu').attr('href', '/tipe-f/packing_food/' + kode_toko + '');
            app.dialog.preloader('Loading...');
            var datatables = $('#table_history').DataTable({
                "serverSide": true,
                "ajax": {
                    "url": site_url_mobile_layanan + '/packing_food/get_data_history/' + kode_toko,
                    "data": iamthedoor,
                    "type": "GET"
                },
                "columns": [
                    { "data": 'id' },
                    { "data": 'kode_transaksi' },
                    { "data": 'nama_produk' },
                    { "data": 'harga_barang' },
                    { "data": 'status' },
                    { "data": 'id' },
                ],
                // lengthChange: false,
                searching: false,
                "initComplete": function (settings, json) {
                    app.dialog.close();
                    $$('#datatables_length').hide();
                    $$('#datatables_filter').hide();
                    $$('#datatables_paginate').hide();
                },
                "rowCallback": function (row, data) {
                    $('td:eq(0)', row).html(`<a href="/tipe-f/edit_orderan_food/0/${data.id}" class="button button-small button-fill color-green"><i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Detail</a>`);
                    $("td:eq(3)", row).html('Rp ' + toIdrFormat(data.harga_barang));
                    $('td:eq(4)', row).html('<a class="button button-small button-fill color-blue" href="/tipe-f/packing_food/tracking/' + data.id + '">Tracking</a>');
                    if (data.status == 4) {
                        if (data.claim_penjual == 0) {
                            var checkbox = `<label class="item-checkbox item-content">
                                <input type="checkbox" name="claim_penjual[]" id="claim_penjual" value="${data.id}"/>
                                <i class="icon icon-checkbox"></i>
                            </label>`
                            $('td:eq(5)', row).html(checkbox);
                        } else {
                            $('td:eq(5)', row).html('<span style="background-color: green; padding:5px; border-radius:10px; color:white;"><i class="fa fa-check-circle" aria-hidden="true"></i> Berhasil claim</span>');
                        }
                    } else {
                        $('td:eq(5)', row).html('<span style="background-color: red; padding:5px; border-radius:10px; color:white;"><i class="icon f7-icons" style="font-size: 12pt;">xmark_seal_fill</i> Belum selesai</span>');
                    }
                }
            });

            $$('#ajukan_claim').on('click', function () {
                app.dialog.preloader();

                if ($$('#table_history input[type="checkbox"]:checked').length < 1) {
                    app.dialog.close();
                    app.dialog.alert('Mohon pilih data yang tersedia');
                    return false;
                }

                var claim = $('#table_history input[name="claim_penjual[]"]:checked').serializeArray();

                let ajax_data = new Array();
                ajax_data.push(iamthedoor);
                ajax_data.push(claim);

                app.request.post(site_url_mobile_layanan + '/packing_food/claim', ajax_data, function (response) {
                    app.dialog.close();
                    app.dialog.alert(response.message, function () {
                        mainView.router.refreshPage();
                    })
                }, 'json');
            })
        }
    }
}

var serah_terima_food = {
    path: "/tipe-f/packing_food/list_menu/serah_terima/:kode_toko",
    url: "./pages/tipe-f/packing_food/serah_terima.html",
    name: "serah_terima",
    on: {
        pageInit: function () {
            const kode_toko = mainView.router.currentRoute.params.kode_toko;
            $$('#menu').attr('href', '/tipe-f/packing_food/' + kode_toko + '');
            app.dialog.preloader('Loading...');
            var datatables = $('#table_serah_terima').DataTable({
                "serverSide": true,
                "ajax": {
                    "url": site_url_mobile_layanan + '/packing_food/get_data_serah_terima/1/' + kode_toko,
                    "data": iamthedoor,
                    "type": "GET"
                },
                "columns": [
                    { "data": 'id' },
                    { "data": 'kode_transaksi' },
                    { "data": 'nama' },
                    { "data": 'harga_barang' },
                    { "data": 'status' },
                    { "data": 'status_packing' },
                ],
                // lengthChange: false,
                searching: false,
                "initComplete": function (settings, json) {
                    app.dialog.close();
                    $$('#datatables_length').hide();
                    $$('#datatables_filter').hide();
                    $$('#datatables_paginate').hide();
                },
                "rowCallback": function (row, data) {
                    $('td:eq(0)', row).html(`<a href="/tipe-f/edit_orderan_food/0/${data.id}" class="button button-small button-fill color-green"><i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Detail</a>`);

                    $('td:eq(4)', row).html('<a class="button button-small button-fill color-blue" href="/tipe-f/packing_food/tracking/' + data.id + '">Tracking</a>');

                    $('td:eq(5)', row).html('<div class="button button-small button-fill" style="background-color: #770afc;" id="serah_terima" data-id="' + data.id + '">Serah Terima</div>');
                }
            });

            // Create dynamic Sheet
            var dynamicSheet = app.sheet.create({
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
                                <div class="page-content hide-navbar-on-scroll hide-toolbar-on-scroll">
                                    <form class="list" id="form_serah_terima">
                                        <input type="hidden" id="id" name="id">
                                        <ul>
                                            <li>
                                                <div id="formupload-wrapper">
                                                    <ul id="formupload-wrapper-list">
                                                        <li class="item-content item-input">
                                                            <div class="item-inner">
                                                                <div class="row">
                                                                    <div class="col-60">
                                                                        <div class="item-inner">
                                                                            <div class="item-input-wrap">
                                                                                <div class="item-title item-label">Upload Foto</div>
                                                                                <input type="hidden" id="file_id_foto" name="file_id_foto">
                                                                                <input type="hidden" class="file_code_foto" id="file_code_foto" name="file_code_foto">
                                                                                <input type="text" class="file_desc_foto" id="file_desc_foto" name="file_desc_foto" value="Foto Produk">
                                                                                <input type="text" id="file_url_foto" name="file_url_foto" readonly>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-20 preview_file_foto"></div>
                                                                    <div class="col-20">
                                                                        <a id="foto" onClick="upload_foto(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="row">
                                                    <div class="col-100">
                                                        <div class="button button-round button-fill color-green" id="simpan">Simpan</div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </form>
                                </div>
                            </div>
                        </div>`,
                // Events
                on: {
                    open: function () {
                        $$('#simpan').on('click', function () {
                            if ($('#file_code_foto').val() == '') {
                                app.dialog.alert('Harap lengkapi foto tersebut');
                                return false;
                            }
                            app.input.validateInputs('#form_serah_terima');
                            if ($$('#form_serah_terima')[0].checkValidity() == true) {
                                let form_data = {};
                                let ajax_data = new Array();
                                $('#form_serah_terima').serializeArray().forEach(function (item) {
                                    form_data[item.name] = item.value;
                                });

                                ajax_data.push(iamthedoor);
                                ajax_data.push(form_data);

                                app.request.post(site_url_mobile_layanan + '/packing_food/save_serah_terima', ajax_data, function (response) {
                                    app.dialog.alert(response.message, function () {
                                        dynamicSheet.close();
                                        $('#table_serah_terima').DataTable().ajax.reload();
                                    });
                                }, 'json')
                            }
                        });
                    },
                }
            });

            // Open dynamic sheet
            $('#table_serah_terima').on('click', '#serah_terima', async function () {
                app.sheet.close('.my-sheet');
                await dynamicSheet.open();
                $('#id').val($(this).data('id'));
            });
        }
    }
}

var claim_penjual_food = {
    path: "/tipe-f/packing_food/list_menu/claim/:kode_toko",
    url: "./pages/tipe-f/packing_food/claim_penjual.html",
    name: "claim penjual",
    on: {
        pageInit: function () {
            const kode_toko = mainView.router.currentRoute.params.kode_toko;
            $$('#menu').attr('href', '/tipe-f/packing_food/' + kode_toko + '');
            // var cobalagi = new Framework7({
            //     dialog: {
            //         title: 'Gagal',
            //         buttonOk: 'Coba lagi',
            //         buttonCancel: 'Kembali' 
            //     }
            // });

            // $('#statusselectorder').on('change', function(){
            //     app.dialog.preloader('Memuat...')
            //     datatables.context[0].ajax.url = site_url_mobile_layanan + '/packing/get_data_claim_penjual/' + $('#statusselectorder option:selected').val() + '/' + kode_toko;
            //     $('#table_claim_penjual').DataTable().ajax.reload(function filter_data(resp){
            //         app.dialog.close()
            //         if(!resp.data){
            //             cobalagi.dialog.confirm('Gagal memuat data', filter_data, function(){
            //                     mainView.router.navigate('/tipe-f/packing');
            //             });
            //         }
            //     });
            // });

            app.dialog.preloader('Loading...');
            var datatables = $('#table_claim_penjual').DataTable({
                "serverSide": true,
                "ajax": {
                    "url": site_url_mobile_layanan + '/packing_food/get_data_claim_penjual/' + kode_toko,
                    "data": iamthedoor,
                    "type": "GET"
                },
                "columns": [
                    { "data": 'total' },
                    { "data": 'tanggal_claim' },
                    { "data": 'status' },
                ],
                // lengthChange: false,
                searching: false,
                "rowCallback": function (row, data) {
                    $('td:eq(0)', row).html(formatMoney(data.total));
                    if (data.status == 1) {
                        $('td:eq(2)', row).html(`<span class="badge color-green">Sukses</span>`)
                    } else if (data.status == 2) {
                        $('td:eq(2)', row).html(`<span class="badge color-red">Ditolak</span>`)
                    } else {
                        $('td:eq(2)', row).html(`<span class="badge color-gray">Menunggu</span>`)
                    }
                },
                "initComplete": function (settings, json) {
                    app.dialog.close();
                    $$('#datatables_length').hide();
                    $$('#datatables_filter').hide();
                    $$('#datatables_paginate').hide();
                }
            });

            $('#table_claim_penjual').on('click', '.detail_pesanan', function () {
                var detail_produk = '';
                app.request.post(site_url_mobile_layanan + '/packing_food/detail_produk/' + $$(this).data('pesanan'), iamthedoor, async function (response) {
                    await response.detail.forEach(function (item, index) {
                        detail_produk += `<div class="card" id="list_menu-${item.id}" style="background-color: ghostwhite">
                            <div class="card-content card-content-padding">
                                <a href="/tipe-f/marketplace_food/tracking_pesanan/${item.id_product}" class="item-link item-content">
                                    <div class="item-media"><img src="${site_url_image_layanan + item.foto}" width="80"/></div>
                                    <div class="item-inner">
                                        <div class="item-title">
                                            <div class="item-title">${item.nama}</div>
                                        </div>
                                        <div class="item-text">Rp. <span>${toIdrFormat(item.harga)}</span></div>
                                        <div class="item-text">Variasi <span>${item.variasi}</span></div>
                                        <div class="item-text">Kuantitas <span>${item.kuantitas}</span></div>
                                    </div>
                                </a>
                            </div>
                        </div>`;
                    });

                    detail_produk += `
                    <div class="row" style="font-size: 13px; margin: 15px">
                        <div class="col-40">Kode Transaksi</div>
                        <div class="col-60 text-align-right">${response.pesanan.kode_transaksi}</div>

                        <div class="col-40">Waktu Pemesanan</div>
                        <div class="col-60 text-align-right">${response.pesanan.waktu_pemesanan != null ? response.pesanan.waktu_pemesanan : ''}</div>

                        <div class="col-40">Waktu Pembayaran</div>
                        <div class="col-60 text-align-right">${response.pesanan.waktu_pembayaran != null ? response.pesanan.waktu_pembayaran : ''}</div>

                        <div class="col-40">Waktu Pengiriman</div>
                        <div class="col-60 text-align-right">${response.pesanan.waktu_pengiriman != null ? response.pesanan.waktu_pengiriman : ''}</div>

                        <div class="col-40">Waktu Penerima</div>
                        <div class="col-60 text-align-right">${response.pesanan.waktu_selesai_pesanan != null ? response.pesanan.waktu_selesai_pesanan : ''}</div>
                    </div>

                    <a href="#" class="button button-fill color-red popup-close">Close me</a>`;

                    app.popup.create({
                        content: `<div class="popup page-content">
                            <div class="block">
                                <form class="list">
                                    <div class="chip color-blue">
                                        <div class="chip-label">Detail Produk</div>
                                    </div>
                                    <div class="list media-list">
                                        ${detail_produk}
                                    </div>
                                </form>
                            </div>
                        </div>`,
                        // Events
                        on: {
                            open: function () {
                            },
                        }
                    }).open();
                }, 'json');
            });
        }
    }
}

var komplain_penjual_food = {
    path: "/tipe-f/packing_food/list_menu/komplain/:kode_toko",
    url: "./pages/tipe-f/packing_food/komplain.html",
    name: "komplain",
    on: {
        pageInit: function () {
            const kode_toko = mainView.router.currentRoute.params.kode_toko;
            $$('#menu').attr('href', '/tipe-f/packing_food/' + kode_toko + '');

            var statusselect = app.smartSelect.create({
                el: '.statusselect',
                on: {
                    close: function () {
                        app.dialog.preloader('Loading...');
                        datatables.context[0].ajax.url = site_url_mobile_layanan + '/packing_food/get_data_komplain/' + $$('#statusselect').val() + '/' + kode_toko;
                        $('#komplain_table').DataTable().ajax.reload(function (json) {
                            if (json.data) {
                                app.dialog.close();
                            } else {
                                app.dialog.close();
                                app.dialog.alert('Data tidak dapat ditemukan');
                            }
                        });
                    }
                }
            });

            app.dialog.preloader('Loading...');
            var datatables = $('#komplain_table').DataTable({
                "serverSide": true,
                "ajax": {
                    "url": site_url_mobile_layanan + '/packing_food/get_data_komplain/0/' + kode_toko,
                    "data": iamthedoor,
                    "type": "GET"
                },
                "columns": [
                    { 'data': 'id' },
                    { 'data': 'kode_transaksi' },
                    { 'data': 'nama_lengkap' },
                    { 'data': 'tanggal' },
                    { 'data': 'status_komplain' },
                ],
                lengthChange: false,
                searching: false,
                "rowCallback": function (row, data) {
                    $('td:eq(0)', row).html(`<a href="/tipe-f/packing_food/edit_komplain/${data.id}/packing" class="button button-small button-fill color-blue"><i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Jawab</a>`);

                    if (data.status_komplain == 0) {
                        $('td:eq(4)', row).html('<span style="background-color:yellow; padding:5px; border-radius:10px;">Berjalan</span>');
                    } else if (data.status_komplain == 1) {
                        $('td:eq(4)', row).html('<span style="background-color:#6ed8ff; padding:5px; border-radius:10px;">Dijawab</span>');
                    } else {
                        $('td:eq(4)', row).html('<span style="background-color:green; padding:5px; border-radius:10px;">Selesai</span>');
                    }
                },
                "initComplete": function (settings, json) {
                    app.dialog.close();
                    $$('#datatables_length').hide();
                    $$('#datatables_filter').hide();
                    $$('#datatables_paginate').hide();
                }
            });
        }
    }
}

var komplain_edit_food = {
    path: "/tipe-f/packing_food/edit_komplain/:id/:kode",
    url: "./pages/tipe-f/packing_food/edit_komplain.html",
    name: "edit_komplain",
    on: {
        pageInit: function () {
            let id = mainView.router.currentRoute.params.id;
            let kode = mainView.router.currentRoute.params.kode;

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile_layanan + '/packing_food/get_komplain/' + id, iamthedoor, function (response) {
                app.dialog.close();
                if (response.komplain.status_komplain == 2) {
                    $('.save_button').hide();
                }
                var komplain_rinci = '';
                response.komplain_rinci.forEach(async function (val, index) {
                    if (val.jenis == 0) {
                        komplain_rinci += `<div class="block-title">
                            <div class="row">
                                <div class="col-50">
                                    <div class="chip color-blue">
                                        <div class="chip-label">Komplain Pengguna</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ul>
                            <li class="item-content item-input">
                                <div class="item-inner">
                                    <div class="item-input-wrap">
                                        <div class="item-title item-label">Tanggal & Jam</div>
                                        <input readonly type="text" value="${val.tanggal_komplain}">
                                    </div>
                                </div>
                            </li>
                            <li class="item-content item-input">
                                <div class="item-inner">
                                    <div class="item-input-wrap">
                                        <div class="item-title item-label">Isi Komplain</div>
                                        <textarea cols="30" rows="10" readonly>${val.isi_komplain}</textarea>
                                    </div>
                                </div>
                            </li>
                            <li class="item-content item-input">
                                <div class="item-inner">
                                    <div class="row">
                                        <div class="col-60">
                                            <div class="item-inner">
                                                <div class="item-input-wrap">
                                                    <div class="item-title item-label">Foto Komplain</div>
                                                      <input class="fileurl" id="" type="text" value="${(!val.file_actual ? 'Foto tidak tersedia' : val.file_actual)}" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        ${(val.file_actual) ? `<div class="col-20">
                                            <a id="" onclick="preview_file(${val.id_file})" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>
                                        </div>` : ''}
                                    </div>
                                </div>
                            </li>
                        </ul>`;
                    } else {
                        komplain_rinci += `<div class="block-title">
                            <div class="row">
                                <div class="col-50">
                                    <div class="chip color-green">
                                        <div class="chip-label">Jawaban</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ul>
                            <li class="item-content item-input">
                                <div class="item-inner">
                                    <div class="item-input-wrap">
                                        <div class="item-title item-label">Tanggal & Jam</div>
                                        <input readonly type="text" value="${val.tanggal_komplain}">
                                    </div>
                                </div>
                            </li>
                            <li class="item-content item-input">
                                <div class="item-inner">
                                    <div class="item-input-wrap">
                                        <div class="item-title item-label">Jawaban</div>
                                        <textarea cols="30" rows="10" readonly>${val.isi_komplain}</textarea>
                                    </div>
                                </div>
                            </li>
                            <li class="item-content item-input">
                                <div class="item-inner">
                                    <div class="row">
                                        <div class="col-60">
                                            <div class="item-inner">
                                                <div class="item-input-wrap">
                                                    <div class="item-title item-label">Foto Komplain</div>
                                                      <input class="fileurl" id="" type="text" value="${(!val.file_actual ? 'Foto tidak tersedia' : val.file_actual)}" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        ${(val.file_actual) ? `<div class="col-20">
                                            <a id="" onclick="preview_file(${val.id_file})" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>
                                        </div>` : ''}
                                    </div>
                                </div>
                            </li>
                        </ul>`;
                    }
                });
                if (kode == 'packing') {
                    komplain_rinci += `<div class="block-title">
                        <div class="row">
                            <div class="col-50">
                                <div class="chip color-green">
                                    <div class="chip-label">Jawaban</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul>
                        <li class="item-content item-input">
                            <div class="item-inner">
                                <div class="item-input-wrap">
                                    <div class="item-title item-label">Jawaban</div>
                                    <textarea cols="30" rows="10" name="isi_komplain" required></textarea>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div id="formupload-wrapper">
                                <ul id="formupload-wrapper-list">
                                    <li class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="row">
                                                <div class="col-60">
                                                    <div class="item-inner">
                                                        <div class="item-input-wrap">
                                                            <div class="item-title item-label">Foto</div>
                                                            <input type="hidden" id="file_id_foto_produk" name="file_id_foto_produk">
                                                            <input type="hidden" class="file_code" id="file_code_foto_produk" name="file_code_foto_produk">
                                                            <input type="text" class="file_desc" id="file_desc_foto_produk" name="file_desc_foto_produk" value="Foto Produk">
                                                            <input type="text" id="file_url_foto_produk" name="file_url_foto_produk" readonly>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-20 preview_file_foto_produk"></div>
                                                <div class="col-20">
                                                    <a id="foto_produk" onClick="upload_foto(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>`;
                    if (response.komplain.status_komplain != 2) {
                        $('#close').show();
                    }
                } else {
                    komplain_rinci += `<div class="block-title">
                        <div class="row">
                            <div class="col-50">
                                <div class="chip color-blue">
                                    <div class="chip-label">Komplain Pengguna</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul>
                        <li class="item-content item-input">
                            <div class="item-inner">
                                <div class="item-input-wrap">
                                    <div class="item-title item-label">Isi Komplain</div>
                                    <textarea cols="30" rows="10" name="isi_komplain" required></textarea>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div id="formupload-wrapper">
                                <ul id="formupload-wrapper-list">
                                    <li class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="row">
                                                <div class="col-60">
                                                    <div class="item-inner">
                                                        <div class="item-input-wrap">
                                                            <div class="item-title item-label">Foto</div>
                                                            <input type="hidden" id="file_id_foto_produk" name="file_id_foto_produk">
                                                            <input type="hidden" class="file_code" id="file_code_foto_produk" name="file_code_foto_produk">
                                                            <input type="text" class="file_desc" id="file_desc_foto_produk" name="file_desc_foto_produk" value="Foto Produk">
                                                            <input type="text" id="file_url_foto_produk" name="file_url_foto_produk" readonly>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-20 preview_file_foto_produk"></div>
                                                <div class="col-20">
                                                    <a id="foto_produk" onClick="upload_foto(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>`;
                }
                $('.komplain-rinci').html(komplain_rinci);
            }, 'json');

            $$('#simpan').on('click', function () {
                app.input.validateInputs('#edit_komplain_packing');
                if ($$('#edit_komplain_packing')[0].checkValidity() == true) {
                    let form_data = {};
                    let ajax_data = new Array();
                    $('#edit_komplain_packing').serializeArray().forEach(function (item) {
                        form_data[item.name] = item.value;
                    });
                    ajax_data.push(iamthedoor);
                    ajax_data.push(form_data);
                    ajax_data.push('simpan');

                    app.request.post(site_url_mobile_layanan + '/packing_food/save_komplain/' + id + '/' + kode, ajax_data, function (response) {
                        app.dialog.alert(response.message, function () {
                            mainView.router.back();
                            $('#komplain_table').DataTable().ajax.reload();
                        });
                    }, 'json')
                }
            })

            $$('#close').on('click', function () {
                let form_data = {};
                let ajax_data = new Array();
                $('#edit_komplain_packing').serializeArray().forEach(function (item) {
                    form_data[item.name] = item.value;
                });
                ajax_data.push(iamthedoor);
                ajax_data.push(form_data);
                ajax_data.push('close');

                app.request.post(site_url_mobile_layanan + '/packing_food/save_komplain/' + id + '/' + kode, ajax_data, function (response) {
                    app.dialog.alert(response.message, function () {
                        mainView.router.back();
                        $('#komplain_table').DataTable().ajax.reload();
                    });
                }, 'json')
            })
        }
    }
}

var pembatalan_food = {
    path: "/tipe-f/packing_food/list_menu/pembatalan/:kode_toko",
    url: "./pages/tipe-f/packing_food/pembatalan.html",
    name: "pembatalan",
    on: {
        pageInit: function () {
            const kode_toko = mainView.router.currentRoute.params.kode_toko;
            $$('#menu').attr('href', '/tipe-f/packing_food/' + kode_toko + '');
            app.dialog.preloader('Loading...');
            var datatables = $('#table_pembatalan').DataTable({
                "serverSide": true,
                "ajax": {
                    "url": site_url_mobile_layanan + '/packing_food/get_data_pembatalan/pembatalan/' + kode_toko,
                    "data": iamthedoor,
                    "type": "GET"
                },
                "columns": [
                    { "data": 'id' },
                    { "data": 'kode_transaksi' },
                    { "data": 'nama_produk' },
                    { "data": 'harga_barang' },
                ],
                // lengthChange: false,
                searching: false,
                "initComplete": function (settings, json) {
                    app.dialog.close();
                    $$('#datatables_length').hide();
                    $$('#datatables_filter').hide();
                    $$('#datatables_paginate').hide();
                },
                "rowCallback": function (row, data) {
                    $('td:eq(0)', row).html(`<a href="/tipe-f/edit_orderan_food/1/${data.id}" class="button button-small button-fill color-green"><i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Detail</a>`);
                    $("td:eq(3)", row).html('Rp ' + toIdrFormat(data.harga_barang));
                }
            });
        }
    }
}

var tb_pengembalian_food = {
    path: "/tipe-f/packing_food/list_menu/pengembalian/:kode_toko",
    url: "./pages/tipe-f/packing_food/pengembalian.html",
    name: "pengembalian",
    on: {
        pageInit: function () {
            const kode_toko = mainView.router.currentRoute.params.kode_toko;
            $$('#menu').attr('href', '/tipe-f/packing_food/' + kode_toko + '');

            app.dialog.preloader('Loading...');
            var datatables = $('#table_pengembalian').DataTable({
                "serverSide": true,
                "ajax": {
                    "url": site_url_mobile_layanan + '/packing_food/get_data_pengembalian/pengembalian/' + kode_toko,
                    "data": iamthedoor,
                    "type": "GET"
                },
                "columns": [
                    { "data": 'id' },
                    { "data": 'kode_transaksi' },
                    { "data": 'nama_produk' },
                    { "data": 'harga_barang' },
                ],
                // lengthChange: false,
                searching: false,
                "initComplete": function (settings, json) {
                    app.dialog.close();
                    $$('#datatables_length').hide();
                    $$('#datatables_filter').hide();
                    $$('#datatables_paginate').hide();
                },
                "rowCallback": function (row, data) {
                    $('td:eq(0)', row).html(`<a href="/tipe-f/edit_orderan_food/2/${data.id}" class="button button-small button-fill color-green"><i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Detail</a>`);
                    $("td:eq(3)", row).html('Rp ' + toIdrFormat(data.harga_barang));
                }
            });
        }
    }
}

var tracking_food = {
    path: "/tipe-f/packing_food/tracking/:id",
    url: "./pages/tipe-f/packing_food/tracking.html",
    name: "tracking",
    on: {
        pageInit: function () {
            let id = mainView.router.currentRoute.params.id;

            app.dialog.preloader('Loading...');
            var datatables = $('#table_tracking_kurir').DataTable({
                "ajax": {
                    "url": site_url_mobile_layanan + '/packing_food/get_data_tracking/' + id,
                    "data": iamthedoor,
                    "type": "GET"
                },
                "columns": [
                    { "data": 'tgl' },
                    { "data": 'desc' },
                ],
                searching: false,
                "initComplete": function (settings, json) {
                    app.dialog.close();
                },
                "rowCallback": function (row, data) {
                    var desc = data.desc;
                    if (data.desc == 'Barang sudah diterima') {
                        desc = `Barang sudah diterima ${(data.file_actual) ? `<div class="link" style="color: blue;" onclick="preview_file(${data.id_file})" style="margin-left:2px;">[${data.file_actual}]</div>` : `[File tidak ada]`}`;
                    }
                    $('td:eq(1)', row).html(desc);
                }
            });
        }
    }
}

var detail_food = {
    path: "/tipe-f/packing_food/detail/:id/:id_product_item",
    url: "./pages/tipe-f/packing_food/detail_food.html",
    name: "detail_food",
    on: {
        pageInit: function () {
            let id = mainView.router.currentRoute.params.id;
            let id_product_item = mainView.router.currentRoute.params.id_product_item;

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile_layanan + '/marketplace_food/product/' + id, iamthedoor, function (callback) {
                app.dialog.close();

                let product_selected = callback.product_item.filter(function (item) {
                    return (item.id == id_product_item)
                })[0];

                $$('#nama').html(callback.product.nama);
                $$('#deskripsi').html(callback.product.deskripsi);
                $$("#logo").attr("src", base_url + '/' + callback.logo_toko);
                $$("#detail_toko").attr("href", '/tipe-f/toko/' + callback.info_toko.kode_toko);
                $$('#variasi').val(callback.product_item.variasi);
                $$('#harga').html('Rp' + toIdrFormat(product_selected.harga));
                $$('#stock').val(product_selected?.sisa_stok);
                $$('#nama_usaha').html(callback.info_toko.nama_usaha);
                $$('#detail_toko').attr("href", '/tipe-f/toko/' + callback.info_toko.kode_toko);
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

                $('input[name=radio_variasi]').change(function () {
                    var id_produk_item = $('input[name=radio_variasi]:checked').val();
                    $.post(site_url_mobile_layanan + '/marketplace_food/get_product_item/' + id_produk_item, iamthedoor, function (data) {
                        $$('#harga').html('Rp' + toIdrFormat(data.harga));
                        $$('#stock').val(data.sisa_stok);
                        $('#foto_produk').attr('src', site_url_image_layanan + '/' + data.file_actual);
                        $('#nama').html(data.variasi);
                    }, 'json');
                });

                $('#foto_produk').attr('src', site_url_image_layanan + '/' + product_selected.foto);

            }, function () {
                app.dialog.close();
                app.dialog.alert('Gagal Mendapatkan Data Anda, Mohon Coba Lagi Nanti');
            }, 'json');
        }
    }
}

function formatMoney(num) {
    let number = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(num);

    return number;
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