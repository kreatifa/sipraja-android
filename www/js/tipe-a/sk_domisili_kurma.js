tablename = 'sk_domisili_usaha';
var sk_domisili_kurma = {
  path: '/tipe-a/sk_domisili_kurma',
  url: './pages/tipe-a/sk_domisili_kurma.html',
  name: 'sk_domisili_kurma',
  on: {
    pageInit: function () {
      app.dialog.preloader('Loading...');
      $$('#btnnew').hide();
      if (datauser.role_id == "4") {
        $$('#btnnew').show();
      }
      
      $$('#btnnew').on('click', function(){
        app.dialog.confirm('Saya bersedia mengikuti semua persyaratan program kurma', function(){
          app.dialog.create({
            text: 'Pilih Program KURMA!',
            buttons: [
              { text: 'Kurma Umum',
                onClick: function () { 
                  mainView.router.navigate('/tipe-a/new_sk_domisili_kurma/') 
                }
              },
              { text: 'Kurma Difabel',
                onClick: function () { 
                  mainView.router.navigate('/tipe-a/new_sk_domisili_kurma_difabel/') 
                } 
              },
            ],
            verticalButtons: false,
          }).open();
        });
      });

      app.request.post(site_url_mobile_layanan + '/sk_domisili_kurma/get_kurma_set', iamthedoor, function (kurma_set) {
        if (kurma_set.kurma.value != 1) {
          $('.btnkurma').remove();
        }
        if (kurma_set.text_status.value != 1) {
          $('#kurma-register').remove();
        }

        $('#text-running').html(kurma_set.text.value);
      }, 'json');

      var statusselect = app.smartSelect.create({
        el: '.statusselect',
        on: {
          close: function () {
            app.dialog.preloader('Mohon Tunggu Sebentar...');
            datatables.context[0].ajax.url = site_url_mobile_layanan + '/sk_domisili_kurma/layanan/' + $$('#statusselect').val();
            $('#datatables').DataTable().ajax.reload(function (json) {
              app.dialog.close();
              if (!json.data) {
                app.dialog.alert('Data tidak dapat ditemukan');
              }
            });
          }
        }
      });

      var datatables = $('#datatables').DataTable({
        "serverSide": true,
        "ajax": {
          "url": site_url_mobile_layanan + '/sk_domisili_kurma/layanan/1',
          "data": iamthedoor,
          "type": "GET"
        },
        "columns": [
          { "data": 'id'},
          { "data": 'kode_transaksi'},
          { "data": 'no_register'},
          { "data": 'jenis_kurma'},
          { "data": 'nama_usaha' },
          { "data": 'rt_kelompok' },
          { "data": 'rw_kelompok' },
          { "data": 'kel_usaha' },
          { "data": 'kec_usaha' },
          { "data": 'nik_ketua' },
          { "data": 'nama_ketua' },
          { "data": 'status_ketua' },
          { "data": 'telepon_ketua' },
          { "data": 'id' },
          { "data": 'periode' },
          { "data": 'val_status' },
          { "data": 'id' },
        ],
        "initComplete": function (settings, json) {
          app.dialog.close();
          $$('#datatables_length').hide();
          $$('#datatables_filter').hide();
          $$('#datatables_paginate').hide();
        },
        "rowCallback": function (row, data) {
          var color = '#17A05E';
          if (data.val_status == 'Menunggu' || (is_user() && data.val_status == 'Ditolak') || (is_user() && data.jenis_surat == 'usaha_kurma' && data.verified == 3)) {
            if (datauser.role_id == '4') {
              $('td:eq(0)', row).html('<a href="/tipe-a/edit_sk_domisili_kurma/' + data.id + '/edit/" class="button button-small button-fill color-blue">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');
              if(data.periode == '1'){
                $('td:eq(0)', row).html('<a href="/tipe-a/edit_sk_domisili_kurma_pertama/' + data.id + '/edit/" class="button button-small button-fill color-blue">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');
              }
            } else {
              $('td:eq(0)', row).html('<a href="/tipe-a/edit_sk_domisili_kurma/' + data.id + '/approve/" class="button button-small button-fill color-green">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Approve</a>');

              if(data.periode == '1'){
                $('td:eq(0)', row).html('<a href="/tipe-a/edit_sk_domisili_kurma_pertama/' + data.id + '/approve/" class="button button-small button-fill color-green">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Approve</a>');
              }
            }
          } else {
            $('td:eq(0)', row).html('<a href="/tipe-a/edit_sk_domisili_kurma/' + data.id + '/lihat/" class="button button-small button-fill color-green">' +
              '<i class="icon f7-icons" style="font-size: 12pt;">zoom_in</i> Lihat</a>');

            if(data.periode == '1'){
              $('td:eq(0)', row).html('<a href="/tipe-a/edit_sk_domisili_kurma_pertama/' + data.id + '/lihat/" class="button button-small button-fill color-green">' +
              '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Lihat</a>');
            }
          }

          var program_kurma = 'Kurma Umum';
          if(data.jenis_kurma == 'kurma_difabel'){
            program_kurma = 'Kurma Difabel';
          }
          $('td:eq(3)', row).html(program_kurma);

          let no_register = '-';
          if(data.periode != 1){
            no_register = '<button class="col button button-fill" onclick="cetak_register(' + data.id + ')"><i class="icon f7-icons color-white">printer_fill</i> Cetak</button>';
          }
          $('td:eq(13)', row).html(no_register);

          $('td:eq(14)', row).html('<span style="background-color: #17A2B8; padding: 5px; border-radius: 10px; color: white;">' + data.periode + '</span>');

          var color = '#17A05E';
          $('td:eq(15)', row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px; color:white;">Bisa Diambil</span>');

          if (is_user() && data.jenis_surat == 'usaha_kurma' && data.verified == 3) {
              $('td:eq(15)', row).html('<span style="background-color:#DE4E42; padding:5px; border-radius:10px; color:white;">Ditolak oleh Dinkop</span>');
          } else if (data.val_status) {
              if (data.val_status == 'Ditolak') {
                  color = '#DE4E42';
              } else if (data.val_status == 'Menunggu') {
                  color = '#FF9800';
              } else if (data.val_status == 'Belum Dikirim') {
                  color = '#4B8BF5';
              }
              $('td:eq(15)', row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px; color:white;">' + data.val_status + '</span>');
          }

          $('td:eq(16)', row).html('<a href="/tipe-a/tracking_sk_domisili_kurma/' + data.id + '/" class="button button-small button-fill color-orange">' +
            '<i class="icon f7-icons" style="font-size: 12pt;">zoom_in</i> Lihat</a>');
        }
      });
    }
  }
};

var new_sk_domisili_kurma = {
  path: '/tipe-a/new_sk_domisili_kurma/',
  url: './pages/tipe-a/new_sk_domisili_kurma.html',
  name: 'new_sk_domisili_kurma',
  on: {
    pageInit: async function () {
      app.dialog.preloader('Mohon Tunggu Sebentar...');
      await pilihan_kurma();
      $('#kecamatan').on('change', function () {
        fetch_kelurahan(this.value, false);
      });

      let counter = 1;
      let dataindex  = '';
      let datatarget = '';
      counted = counter + 1
      countless = counter - 1;

      $('.btc-kurma').click(function (e) {
        e.preventDefault();
        var parent = $(this).parent().parent().parent(), 
        status = 0;
        dataindex   = $(this).data('index');
        datatarget  = $(this).data('target');

        parent.parent().find('.bulan').each(function (index, el) {
          if ($(this).val() < 1 || $(this).val() == null || $(this).val() == '') {
            var c_label = $(this).parent().parent().find('.control-label').text();
            app.dialog.alert('Mohon mengisi '+ c_label +' dengan minimal input angka 1.');
            bulan = 1;
            return false;
          } else {
            bulan = 0;
          }
        });
        
        parent.find('.reqf').each(function (index, el) {
          if ($(this).val() == '' || $(this).val() == null) {
            var c_label = $(this).parent().parent().find('.item-title').text();
            app.dialog.alert('Lengkapi kolom ' + c_label + ' terlebih dahulu.');
            status = 1;
            return false;
          } else {
            status = 0;
          }
        });
        
        if(dataindex == 3){
        if($('input[name=data3]:checked').length == 0){
          app.dialog.alert('Mohon Centang terlebih dahulu checkbox.');
          return false;
        }
        }else if(dataindex == 4){
          if($('input[name=data4]:checked').length == 0){
            app.dialog.alert('Mohon Centang terlebih dahulu checkbox.');
            return false;
          }
        }else if(dataindex == 5){
          if($('input[name=data5]:checked').length == 0){
            app.dialog.alert('Mohon Centang terlebih dahulu checkbox.');
            return false;
          }
        }

        if (status == 0 && bulan == 0) {
          if(dataindex != undefined){
            $('#data-' + dataindex).attr('class', 'chip color-green');
            $('#cek-' + dataindex).after('<i class="icon f7-icons">checkmark_alt</i>');
            $('#collapsed-3').attr('id', 'collapsed-0').hide(); // jika sudah dibuka maka dirubah jadi collapsed-0
            $('#collapsed-' + (dataindex + 1)).attr('id', 'collapsed-' + counter); // id collapsed asli akan diganti dengan id="collapsed-3"
            
            $('#collapsed-' + counter).slideToggle(500); // ketutup
            $('#collapsed-' + counted).slideToggle(500); // kebuka
          }else{
            $('#collapsed-' + counter).slideToggle(500); // ketutup
            $('#collapsed-' + counted).slideToggle(500); // kebuka
            
            counter++;
            counted++;
            countless++;
          }
        }
      });
      
      $('.btcm-kurma').click(function (e) {
        $('#collapsed-' + countless).slideToggle(500);
        $('#collapsed-' + counter).slideToggle(500);
        counter--;
        counted--;
        countless--;
      });
      
      $$('#nik_pemohon').val(datauser.nik);
      $$('#nama_pemohon').val(datauser.nama);
      $$('#tempat_lahir_pemohon').val(datauser.tempat_lahir);
      $$('#tanggal_lahir_pemohon').val(datauser.tanggal_lahir);
      $$('#jenis_kelamin_pemohon').val(datauser.jenis_kelamin);
      $$('#status_kawin_pemohon').val(datauser.status_kawin);
      $$('#pekerjaan_pemohon').val(datauser.pekerjaan);
      $$('#kecamatan_pemohon').val(datauser.nama_kec);
      $$('#kelurahan_pemohon').val(datauser.nama_kel);
      $$('#alamat_pemohon').val(datauser.alamat);

      $$('#tgl_berdiri').val((new Date()).toDateFormat());
      $$('#rt_kelompok').val(datauser.rt?.padStart(3, '0'));
      $$('#rw_kelompok').val(datauser.rw?.padStart(3, '0'));
      $$('#alamat_usaha').val(datauser.alamat);

      anggota_kurma_data = new Array();
      $$('#add_anggota_kurma').on('touchend', function () {
        popup_tambah_anggota_kurma();
      });
      
      $$('#add_jenis_usaha').on('touchend', function () {
        popup_tambah_anggota_kurma();
      });

      $$('#rencana_belanja_table table').attr('border', '1');
      $$('#rencana_belanja_table th').attr('style', 'color: black !important; font-weight: bold !important; text-align: center !important;');
      $$('#rencana_belanja_table #aspek_usaha').attr('style', 'min-width: 280px; color: black !important; font-weight: bold !important; text-align: center !important;');
      $$('#rencana_belanja_table #rincian_usaha').attr('style', 'min-width: 210px; color: black !important; font-weight: bold !important; text-align: center !important;');

      $$('#rencana_usaha_table table').attr('border', '1');
      $$('#rencana_usaha_table th').attr('style', 'color: black !important; font-weight: bold !important; text-align: center !important;');
      $$('#rencana_usaha_table #uraian_usaha').attr('style', 'min-width: 280px; color: black !important; font-weight: bold !important; text-align: center !important;');
      app.dialog.close();

      $$('#simpan').on('click', async function () {
        if($('input[name=disclaimer]:checked').length == 0){
          app.dialog.alert('Mohon Centang pernyataan terlebih dahulu.');
          return false;
        }

        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.input.validateInputs('#new_sk_domisili_kurma');
        if ($$('#new_sk_domisili_kurma')[0].checkValidity() == true) {
          if (!cek_jumlah_huruf_form_rencana()) return false;
          if (!cek_jumlah_anggota()) return false;
          if (!cek_jumlah_ketua()) return false;
          if (!cek_kk_duplicate()) return false;

          let file_code = new Array();
          $('#formupload-wrapper .file_code').each((i, el) => file_code.push(el.value));

          let file_desc = new Array();
          $('#formupload-wrapper .file_desc').each((i, el) => file_desc.push(el.value));

          for (i = 0; i < file_code.length; i++) {
            if (file_code[i] == '') {
              app.dialog.close();
              app.dialog.alert('Mohon Lengkapi Dokumen');
              return false;
            }
          }

          let cek_domisili = await cek_alamat_domisili('multiple', anggota_kurma_data);
          if (cek_domisili.status == false) {
            app.dialog.close();
            app.dialog.alert(cek_domisili.message);
            return false;
          }

          let form_data = app.form.convertToData('#new_sk_domisili_kurma');
          if (anggota_kurma_data?.length) {
            anggota_kurma_data.forEach(function (item, i) {
              for (const key in item) {
                if (key.includes('_anggota')) {
                  anggota_kurma_data[i][key.replace('_anggota', '')] = anggota_kurma_data[i][key];
                  delete anggota_kurma_data[i][key];
                }
              }
            });
          }

          let ajax_data = new Array();
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);
          ajax_data.push(anggota_kurma_data);
          ajax_data.push(file_code);
          ajax_data.push(file_desc);

          app.request.post(site_url_mobile_layanan + '/sk_domisili_kurma/save_sk_domisili_kurma', ajax_data, function (response) {
            app.dialog.close();
            if (isNaN(response)) {
              app.dialog.alert(response.desc);
            } else {
              app.dialog.alert('Penyimpanan Berhasil');
              mainView.router.back();
              $('#datatables').DataTable().ajax.reload();
            }
          }, function () {
            app.dialog.close();
            app.dialog.alert('Penyimpanan Gagal, Coba lagi di lain waktu');
          }, 'json');
        } else {
          app.dialog.close();
          app.dialog.alert('Mohon Lengkapi Form yang Kosong Sebelum Menyimpan');
        }
      })
    },
  }
};

var new_sk_domisili_kurma_difabel = {
  path: '/tipe-a/new_sk_domisili_kurma_difabel/',
  url: './pages/tipe-a/new_sk_domisili_kurma_difabel.html',
  name: 'new_sk_domisili_kurma_difabel',
  on: {
    pageInit: async function () {
      app.dialog.preloader('Mohon Tunggu Sebentar...');
      await pilihan_kurma();
      $('#kecamatan').on('change', function () {
        fetch_kelurahan(this.value, false);
      });

      let counter = 1;
      let dataindex  = '';
      let datatarget = '';
      counted = counter + 1
      countless = counter - 1;

      $('.btc-kurma').click(function (e) {
        e.preventDefault();
        var parent = $(this).parent().parent().parent(), 
        status = 0;
        dataindex   = $(this).data('index');
        datatarget  = $(this).data('target');

        parent.parent().find('.bulan').each(function (index, el) {
          if ($(this).val() < 1 || $(this).val() == null || $(this).val() == '') {
            var c_label = $(this).parent().parent().find('.control-label').text();
            app.dialog.alert('Mohon mengisi '+ c_label +' dengan minimal input angka 1.');
            bulan = 1;
            return false;
          } else {
            bulan = 0;
          }
        });
        
        parent.find('.reqf').each(function (index, el) {
          if ($(this).val() == '' || $(this).val() == null) {
            var c_label = $(this).parent().parent().find('.item-title').text();
            app.dialog.alert('Lengkapi kolom ' + c_label + ' terlebih dahulu.');
            status = 1;
            return false;
          } else {
            status = 0;
          }
        });
        
        if(dataindex == 3){
        if($('input[name=data3]:checked').length == 0){
          app.dialog.alert('Mohon Centang terlebih dahulu checkbox.');
          return false;
        }
        }else if(dataindex == 4){
          if($('input[name=data4]:checked').length == 0){
            app.dialog.alert('Mohon Centang terlebih dahulu checkbox.');
            return false;
          }
        }else if(dataindex == 5){
          if($('input[name=data5]:checked').length == 0){
            app.dialog.alert('Mohon Centang terlebih dahulu checkbox.');
            return false;
          }
        }

        if (status == 0 && bulan == 0) {
          if(dataindex != undefined){
            $('#data-' + dataindex).attr('class', 'chip color-green');
            $('#cek-' + dataindex).after('<i class="icon f7-icons">checkmark_alt</i>');
            $('#collapsed-3').attr('id', 'collapsed-0').hide(); // jika sudah dibuka maka dirubah jadi collapsed-0
            $('#collapsed-' + (dataindex + 1)).attr('id', 'collapsed-' + counter); // id collapsed asli akan diganti dengan id="collapsed-3"
            
            $('#collapsed-' + counter).slideToggle(500); // ketutup
            $('#collapsed-' + counted).slideToggle(500); // kebuka
          }else{
            $('#collapsed-' + counter).slideToggle(500); // ketutup
            $('#collapsed-' + counted).slideToggle(500); // kebuka
            
            counter++;
            counted++;
            countless++;
          }
        }
      });
      
      $('.btcm-kurma').click(function (e) {
        $('#collapsed-' + countless).slideToggle(500);
        $('#collapsed-' + counter).slideToggle(500);
        counter--;
        counted--;
        countless--;
      });
      
      $$('#nik_pemohon').val(datauser.nik);
      $$('#nama_pemohon').val(datauser.nama);
      $$('#tempat_lahir_pemohon').val(datauser.tempat_lahir);
      $$('#tanggal_lahir_pemohon').val(datauser.tanggal_lahir);
      $$('#jenis_kelamin_pemohon').val(datauser.jenis_kelamin);
      $$('#status_kawin_pemohon').val(datauser.status_kawin);
      $$('#pekerjaan_pemohon').val(datauser.pekerjaan);
      $$('#kecamatan_pemohon').val(datauser.nama_kec);
      $$('#kelurahan_pemohon').val(datauser.nama_kel);
      $$('#alamat_pemohon').val(datauser.alamat);

      $$('#tgl_berdiri').val((new Date()).toDateFormat());
      $$('#rt_kelompok').val(datauser.rt?.padStart(3, '0'));
      $$('#rw_kelompok').val(datauser.rw?.padStart(3, '0'));
      $$('#alamat_usaha').val(datauser.alamat);

      anggota_kurma_data = new Array();
      $$('#add_anggota_kurma').on('touchend', function () {
        popup_tambah_anggota_kurma();
      });
      
      $$('#add_jenis_usaha').on('touchend', function () {
        popup_tambah_anggota_kurma();
      });

      $$('#rencana_belanja_table table').attr('border', '1');
      $$('#rencana_belanja_table th').attr('style', 'color: black !important; font-weight: bold !important; text-align: center !important;');
      $$('#rencana_belanja_table #aspek_usaha').attr('style', 'min-width: 280px; color: black !important; font-weight: bold !important; text-align: center !important;');
      $$('#rencana_belanja_table #rincian_usaha').attr('style', 'min-width: 210px; color: black !important; font-weight: bold !important; text-align: center !important;');

      $$('#rencana_usaha_table table').attr('border', '1');
      $$('#rencana_usaha_table th').attr('style', 'color: black !important; font-weight: bold !important; text-align: center !important;');
      $$('#rencana_usaha_table #uraian_usaha').attr('style', 'min-width: 280px; color: black !important; font-weight: bold !important; text-align: center !important;');
      app.dialog.close();

      $$('#simpan').on('click', async function () {
        if($('input[name=disclaimer]:checked').length == 0){
          app.dialog.alert('Mohon Centang pernyataan terlebih dahulu.');
          return false;
        }

        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.input.validateInputs('#new_sk_domisili_kurma');
        if ($$('#new_sk_domisili_kurma')[0].checkValidity() == true) {
          if (!cek_jumlah_huruf_form_rencana()) return false;
          if (!cek_jumlah_anggota()) return false;
          if (!cek_jumlah_ketua()) return false;
          if (!cek_kk_duplicate()) return false;

          let file_code = new Array();
          $('#formupload-wrapper .file_code').each((i, el) => file_code.push(el.value));

          let file_desc = new Array();
          $('#formupload-wrapper .file_desc').each((i, el) => file_desc.push(el.value));

          for (i = 0; i < file_code.length; i++) {
            if (file_code[i] == '') {
              app.dialog.close();
              app.dialog.alert('Mohon Lengkapi Dokumen');
              return false;
            }
          }

          // let cek_domisili = await cek_alamat_domisili('multiple', anggota_kurma_data);
          // if (cek_domisili.status == false) {
          //   app.dialog.close();
          //   app.dialog.alert(cek_domisili.message);
          //   return false;
          // }

          let form_data = app.form.convertToData('#new_sk_domisili_kurma');
          if (anggota_kurma_data?.length) {
            anggota_kurma_data.forEach(function (item, i) {
              for (const key in item) {
                if (key.includes('_anggota')) {
                  anggota_kurma_data[i][key.replace('_anggota', '')] = anggota_kurma_data[i][key];
                  delete anggota_kurma_data[i][key];
                }
              }
            });
          }

          let ajax_data = new Array();
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);
          ajax_data.push(anggota_kurma_data);
          ajax_data.push(file_code);
          ajax_data.push(file_desc);

          app.request.post(site_url_mobile_layanan + '/sk_domisili_kurma/save_sk_domisili_kurma', ajax_data, function (response) {
            app.dialog.close();
            if (isNaN(response)) {
              app.dialog.alert(response.desc);
            } else {
              app.dialog.alert('Penyimpanan Berhasil');
              mainView.router.back();
              $('#datatables').DataTable().ajax.reload();
            }
          }, function () {
            app.dialog.close();
            app.dialog.alert('Penyimpanan Gagal, Coba lagi di lain waktu');
          }, 'json');
        } else {
          app.dialog.close();
          app.dialog.alert('Mohon Lengkapi Form yang Kosong Sebelum Menyimpan');
        }
      })
    },
  }
};

