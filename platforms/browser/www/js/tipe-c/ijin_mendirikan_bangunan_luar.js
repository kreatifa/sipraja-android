tablename = "imb_luar";
var ijin_mendirikan_bangunan_luar = {
  path: '/tipe-c/ijin_mendirikan_bangunan_luar',
  url: './pages/tipe-c/ijin_mendirikan_bangunan_luar.html',
  name: 'ijin_mendirikan_bangunan_luar',
  on: {
    pageInit: function () {
      $$("#btnnew").hide();
      if (datauser.role_id == "4") {
        $$("#btnnew").show();
      }
      var statusselect = app.smartSelect.create({
        el: '.statusselect',
        on: {
          close: function () {
            app.dialog.preloader('Loading...');
            datatables.context[0].ajax.url = site_url_mobile_layanan + '/ijin_mendirikan_bangunan_luar/layanan/' + $$('#statusselect').val();
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
          "url": site_url_mobile_layanan + '/ijin_mendirikan_bangunan_luar/layanan/1',
          "data": iamthedoor,
          "type": "GET"
        },
        "columns": [
          { "data": "id" },
          { "data": "kode_transaksi" },
          { "data": "nomor" },
          { "data": "nik" },
          { "data": "nama_pemohon" },
          { "data": "tanggal_pengajuan" },
          { "data": "alamat_bangunan" },
          { "data": "display_name" },
          { "data": "val_status", "width": "20%" },
        ],
        "initComplete": function (settings, json) {
          app.dialog.close();
          $$('#datatables_length').hide();
          $$('#datatables_filter').hide();
          $$('#datatables_paginate').hide();
        },
        "rowCallback": function (row, data) {
          $('td:eq(8)', row).html('<span style="background-color:transparent; padding:5px; border-radius:10px; ">Bisa<br>Diambil</span>');
          if (data.val_status) {
            var color = 'transparent';
            if (data.val_status == 'Ditolak') var color = 'transparent';
            if (data.val_status == 'Menunggu') var color = 'transparent';
            if (data.val_status == 'Belum Dikirim') var color = 'transparent';
            $('td:eq(8)', row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px;">' + data.val_status + '</span>');
          }
          if (data.val_status == 'Menunggu') {
            if (datauser.role_id == '4') {
              $('td:eq(0)', row).html('<a href="/tipe-c/ijin_mendirikan_bangunan_luar_edit/' + data.id + '/edit/" class="button button-small button-fill color-blue">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');
            } else {
              $('td:eq(0)', row).html('<a href="/tipe-c/ijin_mendirikan_bangunan_luar_edit/' + data.id + '/approve/" class="button button-small button-fill color-green">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Approve</a>');
            }
          } else {
            $('td:eq(0)', row).html('<a href="/tipe-c/ijin_mendirikan_bangunan_luar_edit/' + data.id + '/lihat/" class="button button-small button-fill color-green">' +
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
var ijin_mendirikan_bangunan_luar_edit = {
  path: '/tipe-c/ijin_mendirikan_bangunan_luar_edit/:id/:tipe',
  url: './pages/tipe-c/ijin_mendirikan_bangunan_luar_edit.html',
  name: 'ijin_mendirikan_bangunan_luar_edit',
  on: {
    pageInit: function () {
      tablename = "imb_luar";
      $$("#addformupload").hide();
      var calendar = app.calendar.create({
        inputEl: '#tanggal_pengajuan',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
        on: {
          calendarClosed: function () {
            cektanggal();
          }
        }
      });
      var this_user_is_the_last_index = false;
      var id = mainView.router.currentRoute.params.id;
      var tipe = mainView.router.currentRoute.params.tipe;
      $$(".checked_approval_button").hide();
      $$(".checked_approval_user_button").hide();
      if (tipe == 'edit') {
        $$('#approval').hide();
        $$("#addformupload").show();
        $$("#addformupload").on("touchend", addrow);
      }
      $$("#print_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/ijin_mendirikan_bangunan_luar/print_doc/' + id, iamthedoor, function (doc_path) {
          download_doc(doc_path);
        }, 'json');
      });
      $$("#print_form_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/ijin_mendirikan_bangunan_luar/print_form/' + id, iamthedoor, function (doc_path) {
          download_doc(doc_path);
        }, 'json');
      });
      $$("#print_skrd_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/ijin_mendirikan_bangunan_luar/print_skrd/' + id, iamthedoor, function (doc_path) {
          download_doc(doc_path);
        }, 'json');
      });
      $$("#print_preview_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/ijin_mendirikan_bangunan_luar/print_invoice/' + id, iamthedoor, function (doc_path) {
          preview_doc(doc_path);
        }, 'json');
      });
      $$("#print_invoice_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/ijin_mendirikan_bangunan_luar/print_invoice/' + id, iamthedoor, function (doc_path) {
          download_doc(doc_path);
        }, 'json');
      });
      data = [];
      data.push(iamthedoor);
      app.dialog.preloader('Loading...');
      $$("#operator_area").hide();
      if (datauser.role_id != "4") {
        $$("#operator_area").show();
        var calendar = app.calendar.create({
          inputEl: '#tanggal_penetapan',
          closeOnSelect: true,
          dateFormat: 'dd-MM-yyyy',
          on: {
            calendarClosed: function () {
              cektanggal();
            }
          }
        });
      }
      var tanggal_bayar = app.calendar.create({
        inputEl: '#tanggal_bayar',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy'
      });
      app.request.post(site_url_mobile_layanan + '/ijin_mendirikan_bangunan_luar/find_layanan/' + id + '/' + datauser.bf_users_id, data, function (data) {
        if (data == false) {
          app.dialog.close();
          app.dialog.alert('Data tidak ditemukan');
          mainView.router.back();
        } else {
          this_user_is_the_last_index = data.this_user_is_the_last_index;
          app.request.post(site_url_mobile + '/siurban_mobile/get_kecamatan_kelurahan/' + data.layanan.kode_kecamatan_bangunan + '/' + data.layanan.kode_kelurahan_bangunan, function (keckel) {
            $$("input[name='kecamatan_pemohon']").val(data.layanan.kec_pemohon);
            $$("input[name='kelurahan_pemohon']").val(data.layanan.kel_pemohon);
            $$("input[name='kode_transaksi']").val(data.layanan.kode_transaksi);
            $$("input[name='nomor']").val(data.layanan.nomor);
            $$("input[name='imb_sertifikat']").val(data.layanan.imb_sertifikat);
            $$("input[name='tanggal_penetapan']").val(data.layanan.tanggal_penetapan);
            $$("input[name='nama_pemohon']").val(data.layanan.nama_pemohon);
            $$("input[name='alamat_pemohon']").val(data.layanan.alamat_pemohon);
            $$("input[name='telp_pemohon']").val(data.layanan.telp_pemohon);
            $$("input[name='email_pemohon']").val(data.layanan.email_pemohon);
            $$("input[name='kab_pemohon']").val(data.layanan.kab_pemohon);
            $$("input[name='nik_pemohon']").val(data.layanan.nik);
            if (data.approve !== null) {
              $$("input[name='approve_items_id']").val(data.approve.id);
              $$("input[name='type_ttd']").val(data.approve.author_type);
              document_look(data.latest_status.status_approval, data.latest_status.display_name);
              if (data.approve.ttd !== null) {
                ttdview(data.approve.ttd);
              }
            }
            $$("input[name='tanggal_pengajuan']").val(data.layanan.tanggal_pengajuan);
            $$("textarea[name='keterangan_pemohon']").val(data.layanan.keterangan_pemohon);
            $$("input[name='alamat_bangunan']").val(data.layanan.alamat_bangunan);
            app.request.post(site_url_mobile + '/siurban_mobile/get_kode_kecamatan/', function (kecamatan) {
              var kecamatan_html = ''; var kelurahan_temp = data.layanan.kode_kelurahan_bangunan;
              for (var i = 0; i < kecamatan.length; i++) {
                kecamatan_html += '<option value="' + kecamatan[i].kode + '">' + kecamatan[i].nama + '</option>';
              }
              $$("select[name='kode_kecamatan_bangunan']").html(kecamatan_html);
              $$("select[name='kode_kecamatan_bangunan']").on('change', function () {
                get_data_kelurahan_3($$("select[name='kode_kecamatan_bangunan']").val(), kelurahan_temp);
                kelurahan_temp = null;
              });
              $$("select[name='kode_kecamatan_bangunan']").val(data.layanan.kode_kecamatan_bangunan).change();
            }, 'json');
            $$("select[name='kegiatan']").val(data.layanan.kegiatan).change();
            $$("select[name='fungsi_gedung']").val(data.layanan.fungsi_gedung).change();
            $$("select[name='kompleksitas']").val(data.layanan.kompleksitas).change();
            $$("select[name='tingkat_permanensi']").val(data.layanan.tingkat_permanensi).change();
            $$("select[name='tingkat_resiko_kebakaran']").val(data.layanan.tingkat_resiko_kebakaran).change();
            $$("select[name='tingkat_zonasi']").val(data.layanan.tingkat_zonasi).change();
            $$("select[name='kepadatan_bangunan']").val(data.layanan.kepadatan_bangunan).change();
            $$("select[name='ketinggian_bangunan']").val(data.layanan.ketinggian_bangunan).change();
            $$("select[name='kepemilikan_bangunan']").val(data.layanan.kepemilikan_bangunan).change();
            $$("select[name='waktu_penggunaan']").val(data.layanan.waktu_penggunaan).change();
            $$("select[name='kegiatan_non_gedung']").val(data.layanan.kegiatan_non_gedung).change();
            $$("select[name='penunjang']").val(data.layanan.penunjang).change();
            $$("input[name='uk_pagar_tembok']").val(data.layanan.uk_pagar_tembok);
            $$("input[name='uk_rumah_tinggal']").val(data.layanan.uk_rumah_tinggal);
            $$("input[name='uk_pagar_besi']").val(data.layanan.uk_pagar_besi);
            $$("input[name='uk_saluran_air']").val(data.layanan.uk_saluran_air);
            $$("input[name='uk_jalan_rabat']").val(data.layanan.uk_jalan_rabat);
            $$("input[name='uk_urugan_tanah']").val(data.layanan.uk_urugan_tanah);
            $$("input[name='uk_menara']").val(data.layanan.uk_menara);
            $$("input[name='uk_reklame']").val(data.layanan.uk_reklame);
            $$("input[name='uk_kolam']").val(data.layanan.uk_kolam);
            $$("input[name='uk_tangki']").val(data.layanan.uk_tangki);
            $$("input[name='uk_pemancangan']").val(data.layanan.uk_pemancangan);
            $$("input[name='uk_pondasi_strous']").val(data.layanan.uk_pondasi_strous);
            $$("input[name='uk_sumur']").val(data.layanan.uk_sumur);
            $$("input[name='uk_luas']").val(data.layanan.uk_luas);
            $$("textarea[name='keterangan_lain']").val(data.layanan.keterangan_lain);
            $$("#npwrd").val(data.layanan.npwrd);
            $$("#nomor_skrd").val(data.layanan.nomor_skrd);
            $$("#kode_skrd").val(data.layanan.kode_skrd);
            $$("#tanggal_bayar").val(data.layanan.tanggal_bayar);
            $$("#pas_foto").val(data.layanan.file_skrd);
            if (data.file) {
              $$("#pas_foto_path").val(data.file.file_actual);
              var preview_files = '<a id="preview_pas_foto_button" onclick="preview_bukti_bayar(' + data.file.id + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
              $$('.preview_pas_foto').html(preview_files);
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
            if ((tipe == 'edit' || tipe == 'lihat') && datauser.role_id == '4') {
              $$("#btndeletelayanan").html('<a class="button button-round button-fill color-red" id="deletelayanan" style="margin-top: 10px;">' +
                '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Hapus Data</span></a>');
              if (data.sum_approval.total < 3) {
                $$('.admin-only').hide();
                $$('.form_skrd').remove();
                prep_penyimpanan();
              } else if (data.sum_approval.total == 3) {
                $$('.admin-only').hide();
                $$('#print_preview_button').show();
                $$('#kode_kecamatan_bangunan').prop('disabled', true);
                prep_penyimpanan();
              } else {
                $$('.form_skrd').show();
                $$('#ijin_mendirikan_bangunan_luar_edit input').prop("disabled", true);
                $$('#ijin_mendirikan_bangunan_luar_edit textarea').prop("disabled", true);
                if (data.check_approved) {
                  $$('.savebutton').hide();
                  $$('.checked_approval_user_button').show();
                } else {
                  $$('#print_preview_button').show();
                  $$('#simpan').html('<i class="icon f7-icons">arrow_left_circle_fill</i> Kembali');
                  $$("#simpan").on("click", function () {
                    mainView.router.back();
                    $('#datatables').DataTable().ajax.reload();
                  });
                }
              }
            } else {
              $$('#ijin_mendirikan_bangunan_luar_edit input').prop("disabled", true);
              $$('#ijin_mendirikan_bangunan_luar_edit textarea').prop("disabled", true);
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
              app.request.post(site_url_mobile_layanan + '/ijin_mendirikan_bangunan_luar/delete_layanan/' + id, data, function (data) {
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
          }, function () {}, 'json');
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
            app.dialog.preloader('Proses Penyimpanan...');
            keteranganid = [];
            filecode = [];
            $('input[name^=keteranganid]').each(function () {
              keteranganid.push($(this).val());
            });
            $('input[name^=filecode]').each(function () {
              filecode.push($(this).val());
            });
            mydata = app.form.convertToData("#edit_ijin_mendirikan_bangunan_luar");
            data.push(mydata);
            data.push(iamthedoor);
            data.push(keteranganid);
            data.push(filecode);
            var url = site_url_mobile_layanan + '/ijin_mendirikan_bangunan_luar/save_ijin_mendirikan_bangunan_luar/update/' + id;
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
                approve('/ijin_mendirikan_bangunan_luar/save_ijin_mendirikan_bangunan_luar/ustatus/' + id, this_user_is_the_last_index, $$('#esign').val());
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
                approve('/ijin_mendirikan_bangunan_luar/save_ijin_mendirikan_bangunan_luar/ustatus/' + id, this_user_is_the_last_index);
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
          mydata = app.form.convertToData("#edit_ijin_mendirikan_bangunan_luar");
          data.push(mydata);
          data.push(iamthedoor);
          data.push(keteranganid);
          data.push(filecode);
          var url = site_url_mobile_layanan + '/ijin_mendirikan_bangunan_luar/save_ijin_mendirikan_bangunan_luar/update/' + id;
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

function cektanggal() {
  mulai_berlaku = $$("#mulai_berlaku").val();
  berakhir_tanggal = $$("#berakhir_tanggal").val();
  if (mulai_berlaku != '' && berakhir_tanggal != '') {
    if (mulai_berlaku > berakhir_tanggal) {
      app.dialog.alert('Tanggal berakhir harus lebih dari tanggal mulai berlaku');
    }
  }
}