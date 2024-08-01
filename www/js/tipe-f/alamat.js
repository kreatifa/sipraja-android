var list_alamat = {
    path: "/tipe-f/alamat/list",
    url: "./pages/tipe-f/alamat/index.html",
    name: "list_alamat",
    on: {
        pageInit: function () {
            // app.dialog.preloader('Loading...');
            var datatables = $('#table_alamat_pengiriman').DataTable({
                serverSide: true,
                ajax: {
                    url: site_url_mobile_layanan + '/marketplace/get_data',
                    data: iamthedoor,
                    type: 'GET'
                },
                columns: [
                    { data: 'id' },
                    { data: 'nama_lengkap' },
                    { data: 'no_telp' },
                    { data: 'prov' },
                    { data: 'kab' },
                    { data: 'kec' },
                    { data: 'kel' },
                    { data: 'nama_jalan' },
                    { data: 'detail_alamat' },
                    { data: 'kategori' },
                ],
                "initComplete": function (settings, json) {
                    // app.dialog.close();
                    $$('#datatables_length').hide();
                    $$('#datatables_filter').hide();
                },
                "rowCallback": function (row, data) {
                    let status = '';
                    if (data.status == 1) {
                        status = `<span style="background-color: #A9A9A9; padding:5px; border-radius:10px; color:white;"><i class="fa fa-check-circle-o" aria-hidden="true"></i> Default</span>`;
                    } else {
                        status = `<button type="button" class="button button-fill color-green aktivasi" data-id="${data.id}" data-id_pemohon="${data.id_pemohon}">Aktivasi</button>`;
                    }
                    var html = ` ${status} <a href="/tipe-f/alamat/edit/${data.id}" class="button button-fill">Edit</a>`;
                    $('td:eq(0)', row).html(html);
                }
            });

            $$('#table_alamat_pengiriman').on('click', '.aktivasi', function () {
                var id = $(this).data("id");
                var id_pemohon = $(this).data("id_pemohon");
                app.dialog.confirm('Apakah anda yakin menjadikan alamat default marketplace?', function () {
                    let form_data = {
                        "id": id,
                        "id_pemohon": id_pemohon,
                    };
                    let ajax_data = new Array();

                    ajax_data.push(iamthedoor);
                    ajax_data.push(form_data);
                    app.request.post(site_url_mobile_layanan + '/marketplace/save_alamat_default', ajax_data, function (data) {
                        if (data) {
                            app.dialog.alert('Alamat berhasil menjadi default');
                        }
                        $('#table_alamat_pengiriman').DataTable().ajax.reload();
                    }, 'json');
                });
            });
        }
    }
}

var new_alamat = {
    path: "/tipe-f/alamat/new",
    url: "./pages/tipe-f/alamat/new_alamat.html",
    name: "new_alamat",
    on: {
        pageInit: function () {
            app.request.post(site_url_mobile_layanan + "/marketplace/alamat_pengiriman", iamthedoor, function (data) {
                get_provinsi_new('#no_prop');
                $$('#no_prop').on('change', function () {
                    get_kabupaten_new($$('#no_prop').val(), '#no_kab');
                });
                $$('#no_kab').on('change', function () {
                    get_kecamatan_new($$('#no_kab').val(), '#no_kec');
                });
                $$('#no_kec').on('change', function () {
                    get_kelurahan_new($$('#no_kec').val(), '#no_kel');
                });
            }, 'json');

            var maplet; var maplayer;
            maplet = L.map('mapid', { minZoom: 2 }).setView([
                '-7.4517287',
                '112.7026495'
            ], 14);
            let osmLayer = new L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            });
            maplet.addLayer(osmLayer);
            maplayer = L.layerGroup().addTo(maplet);
            maplet.on('click', function (evt) {
                maplayer.clearLayers();
                L.marker([evt.latlng.lat, evt.latlng.lng]).addTo(maplayer);
                $$('#latitude').val(evt.latlng.lat);
                $$('#longitude').val(evt.latlng.lng);
            });

            $$('#simpan').on('click', function () {
                app.input.validateInputs('#form_new_alamat_pengiriman');
                if ($$('#form_new_alamat_pengiriman')[0].checkValidity() == true) {
                    let form_data = app.form.convertToData('#form_new_alamat_pengiriman');

                    let ajax_data = new Array();
                    ajax_data.push(iamthedoor);
                    ajax_data.push(form_data);

                    app.dialog.preloader('Loading...');
                    app.request.post(site_url_mobile_layanan + '/marketplace/create_alamat', ajax_data, function (data) {
                        app.dialog.close();
                        if (data) {
                            app.dialog.alert('Data Berhasil Disimpan');
                            mainView.router.back();
                            $('#table_alamat_pengiriman').DataTable().ajax.reload();
                        } else {
                            app.dialog.alert(data.desc);
                        }
                    }, function () {
                        app.dialog.close();
                        app.dialog.alert('Data Gagal Disimpan, Mohon Coba Lagi Nanti');
                    }, 'json');
                }
            });
        }
    }
}

