var usulan_penambahan = {
  name: 'usulan_penambahan',
  path: '/usulan_penambahan/:tipe',
  url: './pages/dashboard/usulan_penambahan.html',
  options: {
    transition: 'f7-parallax',
  },
  on: {
    pageInit: function () {
      var tipe = mainView.router.currentRoute.params.tipe;
      var datatables;
      $$('#title').text('USULAN ' + tipe.toUpperCase());
      app.dialog.preloader('Loading...')
      app.request.post(site_url_mobile + '/dashboard_mobile/usulan_penambahan/kecamatan_kelurahan', iamthedoor, function (response) {
        var list_alokasi = '';

        response.alokasi.forEach(function (value, index) {
          list_alokasi += '<option value="' + value.id + '">' + value.nama_alokasi + '</option>';
        });
        $$('#alokasi').html(list_alokasi).change();
      }, 'json');

      $$('#alokasi').on('change', function () {
        app.request.post(site_url_mobile + '/dashboard_mobile/usulan_penambahan/kecamatan/' + $$('#alokasi').val(), iamthedoor, function (response) {
          var list_kecamatan = '<option value="000">SEMUA</option>';

          response.kecamatan.forEach(function (value, index) {
            list_kecamatan += '<option value="' + value.no_kec + '">' + value.nama_kec + '</option>';
          });
          $$('#kecamatan_alokasi').html(list_kecamatan).change();
        }, 'json');

        datatables = $('#datatables').DataTable({
          ajax: {
            url: site_url_mobile + `/dashboard_mobile/usulan_penambahan/count_new`,
            data: [iamthedoor, { 'alokasi': $$('#alokasi').val(), 'tipe': tipe }],
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

      $$('#kecamatan_alokasi').on('change', function () {
        var list_kelurahan = '';
        if ($$(this).val() != '000') {
          app.request.post(site_url_mobile + '/dashboard_mobile/usulan_penambahan/kelurahan/' + $$('#alokasi').val() + '/' + $$('#kecamatan_alokasi').val(), iamthedoor, function (response) {
            response.kelurahan.forEach(function (value, index) {
              list_kelurahan += '<option value="' + value.no_kel + '">' + value.nama_kel + '</option>';
            });
            $$('#kelurahan_alokasi').html(list_kelurahan).change();
          }, 'json');
        } else {
          list_kelurahan += '<option value=""> - </option>'
          $$('#kelurahan_alokasi').html(list_kelurahan).change();
        }
      });

      $$('#cari_data_alokasi').on('click', function () {
        var post = {
          'alokasi': $$('#alokasi').val(),
          'kecamatan': $$('#kecamatan_alokasi').val(),
          'kelurahan': $$('#kelurahan_alokasi').val(),
          'tipe': tipe
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