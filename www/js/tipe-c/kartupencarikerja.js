tablename = "kartu_pencari_kerja";
var kartupencarikerja_new = {
  path: '/tipe-c/kartupencarikerja_new/',
  url: './pages/tipe-c/kartupencarikerja_new.html',
  name: 'kartupencarikerja_new',
  on: {
    pageInit: function () {
      add_attachment_pendaftar(datauser.attachments);
      var calendar_tanggal_lahir = app.calendar.create({
        inputEl: '#tanggal_lahir',
        closeOnSelect: true,
        dateFormat: 'dd-MM-yyyy',
      });
      app.request.post(`${site_url_mobile_layanan}/kartu_pencari_kerja/getCategory`, iamthedoor, function (data) {
        let html = '';
        data.forEach(function (val) {
          html += `<option value="${val.id}">${val.name}</option>`;
        });
        $$('select[name="category"]').html(html).change();
      }, 'json');

      $$('select[name="category"]').on('change', function () {
        app.request.post(`${site_url_mobile_layanan}/kartu_pencari_kerja/getSubCategory/${this.value}`, iamthedoor, function (data) {
          let html = '';
          data.forEach(function (val) {
            html += `<option value="${val.id}">${val.name}</option>`;
          });
          $$('select[name="subCategory"]').html(html);
        }, 'json');
      });

      app.request.post(`${site_url_mobile_layanan}/kartu_pencari_kerja/get_jurusan`, iamthedoor, function (data) {
        for (let i in data) {
          let html = `<option value="">${data[i]['']}</option>`;
          for (let j in data[i]) {
            if (!isNaN(parseInt(j))) {
              html += `<option value="${j}">${data[i][j]}</option>`;
            }
          }
          $$(`select[data-select="${i}"]`).html(html);
        }
      }, 'json');

      $$("#addformupload").on("touchend", addrow);
      // $$("#addformkerja").on("click", add_row_kerja);

      pengalaman_kerja = new Array();
      $$('#addpengalamankerja').on('touchend', function () {
        popup_tambah_pengalaman_kerja();
      });

      var dataProfile = [datauser.nik];
      app.dialog.confirm('Apakah anda ingin menerapkan data profile pada form berikut ?', 'Sipraja', function () {
        app.dialog.preloader('Loading....');
        app.request.post(`${site_url_mobile_layanan}/user_support/profile/`, dataProfile, function (data) {
          app.dialog.close();
          if (!data) {
            app.dialog.alert('Profile anda kosong tolong isi form profile terlebih dahulu', () => {
              mainView.router.navigate('/change_pass/')
            });
          } else {
            app.dialog.alert('Data Profile telah diterapkan');
            $$('input[name="berat_badan"]').val(data.berat_badan);
            $$('input[name="facebook"]').val(data.facebook);
            $$('input[name="instagram"]').val(data.instagram);
            $$('input[name="linkedin"]').val(data.linkedin);
            $$('input[name="twitter"]').val(data.twitter);
          }
        }, function () {
          app.dialog.close();
          app.dialog.alert('Data gagal diambil');
        }, 'json');
      }, function () {
        return false
      });

      $$("#simpan").on("click", function () {
        app.input.validateInputs("#kartupencarikerja_new");
        if ($$('#kartupencarikerja_new')[0].checkValidity() == true) {
          app.dialog.preloader('Loading');
          data = new Array();
          keteranganid = [];
          filecode = [];

          $('input[name^=keteranganid]').each(function () {
            keteranganid.push($(this).val());
          });

          $('input[name^=filecode]').each(function () {
            filecode.push($(this).val());
          });

          mydata = app.form.convertToData("#kartupencarikerja_new");
          let bahasa = $('input[name="bahasa_asing[]"]:checked').serializeArray();

          data.push(mydata);
          data.push(iamthedoor);
          data.push(keteranganid);
          data.push(filecode);
          data.push(pengalaman_kerja);
          data.push(bahasa);

          app.request.post(site_url_mobile_layanan + '/kartu_pencari_kerja/save_kartu_pencari_kerja', data, function (data) {
            if (isNaN(data)) {
              app.dialog.close();
              app.dialog.alert(data.desc);
            } else {
              app.dialog.close();
              app.dialog.alert('Penyimpanan Berhasil');
              mainView.router.back();
              $('#datatables').DataTable().ajax.reload();
            }
          }, function () {
            app.dialog.close();
            app.dialog.alert('Penyimpanan Gagal, Coba lagi di lain waktu');
          }, 'json');
        }
      });
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
              $('td:eq(0)', row).html('<a href="/tipe-c/kartupencarikerja_edit/' + data.id + '/edit/" class="button button-small button-fill color-blue">' + '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');
            } else {
              $('td:eq(0)', row).html('<a href="/tipe-c/kartupencarikerja_edit/' + data.id + '/approve" class="button button-small button-fill color-green">' + '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Approve</a>');
            }
          } else {
            $('td:eq(0)', row).html('<a href="/tipe-c/kartupencarikerja_edit/' + data.id + '/lihat/" class="button button-small button-fill color-green">' + '<i class="icon f7-icons" style="font-size: 12pt;">zoom_in</i> Lihat</a>');
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
        $$("#addformkerja").show();
        $$("#addformkerja").on("click", add_row_kerja);
        $$("#addformupload").on("touchend", addrow);
      }

      $$("#print_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/kartu_pencari_kerja/print_doc/' + id, iamthedoor, function (doc_path) {
          download_doc(doc_path);
        }, 'json');
      });

      $$("#print_doc_ak2_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/kartu_pencari_kerja/print_doc_ak2/' + id, iamthedoor, function (doc_path) {
          download_doc(doc_path);
        }, 'json');
      });

      $$("#print_preview_button").on("click", function () {
        app.dialog.preloader('Mohon Tunggu Sebentar...');
        app.request.post(site_url_mobile_layanan + '/kartu_pencari_kerja/print_doc/' + id, iamthedoor, function (doc_path) {
          preview_doc(doc_path);
        }, 'json');
      });

      app.request.post(`${site_url_mobile_layanan}/kartu_pencari_kerja/getCategory`, iamthedoor, function (data) {
        let html = '';
        data.forEach(function (val) {
          html += `<option value="${val.id}">${val.name}</option>`;
        });
        $$('select[name="category"]').html(html);
      }, 'json');

      $$('select[name="category"]').on('change', function () {
        var dataid = $(this).data('subcategory');
        app.request.post(`${site_url_mobile_layanan}/kartu_pencari_kerja/getSubCategory/${this.value}`, iamthedoor, function (data) {
          let html = '';
          data.forEach(function (val) {
            html += `<option value="${val.id}" ${(dataid == val.id) ? "selected" : ""}>${val.name}</option>`;
          });
          $$('select[name="subCategory"]').html(html);
        }, 'json');
      });

      app.request.post(`${site_url_mobile_layanan}/kartu_pencari_kerja/get_jurusan`, iamthedoor, function (data) {
        for (let i in data) {
          let html = `<option value="">${data[i]['']}</option>`;
          for (let j in data[i]) {
            if (!isNaN(parseInt(j))) {
              html += `<option value="${j}">${data[i][j]}</option>`;
            }
          }
          $$(`select[data-select="${i}"]`).html(html);
        }
      }, 'json');

      app.request.post(site_url_mobile_layanan + '/kartu_pencari_kerja/find_layanan/' + id + '/' + datauser.bf_users_id, data, function (data) {
        if (data == false) {
          app.dialog.close();
          app.dialog.alert('Data tidak ditemukan');
          mainView.router.back();
        } else {
          app.dialog.close();
          this_user_is_the_last_index = data.this_user_is_the_last_index;
          app.request.post(site_url_mobile + '/siurban_mobile/get_kecamatan_kelurahan/' + data.pemohon.kecamatan + '/' + data.pemohon.kode_desa, function (keckel) {
            $$("input[name='kecamatan_pemohon']").val(keckel.kecamatan);
            $$("input[name='kelurahan_pemohon']").val(keckel.kelurahan);
            $$("input[name='nik_pemohon']").val(data.pemohon.nik);
            $$("input[name='facebook']").val(data.layanan.facebook);
            $$("input[name='rw_pemohon']").val(data.layanan.rw);
            $$("input[name='rt_pemohon']").val(data.layanan.rt);
            $$("input[name='twitter']").val(data.layanan.twitter);
            $$("input[name='linkedin']").val(data.layanan.linkedin);
            $$("input[name='wilayah_lain']").val(data.layanan.wilayah_lain);
            $$("input[name='jarak_pyd']").val(data.layanan.jarak_pyd);
            $$("input[name='instagram']").val(data.layanan.instagram);
            $$("input[name='nama_pemohon']").val(data.pemohon.nama);
            $$("input[name='tempat_lahir_pemohon']").val(data.pemohon.tempat_lahir);
            $$("input[name='jenis_kelamin_pemohon']").val(data.pemohon.jenis_kelamin);
            $$("input[name='agama_pemohon']").val(data.pemohon.agama);
            $$("input[name='status_kawin_pemohon']").val(data.pemohon.status_kawin);
            $$("input[name='umur']").val(data.layanan.umur || 0);
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
            if (!isNaN(parseInt(data.layanan.jurusan_sd))) {
              $$("select[name='jurusan_sd']").val(data.layanan.jurusan_sd);
            } else if(data.layanan.jurusan_sd){
              $$("select[name='jurusan_sd']").append(`<option value="${data.layanan.jurusan_sd}">${data.layanan.jurusan_sd}</option>`).val(data.layanan.jurusan_sd);
            }
            $$("input[name='lulus_sd']").val(data.layanan.lulus_sd);
            $$("input[name='ipk_sd']").val(data.layanan.ipk_sd);
            $$("input[name='sekolah_smp']").val(data.layanan.sekolah_smp);
            if (!isNaN(parseInt(data.layanan.jurusan_smp))) {
              $$("select[name='jurusan_smp']").val(data.layanan.jurusan_smp);
            } else if(data.layanan.jurusan_smp){
              $$("select[name='jurusan_smp']").append(`<option value="${data.layanan.jurusan_smp}">${data.layanan.jurusan_smp}</option>`).val(data.layanan.jurusan_smp);
            }
            $$("input[name='lulus_smp']").val(data.layanan.lulus_smp);
            $$("input[name='ipk_smp']").val(data.layanan.ipk_smp);
            $$("input[name='sekolah_slta']").val(data.layanan.sekolah_slta);
            if (!isNaN(parseInt(data.layanan.jurusan_slta))) {
              $$("select[name='jurusan_slta']").val(data.layanan.jurusan_slta);
            } else if(data.layanan.jurusan_slta){
              $$("select[name='jurusan_slta']").append(`<option value="${data.layanan.jurusan_slta}">${data.layanan.jurusan_slta}</option>`).val(data.layanan.jurusan_slta);
            }
            $$("input[name='lulus_slta']").val(data.layanan.lulus_slta);
            $$("input[name='ipk_slta']").val(data.layanan.ipk_slta);
            $$("input[name='sekolah_d1']").val(data.layanan.sekolah_d1);
            if (!isNaN(parseInt(data.layanan.jurusan_d1))) {
              $$("select[name='jurusan_d1']").val(data.layanan.jurusan_d1);
            } else if(data.layanan.jurusan_d1){
              $$("select[name='jurusan_d1']").append(`<option value="${data.layanan.jurusan_d1}">${data.layanan.jurusan_d1}</option>`).val(data.layanan.jurusan_d1);
            }
            $$("input[name='lulus_d1']").val(data.layanan.lulus_d1);
            $$("input[name='ipk_d1']").val(data.layanan.ipk_d1);
            $$("input[name='sekolah_d2']").val(data.layanan.sekolah_d2);
            if (!isNaN(parseInt(data.layanan.jurusan_d2))) {
              $$("select[name='jurusan_d2']").val(data.layanan.jurusan_d2);
            } else if(data.layanan.jurusan_d2){
              $$("select[name='jurusan_d2']").append(`<option value="${data.layanan.jurusan_d2}">${data.layanan.jurusan_d2}</option>`).val(data.layanan.jurusan_d2);
            }
            $$("input[name='lulus_d2']").val(data.layanan.lulus_d2);
            $$("input[name='ipk_d2']").val(data.layanan.ipk_d2);
            $$("input[name='sekolah_d3']").val(data.layanan.sekolah_d3);
            if (!isNaN(parseInt(data.layanan.jurusan_d3))) {
              $$("select[name='jurusan_d3']").val(data.layanan.jurusan_d3);
            } else if(data.layanan.jurusan_d3){
              $$("select[name='jurusan_d3']").append(`<option value="${data.layanan.jurusan_d3}">${data.layanan.jurusan_d3}</option>`).val(data.layanan.jurusan_d3);
            }
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
            $$("input[name='sekolah_d4']").val(data.layanan.sekolah_d4);
            if (!isNaN(parseInt(data.layanan.jurusan_d4))) {
              $$("select[name='jurusan_d4']").val(data.layanan.jurusan_d4);
            } else if(data.layanan.jurusan_d4){
              $$("select[name='jurusan_d4']").append(`<option value="${data.layanan.jurusan_d4}">${data.layanan.jurusan_d4}</option>`).val(data.layanan.jurusan_d4);
            }
            $$("input[name='lulus_d4']").val(data.layanan.lulus_d4);
            $$("input[name='ipk_d4']").val(data.layanan.ipk_d4);
            $$("input[name='sekolah_s1']").val(data.layanan.sekolah_s1);
            if (!isNaN(parseInt(data.layanan.jurusan_s1))) {
              $$("select[name='jurusan_s1']").val(data.layanan.jurusan_s1);
            } else if(data.layanan.jurusan_s1){
              $$("select[name='jurusan_s1']").append(`<option value="${data.layanan.jurusan_s1}">${data.layanan.jurusan_s1}</option>`).val(data.layanan.jurusan_s1);
            }
            $$("input[name='lulus_s1']").val(data.layanan.lulus_s1);
            $$("input[name='ipk_s1']").val(data.layanan.ipk_s1);
            $$("input[name='sekolah_s2']").val(data.layanan.sekolah_s2);
            if (!isNaN(parseInt(data.layanan.jurusan_s2))) {
              $$("select[name='jurusan_s2']").val(data.layanan.jurusan_s2);
            } else if(data.layanan.jurusan_s2){
              $$("select[name='jurusan_s2']").append(`<option value="${data.layanan.jurusan_s2}">${data.layanan.jurusan_s2}</option>`).val(data.layanan.jurusan_s2);
            }
            $$("input[name='lulus_s2']").val(data.layanan.lulus_s2);
            $$("input[name='ipk_s2']").val(data.layanan.ipk_s2);
            $$("input[name='sekolah_doktor']").val(data.layanan.sekolah_doktor);
            if (!isNaN(parseInt(data.layanan.jurusan_doktor))) {
              $$("select[name='jurusan_doktor']").val(data.layanan.jurusan_doktor);
            } else if(data.layanan.jurusan_doktor){
              $$("select[name='jurusan_doktor']").append(`<option value="${data.layanan.jurusan_doktor}">${data.layanan.jurusan_doktor}</option>`).val(data.layanan.jurusan_doktor);
            }
            $$("input[name='lulus_doktor']").val(data.layanan.lulus_doktor);
            $$("input[name='ipk_doktor']").val(data.layanan.ipk_doktor);
            
            $$('select[name="category"]').attr('data-subcategory', data.layanan.sub_category);
            $$('select[name="category"]').val(data.layanan.category).change();
            // $$('select[name="subCategory"]').val(data.layanan.sub_category);
            
            $$("input[name='berat_badan']").val(data.layanan.berat_badan);
            $$("input[name='kode_pos_pemohon']").val(data.layanan.kode_pos);
            $$("input[name='telp_pemohon']").val(data.layanan.no_hp);
            $$("input[name='bahasa_asing']").val(data.layanan.bahasa_asing);
            $$("input[name='data_kursus']").val(data.layanan.data_kursus);
            $$("input[name='pengalaman']").val(data.layanan.pengalaman);
            $$("select[name='lokasi_pyd']").val(data.layanan.lokasi_pyd).change();
            $$("select[name='jarak_pyd']").val(data.layanan.jarak_pyd).change();
            $$("select[name='upah_pyd']").val(data.layanan.besar_upah_pyd).change();
            
            pengalaman_kerja = new Array();
            
            $$('#addpengalamankerja').on('touchend', function () {
              popup_tambah_pengalaman_kerja();
            });

            pengalaman_kerja = data.kpk_jabatan;
            for (var i = 0; i < pengalaman_kerja.length; i++) {
              pengalaman_kerja[i] = {
                "jabatan": pengalaman_kerja[i].jabatan,
                "uraian_tugas": pengalaman_kerja[i].uraian_tugas,
                "lama_kerja": pengalaman_kerja[i].lama_kerja,
                "pemberi_kerja": pengalaman_kerja[i].pemberi_kerja,

                "status": 'tersimpan',
              }
            }
            reload_pengalaman_kerja_table(pengalaman_kerja);
            
            var bahasa = [];
            $('input[name="bahasa_asing[]"]').each(function(index){
              $(".bahasa_asing[value='" + data.kpk_bahasa[index] + "']").prop("checked", true);
            });

            $$("textarea[name='data_kursus']").val(data.layanan.data_kursus);
            $$("textarea[name='pengalaman']").val(data.layanan.pengalaman);

            app.request.get(`${site_url_mobile_layanan}/kartu_pencari_kerja/jabatanKerja/${id}`, iamthedoor, function (data) {
              var html = ``
              for (var i = 0; i < data.length; i++) {
                html += `<li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Jabatan</div>
                    <input type="text" value="${data[i].jabatan}" name="jabatan[0${i}]">
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Uraian Tugas</div>
                    <input type="text" value="${data[i].uraian_tugas}" name="uraian_tugas[0${i}]">
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Lama Kerja</div>
                    <input type="text" value="${data[i].lama_kerja}" name="lama_kerja[0${i}]">
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">Pemberi Kerja</div>
                    <input type="text" value="${data[i].pemberi_kerja}" name="pemberi_kerja[0${i}]">
                    <span class="input-clear-button"></span>
                  </div>
                </div>
              </li>`
              }
              $$('#pengalamanKerja').prepend(html);
            }, 'json');

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
              $$("#btndeletelayanan").html('<a class="button button-round button-fill color-red" id="deletelayanan" style="margin-top: 10px;">' + '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Hapus Data</span></a>');
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
              $$('#kartupencarikerja_edit input').prop("disabled", true);
              $$('#kartupencarikerja_edit textarea').prop("disabled", true);
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
              app.dialog.preloader('Proses Hapus Data...');
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
              let bahasa = $('input[name="bahasa_asing[]"]:checked').serializeArray();

              data.push(mydata);
              data.push(iamthedoor);
              data.push(keteranganid);
              data.push(filecode);
              data.push(pengalaman_kerja);
              data.push(bahasa);

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
                content:
                  `<div class="popup">
                    <div class="block">
                      <p class="row"><a href="#" class="col-25 button button-raised button-fill popup-close">TUTUP</a></p>
                      <p style="text-align: center;">Ketika Anda mengubah status, maka status dokumen ini <b>tidak dapat diubah kembali</b>.</p>
                      <div class="list">
                        <ul>
                          <li class="item-content item-input">
                            <div class="item-inner">
                              <div class="item-title item-label">Masukkan Passphrase Anda</div>
                              <div class="item-input-wrap">
                                <input type="password" id="esign" name="esign" placeholder="Passphrase Anda" autocomplete="off">
                                <span class="input-clear-button"></span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <br><button class="col color-green button button-big button-raised button-fill" id="approve_button">APPROVE</button>
                    </div>
                  </div>`
              });
              approval.open();
              $$('#approve_button').on('click', function () {
                approve('/kartu_pencari_kerja/save_kartu_pencari_kerja/ustatus/' + id, this_user_is_the_last_index, $$('#esign').val());
                approval.close();
              });
            } else {
              var approval = app.popup.create({
                content:
                  `<div class="popup">
                    <div class="block">
                      <p><a href="#" class="link popup-close">< Kembali</a></p><br>
                      <h3 style="text-align:center;">Ketika Anda mengubah status, maka status dokumen ini <b>tidak dapat diubah kembali</b></h3>
                      <button class="col button button-big button-raised button-fill" id="approve_button">APPROVE</button>
                    </div>
                  </div>`,
              });
              approval.open();
              $$("#approve_button").on("touchend", function () {
                approve('/kartu_pencari_kerja/save_kartu_pencari_kerja/ustatus/' + id, this_user_is_the_last_index);
                approval.close();
              });
            }
          }
        });
      }
    },
  }
};

