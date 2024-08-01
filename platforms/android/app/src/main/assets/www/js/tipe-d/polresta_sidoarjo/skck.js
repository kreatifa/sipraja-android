var skck = {
	path: '/tipe-d/skck/',
  url: './pages/tipe-d/polresta_sidoarjo/skck.html',
  name: 'skck',
  on: {
    pageInit: function() {
      app.dialog.preloader('Loading...');
      var datatables = $('#datatables').DataTable({
        serverSide: true,
        ajax: {
          "url": site_url_mobile_layanan + '/skck_online/get_data',
          "data": iamthedoor,
          "type": "GET"
        },
        columns: [
          { "data": "tanggal_buat"},
          { "data": "kode_transaksi"},
          { "data": "keperluan"},
          { "data": "status"},
          { "data": "kode_transaksi"},
        ],
        initComplete: function(settings, json) {
          app.dialog.close();
          $$('#datatables_length').hide();
          $$('#datatables_filter').hide();
        },
        rowCallback: function(row, data) {
          var status = '';

          if (data.status == 0 || data.status == 1) {
            status = 'Input Informasi SKCK';
          } else {
            status = 'Menunggu Sidik Jari';
          }
          $('td:eq(3)', row).html('<div>' + status + '</div>');

          if (data.status == 2) {
            $('td:eq(4)', row).html('<div class="button button-small button-fill">' +
              '<i class="icon f7-icons" style="font-size: 12pt;">printer_fill</i></div>');
          } else {
            $('td:eq(4)', row).html('<a href="/tipe-d/new_skck/' + data.id + '/" class="button button-small button-fill color-green">Lanjutkan Proses</a>');
          }

          var kode = '';
          if (data.kode_transaksi == null || data.kode_transaksi == '') {
            kode = 'Selesaikan Pengajuan anda';
          } else {
            kode = data.kode_transaksi;
          }
          $('td:eq(1)', row).html('<div>' + kode + '</div>');
          $('td:eq(0)', row).html('<div>' + new Date(data.tanggal_buat).toDateIndoFormat() + '</div>');
        }
      });
    }
  }
};

