tablename = "kartu_pencari_kerja";
var kartupencarikerja_new = {
  path: '/tipe-c/kartupencarikerja_new/',
  url: './pages/tipe-c/kartupencarikerja_new.html',
  name: 'kartupencarikerja_new',
  on: {
    pageInit: function () {
      var calendar_tanggal_lahir = app.calendar.create({
        inputEl: '#tanggal_lahir',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      $$("#addformupload").on("touchend", addrow);
      $$("#simpan").on("click", function () {
        app.input.validateInputs("#kartupencarikerja_new");
        if ($$('#kartupencarikerja_new')[0].checkValidity() == true) {
          data = new Array();
          keteranganid = [];
          filecode = [];
          $('input[name^=keteranganid]').each(function () {
            keteranganid.push($(this).val());
          });
          $('input[name^=filecode]').each(function () {
            filecode.push($(this).val());
          });
          if (!$('#pas_foto').val()) {
            mainView.router.back();
            $('#datatables').DataTable().ajax.reload();
            app.dialog.alert('Gagal Simpan! Mohon mengisi Foto!');
            return false;
          }
          mydata = app.form.convertToData("#kartupencarikerja_new");
          data.push(mydata);
          data.push(iamthedoor);
          data.push(keteranganid);
          data.push(filecode);
          app.request.post(site_url_mobile_layanan + '/kartu_pencari_kerja/save_kartu_pencari_kerja', data, function (data) {
            if (isNaN(data)) {
              app.dialog.alert(data.desc);
            } else {
              app.dialog.alert('Penyimpanan Berhasil');
              mainView.router.back();
              $('#datatables').DataTable().ajax.reload();
            }
          }, function () {
            app.dialog.alert('Penyimpanan Gagal, Coba lagi di lain waktu');
          }, 'json');
        }
      })
    },
  }
};
var kartupencarikerja = {
  path: '/tipe-c/kartupencarikerja',
  url: './pages/tipe-c/kartupencarikerja.html',
  name: 'kartupencarikerja',
  on: {
    pageInit: function () {
      tablename = "kartu_pencari_kerja";
      $$("#btnnew").hide();
      if (datauser.role_id == "4") {
        $$("#btnnew").show();
      }
      var statusselect = app.smartSelect.create({
        el: '.statusselect',
        on: {
          close: function () {
            app.dialog.preloader('Loading...');
            datatables.context[0].ajax.url = site_url_mobile_layanan + '/kartu_pencari_kerja/layanan/' + $$('#statusselect').val();
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
          "url": site_url_mobile_layanan + '/kartu_pencari_kerja/layanan/1',
          "data": iamthedoor,
          "type": "GET"
        },
        "columns": [
          { "data": "id" },
          { "data": "kode_transaksi" },
          { "data": "nomor" },
          { "data": "nik" },
          { "data": "nama_pendaftar" },
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
              $('td:eq(0)', row).html('<a href="/tipe-c/kartupencarikerja_edit/' + data.id + '/edit/" class="button button-small button-fill color-blue">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');
            } else {
              $('td:eq(0)', row).html('<a href="/tipe-c/kartupencarikerja_edit/' + data.id + '/approve" class="button button-small button-fill color-green">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Approve</a>');
            }
          } else {
            $('td:eq(0)', row).html('<a href="/tipe-c/kartupencarikerja_edit/' + data.id + '/lihat/" class="button button-small button-fill color-green">' +
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
var kartupencarikerja_edit = {
  path: '/tipe-c/kartupencarikerja_edit/:id/:tipe',
  url: './pages/tipe-c/kartupencarikerja_edit.html',
  name: 'kartupencarikerja_edit',
  on: {
    pageInit: function () {
      tablename = "kartu_pencari_kerja";
      app.dialog.preloader('Loading...');
      var calendar_tanggal_lahir = app.calendar.create({
        inputEl: '#tanggal_lahir',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var this_user_is_the_last_index = false;
      var id = mainView.router.currentRoute.params.id;
      var tipe = mainView.router.currentRoute.params.tipe;
      var data = new Array();
      data.push(iamthedoor);
      $$(".checked_approval_button").hide();
      if (tipe == 'edit') {
        $$('#approval').hide();
        $$("#addformupload").show();
        $$("#addformupload").on("touchend", addrow);
      }
      $$("#print_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/kartu_pencari_kerja/print_doc/' + id, iamthedoor, function (doc_path) {
          download_doc(doc_path);
        }, 'json');
      });
      $$("#print_preview_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/kartu_pencari_kerja/print_doc/' + id, iamthedoor, function (doc_path) {
          preview_doc(doc_path);
        }, 'json');
      });
      app.request.post(site_url_mobile_layanan + '/kartu_pencari_kerja/find_layanan/' + id + '/' + datauser.bf_users_id, data, function (data) {
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
            $$("input[name='alamat_pemohon']").val(data.pemohon.alamat);
            $$("input[name='email_pemohon']").val(data.pemohon.email);
            $$("input[name='pas_foto']").val(data.layanan.file_code);
            if (data.file != null) {
              $$("input[name='pas_foto_path']").val(data.file.file_actual);
            }
            if (data.approve !== null) {
              $$("input[name='approve_items_id']").val(data.approve.id);
              $$("input[name='type_ttd']").val(data.approve.author_type);
              document_look(data.latest_status.status_approval, data.latest_status.display_name);
              if (data.approve.ttd !== null) {
                ttdview(data.approve.ttd);
              }
            }
            $$("input[name='sekolah_sd']").val(data.layanan.sekolah_sd);
            $$("input[name='jurusan_sd']").val(data.layanan.jurusan_sd);
            $$("input[name='lulus_sd']").val(data.layanan.lulus_sd);
            $$("input[name='ipk_sd']").val(data.layanan.ipk_sd);
            $$("input[name='sekolah_smp']").val(data.layanan.sekolah_smp);
            $$("input[name='jurusan_smp']").val(data.layanan.jurusan_smp);
            $$("input[name='lulus_smp']").val(data.layanan.lulus_smp);
            $$("input[name='ipk_smp']").val(data.layanan.ipk_smp);
            $$("input[name='sekolah_slta']").val(data.layanan.sekolah_slta);
            $$("input[name='jurusan_slta']").val(data.layanan.jurusan_slta);
            $$("input[name='lulus_slta']").val(data.layanan.lulus_slta);
            $$("input[name='ipk_slta']").val(data.layanan.ipk_slta);
            $$("input[name='sekolah_d1']").val(data.layanan.sekolah_d1);
            $$("input[name='jurusan_d1']").val(data.layanan.jurusan_d1);
            $$("input[name='lulus_d1']").val(data.layanan.lulus_d1);
            $$("input[name='ipk_d1']").val(data.layanan.ipk_d1);
            $$("input[name='sekolah_d2']").val(data.layanan.sekolah_d2);
            $$("input[name='jurusan_d2']").val(data.layanan.jurusan_d2);
            $$("input[name='lulus_d2']").val(data.layanan.lulus_d2);
            $$("input[name='ipk_d2']").val(data.layanan.ipk_d2);
            $$("input[name='sekolah_d3']").val(data.layanan.sekolah_d3);
            $$("input[name='jurusan_d3']").val(data.layanan.jurusan_d3);
            $$("input[name='lulus_d3']").val(data.layanan.lulus_d3);
            $$("input[name='ipk_d3']").val(data.layanan.ipk_d3);
            $$("input[name='sekolah_akta2']").val(data.layanan.sekolah_akta2);
            $$("input[name='jurusan_akta2']").val(data.layanan.jurusan_akta2);
            $$("input[name='lulus_akta2']").val(data.layanan.lulus_akta2);
            $$("input[name='ipk_akta2']").val(data.layanan.ipk_akta2);
            $$("input[name='sekolah_akta3']").val(data.layanan.sekolah_akta3);
            $$("input[name='jurusan_akta3']").val(data.layanan.jurusan_akta3);
            $$("input[name='lulus_akta3']").val(data.layanan.lulus_akta3);
            $$("input[name='ipk_akta3']").val(data.layanan.ipk_akta3);
            $$("input[name='sekolah_s1']").val(data.layanan.sekolah_s1);
            $$("input[name='jurusan_s1']").val(data.layanan.jurusan_s1);
            $$("input[name='lulus_s1']").val(data.layanan.lulus_s1);
            $$("input[name='ipk_s1']").val(data.layanan.ipk_s1);
            $$("input[name='sekolah_s2']").val(data.layanan.sekolah_s2);
            $$("input[name='jurusan_s2']").val(data.layanan.jurusan_s2);
            $$("input[name='lulus_s2']").val(data.layanan.lulus_s2);
            $$("input[name='ipk_s2']").val(data.layanan.ipk_s2);
            $$("input[name='sekolah_doktor']").val(data.layanan.sekolah_doktor);
            $$("input[name='jurusan_doktor']").val(data.layanan.jurusan_doktor);
            $$("input[name='lulus_doktor']").val(data.layanan.lulus_doktor);
            $$("input[name='ipk_doktor']").val(data.layanan.ipk_doktor);
            $$("input[name='berat_badan']").val(data.layanan.berat_badan);
            $$("input[name='kode_pos_pemohon']").val(data.layanan.kode_pos);
            $$("input[name='telepon_pemohon']").val(data.layanan.no_hp);
            $$("input[name='jabatan_pyd']").val(data.layanan.jabatan_pyd);
            $$("input[name='bahasa_asing']").val(data.layanan.bahasa_asing);
            $$("input[name='data_kursus']").val(data.layanan.data_kursus);
            $$("input[name='pengalaman']").val(data.layanan.pengalaman);
            $$("select[name='lokasi_pyd']").val(data.layanan.lokasi_pyd).change();
            $$("select[name='jarak_pyd']").val(data.layanan.jarak_pyd).change();
            $$("select[name='upah_pyd']").val(data.layanan.besar_upah_pyd).change();
            $$("textarea[name='bahasa_asing']").val(data.layanan.bahasa_asing);
            $$("textarea[name='data_kursus']").val(data.layanan.data_kursus);
            $$("textarea[name='pengalaman']").val(data.layanan.pengalaman);
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
              if (data.file != null) {
                var preview_files = '<a id="preview_pas_foto_button" onclick="preview_foto_kpk(' + data.file.id + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
                $$('.preview_pas_foto').html(preview_files);
              }
              if (tipe == 'edit') {
                prep_penyimpanan();
              } else {
                $$('#kartupencarikerja_edit input').prop("disabled", true);
                $$('#kartupencarikerja_edit textarea').prop("disabled", true);
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
            } else {
              $$('#kartupencarikerja_edit input').prop("disabled", true);
              $$('#kartupencarikerja_edit textarea').prop("disabled", true);
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
              app.request.post(site_url_mobile_layanan + '/kartu_pencari_kerja/delete_layanan/' + id, data, function (data) {
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
            if ($$('#kartupencarikerja_edit')[0].checkValidity() == true) {
              keteranganid = [];
              filecode = [];
              $('input[name^=keteranganid]').each(function () {
                keteranganid.push($(this).val());
              });
              $('input[name^=filecode]').each(function () {
                filecode.push($(this).val());
              });
              mydata = app.form.convertToData("#kartupencarikerja_edit");
              data.push(mydata);
              data.push(iamthedoor);
              data.push(keteranganid);
              data.push(filecode);
              var url = site_url_mobile_layanan + '/kartu_pencari_kerja/save_kartu_pencari_kerja/update/' + id;
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
                approve('/kartu_pencari_kerja/save_kartu_pencari_kerja/ustatus/' + id, this_user_is_the_last_index, $$('#esign').val());
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
                approve('/kartu_pencari_kerja/save_kartu_pencari_kerja/ustatus/' + id, this_user_is_the_last_index);
                approval.close();
              });
            }
          }
        })
      }
    },
  }
};