var edit_sk_domisili_kurma = {
  path: '/tipe-a/edit_sk_domisili_kurma/:id/:tipe',
  url: './pages/tipe-a/edit_sk_domisili_kurma.html',
  name: 'edit_sk_domisili_kurma',
  on: {
    pageInit: async function () {
      app.dialog.preloader('Mohon Tunggu Sebentar...');
      await pilihan_kurma();
      $('#kecamatan').on('change', function () {
        fetch_kelurahan(this.value, false);
      });

      if(datauser.role_id == 4 || datauser.role_id == 8){
        $('.check-users').after('<i class="icon f7-icons">checkmark_alt</i>');
        $('.color-users').attr('class', 'chip color-green color-users');
        $('.not-users').css('display', 'none');
      }

      tablename = 'sk_domisili_usaha';
      $$('#addformupload').hide();
      var this_user_is_the_last_index = false;
      var id = mainView.router.currentRoute.params.id;
      var tipe = mainView.router.currentRoute.params.tipe;

      if (tipe == 'edit' || tipe == 'lihat') {
        $$('#approval').hide();
        $$('#addformupload').show();
        $$('#addformupload').on('touchend', addrow);
      }

      $$('#rencana_belanja_table table').attr('border', '1');
      $$('#rencana_belanja_table th').attr('style', 'color: black !important; font-weight: bold !important; text-align: center !important;');
      $$('#rencana_belanja_table #aspek_usaha').attr('style', 'min-width: 280px; color: black !important; font-weight: bold !important; text-align: center !important;');
      $$('#rencana_belanja_table #rincian_usaha').attr('style', 'min-width: 210px; color: black !important; font-weight: bold !important; text-align: center !important;');

      $$('#rencana_usaha_table table').attr('border', '1');
      $$('#rencana_usaha_table th').attr('style', 'color: black !important; font-weight: bold !important; text-align: center !important;');
      $$('#rencana_usaha_table #uraian_usaha').attr('style', 'min-width: 280px; color: black !important; font-weight: bold !important; text-align: center !important;');
      app.request.post(site_url_mobile_layanan + '/sk_domisili_kurma/find_layanan/' + id + '/' + datauser.bf_users_id, [iamthedoor], function (data) {
        // Tidak bisa edit data jika sudah di approve
        let status_operator = data.approval_items[data.approval_items.length - 1].status_approval;
        if (iamthedoor.role_id != 4 || (status_operator == 2 && data.layanan.verified != 3)) {
          $('#add_anggota_kurma').hide();
        }

        if (data == false) {
          app.dialog.close();
          app.dialog.alert('Data tidak ditemukan');
          mainView.router.back();
          $('#datatables').DataTable().ajax.reload();
        } else {
          $('#jenis_kurma').html(`<option value="${data.layanan.jenis_kurma}">${data.layanan.jenis_kurma.replace('_', ' ')}</option>`);
          $('#jenis_usaha').val(data.layanan.jenis_usaha);
          $('#jangkauan_pemasaran').val(data.layanan.jangkauan_pemasaran);
          $('#lama_usaha_berdiri_input').val(data.layanan.lama_usaha_berdiri_input);
          $('#modal_usaha_input').val(data.layanan.modal_usaha_input);
          $('#penjualan_bulanan_input').val(data.layanan.penjualan_bulanan_input);
          $('#laba_usaha_saat_ini_input').val(data.layanan.laba_usaha_saat_ini_input);
          $('#alasan').val(data.layanan.alasan);

          if(data.approve != null && data.approve != ''){
            if(data.approve.status_approval == 2){
              $$('#disclaimer_difabel').attr('checked','checked');
              $$('#disclaimer_difabel').attr('disabled','disabled');
            }

            if(data.layanan.jenis_kurma == 'kurma_difabel'){
              $$('#ttd_pernyataan').css('display', 'block');
            }
          }

          this_user_is_the_last_index = data.this_user_is_the_last_index;
          app.request.post(site_url_mobile + '/siurban_mobile/get_kecamatan_kelurahan/' + data.pemohon.kecamatan + '/' + data.pemohon.kode_desa, function (keckel) {
            $$('#nik_pemohon').val(data.pemohon.nik);
            $$('#nama_pemohon').val(data.pemohon.nama);
            $$('#tempat_lahir_pemohon').val(data.pemohon.tempat_lahir);
            $$('#tanggal_lahir_pemohon').val(data.pemohon.tanggal_lahir);
            $$('#jenis_kelamin_pemohon').val(data.pemohon.jenis_kelamin);
            $$('#status_kawin_pemohon').val(data.pemohon.status_kawin);
            $$('#pekerjaan_pemohon').val(data.pemohon.pekerjaan);
            $$('#kecamatan_pemohon').val(keckel.kecamatan);
            $$('#kelurahan_pemohon').val(keckel.kelurahan);
            $$('#alamat_pemohon').val(data.pemohon.alamat);

            $$('#jenis_surat').val(data.layanan.jenis_surat);
            $$('#nama_usaha').val(data.layanan.nama_usaha);
            $$('#tgl_berdiri').val(data.layanan.tgl_berdiri);
            $$('#kecamatan').html('<option data-val="' + data.layanan.id_district + '" value="' + data.layanan.kecamatan + '">' + data.layanan.nama_kec + '</option>');
            $$('#kelurahan').html('<option data-val="' + data.layanan.id_village + '" value="' + data.layanan.kelurahan + '">' + data.layanan.nama_kel + '</option>');
            $$('#rt_kelompok').val(data.layanan.rt_kelompok);
            $$('#rw_kelompok').val(data.layanan.rw_kelompok);
            $$('#alamat_usaha').val(data.layanan.alamat_usaha);

            anggota_kurma_data = new Array();
            if (data.anggota_kurma?.length) {
              data.anggota_kurma.forEach(function (item, i) {
                anggota_kurma_data[i] = new Object();
                for (const key in item) {
                  anggota_kurma_data[i][key + '_anggota'] = data.anggota_kurma[i][key];
                }
              });
            }

            reload_anggota_kurma_table(anggota_kurma_data);
            $$('#add_anggota_kurma').on('touchend', function () {
              popup_tambah_anggota_kurma();
            });

            $$('#modal_dibutuhkan').val(data.layanan.modal_dibutuhkan);
            $$('#modal_dimiliki').val(data.layanan.modal_dimiliki);
            $$('#produksi').val(data.layanan.produksi);
            $$('#operasional').val(data.layanan.operasional);
            $$('#penunjang').val(data.layanan.penunjang);
            $$('#lainya').val(data.layanan.lainya);
            $$('#penjualan').val(data.layanan.penjualan);
            $$('#biaya').val(data.layanan.biaya);

            $$('#deskripsi_usaha').val(data.layanan.deskripsi_usaha);
            $$('#analisa_pesaing').val(data.layanan.analisa_pesaing);
            $$('#strategi_pemasaran').val(data.layanan.strategi_pemasaran);
            $$('#rencana_pengembangan').val(data.layanan.rencana_pengembangan);
            $$('#keuntungan_diharapkan').val(data.layanan.keuntungan_diharapkan);


            if(status_operator == 2){
              $('#anggota_kurma_table table tbody tr td .hapus_anggota_kurma').hide();
            }
            
            if (data.layanan.file_code !== null) {
              if (tipe == 'edit') {
                find_document_kurma(id, false);
              } else {
                find_document_kurma(id, true);
              }
            }

            var table_chron = '';
            if (data.chron?.length) {
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
              table_chron = '<tr><td></td><td>Belum Ada Approval</td><td></td><td></td><td></td></tr>';
            }
            $$('.table-chron').html(table_chron);

            if (data.approve !== null) {
              $$('#approve_items_id').val(data.approve.id);
              $$('#type_ttd').val(data.approve.author_type);
              document_look(data.latest_status.status_approval, data.latest_status.display_name);
              if (data.approve.ttd !== null) {
                ttdview(data.approve.ttd);
              }
            }

            if(is_user()){
              $$('#simpan').hide();
            }

            if (tipe == 'edit' && status_operator != 2) {
              $$('#btndeletelayanan').html('<a class="button button-round button-fill color-red" id="deletelayanan" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Hapus Data</span></a>');
              prep_penyimpanan();
            } else if (is_user() && data.layanan.verified == 3) {
              $$('#btndeletelayanan').hide();
              $$('#print_preview_button').html('<i class="icon f7-icons">zoom_in</i> Cetak Surat');
              prep_penyimpanan();
            } else {
              $$('#btndeletelayanan').hide();
              $$('#edit_sk_domisili_kurma input').prop('disabled', true);
              $$('#edit_sk_domisili_kurma select').prop('disabled', true);
              $$('#edit_sk_domisili_kurma textarea').prop('disabled', true);
              if (tipe == 'approve') {
                $$('#simpan').html('<i class="icon f7-icons">checkmark_seal_fill</i> Approve');
                prep_penyimpanan();
              } else {
                if (data.check_approved) {
                  $$('#simpan').hide();
                  $$('#print_preview_button').html('<i class="icon f7-icons">zoom_in</i> Cetak Surat');
                } else {
                  $$('#simpan').html('<i class="icon f7-icons">arrow_left_circle_fill</i> Kembali');
                  $$('#simpan').on('click', function () {
                    mainView.router.back();
                    $('#datatables').DataTable().ajax.reload();
                  });
                }
              }
            }

            var popup_preview = app.popup.create({
              content: `<div class="popup my-popup">
                  <div class="view">
                    <div class="page">
                      <div class="navbar">
                        <div class="navbar-inner">
                          <div class="title">Preview Surat</div>
                          <div class="right">
                            <a class="link popup-close">Close</a>
                          </div>
                        </div>
                      </div>
                      <div class="page-content">
                        <div class="block">
                          <div class="list simple-list">
                            <ul>
                              <li><a id="form_belanja" class="link button button-fill color-green"><i class="icon f7-icons">search</i> Form Belanja Modal Usaha</a></li>
                              <li><a id="formulir_rencana" class="link button button-fill color-green"><i class="icon f7-icons">search</i> Formulir Rencana Usaha</a></li>
                              <li><a id="keterangan_domisili" class="link button button-fill color-green"><i class="icon f7-icons">search</i> Surat Keterangan Domisili</a></li>
                              <li><a id="kurma_register" class="link button button-fill color-green"><i class="icon f7-icons">search</i> Formulir Register</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`,
              on: {
                opened: function () {
                  if(datauser.role_id != 4){
                    $$('#kurma_register').parent().hide();
                  }
                  
                  if (data.check_approved) {
                    $$('#form_belanja').on('click', function () {
                      app.dialog.preloader('Mohon Tunggu Sebentar...');
                      download_doc(data.layanan.doc_path_pembelanjaan + '_signed.pdf');
                    });
                    $$('#formulir_rencana').on('click', function () {
                      app.dialog.preloader('Mohon Tunggu Sebentar...');
                      download_doc(data.layanan.doc_path_rencana + '_signed.pdf');
                    });
                    $$('#keterangan_domisili').on('click', function () {
                      app.dialog.preloader('Mohon Tunggu Sebentar...');
                      download_doc(data.layanan.doc_path + '_signed.pdf');
                    });
                    
                    $$('#kurma_register').on('click', function () {
                      download_doc(data.layanan.doc_path_register + '_signed.pdf');
                    });
                  } else {
                    $$('#form_belanja').on('click', function () {
                      app.dialog.preloader('Mohon Tunggu Sebentar...');
                      preview_doc(data.layanan.doc_path_pembelanjaan + '_signed.pdf');
                    });
                    $$('#formulir_rencana').on('click', function () {
                      app.dialog.preloader('Mohon Tunggu Sebentar...');
                      preview_doc(data.layanan.doc_path_rencana + '_signed.pdf');
                    });

                    if (datauser.role_id == 4) {
                      $$('#keterangan_domisili').parent().hide();
                      $$('#kurma_register').on('click', function () {
                        app.dialog.preloader('Mohon Tunggu Sebentar...');
                        app.request.post(site_url_mobile_layanan + '/sk_domisili_kurma/print_doc_kurma_register/' + id, iamthedoor, function (doc_path) {
                          preview_doc(doc_path);
                        }, 'json');
                      });
                    } else {
                      $$('#kurma_register').parent().hide();
                      $$('#keterangan_domisili').on('click', function () {
                        app.dialog.preloader('Mohon Tunggu Sebentar...');
                        app.request.post(site_url_mobile_layanan + '/sk_domisili_kurma/print_doc/' + id, iamthedoor, function (doc_path) {
                          preview_doc(doc_path);
                        }, 'json');
                      });
                    }
                  }
                },
              }
            });
            
            $$('#print_preview_button').on('click', function () {
              popup_preview.open();
            });

            $$('#deletelayanan').on('click', function () {
              app.dialog.confirm('Apakah anda yakin menghapus data ini?', function () {
                app.dialog.preloader('Mohon Tunggu Sebentar...');
                data = [];
                data.push(iamthedoor);
                app.request.post(site_url_mobile_layanan + '/sk_domisili_kurma/delete_layanan/' + id, data, function (data) {
                  app.dialog.close();
                  if (data == false) {
                    app.dialog.alert('Data tidak ditemukan');
                    mainView.router.back();
                    $('#datatables').DataTable().ajax.reload();
                  } else {
                    app.dialog.alert('Berhasil Menghapus Data');
                    mainView.router.back();
                    $('#datatables').DataTable().ajax.reload();
                  }
                }, function () {
                  app.dialog.close();
                  app.dialog.alert('Data Gagal dihapus, Coba lagi di lain waktu');
                }, 'json');
              });
            });

            app.dialog.close();
          }, 'json');
        }
      }, function () {
        app.dialog.close();
        app.dialog.alert('Gagal');
        mainView.router.back();
        $('#datatables').DataTable().ajax.reload();
      }, 'json');

      function prep_penyimpanan() {
        $$('#simpan').on('click', function () {
          app.input.validateInputs('#edit_sk_domisili_kurma');
          if ($$('#edit_sk_domisili_kurma')[0].checkValidity() == true) {
            if (datauser.role_id == 4) {
              app.dialog.preloader('Proses Penyimpanan...');
              let form_data = app.form.convertToData('#edit_sk_domisili_kurma');
              if (anggota_kurma_data?.length) {
                anggota_kurma_data.forEach(function (item, i) {
                  for (const key in item) {
                    if (key.includes('_anggota')) {
                      anggota_kurma_data[i][key.replace('_anggota', '')] = anggota_kurma_data[i][key];
                      delete anggota_kurma_data[i][key];
                    }

                  }
                });
              }

              if (!cek_jumlah_huruf_form_rencana()) return false;
              if (!cek_jumlah_anggota()) return false;
              if (!cek_jumlah_ketua()) return false;
              if (!cek_kk_duplicate()) return false;

              let file_code = new Array();
              $('#formupload-wrapper .file_code').each((i, el) => file_code.push(el.value));
              let file_desc = new Array();
              $('#formupload-wrapper .file_desc').each((i, el) => file_desc.push(el.value));

              let ajax_data = new Array();
              ajax_data.push(iamthedoor);
              ajax_data.push(form_data);
              ajax_data.push(anggota_kurma_data);
              ajax_data.push(file_code);
              ajax_data.push(file_desc);

              app.request.post(site_url_mobile_layanan + '/sk_domisili_kurma/save_sk_domisili_kurma/update/' + id, ajax_data, function (response) {
                app.dialog.close();
                if (isNaN(response)) {
                  if (response.status == 'fail') {
                    app.dialog.alert(response.desc);
                  } else if (response.status == 'success') {
                    app.dialog.alert('Berhasil!');
                  } else {
                    app.dialog.alert('Proses Gagal');
                  }
                } else {
                  app.dialog.alert('Penyimpanan Berhasil');
                  mainView.router.back();
                  $('#datatables').DataTable().ajax.reload();
                }
              }, function () {
                app.dialog.close();
                app.dialog.alert('Penyimpanan Gagal, Coba lagi di lain waktu');
              }, 'json');
            } else {
              if (this_user_is_the_last_index == true && $$('select[name="status"]').val() == 2) {
                if($$('#jenis_kurma').val() == 'kurma_difabel'){
                  if (($('input[name=disclaimer_difabel]:checked').length == 0) && $$('select[name="status"]').val() == 2) {
                    app.dialog.alert('Mohon centang pernyataan kelompok difabel terlebih dahulu.');
                    return false;
                  }
                }

                var approval = app.popup.create({
                  content: `<div class="popup">
                      <div class="block">
                        <p class="row"><a href="#" class="col-25 button button-raised button-fill popup-close">TUTUP</a></p>
                        <p style="text-align: center;">Ketika Anda mengubah status, maka status dokumen ini <b>tidak dapat diubah kembali</b>.</p>
                        <div class="list">
                          <ul>
                            <li class="item-content item-input">
                              <div class="item-inner">
                                <div class="item-title item-label">Masukkan Passphrase Anda</div>
                                <div class="item-input-wrap">
                                  <input type="password" id="esign" name="esign" placeholder="Passphrase Anda" autocomplete="off">
                                  <span class="input-clear-button"></span>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <br>
                        <button class="col color-green button button-big button-raised button-fill" id="approve_button">APPROVE</button>
                      </div>
                    </div>`
                });
                approval.open();
                $$('#approve_button').on('click', function () {
                  approve('/sk_domisili_kurma/save_sk_domisili_kurma/ustatus/' + id, this_user_is_the_last_index, $$('#esign').val());
                  approval.close();
                });
              } else {
                var approval = app.popup.create({
                  content: `<div class="popup">
                      <div class="block">
                        <p><a href="#" class="link popup-close">< Kembali</a></p>
                        <br>
                        <h3 style="text-align:center;">Ketika Anda mengubah status, maka status dokumen ini <b>tidak dapat diubah kembali</b></h3>
                        <button class="col button button-big button-raised button-fill" id="approve_button">APPROVE</button>
                      </div>
                    </div>`,
                });
                approval.open();
                $$('#approve_button').on('touchend', function () {
                  approve('/sk_domisili_kurma/save_sk_domisili_kurma/ustatus/' + id, this_user_is_the_last_index);
                  approval.close();
                });
              }
            }
          } else {
            app.dialog.close();
            app.dialog.alert('Mohon Lengkapi Form yang Kosong Sebelum Menyimpan');
          }
        })
      }
    },
  }
};

