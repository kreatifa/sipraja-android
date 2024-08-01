var skck = {
  path: '/tipe-d/skck/',
  url: './pages/tipe-d/polresta_sidoarjo/skck.html',
  name: 'skck',
  on: {
    pageInit: function () {
      app.dialog.preloader('Loading...');
      var skck_table = $('#skck_table').DataTable({
        serverSide: true,
        ajax: {
          'url': site_url_mobile_layanan + '/skck_online/get_data',
          'data': iamthedoor,
          'type': 'GET'
        },
        columns: [
          { 'data': 'kode_transaksi_skck' },
          { 'data': 'nik_pemohon' },
          { 'data': 'nama_lengkap' },
          { 'data': 'tanggal_transaksi' },
          { 'data': 'tingkat' },
          { 'data': 'keperluan' },
          { 'data': 'no_hp' },
          { 'data': 'id' },
        ],
        initComplete: function (settings, json) {
          app.dialog.close();
          $$('#skck_table_length').hide();
          $$('#skck_table_filter').hide();
        },
        rowCallback: function (row, data) {
          $('td:eq(0)', row).html(data.kode_transaksi_skck || 'Selesaikan Pengajuan anda');
          $('td:eq(3)', row).html(new Date(data.tanggal_buat).toDateIndoFormat());

          if (data.kode_transaksi_skck && data.status == 2) {
            $('td:eq(7)', row).html('<div class="button button-small button-fill print_button" data-id="' + data.id + '">' +
              '<i class="icon f7-icons" style="font-size: 12pt;">printer_fill</i></div>');
          } else {
            $('td:eq(7)', row).html('<a href="/tipe-d/new_skck/' + data.id + '/" class="button button-small button-fill color-green">Lanjutkan Proses</a>');
          }
        }
      });

      $('#skck_table').on('click', '.print_button', function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        let encoded = window.btoa('dasarnakal' + 'dummy').replace(/=/g, '');
        Attachment.download(doc_path,
          base_url + '/esign/acquire_skck/' + encoded + '/' + $(this).data('id')
        );
      });
    }
  }
};

