
var cek_lowongan = {
  path: '/tipe-d/disnaker/cek_lowongan/',
  url: './pages/tipe-d/disnaker/cek_lowongan.html',
  name: 'cek_lowongan',
  on: {
    pageInit: function() {
      app.dialog.preloader('Mohon Tunggu Sebentar...');
      app.request.get('https://gemasolusindo.co.id/hallo-kerja/public/api/job_vacancy', function(result) {
      // app.request.get('https://gemasolusindo.co.id/hallo-kerja/public/api', function(result) {
        app.dialog.close();
        var lowongan_table = $('#lowongan_table').DataTable({
          data: result,
          columns: [
            { data: 'id' },
            { data: 'position_name' },
            { data: 'company.company_name' },
            { data: 'salary_from' },
            { data: 'salary_to' },
            { data: 'open_until' }
          ],
          initComplete: function() {
            $$('#lowongan_table_length').hide();
            $$('#lowongan_table_filter').hide();
          },
          rowCallback: function(row, data) {
            $('td:eq(0)', row).html('<a href="/tipe-d/disnaker/detail_lowongan/' + data.id + '/" class="button button-raised color-green">' +
            '<i class="icon f7-icons">square_pencil_fill</i> Detail</a>');
            $('td:eq(3)', row).html('Rp ' + toIdrFormat(data.salary_from));
            $('td:eq(4)', row).html('Rp ' + toIdrFormat(data.salary_to));
            $('td:eq(5)', row).html((new Date(data.open_until)).toDateIndoFormat());
          }
        });
      }, 'json');
    },
  }
};

var detail_lowongan = {
  path: '/tipe-d/disnaker/detail_lowongan/:id/',
  url: './pages/tipe-d/disnaker/detail_lowongan.html',
  name: 'detail_lowongan',
  on: {
    pageInit: function() {
      var id = mainView.router.currentRoute.params.id;
      app.dialog.preloader('Mohon Tunggu Sebentar...');
      app.request.get('https://gemasolusindo.co.id/hallo-kerja/public/api/job_vacancy', function(result) {
        app.dialog.close();
        var item = {};
        result.forEach(function(row) {
          if (row.id == id) {
            item = row;
          }
        });
        $$('#lowongan_card .card-header').html('Posisi: ' + item.position_name);
        var content = '<li class="item-content item-input">' +
            '<div class="item-inner">' +
              '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Nama Perusahaan</div>' +
                '<input type="text" value="' + item.company.company_name + '" readonly>' +
              '</div>' +
            '</div>' +
          '</li>' +
          '<li class="item-content item-input">' +
            '<div class="item-inner">' +
              '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Nama HRD</div>' +
                '<input type="text" value="' + item.company.HRD_name + '" readonly>' +
              '</div>' +
            '</div>' +
          '</li>' +
          '<li class="item-content item-input">' +
            '<div class="item-inner">' +
              '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Provinsi</div>' +
                '<input type="text" value="' + item.company.province.name + '" readonly>' +
              '</div>' +
            '</div>' +
          '</li>' +
          '<li class="item-content item-input">' +
            '<div class="item-inner">' +
              '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Kota/Kabupaten</div>' +
                '<input type="text" value="' + item.company.city.name + '" readonly>' +
              '</div>' +
            '</div>' +
          '</li>' +
          '<li class="item-content item-input">' +
            '<div class="item-inner">' +
              '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Kecamatan</div>' +
                '<input type="text" value="' + item.company.district.name + '" readonly>' +
              '</div>' +
            '</div>' +
          '</li>' +
          '<li class="item-content item-input">' +
            '<div class="item-inner">' +
              '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Kelurahan</div>' +
                '<input type="text" value="' + item.company.sub_district.name + '" readonly>' +
              '</div>' +
            '</div>' +
          '</li>' +
          '<li class="item-content item-input">' +
            '<div class="item-inner">' +
              '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Alamat</div>' +
                '<input type="text" value="' + item.company.address + '" readonly>' +
              '</div>' +
            '</div>' +
          '</li>' +
          '<li class="item-content item-input">' +
            '<div class="item-inner">' +
              '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Upah</div>' +
                '<input type="text" value="Rp ' + toIdrFormat(item.salary_from) + ' - Rp ' + toIdrFormat(item.salary_to) + '" readonly>' +
              '</div>' +
            '</div>' +
          '</li>' +
          '<li class="item-content item-input">' +
            '<div class="item-inner">' +
              '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Buka Sampai</div>' +
                '<input type="text" value="' + (new Date(item.open_until)).toDateIndoFormat() + '" readonly>' +
              '</div>' +
            '</div>' +
          '</li>' +
          '<li class="item-content item-input">' +
            '<div class="item-inner">' +
              '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Deskripsi Pekerjaan</div>' +
                '<textarea readonly>' + item.description + '</textarea>' +
              '</div>' +
            '</div>' +
          '</li>' +
          '<li class="item-content item-input">' +
            '<div class="item-inner">' +
              '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Persyaratan</div>' +
                '<textarea readonly>' + item.requirement + '</textarea>' +
              '</div>' +
            '</div>' +
          '</li>';
        $$('#lowongan_card ul').html(content);
      }, 'json');
    },
  }
};