function popup_tambah_pengalaman_kerja() {
  var popup_pengalaman = app.popup.create({
      content: '<div class="popup page-content">' +
          '<div class="block">' +
          '<form class="list" id="tambah_pengalaman_kerja" data-id="null">' +
          '<div class="block-title">' +
          '<div class="row">' +
          '<div class="col-100">' +
          '<div class="chip color-blue">' +
          '<div class="chip-label">Form Tambah Pengalaman Kerja</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '<ul id="formupload-wrapper-list-waris">' +
          '<li class="item-content item-input">' +
            '<div class="item-inner">' +
              '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Jabatan</div>' +
                '<input type="text" name="jabatan">' +
                '<span class="input-clear-button"></span>' +
              '</div>' +
            '</div>' +
          '</li>' +
          '<li class="item-content item-input">' +
            '<div class="item-inner">' +
              '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Uraian Tugas</div>' +
                '<input type="text" name="uraian_tugas">' +
                '<span class="input-clear-button"></span>' +
              '</div>' +
            '</div>' +
          '</li>' +
          '<li class="item-content item-input">' +
            '<div class="item-inner">' +
              '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Lama Kerja</div>' +
                '<input type="text" name="lama_kerja">' +
                '<span class="input-clear-button"></span>' +
              '</div>' +
            '</div>' +
          '</li>' +
          '<li class="item-content item-input">' +
            '<div class="item-inner">' +
              '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Pemberi Kerja</div>' +
                '<input type="text" name="pemberi_kerja">' +
                '<span class="input-clear-button"></span>' +
              '</div>' +
            '</div>' +
          '</li>' +
          '<input type="hidden" name="status" value="tersimpan">' +
          '</ul>' +
          '</form>' +
          '<div class="row">' +
          '<div class="col-40">' +
          '<a class="button button-round popup-close button-fill color-red" style="margin-top: 10px;">' +
          '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Batal</span>' +
          '</a>' +
          '</div>' +
          '<div class="col-60">' +
          '<a class="button button-round button-fill color-green" id="save_pengalaman_kerja" style="margin-top: 10px;">' +
          '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">checkmark_circle_fill</i> <span>Simpan</span>' +
          '</a>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>',
      on: {
          open: function () {
          },
      }
  });
  popup_pengalaman.open();
  $$("#save_pengalaman_kerja").on('click', function () {
      popup_pengalaman.close();
      if ($("#tambah_pengalaman_kerja").data("id") !== null) {
          pengalaman_kerja_id = $("#tambah_pengalaman_kerja").data("id");
          pengalaman_kerja[pengalaman_kerja_id] = app.form.convertToData("#tambah_pengalaman_kerja");
      } else {
          pengalaman_kerja.push(app.form.convertToData("#tambah_pengalaman_kerja"));
      }
      reload_pengalaman_kerja_table(pengalaman_kerja);
  });
}

