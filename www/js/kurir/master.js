var list_kurir = {
    path: '/daftar_kurir/',
    url: './pages/daftar_kurir/index.html',
    name: 'daftar_kurir',
    on: {
        pageInit: function () {
            app.dialog.preloader('Mohon Tunggu...');
            var datatables = $('#list_kurir').DataTable({
                "serverSide": true,
                "ajax": {
                    "url": site_url_mobile_layanan + '/daftar_kurir/get_list_kurir/',
                    "data": iamthedoor,
                    "type": "GET"
                },
                "columns": [
                    { data: 'id' },
                    { data: 'nik' },
                    { data: 'nama' },
                    { data: 'jenis_kendaraan' },
                    { data: 'merk_kendaraan' },
                    { data: 'plat_kendaraan' },
                    { data: 'status_terima' },
                ],
                "initComplete": function (settings, json) {
                    app.dialog.close();
                    $$('#datatables_length').hide();
                    $$('#datatables_filter').hide();
                },
                "rowCallback": function (row, data) {
                    $('td:eq(0)', row).html('<a href="/edit_kurir/edit/' + data.id + '" class="button button-small button-fill color-blue">' +
                        '<i class="icon f7-icons" style="font-size: 12pt;">doc_text_fill</i> Aksi</a>');
                    var html = '';
                    switch (data.status_terima) {
                        case "0":
                            html = '<span style="background-color: #ABA8A8; padding:5px; border-radius:10px">Diprosess</span>';
                            break;

                        case "1":
                            html = '<span style="background-color: #02FF2C; padding:5px; border-radius:10px">Success</span>';
                            break;

                        case "2":
                            html = '<span style="background-color: #FF0202; padding:5px; border-radius:10px">Ditolak</span>';
                            break;
                    }
                    $('td:eq(6)', row).html(html);
                }
            });
        }
    }
}

var new_kurir = {
    path: '/new_kurir/new/',
    url: './pages/daftar_kurir/new_kurir.html',
    name: 'new_kurir',
    on: {
        pageInit: function () {
            $$('#nik').val(datauser.nik);
            $$('#bf_users_id').val(datauser.bf_users_id);
            $$('#nama').val(datauser.nama);

            var html = '';
            let ket_attachment = ['foto_diri', 'foto_kendaraan', 'foto_stnk', 'foto_sim'];
            for (key in ket_attachment) {
                html += `<li class="item-content item-input">
                    <div class="item-inner">
                        <div class="row">
                            <div class="col-60">
                                <div class="item-inner">
                                    <div class="item-input-wrap">
                                        <div class="item-title item-label">${ket_attachment[key].replace('_', ' ')}</div>
                                        <input class="fileid" id="fileid_${ket_attachment[key]}" name="fileid_${ket_attachment[key]}" type="hidden">
                                        <input class="filecode" id="filecode_${ket_attachment[key]}" name="filecode_${ket_attachment[key]}" type="hidden">
                                        <input class="fileurl" id="fileurl_${ket_attachment[key]}" name="fileurl_${ket_attachment[key]}" type="text" readonly>
                                    </div>
                                </div>
                            </div>
                            <div class="col-20 preview_file_${ket_attachment[key]}">
                            </div>
                            <div class="col-20">
                                <a id="_${ket_attachment[key]}" onclick="uploadfilependukung(this.id)" class="button button-round button-fill" style="margin-top: 10px;">
                                    <i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder</i>
                                </a>
                            </div>
                        </div>
                    </div>
                </li>`;
            }
            $$('.attachment').html(html);

            $$("#simpan").on("click", function () {
                if ($$('#nik').val().length != 16) {
                    app.dialog.alert('NIK Harus Memiliki Panjang 16 Digit');
                    return false;
                }

                if ($$('#filecode_foto_diri').val() == '') {
                    app.dialog.alert('Kolom FOTO DIRI harus diisi/tidak boleh kosong');
                    return false;
                }

                if ($$('#filecode_foto_kendaraan').val() == '') {
                    app.dialog.alert('Kolom FOTO KENDARAAN harus diisi/tidak boleh kosong');
                    return false;
                }

                if ($$('#filecode_foto_stnk').val() == '') {
                    app.dialog.alert('Kolom FOTO STNK harus diisi/tidak boleh kosong');
                    return false;
                }

                if ($$('#filecode_foto_sim').val() == '') {
                    app.dialog.alert('Kolom FOTO SIM harus diisi/tidak boleh kosong');
                    return false;
                }

                app.input.validateInputs("#new_pendaftaran_kurir");
                if ($$('#new_pendaftaran_kurir')[0].checkValidity() == true) {
                    data = new Array();

                    keteranganid = [];
                    filecode = [];

                    for (key in ket_attachment) {
                        $('input[name^=filecode_' + ket_attachment[key] + ']').each(function () {
                            keteranganid.push(ket_attachment[key]);
                            filecode.push($(this).val());
                        });
                    }

                    mydata = app.form.convertToData("#new_pendaftaran_kurir");
                    data.push(iamthedoor);
                    data.push(mydata);
                    data.push(keteranganid);
                    data.push(filecode);
                    app.request.post(site_url_mobile_layanan + '/daftar_kurir/save_kurir', data, function (data) {
                        if (data.status == true) {
                            app.dialog.alert('Penyimpanan Berhasil');
                            mainView.router.back();
                            $('#list_kurir').DataTable().ajax.reload();
                        } else {
                            app.dialog.alert(data.message);
                        }
                    }, function () {
                        app.dialog.alert('Penyimpanan Gagal, Coba lagi di lain waktu');
                    }, 'json');
                }
            });
        }
    }
}

