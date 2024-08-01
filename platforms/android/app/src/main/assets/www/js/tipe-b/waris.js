const PDFDocument = PDFLib.PDFDocument;
const StandardFonts = PDFLib.StandardFonts;
const rgb = PDFLib.rgb;
const degrees = PDFLib.degrees;

var waris = {
  path: '/tipe-b/waris',
  url: './pages/tipe-b/waris.html',
  name: 'waris',
  on: {
    pageInit: function() {
      var statusselect = app.smartSelect.create({
        el: '.statusselect',
        on: {
          close: function() {
            app.dialog.preloader('Loading...');
            datatables.context[0].ajax.url = site_url_mobile_layanan + '/waris/get_data/' + $$('#statusselect').val();
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
          { data: 'pemilik_waris' },
          { data: 'display_name' },
          { data: 'val_status'},
        ],
        "initComplete": function(settings, json) {
          app.dialog.close();
          $$('#datatables_length').hide();
          $$('#datatables_filter').hide();
        },
        "rowCallback": function(row, data) {
          var color = '#17A05E';
          $('td:eq(6)', row).html('<span style="background-color:'+color+'; padding:5px; border-radius:10px; color:white;">Bisa Diambil</span>');
          if (data.val_status) {
              if (data.val_status == 'Ditolak') {
                  color = '#DE4E42';
              } else if (data.val_status == 'Menunggu') {
                  color = '#FF9800';
              }
              $('td:eq(6)', row).html('<span style="background-color:'+color+'; padding:5px; border-radius:10px; color:white;">'+data.val_status+'</span>');
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
    pageInit: function() {
      $$('#nik_pemohon').val(datauser.nik);
      $$('#nama_pemohon').val(datauser.nama);
      $$('#tempat_lahir').val(datauser.tempat_lahir);
      $$('#tanggal_lahir').val(new Date(datauser.tanggal_lahir).toDateIndoFormat());
      $$('#jenis_kelamin').val(datauser.jenis_kelamin);
      $$('#telepon').val(datauser.no_telp_pendaftar);
      $$('#kecamatan').val(datauser.namakec);
      $$('#kelurahan').val(datauser.namakel);
      $$('#email').val(datauser.email);
      $$('#alamat').val(datauser.alamat);

      ahli_waris = new Array();
      $$('#addahliwaris').on('touchend', function() {
        popup_tambah_ahli_waris();
      });
      $$("#addformupload").on("touchend", addrow);

      $$('#simpan').on('click', function() {
        app.input.validateInputs('#form_new_waris');
        if ($$('#form_new_waris')[0].checkValidity() == true) {
          if (ahli_waris.length < 1) {
            app.dialog.alert('Mohon Masukkan Data Ahli Waris Terlebih Dahulu');
            return false;
          }

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
          ajax_data.push(ahli_waris); // 2
          ajax_data.push(filecode);   // 3
          ajax_data.push(filedesc);   // 4

          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/waris/create_waris', ajax_data, function(data) {
            app.dialog.close();
            if (data) {
              app.dialog.alert('Data Berhasil Diajukan');
              mainView.router.back();
              $('#datatables').DataTable().ajax.reload();
            } else {
              app.dialog.alert(data.desc);
            }
          }, function() {
            app.dialog.close();
            app.dialog.alert('Data Gagal Diajukan, Mohon Coba Lagi Nanti');
          }, 'json');
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
    pageInit: function() {
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

      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/waris/find/' + id, iamthedoor, function(data) {
        app.dialog.close();
        // Field Data Dokumen
        $$('#kode_transaksi').val(data.layanan.kode_transaksi);
        $$('#pemilik_waris').val(data.layanan.pemilik_waris);

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

        // Tabel Data Ahli Waris
        ahli_waris = data.layanan_item;
        for (var i = 0; i < ahli_waris.length; i++) {
          ahli_waris[i].status = 'tersimpan';
        }
        $$('#addahliwaris').on('touchend', function() {
          popup_tambah_ahli_waris();
        });
        reload_ahli_waris_table(ahli_waris);

        // Berkas Lampiran
        $$("#addformupload").on("touchend", addrow);
        if (tipe == 'view') {
          $$('.aksi-table').remove();
          $$('.hapus-table').remove();
          get_attachments_waris(data.attachments, tipe);
        } else {
          get_attachments_waris(data.attachments);
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
          $$("#btndeletelayanan").html('<a class="button button-round button-fill color-red" id="deletelayanan" style="margin-top: 10px;">'+
            '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Hapus Data</span></a>');
          $$('#form_edit_waris input').prop("disabled", true);
          $$('#form_edit_waris textarea').prop("disabled", true);
          if (data.check_approved) {
            $$('.savebutton').hide();
            $$('.checked_approval_button').show();
          } else {
            if (data.approve.sum_approval > 1) {
              $$('.savebutton').hide();
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
              $$('.savebutton').hide();
              $$('.checked_approval_button').show();
            } else {
              $$('.savebutton').html('<div class="toolbar-inner"><a class="link bg-color-orange" id="print_preview_button"><i class="icon f7-icons">zoom_in</i> Preview Surat</a></div>');
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
          $$('.savebutton').remove();
          $$('#btndeletelayanan').remove();
          $('#form_edit_waris input').prop('readonly', true);
          $$('.checked_approval_button').show();
          $$('.hapus-table').hide();
          $$('#addahliwaris').hide();
          $$('#addformupload').hide();

          // Create dynamic Popup
          var dynamicPopup = app.popup.create({
            content: '<div class="popup my-popup">'+
              '<div class="view">'+
                '<div class="page">'+
                  '<div class="navbar">'+
                    '<div class="navbar-inner">'+
                      '<div class="title">Cetak Surat</div>'+
                      '<div class="right">'+
                        '<a class="link popup-close">Close</a>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                  '<div class="page-content">'+
                    '<div class="block">'+
                      '<div class="list simple-list">'+
                        '<ul>'+
                          list_cetak+
                        '</ul>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>',
            // Events
            on: {
              opened: function (popup) {
                $$("#print_spw").on("click", function() {
                  app.dialog.preloader('Mohon Tunggu Sebentar...');
                  download_doc(data.layanan.doc_path_ttd_spw + '_signed.pdf');
                });
                $$("#print_basw").on("click", function() {
                  app.dialog.preloader('Mohon Tunggu Sebentar...');
                  download_doc(data.layanan.doc_path_ttd_basw + '_signed.pdf');
                });
                $$("#print_dhsw").on("click", function() {
                  app.dialog.preloader('Mohon Tunggu Sebentar...');
                  download_doc(data.layanan.doc_path_ttd_dhsw + '_signed.pdf');
                });
                $$("#print_dsw").on("click", function() {
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
            content: '<div class="popup my-popup">'+
              '<div class="view">'+
                '<div class="page">'+
                  '<div class="navbar">'+
                    '<div class="navbar-inner">'+
                      '<div class="title">Preview Surat</div>'+
                      '<div class="right">'+
                        '<a class="link popup-close">Close</a>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                  '<div class="page-content">'+
                    '<div class="block">'+
                      '<div class="list simple-list">'+
                        '<ul>'+
                          '<li><a id="print_spw" class="link button button-fill color-green"><i class="icon f7-icons">search</i> Surat Pernyataan Waris</a></li>'+
                          '<li><a id="print_basw" class="link button button-fill color-green"><i class="icon f7-icons">search</i> Berita Acara Sidang Waris</a></li>'+
                          '<li><a id="print_dhsw" class="link button button-fill color-green"><i class="icon f7-icons">search</i> Daftar Hadir Sidang Waris</a></li>'+
                          '<li><a id="print_dsw" class="link button button-fill color-green"><i class="icon f7-icons">search</i> Dokumentasi Penanda Tanganan Waris</a></li>'+
                        '</ul>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>',
            // Events
            on: {
              opened: function (popup) {
                $$("#print_spw").on("click", function() {
                  app.dialog.preloader('Mohon Tunggu Sebentar...');
                  preview_doc(data.attachments_waris[0].file_actual, 'layanan');
                });
                $$("#print_basw").on("click", function() {
                  app.dialog.preloader('Mohon Tunggu Sebentar...');
                  preview_doc(data.attachments_waris[1].file_actual, 'layanan');
                });
                $$("#print_dhsw").on("click", function() {
                  app.dialog.preloader('Mohon Tunggu Sebentar...');
                  preview_doc(data.attachments_waris[2].file_actual, 'layanan');
                });
                $$("#print_dsw").on("click", function() {
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
      }, function() {
        app.dialog.close();
        app.dialog.alert('Terjadi Kesalahan Saat Mengambil Data Anda, Mohon Coba Lagi Nanti');
        mainView.router.back();
        $('#datatables').DataTable().ajax.reload();
      }, 'json');

      $$('#simpan').on('click', function() {
        app.input.validateInputs('#form_edit_waris');
        if ($$('#form_edit_waris')[0].checkValidity() == true) {
          if (iamthedoor.role_id == 4) {
            if (ahli_waris.length < 1) {
              app.dialog.alert('Mohon Masukkan Data Ahli Waris Terlebih Dahulu');
              return false;
            }

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
            ajax_data.push(ahli_waris); // 2
            ajax_data.push(filecode);   // 3
            ajax_data.push(filedesc);   // 4

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile_layanan + '/waris/update_waris/' + id, ajax_data, function(data) {
              app.dialog.close();
              if (data) {
                app.dialog.alert('Data Berhasil Diajukan');
                mainView.router.back();
                $('#datatables').DataTable().ajax.reload();
              } else {
                app.dialog.alert(data.desc);
              }
            }, function() {
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
                  approve_waris('/waris/ustatus/' + id, this_user_is_the_last_index, $$('#esign').val());
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

      $$('#deletelayanan').on('click', function() {
        app.dialog.confirm('Apakah anda yakin Menghapus Data ini?', function() {
          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/waris/delete_layanan/' + id, iamthedoor, function(callback) {
            app.dialog.close();
            if (callback.success) {
              app.dialog.alert('Data Berhasil Dihapus');
              mainView.router.back();
              $('#datatables').DataTable().ajax.reload();
            } else {
              app.dialog.alert(callback.desc);
            }
          }, function() {
            app.dialog.close();
            app.dialog.alert('Data Gagal Dihapus, Mohon Coba Lagi Nanti');
          }, 'json');
        });
      });
    },
  }
};

function approve_waris(function_url, this_user_is_the_last_index, esign = '') {
  data = $.extend(app.form.convertToData('#approval'), iamthedoor);
  var url = site_url_mobile_layanan + function_url + '/' + iamthedoor.user_id + '/' + iamthedoor.kecamatan_id + '/' + iamthedoor.kelurahan_id + '/';
  if (this_user_is_the_last_index == true && $$("select[name='status']").val() == 2 && esign.length == 0) {
    app.dialog.alert('Passphrase Tidak Boleh Kosong');
  } else {
    app.dialog.preloader('Sedang Proses...');
    data['esign'] = window.btoa(esign).replace(/=/g, '');
    app.request.post(url, data, function(data) {
      if (isNaN(data)) {
        app.dialog.close();
        if (data.status == 'wrong') {
          app.dialog.close();
          app.dialog.alert(data.message);
        } else if (data.status == 'success') {
          for (var i = 0; i < data.data.length; i++) {
            generateQRCodeWaris(data.id, data.data[i].elem, data.data[i].file, data.data[i].unique_name, data.last_approval.waktu_proses_kel)
          }
        } else {
          app.dialog.close();
          app.dialog.alert('Terjadi Kesalahan Dalam Sistem.');
        }
        // $('#datatables').DataTable().ajax.reload();
        // mainView.router.back();
      } else {
        app.dialog.close();
        app.dialog.alert('Terjadi Kesalahan Dalam Sistem.');
        mainView.router.back();
        $('#datatables').DataTable().ajax.reload();
      }
    }, function() {
      app.dialog.close();
      app.dialog.alert('Peringatan', 'Anda Sedang Tidak Tersambung Dengan Internet.');
      mainView.router.back();
      $('#datatables').DataTable().ajax.reload();
    }, 'json');
  }
}

function generateQRCodeWaris(id, this_elem, file_link, unique_name, date_ttd_desa) {
  var date_now = new Date().toLocaleString('en-GB', { hour12: false });
  date_ttd_desa = new Date(date_ttd_desa).toLocaleString('en-GB', { hour12: false });

  $('#qrcode').empty();
  new QRCode($('#qrcode').get(0), {
    text: btoa('EDOCX' + unique_name).replace(/=/g, ''),
    width: 80,
    height: 80,
    correctLevel : QRCode.CorrectLevel.M,
  });

  generateWaris();

  async function generateWaris() {
    let form_data_ttd = new FormData();
    form_data_ttd.append('user_data', JSON.stringify(iamthedoor));
    form_data_ttd.append('unique_name', unique_name);
    var this_elem_ttd = 'ttd_' + this_elem;
    var this_elem_ttd_blank = 'ttd_blank_' + this_elem;
    const formUrl = base_url+'/assets/images/layanan/'+file_link;
    const formBytes = await fetch(formUrl).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(formBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pngImage = await pdfDoc.embedPng($('#qrcode canvas').get(0).toDataURL());
    const pngDims = pngImage.scale(0.5);

    const pages = pdfDoc.getPages();
    pages.forEach(function(currPage) {
      // const lastPage = pages[pages.length - 1];

      currPage.drawImage(pngImage, {
        x: currPage.getWidth() / 2,
        y: currPage.getHeight() - (currPage.getHeight() - 20),
        width: pngDims.width,
        height: pngDims.height,
      });

      currPage.drawText('Terdaftar di Kelurahan '+$('#kelurahan').val()+'\nPada Tanggal '+date_ttd_desa, { 
        x: currPage.getWidth() / 2 + 50,
        y: currPage.getHeight() - (currPage.getHeight() - 45),
        size: 10,
        lineHeight: 14,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      currPage.drawImage(pngImage, {
        x: currPage.getWidth() - (currPage.getWidth() - 20),
        y: currPage.getHeight() - (currPage.getHeight() - 20),
        width: pngDims.width,
        height: pngDims.height,
      });

      currPage.drawText('Terdaftar di Kecamatan '+$('#kecamatan').val()+'\nPada Tanggal '+date_now, {
        x: currPage.getWidth() - (currPage.getWidth() - 70),
        y: currPage.getHeight() - (currPage.getHeight() - 45),
        size: 10,
        lineHeight: 14,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    });

    const pdfBytes = await pdfDoc.save();
    // form_data_ttd.append('file', new File([pdfBytes], file_link, {type: 'application/pdf'}));
    form_data_ttd.append('extension', 'pdf');
    form_data_ttd.append('file', new Blob([pdfBytes], {type: 'application/pdf'}));
    file_upload_ttd(this_elem_ttd, form_data_ttd, id, unique_name);
    update_data_waris(id, this_elem, unique_name, form_data_ttd);

    const blank_pdfDoc = await PDFDocument.create();
    const blank_pngImage = await blank_pdfDoc.embedPng($('#qrcode canvas').get(0).toDataURL());
    const blank_pngDims = pngImage.scale(0.5);
    const blank_page = blank_pdfDoc.addPage();
    const blank_pages = blank_pdfDoc.getPages();
    const blank_lastPage = blank_pages[blank_pages.length - 1];

    blank_lastPage.drawImage(blank_pngImage, {
      x: blank_lastPage.getWidth() / 2,
      y: blank_lastPage.getHeight() - (blank_lastPage.getHeight() - 20),
      width: blank_pngDims.width,
      height: blank_pngDims.height,
    });

    blank_lastPage.drawText('Terdaftar di Kelurahan '+$('#kelurahan').val()+'\nPada Tanggal '+date_ttd_desa, { 
      x: blank_lastPage.getWidth() / 2 + 50,
      y: blank_lastPage.getHeight() - (blank_lastPage.getHeight() - 45),
      size: 10,
      lineHeight: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    blank_lastPage.drawImage(blank_pngImage, {
      x: blank_lastPage.getWidth() - (blank_lastPage.getWidth() - 20),
      y: blank_lastPage.getHeight() - (blank_lastPage.getHeight() - 20),
      width: blank_pngDims.width,
      height: blank_pngDims.height,
    });
    
    blank_lastPage.drawText('Terdaftar di Kecamatan '+$('#kecamatan').val()+'\nPada Tanggal '+date_now, {
      x: blank_lastPage.getWidth() - (blank_lastPage.getWidth() - 70),
      y: blank_lastPage.getHeight() - (blank_lastPage.getHeight() - 45),
      size: 10,
      lineHeight: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    var form_data_blank_ttd = new FormData();
    form_data_blank_ttd.append('user_data', JSON.stringify(iamthedoor));
    form_data_blank_ttd.append('unique_name', unique_name+'_blank');

    const blank_pdfBytes = await blank_pdfDoc.save();
    form_data_blank_ttd.append('extension', 'pdf');
    form_data_blank_ttd.append('file', new Blob([blank_pdfBytes], {type: 'application/pdf'}));
    file_upload_ttd_blank(this_elem, form_data_blank_ttd);
  }
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
        app.dialog.close();
        app.dialog.alert('Berhasil');
        $('#datatables').DataTable().ajax.reload();
        mainView.router.back();
      }
    }
  });
}

function update_data_waris(id, this_elem, unique_name, form_data) {
  $.ajax({
    url: base_url + '/admin/layanantipeb/waris/update_data/'+id+'/'+this_elem+'/'+unique_name,
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

function popup_tambah_ahli_waris() {
  var popup_anggota = app.popup.create({
    content: '<div class="popup page-content">'+
      '<div class="block">'+
        '<form class="list" id="tambah_ahli_waris" data-id="null">'+
          '<div class="block-title">'+
            '<div class="row">'+
              '<div class="col-100">'+
                '<div class="chip color-blue">'+
                  '<div class="chip-label">Form Tambah Ahli Waris</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<ul id="formupload-wrapper-list-waris">'+
            '<li class="item-content item-input">'+
              '<div class="item-inner">'+
                '<div class="item-input-wrap">'+
                  '<div class="item-title item-label">NIK</div>'+
                  '<input type="text" name="nik_ahli_waris">'+
                  '<span class="input-clear-button"></span>'+
                '</div>'+
              '</div>'+
            '</li>'+
            '<li class="item-content item-input">'+
              '<div class="item-inner">'+
                '<div class="item-input-wrap">'+
                  '<div class="item-title item-label">Nama</div>'+
                  '<input type="text" name="nama_ahli_waris">'+
                  '<span class="input-clear-button"></span>'+
                '</div>'+
              '</div>'+
            '</li>'+
            '<li class="item-content item-input">'+
              '<div class="item-inner">'+
                '<div class="item-input-wrap">'+
                  '<div class="item-title item-label">Alamat</div>'+
                  '<input type="text" name="alamat_ahli_waris">'+
                  '<span class="input-clear-button"></span>'+
                '</div>'+
              '</div>'+
            '</li>'+
            '<li data-index="1001"><ul>'+
              '<li class="item-content item-input">'+
                '<div class="item-inner">'+
                  '<div class="row">'+
                    '<div class="col-60">'+
                      '<div class="item-inner">'+
                        '<div class="item-input-wrap">'+
                          '<div class="item-title item-label">KTP</div>'+
                          '<input id="fileid1001" class="fileid" type="hidden" name="fileid1001">'+
                          '<input class="filecode" id="filecode1001" type="hidden" readonly name="filecodektp">'+
                          '<input class="fileurl" id="fileurl1001" type="text" name="fileurl1001" readonly>'+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                    '<div class="col-20 preview_files" id="preview_files_ktp">'+
                    '</div>'+
                    '<div class="col-20">'+
                      '<a id="1001" onclick="uploadfilewaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
              '</li>'+
            '</ul></li>'+
            '<li data-index="1002"><ul>'+
              '<li class="item-content item-input">'+
                '<div class="item-inner">'+
                  '<div class="row">'+
                    '<div class="col-60">'+
                      '<div class="item-inner">'+
                        '<div class="item-input-wrap">'+
                          '<div class="item-title item-label">KK</div>'+
                          '<input id="fileid1002" class="fileid" type="hidden" name="fileid1002">'+
                          '<input class="filecode" id="filecode1002" type="hidden" readonly name="filecodekk">'+
                          '<input class="fileurl" id="fileurl1002" type="text" name="fileurl1002" readonly>'+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                    '<div class="col-20 preview_files" id="preview_files_kk">'+
                    '</div>'+
                    '<div class="col-20">'+
                      '<a id="1002" onclick="uploadfilewaris(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
              '</li>'+
            '</ul></li>'+
            '<input type="hidden" name="status" value="tersimpan">'+
          '</ul>'+
        '</form>'+
        '<div class="row">'+
          '<div class="col-40">'+
            '<a class="button button-round popup-close button-fill color-red" style="margin-top: 10px;">' +
              '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Batal</span>' +
            '</a>'+
          '</div>'+
          '<div class="col-60">'+
            '<a class="button button-round button-fill color-green" id="save_ahli_waris" style="margin-top: 10px;">' +
              '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
            '</a>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>',
    on: {
      open: function() {
        if (iamthedoor.role_id != 4) {
          $$('#save_ahli_waris').hide();
        }
      },
    }
  });
  popup_anggota.open();
  $$("#save_ahli_waris").on('click', function() {
    if ($$('#filecode1001').val() == '' || $$('#filecode1002').val() == '') {
      app.dialog.alert('Silahkan upload berkas KTP dan KK anda');
      return false;
    }

    popup_anggota.close();
    if ($("#tambah_ahli_waris").data("id") !== null) {
      ahli_waris_id = $("#tambah_ahli_waris").data("id");
      ahli_waris[ahli_waris_id] = app.form.convertToData("#tambah_ahli_waris");
    } else {
      ahli_waris.push(app.form.convertToData("#tambah_ahli_waris"));
    }
    reload_ahli_waris_table(ahli_waris);
  });
}

function reload_ahli_waris_table(ahli_waris_key) {
  ahli_waris_html = '<tr><td></td><td>Data Kosong</td><td></td></tr>';
  $$("#ahli_waris_table table tbody").html(ahli_waris_html);
  ahli_waris_row = '';
  for (var i = 0; i < ahli_waris_key.length; i++) {
    if (ahli_waris_key[i].status == "tersimpan") {
      ahli_waris_row += '<tr>' +
        '<td class="label-cell aksi-table"><a data-id="' + [i] + '" class="edit_anggota button button-small color-blue button-fill">EDIT</a></td>' +
        '<td class="label-cell hapus-table"><a data-id="' + [i] + '"  class="hapus_anggota button color-red button-fill button-small">HAPUS</a></td>' +
        '<td class="label-cell">' + ahli_waris_key[i].nik_ahli_waris + '</td>' +
        '<td class="label-cell">' + ahli_waris_key[i].nama_ahli_waris + '</td>' +
        '<td class="label-cell">' + ahli_waris_key[i].alamat_ahli_waris + '</td>' +
        '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files('+ahli_waris_key[i].fileid1001+')" class="ktp_anggota button color-blue button-fill button-small">LIHAT</a></td>' +
        '<td class="label-cell"><a data-id="' + [i] + '" onclick="preview_files('+ahli_waris_key[i].fileid1002+')" class="kk_anggota button color-blue button-fill button-small">LIHAT</a></td>' +
      '</tr>';
    }
  }
  if (ahli_waris_row !== '') {
    $$("#ahli_waris_table table tbody").html(ahli_waris_row);
  }
  if (iamthedoor.role_id != 4) {
    $$('.hapus-table').hide();
  }
  $$(".hapus_anggota").on('click', function() {
    ahli_waris_id = $(this).data("id");
    app.dialog.confirm('Apakah anda yakin Menghapus data?', function() {
      ahli_waris_key[ahli_waris_id].status = 'terhapus';
      reload_ahli_waris_table(ahli_waris_key);
    });
  });
  $$(".edit_anggota").on('click', function() {
    ahli_waris_id = $(this).data("id");
    app.dialog.confirm('Apakah anda yakin akan merubah data?', function() {
      popup_tambah_ahli_waris();
      $$("#tambah_ahli_waris").attr("data-id", ahli_waris_id);
      $$("input[name='nama_ahli_waris']").val(ahli_waris_key[ahli_waris_id].nama_ahli_waris);
      $$("input[name='nik_ahli_waris']").val(ahli_waris_key[ahli_waris_id].nik_ahli_waris);
      $$("input[name='alamat_ahli_waris']").val(ahli_waris_key[ahli_waris_id].alamat_ahli_waris);
      $$("input[name='filecodekk']").val(ahli_waris_key[ahli_waris_id].filecodekk);
      $$("input[name='filecodektp']").val(ahli_waris_key[ahli_waris_id].filecodektp);
      $$("input[name='fileid1001']").val(ahli_waris_key[ahli_waris_id].fileid1001);
      $$("input[name='fileid1002']").val(ahli_waris_key[ahli_waris_id].fileid1002);
      $$("input[name='fileurl1001']").val(ahli_waris_key[ahli_waris_id].fileurl1001);
      $$("input[name='fileurl1002']").val(ahli_waris_key[ahli_waris_id].fileurl1002);
      var preview_files_ktp ='<a id="1001" onclick="preview_files_waris('+ahli_waris_key[ahli_waris_id].fileid1001+')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
      $$("#preview_files_ktp").html(preview_files_ktp);
      var preview_files_kk ='<a id="1002" onclick="preview_files_waris('+ahli_waris_key[ahli_waris_id].fileid1002+')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
      $$("#preview_files_kk").html(preview_files_kk);
    });
  });
}

function preview_files_waris(id) {
  app.request.post(site_url_mobile+'/siurban_mobile/preview_files/'+id,'', function (image_url) {
    if (image_url == null) {
      app.dialog.alert('File tidak ditemukan');
    } else {
      var the_preview_files = app.sheet.create({
        content: '<div class="sheet-modal page-content" style="height: 100%">'+
          '<div class="block">'+
            '<p class="row"><a href="#" class="col-25 button button-raised button-fill sheet-close">TUTUP</a></p>'+
            '<img src="'+site_url_image_layanan+image_url+'" width="100%">'+
          '</div>'+
        '</div>',
      });
      the_preview_files.open();
    }
  }, function() {},'json');
}

function get_attachments_waris(attachments, view = 'edit') {
  var content = '';
  var counter = 0;

  attachments.forEach(function(item, index) {
    let uploadbtn = '';
    let deletebtn = '';
    if (view == 'edit' && iamthedoor.role_id == 4) {
      uploadbtn = '<div class="col-20">'+
        '<a id="'+index+'" onclick="uploadfile(this.id)" class="button button-round button-fill" style="margin-top: 10px;">'+
          '<i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i>'+
        '</a>'+
      '</div>';
      deletebtn = '<div class="col-20">'+
        '<a id="'+index+'" onclick="deleterow(this.id)" class="button button-round button-fill color-red" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">trash_fill</i></a>'+
      '</div>';
    }

    if (Array.isArray(attachments) && attachments[counter]) {
      content += '<li data-index="'+index+'" ><ul>'+
      '<li class="item-content item-input">'+
        '<div class="item-inner">'+
          '<div class="row">'+
            '<div class="col-60">'+
              '<div class="item-inner">'+
                '<div class="item-input-wrap">'+
                  '<input id="fileid'+index+'" class="fileid" type="hidden" name="fileid['+index+']" value="'+attachments[counter].id+'">'+
                  '<input class="filecode" id="filecode'+index+'" type="hidden" readonly="" name="filecode[]" value="'+attachments[counter].code+'">'+
                  '<input class="fileurl" id="fileurl'+index+'" type="text" name="fileurl['+index+']" placeholder="URL file" value="'+attachments[counter].file_actual+'" readonly>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="col-20 preview_files">'+
              '<a id="'+index+'" onclick="preview_files('+attachments[counter].id+')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>'+
            '</div>'+
            uploadbtn+
          '</div>'+
        '</div>'+
      '</li>'+
      '<li class="item-content item-input">'+
        '<div class="item-inner">'+
          '<div class="row">'+
            '<div class="col-80">'+
              '<div class="item-inner">'+
                '<div class="item-input-wrap">'+
                  '<input type="text" class="filedesc" name="filedesc[]" placeholder="Keterangan File" value="'+attachments[counter].desc+'" readonly>'+
                '</div>'+
              '</div>'+
            '</div>'+
            deletebtn+
          '</div>'+
        '</div>'+
      '</li></ul></li><hr>';

      counter++;
    } else {
      content += '<li data-index="'+index+'" ><ul>'+
      '<li class="item-content item-input">'+
        '<div class="item-inner">'+
          '<div class="row">'+
            '<div class="col-60">'+
              '<div class="item-inner">'+
                '<div class="item-input-wrap">'+
                  '<input id="fileid'+index+'" class="fileid" type="hidden" name="fileid['+index+']">'+
                  '<input class="filecode" id="filecode'+index+'" type="hidden" readonly="" name="filecode[]">'+
                  '<input class="fileurl" id="fileurl'+index+'" type="text" name="fileurl['+index+']" placeholder="URL file" readonly>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="col-20 preview_files">'+
            '</div>'+
            uploadbtn+
          '</div>'+
        '</div>'+
      '</li>'+
      '<li class="item-content item-input">'+
        '<div class="item-inner">'+
          '<div class="row">'+
            '<div class="col-80">'+
              '<div class="item-inner">'+
                '<div class="item-input-wrap">'+
                  '<input type="text" class="filedesc" name="filedesc[]" placeholder="Keterangan File" value="'+item+'" readonly>'+
                '</div>'+
              '</div>'+
            '</div>'+
            deletebtn+
          '</div>'+
        '</div>'+
      '</li></ul></li><hr>';
    }
  });

  $$('#formupload-wrapper-list').html(content);
}