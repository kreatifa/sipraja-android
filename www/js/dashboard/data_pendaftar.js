var data_pendaftar = {
  name: 'data_pendaftar',
  path: '/data_pendaftar/',
  url: './pages/dashboard/data_pendaftar.html',
  options: {
    transition: 'f7-parallax',
  },
  on: {
    pageInit: function () {
      $$('#tanggal_pendaftar').val(`${get_today_date()} - ${get_today_date()}`)
      $$('#layout_data').hide();
      // var chart_layout = { barmode: 'stack', bargroupgap: 0.1, height: 250, margin: { t: 10, b: 65, l: 30, r: 30 }, paper_bgcolor: 'rgba(0, 0, 0, 0)', yaxis: { fixedrange: true }, xaxis: { tickangle: -90 }, legend: { x: 0, y: 1.0, orientation: 'h' } };
      // var chart_config = { responsive: true, displaylogo: false, displayModeBar: false };
      var calendarChartMulai = app.calendar.create({
        inputEl: '#tanggal_pendaftar',
        openIn: 'customModal',
        dateFormat: 'yyyy-mm-dd',
        header: true, footer: true, rangePicker: true
      });
      app.dialog.preloader('Loading...');
      var datatables = $('#datatables').DataTable({
        ajax: {
          url: site_url_mobile + '/dashboard_mobile/pendaftar/count_new',
          data: [iamthedoor, { 'tanggal': $$('#tanggal_pendaftar').val() }],
          type: 'POST'
        },
        columns: [
          { data: 'nama' },
          { data: 'jumlah' },
          { data: 'verif' },
          { data: 'non_verif' },
        ],
        searching: false,
        paging: false,
        ordering: false,
        info: false,
        initComplete: function (settings, json) {
          app.dialog.close();
          $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
        },
        rowCallback: function (row, data) {
        }
      });
      app.request.post(site_url_mobile + '/dashboard_mobile/pendaftar/kecamatan_kelurahan', iamthedoor, function (response) {
        var list_kecamatan = '<option value="000">SEMUA</option>';

        response.kecamatan.forEach(function (value, index) {
          list_kecamatan += '<option value="' + value.kode + '">' + value.nama + '</option>';
        });
        $$('#kecamatan_pendaftar').html(list_kecamatan).change()
      }, 'json');

      $$('#kecamatan_pendaftar').on('change', function () {
        var list_kelurahan = '';
        if ($$(this).val() != '000') {
          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile + '/dashboard_mobile/pendaftar/kelurahan/' + $$(this).val(), iamthedoor, function (response) {
            app.dialog.close();
            if (response.status) {
              response.kelurahan.forEach(function (value, index) {
                list_kelurahan += '<option value="' + value.kode + '">' + value.nama + '</option>';
              });
            }
            $$('#kelurahan_pendaftar').html(list_kelurahan).change();
          }, 'json');
        } else {
          list_kelurahan += '<option value=""> - </option>'
          $$('#kelurahan_pendaftar').html(list_kelurahan).change();
        }
      });
      $$('#cari_data').on('click', function (response) {
        // if (getDiffDate($$('#tanggal_pendaftar').val(), 14)) {
        //   app.dialog.alert('Durasi tanggal yang dipilih tidak boleh melebihi 15 hari');
        //   return false;
        // }

        var post = {
          'tanggal': $$('#tanggal_pendaftar').val(),
          'kecamatan': $$('#kecamatan_pendaftar').val(),
          'kelurahan': $$('#kelurahan_pendaftar').val()
        }
        datatables.context[0].ajax.data = [iamthedoor, post];
        app.dialog.preloader('Loading...');
        $('#datatables').DataTable().ajax.reload(function (json) {
          if (json.data) {
            app.dialog.close();
            let header = "KECAMATAN";
            if (post['kecamatan'] != '000') {
              header = "KELURAHAN";
            }
            $('th:first').text(header);
            $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
          } else {
            app.dialog.close();
            app.dialog.alert('Data tidak dapat ditemukan');
          }
        });
        app.request.post(site_url_mobile + '/dashboard_mobile/pendaftar/count', [iamthedoor, post], function (response) {
          app.dialog.close();

          if (response.status) {
            $$('#layout_data').show();

            $$('#pendaftaran_kec').html(response.kecamatan);
            $$('#pendaftaran_kel').html(response.kelurahan);

            var grafik1 = { x: [], y: [], name: 'Terverifikasi', type: 'bar' };
            var grafik2 = { x: [], y: [], name: 'Menunggu Verifikasi', type: 'bar' };
            var chart_data = [grafik1, grafik2];
            Plotly.newPlot('chart_pendaftar', chart_data, chart_layout, chart_config);
          }
        }, 'json');
      });

      $$('#lihat_grafik').on('click', function () {
        // if (getDiffDate($$('#tanggal_pendaftar').val(), 14)) {
        //   app.dialog.alert('Durasi tanggal yang dipilih tidak boleh melebihi 15 hari');
        //   return false;
        // }

        // var post = {
        //   'tanggal': $$('#tanggal_pendaftar').val(),
        //   'kecamatan': $$('#kecamatan_pendaftar').val(),
        //   'kelurahan': $$('#kelurahan_pendaftar').val()
        // }

        // app.dialog.preloader('Loading...');
        // app.request.post(site_url_mobile + '/dashboard_mobile/pendaftar/grafik', [iamthedoor, post], function (response) {
        //   app.dialog.close();
        //   var grafik1 = { x: [], y: [], name: 'Terverifikasi', type: 'bar' };
        //   var grafik2 = { x: ['.' + $$('#tanggal_pendaftar').val().split(' - ')[0]], y: [0], name: 'Menunggu Verifikasi', type: 'bar' };

        //   if (response.status) {
        //     var data_pendaftar_verif = 0;
        //     response.verif.forEach(function (val, index) {
        //       grafik1.x.push('.' + val.tgl_buat);
        //       grafik1.y.push(val.jumlah);
        //       data_pendaftar_verif = data_pendaftar_verif + parseInt(val.jumlah);
        //     });
        //     $$('#jml_verif').html(data_pendaftar_verif);
        //   } else {
        //     app.dialog.alert('Terjadi kesalahan. Silahkan ulangi lagi nanti.');
        //   }

        //   var chart_data = [grafik1, grafik2];
        //   Plotly.newPlot('chart_pendaftar', chart_data, chart_layout, chart_config);
        // }, 'json');
      });
    }
  }
}