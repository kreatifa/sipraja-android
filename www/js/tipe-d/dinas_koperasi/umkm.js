var umkm = {
  path: '/tipe-d/dinas_koperasi/umkm/',
  url: './pages/tipe-d/dinas_koperasi/umkm.html',
  name: 'umkm',
  on: {
    pageInit: function () {
      app.dialog.preloader('Loading...');
      var datatables = $('#datatables').DataTable({
        serverSide: true,
        ajax: {
          url: site_url_mobile_layanan + '/umkm/get_data/1',
          data: iamthedoor,
          type: 'GET'
        },
        columns: [
          { data: 'tgl_buat' },
          { data: 'nama_pemilik' },
          { data: 'nib' },
          { data: 'kelembagaan' },
          { data: 'status_usaha' },
          { data: 'nama_usaha' },
          { data: 'jenis_usaha' },
          { data: 'jenis_usaha' },
          { data: 'jenis_usaha' },
        ],
        initComplete: function (settings, json) {
          app.dialog.close();
          $$('#datatables_length').hide();
          $$('#datatables_filter').hide();
          // $$('#datatables_paginate').hide();
        },
        "rowCallback": function (row, data) {
          $('td:eq(7)', row).html('<a href="/tipe-f/seller_marketplace/' + data.kode_toko + '" class="button button-small button-fill color-green">Seller Market Place</a>');
          if (datauser.role_id == '4') {
            $('td:eq(0)', row).html('<a href="/tipe-d/dinas_koperasi/umkm_edit/' + data.id + '" class="button button-small button-fill color-blue">' +
              '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');
          }

          var usaha = '';
          if (data.status_usaha == 0) {
            usaha += 'Usaha';
          } else if (data.status_usaha == 1) {
            usaha += 'Perorangan';
          }
          $('td:eq(4)', row).html(usaha);

          if (data.singkron_siapkerja == '0') {
            $("td:eq(8)", row).html('<button type="submit" class="button button-fill color-blue singkron" data-id="' + data.id + '">' + '<i class="icon f7-icons" style="font-size: 12pt;">arrow_clockwise_circle_fill</i> Sinkronisasi Siap Kerja</button>');
          } else {
            $('td:eq(8)', row).html('<a href="" class="button button-small button-fill color-blue">' +
              '<i class="icon f7-icons" style="font-size: 12pt;">checkmark_alt_circle</i></a>');
          }
        }
      });
      $("#datatables").on("click", ".singkron", function () {
        var id = $(this).data("id");
        app.dialog.confirm("Apakah anda ingin sinkronisasi ke siap kerja?", function () {
          app.request.get(site_url_mobile_layanan + "/umkm/get_singkron/" + id, iamthedoor, function (data) {
            var ajax_data = [];
            ajax_data.push(iamthedoor);
            ajax_data.push(data);
            app.request.post(site_url_mobile_layanan + "/umkm/save_singkron/" + id, ajax_data, function (data) {
              // $$("#perpanjangan").html(data);
            }, "json");
          }, "json");
          app.dialog.alert("Data anda sudah disingkron ke siap kerja.");
          mainView.router.back();
          $("#datatables").DataTable().ajax.reload();
        });
      });
    }
  }
}