var edit_sk_domisili_kurma_pertama = {
  path: '/tipe-a/edit_sk_domisili_kurma_pertama/:id/:tipe',
  url: './pages/tipe-a/edit_sk_domisili_kurma_pertama.html',
  name: 'edit_sk_domisili_kurma_pertama',
  on: {
    pageInit: async function () {
      app.dialog.preloader('Mohon Tunggu Sebentar...');
      await pilihan_kurma();
      $('#kecamatan').on('change', function () {
        fetch_kelurahan(this.value, false);
      });

      tablename = 'sk_domisili_usaha';
      $$('#addformupload').hide();
      var this_user_is_the_last_index = false;
      var id = mainView.router.currentRoute.params.id;
      var tipe = mainView.router.currentRoute.params.tipe;
      if (tipe == 'edit') {
        $$('#approval').hide();
        $$('#addformupload').show();
        $$('#addformupload').on('touchend', addrow);
      }

      $$('#rencana_belanja_table table').attr('border', '1');
      $$('#rencana_belanja_table th').attr('style', 'color: black !important; font-weight: bold !important; text-align: center !important;');
      $$('#rencana_belanja_table #aspek_usaha').attr('style', 'min-width: 280px; color: black !important; font-weight: bold !important; text-align: center !important;');
      $$('#rencana_belanja_table #rincian_usaha').attr('style', 'min-width: 210px; color: black !important; font-weight: bold !important; text-align: center !important;');

      $$('#rencana_usaha_table table').attr('border', '1');
      $$('#rencana_usaha_table th').attr('style', 'color: black !important; font-weight: bold !important; text-align: center !important;');
      $$('#rencana_usaha_table #uraian_usaha').attr('style', 'min-width: 280px; color: black !important; font-weight: bold !important; text-align: center !important;');

      app.request.post(site_url_mobile_layanan + '/sk_domisili_kurma/find_layanan/' + id + '/' + datauser.bf_users_id, [iamthedoor], function (data) {
        // Tidak bisa edit data jika sudah di approve
        let status_operator = data.approval_items[data.approval_items.length - 1].status_approval;
        if (iamthedoor.role_id != 4 || (status_operator == 2 && data.layanan.verified != 3)) {
          $('#add_anggota_kurma').hide();
        }

        if (data == false) {
          app.dialog.close();
          app.dialog.alert('Data tidak ditemukan');
          mainView.router.back();
          $('#datatables').DataTable().ajax.reload();
        } else {
          $('#jenis_usaha').val(data.layanan.jenis_usaha);
          $('#jangkauan_pemasaran').val(data.layanan.jangkauan_pemasaran);
          $('#lama_usaha_berdiri').val(data.layanan.lama_usaha_berdiri);
          $('#modal_usaha').val(data.layanan.modal_usaha);
          $('#penjualan_bulanan').val(data.layanan.penjualan_bulanan);
          $('#laba_usaha_saat_ini').val(data.layanan.laba_usaha_saat_ini);
          $('#alasan').val(data.layanan.alasan);

          this_user_is_the_last_index = data.this_user_is_the_last_index;
          app.request.post(site_url_mobile + '/siurban_mobile/get_kecamatan_kelurahan/' + data.pemohon.kecamatan + '/' + data.pemohon.kode_desa, function (keckel) {
            $$('#nik_pemohon').val(data.pemohon.nik);
            $$('#nama_pemohon').val(data.pemohon.nama);
            $$('#tempat_lahir_pemohon').val(data.pemohon.tempat_lahir);
            $$('#tanggal_lahir_pemohon').val(data.pemohon.tanggal_lahir);
            $$('#jenis_kelamin_pemohon').val(data.pemohon.jenis_kelamin);
            $$('#status_kawin_pemohon').val(data.pemohon.status_kawin);
            $$('#pekerjaan_pemohon').val(data.pemohon.pekerjaan);
            $$('#kecamatan_pemohon').val(keckel.kecamatan);
            $$('#kelurahan_pemohon').val(keckel.kelurahan);
            $$('#alamat_pemohon').val(data.pemohon.alamat);

            $$('#jenis_surat').val(data.layanan.jenis_surat);
            $$('#nama_usaha').val(data.layanan.nama_usaha);
            $$('#tgl_berdiri').val(data.layanan.tgl_berdiri);
            $$('#kecamatan').html('<option data-val="' + data.layanan.id_district + '" value="' + data.layanan.kecamatan + '">' + data.layanan.nama_kec + '</option>');
            $$('#kelurahan').html('<option data-val="' + data.layanan.id_village + '" value="' + data.layanan.kelurahan + '">' + data.layanan.nama_kel + '</option>');
            $$('#rt_kelompok').val(data.layanan.rt_kelompok);
            $$('#rw_kelompok').val(data.layanan.rw_kelompok);
            $$('#alamat_usaha').val(data.layanan.alamat_usaha);

            anggota_kurma_data = new Array();
            if (data.anggota_kurma?.length) {
              data.anggota_kurma.forEach(function (item, i) {
                anggota_kurma_data[i] = new Object();
                for (const key in item) {
                  anggota_kurma_data[i][key + '_anggota'] = data.anggota_kurma[i][key];
                }
              });
            }

            reload_anggota_kurma_table(anggota_kurma_data);
            $$('#add_anggota_kurma').on('touchend', function () {
              popup_tambah_anggota_kurma();
            });

            $$('#modal_dibutuhkan').val(data.layanan.modal_dibutuhkan);
            $$('#modal_dimiliki').val(data.layanan.modal_dimiliki);
            $$('#produksi').val(data.layanan.produksi);
            $$('#operasional').val(data.layanan.operasional);
            $$('#penunjang').val(data.layanan.penunjang);
            $$('#lainya').val(data.layanan.lainya);
            $$('#penjualan').val(data.layanan.penjualan);
            $$('#biaya').val(data.layanan.biaya);

            $$('#deskripsi_usaha').val(data.layanan.deskripsi_usaha);
            $$('#analisa_pesaing').val(data.layanan.analisa_pesaing);
            $$('#strategi_pemasaran').val(data.layanan.strategi_pemasaran);
            $$('#rencana_pengembangan').val(data.layanan.rencana_pengembangan);
            $$('#keuntungan_diharapkan').val(data.layanan.keuntungan_diharapkan);

            if (data.layanan.file_code !== null) {
              if (tipe == 'edit') {
                find_document_kurma(id, false);
              } else {
                find_document_kurma(id, true);
              }
            }

            var table_chron = '';
            if (data.chron?.length) {
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
              table_chron = '<tr><td></td><td>Belum Ada Approval</td><td></td><td></td><td></td></tr>';
            }
            $$('.table-chron').html(table_chron);

            if (data.approve !== null) {
              $$('#approve_items_id').val(data.approve.id);
              $$('#type_ttd').val(data.approve.author_type);
              document_look(data.latest_status.status_approval, data.latest_status.display_name);
              if (data.approve.ttd !== null) {
                ttdview(data.approve.ttd);
              }
            }

            if (tipe == 'edit' && status_operator != 2) {
              $$('#btndeletelayanan').html('<a class="button button-round button-fill color-red" id="deletelayanan" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Hapus Data</span></a>');
              prep_penyimpanan();
            } else if (is_user() && data.layanan.verified == 3) {
              $$('#btndeletelayanan').hide();
              $$('#print_preview_button').html('<i class="icon f7-icons">zoom_in</i> Cetak Surat');
              prep_penyimpanan();
            } else {
              $$('#btndeletelayanan').hide();
              $$('#edit_sk_domisili_kurma input').prop('disabled', true);
              $$('#edit_sk_domisili_kurma select').prop('disabled', true);
              $$('#edit_sk_domisili_kurma textarea').prop('disabled', true);
              if (tipe == 'approve') {
                $$('#simpan').html('<i class="icon f7-icons">checkmark_seal_fill</i> Approve');
                prep_penyimpanan();
              } else {
                if (data.check_approved) {
                  $$('#simpan').hide();
                  $$('#print_preview_button').html('<i class="icon f7-icons">zoom_in</i> Cetak Surat');
                } else {
                  $$('#simpan').html('<i class="icon f7-icons">arrow_left_circle_fill</i> Kembali');
                  $$('#simpan').on('click', function () {
                    mainView.router.back();
                    $('#datatables').DataTable().ajax.reload();
                  });
                }
              }
            }

            var popup_preview = app.popup.create({
              content: `<div class="popup my-popup">
                  <div class="view">
                    <div class="page">
                      <div class="navbar">
                        <div class="navbar-inner">
                          <div class="title">Preview Surat</div>
                          <div class="right">
                            <a class="link popup-close">Close</a>
                          </div>
                        </div>
                      </div>
                      <div class="page-content">
                        <div class="block">
                          <div class="list simple-list">
                            <ul>
                              <li><a id="form_belanja" class="link button button-fill color-green"><i class="icon f7-icons">search</i> Form Belanja Modal Usaha</a></li>
                              <li><a id="formulir_rencana" class="link button button-fill color-green"><i class="icon f7-icons">search</i> Formulir Rencana Usaha</a></li>
                              <li><a id="keterangan_domisili" class="link button button-fill color-green"><i class="icon f7-icons">search</i> Surat Keterangan Domisili</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`,
              on: {
                opened: function () {
                  if (data.check_approved) {
                    $$('#form_belanja').on('click', function () {
                      app.dialog.preloader('Mohon Tunggu Sebentar...');
                      download_doc(data.layanan.doc_path_pembelanjaan + '_signed.pdf');
                    });
                    $$('#formulir_rencana').on('click', function () {
                      app.dialog.preloader('Mohon Tunggu Sebentar...');
                      download_doc(data.layanan.doc_path_rencana + '_signed.pdf');
                    });
                    $$('#keterangan_domisili').on('click', function () {
                      app.dialog.preloader('Mohon Tunggu Sebentar...');
                      download_doc(data.layanan.doc_path + '_signed.pdf');
                    });
                  } else {
                    $$('#form_belanja').on('click', function () {
                      app.dialog.preloader('Mohon Tunggu Sebentar...');
                      preview_doc(data.layanan.doc_path_pembelanjaan + '_signed.pdf');
                    });
                    $$('#formulir_rencana').on('click', function () {
                      app.dialog.preloader('Mohon Tunggu Sebentar...');
                      preview_doc(data.layanan.doc_path_rencana + '_signed.pdf');
                    });

                    if (datauser.role_id == 4) {
                      $$('#keterangan_domisili').parent().hide();
                    } else {
                      $$('#keterangan_domisili').on('click', function () {
                        app.dialog.preloader('Mohon Tunggu Sebentar...');
                        app.request.post(site_url_mobile_layanan + '/sk_domisili_kurma/print_doc/' + id, iamthedoor, function (doc_path) {
                          preview_doc(doc_path);
                        }, 'json');
                      });
                    }
                  }
                },
              }
            });
            $$('#print_preview_button').on('click', function () {
              popup_preview.open();
            });

            $$('#deletelayanan').on('click', function () {
              app.dialog.confirm('Apakah anda yakin menghapus data ini?', function () {
                app.dialog.preloader('Mohon Tunggu Sebentar...');
                data = [];
                data.push(iamthedoor);
                app.request.post(site_url_mobile_layanan + '/sk_domisili_kurma/delete_layanan/' + id, data, function (data) {
                  app.dialog.close();
                  if (data == false) {
                    app.dialog.alert('Data tidak ditemukan');
                    mainView.router.back();
                    $('#datatables').DataTable().ajax.reload();
                  } else {
                    app.dialog.alert('Berhasil Menghapus Data');
                    mainView.router.back();
                    $('#datatables').DataTable().ajax.reload();
                  }
                }, function () {
                  app.dialog.close();
                  app.dialog.alert('Data Gagal dihapus, Coba lagi di lain waktu');
                }, 'json');
              });
            });

            app.dialog.close();
          }, 'json');
        }
      }, function () {
        app.dialog.close();
        app.dialog.alert('Gagal');
        mainView.router.back();
        $('#datatables').DataTable().ajax.reload();
      }, 'json');

      function prep_penyimpanan() {
        $$('#simpan').on('click', function () {
          app.input.validateInputs('#edit_sk_domisili_kurma');
          if ($$('#edit_sk_domisili_kurma')[0].checkValidity() == true) {
            if (datauser.role_id == 4) {
              app.dialog.preloader('Proses Penyimpanan...');
              let form_data = app.form.convertToData('#edit_sk_domisili_kurma');
              if (anggota_kurma_data?.length) {
                anggota_kurma_data.forEach(function (item, i) {
                  for (const key in item) {
                    if (key.includes('_anggota')) {
                      anggota_kurma_data[i][key.replace('_anggota', '')] = anggota_kurma_data[i][key];
                      delete anggota_kurma_data[i][key];
                    }

                  }
                });
              }

              if (!cek_jumlah_huruf_form_rencana()) return false;
              if (!cek_jumlah_anggota()) return false;
              if (!cek_jumlah_ketua()) return false;
              if (!cek_kk_duplicate()) return false;

              let file_code = new Array();
              $('#formupload-wrapper .file_code').each((i, el) => file_code.push(el.value));
              let file_desc = new Array();
              $('#formupload-wrapper .file_desc').each((i, el) => file_desc.push(el.value));

              let ajax_data = new Array();
              ajax_data.push(iamthedoor);
              ajax_data.push(form_data);
              ajax_data.push(anggota_kurma_data);
              ajax_data.push(file_code);
              ajax_data.push(file_desc);

              app.request.post(site_url_mobile_layanan + '/sk_domisili_kurma/save_sk_domisili_kurma/update/' + id, ajax_data, function (response) {
                app.dialog.close();
                if (isNaN(response)) {
                  if (response.status == 'fail') {
                    app.dialog.alert(response.desc);
                  } else if (response.status == 'success') {
                    app.dialog.alert('Berhasil!');
                  } else {
                    app.dialog.alert('Proses Gagal');
                  }
                } else {
                  app.dialog.alert('Penyimpanan Berhasil');
                  mainView.router.back();
                  $('#datatables').DataTable().ajax.reload();
                }
              }, function () {
                app.dialog.close();
                app.dialog.alert('Penyimpanan Gagal, Coba lagi di lain waktu');
              }, 'json');
            } else {
              if (this_user_is_the_last_index == true && $$('select[name="status"]').val() == 2) {
                var approval = app.popup.create({
                  content: `<div class="popup">
                      <div class="block">
                        <p class="row"><a href="#" class="col-25 button button-raised button-fill popup-close">TUTUP</a></p>
                        <p style="text-align: center;">Ketika Anda mengubah status, maka status dokumen ini <b>tidak dapat diubah kembali</b>.</p>
                        <div class="list">
                          <ul>
                            <li class="item-content item-input">
                              <div class="item-inner">
                                <div class="item-title item-label">Masukkan Passphrase Anda</div>
                                <div class="item-input-wrap">
                                  <input type="password" id="esign" name="esign" placeholder="Passphrase Anda" autocomplete="off">
                                  <span class="input-clear-button"></span>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <br>
                        <button class="col color-green button button-big button-raised button-fill" id="approve_button">APPROVE</button>
                      </div>
                    </div>`
                });
                approval.open();
                $$('#approve_button').on('click', function () {
                  approve('/sk_domisili_kurma/save_sk_domisili_kurma/ustatus/' + id, this_user_is_the_last_index, $$('#esign').val());
                  approval.close();
                });
              } else {
                var approval = app.popup.create({
                  content: `<div class="popup">
                      <div class="block">
                        <p><a href="#" class="link popup-close">< Kembali</a></p>
                        <br>
                        <h3 style="text-align:center;">Ketika Anda mengubah status, maka status dokumen ini <b>tidak dapat diubah kembali</b></h3>
                        <button class="col button button-big button-raised button-fill" id="approve_button">APPROVE</button>
                      </div>
                    </div>`,
                });
                approval.open();
                $$('#approve_button').on('touchend', function () {
                  approve('/sk_domisili_kurma/save_sk_domisili_kurma/ustatus/' + id, this_user_is_the_last_index);
                  approval.close();
                });
              }
            }
          } else {
            app.dialog.close();
            app.dialog.alert('Mohon Lengkapi Form yang Kosong Sebelum Menyimpan');
          }
        })
      }
    },
  }
};

