var perceraian = {
  path: '/tipe-d/perceraian/',
  url: './pages/tipe-d/pengadilan_agama/perceraian.html',
  name: 'perceraian',
  on: {
    pageInit: function () {
      $$('#btnnew').hide();
      if (datauser.role_id == '4') {
        $$('#btnnew').show();
      }

      app.dialog.preloader('Loading...');
      var datatables = $('#datatables').DataTable({
        serverSide: true,
        ajax: {
          url: site_url_mobile_layanan + '/perceraian/get_data/0',
          data: iamthedoor,
          type: 'GET'
        },
        columns: [
          { data: 'id' },
          { data: 'nomor_putusan_pa' },
          { data: 'nik_penggugat' },
          { data: 'nama_penggugat' },
          { data: 'nik_tergugat' },
          { data: 'nama_tergugat' },
          { data: 'status' },
        ],
        initComplete: function (settings, json) {
          app.dialog.close();
          $$('#datatables_length').hide();
          $$('#datatables_filter').hide();
        },
        rowCallback: function (row, data) {
          $('td:eq(6)', row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px; color:white;">Bisa Diambil</span>');
          if (data.status) {
            var color = '#17A05E';
            if (data.status == 2) {
              var status = 'Ditolak';
              var color = '#DE4E42';
            }
            if (data.status == 0) {
              var status = 'Menunggu';
              var color = '#FF9800';
            }
            if (data.status == 3) {
              var status = 'Diterima';
              var color = '#17A05E';
            }
            if (data.status == 1) {
              var status = 'Selesai';
              var color = '#17A05E';
            }
            $('td:eq(6)', row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px; color:white;">' + status + '</span>');

            if (status == 'Menunggu') {
              $('td:eq(0)', row).html('<a href="/tipe-d/edit_perceraian/' + data.id + '/edit/" class="button button-small button-fill color-blue">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');
            } else {
              $('td:eq(0)', row).html('<a href="/tipe-d/edit_perceraian/' + data.id + '/view/" class="button button-small button-fill color-green">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">zoom_in</i> Lihat</a>');
            }

            $('td:eq(1)', row).html(isset(data.nomor_putusan_pa, '-'));
          }
        }
      });

      var statusselect = app.smartSelect.create({
        el: '.statusselect',
        on: {
          close: function () {
            app.dialog.preloader('Loading...');
            datatables.context[0].ajax.url = site_url_mobile_layanan + '/perceraian/get_data/' + $$('#statusselect').val();
            $('#datatables').DataTable().ajax.reload(function (json) {
              app.dialog.close();
              if (json.data) {
              } else {
                app.dialog.close();
                app.dialog.alert('Data tidak dapat ditemukan');
              }
            });
          }
        }
      });
    }
  }
};

var new_perceraian = {
  path: '/tipe-d/new_perceraian/',
  url: './pages/tipe-d/pengadilan_agama/new_perceraian.html',
  name: 'new_perceraian',
  on: {
    pageInit: function () {
      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/perceraian/get_create_form', iamthedoor, function (data) {
        // Kelurahan
        var kelurahan_dropdown = '';
        $.each(data.kelurahan, function (index, value) {
          kelurahan_dropdown += '<option value="' + index + '">' + value + '</option>';
        });
        $$('#kelurahan').html(kelurahan_dropdown);
        $$('#kelurahan_tergugat').html(kelurahan_dropdown);

        // Kecamatan
        var kecamatan_dropdown = '';
        $.each(data.kecamatan, function (index, value) {
          kecamatan_dropdown += '<option value="' + index + '">' + value + '</option>';
        });
        $$('#kecamatan').html(kecamatan_dropdown);
        $$('#kecamatan_tergugat').html(kecamatan_dropdown);

        // Golongan darah
        var goldar_dropdown = '';
        $.each(data.golongan_darah, function (index, value) {
          goldar_dropdown += '<option value="' + index + '">' + value + '</option>';
        });
        $$('#gol_darah_penggugat').html(goldar_dropdown);
        $$('#gol_darah_tergugat').html(goldar_dropdown);

        // Hubungan kel
        var hubungan_kel_dropdown = '';
        $.each(data.hubungan, function (index, value) {
          hubungan_kel_dropdown += '<option value="' + index + '">' + value + '</option>';
        });
        $$('#hubungan_kel_penggugat').html(hubungan_kel_dropdown);
        $$('#hubungan_kel_tergugat').html(hubungan_kel_dropdown);

        // Kelainan fisik dan mental
        var kelainan_dropdown = '';
        $.each(data.kelainan, function (index, value) {
          kelainan_dropdown += '<option value="' + index + '">' + value + '</option>';
        });
        $$('#kelainan_penggugat').html(kelainan_dropdown);
        $$('#kelainan_tergugat').html(kelainan_dropdown);

        // Kecacatan
        var kecacatan_dropdown = '';
        $.each(data.kecacatan, function (index, value) {
          kecacatan_dropdown += '<option value="' + index + '">' + value + '</option>';
        });
        $$('#penyandang_cacat_penggugat').html(kecacatan_dropdown);
        $$('#penyandang_cacat_tergugat').html(kecacatan_dropdown);

        // Pendidikan terakhir
        var pendidikan_dropdown = '';
        $.each(data.pendidikan, function (index, value) {
          pendidikan_dropdown += '<option value="' + index + '">' + value + '</option>';
        });
        $$('#pendidikan_terakhir_penggugat').html(pendidikan_dropdown);
        $$('#pendidikan_terakhir_tergugat').html(pendidikan_dropdown);

        // Pekerjaan
        var pekerjaan_dropdown = '';
        $.each(data.pekerjaan, function (index, value) {
          pekerjaan_dropdown += '<option value="' + index + '">' + value + '</option>';
        });
        $$('#jenis_pekerjaan_penggugat').html(pekerjaan_dropdown);
        $$('#jenis_pekerjaan_tergugat').html(pekerjaan_dropdown);

        $$('#kelurahan').val(data.user_cred.kelurahan_id);
        $$('#kecamatan').val(data.user_cred.kecamatan_id);
        $$('#kelurahan_tergugat').val(data.user_cred.kelurahan_id);
        $$('#kecamatan_tergugat').val(data.user_cred.kecamatan_id);

        $$('#kota_penggugat').on('change', function () {
          if ($$('#kota_penggugat').val() == 'LUAR SIDOARJO') {
            $$('#kelurahan').html('<option value="901">LUAR SIDOARJO</option>').change();
            $$('#kecamatan').html('<option value="901">LUAR SIDOARJO</option>').change();
          } else {
            $$('#kecamatan').html(kecamatan_dropdown).change();
            get_kelurahan_new('10', '#kelurahan');
          }
        });
        $$('#kota_tergugat').on('change', function () {
          if ($$('#kota_tergugat').val() == 'LUAR SIDOARJO') {
            $$('#kelurahan_tergugat').html('<option value="901">LUAR SIDOARJO</option>').change();
            $$('#kecamatan_tergugat').html('<option value="901">LUAR SIDOARJO</option>').change();
          } else {
            $$('#kecamatan_tergugat').html(kecamatan_dropdown).change();
            get_kelurahan_new('10', '#kelurahan_tergugat');
          }
        });
        $$('#kecamatan').on('change', function () {
          if ($$('#kecamatan').val() == '901') {
            $$('#kota_penggugat').val('LUAR SIDOARJO');
            $$('#kelurahan').html('<option value="901">LUAR SIDOARJO</option>').change();
          } else {
            get_kelurahan_new($$('#kecamatan').val(), '#kelurahan');
          }
        });
        $$('#kecamatan_tergugat').on('change', function () {
          if ($$('#kecamatan_tergugat').val() == '901') {
            $$('#kota_tergugat').val('LUAR SIDOARJO');
            $$('#kelurahan_tergugat').html('<option value="901">LUAR SIDOARJO</option>').change();
          } else {
            get_kelurahan_new($$('#kecamatan_tergugat').val(), '#kelurahan_tergugat');
          }
        });
        $$('#jenis_kelamin_penggugat').on('change', function () {
          if ($$('#jenis_kelamin_penggugat').val() == 'Laki-Laki') {
            $$('#jenis_kelamin_tergugat').val('Perempuan');
          } else {
            $$('#jenis_kelamin_tergugat').val('Laki-Laki');
          }
        });
        $$('#jenis_kelamin_tergugat').on('change', function () {
          if ($$('#jenis_kelamin_tergugat').val() == 'Laki-Laki') {
            $$('#jenis_kelamin_penggugat').val('Perempuan');
          } else {
            $$('#jenis_kelamin_penggugat').val('Laki-Laki');
          }
        });

        if ($$('.bs-timepicker').length) {
          $('.bs-timepicker').timepicker();
        }

        // $$().val(new Date(''));

        get_berkas(data.berkas);

        app.dialog.close();
      }, 'json');

      $$('#simpan').on('click', function () {
        app.input.validateInputs('#new_perceraian');
        if ($$('#new_perceraian')[0].checkValidity() == true) {
          let form_data = app.form.convertToData('#new_perceraian');
          let filecode = new Array();
          $('.filecode').each((i, el) => filecode.push(el.value));
          let filedesc = new Array();
          $('.filedesc').each((i, el) => filedesc.push(el.value));

          let ajax_data = new Array();
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);
          ajax_data.push(filecode);
          ajax_data.push(filedesc);

          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/perceraian/create_perceraian', ajax_data, function (data) {
            app.dialog.close();
            if (data) {
              app.dialog.alert('Data Berhasil Disimpan');
              mainView.router.back();
              $('#datatables').DataTable().ajax.reload();
            } else {
              app.dialog.alert(data.desc);
            }
          }, function () {
            app.dialog.close();
            app.dialog.alert('Data Gagal Disimpan, Mohon Coba Lagi Nanti');
          }, 'json');
        } else {
          app.dialog.alert('Silahkan Lengkapi Semua Form dengan Benar');
        }
      });
    }
  }
};

