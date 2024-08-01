tablename = 'sk_domisili_usaha';
var sk_domisili_revisi_kurma = {
  path: '/tipe-a/sk_domisili_revisi_kurma',
  url: './pages/tipe-a/sk_domisili_revisi_kurma.html',
  name: 'sk_domisili_revisi_kurma',
  on: {
    pageInit: function () {
      app.dialog.preloader('Loading...');
      var datatables = $('#datatables').DataTable({
        "serverSide": true,
        "ajax": {
          "url": site_url_mobile_layanan + '/sk_domisili_kurma/get_data_revisi',
          "data": iamthedoor,
          "type": "GET"
        },
        "columns": [
          { "data": "id"},
          { "data": "no_register"},
          { "data": "kode_transaksi"},
          { "data": "nama_usaha" },
          { "data": "rt_kelompok" },
          { "data": "rw_kelompok" },
          { "data": "kel_usaha" },
          { "data": "kec_usaha" },
          { "data": "nik" },
          { "data": "nama" },
          { "data": "status" },
          { "data": "telepon" },
          { "data": "periode" },
        ],
        "initComplete": function (settings, json) {
          app.dialog.close();
          $$('#datatables_length').hide();
          $$('#datatables_filter').hide();
          $$('#datatables_paginate').hide();
        },
        "rowCallback": function (row, data) {
          $('td:eq(0)', row).html('<a href="/tipe-a/edit_sk_domisili_revisi_kurma/' + data.id + '/edit/" class="button button-small button-fill color-blue">' +
          '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');

          $('td:eq(12)', row).html('<span style="background-color: #17A2B8; padding: 5px; border-radius: 10px; color: white;">' + data.periode + '</span>');
        }
      });
    }
  }
};

var edit_sk_domisili_revisi_kurma = {
  path: '/tipe-a/edit_sk_domisili_revisi_kurma/:id/:tipe',
  url: './pages/tipe-a/edit_sk_domisili_revisi_kurma.html',
  name: 'edit_sk_domisili_revisi_kurma',
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
        if (data == false) {
          app.dialog.close();
          app.dialog.alert('Data tidak ditemukan');
          mainView.router.back();
          $('#datatables').DataTable().ajax.reload();
        } else {
          $('#jenis_usaha').val(data.layanan.jenis_usaha);
          $('#jangkauan_pemasaran').val(data.layanan.jangkauan_pemasaran);
          $('#lama_usaha_berdiri_input').val(data.layanan.lama_usaha_berdiri_input);
          $('#modal_usaha_input').val(data.layanan.modal_usaha_input);
          $('#penjualan_bulanan_input').val(data.layanan.penjualan_bulanan_input);
          $('#laba_usaha_saat_ini_input').val(data.layanan.laba_usaha_saat_ini_input);
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
            
            var table_chron = '<tr>' +
              '<td>Ditolak</td>' +
              '<td>DINKOP</td>' +
              '<td>DINKOP</td>' +
              '<td>' + data.layanan.desc_dinkop + '</td>' +
              '<td>' + data.layanan.tgl_dinkop + '</td>' +
              '</tr>';

            $$('.table-chron').html(table_chron);

            if (data.approve !== null) {
              $$('#approve_items_id').val(data.approve.id);
              $$('#type_ttd').val(data.approve.author_type);
              document_look(data.latest_status.status_approval, data.latest_status.display_name);
              if (data.approve.ttd !== null) {
                ttdview(data.approve.ttd);
              }
            }
            
            prep_penyimpanan();

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
              // if (!cek_jumlah_anggota()) return false;
              // if (!cek_jumlah_ketua()) return false;
              // if (!cek_kk_duplicate()) return false;

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

              app.request.post(site_url_mobile_layanan + '/sk_domisili_kurma/save_sk_domisili_revisi_kurma/' + id, ajax_data, function (response) {
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