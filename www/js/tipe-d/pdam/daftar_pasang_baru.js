var daftar_pasang_baru_pdam = {
  path: '/tipe-d/pdam/daftar_pasang_baru_pdam/',
  url: './pages/tipe-d/pdam/daftar_pasang_baru.html',
  name: 'daftar_pasang_baru',
  on: {
    pageInit: function () {
      app.dialog.preloader('Loading...');
      var datatables = $('#datatables').DataTable({
        serverSide: true,
        ajax: {
          url: site_url_mobile_layanan + '/daftar_pasang_baru_pdam/get_data/0',
          data: iamthedoor,
          type: 'GET'
        },
        columns: [
          { data: 'noktp' },
          { data: 'nama' },
          { data: 'email' },
          { data: 'notelp' },
          { data: 'alamat' },
          { data: 'noregister' }
        ],
        initComplete: function (settings, json) {
          app.dialog.close();
          $$('#datatables_length').hide();
          $$('#datatables_filter').hide();
          // $$('#datatables_paginate').hide();
        },
      });
    }
  }
}