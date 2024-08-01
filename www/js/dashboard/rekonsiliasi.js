var rekonsiliasi = {
  name: 'rekonsiliasi',
  path: '/rekonsiliasi/',
  url: './pages/dashboard/rekonsiliasi.html',
  options: {
    transition: 'f7-parallax',
  },
  on: {
    pageInit: function () {
      app.dialog.preloader('Loading...')
      var datatables;
      app.request.post(site_url_mobile + '/dashboard_mobile/rekonsiliasi/kecamatan_kelurahan', iamthedoor, function (response) {
        var list_rekonsiliasi = '';
        response.rekonsiliasi.forEach(function (value, index) {
          list_rekonsiliasi += '<option value="' + value.id + '">' + value.nama_rekonsiliasi + '</option>';
        });
        $$('#rekonsiliasi').html(list_rekonsiliasi).change();
      }, 'json');

      $$('#rekonsiliasi').on('change', function () {
        app.request.post(site_url_mobile + '/dashboard_mobile/rekonsiliasi/kecamatan/' + $$('#rekonsiliasi').val(), iamthedoor, function (response) {
          var list_kecamatan = '<option value="000">SEMUA</option>';

          response.kecamatan.forEach(function (value, index) {
            list_kecamatan += '<option value="' + value.no_kec + '">' + value.nama_kec + '</option>';
          });
          $$('#kecamatan_rekonsiliasi').html(list_kecamatan).change();
        }, 'json');

        datatables = $('#datatables').DataTable({
          ajax: {
            url: site_url_mobile + `/dashboard_mobile/rekonsiliasi/count_new`,
            data: [iamthedoor, { 'rekonsiliasi': $$('#rekonsiliasi').val() }],
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
      })

      $$('#kecamatan_rekonsiliasi').on('change', function () {
        var list_kelurahan = '';
        if ($$(this).val() != '000') {
          app.request.post(site_url_mobile + '/dashboard_mobile/rekonsiliasi/kelurahan/' + $$('#rekonsiliasi').val() + '/' + $$('#kecamatan_rekonsiliasi').val(), iamthedoor, function (response) {
            response.kelurahan.forEach(function (value, index) {
              list_kelurahan += '<option value="' + value.no_kel + '">' + value.nama_kel + '</option>';
            });
            $$('#kelurahan_rekonsiliasi').html(list_kelurahan).change();
          }, 'json');
        } else {
          list_kelurahan += '<option value=""> - </option>'
          $$('#kelurahan_rekonsiliasi').html(list_kelurahan).change();
        }
      });

      $$('#cari_data_rekonsiliasi').on('click', function () {
        var post = {
          'rekonsiliasi': $$('#rekonsiliasi').val(),
          'kecamatan': $$('#kecamatan_rekonsiliasi').val(),
          'kelurahan': $$('#kelurahan_rekonsiliasi').val()
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
    }
  }
}