var edit_kurir = {
    path: '/edit_kurir/edit/:id',
    url: './pages/daftar_kurir/edit_kurir.html',
    name: 'edit_kurir',
    on: {
        pageInit: function () {
            const id = mainView.router.currentRoute.params.id;
            app.request.post(site_url_mobile_layanan + '/daftar_kurir/find/' + id, iamthedoor, function (response) {
                $$('#nik').val(response.data_pendaftaran_kurir.nik);
                $$('#nama').val(response.data_pendaftaran_kurir.nama);
                $$('#nama_kec').val(response.user.kecamatan_nama);
                $$('#nama_kel').val(response.user.kelurahan_nama);

                $$('#jenis_kendaraan').val(response.data_pendaftaran_kurir.jenis_kendaraan);
                $$('#kepemilikan_kendaraan').val(response.data_pendaftaran_kurir.kepemilikan_kendaraan);
                $$('#merk_kendaraan').val(response.data_pendaftaran_kurir.merk_kendaraan);
                $$('#nomor_rangka').val(response.data_pendaftaran_kurir.nomor_rangka);
                $$('#plat_kendaraan').val(response.data_pendaftaran_kurir.plat_kendaraan);
                $$('#nomor_mesin').val(response.data_pendaftaran_kurir.nomor_mesin);
                $$('#tahun').val(response.data_pendaftaran_kurir.tahun);

                var html = '';
                let ket_attachment = ['foto_diri', 'foto_kendaraan', 'foto_stnk', 'foto_sim'];
                response.attachments.forEach(function (val, index) {
                    html += `<li class="item-content item-input">
                        <div class="item-inner">
                            <div class="row">
                                <div class="col-60">
                                    <div class="item-inner">
                                        <div class="item-input-wrap">
                                            <div class="item-title item-label">${ket_attachment[index].replace('_', ' ')}</div>
                                            <input class="fileid" id="fileid_${ket_attachment[index]}" name="fileid_${ket_attachment[index]}" type="hidden" value="${val.id}">
                                            <input class="filecode" id="filecode_${ket_attachment[index]}" name="filecode_${ket_attachment[index]}" type="hidden" value="${val.code}">
                                            <input class="fileurl" id="fileurl_${ket_attachment[index]}" name="fileurl_${ket_attachment[index]}" type="text" readonly value="${val.file_actual}">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-20 preview_file_${ket_attachment[index]}">
                                    <a id="_${ket_attachment[index]}" onclick="preview_files_kurir('${val.id}')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>
                                </div>
                            </div>
                        </div>
                    </li>`;
                });
                $$('.attachment').html(html);
            }, function () {
                app.dialog.alert('Pencarian Data Gagal, Coba lagi di lain waktu');
            }, 'json');
        }
    }
}

function uploadfilependukung(uploadfileid) {
    Attachment.openGallery({
        onSuccess: function (fileURL, fileName) {
            let params = { subdir: 'pendaftaran_kurir' };
            app.dialog.preloader('Loading...')
            Attachment.upload(fileURL, fileName, params, function (success) {
                app.dialog.close();
                var data = JSON.parse(success.data);
                addformupload_status = true;
                $$('#fileid' + uploadfileid).val(data[0].id);
                $$('#fileurl' + uploadfileid).val(fileName);
                $$('#filecode' + uploadfileid).val(data[0].code);
                $$('.preview_file' + uploadfileid).html('');
                var preview_files_kurir = '<a id="' + uploadfileid + '" onclick="preview_files_kurir(' + data[0].id + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                $$('.preview_file' + uploadfileid).html(preview_files_kurir);
            });
        },
    });
}

function preview_files_kurir(id) {
    app.request.post(site_url_mobile + '/siurban_mobile/preview_files/' + id, '', function (image_url) {
        if (image_url == null) {
            app.dialog.alert('File tidak ditemukan');
        } else {
            var the_preview_files = app.sheet.create({
                content: '<div class="sheet-modal page-content" style="height: 100%">' +
                    '<div class="block">' +
                    '<p class="row"><a href="#" class="col-25 button button-raised button-fill sheet-close">TUTUP</a></p>' +
                    '<img src="' + site_url_image_pendaftaran_kurir + image_url + '/' + userencoded + '" width="100%">' +
                    '</div>' +
                    '</div>',
            });
            the_preview_files.open();
        }
    }, 'json');
}