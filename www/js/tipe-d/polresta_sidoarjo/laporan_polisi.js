var laporan_polisi_new = {
    path: '/tipe-d/polresta_sidoarjo/laporan_polisi_new/',
    url: './pages/tipe-d/polresta_sidoarjo/laporan_polisi_new.html',
    name: 'laporan_polisi_new',
    on: {
        pageInit: function () {
            var tgl_lahir = app.calendar.create({
                inputEl: '#tgl_lahir',
                openIn: 'customModal',
                header: true,
                footer: true,
                dateFormat: 'dd-MM-yyyy',
            });
            tgl_lahir.setValue([new Date()])
            app.dialog.confirm('Apakah anda ingin menerapkan data profile pada form berikut?', 'Sipraja', function () {
                $$("#nama").val(datauser.nama);
                $$("#alamat").val(datauser.alamat);
                $$("#no_identitas").val(datauser.nik);
                $$("#agama").val(datauser.agama);
                $$("#pekerjaan").val(datauser.pekerjaan);
                $$("#pendidikan_terakhir").val(datauser.pendidikan_terakhir);
                $$("#jenis_kelamin").val(datauser.jenis_kelamin);
                $$("#tempat_lahir").val(datauser.tempat_lahir);
                tgl_lahir.setValue([new Date(datauser.tanggal_lahir)])
                $$("#no_hp").val(datauser.no_telp_pendaftar);
                if (datauser.kwn == 'WNI') {
                    $$('#kewarganegaraan').val('Warga Negara Indonesia');
                } else if (datauser.kwn == 'WNA') {
                    $$('#kewarganegaraan').val('Warga Negara Asing');
                }
            }, function () {
                return false
            })
            $$('#simpan').on('click', function () {
                var empty = true;
                $('select').each(function () {
                    if ($(this).val()[0] == '-') {
                        app.dialog.alert($(this).prev().text() + ' Belum Diisi')
                        empty = false
                        return false
                    }
                });
                app.input.validateInputs("#form_laporan_polisi");
                if (empty) {
                    app.dialog.preloader('Loading...')
                    if ($$('#form_laporan_polisi')[0].checkValidity() == true) {
                        var mydata = app.form.convertToData("#form_laporan_polisi");
                        mydata.id_pemohon = datauser.bf_users_id
                        var ajaxdata = [iamthedoor, mydata]
                        app.request.post(`${site_url_mobile_layanan}/Laporan_polisi/save_laporan`, ajaxdata, function (data) {
                            if (data) {
                                app.dialog.close()
                                app.dialog.alert('Data berhasil disimpan')
                                mainView.router.back();
                                $('#datatables').DataTable().ajax.reload();
                            } else {
                                app.dialog.close()
                                app.dialog.alert('Data gagal disimpan')
                            }
                        }, function (error) {
                            app.dialog.alert(error)
                        }, 'json')
                    }
                }
            })
        },
    }
};
var laporan_polisi = {
    path: '/tipe-d/polresta_sidoarjo/laporan_polisi/',
    url: './pages/tipe-d/polresta_sidoarjo/laporan_polisi.html',
    name: 'laporan_polisi',
    on: {
        pageInit: function () {
            // app.dialog.preloader('Loading...');
            var datatables = $('#datatables').DataTable({
                serverSide: true,
                ajax: {
                    url: site_url_mobile_layanan + '/Laporan_polisi/get_data/0/' + iamthedoor.user_id,
                    data: iamthedoor,
                    type: 'POST'
                },
                columns: [
                    { data: 'id' },
                    { data: 'nama' },
                    { data: 'no_identitas' },
                    { data: 'jenis_kelamin' },
                    { data: 'agama' },
                    { data: 'pendidikan_terakhir' },
                    { data: 'tempat_lahir' },
                    { data: 'tgl_lahir' },
                    { data: 'pekerjaan' },
                    { data: 'kewarganegaraan' },
                    { data: 'no_hp' },
                    { data: 'alamat' },
                ],
                initComplete: function (settings, json) {
                    app.dialog.close();
                    $$('#datatables_length').hide();
                    $$('#datatables_filter').hide();
                    // $$('#datatables_paginate').hide();
                },
                "rowCallback": function (row, data) {
                    if (datauser.role_id == '4') {
                        $('td:eq(0)', row).html('<a href="/tipe-d/polresta_sidoarjo/laporan_polisi_edit/' + data.id + '/edit" class="button button-small button-fill color-blue">' +
                            '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');
                    }
                }
            })
        },
    }
};
var laporan_polisi_edit = {
    path: '/tipe-d/polresta_sidoarjo/laporan_polisi_edit/:id/:tipe',
    url: './pages/tipe-d/polresta_sidoarjo/laporan_polisi_edit.html',
    name: 'laporan_polisi_edit',
    on: {
        pageInit: function () {
            var id = mainView.router.currentRoute.params.id;
            var tipe = mainView.router.currentRoute.params.tipe;
            var ajaxdata = [iamthedoor, id]
            var tgl_lahir = app.calendar.create({
                inputEl: '#tgl_lahir',
                openIn: 'customModal',
                header: true,
                footer: true,
                dateFormat: 'dd-MM-yyyy',
            });
            function tanggal(params) {
                const [day, month, year] = params.split('-');
                const result = [year, month, day].join('-');
                return result
            }
            if (datauser.role_id == '4') {
                $$("#btndeletelayanan").html('<a class="button button-round button-fill color-red" id="deletelayanan" style="margin-top: 10px;">' +
                    '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Hapus Data</span></a>');
            }
            app.request.post(`${site_url_mobile_layanan}/laporan_polisi/get_id/`, ajaxdata, function (data) {
                $$("#nama").val(data.nama);
                $$("#alamat").val(data.alamat);
                $$("#no_identitas").val(data.no_identitas);
                $$("#agama").val(data.agama);
                $$("#pekerjaan").val(data.pekerjaan);
                $$("#pendidikan_terakhir").val(data.pendidikan_terakhir);
                $$("#jenis_kelamin").val(data.jenis_kelamin);
                $$("#tempat_lahir").val(data.tempat_lahir);
                tgl_lahir.setValue([new Date(tanggal(data.tgl_lahir))])
                $$("#no_hp").val(data.no_hp);
                $$("#kewarganegaraan").val(data.kewarganegaraan);
            }, function (error) { app.dialog.alert(error) }, 'json')
            $$('#simpan').on('click', function () {
                app.input.validateInputs("#form_laporan_polisi");
                if ($$('#form_laporan_polisi')[0].checkValidity() == true) {
                    var mydata = app.form.convertToData("#form_laporan_polisi");
                    const ajaxdata = [iamthedoor, mydata]
                    app.request.post(`${site_url_mobile_layanan}/Laporan_polisi/save_laporan/update/${id}`, ajaxdata, function (data) {
                        if (data) {
                            app.dialog.close()
                            app.dialog.alert('Data berhasil disimpan')
                            mainView.router.back();
                            $('#datatables').DataTable().ajax.reload();
                        } else {
                            app.dialog.close()
                            app.dialog.alert('Data gagal disimpan')
                        }
                    }, function (error) { app.dialog.alert('Data gagal disimpan') }, 'json')
                }
            })
            $$('#btndeletelayanan').on('click', function () {
                app.dialog.confirm('Anda yakin untuk menghapus data ini?', 'Sipraja', function () {
                    //   app.dialog.preloader('Loading...')
                    var ajaxdata = [iamthedoor, id]
                    app.request.post(`${site_url_mobile_layanan}/Laporan_polisi/delete/`, ajaxdata, function (data) {
                        if (data) {
                            app.dialog.close()
                            app.dialog.alert('Data berhasil dihapus')
                            mainView.router.back();
                            $('#datatables').DataTable().ajax.reload();
                        }
                    }, function () {
                        app.dialog.close()
                        app.dialog.alert('Data gagal dihapus')
                    }, 'json')
                }, function () { return false })
            })
        }
    }
}