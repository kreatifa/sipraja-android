tablename = 'sk_domisili_luar';
var sk_domisili_luar = {
  path: '/tipe-a/sk_domisili_luar',
  url: './pages/tipe-a/sk_domisili_luar.html',
  name: 'sk_domisili_luar',
  on: {
    pageInit: function () {
      var statusselect = app.smartSelect.create({
        el: '.statusselect',
        on: {
          close: function () {
            datatables.context[0].ajax.url = site_url_mobile_layanan + '/sk_domisili_luar/layanan/' + $$('#statusselect').val();
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
      var datatables = $('#datatables').DataTable({
        "serverSide": true,
        "ajax": {
          "url": site_url_mobile_layanan + '/sk_domisili_luar/layanan/1',
          "data": iamthedoor,
          "type": "GET"
        },
        "columns": [
          { "data": "id" },
          { "data": "kode_transaksi" },
          { "data": "nomor" },
          { "data": "tgl_buat" },
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
          $('td:eq(5)', row).html('<span style="background-color:transparent; padding:5px; border-radius:10px; ">Bisa<br>Diambil</span>');
          if (data.val_status) {
            var color = 'transparent';
            if (data.val_status == 'Ditolak') var color = 'transparent';
            if (data.val_status == 'Menunggu') var color = 'transparent';
            if (data.val_status == 'Belum Dikirim') var color = 'transparent';
            $('td:eq(5)', row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px;">' + data.val_status + '</span>');
          }
          if (data.val_status == 'Menunggu') {
            if (datauser.role_id == '4') {
              $('td:eq(0)', row).html('<a href="/tipe-a/edit_sk_domisili_luar/' + data.id + '/edit/" class="button button-small button-fill color-blue">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');
            } else {
              $('td:eq(0)', row).html('<a href="/tipe-a/edit_sk_domisili_luar/' + data.id + '/approve/" class="button button-small button-fill color-green">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Approve</a>');
            }
          } else {
            $('td:eq(0)', row).html('<a href="/tipe-a/edit_sk_domisili_luar/' + data.id + '/lihat/" class="button button-small button-fill color-green">' +
              '<i class="icon f7-icons" style="font-size: 12pt;">zoom_in</i> Lihat</a>');
          }
          if (!data.nomor) {
            $('td:eq(2)', row).html('---');
          }
          if (!data.display_name) {
            $('td:eq(4)', row).html('---');
          }
        }
      });
    }
  }
};
var edit_sk_domisili_luar = {
  path: '/tipe-a/edit_sk_domisili_luar/:id/:tipe',
  url: './pages/tipe-a/edit_sk_domisili_luar.html',
  name: 'edit_sk_domisili_luar',
  on: {
    pageInit: function () {
      tablename = "sk_domisili_luar";
      $$("#addformupload").hide();
      var this_user_is_the_last_index = false;
      var id = mainView.router.currentRoute.params.id;
      var tipe = mainView.router.currentRoute.params.tipe;
      if (tipe == 'edit') {
        $$('#approval').hide();
        $$("#addformupload").show();
        $$("#addformupload").on("touchend", addrow);
      }
      $$("#print_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/sk_domisili_luar/print_doc/' + id, iamthedoor, function (doc_path) {
          download_doc(doc_path);
        }, 'json');
      });
      $$("#print_preview_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/sk_domisili_luar/print_doc/' + id, iamthedoor, function (doc_path) {
          preview_doc(doc_path);
        }, 'json');
      });
      loaded = false;
      data = [];
      data.push(iamthedoor);
      app.dialog.preloader('Loading...');
      $$(".checked_approval_button").hide();
      app.request.post(site_url_mobile_layanan + '/sk_domisili_luar/find_layanan/' + id + '/' + datauser.bf_users_id, data, function (data) {
        if (data == false) {
          app.dialog.close();
          app.dialog.alert('Data tidak ditemukan');
          mainView.router.back();
        } else {
          this_user_is_the_last_index = data.this_user_is_the_last_index;
          $$("input[name='nik']").val(data.layanan.nik);
          $$("input[name='nama']").val(data.layanan.nama);
          $$("input[name='tempat_lahir']").val(data.layanan.tempat_lahir);
          $$("input[name='tanggal_lahir']").val(data.layanan.tanggal_lahir);
          $$("input[name='jenis_kelamin']").val(data.layanan.jenis_kelamin);
          $$("input[name='status_kawin']").val(data.layanan.status_kawin);
          $$("input[name='agama']").val(data.layanan.agama);
          $$("input[name='pekerjaan']").val(data.layanan.pekerjaan);
          $$("input[name='alamat']").val(data.layanan.alamat);
          app.request.post(site_url_mobile + '/siurban_mobile/get_kode_kecamatan/', function (kecamatan) {
            kecamatan_html = '';
            for (var i = 0; i < kecamatan.length; i++) {
              kecamatan_html += '<option value="' + kecamatan[i].kode + '">' + kecamatan[i].nama + '</option>'
            }
            get_data_kelurahan(data.layanan.kecamatan, data.layanan.kelurahan);
            $$("select[name='kecamatan']").html(kecamatan_html);
            $$("select[name='kecamatan']").val(data.layanan.kecamatan).change();
            $$("select[name='kecamatan']").on("change", function () {
              kecamatan_kode = $$("select[name='kecamatan']").val();
              get_data_kelurahan(kecamatan_kode);
            });
          }, 'json');
          $$("select[name='kecamatan']").val(data.layanan.kecamatan).change();
          $$("select[name='kelurahan']").val(data.layanan.kelurahan).change();
          $$("textarea[name='alamat_usaha']").val(data.layanan.alamat_usaha);
          if (data.layanan.nama_usaha) {
            $$("input[name='nama_usaha']").val(data.layanan.nama_usaha);
          } else {
            $$("select[name='jenis_surat']").val('tinggal').change();
            $(".nama_usaha").hide();
            $(".nama_usaha input").prop('required', false);
          }
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
            $("#jenis_surat").on('change', function () {
              if ($(this).val() == 'tinggal') {
                $(".nama_usaha").hide();
                $(".nama_usaha input").prop('required', false);
              } else {
                $(".nama_usaha").show();
                $(".nama_usaha input").prop('required', true);
              }
            });
            $$("#btndeletelayanan").html('<a class="button button-round button-fill color-red" id="deletelayanan" style="margin-top: 10px;">' +
              '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Hapus Data</span></a>');
            if (tipe == 'edit') {
              prep_penyimpanan();
            } else {
              $$('#edit_sk_domisili_luar input').prop("disabled", true);
              $$('#edit_sk_domisili_luar textarea').prop("disabled", true);
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
            $$('#edit_sk_domisili_luar input').prop("disabled", true);
            $$('#edit_sk_domisili_luar textarea').prop("disabled", true);
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
            app.dialog.confirm('Apakah anda yakin menghapus data ini?', function () {
              data = [];
              data.push(iamthedoor);
              app.request.post(site_url_mobile_layanan + '/sk_domisili_luar/delete_layanan/' + id, data, function (data) {
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
          });
          app.dialog.close();
        }
      }, function () {
        app.dialog.close();
        app.dialog.alert('Gagal');
        mainView.router.back();
      }, 'json');

      function prep_penyimpanan() {
        $$("#simpan").on("click", function () {
          app.input.validateInputs("#edit_sk_domisili_luar");
          if ($$('#edit_sk_domisili_luar')[0].checkValidity() == true) {
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
              mydata = app.form.convertToData("#edit_sk_domisili_luar");
              data.push(mydata);
              data.push(iamthedoor);
              data.push(keteranganid);
              data.push(filecode);
              var url = site_url_mobile_layanan + '/sk_domisili_luar/save_sk_domisili_luar/update/' + id;
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
                  approve('/sk_domisili_luar/save_sk_domisili_luar/ustatus/' + id, this_user_is_the_last_index, $$('#esign').val());
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
                  approve('/sk_domisili_luar/save_sk_domisili_luar/ustatus/' + id, this_user_is_the_last_index);
                  approval.close();
                });
              }
            }
          }
        })
      }
    },
  }
};