var new_skck = {
  path: '/tipe-d/new_skck/:id',
  url: './pages/tipe-d/polresta_sidoarjo/new_skck.html',
  name: 'new_skck',
  on: {
    pageInit: async function () {
      async function get_skck_provinsi(elem, def = '35') {
        await app.request.post(site_url_mobile_layanan + '/skck_online/get_provinsi', iamthedoor, function (data) {
          var options = '';
          data.records?.forEach(function (rec) {
            options += '<option value="' + rec.id + '" ' + (rec.id == def ? 'selected' : '') + '>' + rec.name + '</option>';
          });
          $$(elem).html(options).trigger('change');
        }, 'json');
      }

      async function get_skck_kabupaten(elem, param = '35', def = '3515') {
        await app.request.post(site_url_mobile_layanan + '/skck_online/get_kabupaten/' + param, iamthedoor, function (data) {
          var options = '';
          data.records?.forEach(function (rec) {
            options += '<option value="' + rec.id + '" ' + (rec.id == def ? 'selected' : '') + '>' + rec.name + '</option>';
          });
          $$(elem).html(options).trigger('change');
        }, 'json');
      }

      async function get_skck_kecamatan(elem, param = '3515', def = datauser.id_skck_lokasi_kec) {
        await app.request.post(site_url_mobile_layanan + '/skck_online/get_kecamatan/' + param, iamthedoor, function (data) {
          var options = '';
          data.records?.forEach(function (rec) {
            options += '<option value="' + rec.id + '" ' + (rec.id == def ? 'selected' : '') + '>' + rec.name + '</option>';
          });
          $$(elem).html(options).trigger('change');
        }, 'json');
      }

      async function get_skck_kelurahan(elem, param = datauser.id_skck_lokasi_kec, def = datauser.id_skck_lokasi_kel) {
        await app.request.post(site_url_mobile_layanan + '/skck_online/get_kelurahan/' + param, iamthedoor, function (data) {
          var options = '';
          data.records?.forEach(function (rec) {
            options += '<option value="' + rec.id + '" ' + (rec.id == def ? 'selected' : '') + '>' + rec.name + '</option>';
          });
          $$(elem).html(options);
        }, 'json');
      }

      async function set_skck_form(data) {
        $$('#id_keperluan').val(data.id_keperluan);
        $$('#keperluan').val(data.keperluan);
        $$('#keperluan_manual').val(data.keperluan);
        $$('#tingkat').val(data.tingkat);
        $$('#tingkat_manual').val(data.tingkat);
        $$('#tujuan_berkas').val(data.tujuan_berkas);
        $$('#jenis_identitas').val(data.jenis_identitas);
        $$('#nomor_identitas').val(data.nomor_identitas);
        $$('#nomor_passport').val(data.nomor_passport);
        $$('#nomor_kitas').val(data.nomor_kitas);
        $$('#nama_lengkap').val(data.nama_lengkap);
        $$('#no_hp').val(data.no_hp);
        $$('#pekerjaan').val(data.pekerjaan);
        $$('#tanggal_lahir').val(data.tanggal_lahir);
        $$('#tempat_lahir').val(data.tempat_lahir);
        $$('#jenis_kelamin').val(data.jenis_kelamin);
        $$('#status_nikah').val(data.status_nikah);
        $$('#agama').val(data.agama);
        $$('#kebangsaan').val(data.kebangsaan);
        $$('#berat_badan').val(data.berat_badan);
        $$('#bentuk_muka').val(data.bentuk_muka);
        $$('#kulit').val(data.kulit);
        $$('#tinggi').val(data.tinggi);
        $$('#rambut').val(data.rambut);
        $$('#tanda_istimewa').val(data.tanda_istimewa);

        $$('#alamat_ktp').val(data.alamat_ktp);
        $$('#alamat_rt_ktp').val(data.alamat_rt_ktp);
        $$('#alamat_rw_ktp').val(data.alamat_rw_ktp);
        $$('#provinsi_ktp').val(data.provinsi_ktp);
        $$('#kabupaten_ktp').val(data.kabupaten_ktp);
        $$('#kecamatan_ktp').val(data.kecamatan_ktp);
        $$('#kelurahan_ktp').val(data.kelurahan_ktp);

        $$('#alamat_sekarang').val(data.alamat_sekarang);
        $$('#alamat_rt_sekarang').val(data.alamat_rt_sekarang);
        $$('#alamat_rw_sekarang').val(data.alamat_rw_sekarang);
        $$('#provinsi_sekarang').val(data.provinsi_sekarang);
        await get_skck_kabupaten('#kabupaten_sekarang', data.provinsi_sekarang);
        $$('#kabupaten_sekarang').val(data.kabupaten_sekarang);
        await get_skck_kecamatan('#kecamatan_sekarang', data.kabupaten_sekarang);
        $$('#kecamatan_sekarang').val(data.kecamatan_sekarang);
        await get_skck_kelurahan('#kelurahan_sekarang', data.kecamatan_sekarang);
        $$('#kelurahan_sekarang').val(data.kelurahan_sekarang);
      }

      $$('#alamat_ktp').val(datauser.alamat);
      $$('#alamat_rt_ktp').val(datauser.rt);
      $$('#alamat_rw_ktp').val(datauser.rw);
      $$('#kecamatan_ktp').html('<option value="' + datauser.id_skck_lokasi_kec + '" selected>' + datauser.nama_kec + '</option>');
      $$('#kelurahan_ktp').html('<option value="' + datauser.id_skck_lokasi_kel + '" selected>' + datauser.nama_kel + '</option>');
      $('#tujuan_berkas option:eq(1)').val('POLSEK ' + datauser.nama_kec).text('POLSEK ' + datauser.nama_kec);

      get_skck_provinsi('#provinsi_sekarang');
      $$('#provinsi_sekarang').on('change', function () {
        get_skck_kabupaten('#kabupaten_sekarang', $$('#provinsi_sekarang').val());
      });
      $$('#kabupaten_sekarang').on('change', function () {
        get_skck_kecamatan('#kecamatan_sekarang', $$('#kabupaten_sekarang').val());
      });
      $$('#kecamatan_sekarang').on('change', function () {
        get_skck_kelurahan('#kelurahan_sekarang', $$('#kecamatan_sekarang').val());
      });

      $$('#nomor_identitas').val(datauser.nik);
      $$('#nama_lengkap').val(datauser.nama);
      $$('#no_hp').val(datauser.no_telp_pendaftar);
      $$('#pekerjaan').val(datauser.pekerjaan);
      $$('#tanggal_lahir').val(datauser.tanggal_lahir);
      $$('#tempat_lahir').val(datauser.tempat_lahir);
      if (datauser.jenis_kelamin == 'Laki-Laki') {
        $$('#jenis_kelamin').val('L');
      } else if (datauser.jenis_kelamin == 'Perempuan') {
        $$('#jenis_kelamin').val('P');
      }
      $$('#status_nikah').val(datauser.status_kawin);
      $$('#agama').val(datauser.agama);
      $$('#kebangsaan').val(datauser.kwn);
      $$('#berat_badan').val(datauser.berat_badan);
      $$('#tinggi').val(datauser.tinggi_badan);

      var id = mainView.router.currentRoute.params.id;
      var state = 'insert';
      if (id == 0) {
        app.dialog.preloader('Loading...');
        app.request.post(site_url_mobile_layanan + '/skck_online/cek_data', iamthedoor, async function (data) {
          app.dialog.close();
          if (data?.id) {
            if (data.status != 2) {
              app.dialog.alert('Anda Memiliki Pengajuan SKCK yang Belum Selesai');
              state = 'update';
              id = data.id;
              $$('#status').val(data.status);
            }

            set_skck_form(data);
          }
        }, 'json');
      } else {
        state = 'update';
        app.dialog.preloader('Loading...');
        app.request.post(site_url_mobile_layanan + '/skck_online/find/' + id, iamthedoor, async function (data) {
          app.dialog.close();
          $$('#status').val(data.status);
          set_skck_form(data);
        }, 'json');
      }

      $$('.manual').hide();
      $('#cb_keperluan_manual').on('change', function (e) {
        if (e.target.checked) {
          $('.otomatis').hide();
          $('#id_keperluan').removeAttr('required');
          $('#id_keperluan').removeAttr('validate');
          $('#id_keperluan').val(0).trigger('change');
          $('#keperluan').val('');
          $('#tingkat').removeAttr('required');
          $('#tingkat').removeAttr('validate');
          $('#tingkat').val('');

          $('.manual').show();
          $('#keperluan_manual').attr('required', 'required');
          $('#keperluan_manual').attr('validate', 'validate');
          $('#tingkat_manual').attr('required', 'required');
          $('#tingkat_manual').attr('validate', 'validate');
        } else {
          $('.manual').hide();
          $('#keperluan_manual').removeAttr('required');
          $('#keperluan_manual').removeAttr('validate');
          $('#keperluan_manual').val('');
          $('#tingkat_manual').removeAttr('required');
          $('#tingkat_manual').removeAttr('validate');
          $('#tingkat_manual').val(0).trigger('change');

          $('.otomatis').show();
          $('#id_keperluan').attr('required', 'required');
          $('#id_keperluan').attr('validate', 'validate');
          $('#tingkat').attr('required', 'required');
          $('#tingkat').attr('validate', 'validate');
        }
      });

      $('#alamat_sama').on('change', async function (e) {
        if (e.target.checked) {
          $$('#alamat_sekarang').val($$('#alamat_ktp').val());
          $$('#alamat_rt_sekarang').val($$('#alamat_rt_ktp').val());
          $$('#alamat_rw_sekarang').val($$('#alamat_rw_ktp').val());
          $$('#provinsi_sekarang').val($$('#provinsi_ktp').val());
          await get_skck_kabupaten('#kabupaten_sekarang', $$('#provinsi_ktp').val());
          $$('#kabupaten_sekarang').val($$('#kabupaten_ktp').val());
          await get_skck_kecamatan('#kecamatan_sekarang', $$('#kabupaten_ktp').val());
          $$('#kecamatan_sekarang').val($$('#kecamatan_ktp').val());
          await get_skck_kelurahan('#kelurahan_sekarang', $$('#kecamatan_ktp').val());
          $$('#kelurahan_sekarang').val($$('#kelurahan_ktp').val());
        } else {
          $$('#alamat_sekarang').val('');
          $$('#alamat_rt_sekarang').val('');
          $$('#alamat_rw_sekarang').val('');
        }
      });

      $('#id_keperluan').on('change', function () {
        var data_tingkat = $(this).find(':selected').data('tingkat');
        var data_keperluan = $(this).find(':selected').data('keperluan');
        $$('#tingkat').val(data_tingkat);
        $$('#keperluan').val(data_keperluan);

        if (data_tingkat.includes('POLSEK')) {
          $('#tujuan_berkas').prop('selectedIndex', 1);
        } else {
          $('#tujuan_berkas').prop('selectedIndex', 0);
        }
      });

      $('#tingkat_manual').on('change', function () {
        if (this.value.includes('POLSEK')) {
          $('#tujuan_berkas').prop('selectedIndex', 1);
        } else {
          $('#tujuan_berkas').prop('selectedIndex', 0);
        }
      });

      $$('#simpan').on('click', function () {
        app.input.validateInputs('#new_skck');
        if ($$('#new_skck')[0].checkValidity() == true) {
          let form_data = app.form.convertToData('#new_skck');
          let ajax_data = new Array();
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);
          let link = '';
          if (state == 'insert') {
            link = 'create_skck';
          } else if (state == 'update') {
            link = 'update_skck/' + id;
          }

          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/skck_online/' + link, ajax_data, function (data) {
            app.dialog.close();
            if (data) {
              mainView.router.navigate('/tipe-d/new_skck_data_keluarga/' + data.id);
            } else {
              app.dialog.alert(data.desc);
            }
          }, function () {
            app.dialog.close();
            app.dialog.alert('Data Gagal Disimpan, Mohon Coba Lagi Nanti');
          }, 'json');
        } else {
          app.dialog.alert('Silahkan Lengkapi Semua Form dengan Benar');
        }
      });
    }
  }
};

