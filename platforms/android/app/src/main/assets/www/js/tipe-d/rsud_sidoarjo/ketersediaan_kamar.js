
var ketersediaan_kamar = {
  path: '/tipe-d/rsud_sidoarjo/ketersediaan_kamar/',
  url: './pages/tipe-d/rsud_sidoarjo/ketersediaan_kamar.html',
  name: 'ketersediaan_kamar',
  on: {
    pageInit: function() {
      app.dialog.preloader('Mohon Tunggu Sebentar...');
      app.request.get('https://api.rsudsidoarjo.co.id/rest_smartcity/web/inkamrs/ketersediaankamar', function(result) {
        app.dialog.close();
        var content = '';
        result.data.forEach(function(item) {
          content += '<div class="card">' +
              '<div class="card-header ' + (item.tersedia > 0 ? 'bg-color-green' : 'bg-color-red') + ' text-color-white">' + item.namaruang + ': ' + item.tersedia + '</div>' +
              '<div class="card-content">' +
                '<div class="list media-list">' +
                  '<ul>' +
                    '<li class="item-content">' +
                      '<div class="item-inner">' +
                        '<div class="item-title-row">' +
                          '<div class="item-subtitle col-50"><i class="icon f7-icons">bed_double</i>&emsp;Total Kamar</div>' +
                          '<div class="item-subtitle col-50">' + item.kapasitas + '</div>' +
                        '</div>' +
                        '<div class="item-title-row">' +
                          '<div class="item-subtitle col-50"><i class="icon f7-icons">person_2_alt</i>&emsp;Tersedia</div>' +
                          '<div class="item-subtitle col-50">' + item.tersedia + '</div>' +
                        '</div>' +
                        '<div class="item-title-row">' +
                          '<div class="item-subtitle col-50"><i class="icon f7-icons">calendar_today</i>&emsp;Last Update</div>' +
                          '<div class="item-subtitle col-50">' + result.updated + '</div>' +
                        '</div>' +
                      '</div>' +
                    '</li>' +
                  '</ul>' +
                '</div>' +
              '</div>' +
            '</div>';
        });
        $$('#form_ketersediaan_kamar').append(content);
      }, 'json');
    },
  }
};