function preview_file_kurma(id, path = 'layanan') {
  if (!id || id == undefined) {
    app.dialog.alert('File tidak ada');
    return false;
  }

  app.request.post(site_url_mobile + '/siurban_mobile/preview_files/' + id, function (image_url) {
    if (image_url == null) {
      app.dialog.alert('File tidak ditemukan');
    } else {
      let preview_files = app.sheet.create({
        content:
          `<div class="sheet-modal page-content" style="height: 100%">
            <div class="block">
              <p class="row">
                <a href="#" class="col-25 button button-raised button-fill sheet-close">TUTUP</a>
              </p>
              <img src="${site_url_image_kurma + image_url + '/' + userencoded}" width="100%">
            </div>
          </div>`,
      });
      preview_files.open();
    }
  }, 'json');
}

function upload_file_kurma(upload_file_id, path = 'layanan') {
  Attachment.openGallery({
    onSuccess: function (fileURL, fileName) {
      app.dialog.preloader('Mohon Tunggu Sebentar...');
      let params = { subdir: path };
      Attachment.upload(fileURL, fileName, params, function (success) {
        app.dialog.close();
        var data = JSON.parse(success.data);
        addformupload_status = true;
        $$('#file_id_' + upload_file_id).val(data[0].id);
        $$('#file_url_' + upload_file_id).val(fileName);
        $$('#file_code_' + upload_file_id).val(data[0].code);
        $$('.preview_file_' + upload_file_id).html('<a onClick="preview_file_kurma(' + data[0].id + ', \'' + path + '\')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>');
      });
    },
  });
}

