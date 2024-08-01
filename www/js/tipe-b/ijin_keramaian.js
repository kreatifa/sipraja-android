const PDFDocumentIjinkeramaian = PDFLib.PDFDocument;
const StandardFontsIjinkeramaian = PDFLib.StandardFonts;
const rgbIjinkeramaian = PDFLib.rgb;
const degreesIjinkeramaian = PDFLib.degrees;

var ijin_keramaian = {
  path: '/tipe-b/ijin_keramaian',
  url: './pages/tipe-b/ijin_keramaian.html',
  name: 'ijin_keramaian',
  on: {
    pageInit: function () {
      if (datauser.role_id != "4") {
        $$('#btnnew').hide();
      }
      var statusselect = app.smartSelect.create({
        el: '.statusselect',
        on: {
          close: function () {
            app.dialog.preloader('Loading...');
            datatables.context[0].ajax.url = site_url_mobile_layanan + '/ijin_keramaian/get_data/' + $$('#statusselect').val();
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
          url: site_url_mobile_layanan + '/ijin_keramaian/get_data/1',
          data: iamthedoor,
          type: 'GET'
        },
        columns: [
          { data: 'id' },
          { data: 'kode_transaksi' },
          { data: 'nomor' },
          { data: 'nama' },
          { data: 'alamat' },
          { data: 'acara' },
          { data: 'tempat' },
          { data: 'display_name' },
          { data: 'id' },
        ],
        "initComplete": function (settings, json) {
          app.dialog.close();
          $$('#datatables_length').hide();
          $$('#datatables_filter').hide();
        },
        "rowCallback": function (row, data) {
          var color = '#17A05E';
          $('td:eq(8)', row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px; color:white;">Bisa Diambil</span>');
          if (data.val_status && data.status_polres == 2) {
            color = '#DE4E42';
            $('td:eq(8)', row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px; color:white;">Ditolak Polsek</span>');

          } else {
            if (data.val_status == 'Ditolak') {
              color = '#DE4E42';
            } else if (data.val_status == 'Menunggu') {
              color = '#FF9800';
            }

            $('td:eq(8)', row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px; color:white;">' + data.val_status + '</span>');
          }

          if (data.val_status == 'Menunggu') {
            if (datauser.role_id == '4') {
              $('td:eq(0)', row).html('<a href="/tipe-b/edit_ijin_keramaian/' + data.id + '/edit/" class="button button-small button-fill color-blue">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');
            } else {
              $('td:eq(0)', row).html('<a href="/tipe-b/edit_ijin_keramaian/' + data.id + '/approve/" class="button button-small button-fill color-green">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Approve</a>');
            }
          } else {
            $('td:eq(0)', row).html('<a href="/tipe-b/edit_ijin_keramaian/' + data.id + '/view/" class="button button-small button-fill color-green">' +
              '<i class="icon f7-icons" style="font-size: 12pt;">zoom_in</i> Lihat</a>');
          }
        }
      });
    },
  }
};

var new_ijin_keramaian = {
  path: '/tipe-b/new_ijin_keramaian/',
  url: './pages/tipe-b/new_ijin_keramaian.html',
  name: 'new_ijin_keramaian',
  on: {
    pageInit: function () {
      var data_kecamatan = '';
      // add_attachment_pendaftar(datauser.attachments);
      $$("#addformupload").on("touchend", addrow);

      $$('#nik_pemohon').val(datauser.nik);
      $$('#nama').val(datauser.nama);
      $$('#tempat_lahir').val(datauser.tempat_lahir);
      $$('#tgl_lahir').val(datauser.tanggal_lahir);
      $$('#jenis_kelamin').val(datauser.jenis_kelamin);
      $$('#kecamatan_pemohon').val(datauser.nama_kec);
      $$('#kelurahan_pemohon').val(datauser.nama_kel);
      $$('#alamat').val(datauser.alamat);
      $$('#pekerjaan').val(datauser.pekerjaan);
      $$('#no_hp').val(datauser.no_telp_pendaftar);
      $$('#no_hp_penanggung_jawab').val(datauser.no_telp_pendaftar);

      let today = new Date();
      let kalender_tgl_mulai = app.calendar.create({
        inputEl: '#tgl_kegiatan_mulai',
        dateFormat: 'yyyy-mm-dd',
        minDate: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() + 7}`
      });

      let kalender_tgl_selesai = app.calendar.create({
        inputEl: '#tgl_kegiatan_selesai',
        dateFormat: 'yyyy-mm-dd',
        minDate: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() + 7}`
      })

      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/ijin_keramaian/form_create', iamthedoor, function (data) {
        app.dialog.close();

        data_kecamatan = data.kecamatan;
        var list_kecamatan = '';
        data.kecamatan.forEach(function (val, index) {
          list_kecamatan += '<option value="' + val.kode + '">' + val.nama + '</option>';
        })

        $$('#kecamatan').html(list_kecamatan);
        $$('#kecamatan').val(datauser.kecamatan);
        
        data_kelurahan = data.kelurahan;
        var list_kelurahan = '';
        data_kelurahan.forEach(function (val, index) {
          list_kelurahan += `<option value="${val.kode}">${val.nama}</option>`;
        })

        $$('#kelurahan').html(list_kelurahan);
        $$('#kelurahan').val(datauser.kode_desa);

        var tujuan_berkas = '<option value="POLSEK ' + $('#kecamatan :selected').text() + '">POLSEK ' + $('#kecamatan :selected').text() + '</option>';
        $$('#tujuan_berkas').html(tujuan_berkas);
      }, 'json');

      $('#penanggung_jawab').val(datauser.nama);
      $('#kelurahan').html('<option value="">Pilih</option>');
      $$('#kecamatan').on('change', function () {
        if ($('#mengganggu_jalan').val() == 'Tidak' || $('#jenis_jalan').val() == 'Jalan Desa') {
        let tujuan_berkas = 'POLSEK ' + $('#kecamatan option:selected').text();
        $('#tujuan_berkas option:eq(0)').val(tujuan_berkas).text(tujuan_berkas);
        } else {
          let tujuan_berkas = 'POLRESTA SIDOARJO';
          $('#tujuan_berkas option:eq(0)').val(tujuan_berkas).text(tujuan_berkas);
        }
        var option = '';
        $.post(site_url_mobile_layanan + '/ijin_keramaian/get_kelurahan/' + $('#kecamatan').val(), iamthedoor, function (response) {
          $.each(JSON.parse(response), function (index, val) {
            option += `<option value="${val.kode}">${val.nama}</option>`;
          });

          $('#kelurahan').html(option);
        });

        var tujuan_berkas = '<option value="POLSEK ' + $('#kecamatan :selected').text() + '">POLSEK ' + $('#kecamatan :selected').text() + '</option>';
        $$('#tujuan_berkas').html(tujuan_berkas);
      })

      $$('#mengganggu_jalan').on('change', function () {
        if ($('#mengganggu_jalan').val() == 'Tidak' || $('#jenis_jalan').val() == 'Jalan Desa') {
          let tujuan_berkas = 'POLSEK ' + $('#kecamatan option:selected').text();
          $('#tujuan_berkas option:eq(0)').val(tujuan_berkas).text(tujuan_berkas).change();
        } else {
          let tujuan_berkas = 'POLRESTA SIDOARJO';
          $('#tujuan_berkas option:eq(0)').val(tujuan_berkas).text(tujuan_berkas).change();
        }

        if ($('#mengganggu_jalan').val() == 'Ya') {
          $('#tempat_aksi').show();
          
          $('#jenis_jalan').attr('required', 'validate');
          $('#nama_jalan').attr('required', 'validate');
        }else {
          $('#tempat_aksi').hide();
          
          $('#jenis_jalan').removeAttr('required validate')
          $('#nama_jalan').removeAttr('required validate')
          
          $('#jenis_jalan').val('');
          $('#nama_jalan').val('');
        }
      });

      $('#jenis_jalan').on('change', function () {
        if ($('#mengganggu_jalan').val() == 'Tidak' || this.value == 'Jalan Desa') {
          let tujuan_berkas = 'POLSEK ' + $('#kecamatan option:selected').text();
          $('#tujuan_berkas option:eq(0)').val(tujuan_berkas).text(tujuan_berkas).change();
        } else {
          let tujuan_berkas = 'POLRESTA SIDOARJO';
          $('#tujuan_berkas option:eq(0)').val(tujuan_berkas).text(tujuan_berkas).change();
        }
      });

      $$('#simpan').on('click', function () {
        app.input.validateInputs('#form_new_ijin_keramaian');
        if ($$('#form_new_ijin_keramaian')[0].checkValidity() == true) {
          let form_data = app.form.convertToData('#form_new_ijin_keramaian');

          if($('#file_code_spt').val() == '' || $('#file_code_spt').val() == null){
            app.dialog.alert('Mohon Lengkapi dokumen surat pernyataan tetangga');
            return false;
          }

          let filecode = new Array();
          $('#formupload-wrapper .filecode').each((i, el) => filecode.push(el.value));
          let filedesc = new Array();
          $('#formupload-wrapper .filedesc').each((i, el) => filedesc.push(el.value));

          if (filecode.length == 0 || filedesc.length == 0) {
            app.dialog.alert('Mohon Lengkapi dokumen');
            return false;
          }

          let ajax_data = new Array();
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);
          ajax_data.push(filecode);
          ajax_data.push(filedesc);

          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/ijin_keramaian/create', ajax_data, function (data) {
            app.dialog.close();
            if (data.status) {
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
      });
    }
  }
}

var edit_ijin_keramaian = {
  path: '/tipe-b/edit_ijin_keramaian/:id/:tipe/',
  url: './pages/tipe-b/edit_ijin_keramaian.html',
  name: 'edit_ijin_keramaian',
  on: {
    pageInit: function () {
      tablename = 'kt_ijin_keramaian';
      var id = mainView.router.currentRoute.params.id;
      var tipe = mainView.router.currentRoute.params.tipe;

      let today = new Date();
      let kalender_tgl_mulai = app.calendar.create({
        inputEl: '#tgl_kegiatan_mulai',
        dateFormat: 'yyyy-mm-dd',
        minDate: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() + 7}`
      });

      let kalender_tgl_selesai = app.calendar.create({
        inputEl: '#tgl_kegiatan_selesai',
        dateFormat: 'yyyy-mm-dd',
        minDate: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() + 7}`
      })

      $$("#addformupload").hide();

      if (tipe == 'edit') {
        $$('#approval').hide();
        $$("#addformupload").show();
        $$("#addformupload").on("touchend", addrow);
      }

      $$('#mengganggu_jalan').on('change', function () {
        if ($('#mengganggu_jalan').val() == 'Tidak' || $('#jenis_jalan').val() == 'Jalan Desa') {
          let tujuan_berkas = 'POLSEK ' + $('#kecamatan option:selected').text();
          $('#tujuan_berkas option:eq(0)').val(tujuan_berkas).text(tujuan_berkas).change();
        } else {
          let tujuan_berkas = 'POLRESTA SIDOARJO';
          $('#tujuan_berkas option:eq(0)').val(tujuan_berkas).text(tujuan_berkas).change();
        }

        if ($('#mengganggu_jalan').val() == 'Ya') {
          $('#tempat_aksi').show();
          
          $('#jenis_jalan').attr('required', 'validate');
          $('#nama_jalan').attr('required', 'validate');
        }else {
          $('#tempat_aksi').hide();
          
          $('#jenis_jalan').removeAttr('required validate')
          $('#nama_jalan').removeAttr('required validate')
          
          $('#jenis_jalan').val('');
          $('#nama_jalan').val('');
        }
      });

      $('#jenis_jalan').on('change', function () {
        if ($('#mengganggu_jalan').val() == 'Tidak' || this.value == 'Jalan Desa') {
          let tujuan_berkas = 'POLSEK ' + $('#kecamatan option:selected').text();
          $('#tujuan_berkas option:eq(0)').val(tujuan_berkas).text(tujuan_berkas).change();
        } else {
          let tujuan_berkas = 'POLRESTA SIDOARJO';
          $('#tujuan_berkas option:eq(0)').val(tujuan_berkas).text(tujuan_berkas).change();
        }
      });

      $$('.save_button').hide();
      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/ijin_keramaian/form_create', iamthedoor, function (data) {
        app.dialog.close();
        data_kecamatan = data.kecamatan;
        var list_kecamatan = '';
        data.kecamatan.forEach(function (val, index) {
          list_kecamatan += '<option value="' + val.kode + '">' + val.nama + '</option>';
        })

        data_kelurahan = data.kelurahan;
        var list_kelurahan = '';
        data_kelurahan.forEach(function (val, index) {
          list_kelurahan += `<option value="${val.kode}">${val.nama}</option>`;
        })

        $$('#kecamatan').html(list_kecamatan);
        $$('#kecamatan').val(datauser.kecamatan);

        $$('#kelurahan').html(list_kelurahan);
        $$('#kelurahan').val(datauser.kode_desa);

        // var tujuan_berkas = '<option value="POLRESTA SIDOARJO">POLRESTA SIDOARJO</option>';
        var tujuan_berkas = '<option value="POLSEK ' + $('#kecamatan :selected').text() + '">POLSEK ' + $('#kecamatan :selected').text() + '</option>';
        $$('#tujuan_berkas').html(tujuan_berkas);

        app.dialog.preloader('Loading...');
        app.request.post(site_url_mobile_layanan + '/ijin_keramaian/find/' + id, iamthedoor, function (data) {
          app.dialog.close();
          if (data.check_approved === true) {
            $$('.save_button').remove();
            $$('#btndeletelayanan').remove();
            $('#form_edit_ijin_keramaian input').prop('readonly', true);
            $$('.checked_approval_button').show();
          }

          if (data.layanan.nomor == null || data.layanan.nomor == '') $$('#nomor_form').hide();
          $$('#kode_transaksi').val(data.layanan.kode_transaksi);
          $$('#nomor').val(data.layanan.nomor);

          $$('#nik_pemohon').val(datauser.nik);
          $$('#nama').val(data.layanan.nama);
          $$('#tempat_lahir').val(data.layanan.tempat_lahir);
          $$('#tgl_lahir').val(data.layanan.tgl_lahir);
          $$('#jenis_kelamin').val(datauser.jenis_kelamin);
          $$('#kecamatan_pemohon').val(datauser.nama_kec);
          $$('#kelurahan_pemohon').val(datauser.nama_kel);
          $$('#alamat').val(data.layanan.alamat);
          $$('#pekerjaan').val(data.layanan.pekerjaan);
          $$('#no_hp').val(data.layanan.no_hp);
          $$('#jabatan').val(data.layanan.jabatan);

          $$('#acara').val(data.layanan.acara);
          $$('#jenis_acara').val(data.layanan.jenis_acara);
          $$('#mengganggu_jalan').val(data.layanan.mengganggu_jalan).change();

          if ($$('#mengganggu_jalan').val() == 'Ya') {
            $$('#tempat_aksi').show();
            $$('#jenis_jalan').val(data.layanan.jenis_jalan);
            $$('#nama_jalan').val(data.layanan.nama_jalan);
          }else{
            $$('#jenis_jalan').val('');
            $$('#nama_jalan').val('');
          }

          if ($('#mengganggu_jalan').val() == 'Tidak' || $('#jenis_jalan').val() == 'Jalan Desa') {
            let tujuan_berkas = 'POLSEK ' + $('#kecamatan option:selected').text();
            $('#tujuan_berkas option:eq(0)').val(tujuan_berkas).text(tujuan_berkas).change();
          } else {
            let tujuan_berkas = 'POLRESTA SIDOARJO';
            $('#tujuan_berkas option:eq(0)').val(tujuan_berkas).text(tujuan_berkas).change();
          }

          $$('#penanggung_jawab').val(data.layanan.penanggung_jawab);
          $$('#no_hp_penanggung_jawab').val(data.layanan.no_hp);
          $$('#organisasi').val(data.layanan.organisasi);
          $$('#tempat').val(data.layanan.tempat);
          $$('#tgl_kegiatan_mulai').val(data.layanan.tgl_kegiatan_mulai);
          $$('#tgl_kegiatan_selesai').val(data.layanan.tgl_kegiatan_selesai);
          $$('#waktu_mulai').val(data.layanan.waktu_mulai);
          $$('#waktu_selesai').val(data.layanan.waktu_selesai);
          $$('#jenis_undangan').val(data.layanan.jenis_undangan);
          $$('#undangan').val(data.layanan.undangan);
          $$('#hiburan').val(data.layanan.hiburan);
          $$('#undangan').val(data.layanan.undangan);
          $$('#id_kecamatan').val(data.layanan.id_kecamatan);
          $$('#tujuan_berkas').val(data.layanan.tujuan_berkas);
          $$('#kecamatan').val(data.layanan.kecamatan);
          $$('#kelurahan').val(data.layanan.kelurahan);

          $$("#addformupload").on("touchend", addrow);
          if (data.layanan.file_code !== null) {
            if (tipe == 'edit') {
              find_document(id, false);
            } else {
              find_document(id, true);
            }
          }

          if (data.report_ijin_keramaian !== null) {
            $$('#file_id_spt').val(data.report_ijin_keramaian.id);
            $$('#file_code_spt').val(data.report_ijin_keramaian.code);
            $$('#file_url_spt').val(data.report_ijin_keramaian.file_name);
            $$('.preview_files_spt').html(`<a id="preview_doc_spt" onclick="cordova.InAppBrowser.open('${site_url_image_layanan}${data.report_ijin_keramaian.file_actual}/${userencoded}', '_system')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>`);
          }
          
          if (data.layanan.doc_path_ttd_spt != null) {
            $$('#berkas-ijin-keramaian').show();
            $$('#preview_doc_spt_tdd').on('click', function () {
              app.dialog.preloader('Mohon Tunggu Sebentar...');
              download_doc(data.layanan.doc_path_ttd_spt + '_signed.pdf');
            });

            $$('#preview_doc_spt_polos').on('click', function () {
              app.dialog.preloader('Mohon Tunggu Sebentar...');
              download_doc(data.layanan.doc_path_ttd_spt + '_blank_signed.pdf');
            });
          }

          this_user_is_the_last_index = data.this_user_is_the_last_index;
          if (data.approve !== null && iamthedoor.role_id != 4) {
            $$("input[name='approve_items_id']").val(data.approve.id);
            $$("input[name='type_ttd']").val(data.approve.author_type);
            document_look(data.latest_status.status_approval, data.latest_status.display_name);
            if (data.approve.ttd) {
              ttdview(data.approve.ttd);
            }
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

            if (data?.user_polsek) {
              let status_pengajuan = 'Menunggu';
              if (data.layanan.status_polres == 1) status_pengajuan = 'Disetujui';
              else if (data.layanan.status_polres == 2) status_pengajuan = 'Ditolak';

              table_chron += `<tr>
                    <td>${status_pengajuan}</td>
                    <td>Polsek</td>
                    <td>${data.user_polsek.display_name}</td>
                    <td>${data.layanan.keterangan}</td>
                    <td>${data.layanan.tgl_verif}</td>
                </tr>`;
            }
          } else {
            table_chron = '<tr>' + '<td></td>' + '<td>Belum Ada Approval</td>' + '<td></td>' + '<td></td>' + '<td></td>' + '</tr>';
          }

          $$(".table-chron").html(table_chron);
          if (datauser.role_id != '4') {
            $$('.save_button').show();
            $$('#edit_ijin_keramaian input').prop("disabled", true);
            $$('#edit_ijin_keramaian textarea').prop("disabled", true);
            if (tipe == 'approve') {
              $$('#simpan').html('<i class="icon f7-icons">checkmark_seal_fill</i> Approve');
              $$('#print_preview_button').show();
            } else {
              if (data.check_approved) {
                $$('.save_button').hide();
                $$('.checked_approval_button').show();
              } else {
                $$('.save_button').hide();
              }
            }
          }
          $$('#print_preview_button').on('click', function () {
            app.dialog.preloader('Mohon Tunggu Sebentar...');
            preview_doc(data.report_ijin_keramaian.file_actual, 'layanan');
          });

          if (data.layanan.doc_path != null || data.layanan.doc_path != '') {
            $$('#cetak_report').on('click', function () {
              app.dialog.preloader('Mohon Tunggu Sebentar...');
              download_doc(data.layanan.doc_path + '_signed.pdf');
            });
          }
        }, function () {
          app.dialog.close();
          app.dialog.alert('Terjadi Kesalahan Saat Mengambil Data Anda, Mohon Coba Lagi Nanti');
          mainView.router.back();
          $('#datatables').DataTable().ajax.reload();
        }, 'json');
      }, 'json');

      $$('#id_kecamatan').on('change', function () {
        var tujuan_berkas = '<option value="POLRESTA SIDOARJO">POLRESTA SIDOARJO</option>';
        tujuan_berkas += '<option value="POLSEK ' + $('#id_kecamatan :selected').text() + '">POLSEK ' + $('#id_kecamatan :selected').text() + '</option>';
        $$('#tujuan_berkas').html(tujuan_berkas);
      })

      $$('#simpan').on('click', function () {
        app.input.validateInputs('#form_edit_ijin_keramaian');
        if ($$('#form_edit_ijin_keramaian')[0].checkValidity() == true) {
          if (iamthedoor.role_id == 4) {
            let form_data = app.form.convertToData('#form_edit_ijin_keramaian');
            let filecode = new Array();
            $('#formupload-wrapper .filecode').each((i, el) => filecode.push(el.value));
            let filedesc = new Array();
            $('#formupload-wrapper input[name="keteranganid[]"]').each((i, el) => filedesc.push(el.value));

            if (filecode.length < 1 || filedesc.length < 1) {
              app.dialog.alert('Mohon Isi Berkas Lampiran Anda Terlebih Dahulu');
              return false;
            }

            let ajax_data = new Array();
            ajax_data.push(iamthedoor);
            ajax_data.push(form_data);
            ajax_data.push(filecode);
            ajax_data.push(filedesc);

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile_layanan + '/ijin_keramaian/update/' + id, ajax_data, function (data) {
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
                  approve_ijin_keramaian('/ijin_keramaian/ustatus/' + id, id, this_user_is_the_last_index, $$('#esign').val());
                  approval.close();
                } else if ($$('#type_ttd').val() == 'Kecamatan') {
                  approve('/ijin_keramaian/ustatus/' + id, this_user_is_the_last_index, $$('#esign').val());
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
                approve('/ijin_keramaian/ustatus/' + id, this_user_is_the_last_index);
                approval.close();
              });
            }
          }
        }
      });

      $$('#deletelayanan').on('click', function () {
        app.dialog.confirm('Apakah anda yakin Menghapus Data ini?', function () {
          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/ijin_keramaian/delete/' + id, iamthedoor, function (data) {
            app.dialog.close();
            if (data.success) {
              app.dialog.alert('Data Berhasil Dihapus');
              mainView.router.back();
              $('#datatables').DataTable().ajax.reload();
            } else {
              app.dialog.alert(data.desc);
            }
          }, function () {
            app.dialog.close();
            app.dialog.alert('Data Gagal Dihapus, Mohon Coba Lagi Nanti');
          }, 'json');
        });
      });
    }
  }
}

