tablename = "surat_kelahiran";
var new_suratkelahiran = {
  path: '/tipe-a/new_suratkelahiran/',
  url: './pages/tipe-a/new_suratkelahiran.html',
  name: 'new_suratkelahiran',
  on: {
    pageInit: function() {
      var calendar_tanggal_lahir = app.calendar.create({
        inputEl: '#tanggal_lahir',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_lahir_ibu = app.calendar.create({
        inputEl: '#tgl_lahir_ibu',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_pencatatan_perkawinan = app.calendar.create({
        inputEl: '#tgl_pencatatan_kawin',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_lahir_ayah = app.calendar.create({
        inputEl: '#tgl_lahir_ayah',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });

      $$("#tanggal_lahir").val(get_current_date());
      $$("#tgl_lahir_ibu").val(get_current_date());
      $$("#tgl_pencatatan_kawin").val(get_current_date());
      $$("#tgl_lahir_ayah").val(get_current_date());

      if ($$('.bs-timepicker').length) {
        $('.bs-timepicker').timepicker();
      }

      $('#jenis_lahir_anak').on('change', function() {
        if (this.value == 'Tunggal') {
          $$('#jumlah_kembar_anak').val(1);
        } else if (this.value == 'Kembar Dua') {
          $$('#jumlah_kembar_anak').val(2);
        } else if (this.value == 'Kembar Tiga') {
          $$('#jumlah_kembar_anak').val(3);
        } else if (this.value == 'Kembar Empat') {
          $$('#jumlah_kembar_anak').val(4);
        } else if (this.value == 'Kembar Banyak/Lainnya') {
          $$('#jumlah_kembar_anak').val(5);
        }
      });

      get_provinsi_new('#provinsi_anak');
      $$('#provinsi_anak').on('change', function() {
        get_kabupaten_new($$('#provinsi_anak').val(), '#kota_anak');
      });
      $$('#kota_anak').on('change', function() {
        get_kecamatan_new($$('#kota_anak').val(), '#kecamatan_anak');
      });
      $$('#kecamatan_anak').on('change', function() {
        get_kelurahan_new($$('#kecamatan_anak').val(), '#kelurahan_anak');
      });

      get_provinsi_new('#provinsi_ibu');
      $$('#provinsi_ibu').on('change', function() {
        get_kabupaten_new($$('#provinsi_ibu').val(), '#kota_ibu');
      });
      $$('#kota_ibu').on('change', function() {
        get_kecamatan_new($$('#kota_ibu').val(), '#kecamatan_ibu');
      });
      $$('#kecamatan_ibu').on('change', function() {
        get_kelurahan_new($$('#kecamatan_ibu').val(), '#kelurahan_ibu');
      });

      get_provinsi_new('#provinsi_ayah');
      $$('#provinsi_ayah').on('change', function() {
        get_kabupaten_new($$('#provinsi_ayah').val(), '#kota_ayah');
      });
      $$('#kota_ayah').on('change', function() {
        get_kecamatan_new($$('#kota_ayah').val(), '#kecamatan_ayah');
      });
      $$('#kecamatan_ayah').on('change', function() {
        get_kelurahan_new($$('#kecamatan_ayah').val(), '#kelurahan_ayah');
      });

      get_provinsi_new('#provinsi_saksi');
      $$('#provinsi_saksi').on('change', function() {
        get_kabupaten_new($$('#provinsi_saksi').val(), '#kota_saksi');
      });
      $$('#kota_saksi').on('change', function() {
        get_kecamatan_new($$('#kota_saksi').val(), '#kecamatan_saksi');
      });
      $$('#kecamatan_saksi').on('change', function() {
        get_kelurahan_new($$('#kecamatan_saksi').val(), '#kelurahan_saksi');
      });

      get_pilihan_umum({
        kerja_elem: [
          '#pekerjaan_ayah', '#pekerjaan_ibu',
          '#pekerjaan_saksi'
        ],
        hub_elem: '#hubungan_pemohon'
      });

      $$("#addformupload").on("touchend", addrow);
      $$("#simpan").on("click", function() {
        app.input.validateInputs("#new_suratkelahiran");
        if ($$('#new_suratkelahiran')[0].checkValidity() == true) {
          data = new Array();
          keteranganid = [];
          filecode = [];
          $('input[name^=keteranganid]').each(function() {
            keteranganid.push($(this).val());
          });
          $('input[name^=filecode]').each(function() {
            filecode.push($(this).val());
          });
          mydata = app.form.convertToData("#new_suratkelahiran");
          data.push(mydata);
          data.push(iamthedoor);
          data.push(keteranganid);
          data.push(filecode);
          app.request.post(site_url_mobile_layanan + '/surat_kelahiran/save_surat_kelahiran', data, function(result) {
            if (isNaN(result)) {
              app.dialog.alert(result.desc);
            } else {
              if (mydata.hubungan_pemohon == 'Kepala Keluarga' || mydata.hubungan_pemohon.includes('Ayah') || mydata.hubungan_pemohon.includes('Ibu') ||
                mydata.hubungan_pemohon == 'Orang Tua') {
                app.dialog.alert(
                  'Dengan Mendaftarkan Permohonan Surat Kelahiran, maka Anda diharuskan melengkapi Form KK berikut:',
                  function() {
                    mainView.router.navigate('/tipe-b/edit_kartu_keluarga/' + result + '/edit/', {
                      ignoreCache: true,
                      reloadCurrent: true
                    });
                  }
                );
              } else {
                app.dialog.alert('Penyimpanan Berhasil');
                mainView.router.back();
                $('#datatables').DataTable().ajax.reload();
              }
            }
          }, function() {
            app.dialog.alert('Penyimpanan Gagal, Coba lagi di lain waktu');
          }, 'json');
        }
      })
    },
  }
};
var surat_kelahiran = {
  path: '/tipe-a/suratkelahiran',
  url: './pages/tipe-a/suratkelahiran.html',
  name: 'suratkelahiran',
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
            datatables.context[0].ajax.url = site_url_mobile_layanan + '/surat_kelahiran/layanan/' + $$('#statusselect').val();
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
          "url": site_url_mobile_layanan + '/surat_kelahiran/layanan/1',
          "data": iamthedoor,
          "type": "GET"
        },
        "columns": [
          { "data": "id" },
          { "data": "kode_transaksi" },
          { "data": "nomor" },
          { "data": "nama_anak" },
          { "data": "tanggal_lahir" },
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
              $('td:eq(0)', row).html('<a href="/tipe-a/edit_suratkelahiran/' + data.id + '/edit/" class="button button-small button-fill color-blue">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');
            } else {
              $('td:eq(0)', row).html('<a href="/tipe-a/edit_suratkelahiran/' + data.id + '/approve/" class="button button-small button-fill color-green">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Approve</a>');
            }
          } else {
            $('td:eq(0)', row).html('<a href="/tipe-a/edit_suratkelahiran/' + data.id + '/lihat/" class="button button-small button-fill color-green">' +
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
var edit_suratkelahiran = {
  path: '/tipe-a/edit_suratkelahiran/:id/:tipe',
  url: './pages/tipe-a/edit_suratkelahiran.html',
  name: 'edit_suratkelahiran',
  on: {
    pageInit: function() {
      tablename = "surat_kelahiran";
      var calendar_tanggal_lahir = app.calendar.create({
        inputEl: '#tanggal_lahir',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_lahir_ibu = app.calendar.create({
        inputEl: '#tgl_lahir_ibu',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_pencatatan_perkawinan = app.calendar.create({
        inputEl: '#tgl_pencatatan_kawin',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var calendar_tanggal_lahir_ayah = app.calendar.create({
        inputEl: '#tgl_lahir_ayah',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });

      get_pilihan_umum({
        kerja_elem: [
          '#pekerjaan_ayah', '#pekerjaan_ibu',
          '#pekerjaan_saksi'
        ],
        hub_elem: '#hubungan_pemohon'
      });

      if ($$('.bs-timepicker').length) {
        $('.bs-timepicker').timepicker();
      }

      $('#jenis_lahir_anak').on('change', function() {
        if (this.value == 'Tunggal') {
          $$('#jumlah_kembar_anak').val(1);
        } else if (this.value == 'Kembar Dua') {
          $$('#jumlah_kembar_anak').val(2);
        } else if (this.value == 'Kembar Tiga') {
          $$('#jumlah_kembar_anak').val(3);
        } else if (this.value == 'Kembar Empat') {
          $$('#jumlah_kembar_anak').val(4);
        } else if (this.value == 'Kembar Banyak/Lainnya') {
          $$('#jumlah_kembar_anak').val(5);
        }
      });

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
        app.request.post(site_url_mobile_layanan + '/surat_kelahiran/print_doc/' + id, iamthedoor, function(doc_path) {
          download_doc(doc_path);
        }, 'json');
      });
      $$("#print_preview_button").on("click", function() {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/surat_kelahiran/print_doc/' + id, iamthedoor, function(doc_path) {
          preview_doc(doc_path);
        }, 'json');
      });
      data = [];
      data.push(iamthedoor);
      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/surat_kelahiran/find_layanan/' + id + '/' + datauser.bf_users_id, data, function(data) {
        if (data == false) {
          app.dialog.close();
          app.dialog.alert('Data tidak ditemukan');
          mainView.router.back();
        } else {
          this_user_is_the_last_index = data.this_user_is_the_last_index;
          app.request.post(site_url_mobile + '/siurban_mobile/get_kecamatan_kelurahan/' + data.pemohon.kecamatan + '/' + data.pemohon.kode_desa, function(keckel) {
            if (data.approve !== null) {
              $$("input[name='approve_items_id']").val(data.approve.id);
              $$("input[name='type_ttd']").val(data.approve.author_type);
              document_look(data.latest_status.status_approval, data.latest_status.display_name);
              if (data.approve.ttd !== null) {
                ttdview(data.approve.ttd);
              }
            }

            $$("input[name='no_kk']").val(data.layanan.no_kk);
            $$("input[name='nama_kepkel']").val(data.layanan.nama_kepkel);

            $$("input[name='nik_anak']").val(data.layanan.nik_anak);
            $$("input[name='nama_anak']").val(data.layanan.nama_anak);
            $$("select[name='jenis_kelamin']").val(data.layanan.jenis_kelamin).change();
            $$("select[name='tempat_dilahirkan_anak']").val(data.layanan.tempat_dilahirkan_anak).change();
            $$("select[name='penolong_kelahiran_anak']").val(data.layanan.penolong_kelahiran_anak).change();
            $$("input[name='tempat_lahir']").val(data.layanan.tempat_lahir);
            get_provinsi_new('#provinsi_anak', data.layanan.provinsi_anak);
            $$('#provinsi_anak').on('change', function() {
              get_kabupaten_new($$('#provinsi_anak').val(), '#kota_anak', data.layanan.kota_anak);
            });
            $$('#kota_anak').on('change', function() {
              get_kecamatan_new($$('#kota_anak').val(), '#kecamatan_anak', data.layanan.kecamatan_anak);
            });
            $$('#kecamatan_anak').on('change', function() {
              get_kelurahan_new($$('#kecamatan_anak').val(), '#kelurahan_anak', data.layanan.kelurahan_anak);
            });
            $$("input[name='tanggal_lahir']").val(data.layanan.tanggal_lahir);
            $$("input[name='jam_lahir_anak']").val(data.layanan.jam_lahir_anak);
            $$("select[name='jenis_lahir_anak']").val(data.layanan.jenis_lahir_anak).change();
            $$("input[name='jumlah_kembar_anak']").val(data.layanan.jumlah_kembar_anak);
            $$("input[name='jumlah_kelahiran_anak']").val(data.layanan.jumlah_kelahiran_anak);
            $$("input[name='berat_lahir_anak']").val(data.layanan.berat_lahir_anak);
            $$("input[name='panjang_lahir_anak']").val(data.layanan.panjang_lahir_anak);

            $$("input[name='nik_ibu']").val(data.layanan.nik_ibu);
            $$("input[name='nama_ibu']").val(data.layanan.nama_ibu);
            $$("input[name='tgl_lahir_ibu']").val(data.layanan.tgl_lahir_ibu);
            $$("select[name='pekerjaan_ibu']").val(data.layanan.pekerjaan_ibu).change();
            $$("textarea[name='alamat']").val(data.layanan.alamat);
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
            $$("select[name='kewarganegaraan_ibu']").val(data.layanan.kewarganegaraan_ibu).change();
            $$("input[name='kebangsaan_ibu']").val(data.layanan.kebangsaan_ibu);
            $$("input[name='tgl_pencatatan_kawin']").val(data.layanan.tgl_pencatatan_kawin);
            $$("input[name='no_akta_kawin']").val(data.layanan.no_akta_kawin);

            $$("input[name='nik_ayah']").val(data.layanan.nik_ayah);
            $$("input[name='nama_suami']").val(data.layanan.nama_suami);
            $$("input[name='tgl_lahir_ayah']").val(data.layanan.tgl_lahir_ayah);
            $$("select[name='pekerjaan_ayah']").val(data.layanan.pekerjaan_ayah).change();
            $$("textarea[name='alamat_ayah']").val(data.layanan.alamat_ayah);
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
            $$("select[name='kewarganegaraan_ayah']").val(data.layanan.kewarganegaraan_ayah).change();
            $$("input[name='kebangsaan_ayah']").val(data.layanan.kebangsaan_ayah);

            $$("input[name='nik_pemohon']").val(data.layanan.nik_pelapor);
            $$("input[name='nama_pemohon']").val(data.layanan.pelapor);
            $$("input[name='email_pelapor']").val(data.layanan.email_pelapor);
            $$("input[name='telp_pemohon']").val(data.layanan.no_telp_pelapor);
            $$("select[name='hubungan_pemohon']").val(data.layanan.hubungan).change();

            $$("input[name='nik_saksi']").val(data.layanan.nik_saksi);
            $$("input[name='nama_saksi']").val(data.layanan.nama_saksi);
            $$("input[name='umur_saksi']").val(data.layanan.umur_saksi);
            $$("select[name='pekerjaan_saksi']").val(data.layanan.pekerjaan_saksi).change();
            $$("textarea[name='alamat_saksi']").val(data.layanan.alamat_saksi);
            get_provinsi_new('#provinsi_saksi', data.layanan.provinsi_saksi);
            $$('#provinsi_saksi').on('change', function() {
              get_kabupaten_new($$('#provinsi_saksi').val(), '#kota_saksi', data.layanan.kota_saksi);
            });
            $$('#kota_saksi').on('change', function() {
              get_kecamatan_new($$('#kota_saksi').val(), '#kecamatan_saksi', data.layanan.kecamatan_saksi);
            });
            $$('#kecamatan_saksi').on('change', function() {
              get_kelurahan_new($$('#kecamatan_saksi').val(), '#kelurahan_saksi', data.layanan.kelurahan_saksi);
            });

            $$("textarea[name='catatan']").val(data.layanan.catatan);

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
                $$('#edit_suratkelahiran input').prop("disabled", true);
                $$('#edit_suratkelahiran textarea').prop("disabled", true);
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
              $$('#edit_suratkelahiran input').prop("disabled", true);
              $$('#edit_suratkelahiran textarea').prop("disabled", true);
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
            prep_delete(id);
            app.dialog.close();
          }, function() {}, 'json');
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
            app.input.validateInputs("#edit_suratkelahiran");
            if ($$('#edit_suratkelahiran')[0].checkValidity() == true) {
              app.dialog.preloader('Proses Penyimpanan...');
              keteranganid = [];
              filecode = [];
              $('input[name^=keteranganid]').each(function() {
                keteranganid.push($(this).val());
              });
              $('input[name^=filecode]').each(function() {
                filecode.push($(this).val());
              });
              mydata = app.form.convertToData("#edit_suratkelahiran");
              data.push(mydata);
              data.push(iamthedoor);
              data.push(keteranganid);
              data.push(filecode);
              var url = site_url_mobile_layanan + '/surat_kelahiran/save_surat_kelahiran/update/' + id;
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
            }
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
                approve('/surat_kelahiran/save_surat_kelahiran/ustatus/' + id, this_user_is_the_last_index, $$('#esign').val());
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
                approve('/surat_kelahiran/save_surat_kelahiran/ustatus/' + id, this_user_is_the_last_index);
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
          app.request.post(site_url_mobile_layanan + '/surat_kelahiran/delete_layanan/' + id, data, function(data) {
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