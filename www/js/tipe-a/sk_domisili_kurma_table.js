// Data Anggota Kurma Table Start
var anggota_kurma_data = new Array();
var anggota_kurma_id = null;
function popup_tambah_anggota_kurma(popup_status = 'tambah') {
  let jenis_kurma = $$('#jenis_kurma').val();
  var disabilitas = `<option value="Tidak">Tidak</option>
  <option value="Ya">Ya</option>`;
  if(jenis_kurma == 'kurma_difabel'){
    var disabilitas = `<option value="Ya">Ya</option>`;
  }
  
  var popup_anggota = app.popup.create({
    content: `<div class="popup page-content">
        <div class="block">
          <form class="list" id="form_anggota_kurma" data-index="">
            <div class="block-title">
              <div class="row">
                <div class="col-100">
                  <div class="chip color-blue">
                    <div class="chip-label">Form Tambah Anggota</div>
                  </div>
                </div>
              </div>
            </div>
            <ul>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">NIK</div>
                    <input type="text" class="form-numeric" id="nik_anggota" name="nik_anggota" minlength="16" maxlength="16" placeholder="NIK Anggota">
                    <input type="hidden" id="id_anggota" name="id_anggota">
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="row">
                    <a class="col-50 button button-fill" id="cari_nik"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i>Cari NIK</a>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">No KK</div>
                    <input type="text" class="data_anggota form-numeric" id="no_kk_anggota" name="no_kk_anggota" placeholder="No KK Anggota">
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Nama</div>
                    <input type="text" class="data_anggota form-numeric" id="nama_anggota" name="nama_anggota" placeholder="Nama Anggota">
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Telepon</div>
                    <input type="text" class="data_anggota form-numeric" id="telepon_anggota" name="telepon_anggota" placeholder="Telepon Anggota">
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Pekerjaan</div>
                    <input type="text" class="data_anggota" id="pekerjaan_anggota" name="pekerjaan_anggota" placeholder="Pekerjaan Anggota">
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Kecamatan</div>
                    <div class="item-input-wrap">
                      <input type="hidden" id="kecamatan_anggota" name="kecamatan_anggota">
                      <select class="data_anggota" id="opt_kecamatan_anggota" name="opt_kecamatan_anggota">
                      </select>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Desa/Kelurahan</div>
                    <div class="item-input-wrap">
                      <input type="hidden" id="kelurahan_anggota" name="kelurahan_anggota">
                      <select class="data_anggota" id="opt_kelurahan_anggota" name="opt_kelurahan_anggota">
                      </select>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">RT</div>
                    <div class="item-input-wrap">
                      <input type="text" minlength="3" maxlength="3" class="data_anggota form-numeric" id="rt_dp_anggota" name="rt_dp_anggota" placeholder="RT Anggota">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">RW</div>
                    <div class="item-input-wrap">
                    <input type="text" minlength="3" maxlength="3" class="data_anggota form-numeric" id="rw_dp_anggota" name="rw_dp_anggota" placeholder="RT Anggota">
                    </div>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Alamat</div>
                    <textarea class="data_anggota" id="alamat_anggota" name="alamat_anggota" placeholder="Alamat Lengkap Anggota"></textarea>
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Status Keanggotaan</div>
                    <select id="status_anggota" name="status_anggota">
                      <option value="Anggota">Anggota</option>
                      <option value="Ketua">Ketua</option>
                    </select>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Status Janda</div>
                    <select id="status_janda_anggota" name="status_janda_anggota">
                      <option value="Tidak">Tidak</option>
                      <option value="Ya">Ya</option>
                    </select>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Anggota Koperasi</div>
                    <select id="anggota_koperasi_anggota" name="anggota_koperasi_anggota">
                      <option value="Tidak">Tidak</option>
                      <option value="Ya">Ya</option>
                    </select>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Anggota PKK</div>
                    <select id="anggota_pkk_anggota" name="anggota_pkk_anggota">
                      <option value="Tidak">Tidak</option>
                      <option value="Ya">Ya</option>
                    </select>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Disabilitas</div>
                    <select id="disabilitas_anggota" name="disabilitas_anggota">
                      ${disabilitas}
                    </select>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Status Alamat</div>
                    <select id="status_alamat_anggota"  name="status_alamat_anggota">
                      <option value="tidak-sama">Alamat KTP tidak sama dengan Domisili sekarang</option>
                      <option value="sama">Alamat KTP sama dengan Domisili sekarang</option>
                    </select>
                  </div>
                </div>
              </li>
            </ul>
            <div class="block-title">
              <div class="row">
                <div class="col-100">
                  <div class="chip color-blue">
                    <div class="chip-label">Data Domisili Tempat Tinggal</div>
                  </div>
                </div>
              </div>
            </div>
            <ul>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Provinsi Domisili</div>
                    <div class="item-input-wrap">
                      <select id="no_prov_anggota" name="no_prov_anggota">
                      </select>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Kab/Kota Domisili</div>
                    <div class="item-input-wrap">
                      <select id="no_kab_anggota" name="no_kab_anggota">
                      </select>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Kecamatan Domisili</div>
                    <div class="item-input-wrap">
                      <select id="no_kec_anggota" name="no_kec_anggota">
                      </select>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Desa/Kelurahan Domisili</div>
                    <div class="item-input-wrap">
                      <select id="no_kel_anggota" name="no_kel_anggota">
                      </select>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">RT Domisili</div>
                    <div class="item-input-wrap">
                      <input type="text" class="form-numeric" id="rt_anggota" name="rt_anggota" minlength="3" maxlength="3" placeholder="RT Domisili Anggota">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">RW Domisili</div>
                    <div class="item-input-wrap">
                      <input type="text" class="form-numeric" id="rw_anggota" name="rw_anggota" minlength="3" maxlength="3" placeholder="RW Domisili Anggota">
                    </div>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Alamat Domisili</div>
                    <textarea id="alamat_domisili_anggota" name="alamat_domisili_anggota" placeholder="Alamat Lengkap Domisili Anggota"></textarea>
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>
            </ul>
            <div class="block-title">
              <div class="row">
                <div class="col-100">
                  <div class="chip color-blue">
                    <div class="chip-label">Data Lampiran</div>
                  </div>
                </div>
              </div>
            </div>
            <ul>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="row">
                    <div class="col-60">
                      <div class="item-inner">
                        <div class="item-input-wrap">
                          <div class="item-title item-label">Upload FC KTP</div>
                          <input type="hidden" id="file_id_ktp_anggota" name="file_id_ktp_anggota">
                          <input type="hidden" id="file_code_ktp_anggota" name="file_code_ktp_anggota">
                          <input type="hidden" id="file_desc_ktp_anggota" name="file_desc_ktp_anggota" value="KTP Anggota">
                          <input type="text" id="file_url_ktp_anggota" name="file_url_ktp_anggota" readonly>
                        </div>
                      </div>
                    </div>
                    <div class="col-20 preview_file_ktp_anggota">
                    </div>
                    <div class="col-20">
                      <a id="ktp_anggota" onClick="upload_file_kurma(this.id, 'kurma')" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>
                    </div>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="row">
                    <div class="col-60">
                      <div class="item-inner">
                        <div class="item-input-wrap">
                          <div class="item-title item-label">Upload FC KK</div>
                          <input type="hidden" id="file_id_kk_anggota" name="file_id_kk_anggota">
                          <input type="hidden" id="file_code_kk_anggota" name="file_code_kk_anggota">
                          <input type="hidden" id="file_desc_kk_anggota" name="file_desc_kk_anggota" value="KK Anggota">
                          <input type="text" id="file_url_kk_anggota" name="file_url_kk_anggota" readonly>
                        </div>
                      </div>
                    </div>
                    <div class="col-20 preview_file_kk_anggota">
                    </div>
                    <div class="col-20">
                      <a id="kk_anggota" onClick="upload_file_kurma(this.id, 'kurma')" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>
                    </div>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="row">
                    <div class="col-60">
                      <div class="item-inner">
                        <div class="item-input-wrap">
                          <div class="item-title item-label">Upload Surat Domisili</div>
                          <div class="item-title item-label">Jika Domisili Tidak Sesuai KTP</div>
                          <input type="hidden" id="file_id_sk_domisili_anggota" name="file_id_sk_domisili_anggota">
                          <input type="hidden" id="file_code_sk_domisili_anggota" name="file_code_sk_domisili_anggota">
                          <input type="hidden" id="file_desc_sk_domisili_anggota" name="file_desc_sk_domisili_anggota" value="SK Domisili Anggota">
                          <input type="text" id="file_url_sk_domisili_anggota" name="file_url_sk_domisili_anggota" readonly>
                        </div>
                      </div>
                    </div>
                    <div class="col-20 preview_file_sk_domisili_anggota">
                    </div>
                    <div class="col-20">
                      <a id="sk_domisili_anggota" onClick="upload_file_kurma(this.id, 'kurma')" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </form>
          <div class="row">
            <div class="col-40">
              <a class="button button-round popup-close button-fill color-red" style="margin-top: 10px;">
                <i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Batal</span>
              </a>
            </div>
            <div class="col-60">
              <a class="button button-round button-fill color-green" id="save_anggota_kurma" style="margin-top: 10px;">
                <i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>
              </a>
            </div>
          </div>
        </div>
      </div>`,
    on: {
      open: function () {
        $$('#opt_kecamatan_anggota').on('change', function () {
          $$('#kecamatan_anggota').val(this.value);
          get_kelurahan_dom(this.value, '#opt_kelurahan_anggota');
        });
        $$('#opt_kelurahan_anggota').on('change', function () {
          $$('#kelurahan_anggota').val(this.value);
        });

        $$('#no_prov_anggota').on('change', function () {
          get_kabupaten_kurma(this.value, '#no_kab_anggota');
        });

        $$('#no_kab_anggota').on('change', function () {
          get_kecamatan_kurma(this.value, '#no_kec_anggota');
        });
        $$('#no_kec_anggota').on('change', function () {
          get_kelurahan_kurma(this.value, '#no_kel_anggota');
        });

        if (popup_status == 'tambah') {
          get_kecamatan_dom('#opt_kecamatan_anggota');
          get_provinsi_kurma('#no_prov_anggota');
        }

        $$('#cari_nik').on('click', async function () {
          if($$('#nik_anggota').val().length != 16){
            app.dialog.alert('NIK harus diisi, panjang NIK 16');
            return false;
          }
          app.dialog.preloader('Loading...')
          let response = {};
          let data = { user_data: iamthedoor, id_anggota: $('#id_anggota').val(), nik: $$('#nik_anggota').val() };
          await $.post(site_url_mobile_layanan + '/sk_domisili_kurma/cari_nik', data, function (callback) {
            app.dialog.close();
            response = callback;
          }, 'json')
          .fail(function () {
            app.dialog.close();
            app.dialog.alert('Error Connection');
          });

          if (response?.status) {
            app.dialog.alert(response.message);
            let status_data = true;
            let pesan_status = '';

            $$('#nama_anggota').val(response.result.nama);
            $$('#no_kk_anggota').val(response.result.no_kk);
            $$('#telepon_anggota').val(response.result.telepon);
            $$('#pekerjaan_anggota').val(response.result.pekerjaan);
            $$('#opt_kecamatan_anggota').val(response.result.kecamatan);
            $$('#kecamatan_anggota').val(response.result.kecamatan);
            await get_kelurahan_dom(response.result.kecamatan, '#opt_kelurahan_anggota', response.result.kode_desa, 'none');
            $$('#kelurahan_anggota').val(response.result.kode_desa);
            $$('#rt_dp_anggota').val(response.result.no_rt);
            $$('#rw_dp_anggota').val(response.result.no_rw);
            $$('#alamat_anggota').val(response.result.alamat);
            $$('.data_anggota').attr('readonly', true);
            $$('select.data_anggota').attr('disabled', true);

            $$('#status_alamat_anggota').val('sama');
            $$('#no_prov_anggota').val(response.result.no_prov);
            await get_kabupaten_kurma(response.result.no_prov, '#no_kab_anggota', response.result.no_kab, 'none');
            await get_kecamatan_kurma(response.result.no_kab, '#no_kec_anggota', response.result.no_kec, 'none');
            await get_kelurahan_kurma(response.result.no_kec, '#no_kel_anggota', response.result.no_kel, 'none');
            $$('#rt_anggota').val(response.result.no_rt);
            $$('#rw_anggota').val(response.result.no_rw);
            $$('#alamat_domisili_anggota').val(response.result.alamat);

            if (response.result.status_kawin.includes('Cerai')) {
              $$('#status_janda_anggota').val('Ya');
            }

            $$('#no_kk_anggota').removeAttr('readonly');

            if (response.result.no_rt == null) {
              pesan_status += 'RT, ';
              status_data = false;
            }

            if (response.result.no_rw == null) {
              pesan_status += 'RW, ';
              status_data = false;
            }

            if (response.result.no_kk == null) {
              pesan_status += 'No KK';
              status_data = false;
            };

            if (status_data == false) {
              app.dialog.alert('Data ' + pesan_status + ' anda kosong, update di halaman profil user');
              return false
            }
          } else {
            app.dialog.alert(response.message);
          }
        });

        $$('#status_alamat_anggota').on('change', async function () {
          if (this.value == 'sama') {
            app.dialog.preloader('Loading...')
            let response = {};
            let data = { user_data: iamthedoor, id_anggota: $('#id_anggota').val(), nik: $$('#nik_anggota').val() };
            await $.post(site_url_mobile_layanan + '/sk_domisili_kurma/cari_nik', data, function (callback) {
              app.dialog.close();
              response = callback;
            }, 'json')
              .fail(function (error) {
                app.dialog.close();
                app.dialog.alert('Error Connection');
              });

            if (response?.status) {
              $$('#no_prov_anggota').val(response.result.no_prov);
              await get_kabupaten_kurma(response.result.no_prov, '#no_kab_anggota', response.result.no_kab, 'none');
              await get_kecamatan_kurma(response.result.no_kab, '#no_kec_anggota', response.result.no_kec, 'none');
              await get_kelurahan_kurma(response.result.no_kec, '#no_kel_anggota', response.result.no_kel, 'none');
              $$('#alamat_domisili_anggota').val(response.result.alamat);
            }
          }
        });

        if (iamthedoor.role_id != 4) {
          $$('#save_anggota_kurma').hide();
        }
      },
    }
  });
  popup_anggota.open();

  $$('#save_anggota_kurma').on('click', async function () {
    if ($$('#nik_anggota').val() == '' || $$('#nik_anggota').val().length != 16) {
      app.dialog.alert('NIK harus diisi, panjang NIK 16');
      return false;
    }

    if ($$('#no_kk_anggota').val() == '' || $$('#no_kk_anggota').val().length != 16) {
      app.dialog.alert('No KK harus diisi, panjang No KK 16');
      return false;
    }

    let cek_isian = { status: true, message: '' };
    $('.data_anggota').each(function (index, item) {
      if (item.value == '') {
        cek_isian.status = false;
        cek_isian.message = $(item).attr('placeholder') + ' Harus Diisi';
        return false;
      }
    });

    if (cek_isian.status == false) {
      app.dialog.alert(cek_isian.message);
      return false;
    }

    let lokasi_domisili = {
      'kecamatan': $$('#no_kec_anggota').val(),
      'kelurahan': $$('#no_kel_anggota').val(),
      'rt': $$('#rt_anggota').val(),
      'rw': $$('#rw_anggota').val(),
    };

    if(jenis_kurma == 'kurma_umum' || (jenis_kurma == 'kurma_difabel' && $$('#status_anggota').val() == 'Ketua')){
      let cek_domisili = await cek_alamat_domisili('single', lokasi_domisili);
      if (cek_domisili.status == false) {
        app.dialog.close();
        app.dialog.alert(cek_domisili.message);
        return false;
      }
    }

    if ($('#file_code_ktp_anggota').val() == '' || $('#file_code_kk_anggota').val() == '') {
      app.dialog.close();
      app.dialog.alert('Mohon Lengkapi Dokumen');
      return false;
    }

    if ($('#status_alamat_anggota').val() == 'tidak-sama' && $('#file_code_sk_domisili_anggota').val() == '') {
      app.dialog.close();
      app.dialog.alert('Mohon Lengkapi Dokumen Surat Domisili');
      return false;
    }

    app.dialog.preloader('Loading...');
    let response = {};
    let data = {
      user_data: iamthedoor,
      id_anggota: $('#id_anggota').val(),
      nik: $('#nik_anggota').val(),
      no_kk: $('#no_kk_anggota').val()
    };
    await $.post(site_url_mobile_layanan + '/sk_domisili_kurma/cari_nik', data, function (callback) {
      app.dialog.close();
      response = callback;
    }, 'json')
      .fail(function () {
        app.dialog.close();
        app.dialog.alert('Error Connection');
      });

    if (response?.status) {
      app.dialog.close();
      popup_anggota.close();
      let anggota_kurma_form = app.form.convertToData('#form_anggota_kurma');
      anggota_kurma_form['nama_kecamatan_anggota'] = $('#opt_kecamatan_anggota option:selected').text();
      anggota_kurma_form['nama_kelurahan_anggota'] = $('#opt_kelurahan_anggota option:selected').text();
      anggota_kurma_form['nama_prov_anggota'] = $('#no_prov_anggota option:selected').text();
      anggota_kurma_form['nama_kab_anggota'] = $('#no_kab_anggota option:selected').text();
      anggota_kurma_form['nama_kec_anggota'] = $('#no_kec_anggota option:selected').text();
      anggota_kurma_form['nama_kel_anggota'] = $('#no_kel_anggota option:selected').text();
      anggota_kurma_id = String($('#form_anggota_kurma').data('index'));
      if (anggota_kurma_id.length) {
        anggota_kurma_data[parseInt(anggota_kurma_id)] = anggota_kurma_form;
      } else {
        anggota_kurma_data.push(anggota_kurma_form);
      }

      reload_anggota_kurma_table(anggota_kurma_data);
    } else {
      app.dialog.alert(response.message);
    }
  });

  return true;
}