var data_approve = '';
var url_approve = '';

function approve_ijin_keramaian(function_url, id, this_user_is_the_last_index, esign = '') {
  data_approve = $.extend(app.form.convertToData('#approval'), iamthedoor);
  url_approve = site_url_mobile_layanan + function_url + '/' + iamthedoor.user_id + '/' + iamthedoor.kecamatan_id + '/' + iamthedoor.kelurahan_id + '/';
  if (this_user_is_the_last_index == true && $$("select[name='status']").val() == 2 && esign.length == 0) {
      app.dialog.alert('Passphrase Tidak Boleh Kosong');
  } else {
      app.dialog.preloader('Sedang Proses...');
      data_approve['esign'] = window.btoa(esign).replace(/=/g, '');

      app.request.post(site_url_mobile_layanan + '/ijin_keramaian/get_berkas_verif/' + id, data_approve, function (data) {
          for (var i = 0; i < data.data.length; i++) {
              generateQRCodeIjinkeramaian(data.data[i].elem, data.data[i].file, data.id, data.kepala)
          }
      }, 'json');
  }
}

function generateQRCodeIjinkeramaian(this_elem, file_link, id, kepala) {
  var unique_name = '';
  app.request.post(site_url_mobile_layanan + '/ijin_keramaian/unique_name/' + id, iamthedoor, function (json) {
    unique_name = json;
    
    $('#qrcode').empty();
      new QRCode($('#qrcode').get(0), {
        text: btoa('ESIGN' + $('#approve_items_id').val() + $('#kode_layanan').val()).replace(/=/g, ''),
        width: 100,
        height: 100,
        correctLevel: QRCode.CorrectLevel.M,
    });

    generateIjinkeramaian();
    async function generateIjinkeramaian() {
      var timestamp = new Date().toLocaleString('en-GB', { hour12: false });
      var form_data_ttd = new FormData();
      form_data_ttd.append('unique_name', unique_name);
      var this_elem_ttd = 'ttd_' + this_elem;
      var this_elem_ttd_blank = 'ttd_blank_' + this_elem;
      const formUrl = base_url + '/esign/acquire_external/layanan/' + file_link;
      const formBytes = await fetch(formUrl).then((res) => res.arrayBuffer());
      const pdfDoc = await PDFDocumentIjinkeramaian.load(formBytes);
      const timesFont = await pdfDoc.embedFont(StandardFontsIjinkeramaian.Helvetica);
      const timesBoldFont = await pdfDoc.embedFont(StandardFontsIjinkeramaian.TimesRomanBold);
      const pngImage = await pdfDoc.embedPng($('#qrcode canvas').get(0).toDataURL());
      const pngDims = pngImage.scale(0.5);

      const pages = pdfDoc.getPages();
      pages.forEach(function (currPage) {
          // const lastPage = pages[pages.length - 1];

          let strlen = timesFont.widthOfTextAtSize('Mengetahui', 11);
          currPage.drawText('Mengetahui', {
              x: currPage.getWidth() / 4 - (strlen / 2),
              y: currPage.getHeight() / 4 - 66,
              size: 11,
              font: timesFont
          });

          let prefixLength = timesFont.widthOfTextAtSize(kepala.prefix, 11);
          currPage.drawText(kepala.prefix, {
              x: currPage.getWidth() / 4 - (prefixLength / 2),
              y: currPage.getHeight() / 4 - 78,
              size: 11,
              font: timesFont
          });

          strlen = timesFont.widthOfTextAtSize('Ditandatangani secara elektronik oleh', 9);
          currPage.drawText('Ditandatangani secara elektronik oleh', {
              x: currPage.getWidth() / 4 - ((strlen + pngDims.width) / 2) + pngDims.width + 6,
              y: currPage.getHeight() / 8 + 8,
              size: 9,
              font: timesFont
          });

          currPage.drawImage(pngImage, {
              x: currPage.getWidth() / 4 - ((strlen + pngDims.width) / 2),
              y: currPage.getHeight() / 8 - 36,
              width: pngDims.width,
              height: pngDims.height,
          });

          currPage.drawText(kepala.kades, {
              x: currPage.getWidth() / 4 - ((strlen + pngDims.width) / 2) + pngDims.width + 6,
              y: currPage.getHeight() / 8 - 22,
              size: 8,
              font: timesBoldFont
          });

          let prenip = kepala.nip == 0 ? '' : 'NIP. ' + kepala.nip;
          currPage.drawText(prenip, {
              x: currPage.getWidth() / 4 - ((strlen + pngDims.width) / 2) + pngDims.width + 6,
              y: currPage.getHeight() / 8 - 32,
              size: 8,
              font: timesFont
          });

          let kadesLength = timesBoldFont.widthOfTextAtSize(kepala.kades, 11);
          currPage.drawText(kepala.kades, {
              x: currPage.getWidth() / 4 - (kadesLength / 2),
              y: currPage.getHeight() / 8 - 54,
              size: 11,
              font: timesBoldFont
          });

          currPage.drawLine({
              start: { x: currPage.getWidth() / 4 - (kadesLength / 2), y: 50 },
              end: { x: currPage.getWidth() / 4 - (kadesLength / 2) + kadesLength, y: 50 },
              thickness: 1
          });

          let prenipLength = timesFont.widthOfTextAtSize(prenip, 11);
          currPage.drawText(prenip, {
              x: currPage.getWidth() / 4 - (prenipLength / 2),
              y: currPage.getHeight() / 8 - 66,
              size: 11,
              font: timesFont
          });
      });

      const pdfBytes = await pdfDoc.save();
      form_data_ttd.append('extension', 'pdf');
      form_data_ttd.append('file', new Blob([pdfBytes], { type: 'application/pdf' }));
      file_upload_ttd_ijin(this_elem, form_data_ttd, id);
      update_data_ijin_keramaian(id, this_elem, unique_name);

      const blank_pdfDoc = await PDFDocumentIjinkeramaian.create();
      const blank_pngImage = await blank_pdfDoc.embedPng($('#qrcode canvas').get(0).toDataURL());
      const blank_pngDims = blank_pngImage.scale(0.5);
      const blank_page = blank_pdfDoc.addPage();
      const blank_pages = blank_pdfDoc.getPages();
      const blank_lastPage = blank_pages[blank_pages.length - 1];

      let strlen = timesFont.widthOfTextAtSize('Mengetahui', 11);
      blank_lastPage.drawText('Mengetahui', {
          x: blank_lastPage.getWidth() / 4 - (strlen / 2),
          y: blank_lastPage.getHeight() / 4 - 66,
          size: 11,
          font: timesFont
      });

      let prefixLength = timesFont.widthOfTextAtSize(kepala.prefix, 11);
      blank_lastPage.drawText(kepala.prefix, {
          x: blank_lastPage.getWidth() / 4 - (prefixLength / 2),
          y: blank_lastPage.getHeight() / 4 - 78,
          size: 11,
          font: timesFont
      });

      strlen = timesFont.widthOfTextAtSize('Ditandatangani secara elektronik oleh', 9);
      blank_lastPage.drawText('Ditandatangani secara elektronik oleh', {
          x: blank_lastPage.getWidth() / 4 - ((strlen + blank_pngDims.width) / 2) + blank_pngDims.width + 6,
          y: blank_lastPage.getHeight() / 8 + 8,
          size: 9,
          font: timesFont
      });

      blank_lastPage.drawImage(blank_pngImage, {
          x: blank_lastPage.getWidth() / 4 - ((strlen + blank_pngDims.width) / 2),
          y: blank_lastPage.getHeight() / 8 - 36,
          width: blank_pngDims.width,
          height: blank_pngDims.height,
      });

      blank_lastPage.drawText(kepala.kades, {
          x: blank_lastPage.getWidth() / 4 - ((strlen + blank_pngDims.width) / 2) + blank_pngDims.width + 6,
          y: blank_lastPage.getHeight() / 8 - 22,
          size: 8,
          font: timesBoldFont
      });

      let prenip = kepala.nip == 0 ? '' : 'NIP. ' + kepala.nip;
      blank_lastPage.drawText(prenip, {
          x: blank_lastPage.getWidth() / 4 - ((strlen + blank_pngDims.width) / 2) + blank_pngDims.width + 6,
          y: blank_lastPage.getHeight() / 8 - 32,
          size: 8,
          font: timesFont
      });

      let kadesLength = timesBoldFont.widthOfTextAtSize(kepala.kades, 11);
      blank_lastPage.drawText(kepala.kades, {
          x: blank_lastPage.getWidth() / 4 - (kadesLength / 2),
          y: blank_lastPage.getHeight() / 8 - 54,
          size: 11,
          font: timesBoldFont
      });

      blank_lastPage.drawLine({
          start: { x: blank_lastPage.getWidth() / 4 - (kadesLength / 2), y: 50 },
          end: { x: blank_lastPage.getWidth() / 4 - (kadesLength / 2) + kadesLength, y: 50 },
          thickness: 1
      });

      let prenipLength = timesFont.widthOfTextAtSize(prenip, 11);
      blank_lastPage.drawText(prenip, {
          x: blank_lastPage.getWidth() / 4 - (prenipLength / 2),
          y: blank_lastPage.getHeight() / 8 - 66,
          size: 11,
          font: timesFont
      });

      var form_data_blank_ttd = new FormData();
      form_data_blank_ttd.append('unique_name', unique_name + '_blank');

      const blank_pdfBytes = await blank_pdfDoc.save();
      form_data_blank_ttd.append('extension', 'pdf');
      form_data_blank_ttd.append('file', new Blob([blank_pdfBytes], { type: 'application/pdf' }));
      file_upload_ttd_blank_ijin(this_elem, form_data_blank_ttd, id);
    }
  }, 'json');
}

