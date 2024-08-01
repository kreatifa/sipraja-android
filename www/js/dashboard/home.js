var dashboard_home = {
  name: 'dashboard',
  path: '/dashboard/',
  url: './pages/dashboard/home.html',
  options: {
    transition: 'f7-circle',
  },
  on: {
    pageInit: function () {
      if (document.getElementById('data_pendaftar')) {
        // $$('#nik').html(iamthedoor.nik);
        var config_chart = { responsive: true, displaylogo: false, modeBarButtonsToRemove: ['toImage'] }
        var layout_gauge = { height: 100, margin: { t: 15, b: 5, l: 16, r: 30 }, paper_bgcolor: 'rgba(0, 0, 0, 0)' };
        var grafik_pendaftar = [{
          domain: { x: [0, 1], y: [0, 1] },
          type: "indicator",
          mode: "gauge+number",
          value: 0,
          delta: { valueformat: 'numerals' },
          gauge: { axis: { range: [null, 4] } },
        }];
        Plotly.newPlot('data_pendaftar', grafik_pendaftar, layout_gauge, config_chart);

        app.request.post(site_url_mobile + '/dashboard_mobile/dashboard/get_data', iamthedoor, function (dashboard) {
          $$('#jumlah_data_pendaftar').html(dashboard.data_pendaftar + ' Users');
          grafik_pendaftar[0].value = dashboard.data_pendaftar;
          grafik_pendaftar[0].gauge = { axis: { range: [null, dashboard.total_data_pendaftar] } };
          Plotly.newPlot('data_pendaftar', grafik_pendaftar, layout_gauge, config_chart);
        }, 'json');
      }
    }
  }
}