function popup_revisi_anggota_kurma(popup_status = 'revisi') {
  let jenis_kurma = $$('#jenis_kurma').val();
  var disabilitas = `<option value="Tidak">Tidak</option>
  <option value="Ya">Ya</option>`;
  if(jenis_kurma == 'kurma_difabel'){
    var disabilitas = `<option value="Ya">Ya</option>`;
  }
  
  var popup_anggota = app.popup.create({
    content: `<div class="popup page-content">
        <div class="block">
          <form class="list" id="form_anggota_kurma" data-index="">
            <div class="block-title">
              <div class="row">
                <div class="col-100">
                  <div class="chip color-blue">
                    <div class="chip-label">Form Revisi Anggota</div>
                  </div>
                </div>
              </div>
            </div>
            <ul style="display:none;">
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">NIK</div>
                    <input type="text" class="form-numeric" id="nik_anggota" name="nik_anggota" minlength="16" maxlength="16" placeholder="NIK Anggota">
                    <input type="hidden" id="id_anggota" name="id_anggota">
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="row">
                    <a class="col-50 button button-fill" id="cari_nik"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i>Cari NIK</a>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">No KK</div>
                    <input type="text" class="data_anggota form-numeric" id="no_kk_anggota" name="no_kk_anggota" placeholder="No KK Anggota">
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Nama</div>
                    <input type="text" class="data_anggota form-numeric" id="nama_anggota" name="nama_anggota" placeholder="Nama Anggota">
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Telepon</div>
                    <input type="text" class="data_anggota form-numeric" id="telepon_anggota" name="telepon_anggota" placeholder="Telepon Anggota">
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Pekerjaan</div>
                    <input type="text" class="data_anggota" id="pekerjaan_anggota" name="pekerjaan_anggota" placeholder="Pekerjaan Anggota">
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Kecamatan</div>
                    <div class="item-input-wrap">
                      <input type="hidden" id="kecamatan_anggota" name="kecamatan_anggota">
                      <select class="data_anggota" id="opt_kecamatan_anggota" name="opt_kecamatan_anggota">
                      </select>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Desa/Kelurahan</div>
                    <div class="item-input-wrap">
                      <input type="hidden" id="kelurahan_anggota" name="kelurahan_anggota">
                      <select class="data_anggota" id="opt_kelurahan_anggota" name="opt_kelurahan_anggota">
                      </select>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">RT</div>
                    <div class="item-input-wrap">
                      <input type="text" minlength="3" maxlength="3" class="data_anggota form-numeric" id="rt_dp_anggota" name="rt_dp_anggota" placeholder="RT Anggota">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">RW</div>
                    <div class="item-input-wrap">
                    <input type="text" minlength="3" maxlength="3" class="data_anggota form-numeric" id="rw_dp_anggota" name="rw_dp_anggota" placeholder="RT Anggota">
                    </div>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Alamat</div>
                    <textarea class="data_anggota" id="alamat_anggota" name="alamat_anggota" placeholder="Alamat Lengkap Anggota"></textarea>
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Status Keanggotaan</div>
                    <select id="status_anggota" name="status_anggota">
                      <option value="Anggota">Anggota</option>
                      <option value="Ketua">Ketua</option>
                    </select>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Status Janda</div>
                    <select id="status_janda_anggota" name="status_janda_anggota">
                      <option value="Tidak">Tidak</option>
                      <option value="Ya">Ya</option>
                    </select>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Anggota Koperasi</div>
                    <select id="anggota_koperasi_anggota" name="anggota_koperasi_anggota">
                      <option value="Tidak">Tidak</option>
                      <option value="Ya">Ya</option>
                    </select>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Anggota PKK</div>
                    <select id="anggota_pkk_anggota" name="anggota_pkk_anggota">
                      <option value="Tidak">Tidak</option>
                      <option value="Ya">Ya</option>
                    </select>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Disabilitas</div>
                    <select id="disabilitas_anggota" name="disabilitas_anggota">
                      ${disabilitas}
                    </select>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Status Alamat</div>
                    <select id="status_alamat_anggota"  name="status_alamat_anggota">
                      <option value="tidak-sama">Alamat KTP tidak sama dengan Domisili sekarang</option>
                      <option value="sama">Alamat KTP sama dengan Domisili sekarang</option>
                    </select>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Provinsi Domisili</div>
                    <div class="item-input-wrap">
                      <select id="no_prov_anggota" name="no_prov_anggota">
                      </select>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Kab/Kota Domisili</div>
                    <div class="item-input-wrap">
                      <select id="no_kab_anggota" name="no_kab_anggota">
                      </select>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Kecamatan Domisili</div>
                    <div class="item-input-wrap">
                      <select id="no_kec_anggota" name="no_kec_anggota">
                      </select>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Desa/Kelurahan Domisili</div>
                    <div class="item-input-wrap">
                      <select id="no_kel_anggota" name="no_kel_anggota">
                      </select>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">RT Domisili</div>
                    <div class="item-input-wrap">
                      <input type="text" class="form-numeric" id="rt_anggota" name="rt_anggota" minlength="3" maxlength="3" placeholder="RT Domisili Anggota">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">RW Domisili</div>
                    <div class="item-input-wrap">
                      <input type="text" class="form-numeric" id="rw_anggota" name="rw_anggota" minlength="3" maxlength="3" placeholder="RW Domisili Anggota">
                    </div>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Alamat Domisili</div>
                    <textarea id="alamat_domisili_anggota" name="alamat_domisili_anggota" placeholder="Alamat Lengkap Domisili Anggota"></textarea>
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>
            </ul>

            <ul>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="row">
                    <div class="col-60">
                      <div class="item-inner">
                        <div class="item-input-wrap">
                          <div class="item-title item-label">Upload FC KTP</div>
                          <input type="hidden" id="file_id_ktp_anggota" name="file_id_ktp_anggota">
                          <input type="hidden" id="file_code_ktp_anggota" name="file_code_ktp_anggota">
                          <input type="hidden" id="file_desc_ktp_anggota" name="file_desc_ktp_anggota" value="KTP Anggota">
                          <input type="text" id="file_url_ktp_anggota" name="file_url_ktp_anggota" readonly>
                        </div>
                      </div>
                    </div>
                    <div class="col-20 preview_file_ktp_anggota">
                    </div>
                    <div class="col-20">
                      <a id="ktp_anggota" onClick="upload_file_kurma(this.id, 'kurma')" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>
                    </div>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="row">
                    <div class="col-60">
                      <div class="item-inner">
                        <div class="item-input-wrap">
                          <div class="item-title item-label">Upload FC KK</div>
                          <input type="hidden" id="file_id_kk_anggota" name="file_id_kk_anggota">
                          <input type="hidden" id="file_code_kk_anggota" name="file_code_kk_anggota">
                          <input type="hidden" id="file_desc_kk_anggota" name="file_desc_kk_anggota" value="KK Anggota">
                          <input type="text" id="file_url_kk_anggota" name="file_url_kk_anggota" readonly>
                        </div>
                      </div>
                    </div>
                    <div class="col-20 preview_file_kk_anggota">
                    </div>
                    <div class="col-20">
                      <a id="kk_anggota" onClick="upload_file_kurma(this.id, 'kurma')" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>
                    </div>
                  </div>
                </div>
              </li>
              <li class="item-content item-input sk_domisili">
                <div class="item-inner">
                  <div class="row">
                    <div class="col-60">
                      <div class="item-inner">
                        <div class="item-input-wrap">
                          <div class="item-title item-label">Upload Surat Domisili</div>
                          <div class="item-title item-label">Jika Domisili Tidak Sesuai KTP</div>
                          <input type="hidden" id="file_id_sk_domisili_anggota" name="file_id_sk_domisili_anggota">
                          <input type="hidden" id="file_code_sk_domisili_anggota" name="file_code_sk_domisili_anggota">
                          <input type="hidden" id="file_desc_sk_domisili_anggota" name="file_desc_sk_domisili_anggota" value="SK Domisili Anggota">
                          <input type="text" id="file_url_sk_domisili_anggota" name="file_url_sk_domisili_anggota" readonly>
                        </div>
                      </div>
                    </div>
                    <div class="col-20 preview_file_sk_domisili_anggota">
                    </div>
                    <div class="col-20">
                      <a id="sk_domisili_anggota" onClick="upload_file_kurma(this.id, 'kurma')" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </form>
          <div class="row">
            <div class="col-40">
              <a class="button button-round popup-close button-fill color-red" style="margin-top: 10px;">
                <i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Batal</span>
              </a>
            </div>
            <div class="col-60">
              <a class="button button-round button-fill color-green" id="save_revisi" style="margin-top: 10px;">
                <i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>
              </a>
            </div>
          </div>
        </div>
      </div>`,
    on: {
      open: function () {
        $$('#opt_kecamatan_anggota').on('change', function () {
          $$('#kecamatan_anggota').val(this.value);
          get_kelurahan_dom(this.value, '#opt_kelurahan_anggota');
        });
        $$('#opt_kelurahan_anggota').on('change', function () {
          $$('#kelurahan_anggota').val(this.value);
        });

        $$('#no_prov_anggota').on('change', function () {
          get_kabupaten_kurma(this.value, '#no_kab_anggota');
        });

        $$('#no_kab_anggota').on('change', function () {
          get_kecamatan_kurma(this.value, '#no_kec_anggota');
        });
        $$('#no_kec_anggota').on('change', function () {
          get_kelurahan_kurma(this.value, '#no_kel_anggota');
        });

        if (iamthedoor.role_id != 4) {
          $$('#save_revisi').hide();
        }
      },
    }
  });
  popup_anggota.open();

  $$('#save_revisi').on('click', async function () {
    if ($('#file_code_ktp_anggota').val() == '' || $('#file_code_kk_anggota').val() == '') {
      app.dialog.close();
      app.dialog.alert('Mohon Lengkapi Dokumen');
      return false;
    }

    if ($('#status_alamat_anggota').val() == 'tidak-sama' && $('#file_code_sk_domisili_anggota').val() == '') {
      app.dialog.close();
      app.dialog.alert('Mohon Lengkapi Dokumen Surat Domisili');
      return false;
    }

    popup_anggota.close();
    let anggota_kurma_form = app.form.convertToData('#form_anggota_kurma');
    anggota_kurma_form['nama_kecamatan_anggota'] = $('#opt_kecamatan_anggota option:selected').text();
    anggota_kurma_form['nama_kelurahan_anggota'] = $('#opt_kelurahan_anggota option:selected').text();
    anggota_kurma_form['nama_prov_anggota'] = $('#no_prov_anggota option:selected').text();
    anggota_kurma_form['nama_kab_anggota'] = $('#no_kab_anggota option:selected').text();
    anggota_kurma_form['nama_kec_anggota'] = $('#no_kec_anggota option:selected').text();
    anggota_kurma_form['nama_kel_anggota'] = $('#no_kel_anggota option:selected').text();
    anggota_kurma_id = String($('#form_anggota_kurma').data('index'));
    if (anggota_kurma_id.length) {
      anggota_kurma_data[parseInt(anggota_kurma_id)] = anggota_kurma_form;
    } else {
      anggota_kurma_data.push(anggota_kurma_form);
    }

    reload_anggota_kurma_table(anggota_kurma_data);
  });

  return true;
}