var edit_alamat = {
    path: "/tipe-f/alamat/edit/:id",
    url: "./pages/tipe-f/alamat/edit_alamat.html",
    name: "edit_alamat",
    on: {
        pageInit: function () {
            let id = mainView.router.currentRoute.params.id;
            var maplet; var maplayer;
            app.request.post(site_url_mobile_layanan + "/marketplace/get_alamat_pengiriman/" + id, iamthedoor, function (data) {
                $$("#btndeletealamat").html('<a class="link button button-round button-fill color-red" id="hapusalamat" style="margin-top: 10px;">' + '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Hapus Alamat</span></a>');

                $$('#nama_lengkap').val(data.pengiriman.nama_lengkap);
                $$('#no_telp').val(data.pengiriman.no_telp);
                $$('#nama_jalan').val(data.pengiriman.nama_jalan);
                $$('#detail_alamat').val(data.pengiriman.detail_alamat);
                $$('#kategori').val(data.pengiriman.kategori);

                $$('#latitude').val(data.pengiriman.latitude);
                $$('#longitude').val(data.pengiriman.longitude);

                get_provinsi_new('#no_prop', data.pengiriman.no_prop);
                $$('#no_prop').on('change', function () {
                    get_kabupaten_new($$('#no_prop').val(), '#no_kab', data.pengiriman.no_kab);
                });
                $$('#no_kab').on('change', function () {
                    get_kecamatan_new($$('#no_kab').val(), '#no_kec', data.pengiriman.no_kec);
                });
                $$('#no_kec').on('change', function () {
                    get_kelurahan_new($$('#no_kec').val(), '#no_kel', data.pengiriman.no_kel);
                });

                maplet = L.map('mapid', { minZoom: 2 });
                let osmLayer = new L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                });
                maplet.addLayer(osmLayer);
                maplayer = L.layerGroup().addTo(maplet);
                if (data.pengiriman.latitude != null && data.pengiriman.longitude != null) {
                    maplet.setView([data.pengiriman.latitude, data.pengiriman.longitude], 14);
                    L.marker([data.pengiriman.latitude, data.pengiriman.longitude]).addTo(maplayer);
                } else {
                    maplet.setView(['-7.4517287', '112.7026495'], 14);
                }
                maplet.on('click', function (evt) {
                    maplayer.clearLayers();
                    L.marker([evt.latlng.lat, evt.latlng.lng]).addTo(maplayer);
                    $$('#latitude').val(evt.latlng.lat);
                    $$('#longitude').val(evt.latlng.lng);
                });

                $$('#simpan').on('click', function () {
                    app.input.validateInputs('#form_edit_alamat_pengiriman');
                    if ($$('#form_edit_alamat_pengiriman')[0].checkValidity() == true) {
                        let form_data = app.form.convertToData('#form_edit_alamat_pengiriman');

                        let ajax_data = new Array();
                        ajax_data.push(iamthedoor);
                        ajax_data.push(form_data);

                        app.dialog.preloader('Loading...');
                        app.request.post(site_url_mobile_layanan + '/marketplace/edit_alamat/' + id + '/edit', ajax_data, function (data) {
                            app.dialog.close();
                            if (data) {
                                app.dialog.alert('Data Berhasil Disimpan');
                                mainView.router.back();
                                $('#table_alamat_pengiriman').DataTable().ajax.reload();
                            } else {
                                app.dialog.alert(data.desc);
                            }
                        }, function () {
                            app.dialog.close();
                            app.dialog.alert('Data Gagal Disimpan, Mohon Coba Lagi Nanti');
                        }, 'json');
                    }
                });

                $$('#hapusalamat').on('click', function () {
                    app.dialog.preloader('Loading...');
                    app.request.post(site_url_mobile_layanan + '/marketplace/edit_alamat/' + id + '/delete', iamthedoor, function (data) {
                        app.dialog.close();
                        if (data) {
                            app.dialog.alert('Data Berhasil Dihapus');
                            mainView.router.back();
                            $('#table_alamat_pengiriman').DataTable().ajax.reload();
                        } else {
                            app.dialog.alert(data.desc);
                        }
                    }, function () {
                        app.dialog.close();
                        app.dialog.alert('Data Gagal Disimpan, Mohon Coba Lagi Nanti');
                    }, 'json');
                });
            }, 'json');

        }
    }
}