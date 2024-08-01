var bpjs_segmen = {
  name: 'segmen',
  path: '/segmen/',
  url: './pages/dashboard/segmen.html',
  options: {
    transition: 'f7-circle',
  },
  on: {
    pageInit: function() {
      $$('#layout_data_segmen').hide();
      $$('#chart_segmen_h').hide();
      $$('#chart_segmen_v').hide();
      // var chart_layout = { barmode: 'stack', bargroupgap: 0.1, height: 400, margin: { t: 10, b: 90, l: 30, r: 20, autoexpand: true }, paper_bgcolor: 'rgba(0, 0, 0, 0)', colorway: ['#28A745', '#DC3545'], yaxis: {fixedrange: true}, xaxis: {tickangle: -90, fixedrange: true}, legend: {x: 0.5, y: 1.0, orientation: 'h'}};
      // var chart_config = { responsive: true, displaylogo: false, displayModeBar: false };

      app.dialog.preloader('Loading...')
      app.request.post(site_url_mobile + '/dashboard_mobile/segmen/kecamatan', iamthedoor, function (response) {
        app.dialog.close();
        var list_kecamatan = '<option value="000">Semua</option>';

        response.kecamatan.forEach(function(value, index) {
          list_kecamatan += '<option value="' + value.id_district + '">' + value.nama + '</option>';
        });
        
        $$('#kecamatan_segmen').html(list_kecamatan).change();
      }, 'json');

      $$('#kecamatan_segmen').on('change', function () {
        app.dialog.preloader('Loading..');
        app.request.post(site_url_mobile + '/dashboard_mobile/segmen/get_kelurahan/' + $$('#kecamatan_segmen').val(), iamthedoor, function (response) {
          app.dialog.close();
          
          var list_kelurahan = '';
          response.records.forEach(function(value, index) {
            list_kelurahan += '<option value="' + value.id_village + '">' + value.nama + '</option>';
          });

          $$('#kelurahan_segmen').html(list_kelurahan).change();
        }, 'json');
      })

      $$('#lihat_grafik_segmen').on('click', function () {
        var post = {
          'kecamatan': $$('#kecamatan_segmen').val(),
          'kelurahan': $$('#kelurahan_segmen').val(),
          'segmen': $$('#segmen').val(),
          'subsegmen': $$('#subsegmen').val(),
        }

        app.dialog.preloader('Loading...');
        app.request.post(site_url_mobile + '/dashboard_mobile/segmen/segmen', [iamthedoor, post], function (response) {
          app.dialog.close();
          $$('#layout_data_segmen').show();
          // var grafik_aktif = { x: [], y: [], name: 'Aktif', type: 'bar' };
          // var grafik_nonaktif = { x: [], y: [], name: 'Nonaktif', type: 'bar' };

          if ($$('#segmen').val() == '000') {
            $$('#chart_segmen_v').show();
            $$('#chart_segmen_h').hide();
            var grafik_aktif = { x: [], y: [], name: 'Aktif', type: 'bar', orientation: 'v' };
            var grafik_nonaktif = { x: [], y: [], name: 'Nonaktif', type: 'bar', orientation: 'v' };
            var chart_layout = {
              barmode: 'stack',
              bargroupgap: 0.1,
              height: 400,
              margin: { t: 10, b: 90, l: 30, r: 20, autoexpand: true },
              paper_bgcolor: 'rgba(0, 0, 0, 0)',
              colorway: ['#28A745', '#DC3545'],
              yaxis: {fixedrange: true, separatethousands: true, exponentformat: 'none'},
              xaxis: {tickangle: -90, fixedrange: true},
              legend: {x: 0, y: 1.1, orientation: 'h'}
            };
            var chart_config = { responsive: true, displaylogo: false, displayModeBar: false };
            grafik_aktif.orientation = 'v';
            grafik_nonaktif.orientation = 'v';
            response.forEach(function(val, index) {
              grafik_aktif.x.push(val.nama);
              grafik_aktif.y.push(val.sum_active);

              grafik_nonaktif.x.push(val.nama);
              grafik_nonaktif.y.push(val.sum_inactive);
            })
            var chart_data = [grafik_aktif, grafik_nonaktif];
            Plotly.newPlot('chart_segmen_v', chart_data, chart_layout, chart_config);
          } else {
            $$('#chart_segmen_v').hide();
            $$('#chart_segmen_h').show();
            var grafik_aktif = { x: [], y: [], name: 'Aktif', type: 'bar', orientation: 'h' };
            var grafik_nonaktif = { x: [], y: [], name: 'Nonaktif', type: 'bar', orientation: 'h' };
            var chart_layout = {
              barmode: 'stack',
              bargroupgap: 0.1,
              height: 600,
              // width: 800,
              margin: { l: 10, r: 0, t: 10, b: 75 },
              paper_bgcolor: 'rgba(0, 0, 0, 0)',
              colorway: ['#28A745', '#DC3545'],
              yaxis: {fixedrange: true, automargin: true},
              xaxis: {tickangle: 90, separatethousands: true, exponentformat: 'none'},
              legend: {x: 0, y: 1.1, orientation: 'h'},
              dragmode: 'pan'
            };
            var chart_config = { responsive: true, displaylogo: false, displayModeBar: false };
            response[0].detail.forEach(function(val, index) {
              if (val.total > 500) {
                grafik_aktif.y.push(val.keterangan);
                grafik_aktif.x.push(val.active);

                grafik_nonaktif.y.push(val.keterangan);
                grafik_nonaktif.x.push(val.inactive);
              }
            })
            var chart_data = [grafik_aktif, grafik_nonaktif];
            console.log(chart_data);
            Plotly.newPlot('chart_segmen_h', chart_data, chart_layout, chart_config);
          }
        }, 'json')
      });
    }
  }
}