function reload_anggota_kurma_table(anggota_kurma_data) {
  let anggota_kurma_row = '';
  let type = 'create';
  
  if($('#aksi-update-kurma').val() == 'update'){
    type = 'update';
  }else if($('#aksi-update-kurma').val() == 'revisi'){
    type = 'revisi';
  }

  if (anggota_kurma_data?.length) {
    anggota_kurma_data.forEach(function (item, i) {
      var hapus_table = '';
      var ubah_revisi = '';

      if(type == 'create'){
        hapus_table = '<a data-index="' + i + '" data-id="' + item.domisili_id_anggota + '" data-nik="' + item.nik_anggota + '" data-type="'+ type +'" class="hapus_anggota_kurma button color-red button-fill button-small">HAPUS</a>';
      }

      if(type == 'revisi'){
        ubah_revisi = '<td class="revisi-table" style="padding: 0 12px;"><a data-index="' + i + '" data-id="' + item.id_anggota + '" class="revisi_anggota_kurma button button-small color-blue button-fill">UBAH</a></td>';
      }

      anggota_kurma_row += '<tr>' +
        ubah_revisi +
        // '<td class="aksi-table" style="padding: 0 12px;"><a data-index="' + i + '" data-id="' + item.id_anggota + '" class="ubah_anggota_kurma button button-small color-blue button-fill">UBAH</a></td>' +
        '<td class="hapus-table" style="padding: 0 12px 0 0;">'+ hapus_table +'</td>' +
        '<td class="list-nik-anggota">' + item.nik_anggota + '</td>' +
        '<td class="list-kk-anggota">' + item.no_kk_anggota + '</td>' +
        '<td>' + item.nama_anggota + '</td>' +
        '<td>' + item.telepon_anggota + '</td>' +
        '<td>' + item.pekerjaan_anggota + '</td>' +
        '<td>' + item.nama_kecamatan_anggota + '</td>' +
        '<td>' + item.nama_kelurahan_anggota + '</td>' +
        '<td>' + item.rt_dp_anggota + '</td>' +
        '<td>' + item.rw_dp_anggota + '</td>' +
        '<td>' + item.alamat_anggota + '</td>' +
        '<td class="list-status-anggota">' + item.status_anggota + '</td>' +
        '<td>' + item.status_janda_anggota + '</td>' +
        '<td>' + item.anggota_koperasi_anggota + '</td>' +
        '<td>' + item.anggota_pkk_anggota + '</td>' +
        '<td>' + item.disabilitas_anggota + '</td>' +
        '<td>' + item.nama_prov_anggota + '</td>' +
        '<td>' + item.nama_kab_anggota + '</td>' +
        '<td class="kecamatan-domisili">' + item.nama_kec_anggota + '</td>' +
        '<td class="kelurahan-domisili">' + item.nama_kel_anggota + '</td>' +
        '<td class="rt-domisili">' + item.rt_anggota + '</td>' +
        '<td class="rw-domisili">' + item.rw_anggota + '</td>' +
        '<td>' + item.alamat_domisili_anggota + '</td>';
      if (item.file_id_ktp_anggota?.length) {
        anggota_kurma_row += '<td><a onClick="preview_file_kurma(' + item.file_id_ktp_anggota + ', \'kurma\')" class="button color-blue button-fill button-small">KTP</a></td>';
      } else {
        anggota_kurma_row += '<td></td>';
      }
      if (item.file_id_kk_anggota?.length) {
        anggota_kurma_row += '<td><a onClick="preview_file_kurma(' + item.file_id_kk_anggota + ', \'kurma\')" class="button color-blue button-fill button-small">KK</a></td>';
      } else {
        anggota_kurma_row += '<td></td>';
      }
      if (item.file_id_sk_domisili_anggota?.length) {
        anggota_kurma_row += '<td><a onClick="preview_file_kurma(' + item.file_id_sk_domisili_anggota + ', \'kurma\')" class="button color-blue button-fill button-small">SK Domisili</a></td>';
      } else {
        anggota_kurma_row += '<td></td>';
      }
      anggota_kurma_row += '</tr>';
    });
  }

  if (anggota_kurma_row?.length) {
    $$('#anggota_kurma_table table tbody').html(anggota_kurma_row);
  } else {
    $$('#anggota_kurma_table table tbody').html('<tr><td></td><td></td><td>Data Kosong</td></tr>');
  }

  // if (iamthedoor.role_id != 4) {
  //   $$('.aksi-table a').text('LIHAT');
  //   $('#anggota_kurma_table tr th:eq(1)').remove();
  //   $('#anggota_kurma_table .hapus-table').remove();
  // }

  $$('.hapus_anggota_kurma').on('click', function () {
    anggota_kurma_index         = $(this).data('index');
    anggota_kurma_domisili_id   = $(this).data('id');
    anggota_kurma_nik           = $(this).data('nik');
    anggota_kurma_type          = $(this).data('type');
    app.dialog.confirm('Apakah Anda yakin akan menghapus data?', function () {
      if(anggota_kurma_type == 'create'){
        anggota_kurma_data.splice(anggota_kurma_index, 1);
        reload_anggota_kurma_table(anggota_kurma_data);
      }else{
        app.request.post(site_url_mobile_layanan + '/sk_domisili_kurma/delete_anggota_kelompok/' + anggota_kurma_domisili_id + '/' + anggota_kurma_nik, iamthedoor, function (param) {
          if (param.status) {
            anggota_kurma_data.splice(anggota_kurma_index, 1);
            reload_anggota_kurma_table(anggota_kurma_data);
          }
        }, 'json');
      }
    });
  });

  $$('.ubah_anggota_kurma').on('click', function () {
    anggota_kurma_id = $(this).data('index');
    app.dialog.confirm('Apakah Anda yakin akan melihat data?', async function () {
      popup_tambah_anggota_kurma('ubah');
      $$('#form_anggota_kurma').attr('data-index', anggota_kurma_id);
      $$('#id_anggota').val(anggota_kurma_data[anggota_kurma_id].id_anggota);
      $$('#nik_anggota').val(anggota_kurma_data[anggota_kurma_id].nik_anggota);
      $$('#no_kk_anggota').val(anggota_kurma_data[anggota_kurma_id].no_kk_anggota);
      $$('#nama_anggota').val(anggota_kurma_data[anggota_kurma_id].nama_anggota);
      $$('#telepon_anggota').val(anggota_kurma_data[anggota_kurma_id].telepon_anggota);
      $$('#pekerjaan_anggota').val(anggota_kurma_data[anggota_kurma_id].pekerjaan_anggota);
      await get_kecamatan_dom('#opt_kecamatan_anggota', anggota_kurma_data[anggota_kurma_id].kecamatan_anggota, 'none');
      $$('#kecamatan_anggota').val(anggota_kurma_data[anggota_kurma_id].kecamatan_anggota);
      await get_kelurahan_dom(anggota_kurma_data[anggota_kurma_id].kecamatan_anggota, '#opt_kelurahan_anggota', anggota_kurma_data[anggota_kurma_id].kelurahan_anggota, 'none');
      $$('#kelurahan_anggota').val(anggota_kurma_data[anggota_kurma_id].kelurahan_anggota);
      $$('#rt_dp_anggota').val(anggota_kurma_data[anggota_kurma_id].rt_dp_anggota);
      $$('#rw_dp_anggota').val(anggota_kurma_data[anggota_kurma_id].rw_dp_anggota);
      $$('#alamat_anggota').val(anggota_kurma_data[anggota_kurma_id].alamat_anggota);
      $$('#status_anggota').val(anggota_kurma_data[anggota_kurma_id].status_anggota);
      $$('#status_janda_anggota').val(anggota_kurma_data[anggota_kurma_id].status_janda_anggota);
      $$('#anggota_koperasi_anggota').val(anggota_kurma_data[anggota_kurma_id].anggota_koperasi_anggota);
      $$('#anggota_pkk_anggota').val(anggota_kurma_data[anggota_kurma_id].anggota_pkk_anggota);
      $$('#disabilitas_anggota').val(anggota_kurma_data[anggota_kurma_id].disabilitas_anggota);
      $$('.data_anggota').attr('readonly', true);
      $$('select.data_anggota').attr('disabled', true);

      $$('#status_alamat_anggota').val(anggota_kurma_data[anggota_kurma_id].status_alamat_anggota);
      await get_provinsi_kurma('#no_prov_anggota', anggota_kurma_data[anggota_kurma_id].no_prov_anggota, 'none');
      await get_kabupaten_kurma(anggota_kurma_data[anggota_kurma_id].no_prov_anggota, '#no_kab_anggota', anggota_kurma_data[anggota_kurma_id].no_kab_anggota, 'none');
      await get_kecamatan_kurma(anggota_kurma_data[anggota_kurma_id].no_kab_anggota, '#no_kec_anggota', anggota_kurma_data[anggota_kurma_id].no_kec_anggota, 'none');
      await get_kelurahan_kurma(anggota_kurma_data[anggota_kurma_id].no_kec_anggota, '#no_kel_anggota', anggota_kurma_data[anggota_kurma_id].no_kel_anggota, 'none');
      $$('#rt_anggota').val(anggota_kurma_data[anggota_kurma_id].rt_anggota);
      $$('#rw_anggota').val(anggota_kurma_data[anggota_kurma_id].rw_anggota);
      $$('#alamat_domisili_anggota').val(anggota_kurma_data[anggota_kurma_id].alamat_domisili_anggota);

      $$('#file_id_ktp_anggota').val(anggota_kurma_data[anggota_kurma_id].file_id_ktp_anggota);
      $$('#file_code_ktp_anggota').val(anggota_kurma_data[anggota_kurma_id].file_code_ktp_anggota);
      $$('#file_url_ktp_anggota').val(anggota_kurma_data[anggota_kurma_id].file_url_ktp_anggota);

      if (anggota_kurma_data[anggota_kurma_id].file_id_ktp_anggota?.length) {
        $$('.preview_file_ktp_anggota').html('<a onClick="preview_file_kurma(' + anggota_kurma_data[anggota_kurma_id].file_id_ktp_anggota + ', \'kurma\')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>');
      }

      $$('#file_id_kk_anggota').val(anggota_kurma_data[anggota_kurma_id].file_id_kk_anggota);
      $$('#file_code_kk_anggota').val(anggota_kurma_data[anggota_kurma_id].file_code_kk_anggota);
      $$('#file_url_kk_anggota').val(anggota_kurma_data[anggota_kurma_id].file_url_kk_anggota);

      if (anggota_kurma_data[anggota_kurma_id].file_id_kk_anggota?.length) {
        $$('.preview_file_kk_anggota').html('<a onClick="preview_file_kurma(' + anggota_kurma_data[anggota_kurma_id].file_id_kk_anggota + ', \'kurma\')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>');
      }

      $$('#file_id_sk_domisili_anggota').val(anggota_kurma_data[anggota_kurma_id].file_id_sk_domisili_anggota);
      $$('#file_code_sk_domisili_anggota').val(anggota_kurma_data[anggota_kurma_id].file_code_sk_domisili_anggota);
      $$('#file_url_sk_domisili_anggota').val(anggota_kurma_data[anggota_kurma_id].file_url_sk_domisili_anggota);

      if (anggota_kurma_data[anggota_kurma_id].file_id_sk_domisili_anggota?.length) {
        $$('.preview_file_sk_domisili_anggota').html('<a onClick="preview_file_kurma(' + anggota_kurma_data[anggota_kurma_id].file_id_sk_domisili_anggota + ', \'kurma\')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>');
      }
    });
  });

  $$('.revisi_anggota_kurma').on('click', function () {
    anggota_kurma_id = $(this).data('index');
    app.dialog.confirm('Apakah Anda yakin akan melihat data?', async function () {
      popup_revisi_anggota_kurma();
      $$('#form_anggota_kurma').attr('data-index', anggota_kurma_id);
      $$('#id_anggota').val(anggota_kurma_data[anggota_kurma_id].id_anggota);
      $$('#nik_anggota').val(anggota_kurma_data[anggota_kurma_id].nik_anggota);
      $$('#no_kk_anggota').val(anggota_kurma_data[anggota_kurma_id].no_kk_anggota);
      $$('#nama_anggota').val(anggota_kurma_data[anggota_kurma_id].nama_anggota);
      $$('#telepon_anggota').val(anggota_kurma_data[anggota_kurma_id].telepon_anggota);
      $$('#pekerjaan_anggota').val(anggota_kurma_data[anggota_kurma_id].pekerjaan_anggota);
      await get_kecamatan_dom('#opt_kecamatan_anggota', anggota_kurma_data[anggota_kurma_id].kecamatan_anggota, 'none');
      $$('#kecamatan_anggota').val(anggota_kurma_data[anggota_kurma_id].kecamatan_anggota);
      await get_kelurahan_dom(anggota_kurma_data[anggota_kurma_id].kecamatan_anggota, '#opt_kelurahan_anggota', anggota_kurma_data[anggota_kurma_id].kelurahan_anggota, 'none');
      $$('#kelurahan_anggota').val(anggota_kurma_data[anggota_kurma_id].kelurahan_anggota);
      $$('#rt_dp_anggota').val(anggota_kurma_data[anggota_kurma_id].rt_dp_anggota);
      $$('#rw_dp_anggota').val(anggota_kurma_data[anggota_kurma_id].rw_dp_anggota);
      $$('#alamat_anggota').val(anggota_kurma_data[anggota_kurma_id].alamat_anggota);
      $$('#status_anggota').val(anggota_kurma_data[anggota_kurma_id].status_anggota);
      $$('#status_janda_anggota').val(anggota_kurma_data[anggota_kurma_id].status_janda_anggota);
      $$('#anggota_koperasi_anggota').val(anggota_kurma_data[anggota_kurma_id].anggota_koperasi_anggota);
      $$('#anggota_pkk_anggota').val(anggota_kurma_data[anggota_kurma_id].anggota_pkk_anggota);
      $$('#disabilitas_anggota').val(anggota_kurma_data[anggota_kurma_id].disabilitas_anggota);
      $$('.data_anggota').attr('readonly', true);
      $$('select.data_anggota').attr('disabled', true);

      $$('#status_alamat_anggota').val(anggota_kurma_data[anggota_kurma_id].status_alamat_anggota);
      await get_provinsi_kurma('#no_prov_anggota', anggota_kurma_data[anggota_kurma_id].no_prov_anggota, 'none');
      await get_kabupaten_kurma(anggota_kurma_data[anggota_kurma_id].no_prov_anggota, '#no_kab_anggota', anggota_kurma_data[anggota_kurma_id].no_kab_anggota, 'none');
      await get_kecamatan_kurma(anggota_kurma_data[anggota_kurma_id].no_kab_anggota, '#no_kec_anggota', anggota_kurma_data[anggota_kurma_id].no_kec_anggota, 'none');
      await get_kelurahan_kurma(anggota_kurma_data[anggota_kurma_id].no_kec_anggota, '#no_kel_anggota', anggota_kurma_data[anggota_kurma_id].no_kel_anggota, 'none');
      $$('#rt_anggota').val(anggota_kurma_data[anggota_kurma_id].rt_anggota);
      $$('#rw_anggota').val(anggota_kurma_data[anggota_kurma_id].rw_anggota);
      $$('#alamat_domisili_anggota').val(anggota_kurma_data[anggota_kurma_id].alamat_domisili_anggota);

      $$('#file_id_ktp_anggota').val(anggota_kurma_data[anggota_kurma_id].file_id_ktp_anggota);
      $$('#file_code_ktp_anggota').val(anggota_kurma_data[anggota_kurma_id].file_code_ktp_anggota);
      $$('#file_url_ktp_anggota').val(anggota_kurma_data[anggota_kurma_id].file_url_ktp_anggota);

      if (anggota_kurma_data[anggota_kurma_id].file_id_ktp_anggota?.length) {
        $$('.preview_file_ktp_anggota').html('<a onClick="preview_file_kurma(' + anggota_kurma_data[anggota_kurma_id].file_id_ktp_anggota + ', \'kurma\')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>');
      }

      $$('#file_id_kk_anggota').val(anggota_kurma_data[anggota_kurma_id].file_id_kk_anggota);
      $$('#file_code_kk_anggota').val(anggota_kurma_data[anggota_kurma_id].file_code_kk_anggota);
      $$('#file_url_kk_anggota').val(anggota_kurma_data[anggota_kurma_id].file_url_kk_anggota);

      if (anggota_kurma_data[anggota_kurma_id].file_id_kk_anggota?.length) {
        $$('.preview_file_kk_anggota').html('<a onClick="preview_file_kurma(' + anggota_kurma_data[anggota_kurma_id].file_id_kk_anggota + ', \'kurma\')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>');
      }

      $$('#file_id_sk_domisili_anggota').val(anggota_kurma_data[anggota_kurma_id].file_id_sk_domisili_anggota);
      $$('#file_code_sk_domisili_anggota').val(anggota_kurma_data[anggota_kurma_id].file_code_sk_domisili_anggota);
      $$('#file_url_sk_domisili_anggota').val(anggota_kurma_data[anggota_kurma_id].file_url_sk_domisili_anggota);

      if (anggota_kurma_data[anggota_kurma_id].file_id_sk_domisili_anggota?.length) {
        $$('.preview_file_sk_domisili_anggota').html('<a onClick="preview_file_kurma(' + anggota_kurma_data[anggota_kurma_id].file_id_sk_domisili_anggota + ', \'kurma\')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>');
      }
    });
  });
}
// Data Anggota Kurma Table End

