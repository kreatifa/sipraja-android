tablename = "kt_tdp";
// var tanda_daftar_perusahaan_new = {
//   path: '/tipe-c/tanda_daftar_perusahaan_new/',
//   url: './pages/tipe-c/tanda_daftar_perusahaan_new.html',
//   name: 'tanda_daftar_perusahaan_new',
//   on: {
//     pageInit: function () {
//       pimpinan_perusahaan = new Array();
//       $$("#addpimpinan").on("touchend", function () {
//         popup_tambah_pimpinan_perusahaan();
//       });
//       app.request.post(site_url_mobile + '/siurban_mobile/get_kode_kecamatan/', function (kecamatan) {
//         kecamatan_html = '';
//         for (var i = 0; i < kecamatan.length; i++) {
//           kecamatan_html += '<option value="' + kecamatan[i].kode + '">' + kecamatan[i].nama + '</option>'
//         }
//         $$("select[name='kode_kecamatan']").html(kecamatan_html).change();
//         var kecamatan_kode = $$("select[name='kode_kecamatan']").val();
//         get_data_kelurahan_2(kecamatan_kode);
//         $$("select[name='kode_kecamatan']").on("change", function () {
//           kecamatan_kode = $$("select[name='kode_kecamatan']").val();
//           get_data_kelurahan_2(kecamatan_kode);
//         });
//       }, 'json');
//       $$("#addformupload").on("touchend", addrow);
//       $$("#simpan").on("click", function () {
//         app.input.validateInputs("#tanda_daftar_perusahaan_new");
//         if ($$('#tanda_daftar_perusahaan_new')[0].checkValidity() == true) {
//           data = new Array();
//           keteranganid = [];
//           filecode = [];
//           $('input[name^=keteranganid]').each(function () {
//             keteranganid.push($(this).val());
//           });
//           $('input[name^=filecode]').each(function () {
//             filecode.push($(this).val());
//           });
//           if (!$('#pas_foto').val()) {
//             mainView.router.back();
//             $('#datatables').DataTable().ajax.reload();
//             app.dialog.alert('Gagal Simpan! Mohon mengisi Foto!');
//             return false;
//           }
//           mydata = app.form.convertToData("#tanda_daftar_perusahaan_new");
//           data.push(mydata);
//           data.push(iamthedoor);
//           data.push(keteranganid);
//           data.push(filecode);
//           data.push(pimpinan_perusahaan);
//           app.request.post(site_url_mobile_layanan + '/tanda_daftar_perusahaan/save_tanda_daftar_perusahaan', data, function (data) {
//             if (isNaN(data)) {
//               app.dialog.alert(data.desc);
//             } else {
//               app.dialog.alert('Penyimpanan Berhasil');
//               mainView.router.back();
//               $('#datatables').DataTable().ajax.reload();
//             }
//           }, function () {
//             app.dialog.alert('Penyimpanan Gagal, Coba lagi di lain waktu');
//           }, 'json');
//         }
//       })
//     },
//   }
// };
var tanda_daftar_perusahaan = {
  path: '/tipe-c/tanda_daftar_perusahaan',
  url: './pages/tipe-c/tanda_daftar_perusahaan.html',
  name: 'tanda_daftar_perusahaan',
  on: {
    pageInit: function () {
      $$("#btnnew").hide();
      if (datauser.role_id == "4") {
        $$("#btnnew").show();
      }
      $$('#btnnew').on('click', function () {
        cordova.InAppBrowser.open("https://oss.go.id", '_system');
      });
      var statusselect = app.smartSelect.create({
        el: '.statusselect',
        on: {
          close: function () {
            app.dialog.preloader('Loading...');
            datatables.context[0].ajax.url = site_url_mobile_layanan + '/tanda_daftar_perusahaan/layanan/' + $$('#statusselect').val();
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
        "serverSide": true,
        "ajax": {
          "url": site_url_mobile_layanan + '/tanda_daftar_perusahaan/layanan/1',
          "data": iamthedoor,
          "type": "GET"
        },
        "columns": [
          { "data": "id" },
          { "data": "kode_transaksi" },
          { "data": "nomor" },
          { "data": "nama_usaha" },
          { "data": "masa_berlaku" },
          { "data": "pendaftaran_tipe" },
          { "data": "display_name", "width": "20%" },
          { "data": "val_status", "width": "20%" },
          { "data": "status_fix", "width": "20%" },
        ],
        "initComplete": function (settings, json) {
          app.dialog.close();
          $$('#datatables_length').hide();
          $$('#datatables_filter').hide();
          $$('#datatables_paginate').hide();
        },
        "rowCallback": function (row, data) {
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
              $('td:eq(0)', row).html('<a href="/tipe-c/tanda_daftar_perusahaan_edit/' + data.id + '/edit/" class="button button-small button-fill color-blue">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');
            } else {
              $('td:eq(0)', row).html('<a href="/tipe-c/tanda_daftar_perusahaan_edit/' + data.id + '/approve" class="button button-small button-fill color-green">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Approve</a>');
            }
          } else {
            $('td:eq(0)', row).html('<a href="/tipe-c/tanda_daftar_perusahaan_edit/' + data.id + '/lihat/" class="button button-small button-fill color-green">' +
              '<i class="icon f7-icons" style="font-size: 12pt;">zoom_in</i> Lihat</a>');
          }
          if (!data.nomor) {
            $('td:eq(2)', row).html('---');
          }
          if (!data.display_name) {
            $('td:eq(5)', row).html('---');
          }
        }
      });
    }
  }
};
var tanda_daftar_perusahaan_edit = {
  path: '/tipe-c/tanda_daftar_perusahaan_edit/:id/:tipe',
  url: './pages/tipe-c/tanda_daftar_perusahaan_edit.html',
  name: 'tanda_daftar_perusahaan_edit',
  on: {
    pageInit: function () {
      tablename = "kt_tdp";
      var calendar_tanggal_lahir = app.calendar.create({
        inputEl: '#tanggal_lahir',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var this_user_is_the_last_index = false;
      var id = mainView.router.currentRoute.params.id;
      var tipe = mainView.router.currentRoute.params.tipe;
      $$(".checked_approval_button").hide();
      if (tipe == 'edit') {
        $$('#approval').hide();
        $$("#addformupload").show();
        $$("#addformupload").on("touchend", addrow);
        $$("#addpimpinan").on("touchend", function () {
          popup_tambah_pimpinan_perusahaan();
        });
      }
      var data = new Array();
      pimpinan_perusahaan = new Array();
      data.push(iamthedoor);
      $$("#print_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/tanda_daftar_perusahaan/print_doc/' + id, iamthedoor, function (doc_path) {
          download_doc(doc_path);
        }, 'json');
      });
      $$("#print_preview_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/tanda_daftar_perusahaan/print_doc/' + id, iamthedoor, function (doc_path) {
          preview_doc(doc_path);
        }, 'json');
      });
      app.request.post(site_url_mobile_layanan + '/tanda_daftar_perusahaan/find_layanan/' + id + '/' + datauser.bf_users_id, data, function (data) {
        if (data == false) {
          app.dialog.close();
          app.dialog.alert('Data tidak ditemukan');
          mainView.router.back();
        } else {
          this_user_is_the_last_index = data.this_user_is_the_last_index;
          app.request.post(site_url_mobile + '/siurban_mobile/get_kecamatan_kelurahan/' + data.pemohon.kecamatan + '/' + data.pemohon.kode_desa, function (keckel) {
            $$("input[name='kecamatan_pemohon']").val(keckel.kecamatan);
            $$("input[name='kelurahan_pemohon']").val(keckel.kelurahan);
            $$("input[name='nik_pemohon']").val(data.pemohon.nik);
            $$("input[name='nama_pemohon']").val(data.pemohon.nama);
            $$("input[name='tempat_lahir_pemohon']").val(data.pemohon.tempat_lahir);
            $$("input[name='jenis_kelamin_pemohon']").val(data.pemohon.jenis_kelamin);
            $$("input[name='agama_pemohon']").val(data.pemohon.agama);
            $$("input[name='status_kawin_pemohon']").val(data.pemohon.status_kawin);
            $$("input[name='tanggal_lahir_pemohon']").val(data.pemohon.tanggal_lahir);
            $$("input[name='pekerjaan_pemohon']").val(data.pemohon.pekerjaan);
            $$("input[name='alamat_pemohon']").val(data.pemohon.alamat);
            $$("input[name='email_pemohon']").val(data.pemohon.email);
            $$("input[name='kwn_pemohon']").val(data.pemohon.kwn);
            var tipe_daftar = 'Baru';
            if (data.layanan.pendaftaran_tipe == 1) {
              tipe_daftar = 'Perpanjangan';
            } else if (data.layanan.pendaftaran_tipe == 2) {
              tipe_daftar = 'Perubahan';
            }
            $$("input[name='pendaftaran_tipe_text']").val(tipe_daftar);
            $$("input[name='pendaftaran_tipe']").val(data.layanan.pendaftaran_tipe);
            $$("input[name='perpanjangan_ke']").val(data.layanan.perpanjangan_ke);
            $$("input[name='kode_transaksi']").val(data.layanan.kode_transaksi);
            $$("input[name='nomor']").val(data.layanan.nomor);
            $$("input[name='nomor_iumk']").val(data.layanan.nomor_iumk);
            $$("input[name='nomor_pendaftaran']").val(data.layanan.nomor_pendaftaran);
            app.request.post(site_url_mobile + '/siurban_mobile/get_kbli/', function (kbli) {
              var html = '';
              for (var i = 0; i < kbli.length; i++) {
                if (data.layanan.kode_kbli != null && data.layanan.kode_kbli == kbli[i].kelompok) {
                  html += '<option value="' + kbli[i].kelompok + '" selected>(' + kbli[i].kelompok + ') ' + kbli[i].judul_deskripsi + '</option>';
                } else {
                  html += '<option value="' + kbli[i].kelompok + '">(' + kbli[i].kelompok + ') ' + kbli[i].judul_deskripsi + '</option>';
                }
              }
              $$("select[name='kode_kbli']").html(html);
            }, 'json');
            $$("input[name='kbli']").val(data.layanan.kbli);
            $$("input[name='masa_berlaku']").val(data.layanan.masa_berlaku);
            $$("input[name='no_iumk']").val(data.layanan.no_iumk);
            $$("input[name='nama_usaha']").val(data.layanan.nama_usaha);
            $$("input[name='npwp_usaha']").val(data.layanan.npwp_usaha);
            $$("input[name='status_usaha']").val(data.layanan.status_usaha);
            $$("input[name='alamat_usaha']").val(data.layanan.alamat_usaha);
            $$("input[name='kec_usaha']").val(data.layanan.kec_usaha);
            $$("input[name='nama_kec_usaha']").val(data.layanan.nama_kec_usaha);
            $$("input[name='kel_usaha']").val(data.layanan.kel_usaha);
            $$("input[name='nama_kel_usaha']").val(data.layanan.nama_kel_usaha);
            $$("input[name='pos_usaha']").val(data.layanan.pos_usaha);
            $$("input[name='telp_usaha']").val(data.layanan.telp_usaha);
            $$("input[name='fax_usaha']").val(data.layanan.fax_usaha);
            $$("input[name='email_usaha']").val(data.layanan.email_usaha);
            $$("input[name='modal_usaha']").val(data.layanan.modal_usaha);
            $$("input[name='omzet_usaha']").val(data.layanan.omzet_usaha);
            $$("input[name='tenaga_jumlah_usaha']").val(data.layanan.tenaga_jumlah_usaha);
            $$("input[name='sarana_usaha']").val(data.layanan.sarana_usaha);
            $$("input[name='kegiatan_usaha']").val(data.layanan.kegiatan_usaha);
            $$("input[name='pas_foto']").val(data.layanan.pas_foto);
            if (data.file != null) {
              $$("input[name='pas_foto_path']").val(data.file.file_actual);
            }
            pimpinan_perusahaan = data.pimpinan_perusahaan;
            for (var i = 0; i < pimpinan_perusahaan.length; i++) {
              pimpinan_perusahaan[i].status = 'tersimpan';
            }
            reload_pimpinan_table(pimpinan_perusahaan);
            app.request.post(site_url_mobile + '/siurban_mobile/get_kode_kecamatan/', function (kecamatan) {
              kecamatan_html = '';
              for (var i = 0; i < kecamatan.length; i++) {
                kecamatan_html += '<option value="' + kecamatan[i].kode + '">' + kecamatan[i].nama + '</option>'
              }
              get_data_kelurahan_2(data.layanan.kode_kecamatan, data.layanan.kode_kelurahan);
              $$("select[name='kode_kecamatan']").html(kecamatan_html);
              $$("select[name='kode_kecamatan']").val(data.layanan.kode_kecamatan);
              $$("select[name='kode_kecamatan']").change();
              $$("select[name='kode_kecamatan']").on("change", function () {
                kecamatan_kode = $$("select[name='kode_kecamatan']").val();
                get_data_kelurahan_2(kecamatan_kode);
              });
            }, 'json');
            $$("select[name='kode_kecamatan']").val(data.layanan.kode_kecamatan);
            $$("select[name='kode_kecamatan']").change();
            $$("select[name='kode_kelurahan']").val(data.layanan.kode_kelurahan);
            $$("select[name='kode_kelurahan']").change();
            if (data.approve !== null) {
              $$("input[name='approve_items_id']").val(data.approve.id);
              $$("input[name='type_ttd']").val(data.approve.author_type);
              document_look(data.latest_status.status_approval, data.latest_status.display_name);
              if (data.approve.ttd !== null) {
                ttdview(data.approve.ttd);
              }
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
              $$('.admin-only').hide();
              $$("#btndeletelayanan").html('<a class="button button-round button-fill color-red" id="deletelayanan" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Hapus Data</span></a>');
              if (data.file != null) {
                var preview_files = '<a id="preview_pas_foto_button" onclick="preview_foto_tdp(' + data.file.id + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                $$('.preview_pas_foto').html(preview_files);
              }
              if (tipe == 'edit') {
                prep_penyimpanan();
              } else {
                $$('#tanda_daftar_perusahaan_edit input').prop("disabled", true);
                $$('#tanda_daftar_perusahaan_edit textarea').prop("disabled", true);
                if (data.check_approved) {
                  $$('.save_button').hide();
                  $$('.checked_approval_button').show();
                } else {
                  $$('#simpan').html('<i class="icon f7-icons">arrow_left_circle_fill</i> Kembali');
                  $$("#simpan").on("click", function () {
                    mainView.router.back();
                    $('#datatables').DataTable().ajax.reload();
                  });
                }
              }
            } else {
              $$('#tanda_daftar_perusahaan_edit input').prop("readonly", true);
              $$('#tanda_daftar_perusahaan_edit textarea').prop("disabled", true);
              if (tipe == 'approve') {
                $$('#simpan').html('<i class="icon f7-icons">checkmark_seal_fill</i> Approve');
                $$('#print_preview_button').show();
                prep_penyimpanan();
              } else {
                if (data.check_approved) {
                  $$('.save_button').hide();
                  $$('.checked_approval_button').show();
                } else {
                  $$('#simpan').html('<i class="icon f7-icons">arrow_left_circle_fill</i> Kembali');
                  $$("#simpan").on("click", function () {
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
            $$('#deletelayanan').on('click', function () {
              app.dialog.alert('Proses Hapus Data');
              data = [];
              data.push(iamthedoor);
              app.request.post(site_url_mobile_layanan + '/tanda_daftar_perusahaan/delete_layanan/' + id, data, function (data) {
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
              }, function () {
                app.dialog.close();
                app.dialog.alert('Data Gagal dihapus, Coba lagi di lain waktu');
              }, 'json');
            });
            app.dialog.close();
          }, 'json');
        }
      }, function () {
        app.dialog.close();
        app.dialog.alert('Gagal');
        mainView.router.back();
      }, 'json');

      function prep_penyimpanan() {
        $$("#simpan").on("click", function () {
          data = new Array();
          if (datauser.role_id == '4') {
            if ($$('#tanda_daftar_perusahaan_edit')[0].checkValidity() == true) {
              keteranganid = [];
              filecode = [];
              $('input[name^=keteranganid]').each(function () {
                keteranganid.push($(this).val());
              });
              $('input[name^=filecode]').each(function () {
                filecode.push($(this).val());
              });
              mydata = app.form.convertToData("#tanda_daftar_perusahaan_edit");
              data.push(mydata);
              data.push(iamthedoor);
              data.push(keteranganid);
              data.push(filecode);
              data.push(pimpinan_perusahaan);
              var url = site_url_mobile_layanan + '/tanda_daftar_perusahaan/save_tanda_daftar_perusahaan/update/' + id;
              app.request.post(url, data, function (data) {
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
              }, function () {
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
              $$('#approve_button').on('click', function () {
                approve('/tanda_daftar_perusahaan/save_tanda_daftar_perusahaan/ustatus/' + id, this_user_is_the_last_index, $$('#esign').val());
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
              $$("#approve_button").on("touchend", function () {
                approve('/tanda_daftar_perusahaan/save_tanda_daftar_perusahaan/ustatus/' + id, this_user_is_the_last_index);
                approval.close();
              });
            }
          }
        });
        $$("#simpan_operator").on("click", function () {
          data = new Array();
          app.dialog.preloader('Proses Penyimpanan...');
          keteranganid = [];
          filecode = [];
          $('input[name^=keteranganid]').each(function () {
            keteranganid.push($(this).val());
          });
          $('input[name^=filecode]').each(function () {
            filecode.push($(this).val());
          });
          mydata = app.form.convertToData("#tanda_daftar_perusahaan_edit");
          data.push(mydata);
          data.push(iamthedoor);
          data.push(keteranganid);
          data.push(filecode);
          var url = site_url_mobile_layanan + '/tanda_daftar_perusahaan/save_tanda_daftar_perusahaan/update/' + id;
          app.request.post(url, data, function (data) {
            if (isNaN(data)) {
              app.dialog.close();
              if (data.status == 'fail') {
                app.dialog.alert('Proses Gagal');
              } else if (data.status == 'success') {
                app.dialog.alert('Berhasil !');
              } else {
                app.dialog.alert('Proses Gagal');
              }
              $('#datatables').DataTable().ajax.reload();
              mainView.router.back();
            } else {
              app.dialog.close();
              app.dialog.alert('Penyimpanan Berhasil');
              mainView.router.back();
              $('#datatables').DataTable().ajax.reload();
            }
          }, function () {
            app.dialog.close();
            app.dialog.alert('Penyimpanan Gagal, Coba lagi di lain waktu');
            mainView.router.back();
            $('#datatables').DataTable().ajax.reload();
          }, 'json');
        });
      }
    },
  }
};

function popup_tambah_pimpinan_perusahaan(type = 'insert') {
  var popup_pimpinan = app.popup.create({
    content: '<div class="popup page-content">' +
      '<div class="block">' +
      '<form class="list" id="tambah_pimpinan_perusahaan" data-id="null">' +
      '<div class="block-title">' +
      '<div class="row">' +
      '<div class="col-60">' +
      '<div class="chip color-blue">' +
      '<div class="chip-label">Form Pimpinan Perusahaan</div>' +
      '</div>' +
      '</div>' +
      '<div class="col-40">' +
      '<a class="button button-round popup-close button-fill color-red" id="addformupload" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Batal</span></a>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<ul>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Kedudukan dalam Perusahaan</div>' +
      '<input type="text" name="kedudukan">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Nama Lengkap</div>' +
      '<input type="text" name="nama_lengkap">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Tempat Lahir</div>' +
      '<input type="text" name="tempat_lahir">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Tanggal Lahir</div>' +
      '<input type="text" name="tanggal_lahir" id="tanggal_lahir">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Alamat Tetap</div>' +
      '<input type="text" name="alamat_tetap">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Kode Pos</div>' +
      '<input type="text" name="kode_pos">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Nomor Telepon</div>' +
      '<input type="text" name="no_telp">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Tanggal Menduduki Jabatan</div>' +
      '<input type="text" name="tanggal_menduduki" id="tanggal_menduduki">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Jumlah Saham yang Dimiliki</div>' +
      '<input type="number" name="saham">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '<li class="item-content item-input">' +
      '<div class="item-inner">' +
      '<div class="item-input-wrap">' +
      '<div class="item-title item-label">Jumlah Modal Disetor</div>' +
      '<input type="number" name="modal">' +
      '<input type="hidden" name="status" value="tersimpan">' +
      '<span class="input-clear-button"></span>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '</ul>' +
      '</form>' +
      '<a class="button button-round popup-close button-fill color-green" id="save_pimpinan" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span></a>' +
      '</div>' +
      '</div>',
    on: {
      open: function (popup) { },
    }
  });
  popup_pimpinan.open();
  var calendar_tanggal_lahir = app.calendar.create({
    inputEl: '#tanggal_lahir',
    closeOnSelect: true,
    dateFormat: 'dd-MM-yyyy',
    value: [get_current_date()],
  });
  var calendar_tanggal_menduduki = app.calendar.create({
    inputEl: '#tanggal_menduduki',
    closeOnSelect: true,
    dateFormat: 'dd-MM-yyyy',
    value: [get_current_date()],
  });
  $$("#save_pimpinan").on('click', function () {
    popup_pimpinan.close();
    if ($("#tambah_pimpinan_perusahaan").data("id") !== null) {
      pimpinan_id = $("#tambah_pimpinan_perusahaan").data("id");
      pimpinan_perusahaan[pimpinan_id] = app.form.convertToData("#tambah_pimpinan_perusahaan");
    } else {
      pimpinan_perusahaan.push(app.form.convertToData("#tambah_pimpinan_perusahaan"));
    }
    reload_pimpinan_table(pimpinan_perusahaan);
  })
}

function reload_pimpinan_table(pimpinan_perusahaan_key) {
  pimpinan_perusahaan_key = pimpinan_perusahaan_key;
  pimpinan_perusahaan_html = '<tr><td></td><td>Data Kosong</td><td></td></tr>';
  $$("#pimpinan_perusahaan_table table tbody").html(pimpinan_perusahaan_html);
  pimpinan_perusahaan_row = '';
  for (var i = 0; i < pimpinan_perusahaan_key.length; i++) {
    if (pimpinan_perusahaan_key[i].status == "tersimpan") {
      pimpinan_perusahaan_row += '<tr>' +
        '<td class="label-cell"><a data-id="' + [i] + '" class="edit_pimpinan button button-small color-blue button-fill">EDIT</a></td>' +
        '<td class="label-cell"><a data-id="' + [i] + '"  class="hapus_pimpinan button color-red button-fill button-small">HAPUS</a></td>' +
        '<td class="label-cell">' + pimpinan_perusahaan_key[i].kedudukan + '</td>' +
        '<td class="label-cell">' + pimpinan_perusahaan_key[i].nama_lengkap + '</td>' +
        '<td class="numeric-cell">' + pimpinan_perusahaan_key[i].alamat_tetap + '</td>' +
        '<td class="label-cell">' + pimpinan_perusahaan_key[i].no_telp + '</td>' +
        '<td class="label-cell">' + pimpinan_perusahaan_key[i].tanggal_menduduki + '</td>' +
        '</tr>';
    }
  }
  if (pimpinan_perusahaan_row != '') {
    $$("#pimpinan_perusahaan_table table tbody").html(pimpinan_perusahaan_row);
  }
  $$(".hapus_pimpinan").on('click', function () {
    pimpinan_id = $(this).data("id");
    app.dialog.confirm('Apakah anda yakin Menghapus data?', function () {
      pimpinan_perusahaan_key[pimpinan_id].status = 'terhapus';
      reload_pimpinan_table(pimpinan_perusahaan_key);
    });
  });
  $$(".edit_pimpinan").on('click', function () {
    pimpinan_id = $(this).data("id");
    app.dialog.confirm('Apakah anda yakin akan merubah data?', function () {
      popup_tambah_pimpinan_perusahaan();
      $$("#tambah_pimpinan_perusahaan").attr("data-id", pimpinan_id);
      if (typeof pimpinan_perusahaan_key[pimpinan_id].nama_lengkap === "undefined") {
      }
      $$("input[name='nama_lengkap']").val(pimpinan_perusahaan_key[pimpinan_id].nama_lengkap);
      $$("input[name='alamat_tetap']").val(pimpinan_perusahaan_key[pimpinan_id].alamat_tetap);
      $$("input[name='jenis_kelamin']").val(pimpinan_perusahaan_key[pimpinan_id].jenis_kelamin);
      $$("input[name='kedudukan']").val(pimpinan_perusahaan_key[pimpinan_id].kedudukan);
      $$("#tanggal_lahir").val(pimpinan_perusahaan_key[pimpinan_id].tanggal_lahir);
      $$("#tanggal_menduduki").val(pimpinan_perusahaan_key[pimpinan_id].tanggal_menduduki);
      $$("input[name='kode_pos']").val(pimpinan_perusahaan_key[pimpinan_id].kode_pos);
      $$("input[name='modal']").val(pimpinan_perusahaan_key[pimpinan_id].modal);
      $$("input[name='no_telp']").val(pimpinan_perusahaan_key[pimpinan_id].no_telp);
      $$("input[name='saham']").val(pimpinan_perusahaan_key[pimpinan_id].saham);
      $$("input[name='tanggal_lahir']").val(pimpinan_perusahaan_key[pimpinan_id].tanggal_lahir);
      $$("input[name='tempat_lahir']").val(pimpinan_perusahaan_key[pimpinan_id].tempat_lahir);
    });
  });
}