var edit_perceraian = {
  path: '/tipe-d/edit_perceraian/:id/:tipe/',
  url: './pages/tipe-d/pengadilan_agama/edit_perceraian.html',
  name: 'edit_perceraian',
  on: {
    pageInit: function () {
      var id = mainView.router.currentRoute.params.id;
      var tipe = mainView.router.currentRoute.params.tipe;

      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/perceraian/find_data/' + id, iamthedoor, function (data) {
        if (data.perceraian.nomor_putusan_pa == null) {
          $$('.nomor_pa').hide();
        } else {
          tipe = 'view';
        }

        // Kelurahan
        var kelurahan_dropdown = '';
        $.each(data.kelurahan, function (index, value) {
          kelurahan_dropdown += '<option value="' + index + '">' + value + '</option>';
        });
        $$('#kelurahan').html(kelurahan_dropdown);
        $$('#kelurahan_tergugat').html(kelurahan_dropdown);

        // Kecamatan
        var kecamatan_dropdown = '';
        $.each(data.kecamatan, function (index, value) {
          kecamatan_dropdown += '<option value="' + index + '">' + value + '</option>';
        });
        $$('#kecamatan').html(kecamatan_dropdown);
        $$('#kecamatan_tergugat').html(kecamatan_dropdown);

        // Golongan darah
        var goldar_dropdown = '';
        $.each(data.golongan_darah, function (index, value) {
          goldar_dropdown += '<option value="' + index + '">' + value + '</option>';
        });
        $$('#gol_darah_penggugat').html(goldar_dropdown);
        $$('#gol_darah_tergugat').html(goldar_dropdown);

        // Hubungan kel
        var hubungan_kel_dropdown = '';
        $.each(data.hubungan, function (index, value) {
          hubungan_kel_dropdown += '<option value="' + index + '">' + value + '</option>';
        });
        $$('#hubungan_kel_penggugat').html(hubungan_kel_dropdown);
        $$('#hubungan_kel_tergugat').html(hubungan_kel_dropdown);

        // Kelainan fisik dan mental
        var kelainan_dropdown = '';
        $.each(data.kelainan, function (index, value) {
          kelainan_dropdown += '<option value="' + index + '">' + value + '</option>';
        });
        $$('#kelainan_penggugat').html(kelainan_dropdown);
        $$('#kelainan_tergugat').html(kelainan_dropdown);

        // Kecacatan
        var kecacatan_dropdown = '';
        $.each(data.kecacatan, function (index, value) {
          kecacatan_dropdown += '<option value="' + index + '">' + value + '</option>';
        });
        $$('#penyandang_cacat_penggugat').html(kecacatan_dropdown);
        $$('#penyandang_cacat_tergugat').html(kecacatan_dropdown);

        // Pendidikan terakhir
        var pendidikan_dropdown = '';
        $.each(data.pendidikan, function (index, value) {
          pendidikan_dropdown += '<option value="' + index + '">' + value + '</option>';
        });
        $$('#pendidikan_terakhir_penggugat').html(pendidikan_dropdown);
        $$('#pendidikan_terakhir_tergugat').html(pendidikan_dropdown);

        // Pekerjaan
        var pekerjaan_dropdown = '';
        $.each(data.pekerjaan, function (index, value) {
          pekerjaan_dropdown += '<option value="' + index + '">' + value + '</option>';
        });
        $$('#jenis_pekerjaan_penggugat').html(pekerjaan_dropdown);
        $$('#jenis_pekerjaan_tergugat').html(pekerjaan_dropdown);

        $$('#kota_penggugat').on('change', function () {
          if ($$('#kota_penggugat').val() == 'LUAR SIDOARJO') {
            $$('#kelurahan').html('<option value="901">LUAR SIDOARJO</option>').change();
            $$('#kecamatan').html('<option value="901">LUAR SIDOARJO</option>').change();
          } else {
            $$('#kecamatan').html(kecamatan_dropdown).change();
          }
        });
        $$('#kota_tergugat').on('change', function () {
          if ($$('#kota_tergugat').val() == 'LUAR SIDOARJO') {
            $$('#kelurahan_tergugat').html('<option value="901">LUAR SIDOARJO</option>').change();
            $$('#kecamatan_tergugat').html('<option value="901">LUAR SIDOARJO</option>').change();
          } else {
            $$('#kecamatan_tergugat').html(kecamatan_dropdown).change();
          }
        });
        $$('#kecamatan').on('change', function () {
          if ($$('#kecamatan').val() == '901') {
            $$('#kota_penggugat').val('LUAR SIDOARJO');
            $$('#kelurahan').html('<option value="901">LUAR SIDOARJO</option>').change();
          } else {
            get_kelurahan_new($$('#kecamatan').val(), '#kelurahan');
          }
        });
        $$('#kecamatan_tergugat').on('change', function () {
          if ($$('#kecamatan_tergugat').val() == '901') {
            $$('#kota_tergugat').val('LUAR SIDOARJO');
            $$('#kelurahan_tergugat').html('<option value="901">LUAR SIDOARJO</option>').change();
          } else {
            get_kelurahan_new($$('#kecamatan_tergugat').val(), '#kelurahan_tergugat');
          }
        });
        $$('#jenis_kelamin_penggugat').on('change', function () {
          if ($$('#jenis_kelamin_penggugat').val() == 'Laki-Laki') {
            $$('#jenis_kelamin_tergugat').val('Perempuan');
          } else {
            $$('#jenis_kelamin_tergugat').val('Laki-Laki');
          }
        });
        $$('#jenis_kelamin_tergugat').on('change', function () {
          if ($$('#jenis_kelamin_tergugat').val() == 'Laki-Laki') {
            $$('#jenis_kelamin_penggugat').val('Perempuan');
          } else {
            $$('#jenis_kelamin_penggugat').val('Laki-Laki');
          }
        });

        if ($$('.bs-timepicker').length) {
          $('.bs-timepicker').timepicker();
        }

        // set data keluarga penggugat
        $$('#nik_kepala_kk_penggugat').val(isset(data.perceraian.nik_kepala_kk_penggugat, data.perceraian.nik_penggugat));
        $$('#kepala_kk_penggugat').val(isset(data.perceraian.kepala_kk_penggugat, data.perceraian.nama_penggugat));
        $$('#alamat_kk_penggugat').val(data.perceraian.alamat_kk_penggugat);
        $$('#rt_penggugat').val(data.perceraian.rt_penggugat);
        $$('#rw_penggugat').val(data.perceraian.rw_penggugat);
        $$('#kodepos_kk_penggugat').val(data.perceraian.kodepos_kk_penggugat);
        $$('#dusun_penggugat').val(data.perceraian.dusun_penggugat);
        $$('#telepon_kk_penggugat').val(isset(data.perceraian.telepon_kk_penggugat, data.perceraian.no_telp_penggugat));

        // set data individu penggugat
        $$('#nik_penggugat').val(data.perceraian.nik_penggugat);
        $$('#no_kk_penggugat').val(data.perceraian.no_kk_penggugat);
        $$('#nama_penggugat').val(data.perceraian.nama_penggugat);
        $$('#jenis_kelamin_penggugat').val(data.perceraian.jenis_kelamin_penggugat);
        $$('#tempat_lahir_penggugat').val(data.perceraian.tempat_lahir_penggugat);
        $$('#tanggal_lahir_penggugat').val(data.perceraian.tanggal_lahir_penggugat);
        $$('#alamat_penggugat').val(data.perceraian.alamat_penggugat);
        $$('#kota_penggugat').val(data.perceraian.kota_penggugat);
        $$('#kecamatan').val(data.perceraian.kecamatan);
        $$('#kelurahan').val(data.perceraian.kelurahan);
        $$('#email_pelapor').val(data.perceraian.email_pelapor);
        $$('#no_telp_penggugat').val(data.perceraian.no_telp_penggugat);
        $$('#no_paspor_penggugat').val(data.perceraian.no_paspor_penggugat);
        $$('#tgl_berakhir_paspor_penggugat').val(data.perceraian.tgl_berakhir_paspor_penggugat);
        $$('#gol_darah_penggugat').val(data.perceraian.gol_darah_penggugat);
        $$('#jam_kelahiran_penggugat').val(data.perceraian.jam_kelahiran_penggugat);
        $$('#no_akta_lahir_penggugat').val(data.perceraian.no_akta_lahir_penggugat);
        $$('#agama_penggugat').val(data.perceraian.agama_penggugat);
        $$('#hubungan_kel_penggugat').val(data.perceraian.hubungan_kel_penggugat);
        $$('#kelainan_penggugat').val(data.perceraian.kelainan_penggugat);
        $$('#penyandang_cacat_penggugat').val(data.perceraian.penyandang_cacat_penggugat);
        $$('#pendidikan_terakhir_penggugat').val(data.perceraian.pendidikan_terakhir_penggugat);
        $$('#jenis_pekerjaan_penggugat').val(data.perceraian.jenis_pekerjaan_penggugat);

        // set data orang tua penggugat
        $$('#nik_ibu_penggugat').val(data.perceraian.nik_ibu_penggugat);
        $$('#nama_ibu_penggugat').val(data.perceraian.nama_ibu_penggugat);
        $$('#nik_ayah_penggugat').val(data.perceraian.nik_ayah_penggugat);
        $$('#nama_ayah_penggugat').val(data.perceraian.nama_ayah_penggugat);

        // set data administrasi penggugat
        $$('#ketua_rt_penggugat').val(data.perceraian.ketua_rt_penggugat);
        $$('#ketua_rw_penggugat').val(data.perceraian.ketua_rw_penggugat);

        // set data catatan tambahan penggugat
        $$('#keterangan_penggugat').val(data.perceraian.keterangan_penggugat);

        // set data keluarga tergugat
        $$('#nik_kepala_kk_tergugat').val(isset(data.perceraian.nik_kepala_kk_tergugat, data.perceraian.nik_tergugat));
        $$('#kepala_kk_tergugat').val(isset(data.perceraian.kepala_kk_tergugat, data.perceraian.nama_tergugat));
        $$('#alamat_kk_tergugat').val(data.perceraian.alamat_kk_tergugat);
        $$('#rt_tergugat').val(data.perceraian.rt_tergugat);
        $$('#rw_tergugat').val(data.perceraian.rw_tergugat);
        $$('#kodepos_kk_tergugat').val(data.perceraian.kodepos_kk_tergugat);
        $$('#dusun_tergugat').val(data.perceraian.dusun_tergugat);
        $$('#telepon_kk_tergugat').val(isset(data.perceraian.telepon_kk_tergugat, data.perceraian.telepon_kk_tergugat));

        // set data individu tergugat
        $$('#nik_tergugat').val(data.perceraian.nik_tergugat);
        $$('#no_kk_tergugat').val(data.perceraian.no_kk_tergugat);
        $$('#nama_tergugat').val(data.perceraian.nama_tergugat);
        $$('#jenis_kelamin_tergugat').val(data.perceraian.jenis_kelamin_tergugat);
        $$('#tempat_lahir_tergugat').val(data.perceraian.tempat_lahir_tergugat);
        $$('#tanggal_lahir_tergugat').val(data.perceraian.tanggal_lahir_tergugat);
        $$('#alamat_tergugat').val(data.perceraian.alamat_tergugat);
        $$('#kota_tergugat').val(data.perceraian.kota_tergugat);
        $$('#kecamatan_tergugat').val(data.perceraian.kecamatan_tergugat);
        $$('#kelurahan_tergugat').val(data.perceraian.kelurahan_tergugat);
        $$('#email_tergugat').val(data.perceraian.email_tergugat);
        $$('#no_telp_tergugat').val(data.perceraian.no_telp_tergugat);
        $$('#no_paspor_tergugat').val(data.perceraian.no_paspor_tergugat);
        $$('#tgl_berakhir_paspor_tergugat').val(data.perceraian.tgl_berakhir_paspor_tergugat);
        $$('#gol_darah_tergugat').val(data.perceraian.gol_darah_tergugat);
        $$('#jam_kelahiran_tergugat').val(data.perceraian.jam_kelahiran_tergugat);
        $$('#no_akta_lahir_tergugat').val(data.perceraian.no_akta_lahir_tergugat);
        $$('#agama_tergugat').val(data.perceraian.agama_tergugat);
        $$('#hubungan_kel_tergugat').val(data.perceraian.hubungan_kel_tergugat);
        $$('#kelainan_tergugat').val(data.perceraian.kelainan_tergugat);
        $$('#penyandang_cacat_tergugat').val(data.perceraian.penyandang_cacat_tergugat);
        $$('#pendidikan_terakhir_tergugat').val(data.perceraian.pendidikan_terakhir_tergugat);
        $$('#jenis_pekerjaan_tergugat').val(data.perceraian.jenis_pekerjaan_tergugat);

        // set data orang tua tergugat
        $$('#nik_ibu_tergugat').val(data.perceraian.nik_ibu_tergugat);
        $$('#nama_ibu_tergugat').val(data.perceraian.nama_ibu_tergugat);
        $$('#nik_ayah_tergugat').val(data.perceraian.nik_ayah_tergugat);
        $$('#nama_ayah_tergugat').val(data.perceraian.nama_ayah_tergugat);

        // set data administrasi tergugat
        $$('#ketua_rt_tergugat').val(data.perceraian.ketua_rt_tergugat);
        $$('#ketua_rw_tergugat').val(data.perceraian.ketua_rw_tergugat);

        // set data catatan tambahan tergugat
        $$('#keterangan_tergugat').val(data.perceraian.keterangan_tergugat);

        // set data perceraian
        $$('#yang_mengajukan_cerai').val(data.perceraian.yang_mengajukan_cerai);
        $$('#nomor_akta_nikah').val(data.perceraian.nomor_akta_nikah);
        $$('#tanggal_akta_nikah').val(data.perceraian.tanggal_akta_nikah);
        $$('#keterangan_kua').val(data.perceraian.keterangan_kua);
        $$('#nama_lembaga_yang_menerbitkan').val(data.perceraian.nama_lembaga_yang_menerbitkan);
        $$('#sebab_perceraian').val(data.perceraian.sebab_perceraian);
        $$('#tanggal_buat').val(data.perceraian.tanggal_buat);
        $$('#nomor_akta_cerai').val(data.perceraian.nomor_akta_cerai);
        $$('#tanggal_akta_cerai').val(data.perceraian.tanggal_akta_cerai);
        $$('#nomor_putusan_pa').val(data.perceraian.nomor_putusan_pa);
        $$('#tanggal_putusan_pa').val(data.perceraian.tanggal_putusan_pa);
        $$('#peradilan_yang_memutuskan').val(data.perceraian.peradilan_yang_memutuskan);
        $$('#tempat_kedudukan').val(data.perceraian.tempat_kedudukan);

        // set data keterangan
        $$('#keterangan_tambahan').val(data.perceraian.keterangan_tambahan);

        // set data lampiran
        get_berkas(data.berkas, data.attachments, tipe);

        if (tipe == 'view') {
          $$('#btndeletelayanan').remove();
          $$('.save_button').remove();
          $('#edit_perceraian input').prop('readonly', true);
          $('#edit_perceraian select').prop('disabled', true);
        }

        app.dialog.close();
      }, 'json');

      $$('#simpan').on('click', function () {
        app.input.validateInputs('#edit_perceraian');
        if ($$('#edit_perceraian')[0].checkValidity() == true) {
          let form_data = app.form.convertToData('#edit_perceraian');
          let filecode = new Array();
          $('.filecode').each((i, el) => filecode.push(el.value));
          let filedesc = new Array();
          $('.filedesc').each((i, el) => filedesc.push(el.value));

          let ajax_data = new Array();
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);
          ajax_data.push(filecode);
          ajax_data.push(filedesc);

          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/perceraian/edit_perceraian/' + id, ajax_data, function (data) {
            app.dialog.close();
            if (data) {
              app.dialog.alert('Data Berhasil Disimpan');
              mainView.router.back();
              $('#datatables').DataTable().ajax.reload();
            } else {
              app.dialog.alert(data.desc);
            }
          }, function () {
            app.dialog.close();
            app.dialog.alert('Data Gagal Disimpan, Mohon Coba Lagi Nanti');
          }, 'json');
        } else {
          app.dialog.alert('Silahkan Lengkapi Semua Form dengan Benar');
        }
      });

      $$('#deletelayanan').on('click', function () {
        app.dialog.confirm('Apakah anda yakin Menghapus Data ini?', function () {
          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/perceraian/delete_layanan/' + id, iamthedoor, function (callback) {
            app.dialog.close();
            if (callback.success) {
              app.dialog.alert('Data Berhasil Dihapus');
              mainView.router.back();
              $('#datatables').DataTable().ajax.reload();
            } else {
              app.dialog.alert(callback.desc);
            }
          }, function () {
            app.dialog.close();
            app.dialog.alert('Data Gagal Dihapus, Mohon Coba Lagi Nanti');
          }, 'json');
        });
      });
    }
  }
};