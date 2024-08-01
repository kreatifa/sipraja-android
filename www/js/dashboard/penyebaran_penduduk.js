var penyebaran_penduduk = {
  name: 'penyebaran_penduduk',
  path: '/penyebaran_penduduk/:kode',
  url: './pages/dashboard/penyebaran_penduduk.html',
  options: {
    transition: 'f7-parallax',
  },
  on: {
    pageInit: function () {
      var kode = mainView.router.currentRoute.params.kode;
      var chart_layout = { barmode: 'stack', bargroupgap: 0.1, height: 250, margin: { t: 10, b: 65, l: 30, r: 30 }, paper_bgcolor: 'rgba(0, 0, 0, 0)', yaxis: { fixedrange: true }, xaxis: { tickangle: -90 }, legend: { x: 0, y: 1.0, orientation: 'h' } };
      var chart_config = { responsive: true, displaylogo: false, displayModeBar: false };

      if (kode == 0) {
        $$('#subkategori').val('< 13');
      } else if (kode == 1) {
        $$('#subkategori').val('>= 13');
      } else if (kode == 2) {
        $$('#subkategori').val('>= 65');
      } else if (kode == 3) {
        $$('#subkategori').val('BETWEEN 1 and 6');
      } else if (kode == 4) {
        $$('#subkategori').val('BETWEEN 7 and 9');
      } else if (kode == 5) {
        $$('#subkategori').val('BETWEEN 10 and 13');
      }
      app.dialog.preloader('Loading...')
      var datatables = $('#datatables').DataTable({
        ajax: {
          url: site_url_mobile + '/dashboard_mobile/penyebaran_penduduk/count_new',
          data: [iamthedoor, { 'kategory': $$('#kategori').val(), 'subkategori': $$('#subkategori').val() }],
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
        }
      });
      app.request.post(site_url_mobile + '/dashboard_mobile/penyebaran_penduduk/kecamatan_kelurahan', iamthedoor, function (response) {
        var list_kecamatan = '<option value="000">SEMUA</option>';

        response.kecamatan.forEach(function (value, index) {
          list_kecamatan += '<option value="' + value.id + '">' + value.name + '</option>';
        });
        $$('#kecamatan_penyebaran_penduduk').html(list_kecamatan).change();
      }, 'json');

      $$('#kecamatan_penyebaran_penduduk').on('change', function () {
        var list_kelurahan = '';
        if ($$(this).val() != '000') {
          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile + '/dashboard_mobile/penyebaran_penduduk/kelurahan/' + $$('#kecamatan_penyebaran_penduduk').val(), iamthedoor, function (response) {
            app.dialog.close();
            if (response.status) {
              response.kelurahan.forEach(function (value, index) {
                list_kelurahan += '<option value="' + value.id + '">' + value.name + '</option>';
              });
            }
            $$('#kelurahan_penyebaran_penduduk').html(list_kelurahan).change();
          }, 'json');
        } else {
          list_kelurahan += '<option value=""> - </option>'
          $$('#kelurahan_penyebaran_penduduk').html(list_kelurahan).change();
        }
      });

      $$('#cari_data_penyebaran_penduduk').on('click', function () {

        var post = {
          'kecamatan': $$('#kecamatan_penyebaran_penduduk').val(),
          'kelurahan': $$('#kelurahan_penyebaran_penduduk').val(),
          'kategori': $$('#kategori').val(),
          'subkategori': $$('#subkategori').val(),
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

      $$('#lihat_grafik_penyebaran_penduduk').on('click', function () {

        var post = {
          'kecamatan': $$('#kecamatan_penyebaran_penduduk').val(),
          'kelurahan': $$('#kelurahan_penyebaran_penduduk').val(),
          'kategori': $$('#kategori').val(),
          'subkategori': $$('#subkategori').val(),
        }

        app.dialog.preloader('Loading...');
        app.request.post(site_url_mobile + '/dashboard_mobile/penyebaran_penduduk/grafik', [iamthedoor, post], function (response) {
          app.dialog.close();
          var grafik1 = { x: [], y: [], name: 'Laki-Laki', type: 'bar' };
          var grafik2 = { x: [], y: [], name: 'Perempuan', type: 'bar' };

          if (response.status) {
            var jml_lk = 0;
            response.chart_data.forEach(function (val, index) {
              grafik1.x.push('.' + val.nama);
              grafik1.y.push(val.jumlah_laki);
              jml_lk = jml_lk + parseInt(val.jumlah_laki);
            });
            $$('#jml_lk').html(jml_lk);

            var jml_pr = 0;
            response.chart_data.forEach(function (val, index) {
              grafik2.x.push('.' + val.nama);
              grafik2.y.push(val.jumlah_perempuan);
              jml_pr = jml_pr + parseInt(val.jumlah_perempuan);
            });
            $$('#jml_pr').html(jml_pr);
          }

          var chart_data = [grafik1, grafik2];
          Plotly.newPlot('chart_penyebaran_penduduk', chart_data, chart_layout, chart_config);
        }, 'json');
      });
    }
  }
}