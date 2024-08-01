const PDFDocument = PDFLib.PDFDocument;
const StandardFonts = PDFLib.StandardFonts;
const rgb = PDFLib.rgb;
const degrees = PDFLib.degrees;

var waris = {
  path: '/tipe-b/waris',
  url: './pages/tipe-b/waris.html',
  name: 'waris',
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
      var statusselect = app.smartSelect.create({
        el: '.statusselect',
        on: {
          close: function () {
            app.dialog.preloader('Loading...');
            datatables.context[0].ajax.url = site_url_mobile_layanan + '/waris/get_data/' + $$('#statusselect').val();
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
          url: site_url_mobile_layanan + '/waris/get_data/1',
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
              $('td:eq(0)', row).html('<a href="/tipe-b/edit_waris/' + data.id + '/edit/" class="button button-small button-fill color-blue">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');
            } else {
              $('td:eq(0)', row).html('<a href="/tipe-b/edit_waris/' + data.id + '/approve/" class="button button-small button-fill color-green">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Approve</a>');
            }
          } else {
            $('td:eq(0)', row).html('<a href="/tipe-b/edit_waris/' + data.id + '/view/" class="button button-small button-fill color-green">' +
              '<i class="icon f7-icons" style="font-size: 12pt;">zoom_in</i> Lihat</a>');
          }
        }
      });
    },
  }
};