var umkm_edit = {
  path: '/tipe-d/dinas_koperasi/umkm_edit/:id',
  url: './pages/tipe-d/dinas_koperasi/umkm_edit.html',
  name: 'umkm_edit',
  on: {
    pageInit: function () {
      tablename = "umkm";
      // var this_user_is_the_last_index = false;
      var id = mainView.router.currentRoute.params.id;
      // var tipe = mainView.router.currentRoute.params.tipe;
      $$("#addformupload").on("touchend", addrow);
      var tgl_terbit_ijin_usaha = app.calendar.create({
        inputEl: '#tgl_terbit_ijin_usaha',
        openIn: 'customModal',
        header: true,
        footer: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var tgl_berdiri = app.calendar.create({
        inputEl: '#tgl_berdiri',
        openIn: 'customModal',
        header: true,
        footer: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var outdate = 2015
      var date = new Date()
      var nowYear = date.getFullYear()
      for (outdate; outdate <= nowYear; outdate++) {
        $$('[name="tahun_pendataan"]').append(`<option value="${outdate}">${outdate}</option>`)
      }
      var data = []
      data.push(iamthedoor)
      // if (tipe == 'edit') {
      $$("#addformupload").show();
      $$("#addformupload").on("touchend", addrow);
      // }

      var maplet; var maplayer;
      app.request.post(site_url_mobile_layanan + '/user_support/get_kecamatan', function (callback) {
        let options = '<option data-lat="-7.4497718" data-lng="112.7015495" selected style="display: none"> -- PILIH KECAMATAN BERIKUT -- </option>';
        for (var i = 0; i < callback.length; i++) {
          options += '<option value="' + callback[i].kode +
            '" data-lat="' + callback[i].latitude +
            '" data-lng="' + callback[i].longitude + '">' +
            callback[i].nama +
            '</option>';
        }
        $$('[name="kecamatan_pemilik"]').html(options);
      }, 'json');

      $('#kelembagaan').on('change', function () {
        if (this.value == 'Lain Lainnya') {
          $('.nib').hide();
          $('.tgl_terbit_ijin_usaha').hide();
          $('.tgl_berdiri').hide();
          $('.tahun_pendataan').hide();
          $('.npwp').hide();
          $('.npwpd').hide();
          $('.pkp').hide();

          $('#tahun_pendataan').removeAttr('required');
          $('#tgl_berdiri').removeAttr('required');
          $('#nib').val('');
          $('#tgl_terbit_ijin_usaha').val('');
          $('#tgl_berdiri').val('');
          $('#tahun_pendataan').val('');
          $('#npwp').val('');
          $('#npwpd').val('');
          $('#pkp').val('').trigger('change');
          $('#tahun_pendataan').val('').trigger('change');
        } else if (this.value != 'Usaha Dagang (UD)' && this.value != 'Lain Lainnya') {
          $('.pkp').show();
          $('.nib').show();
          $('.tgl_terbit_ijin_usaha').show();
          $('.tgl_berdiri').show();
          $('.tahun_pendataan').show();
          $('.npwp').show();
          $('.npwpd').show();
        } else {
          $('#pkp').val('').trigger('change');
          $('.pkp').hide();

          $('.nib').show();
          $('.tgl_terbit_ijin_usaha').show();
          $('.tgl_berdiri').show();
          $('.tahun_pendataan').show();
          $('.npwp').show();
          $('.npwpd').show();
        }
      });

      app.dialog.preloader('Loading...');
      app.request.post(`${site_url_mobile_layanan}/umkm/get_id/${id}`, data, function (data) {
        if (data.status_usaha == 1) {
          $('.kelembagaan').remove();
          $('.izin_dimiliki').remove();
          $('.skala_perusahaan').remove();
        }

        if (data.status == 'Perorangan' || data.status == 'PeroranganUMKM') {
          // kelembagaan, izin yang dimiliki, skala usaha hidden
          $('.kelembagaan').remove();
          $('.izin_dimiliki').remove();
          $('.skala_perusahaan').remove();

          $('#kelembagaan').removeAttr('required');
          $('#nib').removeAttr('required');
          $('#tgl_terbit_ijin_usaha').removeAttr('required');
          $('#jenis_usaha_produk').removeAttr('required');
          $('#npwp').removeAttr('required');
          $('#npwpd').removeAttr('required');
          $('#izin_dimiliki').removeAttr('required');
          $('#skala_perusahaan').removeAttr('required');
        }
        app.dialog.close();

        if (data.status_usaha == 1) {
          $$('[name="state"]').val('Perorangan');
        } else {
          $$('[name="state"]').val('Lowongan');
        }
        $$('[name="nik_pemilik"]').val(data.nik_pemilik)
        $$('[name="nama_pemilik"]').val(data.nama_pemilik)
        $$('[name="alamat_pemilik"]').val(data.alamat_pemilik)
        $$(`[name="kecamatan_pemilik"]`).val(data.kecamatan_pemilik);
        get_kelurahan_reg(data.kecamatan_pemilik, '[name="kelurahan_pemilik"]', data.kelurahan_pemilik);

        $$(`[name="kelembagaan"]`).val(data.kelembagaan);
        $$('[name="nib"]').val(data.nib);
        tgl_terbit_ijin_usaha.setValue([new Date(data.tgl_terbit_ijin_usaha)]);
        $$('[name="nama_usaha"]').val(data.nama_usaha);
        tgl_berdiri.setValue([new Date(data.tgl_berdiri)]);
        $$(`[name="telp"]`).val(data.telp);
        $$(`[name="pkp"]`).val(data.pkp);
        $$(`[name="alamat_usaha"]`).val(data.alamat_usaha);
        get_kecamatan_new(data.kabupaten_usaha, '#kecamatan_usaha', data.kecamatan_usaha);
        $$('#kecamatan_usaha').on('change', function () {
          get_kelurahan_new($$('#kecamatan_usaha').val(), '#kelurahan_usaha', data.kelurahan_usaha);
        });
        $$(`[name="npwp"]`).val(data.npwp);
        $$(`[name="npwpd"]`).val(data.npwpd);
        $$(`[name="modal_aset"]`).val(data.modal_aset);
        $$(`[name="omset"]`).val(data.omset);
        $$(`[name="tenaga_kerja"]`).val(data.tenaga_kerja);
        $$(`[name="tahun_pendataan"]`).val(data.tahun_pendataan);
        $$(`[name="izin_dimiliki"]`).val(data.izin_dimiliki);
        $$(`[name="skala_perusahaan"]`).val(data.skala_perusahaan);
        $$(`[name="market_place"]`).val(data.market_place);
        $$(`[name="deskripsi"]`).val(data.deskripsi);
        $$('#lat').val(data.lat);
        $$('#lng').val(data.lng);

        // $$('[name="tempat_lahir_pemohon"]').val(data.tempat_lahir)
        // $$('[name="tanggal_lahir_pemohon"]').val(data.tanggal_lahir)
        // $$('[name="jenis_kelamin_pemohon"]').val(data.jenis_kelamin)
        // $$('[name="telp_pemohon"]').val(data.telp_pemohon)
        // $$('[name="kecamatan_pemohon"]').val(data.nama_kecamatan)
        // $$('[name="kelurahan_pemohon"]').val(data.nama_kelurahan)
        // $$('[name="email_pemohon"]').val(data.email_pemohon)
        // $$(`[name="jenis_usaha"]`).val(data.jenis_usaha)
        // $$(`[name="kecamatan_usaha"]`).val(data.kecamatan_usaha);
        // get_kelurahan_reg(data.kecamatan_usaha, '[name="kelurahan_usaha"]', data.kelurahan_usaha);

        if (data.file_logo) {
          let logoId = parseInt(data.file_logo.id)
          var preview_files = '<a id="preview_logo_button" onclick="preview_logo(' + logoId + ')" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>';
          $$('.preview_logo').html(preview_files)
        }
        if (data.file_code !== null) {
          find_document(id, false);
        }
        if (!maplet) {
          var lat = ($('#lat').val() == '') ? '-7.4497718' : data.lat;
          var lng = ($('#lng').val() == '') ? '112.7015495' : data.lng;
          maplet = L.map('mapid', { minZoom: 2 }).setView([
            lat, lng
          ], 14);
          let osmLayer = new L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          });
          maplet.addLayer(osmLayer);
          maplayer = L.layerGroup().addTo(maplet);
          L.marker([data.lat, data.lng]).addTo(maplayer);
          maplet.on('click', function (evt) {
            maplayer.clearLayers();
            L.marker([evt.latlng.lat, evt.latlng.lng]).addTo(maplayer);
            $('#lat').val(evt.latlng.lat);
            $('#lng').val(evt.latlng.lng);
          });
        }
        if (datauser.role_id == '4') {
          $$("#btndeletelayanan").html('<a class="button button-round button-fill color-red" id="deletelayanan" style="margin-top: 10px;">' +
            '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Hapus Data</span></a>');
        }
      }, 'json')

      // $$('[name="kecamatan_usaha"]').on('change', function () {
      //   maplet.setView([$(this).find('option:selected').data('lat'), $(this).find('option:selected').data('lng')], 14);
      //   get_kelurahan_reg($$('[name="kecamatan_usaha"]').val(), '[name="kelurahan_usaha"]');
      // });

      // $$('[name="kecamatan_pemilik"]').on('change', function () {
      //   get_kelurahan_reg($$('[name="kecamatan_pemilik"]').val(), '[name="kelurahan_pemilik"]');
      // });

      $$('#btndeletelayanan').on('click', function () {
        app.dialog.confirm('Anda yakin untuk menghapus data ini?', 'Hapus', function () {
          var ajaxdata = [iamthedoor, id]
          app.request.post(`${site_url_mobile_layanan}/umkm/delete`, ajaxdata, function (data) {
            if (data) {
              app.dialog.close()
              app.dialog.alert('Data berhasil dihapus')
              mainView.router.back();
              $('#datatables').DataTable().ajax.reload();
            }
          }, function () {
            app.dialog.close()
            app.dialog.alert('Data gagal dihapus')
          }, 'json')
        }, function () {
          return false
        });
      })

      $$('#simpan').on('click', function () {
        var empty = true;
        // $('select').each(function () {
        //   if ($(this).val().includes('--')) {
        //     app.dialog.alert($(this).prev().text() + ' Belum Diisi')
        //     empty = false
        //     return false
        //   }
        // });
        if ($('#kelembagaan').val() == '') {
          app.dialog.alert('Kelembagaan Belum Diisi');
          empty = false
          return false
        }

        if ($('#kelembagaan').val() != 'Lain Lainnya') {
          if ($('#tahun_pendataan').val() == '') {
            app.dialog.alert('Tahun Pendataan Belum Diisi');
            empty = false
            return false
          }
        }

        if ($('#lat').val() == '' && $('#lng').val() == '') {
          app.dialog.alert('Lokasi Belum Ditandai')
          empty = false
          return false
        }
        app.input.validateInputs("#umkm_edit");
        if (empty) {
          if ($$('#umkm_edit')[0].checkValidity() == true) {
            mydata = app.form.convertToData("#umkm_edit");
            var filecode = []
            var keteranganid = []
            $('input[name^=keteranganid]').each(function () {
              keteranganid.push($(this).val());
            });
            $('input[name^=filecode]').each(function () {
              filecode.push($(this).val());
            });
            ajaxdata = []
            ajaxdata.push(iamthedoor)
            ajaxdata.push(mydata)
            ajaxdata.push(filecode)
            ajaxdata.push(keteranganid)
            app.request.post(`${site_url_mobile_layanan}/umkm/save_umkm/update/${id}`, ajaxdata, function (data) {
              if (data) {
                app.dialog.close()
                app.dialog.alert('Data berhasil disimpan')
                mainView.router.back();
                $('#datatables').DataTable().ajax.reload();
              } else {
                app.dialog.close()
                app.dialog.alert('Data gagal disimpan')
              }
            }, 'json')
          }
        }
      })

    }
  }

}

var umkm_new = {
  path: '/tipe-d/dinas_koperasi/umkm_new/:status',
  url: './pages/tipe-d/dinas_koperasi/umkm_new.html',
  name: 'umkm_new',
  on: {
    pageInit: function () {
      $$("#addformupload").on("touchend", addrow);
      let status = mainView.router.currentRoute.params.status;
      $('#state').val(status);

      $('[name="email"]').val(datauser.email);
      $('#kelembagaan').on('change', function () {
        if (this.value == 'Lain Lainnya') {
          $('.nib').hide();
          $('.tgl_terbit_ijin_usaha').hide();
          $('.tgl_berdiri').hide();
          $('.tahun_pendataan').hide();
          $('.npwp').hide();
          $('.npwpd').hide();
          $('.pkp').hide();

          $('#tahun_pendataan').removeAttr('required');
          $('#tgl_berdiri').removeAttr('required');
          $('#nib').val('');
          $('#tgl_terbit_ijin_usaha').val('');
          $('#tgl_berdiri').val('');
          $('#tahun_pendataan').val('');
          $('#npwp').val('');
          $('#npwpd').val('');
          $('#pkp').val('').trigger('change');
          $('#tahun_pendataan').val('').trigger('change');
        } else if (this.value != 'Usaha Dagang (UD)' && this.value != 'Lain Lainnya') {
          $('.pkp').show();
          $('.nib').show();
          $('.tgl_terbit_ijin_usaha').show();
          $('.tgl_berdiri').show();
          $('.tahun_pendataan').show();
          $('.npwp').show();
          $('.npwpd').show();
        } else {
          $('#pkp').val('').trigger('change');
          $('.pkp').hide();

          $('.nib').show();
          $('.tgl_terbit_ijin_usaha').show();
          $('.tgl_berdiri').show();
          $('.tahun_pendataan').show();
          $('.npwp').show();
          $('.npwpd').show();
        }
      });

      if (status == 'Perorangan' || status == 'PeroranganUMKM') {
        // kelembagaan, izin yang dimiliki, skala usaha hidden
        $('.kelembagaan').remove();
        $('.izin_dimiliki').remove();
        $('.skala_perusahaan').remove();

        $('#kelembagaan').removeAttr('required');
        $('#nib').removeAttr('required');
        $('#tgl_terbit_ijin_usaha').removeAttr('required');
        $('#jenis_usaha_produk').removeAttr('required');
        $('#npwp').removeAttr('required');
        $('#npwpd').removeAttr('required');
        $('#izin_dimiliki').removeAttr('required');
        $('#skala_perusahaan').removeAttr('required');
      }

      var outdate = 2015
      var date = new Date()
      var nowYear = date.getFullYear()
      for (outdate; outdate <= nowYear; outdate++) {
        $$('[name="tahun_pendataan"]').append(`<option value="${outdate}">${outdate}</option>`)
      }
      var tgl_terbit_ijin_usaha = app.calendar.create({
        inputEl: '#tgl_terbit_ijin_usaha',
        openIn: 'customModal',
        header: true,
        footer: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var tgl_berdiri = app.calendar.create({
        inputEl: '#tgl_berdiri',
        openIn: 'customModal',
        header: true,
        footer: true,
        dateFormat: 'dd-MM-yyyy',
      });
      var maplet; var maplayer;
      var lat = ($('#lat').val() == '') ? '-7.4497718' : $('#lat').val();
      var lng = ($('#lng').val() == '') ? '112.7015495' : $('#lng').val();
      app.request.post(site_url_mobile_layanan + '/user_support/get_kecamatan', function (callback) {
        // let options = '<option value="000" data-lat="-7.4497718" data-lng="112.7015495" selected style="display: none"> -- PILIH KECAMATAN BERIKUT -- </option>';
        // for (var i = 0; i < callback.length; i++) {
        //   options += '<option value="' + callback[i].kode +
        //     '" data-lat="' + callback[i].latitude +
        //     '" data-lng="' + callback[i].longitude + '">' +
        //     callback[i].nama +
        //     '</option>';
        // }
        // $$('[name="kecamatan_usaha"]').html(options);
        // $$('[name="kecamatan_pemilik"]').html(options);

        if (!maplet) {
          maplet = L.map('mapid', { minZoom: 2 }).setView([
            lat, lng
          ], 14);
          let osmLayer = new L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          });
          maplet.addLayer(osmLayer);
          maplayer = L.layerGroup().addTo(maplet);
          maplet.on('click', function (evt) {
            maplayer.clearLayers();
            L.marker([evt.latlng.lat, evt.latlng.lng]).addTo(maplayer);
            $('#lat').val(evt.latlng.lat);
            $('#lng').val(evt.latlng.lng);
          });
        }
      }, 'json');
      get_kecamatan_dom('[name="kecamatan_pemilik"]');
      $$('[name="kecamatan_pemilik"]').on('change', function () {
        get_kelurahan_dom($$('[name="kecamatan_pemilik"]').val(), '[name="kelurahan_pemilik"]');
      });

      get_provinsi_new('#provinsi_usaha');
      $$('#provinsi_usaha').on('change', function () {
        get_kabupaten_new($$('#provinsi_usaha').val(), '#kabupaten_usaha');
      });
      $$('#kabupaten_usaha').on('change', function () {
        get_kecamatan_new($$('#kabupaten_usaha').val(), '#kecamatan_usaha');
      });
      $$('#kecamatan_usaha').on('change', function () {
        get_kelurahan_new($$('#kecamatan_usaha').val(), '#kelurahan_usaha');
      });

      tgl_berdiri.setValue([new Date()])
      tgl_terbit_ijin_usaha.setValue([new Date()])
      $$('#simpan').on('click', function () {
        var empty = true;
        if ($('#kelembagaan').val() == '') {
          app.dialog.alert('Kelembagaan Belum Diisi');
          empty = false
          return false
        }

        if ($('#kelembagaan').val() != 'Lain Lainnya') {
          if ($('#tahun_pendataan').val() == '') {
            app.dialog.alert('Tahun Pendataan Belum Diisi');
            empty = false
            return false
          }
        }

        if ($('#lat').val() == '' && $('#lng').val() == '') {
          app.dialog.alert('Lokasi Belum Ditandai')
          empty = false
          return false
        }

        app.input.validateInputs("#umkm_new");
        if (empty) {
          if ($$('#umkm_new')[0].checkValidity() == true) {
            var filecode = []
            var keteranganid = []
            $('input[name^=keteranganid]').each(function () {
              keteranganid.push($(this).val());
            });
            $('input[name^=filecode]').each(function () {
              filecode.push($(this).val());
            });
            mydata = app.form.convertToData("#umkm_new");
            ajaxdata = []
            ajaxdata.push(iamthedoor)
            ajaxdata.push(mydata)
            ajaxdata.push(filecode)
            ajaxdata.push(keteranganid)
            app.request.post(`${site_url_mobile_layanan}/umkm/save_umkm`, ajaxdata, function (data) {
              if (data) {
                if (status == '0') {
                  app.dialog.close()
                  app.dialog.alert('Data berhasil disimpan')
                  mainView.router.back();
                  $('#datatables').DataTable().ajax.reload();
                } else {
                  app.dialog.close()
                  app.dialog.alert('Data berhasil disimpan')
                  mainView.router.back();
                  $('#buka_lowongan').DataTable().ajax.reload();
                }
              } else {
                app.dialog.close()
                app.dialog.alert('Data gagal disimpan')
              }
            }, 'json')
          }
        }
      })
    }
  }
}