async function get_provinsi_kurma(elem_prov, def_provinsi = '35', trigger = 'change') {
  $$(elem_prov).html('<option value="35" selected>JAWA TIMUR</option>').trigger(trigger);
}

async function get_kabupaten_kurma(province = '35', elem_kab, def_kabupaten = '3515', trigger = 'change') {
  $$(elem_kab).html('<option value="3515" selected>KAB. SIDOARJO</option>').trigger(trigger);
}

async function get_kecamatan_kurma(regency = '3515', elem_kec, def_kecamatan = datauser.id_district, trigger = 'change') {
  app.request.post(site_url_mobile_layanan + '/sk_domisili_kurma/reg_districts/' + regency, iamthedoor, function (result) {
    let options = '';
    result.forEach(function (row) {
      options += '<option value="' + row.id + '" ' + (row.id == def_kecamatan ? 'selected' : '') + '>' + row.name + '</option>';
    });
    $$(elem_kec).html(options).trigger(trigger);
  }, 'json');
}

async function get_kelurahan_kurma(district = datauser.id_district, elem_kel, def_kelurahan = datauser.id_village, trigger = 'change') {
  app.request.post(site_url_mobile_layanan + '/sk_domisili_kurma/reg_villages/' + district, iamthedoor, function (result) {
    let options = '';
    result.forEach(function (row) {
      options += '<option value="' + row.id + '" ' + (row.id == def_kelurahan ? 'selected' : '') + '>' + row.name + '</option>';
    });
    $$(elem_kel).html(options).trigger(trigger);
  }, 'json');
}