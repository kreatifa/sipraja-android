tablename = "surat_pengantar_kua_luar";
var surat_pengantar_kua_luar = {
  path: '/tipe-a/surat_pengantar_kua_luar',
  url: './pages/tipe-a/surat_pengantar_kua_luar.html',
  name: 'surat_pengantar_kua_luar',
  on: {
    pageInit: function() {
      $$("#btnnew").hide();
      if (datauser.role_id == "4") {
        $$("#btnnew").show();
      }
      var statusselect = app.smartSelect.create({
        el: '.statusselect',
        on: {
          close: function() {
            app.dialog.preloader('Loading...');
            datatables.context[0].ajax.url = site_url_mobile_layanan + '/surat_pengantar_kua_luar/layanan/' + $$('#statusselect').val();
            $('#datatables').DataTable().ajax.reload(function(json) {
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
        "serverSide": true,
        "ajax": {
          "url": site_url_mobile_layanan + '/surat_pengantar_kua_luar/layanan/1',
          "data": iamthedoor,
          "type": "GET"
        },
        "columns": [
          { "data": "id" },
          { "data": "kode_transaksi" },
          { "data": "nomor" },
          { "data": "display_name" },
          { "data": "val_status", "width": "20%" },
        ],
        "initComplete": function(settings, json) {
          app.dialog.close();
          $$('#datatables_length').hide();
          $$('#datatables_filter').hide();
          $$('#datatables_paginate').hide();
        },
        "rowCallback": function(row, data) {
          $('td:eq(6)', row).html('<span style="background-color:transparent; padding:5px; border-radius:10px; ">Bisa<br>Diambil</span>');
          if (data.val_status) {
            var color = 'transparent';
            if (data.val_status == 'Ditolak') var color = 'transparent';
            if (data.val_status == 'Menunggu') var color = 'transparent';
            if (data.val_status == 'Belum Dikirim') var color = 'transparent';
            $('td:eq(6)', row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px;">' + data.val_status + '</span>');
          }
          if (data.val_status == 'Menunggu') {
            if (datauser.role_id == '4') {
              $('td:eq(0)', row).html('<a href="/tipe-a/edit_surat_pengantar_kua_luar/' + data.id + '/edit/" class="button button-small button-fill color-blue">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');
            } else {
              $('td:eq(0)', row).html('<a href="/tipe-a/edit_surat_pengantar_kua_luar/' + data.id + '/approve/" class="button button-small button-fill color-green">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Approve</a>');
            }
          } else {
            $('td:eq(0)', row).html('<a href="/tipe-a/edit_surat_pengantar_kua_luar/' + data.id + '/lihat/" class="button button-small button-fill color-green">' +
              '<i class="icon f7-icons" style="font-size: 12pt;">zoom_in</i> Lihat</a>');
          }
          if (!data.display_name) {
            $('td:eq(5)', row).html('---');
          }
          if (!data.nomor) {
            $('td:eq(2)', row).html('---');
          }
        }
      });
    }
  }
};
var edit_surat_pengantar_kua_luar = {
  path: '/tipe-a/edit_surat_pengantar_kua_luar/:id/:tipe',
  url: './pages/tipe-a/edit_surat_pengantar_kua_luar.html',
  name: 'edit_surat_pengantar_kua_luar',
  on: {
    pageInit: function() {
      tablename = "surat_pengantar_kua_luar";
      var calendar_tanggal_lahir_ayah = app.calendar.create({
        inputEl: '#tanggal_lahir_ayah',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_lahir_ibu = app.calendar.create({
        inputEl: '#tanggal_lahir_ibu',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_lahir_pemohon = app.calendar.create({
        inputEl: '#tanggal_lahir_pemohon',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_lahir_pasangan = app.calendar.create({
        inputEl: '#tanggal_lahir_pasangan',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_lahir_wali_nasab = app.calendar.create({
        inputEl: '#tanggal_lahir_wali_nasab',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_lahir_mantan_pasangan = app.calendar.create({
        inputEl: '#tanggal_lahir_mantan_pasangan',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_meninggal_mantan_pasangan = app.calendar.create({
        inputEl: '#tanggal_meninggal_mantan_pasangan',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_lahir_ayah_pasangan = app.calendar.create({
        inputEl: '#tanggal_lahir_ayah_pasangan',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_lahir_ibu_pasangan = app.calendar.create({
        inputEl: '#tanggal_lahir_ibu_pasangan',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_lahir_saksi_satu = app.calendar.create({
        inputEl: '#tanggal_lahir_saksi_satu',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_lahir_saksi_dua = app.calendar.create({
        inputEl: '#tanggal_lahir_saksi_dua',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_pemberkatan_perkawinan = app.calendar.create({
        inputEl: '#tanggal_pemberkatan_perkawinan',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_melapor = app.calendar.create({
        inputEl: '#tanggal_melapor',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_putusan_pengadilan = app.calendar.create({
        inputEl: '#tanggal_putusan_pengadilan',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });

      get_pilihan_umum({
        pend_elem: ['#pendidikan_terakhir_pemohon', '#pendidikan_terakhir_pasangan'],
        kerja_elem: [
          '#pekerjaan_pemohon', '#pekerjaan_ayah',
          '#pekerjaan_ibu', '#pekerjaan_pasangan',
          '#pekerjaan_ayah_pasangan', '#pekerjaan_ibu_pasangan',
          '#pekerjaan_wali_nasab', '#pekerjaan_mantan_pasangan',
          '#pekerjaan_saksi_satu', '#pekerjaan_saksi_dua'
        ]
      });

      if ($$('.bs-timepicker').length) {
        $('.bs-timepicker').timepicker();
      }

      var opsi = '';
      if(datauser.jenis_kelamin == 'Laki-Laki'){
        opsi = '<option value="Perjaka" selected>Perjaka</option>' +
        '<option value="Duda Cerai">Duda Cerai</option>' +
        '<option value="Duda Mati">Duda Mati</option>' +
        '<option value="Istri-ke">Istri-ke</option>';
      } else {
        opsi = '<option value="Perawan">Perawan</option>'+
        '<option value="Janda Cerai">Janda Cerai</option>'+
        '<option value="Janda Mati">Janda Mati</option>';
      }

      $$("#status_perkawinan_pemohon").html(opsi);
      $$("#status_perkawinan_pemohon").on("change", function() {
        if(this.value == 'Istri-ke'){
          $$("#istri_ke_pemohon").show();
        } else {
          $$("#istri_ke_pemohon").hide();
        }
      });

      var opsi_pasangan = '';
      if(datauser.jenis_kelamin == 'Laki-Laki'){
        opsi_pasangan = '<option value="Perawan">Perawan</option>'+
        '<option value="Janda Cerai">Janda Cerai</option>'+
        '<option value="Janda Mati">Janda Mati</option>';
      } else {
        opsi_pasangan = '<option value="Perjaka" selected>Perjaka</option>' +
        '<option value="Duda Cerai">Duda Cerai</option>' +
        '<option value="Duda Mati">Duda Mati</option>' +
        '<option value="Istri-ke">Istri-ke</option>';
      }

      $$("#status_perkawinan_pasangan").html(opsi_pasangan);
      $$("#status_perkawinan_pasangan").on("change", function() {
        if(this.value == 'Istri-ke'){
          $$("#istri_ke_pasangan").show();
        } else {
          $$("#istri_ke_pasangan").hide();
        }
      });

      $$("#status_perkawinan_pemohon").on("change", function() {
        if(this.value == 'Janda Mati' || this.value == 'Duda Mati'){
          $$(".pasangan_meninggal").show();
        } else {
          $$(".pasangan_meninggal").hide();
        }
      });

      if($$("#status_perkawinan_pemohon") != 'Janda Mati' || $$("#status_perkawinan_pemohon") != 'Duda Mati'){
        $$(".pasangan_meninggal").hide();
      }

      $$("#status_wali").on("change", function() {
        if(this.value == 'Wali Nasab'){
          $$(".wali_nasab").show();
        } else {
          $$(".wali_nasab").hide();
        }
      });

      if($$("#status_wali") == 'Wali Nasab'){
        $$(".wali_nasab").show();
      } else {
        $$(".wali_nasab").hide();
      }

      var nama_ayah = '';
      $('#status_ayah').on('change', function(){
        if($('#status_ayah').val() == 'Hidup'){
          nama_ayah = '';
          $(".checker_ayah").prop('disabled', false);
          $('select .checker_ayah').trigger("chosen:updated");
        }else{
          nama_ayah = '(ALM)';
          $(".checker_ayah").prop('disabled', true);
          $('select .checker_ayah').trigger("chosen:updated");
        }
        $$("#nama_dan_alias_ayah").val(nama_ayah);
      })

      var nama_ibu = '';
      $('#status_ibu').on('change', function(){
        if($('#status_ibu').val() == 'Hidup'){
          nama_ibu = '';
          $(".checker_ibu").prop('disabled', false);
          $('select .checker_ibu').trigger("chosen:updated");
        }else{
          nama_ibu = '(ALMH)';
          $(".checker_ibu").prop('disabled', true);
          $('select .checker_ibu').trigger("chosen:updated");
        }
        $$("#nama_dan_alias_ibu").val(nama_ibu);
      })

      if($('#status_ayah').val() == 'Meninggal'){
        $(".checker_ayah").prop('disabled', true);
      }

      if($('#status_ibu').val() == 'Meninggal'){
        $(".checker_ibu").prop('disabled', true);
      }

      var this_user_is_the_last_index = false;
      var id = mainView.router.currentRoute.params.id;
      var tipe = mainView.router.currentRoute.params.tipe;
      $$(".checked_approval_button").hide();
      if (tipe == 'edit') {
        $$('#approval').hide();
        $$("#addformupload").show();
        $$("#addformupload").on("touchend", addrow);
      }
      $$("#print_button").on("click", function() {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/surat_pengantar_kua_luar/print_doc/' + id, iamthedoor, function(doc_path) {
          download_doc(doc_path);
        }, 'json');
      });
      $$("#print_pernyataan").on("click", function() {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/surat_pengantar_kua_luar/print_pernyataan/' + id, iamthedoor, function(doc_path) {
          download_doc(doc_path);
        }, 'json');
      });
      $$("#print_wali").on("click", function() {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/surat_pengantar_kua_luar/print_wali/' + id, iamthedoor, function(doc_path) {
          download_doc(doc_path);
        }, 'json');
      });
      $$("#print_kematian").on("click", function() {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/surat_pengantar_kua_luar/print_kematian/' + id, iamthedoor, function(doc_path) {
          download_doc(doc_path);
        }, 'json');
      });
      $$("#print_nasab").on("click", function() {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/surat_pengantar_kua_luar/print_nasab/' + id, iamthedoor, function(doc_path) {
          download_doc(doc_path);
        }, 'json');
      });
      data = [];
      data.push(iamthedoor);
      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/surat_pengantar_kua_luar/find_layanan/' + id + '/' + datauser.bf_users_id, data, function(data) {
        if (data == false) {
          app.dialog.close();
          app.dialog.alert('Data tidak ditemukan');
          mainView.router.back();
        } else {
          this_user_is_the_last_index = data.this_user_is_the_last_index;
          var opsi_jk = '';
          if(data.layanan.jenis_kelamin_pemohon == 'Laki-Laki'){
            opsi_jk = '<option value="Perempuan">Perempuan</option>';
          } else {
            opsi_jk = '<option value="Laki-Laki">Laki-Laki</option>';
          }
          $$("#jenis_kelamin_pasangan").html(opsi_jk);

          $$("input[name='nama_lengkap_pemohon']").val(data.layanan.nama_lengkap_pemohon);
          $$("input[name='nik_pemohon']").val(data.layanan.nik_pemohon);
          $$("input[name='tempat_lahir_pemohon']").val(data.layanan.tempat_lahir_pemohon);
          $$("input[name='tanggal_lahir_pemohon']").val(data.layanan.tanggal_lahir_pemohon);
          $$("select[name='jenis_kelamin_pemohon']").val(data.layanan.jenis_kelamin_pemohon).change();
          $$("select[name='kwn_pemohon']").val(data.layanan.kwn_pemohon).change();
          $$("select[name='agama_pemohon']").val(data.layanan.agama_pemohon).change();
          $$("textarea[name='alamat_pemohon']").val(data.layanan.alamat_pemohon);
          $$("input[name='telp_pemohon']").val(data.layanan.telp_pemohon);
          $$("input[name='email_pemohon']").val(data.layanan.email_pemohon);
          $$("textarea[name='keterangan_pemohon']").val(data.layanan.keterangan_pemohon);
          get_provinsi_new('#provinsi_pemohon', data.layanan.prov_pemohon);
          $$('#provinsi_pemohon').on('change', function() {
            get_kabupaten_new($$('#provinsi_pemohon').val(), '#kota_pemohon', data.layanan.kab_pemohon);
          });
          $$('#kota_pemohon').on('change', function() {
            get_kecamatan_new($$('#kota_pemohon').val(), '#kecamatan_pemohon', data.layanan.kec_pemohon);
          });
          $$('#kecamatan_pemohon').on('change', function() {
            get_kelurahan_new($$('#kecamatan_pemohon').val(), '#kelurahan_pemohon', data.layanan.kel_pemohon);
          });

          if (data.approve !== null) {
            $$("input[name='approve_items_id']").val(data.approve.id);
            $$("input[name='type_ttd']").val(data.approve.author_type);
            document_look(data.latest_status.status_approval, data.latest_status.display_name);
            if (data.approve.ttd !== null) {
              ttdview(data.approve.ttd);
            }
          }

          var opsi = '';
          if(data.layanan.jenis_kelamin_pemohon == 'Laki-Laki'){
            opsi = '<option value="Perjaka" selected>Perjaka</option>' +
            '<option value="Duda Cerai">Duda Cerai</option>' +
            '<option value="Duda Mati">Duda Mati</option>' +
            '<option value="Istri-ke">Istri-ke</option>';
          } else {
            opsi = '<option value="Perawan">Perawan</option>'+
            '<option value="Janda Cerai">Janda Cerai</option>'+
            '<option value="Janda Mati">Janda Mati</option>';
          }
          $$("#status_perkawinan_pemohon").html(opsi);

          $$("select[name='status_perkawinan_pemohon']").val(data.layanan.status_perkawinan_pemohon).change();
          $$("input[name='istri_ke_pemohon']").val(data.layanan.istri_ke_pemohon);
          $$("input[name='umur_pemohon']").val(data.layanan.umur_pemohon);
          $$("input[name='umur_pasangan']").val(data.layanan.umur_pasangan);
          $$("input[name='no_paspor_pemohon']").val(data.layanan.no_paspor_pemohon);
          $$("select[name='pekerjaan_pemohon']").val(data.layanan.pekerjaan_pemohon).change();
          $$("select[name='pendidikan_terakhir_pemohon']").val(data.layanan.pendidikan_terakhir_pemohon).change();
          $$("input[name='kebangsaan_pemohon']").val(data.layanan.kebangsaan_pemohon);
          $$("input[name='anak_ke_pemohon']").val(data.layanan.anak_ke_pemohon);
          $$("input[name='pernikahan_ke_pemohon']").val(data.layanan.pernikahan_ke_pemohon);

          $$("input[name='nama_mantan_pasangan']").val(data.layanan.nama_mantan_pasangan);
          $$("input[name='ayah_mantan_pasangan']").val(data.layanan.ayah_mantan_pasangan);
          $$("input[name='nik_mantan_pasangan']").val(data.layanan.nik_mantan_pasangan);
          $$("input[name='tempat_lahir_mantan_pasangan']").val(data.layanan.tempat_lahir_mantan_pasangan);
          $$("input[name='tanggal_lahir_mantan_pasangan']").val(data.layanan.tanggal_lahir_mantan_pasangan);
          $$("select[name='kewarganegaraan_mantan_pasangan']").val(data.layanan.kewarganegaraan_mantan_pasangan).change();
          $$("select[name='agama_mantan_pasangan']").val(data.layanan.agama_mantan_pasangan).change();
          $$("select[name='pekerjaan_mantan_pasangan']").val(data.layanan.pekerjaan_mantan_pasangan).change();
          $$("textarea[name='alamat_mantan_pasangan']").val(data.layanan.alamat_mantan_pasangan);
          $$("input[name='tanggal_meninggal_mantan_pasangan']").val(data.layanan.tanggal_meninggal_mantan_pasangan);
          $$("input[name='tempat_meninggal_mantan_pasangan']").val(data.layanan.tempat_meninggal_mantan_pasangan);

          $$("select[name='status_wali']").val(data.layanan.status_wali).change();
          $$("input[name='nama_wali_nasab']").val(data.layanan.nama_wali_nasab);
          $$("input[name='nik_wali_nasab']").val(data.layanan.nik_wali_nasab);
          $$("input[name='tempat_lahir_wali_nasab']").val(data.layanan.tempat_lahir_wali_nasab);
          $$("input[name='tanggal_lahir_wali_nasab']").val(data.layanan.tanggal_lahir_wali_nasab);
          $$("select[name='kwn_wali_nasab']").val(data.layanan.kwn_wali_nasab).change();
          $$("select[name='agama_wali_nasab']").val(data.layanan.agama_wali_nasab).change();
          $$("select[name='hubungan_perwalian']").val(data.layanan.hubungan_perwalian).change();
          $$("select[name='pekerjaan_wali_nasab']").val(data.layanan.pekerjaan_wali_nasab).change();
          $$("textarea[name='alamat_wali_nasab']").val(data.layanan.alamat_wali_nasab);

          $$("select[name='status_ayah']").val(data.layanan.status_ayah).change();
          $$("input[name='nama_dan_alias_ayah']").val(data.layanan.nama_dan_alias_ayah);
          $$("input[name='nik_ayah']").val(data.layanan.nik_ayah);
          $$("input[name='tempat_lahir_ayah']").val(data.layanan.tempat_lahir_ayah);
          $$("input[name='tanggal_lahir_ayah']").val(data.layanan.tanggal_lahir_ayah);
          $$("select[name='kwn_ayah']").val(data.layanan.kwn_ayah).change();
          $$("select[name='agama_ayah']").val(data.layanan.agama_ayah).change();
          $$("select[name='pekerjaan_ayah']").val(data.layanan.pekerjaan_ayah).change();
          $$("textarea[name='alamat_ayah']").val(data.layanan.alamat_ayah);
          $$("input[name='rt_ayah']").val(data.layanan.rt_ayah);
          $$("input[name='rw_ayah']").val(data.layanan.rw_ayah);
          $$("input[name='kode_pos_ayah']").val(data.layanan.kode_pos_ayah);
          $$("input[name='telp_ayah']").val(data.layanan.telp_ayah);
          get_provinsi_new('#provinsi_ayah', data.layanan.provinsi_ayah);
          $$('#provinsi_ayah').on('change', function() {
            get_kabupaten_new($$('#provinsi_ayah').val(), '#kota_ayah', data.layanan.kota_ayah);
          });
          $$('#kota_ayah').on('change', function() {
            get_kecamatan_new($$('#kota_ayah').val(), '#kecamatan_ayah', data.layanan.kecamatan_ayah);
          });
          $$('#kecamatan_ayah').on('change', function() {
            get_kelurahan_new($$('#kecamatan_ayah').val(), '#kelurahan_ayah', data.layanan.kelurahan_ayah);
          });

          $$("select[name='status_ibu']").val(data.layanan.status_ibu).change();
          $$("input[name='nama_dan_alias_ibu']").val(data.layanan.nama_dan_alias_ibu);
          $$("input[name='nik_ibu']").val(data.layanan.nik_ibu);
          $$("input[name='tempat_lahir_ibu']").val(data.layanan.tempat_lahir_ibu);
          $$("input[name='tanggal_lahir_ibu']").val(data.layanan.tanggal_lahir_ibu);
          $$("select[name='kwn_ibu']").val(data.layanan.kwn_ibu).change();
          $$("select[name='agama_ibu']").val(data.layanan.agama_ibu).change();
          $$("select[name='pekerjaan_ibu']").val(data.layanan.pekerjaan_ibu).change();
          $$("textarea[name='alamat_ibu']").val(data.layanan.alamat_ibu);
          $$("input[name='rt_ibu']").val(data.layanan.rt_ibu);
          $$("input[name='rw_ibu']").val(data.layanan.rw_ibu);
          $$("input[name='kode_pos_ibu']").val(data.layanan.kode_pos_ibu);
          $$("input[name='telp_ibu']").val(data.layanan.telp_ibu);
          get_provinsi_new('#provinsi_ibu', data.layanan.provinsi_ibu);
          $$('#provinsi_ibu').on('change', function() {
            get_kabupaten_new($$('#provinsi_ibu').val(), '#kota_ibu', data.layanan.kota_ibu);
          });
          $$('#kota_ibu').on('change', function() {
            get_kecamatan_new($$('#kota_ibu').val(), '#kecamatan_ibu', data.layanan.kecamatan_ibu);
          });
          $$('#kecamatan_ibu').on('change', function() {
            get_kelurahan_new($$('#kecamatan_ibu').val(), '#kelurahan_ibu', data.layanan.kelurahan_ibu);
          });

          $$("input[name='nik_pasangan']").val(data.layanan.nik_pasangan);
          $$("input[name='no_kk_pasangan']").val(data.layanan.no_kk_pasangan);
          $$("input[name='no_paspor_pasangan']").val(data.layanan.no_paspor_pasangan);
          $$("input[name='nama_pasangan']").val(data.layanan.nama_pasangan);
          $$("select[name='pekerjaan_pasangan']").val(data.layanan.pekerjaan_pasangan).change();
          $$("select[name='pendidikan_terakhir_pasangan']").val(data.layanan.pendidikan_terakhir_pasangan).change();
          $$("input[name='tempat_lahir_pasangan']").val(data.layanan.tempat_lahir_pasangan);
          $$("input[name='tanggal_lahir_pasangan']").val(data.layanan.tanggal_lahir_pasangan);
          $$("input[name='bin_binti_pasangan']").val(data.layanan.bin_binti_pasangan);
          $$("select[name='jenis_kelamin_pasangan']").val(data.layanan.jenis_kelamin_pasangan).change();
          $$("input[name='kebangsaan_pasangan']").val(data.layanan.kebangsaan_pasangan);
          $$("select[name='kwn_pasangan']").val(data.layanan.kwn_pasangan).change();
          $$("select[name='agama_pasangan']").val(data.layanan.agama_pasangan).change();
          $$("input[name='anak_ke_pasangan']").val(data.layanan.anak_ke_pasangan);
          $$("input[name='pernikahan_ke_pasangan']").val(data.layanan.pernikahan_ke_pasangan);
          $$("textarea[name='alamat_pasangan']").val(data.layanan.alamat_pasangan);

          $$("input[name='nik_ayah_pasangan']").val(data.layanan.nik_ayah_pasangan);
          $$("input[name='nama_dan_alias_ayah_pasangan']").val(data.layanan.nama_dan_alias_ayah_pasangan);
          $$("input[name='tempat_lahir_ayah_pasangan']").val(data.layanan.tempat_lahir_ayah_pasangan);
          $$("input[name='tanggal_lahir_ayah_pasangan']").val(data.layanan.tanggal_lahir_ayah_pasangan);
          $$("select[name='kwn_ayah_pasangan']").val(data.layanan.kwn_ayah_pasangan).change();
          $$("select[name='agama_ayah_pasangan']").val(data.layanan.agama_ayah_pasangan).change();
          $$("textarea[name='alamat_ayah_pasangan']").val(data.layanan.alamat_ayah_pasangan);
          $$("input[name='rt_ayah_pasangan']").val(data.layanan.rt_ayah_pasangan);
          $$("input[name='rw_ayah_pasangan']").val(data.layanan.rw_ayah_pasangan);
          $$("input[name='kode_pos_ayah_pasangan']").val(data.layanan.kode_pos_ayah_pasangan);
          $$("input[name='telp_ayah_pasangan']").val(data.layanan.telp_ayah_pasangan);
          $$("select[name='pekerjaan_ayah_pasangan']").val(data.layanan.pekerjaan_ayah_pasangan).change();
          get_provinsi_new('#provinsi_ayah_pasangan', data.layanan.provinsi_ayah_pasangan);
          $$('#provinsi_ayah_pasangan').on('change', function() {
            get_kabupaten_new($$('#provinsi_ayah_pasangan').val(), '#kota_ayah_pasangan', data.layanan.kota_ayah_pasangan);
          });
          $$('#kota_ayah_pasangan').on('change', function() {
            get_kecamatan_new($$('#kota_ayah_pasangan').val(), '#kecamatan_ayah_pasangan', data.layanan.kecamatan_ayah_pasangan);
          });
          $$('#kecamatan_ayah_pasangan').on('change', function() {
            get_kelurahan_new($$('#kecamatan_ayah_pasangan').val(), '#kelurahan_ayah_pasangan', data.layanan.kelurahan_ayah_pasangan);
          });

          $$("input[name='nik_ibu_pasangan']").val(data.layanan.nik_ibu_pasangan);
          $$("input[name='nama_dan_alias_ibu_pasangan']").val(data.layanan.nama_dan_alias_ibu_pasangan);
          $$("input[name='tempat_lahir_ibu_pasangan']").val(data.layanan.tempat_lahir_ibu_pasangan);
          $$("input[name='tanggal_lahir_ibu_pasangan']").val(data.layanan.tanggal_lahir_ibu_pasangan);
          $$("select[name='kwn_ibu_pasangan']").val(data.layanan.kwn_ibu_pasangan).change();
          $$("select[name='agama_ibu_pasangan']").val(data.layanan.agama_ibu_pasangan).change();
          $$("textarea[name='alamat_ibu_pasangan']").val(data.layanan.alamat_ibu_pasangan);
          $$("input[name='rt_ibu_pasangan']").val(data.layanan.rt_ibu_pasangan);
          $$("input[name='rw_ibu_pasangan']").val(data.layanan.rw_ibu_pasangan);
          $$("input[name='kode_pos_ibu_pasangan']").val(data.layanan.kode_pos_ibu_pasangan);
          $$("input[name='telp_ibu_pasangan']").val(data.layanan.telp_ibu_pasangan);
          $$("select[name='pekerjaan_ibu_pasangan']").val(data.layanan.pekerjaan_ibu_pasangan).change();
          get_provinsi_new('#provinsi_ibu_pasangan', data.layanan.provinsi_ibu_pasangan);
          $$('#provinsi_ibu_pasangan').on('change', function() {
            get_kabupaten_new($$('#provinsi_ibu_pasangan').val(), '#kota_ibu_pasangan', data.layanan.kota_ibu_pasangan);
          });
          $$('#kota_ibu_pasangan').on('change', function() {
            get_kecamatan_new($$('#kota_ibu_pasangan').val(), '#kecamatan_ibu_pasangan', data.layanan.kecamatan_ibu_pasangan);
          });
          $$('#kecamatan_ibu_pasangan').on('change', function() {
            get_kelurahan_new($$('#kecamatan_ibu_pasangan').val(), '#kelurahan_ibu_pasangan', data.layanan.kelurahan_ibu_pasangan);
          });

          $$("input[name='nik_saksi_satu']").val(data.layanan.nik_saksi_satu);
          $$("input[name='nama_dan_alias_saksi_satu']").val(data.layanan.nama_dan_alias_saksi_satu);
          $$("input[name='tempat_lahir_saksi_satu']").val(data.layanan.tempat_lahir_saksi_satu);
          $$("input[name='tanggal_lahir_saksi_satu']").val(data.layanan.tanggal_lahir_saksi_satu);
          $$("select[name='kwn_saksi_satu']").val(data.layanan.kwn_saksi_satu).change();
          $$("select[name='agama_saksi_satu']").val(data.layanan.agama_saksi_satu).change();
          $$("textarea[name='alamat_saksi_satu']").val(data.layanan.alamat_saksi_satu);
          $$("input[name='rt_saksi_satu']").val(data.layanan.rt_saksi_satu);
          $$("input[name='rw_saksi_satu']").val(data.layanan.rw_saksi_satu);
          $$("input[name='kode_pos_saksi_satu']").val(data.layanan.kode_pos_saksi_satu);
          $$("input[name='telp_saksi_satu']").val(data.layanan.telp_saksi_satu);
          $$("select[name='pekerjaan_saksi_satu']").val(data.layanan.pekerjaan_saksi_satu).change();
          get_provinsi_new('#provinsi_saksi_satu', data.layanan.provinsi_saksi_satu);
          $$('#provinsi_saksi_satu').on('change', function() {
            get_kabupaten_new($$('#provinsi_saksi_satu').val(), '#kota_saksi_satu', data.layanan.kota_saksi_satu);
          });
          $$('#kota_saksi_satu').on('change', function() {
            get_kecamatan_new($$('#kota_saksi_satu').val(), '#kecamatan_saksi_satu', data.layanan.kecamatan_saksi_satu);
          });
          $$('#kecamatan_saksi_satu').on('change', function() {
            get_kelurahan_new($$('#kecamatan_saksi_satu').val(), '#kelurahan_saksi_satu', data.layanan.kelurahan_saksi_satu);
          });

          $$("input[name='nik_saksi_dua']").val(data.layanan.nik_saksi_dua);
          $$("input[name='nama_dan_alias_saksi_dua']").val(data.layanan.nama_dan_alias_saksi_dua);
          $$("input[name='tempat_lahir_saksi_dua']").val(data.layanan.tempat_lahir_saksi_dua);
          $$("input[name='tanggal_lahir_saksi_dua']").val(data.layanan.tanggal_lahir_saksi_dua);
          $$("select[name='kwn_saksi_dua']").val(data.layanan.kwn_saksi_dua).change();
          $$("select[name='agama_saksi_dua']").val(data.layanan.agama_saksi_dua).change();
          $$("textarea[name='alamat_saksi_dua']").val(data.layanan.alamat_saksi_dua);
          $$("input[name='rt_saksi_dua']").val(data.layanan.rt_saksi_dua);
          $$("input[name='rw_saksi_dua']").val(data.layanan.rw_saksi_dua);
          $$("input[name='kode_pos_saksi_dua']").val(data.layanan.kode_pos_saksi_dua);
          $$("input[name='telp_saksi_dua']").val(data.layanan.telp_saksi_dua);
          $$("select[name='pekerjaan_saksi_dua']").val(data.layanan.pekerjaan_saksi_dua).change();
          get_provinsi_new('#provinsi_saksi_dua', data.layanan.provinsi_saksi_dua);
          $$('#provinsi_saksi_dua').on('change', function() {
            get_kabupaten_new($$('#provinsi_saksi_dua').val(), '#kota_saksi_dua', data.layanan.kota_saksi_dua);
          });
          $$('#kota_saksi_dua').on('change', function() {
            get_kecamatan_new($$('#kota_saksi_dua').val(), '#kecamatan_saksi_dua', data.layanan.kecamatan_saksi_dua);
          });
          $$('#kecamatan_saksi_dua').on('change', function() {
            get_kelurahan_new($$('#kecamatan_saksi_dua').val(), '#kelurahan_saksi_dua', data.layanan.kelurahan_saksi_dua);
          });

          $$("input[name='tanggal_pemberkatan_perkawinan']").val(data.layanan.tanggal_pemberkatan_perkawinan);
          $$("input[name='tanggal_melapor']").val(data.layanan.tanggal_melapor);
          $$("input[name='jam_melapor']").val(data.layanan.jam_melapor);
          $$("input[name='agama_perkawinan']").val(data.layanan.agama_perkawinan);
          $$("input[name='nama_badan_peradilan']").val(data.layanan.nama_badan_peradilan);
          $$("input[name='no_putusan_pengadilan']").val(data.layanan.no_putusan_pengadilan);
          $$("input[name='tanggal_putusan_pengadilan']").val(data.layanan.tanggal_putusan_pengadilan);
          $$("input[name='nama_pemuka_agama']").val(data.layanan.nama_pemuka_agama);
          $$("input[name='nomor_izin_perwakilan_wna']").val(data.layanan.nomor_izin_perwakilan_wna);
          $$("input[name='jumlah_anak_yang_disahkan']").val(data.layanan.jumlah_anak_yang_disahkan);
          $$("input[name='pelapor']").val(data.layanan.pelapor);
          $$("input[name='email_pelapor']").val(data.layanan.email_pelapor);

          $$("textarea[name='catatan']").val(data.layanan.catatan);

          var opsi_pasangan = '';
          if(data.layanan.jenis_kelamin_pemohon == 'Laki-Laki'){
            opsi_pasangan = '<option value="Perawan">Perawan</option>'+
            '<option value="Janda Cerai">Janda Cerai</option>'+
            '<option value="Janda Mati">Janda Mati</option>';
          } else {
            opsi_pasangan = '<option value="Perjaka" selected>Perjaka</option>' +
            '<option value="Duda Cerai">Duda Cerai</option>' +
            '<option value="Duda Mati">Duda Mati</option>' +
            '<option value="Istri-ke">Istri-ke</option>';
          }
          $$("#status_perkawinan_pasangan").html(opsi_pasangan);

          $$("select[name='status_perkawinan_pasangan']").val(data.layanan.status_perkawinan_pasangan).change();
          $$("input[name='istri_ke_pasangan']").val(data.layanan.istri_ke_pasangan);

          $$("input[name='pas_foto']").val(data.layanan.file_code);
          if (data.file != null) {
            $$("input[name='pas_foto_path']").val(data.file.file_actual);
          }

          if(data.layanan.status_wali == 'Wali Nasab'){
            $$('#print_nasab').show();
            $$('#print_wali').hide();
          } else {
            $$('#print_nasab').hide();
            $$('#print_wali').show();
          }

          if(data.layanan.status_perkawinan_pemohon == 'Janda Mati' || data.layanan.status_perkawinan_pemohon == 'Janda Mati'){
            $$('#print_kematian').show();
          } else {
            $$('#print_kematian').hide();
          }

          table_chron = '';
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
          if (datauser.role_id == '4') {
            $$("#btndeletelayanan").html('<a class="button button-round button-fill color-red" id="deletelayanan" style="margin-top: 10px;">' +
              '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Hapus Data</span></a>');
            if (tipe == 'edit') {
              prep_penyimpanan();
            } else {
              $$('#edit_surat_pengantar_kua_luar input').prop("disabled", true);
              $$('#edit_surat_pengantar_kua_luar textarea').prop("disabled", true);
              if (data.check_approved) {
                $$('.savebutton').hide();
                $$('.checked_approval_button').show();
              } else {
                $$('#simpan').html('<i class="icon f7-icons">arrow_left_circle_fill</i> Kembali');
                $$("#simpan").on("click", function() {
                  mainView.router.back();
                  $('#datatables').DataTable().ajax.reload();
                });
              }
            }
          } else {
            $$('#edit_surat_pengantar_kua_luar input').prop("disabled", true);
            $$('#edit_surat_pengantar_kua_luar textarea').prop("disabled", true);
            if (tipe == 'approve') {
              $$('#simpan').html('<i class="icon f7-icons">checkmark_seal_fill</i> Approve');
              $$('#print_preview_button').show();
              prep_penyimpanan();
            } else {
              if (data.check_approved) {
                $$('.savebutton').hide();
                $$('.checked_approval_button').show();
              } else {
                $$('#simpan').html('<i class="icon f7-icons">arrow_left_circle_fill</i> Kembali');
                $$("#simpan").on("click", function() {
                  mainView.router.back();
                  $('#datatables').DataTable().ajax.reload();
                });
              }
            }
          }
          if (data.layanan.file_code !== null) {
            if (tipe == 'edit') {
              find_document(id, false);
            } else {
              find_document(id, true);
            }
          }

          if (data.layanan.file_pasangan !== null) {
            if (tipe == 'edit') {
              find_document_pasangan(id, false);
            } else {
              find_document_pasangan(id, true);
            }
          }

          prep_delete(id);
          app.dialog.close();
        }
      }, function() {
        app.dialog.close();
        app.dialog.alert('Gagal');
        mainView.router.back();
      }, 'json');

      function prep_penyimpanan() {
        $$("#simpan").on("click", function() {
          data = new Array();
          if (datauser.role_id == '4') {
            app.input.validateInputs("#edit_surat_pengantar_kua_luar");
            // if ($$('#edit_surat_pengantar_kua_luar')[0].checkValidity() == true) {
              app.dialog.preloader('Proses Penyimpanan...');
              keteranganid = [];
              filecode = [];
              $('input[name^=keteranganid]').each(function() {
                keteranganid.push($(this).val());
              });
              $('input[name^=filecode]').each(function() {
                filecode.push($(this).val());
              });
              mydata = app.form.convertToData("#edit_surat_pengantar_kua_luar");
              data.push(mydata);
              data.push(iamthedoor);
              data.push(keteranganid);
              data.push(filecode);
              data.push(datauser);
              var url = site_url_mobile_layanan + '/surat_pengantar_kua_luar/save_surat_pengantar_kua_luar/update/' + id;
              app.request.post(url, data, function(data) {
                if (isNaN(data)) {
                  app.dialog.close();
                  if (data.status == 'fail') {
                    app.dialog.alert('Proses Gagal');
                  } else if (data.status == 'success') {
                    app.dialog.alert('Berhasil !');
                  } else {
                    app.dialog.alert('proses gagal');
                  }
                  $('#datatables').DataTable().ajax.reload();
                  mainView.router.back();
                } else {
                  app.dialog.close();
                  app.dialog.alert('Penyimpanan Berhasil');
                  mainView.router.back();
                  $('#datatables').DataTable().ajax.reload();
                }
              }, function() {
                app.dialog.close();
                app.dialog.alert('Penyimpanan Gagal, Coba lagi di lain waktu');
                mainView.router.back();
                $('#datatables').DataTable().ajax.reload();
              }, 'json');
            // }
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
              $$('#approve_button').on('click', function() {
                approve('/surat_pengantar_kua_luar/save_surat_pengantar_kua_luar/ustatus/' + id, this_user_is_the_last_index, $$('#esign').val());
                approval.close();
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
              $$("#approve_button").on("touchend", function() {
                approve('/surat_pengantar_kua_luar/save_surat_pengantar_kua_luar/ustatus/' + id, this_user_is_the_last_index);
                approval.close();
              });
            }
          }
        })
      }

      function prep_delete(id) {
        $$('#deletelayanan').on('click', function() {
          app.dialog.preloader('Proses Hapus Data');
          var data = [];
          data.push(iamthedoor);
          app.request.post(site_url_mobile_layanan + '/surat_pengantar_kua_luar/delete_layanan/' + id, data, function(data) {
            if (data == false) {
              app.dialog.close();
              app.dialog.alert('Data tidak ditemukan');
              mainView.router.back();
              $('#datatables').DataTable().ajax.reload();
            } else {
              app.dialog.close();
              app.dialog.alert('Berhasil Menghapus Data');
              mainView.router.back();
              $('#datatables').DataTable().ajax.reload();
            }
          }, function() {
            app.dialog.close();
            app.dialog.alert('Data Gagal dihapus, Coba lagi di lain waktu');
          }, 'json');
        });
      }
    },
  }
};