var new_skck = {
  path: '/tipe-d/new_skck/:id',
  url: './pages/tipe-d/polresta_sidoarjo/new_skck.html',
  name: 'new_skck',
  on: {
    pageInit: function() {
      var id = mainView.router.currentRoute.params.id;
      var state = 'insert';
      if (id == 0) {
        app.dialog.preloader('Loading...');
        app.request.post(site_url_mobile_layanan + '/skck_online/cek_data', iamthedoor, function(data) {
          app.dialog.close();
          if (data.skck.length > 0) {
            app.dialog.alert('Anda Memiliki Pengajuan SKCK yang Belum Selesai');
            state = 'update';
            id = data.skck[0].id;
            $$('#status').val(data.skck[0].status);
            $$('#keperluan').val(data.skck[0].keperluan);
            $$('#keperluan_manual').val(data.skck[0].keperluan);
            $$('#tingkat').val(data.skck[0].tingkat);
            $$('#tingkat_manual').val(data.skck[0].tingkat);
            $$('#jenis_identitas').val(data.skck[0].jenis_identitas);
            $$('#nomor_identitas').val(data.skck[0].nomor_identitas);
            $$('#nomor_passport').val(data.skck[0].nomor_passport);
            $$('#nomor_kitas').val(data.skck[0].nomor_kitas);
            $$('#nama_lengkap').val(data.skck[0].nama_lengkap);
            $$('#no_hp').val(data.skck[0].no_hp);
            $$('#pekerjaan').val(data.skck[0].pekerjaan);
            $$('#tanggal_lahir').val(data.skck[0].tanggal_lahir);
            $$('#tempat_lahir').val(data.skck[0].tempat_lahir);
            $$('#jenis_kelamin').val(data.skck[0].jenis_kelamin);
            $$('#status_nikah').val(data.skck[0].status_nikah);
            $$('#agama').val(data.skck[0].agama);
            $$('#kebangsaan').val(data.skck[0].kebangsaan);
            $$('#berat_badan').val(data.skck[0].berat_badan);
            $$('#bentuk_muka').val(data.skck[0].bentuk_muka);
            $$('#kulit').val(data.skck[0].kulit);
            $$('#tinggi').val(data.skck[0].tinggi);
            $$('#rambut').val(data.skck[0].rambut);
            $$('#tanda_istimewa').val(data.skck[0].tanda_istimewa);
            $$('#alamat_ktp').val(data.skck[0].alamat_ktp);
            $$('#alamat_rt_ktp').val(data.skck[0].alamat_rt_ktp);
            $$('#alamat_rw_ktp').val(data.skck[0].alamat_rw_ktp);
            $$('#provinsi_ktp').val(data.skck[0].provinsi_ktp);
            $$('#kabupaten_ktp').val(data.skck[0].kabupaten_ktp);
            $$('#kecamatan_ktp').val(data.skck[0].kecamatan_ktp);
            $$('#kelurahan_ktp').val(data.skck[0].kelurahan_ktp);
            $$('#alamat_sekarang').val(data.skck[0].alamat_sekarang);
            $$('#alamat_rt_sekarang').val(data.skck[0].alamat_rt_sekarang);
            $$('#alamat_rw_sekarang').val(data.skck[0].alamat_rw_sekarang);
            $$('#provinsi_sekarang').val(data.skck[0].provinsi_sekarang);
            $$('#kabupaten_sekarang').val(data.skck[0].kabupaten_sekarang);
            $$('#kecamatan_sekarang').val(data.skck[0].kecamatan_sekarang);
            $$('#kelurahan_sekarang').val(data.skck[0].kelurahan_sekarang);
          } else {
            if (data.skck_all.length > 0) {
              $$('#keperluan').val(data.skck_all[0].keperluan);
              $$('#keperluan_manual').val(data.skck_all[0].keperluan);
              $$('#tingkat').val(data.skck_all[0].tingkat);
              $$('#tingkat_manual').val(data.skck_all[0].tingkat);
              $$('#jenis_identitas').val(data.skck_all[0].jenis_identitas);
              $$('#nomor_identitas').val(data.skck_all[0].nomor_identitas);
              $$('#nomor_passport').val(data.skck_all[0].nomor_passport);
              $$('#nomor_kitas').val(data.skck_all[0].nomor_kitas);
              $$('#nama_lengkap').val(data.skck_all[0].nama_lengkap);
              $$('#no_hp').val(data.skck_all[0].no_hp);
              $$('#pekerjaan').val(data.skck_all[0].pekerjaan);
              $$('#tanggal_lahir').val(data.skck_all[0].tanggal_lahir);
              $$('#tempat_lahir').val(data.skck_all[0].tempat_lahir);
              $$('#jenis_kelamin').val(data.skck_all[0].jenis_kelamin);
              $$('#status_nikah').val(data.skck_all[0].status_nikah);
              $$('#agama').val(data.skck_all[0].agama);
              $$('#kebangsaan').val(data.skck_all[0].kebangsaan);
              $$('#berat_badan').val(data.skck_all[0].berat_badan);
              $$('#bentuk_muka').val(data.skck_all[0].bentuk_muka);
              $$('#kulit').val(data.skck_all[0].kulit);
              $$('#tinggi').val(data.skck_all[0].tinggi);
              $$('#rambut').val(data.skck_all[0].rambut);
              $$('#tanda_istimewa').val(data.skck_all[0].tanda_istimewa);
              $$('#alamat_ktp').val(data.skck_all[0].alamat_ktp);
              $$('#alamat_rt_ktp').val(data.skck_all[0].alamat_rt_ktp);
              $$('#alamat_rw_ktp').val(data.skck_all[0].alamat_rw_ktp);
              $$('#provinsi_ktp').val(data.skck_all[0].provinsi_ktp);
              $$('#kabupaten_ktp').val(data.skck_all[0].kabupaten_ktp);
              $$('#kecamatan_ktp').val(data.skck_all[0].kecamatan_ktp);
              $$('#kelurahan_ktp').val(data.skck_all[0].kelurahan_ktp);
              $$('#alamat_sekarang').val(data.skck_all[0].alamat_sekarang);
              $$('#alamat_rt_sekarang').val(data.skck_all[0].alamat_rt_sekarang);
              $$('#alamat_rw_sekarang').val(data.skck_all[0].alamat_rw_sekarang);
              $$('#provinsi_sekarang').val(data.skck_all[0].provinsi_sekarang);
              $$('#kabupaten_sekarang').val(data.skck_all[0].kabupaten_sekarang);
              $$('#kecamatan_sekarang').val(data.skck_all[0].kecamatan_sekarang);
              $$('#kelurahan_sekarang').val(data.skck_all[0].kelurahan_sekarang);
            }
          }
        }, 'json');
      } else {
        state = 'update';
        app.dialog.preloader('Loading...');
        app.request.post(site_url_mobile_layanan + '/skck_online/find/' + id, iamthedoor, function(data) {
          app.dialog.close();
          $$('#status').val(data.status);
          $$('#keperluan').val(data.keperluan);
          $$('#keperluan_manual').val(data.keperluan);
          $$('#tingkat').val(data.tingkat);
          $$('#tingkat_manual').val(data.tingkat);
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
          $$('#kabupaten_sekarang').val(data.kabupaten_sekarang);
          $$('#kecamatan_sekarang').val(data.kecamatan_sekarang);
          $$('#kelurahan_sekarang').val(data.kelurahan_sekarang);
        }, 'json');
      }

      $$('.manual').hide();
      get_provinsi_new('#provinsi_ktp');
      get_kabupaten_new($$('#provinsi_ktp').val(), '#kabupaten_ktp');
      get_kecamatan_new($$('#kabupaten_ktp').val(), '#kecamatan_ktp');
      get_kelurahan_new($$('#kecamatan_ktp').val(), '#kelurahan_ktp');

      get_provinsi_new('#provinsi_sekarang');
      get_kabupaten_new($$('#provinsi_sekarang').val(), '#kabupaten_sekarang');
      get_kecamatan_new($$('#kabupaten_sekarang').val(), '#kecamatan_sekarang');
      get_kelurahan_new($$('#kecamatan_sekarang').val(), '#kelurahan_sekarang');

      $('#cb_keperluan_manual').on('change', function (e) {
        if (e.target.checked) {
          $$('.manual').show();
          $$('.otomatis').hide();

          $('#keperluan').removeAttr('required');
          $('#keperluan').removeAttr('validate');
          $('#tingkat').removeAttr('required');
          $('#tingkat').removeAttr('validate');

          $('#keperluan_manual').attr('required', 'required');
          $('#keperluan_manual').attr('validate', 'validate');
          $('#tingkat_manual').attr('required', 'required');
          $('#tingkat_manual').attr('validate', 'validate');
        } else {
          $$('.manual').hide();
          $$('.otomatis').show();

          $('#keperluan').attr('required', 'required');
          $('#keperluan').attr('validate', 'validate');
          $('#tingkat').attr('required', 'required');
          $('#tingkat').attr('validate', 'validate');
          
          $('#keperluan_manual').removeAttr('required');
          $('#keperluan_manual').removeAttr('validate');
          $('#tingkat_manual').removeAttr('required');
          $('#tingkat_manual').removeAttr('validate');
        }
      });

      $('#alamat_sama').on('change', function (e) {
        if (e.target.checked) {
          $$('#alamat_sekarang').val($$('#alamat_ktp').val());
          $$('#alamat_rt_sekarang').val($$('#alamat_rt_ktp').val());
          $$('#alamat_rw_sekarang').val($$('#alamat_rw_ktp').val());
          $$('#provinsi_sekarang').val($$('#provinsi_ktp').val());
          $$('#kabupaten_sekarang').val($$('#kabupaten_ktp').val());
          $$('#kecamatan_sekarang').val($$('#kecamatan_ktp').val());
          $$('#kelurahan_sekarang').val($$('#kelurahan_ktp').val());
        } else {
          $$('#alamat_sekarang').val('');
          $$('#alamat_rt_sekarang').val('');
          $$('#alamat_rw_sekarang').val('');
          $$('#provinsi_sekarang').val('');
          $$('#kabupaten_sekarang').html('<option value="">- Pilih Kabupaten -</option>').change();
          $$('#kecamatan_sekarang').html('<option value="">- Pilih Kabupaten -</option>').change();
          $$('#kelurahan_sekarang').html('<option value="">- Pilih Kabupaten -</option>').change();
        }
      });

      $('#keperluan').on('change', function () {
        var data_tingkat = $(this).find(':selected').data('tingkat');
        $$('#tingkat').val(data_tingkat);
      });

      $$('#simpan').on('click', function() {
        app.input.validateInputs('#new_skck');
        if ($$('#new_skck')[0].checkValidity() == true) {
          let form_data = app.form.convertToData('#new_skck');

          let ajax_data = new Array();
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);

          var link = '';
          if (state == 'insert') {
            link = 'create_skck';
          } else if (state == 'update') {
            link = 'update_skck/' + id;
          }

          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/skck_online/' + link, ajax_data, function(data) {
            app.dialog.close();
            if (data) {
              mainView.router.navigate('/tipe-d/new_skck_data_keluarga/' + data.id);
            } else {
              app.dialog.alert(data.desc);
            }
          }, function() {
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
    pageInit: function() {
      var id = mainView.router.currentRoute.params.id;

      anggota_keluarga = new Array();
      $$("#addkeluarga").on("touchend", function() {
        popup_tambah_anggota_keluarga(id);
      });

      list_hobi = new Array();
      $$("#addhobi").on("touchend", function() {
        popup_tambah_hobi(id);
      });

      list_pendidikan = new Array();
      $$("#addpendidikan").on("touchend", function() {
        popup_tambah_pendidikan(id);
      });

      reload_anggota_keluarga_table();
      reload_hobi_table();
      reload_pendidikan_table();

      $$('#lanjutkan').on('click', function() {
        app.input.validateInputs('#new_skck_data_keluarga');
        if ($$('#new_skck_data_keluarga')[0].checkValidity() == true && anggota_keluarga.length > 0 && list_hobi.length > 0 && list_pendidikan.length > 0) {
          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/skck_online/update_status/' + id, iamthedoor, function(data) {
            app.dialog.close();
            if (data.success) {
              mainView.router.navigate('/tipe-d/new_skck_data_pidana/' + data.id);
            } else {
              app.dialog.alert(data.desc);
            }
          }, function() {
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
    pageInit: function() {
      var id = mainView.router.currentRoute.params.id;

      $$('.pidana').hide();
      $$('.pelanggaran').hide();

      $('input:radio[name=pernah_pidana]').change(function() {
        if (this.value == 'pernah') {
          $$('.pidana').show();
        }
        else if (this.value == 'tidak') {
          $$('.pidana').hide();
        }
      });

      $('input:radio[name=pernah_pelanggaran]').change(function() {
        if (this.value == 'pernah') {
          $$('.pelanggaran').show();
        }
        else if (this.value == 'tidak') {
          $$('.pelanggaran').hide();
        }
      });

      $$('#simpan_semua').on('click', function() {
        app.input.validateInputs('#new_skck_data_pidana');
        if ($$('#new_skck_data_pidana')[0].checkValidity() == true) {
          // fungsi simpan
          let form_data = app.form.convertToData('#new_skck_data_pidana');
          let ajax_data = new Array();
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);
          
          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/skck_online/kirim_pengajuan/' + id, ajax_data, function(data) {
            app.dialog.close();
            if (data.success) {
              mainView.router.navigate('/tipe-d/skck/');
              $('#datatables').DataTable().ajax.reload();
            } else {
              app.dialog.alert(data.desc);
            }
          }, function() {
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
    content: '<div class="popup page-content">'+
      '<div class="block">'+
        '<form class="list" id="tambah_anggota_keluarga" data-id="null">'+
          '<div class="block-title">'+
            '<div class="row">'+
              '<div class="col-100">'+
                '<div class="chip color-blue">'+
                  '<div class="chip-label">Data Keluarga</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<ul>'+
            '<li class="item-content item-input manual">'+
              '<div class="item-inner">'+
                '<div class="item-title item-label">Jenis*</div>'+
                '<div class="item-input-wrap input-dropdown-wrap">'+
                  '<select name="jenis" id="jenis">'+
                    '<option value="Ayah">Ayah</option>'+
                    '<option value="Ibu">Ibu</option>'+
                    '<option value="Suami">Suami</option>'+
                    '<option value="Istri">Istri</option>'+
                    '<option value="Anak">Anak</option>'+
                    '<option value="Saudara">Saudara Kandung</option>'+
                  '</select>'+
                '</div>'+
              '</div>'+
            '</li>'+
            '<li class="item-content item-input manual">'+
              '<div class="item-inner">'+
                '<div class="item-title item-label">Nama*</div>'+
                '<div class="item-input-wrap">'+
                  '<input type="text" name="nama" id="nama" required validate>'+
                '</div>'+
              '</div>'+
            '</li>'+
            '<li class="item-content item-input manual">'+
              '<div class="item-inner">'+
                '<div class="item-title item-label">Umur*</div>'+
                '<div class="item-input-wrap">'+
                  '<input type="number" name="umur" id="umur" required validate>'+
                '</div>'+
              '</div>'+
            '</li>'+
            '<li class="item-content item-input manual">'+
              '<div class="item-inner">'+
                '<div class="item-title item-label">Agama*</div>'+
                '<div class="item-input-wrap input-dropdown-wrap">'+
                  '<select name="agama" id="agama">'+
                    '<option value="Islam">Islam</option>'+
                    '<option value="Kristen">Kristen</option>'+
                    '<option value="Katolik">Katolik</option>'+
                    '<option value="Hindu">Hindu</option>'+
                    '<option value="Budha">Budha</option>'+
                    '<option value="Konghucu">Konghucu</option>'+
                  '</select>'+
                '</div>'+
              '</div>'+
            '</li>'+
            '<li class="item-content item-input manual">'+
              '<div class="item-inner">'+
                '<div class="item-title item-label">Kebangsaan*</div>'+
                '<div class="item-input-wrap input-dropdown-wrap">'+
                  '<select name="kebangsaan" id="kebangsaan">'+
                    '<option value="WNI">WNI</option>'+
                    '<option value="WNA">WNA</option>'+
                  '</select>'+
                '</div>'+
              '</div>'+
            '</li>'+
            '<li class="item-content item-input manual">'+
              '<div class="item-inner">'+
                '<div class="item-title item-label">Pekerjaan</div>'+
                '<div class="item-input-wrap">'+
                  '<input type="text" name="pekerjaan" id="pekerjaan">'+
                '</div>'+
              '</div>'+
            '</li>'+
            '<li class="item-content item-input">'+
              '<div class="item-inner">'+
                '<div class="item-title item-label">Alamat</div>'+
                '<div class="item-input-wrap">'+
                  '<textarea class="resizable" name="alamat" id="alamat"></textarea>'+
                '</div>'+
              '</div>'+
            '</li>'+
            '<input type="hidden" name="status" value="tersimpan">'+
          '</ul>'+
        '</form>'+
        '<div class="row">'+
          '<div class="col-40">'+
            '<a class="button button-round popup-close button-fill color-red" style="margin-top: 10px;">' +
              '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Batal</span>' +
            '</a>'+
          '</div>'+
          '<div class="col-60">'+
            '<a class="button button-round popup-close button-fill color-green" id="save_anggota" style="margin-top: 10px;">' +
              '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
            '</a>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>',
    on: {
      open: function(popup) {},
    }
  });
  popup_anggota.open();
  $$("#save_anggota").on('click', function() {
    app.input.validateInputs('#tambah_anggota_keluarga');
    if ($$('#tambah_anggota_keluarga')[0].checkValidity() == true) {
      popup_anggota.close();
      
      let form_data = app.form.convertToData('#tambah_anggota_keluarga');
      let ajax_data = new Array();
      ajax_data.push(iamthedoor);
      ajax_data.push(form_data);

      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/skck_online/create_keluarga/' + id, ajax_data, function(data) {
        app.dialog.close();
        if (data.success) {
          reload_anggota_keluarga_table();
        } else {
          app.dialog.alert(data.desc);
        }
      }, function() {
        app.dialog.close();
        app.dialog.alert('Data Gagal Disimpan, Mohon Coba Lagi Nanti');
      }, 'json');
    }
  });
}

function reload_anggota_keluarga_table() {
  anggota_keluarga_html = '<tr><td></td><td></td><td>Data Kosong</td><td></td><td></td><td></td><td></td><td></td></tr>';
  $$("#anggota_keluarga_table table tbody").html(anggota_keluarga_html);
  anggota_keluarga_row = '';
  app.request.post(site_url_mobile_layanan + '/skck_online/get_keluarga', iamthedoor, function(data) {
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

    $$(".hapus_anggota").on('click', function() {
      anggota_id = $(this).data("id");
      app.dialog.confirm('Apakah anda yakin Menghapus data?', function() {
        app.dialog.preloader('Loading...');
        app.request.post(site_url_mobile_layanan + '/skck_online/delete_keluarga/' + anggota_id, iamthedoor, function(data) {
          app.dialog.close();
          if (data.success) {
            reload_anggota_keluarga_table();
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
    content: '<div class="popup page-content">'+
      '<div class="block">'+
        '<form class="list" id="tambah_hobi" data-id="null">'+
          '<div class="block-title">'+
            '<div class="row">'+
              '<div class="col-100">'+
                '<div class="chip color-blue">'+
                  '<div class="chip-label">Data Kegemaran / Hobi</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<ul>'+
            '<li class="item-content item-input manual">'+
              '<div class="item-inner">'+
                '<div class="item-title item-label">Hobi*</div>'+
                '<div class="item-input-wrap">'+
                  '<input type="text" name="hobi" id="hobi" required validate>'+
                '</div>'+
              '</div>'+
            '</li>'+
            '<input type="hidden" name="status" value="tersimpan">'+
          '</ul>'+
        '</form>'+
        '<div class="row">'+
          '<div class="col-40">'+
            '<a class="button button-round popup-close button-fill color-red" style="margin-top: 10px;">' +
              '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Batal</span>' +
            '</a>'+
          '</div>'+
          '<div class="col-60">'+
            '<a class="button button-round popup-close button-fill color-green" id="save_hobi" style="margin-top: 10px;">' +
              '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
            '</a>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>',
    on: {
      open: function(popup) {},
    }
  });
  popup_hobi.open();
  $$("#save_hobi").on('click', function() {
    app.input.validateInputs('#tambah_hobi');
    if ($$('#tambah_hobi')[0].checkValidity() == true) {
      popup_hobi.close();

      let form_data = app.form.convertToData('#tambah_hobi');
      let ajax_data = new Array();
      ajax_data.push(iamthedoor);
      ajax_data.push(form_data);

      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/skck_online/create_hobi/' + id, ajax_data, function(data) {
        app.dialog.close();
        if (data.success) {
          reload_hobi_table();
        } else {
          app.dialog.alert(data.desc);
        }
      }, function() {
        app.dialog.close();
        app.dialog.alert('Data Gagal Disimpan, Mohon Coba Lagi Nanti');
      }, 'json');
    }
  });
}

function reload_hobi_table() {
  list_hobi_html = '<tr><td>Data Kosong</td><td></td></tr>';
  $$("#hobi_table table tbody").html(list_hobi_html);
  list_hobi_row = '';
  app.request.post(site_url_mobile_layanan + '/skck_online/get_hobi', iamthedoor, function(data) {
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

    $$(".hapus_hobi").on('click', function() {
      hobi_id = $(this).data("id");
      app.dialog.confirm('Apakah anda yakin Menghapus data?', function() {
        app.dialog.preloader('Loading...');
        app.request.post(site_url_mobile_layanan + '/skck_online/delete_hobi/' + hobi_id, iamthedoor, function(data) {
          app.dialog.close();
          if (data.success) {
            reload_hobi_table();
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
    content: '<div class="popup page-content">'+
      '<div class="block">'+
        '<form class="list" id="tambah_pendidian" data-id="null">'+
          '<div class="block-title">'+
            '<div class="row">'+
              '<div class="col-100">'+
                '<div class="chip color-blue">'+
                  '<div class="chip-label">Data Kegemaran / Hobi</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<ul>'+
            '<li class="item-content item-input manual">'+
              '<div class="item-inner">'+
                '<div class="item-title item-label">Tingkat*</div>'+
                '<div class="item-input-wrap input-dropdown-wrap">'+
                  '<select name="tingkat" id="tingkat">'+
                    '<option value="SD">SD</option>'+
                    '<option value="SMP">SMP</option>'+
                    '<option value="SMA">SMA</option>'+
                    '<option value="SMK">SMK</option>'+
                    '<option value="Perguruan Tinggi">Perguruan Tinggi</option>'+
                  '</select>'+
                '</div>'+
              '</div>'+
            '</li>'+
            '<li class="item-content item-input manual">'+
              '<div class="item-inner">'+
                '<div class="item-title item-label">Nama Sekolah*</div>'+
                '<div class="item-input-wrap">'+
                  '<input type="text" name="nama_sekolah" id="nama_sekolah" required validate>'+
                '</div>'+
              '</div>'+
            '</li>'+
            '<li class="item-content item-input manual">'+
              '<div class="item-inner">'+
                '<div class="item-title item-label">Tahun Lulus*</div>'+
                '<div class="item-input-wrap">'+
                  '<input type="number" name="tahun_lulus" id="tahun_lulus" required validate>'+
                '</div>'+
              '</div>'+
            '</li>'+
            '<input type="hidden" name="status" value="tersimpan">'+
          '</ul>'+
        '</form>'+
        '<div class="row">'+
          '<div class="col-40">'+
            '<a class="button button-round popup-close button-fill color-red" style="margin-top: 10px;">' +
              '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Batal</span>' +
            '</a>'+
          '</div>'+
          '<div class="col-60">'+
            '<a class="button button-round popup-close button-fill color-green" id="save_pendidikan" style="margin-top: 10px;">' +
              '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
            '</a>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>',
    on: {
      open: function(popup) {},
    }
  });
  popup_pendidikan.open();
  $$("#save_pendidikan").on('click', function() {
    app.input.validateInputs('#tambah_pendidian');
    if ($$('#tambah_pendidian')[0].checkValidity() == true) {
      popup_pendidikan.close();
      
      let form_data = app.form.convertToData('#tambah_pendidian');
      let ajax_data = new Array();
      ajax_data.push(iamthedoor);
      ajax_data.push(form_data);

      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/skck_online/create_pendidikan/' + id, ajax_data, function(data) {
        app.dialog.close();
        if (data.success) {
          reload_pendidikan_table();
        } else {
          app.dialog.alert(data.desc);
        }
      }, function() {
        app.dialog.close();
        app.dialog.alert('Data Gagal Disimpan, Mohon Coba Lagi Nanti');
      }, 'json');
    }
  });
}

function reload_pendidikan_table() {
  list_pendidikan_html = '<tr><td></td><td>Data Kosong</td><td></td><td></td></tr>';
  $$("#pendidikan_table table tbody").html(list_pendidikan_html);
  list_pendidikan_row = '';
  app.request.post(site_url_mobile_layanan + '/skck_online/get_pendidikan', iamthedoor, function(data) {
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

    $$(".hapus_pendidikan").on('click', function() {
      pendidikan_id = $(this).data("id");
      app.dialog.confirm('Apakah anda yakin Menghapus data?', function() {
        app.dialog.preloader('Loading...');
        app.request.post(site_url_mobile_layanan + '/skck_online/delete_pendidikan/' + pendidikan_id, iamthedoor, function(data) {
          app.dialog.close();
          if (data.success) {
            reload_pendidikan_table();
          } else {
            app.dialog.alert(data.desc);
          }
        }, 'json');
      });
    });
  }, 'json');
}