function reload_pengalaman_kerja_table(pengalaman_kerja_key) {
    pengalaman_kerja_html = '<tr><td></td><td>Data Kosong</td><td></td></tr>';
    $$("#pengalaman_kerja_table table tbody").html(pengalaman_kerja_html);
    pengalaman_kerja_row = '';
    for (var i = 0; i < pengalaman_kerja_key.length; i++) {
        if (pengalaman_kerja_key[i].status == "tersimpan") {
            pengalaman_kerja_row += '<tr>' +
                '<td class="label-cell aksi-table" style="padding: 0 12px;"><a data-id="' + [i] + '" class="edit_anggota button button-small color-blue button-fill">EDIT</a></td>' +
                '<td class="label-cell hapus-table" style="padding: 0 12px 0 0;"><a data-id="' + [i] + '"  class="hapus_anggota button color-red button-fill button-small">HAPUS</a></td>' +
                '<td class="label-cell">' + pengalaman_kerja_key[i].jabatan + '</td>' +
                '<td class="label-cell">' + pengalaman_kerja_key[i].uraian_tugas + '</td>' +
                '<td class="label-cell">' + pengalaman_kerja_key[i].lama_kerja + '</td>' +
                '<td class="label-cell">' + pengalaman_kerja_key[i].pemberi_kerja + '</td>';
            pengalaman_kerja_row += '</tr>';
        }
    }
    if (pengalaman_kerja_row !== '') {
        $$("#pengalaman_kerja_table table tbody").html(pengalaman_kerja_row);
    }

    $$(".hapus_anggota").on('click', function () {
        pengalaman_kerja_id = $(this).data("id");
        app.dialog.confirm('Apakah anda yakin Menghapus data?', function () {
            pengalaman_kerja_key[pengalaman_kerja_id].status = 'terhapus';
            reload_pengalaman_kerja_table(pengalaman_kerja_key);
        });
    });
    
    $$(".edit_anggota").on('click', function () {
        pengalaman_kerja_id = $(this).data("id");
        app.dialog.confirm('Apakah anda yakin akan merubah data?', function () {
          popup_tambah_pengalaman_kerja();
          $$("#tambah_pengalaman_kerja").attr("data-id", pengalaman_kerja_id);
          $$("input[name='jabatan']").val(pengalaman_kerja_key[pengalaman_kerja_id].jabatan);
          $$("input[name='uraian_tugas']").val(pengalaman_kerja_key[pengalaman_kerja_id].uraian_tugas);
          $$("input[name='lama_kerja']").val(pengalaman_kerja_key[pengalaman_kerja_id].lama_kerja);
          $$("input[name='pemberi_kerja']").val(pengalaman_kerja_key[pengalaman_kerja_id].pemberi_kerja);
        });
    });
}