function file_upload_ttd_ijin(this_elem, form_data, id) {
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

function file_upload_ttd_blank_ijin(this_elem, form_data, id) {
  $.ajax({
      url: base_url + '/file/upload_log',
      dataType: 'text',
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      type: 'POST',
      success: function (json) {
          if (this_elem == 'spt') {
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

function update_data_ijin_keramaian(id, elemen, data) {
  app.request.post(site_url_mobile_layanan + '/ijin_keramaian/update_data/' + elemen + '/' + data + '/' + id, data_approve, function (data) {
    
  }, 'json');
}

function uploadfileberkaspdfik(uploadfileid) {
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
          $$('#file_id' + uploadfileid).val(data[0].id);
          $$('#file_url' + uploadfileid).val(fileName);
          $$('#file_code' + uploadfileid).val(data[0].code);
          $$('.preview_files' + uploadfileid).html('');
          var preview_files = `<a id="${uploadfileid}" onclick="cordova.InAppBrowser.open('${site_url_image_layanan}${data[0].file_actual}/${userencoded}', '_system')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>`;
          $$('.preview_files' + uploadfileid).html(preview_files);
        });
      } else {
        app.dialog.alert("Mohon untuk upload berkas dengan format pdf");
      }
    },
  }, 'ALLMEDIA');
}