function find_document_kurma(id, hide) {
  var hidden = '';
  if (hide == true) hidden = 'style="visibility: hidden"';
  var counter = 1;
  var attachments_html = '';
  app.request.post(site_url_mobile + '/siurban_mobile/get_attachments/' + id + '/' + tablename, '', function (result) {
    attachments = result.filter(n => n);
    attachments.forEach(function (item) {
      if (item) {
        attachments_html +=
          `<li class="item-content item-input">
            <div class="item-inner">
              <div class="row">
                <div class="col-60">
                  <div class="item-inner">
                    <div class="item-input-wrap">
                      <div class="item-title item-label">${item.desc}</div>
                      <input type="hidden" id="file_id_${counter}" name="file_id_${counter}" value="${item.id}">
                      <input type="hidden" class="file_code" id="file_code_${counter}" name="file_code_${counter}" value="${item.code}">
                      <input type="hidden" class="file_desc" id="file_desc_${counter}" name="file_desc_${counter}" value="${item.desc}">
                      <input type="text" id="file_url_${counter}" name="file_url_${counter}" value="${item.file_name}" readonly>
                    </div>
                  </div>
                </div>
                <div class="col-20 preview_file_${counter}">
                  <a onClick="preview_file_kurma(${item.id})" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>
                </div>
                <div class="col-20">
                  <a id="${counter}" onClick="upload_file_kurma(this.id)" class="button button-round button-fill" style="margin-top: 10px;" ${hidden}><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>
                </div>
              </div>
            </div>
          </li>`;
        counter++;
      }
    });
    $$('#formupload-wrapper-list').append(attachments_html);
  }, 'json');
}

