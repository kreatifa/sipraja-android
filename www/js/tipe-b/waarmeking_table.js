function waarmeking_table_create() {
    // ahli waris start
    ahli_waris = new Array();
    $$('#addahliwaris').on('touchend', function () {
        popup_tambah_ahli_waris();
    });

    function popup_tambah_ahli_waris() {
        var popup_anggota = app.popup.create({
            content: '<div class="popup page-content">' +
                '<div class="block">' +
                '<form class="list" id="tambah_ahli_waris" data-id="null">' +
                '<div class="block-title">' +
                '<div class="row">' +
                '<div class="col-100">' +
                '<div class="chip color-blue">' +
                '<div class="chip-label">Form Tambah Ahli Waris</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<ul id="formupload-wrapper-list-waris">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Hubungan Keluarga</div>' +
                '<select name="hubungan_keluarga">' +
                '<option value="Kakek">KAKEK</option>' +
                '<option value="Nenek">NENEK</option>' +
                '<option value="Suami">SUAMI</option>' +
                '<option value="Istri">ISTRI</option>' +
                '<option value="Anak Kandung">ANAK KANDUNG</option>' +
                '<option value="Anak Angkat">ANAK ANGKAT</option>' +
                '<option value="Saudara">SAUDARA</option>' +
                '<option value="Cucu Kandung">CUCU DARI ANAK KANDUNG</option>' +
                '<option value="Cucu Angkat">CUCU DARI ANAK ANGKAT</option>' +
                '<option value="Keponakan">KEPONAKAN</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">NIK</div>' +
                '<input type="number" name="nik_ahli_waris">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Nama</div>' +
                '<input type="text" name="nama_ahli_waris">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Tanggal Lahir</div>' +
                '<input type="date" name="tgl_lahir_ahli_waris">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Umur</div>' +
                '<input type="number" name="umur_ahli_waris" id="umur_ahli_waris">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Telepon</div>' +
                '<input type="number" name="telepon_ahli_waris" id="telepon_ahli_waris">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Alamat</div>' +
                '<textarea class="resizable" name="alamat_ahli_waris"></textarea>' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Status Hidup</div>' +
                '<select name="status_hidup_ahli_waris" id="status_hidup_ahli_waris">' +
                '<option value="Hidup">HIDUP</option>' +
                '<option value="Meninggal">MENINGGAL</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Kehadiran Menghadap Ketua Pengadilan Negeri</div>' +
                '<select name="kehadiran_ahli_waris" id="kehadiran_ahli_waris">' +
                '<option value="Ya">Ya</option>' +
                '<option value="Tidak">Tidak</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<div id="umur17kebawah" style="display: none;">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Nama Wali</div>' +
                '<input type="text" name="nama_wali_ahli_waris">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Hubungan dengan yang diwakili</div>' +
                '<input type="text" name="hubungan_wali_ahli_waris">' +
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
                '<input id="fileid_ktp_ahli_waris" class="fileid" type="hidden" name="fileid_ktp_ahli_waris">' +
                '<input id="filecode_ktp_ahli_waris" type="hidden" readonly name="filecode_ktp_ahli_waris">' +
                '<input  id="fileurl_ktp_ahli_waris" type="text" name="fileurl_ktp_ahli_waris" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ktp_ahli_waris">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_ktp_ahli_waris" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
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
                '<input id="fileid_kk_ahli_waris" class="fileid" type="hidden" name="fileid_kk_ahli_waris">' +
                '<input id="filecode_kk_ahli_waris" type="hidden" readonly name="filecode_kk_ahli_waris">' +
                '<input id="fileurl_kk_ahli_waris" type="text" name="fileurl_kk_ahli_waris" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_kk_ahli_waris">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_kk_ahli_waris" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
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
                '<div class="item-title item-label" id="akta_kelahiran_ahli_waris">Akte Kelahiran</div>' +
                '<input id="fileid_akta_kelahiran_ahli_waris" class="fileid" type="hidden" name="fileid_akta_kelahiran_ahli_waris">' +
                '<input id="filecode_akta_kelahiran_ahli_waris" type="hidden" readonly name="filecode_akta_kelahiran_ahli_waris">' +
                '<input id="fileurl_akta_kelahiran_ahli_waris" type="text" name="fileurl_akta_kelahiran_ahli_waris" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_akta_kelahiran_ahli_waris">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_akta_kelahiran_ahli_waris" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                // '<li class="item-content item-input">' +
                // '<div class="item-inner">' +
                // '<div class="row">' +
                // '<div class="col-60">' +
                // '<div class="item-inner">' +
                // '<div class="item-input-wrap">' +
                // '<div class="item-title item-label" id="buku_tabungan_ahli_waris">Buku Tabungan / Deposito / Taspen / Sertifikan Agunan</div>' +
                // '<input id="fileid_buku_tabungan_ahli_waris" class="fileid" type="hidden" name="fileid_buku_tabungan_ahli_waris">' +
                // '<input id="filecode_buku_tabungan_ahli_waris" type="hidden" readonly name="filecode_buku_tabungan_ahli_waris">' +
                // '<input id="fileurl_buku_tabungan_ahli_waris" type="text" name="fileurl_buku_tabungan_ahli_waris" readonly>' +
                // '</div>' +
                // '</div>' +
                // '</div>' +
                // '<div class="col-20 preview_file_buku_tabungan_ahli_waris">' +
                // '</div>' +
                // '<div class="col-20">' +
                // '<a id="_buku_tabungan_ahli_waris" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                // '</div>' +
                // '</div>' +
                // '</div>' +
                // '</li>' +
                '<div id="status_hidup_ahli_waris_meninggal" style="display: none;">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Akta Kematian</div>' +
                '<input id="fileid_ak_ahli_waris" class="fileid" type="hidden" name="fileid_ak_ahli_waris">' +
                '<input id="filecode_ak_ahli_waris" type="hidden" readonly name="filecode_ak_ahli_waris">' +
                '<input id="fileurl_ak_ahli_waris" type="text" name="fileurl_ak_ahli_waris" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ak_ahli_waris">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_ak_ahli_waris" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</div>' +
                '<div id="pernyataan_wali_ahli_waris" style="display: none;">' +
                '<li data-index="wali"><ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Surat Pernyataan Perwalian Bermaterai</div>' +
                '<input id="fileid_wali_ahli_waris" class="fileid" type="hidden" name="fileid_wali_ahli_waris">' +
                '<input id="filecode_wali_ahli_waris" type="hidden" readonly name="filecode_wali_ahli_waris">' +
                '<input id="fileurl_wali_ahli_waris" type="text" name="fileurl_wali_ahli_waris" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_wali_ahli_waris">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_wali_ahli_waris" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul></li>' +
                '</div>' +
                '<div id="berhalangan_ahli_waris" style="display: none;">' +
                '<li data-index="wali"><ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Alasan Berhalanagan Menghadap Ketua Pengadilan Negeri</div>' +
                '<input id="fileid_alasan_ahli_waris" class="fileid" type="hidden" name="fileid_alasan_ahli_waris">' +
                '<input id="filecode_alasan_ahli_waris" type="hidden" readonly name="filecode_alasan_ahli_waris">' +
                '<input id="fileurl_alasan_ahli_waris" type="text" name="fileurl_alasan_ahli_waris" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_alasan_ahli_waris">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_alasan_ahli_waris" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
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
                '<a class="button button-round button-fill color-green" id="save_ahli_waris" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
                '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',
            on: {
                open: function () {
                    $$('#status_hidup_ahli_waris').on('change', function () {
                        $$('#fileid_ak_ahli_waris').val('');
                        $$('#filecode_ak_ahli_waris').val('');
                        $$('#fileurl_ak_ahli_waris').val('');
                        $$('.preview_file_ak_ahli_waris').html('');
                        if ($(this).val() == 'Meninggal') {
                            $$('#status_hidup_ahli_waris_meninggal').show();
                        } else {
                            $$('#status_hidup_ahli_waris_meninggal').hide();
                        }
                    });

                    $$('#umur_ahli_waris').on('input', function () {
                        $$('#umur17kebawah input').val('');

                        $$('#fileid_pernyataan_wali_ahli_waris').val('');
                        $$('#filecode_pernyataan_wali_ahli_waris').val('');
                        $$('#fileurl_pernyataan_wali_ahli_waris').val('');
                        $$('.preview_file_pernyataan_wali_ahli_waris').html('');
                        if ($(this).val() <= 17) {
                            $$('#ktpanak').html('KTP Wali');
                            $$('#kkanak').html('KK Wali');
                            $$('#umur17kebawah').show();
                            $$('#pernyataan_wali_ahli_waris').show();
                        } else {
                            $$('#ktpanak').html('KTP');
                            $$('#kkanak').html('KK');
                            $$('#umur17kebawah').hide();
                            $$('#pernyataan_wali_ahli_waris').hide();
                        }
                    });

                    $$('#kehadiran_ahli_waris').on('change', function () {
                        if ($(this).val() == "Ya") {
                            $$('#berhalangan_ahli_waris').hide();
                        } else {
                            $$('#berhalangan_ahli_waris').show();
                        }
                    });

                    if (iamthedoor.role_id != 4) {
                        $$('#save_ahli_waris').hide();
                    }
                },
            }
        });
        popup_anggota.open();
        $$("#save_ahli_waris").on('click', function () {

            popup_anggota.close();
            if ($("#tambah_ahli_waris").data("id") !== null) {
                ahli_waris_id = $("#tambah_ahli_waris").data("id");
                ahli_waris[ahli_waris_id] = app.form.convertToData("#tambah_ahli_waris");
            } else {
                ahli_waris.push(app.form.convertToData("#tambah_ahli_waris"));
            }
            reload_ahli_waris_table(ahli_waris);
        });
    }

    function reload_ahli_waris_table(ahli_waris_key) {
        ahli_waris_html = '<tr><td></td><td>Data Kosong</td><td></td></tr>';
        $$("#ahli_waris_table table tbody").html(ahli_waris_html);
        ahli_waris_row = '';
        for (var i = 0; i < ahli_waris_key.length; i++) {
            if (ahli_waris_key[i].status == "tersimpan") {
                ahli_waris_row += '<tr>' +
                    '<td class="label-cell aksi-table" style="padding: 0 12px;"><a data-id="' + [i] + '" class="edit_ahli_waris button button-small color-blue button-fill">EDIT</a></td>' +
                    '<td class="label-cell hapus-table" style="padding: 0 12px 0 0;"><a data-id="' + [i] + '"  class="hapus_ahli_waris button color-red button-fill button-small">HAPUS</a></td>' +
                    '<td class="label-cell">' + ahli_waris_key[i].hubungan_keluarga + '</td>' +
                    '<td class="label-cell">' + ahli_waris_key[i].nik_ahli_waris + '</td>' +
                    '<td class="label-cell">' + ahli_waris_key[i].nama_ahli_waris + '</td>' +
                    '<td class="label-cell">' + ahli_waris_key[i].tgl_lahir_ahli_waris + '</td>' +
                    '<td class="label-cell">' + ahli_waris_key[i].umur_ahli_waris + '</td>' +
                    '<td class="label-cell">' + ahli_waris_key[i].telepon_ahli_waris + '</td>' +
                    '<td class="label-cell">' + ahli_waris_key[i].alamat_ahli_waris + '</td>' +
                    '<td class="label-cell">' + ahli_waris_key[i].status_hidup_ahli_waris + '</td>' +
                    '<td class="label-cell">' + ahli_waris_key[i].kehadiran_ahli_waris + '</td>' +
                    '<td class="label-cell">' + ahli_waris_key[i].nama_wali_ahli_waris + '</td>' +
                    '<td class="label-cell">' + ahli_waris_key[i].hubungan_wali_ahli_waris + '</td>' +
                    '<td class="label-cell">';
                if (ahli_waris_key[i].fileid_ktp_ahli_waris != '') {
                    ahli_waris_row += '<a data-id="' + [i] + '" onclick="preview_files(' + ahli_waris_key[i].fileid_ktp_ahli_waris + ')" class="ktp_anggota button color-blue button-fill button-small">KTP</a></td>';
                }
                if (ahli_waris_key[i].fileid_kk_ahli_waris != '') {
                    ahli_waris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + ahli_waris_key[i].fileid_kk_ahli_waris + ')" class="kk_anggota button color-blue button-fill button-small">KK</a></td>';
                }
                if (ahli_waris_key[i].fileid_akta_kelahiran_ahli_waris != '') {
                    ahli_waris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + ahli_waris_key[i].fileid_akta_kelahiran_ahli_waris + ')" class="kk_anggota button color-blue button-fill button-small">AKTA KELAHIRAN</a></td>';
                }
                // if (ahli_waris_key[i].fileid_buku_tabungan_ahli_waris != '') {
                //     ahli_waris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + ahli_waris_key[i].fileid_buku_tabungan_ahli_waris + ')" class="kk_anggota button color-blue button-fill button-small">BUKU TABUNGAN</a></td>';
                // }
                if (ahli_waris_key[i].fileid_ak_ahli_waris != '') {
                    ahli_waris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + ahli_waris_key[i].fileid_ak_ahli_waris + ')" class="ktp_anggota button color-blue button-fill button-small">AKTA KEMATIAN</a></td>';
                }
                if (ahli_waris_key[i].fileid_wali_ahli_waris != '') {
                    ahli_waris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + ahli_waris_key[i].fileid_wali_ahli_waris + ')" class="kk_anggota button color-blue button-fill button-small">SURAT PERWALIAN</a></td>';
                }
                if (ahli_waris_key[i].fileid_alasan_ahli_waris != '') {
                    ahli_waris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + ahli_waris_key[i].fileid_alasan_ahli_waris + ')" class="kk_anggota button color-blue button-fill button-small">ALASAN BERHALANGAN MENGHADAP KETUA PENGADILAN NEGERI</a></td>';
                }
                ahli_waris_row += '</tr>';
            }
        }
        if (ahli_waris_row !== '') {
            $$("#ahli_waris_table table tbody").html(ahli_waris_row);
        }
        if (iamthedoor.role_id != 4) {
            $$('.hapus-table').hide();
        }

        $$(".hapus_ahli_waris").on('click', function () {
            ahli_waris_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin Menghapus data?', function () {
                ahli_waris_key[ahli_waris_id].status = 'terhapus';
                reload_ahli_waris_table(ahli_waris_key);
            });
        });

        $$(".edit_ahli_waris").on('click', function () {
            ahli_waris_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin akan merubah data?', function () {
                popup_tambah_ahli_waris();
                $$("#tambah_ahli_waris").attr("data-id", ahli_waris_id);
                $$("select[name='hubungan_keluarga']").val(ahli_waris_key[ahli_waris_id].hubungan_keluarga);
                $$("input[name='nik_ahli_waris']").val(ahli_waris_key[ahli_waris_id].nik_ahli_waris);
                $$("input[name='nama_ahli_waris']").val(ahli_waris_key[ahli_waris_id].nama_ahli_waris);
                $$("input[name='tgl_lahir_ahli_waris']").val(ahli_waris_key[ahli_waris_id].tgl_lahir_ahli_waris);
                $$("input[name='umur_ahli_waris']").val(ahli_waris_key[ahli_waris_id].umur_ahli_waris);
                $$("input[name='telepon_ahli_waris']").val(ahli_waris_key[ahli_waris_id].telepon_ahli_waris);
                $$("textarea[name='alamat_ahli_waris']").val(ahli_waris_key[ahli_waris_id].alamat_ahli_waris);
                $$("select[name='status_hidup_ahli_waris']").val(ahli_waris_key[ahli_waris_id].status_hidup_ahli_waris);
                $$("select[name='kehadiran_ahli_waris']").val(ahli_waris_key[ahli_waris_id].kehadiran_ahli_waris);
                $$("input[name='nama_wali_ahli_waris']").val(ahli_waris_key[ahli_waris_id].nama_wali_ahli_waris);
                $$("input[name='hubungan_wali_ahli_waris']").val(ahli_waris_key[ahli_waris_id].hubungan_wali_ahli_waris);

                $$("input[name='filecode_ktp_ahli_waris']").val(ahli_waris_key[ahli_waris_id].filecode_ktp_ahli_waris);
                $$("input[name='fileid_ktp_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileid_ktp_ahli_waris);
                $$("input[name='fileurl_ktp_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileurl_ktp_ahli_waris);

                $$("input[name='filecode_kk_ahli_waris']").val(ahli_waris_key[ahli_waris_id].filecode_kk_ahli_waris);
                $$("input[name='fileid_kk_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileid_kk_ahli_waris);
                $$("input[name='fileurl_kk_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileurl_kk_ahli_waris);

                $$("input[name='filecode_akta_kelahiran_ahli_waris']").val(ahli_waris_key[ahli_waris_id].filecode_akta_kelahiran_ahli_waris);
                $$("input[name='fileid_akta_kelahiran_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileid_akta_kelahiran_ahli_waris);
                $$("input[name='fileurl_akta_kelahiran_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileurl_akta_kelahiran_ahli_waris);

                // $$("input[name='filecode_buku_tabungan_ahli_waris']").val(ahli_waris_key[ahli_waris_id].filecode_buku_tabungan_ahli_waris);
                // $$("input[name='fileid_buku_tabungan_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileid_buku_tabungan_ahli_waris);
                // $$("input[name='fileurl_buku_tabungan_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileurl_buku_tabungan_ahli_waris);

                $$("input[name='filecode_ak_ahli_waris']").val(ahli_waris_key[ahli_waris_id].filecode_ak_ahli_waris);
                $$("input[name='fileid_ak_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileid_ak_ahli_waris);
                $$("input[name='fileurl_ak_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileurl_ak_ahli_waris);

                $$("input[name='filecode_wali_ahli_waris']").val(ahli_waris_key[ahli_waris_id].filecode_wali_ahli_waris);
                $$("input[name='fileid_wali_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileid_wali_ahli_waris);
                $$("input[name='fileurl_wali_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileurl_wali_ahli_waris);

                $$("input[name='filecode_alasan_ahli_waris']").val(ahli_waris_key[ahli_waris_id].filecode_alasan_ahli_waris);
                $$("input[name='fileid_alasan_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileid_alasan_ahli_waris);
                $$("input[name='fileurl_alasan_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileurl_alasan_ahli_waris);

                if (ahli_waris_key[ahli_waris_id].fileid_ktp_ahli_waris != '') {
                    var preview_file_ktp = '<a id="_ktp_ahli_waris" onclick="preview_files(' + ahli_waris_key[ahli_waris_id].fileid_ktp_ahli_waris + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_ktp_ahli_waris").html(preview_file_ktp);

                if (ahli_waris_key[ahli_waris_id].fileid_kk_ahli_waris != '') {
                    var preview_file_kk = '<a id="_kk_ahli_waris" onclick="preview_files(' + ahli_waris_key[ahli_waris_id].fileid_kk_ahli_waris + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_kk_ahli_waris").html(preview_file_kk);

                if (ahli_waris_key[ahli_waris_id].fileid_akta_kelahiran_ahli_waris != '') {
                    var preview_file_akta_kelahiran = '<a id="_akta_kelahiran_ahli_waris" onclick="preview_files(' + ahli_waris_key[ahli_waris_id].fileid_akta_kelahiran_ahli_waris + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_akta_kelahiran_ahli_waris").html(preview_file_akta_kelahiran);

                // if (ahli_waris_key[ahli_waris_id].fileid_buku_tabungan_ahli_waris != '') {
                //     var preview_file_buku_tabungan = '<a id="_buku_tabungan_ahli_waris" onclick="preview_files(' + ahli_waris_key[ahli_waris_id].fileid_buku_tabungan_ahli_waris + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                // }
                // $$(".preview_file_buku_tabungan_ahli_waris").html(preview_file_buku_tabungan);

                if (ahli_waris_key[ahli_waris_id].fileid_ak_ahli_waris != '') {
                    var preview_file_ak = '<a id="_ak_ahli_waris" onclick="preview_files(' + ahli_waris_key[ahli_waris_id].fileid_ak_ahli_waris + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_ak_ahli_waris").html(preview_file_ak);

                if (ahli_waris_key[ahli_waris_id].fileid_wali_ahli_waris != '') {
                    var preview_file_wali = '<a id="_wali_ahli_waris" onclick="preview_files(' + ahli_waris_key[ahli_waris_id].fileid_wali_ahli_waris + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_wali_ahli_waris").html(preview_file_wali);

                if (ahli_waris_key[ahli_waris_id].fileid_alasan_ahli_waris != '') {
                    var preview_file_alasan = '<a id="_alasan_ahli_waris" onclick="preview_files(' + ahli_waris_key[ahli_waris_id].fileid_alasan_ahli_waris + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_alasan_ahli_waris").html(preview_file_alasan);

                if (ahli_waris_key[ahli_waris_id].umur_ahli_waris <= 17) {
                    $$('#umur17kebawah').show();
                    $$('#pernyataan_wali_ahli_waris').show();
                }

                if (ahli_waris_key[ahli_waris_id].status_hidup_ahli_waris == 'Meninggal') {
                    $$('#status_hidup_ahli_waris_meninggal').show();
                }

                if (ahli_waris_key[ahli_waris_id].kehadiran_ahli_waris == 'Tidak') {
                    $$('#berhalangan_ahli_waris').show();
                }
            });
        });
    }
    // ahli waris end

    // tujuan start
    tujuan = new Array();
    $$('#addtujuan').on('touchend', function () {
        popup_tambah_tujuan();
    });

    function popup_tambah_tujuan() {
        var popup_tujuan = app.popup.create({
            content: '<div class="popup page-content">' +
                '<div class="block">' +
                '<form class="list" id="tambah_tujuan" data-id="null">' +
                '<div class="block-title">' +
                '<div class="row">' +
                '<div class="col-100">' +
                '<div class="chip color-blue">' +
                '<div class="chip-label">Form Tambah Tujuan</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<ul id="formupload-wrapper-list-waris">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Jenis Tujuan</div>' +
                '<select name="tujuan_waarmeking" id="tujuan_waarmeking">' +
                // '<option value="Asuransi">ASURANSI</option>' +
                // '<option value="Tapenas">TAPENAS</option>' +
                // '<option value="Buku Bank Deposit">BUKU BANK DEPOSIT</option>' +
                // '<option value="Buku Tenaga Kerja">BUKU TENAGA KERJA</option>' +
                // '<option value="Dll">DLL</option>' +
                '<option value="PENCAIRAN TABUNGAN">PENCAIRAN TABUNGAN</option>' +
                '<option value="PENCAIRAN DEPOSITO">PENCAIRAN DEPOSITO</option>' +
                '<option value="PENCAIRAN BPJS KETENAGAKERJAAN">PENCAIRAN BPJS KETENAGAKERJAAN</option>' +
                '<option value="PENCAIRAN BPJS KESEHATAN">PENCAIRAN BPJS KESEHATAN</option>' +
                '<option value="PENGAMBILAN BPKB">PENGAMBILAN BPKB</option>' +
                '<option value="PENGAMBILAN SERTIFIKAT">PENGAMBILAN SERTIFIKAT</option>' +
                '<option value="PENCAIRAN TASPEN">PENCAIRAN TASPEN</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input nama_pemilik">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Nama Pemilik</div>' +
                '<input type="text" name="nama_pemilik" id="nama_pemilik">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input no_rek">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Nomor Rekening</div>' +
                '<input type="number" name="no_rek" id="no_rek">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input nama_bank">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Nama Bank</div>' +
                '<input type="text" name="nama_bank" id="nama_bank">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Uraian</div>' +
                '<textarea name="uraian" id="uraian"></textarea>' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input upload_berkas">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Upload Berkas</div>' +
                '<input class="fileid" id="fileid_upload_berkas" name="fileid_upload_berkas" type="hidden">' +
                '<input class="filecode" id="filecode_upload_berkas" name="filecode_upload_berkas" type="hidden">' +
                '<input class="fileurl" id="fileurl_upload_berkas" name="fileurl_upload_berkas" type="text" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_upload_berkas">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_upload_berkas" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder</i>' +
                '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
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
                '<a class="button button-round button-fill color-green" id="save_tujuan" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
                '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',
            on: {
                open: function () {
                    if (iamthedoor.role_id != 4) {
                        $$('#save_tujuan').hide();
                    }
                },
            }
        });
        popup_tujuan.open();
        $$("#save_tujuan").on('click', function () {

            popup_tujuan.close();
            if ($("#tambah_tujuan").data("id") !== null) {
                tujuan_id = $("#tambah_tujuan").data("id");
                tujuan[tujuan_id] = app.form.convertToData("#tambah_tujuan");
            } else {
                tujuan.push(app.form.convertToData("#tambah_tujuan"));
            }
            reload_tujuan_table(tujuan);
        });
    }

    function reload_tujuan_table(tujuan_key) {
        tujuan_html = '<tr><td></td><td>Data Kosong</td><td></td></tr>';
        $$("#tujuan_table table tbody").html(tujuan_html);
        tujuan_row = '';
        for (var i = 0; i < tujuan_key.length; i++) {
            if (tujuan_key[i].status == "tersimpan") {
                tujuan_row += '<tr>' +
                    '<td class="label-cell aksi-table" style="padding: 0 12px;"><a data-id="' + [i] + '" class="edit_tujuan button button-small color-blue button-fill">EDIT</a></td>' +
                    '<td class="label-cell hapus-table" style="padding: 0 12px 0 0;"><a data-id="' + [i] + '"  class="hapus_tujuan button color-red button-fill button-small">HAPUS</a></td>' +
                    '<td class="label-cell">' + tujuan_key[i].tujuan_waarmeking + '</td>' +
                    '<td class="label-cell">' + tujuan_key[i].nama_pemilik + '</td>' +
                    '<td class="label-cell">' + tujuan_key[i].no_rek + '</td>' +
                    '<td class="label-cell">' + tujuan_key[i].nama_bank + '</td>' +
                    '<td class="label-cell">' + tujuan_key[i].uraian + '</td>' +
                    '<td class="label-cell">';
                if (tujuan_key[i].fileid_upload_berkas != '') {
                    tujuan_row += '<a data-id="' + [i] + '" onclick="preview_files(' + tujuan_key[i].fileid_upload_berkas + ')" class="ktp_anggota button color-blue button-fill button-small">FOTO DOKUMEN</a></td>';
                }
                tujuan_row += '</tr>';
            }
        }
        if (tujuan_row !== '') {
            $$("#tujuan_table table tbody").html(tujuan_row);
        }
        if (iamthedoor.role_id != 4) {
            $$('.hapus-table').hide();
        }

        $$(".hapus_tujuan").on('click', function () {
            tujuan_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin Menghapus data?', function () {
                tujuan_key[tujuan_id].status = 'terhapus';
                reload_tujuan_table(tujuan_key);
            });
        });

        $$(".edit_tujuan").on('click', function () {
            tujuan_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin akan merubah data?', function () {
                popup_tambah_tujuan();
                $$("#tambah_tujuan").attr("data-id", tujuan_id);
                $$("select[name='tujuan_waarmeking']").val(tujuan_key[tujuan_id].tujuan_waarmeking);
                $$("input[name='nama_pemilik']").val(tujuan_key[tujuan_id].nama_pemilik);
                $$("input[name='no_rek']").val(tujuan_key[tujuan_id].no_rek);
                $$("input[name='nama_bank']").val(tujuan_key[tujuan_id].nama_bank);
                $$("textarea[name='uraian']").val(tujuan_key[tujuan_id].uraian);

                $$("input[name='filecode_upload_berkas']").val(tujuan_key[tujuan_id].filecode_upload_berkas);
                $$("input[name='fileid_upload_berkas']").val(tujuan_key[tujuan_id].fileid_upload_berkas);
                $$("input[name='fileurl_upload_berkas']").val(tujuan_key[tujuan_id].fileurl_upload_berkas);

                if (tujuan_key[tujuan_id].fileid_upload_berkas != '') {
                    var preview_file_upload_berkas = '<a id="_upload_berkas" onclick="preview_files(' + tujuan_key[tujuan_id].fileid_upload_berkas + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_upload_berkas").html(preview_file_upload_berkas);

            });
        });
    }
    // tujuan end
}
function waarmeking_table_edit(data) {
    // ahli waris start
    ahli_waris = new Array();
    $$('#addahliwaris').on('touchend', function () {
        popup_tambah_ahli_waris();
    });

    ahli_waris = data.ahli_waris;
    for (var i = 0; i < ahli_waris.length; i++) {
        ahli_waris[i] = {
            "id": ahli_waris[i].id,
            "hubungan_keluarga": ahli_waris[i].hubungan_keluarga,
            "nik_ahli_waris": ahli_waris[i].nik,
            "nama_ahli_waris": ahli_waris[i].nama,
            "alamat_ahli_waris": ahli_waris[i].alamat,
            "tgl_lahir_ahli_waris": ahli_waris[i].tgl_lahir,
            "umur_ahli_waris": ahli_waris[i].umur,
            "telepon_ahli_waris": ahli_waris[i].telp,
            "status_hidup_ahli_waris": ahli_waris[i].status_hidup,
            "kehadiran_ahli_waris": ahli_waris[i].status_kehadiran,
            "nama_wali_ahli_waris": ahli_waris[i].nama_wali,
            "hubungan_wali_ahli_waris": ahli_waris[i].hubungan_wali,

            "fileid_ktp_ahli_waris": ahli_waris[i].file_ktp,
            "fileurl_ktp_ahli_waris": ahli_waris[i].ktp,
            "filecode_ktp_ahli_waris": ahli_waris[i].ktp,

            "fileid_kk_ahli_waris": ahli_waris[i].file_kk,
            "fileurl_kk_ahli_waris": ahli_waris[i].kk,
            "filecode_kk_ahli_waris": ahli_waris[i].kk,

            "fileid_akta_kelahiran_ahli_waris": ahli_waris[i].file_akta_kelahiran,
            "fileurl_akta_kelahiran_ahli_waris": ahli_waris[i].akta_kelahiran,
            "filecode_akta_kelahiran_ahli_waris": ahli_waris[i].akta_kelahiran,

            // "fileid_buku_tabungan_ahli_waris": ahli_waris[i].file_buku_tabungan,
            // "fileurl_buku_tabungan_ahli_waris": ahli_waris[i].buku_tabungan,
            // "filecode_buku_tabungan_ahli_waris": ahli_waris[i].buku_tabungan,

            "fileid_ak_ahli_waris": ahli_waris[i].file_akta_kematian,
            "fileurl_ak_ahli_waris": ahli_waris[i].akta_kematian,
            "filecode_ak_ahli_waris": ahli_waris[i].akta_kematian,

            "fileid_wali_ahli_waris": ahli_waris[i].file_surat_pernyataan_wali,
            "fileurl_wali_ahli_waris": ahli_waris[i].surat_pernyataan_wali,
            "filecode_wali_ahli_waris": ahli_waris[i].surat_pernyataan_wali,

            "fileid_alasan_ahli_waris": ahli_waris[i].file_berhalangan_hadir,
            "fileurl_alasan_ahli_waris": ahli_waris[i].surat_berhalangan_hadir,
            "filecode_alasan_ahli_waris": ahli_waris[i].surat_berhalangan_hadir,

            "status": 'tersimpan',
        }
    }
    reload_ahli_waris_table(ahli_waris);

    function popup_tambah_ahli_waris() {
        var popup_anggota = app.popup.create({
            content: '<div class="popup page-content">' +
                '<div class="block">' +
                '<form class="list" id="tambah_ahli_waris" data-id="null">' +
                '<div class="block-title">' +
                '<div class="row">' +
                '<div class="col-100">' +
                '<div class="chip color-blue">' +
                '<div class="chip-label">Form Tambah Ahli Waris</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<ul id="formupload-wrapper-list-waris">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Hubungan Keluarga</div>' +
                '<select name="hubungan_keluarga">' +
                '<option value="Kakek">KAKEK</option>' +
                '<option value="Nenek">NENEK</option>' +
                '<option value="Suami">SUAMI</option>' +
                '<option value="Istri">ISTRI</option>' +
                '<option value="Anak Kandung">ANAK KANDUNG</option>' +
                '<option value="Anak Angkat">ANAK ANGKAT</option>' +
                '<option value="Saudara">SAUDARA</option>' +
                '<option value="Cucu Kandung">CUCU DARI ANAK KANDUNG</option>' +
                '<option value="Cucu Angkat">CUCU DARI ANAK ANGKAT</option>' +
                '<option value="Keponakan">KEPONAKAN</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">NIK</div>' +
                '<input type="number" name="nik_ahli_waris">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Nama</div>' +
                '<input type="text" name="nama_ahli_waris">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Tanggal Lahir</div>' +
                '<input type="date" name="tgl_lahir_ahli_waris">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Umur</div>' +
                '<input type="number" name="umur_ahli_waris" id="umur_ahli_waris">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Telepon</div>' +
                '<input type="number" name="telepon_ahli_waris" id="telepon_ahli_waris">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Alamat</div>' +
                '<textarea class="resizable" name="alamat_ahli_waris"></textarea>' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Status Hidup</div>' +
                '<select name="status_hidup_ahli_waris" id="status_hidup_ahli_waris">' +
                '<option value="Hidup">HIDUP</option>' +
                '<option value="Meninggal">MENINGGAL</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Kehadiran Menghadap Ketua Pengadilan Negeri</div>' +
                '<select name="kehadiran_ahli_waris" id="kehadiran_ahli_waris">' +
                '<option value="Ya">Ya</option>' +
                '<option value="Tidak">Tidak</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<div id="umur17kebawah" style="display: none;">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Nama Wali</div>' +
                '<input type="text" name="nama_wali_ahli_waris">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Hubungan dengan yang diwakili</div>' +
                '<input type="text" name="hubungan_wali_ahli_waris">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</div>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-40">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label" id="ktpanak">KTP</div>' +
                '<input id="fileid_ktp_ahli_waris" class="fileid" type="hidden" name="fileid_ktp_ahli_waris">' +
                '<input id="filecode_ktp_ahli_waris" type="hidden" readonly name="filecode_ktp_ahli_waris">' +
                '<input  id="fileurl_ktp_ahli_waris" type="text" name="fileurl_ktp_ahli_waris" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ktp_ahli_waris">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_ktp_ahli_waris" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-40">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label" id="kkanak">KK</div>' +
                '<input id="fileid_kk_ahli_waris" class="fileid" type="hidden" name="fileid_kk_ahli_waris">' +
                '<input id="filecode_kk_ahli_waris" type="hidden" readonly name="filecode_kk_ahli_waris">' +
                '<input id="fileurl_kk_ahli_waris" type="text" name="fileurl_kk_ahli_waris" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_kk_ahli_waris">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_kk_ahli_waris" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-40">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label" id="akta_kelahiran_ahli_waris">Akte Kelahiran</div>' +
                '<input id="fileid_akta_kelahiran_ahli_waris" class="fileid" type="hidden" name="fileid_akta_kelahiran_ahli_waris">' +
                '<input id="filecode_akta_kelahiran_ahli_waris" type="hidden" readonly name="filecode_akta_kelahiran_ahli_waris">' +
                '<input id="fileurl_akta_kelahiran_ahli_waris" type="text" name="fileurl_akta_kelahiran_ahli_waris" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_akta_kelahiran_ahli_waris">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_akta_kelahiran_ahli_waris" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<div id="status_hidup_ahli_waris_meninggal" style="display: none;">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-40">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Akta Kematian</div>' +
                '<input id="fileid_ak_ahli_waris" class="fileid" type="hidden" name="fileid_ak_ahli_waris">' +
                '<input id="filecode_ak_ahli_waris" type="hidden" readonly name="filecode_ak_ahli_waris">' +
                '<input id="fileurl_ak_ahli_waris" type="text" name="fileurl_ak_ahli_waris" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_ak_ahli_waris">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_ak_ahli_waris" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</div>' +
                '<div id="pernyataan_wali_ahli_waris" style="display: none;">' +
                '<li data-index="wali"><ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-40">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Surat Pernyataan Perwalian Bermaterai</div>' +
                '<input id="fileid_wali_ahli_waris" class="fileid" type="hidden" name="fileid_wali_ahli_waris">' +
                '<input id="filecode_wali_ahli_waris" type="hidden" readonly name="filecode_wali_ahli_waris">' +
                '<input id="fileurl_wali_ahli_waris" type="text" name="fileurl_wali_ahli_waris" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_wali_ahli_waris">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_wali_ahli_waris" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul></li>' +
                '</div>' +
                '<div id="berhalangan_ahli_waris" style="display: none;">' +
                '<li data-index="wali"><ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-40">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Alasan Berhalanagan Menghadap Ketua Pengadilan Negeri</div>' +
                '<input id="fileid_alasan_ahli_waris" class="fileid" type="hidden" name="fileid_alasan_ahli_waris">' +
                '<input id="filecode_alasan_ahli_waris" type="hidden" readonly name="filecode_alasan_ahli_waris">' +
                '<input id="fileurl_alasan_ahli_waris" type="text" name="fileurl_alasan_ahli_waris" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_alasan_ahli_waris">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_alasan_ahli_waris" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
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
                '<a class="button button-round button-fill color-green" id="save_ahli_waris" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
                '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',
            on: {
                open: function () {
                    var riwayat_pengadilan = '';
                    data.riwayat_pengadilan.slice(-1).forEach(function (val, index) {
                        riwayat_pengadilan = val.status;
                    });
                    if (data.layanan.updated == 0 && riwayat_pengadilan == 3) {
                        $$('#tambah_ahli_waris input').prop("disabled", true);
                        $$('#tambah_ahli_waris textarea').prop("disabled", true);
                    }
                    $$('#status_hidup_ahli_waris').on('change', function () {
                        $$('#fileid_ak_ahli_waris').val('');
                        $$('#filecode_ak_ahli_waris').val('');
                        $$('#fileurl_ak_ahli_waris').val('');
                        $$('.preview_file_ak_ahli_waris').html('');
                        if ($(this).val() == 'Meninggal') {
                            $$('#status_hidup_ahli_waris_meninggal').show();
                        } else {
                            $$('#status_hidup_ahli_waris_meninggal').hide();
                        }
                    });

                    $$('#umur_ahli_waris').on('input', function () {
                        $$('#umur17kebawah input').val('');

                        $$('#fileid_pernyataan_wali_ahli_waris').val('');
                        $$('#filecode_pernyataan_wali_ahli_waris').val('');
                        $$('#fileurl_pernyataan_wali_ahli_waris').val('');
                        $$('.preview_file_pernyataan_wali_ahli_waris').html('');
                        if ($(this).val() <= 17) {
                            $$('#ktpanak').html('KTP Wali');
                            $$('#kkanak').html('KK Wali');
                            $$('#umur17kebawah').show();
                            $$('#pernyataan_wali_ahli_waris').show();
                        } else {
                            $$('#ktpanak').html('KTP');
                            $$('#kkanak').html('KK');
                            $$('#umur17kebawah').hide();
                            $$('#pernyataan_wali_ahli_waris').hide();
                        }
                    });

                    $$('#kehadiran_ahli_waris').on('change', function () {
                        if ($(this).val() == "Ya") {
                            $$('#berhalangan_ahli_waris').hide();
                        } else {
                            $$('#berhalangan_ahli_waris').show();
                        }
                    });

                    if (iamthedoor.role_id != 4) {
                        $$('#save_ahli_waris').hide();
                    }
                },
            }
        });
        popup_anggota.open();
        $$("#save_ahli_waris").on('click', function () {

            popup_anggota.close();
            if ($("#tambah_ahli_waris").data("id") !== null) {
                ahli_waris_id = $("#tambah_ahli_waris").data("id");
                ahli_waris[ahli_waris_id] = app.form.convertToData("#tambah_ahli_waris");
            } else {
                ahli_waris.push(app.form.convertToData("#tambah_ahli_waris"));
            }
            reload_ahli_waris_table(ahli_waris);
        });
    }

    function reload_ahli_waris_table(ahli_waris_key) {
        ahli_waris_html = '<tr><td></td><td>Data Kosong</td><td></td></tr>';
        $$("#ahli_waris_table table tbody").html(ahli_waris_html);
        ahli_waris_row = '';
        for (var i = 0; i < ahli_waris_key.length; i++) {
            if (ahli_waris_key[i].status == "tersimpan") {
                ahli_waris_row += '<tr>' +
                    '<td class="label-cell aksi-table" style="padding: 0 12px;"><a data-id="' + [i] + '" class="edit_ahli_waris button button-small color-blue button-fill">EDIT</a></td>' +
                    '<td class="label-cell hapus-table" style="padding: 0 12px 0 0;"><a data-id="' + [i] + '"  class="hapus_ahli_waris button color-red button-fill button-small">HAPUS</a></td>' +
                    '<td class="label-cell">' + ahli_waris_key[i].hubungan_keluarga + '</td>' +
                    '<td class="label-cell">' + ahli_waris_key[i].nik_ahli_waris + '</td>' +
                    '<td class="label-cell">' + ahli_waris_key[i].nama_ahli_waris + '</td>' +
                    '<td class="label-cell">' + ahli_waris_key[i].tgl_lahir_ahli_waris + '</td>' +
                    '<td class="label-cell">' + ahli_waris_key[i].umur_ahli_waris + '</td>' +
                    '<td class="label-cell">' + ahli_waris_key[i].telepon_ahli_waris + '</td>' +
                    '<td class="label-cell">' + ahli_waris_key[i].alamat_ahli_waris + '</td>' +
                    '<td class="label-cell">' + ahli_waris_key[i].status_hidup_ahli_waris + '</td>' +
                    '<td class="label-cell">' + ahli_waris_key[i].kehadiran_ahli_waris + '</td>' +
                    '<td class="label-cell">' + ahli_waris_key[i].nama_wali_ahli_waris + '</td>' +
                    '<td class="label-cell">' + ahli_waris_key[i].hubungan_wali_ahli_waris + '</td>' +
                    '<td class="label-cell">';
                if (ahli_waris_key[i].fileid_ktp_ahli_waris != null && ahli_waris_key[i].fileid_ktp_ahli_waris != "") {
                    ahli_waris_row += '<a data-id="' + [i] + '" onclick="preview_files(' + ahli_waris_key[i].fileid_ktp_ahli_waris + ')" class="ktp_anggota button color-blue button-fill button-small">KTP</a></td>';
                }
                if (ahli_waris_key[i].fileid_kk_ahli_waris != null && ahli_waris_key[i].fileid_kk_ahli_waris != "") {
                    ahli_waris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + ahli_waris_key[i].fileid_kk_ahli_waris + ')" class="kk_anggota button color-blue button-fill button-small">KK</a></td>';
                }
                if (ahli_waris_key[i].fileid_akta_kelahiran_ahli_waris != null && ahli_waris_key[i].fileid_akta_kelahiran_ahli_waris != "") {
                    ahli_waris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + ahli_waris_key[i].fileid_akta_kelahiran_ahli_waris + ')" class="kk_anggota button color-blue button-fill button-small">AKTA KELAHIRAN</a></td>';
                }
                // if (ahli_waris_key[i].fileid_buku_tabungan_ahli_waris != null) {
                //     ahli_waris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + ahli_waris_key[i].fileid_buku_tabungan_ahli_waris + ')" class="kk_anggota button color-blue button-fill button-small">BUKU TABUNGAN</a></td>';
                // }
                if (ahli_waris_key[i].fileid_ak_ahli_waris != null && ahli_waris_key[i].fileid_ak_ahli_waris != "") {
                    ahli_waris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + ahli_waris_key[i].fileid_ak_ahli_waris + ')" class="ktp_anggota button color-blue button-fill button-small">AKTA KEMATIAN</a></td>';
                }
                if (ahli_waris_key[i].fileid_wali_ahli_waris != null && ahli_waris_key[i].fileid_wali_ahli_waris != "") {
                    ahli_waris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + ahli_waris_key[i].fileid_wali_ahli_waris + ')" class="kk_anggota button color-blue button-fill button-small">SURAT PERWALIAN</a></td>';
                }
                if (ahli_waris_key[i].fileid_alasan_ahli_waris != null && ahli_waris_key[i].fileid_alasan_ahli_waris != "") {
                    ahli_waris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files(' + ahli_waris_key[i].fileid_alasan_ahli_waris + ')" class="kk_anggota button color-blue button-fill button-small">ALASAN BERHALANGAN MENGHADAP KETUA PENGADILAN NEGERI</a></td>';
                }
                // var approval = '';
                // data.approval_items.forEach(function (val, index) {
                // });
                var approve = data.approval_items.find(o => o.author_type === 'Kecamatan', o => o.index === '1');
                if (approve.status_approval == '2') {
                    ahli_waris_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="cetak_resume(' + ahli_waris_key[i].id + ')" class="button color-blue button-fill button-small">DOWNLOAD RESUME</a></td>';
                }
                ahli_waris_row += '</tr>';
            }
        }
        if (ahli_waris_row !== '') {
            $$("#ahli_waris_table table tbody").html(ahli_waris_row);
        }
        if (iamthedoor.role_id != 4) {
            $$('.hapus-table').hide();
        }

        var status = '';
        data.riwayat_pengadilan.slice(-1).forEach(function (val, index) {
            status = val.status;
        });
        if (data.layanan.updated == '0' && status == '3') {
            $$('.hapus_ahli_waris').hide();
        } else if (data.approval_items[0].status_approval == "2") {
            $$('.hapus-table').hide();
        }

        $$(".hapus_ahli_waris").on('click', function () {
            ahli_waris_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin Menghapus data?', function () {
                ahli_waris_key[ahli_waris_id].status = 'terhapus';
                reload_ahli_waris_table(ahli_waris_key);
            });
        });

        $$(".edit_ahli_waris").on('click', function () {
            ahli_waris_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin akan merubah data?', function () {
                popup_tambah_ahli_waris();
                $$("#tambah_ahli_waris").attr("data-id", ahli_waris_id);
                $$("select[name='hubungan_keluarga']").val(ahli_waris_key[ahli_waris_id].hubungan_keluarga);
                $$("input[name='nik_ahli_waris']").val(ahli_waris_key[ahli_waris_id].nik_ahli_waris);
                $$("input[name='nama_ahli_waris']").val(ahli_waris_key[ahli_waris_id].nama_ahli_waris);
                $$("input[name='tgl_lahir_ahli_waris']").val(ahli_waris_key[ahli_waris_id].tgl_lahir_ahli_waris);
                $$("input[name='umur_ahli_waris']").val(ahli_waris_key[ahli_waris_id].umur_ahli_waris);
                $$("input[name='telepon_ahli_waris']").val(ahli_waris_key[ahli_waris_id].telepon_ahli_waris);
                $$("textarea[name='alamat_ahli_waris']").val(ahli_waris_key[ahli_waris_id].alamat_ahli_waris);
                $$("select[name='status_hidup_ahli_waris']").val(ahli_waris_key[ahli_waris_id].status_hidup_ahli_waris);
                $$("select[name='kehadiran_ahli_waris']").val(ahli_waris_key[ahli_waris_id].kehadiran_ahli_waris);
                $$("input[name='nama_wali_ahli_waris']").val(ahli_waris_key[ahli_waris_id].nama_wali_ahli_waris);
                $$("input[name='hubungan_wali_ahli_waris']").val(ahli_waris_key[ahli_waris_id].hubungan_wali_ahli_waris);

                $$("input[name='filecode_ktp_ahli_waris']").val(ahli_waris_key[ahli_waris_id].filecode_ktp_ahli_waris);
                $$("input[name='fileid_ktp_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileid_ktp_ahli_waris);
                $$("input[name='fileurl_ktp_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileurl_ktp_ahli_waris);

                $$("input[name='filecode_kk_ahli_waris']").val(ahli_waris_key[ahli_waris_id].filecode_kk_ahli_waris);
                $$("input[name='fileid_kk_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileid_kk_ahli_waris);
                $$("input[name='fileurl_kk_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileurl_kk_ahli_waris);

                $$("input[name='filecode_akta_kelahiran_ahli_waris']").val(ahli_waris_key[ahli_waris_id].filecode_akta_kelahiran_ahli_waris);
                $$("input[name='fileid_akta_kelahiran_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileid_akta_kelahiran_ahli_waris);
                $$("input[name='fileurl_akta_kelahiran_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileurl_akta_kelahiran_ahli_waris);

                // $$("input[name='filecode_buku_tabungan_ahli_waris']").val(ahli_waris_key[ahli_waris_id].filecode_buku_tabungan_ahli_waris);
                // $$("input[name='fileid_buku_tabungan_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileid_buku_tabungan_ahli_waris);
                // $$("input[name='fileurl_buku_tabungan_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileurl_buku_tabungan_ahli_waris);

                $$("input[name='filecode_ak_ahli_waris']").val(ahli_waris_key[ahli_waris_id].filecode_ak_ahli_waris);
                $$("input[name='fileid_ak_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileid_ak_ahli_waris);
                $$("input[name='fileurl_ak_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileurl_ak_ahli_waris);

                $$("input[name='filecode_wali_ahli_waris']").val(ahli_waris_key[ahli_waris_id].filecode_wali_ahli_waris);
                $$("input[name='fileid_wali_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileid_wali_ahli_waris);
                $$("input[name='fileurl_wali_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileurl_wali_ahli_waris);

                $$("input[name='filecode_alasan_ahli_waris']").val(ahli_waris_key[ahli_waris_id].filecode_alasan_ahli_waris);
                $$("input[name='fileid_alasan_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileid_alasan_ahli_waris);
                $$("input[name='fileurl_alasan_ahli_waris']").val(ahli_waris_key[ahli_waris_id].fileurl_alasan_ahli_waris);

                if (ahli_waris_key[ahli_waris_id].fileid_ktp_ahli_waris != null) {
                    var preview_file_ktp = '<a id="_ktp_ahli_waris" onclick="preview_files(' + ahli_waris_key[ahli_waris_id].fileid_ktp_ahli_waris + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_ktp_ahli_waris").html(preview_file_ktp);

                if (ahli_waris_key[ahli_waris_id].fileid_kk_ahli_waris != null) {
                    var preview_file_kk = '<a id="_kk_ahli_waris" onclick="preview_files(' + ahli_waris_key[ahli_waris_id].fileid_kk_ahli_waris + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_kk_ahli_waris").html(preview_file_kk);

                if (ahli_waris_key[ahli_waris_id].fileid_akta_kelahiran_ahli_waris != null) {
                    var preview_file_akta_kelahiran = '<a id="_akta_kelahiran_ahli_waris" onclick="preview_files(' + ahli_waris_key[ahli_waris_id].fileid_akta_kelahiran_ahli_waris + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_akta_kelahiran_ahli_waris").html(preview_file_akta_kelahiran);

                // if (ahli_waris_key[ahli_waris_id].fileid_buku_tabungan_ahli_waris != null) {
                //     var preview_file_buku_tabungan = '<a id="_buku_tabungan" onclick="preview_files(' + ahli_waris_key[ahli_waris_id].fileid_buku_tabungan_ahli_waris + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                // }
                // $$(".preview_file_buku_tabungan_ahli_waris").html(preview_file_buku_tabungan);

                if (ahli_waris_key[ahli_waris_id].fileid_ak_ahli_waris != null) {
                    var preview_file_ak = '<a id="_ak_ahli_waris" onclick="preview_files(' + ahli_waris_key[ahli_waris_id].fileid_ak_ahli_waris + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_ak_ahli_waris").html(preview_file_ak);

                if (ahli_waris_key[ahli_waris_id].fileid_wali_ahli_waris != null) {
                    var preview_file_wali = '<a id="_wali_ahli_waris" onclick="preview_files(' + ahli_waris_key[ahli_waris_id].fileid_wali_ahli_waris + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_wali_ahli_waris").html(preview_file_wali);

                if (ahli_waris_key[ahli_waris_id].fileid_alasan_ahli_waris != '') {
                    var preview_file_alasan = '<a id="_alasan_ahli_waris" onclick="preview_files(' + ahli_waris_key[ahli_waris_id].fileid_alasan_ahli_waris + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_alasan_ahli_waris").html(preview_file_alasan);

                if (ahli_waris_key[ahli_waris_id].umur_ahli_waris <= 17) {
                    $$('#umur17kebawah').show();
                    $$('#pernyataan_wali_ahli_waris').show();
                }

                if (ahli_waris_key[ahli_waris_id].status_hidup_ahli_waris == 'Meninggal') {
                    $$('#status_hidup_ahli_waris_meninggal').show();
                }

                if (ahli_waris_key[ahli_waris_id].kehadiran_ahli_waris == 'Tidak') {
                    $$('#berhalangan_ahli_waris').show();
                }
            });
        });
    }
    // ahli waris end

    // tujuan start
    tujuan = new Array();
    $$('#addtujuan').on('touchend', function () {
        popup_tambah_tujuan();
    });

    tujuan = data.tujuan_waris;
    for (var i = 0; i < tujuan.length; i++) {
        tujuan[i] = {
            "id": tujuan[i].id,
            "tujuan_waarmeking": tujuan[i].jenis_tujuan,
            "nama_pemilik": tujuan[i].nama_pemilik,
            "no_rek": tujuan[i].no_rek,
            "nama_bank": tujuan[i].nama_bank,
            "uraian": tujuan[i].uraian,

            "fileid_upload_berkas": tujuan[i].berkas,
            "fileurl_upload_berkas": tujuan[i].file_tujuan,
            "filecode_upload_berkas": tujuan[i].file_tujuan,

            "status": 'tersimpan',
        }
    }
    reload_tujuan_table(tujuan);

    function popup_tambah_tujuan() {
        var popup_tujuan = app.popup.create({
            content: '<div class="popup page-content">' +
                '<div class="block">' +
                '<form class="list" id="tambah_tujuan" data-id="null">' +
                '<div class="block-title">' +
                '<div class="row">' +
                '<div class="col-100">' +
                '<div class="chip color-blue">' +
                '<div class="chip-label">Form Tambah Tujuan</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<ul id="formupload-wrapper-list-waris">' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Jenis Tujuan</div>' +
                '<select name="tujuan_waarmeking" id="tujuan_waarmeking">' +
                '<option value="PENCAIRAN TABUNGAN">PENCAIRAN TABUNGAN</option>' +
                '<option value="PENCAIRAN DEPOSITO">PENCAIRAN DEPOSITO</option>' +
                '<option value="PENCAIRAN BPJS KETENAGAKERJAAN">PENCAIRAN BPJS KETENAGAKERJAAN</option>' +
                '<option value="PENCAIRAN BPJS KESEHATAN">PENCAIRAN BPJS KESEHATAN</option>' +
                '<option value="PENGAMBILAN BPKB">PENGAMBILAN BPKB</option>' +
                '<option value="PENGAMBILAN SERTIFIKAT">PENGAMBILAN SERTIFIKAT</option>' +
                '<option value="PENCAIRAN TASPEN">PENCAIRAN TASPEN</option>' +
                '</select>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input nama_pemilik">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Nama Pemilik</div>' +
                '<input type="text" name="nama_pemilik" id="nama_pemilik">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input no_rek">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Nomor Rekening</div>' +
                '<input type="number" name="no_rek" id="no_rek">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input nama_bank">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Nama Bank</div>' +
                '<input type="text" name="nama_bank" id="nama_bank">' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Uraian</div>' +
                '<textarea name="uraian" id="uraian"></textarea>' +
                '<span class="input-clear-button"></span>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input upload_berkas">' +
                '<div class="item-inner">' +
                '<div class="row">' +
                '<div class="col-60">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Upload Berkas</div>' +
                '<input class="fileid" id="fileid_upload_berkas" name="fileid_upload_berkas" type="hidden">' +
                '<input class="filecode" id="filecode_upload_berkas" name="filecode_upload_berkas" type="hidden">' +
                '<input class="fileurl" id="fileurl_upload_berkas" name="fileurl_upload_berkas" type="text" readonly>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-20 preview_file_upload_berkas">' +
                '</div>' +
                '<div class="col-20">' +
                '<a id="_upload_berkas" onclick="uploadfilependukungwaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder</i>' +
                '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
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
                '<a class="button button-round button-fill color-green" id="save_tujuan" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
                '</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',
            on: {
                open: function () {
                    var riwayat_pengadilan = '';
                    data.riwayat_pengadilan.slice(-1).forEach(function (val, index) {
                        riwayat_pengadilan = val.status;
                    });
                    if (data.layanan.updated == 0 && riwayat_pengadilan == 3) {
                        $$('#tambah_tujuan input').prop("disabled", true);
                        $$('#tambah_tujuan textarea').prop("disabled", true);
                    }

                    if (iamthedoor.role_id != 4) {
                        $$('#save_tujuan').hide();
                    }
                },
            }
        });
        popup_tujuan.open();
        $$("#save_tujuan").on('click', function () {

            popup_tujuan.close();
            if ($("#tambah_tujuan").data("id") !== null) {
                tujuan_id = $("#tambah_tujuan").data("id");
                tujuan[tujuan_id] = app.form.convertToData("#tambah_tujuan");
            } else {
                tujuan.push(app.form.convertToData("#tambah_tujuan"));
            }
            reload_tujuan_table(tujuan);
        });
    }

    function reload_tujuan_table(tujuan_key) {
        tujuan_html = '<tr><td></td><td>Data Kosong</td><td></td></tr>';
        $$("#tujuan_table table tbody").html(tujuan_html);
        tujuan_row = '';
        for (var i = 0; i < tujuan_key.length; i++) {
            if (tujuan_key[i].status == "tersimpan") {
                tujuan_row += '<tr>' +
                    '<td class="label-cell aksi-table" style="padding: 0 12px;"><a data-id="' + [i] + '" class="edit_tujuan button button-small color-blue button-fill">EDIT</a></td>' +
                    '<td class="label-cell hapus-table" style="padding: 0 12px 0 0;"><a data-id="' + [i] + '"  class="hapus_tujuan button color-red button-fill button-small">HAPUS</a></td>' +
                    '<td class="label-cell">' + tujuan_key[i].tujuan_waarmeking + '</td>' +
                    '<td class="label-cell">' + tujuan_key[i].nama_pemilik + '</td>' +
                    '<td class="label-cell">' + tujuan_key[i].no_rek + '</td>' +
                    '<td class="label-cell">' + tujuan_key[i].nama_bank + '</td>' +
                    '<td class="label-cell">' + tujuan_key[i].uraian + '</td>' +
                    '<td class="label-cell">';
                if (tujuan_key[i].fileid_upload_berkas != null && tujuan_key[i].fileid_upload_berkas !== "") {
                    tujuan_row += '<a data-id="' + [i] + '" onclick="preview_files(' + tujuan_key[i].fileid_upload_berkas + ')" class="ktp_anggota button color-blue button-fill button-small">FOTO DOKUMEN</a></td>';
                }
                // var approve = data.approval_items.find(o => o.author_type === 'Kecamatan', o => o.index === '1');
                // if (approve.status_approval == '2') {
                tujuan_row += '<td class="label-cell"><a data-id="' + [i] + '" onclick="surat_permohonan(' + tujuan_key[i].id + ')" class="button color-blue button-fill button-small">SURAT PERMOHONAN</a></td>';
                tujuan_row += '</tr>';
            }
        }
        if (tujuan_row !== '') {
            $$("#tujuan_table table tbody").html(tujuan_row);
        }
        if (iamthedoor.role_id != 4) {
            $$('.hapus-table').hide();
        }

        if (data.approval_items[0].status_approval == "2") {
            $$('.hapus-table').hide();
        }

        $$(".hapus_tujuan").on('click', function () {
            tujuan_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin Menghapus data?', function () {
                tujuan_key[tujuan_id].status = 'terhapus';
                reload_tujuan_table(tujuan_key);
            });
        });

        $$(".edit_tujuan").on('click', function () {
            tujuan_id = $(this).data("id");
            app.dialog.confirm('Apakah anda yakin akan merubah data?', function () {
                popup_tambah_tujuan();
                $$("#tambah_tujuan").attr("data-id", tujuan_id);
                $$("select[name='tujuan_waarmeking']").val(tujuan_key[tujuan_id].tujuan_waarmeking);
                $$("input[name='nama_pemilik']").val(tujuan_key[tujuan_id].nama_pemilik);
                $$("input[name='no_rek']").val(tujuan_key[tujuan_id].no_rek);
                $$("input[name='nama_bank']").val(tujuan_key[tujuan_id].nama_bank);
                $$("textarea[name='uraian']").val(tujuan_key[tujuan_id].uraian);

                $$("input[name='filecode_upload_berkas']").val(tujuan_key[tujuan_id].filecode_upload_berkas);
                $$("input[name='fileid_upload_berkas']").val(tujuan_key[tujuan_id].fileid_upload_berkas);
                $$("input[name='fileurl_upload_berkas']").val(tujuan_key[tujuan_id].fileurl_upload_berkas);

                if (tujuan_key[tujuan_id].fileid_upload_berkas != null || tujuan_key[tujuan_id].fileid_upload_berkas != '') {
                    var preview_file_upload_berkas = '<a id="_upload_berkas" onclick="preview_files(' + tujuan_key[tujuan_id].fileid_upload_berkas + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                }
                $$(".preview_file_upload_berkas").html(preview_file_upload_berkas);

            });
        });
    }
    // tujuan end
}
