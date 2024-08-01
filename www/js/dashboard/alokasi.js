var alokasi_view = { // usulan segmen
  name: 'alokasi',
  path: '/alokasi/',
  url: './pages/dashboard/alokasi.html',
  options: {
    transition: 'f7-circle',
  },
  on: {
    pageInit: function() {
      app.dialog.preloader('Loading...');
      var datatables = $('#datatables').DataTable({
        serverSide: true,
        ajax: {
          url: site_url_mobile + '/dashboard_mobile/alokasi/get_data',
          data: iamthedoor,
          type: 'GET'
        },
        columns: [
          { data: 'nama_alokasi' },
          { data: 'keterangan' },
          { data: 'batas_mulai' },
          { data: 'batas_akhir' },
          { data: 'tahun_alokasi' },
          { data: 'jumlah_pagu' },
          { data: 'id' }
        ],
        initComplete: function (settings, json) {
          app.dialog.close();
          $$('#datatables_length').hide();
          $$('#datatables_filter').hide();
        },
        rowCallback: function (row, data) {
          $('td:eq(6)', row).html('<a href="/alokasi_detail/' + data.id + '" class="button button-small button-fill color-green">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">search</i> Detail</a>');
        }
      })
    }
  }
}