var new_skck_data_keluarga = {
  path: '/tipe-d/new_skck_data_keluarga/:id',
  url: './pages/tipe-d/polresta_sidoarjo/new_skck_data_keluarga.html',
  name: 'new_skck_data_keluarga',
  on: {
    pageInit: function () {
      var id = mainView.router.currentRoute.params.id;

      anggota_keluarga = new Array();
      $$("#addkeluarga").on("touchend", function () {
        popup_tambah_anggota_keluarga(id);
      });

      list_hobi = new Array();
      $$("#addhobi").on("touchend", function () {
        popup_tambah_hobi(id);
      });

      list_pendidikan = new Array();
      $$("#addpendidikan").on("touchend", function () {
        popup_tambah_pendidikan(id);
      });

      reload_anggota_keluarga_table(id);
      reload_hobi_table(id);
      reload_pendidikan_table(id);

      $$('#lanjutkan').on('click', function () {
        app.input.validateInputs('#new_skck_data_keluarga');
        if ($$('#new_skck_data_keluarga')[0].checkValidity() == true && anggota_keluarga.length > 0 && list_hobi.length > 0 && list_pendidikan.length > 0) {
          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/skck_online/update_status/' + id, iamthedoor, function (data) {
            app.dialog.close();
            if (data.success) {
              mainView.router.navigate('/tipe-d/new_skck_data_pidana/' + data.id);
            } else {
              app.dialog.alert(data.desc);
            }
          }, function () {
            app.dialog.close();
            app.dialog.alert('Data Gagal Disimpan, Mohon Coba Lagi Nanti');
          }, 'json');
        } else {
          app.dialog.alert('Silahkan Lengkapi Semua Form dengan Benar');
        }
      });
    }
  }
};