var new_waris = {
  path: '/tipe-b/new_waris/',
  url: './pages/tipe-b/new_waris.html',
  name: 'new_waris',
  on: {
    pageInit: function () {
      $.getScript({ url: './js/tipe-b/waris_table.js' }, function () {
        waris_table_create();
      });

      var dynamicPopupTemplateWaris = app.popup.create({
        content: '<div class="popup my-popup">' +
          '<div class="view">' +
          '<div class="page">' +
          '<div class="navbar">' +
          '<div class="navbar-inner">' +
          '<div class="title">Template Surat Pernyataan Waris</div>' +
          '<div class="right">' +
          '<a class="link popup-close">Close</a>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '<div class="page-content">' +
          '<div class="block">' +
          '<div class="list simple-list">' +
          '<ul>' +
          '<li>' +
          '<a id="hukum" onclick="open_modal_dokumen(this.id)" class="link button button-fill color-green"><i class="icon f7-icons" style="font-size: 23px;">bars</i> Dokumen Secara Hukum</a>' +
          '</li>' +
          '<li>' +
          '<a id="islam" onclick="open_modal_dokumen(this.id)" class="link button button-fill color-green"><i class="icon f7-icons" style="font-size: 23px;">bars</i> Dokumen Secara Islam</a>' +
          '</li>' +
          '</ul>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>',
        on: {
          opened: function (popup) {
          },
        }
      });

      $$('#template_pernyataan_waris').on('click', function () {
        dynamicPopupTemplateWaris.open();
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

      $$('#status_hidup_pewaris').on('change', function () {
        if ($(this).val() == 'Meninggal') {
          $$('#status_meninggal').show();
        } else {
          $$('#status_meninggal').hide();
        }
      });

      $$('#status_keluarga').on('change', function () {
        if ($(this).val() == 'Istri') {
          // $$('#tambah_anak_kandung_pewaris input').convertToData('');

          $$('#status_istri').show();
          $$('#status_suami').hide();
        } else {
          $$('#status_istri').hide();
          $$('#status_suami').show();
        }
      });

      $$('#jenis_nikah_pasangan').on('change', function () {
        if ($(this).val() == 'Siri') {
          $$('#nikah_siri').show();
          $$('#nikah_resmi').hide();
        } else {
          $$('#nikah_siri').hide();
          $$('#nikah_resmi').show();
        }
      });

      $$('#status_hidup_ayah').on('change', function () {
        if ($(this).val() == 'Meninggal') {
          $$('#status_hidup_ayah_meninggal').show();
        } else {
          $$('#status_hidup_ayah_meninggal').hide();
        }
      });

      $$('#status_hidup_ibu').on('change', function () {
        if ($(this).val() == 'Meninggal') {
          $$('#status_hidup_ibu_meninggal').show();
        } else {
          $$('#status_hidup_ibu_meninggal').hide();
        }
      });

      $$('#status_hidup_pasangan').on('change', function () {
        if ($(this).val() == 'Meninggal') {
          $$('#status_hidup_pasangan_meninggal').show();
        } else {
          $$('#status_hidup_pasangan_meninggal').hide();
        }
      });

      $$("#addformupload").on("touchend", addrow);

      $$('#simpan').on('click', function () {
        app.input.validateInputs('#form_new_waris');
        if ($$('#form_new_waris')[0].checkValidity() == true) {
          let form_data = app.form.convertToData('#form_new_waris');
          let filecode = new Array();
          $('#formupload-wrapper .filecode').each((i, el) => filecode.push(el.value));
          let filedesc = new Array();
          $('#formupload-wrapper .filedesc').each((i, el) => filedesc.push(el.value));

          if (filecode.length < 1 || filedesc.length < 1) {
            app.dialog.alert('Mohon Isi Berkas Lampiran Anda Terlebih Dahulu');
            return false;
          }

          let ajax_data = new Array();
          ajax_data.push(iamthedoor); // 0
          ajax_data.push(form_data);  // 1
          ajax_data.push(pasangan_pewaris); // 2
          ajax_data.push(anak_kandung_pewaris); // 3
          ajax_data.push(cucu_anak_kandung_pewaris); // 4
          ajax_data.push(anak_angkat_pewaris); // 5
          ajax_data.push(cucu_angkat_pewaris); // 6
          ajax_data.push(saudara_kandung_pewaris); // 7
          ajax_data.push(keponakan_pewaris); // 8
          ajax_data.push(filecode);   // 9
          ajax_data.push(filedesc);   // 10

          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/waris/create_waris', ajax_data, function (data) {
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

var edit_waris = {
  path: '/tipe-b/edit_waris/:id/:tipe',
  url: './pages/tipe-b/edit_waris.html',
  name: 'edit_waris',
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

      $$('#status_hidup_pewaris').on('change', function () {
        if ($(this).val() == 'Meninggal') {
          $$('#status_meninggal').show();
        } else {
          $$('#status_meninggal').hide();
        }
      });

      $$('#status_keluarga').on('change', function () {
        if ($(this).val() == 'Istri') {
          // $$('#tambah_anak_kandung_pewaris input').convertToData('');

          $$('#status_istri').show();
          $$('#status_suami').hide();
        } else {
          $$('#status_istri').hide();
          $$('#status_suami').show();
        }
      });

      $$('#jenis_nikah_pasangan').on('change', function () {
        if ($(this).val() == 'Siri') {
          $$('#nikah_siri').show();
          $$('#nikah_resmi').hide();
        } else {
          $$('#nikah_siri').hide();
          $$('#nikah_resmi').show();
        }
      });
      // AK ayah

      $$('#status_hidup_ayah').on('change', function () {
        if ($(this).val() == 'Meninggal') {
          $$('#status_hidup_ayah_meninggal').show();
        } else {
          $$('#status_hidup_ayah_meninggal').hide();
        }
      });
      // end

      // AK ibu
      $$('#status_hidup_ibu').on('change', function () {
        if ($(this).val() == 'Meninggal') {
          $$('#status_hidup_ibu_meninggal').show();
        } else {
          $$('#status_hidup_ibu_meninggal').hide();
        }
      });
      // end

      $$('#status_hidup_pasangan').on('change', function () {
        if ($(this).val() == 'Meninggal') {
          $$('#status_hidup_pasangan_meninggal').show();
        } else {
          $$('#status_hidup_pasangan_meninggal').hide();
        }
      });

      get_kecamatan_dom('#kecamatan_pewaris', '#kelurahan_pewaris');
      $$('#kecamatan_pewaris').on('change', function () {
        get_kelurahan_dom($$('#kecamatan_pewaris').val(), '#kelurahan_pewaris');
      });

      // Pop up Template surat
      var dynamicPopupTemplateWaris = app.popup.create({
        content: '<div class="popup my-popup">' +
          '<div class="view">' +
          '<div class="page">' +
          '<div class="navbar">' +
          '<div class="navbar-inner">' +
          '<div class="title">Template Surat Pernyataan Waris</div>' +
          '<div class="right">' +
          '<a class="link popup-close">Close</a>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '<div class="page-content">' +
          '<div class="block">' +
          '<div class="list simple-list">' +
          '<ul>' +
          '<li>' +
          '<a id="hukum" onclick="open_modal_dokumen(this.id)" class="link button button-fill color-green"><i class="icon f7-icons" style="font-size: 23px;">bars</i> Dokumen Secara Hukum</a>' +
          '</li>' +
          '<li>' +
          '<a id="islam" onclick="open_modal_dokumen(this.id)" class="link button button-fill color-green"><i class="icon f7-icons" style="font-size: 23px;">bars</i> Dokumen Secara Islam</a>' +
          '</li>' +
          '</ul>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>',
        on: {
          opened: function (popup) {
          },
        }
      });

      $$('#template_pernyataan_waris').on('click', function () {
        dynamicPopupTemplateWaris.open();
      });

      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/waris/find/' + id, iamthedoor, function (data) {
        app.dialog.close();
        // Field Data Dokumen
        $$('#kode_transaksi').val(data.layanan.kode_transaksi);
        $$('#sidang').val(data.layanan.tmpt_sidang);
        $$('#nik_pewaris').val(data.layanan.nik_pewaris);
        $$('#nama_pewaris').val(data.layanan.nama_pewaris);
        $$('#jenis_kelamin_pewaris').val(data.layanan.jenis_kelamin_pewaris);
        $$('#tgl_lahir_pewaris').val(data.layanan.tgl_lahir_pewaris);
        $$('#kecamatan_pewaris').val(data.layanan.kecamatan_pewaris);
        get_kelurahan_dom(data.layanan.kecamatan_pewaris, '#kelurahan_pewaris');
        app.request.post(site_url_mobile_layanan + '/waris/kelurahan/' + data.layanan.kecamatan_pewaris + '/' + data.layanan.kelurahan_pewaris, iamthedoor, function (callback) {
          $$('#kelurahan_pewaris').val(callback.kode);
        }, 'json');
        $$('#alamat_pewaris').val(data.layanan.alamat_pewaris);
        $$('#status_keluarga').val(data.layanan.status_keluarga);
        $$('#status_hidup_pewaris').val(data.layanan.status_hidup_pewaris);
        if (data.layanan.status_hidup_pewaris == 'Meninggal') {
          $$('#status_meninggal').show();
        }
        $$('#tgl_meninggal_pewaris').val(data.layanan.tgl_meninggal_pewaris);
        if (data.layanan.akta_kematian_pewaris[0] != null) {
          $$('#fileurl_ak_pewaris').val(data.berkas_ak_pewaris[0].code);
          var preview_file_ak_pewaris = '<a id="_ak_pewaris" onclick="preview_files_waris(' + data.berkas_ak_pewaris[0].id + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
          $$(".preview_file_ak_pewaris").html(preview_file_ak_pewaris);
        }

        $$('#nik_pasangan').val(data.pasangan_pewaris[0].m_nik_pasangan);
        $$('#nama_pasangan').val(data.pasangan_pewaris[0].m_nama_pasangan);
        $$('#tgl_lahir_pasangan').val(data.pasangan_pewaris[0].m_tgl_lahir_pasangan);
        $$('#jenis_nikah_pasangan').val(data.pasangan_pewaris[0].m_jenis_nikah_pasangan);
        $$('#status_hidup_pasangan').val(data.pasangan_pewaris[0].m_status_hidup_pasangan);

        if (data.pasangan_pewaris[0].filecode_buku_nikah != null) {
          $$('#fileurl_nikah_resmi').val(data.pasangan_pewaris[0].filecode_buku_nikah);
          var preview_file_nikah_resmi = '<a id="_nikah_resmi" onclick="preview_files_waris(' + data.pasangan_pewaris[0].fileid_m_buku_nikah + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
          $$(".preview_file_nikah_resmi").html(preview_file_nikah_resmi);
        }

        if (data.pasangan_pewaris[0].filecode_akta_kematian != null) {
          $$('#fileurl_ak_pasangan').val(data.pasangan_pewaris[0].filecode_akta_kematian);
          var preview_file_ak_pasangan = '<a id="_ak_pasangan" onclick="preview_files_waris(' + data.pasangan_pewaris[0].fileid_m_akta_kematian + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
          $$(".preview_file_ak_pasangan").html(preview_file_ak_pasangan);
        }

        $.getScript({ url: './js/tipe-b/waris_table.js' }, function () {
          waris_table_edit(data);
        });

        $$('#nik_ayah').val(data.layanan.nik_ayah);
        $$('#nama_ayah').val(data.layanan.nama_ayah);
        $$('#status_hidup_ayah').val(data.layanan.status_hidup_ayah);
        if (data.layanan.status_hidup_ayah == 'Meninggal') {
          $$('#status_hidup_ayah_meninggal').show();
        }
        if (data.berkas_ak_ayah[0] != null) {
          $$('#fileurl_ak_ayah').val(data.berkas_ak_ayah[0].code);
          var preview_file_ak_ayah = '<a id="_ak_ayah" onclick="preview_files_waris(' + data.berkas_ak_ayah[0].id + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
          $$(".preview_file_ak_ayah").html(preview_file_ak_ayah);
        }

        $$('#nik_ibu').val(data.layanan.nik_ibu);
        $$('#nama_ibu').val(data.layanan.nama_ibu);
        $$('#status_hidup_ibu').val(data.layanan.status_hidup_ibu);
        if (data.layanan.status_hidup_ibu == 'Meninggal') {
          $$('#status_hidup_ibu_meninggal').show();
        }
        if (data.berkas_ak_ibu[0] != null) {
          $$('#fileurl_ak_ibu').val(data.berkas_ak_ibu[0].code);
          var preview_file_ak_ibu = '<a id="_ak_ibu" onclick="preview_files_waris(' + data.berkas_ak_ibu[0].id + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
          $$(".preview_file_ak_ibu").html(preview_file_ak_ibu);
        }

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
          var preview_files_spw = '<a id="_spw" onclick="preview_files_waris(' + data.attachments_waris[0].id + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
          $$(".preview_files_spw").html(preview_files_spw);
        }

        if (data.attachments_waris[1] != null) {
          $$('#fileurl_basw').val(data.attachments_waris[1].code);
          var preview_files_basw = '<a id="_basw" onclick="preview_files_waris(' + data.attachments_waris[1].id + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
          $$(".preview_files_basw").html(preview_files_basw);
        }

        if (data.attachments_waris[2] != null) {
          $$('#fileurl_dhsw').val(data.attachments_waris[2].code);
          var preview_files_dhsw = '<a id="_dhsw" onclick="preview_files_waris(' + data.attachments_waris[2].id + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
          $$(".preview_files_dhsw").html(preview_files_dhsw);
        }

        if (data.attachments_waris[3] != null) {
          $$('#fileurl_dsw').val(data.attachments_waris[3].code);
          var preview_files_dsw = '<a id="_dsw" onclick="preview_files_waris(' + data.attachments_waris[3].id + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
          $$(".preview_files_dsw").html(preview_files_dsw);
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

        // Dokumen hasil pengadilan
        if (data.layanan.tgl_sidang != null || data.layanan.tgl_terbit_penetapan != null || data.layanan.nomor_surat_penetapan != null) {
          $$('#dokumen_hasil').show();
          $$('#tanggal_proses').val(data.layanan.tgl_terima_pengadilan);
          $$('#tanggal_sidang_pengadilan').val(data.layanan.tgl_sidang);
          $$('#tanggal_terbit_penetapan').val(data.layanan.tgl_terbit_penetapan);
          $$('#nomor_surat_penetapan').val(data.layanan.nomor_surat_penetapan);
          $$('#file_pengadilan').attr('onclick', 'file_pengadilan(' + data.berkas_pengadilan[0].id + ')');
        }

        // Report
        if (iamthedoor.role_id != 4) {
          $$('#resume').show();
          $$('#resume').attr('onclick', 'cetak_resume(' + data.layanan.id + ')');
        }

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

        if (datauser.role_id == '4') {
          $$("#btndeletelayanan").html('<a class="button button-round button-fill color-red" id="deletelayanan" style="margin-top: 10px;">' +
            '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Hapus Data</span></a>');
          $$('#form_edit_waris input').prop("disabled", true);
          $$('#form_edit_waris textarea').prop("disabled", true);
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
            let filecode = new Array();
            $('#formupload-wrapper .filecode').each((i, el) => filecode.push(el.value));
            let filedesc = new Array();
            $('#formupload-wrapper .filedesc').each((i, el) => filedesc.push(el.value));

            if (filecode.length < 1 || filedesc.length < 1) {
              app.dialog.alert('Mohon Isi Berkas Lampiran Anda Terlebih Dahulu');
              return false;
            }

            let ajax_data = new Array();
            ajax_data.push(iamthedoor); // 0
            ajax_data.push(form_data);  // 1
            ajax_data.push(pasangan_pewaris); // 2
            ajax_data.push(anak_kandung_pewaris); // 3
            ajax_data.push(cucu_anak_kandung_pewaris); // 4
            ajax_data.push(anak_angkat_pewaris); // 5
            ajax_data.push(cucu_angkat_pewaris); // 6
            ajax_data.push(saudara_kandung_pewaris); // 7
            ajax_data.push(keponakan_pewaris); // 8
            ajax_data.push(filecode);   // 9
            ajax_data.push(filedesc);   // 10

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile_layanan + '/waris/update_waris/' + id, ajax_data, function (data) {
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
                  approve('/waris/ustatus/' + id, this_user_is_the_last_index, $$('#esign').val());
                  approval.close();
                } else if ($$('#type_ttd').val() == 'Kecamatan') {
                  approve_waris('/waris/ustatus/' + id, id, this_user_is_the_last_index, $$('#esign').val());
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
                approve('/waris/ustatus/' + id, this_user_is_the_last_index);
                approval.close();
              });
            }
          }
        }
      });

      $$('#deletelayanan').on('click', function () {
        app.dialog.confirm('Apakah anda yakin Menghapus Data ini?', function () {
          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/waris/delete_layanan/' + id, iamthedoor, function (callback) {
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

    app.request.post(site_url_mobile_layanan + '/waris/get_berkas_verif/' + id, data_approve, function (data) {
      for (var i = 0; i < data.data.length; i++) {
        generateQRCodeWaris(data.id, data.data[i].elem, data.data[i].file, data.data[i].unique_name, data.last_approval.waktu_proses_kel)
      }
    }, 'json');
  }
}

function generateQRCodeWaris(id, this_elem, file_link, unique_name, date_ttd_desa) {
  var unique_name = '';
  app.request.post(site_url_mobile_layanan + '/waris/unique_name/' + id, iamthedoor, function (json) {
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
      const formBytes = await fetch(formUrl).then((res) => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(formBytes);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const helveticaFontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
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
          color: rgb(0, 0, 0),
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
          color: rgb(0, 0, 0),
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
          color: rgb(0, 0, 0),
        });

        currPage.drawText(nama_camat, {
          x: currPage.getWidth() - (currPage.getWidth() - 155),
          y: currPage.getHeight() - (currPage.getHeight() - 65),
          size: 10,
          lineHeight: 14,
          font: helveticaFontBold,
          color: rgb(0, 0, 0),
        });

        currPage.drawText('NIP. ' + nip_camat, {
          x: currPage.getWidth() - (currPage.getWidth() - 155),
          y: currPage.getHeight() - (currPage.getHeight() - 50),
          size: 10,
          lineHeight: 10,
          font: helveticaFont,
          color: rgb(0, 0, 0),
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
          color: rgb(0, 0, 0),
        });

        currPage.drawText(nama_kades, {
          x: currPage.getWidth() / 2 + 95,
          y: currPage.getHeight() - (currPage.getHeight() - 65),
          size: 10,
          lineHeight: 14,
          font: helveticaFontBold,
          color: rgb(0, 0, 0),
        });

        currPage.drawText('NIP. ' + nip_kades, {
          x: currPage.getWidth() / 2 + 95,
          y: currPage.getHeight() - (currPage.getHeight() - 50),
          size: 10,
          lineHeight: 10,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });

        currPage.drawText('DISCLAIMER :', {
          x: currPage.getWidth() - (currPage.getWidth() - 20),
          y: currPage.getHeight() - (currPage.getHeight() - 30),
          size: 10,
          lineHeight: 10,
          font: helveticaFontBold,
          color: rgb(0, 0, 0),
        });

        currPage.drawText('Camat / kades / kakel mengetahui disini bersifat deklaratif. Untuk substansi / isi surat pernyataan ahli waris ini tanggung jawab penuh / mutlak dari para ahli waris.', {
          x: currPage.getWidth() - (currPage.getWidth() - 20),
          y: currPage.getHeight() - (currPage.getHeight() - 20),
          size: 8,
          lineHeight: 8,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      });

      const pdfBytes = await pdfDoc.save();
      form_data_ttd.append('extension', 'pdf');
      form_data_ttd.append('file', new Blob([pdfBytes], { type: 'application/pdf' }));
      file_upload_ttd(this_elem_ttd, form_data_ttd, id, unique_name);
      update_data_waris(id, this_elem, unique_name, form_data_ttd);

      const blank_pdfDoc = await PDFDocument.create();
      const blank_helveticaFont = await blank_pdfDoc.embedFont(StandardFonts.Helvetica);
      const blank_helveticaFontBold = await blank_pdfDoc.embedFont(StandardFonts.HelveticaBold);
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
        color: rgb(0, 0, 0),
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
        color: rgb(0, 0, 0),
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
        color: rgb(0, 0, 0),
      });

      blank_lastPage.drawText(nama_camat, {
        x: blank_lastPage.getWidth() - (blank_lastPage.getWidth() - 160),
        y: blank_lastPage.getHeight() - (blank_lastPage.getHeight() - 65),
        size: 10,
        lineHeight: 14,
        font: blank_helveticaFontBold,
        color: rgb(0, 0, 0),
      });

      blank_lastPage.drawText('NIP. ' + nip_camat, {
        x: blank_lastPage.getWidth() - (blank_lastPage.getWidth() - 160),
        y: blank_lastPage.getHeight() - (blank_lastPage.getHeight() - 50),
        size: 10,
        lineHeight: 10,
        font: blank_helveticaFont,
        color: rgb(0, 0, 0),
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
        color: rgb(0, 0, 0),
      });

      blank_lastPage.drawText(nama_kades, {
        x: blank_lastPage.getWidth() / 2 + 100,
        y: blank_lastPage.getHeight() - (blank_lastPage.getHeight() - 65),
        size: 10,
        lineHeight: 14,
        font: blank_helveticaFontBold,
        color: rgb(0, 0, 0),
      });

      blank_lastPage.drawText('NIP. ' + nip_kades, {
        x: blank_lastPage.getWidth() / 2 + 100,
        y: blank_lastPage.getHeight() - (blank_lastPage.getHeight() - 50),
        size: 10,
        lineHeight: 10,
        font: blank_helveticaFont,
        color: rgb(0, 0, 0),
      });

      blank_lastPage.drawText('DISCLAIMER :', {
        x: blank_lastPage.getWidth() - (blank_lastPage.getWidth() - 20),
        y: blank_lastPage.getHeight() - (blank_lastPage.getHeight() - 30),
        size: 10,
        lineHeight: 10,
        font: blank_helveticaFontBold,
        color: rgb(0, 0, 0),
      });

      blank_lastPage.drawText('Camat / kades / kakel mengetahui disini bersifat deklaratif. Untuk substansi / isi surat pernyataan ahli waris ini tanggung jawab penuh / mutlak dari para ahli waris.', {
        x: blank_lastPage.getWidth() - (blank_lastPage.getWidth() - 20),
        y: blank_lastPage.getHeight() - (blank_lastPage.getHeight() - 20),
        size: 8,
        lineHeight: 8,
        font: blank_helveticaFont,
        color: rgb(0, 0, 0),
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
      if (this_elem == 'dsw') {
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
    url: base_url + '/admin/layanantipeb/waris/update_data/' + id + '/' + this_elem + '/' + unique_name,
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
        '<a id="' + index + '" onclick="deleterow(this.id)" class="button button-round button-fill color-red" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">trash_fill</i></a>' +
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
      app.dialog.preloader('Loading...')
      Attachment.upload(fileURL, fileName, params, function (success) {
        app.dialog.close();
        var data = JSON.parse(success.data);
        var pdf = $$('#filecode' + uploadfileid).val(data[0].code);
        var ext = pdf.substring(pdf.lastIndexOf('.') + 1);
        if (ext == "pdf") {
          addformupload_status = true;
          $$('#fileid' + uploadfileid).val(data[0].id);
          $$('#fileurl' + uploadfileid).val(fileName);
          $$('#filecode' + uploadfileid).val(data[0].code);
          $$('.preview_file' + uploadfileid).html('');
          var preview_files = `<a id="${uploadfileid}" onclick="cordova.InAppBrowser.open('${site_url_image_layanan}${data[0].file_actual}/${userencoded}', '_system')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>`;
          $$('.preview_file' + uploadfileid).html(preview_files);
        } else {
          app.dialog.alert("Mohon untuk upload berkas dengan format pdf");
        }
      });
    },
  }, 'ALLMEDIA');
}

function open_modal_dokumen(type) {
  app.dialog.preloader('Loading...');
  app.request.post(site_url_mobile_layanan + '/waris/get_list_berkas/' + type, iamthedoor, function (data) {
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
        '<div class="title">Dokumen</div>' +
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
  app.request.post(site_url_mobile_layanan + '/waris/resume/' + id, iamthedoor, function (doc_path) {
    download_doc(doc_path);
  }, 'json');
}

function cetak_dokumen(dokumen) {
  app.dialog.preloader('Mohon Tunggu Sebentar...');
  app.request.post(site_url_mobile_layanan + '/waris/download/' + dokumen, iamthedoor, function (doc_path) {
    download_doc(doc_path);
  }, 'json');
}

function file_pengadilan(id) {
  app.dialog.preloader('Mohon Tunggu Sebentar...');
  app.request.post(site_url_mobile_layanan + '/waris/file_pengadilan/' + id, iamthedoor, function (doc_path) {
    download_doc(doc_path);
  }, 'json');
}