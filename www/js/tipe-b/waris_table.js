function waris_table_create() {
    // Pasangan Pewaris
    pasangan_pewaris = new Array();
    $$('#addpasanganpewaris').on('touchend', function () {
        popup_tambah_pasangan_pewaris();
    });

    function popup_tambah_pasangan_pewaris() {
        var popup_anggota = app.popup.create({
            content: '<div class="popup page-content">' +
                '<div class="block">' +
                '<form class="list" id="tambah_pasangan_pewaris" data-id="null">' +
                '<div class="block-title">' +
                '<div class="row">' +
                '<div class="col-100">' +
                '<div class="chip color-blue">' +
                '<div class="chip-label">Form Tambah Pasangan Pewaris</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<ul id="formupload-wrapper-list-waris">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">NIK</div>' +
                '<input type="number" name="m_nik_pasangan">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Nama</div>' +
                '<input type="text" name="m_nama_pasangan">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Tanggal Lahir</div>' +
                '<input type="date" name="m_tgl_lahir_pasangan">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Jenis Nikah</div>' +
                '<select name="m_jenis_nikah_pasangan" id="m_jenis_nikah_pasangan">' +
                '<option value="Resmi">RESMI</option>' +
                '<option value="Siri">SIRI</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Status</div>' +
                '<select name="m_status_hidup_pasangan" id="m_status_hidup_pasangan">' +
                '<option value="Hidup">HIDUP</option>' +
                '<option value="Meninggal">MENINGGAL</option>' +
                '</select>' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label" id="m_jenis_nikah_pasangan_resmi">Buka Nikah</div>' +
                '<div class="item-title item-label" id="m_jenis_nikah_pasangan_siri" style="display: none;">Foto Ijab Kabul atau Surat - Surat yang diakui oleh Agama Islam</div>' +
                '<input id="fileid_m_buku_nikah" class="fileid" type="hidden" name="fileid_m_buku_nikah">' +
                '<input  id="filecode_m_buku_nikah" type="hidden" readonly name="filecode_m_buku_nikah">' +
                '<input  id="fileurl_m_buku_nikah" type="text" name="fileurl_m_buku_nikah" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_m_buku_nikah">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_m_buku_nikah" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<div id="m_status_hidup_pasangan_meninggal" style="display: none;">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Akta Kematian</div>' +
                '<input id="fileid_m_akta_kematian" class="fileid" type="hidden" name="fileid_m_akta_kematian">' +
                '<input id="filecode_m_akta_kematian" type="hidden" readonly name="filecode_m_akta_kematian">' +
                '<input  id="fileurl_m_akta_kematian" type="text" name="fileurl_m_akta_kematian" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_m_akta_kematian">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_m_akta_kematian" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
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
                '<a class="button button-round button-fill color-green" id="save_pasangan_pewaris" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
                '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',
            on: {
                open: function () {
                    $$('#m_jenis_nikah_pasangan').on('change', function () {
                        if ($(this).val() == 'Siri') {
                            $$('#m_jenis_nikah_pasangan_resmi').hide();
                            $$('#m_jenis_nikah_pasangan_siri').show();
                        } else {
                            $$('#m_jenis_nikah_pasangan_resmi').show();
                            $$('#m_jenis_nikah_pasangan_siri').hide();
                        }
                    });
                    $$('#m_status_hidup_pasangan').on('change', function () {
                        if ($(this).val() == 'Meninggal') {
                            $$('#m_status_hidup_pasangan_meninggal').show();
                        } else {
                            $$('#m_status_hidup_pasangan_meninggal').hide();
                        }
                    });

                    if (iamthedoor.role_id != 4) {
                        $$('#save_pasangan_pewaris').hide();
                    }
                },
            }
        });
        popup_anggota.open();
        $$("#save_pasangan_pewaris").on('click', function () {
            popup_anggota.close();
            if ($("#tambah_pasangan_pewaris").data("id") !== null) {
                pasangan_pewaris_id = $("#tambah_pasangan_pewaris").data("id");
                pasangan_pewaris[pasangan_pewaris_id] = app.form.convertToData("#tambah_pasangan_pewaris");
            } else {
                pasangan_pewaris.push(app.form.convertToData("#tambah_pasangan_pewaris"));
            }
            reload_pasangan_pewaris_table(pasangan_pewaris);
        });
    }

    function reload_pasangan_pewaris_table(pasangan_pewaris_key) {
        pasangan_pewaris_html = '<tr><td></td><td>Data Kosong</td><td></td></tr>';
        $$("#pasangan_pewaris_table table tbody").html(pasangan_pewaris_html);
        pasangan_pewaris_row = '';
        for (var i = 0; i < pasangan_pewaris_key.length; i++) {
            if (pasangan_pewaris_key[i].status == "tersimpan") {
                pasangan_pewaris_row += '<tr>' +
                    '<td class="label-cell aksi-table" style="padding: 0 12px;"><a data-id="' + [i] + '" class="edit_anggota button button-small color-blue button-fill">EDIT</a></td>' +
                    '<td class="label-cell hapus-table" style="padding: 0 12px 0 0;"><a data-id="' + [i] + '"  class="hapus_anggota button color-red button-fill button-small">HAPUS</a></td>' +
                    '<td class="label-cell">' + pasangan_pewaris_key[i].m_nik_pasangan + '</td>' +
                    '<td class="label-cell">' + pasangan_pewaris_key[i].m_nama_pasangan + '</td>' +
                    '<td class="label-cell">' + pasangan_pewaris_key[i].m_tgl_lahir_pasangan + '</td>' +
                    '<td class="label-cell">' + pasangan_pewaris_key[i].m_jenis_nikah_pasangan + '</td>' +
                    '<td class="label-cell">' + pasangan_pewaris_key[i].m_status_hidup_pasangan + '</td>';
                if (pasangan_pewaris_key[i].fileid_m_buku_nikah != '') {
                    pasangan_pewaris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + pasangan_pewaris_key[i].fileid_m_buku_nikah + ')" class="ktp_anggota button color-blue button-fill button-small">SURAT NIKAH</a></td>';
                }

                if (pasangan_pewaris_key[i].fileid_m_akta_kematian != '') {
                    pasangan_pewaris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + pasangan_pewaris_key[i].fileid_m_akta_kematian + ')" class="kk_anggota button color-blue button-fill button-small">AKTA KEMATIAN</a></td>';
                }

                pasangan_pewaris_row += '</tr>';
            }
        }
        if (pasangan_pewaris_row !== '') {
            $$("#pasangan_pewaris_table table tbody").html(pasangan_pewaris_row);
        }

        if (iamthedoor.role_id != 4) {
            $$('.hapus-table').hide();
        }
        $$(".hapus_anggota").on('click', function () {
            pasangan_pewaris_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin Menghapus data?', function () {
                pasangan_pewaris_key[pasangan_pewaris_id].status = 'terhapus';
                reload_pasangan_pewaris_table(pasangan_pewaris_key);
            });
        });
        $$(".edit_anggota").on('click', function () {
            pasangan_pewaris_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin akan merubah data?', function () {
                popup_tambah_pasangan_pewaris();
                $$("#tambah_pasangan_pewaris").attr("data-id", pasangan_pewaris_id);
                $$("input[name='m_nik_pasangan']").val(pasangan_pewaris_key[pasangan_pewaris_id].m_nik_pasangan);
                $$("input[name='m_nama_pasangan']").val(pasangan_pewaris_key[pasangan_pewaris_id].m_nama_pasangan);
                $$("input[name='m_tgl_lahir_pasangan']").val(pasangan_pewaris_key[pasangan_pewaris_id].m_tgl_lahir_pasangan);
                $$("input[name='m_jenis_nikah_pasangan']").val(pasangan_pewaris_key[pasangan_pewaris_id].m_jenis_nikah_pasangan);
                $$("input[name='m_status_hidup_pasangan']").val(pasangan_pewaris_key[pasangan_pewaris_id].m_status_hidup_pasangan);
                $$("input[name='filecode_m_buku_nikah']").val(pasangan_pewaris_key[pasangan_pewaris_id].filecode_m_buku_nikah);
                $$("input[name='filecode_m_akta_kematian']").val(pasangan_pewaris_key[pasangan_pewaris_id].filecode_m_akta_kematian);
                $$("input[name='fileid_m_buku_nikah']").val(pasangan_pewaris_key[pasangan_pewaris_id].fileid_m_buku_nikah);
                $$("input[name='fileid_m_akta_kematian']").val(pasangan_pewaris_key[pasangan_pewaris_id].fileid_m_akta_kematian);
                $$("input[name='fileurl_m_buku_nikah']").val(pasangan_pewaris_key[pasangan_pewaris_id].fileurl_m_buku_nikah);
                $$("input[name='fileurl_m_akta_kematian']").val(pasangan_pewaris_key[pasangan_pewaris_id].fileurl_m_akta_kematian);
                if (pasangan_pewaris_key[pasangan_pewaris_id].fileid_m_buku_nikah != '') {
                    var preview_file_m_buku_nikah = '<a id="_m_buku_nikah" onclick="preview_file_waris(' + pasangan_pewaris_key[pasangan_pewaris_id].fileid_m_buku_nikah + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                    $$(".preview_file_m_buku_nikah").html(preview_file_m_buku_nikah);
                }
                if (pasangan_pewaris_key[pasangan_pewaris_id].fileid_m_akta_kematian != '') {
                    var preview_file_m_akta_kematian = '<a id="_m_akta_kematian" onclick="preview_file_waris(' + pasangan_pewaris_key[pasangan_pewaris_id].fileid_m_akta_kematian + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                    $$(".preview_file_m_akta_kematian").html(preview_file_m_akta_kematian);
                }

                if (pasangan_pewaris_key[pasangan_pewaris_id].m_jenis_nikah_pasangan == 'Siri') {
                    $$('#m_jenis_nikah_pasangan_resmi').hide();
                    $$('#m_jenis_nikah_pasangan_siri').show();
                } else {
                    $$('#m_jenis_nikah_pasangan_resmi').show();
                    $$('#m_jenis_nikah_pasangan_siri').hide();
                }

                if (pasangan_pewaris_key[pasangan_pewaris_id].m_status_hidup_pasangan == 'Meninggal') {
                    $$('#m_status_hidup_pasangan_meninggal').show();
                } else {
                    $$('#m_status_hidup_pasangan_meninggal').hide();
                }
            });
        });
    }

    // anak kandung start
    anak_kandung_pewaris = new Array();
    $$('#addanakkadungpewaris').on('touchend', function () {
        popup_tambah_anak_kandung_pewaris();
    });

    function popup_tambah_anak_kandung_pewaris() {
        var list_pasangan = '';
        if ($$('#status_keluarga').val() == 'Suami') {
            pasangan_pewaris.forEach(function (item, index) {
                list_pasangan += '<option value="' + item.m_nama_pasangan + '">' + item.m_nama_pasangan + '</option>';
            });
        } else {
            list_pasangan += '<option value="' + $$('#nama_pasangan').val() + '">' + $$('#nama_pasangan').val() + '</option>';
        }
        var popup_anggota = app.popup.create({
            content: '<div class="popup page-content">' +
                '<div class="block">' +
                '<form class="list" id="tambah_anak_kandung_pewaris" data-id="null">' +
                '<div class="block-title">' +
                '<div class="row">' +
                '<div class="col-100">' +
                '<div class="chip color-blue">' +
                '<div class="chip-label">Form Tambah Anak Kandung Pewaris</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<ul id="formupload-wrapper-list-waris">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Orang Tua</div>' +
                '<select name="orang_tua_anak" id="orang_tua_anak">' +
                list_pasangan +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">NIK</div>' +
                '<input type="number" name="nik_anak">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Nama</div>' +
                '<input type="text" name="nama_anak">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Tanggal Lahir</div>' +
                '<input type="date" name="tgl_lahir_anak">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Umur</div>' +
                '<input type="number" name="umur_anak" id="umur_anak" maxlength="2" oninput="this.value=this.value.slice(0,this.maxLength)">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Alamat</div>' +
                '<textarea class="resizable" name="alamat_anak"></textarea>' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Status Nikah</div>' +
                '<select name="status_kawin_anak" id="status_kawin_anak">' +
                '<option value="Sudah Kawin">SUDAH KAWIN</option>' +
                '<option value="Belum Kawin">BELUM KAWIN</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Status Hidup</div>' +
                '<select name="status_hidup_anak" id="status_hidup_anak">' +
                '<option value="Hidup">HIDUP</option>' +
                '<option value="Meninggal">MENINGGAL</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<div id="umur17kebawah" style="display: none;">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Nama Wali</div>' +
                '<input type="text" name="nama_wali_anak">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Hubungan dengan yang diwakili</div>' +
                '<input type="text" name="hubungan_wali_anak">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</div>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label" id="ktpanak">KTP</div>' +
                '<input id="fileid_ktp_anak" class="fileid" type="hidden" name="fileid_ktp_anak">' +
                '<input id="filecode_ktp_anak" type="hidden" readonly name="filecode_ktp_anak">' +
                '<input  id="fileurl_ktp_anak" type="text" name="fileurl_ktp_anak" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ktp_anak">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_ktp_anak" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label" id="kkanak">KK</div>' +
                '<input id="fileid_kk_anak" class="fileid" type="hidden" name="fileid_kk_anak">' +
                '<input id="filecode_kk_anak" type="hidden" readonly name="filecode_kk_anak">' +
                '<input id="fileurl_kk_anak" type="text" name="fileurl_kk_anak" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_kk_anak">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_kk_anak" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<div id="status_kawin_anak_belum">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Surat Nikah</div>' +
                '<input id="fileid_sn_anak" class="fileid" type="hidden" name="fileid_sn_anak">' +
                '<input id="filecode_sn_anak" type="hidden" readonly name="filecode_sn_anak">' +
                '<input id="fileurl_sn_anak" type="text" name="fileurl_sn" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_sn_anak">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_sn_anak" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</div>' +
                '<div id="status_hidup_anak_meninggal" style="display: none;">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Akta Kematian</div>' +
                '<input id="fileid_ak_anak" class="fileid" type="hidden" name="fileid_ak_anak">' +
                '<input id="filecode_ak_anak" type="hidden" readonly name="filecode_ak_anak">' +
                '<input id="fileurl_ak_anak" type="text" name="fileurl_ak_anak" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ak_anak">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_ak_anak" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</div>' +
                '<div id="pernyataan_wali_anak" style="display: none;">' +
                '<li data-index="wali"><ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Surat Pernyataan Perwalian Bermaterai</div>' +
                '<input id="fileid_wali_anak" class="fileid" type="hidden" name="fileid_wali_anak">' +
                '<input id="filecode_wali_anak" type="hidden" readonly name="filecode_wali_anak">' +
                '<input id="fileurl_wali_anak" type="text" name="fileurl_wali_anak" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_wali_anak">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_wali_anak" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul></li>' +
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
                '<a class="button button-round button-fill color-green" id="save_anak_kandung_pewaris" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
                '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',
            on: {
                open: function () {
                    $$('#status_kawin_anak').on('change', function () {
                        $$('#status_kawin_anak_belum input').val('');
                        if ($(this).val() == 'Belum Kawin') {
                            $$('#fileid_sn_anak').val('');
                            $$('#filecode_sn_anak').val('');
                            $$('#fileurl_sn_anak').val('');
                            $$('.preview_file_sn_anak').html('');
                            $$('#status_kawin_anak_belum').hide();
                        } else {
                            $$('#status_kawin_anak_belum').show();
                        }
                    });
                    $$('#status_hidup_anak').on('change', function () {
                        $$('#fileid_ak_anak').val('');
                        $$('#filecode_ak_anak').val('');
                        $$('#fileurl_ak_anak').val('');
                        $$('.preview_file_ak_anak').html('');
                        if ($(this).val() == 'Meninggal') {
                            $$('#status_hidup_anak_meninggal').show();
                        } else {
                            $$('#status_hidup_anak_meninggal').hide();
                        }
                    });

                    $$('#umur_anak').on('input', function () {
                        $$('#umur17kebawah input').val('');

                        $$('#fileid_pernyataan_wali_anak').val('');
                        $$('#filecode_pernyataan_wali_anak').val('');
                        $$('#fileurl_pernyataan_wali_anak').val('');
                        $$('.preview_file_pernyataan_wali_anak').html('');
                        if ($(this).val() <= 17) {
                            $$('#ktpanak').html('KTP Wali');
                            $$('#kkanak').html('KK Wali');
                            $$('#umur17kebawah').show();
                            $$('#pernyataan_wali_anak').show();
                        } else {
                            $$('#ktpanak').html('KTP');
                            $$('#kkanak').html('KK');
                            $$('#umur17kebawah').hide();
                            $$('#pernyataan_wali_anak').hide();
                        }
                    });

                    if (iamthedoor.role_id != 4) {
                        $$('#save_anak_kandung_pewaris').hide();
                    }
                },
            }
        });
        popup_anggota.open();
        $$("#save_anak_kandung_pewaris").on('click', function () {

            popup_anggota.close();
            if ($("#tambah_anak_kandung_pewaris").data("id") !== null) {
                anak_kandung_pewaris_id = $("#tambah_anak_kandung_pewaris").data("id");
                anak_kandung_pewaris[anak_kandung_pewaris_id] = app.form.convertToData("#tambah_anak_kandung_pewaris");
            } else {
                anak_kandung_pewaris.push(app.form.convertToData("#tambah_anak_kandung_pewaris"));
            }
            reload_anak_kandung_pewaris_table(anak_kandung_pewaris);
            if (app.form.convertToData("#tambah_anak_kandung_pewaris").status_hidup_anak == 'Meninggal') {
                popup_tambah_cucu_anak_kandung_pewaris();
            }
        });
    }

    function reload_anak_kandung_pewaris_table(anak_kandung_pewaris_key) {
        anak_kandung_pewaris_html = '<tr><td></td><td>Data Kosong</td><td></td></tr>';
        $$("#anak_kandung_pewaris_table table tbody").html(anak_kandung_pewaris_html);
        anak_kandung_pewaris_row = '';
        for (var i = 0; i < anak_kandung_pewaris_key.length; i++) {
            if (anak_kandung_pewaris_key[i].status == "tersimpan") {
                anak_kandung_pewaris_row += '<tr>' +
                    '<td class="label-cell aksi-table" style="padding: 0 12px;"><a data-id="' + [i] + '" class="edit_anak_kandung button button-small color-blue button-fill">EDIT</a></td>' +
                    '<td class="label-cell hapus-table" style="padding: 0 12px 0 0;"><a data-id="' + [i] + '"  class="hapus_anak_kandung button color-red button-fill button-small">HAPUS</a></td>' +
                    '<td class="label-cell">' + anak_kandung_pewaris_key[i].nik_anak + '</td>' +
                    '<td class="label-cell">' + anak_kandung_pewaris_key[i].nama_anak + '</td>' +
                    '<td class="label-cell">' + anak_kandung_pewaris_key[i].tgl_lahir_anak + '</td>' +
                    '<td class="label-cell">' + anak_kandung_pewaris_key[i].umur_anak + '</td>' +
                    '<td class="label-cell">' + anak_kandung_pewaris_key[i].alamat_anak + '</td>' +
                    '<td class="label-cell">' + anak_kandung_pewaris_key[i].status_kawin_anak + '</td>' +
                    '<td class="label-cell">' + anak_kandung_pewaris_key[i].status_hidup_anak + '</td>' +
                    '<td class="label-cell">' + anak_kandung_pewaris_key[i].nama_wali_anak + '</td>' +
                    '<td class="label-cell">' + anak_kandung_pewaris_key[i].hubungan_wali_anak + '</td>' +
                    '<td class="label-cell">';
                if (anak_kandung_pewaris_key[i].fileid_ktp_anak != '') {
                    anak_kandung_pewaris_row += '<a data-id="' + [i] + '" onclick="preview_files(' + anak_kandung_pewaris_key[i].fileid_ktp_anak + ')" class="ktp_anggota button color-blue button-fill button-small">KTP</a></td>';
                }
                if (anak_kandung_pewaris_key[i].fileid_kk_anak != '') {
                    anak_kandung_pewaris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + anak_kandung_pewaris_key[i].fileid_kk_anak + ')" class="kk_anggota button color-blue button-fill button-small">KK</a></td>';
                }
                if (anak_kandung_pewaris_key[i].fileid_sn_anak != '') {
                    anak_kandung_pewaris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + anak_kandung_pewaris_key[i].fileid_sn_anak + ')" class="kk_anggota button color-blue button-fill button-small">SURAT NIKAH</a></td>';
                }
                if (anak_kandung_pewaris_key[i].fileid_ak_anak != '') {
                    anak_kandung_pewaris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + anak_kandung_pewaris_key[i].fileid_ak_anak + ')" class="ktp_anggota button color-blue button-fill button-small">AKTA KEMATIAN</a></td>';
                }
                if (anak_kandung_pewaris_key[i].fileid_wali_anak != '') {
                    anak_kandung_pewaris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + anak_kandung_pewaris_key[i].fileid_wali_anak + ')" class="kk_anggota button color-blue button-fill button-small">SURAT PERWALIAN</a></td>';
                }
                anak_kandung_pewaris_row += '</tr>';
            }
        }
        if (anak_kandung_pewaris_row !== '') {
            $$("#anak_kandung_pewaris_table table tbody").html(anak_kandung_pewaris_row);
        }
        if (iamthedoor.role_id != 4) {
            $$('.hapus-table').hide();
        }

        $$(".hapus_anak_kandung").on('click', function () {
            anak_kandung_pewaris_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin Menghapus data?', function () {
                anak_kandung_pewaris_key[anak_kandung_pewaris_id].status = 'terhapus';
                reload_anak_kandung_pewaris_table(anak_kandung_pewaris_key);
            });
        });

        $$(".edit_anak_kandung").on('click', function () {
            anak_kandung_pewaris_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin akan merubah data?', function () {
                popup_tambah_anak_kandung_pewaris();
                $$("#tambah_anak_kandung_pewaris").attr("data-id", anak_kandung_pewaris_id);
                $$("input[name='nik_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].nik_anak);
                $$("input[name='nama_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].nama_anak);
                $$("input[name='tgl_lahir_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].tgl_lahir_anak);
                $$("input[name='umur_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].umur_anak);
                $$("textarea[name='alamat_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].alamat_anak);
                $$("select[name='status_kawin_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].status_kawin_anak);
                $$("select[name='status_hidup_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].status_hidup_anak);
                $$("input[name='nama_wali_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].nama_wali_anak);
                $$("input[name='hubungan_wali_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].hubungan_wali_anak);
                $$("input[name='filecode_ktp_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].filecode_ktp_anak);
                $$("input[name='filecode_kk_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].filecode_kk_anak);
                $$("input[name='filecode_sn_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].filecode_sn_anak);
                $$("input[name='filecode_ak_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].filecode_ak_anak);
                $$("input[name='filecode_wali_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].filecode_wali_anak);
                $$("input[name='fileid_ktp_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_ktp_anak);
                $$("input[name='fileid_kk_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_kk_anak);
                $$("input[name='fileid_sn_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_sn_anak);
                $$("input[name='fileid_ak_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_ak_anak);
                $$("input[name='fileid_wali_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_wali_anak);
                $$("input[name='fileurl_ktp_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileurl_ktp_anak);
                $$("input[name='fileurl_kk_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileurl_kk_anak);
                $$("input[name='fileurl_sn_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileurl_sn_anak);
                $$("input[name='fileurl_ak_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileurl_ak_anak);
                $$("input[name='fileurl_wali_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileurl_wali_anak);
                if (anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_ktp_anak != '') {
                    var preview_file_ktp = '<a id="_ktp_anak" onclick="preview_file_waris(' + anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_ktp_anak + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_ktp_anak").html(preview_file_ktp);
                if (anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_kk_anak != '') {
                    var preview_file_kk = '<a id="_kk_anak" onclick="preview_file_waris(' + anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_kk_anak + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_kk_anak").html(preview_file_kk);
                if (anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_sn_anak != '') {
                    var preview_file_sn = '<a id="_sn_anak" onclick="preview_file_waris(' + anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_sn_anak + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_sn_anak").html(preview_file_sn);
                if (anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_ak_anak != '') {
                    var preview_file_ak = '<a id="_ak_anak" onclick="preview_file_waris(' + anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_ak_anak + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_ak_anak").html(preview_file_ak);
                if (anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_wali_anak != '') {
                    var preview_file_wali = '<a id="_wali_anak" onclick="preview_file_waris(' + anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_wali_anak + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_wali_anak").html(preview_file_wali);

                if (anak_kandung_pewaris_key[anak_kandung_pewaris_id].umur_anak <= 17) {
                    $$('#umur17kebawah').show();
                    $$('#pernyataan_wali_anak').show();
                }

                if (anak_kandung_pewaris_key[anak_kandung_pewaris_id].status_kawin_anak == 'Belum Kawin') {
                    $$('#status_kawin_anak_belum').hide();
                }

                if (anak_kandung_pewaris_key[anak_kandung_pewaris_id].status_hidup_anak == 'Meninggal') {
                    $$('#status_hidup_anak_meninggal').show();
                }
            });
        });
        cekAnakMeninggal(anak_kandung_pewaris_key);
    }
    function cekAnakMeninggal(anak_kandung_pewaris_key) {
        $$('#cucu_pewaris').hide();
        for (var i = 0; i < anak_kandung_pewaris_key.length; i++) {
            if (anak_kandung_pewaris_key[i].status == "tersimpan" && anak_kandung_pewaris_key[i].status_hidup_anak == 'Meninggal') {
                $$('#cucu_pewaris').show();
            }
        }
    }
    // anak kandung end

    // cucu anak kandung start
    cucu_anak_kandung_pewaris = new Array();
    $$('#addcucukadungpewaris').on('touchend', function () {
        popup_tambah_cucu_anak_kandung_pewaris();
    });
    function popup_tambah_cucu_anak_kandung_pewaris() {
        var list_cucu_pewaris = '';
        anak_kandung_pewaris.forEach(function (item, index) {
            if (item.status == "tersimpan" && item.status_hidup_anak == "Meninggal") {
                list_cucu_pewaris += '<option value="' + item.nama_anak + '">' + item.nama_anak + '</option>';
            }
        });
        var popup_anggota = app.popup.create({
            content: '<div class="popup page-content">' +
                '<div class="block">' +
                '<form class="list" id="tambah_cucu_anak_kandung_pewaris" data-id="null">' +
                '<div class="block-title">' +
                '<div class="row">' +
                '<div class="col-100">' +
                '<div class="chip color-blue">' +
                '<div class="chip-label">Form Tambah Cucu Pewaris</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<ul id="formupload-wrapper-list-waris">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Orang Tua</div>' +
                '<select name="orang_tua_cucu" id="orang_tua_cucu">' +
                list_cucu_pewaris +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">NIK</div>' +
                '<input type="number" name="nik_cucu">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Nama</div>' +
                '<input type="text" name="nama_cucu">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Tanggal Lahir</div>' +
                '<input type="date" name="tgl_lahir_cucu">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Umur</div>' +
                '<input type="number" name="umur_cucu" id="umur_cucu" maxlength="2" oninput="this.value=this.value.slice(0,this.maxLength)">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Alamat</div>' +
                '<textarea class="resizable" name="alamat_cucu"></textarea>' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Status Nikah</div>' +
                '<select name="status_kawin_cucu" id="status_kawin_cucu">' +
                '<option value="Sudah Kawin">SUDAH KAWIN</option>' +
                '<option value="Belum Kawin">BELUM KAWIN</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Status Hidup</div>' +
                '<select name="status_hidup_cucu" id="status_hidup_cucu">' +
                '<option value="Hidup">HIDUP</option>' +
                '<option value="Meninggal">MENINGGAL</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<div id="umur17kebawah" style="display: none;">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Nama Wali</div>' +
                '<input type="text" name="nama_wali_cucu">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Hubungan dengan yang diwakili</div>' +
                '<input type="text" name="hubungan_wali_cucu">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</div>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label" id="ktpcucu">KTP</div>' +
                '<input id="fileid_ktp_cucu" class="fileid" type="hidden" name="fileid_ktp_cucu">' +
                '<input  id="filecode_ktp_cucu" type="hidden" readonly name="filecode_ktp_cucu">' +
                '<input  id="fileurl_ktp_cucu" type="text" name="fileurl_ktp_cucu" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ktp_cucu">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_ktp_cucu" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label" id="kkcucu">KK</div>' +
                '<input id="fileid_kk_cucu" class="fileid" type="hidden" name="fileid_kk_cucu">' +
                '<input  id="filecode_kk_cucu" type="hidden" readonly name="filecode_kk_cucu">' +
                '<input  id="fileurl_kk_cucu" type="text" name="fileurl_kk_cucu" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_kk_cucu">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_kk_cucu" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<div id="status_kawin_cucu_belum">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Surat Nikah</div>' +
                '<input id="fileid_sn_cucu" class="fileid" type="hidden" name="fileid_sn_cucu">' +
                '<input  id="filecode_sn_cucu" type="hidden" readonly name="filecode_sn_cucu">' +
                '<input  id="fileurl_sn_cucu" type="text" name="fileurl_sn_cucu" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_sn_cucu">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_sn_cucu" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</div>' +
                '<div id="status_hidup_cucu_meninggal" style="display: none;">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Akta Kematian</div>' +
                '<input id="fileid_ak_cucu" class="fileid" type="hidden" name="fileid_ak_cucu">' +
                '<input  id="filecode_ak_cucu" type="hidden" readonly name="filecode_ak_cucu">' +
                '<input  id="fileurl_ak_cucu" type="text" name="fileurl_ak_cucu" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ak_cucu">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_ak_cucu" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</div>' +
                '<div id="pernyataan_wali_cucu" style="display: none;">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Surat Pernyataan Perwalian Bermaterai</div>' +
                '<input id="fileid_wali_cucu" class="fileid" type="hidden" name="fileid_wali_cucu">' +
                '<input  id="filecode_wali_cucu" type="hidden" readonly name="filecode_wali_cucu">' +
                '<input  id="fileurl_wali_cucu" type="text" name="fileurl_wali_cucu" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_wali_cucu">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_wali_cucu" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
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
                '<a class="button button-round button-fill color-green" id="save_cucu_anak_kandung_pewaris" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
                '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',
            on: {
                open: function () {
                    $$('#status_kawin_cucu').on('change', function () {
                        $$('#status_kawin_cucu_belum input').val('');
                        if ($(this).val() == 'Belum Kawin') {
                            $$('#status_kawin_cucu_belum').hide();
                        } else {
                            $$('#status_kawin_cucu_belum').show();
                        }
                    });
                    $$('#status_hidup_cucu').on('change', function () {
                        $$('#status_hidup_cucu_meninggal input').val('');
                        if ($(this).val() == 'Meninggal') {
                            $$('#status_hidup_cucu_meninggal').show();
                        } else {
                            $$('#status_hidup_cucu_meninggal').hide();
                        }
                    });

                    $$('#umur_cucu').on('input', function () {
                        $$('#umur17kebawah input').val('');
                        $$('#pernyataan_wali_cucu input').val('');
                        if ($(this).val() <= 17) {
                            $$('#ktpcucu').html('KTP Wali');
                            $$('#kkcucu').html('KK Wali');
                            $$('#umur17kebawah').show();
                            $$('#pernyataan_wali_cucu').show();
                        } else {
                            $$('#ktpcucu').html('KTP');
                            $$('#kkcucu').html('KK');
                            $$('#umur17kebawah').hide();
                            $$('#pernyataan_wali_cucu').hide();
                        }
                    });

                    if (iamthedoor.role_id != 4) {
                        $$('#save_cucu_anak_kandung_pewaris').hide();
                    }
                },
            }
        });
        popup_anggota.open();
        $$("#save_cucu_anak_kandung_pewaris").on('click', function () {
            popup_anggota.close();
            if ($("#tambah_cucu_anak_kandung_pewaris").data("id") !== null) {
                cucu_anak_kandung_pewaris_id = $("#tambah_cucu_anak_kandung_pewaris").data("id");
                cucu_anak_kandung_pewaris[cucu_anak_kandung_pewaris_id] = app.form.convertToData("#tambah_cucu_anak_kandung_pewaris");
            } else {
                cucu_anak_kandung_pewaris.push(app.form.convertToData("#tambah_cucu_anak_kandung_pewaris"));
            }
            reload_cucu_anak_kandung_pewaris_table(cucu_anak_kandung_pewaris);
        });
    }

    function reload_cucu_anak_kandung_pewaris_table(cucu_anak_kandung_pewaris_key) {
        cucu_anak_kandung_pewaris_html = '<tr><td></td><td>Data Kosong</td><td></td></tr>';
        $$("#cucu_anak_kandung_pewaris_table table tbody").html(cucu_anak_kandung_pewaris_html);
        cucu_anak_kandung_pewaris_row = '';
        for (var i = 0; i < cucu_anak_kandung_pewaris_key.length; i++) {
            if (cucu_anak_kandung_pewaris_key[i].status == "tersimpan") {
                cucu_anak_kandung_pewaris_row += '<tr>' +
                    '<td class="label-cell aksi-table" style="padding: 0 12px;"><a data-id="' + [i] + '" class="edit_cucu_anak_kandung button button-small color-blue button-fill">EDIT</a></td>' +
                    '<td class="label-cell hapus-table" style="padding: 0 12px 0 0;"><a data-id="' + [i] + '"  class="hapus_cucu_anak_kandung button color-red button-fill button-small">HAPUS</a></td>' +
                    '<td class="label-cell">' + cucu_anak_kandung_pewaris_key[i].orang_tua_cucu + '</td>' +
                    '<td class="label-cell">' + cucu_anak_kandung_pewaris_key[i].nik_cucu + '</td>' +
                    '<td class="label-cell">' + cucu_anak_kandung_pewaris_key[i].nama_cucu + '</td>' +
                    '<td class="label-cell">' + cucu_anak_kandung_pewaris_key[i].tgl_lahir_cucu + '</td>' +
                    '<td class="label-cell">' + cucu_anak_kandung_pewaris_key[i].umur_cucu + '</td>' +
                    '<td class="label-cell">' + cucu_anak_kandung_pewaris_key[i].alamat_cucu + '</td>' +
                    '<td class="label-cell">' + cucu_anak_kandung_pewaris_key[i].status_kawin_cucu + '</td>' +
                    '<td class="label-cell">' + cucu_anak_kandung_pewaris_key[i].status_hidup_cucu + '</td>' +
                    '<td class="label-cell">' + cucu_anak_kandung_pewaris_key[i].nama_wali_cucu + '</td>' +
                    '<td class="label-cell">' + cucu_anak_kandung_pewaris_key[i].hubungan_wali_cucu + '</td>' +
                    '<td class="label-cell">';
                if (cucu_anak_kandung_pewaris_key[i].fileid_ktp_cucu != '') {
                    cucu_anak_kandung_pewaris_row += '<a data-id="' + [i] + '" onclick="preview_files(' + cucu_anak_kandung_pewaris_key[i].fileid_ktp_cucu + ')" class="ktp_anggota button color-blue button-fill button-small">KTP</a></td>';
                }
                if (cucu_anak_kandung_pewaris_key[i].fileid_kk_cucu != '') {
                    cucu_anak_kandung_pewaris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + cucu_anak_kandung_pewaris_key[i].fileid_kk_cucu + ')" class="button color-blue button-fill button-small">KK</a></td>';
                }
                if (cucu_anak_kandung_pewaris_key[i].fileid_sn_cucu != '') {
                    cucu_anak_kandung_pewaris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + cucu_anak_kandung_pewaris_key[i].fileid_sn_cucu + ')" class="button color-blue button-fill button-small">SURAT NIKAH</a></td>';
                }
                if (cucu_anak_kandung_pewaris_key[i].fileid_ak_cucu != '') {
                    cucu_anak_kandung_pewaris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + cucu_anak_kandung_pewaris_key[i].fileid_ak_cucu + ')" class="button color-blue button-fill button-small">AKTA KEMATIAN</a></td>';
                }
                if (cucu_anak_kandung_pewaris_key[i].fileid_wali_cucu != '') {
                    cucu_anak_kandung_pewaris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + cucu_anak_kandung_pewaris_key[i].fileid_wali_cucu + ')" class="button color-blue button-fill button-small">SURAT PERWALIAN</a></td>';
                }
                cucu_anak_kandung_pewaris_row += '</tr>';
            }
        }
        if (cucu_anak_kandung_pewaris_row !== '') {
            $$("#cucu_anak_kandung_pewaris_table table tbody").html(cucu_anak_kandung_pewaris_row);
        }
        if (iamthedoor.role_id != 4) {
            $$('.hapus-table').hide();
        }
        $$(".hapus_cucu_anak_kandung").on('click', function () {
            cucu_anak_kandung_pewaris_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin Menghapus data?', function () {
                cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].status = 'terhapus';
                reload_cucu_anak_kandung_pewaris_table(cucu_anak_kandung_pewaris_key);
            });
        });
        $$(".edit_cucu_anak_kandung").on('click', function () {
            cucu_anak_kandung_pewaris_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin akan merubah data?', function () {
                popup_tambah_cucu_anak_kandung_pewaris();
                $$("#tambah_cucu_anak_kandung_pewaris").attr("data-id", cucu_anak_kandung_pewaris_id);
                $$("input[name='nik_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].nik_cucu);
                $$("input[name='nama_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].nama_cucu);
                $$("input[name='tgl_lahir_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].tgl_lahir_cucu);
                $$("input[name='umur_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].umur_cucu);
                $$("textarea[name='alamat_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].alamat_cucu);
                $$("select[name='status_kawin_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].status_kawin_cucu);
                $$("select[name='status_hidup_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].status_hidup_cucu);
                $$("input[name='nama_wali_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].nama_wali_cucu);
                $$("input[name='hubungan_wali_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].hubungan_wali_cucu);
                $$("input[name='filecode_ktp_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].filecode_ktp_cucu);
                $$("input[name='filecode_kk_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].filecode_kk_cucu);
                $$("input[name='filecode_sn_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].filecode_sn_cucu);
                $$("input[name='filecode_ak_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].filecode_ak_cucu);
                $$("input[name='filecode_wali_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].filecode_wali_cucu);
                $$("input[name='fileid_ktp_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_ktp_cucu);
                $$("input[name='fileid_kk_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_kk_cucu);
                $$("input[name='fileid_sn_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_sn_cucu);
                $$("input[name='fileid_ak_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_ak_cucu);
                $$("input[name='fileid_wali_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_wali_cucu);
                $$("input[name='fileurl_ktp_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileurl_ktp_cucu);
                $$("input[name='fileurl_kk_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileurl_kk_cucu);
                $$("input[name='fileurl_sn_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileurl_sn_cucu);
                $$("input[name='fileurl_ak_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileurl_ak_cucu);
                $$("input[name='fileurl_wali_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileurl_wali_cucu);
                if (cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_ktp_cucu != '') {
                    var preview_file_ktp_cucu = '<a id="_ktp_cucu" onclick="preview_file_waris(' + cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_ktp_cucu + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                    $$(".preview_file_ktp_cucu").html(preview_file_ktp_cucu);
                }
                if (cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_kk_cucu != '') {
                    var preview_file_kk_cucu = '<a id="_kk_cucu" onclick="preview_file_waris(' + cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_kk_cucu + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                    $$(".preview_file_kk_cucu").html(preview_file_kk_cucu);
                }
                if (cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_sn_cucu != '') {
                    var preview_file_sn_cucu = '<a id="_sn_cucu" onclick="preview_file_waris(' + cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_sn_cucu + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                    $$(".preview_file_sn_cucu").html(preview_file_sn_cucu);
                }
                if (cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_ak_cucu != '') {
                    var preview_file_ak_cucu = '<a id="_ak_cucu" onclick="preview_file_waris(' + cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_ak_cucu + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                    $$(".preview_file_ak_cucu").html(preview_file_ak_cucu);
                }
                if (cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_wali_cucu != '') {
                    var preview_file_wali_cucu = '<a id="_wali_cucu" onclick="preview_file_waris(' + cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_wali_cucu + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                    $$(".preview_file_wali_cucu").html(preview_file_wali_cucu);
                }

                if (cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].status_kawin_cucu == 'Belum Kawin') {
                    $$('#status_kawin_cucu_belum').hide();
                } else {
                    $$('#status_kawin_cucu_belum').show();
                }

                if (cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].status_hidup_cucu == 'Meninggal') {
                    $$('#status_hidup_cucu_meninggal').show();
                } else {
                    $$('#status_hidup_cucu_meninggal').hide();
                }

                if (cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].umur_cucu <= 17) {
                    $$('#ktpcucu').html('KTP Wali');
                    $$('#kkcucu').html('KK Wali');
                    $$('#umur17kebawah').show();
                    $$('#pernyataan_wali_cucu').show();
                } else {
                    $$('#ktpcucu').html('KTP');
                    $$('#kkcucu').html('KK');
                    $$('#umur17kebawah').hide();
                    $$('#pernyataan_wali_cucu').hide();
                }

            });
        });
    }
    // cucu anak kandung end

    // Anak Angkat Pewaris
    anak_angkat_pewaris = new Array();
    $$('#addanakangkatpewaris').on('touchend', function () {
        popup_tambah_anak_angkat_pewaris();
    });

    function popup_tambah_anak_angkat_pewaris() {
        var popup_anak_angkat = app.popup.create({
            content: '<div class="popup page-content">' +
                '<div class="block">' +
                '<form class="list" id="tambah_anak_angkat_pewaris" data-id="null">' +
                '<div class="block-title">' +
                '<div class="row">' +
                '<div class="col-100">' +
                '<div class="chip color-blue">' +
                '<div class="chip-label">Form Tambah Anak Angkat Pewaris</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<ul id="formupload-wrapper-list-waris">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">NIK</div>' +
                '<div class="item-input-wrap">' +
                '<input type="number" name="nik_anak_angkat">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Nama</div>' +
                '<div class="item-input-wrap">' +
                '<input type="text" name="nama_anak_angkat">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Tanggal Lahir</div>' +
                '<div class="item-input-wrap">' +
                '<input type="date" name="tgl_lahir_anak_angkat">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Umur</div>' +
                '<div class="item-input-wrap">' +
                '<input type="number" name="umur_anak_angkat" id="umur_anak_angkat">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Alamat</div>' +
                '<div class="item-input-wrap">' +
                '<textarea class="resizable" name="alamat_anak_angkat"></textarea>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Status Kawin</div>' +
                '<div class="item-input-wrap input-dropdown-wrap">' +
                '<select name="status_kawin_anak_angkat" id="status_kawin_anak_angkat">' +
                '<option value="Sudah Kawin">SUDAH KAWIN</option>' +
                '<option value="Belum Kawin">BELUM KAWIN</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Status Hidup</div>' +
                '<div class="item-input-wrap input-dropdown-wrap">' +
                '<select name="status_hidup_anak_angkat" id="status_hidup_anak_angkat">' +
                '<option value="Hidup">HIDUP</option>' +
                '<option value="Meninggal">MENINGGAL</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<div id="wali_anak_angkat" style="display: none;">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Nama Wali</div>' +
                '<div class="item-input-wrap">' +
                '<input type="text" name="nama_wali_anak_angkat">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Hubungan dengan yang diwakili</div>' +
                '<div class="item-input-wrap">' +
                '<input type="text" name="hubungan_wali_anak_angkat">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</div>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">KTP</div>' +
                '<div class="item-input-wrap">' +
                '<input id="fileid_ktp_anak_angkat" class="fileid" type="hidden" name="fileid_ktp_anak_angkat">' +
                '<input id="filecode_ktp_anak_angkat" type="hidden" readonly name="filecode_ktp_anak_angkat">' +
                '<input id="fileurl_ktp_anak_angkat" type="text" name="fileurl_ktp_anak_angkat" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ktp_anak_angkat"></div>' +
                '<div class="col-20">' +
                '<a id="_ktp_anak_angkat" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">KK</div>' +
                '<div class="item-input-wrap">' +
                '<input id="fileid_kk_anak_angkat" class="fileid" type="hidden" name="fileid_kk_anak_angkat">' +
                '<input id="filecode_kk_anak_angkat" type="hidden" readonly name="filecode_kk_anak_angkat">' +
                '<input id="fileurl_kk_anak_angkat" type="text" name="fileurl_kk_anak_angkat" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_kk_anak_angkat"></div>' +
                '<div class="col-20">' +
                '<a id="_kk_anak_angkat" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li id="anak_angkat_kawin">' +
                '<ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Buku Nikah</div>' +
                '<input id="fileid_sn_anak_angkat" class="fileid" type="hidden" name="fileid_sn_anak_angkat">' +
                '<input  id="filecode_sn_anak_angkat" type="hidden" readonly name="filecode_sn_anak_angkat">' +
                '<input  id="fileurl_sn_anak_angkat" type="text" name="fileurl_sn_anak_angkat" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_sn_anak_angkat"></div>' +
                '<div class="col-20">' +
                '<a id="_sn_anak_angkat" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</li>' +
                '<li data-index="ak_anak_angkat" id="anak_angkat_meninggal" style="display: none;">' +
                '<ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Akta Kematian</div>' +
                '<input id="fileid_ak_anak_angkat" class="fileid" type="hidden" name="fileid_ak_anak_angkat">' +
                '<input  id="filecode_ak_anak_angkat" type="hidden" readonly name="filecode_ak_anak_angkat">' +
                '<input  id="fileurl_ak_anak_angkat" type="text" name="fileurl_ak_anak_angkat" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ak_anak_angkat"></div>' +
                '<div class="col-20">' +
                '<a id="_ak_anak_angkat" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</li>' +
                '<li data-index="pernyataan_wali_anak_angkat" id="pernyataan_wali_anak_angkat" style="display: none;">' +
                '<ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Surat Pernyataan Wali</div>' +
                '<input id="fileid_pernyataan_wali_anak_angkat" class="fileid" type="hidden" name="fileid_pernyataan_wali_anak_angkat">' +
                '<input  id="filecode_pernyataan_wali_anak_angkat" type="hidden" readonly name="filecode_wali_anak_angkat">' +
                '<input  id="fileurl_pernyataan_wali_anak_angkat" type="text" name="fileurl_pernyataan_wali_anak_angkat" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_pernyataan_wali_anak_angkat"></div>' +
                '<div class="col-20">' +
                '<a id="_pernyataan_wali_anak_angkat" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</li>' +
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
                '<a class="button button-round button-fill color-green" id="save_anak_angkat_pewaris" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
                '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',
            on: {
                open: function () {
                    $$('#status_kawin_anak_angkat').on('change', function () {
                        $$('#fileid_sn_anak_angkat').val('');
                        $$('#filecode_sn_anak_angkat').val('');
                        $$('#fileurl_sn_anak_angkat').val('');
                        $$('.preview_file_sn_anak_angkat').html('');

                        if ($(this).val() == 'Sudah Kawin') {
                            $$('#anak_angkat_kawin').show();
                        } else {
                            $$('#anak_angkat_kawin').hide();
                        }
                    });

                    $$('#status_hidup_anak_angkat').on('change', function () {
                        $$('#fileid_ak_anak_angkat').val('');
                        $$('#filecode_ak_anak_angkat').val('');
                        $$('#fileurl_ak_anak_angkat').val('');
                        $$('.preview_file_ak_anak_angkat').html('');

                        if ($(this).val() == 'Meninggal') {
                            $$('#anak_angkat_meninggal').show();
                        } else {
                            $$('#anak_angkat_meninggal').hide();
                        }
                    });

                    $$('#umur_anak_angkat').on('input', function () {
                        $$('#wali_anak_angkat input').val('');

                        $$('#fileid_pernyataan_wali_anak_angkat').val('');
                        $$('#filecode_pernyataan_wali_anak_angkat').val('');
                        $$('#fileurl_pernyataan_wali_anak_angkat').val('');
                        $$('.preview_file_pernyataan_wali_anak_angkat').html('');

                        if ($(this).val() <= 17 && $(this).val() != '') {
                            $$('#pernyataan_wali_anak_angkat').show();
                            $$('#wali_anak_angkat').show();
                        } else {
                            $$('#pernyataan_wali_anak_angkat').hide();
                            $$('#wali_anak_angkat').hide();
                        }
                    });
                },
            }
        });
        popup_anak_angkat.open();
        $$("#save_anak_angkat_pewaris").on('click', function () {
            popup_anak_angkat.close();
            if ($("#tambah_anak_angkat_pewaris").data("id") !== null) {
                pasangan_pewaris_id = $("#tambah_anak_angkat_pewaris").data("id");
                anak_angkat_pewaris[pasangan_pewaris_id] = app.form.convertToData("#tambah_anak_angkat_pewaris");
            } else {
                anak_angkat_pewaris.push(app.form.convertToData("#tambah_anak_angkat_pewaris"));
            }
            reload_anak_angkat_pewaris_table(anak_angkat_pewaris);
            if (app.form.convertToData("#tambah_anak_angkat_pewaris").status_hidup_anak_angkat == 'Meninggal') {
                popup_tambah_cucu_angkat_pewaris();
            }
        });
    }

    function reload_anak_angkat_pewaris_table(anak_angkat) {
        anak_angkat_pewaris_row = '';
        anak_angkat.forEach(function (val, key) {
            if (val.status == 'tersimpan') {
                anak_angkat_pewaris_row += '<tr>' +
                    '<td class="label-cell aksi-table" style="padding: 0 12px;"><a data-id="' + key + '" class="edit_anak_angkat button button-small color-blue button-fill">EDIT</a></td>' +
                    '<td class="label-cell hapus-table" style="padding: 0 12px 0 0;"><a data-id="' + key + '"  class="hapus_anak_angkat button color-red button-fill button-small">HAPUS</a></td>' +
                    '<td class="label-cell">' + val.nik_anak_angkat + '</td>' +
                    '<td class="label-cell">' + val.nama_anak_angkat + '</td>' +
                    '<td class="label-cell">' + val.tgl_lahir_anak_angkat + '</td>' +
                    '<td class="label-cell">' + val.umur_anak_angkat + '</td>' +
                    '<td class="label-cell">' + val.alamat_anak_angkat + '</td>' +
                    '<td class="label-cell">' + val.status_kawin_anak_angkat + '</td>' +
                    '<td class="label-cell">' + val.status_hidup_anak_angkat + '</td>' +
                    '<td class="label-cell">' + val.nama_wali_anak_angkat + '</td>' +
                    '<td class="label-cell">' + val.hubungan_wali_anak_angkat + '</td>' +
                    '<td class="label-cell">';
                if (val.fileid_ktp_anak_angkat != '') {
                    anak_angkat_pewaris_row += '<a data-id="' + key + '" onclick="preview_files(' + val.fileid_ktp_anak_angkat + ')" class="button color-blue button-fill button-small">KTP</a>';
                }
                anak_angkat_pewaris_row += '</td>' +
                    '<td class="label-cell">';
                if (val.fileid_kk_anak_angkat != '') {
                    anak_angkat_pewaris_row += '<a data-id="' + key + '" onclick="preview_files(' + val.fileid_kk_anak_angkat + ')" class="button color-blue button-fill button-small">KK</a>';
                }
                anak_angkat_pewaris_row += '</td>';
                if (val.fileid_sn_anak_angkat != '') {
                    anak_angkat_pewaris_row += '<td class="label-cell"><a data-id="' + key + '" onclick="preview_files(' + val.fileid_sn_anak_angkat + ')" class="button color-blue button-fill button-small">SURAT NIKAH</a></td>';
                }
                if (val.fileid_ak_anak_angkat != '') {
                    anak_angkat_pewaris_row += '<td class="label-cell"><a data-id="' + key + '" onclick="preview_files(' + val.fileid_ak_anak_angkat + ')" class="button color-blue button-fill button-small">AKTA KEMATIAN</a></td>';
                }
                if (val.fileid_pernyataan_wali_anak_angkat != '') {
                    anak_angkat_pewaris_row += '<td class="label-cell"><a data-id="' + key + '" onclick="preview_files(' + val.fileid_pernyataan_wali_anak_angkat + ')" class="button color-blue button-fill button-small">SURAT PERWALIAN</a></td>';
                }
                anak_angkat_pewaris_row += '<td class="label-cell"></td>' +
                    '</tr>';
            }
        })

        if (anak_angkat_pewaris_row !== '') {
            $$('#anggota_anak_angkat_pewaris_table table tbody').html(anak_angkat_pewaris_row);
        } else {
            $$('#anggota_anak_angkat_pewaris_table table tbody').html('<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="numeric-cell"></td>' +
                '<td class="label-cell">Data Kosong</td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>');
        }

        $$(".hapus_anak_angkat").on('click', function () {
            anak_angkat_pewaris_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin Menghapus data?', function () {
                anak_angkat[anak_angkat_pewaris_id].status = 'terhapus';
                reload_anak_angkat_pewaris_table(anak_angkat);
            });
        });

        $$(".edit_anak_angkat").on('click', function () {
            id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin akan merubah data?', function () {
                popup_tambah_anak_angkat_pewaris();
                $$("#tambah_anak_angkat_pewaris").attr("data-id", id);
                $$("input[name='nik_anak_angkat']").val(anak_angkat[id].nik_anak_angkat);
                $$("input[name='nama_anak_angkat']").val(anak_angkat[id].nama_anak_angkat);
                $$("input[name='tgl_lahir_anak_angkat']").val(anak_angkat[id].tgl_lahir_anak_angkat);
                $$("input[name='umur_anak_angkat']").val(anak_angkat[id].umur_anak_angkat);
                $$("textarea[name='alamat_anak_angkat']").text(anak_angkat[id].alamat_anak_angkat);
                $$("select[name='status_kawin_anak_angkat']").val(anak_angkat[id].status_kawin_anak_angkat);
                $$("select[name='status_hidup_anak_angkat']").val(anak_angkat[id].status_hidup_anak_angkat);
                $$("input[name='nama_wali_anak_angkat']").val(anak_angkat[id].nama_wali_anak_angkat);
                $$("input[name='hubungan_wali_anak_angkat']").val(anak_angkat[id].hubungan_wali_anak_angkat);

                $$("input[name='filecode_ktp_anak_angkat']").val(anak_angkat[id].filecode_ktp_anak_angkat);
                $$("input[name='fileid_ktp_anak_angkat']").val(anak_angkat[id].fileid_ktp_anak_angkat);
                $$("input[name='fileurl_ktp_anak_angkat']").val(anak_angkat[id].fileurl_ktp_anak_angkat);

                $$("input[name='filecode_kk_anak_angkat']").val(anak_angkat[id].filecode_kk_anak_angkat);
                $$("input[name='fileid_kk_anak_angkat']").val(anak_angkat[id].fileid_kk_anak_angkat);
                $$("input[name='fileurl_kk_anak_angkat']").val(anak_angkat[id].fileurl_kk_anak_angkat);

                $$("input[name='filecode_sn_anak_angkat']").val(anak_angkat[id].filecode_sn_anak_angkat);
                $$("input[name='fileid_sn_anak_angkat']").val(anak_angkat[id].fileid_sn_anak_angkat);
                $$("input[name='fileurl_sn_anak_angkat']").val(anak_angkat[id].fileurl_sn_anak_angkat);

                $$("input[name='filecode_ak_anak_angkat']").val(anak_angkat[id].filecode_ak_anak_angkat);
                $$("input[name='fileid_ak_anak_angkat']").val(anak_angkat[id].fileid_ak_anak_angkat);
                $$("input[name='fileurl_ak_anak_angkat']").val(anak_angkat[id].fileurl_ak_anak_angkat);

                $$("input[name='filecode_pernyataan_wali_anak_angkat']").val(anak_angkat[id].filecode_pernyataan_wali_anak_angkat);
                $$("input[name='fileid_pernyataan_wali_anak_angkat']").val(anak_angkat[id].fileid_pernyataan_wali_anak_angkat);
                $$("input[name='fileurl_pernyataan_wali_anak_angkat']").val(anak_angkat[id].fileurl_pernyataan_wali_anak_angkat);

                var preview_file_ktp = '';
                if (anak_angkat[id].fileid_ktp_anak_angkat != '') {
                    preview_file_ktp = '<a onclick="preview_file_waris(' + anak_angkat[id].fileid_ktp_anak_angkat + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_ktp_anak_angkat").html(preview_file_ktp);

                var preview_file_kk = '';
                if (anak_angkat[id].fileid_kk_anak_angkat != '') {
                    preview_file_kk = '<a onclick="preview_file_waris(' + anak_angkat[id].fileid_kk_anak_angkat + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_kk_anak_angkat").html(preview_file_kk);

                var preview_file_sn = '';
                if (anak_angkat[id].fileid_sn_anak_angkat != '') {
                    preview_file_sn = '<a onclick="preview_file_waris(' + anak_angkat[id].fileid_sn_anak_angkat + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_sn_anak_angkat").html(preview_file_sn);

                var preview_file_ak = '';
                if (anak_angkat[id].fileid_ak_anak_angkat != '') {
                    preview_file_ak = '<a onclick="preview_file_waris(' + anak_angkat[id].fileid_ak_anak_angkat + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_ak_anak_angkat").html(preview_file_ak);

                var preview_file_pernyataan_wali = '';
                if (anak_angkat[id].fileid_pernyataan_wali_anak_angkat != '') {
                    preview_file_pernyataan_wali = '<a onclick="preview_file_waris(' + anak_angkat[id].fileid_pernyataan_wali_anak_angkat + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_pernyataan_wali_anak_angkat").html(preview_file_pernyataan_wali);

                if (anak_angkat[id].umur_anak_angkat <= 17) {
                    $$('#pernyataan_wali_anak_angkat').show();
                    $$('#wali_anak_angkat').show();
                }

                if (anak_angkat[id].status_kawin_anak_angkat == 'Belum Kawin') {
                    $$('#anak_angkat_kawin').hide();
                }

                if (anak_angkat[id].status_hidup_anak_angkat == 'Meninggal') {
                    $$('#anak_angkat_meninggal').show();
                }
            });
        });

        cek_anak_angkat_meninggal(anak_angkat);
    }

    function cek_anak_angkat_meninggal(anak_angkat) {
        var cucu_angkat = false;
        anak_angkat.forEach(function (val, key) {
            if (val.status == 'tersimpan' && val.status_hidup_anak_angkat == 'Meninggal') {
                cucu_angkat = true;
            }
        });

        if (cucu_angkat) {
            $$('#cucu_angkat_pewaris').show();
        } else {
            $$('#cucu_angkat_pewaris').hide();
        }
    }

    // Cucu dari Anak Angkat Pewaris
    cucu_angkat_pewaris = new Array();
    $$('#addcucuangkatpewaris').on('touchend', function () {
        popup_tambah_cucu_angkat_pewaris();
    });

    function popup_tambah_cucu_angkat_pewaris() {
        var list_orang_tua_cucu_angkat = '';
        anak_angkat_pewaris.forEach(function (val, index) {
            if (val.status == "tersimpan" && val.status_hidup_anak_angkat == "Meninggal") {
                list_orang_tua_cucu_angkat += '<option value="' + val.nama_anak_angkat + '">' + val.nama_anak_angkat + '</option>';
            }
        });
        var popup_cucu_angkat = app.popup.create({
            content: '<div class="popup page-content">' +
                '<div class="block">' +
                '<form class="list" id="tambah_cucu_angkat_pewaris" data-id="null">' +
                '<div class="block-title">' +
                '<div class="row">' +
                '<div class="col-100">' +
                '<div class="chip color-blue">' +
                '<div class="chip-label">Form Tambah Cucu dari Anak Angkat Pewaris</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<ul id="formupload-wrapper-list-waris">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Nama Orang Tua</div>' +
                '<div class="item-input-wrap input-dropdown-wrap">' +
                '<select name="orang_tua_cucu_angkat">' +
                list_orang_tua_cucu_angkat +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">NIK</div>' +
                '<div class="item-input-wrap">' +
                '<input type="number" name="nik_cucu_angkat">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Nama</div>' +
                '<div class="item-input-wrap">' +
                '<input type="text" name="nama_cucu_angkat">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Tanggal Lahir</div>' +
                '<div class="item-input-wrap">' +
                '<input type="date" name="tgl_lahir_cucu_angkat">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Umur</div>' +
                '<div class="item-input-wrap">' +
                '<input type="number" name="umur_cucu_angkat" id="umur_cucu_angkat">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Alamat</div>' +
                '<div class="item-input-wrap">' +
                '<textarea class="resizable" name="alamat_cucu_angkat"></textarea>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Status Kawin</div>' +
                '<div class="item-input-wrap input-dropdown-wrap">' +
                '<select name="status_kawin_cucu_angkat" id="status_kawin_cucu_angkat">' +
                '<option value="Sudah Kawin">SUDAH KAWIN</option>' +
                '<option value="Belum Kawin">BELUM KAWIN</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Status Hidup</div>' +
                '<div class="item-input-wrap input-dropdown-wrap">' +
                '<select name="status_hidup_cucu_angkat" id="status_hidup_cucu_angkat">' +
                '<option value="Hidup">HIDUP</option>' +
                '<option value="Meninggal">MENINGGAL</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<div id="wali_cucu_angkat" style="display: none;">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Nama Wali</div>' +
                '<div class="item-input-wrap">' +
                '<input type="text" name="nama_wali_cucu_angkat">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Hubungan dengan yang diwakili</div>' +
                '<div class="item-input-wrap">' +
                '<input type="text" name="hubungan_wali_cucu_angkat">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</div>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">KTP</div>' +
                '<div class="item-input-wrap">' +
                '<input id="fileid_ktp_cucu_angkat" class="fileid" type="hidden" name="fileid_ktp_cucu_angkat">' +
                '<input  id="filecode_ktp_cucu_angkat" type="hidden" readonly name="filecode_ktp_cucu_angkat">' +
                '<input  id="fileurl_ktp_cucu_angkat" type="text" name="fileurl_ktp_cucu_angkat" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ktp_cucu_angkat"></div>' +
                '<div class="col-20">' +
                '<a id="_ktp_cucu_angkat" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">KK</div>' +
                '<div class="item-input-wrap">' +
                '<input id="fileid_kk_cucu_angkat" class="fileid" type="hidden" name="fileid_kk_cucu_angkat">' +
                '<input id="filecode_kk_cucu_angkat" type="hidden" readonly name="filecode_kk_cucu_angkat">' +
                '<input id="fileurl_kk_cucu_angkat" type="text" name="fileurl_kk_cucu_angkat" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_kk_cucu_angkat"></div>' +
                '<div class="col-20">' +
                '<a id="_kk_cucu_angkat" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li data-index="sn_cucu_angkat" id="cucu_angkat_kawin">' +
                '<ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Buku Nikah</div>' +
                '<input id="fileid_sn_cucu_angkat" class="fileid" type="hidden" name="fileid_sn_cucu_angkat">' +
                '<input  id="filecode_sn_cucu_angkat" type="hidden" readonly name="filecode_sn_cucu_angkat">' +
                '<input  id="fileurl_sn_cucu_angkat" type="text" name="fileurl_sn_cucu_angkat" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_sn_cucu_angkat"></div>' +
                '<div class="col-20">' +
                '<a id="_sn_cucu_angkat" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</li>' +
                '<li data-index="ak_cucu_angkat" id="cucu_angkat_meninggal" style="display: none;">' +
                '<ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Akta Kematian</div>' +
                '<input id="fileid_ak_cucu_angkat" class="fileid" type="hidden" name="fileid_ak_cucu_angkat">' +
                '<input  id="filecode_ak_cucu_angkat" type="hidden" readonly name="filecode_ak_cucu_angkat">' +
                '<input  id="fileurl_ak_cucu_angkat" type="text" name="fileurl_ak_cucu_angkat" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ak_cucu_angkat"></div>' +
                '<div class="col-20">' +
                '<a id="_ak_cucu_angkat" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</li>' +
                '<li data-index="pernyataan_wali_cucu_angkat" id="pernyataan_wali_cucu_angkat" style="display: none;">' +
                '<ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Surat Pernyataan Wali</div>' +
                '<input id="fileid_pernyataan_wali_cucu_angkat" class="fileid" type="hidden" name="fileid_pernyataan_wali_cucu_angkat">' +
                '<input  id="filecode_pernyataan_wali_cucu_angkat" type="hidden" readonly name="filecode_pernyataan_wali_cucu_angkat">' +
                '<input  id="fileurl_pernyataan_wali_cucu_angkat" type="text" name="fileurl_pernyataan_wali_cucu_angkat" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_pernyataan_wali_cucu_angkat"></div>' +
                '<div class="col-20">' +
                '<a id="_pernyataan_wali_cucu_angkat" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</li>' +
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
                '<a class="button button-round button-fill color-green" id="save_cucu_angkat_pewaris" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
                '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',
            on: {
                open: function () {
                    $$('#status_kawin_cucu_angkat').on('change', function () {
                        $$('#fileid_sn_cucu_angkat').val('');
                        $$('#filecode_sn_cucu_angkat').val('');
                        $$('#fileurl_sn_cucu_angkat').val('');
                        $$('.preview_file_sn_cucu_angkat').html('');

                        if ($(this).val() == 'Sudah Kawin') {
                            $$('#cucu_angkat_kawin').show();
                        } else {
                            $$('#cucu_angkat_kawin').hide();
                        }
                    });

                    $$('#status_hidup_cucu_angkat').on('change', function () {
                        $$('#fileid_ak_cucu_angkat').val('');
                        $$('#filecode_ak_cucu_angkat').val('');
                        $$('#fileurl_ak_cucu_angkat').val('');
                        $$('.preview_file_ak_cucu_angkat').html('');

                        if ($(this).val() == 'Meninggal') {
                            $$('#cucu_angkat_meninggal').show();
                        } else {
                            $$('#cucu_angkat_meninggal').hide();
                        }
                    });

                    $$('#umur_cucu_angkat').on('input', function () {
                        $$('#wali_cucu_angkat input').val('');

                        $$('#fileid_pernyataan_wali_cucu_angkat').val('');
                        $$('#filecode_pernyataan_wali_cucu_angkat').val('');
                        $$('#fileurl_pernyataan_wali_cucu_angkat').val('');
                        $$('.preview_file_pernyataan_wali_cucu_angkat').html('');

                        if ($(this).val() <= 17 && $(this).val() != '') {
                            $$('#pernyataan_wali_cucu_angkat').show();
                            $$('#wali_cucu_angkat').show();
                        } else {
                            $$('#pernyataan_wali_cucu_angkat').hide();
                            $$('#wali_cucu_angkat').hide();
                        }
                    });
                },
            }
        });
        popup_cucu_angkat.open();
        $$("#save_cucu_angkat_pewaris").on('click', function () {
            popup_cucu_angkat.close();
            if ($("#tambah_cucu_angkat_pewaris").data("id") !== null) {
                id = $("#tambah_cucu_angkat_pewaris").data("id");
                cucu_angkat_pewaris[id] = app.form.convertToData("#tambah_cucu_angkat_pewaris");
            } else {
                cucu_angkat_pewaris.push(app.form.convertToData("#tambah_cucu_angkat_pewaris"));
            }
            reload_cucu_angkat_pewaris_table(cucu_angkat_pewaris);
        });
    }

    function reload_cucu_angkat_pewaris_table(cucu_angkat) {
        cucu_angkat_pewaris_row = '';
        cucu_angkat.forEach(function (val, key) {
            if (val.status == 'tersimpan') {
                cucu_angkat_pewaris_row += '<tr>' +
                    '<td class="label-cell aksi-table" style="padding: 0 12px;"><a data-id="' + key + '" class="edit_cucu_angkat button button-small color-blue button-fill">EDIT</a></td>' +
                    '<td class="label-cell hapus-table" style="padding: 0 12px 0 0;"><a data-id="' + key + '"  class="hapus_cucu_angkat button color-red button-fill button-small">HAPUS</a></td>' +
                    '<td class="label-cell">' + val.orang_tua_cucu_angkat + '</td>' +
                    '<td class="label-cell">' + val.nik_cucu_angkat + '</td>' +
                    '<td class="label-cell">' + val.nama_cucu_angkat + '</td>' +
                    '<td class="label-cell">' + val.tgl_lahir_cucu_angkat + '</td>' +
                    '<td class="label-cell">' + val.umur_cucu_angkat + '</td>' +
                    '<td class="label-cell">' + val.alamat_cucu_angkat + '</td>' +
                    '<td class="label-cell">' + val.status_kawin_cucu_angkat + '</td>' +
                    '<td class="label-cell">' + val.status_hidup_cucu_angkat + '</td>' +
                    '<td class="label-cell">' + val.nama_wali_cucu_angkat + '</td>' +
                    '<td class="label-cell">' + val.hubungan_wali_cucu_angkat + '</td>' +
                    '<td class="label-cell">';
                if (val.fileid_ktp_cucu_angkat != '') {
                    cucu_angkat_pewaris_row += '<a data-id="' + key + '" onclick="preview_files(' + val.fileid_ktp_cucu_angkat + ')" class="button color-blue button-fill button-small">KTP</a>';
                }
                cucu_angkat_pewaris_row += '</td>' +
                    '<td class="label-cell">';
                if (val.fileid_kk_cucu_angkat != '') {
                    cucu_angkat_pewaris_row += '<a data-id="' + key + '" onclick="preview_files(' + val.fileid_kk_cucu_angkat + ')" class="button color-blue button-fill button-small">KK</a>';
                }
                cucu_angkat_pewaris_row += '</td>';
                if (val.fileid_sn_cucu_angkat != '') {
                    cucu_angkat_pewaris_row += '<td class="label-cell"><a data-id="' + key + '" onclick="preview_files(' + val.fileid_sn_cucu_angkat + ')" class="button color-blue button-fill button-small">SURAT NIKAH</a></td>';
                }
                if (val.fileid_ak_cucu_angkat != '') {
                    cucu_angkat_pewaris_row += '<td class="label-cell"><a data-id="' + key + '" onclick="preview_files(' + val.fileid_ak_cucu_angkat + ')" class="button color-blue button-fill button-small">AKTA KEMATIAN</a></td>';
                }
                if (val.fileid_pernyataan_wali_cucu_angkat != '') {
                    cucu_angkat_pewaris_row += '<td class="label-cell"><a data-id="' + key + '" onclick="preview_files(' + val.fileid_pernyataan_wali_cucu_angkat + ')" class="button color-blue button-fill button-small">SURAT PERWALIAN</a></td>';
                }
                cucu_angkat_pewaris_row += '<td class="label-cell"></td>' +
                    '</tr>';
            }
        })

        if (cucu_angkat_pewaris_row !== '') {
            $$('#anggota_cucu_angkat_pewaris_table table tbody').html(cucu_angkat_pewaris_row);
        } else {
            $$('#anggota_cucu_angkat_pewaris_table table tbody').html('<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="numeric-cell"></td>' +
                '<td class="label-cell">Data Kosong</td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>');
        }

        $$(".hapus_cucu_angkat").on('click', function () {
            cucu_angkat_pewaris_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin Menghapus data?', function () {
                cucu_angkat[cucu_angkat_pewaris_id].status = 'terhapus';
                reload_cucu_angkat_pewaris_table(cucu_angkat);
            });
        });

        $$(".edit_cucu_angkat").on('click', function () {
            id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin akan merubah data?', function () {
                popup_tambah_cucu_angkat_pewaris();
                $$("#tambah_cucu_angkat_pewaris").attr("data-id", id);
                $$("select[name='orang_tua_cucu_angkat']").val(cucu_angkat[id].orang_tua_cucu_angkat);
                $$("input[name='nik_cucu_angkat']").val(cucu_angkat[id].nik_cucu_angkat);
                $$("input[name='nama_cucu_angkat']").val(cucu_angkat[id].nama_cucu_angkat);
                $$("input[name='tgl_lahir_cucu_angkat']").val(cucu_angkat[id].tgl_lahir_cucu_angkat);
                $$("input[name='umur_cucu_angkat']").val(cucu_angkat[id].umur_cucu_angkat);
                $$("textarea[name='alamat_cucu_angkat']").text(cucu_angkat[id].alamat_cucu_angkat);
                $$("select[name='status_kawin_cucu_angkat']").val(cucu_angkat[id].status_kawin_cucu_angkat);
                $$("select[name='status_hidup_cucu_angkat']").val(cucu_angkat[id].status_hidup_cucu_angkat);
                $$("input[name='nama_wali_cucu_angkat']").val(cucu_angkat[id].nama_wali_cucu_angkat);
                $$("input[name='hubungan_wali_cucu_angkat']").val(cucu_angkat[id].hubungan_wali_cucu_angkat);

                $$("input[name='filecode_ktp_cucu_angkat']").val(cucu_angkat[id].filecode_ktp_cucu_angkat);
                $$("input[name='fileid_ktp_cucu_angkat']").val(cucu_angkat[id].fileid_ktp_cucu_angkat);
                $$("input[name='fileurl_ktp_cucu_angkat']").val(cucu_angkat[id].fileurl_ktp_cucu_angkat);

                $$("input[name='filecode_kk_cucu_angkat']").val(cucu_angkat[id].filecode_kk_cucu_angkat);
                $$("input[name='fileid_kk_cucu_angkat']").val(cucu_angkat[id].fileid_kk_cucu_angkat);
                $$("input[name='fileurl_kk_cucu_angkat']").val(cucu_angkat[id].fileurl_kk_cucu_angkat);

                $$("input[name='filecode_sn_cucu_angkat']").val(cucu_angkat[id].filecode_sn_cucu_angkat);
                $$("input[name='fileid_sn_cucu_angkat']").val(cucu_angkat[id].fileid_sn_cucu_angkat);
                $$("input[name='fileurl_sn_cucu_angkat']").val(cucu_angkat[id].fileurl_sn_cucu_angkat);

                $$("input[name='filecode_ak_cucu_angkat']").val(cucu_angkat[id].filecode_ak_cucu_angkat);
                $$("input[name='fileid_ak_cucu_angkat']").val(cucu_angkat[id].fileid_ak_cucu_angkat);
                $$("input[name='fileurl_ak_cucu_angkat']").val(cucu_angkat[id].fileurl_ak_cucu_angkat);

                $$("input[name='filecode_pernyataan_wali_cucu_angkat']").val(cucu_angkat[id].filecode_pernyataan_wali_cucu_angkat);
                $$("input[name='fileid_pernyataan_wali_cucu_angkat']").val(cucu_angkat[id].fileid_pernyataan_wali_cucu_angkat);
                $$("input[name='fileurl_pernyataan_wali_cucu_angkat']").val(cucu_angkat[id].fileurl_pernyataan_wali_cucu_angkat);

                var preview_file_ktp = '';
                if (cucu_angkat[id].fileid_ktp_cucu_angkat != '') {
                    preview_file_ktp = '<a onclick="preview_file_waris(' + cucu_angkat[id].fileid_ktp_cucu_angkat + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_ktp_cucu_angkat").html(preview_file_ktp);

                var preview_file_kk = '';
                if (cucu_angkat[id].fileid_kk_cucu_angkat != '') {
                    preview_file_kk = '<a onclick="preview_file_waris(' + cucu_angkat[id].fileid_kk_cucu_angkat + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_kk_cucu_angkat").html(preview_file_kk);

                var preview_file_sn = '';
                if (cucu_angkat[id].fileid_sn_cucu_angkat != '') {
                    preview_file_sn = '<a onclick="preview_file_waris(' + cucu_angkat[id].fileid_sn_cucu_angkat + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_sn_cucu_angkat").html(preview_file_sn);

                var preview_file_ak = '';
                if (cucu_angkat[id].fileid_ak_cucu_angkat != '') {
                    preview_file_ak = '<a onclick="preview_file_waris(' + cucu_angkat[id].fileid_ak_cucu_angkat + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_ak_cucu_angkat").html(preview_file_ak);

                var preview_file_pernyataan_wali = '';
                if (cucu_angkat[id].fileid_pernyataan_wali_cucu_angkat != '') {
                    preview_file_pernyataan_wali = '<a onclick="preview_file_waris(' + cucu_angkat[id].fileid_pernyataan_wali_cucu_angkat + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_pernyataan_wali_cucu_angkat").html(preview_file_pernyataan_wali);

                if (cucu_angkat[id].umur_cucu_angkat <= 17) {
                    $$('#pernyataan_wali_cucu_angkat').show();
                    $$('#wali_cucu_angkat').show();
                }

                if (cucu_angkat[id].status_kawin_cucu_angkat == 'Belum Kawin') {
                    $$('#cucu_angkat_kawin').hide();
                }

                if (cucu_angkat[id].status_hidup_cucu_angkat == 'Meninggal') {
                    $$('#cucu_angkat_meninggal').show();
                }
            });
        });
    }

    // Saudara Kandung Pewaris
    saudara_kandung_pewaris = new Array();
    $$('#addsaudarakandungpewaris').on('touchend', function () {
        popup_tambah_saudara_kandung_pewaris();
    });

    function popup_tambah_saudara_kandung_pewaris() {
        var popup_saudara_kandung = app.popup.create({
            content: '<div class="popup page-content">' +
                '<div class="block">' +
                '<form class="list" id="tambah_saudara_pewaris" data-id="null">' +
                '<div class="block-title">' +
                '<div class="row">' +
                '<div class="col-100">' +
                '<div class="chip color-blue">' +
                '<div class="chip-label">Form Tambah Saudara Kandung Pewaris</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<ul id="formupload-wrapper-list-waris">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">NIK</div>' +
                '<div class="item-input-wrap">' +
                '<input type="number" name="nik_saudara">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Nama</div>' +
                '<div class="item-input-wrap">' +
                '<input type="text" name="nama_saudara">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Tanggal Lahir</div>' +
                '<div class="item-input-wrap">' +
                '<input type="date" name="tgl_lahir_saudara">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Umur</div>' +
                '<div class="item-input-wrap">' +
                '<input type="number" name="umur_saudara" id="umur_saudara">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Alamat</div>' +
                '<div class="item-input-wrap">' +
                '<textarea class="resizable" name="alamat_saudara"></textarea>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Status Kawin</div>' +
                '<div class="item-input-wrap input-dropdown-wrap">' +
                '<select name="status_kawin_saudara" id="status_kawin_saudara">' +
                '<option value="Sudah Kawin">SUDAH KAWIN</option>' +
                '<option value="Belum Kawin">BELUM KAWIN</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Status Hidup</div>' +
                '<div class="item-input-wrap input-dropdown-wrap">' +
                '<select name="status_hidup_saudara" id="status_hidup_saudara">' +
                '<option value="Hidup">HIDUP</option>' +
                '<option value="Meninggal">MENINGGAL</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<div id="wali_saudara" style="display: none;">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Nama Wali</div>' +
                '<div class="item-input-wrap">' +
                '<input type="text" name="nama_wali_saudara">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Hubungan dengan yang diwakili</div>' +
                '<div class="item-input-wrap">' +
                '<input type="text" name="hubungan_wali_saudara">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</div>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">KTP</div>' +
                '<div class="item-input-wrap">' +
                '<input id="fileid_ktp_saudara" class="fileid" type="hidden" name="fileid_ktp_saudara">' +
                '<input  id="filecode_ktp_saudara" type="hidden" readonly name="filecode_ktp_saudara">' +
                '<input  id="fileurl_ktp_saudara" type="text" name="fileurl_ktp_saudara" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ktp_saudara"></div>' +
                '<div class="col-20">' +
                '<a id="_ktp_saudara" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">KK</div>' +
                '<div class="item-input-wrap">' +
                '<input id="fileid_kk_saudara" class="fileid" type="hidden" name="fileid_kk_saudara">' +
                '<input id="filecode_kk_saudara" type="hidden" readonly name="filecode_kk_saudara">' +
                '<input id="fileurl_kk_saudara" type="text" name="fileurl_kk_saudara" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_kk_saudara"></div>' +
                '<div class="col-20">' +
                '<a id="_kk_saudara" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li data-index="sn_saudara" id="saudara_kawin">' +
                '<ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Buku Nikah</div>' +
                '<input id="fileid_sn_saudara" class="fileid" type="hidden" name="fileid_sn_saudara">' +
                '<input  id="filecode_sn_saudara" type="hidden" readonly name="filecode_sn_saudara">' +
                '<input  id="fileurl_sn_saudara" type="text" name="fileurl_sn_saudara" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_sn_saudara"></div>' +
                '<div class="col-20">' +
                '<a id="_sn_saudara" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</li>' +
                '<li data-index="ak_saudara" id="saudara_meninggal" style="display: none;">' +
                '<ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Akta Kematian</div>' +
                '<input id="fileid_ak_saudara" class="fileid" type="hidden" name="fileid_ak_saudara">' +
                '<input  id="filecode_ak_saudara" type="hidden" readonly name="filecode_ak_saudara">' +
                '<input  id="fileurl_ak_saudara" type="text" name="fileurl_ak_saudara" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ak_saudara"></div>' +
                '<div class="col-20">' +
                '<a id="_ak_saudara" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</li>' +
                '<li data-index="pernyataan_wali_saudara" id="pernyataan_wali_saudara" style="display: none;">' +
                '<ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Surat Pernyataan Wali</div>' +
                '<input id="fileid_pernyataan_wali_saudara" class="fileid" type="hidden" name="fileid_pernyataan_wali_saudara">' +
                '<input  id="filecode_pernyataan_wali_saudara" type="hidden" readonly name="filecode_pernyataan_wali_saudara">' +
                '<input  id="fileurl_pernyataan_wali_saudara" type="text" name="fileurl_pernyataan_wali_saudara" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_pernyataan_wali_saudara"></div>' +
                '<div class="col-20">' +
                '<a id="_pernyataan_wali_saudara" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</li>' +
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
                '<a class="button button-round button-fill color-green" id="save_saudara_pewaris" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
                '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',
            on: {
                open: function () {
                    $$('#status_kawin_saudara').on('change', function () {
                        $$('#fileid_sn_saudara').val('');
                        $$('#filecode_sn_saudara').val('');
                        $$('#fileurl_sn_saudara').val('');
                        $$('.preview_file_sn_saudara').html('');

                        if ($(this).val() == 'Sudah Kawin') {
                            $$('#saudara_kawin').show();
                        } else {
                            $$('#saudara_kawin').hide();
                        }
                    });

                    $$('#status_hidup_saudara').on('change', function () {
                        $$('#fileid_ak_saudara').val('');
                        $$('#filecode_ak_saudara').val('');
                        $$('#fileurl_ak_saudara').val('');
                        $$('.preview_file_ak_saudara').html('');

                        if ($(this).val() == 'Meninggal') {
                            $$('#saudara_meninggal').show();
                        } else {
                            $$('#saudara_meninggal').hide();
                        }
                    });

                    $$('#umur_saudara').on('input', function () {
                        $$('#wali_saudara input').val('');

                        $$('#fileid_pernyataan_wali_saudara').val('');
                        $$('#filecode_pernyataan_wali_saudara').val('');
                        $$('#fileurl_pernyataan_wali_saudara').val('');
                        $$('.preview_file_pernyataan_wali_saudara').html('');

                        if ($(this).val() <= 17 && $(this).val() != '') {
                            $$('#pernyataan_wali_saudara').show();
                            $$('#wali_saudara').show();
                        } else {
                            $$('#pernyataan_wali_saudara').hide();
                            $$('#wali_saudara').hide();
                        }
                    });
                },
            }
        });
        popup_saudara_kandung.open();
        $$("#save_saudara_pewaris").on('click', function () {
            popup_saudara_kandung.close();
            if ($("#tambah_saudara_pewaris").data("id") !== null) {
                pasangan_pewaris_id = $("#tambah_saudara_pewaris").data("id");
                saudara_kandung_pewaris[pasangan_pewaris_id] = app.form.convertToData("#tambah_saudara_pewaris");
            } else {
                saudara_kandung_pewaris.push(app.form.convertToData("#tambah_saudara_pewaris"));
            }
            reload_saudara_pewaris_table(saudara_kandung_pewaris);
            if (app.form.convertToData("#tambah_saudara_pewaris").status_hidup_saudara == 'Meninggal') {
                popup_tambah_keponakan_pewaris();
            }
        });
    }

    function reload_saudara_pewaris_table(saudara_kandung) {
        saudara_pewaris_row = '';
        saudara_kandung.forEach(function (val, key) {
            if (val.status == 'tersimpan') {
                saudara_pewaris_row += '<tr>' +
                    '<td class="label-cell aksi-table" style="padding: 0 12px;"><a data-id="' + key + '" class="edit_saudara_kandung button button-small color-blue button-fill">EDIT</a></td>' +
                    '<td class="label-cell hapus-table" style="padding: 0 12px 0 0;"><a data-id="' + key + '"  class="hapus_saudara_kandung button color-red button-fill button-small">HAPUS</a></td>' +
                    '<td class="label-cell">' + val.nik_saudara + '</td>' +
                    '<td class="label-cell">' + val.nama_saudara + '</td>' +
                    '<td class="label-cell">' + val.tgl_lahir_saudara + '</td>' +
                    '<td class="label-cell">' + val.umur_saudara + '</td>' +
                    '<td class="label-cell">' + val.alamat_saudara + '</td>' +
                    '<td class="label-cell">' + val.status_kawin_saudara + '</td>' +
                    '<td class="label-cell">' + val.status_hidup_saudara + '</td>' +
                    '<td class="label-cell">' + val.nama_wali_saudara + '</td>' +
                    '<td class="label-cell">' + val.hubungan_wali_saudara + '</td>' +
                    '<td class="label-cell">';
                if (val.fileid_ktp_saudara != '') {
                    saudara_pewaris_row += '<a data-id="' + key + '" onclick="preview_files(' + val.fileid_ktp_saudara + ')" class="button color-blue button-fill button-small">KTP</a>';
                }
                saudara_pewaris_row += '</td>' +
                    '<td class="label-cell">';
                if (val.fileid_kk_saudara != '') {
                    saudara_pewaris_row += '<a data-id="' + key + '" onclick="preview_files(' + val.fileid_kk_saudara + ')" class="button color-blue button-fill button-small">KK</a>';
                }
                saudara_pewaris_row += '</td>';
                if (val.fileid_sn_saudara != '') {
                    saudara_pewaris_row += '<td class="label-cell"><a data-id="' + key + '" onclick="preview_files(' + val.fileid_sn_saudara + ')" class="button color-blue button-fill button-small">SURAT NIKAH</a></td>';
                }
                if (val.fileid_ak_saudara != '') {
                    saudara_pewaris_row += '<td class="label-cell"><a data-id="' + key + '" onclick="preview_files(' + val.fileid_ak_saudara + ')" class="button color-blue button-fill button-small">AKTA KEMATIAN</a></td>';
                }
                if (val.fileid_pernyataan_wali_saudara != '') {
                    saudara_pewaris_row += '<td class="label-cell"><a data-id="' + key + '" onclick="preview_files(' + val.fileid_pernyataan_wali_saudara + ')" class="button color-blue button-fill button-small">SURAT PERWALIAN</a></td>';
                }
                saudara_pewaris_row += '<td class="label-cell"></td>' +
                    '</tr>';
            }
        })

        if (saudara_pewaris_row !== '') {
            $$('#anggota_saudara_kandung_pewaris_table table tbody').html(saudara_pewaris_row);
        } else {
            $$('#anggota_saudara_kandung_pewaris_table table tbody').html('<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="numeric-cell"></td>' +
                '<td class="label-cell">Data Kosong</td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>');
        }

        $$(".hapus_saudara_kandung").on('click', function () {
            saudara_pewaris_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin Menghapus data?', function () {
                saudara_kandung[saudara_pewaris_id].status = 'terhapus';
                reload_saudara_pewaris_table(saudara_kandung);
            });
        });

        $$(".edit_saudara_kandung").on('click', function () {
            id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin akan merubah data?', function () {
                popup_tambah_saudara_kandung_pewaris();
                $$("#tambah_saudara_pewaris").attr("data-id", id);
                $$("input[name='nik_saudara']").val(saudara_kandung[id].nik_saudara);
                $$("input[name='nama_saudara']").val(saudara_kandung[id].nama_saudara);
                $$("input[name='tgl_lahir_saudara']").val(saudara_kandung[id].tgl_lahir_saudara);
                $$("input[name='umur_saudara']").val(saudara_kandung[id].umur_saudara);
                $$("textarea[name='alamat_saudara']").text(saudara_kandung[id].alamat_saudara);
                $$("select[name='status_kawin_saudara']").val(saudara_kandung[id].status_kawin_saudara);
                $$("select[name='status_hidup_saudara']").val(saudara_kandung[id].status_hidup_saudara);
                $$("input[name='nama_wali_saudara']").val(saudara_kandung[id].nama_wali_saudara);
                $$("input[name='hubungan_wali_saudara']").val(saudara_kandung[id].hubungan_wali_saudara);

                $$("input[name='filecode_ktp_saudara']").val(saudara_kandung[id].filecode_ktp_saudara);
                $$("input[name='fileid_ktp_saudara']").val(saudara_kandung[id].fileid_ktp_saudara);
                $$("input[name='fileurl_ktp_saudara']").val(saudara_kandung[id].fileurl_ktp_saudara);

                $$("input[name='filecode_kk_saudara']").val(saudara_kandung[id].filecode_kk_saudara);
                $$("input[name='fileid_kk_saudara']").val(saudara_kandung[id].fileid_kk_saudara);
                $$("input[name='fileurl_kk_saudara']").val(saudara_kandung[id].fileurl_kk_saudara);

                $$("input[name='filecode_sn_saudara']").val(saudara_kandung[id].filecode_sn_saudara);
                $$("input[name='fileid_sn_saudara']").val(saudara_kandung[id].fileid_sn_saudara);
                $$("input[name='fileurl_sn_saudara']").val(saudara_kandung[id].fileurl_sn_saudara);

                $$("input[name='filecode_ak_saudara']").val(saudara_kandung[id].filecode_ak_saudara);
                $$("input[name='fileid_ak_saudara']").val(saudara_kandung[id].fileid_ak_saudara);
                $$("input[name='fileurl_ak_saudara']").val(saudara_kandung[id].fileurl_ak_saudara);

                $$("input[name='filecode_pernyataan_wali_saudara']").val(saudara_kandung[id].filecode_pernyataan_wali_saudara);
                $$("input[name='fileid_pernyataan_wali_saudara']").val(saudara_kandung[id].fileid_pernyataan_wali_saudara);
                $$("input[name='fileurl_pernyataan_wali_saudara']").val(saudara_kandung[id].fileurl_pernyataan_wali_saudara);

                var preview_file_ktp = '';
                if (saudara_kandung[id].fileid_ktp_saudara != '') {
                    preview_file_ktp = '<a onclick="preview_file_waris(' + saudara_kandung[id].fileid_ktp_saudara + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_ktp_saudara").html(preview_file_ktp);

                var preview_file_kk = '';
                if (saudara_kandung[id].fileid_kk_saudara != '') {
                    preview_file_kk = '<a onclick="preview_file_waris(' + saudara_kandung[id].fileid_kk_saudara + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_kk_saudara").html(preview_file_kk);

                var preview_file_sn = '';
                if (saudara_kandung[id].fileid_sn_saudara != '') {
                    preview_file_sn = '<a onclick="preview_file_waris(' + saudara_kandung[id].fileid_sn_saudara + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_sn_saudara").html(preview_file_sn);

                var preview_file_ak = '';
                if (saudara_kandung[id].fileid_ak_saudara != '') {
                    preview_file_ak = '<a onclick="preview_file_waris(' + saudara_kandung[id].fileid_ak_saudara + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_ak_saudara").html(preview_file_ak);

                var preview_file_pernyataan_wali = '';
                if (saudara_kandung[id].fileid_pernyataan_wali_saudara != '') {
                    preview_file_pernyataan_wali = '<a onclick="preview_file_waris(' + saudara_kandung[id].fileid_pernyataan_wali_saudara + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_pernyataan_wali_saudara").html(preview_file_pernyataan_wali);

                if (saudara_kandung[id].umur_saudara <= 17) {
                    $$('#pernyataan_wali_saudara').show();
                    $$('#wali_saudara').show();
                }

                if (saudara_kandung[id].status_kawin_saudara == 'Belum Kawin') {
                    $$('#saudara_kawin').hide();
                }

                if (saudara_kandung[id].status_hidup_saudara == 'Meninggal') {
                    $$('#saudara_meninggal').show();
                }
            });
        });

        cek_saudara_meninggal(saudara_kandung);
    }

    function cek_saudara_meninggal(saudara_kandung) {
        var keponakan = false;
        saudara_kandung.forEach(function (val, key) {
            if (val.status == 'tersimpan' && val.status_hidup_saudara == 'Meninggal') {
                keponakan = true;
            }
        });

        if (keponakan) {
            $$('#keponakan_pewaris').show();
        } else {
            $$('#keponakan_pewaris').hide();
        }
    }

    // Keponakan Pewaris
    keponakan_pewaris = new Array();
    $$('#addkeponakanpewaris').on('touchend', function () {
        popup_tambah_keponakan_pewaris();
    });

    function popup_tambah_keponakan_pewaris() {
        var list_orang_tua_keponakan = '';
        saudara_kandung_pewaris.forEach(function (val, index) {
            if (val.status == "tersimpan" && val.status_hidup_saudara == "Meninggal") {
                list_orang_tua_keponakan += '<option value="' + val.nama_saudara + '">' + val.nama_saudara + '</option>';
            }
        });
        var popup_keponakan = app.popup.create({
            content: '<div class="popup page-content">' +
                '<div class="block">' +
                '<form class="list" id="tambah_keponakan_pewaris" data-id="null">' +
                '<div class="block-title">' +
                '<div class="row">' +
                '<div class="col-100">' +
                '<div class="chip color-blue">' +
                '<div class="chip-label">Form Tambah Keponakan Pewaris</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<ul id="formupload-wrapper-list-waris">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Nama Orang Tua</div>' +
                '<div class="item-input-wrap input-dropdown-wrap">' +
                '<select name="orang_tua_keponakan">' +
                list_orang_tua_keponakan +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">NIK</div>' +
                '<div class="item-input-wrap">' +
                '<input type="number" name="nik_keponakan">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Nama</div>' +
                '<div class="item-input-wrap">' +
                '<input type="text" name="nama_keponakan">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Tanggal Lahir</div>' +
                '<div class="item-input-wrap">' +
                '<input type="date" name="tgl_lahir_keponakan">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Umur</div>' +
                '<div class="item-input-wrap">' +
                '<input type="number" name="umur_keponakan" id="umur_keponakan">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Alamat</div>' +
                '<div class="item-input-wrap">' +
                '<textarea class="resizable" name="alamat_keponakan"></textarea>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Status Kawin</div>' +
                '<div class="item-input-wrap input-dropdown-wrap">' +
                '<select name="status_kawin_keponakan" id="status_kawin_keponakan">' +
                '<option value="Sudah Kawin">SUDAH KAWIN</option>' +
                '<option value="Belum Kawin">BELUM KAWIN</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Status Hidup</div>' +
                '<div class="item-input-wrap input-dropdown-wrap">' +
                '<select name="status_hidup_keponakan" id="status_hidup_keponakan">' +
                '<option value="Hidup">HIDUP</option>' +
                '<option value="Meninggal">MENINGGAL</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<div id="wali_keponakan" style="display: none;">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Nama Wali</div>' +
                '<div class="item-input-wrap">' +
                '<input type="text" name="nama_wali_keponakan">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Hubungan dengan yang diwakili</div>' +
                '<div class="item-input-wrap">' +
                '<input type="text" name="hubungan_wali_keponakan">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</div>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">KTP</div>' +
                '<div class="item-input-wrap">' +
                '<input id="fileid_ktp_keponakan" class="fileid" type="hidden" name="fileid_ktp_keponakan">' +
                '<input  id="filecode_ktp_keponakan" type="hidden" readonly name="filecode_ktp_keponakan">' +
                '<input  id="fileurl_ktp_keponakan" type="text" name="fileurl_ktp_keponakan" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ktp_keponakan"></div>' +
                '<div class="col-20">' +
                '<a id="_ktp_keponakan" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">KK</div>' +
                '<div class="item-input-wrap">' +
                '<input id="fileid_kk_keponakan" class="fileid" type="hidden" name="fileid_kk_keponakan">' +
                '<input id="filecode_kk_keponakan" type="hidden" readonly name="filecode_kk_keponakan">' +
                '<input id="fileurl_kk_keponakan" type="text" name="fileurl_kk_keponakan" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_kk_keponakan"></div>' +
                '<div class="col-20">' +
                '<a id="_kk_keponakan" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li data-index="sn_keponakan" id="keponakan_kawin">' +
                '<ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Buku Nikah</div>' +
                '<input id="fileid_sn_keponakan" class="fileid" type="hidden" name="fileid_sn_keponakan">' +
                '<input  id="filecode_sn_keponakan" type="hidden" readonly name="filecode_sn_keponakan">' +
                '<input  id="fileurl_sn_keponakan" type="text" name="fileurl_sn_keponakan" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_sn_keponakan"></div>' +
                '<div class="col-20">' +
                '<a id="_sn_keponakan" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</li>' +
                '<li data-index="ak_keponakan" id="keponakan_meninggal" style="display: none;">' +
                '<ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Akta Kematian</div>' +
                '<input id="fileid_ak_keponakan" class="fileid" type="hidden" name="fileid_ak_keponakan">' +
                '<input  id="filecode_ak_keponakan" type="hidden" readonly name="filecode_ak_keponakan">' +
                '<input  id="fileurl_ak_keponakan" type="text" name="fileurl_ak_keponakan" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ak_keponakan"></div>' +
                '<div class="col-20">' +
                '<a id="_ak_keponakan" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</li>' +
                '<li data-index="pernyataan_wali_keponakan" id="pernyataan_wali_keponakan" style="display: none;">' +
                '<ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Surat Pernyataan Wali</div>' +
                '<input id="fileid_pernyataan_wali_keponakan" class="fileid" type="hidden" name="fileid_pernyataan_wali_keponakan">' +
                '<input  id="filecode_pernyataan_wali_keponakan" type="hidden" readonly name="filecode_pernyataan_wali_keponakan">' +
                '<input  id="fileurl_pernyataan_wali_keponakan" type="text" name="fileurl_pernyataan_wali_keponakan" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_pernyataan_wali_keponakan"></div>' +
                '<div class="col-20">' +
                '<a id="_pernyataan_wali_keponakan" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</li>' +
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
                '<a class="button button-round button-fill color-green" id="save_keponakan_pewaris" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
                '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',
            on: {
                open: function () {
                    $$('#status_kawin_keponakan').on('change', function () {
                        $$('#fileid_sn_keponakan').val('');
                        $$('#filecode_sn_keponakan').val('');
                        $$('#fileurl_sn_keponakan').val('');
                        $$('.preview_file_sn_keponakan').html('');

                        if ($(this).val() == 'Sudah Kawin') {
                            $$('#keponakan_kawin').show();
                        } else {
                            $$('#keponakan_kawin').hide();
                        }
                    });

                    $$('#status_hidup_keponakan').on('change', function () {
                        $$('#fileid_ak_keponakan').val('');
                        $$('#filecode_ak_keponakan').val('');
                        $$('#fileurl_ak_keponakan').val('');
                        $$('.preview_file_ak_keponakan').html('');

                        if ($(this).val() == 'Meninggal') {
                            $$('#keponakan_meninggal').show();
                        } else {
                            $$('#keponakan_meninggal').hide();
                        }
                    });

                    $$('#umur_keponakan').on('input', function () {
                        $$('#wali_keponakan input').val('');

                        $$('#fileid_pernyataan_wali_keponakan').val('');
                        $$('#filecode_pernyataan_wali_keponakan').val('');
                        $$('#fileurl_pernyataan_wali_keponakan').val('');
                        $$('.preview_file_pernyataan_wali_keponakan').html('');

                        if ($(this).val() <= 17 && $(this).val() != '') {
                            $$('#pernyataan_wali_keponakan').show();
                            $$('#wali_keponakan').show();
                        } else {
                            $$('#pernyataan_wali_keponakan').hide();
                            $$('#wali_keponakan').hide();
                        }
                    });
                },
            }
        });
        popup_keponakan.open();
        $$("#save_keponakan_pewaris").on('click', function () {
            popup_keponakan.close();
            if ($("#tambah_keponakan_pewaris").data("id") !== null) {
                id = $("#tambah_keponakan_pewaris").data("id");
                keponakan_pewaris[id] = app.form.convertToData("#tambah_keponakan_pewaris");
            } else {
                keponakan_pewaris.push(app.form.convertToData("#tambah_keponakan_pewaris"));
            }
            reload_keponakan_pewaris_table(keponakan_pewaris);
        });
    }

    function reload_keponakan_pewaris_table(keponakan) {
        keponakan_pewaris_row = '';
        keponakan.forEach(function (val, key) {
            if (val.status == 'tersimpan') {
                keponakan_pewaris_row += '<tr>' +
                    '<td class="label-cell aksi-table" style="padding: 0 12px;"><a data-id="' + key + '" class="edit_keponakan button button-small color-blue button-fill">EDIT</a></td>' +
                    '<td class="label-cell hapus-table" style="padding: 0 12px 0 0;"><a data-id="' + key + '"  class="hapus_keponakan button color-red button-fill button-small">HAPUS</a></td>' +
                    '<td class="label-cell">' + val.orang_tua_keponakan + '</td>' +
                    '<td class="label-cell">' + val.nik_keponakan + '</td>' +
                    '<td class="label-cell">' + val.nama_keponakan + '</td>' +
                    '<td class="label-cell">' + val.tgl_lahir_keponakan + '</td>' +
                    '<td class="label-cell">' + val.umur_keponakan + '</td>' +
                    '<td class="label-cell">' + val.alamat_keponakan + '</td>' +
                    '<td class="label-cell">' + val.status_kawin_keponakan + '</td>' +
                    '<td class="label-cell">' + val.status_hidup_keponakan + '</td>' +
                    '<td class="label-cell">' + val.nama_wali_keponakan + '</td>' +
                    '<td class="label-cell">' + val.hubungan_wali_keponakan + '</td>' +
                    '<td class="label-cell">';
                if (val.fileid_ktp_keponakan != '') {
                    keponakan_pewaris_row += '<a data-id="' + key + '" onclick="preview_files(' + val.fileid_ktp_keponakan + ')" class="button color-blue button-fill button-small">KTP</a>';
                }
                keponakan_pewaris_row += '</td>' +
                    '<td class="label-cell">';
                if (val.fileid_kk_keponakan != '') {
                    keponakan_pewaris_row += '<a data-id="' + key + '" onclick="preview_files(' + val.fileid_kk_keponakan + ')" class="button color-blue button-fill button-small">KK</a>';
                }
                keponakan_pewaris_row += '</td>';
                if (val.fileid_sn_keponakan != '') {
                    keponakan_pewaris_row += '<td class="label-cell"><a data-id="' + key + '" onclick="preview_files(' + val.fileid_sn_keponakan + ')" class="button color-blue button-fill button-small">SURAT NIKAH</a></td>';
                }
                if (val.fileid_ak_keponakan != '') {
                    keponakan_pewaris_row += '<td class="label-cell"><a data-id="' + key + '" onclick="preview_files(' + val.fileid_ak_keponakan + ')" class="button color-blue button-fill button-small">AKTA KEMATIAN</a></td>';
                }
                if (val.fileid_pernyataan_wali_keponakan != '') {
                    keponakan_pewaris_row += '<td class="label-cell"><a data-id="' + key + '" onclick="preview_files(' + val.fileid_pernyataan_wali_keponakan + ')" class="button color-blue button-fill button-small">SURAT PERWALIAN</a></td>';
                }
                keponakan_pewaris_row += '<td class="label-cell"></td>' +
                    '</tr>';
            }
        })

        if (keponakan_pewaris_row !== '') {
            $$('#anggota_keponakan_pewaris_table table tbody').html(keponakan_pewaris_row);
        } else {
            $$('#anggota_keponakan_pewaris_table table tbody').html('<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="numeric-cell"></td>' +
                '<td class="label-cell">Data Kosong</td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>');
        }

        $$(".hapus_keponakan").on('click', function () {
            keponakan_pewaris_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin Menghapus data?', function () {
                keponakan[keponakan_pewaris_id].status = 'terhapus';
                reload_keponakan_pewaris_table(keponakan);
            });
        });

        $$(".edit_keponakan").on('click', function () {
            id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin akan merubah data?', function () {
                popup_tambah_keponakan_pewaris();
                $$("#tambah_keponakan_pewaris").attr("data-id", id);
                $$("select[name='orang_tua_keponakan']").val(keponakan[id].orang_tua_keponakan);
                $$("input[name='nik_keponakan']").val(keponakan[id].nik_keponakan);
                $$("input[name='nama_keponakan']").val(keponakan[id].nama_keponakan);
                $$("input[name='tgl_lahir_keponakan']").val(keponakan[id].tgl_lahir_keponakan);
                $$("input[name='umur_keponakan']").val(keponakan[id].umur_keponakan);
                $$("textarea[name='alamat_keponakan']").text(keponakan[id].alamat_keponakan);
                $$("select[name='status_kawin_keponakan']").val(keponakan[id].status_kawin_keponakan);
                $$("select[name='status_hidup_keponakan']").val(keponakan[id].status_hidup_keponakan);
                $$("input[name='nama_wali_keponakan']").val(keponakan[id].nama_wali_keponakan);
                $$("input[name='hubungan_wali_keponakan']").val(keponakan[id].hubungan_wali_keponakan);

                $$("input[name='filecode_ktp_keponakan']").val(keponakan[id].filecode_ktp_keponakan);
                $$("input[name='fileid_ktp_keponakan']").val(keponakan[id].fileid_ktp_keponakan);
                $$("input[name='fileurl_ktp_keponakan']").val(keponakan[id].fileurl_ktp_keponakan);

                $$("input[name='filecode_kk_keponakan']").val(keponakan[id].filecode_kk_keponakan);
                $$("input[name='fileid_kk_keponakan']").val(keponakan[id].fileid_kk_keponakan);
                $$("input[name='fileurl_kk_keponakan']").val(keponakan[id].fileurl_kk_keponakan);

                $$("input[name='filecode_sn_keponakan']").val(keponakan[id].filecode_sn_keponakan);
                $$("input[name='fileid_sn_keponakan']").val(keponakan[id].fileid_sn_keponakan);
                $$("input[name='fileurl_sn_keponakan']").val(keponakan[id].fileurl_sn_keponakan);

                $$("input[name='filecode_ak_keponakan']").val(keponakan[id].filecode_ak_keponakan);
                $$("input[name='fileid_ak_keponakan']").val(keponakan[id].fileid_ak_keponakan);
                $$("input[name='fileurl_ak_keponakan']").val(keponakan[id].fileurl_ak_keponakan);

                $$("input[name='filecode_pernyataan_wali_keponakan']").val(keponakan[id].filecode_pernyataan_wali_keponakan);
                $$("input[name='fileid_pernyataan_wali_keponakan']").val(keponakan[id].fileid_pernyataan_wali_keponakan);
                $$("input[name='fileurl_pernyataan_wali_keponakan']").val(keponakan[id].fileurl_pernyataan_wali_keponakan);

                var preview_file_ktp = '';
                if (keponakan[id].fileid_ktp_keponakan != '') {
                    preview_file_ktp = '<a onclick="preview_file_waris(' + keponakan[id].fileid_ktp_keponakan + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_ktp_keponakan").html(preview_file_ktp);

                var preview_file_kk = '';
                if (keponakan[id].fileid_kk_keponakan != '') {
                    preview_file_kk = '<a onclick="preview_file_waris(' + keponakan[id].fileid_kk_keponakan + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_kk_keponakan").html(preview_file_kk);

                var preview_file_sn = '';
                if (keponakan[id].fileid_sn_keponakan != '') {
                    preview_file_sn = '<a onclick="preview_file_waris(' + keponakan[id].fileid_sn_keponakan + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_sn_keponakan").html(preview_file_sn);

                var preview_file_ak = '';
                if (keponakan[id].fileid_ak_keponakan != '') {
                    preview_file_ak = '<a onclick="preview_file_waris(' + keponakan[id].fileid_ak_keponakan + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_ak_keponakan").html(preview_file_ak);

                var preview_file_pernyataan_wali = '';
                if (keponakan[id].fileid_pernyataan_wali_keponakan != '') {
                    preview_file_pernyataan_wali = '<a onclick="preview_file_waris(' + keponakan[id].fileid_pernyataan_wali_keponakan + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_pernyataan_wali_keponakan").html(preview_file_pernyataan_wali);

                if (keponakan[id].umur_keponakan <= 17) {
                    $$('#pernyataan_wali_keponakan').show();
                    $$('#wali_keponakan').show();
                }

                if (keponakan[id].status_kawin_keponakan == 'Belum Kawin') {
                    $$('#keponakan_kawin').hide();
                }

                if (keponakan[id].status_hidup_keponakan == 'Meninggal') {
                    $$('#keponakan_meninggal').show();
                }
            });
        });
    }
}
function waris_table_edit(data) {
    // Pasangan Pewaris
    pasangan_pewaris = new Array();
    $$('#addpasanganpewaris').on('touchend', function () {
        popup_tambah_pasangan_pewaris();
    });

    pasangan_pewaris = data.pasangan_pewaris;
    for (var i = 0; i < pasangan_pewaris.length; i++) {
        pasangan_pewaris[i] = {
            "m_nik_pasangan": pasangan_pewaris[i].nik,
            "m_nama_pasangan": pasangan_pewaris[i].nama,
            "m_tgl_lahir_pasangan": pasangan_pewaris[i].tgl_lahir,
            "m_jenis_nikah_pasangan": pasangan_pewaris[i].jenis_nikah,
            "m_status_hidup_pasangan": pasangan_pewaris[i].status_hidup,

            "fileid_m_buku_nikah": pasangan_pewaris[i].file_actual_surat_nikah,
            "fileurl_m_buku_nikah": pasangan_pewaris[i].doc_path_bukti_nikah,
            "filecode_m_buku_nikah": pasangan_pewaris[i].doc_path_bukti_nikah,

            "fileid_m_akta_kematian": pasangan_pewaris[i].file_actual_akta_kematian,
            "fileurl_m_akta_kematian": pasangan_pewaris[i].doc_path_akta_kematian,
            "filecode_m_akta_kematian": pasangan_pewaris[i].doc_path_akta_kematian,

            "status": 'tersimpan',
        }
    }
    reload_pasangan_pewaris_table(pasangan_pewaris);

    function popup_tambah_pasangan_pewaris() {
        var popup_anggota = app.popup.create({
            content: '<div class="popup page-content">' +
                '<div class="block">' +
                '<form class="list" id="tambah_pasangan_pewaris" data-id="null">' +
                '<div class="block-title">' +
                '<div class="row">' +
                '<div class="col-100">' +
                '<div class="chip color-blue">' +
                '<div class="chip-label">Form Tambah Pasangan Pewaris</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<ul id="formupload-wrapper-list-waris">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">NIK</div>' +
                '<input type="number" name="m_nik_pasangan">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Nama</div>' +
                '<input type="text" name="m_nama_pasangan">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Tanggal Lahir</div>' +
                '<input type="date" name="m_tgl_lahir_pasangan">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Jenis Nikah</div>' +
                '<select name="m_jenis_nikah_pasangan" id="m_jenis_nikah_pasangan">' +
                '<option value="Resmi">RESMI</option>' +
                '<option value="Siri">SIRI</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Status</div>' +
                '<select name="m_status_hidup_pasangan" id="m_status_hidup_pasangan">' +
                '<option value="Hidup">HIDUP</option>' +
                '<option value="Meninggal">MENINGGAL</option>' +
                '</select>' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label" id="m_jenis_nikah_pasangan_resmi">Buka Nikah</div>' +
                '<div class="item-title item-label" id="m_jenis_nikah_pasangan_siri" style="display: none;">Foto Ijab Kabul atau Surat - Surat yang diakui oleh Agama Islam</div>' +
                '<input id="fileid_m_buku_nikah" class="fileid" type="hidden" name="fileid_m_buku_nikah">' +
                '<input  id="filecode_m_buku_nikah" type="hidden" readonly name="filecode_m_buku_nikah">' +
                '<input  id="fileurl_m_buku_nikah" type="text" name="fileurl_m_buku_nikah" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_m_buku_nikah">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_m_buku_nikah" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<div id="m_status_hidup_pasangan_meninggal" style="display: none;">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Akta Kematian</div>' +
                '<input id="fileid_m_akta_kematian" class="fileid" type="hidden" name="fileid_m_akta_kematian">' +
                '<input id="filecode_m_akta_kematian" type="hidden" readonly name="filecode_m_akta_kematian">' +
                '<input  id="fileurl_m_akta_kematian" type="text" name="fileurl_m_akta_kematian" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_m_akta_kematian">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_m_akta_kematian" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
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
                '<a class="button button-round button-fill color-green" id="save_pasangan_pewaris" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
                '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',
            on: {
                open: function () {
                    $$('#m_jenis_nikah_pasangan').on('change', function () {
                        if ($(this).val() == 'Siri') {
                            $$('#m_jenis_nikah_pasangan_resmi').hide();
                            $$('#m_jenis_nikah_pasangan_siri').show();
                        } else {
                            $$('#m_jenis_nikah_pasangan_resmi').show();
                            $$('#m_jenis_nikah_pasangan_siri').hide();
                        }
                    });
                    $$('#m_status_hidup_pasangan').on('change', function () {
                        if ($(this).val() == 'Meninggal') {
                            $$('#m_status_hidup_pasangan_meninggal').show();
                        } else {
                            $$('#m_status_hidup_pasangan_meninggal').hide();
                        }
                    });

                    if (iamthedoor.role_id != 4) {
                        $$('#save_pasangan_pewaris').hide();
                    }
                },
            }
        });
        popup_anggota.open();
        $$("#save_pasangan_pewaris").on('click', function () {
            popup_anggota.close();
            if ($("#tambah_pasangan_pewaris").data("id") !== null) {
                pasangan_pewaris_id = $("#tambah_pasangan_pewaris").data("id");
                pasangan_pewaris[pasangan_pewaris_id] = app.form.convertToData("#tambah_pasangan_pewaris");
            } else {
                pasangan_pewaris.push(app.form.convertToData("#tambah_pasangan_pewaris"));
            }
            reload_pasangan_pewaris_table(pasangan_pewaris);
        });
    }

    function reload_pasangan_pewaris_table(pasangan_pewaris_key) {
        pasangan_pewaris_html = '<tr><td></td><td>Data Kosong</td><td></td></tr>';
        $$("#pasangan_pewaris_table table tbody").html(pasangan_pewaris_html);
        pasangan_pewaris_row = '';
        for (var i = 0; i < pasangan_pewaris_key.length; i++) {
            if (pasangan_pewaris_key[i].status == "tersimpan") {
                pasangan_pewaris_row += '<tr>' +
                    '<td class="label-cell aksi-table" style="padding: 0 12px;"><a data-id="' + [i] + '" class="edit_anggota button button-small color-blue button-fill">EDIT</a></td>' +
                    '<td class="label-cell hapus-table" style="padding: 0 12px 0 0;"><a data-id="' + [i] + '"  class="hapus_anggota button color-red button-fill button-small">HAPUS</a></td>' +
                    '<td class="label-cell">' + pasangan_pewaris_key[i].m_nik_pasangan + '</td>' +
                    '<td class="label-cell">' + pasangan_pewaris_key[i].m_nama_pasangan + '</td>' +
                    '<td class="label-cell">' + pasangan_pewaris_key[i].m_tgl_lahir_pasangan + '</td>' +
                    '<td class="label-cell">' + pasangan_pewaris_key[i].m_jenis_nikah_pasangan + '</td>' +
                    '<td class="label-cell">' + pasangan_pewaris_key[i].m_status_hidup_pasangan + '</td>';
                if (pasangan_pewaris_key[i].fileid_m_buku_nikah != '') {
                    pasangan_pewaris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + pasangan_pewaris_key[i].fileid_m_buku_nikah + ')" class="ktp_anggota button color-blue button-fill button-small">SURAT NIKAH</a></td>';
                }

                if (pasangan_pewaris_key[i].fileid_m_akta_kematian != '') {
                    pasangan_pewaris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + pasangan_pewaris_key[i].fileid_m_akta_kematian + ')" class="kk_anggota button color-blue button-fill button-small">AKTA KEMATIAN</a></td>';
                }

                pasangan_pewaris_row += '</tr>';
            }
        }
        if (pasangan_pewaris_row !== '') {
            $$("#pasangan_pewaris_table table tbody").html(pasangan_pewaris_row);
        }

        if (iamthedoor.role_id != 4) {
            $$('.hapus-table').hide();
        }
        $$(".hapus_anggota").on('click', function () {
            pasangan_pewaris_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin Menghapus data?', function () {
                pasangan_pewaris_key[pasangan_pewaris_id].status = 'terhapus';
                reload_pasangan_pewaris_table(pasangan_pewaris_key);
            });
        });
        $$(".edit_anggota").on('click', function () {
            pasangan_pewaris_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin akan merubah data?', function () {
                popup_tambah_pasangan_pewaris();
                $$("#tambah_pasangan_pewaris").attr("data-id", pasangan_pewaris_id);
                $$("input[name='m_nik_pasangan']").val(pasangan_pewaris_key[pasangan_pewaris_id].m_nik_pasangan);
                $$("input[name='m_nama_pasangan']").val(pasangan_pewaris_key[pasangan_pewaris_id].m_nama_pasangan);
                $$("input[name='m_tgl_lahir_pasangan']").val(pasangan_pewaris_key[pasangan_pewaris_id].m_tgl_lahir_pasangan);
                $$("input[name='m_jenis_nikah_pasangan']").val(pasangan_pewaris_key[pasangan_pewaris_id].m_jenis_nikah_pasangan);
                $$("input[name='m_status_hidup_pasangan']").val(pasangan_pewaris_key[pasangan_pewaris_id].m_status_hidup_pasangan);
                $$("input[name='filecode_m_buku_nikah']").val(pasangan_pewaris_key[pasangan_pewaris_id].filecode_m_buku_nikah);
                $$("input[name='filecode_m_akta_kematian']").val(pasangan_pewaris_key[pasangan_pewaris_id].filecode_m_akta_kematian);
                $$("input[name='fileid_m_buku_nikah']").val(pasangan_pewaris_key[pasangan_pewaris_id].fileid_m_buku_nikah);
                $$("input[name='fileid_m_akta_kematian']").val(pasangan_pewaris_key[pasangan_pewaris_id].fileid_m_akta_kematian);
                $$("input[name='fileurl_m_buku_nikah']").val(pasangan_pewaris_key[pasangan_pewaris_id].fileurl_m_buku_nikah);
                $$("input[name='fileurl_m_akta_kematian']").val(pasangan_pewaris_key[pasangan_pewaris_id].fileurl_m_akta_kematian);
                if (pasangan_pewaris_key[pasangan_pewaris_id].fileid_m_buku_nikah != '') {
                    var preview_file_m_buku_nikah = '<a id="_m_buku_nikah" onclick="preview_files(' + pasangan_pewaris_key[pasangan_pewaris_id].fileid_m_buku_nikah + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                    $$(".preview_file_m_buku_nikah").html(preview_file_m_buku_nikah);
                }
                if (pasangan_pewaris_key[pasangan_pewaris_id].fileid_m_akta_kematian != '') {
                    var preview_file_m_akta_kematian = '<a id="_m_akta_kematian" onclick="preview_files(' + pasangan_pewaris_key[pasangan_pewaris_id].fileid_m_akta_kematian + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                    $$(".preview_file_m_akta_kematian").html(preview_file_m_akta_kematian);
                }

                if (pasangan_pewaris_key[pasangan_pewaris_id].m_jenis_nikah_pasangan == 'Siri') {
                    $$('#m_jenis_nikah_pasangan_resmi').hide();
                    $$('#m_jenis_nikah_pasangan_siri').show();
                } else {
                    $$('#m_jenis_nikah_pasangan_resmi').show();
                    $$('#m_jenis_nikah_pasangan_siri').hide();
                }

                if (pasangan_pewaris_key[pasangan_pewaris_id].m_status_hidup_pasangan == 'Meninggal') {
                    $$('#m_status_hidup_pasangan_meninggal').show();
                } else {
                    $$('#m_status_hidup_pasangan_meninggal').hide();
                }
            });
        });
    }

    // anak kandung start
    anak_kandung_pewaris = new Array();
    $$('#addanakkadungpewaris').on('touchend', function () {
        popup_tambah_anak_kandung_pewaris();
    });

    anak_kandung_pewaris = data.anak_kandung_pewaris;
    for (var i = 0; i < anak_kandung_pewaris.length; i++) {
        anak_kandung_pewaris[i] = {
            "orang_tua_anak": anak_kandung_pewaris[i].orangtua,
            "nik_anak": anak_kandung_pewaris[i].nik,
            "nama_anak": anak_kandung_pewaris[i].nama,
            "tgl_lahir_anak": anak_kandung_pewaris[i].tgl_lahir,
            "umur_anak": anak_kandung_pewaris[i].umur,
            "alamat_anak": anak_kandung_pewaris[i].alamat,
            "status_kawin_anak": anak_kandung_pewaris[i].status_kawin,
            "status_hidup_anak": anak_kandung_pewaris[i].status_hidup,
            "nama_wali_anak": anak_kandung_pewaris[i].nama_wali,
            "hubungan_wali_anak": anak_kandung_pewaris[i].hubungan_wali,

            "fileid_ktp_anak": anak_kandung_pewaris[i].file_actual_ktp,
            "fileurl_ktp_anak": anak_kandung_pewaris[i].doc_path_ktp,
            "filecode_ktp_anak": anak_kandung_pewaris[i].doc_path_ktp,

            "fileid_kk_anak": anak_kandung_pewaris[i].file_actual_kk,
            "fileurl_kk_anak": anak_kandung_pewaris[i].doc_path_kk,
            "filecode_kk_anak": anak_kandung_pewaris[i].doc_path_kk,

            "fileid_sn_anak": anak_kandung_pewaris[i].file_actual_surat_nikah,
            "fileurl_sn_anak": anak_kandung_pewaris[i].doc_path_surat_nikah,
            "filecode_sn_anak": anak_kandung_pewaris[i].doc_path_surat_nikah,

            "fileid_ak_anak": anak_kandung_pewaris[i].file_actual_akta_kematian,
            "fileurl_ak_anak": anak_kandung_pewaris[i].doc_path_akta_kematian,
            "filecode_ak_anak": anak_kandung_pewaris[i].doc_path_akta_kematian,

            "fileid_wali_anak": anak_kandung_pewaris[i].file_actual_pernyataan_wali,
            "fileurl_wali_anak": anak_kandung_pewaris[i].doc_path_surat_pernyataan_wali,
            "filecode_wali_anak": anak_kandung_pewaris[i].doc_path_surat_pernyataan_wali,

            "status": 'tersimpan',
        }
    }
    reload_anak_kandung_pewaris_table(anak_kandung_pewaris);

    function popup_tambah_anak_kandung_pewaris() {
        var list_pasangan = '';
        if ($$('#status_keluarga').val() == 'Suami') {
            pasangan_pewaris.forEach(function (item, index) {
                list_pasangan += '<option value="' + item.m_nama_pasangan + '">' + item.m_nama_pasangan + '</option>';
            });
        } else {
            list_pasangan += '<option value="' + $$('#nama_pasangan').val() + '">' + $$('#nama_pasangan').val() + '</option>';
        }
        var popup_anggota = app.popup.create({
            content: '<div class="popup page-content">' +
                '<div class="block">' +
                '<form class="list" id="tambah_anak_kandung_pewaris" data-id="null">' +
                '<div class="block-title">' +
                '<div class="row">' +
                '<div class="col-100">' +
                '<div class="chip color-blue">' +
                '<div class="chip-label">Form Tambah Anak Kandung Pewaris</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<ul id="formupload-wrapper-list-waris">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Orang Tua</div>' +
                '<select name="orang_tua_anak" id="orang_tua_anak">' +
                list_pasangan +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">NIK</div>' +
                '<input type="number" name="nik_anak">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Nama</div>' +
                '<input type="text" name="nama_anak">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Tanggal Lahir</div>' +
                '<input type="date" name="tgl_lahir_anak">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Umur</div>' +
                '<input type="number" name="umur_anak" id="umur_anak" maxlength="2" oninput="this.value=this.value.slice(0,this.maxLength)">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Alamat</div>' +
                '<textarea class="resizable" name="alamat_anak"></textarea>' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Status Nikah</div>' +
                '<select name="status_kawin_anak" id="status_kawin_anak">' +
                '<option value="Sudah Kawin">SUDAH KAWIN</option>' +
                '<option value="Belum Kawin">BELUM KAWIN</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Status Hidup</div>' +
                '<select name="status_hidup_anak" id="status_hidup_anak">' +
                '<option value="Hidup">HIDUP</option>' +
                '<option value="Meninggal">MENINGGAL</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<div id="umur17kebawah" style="display: none;">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Nama Wali</div>' +
                '<input type="text" name="nama_wali_anak">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Hubungan dengan yang diwakili</div>' +
                '<input type="text" name="hubungan_wali_anak">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</div>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label" id="ktpanak">KTP</div>' +
                '<input id="fileid_ktp_anak" class="fileid" type="hidden" name="fileid_ktp_anak">' +
                '<input id="filecode_ktp_anak" type="hidden" readonly name="filecode_ktp_anak">' +
                '<input  id="fileurl_ktp_anak" type="text" name="fileurl_ktp_anak" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ktp_anak">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_ktp_anak" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label" id="kkanak">KK</div>' +
                '<input id="fileid_kk_anak" class="fileid" type="hidden" name="fileid_kk_anak">' +
                '<input id="filecode_kk_anak" type="hidden" readonly name="filecode_kk_anak">' +
                '<input id="fileurl_kk_anak" type="text" name="fileurl_kk_anak" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_kk_anak">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_kk_anak" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<div id="status_kawin_anak_belum">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Surat Nikah</div>' +
                '<input id="fileid_sn_anak" class="fileid" type="hidden" name="fileid_sn_anak">' +
                '<input id="filecode_sn_anak" type="hidden" readonly name="filecode_sn_anak">' +
                '<input id="fileurl_sn_anak" type="text" name="fileurl_sn_anak" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_sn_anak">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_sn_anak" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</div>' +
                '<div id="status_hidup_anak_meninggal" style="display: none;">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Akta Kematian</div>' +
                '<input id="fileid_ak_anak" class="fileid" type="hidden" name="fileid_ak_anak">' +
                '<input id="filecode_ak_anak" type="hidden" readonly name="filecode_ak_anak">' +
                '<input id="fileurl_ak_anak" type="text" name="fileurl_ak_anak" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ak_anak">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_ak_anak" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</div>' +
                '<div id="pernyataan_wali_anak" style="display: none;">' +
                '<li data-index="wali"><ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Surat Pernyataan Perwalian Bermaterai</div>' +
                '<input id="fileid_wali_anak" class="fileid" type="hidden" name="fileid_wali_anak">' +
                '<input id="filecode_wali_anak" type="hidden" readonly name="filecode_wali_anak">' +
                '<input id="fileurl_wali_anak" type="text" name="fileurl_wali_anak" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_wali_anak">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_wali_anak" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul></li>' +
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
                '<a class="button button-round button-fill color-green" id="save_anak_kandung_pewaris" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
                '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',
            on: {
                open: function () {
                    $$('#status_kawin_anak').on('change', function () {
                        $$('#status_kawin_anak_belum input').val('');
                        if ($(this).val() == 'Belum Kawin') {
                            $$('#fileid_sn_anak').val('');
                            $$('#filecode_sn_anak').val('');
                            $$('#fileurl_sn_anak').val('');
                            $$('.preview_file_sn_anak').html('');
                            $$('#status_kawin_anak_belum').hide();
                        } else {
                            $$('#status_kawin_anak_belum').show();
                        }
                    });
                    $$('#status_hidup_anak').on('change', function () {
                        $$('#fileid_ak_anak').val('');
                        $$('#filecode_ak_anak').val('');
                        $$('#fileurl_ak_anak').val('');
                        $$('.preview_file_ak_anak').html('');
                        if ($(this).val() == 'Meninggal') {
                            $$('#status_hidup_anak_meninggal').show();
                        } else {
                            $$('#status_hidup_anak_meninggal').hide();
                        }
                    });

                    $$('#umur_anak').on('input', function () {
                        $$('#umur17kebawah input').val('');

                        $$('#fileid_pernyataan_wali_anak').val('');
                        $$('#filecode_pernyataan_wali_anak').val('');
                        $$('#fileurl_pernyataan_wali_anak').val('');
                        $$('.preview_file_pernyataan_wali_anak').html('');
                        if ($(this).val() <= 17) {
                            $$('#ktpanak').html('KTP Wali');
                            $$('#kkanak').html('KK Wali');
                            $$('#umur17kebawah').show();
                            $$('#pernyataan_wali_anak').show();
                        } else {
                            $$('#ktpanak').html('KTP');
                            $$('#kkanak').html('KK');
                            $$('#umur17kebawah').hide();
                            $$('#pernyataan_wali_anak').hide();
                        }
                    });

                    if (iamthedoor.role_id != 4) {
                        $$('#save_anak_kandung_pewaris').hide();
                    }
                },
            }
        });
        popup_anggota.open();
        $$("#save_anak_kandung_pewaris").on('click', function () {

            popup_anggota.close();
            if ($("#tambah_anak_kandung_pewaris").data("id") !== null) {
                anak_kandung_pewaris_id = $("#tambah_anak_kandung_pewaris").data("id");
                anak_kandung_pewaris[anak_kandung_pewaris_id] = app.form.convertToData("#tambah_anak_kandung_pewaris");
            } else {
                anak_kandung_pewaris.push(app.form.convertToData("#tambah_anak_kandung_pewaris"));
            }
            reload_anak_kandung_pewaris_table(anak_kandung_pewaris);
            if (app.form.convertToData("#tambah_anak_kandung_pewaris").status_hidup_anak == 'Meninggal') {
                popup_tambah_cucu_anak_kandung_pewaris();
            }
        });
    }

    function reload_anak_kandung_pewaris_table(anak_kandung_pewaris_key) {
        anak_kandung_pewaris_html = '<tr><td></td><td>Data Kosong</td><td></td></tr>';
        $$("#anak_kandung_pewaris_table table tbody").html(anak_kandung_pewaris_html);
        anak_kandung_pewaris_row = '';
        for (var i = 0; i < anak_kandung_pewaris_key.length; i++) {
            if (anak_kandung_pewaris_key[i].status == "tersimpan") {
                anak_kandung_pewaris_row += '<tr>' +
                    '<td class="label-cell aksi-table" style="padding: 0 12px;"><a data-id="' + [i] + '" class="edit_anak_kandung button button-small color-blue button-fill">EDIT</a></td>' +
                    '<td class="label-cell hapus-table" style="padding: 0 12px 0 0;"><a data-id="' + [i] + '"  class="hapus_anak_kandung button color-red button-fill button-small">HAPUS</a></td>' +
                    '<td class="label-cell">' + anak_kandung_pewaris_key[i].nik_anak + '</td>' +
                    '<td class="label-cell">' + anak_kandung_pewaris_key[i].nama_anak + '</td>' +
                    '<td class="label-cell">' + anak_kandung_pewaris_key[i].tgl_lahir_anak + '</td>' +
                    '<td class="label-cell">' + anak_kandung_pewaris_key[i].umur_anak + '</td>' +
                    '<td class="label-cell">' + anak_kandung_pewaris_key[i].alamat_anak + '</td>' +
                    '<td class="label-cell">' + anak_kandung_pewaris_key[i].status_kawin_anak + '</td>' +
                    '<td class="label-cell">' + anak_kandung_pewaris_key[i].status_hidup_anak + '</td>' +
                    '<td class="label-cell">' + anak_kandung_pewaris_key[i].nama_wali_anak + '</td>' +
                    '<td class="label-cell">' + anak_kandung_pewaris_key[i].hubungan_wali_anak + '</td>' +
                    '<td class="label-cell">';
                if (anak_kandung_pewaris_key[i].fileid_ktp_anak != '') {
                    anak_kandung_pewaris_row += '<a data-id="' + [i] + '" onclick="preview_files(' + anak_kandung_pewaris_key[i].fileid_ktp_anak + ')" class="ktp_anggota button color-blue button-fill button-small">KTP</a></td>';
                }
                if (anak_kandung_pewaris_key[i].fileid_kk_anak != '') {
                    anak_kandung_pewaris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + anak_kandung_pewaris_key[i].fileid_kk_anak + ')" class="kk_anggota button color-blue button-fill button-small">KK</a></td>';
                }
                if (anak_kandung_pewaris_key[i].fileid_sn_anak != '') {
                    anak_kandung_pewaris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + anak_kandung_pewaris_key[i].fileid_sn_anak + ')" class="kk_anggota button color-blue button-fill button-small">SURAT NIKAH</a></td>';
                }
                if (anak_kandung_pewaris_key[i].fileid_ak_anak != '') {
                    anak_kandung_pewaris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + anak_kandung_pewaris_key[i].fileid_ak_anak + ')" class="ktp_anggota button color-blue button-fill button-small">AKTA KEMATIAN</a></td>';
                }
                if (anak_kandung_pewaris_key[i].fileid_wali_anak != '') {
                    anak_kandung_pewaris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + anak_kandung_pewaris_key[i].fileid_wali_anak + ')" class="kk_anggota button color-blue button-fill button-small">SURAT PERWALIAN</a></td>';
                }
                anak_kandung_pewaris_row += '</tr>';
            }
        }
        if (anak_kandung_pewaris_row !== '') {
            $$("#anak_kandung_pewaris_table table tbody").html(anak_kandung_pewaris_row);
        }
        if (iamthedoor.role_id != 4) {
            $$('.hapus-table').hide();
        }

        $$(".hapus_anak_kandung").on('click', function () {
            anak_kandung_pewaris_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin Menghapus data?', function () {
                anak_kandung_pewaris_key[anak_kandung_pewaris_id].status = 'terhapus';
                reload_anak_kandung_pewaris_table(anak_kandung_pewaris_key);
            });
        });

        $$(".edit_anak_kandung").on('click', function () {
            anak_kandung_pewaris_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin akan merubah data?', function () {
                popup_tambah_anak_kandung_pewaris();
                $$("#tambah_anak_kandung_pewaris").attr("data-id", anak_kandung_pewaris_id);
                $$("select[name='orang_tua_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].orang_tua_anak);
                $$("input[name='nik_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].nik_anak);
                $$("input[name='nama_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].nama_anak);
                $$("input[name='tgl_lahir_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].tgl_lahir_anak);
                $$("input[name='umur_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].umur_anak);
                $$("textarea[name='alamat_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].alamat_anak);
                $$("select[name='status_kawin_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].status_kawin_anak);
                $$("select[name='status_hidup_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].status_hidup_anak);
                $$("input[name='nama_wali_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].nama_wali_anak);
                $$("input[name='hubungan_wali_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].hubungan_wali_anak);
                $$("input[name='filecode_ktp_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].filecode_ktp_anak);
                $$("input[name='filecode_kk_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].filecode_kk_anak);
                $$("input[name='filecode_sn_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].filecode_sn_anak);
                $$("input[name='filecode_ak_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].filecode_ak_anak);
                $$("input[name='filecode_wali_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].filecode_wali_anak);
                $$("input[name='fileid_ktp_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_ktp_anak);
                $$("input[name='fileid_kk_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_kk_anak);
                $$("input[name='fileid_sn_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_sn_anak);
                $$("input[name='fileid_ak_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_ak_anak);
                $$("input[name='fileid_wali_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_wali_anak);
                $$("input[name='fileurl_ktp_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileurl_ktp_anak);
                $$("input[name='fileurl_kk_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileurl_kk_anak);
                $$("input[name='fileurl_sn_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileurl_sn_anak);
                $$("input[name='fileurl_ak_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileurl_ak_anak);
                $$("input[name='fileurl_wali_anak']").val(anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileurl_wali_anak);
                if (anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_ktp_anak != '') {
                    var preview_file_ktp = '<a id="_ktp_anak" onclick="preview_files(' + anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_ktp_anak + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_ktp_anak").html(preview_file_ktp);
                if (anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_kk_anak != '') {
                    var preview_file_kk = '<a id="_kk_anak" onclick="preview_files(' + anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_kk_anak + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_kk_anak").html(preview_file_kk);
                if (anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_sn_anak != '') {
                    var preview_file_sn = '<a id="_sn_anak" onclick="preview_files(' + anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_sn_anak + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_sn_anak").html(preview_file_sn);
                if (anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_ak_anak != '') {
                    var preview_file_ak = '<a id="_ak_anak" onclick="preview_files(' + anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_ak_anak + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_ak_anak").html(preview_file_ak);
                if (anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_wali_anak != '') {
                    var preview_file_wali = '<a id="_wali_anak" onclick="preview_files(' + anak_kandung_pewaris_key[anak_kandung_pewaris_id].fileid_wali_anak + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_wali_anak").html(preview_file_wali);

                if (anak_kandung_pewaris_key[anak_kandung_pewaris_id].umur_anak <= 17) {
                    $$('#umur17kebawah').show();
                    $$('#pernyataan_wali_anak').show();
                }

                if (anak_kandung_pewaris_key[anak_kandung_pewaris_id].status_kawin_anak == 'Belum Kawin') {
                    $$('#status_kawin_anak_belum').hide();
                }

                if (anak_kandung_pewaris_key[anak_kandung_pewaris_id].status_hidup_anak == 'Meninggal') {
                    $$('#status_hidup_anak_meninggal').show();
                }
            });
        });
        cekAnakMeninggal(anak_kandung_pewaris_key);
    }
    function cekAnakMeninggal(anak_kandung_pewaris_key) {
        $$('#cucu_pewaris').hide();
        for (var i = 0; i < anak_kandung_pewaris_key.length; i++) {
            if (anak_kandung_pewaris_key[i].status == "tersimpan" && anak_kandung_pewaris_key[i].status_hidup_anak == 'Meninggal') {
                $$('#cucu_pewaris').show();
            }
        }
    }
    // anak kandung end

    // cucu anak kandung start
    cucu_anak_kandung_pewaris = new Array();
    $$('#addcucukadungpewaris').on('touchend', function () {
        popup_tambah_cucu_anak_kandung_pewaris();
    });

    cucu_anak_kandung_pewaris = data.cucu_anak_kandung_pewaris;
    for (var i = 0; i < cucu_anak_kandung_pewaris.length; i++) {
        cucu_anak_kandung_pewaris[i] = {
            "orang_tua_cucu": cucu_anak_kandung_pewaris[i].orangtua,
            "nik_cucu": cucu_anak_kandung_pewaris[i].nik,
            "nama_cucu": cucu_anak_kandung_pewaris[i].nama,
            "tgl_lahir_cucu": cucu_anak_kandung_pewaris[i].tgl_lahir,
            "umur_cucu": cucu_anak_kandung_pewaris[i].umur,
            "alamat_cucu": cucu_anak_kandung_pewaris[i].alamat,
            "status_kawin_cucu": cucu_anak_kandung_pewaris[i].status_kawin,
            "status_hidup_cucu": cucu_anak_kandung_pewaris[i].status_hidup,
            "nama_wali_cucu": cucu_anak_kandung_pewaris[i].nama_wali,
            "hubungan_wali_cucu": cucu_anak_kandung_pewaris[i].hubungan_wali,

            "fileid_ktp_cucu": cucu_anak_kandung_pewaris[i].file_actual_ktp,
            "fileurl_ktp_cucu": cucu_anak_kandung_pewaris[i].doc_path_ktp,
            "filecode_ktp_cucu": cucu_anak_kandung_pewaris[i].doc_path_ktp,

            "fileid_kk_cucu": cucu_anak_kandung_pewaris[i].file_actual_kk,
            "fileurl_kk_cucu": cucu_anak_kandung_pewaris[i].doc_path_kk,
            "filecode_kk_cucu": cucu_anak_kandung_pewaris[i].doc_path_kk,

            "fileid_sn_cucu": cucu_anak_kandung_pewaris[i].file_actual_surat_nikah,
            "fileurl_sn_cucu": cucu_anak_kandung_pewaris[i].doc_path_surat_nikah,
            "filecode_sn_cucu": cucu_anak_kandung_pewaris[i].doc_path_surat_nikah,

            "fileid_ak_cucu": cucu_anak_kandung_pewaris[i].file_actual_akta_kematian,
            "fileurl_ak_cucu": cucu_anak_kandung_pewaris[i].doc_path_ktp,
            "filecode_ak_cucu": cucu_anak_kandung_pewaris[i].doc_path_ktp,

            "fileid_wali_cucu": cucu_anak_kandung_pewaris[i].file_actual_pernyataan_wali,
            "fileurl_wali_cucu": cucu_anak_kandung_pewaris[i].doc_path_surat_pernyataan_wali,
            "filecode_wali_cucu": cucu_anak_kandung_pewaris[i].doc_path_surat_pernyataan_wali,

            "status": 'tersimpan',
        }
    }
    reload_cucu_anak_kandung_pewaris_table(cucu_anak_kandung_pewaris);

    function popup_tambah_cucu_anak_kandung_pewaris() {
        var list_cucu_pewaris = '';
        anak_kandung_pewaris.forEach(function (item, index) {
            if (item.status == "tersimpan" && item.status_hidup_anak == "Meninggal") {
                list_cucu_pewaris += '<option value="' + item.nama_anak + '">' + item.nama_anak + '</option>';
            }
        });
        var popup_anggota = app.popup.create({
            content: '<div class="popup page-content">' +
                '<div class="block">' +
                '<form class="list" id="tambah_cucu_anak_kandung_pewaris" data-id="null">' +
                '<div class="block-title">' +
                '<div class="row">' +
                '<div class="col-100">' +
                '<div class="chip color-blue">' +
                '<div class="chip-label">Form Tambah Cucu Pewaris</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<ul id="formupload-wrapper-list-waris">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Orang Tua</div>' +
                '<select name="orang_tua_cucu" id="orang_tua_cucu">' +
                list_cucu_pewaris +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">NIK</div>' +
                '<input type="number" name="nik_cucu">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Nama</div>' +
                '<input type="text" name="nama_cucu">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Tanggal Lahir</div>' +
                '<input type="date" name="tgl_lahir_cucu">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Umur</div>' +
                '<input type="number" name="umur_cucu" id="umur_cucu" maxlength="2" oninput="this.value=this.value.slice(0,this.maxLength)">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Alamat</div>' +
                '<textarea class="resizable" name="alamat_cucu"></textarea>' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Status Nikah</div>' +
                '<select name="status_kawin_cucu" id="status_kawin_cucu">' +
                '<option value="Sudah Kawin">SUDAH KAWIN</option>' +
                '<option value="Belum Kawin">BELUM KAWIN</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Status Hidup</div>' +
                '<select name="status_hidup_cucu" id="status_hidup_cucu">' +
                '<option value="Hidup">HIDUP</option>' +
                '<option value="Meninggal">MENINGGAL</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<div id="umur17kebawah" style="display: none;">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Nama Wali</div>' +
                '<input type="text" name="nama_wali_cucu">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Hubungan dengan yang diwakili</div>' +
                '<input type="text" name="hubungan_wali_cucu">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</div>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label" id="ktpcucu">KTP</div>' +
                '<input id="fileid_ktp_cucu" class="fileid" type="hidden" name="fileid_ktp_cucu">' +
                '<input  id="filecode_ktp_cucu" type="hidden" readonly name="filecode_ktp_cucu">' +
                '<input  id="fileurl_ktp_cucu" type="text" name="fileurl_ktp_cucu" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ktp_cucu">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_ktp_cucu" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label" id="kkcucu">KK</div>' +
                '<input id="fileid_kk_cucu" class="fileid" type="hidden" name="fileid_kk_cucu">' +
                '<input  id="filecode_kk_cucu" type="hidden" readonly name="filecode_kk_cucu">' +
                '<input  id="fileurl_kk_cucu" type="text" name="fileurl_kk_cucu" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_kk_cucu">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_kk_cucu" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<div id="status_kawin_cucu_belum">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Surat Nikah</div>' +
                '<input id="fileid_sn_cucu" class="fileid" type="hidden" name="fileid_sn_cucu">' +
                '<input  id="filecode_sn_cucu" type="hidden" readonly name="filecode_sn_cucu">' +
                '<input  id="fileurl_sn_cucu" type="text" name="fileurl_sn_cucu" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_sn_cucu">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_sn_cucu" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</div>' +
                '<div id="status_hidup_cucu_meninggal" style="display: none;">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Akta Kematian</div>' +
                '<input id="fileid_ak_cucu" class="fileid" type="hidden" name="fileid_ak_cucu">' +
                '<input  id="filecode_ak_cucu" type="hidden" readonly name="filecode_ak_cucu">' +
                '<input  id="fileurl_ak_cucu" type="text" name="fileurl_ak_cucu" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ak_cucu">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_ak_cucu" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</div>' +
                '<div id="pernyataan_wali_cucu" style="display: none;">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Surat Pernyataan Perwalian Bermaterai</div>' +
                '<input id="fileid_wali_cucu" class="fileid" type="hidden" name="fileid_wali_cucu">' +
                '<input  id="filecode_wali_cucu" type="hidden" readonly name="filecode_wali_cucu">' +
                '<input  id="fileurl_wali_cucu" type="text" name="fileurl_wali_cucu" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_wali_cucu">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_wali_cucu" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
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
                '<a class="button button-round button-fill color-green" id="save_cucu_anak_kandung_pewaris" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
                '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',
            on: {
                open: function () {
                    $$('#status_kawin_cucu').on('change', function () {
                        $$('#status_kawin_cucu_belum input').val('');
                        if ($(this).val() == 'Belum Kawin') {
                            $$('#status_kawin_cucu_belum').hide();
                        } else {
                            $$('#status_kawin_cucu_belum').show();
                        }
                    });
                    $$('#status_hidup_cucu').on('change', function () {
                        $$('#status_hidup_cucu_meninggal input').val('');
                        if ($(this).val() == 'Meninggal') {
                            $$('#status_hidup_cucu_meninggal').show();
                        } else {
                            $$('#status_hidup_cucu_meninggal').hide();
                        }
                    });

                    $$('#umur_cucu').on('input', function () {
                        $$('#umur17kebawah input').val('');
                        $$('#pernyataan_wali_cucu input').val('');
                        if ($(this).val() <= 17) {
                            $$('#ktpcucu').html('KTP Wali');
                            $$('#kkcucu').html('KK Wali');
                            $$('#umur17kebawah').show();
                            $$('#pernyataan_wali_cucu').show();
                        } else {
                            $$('#ktpcucu').html('KTP');
                            $$('#kkcucu').html('KK');
                            $$('#umur17kebawah').hide();
                            $$('#pernyataan_wali_cucu').hide();
                        }
                    });

                    if (iamthedoor.role_id != 4) {
                        $$('#save_cucu_anak_kandung_pewaris').hide();
                    }
                },
            }
        });
        popup_anggota.open();
        $$("#save_cucu_anak_kandung_pewaris").on('click', function () {
            popup_anggota.close();
            if ($("#tambah_cucu_anak_kandung_pewaris").data("id") !== null) {
                cucu_anak_kandung_pewaris_id = $("#tambah_cucu_anak_kandung_pewaris").data("id");
                cucu_anak_kandung_pewaris[cucu_anak_kandung_pewaris_id] = app.form.convertToData("#tambah_cucu_anak_kandung_pewaris");
            } else {
                cucu_anak_kandung_pewaris.push(app.form.convertToData("#tambah_cucu_anak_kandung_pewaris"));
            }
            reload_cucu_anak_kandung_pewaris_table(cucu_anak_kandung_pewaris);
        });
    }

    function reload_cucu_anak_kandung_pewaris_table(cucu_anak_kandung_pewaris_key) {
        cucu_anak_kandung_pewaris_html = '<tr><td></td><td>Data Kosong</td><td></td></tr>';
        $$("#cucu_anak_kandung_pewaris_table table tbody").html(cucu_anak_kandung_pewaris_html);
        cucu_anak_kandung_pewaris_row = '';
        for (var i = 0; i < cucu_anak_kandung_pewaris_key.length; i++) {
            if (cucu_anak_kandung_pewaris_key[i].status == "tersimpan") {
                cucu_anak_kandung_pewaris_row += '<tr>' +
                    '<td class="label-cell aksi-table" style="padding: 0 12px;"><a data-id="' + [i] + '" class="edit_cucu_anak_kandung button button-small color-blue button-fill">EDIT</a></td>' +
                    '<td class="label-cell hapus-table" style="padding: 0 12px 0 0;"><a data-id="' + [i] + '"  class="hapus_cucu_anak_kandung button color-red button-fill button-small">HAPUS</a></td>' +
                    '<td class="label-cell">' + cucu_anak_kandung_pewaris_key[i].orang_tua_cucu + '</td>' +
                    '<td class="label-cell">' + cucu_anak_kandung_pewaris_key[i].nik_cucu + '</td>' +
                    '<td class="label-cell">' + cucu_anak_kandung_pewaris_key[i].nama_cucu + '</td>' +
                    '<td class="label-cell">' + cucu_anak_kandung_pewaris_key[i].tgl_lahir_cucu + '</td>' +
                    '<td class="label-cell">' + cucu_anak_kandung_pewaris_key[i].umur_cucu + '</td>' +
                    '<td class="label-cell">' + cucu_anak_kandung_pewaris_key[i].alamat_cucu + '</td>' +
                    '<td class="label-cell">' + cucu_anak_kandung_pewaris_key[i].status_kawin_cucu + '</td>' +
                    '<td class="label-cell">' + cucu_anak_kandung_pewaris_key[i].status_hidup_cucu + '</td>' +
                    '<td class="label-cell">' + cucu_anak_kandung_pewaris_key[i].nama_wali_cucu + '</td>' +
                    '<td class="label-cell">' + cucu_anak_kandung_pewaris_key[i].hubungan_wali_cucu + '</td>' +
                    '<td class="label-cell">';
                if (cucu_anak_kandung_pewaris_key[i].fileid_ktp_cucu != '') {
                    cucu_anak_kandung_pewaris_row += '<a data-id="' + [i] + '" onclick="preview_files(' + cucu_anak_kandung_pewaris_key[i].fileid_ktp_cucu + ')" class="ktp_anggota button color-blue button-fill button-small">KTP</a></td>';
                }
                if (cucu_anak_kandung_pewaris_key[i].fileid_kk_cucu != '') {
                    cucu_anak_kandung_pewaris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + cucu_anak_kandung_pewaris_key[i].fileid_kk_cucu + ')" class="button color-blue button-fill button-small">KK</a></td>';
                }
                if (cucu_anak_kandung_pewaris_key[i].fileid_sn_cucu != '') {
                    cucu_anak_kandung_pewaris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + cucu_anak_kandung_pewaris_key[i].fileid_sn_cucu + ')" class="button color-blue button-fill button-small">SURAT NIKAH</a></td>';
                }
                if (cucu_anak_kandung_pewaris_key[i].fileid_ak_cucu != '') {
                    cucu_anak_kandung_pewaris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + cucu_anak_kandung_pewaris_key[i].fileid_ak_cucu + ')" class="button color-blue button-fill button-small">AKTA KEMATIAN</a></td>';
                }
                if (cucu_anak_kandung_pewaris_key[i].fileid_wali_cucu != '') {
                    cucu_anak_kandung_pewaris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + cucu_anak_kandung_pewaris_key[i].fileid_wali_cucu + ')" class="button color-blue button-fill button-small">SURAT PERWALIAN</a></td>';
                }
                cucu_anak_kandung_pewaris_row += '</tr>';
            }
        }
        if (cucu_anak_kandung_pewaris_row !== '') {
            $$("#cucu_anak_kandung_pewaris_table table tbody").html(cucu_anak_kandung_pewaris_row);
        }
        if (iamthedoor.role_id != 4) {
            $$('.hapus-table').hide();
        }
        $$(".hapus_cucu_anak_kandung").on('click', function () {
            cucu_anak_kandung_pewaris_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin Menghapus data?', function () {
                cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].status = 'terhapus';
                reload_cucu_anak_kandung_pewaris_table(cucu_anak_kandung_pewaris_key);
            });
        });
        $$(".edit_cucu_anak_kandung").on('click', function () {
            cucu_anak_kandung_pewaris_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin akan merubah data?', function () {
                popup_tambah_cucu_anak_kandung_pewaris();
                $$("#tambah_cucu_anak_kandung_pewaris").attr("data-id", cucu_anak_kandung_pewaris_id);
                $$("input[name='nik_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].nik_cucu);
                $$("input[name='nama_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].nama_cucu);
                $$("input[name='tgl_lahir_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].tgl_lahir_cucu);
                $$("input[name='umur_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].umur_cucu);
                $$("textarea[name='alamat_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].alamat_cucu);
                $$("select[name='status_kawin_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].status_kawin_cucu);
                $$("select[name='status_hidup_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].status_hidup_cucu);
                $$("input[name='nama_wali_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].nama_wali_cucu);
                $$("input[name='hubungan_wali_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].hubungan_wali_cucu);
                $$("input[name='filecode_ktp_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].filecode_ktp_cucu);
                $$("input[name='filecode_kk_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].filecode_kk_cucu);
                $$("input[name='filecode_sn_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].filecode_sn_cucu);
                $$("input[name='filecode_ak_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].filecode_ak_cucu);
                $$("input[name='filecode_wali_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].filecode_wali_cucu);
                $$("input[name='fileid_ktp_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_ktp_cucu);
                $$("input[name='fileid_kk_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_kk_cucu);
                $$("input[name='fileid_sn_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_sn_cucu);
                $$("input[name='fileid_ak_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_ak_cucu);
                $$("input[name='fileid_wali_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_wali_cucu);
                $$("input[name='fileurl_ktp_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileurl_ktp_cucu);
                $$("input[name='fileurl_kk_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileurl_kk_cucu);
                $$("input[name='fileurl_sn_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileurl_sn_cucu);
                $$("input[name='fileurl_ak_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileurl_ak_cucu);
                $$("input[name='fileurl_wali_cucu']").val(cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileurl_wali_cucu);
                if (cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_ktp_cucu != '') {
                    var preview_file_ktp_cucu = '<a id="_ktp_cucu" onclick="preview_files(' + cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_ktp_cucu + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                    $$(".preview_file_ktp_cucu").html(preview_file_ktp_cucu);
                }
                if (cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_kk_cucu != '') {
                    var preview_file_kk_cucu = '<a id="_kk_cucu" onclick="preview_files(' + cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_kk_cucu + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                    $$(".preview_file_kk_cucu").html(preview_file_kk_cucu);
                }
                if (cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_sn_cucu != '') {
                    var preview_file_sn_cucu = '<a id="_sn_cucu" onclick="preview_files(' + cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_sn_cucu + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                    $$(".preview_file_sn_cucu").html(preview_file_sn_cucu);
                }
                if (cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_ak_cucu != '') {
                    var preview_file_ak_cucu = '<a id="_ak_cucu" onclick="preview_files(' + cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_ak_cucu + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                    $$(".preview_file_ak_cucu").html(preview_file_ak_cucu);
                }
                if (cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_wali_cucu != '') {
                    var preview_file_wali_cucu = '<a id="_wali_cucu" onclick="preview_files(' + cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].fileid_wali_cucu + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                    $$(".preview_file_wali_cucu").html(preview_file_wali_cucu);
                }

                if (cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].status_kawin_cucu == 'Belum Kawin') {
                    $$('#status_kawin_cucu_belum').hide();
                } else {
                    $$('#status_kawin_cucu_belum').show();
                }

                if (cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].status_hidup_cucu == 'Meninggal') {
                    $$('#status_hidup_cucu_meninggal').show();
                } else {
                    $$('#status_hidup_cucu_meninggal').hide();
                }

                if (cucu_anak_kandung_pewaris_key[cucu_anak_kandung_pewaris_id].umur_cucu <= 17) {
                    $$('#ktpcucu').html('KTP Wali');
                    $$('#kkcucu').html('KK Wali');
                    $$('#umur17kebawah').show();
                    $$('#pernyataan_wali_cucu').show();
                } else {
                    $$('#ktpcucu').html('KTP');
                    $$('#kkcucu').html('KK');
                    $$('#umur17kebawah').hide();
                    $$('#pernyataan_wali_cucu').hide();
                }

            });
        });
    }
    // cucu anak kandung end

    // Anak Angkat Pewaris
    anak_angkat_pewaris = new Array();
    $$('#addanakangkatpewaris').on('touchend', function () {
        popup_tambah_anak_angkat_pewaris();
    });

    anak_angkat_pewaris = data.anak_angkat_pewaris;
    for (var i = 0; i < anak_angkat_pewaris.length; i++) {
        anak_angkat_pewaris[i] = {
            "nik_anak_angkat": anak_angkat_pewaris[i].nik,
            "nama_anak_angkat": anak_angkat_pewaris[i].nama,
            "tgl_lahir_anak_angkat": anak_angkat_pewaris[i].tgl_lahir,
            "umur_anak_angkat": anak_angkat_pewaris[i].umur,
            "alamat_anak_angkat": anak_angkat_pewaris[i].alamat,
            "status_kawin_anak_angkat": anak_angkat_pewaris[i].status_kawin,
            "status_hidup_anak_angkat": anak_angkat_pewaris[i].status_hidup,
            "nama_wali_anak_angkat": anak_angkat_pewaris[i].nama_wali,
            "hubungan_wali_anak_angkat": anak_angkat_pewaris[i].hubungan_wali,

            "fileid_ktp_anak_angkat": anak_angkat_pewaris[i].file_actual_ktp,
            "fileurl_ktp_anak_angkat": anak_angkat_pewaris[i].doc_path_ktp,
            "filecode_ktp_anak_angkat": anak_angkat_pewaris[i].doc_path_ktp,

            "fileid_kk_anak_angkat": anak_angkat_pewaris[i].file_actual_kk,
            "fileurl_kk_anak_angkat": anak_angkat_pewaris[i].doc_path_kk,
            "filecode_kk_anak_angkat": anak_angkat_pewaris[i].doc_path_kk,

            "fileid_sn_anak_angkat": anak_angkat_pewaris[i].file_actual_surat_nikah,
            "fileurl_sn_anak_angkat": anak_angkat_pewaris[i].doc_path_surat_nikah,
            "filecode_sn_anak_angkat": anak_angkat_pewaris[i].doc_path_surat_nikah,

            "fileid_ak_anak_angkat": anak_angkat_pewaris[i].file_actual_akta_kematian,
            "fileurl_ak_anak_angkat": anak_angkat_pewaris[i].doc_path_akta_kematian,
            "filecode_ak_anak_angkat": anak_angkat_pewaris[i].doc_path_akta_kematian,

            "fileid_wali_anak_angkat": anak_angkat_pewaris[i].file_actual_pernyataan_wali,
            "fileurl_wali_anak_angkat": anak_angkat_pewaris[i].doc_path_surat_pernyataan_wali,
            "filecode_wali_anak_angkat": anak_angkat_pewaris[i].doc_path_surat_pernyataan_wali,

            "status": 'tersimpan',
        }
    }
    reload_anak_angkat_pewaris_table(anak_angkat_pewaris);
    function popup_tambah_anak_angkat_pewaris() {
        var popup_anak_angkat = app.popup.create({
            content: '<div class="popup page-content">' +
                '<div class="block">' +
                '<form class="list" id="tambah_anak_angkat_pewaris" data-id="null">' +
                '<div class="block-title">' +
                '<div class="row">' +
                '<div class="col-100">' +
                '<div class="chip color-blue">' +
                '<div class="chip-label">Form Tambah Anak Angkat Pewaris</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<ul id="formupload-wrapper-list-waris">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">NIK</div>' +
                '<div class="item-input-wrap">' +
                '<input type="number" name="nik_anak_angkat">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Nama</div>' +
                '<div class="item-input-wrap">' +
                '<input type="text" name="nama_anak_angkat">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Tanggal Lahir</div>' +
                '<div class="item-input-wrap">' +
                '<input type="date" name="tgl_lahir_anak_angkat">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Umur</div>' +
                '<div class="item-input-wrap">' +
                '<input type="number" name="umur_anak_angkat" id="umur_anak_angkat">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Alamat</div>' +
                '<div class="item-input-wrap">' +
                '<textarea class="resizable" name="alamat_anak_angkat"></textarea>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Status Kawin</div>' +
                '<div class="item-input-wrap input-dropdown-wrap">' +
                '<select name="status_kawin_anak_angkat" id="status_kawin_anak_angkat">' +
                '<option value="Sudah Kawin">SUDAH KAWIN</option>' +
                '<option value="Belum Kawin">BELUM KAWIN</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Status Hidup</div>' +
                '<div class="item-input-wrap input-dropdown-wrap">' +
                '<select name="status_hidup_anak_angkat" id="status_hidup_anak_angkat">' +
                '<option value="Hidup">HIDUP</option>' +
                '<option value="Meninggal">MENINGGAL</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<div id="wali_anak_angkat" style="display: none;">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Nama Wali</div>' +
                '<div class="item-input-wrap">' +
                '<input type="text" name="nama_wali_anak_angkat">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Hubungan dengan yang diwakili</div>' +
                '<div class="item-input-wrap">' +
                '<input type="text" name="hubungan_wali_anak_angkat">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</div>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">KTP</div>' +
                '<div class="item-input-wrap">' +
                '<input id="fileid_ktp_anak_angkat" class="fileid" type="hidden" name="fileid_ktp_anak_angkat">' +
                '<input id="filecode_ktp_anak_angkat" type="hidden" readonly name="filecode_ktp_anak_angkat">' +
                '<input id="fileurl_ktp_anak_angkat" type="text" name="fileurl_ktp_anak_angkat" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ktp_anak_angkat"></div>' +
                '<div class="col-20">' +
                '<a id="_ktp_anak_angkat" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">KK</div>' +
                '<div class="item-input-wrap">' +
                '<input id="fileid_kk_anak_angkat" class="fileid" type="hidden" name="fileid_kk_anak_angkat">' +
                '<input id="filecode_kk_anak_angkat" type="hidden" readonly name="filecode_kk_anak_angkat">' +
                '<input id="fileurl_kk_anak_angkat" type="text" name="fileurl_kk_anak_angkat" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_kk_anak_angkat"></div>' +
                '<div class="col-20">' +
                '<a id="_kk_anak_angkat" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li id="anak_angkat_kawin">' +
                '<ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Buku Nikah</div>' +
                '<input id="fileid_sn_anak_angkat" class="fileid" type="hidden" name="fileid_sn_anak_angkat">' +
                '<input  id="filecode_sn_anak_angkat" type="hidden" readonly name="filecode_sn_anak_angkat">' +
                '<input  id="fileurl_sn_anak_angkat" type="text" name="fileurl_sn_anak_angkat" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_sn_anak_angkat"></div>' +
                '<div class="col-20">' +
                '<a id="_sn_anak_angkat" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</li>' +
                '<li data-index="ak_anak_angkat" id="anak_angkat_meninggal" style="display: none;">' +
                '<ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Akta Kematian</div>' +
                '<input id="fileid_ak_anak_angkat" class="fileid" type="hidden" name="fileid_ak_anak_angkat">' +
                '<input  id="filecode_ak_anak_angkat" type="hidden" readonly name="filecode_ak_anak_angkat">' +
                '<input  id="fileurl_ak_anak_angkat" type="text" name="fileurl_ak_anak_angkat" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ak_anak_angkat"></div>' +
                '<div class="col-20">' +
                '<a id="_ak_anak_angkat" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</li>' +
                '<li data-index="pernyataan_wali_anak_angkat" id="pernyataan_wali_anak_angkat" style="display: none;">' +
                '<ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Surat Pernyataan Wali</div>' +
                '<input id="fileid_pernyataan_wali_anak_angkat" class="fileid" type="hidden" name="fileid_pernyataan_wali_anak_angkat">' +
                '<input  id="filecode_pernyataan_wali_anak_angkat" type="hidden" readonly name="filecode_wali_anak_angkat">' +
                '<input  id="fileurl_pernyataan_wali_anak_angkat" type="text" name="fileurl_pernyataan_wali_anak_angkat" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_pernyataan_wali_anak_angkat"></div>' +
                '<div class="col-20">' +
                '<a id="_pernyataan_wali_anak_angkat" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</li>' +
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
                '<a class="button button-round button-fill color-green" id="save_anak_angkat_pewaris" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
                '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',
            on: {
                open: function () {
                    $$('#status_kawin_anak_angkat').on('change', function () {
                        $$('#fileid_sn_anak_angkat').val('');
                        $$('#filecode_sn_anak_angkat').val('');
                        $$('#fileurl_sn_anak_angkat').val('');
                        $$('.preview_file_sn_anak_angkat').html('');

                        if ($(this).val() == 'Sudah Kawin') {
                            $$('#anak_angkat_kawin').show();
                        } else {
                            $$('#anak_angkat_kawin').hide();
                        }
                    });

                    $$('#status_hidup_anak_angkat').on('change', function () {
                        $$('#fileid_ak_anak_angkat').val('');
                        $$('#filecode_ak_anak_angkat').val('');
                        $$('#fileurl_ak_anak_angkat').val('');
                        $$('.preview_file_ak_anak_angkat').html('');

                        if ($(this).val() == 'Meninggal') {
                            $$('#anak_angkat_meninggal').show();
                        } else {
                            $$('#anak_angkat_meninggal').hide();
                        }
                    });

                    $$('#umur_anak_angkat').on('input', function () {
                        $$('#wali_anak_angkat input').val('');

                        $$('#fileid_pernyataan_wali_anak_angkat').val('');
                        $$('#filecode_pernyataan_wali_anak_angkat').val('');
                        $$('#fileurl_pernyataan_wali_anak_angkat').val('');
                        $$('.preview_file_pernyataan_wali_anak_angkat').html('');

                        if ($(this).val() <= 17 && $(this).val() != '') {
                            $$('#pernyataan_wali_anak_angkat').show();
                            $$('#wali_anak_angkat').show();
                        } else {
                            $$('#pernyataan_wali_anak_angkat').hide();
                            $$('#wali_anak_angkat').hide();
                        }
                    });
                },
            }
        });
        popup_anak_angkat.open();
        $$("#save_anak_angkat_pewaris").on('click', function () {
            popup_anak_angkat.close();
            if ($("#tambah_anak_angkat_pewaris").data("id") !== null) {
                pasangan_pewaris_id = $("#tambah_anak_angkat_pewaris").data("id");
                anak_angkat_pewaris[pasangan_pewaris_id] = app.form.convertToData("#tambah_anak_angkat_pewaris");
            } else {
                anak_angkat_pewaris.push(app.form.convertToData("#tambah_anak_angkat_pewaris"));
            }
            reload_anak_angkat_pewaris_table(anak_angkat_pewaris);
            if (app.form.convertToData("#tambah_anak_angkat_pewaris").status_hidup_anak_angkat == 'Meninggal') {
                popup_tambah_cucu_angkat_pewaris();
            }
        });
    }

    function reload_anak_angkat_pewaris_table(anak_angkat) {
        anak_angkat_pewaris_row = '';
        anak_angkat.forEach(function (val, key) {
            if (val.status == 'tersimpan') {
                anak_angkat_pewaris_row += '<tr>' +
                    '<td class="label-cell aksi-table" style="padding: 0 12px;"><a data-id="' + key + '" class="edit_anak_angkat button button-small color-blue button-fill">EDIT</a></td>' +
                    '<td class="label-cell hapus-table" style="padding: 0 12px 0 0;"><a data-id="' + key + '"  class="hapus_anak_angkat button color-red button-fill button-small">HAPUS</a></td>' +
                    '<td class="label-cell">' + val.nik_anak_angkat + '</td>' +
                    '<td class="label-cell">' + val.nama_anak_angkat + '</td>' +
                    '<td class="label-cell">' + val.tgl_lahir_anak_angkat + '</td>' +
                    '<td class="label-cell">' + val.umur_anak_angkat + '</td>' +
                    '<td class="label-cell">' + val.alamat_anak_angkat + '</td>' +
                    '<td class="label-cell">' + val.status_kawin_anak_angkat + '</td>' +
                    '<td class="label-cell">' + val.status_hidup_anak_angkat + '</td>' +
                    '<td class="label-cell">' + val.nama_wali_anak_angkat + '</td>' +
                    '<td class="label-cell">' + val.hubungan_wali_anak_angkat + '</td>' +
                    '<td class="label-cell">';
                if (val.fileid_ktp_anak_angkat != '') {
                    anak_angkat_pewaris_row += '<a data-id="' + key + '" onclick="preview_files(' + val.fileid_ktp_anak_angkat + ')" class="button color-blue button-fill button-small">KTP</a>';
                }
                anak_angkat_pewaris_row += '</td>' +
                    '<td class="label-cell">';
                if (val.fileid_kk_anak_angkat != '') {
                    anak_angkat_pewaris_row += '<a data-id="' + key + '" onclick="preview_files(' + val.fileid_kk_anak_angkat + ')" class="button color-blue button-fill button-small">KK</a>';
                }
                anak_angkat_pewaris_row += '</td>';
                if (val.fileid_sn_anak_angkat != '') {
                    anak_angkat_pewaris_row += '<td class="label-cell"><a data-id="' + key + '" onclick="preview_files(' + val.fileid_sn_anak_angkat + ')" class="button color-blue button-fill button-small">SURAT NIKAH</a></td>';
                }
                if (val.fileid_ak_anak_angkat != '') {
                    anak_angkat_pewaris_row += '<td class="label-cell"><a data-id="' + key + '" onclick="preview_files(' + val.fileid_ak_anak_angkat + ')" class="button color-blue button-fill button-small">AKTA KEMATIAN</a></td>';
                }
                if (val.fileid_pernyataan_wali_anak_angkat != '') {
                    anak_angkat_pewaris_row += '<td class="label-cell"><a data-id="' + key + '" onclick="preview_files(' + val.fileid_pernyataan_wali_anak_angkat + ')" class="button color-blue button-fill button-small">SURAT PERWALIAN</a></td>';
                }
                anak_angkat_pewaris_row += '<td class="label-cell"></td>' +
                    '</tr>';
            }
        })

        if (anak_angkat_pewaris_row !== '') {
            $$('#anggota_anak_angkat_pewaris_table table tbody').html(anak_angkat_pewaris_row);
        } else {
            $$('#anggota_anak_angkat_pewaris_table table tbody').html('<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="numeric-cell"></td>' +
                '<td class="label-cell">Data Kosong</td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>');
        }

        $$(".hapus_anak_angkat").on('click', function () {
            anak_angkat_pewaris_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin Menghapus data?', function () {
                anak_angkat[anak_angkat_pewaris_id].status = 'terhapus';
                reload_anak_angkat_pewaris_table(anak_angkat);
            });
        });

        $$(".edit_anak_angkat").on('click', function () {
            id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin akan merubah data?', function () {
                popup_tambah_anak_angkat_pewaris();
                $$("#tambah_anak_angkat_pewaris").attr("data-id", id);
                $$("input[name='nik_anak_angkat']").val(anak_angkat[id].nik_anak_angkat);
                $$("input[name='nama_anak_angkat']").val(anak_angkat[id].nama_anak_angkat);
                $$("input[name='tgl_lahir_anak_angkat']").val(anak_angkat[id].tgl_lahir_anak_angkat);
                $$("input[name='umur_anak_angkat']").val(anak_angkat[id].umur_anak_angkat);
                $$("textarea[name='alamat_anak_angkat']").text(anak_angkat[id].alamat_anak_angkat);
                $$("select[name='status_kawin_anak_angkat']").val(anak_angkat[id].status_kawin_anak_angkat);
                $$("select[name='status_hidup_anak_angkat']").val(anak_angkat[id].status_hidup_anak_angkat);
                $$("input[name='nama_wali_anak_angkat']").val(anak_angkat[id].nama_wali_anak_angkat);
                $$("input[name='hubungan_wali_anak_angkat']").val(anak_angkat[id].hubungan_wali_anak_angkat);

                $$("input[name='filecode_ktp_anak_angkat']").val(anak_angkat[id].filecode_ktp_anak_angkat);
                $$("input[name='fileid_ktp_anak_angkat']").val(anak_angkat[id].fileid_ktp_anak_angkat);
                $$("input[name='fileurl_ktp_anak_angkat']").val(anak_angkat[id].fileurl_ktp_anak_angkat);

                $$("input[name='filecode_kk_anak_angkat']").val(anak_angkat[id].filecode_kk_anak_angkat);
                $$("input[name='fileid_kk_anak_angkat']").val(anak_angkat[id].fileid_kk_anak_angkat);
                $$("input[name='fileurl_kk_anak_angkat']").val(anak_angkat[id].fileurl_kk_anak_angkat);

                $$("input[name='filecode_sn_anak_angkat']").val(anak_angkat[id].filecode_sn_anak_angkat);
                $$("input[name='fileid_sn_anak_angkat']").val(anak_angkat[id].fileid_sn_anak_angkat);
                $$("input[name='fileurl_sn_anak_angkat']").val(anak_angkat[id].fileurl_sn_anak_angkat);

                $$("input[name='filecode_ak_anak_angkat']").val(anak_angkat[id].filecode_ak_anak_angkat);
                $$("input[name='fileid_ak_anak_angkat']").val(anak_angkat[id].fileid_ak_anak_angkat);
                $$("input[name='fileurl_ak_anak_angkat']").val(anak_angkat[id].fileurl_ak_anak_angkat);

                $$("input[name='filecode_pernyataan_wali_anak_angkat']").val(anak_angkat[id].filecode_pernyataan_wali_anak_angkat);
                $$("input[name='fileid_pernyataan_wali_anak_angkat']").val(anak_angkat[id].fileid_pernyataan_wali_anak_angkat);
                $$("input[name='fileurl_pernyataan_wali_anak_angkat']").val(anak_angkat[id].fileurl_pernyataan_wali_anak_angkat);

                var preview_file_ktp = '';
                if (anak_angkat[id].fileid_ktp_anak_angkat != '') {
                    preview_file_ktp = '<a onclick="preview_files(' + anak_angkat[id].fileid_ktp_anak_angkat + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_ktp_anak_angkat").html(preview_file_ktp);

                var preview_file_kk = '';
                if (anak_angkat[id].fileid_kk_anak_angkat != '') {
                    preview_file_kk = '<a onclick="preview_files(' + anak_angkat[id].fileid_kk_anak_angkat + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_kk_anak_angkat").html(preview_file_kk);

                var preview_file_sn = '';
                if (anak_angkat[id].fileid_sn_anak_angkat != '') {
                    preview_file_sn = '<a onclick="preview_files(' + anak_angkat[id].fileid_sn_anak_angkat + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_sn_anak_angkat").html(preview_file_sn);

                var preview_file_ak = '';
                if (anak_angkat[id].fileid_ak_anak_angkat != '') {
                    preview_file_ak = '<a onclick="preview_files(' + anak_angkat[id].fileid_ak_anak_angkat + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_ak_anak_angkat").html(preview_file_ak);

                var preview_file_pernyataan_wali = '';
                if (anak_angkat[id].fileid_pernyataan_wali_anak_angkat != '') {
                    preview_file_pernyataan_wali = '<a onclick="preview_files(' + anak_angkat[id].fileid_pernyataan_wali_anak_angkat + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_pernyataan_wali_anak_angkat").html(preview_file_pernyataan_wali);

                if (anak_angkat[id].umur_anak_angkat <= 17) {
                    $$('#pernyataan_wali_anak_angkat').show();
                    $$('#wali_anak_angkat').show();
                }

                if (anak_angkat[id].status_kawin_anak_angkat == 'Belum Kawin') {
                    $$('#anak_angkat_kawin').hide();
                }

                if (anak_angkat[id].status_hidup_anak_angkat == 'Meninggal') {
                    $$('#anak_angkat_meninggal').show();
                }
            });
        });

        cek_anak_angkat_meninggal(anak_angkat);
    }

    function cek_anak_angkat_meninggal(anak_angkat) {
        var cucu_angkat = false;
        anak_angkat.forEach(function (val, key) {
            if (val.status == 'tersimpan' && val.status_hidup_anak_angkat == 'Meninggal') {
                cucu_angkat = true;
            }
        });

        if (cucu_angkat) {
            $$('#cucu_angkat_pewaris').show();
        } else {
            $$('#cucu_angkat_pewaris').hide();
        }
    }

    // Cucu dari Anak Angkat Pewaris
    cucu_angkat_pewaris = new Array();
    $$('#addcucuangkatpewaris').on('touchend', function () {
        popup_tambah_cucu_angkat_pewaris();
    });

    cucu_angkat_pewaris = data.cucu_angkat_pewaris;
    for (var i = 0; i < cucu_angkat_pewaris.length; i++) {
        cucu_angkat_pewaris[i] = {
            "orang_tua_cucu_angkat": cucu_angkat_pewaris[i].orangtua,
            "nik_cucu_angkat": cucu_angkat_pewaris[i].nik,
            "nama_cucu_angkat": cucu_angkat_pewaris[i].nama,
            "tgl_lahir_cucu_angkat": cucu_angkat_pewaris[i].tgl_lahir,
            "umur_cucu_angkat": cucu_angkat_pewaris[i].umur,
            "alamat_cucu_angkat": cucu_angkat_pewaris[i].alamat,
            "status_kawin_cucu_angkat": cucu_angkat_pewaris[i].status_kawin,
            "status_hidup_cucu_angkat": cucu_angkat_pewaris[i].status_hidup,
            "nama_wali_cucu_angkat": cucu_angkat_pewaris[i].nama_wali,
            "hubungan_wali_cucu_angkat": cucu_angkat_pewaris[i].hubungan_wali,

            "fileid_ktp_cucu_angkat": cucu_angkat_pewaris[i].file_actual_ktp,
            "fileurl_ktp_cucu_angkat": cucu_angkat_pewaris[i].doc_path_ktp,
            "filecode_ktp_cucu_angkat": cucu_angkat_pewaris[i].doc_path_ktp,

            "fileid_kk_cucu_angkat": cucu_angkat_pewaris[i].file_actual_kk,
            "fileurl_kk_cucu_angkat": cucu_angkat_pewaris[i].doc_path_kk,
            "filecode_kk_cucu_angkat": cucu_angkat_pewaris[i].doc_path_kk,

            "fileid_sn_cucu_angkat": cucu_angkat_pewaris[i].file_actual_surat_nikah,
            "fileurl_sn_cucu_angkat": cucu_angkat_pewaris[i].doc_path_surat_nikah,
            "filecode_sn_cucu_angkat": cucu_angkat_pewaris[i].doc_path_surat_nikah,

            "fileid_ak_cucu_angkat": cucu_angkat_pewaris[i].file_actual_akta_kematian,
            "fileurl_ak_cucu_angkat": cucu_angkat_pewaris[i].doc_path_akta_kematian,
            "filecode_ak_cucu_angkat": cucu_angkat_pewaris[i].doc_path_akta_kematian,

            "fileid_wali_cucu_angkat": cucu_angkat_pewaris[i].file_actual_pernyataan_wali,
            "fileurl_pernyataan_wali_cucu_angkat": cucu_angkat_pewaris[i].doc_path_surat_pernyataan_wali,
            "filecode_pernyataan_wali_cucu_angkat": cucu_angkat_pewaris[i].doc_path_surat_pernyataan_wali,

            "status": 'tersimpan',
        }
    }
    reload_cucu_angkat_pewaris_table(cucu_angkat_pewaris);

    function popup_tambah_cucu_angkat_pewaris() {
        var list_orang_tua_cucu_angkat = '';
        anak_angkat_pewaris.forEach(function (val, index) {
            if (val.status == "tersimpan" && val.status_hidup_anak_angkat == "Meninggal") {
                list_orang_tua_cucu_angkat += '<option value="' + val.nama_anak_angkat + '">' + val.nama_anak_angkat + '</option>';
            }
        });
        var popup_cucu_angkat = app.popup.create({
            content: '<div class="popup page-content">' +
                '<div class="block">' +
                '<form class="list" id="tambah_cucu_angkat_pewaris" data-id="null">' +
                '<div class="block-title">' +
                '<div class="row">' +
                '<div class="col-100">' +
                '<div class="chip color-blue">' +
                '<div class="chip-label">Form Tambah Cucu dari Anak Angkat Pewaris</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<ul id="formupload-wrapper-list-waris">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Nama Orang Tua</div>' +
                '<div class="item-input-wrap input-dropdown-wrap">' +
                '<select name="orang_tua_cucu_angkat">' +
                list_orang_tua_cucu_angkat +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">NIK</div>' +
                '<div class="item-input-wrap">' +
                '<input type="number" name="nik_cucu_angkat">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Nama</div>' +
                '<div class="item-input-wrap">' +
                '<input type="text" name="nama_cucu_angkat">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Tanggal Lahir</div>' +
                '<div class="item-input-wrap">' +
                '<input type="date" name="tgl_lahir_cucu_angkat">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Umur</div>' +
                '<div class="item-input-wrap">' +
                '<input type="number" name="umur_cucu_angkat" id="umur_cucu_angkat">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Alamat</div>' +
                '<div class="item-input-wrap">' +
                '<textarea class="resizable" name="alamat_cucu_angkat"></textarea>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Status Kawin</div>' +
                '<div class="item-input-wrap input-dropdown-wrap">' +
                '<select name="status_kawin_cucu_angkat" id="status_kawin_cucu_angkat">' +
                '<option value="Sudah Kawin">SUDAH KAWIN</option>' +
                '<option value="Belum Kawin">BELUM KAWIN</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Status Hidup</div>' +
                '<div class="item-input-wrap input-dropdown-wrap">' +
                '<select name="status_hidup_cucu_angkat" id="status_hidup_cucu_angkat">' +
                '<option value="Hidup">HIDUP</option>' +
                '<option value="Meninggal">MENINGGAL</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<div id="wali_cucu_angkat" style="display: none;">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Nama Wali</div>' +
                '<div class="item-input-wrap">' +
                '<input type="text" name="nama_wali_cucu_angkat">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Hubungan dengan yang diwakili</div>' +
                '<div class="item-input-wrap">' +
                '<input type="text" name="hubungan_wali_cucu_angkat">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</div>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">KTP</div>' +
                '<div class="item-input-wrap">' +
                '<input id="fileid_ktp_cucu_angkat" class="fileid" type="hidden" name="fileid_ktp_cucu_angkat">' +
                '<input  id="filecode_ktp_cucu_angkat" type="hidden" readonly name="filecode_ktp_cucu_angkat">' +
                '<input  id="fileurl_ktp_cucu_angkat" type="text" name="fileurl_ktp_cucu_angkat" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ktp_cucu_angkat"></div>' +
                '<div class="col-20">' +
                '<a id="_ktp_cucu_angkat" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">KK</div>' +
                '<div class="item-input-wrap">' +
                '<input id="fileid_kk_cucu_angkat" class="fileid" type="hidden" name="fileid_kk_cucu_angkat">' +
                '<input id="filecode_kk_cucu_angkat" type="hidden" readonly name="filecode_kk_cucu_angkat">' +
                '<input id="fileurl_kk_cucu_angkat" type="text" name="fileurl_kk_cucu_angkat" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_kk_cucu_angkat"></div>' +
                '<div class="col-20">' +
                '<a id="_kk_cucu_angkat" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li data-index="sn_cucu_angkat" id="cucu_angkat_kawin">' +
                '<ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Buku Nikah</div>' +
                '<input id="fileid_sn_cucu_angkat" class="fileid" type="hidden" name="fileid_sn_cucu_angkat">' +
                '<input  id="filecode_sn_cucu_angkat" type="hidden" readonly name="filecode_sn_cucu_angkat">' +
                '<input  id="fileurl_sn_cucu_angkat" type="text" name="fileurl_sn_cucu_angkat" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_sn_cucu_angkat"></div>' +
                '<div class="col-20">' +
                '<a id="_sn_cucu_angkat" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</li>' +
                '<li data-index="ak_cucu_angkat" id="cucu_angkat_meninggal" style="display: none;">' +
                '<ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Akta Kematian</div>' +
                '<input id="fileid_ak_cucu_angkat" class="fileid" type="hidden" name="fileid_ak_cucu_angkat">' +
                '<input  id="filecode_ak_cucu_angkat" type="hidden" readonly name="filecode_ak_cucu_angkat">' +
                '<input  id="fileurl_ak_cucu_angkat" type="text" name="fileurl_ak_cucu_angkat" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ak_cucu_angkat"></div>' +
                '<div class="col-20">' +
                '<a id="_ak_cucu_angkat" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</li>' +
                '<li data-index="pernyataan_wali_cucu_angkat" id="pernyataan_wali_cucu_angkat" style="display: none;">' +
                '<ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Surat Pernyataan Wali</div>' +
                '<input id="fileid_pernyataan_wali_cucu_angkat" class="fileid" type="hidden" name="fileid_pernyataan_wali_cucu_angkat">' +
                '<input  id="filecode_pernyataan_wali_cucu_angkat" type="hidden" readonly name="filecode_pernyataan_wali_cucu_angkat">' +
                '<input  id="fileurl_pernyataan_wali_cucu_angkat" type="text" name="fileurl_pernyataan_wali_cucu_angkat" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_pernyataan_wali_cucu_angkat"></div>' +
                '<div class="col-20">' +
                '<a id="_pernyataan_wali_cucu_angkat" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</li>' +
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
                '<a class="button button-round button-fill color-green" id="save_cucu_angkat_pewaris" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
                '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',
            on: {
                open: function () {
                    $$('#status_kawin_cucu_angkat').on('change', function () {
                        $$('#fileid_sn_cucu_angkat').val('');
                        $$('#filecode_sn_cucu_angkat').val('');
                        $$('#fileurl_sn_cucu_angkat').val('');
                        $$('.preview_file_sn_cucu_angkat').html('');

                        if ($(this).val() == 'Sudah Kawin') {
                            $$('#cucu_angkat_kawin').show();
                        } else {
                            $$('#cucu_angkat_kawin').hide();
                        }
                    });

                    $$('#status_hidup_cucu_angkat').on('change', function () {
                        $$('#fileid_ak_cucu_angkat').val('');
                        $$('#filecode_ak_cucu_angkat').val('');
                        $$('#fileurl_ak_cucu_angkat').val('');
                        $$('.preview_file_ak_cucu_angkat').html('');

                        if ($(this).val() == 'Meninggal') {
                            $$('#cucu_angkat_meninggal').show();
                        } else {
                            $$('#cucu_angkat_meninggal').hide();
                        }
                    });

                    $$('#umur_cucu_angkat').on('input', function () {
                        $$('#wali_cucu_angkat input').val('');

                        $$('#fileid_pernyataan_wali_cucu_angkat').val('');
                        $$('#filecode_pernyataan_wali_cucu_angkat').val('');
                        $$('#fileurl_pernyataan_wali_cucu_angkat').val('');
                        $$('.preview_file_pernyataan_wali_cucu_angkat').html('');

                        if ($(this).val() <= 17 && $(this).val() != '') {
                            $$('#pernyataan_wali_cucu_angkat').show();
                            $$('#wali_cucu_angkat').show();
                        } else {
                            $$('#pernyataan_wali_cucu_angkat').hide();
                            $$('#wali_cucu_angkat').hide();
                        }
                    });
                },
            }
        });
        popup_cucu_angkat.open();
        $$("#save_cucu_angkat_pewaris").on('click', function () {
            popup_cucu_angkat.close();
            if ($("#tambah_cucu_angkat_pewaris").data("id") !== null) {
                id = $("#tambah_cucu_angkat_pewaris").data("id");
                cucu_angkat_pewaris[id] = app.form.convertToData("#tambah_cucu_angkat_pewaris");
            } else {
                cucu_angkat_pewaris.push(app.form.convertToData("#tambah_cucu_angkat_pewaris"));
            }
            reload_cucu_angkat_pewaris_table(cucu_angkat_pewaris);
        });
    }

    function reload_cucu_angkat_pewaris_table(cucu_angkat) {
        cucu_angkat_pewaris_row = '';
        cucu_angkat.forEach(function (val, key) {
            if (val.status == 'tersimpan') {
                cucu_angkat_pewaris_row += '<tr>' +
                    '<td class="label-cell aksi-table" style="padding: 0 12px;"><a data-id="' + key + '" class="edit_cucu_angkat button button-small color-blue button-fill">EDIT</a></td>' +
                    '<td class="label-cell hapus-table" style="padding: 0 12px 0 0;"><a data-id="' + key + '"  class="hapus_cucu_angkat button color-red button-fill button-small">HAPUS</a></td>' +
                    '<td class="label-cell">' + val.orang_tua_cucu_angkat + '</td>' +
                    '<td class="label-cell">' + val.nik_cucu_angkat + '</td>' +
                    '<td class="label-cell">' + val.nama_cucu_angkat + '</td>' +
                    '<td class="label-cell">' + val.tgl_lahir_cucu_angkat + '</td>' +
                    '<td class="label-cell">' + val.umur_cucu_angkat + '</td>' +
                    '<td class="label-cell">' + val.alamat_cucu_angkat + '</td>' +
                    '<td class="label-cell">' + val.status_kawin_cucu_angkat + '</td>' +
                    '<td class="label-cell">' + val.status_hidup_cucu_angkat + '</td>' +
                    '<td class="label-cell">' + val.nama_wali_cucu_angkat + '</td>' +
                    '<td class="label-cell">' + val.hubungan_wali_cucu_angkat + '</td>' +
                    '<td class="label-cell">';
                if (val.fileid_ktp_cucu_angkat != '') {
                    cucu_angkat_pewaris_row += '<a data-id="' + key + '" onclick="preview_files(' + val.fileid_ktp_cucu_angkat + ')" class="button color-blue button-fill button-small">KTP</a>';
                }
                cucu_angkat_pewaris_row += '</td>' +
                    '<td class="label-cell">';
                if (val.fileid_kk_cucu_angkat != '') {
                    cucu_angkat_pewaris_row += '<a data-id="' + key + '" onclick="preview_files(' + val.fileid_kk_cucu_angkat + ')" class="button color-blue button-fill button-small">KK</a>';
                }
                cucu_angkat_pewaris_row += '</td>';
                if (val.fileid_sn_cucu_angkat != '') {
                    cucu_angkat_pewaris_row += '<td class="label-cell"><a data-id="' + key + '" onclick="preview_files(' + val.fileid_sn_cucu_angkat + ')" class="button color-blue button-fill button-small">SURAT NIKAH</a></td>';
                }
                if (val.fileid_ak_cucu_angkat != '') {
                    cucu_angkat_pewaris_row += '<td class="label-cell"><a data-id="' + key + '" onclick="preview_files(' + val.fileid_ak_cucu_angkat + ')" class="button color-blue button-fill button-small">AKTA KEMATIAN</a></td>';
                }
                if (val.fileid_pernyataan_wali_cucu_angkat != '') {
                    cucu_angkat_pewaris_row += '<td class="label-cell"><a data-id="' + key + '" onclick="preview_files(' + val.fileid_pernyataan_wali_cucu_angkat + ')" class="button color-blue button-fill button-small">SURAT PERWALIAN</a></td>';
                }
                cucu_angkat_pewaris_row += '<td class="label-cell"></td>' +
                    '</tr>';
            }
        })

        if (cucu_angkat_pewaris_row !== '') {
            $$('#anggota_cucu_angkat_pewaris_table table tbody').html(cucu_angkat_pewaris_row);
        } else {
            $$('#anggota_cucu_angkat_pewaris_table table tbody').html('<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="numeric-cell"></td>' +
                '<td class="label-cell">Data Kosong</td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>');
        }

        $$(".hapus_cucu_angkat").on('click', function () {
            cucu_angkat_pewaris_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin Menghapus data?', function () {
                cucu_angkat[cucu_angkat_pewaris_id].status = 'terhapus';
                reload_cucu_angkat_pewaris_table(cucu_angkat);
            });
        });

        $$(".edit_cucu_angkat").on('click', function () {
            id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin akan merubah data?', function () {
                popup_tambah_cucu_angkat_pewaris();
                $$("#tambah_cucu_angkat_pewaris").attr("data-id", id);
                $$("select[name='orang_tua_cucu_angkat']").val(cucu_angkat[id].orang_tua_cucu_angkat);
                $$("input[name='nik_cucu_angkat']").val(cucu_angkat[id].nik_cucu_angkat);
                $$("input[name='nama_cucu_angkat']").val(cucu_angkat[id].nama_cucu_angkat);
                $$("input[name='tgl_lahir_cucu_angkat']").val(cucu_angkat[id].tgl_lahir_cucu_angkat);
                $$("input[name='umur_cucu_angkat']").val(cucu_angkat[id].umur_cucu_angkat);
                $$("textarea[name='alamat_cucu_angkat']").text(cucu_angkat[id].alamat_cucu_angkat);
                $$("select[name='status_kawin_cucu_angkat']").val(cucu_angkat[id].status_kawin_cucu_angkat);
                $$("select[name='status_hidup_cucu_angkat']").val(cucu_angkat[id].status_hidup_cucu_angkat);
                $$("input[name='nama_wali_cucu_angkat']").val(cucu_angkat[id].nama_wali_cucu_angkat);
                $$("input[name='hubungan_wali_cucu_angkat']").val(cucu_angkat[id].hubungan_wali_cucu_angkat);

                $$("input[name='filecode_ktp_cucu_angkat']").val(cucu_angkat[id].filecode_ktp_cucu_angkat);
                $$("input[name='fileid_ktp_cucu_angkat']").val(cucu_angkat[id].fileid_ktp_cucu_angkat);
                $$("input[name='fileurl_ktp_cucu_angkat']").val(cucu_angkat[id].fileurl_ktp_cucu_angkat);

                $$("input[name='filecode_kk_cucu_angkat']").val(cucu_angkat[id].filecode_kk_cucu_angkat);
                $$("input[name='fileid_kk_cucu_angkat']").val(cucu_angkat[id].fileid_kk_cucu_angkat);
                $$("input[name='fileurl_kk_cucu_angkat']").val(cucu_angkat[id].fileurl_kk_cucu_angkat);

                $$("input[name='filecode_sn_cucu_angkat']").val(cucu_angkat[id].filecode_sn_cucu_angkat);
                $$("input[name='fileid_sn_cucu_angkat']").val(cucu_angkat[id].fileid_sn_cucu_angkat);
                $$("input[name='fileurl_sn_cucu_angkat']").val(cucu_angkat[id].fileurl_sn_cucu_angkat);

                $$("input[name='filecode_ak_cucu_angkat']").val(cucu_angkat[id].filecode_ak_cucu_angkat);
                $$("input[name='fileid_ak_cucu_angkat']").val(cucu_angkat[id].fileid_ak_cucu_angkat);
                $$("input[name='fileurl_ak_cucu_angkat']").val(cucu_angkat[id].fileurl_ak_cucu_angkat);

                $$("input[name='filecode_pernyataan_wali_cucu_angkat']").val(cucu_angkat[id].filecode_pernyataan_wali_cucu_angkat);
                $$("input[name='fileid_pernyataan_wali_cucu_angkat']").val(cucu_angkat[id].fileid_pernyataan_wali_cucu_angkat);
                $$("input[name='fileurl_pernyataan_wali_cucu_angkat']").val(cucu_angkat[id].fileurl_pernyataan_wali_cucu_angkat);

                var preview_file_ktp = '';
                if (cucu_angkat[id].fileid_ktp_cucu_angkat != '') {
                    preview_file_ktp = '<a onclick="preview_files(' + cucu_angkat[id].fileid_ktp_cucu_angkat + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_ktp_cucu_angkat").html(preview_file_ktp);

                var preview_file_kk = '';
                if (cucu_angkat[id].fileid_kk_cucu_angkat != '') {
                    preview_file_kk = '<a onclick="preview_files(' + cucu_angkat[id].fileid_kk_cucu_angkat + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_kk_cucu_angkat").html(preview_file_kk);

                var preview_file_sn = '';
                if (cucu_angkat[id].fileid_sn_cucu_angkat != '') {
                    preview_file_sn = '<a onclick="preview_files(' + cucu_angkat[id].fileid_sn_cucu_angkat + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_sn_cucu_angkat").html(preview_file_sn);

                var preview_file_ak = '';
                if (cucu_angkat[id].fileid_ak_cucu_angkat != '') {
                    preview_file_ak = '<a onclick="preview_files(' + cucu_angkat[id].fileid_ak_cucu_angkat + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_ak_cucu_angkat").html(preview_file_ak);

                var preview_file_pernyataan_wali = '';
                if (cucu_angkat[id].fileid_pernyataan_wali_cucu_angkat != '') {
                    preview_file_pernyataan_wali = '<a onclick="preview_files(' + cucu_angkat[id].fileid_pernyataan_wali_cucu_angkat + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_pernyataan_wali_cucu_angkat").html(preview_file_pernyataan_wali);

                if (cucu_angkat[id].umur_cucu_angkat <= 17) {
                    $$('#pernyataan_wali_cucu_angkat').show();
                    $$('#wali_cucu_angkat').show();
                }

                if (cucu_angkat[id].status_kawin_cucu_angkat == 'Belum Kawin') {
                    $$('#cucu_angkat_kawin').hide();
                }

                if (cucu_angkat[id].status_hidup_cucu_angkat == 'Meninggal') {
                    $$('#cucu_angkat_meninggal').show();
                }
            });
        });
    }

    // Saudara Kandung Pewaris
    saudara_kandung_pewaris = new Array();
    $$('#addsaudarakandungpewaris').on('touchend', function () {
        popup_tambah_saudara_kandung_pewaris();
    });

    saudara_kandung_pewaris = data.saudara_kandung_pewaris;
    for (var i = 0; i < saudara_kandung_pewaris.length; i++) {
        saudara_kandung_pewaris[i] = {
            "nik_saudara": saudara_kandung_pewaris[i].nik,
            "nama_saudara": saudara_kandung_pewaris[i].nama,
            "tgl_lahir_saudara": saudara_kandung_pewaris[i].tgl_lahir,
            "umur_saudara": saudara_kandung_pewaris[i].umur,
            "alamat_saudara": saudara_kandung_pewaris[i].alamat,
            "status_kawin_saudara": saudara_kandung_pewaris[i].status_kawin,
            "status_hidup_saudara": saudara_kandung_pewaris[i].status_hidup,
            "nama_wali_saudara": saudara_kandung_pewaris[i].nama_wali,
            "hubungan_wali_saudara": saudara_kandung_pewaris[i].hubungan_wali,

            "fileid_ktp_saudara": saudara_kandung_pewaris[i].file_actual_ktp,
            "fileurl_ktp_saudara": saudara_kandung_pewaris[i].doc_path_ktp,
            "filecode_ktp_saudara": saudara_kandung_pewaris[i].doc_path_ktp,

            "fileid_kk_saudara": saudara_kandung_pewaris[i].file_actual_kk,
            "fileurl_kk_saudara": saudara_kandung_pewaris[i].doc_path_kk,
            "filecode_kk_saudara": saudara_kandung_pewaris[i].doc_path_kk,

            "fileid_sn_saudara": saudara_kandung_pewaris[i].file_actual_surat_nikah,
            "fileurl_sn_saudara": saudara_kandung_pewaris[i].doc_path_surat_nikah,
            "filecode_sn_saudara": saudara_kandung_pewaris[i].doc_path_surat_nikah,

            "fileid_ak_saudara": saudara_kandung_pewaris[i].file_actual_akta_kematian,
            "fileurl_ak_saudara": saudara_kandung_pewaris[i].doc_path_akta_kematian,
            "filecode_ak_saudara": saudara_kandung_pewaris[i].doc_path_akta_kematian,

            "fileid_pernyataan_wali_saudara": saudara_kandung_pewaris[i].file_actual_pernyataan_wali,
            "fileurl_pernyataan_wali_saudara": saudara_kandung_pewaris[i].doc_path_surat_pernyataan_wali,
            "filecode_pernyataan_wali_saudara": saudara_kandung_pewaris[i].doc_path_surat_pernyataan_wali,

            "status": 'tersimpan',
        }
    }
    reload_saudara_pewaris_table(saudara_kandung_pewaris);

    function popup_tambah_saudara_kandung_pewaris() {
        var popup_saudara_kandung = app.popup.create({
            content: '<div class="popup page-content">' +
                '<div class="block">' +
                '<form class="list" id="tambah_saudara_pewaris" data-id="null">' +
                '<div class="block-title">' +
                '<div class="row">' +
                '<div class="col-100">' +
                '<div class="chip color-blue">' +
                '<div class="chip-label">Form Tambah Saudara Kandung Pewaris</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<ul id="formupload-wrapper-list-waris">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">NIK</div>' +
                '<div class="item-input-wrap">' +
                '<input type="number" name="nik_saudara">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Nama</div>' +
                '<div class="item-input-wrap">' +
                '<input type="text" name="nama_saudara">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Tanggal Lahir</div>' +
                '<div class="item-input-wrap">' +
                '<input type="date" name="tgl_lahir_saudara">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Umur</div>' +
                '<div class="item-input-wrap">' +
                '<input type="number" name="umur_saudara" id="umur_saudara">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Alamat</div>' +
                '<div class="item-input-wrap">' +
                '<textarea class="resizable" name="alamat_saudara"></textarea>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Status Kawin</div>' +
                '<div class="item-input-wrap input-dropdown-wrap">' +
                '<select name="status_kawin_saudara" id="status_kawin_saudara">' +
                '<option value="Sudah Kawin">SUDAH KAWIN</option>' +
                '<option value="Belum Kawin">BELUM KAWIN</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Status Hidup</div>' +
                '<div class="item-input-wrap input-dropdown-wrap">' +
                '<select name="status_hidup_saudara" id="status_hidup_saudara">' +
                '<option value="Hidup">HIDUP</option>' +
                '<option value="Meninggal">MENINGGAL</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<div id="wali_saudara" style="display: none;">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Nama Wali</div>' +
                '<div class="item-input-wrap">' +
                '<input type="text" name="nama_wali_saudara">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Hubungan dengan yang diwakili</div>' +
                '<div class="item-input-wrap">' +
                '<input type="text" name="hubungan_wali_saudara">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</div>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">KTP</div>' +
                '<div class="item-input-wrap">' +
                '<input id="fileid_ktp_saudara" class="fileid" type="hidden" name="fileid_ktp_saudara">' +
                '<input  id="filecode_ktp_saudara" type="hidden" readonly name="filecode_ktp_saudara">' +
                '<input  id="fileurl_ktp_saudara" type="text" name="fileurl_ktp_saudara" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ktp_saudara"></div>' +
                '<div class="col-20">' +
                '<a id="_ktp_saudara" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">KK</div>' +
                '<div class="item-input-wrap">' +
                '<input id="fileid_kk_saudara" class="fileid" type="hidden" name="fileid_kk_saudara">' +
                '<input id="filecode_kk_saudara" type="hidden" readonly name="filecode_kk_saudara">' +
                '<input id="fileurl_kk_saudara" type="text" name="fileurl_kk_saudara" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_kk_saudara"></div>' +
                '<div class="col-20">' +
                '<a id="_kk_saudara" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li data-index="sn_saudara" id="saudara_kawin">' +
                '<ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Buku Nikah</div>' +
                '<input id="fileid_sn_saudara" class="fileid" type="hidden" name="fileid_sn_saudara">' +
                '<input  id="filecode_sn_saudara" type="hidden" readonly name="filecode_sn_saudara">' +
                '<input  id="fileurl_sn_saudara" type="text" name="fileurl_sn_saudara" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_sn_saudara"></div>' +
                '<div class="col-20">' +
                '<a id="_sn_saudara" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</li>' +
                '<li data-index="ak_saudara" id="saudara_meninggal" style="display: none;">' +
                '<ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Akta Kematian</div>' +
                '<input id="fileid_ak_saudara" class="fileid" type="hidden" name="fileid_ak_saudara">' +
                '<input  id="filecode_ak_saudara" type="hidden" readonly name="filecode_ak_saudara">' +
                '<input  id="fileurl_ak_saudara" type="text" name="fileurl_ak_saudara" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ak_saudara"></div>' +
                '<div class="col-20">' +
                '<a id="_ak_saudara" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</li>' +
                '<li data-index="pernyataan_wali_saudara" id="pernyataan_wali_saudara" style="display: none;">' +
                '<ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Surat Pernyataan Wali</div>' +
                '<input id="fileid_pernyataan_wali_saudara" class="fileid" type="hidden" name="fileid_pernyataan_wali_saudara">' +
                '<input  id="filecode_pernyataan_wali_saudara" type="hidden" readonly name="filecode_pernyataan_wali_saudara">' +
                '<input  id="fileurl_pernyataan_wali_saudara" type="text" name="fileurl_pernyataan_wali_saudara" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_pernyataan_wali_saudara"></div>' +
                '<div class="col-20">' +
                '<a id="_pernyataan_wali_saudara" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</li>' +
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
                '<a class="button button-round button-fill color-green" id="save_saudara_pewaris" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
                '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',
            on: {
                open: function () {
                    $$('#status_kawin_saudara').on('change', function () {
                        $$('#fileid_sn_saudara').val('');
                        $$('#filecode_sn_saudara').val('');
                        $$('#fileurl_sn_saudara').val('');
                        $$('.preview_file_sn_saudara').html('');

                        if ($(this).val() == 'Sudah Kawin') {
                            $$('#saudara_kawin').show();
                        } else {
                            $$('#saudara_kawin').hide();
                        }
                    });

                    $$('#status_hidup_saudara').on('change', function () {
                        $$('#fileid_ak_saudara').val('');
                        $$('#filecode_ak_saudara').val('');
                        $$('#fileurl_ak_saudara').val('');
                        $$('.preview_file_ak_saudara').html('');

                        if ($(this).val() == 'Meninggal') {
                            $$('#saudara_meninggal').show();
                        } else {
                            $$('#saudara_meninggal').hide();
                        }
                    });

                    $$('#umur_saudara').on('input', function () {
                        $$('#wali_saudara input').val('');

                        $$('#fileid_pernyataan_wali_saudara').val('');
                        $$('#filecode_pernyataan_wali_saudara').val('');
                        $$('#fileurl_pernyataan_wali_saudara').val('');
                        $$('.preview_file_pernyataan_wali_saudara').html('');

                        if ($(this).val() <= 17 && $(this).val() != '') {
                            $$('#pernyataan_wali_saudara').show();
                            $$('#wali_saudara').show();
                        } else {
                            $$('#pernyataan_wali_saudara').hide();
                            $$('#wali_saudara').hide();
                        }
                    });
                },
            }
        });
        popup_saudara_kandung.open();
        $$("#save_saudara_pewaris").on('click', function () {
            popup_saudara_kandung.close();
            if ($("#tambah_saudara_pewaris").data("id") !== null) {
                pasangan_pewaris_id = $("#tambah_saudara_pewaris").data("id");
                saudara_kandung_pewaris[pasangan_pewaris_id] = app.form.convertToData("#tambah_saudara_pewaris");
            } else {
                saudara_kandung_pewaris.push(app.form.convertToData("#tambah_saudara_pewaris"));
            }
            reload_saudara_pewaris_table(saudara_kandung_pewaris);
            if (app.form.convertToData("#tambah_saudara_pewaris").status_hidup_saudara == 'Meninggal') {
                popup_tambah_keponakan_pewaris();
            }
        });
    }

    function reload_saudara_pewaris_table(saudara_kandung) {
        saudara_pewaris_row = '';
        saudara_kandung.forEach(function (val, key) {
            if (val.status == 'tersimpan') {
                saudara_pewaris_row += '<tr>' +
                    '<td class="label-cell aksi-table" style="padding: 0 12px;"><a data-id="' + key + '" class="edit_saudara_kandung button button-small color-blue button-fill">EDIT</a></td>' +
                    '<td class="label-cell hapus-table" style="padding: 0 12px 0 0;"><a data-id="' + key + '"  class="hapus_saudara_kandung button color-red button-fill button-small">HAPUS</a></td>' +
                    '<td class="label-cell">' + val.nik_saudara + '</td>' +
                    '<td class="label-cell">' + val.nama_saudara + '</td>' +
                    '<td class="label-cell">' + val.tgl_lahir_saudara + '</td>' +
                    '<td class="label-cell">' + val.umur_saudara + '</td>' +
                    '<td class="label-cell">' + val.alamat_saudara + '</td>' +
                    '<td class="label-cell">' + val.status_kawin_saudara + '</td>' +
                    '<td class="label-cell">' + val.status_hidup_saudara + '</td>' +
                    '<td class="label-cell">' + val.nama_wali_saudara + '</td>' +
                    '<td class="label-cell">' + val.hubungan_wali_saudara + '</td>' +
                    '<td class="label-cell">';
                if (val.fileid_ktp_saudara != '') {
                    saudara_pewaris_row += '<a data-id="' + key + '" onclick="preview_files(' + val.fileid_ktp_saudara + ')" class="button color-blue button-fill button-small">KTP</a>';
                }
                saudara_pewaris_row += '</td>' +
                    '<td class="label-cell">';
                if (val.fileid_kk_saudara != '') {
                    saudara_pewaris_row += '<a data-id="' + key + '" onclick="preview_files(' + val.fileid_kk_saudara + ')" class="button color-blue button-fill button-small">KK</a>';
                }
                saudara_pewaris_row += '</td>';
                if (val.fileid_sn_saudara != '') {
                    saudara_pewaris_row += '<td class="label-cell"><a data-id="' + key + '" onclick="preview_files(' + val.fileid_sn_saudara + ')" class="button color-blue button-fill button-small">SURAT NIKAH</a></td>';
                }
                if (val.fileid_ak_saudara != '') {
                    saudara_pewaris_row += '<td class="label-cell"><a data-id="' + key + '" onclick="preview_files(' + val.fileid_ak_saudara + ')" class="button color-blue button-fill button-small">AKTA KEMATIAN</a></td>';
                }
                if (val.fileid_pernyataan_wali_saudara != '') {
                    saudara_pewaris_row += '<td class="label-cell"><a data-id="' + key + '" onclick="preview_files(' + val.fileid_pernyataan_wali_saudara + ')" class="button color-blue button-fill button-small">SURAT PERWALIAN</a></td>';
                }
                saudara_pewaris_row += '<td class="label-cell"></td>' +
                    '</tr>';
            }
        })

        if (saudara_pewaris_row !== '') {
            $$('#anggota_saudara_kandung_pewaris_table table tbody').html(saudara_pewaris_row);
        } else {
            $$('#anggota_saudara_kandung_pewaris_table table tbody').html('<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="numeric-cell"></td>' +
                '<td class="label-cell">Data Kosong</td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>');
        }

        $$(".hapus_saudara_kandung").on('click', function () {
            saudara_pewaris_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin Menghapus data?', function () {
                saudara_kandung[saudara_pewaris_id].status = 'terhapus';
                reload_saudara_pewaris_table(saudara_kandung);
            });
        });

        $$(".edit_saudara_kandung").on('click', function () {
            id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin akan merubah data?', function () {
                popup_tambah_saudara_kandung_pewaris();
                $$("#tambah_saudara_pewaris").attr("data-id", id);
                $$("input[name='nik_saudara']").val(saudara_kandung[id].nik_saudara);
                $$("input[name='nama_saudara']").val(saudara_kandung[id].nama_saudara);
                $$("input[name='tgl_lahir_saudara']").val(saudara_kandung[id].tgl_lahir_saudara);
                $$("input[name='umur_saudara']").val(saudara_kandung[id].umur_saudara);
                $$("textarea[name='alamat_saudara']").text(saudara_kandung[id].alamat_saudara);
                $$("select[name='status_kawin_saudara']").val(saudara_kandung[id].status_kawin_saudara);
                $$("select[name='status_hidup_saudara']").val(saudara_kandung[id].status_hidup_saudara);
                $$("input[name='nama_wali_saudara']").val(saudara_kandung[id].nama_wali_saudara);
                $$("input[name='hubungan_wali_saudara']").val(saudara_kandung[id].hubungan_wali_saudara);

                $$("input[name='filecode_ktp_saudara']").val(saudara_kandung[id].filecode_ktp_saudara);
                $$("input[name='fileid_ktp_saudara']").val(saudara_kandung[id].fileid_ktp_saudara);
                $$("input[name='fileurl_ktp_saudara']").val(saudara_kandung[id].fileurl_ktp_saudara);

                $$("input[name='filecode_kk_saudara']").val(saudara_kandung[id].filecode_kk_saudara);
                $$("input[name='fileid_kk_saudara']").val(saudara_kandung[id].fileid_kk_saudara);
                $$("input[name='fileurl_kk_saudara']").val(saudara_kandung[id].fileurl_kk_saudara);

                $$("input[name='filecode_sn_saudara']").val(saudara_kandung[id].filecode_sn_saudara);
                $$("input[name='fileid_sn_saudara']").val(saudara_kandung[id].fileid_sn_saudara);
                $$("input[name='fileurl_sn_saudara']").val(saudara_kandung[id].fileurl_sn_saudara);

                $$("input[name='filecode_ak_saudara']").val(saudara_kandung[id].filecode_ak_saudara);
                $$("input[name='fileid_ak_saudara']").val(saudara_kandung[id].fileid_ak_saudara);
                $$("input[name='fileurl_ak_saudara']").val(saudara_kandung[id].fileurl_ak_saudara);

                $$("input[name='filecode_pernyataan_wali_saudara']").val(saudara_kandung[id].filecode_pernyataan_wali_saudara);
                $$("input[name='fileid_pernyataan_wali_saudara']").val(saudara_kandung[id].fileid_pernyataan_wali_saudara);
                $$("input[name='fileurl_pernyataan_wali_saudara']").val(saudara_kandung[id].fileurl_pernyataan_wali_saudara);

                var preview_file_ktp = '';
                if (saudara_kandung[id].fileid_ktp_saudara != '') {
                    preview_file_ktp = '<a onclick="preview_files(' + saudara_kandung[id].fileid_ktp_saudara + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_ktp_saudara").html(preview_file_ktp);

                var preview_file_kk = '';
                if (saudara_kandung[id].fileid_kk_saudara != '') {
                    preview_file_kk = '<a onclick="preview_files(' + saudara_kandung[id].fileid_kk_saudara + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_kk_saudara").html(preview_file_kk);

                var preview_file_sn = '';
                if (saudara_kandung[id].fileid_sn_saudara != '') {
                    preview_file_sn = '<a onclick="preview_files(' + saudara_kandung[id].fileid_sn_saudara + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_sn_saudara").html(preview_file_sn);

                var preview_file_ak = '';
                if (saudara_kandung[id].fileid_ak_saudara != '') {
                    preview_file_ak = '<a onclick="preview_files(' + saudara_kandung[id].fileid_ak_saudara + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_ak_saudara").html(preview_file_ak);

                var preview_file_pernyataan_wali = '';
                if (saudara_kandung[id].fileid_pernyataan_wali_saudara != '') {
                    preview_file_pernyataan_wali = '<a onclick="preview_files(' + saudara_kandung[id].fileid_pernyataan_wali_saudara + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_pernyataan_wali_saudara").html(preview_file_pernyataan_wali);

                if (saudara_kandung[id].umur_saudara <= 17) {
                    $$('#pernyataan_wali_saudara').show();
                    $$('#wali_saudara').show();
                }

                if (saudara_kandung[id].status_kawin_saudara == 'Belum Kawin') {
                    $$('#saudara_kawin').hide();
                }

                if (saudara_kandung[id].status_hidup_saudara == 'Meninggal') {
                    $$('#saudara_meninggal').show();
                }
            });
        });

        cek_saudara_meninggal(saudara_kandung);
    }

    function cek_saudara_meninggal(saudara_kandung) {
        var keponakan = false;
        saudara_kandung.forEach(function (val, key) {
            if (val.status == 'tersimpan' && val.status_hidup_saudara == 'Meninggal') {
                keponakan = true;
            }
        });

        if (keponakan) {
            $$('#keponakan_pewaris').show();
        } else {
            $$('#keponakan_pewaris').hide();
        }
    }

    // Keponakan Pewaris
    keponakan_pewaris = new Array();
    $$('#addkeponakanpewaris').on('touchend', function () {
        popup_tambah_keponakan_pewaris();
    });

    keponakan_pewaris = data.keponakan_pewaris;
    for (var i = 0; i < keponakan_pewaris.length; i++) {
        keponakan_pewaris[i] = {
            "orang_tua_keponakan": keponakan_pewaris[i].orangtua,
            "nik_keponakan": keponakan_pewaris[i].nik,
            "nama_keponakan": keponakan_pewaris[i].nama,
            "tgl_lahir_keponakan": keponakan_pewaris[i].tgl_lahir,
            "umur_keponakan": keponakan_pewaris[i].umur,
            "alamat_keponakan": keponakan_pewaris[i].alamat,
            "status_kawin_keponakan": keponakan_pewaris[i].status_kawin,
            "status_hidup_keponakan": keponakan_pewaris[i].status_hidup,
            "nama_wali_keponakan": keponakan_pewaris[i].nama_wali,
            "hubungan_wali_keponakan": keponakan_pewaris[i].hubungan_wali,

            "fileid_ktp_keponakan": keponakan_pewaris[i].file_actual_ktp,
            "fileurl_ktp_keponakan": keponakan_pewaris[i].doc_path_ktp,
            "filecode_ktp_keponakan": keponakan_pewaris[i].doc_path_ktp,

            "fileid_kk_keponakan": keponakan_pewaris[i].file_actual_kk,
            "fileurl_kk_keponakan": keponakan_pewaris[i].doc_path_kk,
            "filecode_kk_keponakan": keponakan_pewaris[i].doc_path_kk,

            "fileid_sn_keponakan": keponakan_pewaris[i].file_actual_surat_nikah,
            "fileurl_sn_keponakan": keponakan_pewaris[i].doc_path_surat_nikah,
            "filecode_sn_keponakan": keponakan_pewaris[i].doc_path_surat_nikah,

            "fileid_ak_keponakan": keponakan_pewaris[i].file_actual_akta_kematian,
            "fileurl_ak_keponakan": keponakan_pewaris[i].doc_path_akta_kematian,
            "filecode_ak_keponakan": keponakan_pewaris[i].doc_path_akta_kematian,

            "fileid_wali_keponakan": keponakan_pewaris[i].file_actual_pernyataan_wali,
            "fileurl_pernyataan_wali_keponakan": keponakan_pewaris[i].doc_path_surat_pernyataan_wali,
            "filecode_pernyataan_wali_keponakan": keponakan_pewaris[i].doc_path_surat_pernyataan_wali,

            "status": 'tersimpan',
        }
    }
    reload_keponakan_pewaris_table(keponakan_pewaris);

    function popup_tambah_keponakan_pewaris() {
        var list_orang_tua_keponakan = '';
        saudara_kandung_pewaris.forEach(function (val, index) {
            if (val.status == "tersimpan" && val.status_hidup_saudara == "Meninggal") {
                list_orang_tua_keponakan += '<option value="' + val.nama_saudara + '">' + val.nama_saudara + '</option>';
            }
        });
        var popup_keponakan = app.popup.create({
            content: '<div class="popup page-content">' +
                '<div class="block">' +
                '<form class="list" id="tambah_keponakan_pewaris" data-id="null">' +
                '<div class="block-title">' +
                '<div class="row">' +
                '<div class="col-100">' +
                '<div class="chip color-blue">' +
                '<div class="chip-label">Form Tambah Keponakan Pewaris</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<ul id="formupload-wrapper-list-waris">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Nama Orang Tua</div>' +
                '<div class="item-input-wrap input-dropdown-wrap">' +
                '<select name="orang_tua_keponakan">' +
                list_orang_tua_keponakan +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">NIK</div>' +
                '<div class="item-input-wrap">' +
                '<input type="number" name="nik_keponakan">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Nama</div>' +
                '<div class="item-input-wrap">' +
                '<input type="text" name="nama_keponakan">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Tanggal Lahir</div>' +
                '<div class="item-input-wrap">' +
                '<input type="date" name="tgl_lahir_keponakan">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Umur</div>' +
                '<div class="item-input-wrap">' +
                '<input type="number" name="umur_keponakan" id="umur_keponakan">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Alamat</div>' +
                '<div class="item-input-wrap">' +
                '<textarea class="resizable" name="alamat_keponakan"></textarea>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Status Kawin</div>' +
                '<div class="item-input-wrap input-dropdown-wrap">' +
                '<select name="status_kawin_keponakan" id="status_kawin_keponakan">' +
                '<option value="Sudah Kawin">SUDAH KAWIN</option>' +
                '<option value="Belum Kawin">BELUM KAWIN</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Status Hidup</div>' +
                '<div class="item-input-wrap input-dropdown-wrap">' +
                '<select name="status_hidup_keponakan" id="status_hidup_keponakan">' +
                '<option value="Hidup">HIDUP</option>' +
                '<option value="Meninggal">MENINGGAL</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<div id="wali_keponakan" style="display: none;">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Nama Wali</div>' +
                '<div class="item-input-wrap">' +
                '<input type="text" name="nama_wali_keponakan">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">Hubungan dengan yang diwakili</div>' +
                '<div class="item-input-wrap">' +
                '<input type="text" name="hubungan_wali_keponakan">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</div>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">KTP</div>' +
                '<div class="item-input-wrap">' +
                '<input id="fileid_ktp_keponakan" class="fileid" type="hidden" name="fileid_ktp_keponakan">' +
                '<input  id="filecode_ktp_keponakan" type="hidden" readonly name="filecode_ktp_keponakan">' +
                '<input  id="fileurl_ktp_keponakan" type="text" name="fileurl_ktp_keponakan" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ktp_keponakan"></div>' +
                '<div class="col-20">' +
                '<a id="_ktp_keponakan" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-title item-label">KK</div>' +
                '<div class="item-input-wrap">' +
                '<input id="fileid_kk_keponakan" class="fileid" type="hidden" name="fileid_kk_keponakan">' +
                '<input id="filecode_kk_keponakan" type="hidden" readonly name="filecode_kk_keponakan">' +
                '<input id="fileurl_kk_keponakan" type="text" name="fileurl_kk_keponakan" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_kk_keponakan"></div>' +
                '<div class="col-20">' +
                '<a id="_kk_keponakan" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li data-index="sn_keponakan" id="keponakan_kawin">' +
                '<ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Buku Nikah</div>' +
                '<input id="fileid_sn_keponakan" class="fileid" type="hidden" name="fileid_sn_keponakan">' +
                '<input  id="filecode_sn_keponakan" type="hidden" readonly name="filecode_sn_keponakan">' +
                '<input  id="fileurl_sn_keponakan" type="text" name="fileurl_sn_keponakan" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_sn_keponakan"></div>' +
                '<div class="col-20">' +
                '<a id="_sn_keponakan" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</li>' +
                '<li data-index="ak_keponakan" id="keponakan_meninggal" style="display: none;">' +
                '<ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Akta Kematian</div>' +
                '<input id="fileid_ak_keponakan" class="fileid" type="hidden" name="fileid_ak_keponakan">' +
                '<input  id="filecode_ak_keponakan" type="hidden" readonly name="filecode_ak_keponakan">' +
                '<input  id="fileurl_ak_keponakan" type="text" name="fileurl_ak_keponakan" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ak_keponakan"></div>' +
                '<div class="col-20">' +
                '<a id="_ak_keponakan" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</li>' +
                '<li data-index="pernyataan_wali_keponakan" id="pernyataan_wali_keponakan" style="display: none;">' +
                '<ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Surat Pernyataan Wali</div>' +
                '<input id="fileid_pernyataan_wali_keponakan" class="fileid" type="hidden" name="fileid_pernyataan_wali_keponakan">' +
                '<input  id="filecode_pernyataan_wali_keponakan" type="hidden" readonly name="filecode_pernyataan_wali_keponakan">' +
                '<input  id="fileurl_pernyataan_wali_keponakan" type="text" name="fileurl_pernyataan_wali_keponakan" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_pernyataan_wali_keponakan"></div>' +
                '<div class="col-20">' +
                '<a id="_pernyataan_wali_keponakan" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</li>' +
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
                '<a class="button button-round button-fill color-green" id="save_keponakan_pewaris" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
                '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',
            on: {
                open: function () {
                    $$('#status_kawin_keponakan').on('change', function () {
                        $$('#fileid_sn_keponakan').val('');
                        $$('#filecode_sn_keponakan').val('');
                        $$('#fileurl_sn_keponakan').val('');
                        $$('.preview_file_sn_keponakan').html('');

                        if ($(this).val() == 'Sudah Kawin') {
                            $$('#keponakan_kawin').show();
                        } else {
                            $$('#keponakan_kawin').hide();
                        }
                    });

                    $$('#status_hidup_keponakan').on('change', function () {
                        $$('#fileid_ak_keponakan').val('');
                        $$('#filecode_ak_keponakan').val('');
                        $$('#fileurl_ak_keponakan').val('');
                        $$('.preview_file_ak_keponakan').html('');

                        if ($(this).val() == 'Meninggal') {
                            $$('#keponakan_meninggal').show();
                        } else {
                            $$('#keponakan_meninggal').hide();
                        }
                    });

                    $$('#umur_keponakan').on('input', function () {
                        $$('#wali_keponakan input').val('');

                        $$('#fileid_pernyataan_wali_keponakan').val('');
                        $$('#filecode_pernyataan_wali_keponakan').val('');
                        $$('#fileurl_pernyataan_wali_keponakan').val('');
                        $$('.preview_file_pernyataan_wali_keponakan').html('');

                        if ($(this).val() <= 17 && $(this).val() != '') {
                            $$('#pernyataan_wali_keponakan').show();
                            $$('#wali_keponakan').show();
                        } else {
                            $$('#pernyataan_wali_keponakan').hide();
                            $$('#wali_keponakan').hide();
                        }
                    });
                },
            }
        });
        popup_keponakan.open();
        $$("#save_keponakan_pewaris").on('click', function () {
            popup_keponakan.close();
            if ($("#tambah_keponakan_pewaris").data("id") !== null) {
                id = $("#tambah_keponakan_pewaris").data("id");
                keponakan_pewaris[id] = app.form.convertToData("#tambah_keponakan_pewaris");
            } else {
                keponakan_pewaris.push(app.form.convertToData("#tambah_keponakan_pewaris"));
            }
            reload_keponakan_pewaris_table(keponakan_pewaris);
        });
    }

    function reload_keponakan_pewaris_table(keponakan) {
        keponakan_pewaris_row = '';
        keponakan.forEach(function (val, key) {
            if (val.status == 'tersimpan') {
                keponakan_pewaris_row += '<tr>' +
                    '<td class="label-cell aksi-table" style="padding: 0 12px;"><a data-id="' + key + '" class="edit_keponakan button button-small color-blue button-fill">EDIT</a></td>' +
                    '<td class="label-cell hapus-table" style="padding: 0 12px 0 0;"><a data-id="' + key + '"  class="hapus_keponakan button color-red button-fill button-small">HAPUS</a></td>' +
                    '<td class="label-cell">' + val.orang_tua_keponakan + '</td>' +
                    '<td class="label-cell">' + val.nik_keponakan + '</td>' +
                    '<td class="label-cell">' + val.nama_keponakan + '</td>' +
                    '<td class="label-cell">' + val.tgl_lahir_keponakan + '</td>' +
                    '<td class="label-cell">' + val.umur_keponakan + '</td>' +
                    '<td class="label-cell">' + val.alamat_keponakan + '</td>' +
                    '<td class="label-cell">' + val.status_kawin_keponakan + '</td>' +
                    '<td class="label-cell">' + val.status_hidup_keponakan + '</td>' +
                    '<td class="label-cell">' + val.nama_wali_keponakan + '</td>' +
                    '<td class="label-cell">' + val.hubungan_wali_keponakan + '</td>' +
                    '<td class="label-cell">';
                if (val.fileid_ktp_keponakan != '') {
                    keponakan_pewaris_row += '<a data-id="' + key + '" onclick="preview_files(' + val.fileid_ktp_keponakan + ')" class="button color-blue button-fill button-small">KTP</a>';
                }
                keponakan_pewaris_row += '</td>' +
                    '<td class="label-cell">';
                if (val.fileid_kk_keponakan != '') {
                    keponakan_pewaris_row += '<a data-id="' + key + '" onclick="preview_files(' + val.fileid_kk_keponakan + ')" class="button color-blue button-fill button-small">KK</a>';
                }
                keponakan_pewaris_row += '</td>';
                if (val.fileid_sn_keponakan != '') {
                    keponakan_pewaris_row += '<td class="label-cell"><a data-id="' + key + '" onclick="preview_files(' + val.fileid_sn_keponakan + ')" class="button color-blue button-fill button-small">SURAT NIKAH</a></td>';
                }
                if (val.fileid_ak_keponakan != '') {
                    keponakan_pewaris_row += '<td class="label-cell"><a data-id="' + key + '" onclick="preview_files(' + val.fileid_ak_keponakan + ')" class="button color-blue button-fill button-small">AKTA KEMATIAN</a></td>';
                }
                if (val.fileid_pernyataan_wali_keponakan != '') {
                    keponakan_pewaris_row += '<td class="label-cell"><a data-id="' + key + '" onclick="preview_files(' + val.fileid_pernyataan_wali_keponakan + ')" class="button color-blue button-fill button-small">SURAT PERWALIAN</a></td>';
                }
                keponakan_pewaris_row += '<td class="label-cell"></td>' +
                    '</tr>';
            }
        })

        if (keponakan_pewaris_row !== '') {
            $$('#anggota_keponakan_pewaris_table table tbody').html(keponakan_pewaris_row);
        } else {
            $$('#anggota_keponakan_pewaris_table table tbody').html('<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="numeric-cell"></td>' +
                '<td class="label-cell">Data Kosong</td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>' +
                '<td class="label-cell"></td>');
        }

        $$(".hapus_keponakan").on('click', function () {
            keponakan_pewaris_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin Menghapus data?', function () {
                keponakan[keponakan_pewaris_id].status = 'terhapus';
                reload_keponakan_pewaris_table(keponakan);
            });
        });

        $$(".edit_keponakan").on('click', function () {
            id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin akan merubah data?', function () {
                popup_tambah_keponakan_pewaris();
                $$("#tambah_keponakan_pewaris").attr("data-id", id);
                $$("select[name='orang_tua_keponakan']").val(keponakan[id].orang_tua_keponakan);
                $$("input[name='nik_keponakan']").val(keponakan[id].nik_keponakan);
                $$("input[name='nama_keponakan']").val(keponakan[id].nama_keponakan);
                $$("input[name='tgl_lahir_keponakan']").val(keponakan[id].tgl_lahir_keponakan);
                $$("input[name='umur_keponakan']").val(keponakan[id].umur_keponakan);
                $$("textarea[name='alamat_keponakan']").text(keponakan[id].alamat_keponakan);
                $$("select[name='status_kawin_keponakan']").val(keponakan[id].status_kawin_keponakan);
                $$("select[name='status_hidup_keponakan']").val(keponakan[id].status_hidup_keponakan);
                $$("input[name='nama_wali_keponakan']").val(keponakan[id].nama_wali_keponakan);
                $$("input[name='hubungan_wali_keponakan']").val(keponakan[id].hubungan_wali_keponakan);

                $$("input[name='filecode_ktp_keponakan']").val(keponakan[id].filecode_ktp_keponakan);
                $$("input[name='fileid_ktp_keponakan']").val(keponakan[id].fileid_ktp_keponakan);
                $$("input[name='fileurl_ktp_keponakan']").val(keponakan[id].fileurl_ktp_keponakan);

                $$("input[name='filecode_kk_keponakan']").val(keponakan[id].filecode_kk_keponakan);
                $$("input[name='fileid_kk_keponakan']").val(keponakan[id].fileid_kk_keponakan);
                $$("input[name='fileurl_kk_keponakan']").val(keponakan[id].fileurl_kk_keponakan);

                $$("input[name='filecode_sn_keponakan']").val(keponakan[id].filecode_sn_keponakan);
                $$("input[name='fileid_sn_keponakan']").val(keponakan[id].fileid_sn_keponakan);
                $$("input[name='fileurl_sn_keponakan']").val(keponakan[id].fileurl_sn_keponakan);

                $$("input[name='filecode_ak_keponakan']").val(keponakan[id].filecode_ak_keponakan);
                $$("input[name='fileid_ak_keponakan']").val(keponakan[id].fileid_ak_keponakan);
                $$("input[name='fileurl_ak_keponakan']").val(keponakan[id].fileurl_ak_keponakan);

                $$("input[name='filecode_pernyataan_wali_keponakan']").val(keponakan[id].filecode_pernyataan_wali_keponakan);
                $$("input[name='fileid_pernyataan_wali_keponakan']").val(keponakan[id].fileid_pernyataan_wali_keponakan);
                $$("input[name='fileurl_pernyataan_wali_keponakan']").val(keponakan[id].fileurl_pernyataan_wali_keponakan);

                var preview_file_ktp = '';
                if (keponakan[id].fileid_ktp_keponakan != '') {
                    preview_file_ktp = '<a onclick="preview_files(' + keponakan[id].fileid_ktp_keponakan + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_ktp_keponakan").html(preview_file_ktp);

                var preview_file_kk = '';
                if (keponakan[id].fileid_kk_keponakan != '') {
                    preview_file_kk = '<a onclick="preview_files(' + keponakan[id].fileid_kk_keponakan + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_kk_keponakan").html(preview_file_kk);

                var preview_file_sn = '';
                if (keponakan[id].fileid_sn_keponakan != '') {
                    preview_file_sn = '<a onclick="preview_files(' + keponakan[id].fileid_sn_keponakan + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_sn_keponakan").html(preview_file_sn);

                var preview_file_ak = '';
                if (keponakan[id].fileid_ak_keponakan != '') {
                    preview_file_ak = '<a onclick="preview_files(' + keponakan[id].fileid_ak_keponakan + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_ak_keponakan").html(preview_file_ak);

                var preview_file_pernyataan_wali = '';
                if (keponakan[id].fileid_pernyataan_wali_keponakan != '') {
                    preview_file_pernyataan_wali = '<a onclick="preview_files(' + keponakan[id].fileid_pernyataan_wali_keponakan + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_pernyataan_wali_keponakan").html(preview_file_pernyataan_wali);

                if (keponakan[id].umur_keponakan <= 17) {
                    $$('#pernyataan_wali_keponakan').show();
                    $$('#wali_keponakan').show();
                }

                if (keponakan[id].status_kawin_keponakan == 'Belum Kawin') {
                    $$('#keponakan_kawin').hide();
                }

                if (keponakan[id].status_hidup_keponakan == 'Meninggal') {
                    $$('#keponakan_meninggal').show();
                }
            });
        });
    }
}