var new_skck_data_pidana = {
  path: '/tipe-d/new_skck_data_pidana/:id',
  url: './pages/tipe-d/polresta_sidoarjo/new_skck_data_pidana.html',
  name: 'new_skck_data_pidana',
  on: {
    pageInit: function () {
      var id = mainView.router.currentRoute.params.id;

      $$('.pidana').hide();
      $$('.pelanggaran').hide();

      $('input:radio[name=pernah_pidana]').on('change', function () {
        if (this.value == 'pernah') {
          $$('.pidana').show();
        }
        else if (this.value == 'tidak') {
          $$('.pidana').hide();
        }
      });

      $('input:radio[name=pernah_pelanggaran]').on('change', function () {
        if (this.value == 'pernah') {
          $$('.pelanggaran').show();
        }
        else if (this.value == 'tidak') {
          $$('.pelanggaran').hide();
        }
      });

      $$('#simpan_semua').on('click', function () {
        app.input.validateInputs('#new_skck_data_pidana');
        if ($$('#new_skck_data_pidana')[0].checkValidity() == true) {
          // fungsi simpan
          let form_data = app.form.convertToData('#new_skck_data_pidana');
          let ajax_data = new Array();
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);

          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/skck_online/kirim_pengajuan/' + id, ajax_data, function (data) {
            app.dialog.close();
            if (data.success) {
              mainView.router.navigate('/tipe-d/skck/');
              $('#skck_table').DataTable().ajax.reload();
            } else {
              app.dialog.alert(data.desc);
            }
          }, function () {
            app.dialog.close();
            app.dialog.alert('Data Gagal Disimpan, Mohon Coba Lagi Nanti');
          }, 'json');
        } else {
          app.dialog.alert('Silahkan Lengkapi Semua Form dengan Benar');
        }
      });
    }
  }
};

