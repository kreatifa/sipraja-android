var pindah_keluar = {
  name: 'pindah_keluar',
  path: '/pindah_keluar/',
  url: './pages/dashboard/pindah_keluar.html',
  options: {
    transition: 'f7-parallax',
  },
  on: {
    pageInit: function () {
      app.calendar.create({
        inputEl: '#tanggal_pindah',
        openIn: 'customModal',
        dateFormat: 'dd-mm-yyyy',
        header: true, footer: true, rangePicker: true
      });
      app.dialog.preloader('Loading...');
      var datatables = $('#datatables').DataTable({
        ajax: {
          url: site_url_mobile + '/dashboard_mobile/pindah/count_new',
          data: [iamthedoor, { 'state': 'PINDAH KELUAR' }],
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
      app.request.post(site_url_mobile + '/dashboard_mobile/pindah/kecamatan_kelurahan', iamthedoor, function (response) {
        var list_kecamatan = '<option value="000">SEMUA</option>';

        response.kecamatan.forEach(function (value, index) {
          list_kecamatan += '<option value="' + value.kode + '">' + value.nama + '</option>';
        });
        $$('#kecamatan_pindah').html(list_kecamatan).change();
      }, 'json');

      $$('#kecamatan_pindah').on('change', function () {
        var list_kelurahan = '';
        if ($$(this).val() != '000') {
          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile + '/dashboard_mobile/pindah/kelurahan/' + $$('#kecamatan_pindah').val(), iamthedoor, function (response) {
            app.dialog.close();
            if (response.status) {
              response.kelurahan.forEach(function (value, index) {
                list_kelurahan += '<option value="' + value.kode + '">' + value.nama + '</option>';
              });
            }
            $$('#kelurahan_pindah').html(list_kelurahan).change();
          }, 'json');
        } else {
          list_kelurahan += '<option value=""> - </option>'
          $$('#kelurahan_pindah').html(list_kelurahan).change();
        }
      });

      $$('#cari_data_pindah').on('click', function () {
        var post = {
          'tanggal': $$('#tanggal_pindah').val(),
          'kecamatan': $$('#kecamatan_pindah').val(),
          'kelurahan': $$('#kelurahan_pindah').val(),
          'state': 'PINDAH KELUAR'
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

      $$('#lihat_grafik_pindah').on('click', function () {

        var post = {
          'tanggal': $$('#tanggal_pindah').val(),
          'kecamatan': $$('#kecamatan_pindah').val(),
          'kelurahan': $$('#kelurahan_pindah').val(),
          'state': 'PINDAH KELUAR'
        }

        app.dialog.preloader('Loading...');
        app.request.post(site_url_mobile + '/dashboard_mobile/pindah/grafik', [iamthedoor, post], function (response) {
          app.dialog.close();

          var grafik1 = { x: [], y: [], name: 'Pindah Laki - Laki', type: 'bar' };
          var grafik2 = { x: [], y: [], name: 'Pindah Perempuan', type: 'bar' };

          if (response.status) {
            var jml_datang = 0;
            response.chart_data.forEach(function (val, index) {
              grafik1.x.push('.' + val.tgl_buat);
              grafik1.y.push(val.jumlah_laki);
              jml_datang = jml_datang + parseInt(val.jumlah_laki);
            });
            $$('#jml_laki').html(jml_datang);

            var jml_keluar = 0;
            response.chart_data.forEach(function (val, index) {
              grafik2.x.push('.' + val.tgl_buat);
              grafik2.y.push(val.jumlah_perempuan);
              jml_keluar = jml_keluar + parseInt(val.jumlah_perempuan);
            });
            $$('#jml_perempuan').html(jml_keluar);
          }

          var chart_data = [grafik1, grafik2];
          Plotly.newPlot('chart_pindah', chart_data, chart_layout, chart_config);
        }, 'json');
      });
    }
  }
}