tablename = 'sk_tidak_mampu';
var sktm_dinsos = {
  path: '/tipe-b/sktm_dinsos',
  url: './pages/tipe-b/sktm_dinsos.html',
  name: 'sktm_dinsos',
  on: {
    pageInit: function () {
      var statusselect = app.smartSelect.create({
        el: '.statusselect',
        on: {
          close: function () {
            datatables.context[0].ajax.url = site_url_mobile_layanan + '/sktm_dinsos/layanan/' + $$('#statusselect').val();
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
          "url": site_url_mobile_layanan + '/sktm_dinsos/layanan/1',
          "data": iamthedoor,
          "type": "GET"
        },
        "columns": [
          { "data": "id" },
          { "data": "kode_transaksi" },
          { "data": "nomor" },
          { "data": "nama_pemohon" },
          { "data": "tujuan" },
          { "data": "kecamatan" },
          { "data": "tgl_proses" },
          { "data": "tgl_verif" },
          { "data": "verified" },
        ],
        "initComplete": function (settings, json) {
          app.dialog.close();
          $$('#datatables_length').hide();
          $$('#datatables_filter').hide();
          // $$('#datatables_paginate').hide();
        },
        "rowCallback": function (row, data) {
          let color, status;
          if (data.verified == 2) {
            color = '#17A05E';
            status = 'Terverifikasi';
          } else if(data.verified == 9) {
            color = '#DE4E42';
            status = 'Tertolak';
          } else {
            color = '#FF9800';
            status = 'Menunggu';
          }
          $('td:eq(7)', row).html('<span style="background-color:'+color+'; padding:5px; border-radius:10px; color:white;">'+status+'</span>');
          $('td:eq(0)', row).html('<a href="/tipe-b/edit_sktm_dinsos/' + data.id + '/approve/" class="button button-small button-fill color-green">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Approve</a>');
        }
      });
    }
  }
};
var edit_sktm_dinsos = {
  path: '/tipe-b/edit_sktm_dinsos/:id/:tipe',
  url: './pages/tipe-b/edit_sktm_dinsos.html',
  name: 'edit_sktm_dinsos',
  on: {
    pageInit: function () {
      tablename = "sk_tidak_mampu";
      $$("#addformupload").hide();
      var id = mainView.router.currentRoute.params.id;
      $$("#print_preview_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/sktm_kecamatan/print_doc/' + id, iamthedoor, function (doc_path) {
          preview_doc(doc_path);
        }, 'json');
      });
      $$("#print_sipraja_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/sktm_kecamatan/print_doc/' + id, iamthedoor, function (doc_path) {
          download_doc(doc_path);
        }, 'json');
      });
      $$("#print_dinsos_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/sktm_dinsos/print_doc/' + id, iamthedoor, function (doc_path) {
          download_doc(doc_path);
        }, 'json');
      });
      data = [];
      data.push(iamthedoor);
      app.dialog.preloader('Loading...');
      $$(".checked_approval_button").hide();
      app.request.post(site_url_mobile_layanan + '/sktm_dinsos/find_layanan/' + id + '/' + datauser.bf_users_id, data, function (data) {
        if (data == false) {
          app.dialog.close();
          app.dialog.alert('Data tidak ditemukan');
          mainView.router.back();
        } else {
          app.request.post(site_url_mobile + '/siurban_mobile/get_kecamatan_kelurahan/' + data.pemohon.kecamatan + '/' + data.pemohon.kode_desa, function (keckel) {
            $$("input[name='kecamatan_pemohon']").val(keckel.kecamatan);
            $$("input[name='kelurahan_pemohon']").val(keckel.kelurahan);
            $$("input[name='nama_pemohon']").val(data.pemohon.nama);
            $$("input[name='alamat_pemohon']").val(data.pemohon.alamat);
            $$("input[name='approve_items_id']").val(data.layanan.approve_items_id);
            if (data.layanan.nama_ortu) {
              $$("select[name='jenis_surat']").val('sekolah').change();
              $$("input[name='tujuan']").val(data.layanan.tujuan);
              $$("input[name='nama_ortu']").val(data.layanan.nama_ortu);
              $$("input[name='pekerjaan']").val(data.layanan.pekerjaan);
              $$("input[name='alamat']").val(data.layanan.alamat_pemohon);
            } else {
              $(".sekolahgroup").hide();
              $(".sekolahgroup :input").each(function () {
                $(this).prop('required', false);
              });
            }
            $$("select[name='jenis_surat']").val(data.layanan.jenis_surat).change();
            $$('#tgl_proses').val(data.layanan.tgl_proses);
            $$('#jenis_produk_dinsos').val(data.layanan.jenis_produk_dinsos).change();
            $$('#nomor_dinsos').val(data.layanan.nomor_dinsos);
            $$('#tujuan_dinsos').html(data.layanan.tujuan_dinsos.replace(/<p>/g, '').replace(/<\/p>/g, ''));
            $$('#uraian_dinsos').html(data.layanan.uraian_dinsos);
            $$('#keterangan').html(data.layanan.desc_dinsos);
            $$('#edit_sktm_dinsos input').prop("disabled", true);
            $$('#edit_sktm_dinsos textarea').prop("disabled", true);
            $$('#simpan').html('<i class="icon f7-icons">checkmark_seal_fill</i> Approve');
            if (data.layanan.verified == 2) {
              $$('.savebutton').hide();
              $$('.checked_approval_button').show();
            }
            prep_penyimpanan();
            if (data.layanan.file_code !== null) {
              find_document(id, true);
            }
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
          app.input.validateInputs("#edit_sktm_dinsos");
          if ($$('#edit_sktm_dinsos')[0].checkValidity() == true) {
            data = new Array();
            if ($$("select[name='status']").val() == 2) {
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
                approve('/sktm_dinsos/save_sktm_dinsos/ustatus/' + id, true, $$('#esign').val());
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
                approve('/sktm_dinsos/save_sktm_dinsos/ustatus/' + id, true);
                approval.close();
              });
            }
          }
        })
      }
    },
  }
};