function popup_tambah_anggota_keluarga(id) {
  var popup_anggota = app.popup.create({
    content: `<div class="popup page-content">
        <div class="block">
            <form class="list" id="tambah_anggota_keluarga" data-id="null">
                <div class="block-title">
                    <div class="row">
                        <div class="col-100">
                            <div class="chip color-blue">
                                <div class="chip-label">Data Keluarga</div>
                            </div>
                        </div>
                    </div>
                </div>
                <ul>
                    <li class="item-content item-input manual">
                        <div class="item-inner">
                            <div class="item-title item-label">Jenis*</div>
                            <div class="item-input-wrap input-dropdown-wrap">
                                <select name="jenis" id="jenis">
                                    <option value="Ayah">Ayah</option>
                                    <option value="Ibu">Ibu</option>
                                    <option value="Suami">Suami</option>
                                    <option value="Istri">Istri</option>
                                    <option value="Anak">Anak</option>
                                    <option value="Saudara">Saudara Kandung</option>
                                </select>
                            </div>
                        </div>
                    </li>
                    <li class="item-content item-input manual">
                        <div class="item-inner">
                            <div class="item-title item-label">Nama*</div>
                            <div class="item-input-wrap">
                                <input type="text" name="nama" id="nama" required validate>
                            </div>
                        </div>
                    </li>
                    <li class="item-content item-input manual">
                        <div class="item-inner">
                            <div class="item-title item-label">Umur*</div>
                            <div class="item-input-wrap">
                                <input type="number" name="umur" id="umur" required validate>
                            </div>
                        </div>
                    </li>
                    <li class="item-content item-input manual">
                        <div class="item-inner">
                            <div class="item-title item-label">Agama*</div>
                            <div class="item-input-wrap input-dropdown-wrap">
                                <select name="agama" id="agama">
                                    <option value="Islam">Islam</option>
                                    <option value="Kristen">Kristen</option>
                                    <option value="Katolik">Katolik</option>
                                    <option value="Hindu">Hindu</option>
                                    <option value="Budha">Budha</option>
                                    <option value="Konghucu">Konghucu</option>
                                </select>
                            </div>
                        </div>
                    </li>
                    <li class="item-content item-input manual">
                        <div class="item-inner">
                            <div class="item-title item-label">Kebangsaan*</div>
                            <div class="item-input-wrap input-dropdown-wrap">
                                <select name="kebangsaan" id="kebangsaan">
                                    <option value="WNI">WNI</option>
                                    <option value="WNA">WNA</option>
                                </select>
                            </div>
                        </div>
                    </li>
                    <li class="item-content item-input manual">
                        <div class="item-inner">
                            <div class="item-title item-label">Pekerjaan</div>
                            <div class="item-input-wrap">
                                <input type="text" name="pekerjaan" id="pekerjaan">
                            </div>
                        </div>
                    </li>
                    <li class="item-content item-input">
                        <div class="item-inner">
                            <div class="item-title item-label">Alamat</div>
                            <div class="item-input-wrap">
                                <textarea name="alamat" id="alamat"></textarea>
                            </div>
                        </div>
                    </li>
                    <input type="hidden" name="status" value="tersimpan">
                </ul>
            </form>
            <div class="row">
                <div class="col-40">
                    <a class="button button-round popup-close button-fill color-red" style="margin-top: 10px;">
                        <i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Batal</span>
                    </a>
                </div>
                <div class="col-60">
                    <a class="button button-round popup-close button-fill color-green" id="save_anggota" style="margin-top: 10px;">
                        <i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>
                    </a>
                </div>
            </div>
        </div>
    </div>`,
    on: {
      open: function (popup) { },
    }
  });
  popup_anggota.open();
  $$("#save_anggota").on('click', function () {
    app.input.validateInputs('#tambah_anggota_keluarga');
    if ($$('#tambah_anggota_keluarga')[0].checkValidity() == true) {
      popup_anggota.close();

      let form_data = app.form.convertToData('#tambah_anggota_keluarga');
      let ajax_data = new Array();
      ajax_data.push(iamthedoor);
      ajax_data.push(form_data);

      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/skck_online/create_keluarga/' + id, ajax_data, function (data) {
        app.dialog.close();
        if (data.success) {
          reload_anggota_keluarga_table(id);
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

function reload_anggota_keluarga_table(id) {
  anggota_keluarga_html = '<tr><td></td><td></td><td>Data Kosong</td><td></td><td></td><td></td><td></td><td></td></tr>';
  $$("#anggota_keluarga_table table tbody").html(anggota_keluarga_html);
  anggota_keluarga_row = '';
  app.request.post(site_url_mobile_layanan + '/skck_online/get_keluarga/' + id, iamthedoor, function (data) {
    anggota_keluarga = data;
    for (var i = 0; i < data.length; i++) {
      anggota_keluarga_row += '<tr>' +
        '<td class="label-cell">' + data[i].jenis + '</td>' +
        '<td class="label-cell">' + data[i].nama + '</td>' +
        '<td class="label-cell">' + data[i].umur + '</td>' +
        '<td class="label-cell">' + data[i].agama + '</td>' +
        '<td class="label-cell">' + data[i].kebangsaan + '</td>' +
        '<td class="label-cell">' + data[i].pekerjaan + '</td>' +
        '<td class="label-cell">' + data[i].alamat + '</td>' +
        '<td class="label-cell" style="padding: 0 8px;"><a data-id="' + data[i].id + '"  class="hapus_anggota button color-red button-fill button-small">HAPUS</a></td>' +
        '</tr>';
    }
    if (anggota_keluarga_row !== '') {
      $$("#anggota_keluarga_table table tbody").html(anggota_keluarga_row);
    }

    $$(".hapus_anggota").on('click', function () {
      anggota_id = $(this).data("id");
      app.dialog.confirm('Apakah anda yakin Menghapus data?', function () {
        app.dialog.preloader('Loading...');
        app.request.post(site_url_mobile_layanan + '/skck_online/delete_keluarga/' + anggota_id, iamthedoor, function (data) {
          app.dialog.close();
          if (data.success) {
            reload_anggota_keluarga_table(id);
          } else {
            app.dialog.alert(data.desc);
          }
        }, 'json');
      });
    });
  }, 'json');
}

function popup_tambah_hobi(id) {
  var popup_hobi = app.popup.create({
    content: `<div class="popup page-content">
        <div class="block">
            <form class="list" id="tambah_hobi" data-id="null">
                <div class="block-title">
                    <div class="row">
                        <div class="col-100">
                            <div class="chip color-blue">
                                <div class="chip-label">Data Kegemaran / Hobi</div>
                            </div>
                        </div>
                    </div>
                </div>
                <ul>
                    <li class="item-content item-input manual">
                        <div class="item-inner">
                            <div class="item-title item-label">Hobi*</div>
                            <div class="item-input-wrap">
                                <input type="text" name="hobi" id="hobi" required validate>
                            </div>
                        </div>
                    </li>
                    <input type="hidden" name="status" value="tersimpan">
                </ul>
            </form>
            <div class="row">
                <div class="col-40">
                    <a class="button button-round popup-close button-fill color-red" style="margin-top: 10px;">
                        <i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Batal</span>
                    </a>
                </div>
                <div class="col-60">
                    <a class="button button-round popup-close button-fill color-green" id="save_hobi" style="margin-top: 10px;">
                        <i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>
                    </a>
                </div>
            </div>
        </div>
    </div>`,
    on: {
      open: function (popup) { },
    }
  });
  popup_hobi.open();
  $$("#save_hobi").on('click', function () {
    app.input.validateInputs('#tambah_hobi');
    if ($$('#tambah_hobi')[0].checkValidity() == true) {
      popup_hobi.close();

      let form_data = app.form.convertToData('#tambah_hobi');
      let ajax_data = new Array();
      ajax_data.push(iamthedoor);
      ajax_data.push(form_data);

      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/skck_online/create_hobi/' + id, ajax_data, function (data) {
        app.dialog.close();
        if (data.success) {
          reload_hobi_table(id);
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

function reload_hobi_table(id) {
  list_hobi_html = '<tr><td>Data Kosong</td><td></td></tr>';
  $$("#hobi_table table tbody").html(list_hobi_html);
  list_hobi_row = '';
  app.request.post(site_url_mobile_layanan + '/skck_online/get_hobi/' + id, iamthedoor, function (data) {
    list_hobi = data;
    for (var i = 0; i < data.length; i++) {
      list_hobi_row += '<tr>' +
        '<td class="label-cell">' + data[i].hobi + '</td>' +
        '<td class="label-cell" style="padding: 0 8px;"><a data-id="' + data[i].id + '"  class="hapus_hobi button color-red button-fill button-small">HAPUS</a></td>' +
        '</tr>';
    }
    if (list_hobi_row !== '') {
      $$("#hobi_table table tbody").html(list_hobi_row);
    }

    $$(".hapus_hobi").on('click', function () {
      hobi_id = $(this).data("id");
      app.dialog.confirm('Apakah anda yakin Menghapus data?', function () {
        app.dialog.preloader('Loading...');
        app.request.post(site_url_mobile_layanan + '/skck_online/delete_hobi/' + hobi_id, iamthedoor, function (data) {
          app.dialog.close();
          if (data.success) {
            reload_hobi_table(id);
          } else {
            app.dialog.alert(data.desc);
          }
        }, 'json');
      });
    });
  }, 'json');
}

function popup_tambah_pendidikan(id) {
  var popup_pendidikan = app.popup.create({
    content: `<div class="popup page-content">
        <div class="block">
            <form class="list" id="tambah_pendidian" data-id="null">
                <div class="block-title">
                    <div class="row">
                        <div class="col-100">
                            <div class="chip color-blue">
                                <div class="chip-label">Data Kegemaran / Hobi</div>
                            </div>
                        </div>
                    </div>
                </div>
                <ul>
                    <li class="item-content item-input manual">
                        <div class="item-inner">
                        <div class="item-title item-label">Tingkat*</div>
                        <div class="item-input-wrap input-dropdown-wrap">
                            <select name="tingkat" id="tingkat">
                                <option value="SD">SD</option>
                                <option value="SMP">SMP</option>
                                <option value="SMA">SMA</option>
                                <option value="SMK">SMK</option>
                                <option value="Perguruan Tinggi">Perguruan Tinggi</option>
                            </select>
                        </div>
                        </div>
                    </li>
                    <li class="item-content item-input manual">
                        <div class="item-inner">
                            <div class="item-title item-label">Nama Sekolah*</div>
                            <div class="item-input-wrap">
                                <input type="text" name="nama_sekolah" id="nama_sekolah" required validate>
                            </div>
                        </div>
                    </li>
                    <li class="item-content item-input manual">
                        <div class="item-inner">
                            <div class="item-title item-label">Tahun Lulus*</div>
                            <div class="item-input-wrap">
                                <input type="number" name="tahun_lulus" id="tahun_lulus" required validate>
                            </div>
                        </div>
                    </li>
                    <input type="hidden" name="status" value="tersimpan">
                </ul>
            </form>
            <div class="row">
                <div class="col-40">
                    <a class="button button-round popup-close button-fill color-red" style="margin-top: 10px;">
                        <i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Batal</span>
                    </a>
                </div>
                <div class="col-60">
                    <a class="button button-round popup-close button-fill color-green" id="save_pendidikan" style="margin-top: 10px;">
                        <i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>
                    </a>
                </div>
            </div>
        </div>
    </div>`,
    on: {
      open: function (popup) { },
    }
  });
  popup_pendidikan.open();
  $$("#save_pendidikan").on('click', function () {
    app.input.validateInputs('#tambah_pendidian');
    if ($$('#tambah_pendidian')[0].checkValidity() == true) {
      popup_pendidikan.close();

      let form_data = app.form.convertToData('#tambah_pendidian');
      let ajax_data = new Array();
      ajax_data.push(iamthedoor);
      ajax_data.push(form_data);

      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/skck_online/create_pendidikan/' + id, ajax_data, function (data) {
        app.dialog.close();
        if (data.success) {
          reload_pendidikan_table(id);
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

function reload_pendidikan_table(id) {
  list_pendidikan_html = '<tr><td></td><td>Data Kosong</td><td></td><td></td></tr>';
  $$("#pendidikan_table table tbody").html(list_pendidikan_html);
  list_pendidikan_row = '';
  app.request.post(site_url_mobile_layanan + '/skck_online/get_pendidikan/' + id, iamthedoor, function (data) {
    list_pendidikan = data;
    for (var i = 0; i < data.length; i++) {
      list_pendidikan_row += '<tr>' +
        '<td class="label-cell">' + data[i].tingkat + '</td>' +
        '<td class="label-cell">' + data[i].nama_sekolah + '</td>' +
        '<td class="label-cell">' + data[i].tahun_lulus + '</td>' +
        '<td class="label-cell" style="padding: 0 8px;"><a data-id="' + data[i].id + '"  class="hapus_pendidikan button color-red button-fill button-small">HAPUS</a></td>' +
        '</tr>';
    }
    if (list_pendidikan_row !== '') {
      $$("#pendidikan_table table tbody").html(list_pendidikan_row);
    }

    $$(".hapus_pendidikan").on('click', function () {
      pendidikan_id = $(this).data("id");
      app.dialog.confirm('Apakah anda yakin Menghapus data?', function () {
        app.dialog.preloader('Loading...');
        app.request.post(site_url_mobile_layanan + '/skck_online/delete_pendidikan/' + pendidikan_id, iamthedoor, function (data) {
          app.dialog.close();
          if (data.success) {
            reload_pendidikan_table(id);
          } else {
            app.dialog.alert(data.desc);
          }
        }, 'json');
      });
    });
  }, 'json');
}