var kematian = {
  name: 'kematian',
  path: '/kematian/',
  url: './pages/dashboard/kematian.html',
  options: {
    transition: 'f7-parallax',
  },
  on: {
    pageInit: function () {
      var chart_layout = { barmode: 'stack', bargroupgap: 0.1, height: 250, margin: { t: 10, b: 65, l: 30, r: 30 }, paper_bgcolor: 'rgba(0, 0, 0, 0)', yaxis: { fixedrange: true }, xaxis: { tickangle: -90 }, legend: { x: 0, y: 1.0, orientation: 'h' } };
      var chart_config = { responsive: true, displaylogo: false, displayModeBar: false };
      var calendarChartMulai = app.calendar.create({
        inputEl: '#tanggal_kematian',
        openIn: 'customModal',
        dateFormat: 'dd-mm-yyyy',
        header: true, footer: true, rangePicker: true
      });

      $$('#tanggal_kematian').val(`${get_today_date()} - ${get_today_date()}`)
      app.dialog.preloader('Loading...');
      var datatables = $('#datatables').DataTable({
        ajax: {
          url: site_url_mobile + '/dashboard_mobile/kematian/count_new',
          data: [iamthedoor, { 'tanggal': $$('#tanggal_kematian').val() }],
          type: 'POST'
        },
        columns: [
          { data: 'nama' },
          { data: 'jumlah' },
          { data: 'laki' },
          { data: 'perempuan' },
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
      app.request.post(site_url_mobile + '/dashboard_mobile/kematian/kecamatan_kelurahan', iamthedoor, function (response) {
        var list_kecamatan = '<option value="000">SEMUA</option>';

        response.kecamatan.forEach(function (value, index) {
          list_kecamatan += '<option value="' + value.kode + '">' + value.nama + '</option>';
        });
        $$('#kecamatan_kematian').html(list_kecamatan).change();
      }, 'json');

      $$('#kecamatan_kematian').on('change', function () {
        var list_kelurahan = '';
        if ($$(this).val() != '000') {
          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile + '/dashboard_mobile/kematian/kelurahan/' + $$('#kecamatan_kematian').val(), iamthedoor, function (response) {
            app.dialog.close();
            if (response.status) {
              response.kelurahan.forEach(function (value, index) {
                list_kelurahan += '<option value="' + value.kode + '">' + value.nama + '</option>';
              });
            }
            $$('#kelurahan_kematian').html(list_kelurahan).change();
          }, 'json');
        } else {
          list_kelurahan += '<option value=""> - </option>'
          $$('#kelurahan_kematian').html(list_kelurahan).change();
        }
      });

      $$('#cari_data_kematian').on('click', function () {
        var post = {
          'tanggal': $$('#tanggal_kematian').val(),
          'kecamatan': $$('#kecamatan_kematian').val(),
          'kelurahan': $$('#kelurahan_kematian').val()
        }
        if (post['tanggal'].split('-').length <= 3) {
          app.dialog.alert('Mohon pilih tanggal yang sesuai');
          return false
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
      });

      $$('#lihat_grafik_kematian').on('click', function () {
        if (getDiffDate($$('#tanggal_kematian').val(), 14)) {
          app.dialog.alert('Durasi tanggal yang dipilih tidak boleh melebihi 14 hari');
          return false;
        }

        var post = {
          'tanggal': $$('#tanggal_kematian').val(),
          'kecamatan': $$('#kecamatan_kematian').val(),
          'kelurahan': $$('#kelurahan_kematian').val()
        }

        app.dialog.preloader('Loading...');
        app.request.post(site_url_mobile + '/dashboard_mobile/kematian/grafik', [iamthedoor, post], function (response) {
          app.dialog.close();

          var grafik1 = { x: [], y: [], name: 'Laki-Laki', type: 'bar' };
          var grafik2 = { x: [], y: [], name: 'Perempuan', type: 'bar' };

          if (response.status) {
            var jml_lk = 0;
            response.chart_data.forEach(function (val, index) {
              grafik1.x.push('.' + val.tgl_buat);
              grafik1.y.push(val.jumlah_laki);
              jml_lk = jml_lk + parseInt(val.jumlah_laki);
            });
            $$('#jml_lk_kematian').html(jml_lk);

            var jml_pr = 0;
            response.chart_data.forEach(function (val, index) {
              grafik2.x.push('.' + val.tgl_buat);
              grafik2.y.push(val.jumlah_perempuan);
              jml_pr = jml_pr + parseInt(val.jumlah_perempuan);
            });
            $$('#jml_pr_kematian').html(jml_pr);
          }

          var chart_data = [grafik1, grafik2];
          Plotly.newPlot('chart_kematian', chart_data, chart_layout, chart_config);
        }, 'json');
      });
    }
  }
}