async function pilihan_kurma(def_kec = datauser.kecamatan, def_kel = datauser.kode_desa) {
  await $.get(site_url_mobile_layanan + '/sk_domisili_kurma/pilihan_kurma/' + def_kec, iamthedoor, function (response) {
    let jenis_usaha = response.result.jenis_usaha;
    let jangkauan_pemasaran = response.result.jangkauan_pemasaran;
    let lama_usaha_berdiri = response.result.lama_usaha_berdiri;
    let modal_usaha = response.result.modal_usaha;
    let penjualan_bulanan = response.result.penjualan_bulanan;
    let laba_usaha_saat_ini = response.result.laba_usaha_saat_ini;

    let option_jenis_usaha = '';
    jenis_usaha.forEach(function (val) {
      option_jenis_usaha += `<option value="${val}">${val}</option>`;
    });
    $('#jenis_usaha').html(option_jenis_usaha);

    let option_jangkauan_pemasaran = '';
    jangkauan_pemasaran.forEach(function (val) {
      option_jangkauan_pemasaran += `<option value="${val}">${val}</option>`;
    });
    $('#jangkauan_pemasaran').html(option_jangkauan_pemasaran);

    let option_lama_usaha_berdiri = '';
    lama_usaha_berdiri.forEach(function (val) {
      option_lama_usaha_berdiri += `<option value="${val}">${val}</option>`;
    });
    $('#lama_usaha_berdiri').html(option_lama_usaha_berdiri);

    let option_modal_usaha = '';
    modal_usaha.forEach(function (val) {
      option_modal_usaha += `<option value="${val}">${val}</option>`;
    });
    $('#modal_usaha').html(option_modal_usaha);

    let option_penjualan_bulanan = '';
    penjualan_bulanan.forEach(function (val) {
      option_penjualan_bulanan += `<option value="${val}">${val}</option>`;
    });
    $('#penjualan_bulanan').html(option_penjualan_bulanan);

    let option_laba_usaha_saat_ini = '';
    laba_usaha_saat_ini.forEach(function (val) {
      option_laba_usaha_saat_ini += `<option value="${val}">${val}</option>`;
    });
    $('#laba_usaha_saat_ini').html(option_laba_usaha_saat_ini);

    let option_kecamatan = '';
    response.result.kecamatan.forEach(function (value) {
      option_kecamatan += `<option data-val="${value.id_district}" value="${value.kode}" ${(value.kode == def_kec ? 'selected' : '')}>${value.nama}</option>`;
    });
    $('#kecamatan').html(option_kecamatan);

    let option_kelurahan = '';
    response.result.kelurahan.forEach(function (value) {
      option_kelurahan += `<option data-val="${value.id_village}" value="${value.kode}" ${(value.kode == def_kel ? 'selected' : '')}>${value.nama}</option>`;
    });
    $('#kelurahan').html(option_kelurahan);
  }, 'json');
}

