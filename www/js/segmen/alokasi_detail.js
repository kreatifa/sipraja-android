var segmen_alokasi_detail = {
  name: 'segmen_alokasi_detail',
  path: '/segmen_alokasi_detail/:id',
  url: './pages/segmen/alokasi_detail.html',
  options: {
    transition: 'f7-circle',
  },
  on: {
    pageInit: function() {
      var id = mainView.router.currentRoute.params.id;
      console.log('aplikasi segmen detail alokasi');
      app.dialog.preloader('Loading...');
      var datatables = $('#tabel_detail_alokasi').DataTable({
        serverSide: true,
        ajax: {
          url: site_url_mobile + '/dashboard_mobile/alokasi/get_detail/' + id,
          data: iamthedoor,
          type: 'GET'
        },
        columns: [
          { data: 'nama_kec' },
          { data: 'nama_kel' },
          { data: 'pagu' },
          { data: 'status' },
          { data: 'id' }
        ],
        initComplete: function (settings, json) {
          app.dialog.close();
          $$('#tabel_detail_alokasi_length').hide();
          $$('#tabel_detail_alokasi_filter').hide();
        },
        rowCallback: function (row, data) {
          var color = 'red';
          if (data.status == 'Terpenuhi') { color = 'green' }
          $('td:eq(3)', row).html('<div class="chip color-' + color + '"><div class="chip-label">' + data.status + '</div></div>')
          $('td:eq(4)', row).html('<a href="/segmen_alokasi_detail_list/' + data.id + '" class="button button-small button-fill color-green"><i class="icon f7-icons" style="font-size: 12pt;">search</i> Lihat</a>');
        }
      })
    }
  }
}

var segmen_alokasi_detail_list = {
  name: 'segmen_alokasi_detail_list',
  path: '/segmen_alokasi_detail_list/:id',
  url: './pages/segmen/alokasi_detail_list.html',
  options: {
    transition: 'f7-circle',
  },
  on: {
    pageInit: function() {
      var id = mainView.router.currentRoute.params.id;
      console.log('aplikasi segmen detail alokasi list');

      app.dialog.preloader('Loading...');
      var datatables = $('#tabel_detail_alokasi_list').DataTable({
        serverSide: true,
        ajax: {
          url: site_url_mobile + '/dashboard_mobile/alokasi/get_detail_list/' + id,
          data: iamthedoor,
          type: 'GET'
        },
        columns: [
          { data: 'nik' },
          { data: 'no_kk' },
          { data: 'nama_lgkp' },
          { data: 'nobpjs' },
          { data: 'tmpt_lhr' },
          { data: 'tgl_lhr' },
          { data: 'jenis_klmin_ket' },
          { data: 'stat_kwn_ket' },
          { data: 'alamat' },
          { data: 'no_rt' },
          { data: 'no_rw' },
          { data: 'kode_pos' },
          { data: 'nama_kec' },
          { data: 'nama_kel' }
        ],
        initComplete: function (settings, json) {
          app.dialog.close();
          $$('#tabel_detail_alokasi_list_length').hide();
          $$('#tabel_detail_alokasi_list_filter').hide();
        },
        rowCallback: function (row, data) {
        }
      })
    }
  }
}