const PDFDocumentWaarmeking = PDFLib.PDFDocument;
const StandardFontsWaarmeking = PDFLib.StandardFonts;
const rgbWaarmeking = PDFLib.rgb;
const degreesWaarmeking = PDFLib.degrees;

var waarmeking = {
    path: '/tipe-b/waarmeking',
    url: './pages/tipe-b/waarmeking.html',
    name: 'waarmeking',
    on: {
        pageInit: function () {
            var pedoman = app.popup.create({
                content: '<div class="popup">' +
                    '<div class="view">' +
                    '<div class="page">' +
                    '<div class="navbar">' +
                    '<div class="navbar-inner">' +
                    '<div class="title">Dokumen Pedoman</div>' +
                    '<div class="right">' +
                    '<a class="link popup-close">Close</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="page-content">' +
                    '<div class="block">' +
                    '<table class="data-table card">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>NO</th>' +
                    '<th>KETERANGAN</th>' +
                    '<th>AKSI</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>' +
                    // 1
                    '<tr>' +
                    '<td>' + '1' + '</td>' +
                    '<td>' + 'Hukum Perdata Waris' + '</td>' +
                    '<td><a id="hukum_perdata.pdf" onclick="cetak_dokumen(this.id)" class="link button button-fill color-green"><i class="icon f7-icons">arrow_down_doc_fill</i> Download</a></td>' +
                    '</tr>' +
                    // 2
                    '<tr>' +
                    '<td>' + '2' + '</td>' +
                    '<td>' + 'Komplikasi Hukum Islam' + '</td>' +
                    '<td><a id="kompilasi_hukum_islam.pdf" onclick="cetak_dokumen(this.id)" class="link button button-fill color-green"><i class="icon f7-icons">arrow_down_doc_fill</i> Download</a></td>' +
                    '</tr>' +
                    // 3
                    '<tr>' +
                    '<td>' + '3' + '</td>' +
                    '<td>' + 'Kewarisan' + '</td>' +
                    '<td><a id="hukum_islam_2.pdf" onclick="cetak_dokumen(this.id)" class="link button button-fill color-green"><i class="icon f7-icons">arrow_down_doc_fill</i> Download</a></td>' +
                    '</tr>' +
                    // 4
                    '<tr>' +
                    '<td>' + '4' + '</td>' +
                    '<td>' + 'Tabel Ahli dan Bagian Waris' + '</td>' +
                    '<td><a id="hukum_islam_1.pdf" onclick="cetak_dokumen(this.id)" class="link button button-fill color-green"><i class="icon f7-icons">arrow_down_doc_fill</i> Download</a></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>',
                // Events
                on: {
                }
            });
            $$('#pedoman').on('click', function () {
                pedoman.open();
            });
            if (iamthedoor.role_id == 4) {
                $$('#btnnew').show();
            }
            var statusselect = app.smartSelect.create({
                el: '.statusselect',
                on: {
                    close: function () {
                        app.dialog.preloader('Loading...');
                        datatables.context[0].ajax.url = site_url_mobile_layanan + '/waarmeking/get_data/' + $$('#statusselect').val();
                        $('#datatables').DataTable().ajax.reload(function (json) {
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
            var datatables = $('#datatables').DataTable({
                serverSide: true,
                ajax: {
                    url: site_url_mobile_layanan + '/waarmeking/get_data/1',
                    data: iamthedoor,
                    type: 'GET'
                },
                columns: [
                    { data: 'id' },
                    { data: 'kode_transaksi' },
                    { data: 'nik_pemohon' },
                    { data: 'nama_pemohon' },
                    { data: 'nama_pewaris' },
                    { data: 'display_name' },
                    { data: 'val_status' },
                ],
                "initComplete": function (settings, json) {
                    app.dialog.close();
                    $$('#datatables_length').hide();
                    $$('#datatables_filter').hide();
                },
                "rowCallback": function (row, data) {
                    var color = '#17A05E';
                    $('td:eq(6)', row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px; color:white;">Bisa Diambil</span>');
                    if (data.val_status) {
                        if (data.val_status == 'Ditolak') {
                            color = '#DE4E42';
                        } else if (data.val_status == 'Menunggu') {
                            color = '#FF9800';
                        }
                        $('td:eq(6)', row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px; color:white;">' + data.val_status + '</span>');
                    }
                    if (data.val_status == 'Menunggu') {
                        if (datauser.role_id == '4') {
                            $('td:eq(0)', row).html('<a href="/tipe-b/edit_waarmeking/' + data.id + '/edit/" class="button button-small button-fill color-blue">' +
                                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');
                        } else {
                            $('td:eq(0)', row).html('<a href="/tipe-b/edit_waarmeking/' + data.id + '/approve/" class="button button-small button-fill color-green">' +
                                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Approve</a>');
                        }
                    } else {
                        $('td:eq(0)', row).html('<a href="/tipe-b/edit_waarmeking/' + data.id + '/view/" class="button button-small button-fill color-green">' +
                            '<i class="icon f7-icons" style="font-size: 12pt;">zoom_in</i> Lihat</a>');
                    }
                }
            });
        },
    }
}

var new_waarmeking = {
    path: '/tipe-b/new_waarmeking/',
    url: './pages/tipe-b/new_waarmeking.html',
    name: 'new_waarmeking',
    on: {
        pageInit: function () {
            $.getScript({ url: './js/tipe-b/waarmeking_table.js' }, function () {
                waarmeking_table_create();
            });

            // add_attachment_pendaftar(datauser.attachments);
            $$('#nik_pemohon').val(datauser.nik);
            $$('#nama_pemohon').val(datauser.nama);
            $$('#tempat_lahir').val(datauser.tempat_lahir);
            $$('#tanggal_lahir').val(new Date(datauser.tanggal_lahir).toDateIndoFormat());
            $$('#jenis_kelamin').val(datauser.jenis_kelamin);
            $$('#telepon').val(datauser.no_telp_pendaftar);
            $$('#kecamatan').val(datauser.nama_kec);
            $$('#kelurahan').val(datauser.nama_kel);
            $$('#email').val(datauser.email);
            $$('#alamat').val(datauser.alamat);

            get_kecamatan_dom('#kecamatan_pewaris', '#kelurahan_pewaris');
            $$('#kecamatan_pewaris').on('change', function () {
                get_kelurahan_dom($$('#kecamatan_pewaris').val(), '#kelurahan_pewaris');
            });

            $$("#addformupload").on("touchend", addrow);

            $$('#simpan').on('click', function () {
                app.input.validateInputs('#form_new_waris');
                if ($$('#form_new_waris')[0].checkValidity() == true) {
                    let form_data = app.form.convertToData('#form_new_waris');

                    let ajax_data = new Array();
                    ajax_data.push(iamthedoor); // 0
                    ajax_data.push(form_data);  // 1
                    ajax_data.push(ahli_waris); // 2
                    ajax_data.push(tujuan); // 3
                    app.dialog.preloader('Loading...');
                    app.request.post(site_url_mobile_layanan + '/waarmeking/create_waris', ajax_data, function (data) {
                        app.dialog.close();
                        if (data) {
                            app.dialog.alert('Data Berhasil Diajukan');
                            mainView.router.back();
                            $('#datatables').DataTable().ajax.reload();
                        } else {
                            app.dialog.alert(data.desc);
                        }
                    }, function () {
                        app.dialog.close();
                        app.dialog.alert('Data Gagal Diajukan, Mohon Coba Lagi Nanti');
                    }, 'json');
                } else {
                    app.dialog.alert('Mohon isi data dengan benar');
                }
            });
        },
    }
};

var edit_waarmeking = {
    path: '/tipe-b/edit_waarmeking/:id/:tipe',
    url: './pages/tipe-b/edit_waarmeking.html',
    name: 'edit_waarmeking',
    on: {
        pageInit: function () {
            var id = mainView.router.currentRoute.params.id;
            var tipe = mainView.router.currentRoute.params.tipe;

            $$('#approval').hide();
            if (tipe == 'view' || iamthedoor.role_id != 4) {
                $$('#approval').show();
                $$('#btndeletelayanan').remove();
                $('#form_edit_waris input').prop('readonly', true);
                $$('.hapus-table').hide();
                $$('#addahliwaris').hide();
                $$('#addformupload').hide();
            }

            get_kecamatan_dom('#kecamatan_pewaris', '#kelurahan_pewaris');
            $$('#kecamatan_pewaris').on('change', function () {
                get_kelurahan_dom($$('#kecamatan_pewaris').val(), '#kelurahan_pewaris');
            });
            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile_layanan + '/waarmeking/find/' + id, iamthedoor, function (data) {
                app.dialog.close();
                // Field Data Dokumen
                $$('#kode_transaksi').val(data.layanan.kode_transaksi);
                $$('#nomor_surat_desa').val(data.layanan.nomor_desa);
                $$('#nomor_surat_kecamatan').val(data.layanan.nomor);
                // $$('#tujuan').val(data.layanan.tujuan);
                $$('#tujuan_waarmeking').val(data.layanan.tujuan);
                $$('#sidang').val(data.layanan.tmpt_sidang);
                $$('#nik_pewaris').val(data.layanan.nik_pewaris);
                $$('#nama_pewaris').val(data.layanan.nama_pewaris);
                $$('#jenis_kelamin_pewaris').val(data.layanan.jenis_kelamin_pewaris);
                $$('#tgl_lahir_pewaris').val(data.layanan.tgl_lahir_pewaris);
                $$('#kecamatan_pewaris').val(data.layanan.kecamatan_pewaris);
                get_kelurahan_dom(data.layanan.kecamatan_pewaris, '#kelurahan_pewaris');
                app.request.post(site_url_mobile_layanan + '/waarmeking/kelurahan/' + data.layanan.kecamatan_pewaris + '/' + data.layanan.kelurahan_pewaris, iamthedoor, function (callback) {
                    $$('#kelurahan_pewaris').val(callback.kode);
                }, 'json');
                $$('#alamat_pewaris').val(data.layanan.alamat_pewaris);
                $$('#status_keluarga').val(data.layanan.status_keluarga);
                $$('#tgl_meninggal_pewaris').val(data.layanan.tgl_meninggal_pewaris);
                if (data.layanan.akta_kematian_pewaris != null) {
                    $$('#fileurl_ak_pewaris').val(data.layanan.akta_kematian_pewaris);
                    data.berkas_ak_pewaris.forEach(function (val, index) {
                        var preview_file_ak_pewaris = '<a id="_ak_pewaris" onclick="preview_files_waris(' + val.id + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                        $$(".preview_file_ak_pewaris").html(preview_file_ak_pewaris);
                    })
                }

                $.getScript({ url: './js/tipe-b/waarmeking_table.js' }, function () {
                    waarmeking_table_edit(data);
                });

                // Field Data Pemohon
                $$('#nik_pemohon').val(data.user_cred.nik);
                $$('#nama_pemohon').val(data.user_cred.nama);
                $$('#tempat_lahir').val(data.user_cred.tempat_lahir);
                $$('#tanggal_lahir').val(data.user_cred.tanggal_lahir);
                $$('#jenis_kelamin').val(data.user_cred.jenis_kelamin);
                $$('#telepon').val(data.user_cred.no_telp_pendaftar);
                $$('#kecamatan').val(data.user_cred.namakec);
                $$('#kelurahan').val(data.user_cred.namakel);
                $$('#email').val(data.user_cred.email);
                $$('#alamat').val(data.user_cred.alamat);

                // Berkas pernyataan waris
                if (data.attachments_waris[0] != null) {
                    $$('#fileurl_spw').val(data.attachments_waris[0].code);
                    var preview_files_spw = `<a id="_spw" onclick="cordova.InAppBrowser.open('${site_url_image_layanan}${data.attachments_waris[0].file_actual}/${userencoded}', '_system')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>`;
                    $$('.preview_files_spw').html(preview_files_spw);
                }

                if (data.attachments_waris[1] != null) {
                    $$('#fileurl_basw').val(data.attachments_waris[1].code);
                    var preview_files_basw = `<a id="_basw" onclick="cordova.InAppBrowser.open('${site_url_image_layanan}${data.attachments_waris[1].file_actual}/${userencoded}', '_system')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>`;
                    $$('.preview_files_basw').html(preview_files_basw);
                }

                if (data.attachments_waris[2] != null) {
                    $$('#fileurl_dhsw').val(data.attachments_waris[2].code);
                    var preview_files_dhsw = `<a id="_dhsw" onclick="cordova.InAppBrowser.open('${site_url_image_layanan}${data.attachments_waris[2].file_actual}/${userencoded}', '_system')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>`;
                    $$('.preview_files_dhsw').html(preview_files_dhsw);
                }

                if (data.attachments_waris[3] != null) {
                    $$('#fileurl_dsw').val(data.attachments_waris[3].code);
                    var preview_files_dsw = `<a id="_dsw" onclick="cordova.InAppBrowser.open('${site_url_image_layanan}${data.attachments_waris[3].file_actual}/${userencoded}', '_system')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>`;
                    $$('.preview_files_dsw').html(preview_files_dsw);
                }

                // Berkas Lampiran
                $$("#addformupload").on("touchend", addrow);
                var attach = data.attachments.filter(e => e);
                if (tipe == 'view') {
                    $$('.aksi-table').remove();
                    $$('.hapus-table').remove();
                    get_attachments_waris(attach, tipe);
                } else {
                    get_attachments_waris(attach);
                }
                this_user_is_the_last_index = data.this_user_is_the_last_index;
                if (data.approve !== null && iamthedoor.role_id != 4) {
                    $$("input[name='approve_items_id']").val(data.approval_item.id);
                    $$("input[name='type_ttd']").val(data.approve.author_type);
                    document_look(data.latest_status.status_approval, data.latest_status.display_name);
                    if (data.approve.ttd) {
                        ttdview(data.approve.ttd);
                    }
                }
                // POP UP pakta
                var pop_up_pakta = app.popup.create({
                    content: '<div class="popup page-content">' +
                        '<div class="block">' +
                        '<form class="list" id="form_pakta_waarmeking" data-id="null">' +
                        '<div class="block-title">' +
                        '<div class="row">' +
                        '<div class="col-100">' +
                        '<div class="chip color-blue">' +
                        '<div class="chip-label">Pakta Integritas</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<p>Saya yang bertanda tangan dibawah ini :</p>' +
                        '<ul id="formupload-wrapper-list-waris">' +
                        '<li class="item-content item-input">' +
                        '<div class="item-inner">' +
                        '<div class="item-input-wrap">' +
                        '<div class="item-title item-label">AKUN</div>' +
                        '<input type="text" id="akun_pakta" name="akun_pakta" readonly>' +
                        '<span class="input-clear-button"></span>' +
                        '</div>' +
                        '</div>' +
                        '</li>' +
                        '<li class="item-content item-input">' +
                        '<div class="item-inner">' +
                        '<div class="item-input-wrap">' +
                        '<div class="item-title item-label">Nama</div>' +
                        '<input type="text" id="nama_pakta" name="nama_pakta">' +
                        '<span class="input-clear-button"></span>' +
                        '</div>' +
                        '</div>' +
                        '</li>' +
                        '<li class="item-content item-input">' +
                        '<div class="item-inner">' +
                        '<div class="item-input-wrap">' +
                        '<div class="item-title item-label">Jabatan</div>' +
                        '<input type="text" id="jabatan_pakta" name="jabatan_pakta">' +
                        '<span class="input-clear-button"></span>' +
                        '</div>' +
                        '</div>' +
                        '</li>' +
                        '<li class="item-content item-input">' +
                        '<div class="item-inner">' +
                        '<div class="item-input-wrap">' +
                        '<div class="item-title item-label">Alamat</div>' +
                        '<input type="text" name="alamat_pakta" id="alamat_pakta">' +
                        '<span class="input-clear-button"></span>' +
                        '</div>' +
                        '</div>' +
                        '</li>' +
                        '<li class="item-content item-input">' +
                        '<div class="item-inner">' +
                        '<div class="item-input-wrap">' +
                        '<div class="item-title item-label">Tujuan</div>' +
                        '<textarea name="tujuan_pakta" id="tujuan_pakta"></textarea>' +
                        '<span class="input-clear-button"></span>' +
                        '</div>' +
                        '</div>' +
                        '</li>' +
                        '<li>' +
                        '<p>Dengan ini menyatakan dengan sebenar-benarnya bahwa :</p>' +
                        '</li>' +
                        '<li>' +
                        '<p>1. Telah menguduh surat penetapan pengesahan akta di bawah tangan / waarmeking pada tanggal ' + new Date().getDate() + '-' + new Date().getFullYear() + '-' + new Date().getDate() + ' </p>' +
                        '</li>' +
                        '<li>' +
                        '<p>2. Data yang diunduh hanya digunakan untuk keperluan tertentu</p>' +
                        '</li>' +
                        '<li>' +
                        '<p>3. Data yang diunduh akan kami gunakan sebaik - baiknya dan tidak akan digunakan untuk keperluan lainnya</p>' +
                        '</li>' +
                        '<li>' +
                        '<p>4. Pakta Integritas ini dibuat dengan sebenar-benarnya tanpa menyembunyikan fakta dan hal material apapun dan saya bertanggung jawab sepenuhnya atas kebenaran dari hal-hal yang saya nyatakan di sini. Demikian pula akan bersedia bertanggung jawab baik secara hukum apabila pernyataan ini tidak sesuai dengan kenyataan sebenarnya</p>' +
                        '</li>' +
                        '<li>' +
                        '<p>Demikian Pakta Integritas ini Saya tanda tangani untuk digunakan sebagaimana mestinya.</p>' +
                        '</li>' +
                        '</div>' +
                        '<input type="hidden" name="status" value="tersimpan">' +
                        '</ul>' +
                        '</form>' +
                        '<div class="row">' +
                        '<div class="col-40">' +
                        '<a class="button button-round popup-close button-fill color-red" style="margin-top: 10px;">' +
                        '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Batal</span>' +
                        '</a>' +
                        '</div>' +
                        '<div class="col-60">' +
                        '<a class="button button-round button-fill color-green" id="save_pakta" style="margin-top: 10px;">' +
                        '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
                        '</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>',
                    on: {
                        open: function () {
                            $$('#akun_pakta').val(data.user_cred.nik);
                            var log_file_pengadilan = data.berkas_pengadilan[0].id;
                            $$('#save_pakta').on('click', function () {
                                if ($$('#nama_pakta').val() != '' && $$('#jabatan_pakta').val() != '' && $$('#alamat_pakta').val() != '' && $$('#tujuan_pakta').val() != '') {
                                    app.input.validateInputs('#form_pakta_waarmeking');
                                    if ($$('#form_pakta_waarmeking')[0].checkValidity() == true) {
                                        let form_data = app.form.convertToData('#form_pakta_waarmeking');
                                        let form_ajax = new Array();

                                        form_ajax.push(iamthedoor); // 0
                                        form_ajax.push(form_data);  // 1
                                        app.dialog.preloader('Loading...');

                                        app.request.post(site_url_mobile_layanan + '/waarmeking/pakta_integritas/' + id, form_ajax, function (data) {
                                            app.dialog.close();
                                            if (data) {
                                                app.dialog.alert('Berhasil Mengisi Pakta');
                                                console.log(log_file_pengadilan);
                                                app.request.post(site_url_mobile_layanan + '/waarmeking/file_pengadilan/' + log_file_pengadilan, iamthedoor, function (doc_path) {
                                                    download_doc(doc_path);
                                                }, 'json');
                                            } else {
                                                app.dialog.alert(data.desc);
                                            }
                                        }, function () {
                                            app.dialog.close();
                                            app.dialog.alert('Gagal Mengisi Pakta, Mohon Coba Lagi Nanti');
                                        }, 'json');
                                    } else {
                                        app.dialog.alert('Mohon isi data dengan benar');
                                    }
                                } else {
                                    app.dialog.alert('Mohon isi data dengan benar');
                                }
                            });
                        },
                    }
                });

                // Dokumen hasil pengadilan
                if (data.layanan.tgl_sidang != null || data.layanan.tgl_terbit_penetapan != null || data.layanan.nomor_surat_penetapan != null) {
                    $$('.dokumen_hasil').show();
                    $$('#tanggal_proses').val(data.layanan.tgl_terima_pengadilan);
                    $$('#tanggal_sidang_pengadilan').val(data.layanan.tgl_sidang);
                    $$('#tanggal_terbit_penetapan').val(data.layanan.tgl_terbit_penetapan);
                    $$('#nomor_surat_penetapan').val(data.layanan.nomor_surat_penetapan);

                    if (iamthedoor.role_id != 4) {
                        $$('#file_pengadilan').on('click', function () {
                            pop_up_pakta.open();
                        });
                    } else {
                        data.berkas_pengadilan.forEach(function (val, index) {
                            $$('#file_pengadilan').attr('onclick', 'file_pengadilan(' + val.id + ')');
                        });
                    }
                }

                // Report
                $$('#surat_pernyataan_waarmerking').show();
                app.request.post(site_url_mobile_layanan + '/waarmeking/cetak_surat_pernyataan_waarmerking/' + data.layanan.id, iamthedoor, function (doc_path) {
                    $$('#surat_pernyataan_waarmerking').attr('onclick', "cordova.InAppBrowser.open('" + doc_path + "', '_system');");
                }, 'json');

                var table_chron = '';
                if (data.chron.length) {
                    $$('#btndeletelayanan').hide();
                    for (var i = 0; i < data.chron.length; i++) {
                        table_chron += '<tr>' +
                            '<td>' + data.chron[i].val_status + '</td>' +
                            '<td>' + data.chron[i].author_type + '</td>' +
                            '<td>' + data.chron[i].name + '</td>' +
                            '<td>' + data.chron[i].keterangan + '</td>' +
                            '<td>' + data.chron[i].tglinsert + '</td>' +
                            '</tr>';
                    }
                } else {
                    table_chron = '<tr>' + '<td></td>' + '<td>Belum Ada Approval</td>' + '<td></td>' + '<td></td>' + '<td></td>' + '</tr>';
                }
                $$(".table-chron").html(table_chron);

                var table_pn = '';
                for (var i = 0; i < data.riwayat_pengadilan.length; i++) {
                    table_pn += '<tr>' +
                        '<td>' + data.riwayat_pengadilan[i].val_status + '</td>' +
                        '<td>' + data.riwayat_pengadilan[i].tgl_proses + '</td>' +
                        '<td>' + data.riwayat_pengadilan[i].status_awal + '</td>' +
                        '<td>' + data.riwayat_pengadilan[i].keterangan + '</td>' +
                        '</tr>';
                }
                $$(".table-pn").html(table_pn);

                var status = '';
                data.riwayat_pengadilan.slice(-1).forEach(function (val, index) {
                    status = val.status;
                });

                if (datauser.role_id == '4') {
                    // $$("#btndeletelayanan").html('<a class="button button-round button-fill color-red" id="deletelayanan" style="margin-top: 10px;">' +
                    //     '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Hapus Data</span></a>');
                    // $$('#form_edit_waris input').prop("disabled", true);
                    // $$('#form_edit_waris textarea').prop("disabled", true);
                    if (data.check_approved) {
                        $$('.save_button').hide();
                        $$('.checked_approval_button').show();
                    } else {
                        if (data.approve.sum_approval > 1) {
                            $$('.save_button').hide();
                        }
                    }
                } else {
                    $$('#form_edit_waris input').prop("disabled", true);
                    $$('#form_edit_waris textarea').prop("disabled", true);
                    if (tipe == 'approve') {
                        $$('#simpan').html('<i class="icon f7-icons">checkmark_seal_fill</i> Approve');
                        $$('#print_preview_button').show();
                    } else {
                        if (data.check_approved) {
                            $$('.save_button').hide();
                            $$('.checked_approval_button').show();
                        } else {
                            $$('.save_button').html('<div class="toolbar-inner"><a class="link bg-color-orange" id="print_preview_button"><i class="icon f7-icons">zoom_in</i> Preview Surat</a></div>');
                        }
                    }
                }

                data.check_approved = false;
                if (data.layanan.updated == '0' && status == '3' && iamthedoor.role_id == '4') {
                    $$('.checked_approval_button').hide();
                    $$('.save_revisi').show();
                    $$('#addahliwaris').hide();
                    $$('#addtujuan').hide();

                    $$('#form_edit_waris input').prop("disabled", true);
                    $$('#form_edit_waris textarea').prop("disabled", true);

                    $$('.spw').hide();
                    $$('.basw').hide();
                    $$('.dhsw').hide();
                    $$('.dsw').hide();

                    // $$('.delete-lampiran').hide();
                    $$('#tujuan_waarmeking').attr('disabled', 'disabled');
                }

                var list_cetak = '';
                if (data.layanan.doc_path_ttd_spw != '') {
                    list_cetak += '<li><a id="print_spw" class="link button button-fill color-green"><i class="icon f7-icons">printer_fill</i> Surat Pernyataan Waris</a></li>'
                }
                if (data.layanan.doc_path_ttd_basw != '') {
                    list_cetak += '<li><a id="print_basw" class="link button button-fill color-green"><i class="icon f7-icons">printer_fill</i> Berita Acara Sidang Waris</a></li>';
                }
                if (data.layanan.doc_path_ttd_dhsw != '') {
                    list_cetak += '<li><a id="print_dhsw" class="link button button-fill color-green"><i class="icon f7-icons">printer_fill</i> Daftar Hadir Sidang Waris</a></li>';
                }
                if (data.layanan.doc_path_ttd_dsw != '') {
                    list_cetak += '<li><a id="print_dsw" class="link button button-fill color-green"><i class="icon f7-icons">printer_fill</i> Dokumentasi Penanda Tanganan Waris</a></li>';
                }

                if (data.check_approved) {
                    $$('.save_button').remove();
                    $$('#btndeletelayanan').remove();
                    $('#form_edit_waris input').prop('readonly', true);
                    $$('.checked_approval_button').show();
                    $$('.hapus-table').hide();
                    $$('#addahliwaris').hide();
                    $$('#addformupload').hide();

                    // Create dynamic Popup
                    var dynamicPopup = app.popup.create({
                        content: '<div class="popup my-popup">' +
                            '<div class="view">' +
                            '<div class="page">' +
                            '<div class="navbar">' +
                            '<div class="navbar-inner">' +
                            '<div class="title">Cetak Surat</div>' +
                            '<div class="right">' +
                            '<a class="link popup-close">Close</a>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<div class="page-content">' +
                            '<div class="block">' +
                            '<div class="list simple-list">' +
                            '<ul>' +
                            list_cetak +
                            '</ul>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>',
                        // Events
                        on: {
                            opened: function (popup) {
                                $$("#print_spw").on("click", function () {
                                    app.dialog.preloader('Mohon Tunggu Sebentar...');
                                    download_doc(data.layanan.doc_path_ttd_spw + '_signed.pdf');
                                });
                                $$("#print_basw").on("click", function () {
                                    app.dialog.preloader('Mohon Tunggu Sebentar...');
                                    download_doc(data.layanan.doc_path_ttd_basw + '_signed.pdf');
                                });
                                $$("#print_dhsw").on("click", function () {
                                    app.dialog.preloader('Mohon Tunggu Sebentar...');
                                    download_doc(data.layanan.doc_path_ttd_dhsw + '_signed.pdf');
                                });
                                $$("#print_dsw").on("click", function () {
                                    app.dialog.preloader('Mohon Tunggu Sebentar...');
                                    download_doc(data.layanan.doc_path_ttd_dsw + '_signed.pdf');
                                });
                            },
                        }
                    });

                    $$('#cetak_semua_report').on('click', function () {
                        dynamicPopup.open();
                    });
                } else {
                    // Create dynamic Popup
                    var previewPopup = app.popup.create({
                        content: '<div class="popup my-popup">' +
                            '<div class="view">' +
                            '<div class="page">' +
                            '<div class="navbar">' +
                            '<div class="navbar-inner">' +
                            '<div class="title">Preview Surat</div>' +
                            '<div class="right">' +
                            '<a class="link popup-close">Close</a>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<div class="page-content">' +
                            '<div class="block">' +
                            '<div class="list simple-list">' +
                            '<ul>' +
                            '<li><a id="print_spw" class="link button button-fill color-green"><i class="icon f7-icons">search</i> Surat Pernyataan Waris</a></li>' +
                            '<li><a id="print_basw" class="link button button-fill color-green"><i class="icon f7-icons">search</i> Berita Acara Sidang Waris</a></li>' +
                            '<li><a id="print_dhsw" class="link button button-fill color-green"><i class="icon f7-icons">search</i> Daftar Hadir Sidang Waris</a></li>' +
                            '<li><a id="print_dsw" class="link button button-fill color-green"><i class="icon f7-icons">search</i> Dokumentasi Penanda Tanganan Waris</a></li>' +
                            '</ul>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>',
                        // Events
                        on: {
                            opened: function (popup) {
                                $$("#print_spw").on("click", function () {
                                    app.dialog.preloader('Mohon Tunggu Sebentar...');
                                    preview_doc(data.attachments_waris[0].file_actual, 'layanan');
                                });
                                $$("#print_basw").on("click", function () {
                                    app.dialog.preloader('Mohon Tunggu Sebentar...');
                                    preview_doc(data.attachments_waris[1].file_actual, 'layanan');
                                });
                                $$("#print_dhsw").on("click", function () {
                                    app.dialog.preloader('Mohon Tunggu Sebentar...');
                                    preview_doc(data.attachments_waris[2].file_actual, 'layanan');
                                });
                                $$("#print_dsw").on("click", function () {
                                    app.dialog.preloader('Mohon Tunggu Sebentar...');
                                    preview_doc(data.attachments_waris[3].file_actual, 'layanan');
                                });
                            },
                        }
                    });

                    $$('#print_preview_button').on('click', function () {
                        previewPopup.open();
                    });
                }
            }, function () {
                app.dialog.close();
                app.dialog.alert('Terjadi Kesalahan Saat Mengambil Data Anda, Mohon Coba Lagi Nanti');
                mainView.router.back();
                $('#datatables').DataTable().ajax.reload();
            }, 'json');

            $$('#simpan').on('click', function () {
                app.input.validateInputs('#form_edit_waris');
                if ($$('#form_edit_waris')[0].checkValidity() == true) {
                    if (iamthedoor.role_id == 4) {

                        let form_data = app.form.convertToData('#form_edit_waris');
                        // let filecode = new Array();
                        // $('#formupload-wrapper .filecode').each((i, el) => filecode.push(el.value));
                        // let filedesc = new Array();
                        // $('#formupload-wrapper .filedesc').each((i, el) => filedesc.push(el.value));

                        // if (filecode.length < 1 || filedesc.length < 1) {
                        //     app.dialog.alert('Mohon Isi Berkas Lampiran Anda Terlebih Dahulu');
                        //     return false;
                        // }

                        let ajax_data = new Array();
                        ajax_data.push(iamthedoor); // 0
                        ajax_data.push(form_data);  // 1
                        ajax_data.push(ahli_waris); // 2
                        ajax_data.push(tujuan); // 3

                        app.dialog.preloader('Loading...');
                        app.request.post(site_url_mobile_layanan + '/waarmeking/update_waris/' + id, ajax_data, function (data) {
                            app.dialog.close();
                            if (data) {
                                app.dialog.alert('Data Berhasil Diajukan');
                                mainView.router.back();
                                $('#datatables').DataTable().ajax.reload();
                            } else {
                                app.dialog.alert(data.desc);
                            }
                        }, function () {
                            app.dialog.close();
                            app.dialog.alert('Data Gagal Diajukan, Mohon Coba Lagi Nanti');
                        }, 'json');
                    } else {
                        if (this_user_is_the_last_index == true && $$("select[name='status']").val() == 2) {
                            var approval = app.popup.create({
                                content: '<div class="popup">' +
                                    '<div class="block">' +
                                    '<p class="row"><a href="#" class="col-25 button button-raised button-fill popup-close">TUTUP</a></p>' +
                                    '<p style="text-align: center;">Ketika Anda mengubah status, maka status dokumen ini <b>tidak dapat diubah kembali</b>.</p>' +
                                    '<div class="list">' +
                                    '<ul>' +
                                    '<li class="item-content item-input">' +
                                    '<div class="item-inner">' +
                                    '<div class="item-title item-label">Masukkan Passphrase Anda</div>' +
                                    '<div class="item-input-wrap">' +
                                    '<input type="password" id="esign" name="esign" placeholder="Passphrase Anda" autocomplete="off">' +
                                    '<span class="input-clear-button"></span>' +
                                    '</div>' +
                                    '</div>' +
                                    '</li>' +
                                    '</ul>' +
                                    '</div>' +
                                    '<br><button class="col color-green button button-big button-raised button-fill" id="approve_button">APPROVE</button>' +
                                    '</div>' +
                                    '</div>'
                            });
                            approval.open();
                            $$('#approve_button').on('click', function () {
                                if ($$('#type_ttd').val() == 'Desa') {
                                    approve('/waarmeking/ustatus/' + id, this_user_is_the_last_index, $$('#esign').val());
                                    approval.close();
                                } else if ($$('#type_ttd').val() == 'Kecamatan') {
                                    approve_waris('/waarmeking/ustatus/' + id, id, this_user_is_the_last_index, $$('#esign').val());
                                    approval.close();
                                }
                            });
                        } else {
                            var approval = app.popup.create({
                                content: '<div class="popup">' +
                                    '<div class="block">' +
                                    '<p><a href="#" class="link popup-close">< Kembali</a></p><br>' +
                                    '<h3 style="text-align:center;">Ketika Anda mengubah status, maka status dokumen ini <b>tidak dapat diubah kembali</b></h3>' +
                                    '<button class="col button button-big button-raised button-fill" id="approve_button">APPROVE</button>' +
                                    '</div>' +
                                    '</div>',
                            });
                            approval.open();
                            $$("#approve_button").on("touchend", function () {
                                approve('waarmeking/ustatus/' + id, this_user_is_the_last_index);
                                approval.close();
                            });
                        }
                    }
                }
            });

            $$('#simpan_revisi').on('click', function () {
                app.input.validateInputs('#form_edit_waris');
                if ($$('#form_edit_waris')[0].checkValidity() == true) {
                    if (iamthedoor.role_id == 4) {

                        let form_data = app.form.convertToData('#form_edit_waris');

                        let ajax_data = new Array();
                        ajax_data.push(iamthedoor); // 0
                        ajax_data.push(form_data);  // 1
                        ajax_data.push(ahli_waris); // 2
                        ajax_data.push(tujuan); // 3

                        app.dialog.preloader('Loading...');
                        app.request.post(site_url_mobile_layanan + '/waarmeking/update_waris_revisi/' + id, ajax_data, function (data) {
                            app.dialog.close();
                            if (data) {
                                app.dialog.alert('Data Berhasil Diajukan');
                                mainView.router.back();
                                $('#datatables').DataTable().ajax.reload();
                            } else {
                                app.dialog.alert(data.desc);
                            }
                        }, function () {
                            app.dialog.close();
                            app.dialog.alert('Data Gagal Diajukan, Mohon Coba Lagi Nanti');
                        }, 'json');
                    }
                }
            });

            $$('#deletelayanan').on('click', function () {
                app.dialog.confirm('Apakah anda yakin Menghapus Data ini?', function () {
                    app.dialog.preloader('Loading...');
                    app.request.post(site_url_mobile_layanan + '/waarmeking/delete_layanan/' + id, iamthedoor, function (callback) {
                        app.dialog.close();
                        if (callback.success) {
                            app.dialog.alert('Data Berhasil Dihapus');
                            mainView.router.back();
                            $('#datatables').DataTable().ajax.reload();
                        } else {
                            app.dialog.alert(callback.desc);
                        }
                    }, function () {
                        app.dialog.close();
                        app.dialog.alert('Data Gagal Dihapus, Mohon Coba Lagi Nanti');
                    }, 'json');
                });
            });
        },
    }
};

var data_approve = '';
var url_approve = '';

function approve_waris(function_url, id, this_user_is_the_last_index, esign = '') {
    data_approve = $.extend(app.form.convertToData('#approval'), iamthedoor);
    url_approve = site_url_mobile_layanan + function_url + '/' + iamthedoor.user_id + '/' + iamthedoor.kecamatan_id + '/' + iamthedoor.kelurahan_id + '/';
    if (this_user_is_the_last_index == true && $$("select[name='status']").val() == 2 && esign.length == 0) {
        app.dialog.alert('Passphrase Tidak Boleh Kosong');
    } else {
        app.dialog.preloader('Sedang Proses...');
        data_approve['esign'] = window.btoa(esign).replace(/=/g, '');

        app.request.post(site_url_mobile_layanan + '/waarmeking/get_berkas_verif/' + id, data_approve, function (data) {
            for (var i = 0; i < data.data.length; i++) {
                generateQRCodeWaris(data.id, data.data[i].elem, data.data[i].file, data.data[i].unique_name, data.last_approval.waktu_proses_kel)
            }
        }, 'json');
    }
}

function generateQRCodeWaris(id, this_elem, file_link, unique_name, date_ttd_desa) {
    var unique_name = '';
    app.request.post(site_url_mobile_layanan + '/waarmeking/unique_name/' + id, iamthedoor, function (json) {
        unique_name = json.unique_name;
        var date_now = new Date().toLocaleString('en-GB', { hour12: false });
        date_ttd_desa = new Date(date_ttd_desa).toLocaleString('en-GB', { hour12: false });

        var nama_camat = json.prefix.camat;
        var nip_camat = json.prefix.nip_camat;
        var nama_kades = json.prefix.kades;
        var nip_kades = json.prefix.nip_kades;
        // var bsre = json.bsre;
        var apvitemid = json.prefix.apvitemid;
        var apvitemid_cam = json.prefix.apvitemid_cam;
        var kode_layanan = json.prefix.kode_layanan;

        $('#qrcode').empty();
        new QRCode($('#qrcode').get(0), {
            text: btoa('EDOCX' + unique_name).replace(/=/g, ''),
            width: 90,
            height: 90,
            correctLevel: QRCode.CorrectLevel.M,
        });

        $('#qrcode_camat').empty();
        new QRCode($('#qrcode_camat').get(0), {
            text: btoa('ESIGN' + apvitemid_cam + kode_layanan).replace(/=/g, ''),
            width: 90,
            height: 90,
            correctLevel: QRCode.CorrectLevel.M,
        });

        $('#qrcode_kades').empty();
        new QRCode($('#qrcode_kades').get(0), {
            text: btoa('ESIGN' + apvitemid + kode_layanan).replace(/=/g, ''),
            width: 90,
            height: 90,
            correctLevel: QRCode.CorrectLevel.M,
        });

        generateWaris();

        async function generateWaris() {
            let form_data_ttd = new FormData();
            form_data_ttd.append('user_data', JSON.stringify(iamthedoor));
            form_data_ttd.append('unique_name', unique_name);
            var this_elem_ttd = 'ttd_' + this_elem;
            var this_elem_ttd_blank = 'ttd_blank_' + this_elem;
            const formUrl = base_url + '/esign/acquire_external/layanan/' + file_link;
            // const formUrl = site_url_image_layanan + file_link;
            const formBytes = await fetch(formUrl).then((res) => res.arrayBuffer());
            const pdfDoc = await PDFDocumentWaarmeking.load(formBytes);
            const helveticaFont = await pdfDoc.embedFont(StandardFontsWaarmeking.Helvetica);
            const helveticaFontBold = await pdfDoc.embedFont(StandardFontsWaarmeking.HelveticaBold);
            const pngImage = await pdfDoc.embedPng($('#qrcode canvas').get(0).toDataURL());
            const pngDims = pngImage.scale(0.5);
            const pngImageCamat = await pdfDoc.embedPng($('#qrcode_camat canvas').get(0).toDataURL());
            const pngDimsCamat = pngImage.scale(0.5);
            const pngImageKades = await pdfDoc.embedPng($('#qrcode_kades canvas').get(0).toDataURL());
            const pngDimsKades = pngImage.scale(0.5);

            const pages = pdfDoc.getPages();
            const lastPages = pages[pages.length - 1];
            const heightPages = lastPages.getHeight();
            const widthPages = lastPages.getWidth();

            pages.forEach(function (currPage) {
                // const lastPage = pages[pages.length - 1];

                currPage.drawText('BARCODE TRANSAKSI', {
                    x: currPage.getWidth() - (currPage.getWidth() - 10),
                    y: currPage.getHeight() - (currPage.getHeight() - 127),
                    size: 8,
                    lineHeight: 10,
                    font: helveticaFontBold,
                    color: rgbWaarmeking(0, 0, 0),
                });

                currPage.drawImage(pngImage, {
                    x: currPage.getWidth() - (currPage.getWidth() - 30),
                    y: currPage.getHeight() - (currPage.getHeight() - 80),
                    width: pngDims.width,
                    height: pngDims.height,
                });

                currPage.drawText('Note : Surat ini dibuat\nberdasarkan inputan dari\npemohon sendiri', {
                    x: currPage.getWidth() - (currPage.getWidth() - 10),
                    y: currPage.getHeight() - (currPage.getHeight() - 70),
                    size: 8,
                    lineHeight: 10,
                    font: helveticaFont,
                    color: rgbWaarmeking(0, 0, 0),
                });

                currPage.drawImage(pngImageCamat, {
                    x: currPage.getWidth() - (currPage.getWidth() - 105),
                    y: currPage.getHeight() - (currPage.getHeight() - 50),
                    width: pngDimsCamat.width,
                    height: pngDimsCamat.height,
                });

                currPage.drawText('Mengetahui camat ' + $('#kec_pemohon').val() + '\nPada Tanggal ' + date_now, {
                    x: currPage.getWidth() - (currPage.getWidth() - 155),
                    y: currPage.getHeight() - (currPage.getHeight() - 90),
                    size: 8,
                    lineHeight: 10,
                    font: helveticaFont,
                    color: rgbWaarmeking(0, 0, 0),
                });

                currPage.drawText(nama_camat, {
                    x: currPage.getWidth() - (currPage.getWidth() - 155),
                    y: currPage.getHeight() - (currPage.getHeight() - 65),
                    size: 10,
                    lineHeight: 14,
                    font: helveticaFontBold,
                    color: rgbWaarmeking(0, 0, 0),
                });

                currPage.drawText('NIP. ' + nip_camat, {
                    x: currPage.getWidth() - (currPage.getWidth() - 155),
                    y: currPage.getHeight() - (currPage.getHeight() - 50),
                    size: 10,
                    lineHeight: 10,
                    font: helveticaFont,
                    color: rgbWaarmeking(0, 0, 0),
                });

                currPage.drawImage(pngImageKades, {
                    x: currPage.getWidth() / 2 + 45,
                    y: currPage.getHeight() - (currPage.getHeight() - 50),
                    width: pngDimsKades.width,
                    height: pngDimsKades.height,
                });

                currPage.drawText('Mengetahui kades / kakel ' + $('#kel_pemohon').val() + '\nPada Tanggal ' + date_ttd_desa, {
                    x: currPage.getWidth() / 2 + 95,
                    y: currPage.getHeight() - (currPage.getHeight() - 90),
                    size: 8,
                    lineHeight: 10,
                    font: helveticaFont,
                    color: rgbWaarmeking(0, 0, 0),
                });

                currPage.drawText(nama_kades, {
                    x: currPage.getWidth() / 2 + 95,
                    y: currPage.getHeight() - (currPage.getHeight() - 65),
                    size: 10,
                    lineHeight: 14,
                    font: helveticaFontBold,
                    color: rgbWaarmeking(0, 0, 0),
                });

                currPage.drawText('NIP. ' + nip_kades, {
                    x: currPage.getWidth() / 2 + 95,
                    y: currPage.getHeight() - (currPage.getHeight() - 50),
                    size: 10,
                    lineHeight: 10,
                    font: helveticaFont,
                    color: rgbWaarmeking(0, 0, 0),
                });

                currPage.drawText('DISCLAIMER :', {
                    x: currPage.getWidth() - (currPage.getWidth() - 20),
                    y: currPage.getHeight() - (currPage.getHeight() - 30),
                    size: 10,
                    lineHeight: 10,
                    font: helveticaFontBold,
                    color: rgbWaarmeking(0, 0, 0),
                });

                currPage.drawText('Camat / kades / kakel mengetahui disini bersifat deklaratif. Untuk substansi / isi surat pernyataan ahli waris ini tanggung jawab penuh / mutlak dari para ahli waris.', {
                    x: currPage.getWidth() - (currPage.getWidth() - 20),
                    y: currPage.getHeight() - (currPage.getHeight() - 20),
                    size: 8,
                    lineHeight: 8,
                    font: helveticaFont,
                    color: rgbWaarmeking(0, 0, 0),
                });
            });

            const pdfBytes = await pdfDoc.save();
            form_data_ttd.append('extension', 'pdf');
            form_data_ttd.append('file', new Blob([pdfBytes], { type: 'application/pdf' }));
            file_upload_ttd(this_elem_ttd, form_data_ttd, id, unique_name);
            update_data_waris(id, this_elem, unique_name, form_data_ttd);

            const blank_pdfDoc = await PDFDocumentWaarmeking.create();
            const blank_helveticaFont = await blank_pdfDoc.embedFont(StandardFontsWaarmeking.Helvetica);
            const blank_helveticaFontBold = await blank_pdfDoc.embedFont(StandardFontsWaarmeking.HelveticaBold);
            const blank_pngImage = await blank_pdfDoc.embedPng($('#qrcode canvas').get(0).toDataURL());
            const blank_pngDims = pngImage.scale(0.5);
            const blank_pngImageCamat = await blank_pdfDoc.embedPng($('#qrcode_camat canvas').get(0).toDataURL());
            const blank_pngDimsCamat = blank_pngImageCamat.scale(0.5);
            const blank_pngImageKades = await blank_pdfDoc.embedPng($('#qrcode_kades canvas').get(0).toDataURL());
            const blank_pngDimsKades = blank_pngImageKades.scale(0.5);
            const blank_page = blank_pdfDoc.addPage();
            blank_page.setSize(widthPages, heightPages);
            const blank_pages = blank_pdfDoc.getPages();
            const blank_lastPage = blank_pages[blank_pages.length - 1];

            blank_lastPage.drawText('BARCODE TRANSAKSI', {
                x: blank_lastPage.getWidth() - (blank_lastPage.getWidth() - 10),
                y: blank_lastPage.getHeight() - (blank_lastPage.getHeight() - 127),
                size: 8,
                lineHeight: 10,
                font: blank_helveticaFontBold,
                color: rgbWaarmeking(0, 0, 0),
            });

            blank_lastPage.drawImage(blank_pngImage, {
                x: blank_lastPage.getWidth() - (blank_lastPage.getWidth() - 30),
                y: blank_lastPage.getHeight() - (blank_lastPage.getHeight() - 80),
                width: blank_pngDims.width,
                height: blank_pngDims.height,
            });

            blank_lastPage.drawText('Note : Surat ini dibuat\nberdasarkan inputan dari\npemohon sendiri', {
                x: blank_lastPage.getWidth() - (blank_lastPage.getWidth() - 10),
                y: blank_lastPage.getHeight() - (blank_lastPage.getHeight() - 70),
                size: 8,
                lineHeight: 10,
                font: blank_helveticaFont,
                color: rgbWaarmeking(0, 0, 0),
            });

            blank_lastPage.drawImage(blank_pngImageCamat, {
                x: blank_lastPage.getWidth() - (blank_lastPage.getWidth() - 105),
                y: blank_lastPage.getHeight() - (blank_lastPage.getHeight() - 50),
                width: blank_pngDimsCamat.width,
                height: blank_pngDimsCamat.height,
            });

            blank_lastPage.drawText('Mengetahui camat ' + $('#kec_pemohon').val() + '\nPada Tanggal ' + date_now, {
                x: blank_lastPage.getWidth() - (blank_lastPage.getWidth() - 160),
                y: blank_lastPage.getHeight() - (blank_lastPage.getHeight() - 90),
                size: 8,
                lineHeight: 10,
                font: blank_helveticaFont,
                color: rgbWaarmeking(0, 0, 0),
            });

            blank_lastPage.drawText(nama_camat, {
                x: blank_lastPage.getWidth() - (blank_lastPage.getWidth() - 160),
                y: blank_lastPage.getHeight() - (blank_lastPage.getHeight() - 65),
                size: 10,
                lineHeight: 14,
                font: blank_helveticaFontBold,
                color: rgbWaarmeking(0, 0, 0),
            });

            blank_lastPage.drawText('NIP. ' + nip_camat, {
                x: blank_lastPage.getWidth() - (blank_lastPage.getWidth() - 160),
                y: blank_lastPage.getHeight() - (blank_lastPage.getHeight() - 50),
                size: 10,
                lineHeight: 10,
                font: blank_helveticaFont,
                color: rgbWaarmeking(0, 0, 0),
            });

            blank_lastPage.drawImage(blank_pngImageKades, {
                x: blank_lastPage.getWidth() / 2 + 45,
                y: blank_lastPage.getHeight() - (blank_lastPage.getHeight() - 50),
                width: blank_pngDimsKades.width,
                height: blank_pngDimsKades.height,
            });

            blank_lastPage.drawText('Mengetahui kades / kakel ' + $('#kel_pemohon').val() + '\nPada Tanggal ' + date_ttd_desa, {
                x: blank_lastPage.getWidth() / 2 + 100,
                y: blank_lastPage.getHeight() - (blank_lastPage.getHeight() - 90),
                size: 8,
                lineHeight: 10,
                font: blank_helveticaFont,
                color: rgbWaarmeking(0, 0, 0),
            });

            blank_lastPage.drawText(nama_kades, {
                x: blank_lastPage.getWidth() / 2 + 100,
                y: blank_lastPage.getHeight() - (blank_lastPage.getHeight() - 65),
                size: 10,
                lineHeight: 14,
                font: blank_helveticaFontBold,
                color: rgbWaarmeking(0, 0, 0),
            });

            blank_lastPage.drawText('NIP. ' + nip_kades, {
                x: blank_lastPage.getWidth() / 2 + 100,
                y: blank_lastPage.getHeight() - (blank_lastPage.getHeight() - 50),
                size: 10,
                lineHeight: 10,
                font: blank_helveticaFont,
                color: rgbWaarmeking(0, 0, 0),
            });

            blank_lastPage.drawText('DISCLAIMER :', {
                x: blank_lastPage.getWidth() - (blank_lastPage.getWidth() - 20),
                y: blank_lastPage.getHeight() - (blank_lastPage.getHeight() - 30),
                size: 10,
                lineHeight: 10,
                font: blank_helveticaFontBold,
                color: rgbWaarmeking(0, 0, 0),
            });

            blank_lastPage.drawText('Camat / kades / kakel mengetahui disini bersifat deklaratif. Untuk substansi / isi surat pernyataan ahli waris ini tanggung jawab penuh / mutlak dari para ahli waris.', {
                x: blank_lastPage.getWidth() - (blank_lastPage.getWidth() - 20),
                y: blank_lastPage.getHeight() - (blank_lastPage.getHeight() - 20),
                size: 8,
                lineHeight: 8,
                font: blank_helveticaFont,
                color: rgbWaarmeking(0, 0, 0),
            });

            var form_data_blank_ttd = new FormData();
            form_data_blank_ttd.append('user_data', JSON.stringify(iamthedoor));
            form_data_blank_ttd.append('unique_name', unique_name + '_blank');

            const blank_pdfBytes = await blank_pdfDoc.save();
            form_data_blank_ttd.append('extension', 'pdf');
            form_data_blank_ttd.append('file', new Blob([blank_pdfBytes], { type: 'application/pdf' }));
            file_upload_ttd_blank(this_elem, form_data_blank_ttd);
        }
    }, 'json');
}

function file_upload_ttd(this_elem, form_data, id, unique_name) {
    $.ajax({
        url: base_url + '/file/upload_log',
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'POST',
        success: function (json) {
        }
    });
}

function file_upload_ttd_blank(this_elem, form_data) {
    $.ajax({
        url: base_url + '/file/upload_log',
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'POST',
        success: function (json) {
            if (this_elem == 'spw') {
                app.request.post(url_approve, data_approve, function (data) {
                    if (isNaN(data)) {
                        app.dialog.close();
                        if (data.status == 'wrong') {
                            app.dialog.close();
                            app.dialog.alert(data.message);
                        } else if (data.status == 'success') {
                            app.dialog.alert('Berhasil');
                            $('#datatables').DataTable().ajax.reload();
                            mainView.router.back();
                        } else {
                            app.dialog.close();
                            app.dialog.alert('Terjadi Kesalahan Dalam Sistem.');
                        }
                    } else {
                        app.dialog.close();
                        app.dialog.alert('Terjadi Kesalahan Dalam Sistem.');
                        mainView.router.back();
                        $('#datatables').DataTable().ajax.reload();
                    }
                }, function () {
                    app.dialog.close();
                    app.dialog.alert('Peringatan', 'Anda Sedang Tidak Tersambung Dengan Internet.');
                    mainView.router.back();
                    $('#datatables').DataTable().ajax.reload();
                }, 'json');
            }
        }
    });
}

function update_data_waris(id, this_elem, unique_name, form_data) {
    $.ajax({
        url: base_url + '/admin/layanantipeb/waarmeking/update_data/' + id + '/' + this_elem + '/' + unique_name,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'POST',
        success: function (json) {
        }
    });
}

function preview_files_waris(id) {
    app.request.post(site_url_mobile + '/siurban_mobile/preview_files/' + id, '', function (image_url) {
        if (image_url == null) {
            app.dialog.alert('File tidak ditemukan');
        } else {
            var the_preview_files = app.sheet.create({
                content: '<div class="sheet-modal page-content" style="height: 100%">' +
                    '<div class="block">' +
                    '<p class="row"><a href="#" class="col-25 button button-raised button-fill sheet-close">TUTUP</a></p>' +
                    '<img src="' + site_url_image_layanan + image_url + '/' + userencoded + '" width="100%">' +
                    '</div>' +
                    '</div>',
            });
            the_preview_files.open();
        }
    }, 'json');
}

function get_attachments_waris(attachments, view = 'edit') {
    var content = '';
    var counter = 0;

    attachments.forEach(function (item, index) {
        let uploadbtn = '';
        let deletebtn = '';
        if (view == 'edit' && iamthedoor.role_id == 4) {
            uploadbtn = '<div class="col-20">' +
                '<a id="' + index + '" onclick="uploadfile(this.id)" class="button button-round button-fill" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i>' +
                '</a>' +
                '</div>';
            deletebtn = '<div class="col-20">' +
                '<a id="' + index + '" onclick="deleterow(this.id)" class="button button-round button-fill color-red delete-lampiran" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">trash_fill</i></a>' +
                '</div>';
        }

        if (Array.isArray(attachments) && attachments[counter]) {
            content += '<li data-index="' + index + '"><ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<input id="fileid' + index + '" class="fileid" type="hidden" name="fileid[' + index + ']" value="' + attachments[counter].id + '">' +
                '<input class="filecode" id="filecode' + index + '" type="hidden" readonly="" name="filecode[]" value="' + attachments[counter].code + '">' +
                '<input class="fileurl" id="fileurl' + index + '" type="text" name="fileurl[' + index + ']" placeholder="URL file" value="' + attachments[counter].file_actual + '" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_files">' +
                '<a id="' + index + '" onclick="preview_files(' + attachments[counter].id + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>' +
                '</div>' +
                uploadbtn +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-80">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<input type="text" class="filedesc" name="filedesc[]" placeholder="Keterangan File" value="' + attachments[counter].desc + '" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                deletebtn +
                '</div>' +
                '</div>' +
                '</li></ul></li><hr>';

            counter++;
        } else {
            content += '<li data-index="' + index + '"><ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<input id="fileid' + index + '" class="fileid" type="hidden" name="fileid[' + index + ']">' +
                '<input class="filecode" id="filecode' + index + '" type="hidden" readonly="" name="filecode[]">' +
                '<input class="fileurl" id="fileurl' + index + '" type="text" name="fileurl[' + index + ']" placeholder="URL file" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_files">' +
                '</div>' +
                uploadbtn +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-80">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<input type="text" class="filedesc" name="filedesc[]" placeholder="Keterangan File" value="' + item + '" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                deletebtn +
                '</div>' +
                '</div>' +
                '</li></ul></li><hr>';
        }
    });

    $$('#formupload-wrapper-list').html(content);
}

function uploadfilependukungwaris(uploadfileid) {
    Attachment.openGallery({
        onSuccess: function (fileURL, fileName) {
            let params = { subdir: 'layanan' };
            app.dialog.preloader('Loading...')
            Attachment.upload(fileURL, fileName, params, function (success) {
                app.dialog.close();
                var data = JSON.parse(success.data);
                addformupload_status = true;
                $$('#fileid' + uploadfileid).val(data[0].id);
                $$('#fileurl' + uploadfileid).val(fileName);
                $$('#filecode' + uploadfileid).val(data[0].code);
                $$('.preview_file' + uploadfileid).html('');
                var preview_files = '<a id="' + uploadfileid + '" onclick="preview_files_waris(' + data[0].id + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                $$('.preview_file' + uploadfileid).html(preview_files);
            });
        },
    });
}

function uploadfileberkaspdf(uploadfileid) {
    // cordova.InAppBrowser.open(\'https://sipraja.sidoarjokab.go.id/files/' + val.dokumen + '\', \'_system\');"
    Attachment.openGallery({
        onSuccess: function (fileURL, fileName) {
            let params = { subdir: 'layanan' };
            var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
            if (ext == 'pdf') {
                app.dialog.preloader('Loading...')
                Attachment.upload(fileURL, fileName, params, function (success) {
                    app.dialog.close();
                    var data = JSON.parse(success.data);
                    addformupload_status = true;
                    $$('#fileid' + uploadfileid).val(data[0].id);
                    $$('#fileurl' + uploadfileid).val(fileName);
                    $$('#filecode' + uploadfileid).val(data[0].code);
                    $$('.preview_file' + uploadfileid).html('');
                    var preview_files = `<a id="${uploadfileid}" onclick="cordova.InAppBrowser.open('${site_url_image_layanan}${data[0].file_actual}/${userencoded}', '_system')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>`;
                    $$('.preview_file' + uploadfileid).html(preview_files);
                });
            } else {
                app.dialog.alert("Mohon untuk upload berkas dengan format pdf");
            }
        },
    }, 'ALLMEDIA');
}

function open_modal_dokumen(type) {
    app.dialog.preloader('Loading...');
    app.request.post(site_url_mobile_layanan + '/waarmeking/get_list_berkas/' + type, iamthedoor, function (data) {
        app.dialog.close();
        var isi_table = '';
        // var nama_dokumen = '';
        data.forEach(function (val, key) {
            isi_table += '<tr>' +
                '<td>' + (key + 1) + '</td>' +
                '<td>' + val.keterangan + '</td>' +
                '<td><a onclick="cordova.InAppBrowser.open(\'https://sipraja.sidoarjokab.go.id/files/' + val.dokumen + '\', \'_system\');" class="link button button-fill color-green"><i class="icon f7-icons">arrow_down_doc_fill</i> Download</a></td>' +
                '</tr>';
        });
        var dynamic_dokumen = app.popup.create({
            content: '<div class="popup">' +
                '<div class="view">' +
                '<div class="page">' +
                '<div class="navbar">' +
                '<div class="navbar-inner">' +
                '<div class="title">Waarmeking KUHP Perdata</div>' +
                '<div class="right">' +
                '<a class="link popup-close">Close</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="page-content">' +
                '<div class="block">' +
                '<table class="data-table card">' +
                '<thead>' +
                '<tr>' +
                '<th>NO</th>' +
                '<th>KETERANGAN</th>' +
                '<th>AKSI</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                isi_table +
                '</tbody>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',
            on: {
                opened: function (popup) {
                    $$('.popup-close').on('click', function () {
                        app.popup.close();
                    });
                },
            }
        });
        dynamic_dokumen.open();
    }, 'json');
}

function cetak_resume(id) {
    app.dialog.preloader('Mohon Tunggu Sebentar...');
    app.request.post(site_url_mobile_layanan + '/waarmeking/resume/' + id, iamthedoor, function (doc_path) {
        download_doc(doc_path);
    }, 'json');
}

function surat_permohonan(id) {
    app.dialog.preloader('Mohon Tunggu Sebentar...');
    app.request.post(site_url_mobile_layanan + '/waarmeking/surat_permohonan/' + id, iamthedoor, function (doc_path) {
        download_doc(doc_path);
    }, 'json');
}

function cetak_dokumen(dokumen) {
    app.dialog.preloader('Mohon Tunggu Sebentar...');
    app.request.post(site_url_mobile_layanan + '/waarmeking/download/' + dokumen, iamthedoor, function (doc_path) {
        download_doc(doc_path);
    }, 'json');
}

function file_pengadilan(id) {
    app.dialog.preloader('Mohon Tunggu Sebentar...');
    app.request.post(site_url_mobile_layanan + '/waarmeking/file_pengadilan/' + id, iamthedoor, function (doc_path) {
        download_doc(doc_path);
    }, 'json');
}