async function fetch_kecamatan() {
  await $.get(site_url_mobile_layanan + '/sk_domisili_kurma/get_kecamatan', iamthedoor, function (response) {
    let option = '';
    response.result.forEach(function (value) {
      let selected = (value.kode == response.kecamatan_user) ? 'selected' : '';
      option += `<option data-val="${value.id_district}" value="${value.kode}" ${selected}>${value.nama}</option>`;
    });
    $('#kecamatan').html(option);
  }, 'json');
}

async function fetch_kelurahan(kec_id, select) {
  await $.get(site_url_mobile_layanan + '/sk_domisili_kurma/get_kelurahan/' + kec_id, iamthedoor, function (response) {
    let option = '';
    response.result.forEach(function (value) {
      let selected = (select && value.kode == response.kelurahan_user) ? 'selected' : '';
      option += `<option data-val="${value.id_village}" value="${value.kode}" ${selected}>${value.nama}</option>`;
    });
    $('#kelurahan').html(option);
  }, 'json');
}

function cek_jumlah_huruf_form_rencana() {
  let result = true;
  $('.form-rencana-usaha').each(function (index, item) {
    // Max Uraian Form Rencana Usaha 333 Karakter
    if (item.value?.length > 333) {
      app.dialog.close();
      app.dialog.alert('Maximal Panjang Uraian ' + $(item).attr('placeholder') + ' adalah 333 Karakter');
      result = false;
    }
  });

  return result;
}

function cek_jumlah_anggota() {
  let jumlah_nik = $('.list-nik-anggota').map(function () {
    return $(this).text();
  }).get();

  if (jumlah_nik.length < 5 || jumlah_nik.length > 10) {
    app.dialog.close();
    app.dialog.alert('Jumlah Anggota Minimal 5 dan Maksimal 10');
    return false;
  } else if (jumlah_nik.length !== new Set(jumlah_nik).size) {
    app.dialog.close();
    app.dialog.alert('Dilarang Mendaftarkan Anggota dengan NIK yang Sama (Duplikat)');
  } else {
    return true;
  }
}

function cek_jumlah_ketua() {
  let list_status_anggota = $('.list-status-anggota').map(function () {
    return $(this).text();
  }).get();

  let result = 0;
  for (i = 0; i < list_status_anggota.length; i++) {
    if (list_status_anggota[i] == 'Ketua') result++;
  }

  if (result == 0) {
    app.dialog.close();
    app.dialog.alert('Anggota Kelompok harus Memiliki 1 Ketua');
    return false;
  } else if (result > 1) {
    app.dialog.close();
    app.dialog.alert('Hanya Diperbolehkan Ada 1 Ketua dalam Kelompok');
    return false;
  } else {
    return true;
  }
}

function cek_kk_duplicate() {
  let list_kk = $('.list-kk-anggota').map(function () {
    return $(this).text();
  }).get();

  if (list_kk.length !== new Set(list_kk).size) {
    app.dialog.close();
    app.dialog.alert('Anggota Tidak Boleh Ada yang Berada dalam 1 KK');
    return false;
  } else {
    return true;
  }
}

function cetak_register(id) {
  app.dialog.preloader('Mohon Tunggu Sebentar...');
  app.request.post(site_url_mobile_layanan + '/sk_domisili_kurma/print_doc_kurma_register/' + id, iamthedoor, function (doc_path) {
    download_doc(doc_path);
  }, 'json');
}

async function cek_alamat_domisili(type = 'single', data) {
  let result = { status: true, message: null };
  let required = new Array();
  required['kecamatan'] = $('#kecamatan').find('option:selected').data('val');
  required['kelurahan'] = $('#kelurahan').find('option:selected').data('val');
  required['rt'] = $('#rt_kelompok').val();
  required['rw'] = $('#rw_kelompok').val();

  if (type == 'single') {
    if (required['kecamatan'] != data['kecamatan'] || required['kelurahan'] != data['kelurahan']) {
      result.status = false;
      result.message = 'Kecamatan / Kelurahan Domisili Anggota harus Sama dengan Kelompok';
    } else if (required['rt'].padStart(3, '0') != data['rt'].padStart(3, '0') || required['rw'].padStart(3, '0') != data['rw'].padStart(3, '0')) {
      result.status = false;
      result.message = 'RT / RW Domisili Anggota harus Sama dengan Kelompok';
    }
  } else if (type == 'multiple') {
    let kecamatan = new Array();
    let kelurahan = new Array();
    let rt = new Array();
    let rw = new Array();

    data.forEach(function (item, i) {
      for (const key in item) {
        if (key == 'no_kec_anggota') {
          kecamatan.push(data[i][key]);
        }
        if (key == 'no_kel_anggota') {
          kelurahan.push(data[i][key]);
        }
        if (key == 'rt_anggota') {
          rt.push(data[i][key].padStart(3, '0'));
        }
        if (key == 'rw_anggota') {
          rw.push(data[i][key].padStart(3, '0'));
        }
      }
    });

    for (i = 0; i < kecamatan.length; i++) {
      if (required['kecamatan'] != kecamatan[i] || required['kelurahan'] != kelurahan[i]) {
        result.status = false;
        result.message = 'Kecamatan / Kelurahan Domisili Anggota harus Sama dengan Kelompokk';
      } else if (required['rt'] != rt[i] || required['rw'] != rw[i]) {
        result.status = false;
        result.message = 'RT / RW Domisili Anggota harus Sama dengan Kelompok';
      }
    }
  }

  return result;
}

var tracking_sk_domisili_kurma = {
  path: '/tipe-a/tracking_sk_domisili_kurma/:id/',
  url: './pages/tipe-a/tracking_sk_domisili_kurma.html',
  name: 'tracking_sk_domisili_kurma',
  on: {
    pageInit: function () {
      app.dialog.preloader('Mohon Tunggu Sebentar...');
      var id = mainView.router.currentRoute.params.id;
      app.request.post(site_url_mobile_layanan + '/sk_domisili_kurma/tracking_kurma/' + id, iamthedoor, function (response) {
        app.dialog.close();
        if (response?.tracks?.items?.length) {
          var proses = [
            'Buat Pengajuan',
            'Verifikasi Operator Desa/Kel',
            'Persetujuan Kades/Lurah',
            'Verifikasi Operator Kecamatan',
            'Penerimaan Berkas Operator Dinkop',
            // 'Seleksi Pelolosan Operator Penilaian'
          ];

          var pelaksana = [
            response.tracks.approval.nama_pemohon,
            response.tracks.items[0].username,
            response.tracks.items[1].username,
            'OPERATOR KECAMATAN-' + response.kecamatan.nama,
            'OPERATOR PENERIMA-BERKAS',
            // 'OPERATOR KURMA-PENILAIAN FULL'
          ];
          
          var tanggal = [
            response.tracks.approval.tgl_buat || '',
            response.tracks.items[0].tgl_proses || '',
            response.tracks.items[1].tgl_proses || '',
            response.domisili.tgl_verif_kecamatan || '',
            response.domisili.tgl_berkas_diterima || '',
            // response.domisili.tgl_seleksi_dinkop || '',
          ];
          
          var keterangan = [
            '',
            response.tracks.items[0].keterangan || '',
            response.tracks.items[1].keterangan || '',
            '',
            (response.domisili.tgl_berkas_diterima != null) ? 'Berkas Diterima Dinkop' : '',
            // response.domisili.desc_seleksi_dinkop || '',
          ];
          
          var status = ['<span style="background-color: #17A05E; padding: 5px; border-radius: 10px; color: white; white-space: nowrap;"><i class="fa fa-check-circle">&nbsp;Dibuat</span>'];

          var color = '#FF9800', icon = 'minus', info = 'Menunggu';
          if (response.tracks.items[0].status == 2) {
            color = '#17A05E', icon = 'check-circle', info = 'Disetujui';
          } else if (response.tracks.items[0].status == 3) {
            color = '#DE4E42', icon = 'close', info = 'Ditolak';
          }
          status[1] = '<span style="background-color: ' + color + '; padding: 5px; border-radius: 10px; color: white; white-space: nowrap;"><i class="fa fa-' + icon + '">&nbsp;' + info + '</span>';

          var color = '#FF9800', icon = 'minus', info = 'Menunggu';
          if (response.tracks.items[1].status == 2) {
            color = '#17A05E', icon = 'check-circle', info = 'Disetujui';
          } else if (response.tracks.items[1].status == 3) {
            color = '#DE4E42', icon = 'close', info = 'Ditolak';
          }
          status[2] = '<span style="background-color: ' + color + '; padding: 5px; border-radius: 10px; color: white; white-space: nowrap;"><i class="fa fa-' + icon + '">&nbsp;' + info + '</span>';

          var color = '#FF9800', icon = 'minus', info = 'Menunggu';
          if (response.domisili.verified >= 1) {
            color = '#17A05E', icon = 'check-circle', info = 'Disetujui';
          }
          status[3] = '<span style="background-color: ' + color + '; padding: 5px; border-radius: 10px; color: white; white-space: nowrap;"><i class="fa fa-' + icon + '">&nbsp;' + info + '</span>';

          var color = '#FF9800', icon = 'minus', info = 'Menunggu';
          if (response.domisili.verified >= 1 && response.domisili.status_pemeriksaan >= 1) {
            color = '#17A05E', icon = 'check-circle', info = 'Berkas Diterima';
          }

          status[4] = '<span style="background-color: ' + color + '; padding: 5px; border-radius: 10px; color: white; white-space: nowrap;"><i class="fa fa-' + icon + '">&nbsp;' + info + '</span>';

          var color = '#FF9800', icon = 'minus', info = 'Menunggu';
          if (response.domisili.verified == 4) {
            color = '#17A05E', icon = 'check-circle', info = 'Lolos';
          } else if (response.domisili.verified == 5) {
            color = '#DE4E42', icon = 'close', info = 'Tidak Lolos';
          }
          status[5] = '<span style="background-color: ' + color + '; padding: 5px; border-radius: 10px; color: white; white-space: nowrap;"><i class="fa fa-' + icon + '">&nbsp;' + info + '</span>';

          var content = '';
          for (let i = 0; i < proses.length; i++) {

            content += `
                  <tr>
                    <td>${(i + 1)}</td>
                    <td>${(proses[i])}</td>
                    <td>${(pelaksana[i])}</td>
                    <td>${(tanggal[i])}</td>
                    <td>${(keterangan[i])}</td>
                    <td>${(status[i])}</td>
                </tr>
            `;
          }
          $$('#table_tracking tbody').html(content);
        } else {
          app.dialog.alert('Terjadi Kesalahan, Mohon Coba Lagi di Lain Waktu');
        }
      }, function () {
        app.dialog.close();
        app.dialog.alert('Terjadi Kesalahan, Mohon Coba Lagi di Lain Waktu');
      }, 'json');
    }
  }
};