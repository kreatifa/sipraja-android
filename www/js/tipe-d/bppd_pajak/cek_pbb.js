
var cek_pbb = {
  path: '/tipe-d/bppd_pajak/cek_pbb/:nomor',
  url: './pages/tipe-d/bppd_pajak/cek_pbb.html',
  name: 'cek_pbb',
  on: {
    pageInit: function () {
      let nomor = mainView.router.currentRoute.params.nomor;
      
      if(nomor != '000'){
        nomor = atob(nomor);
        $('#nop').val(nomor);
        setTimeout(function () {
          $('#search').trigger('click');
        }, 400);
      }

      $$('#search').on('click', function () {
        app.input.validateInputs('#form_cek_pbb');
        if ($$('#form_cek_pbb')[0].checkValidity() == true) {
          $$('#nop').val($$('#nop').val().replace(/-/g, '').replace(/\./g, ''));
          let ajax_data = new Array();
          let form = app.form.convertToData('#form_cek_pbb');
          ajax_data.push(iamthedoor);
          ajax_data.push(form);
          app.dialog.preloader('Mohon Tunggu Sebentar...');
          app.request.post(site_url_mobile_layanan + '/pbb/check_nop', ajax_data, function (result) {
            app.dialog.close();
            if (!result || result.respon_code == 'kosong' || result.respon_code == 'error') {
              $$('#form_pajak_sppt').empty();
              app.dialog.alert('Mohon Maaf, PBB Anda Tidak Dapat Ditemukan!');
            } else {
              var content = '<div class="block-title">' +
                '<div class="chip color-green">' +
                '<div class="chip-label">NOP: ' + result.NOP + '</div>' +
                '</div>' +
                '</div>' +
                '<ul>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Nama Wajib Pajak</div>' +
                '<input type="text" value="' + result.NM_WP_SPPT + '" readonly>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Alamat Wajib Pajak</div>' +
                '<input type="text" value="' + result.ALAMATWP + '" readonly>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Kecamatan Objek Pajak</div>' +
                '<input type="text" value="' + result.KECAMATAN + '" readonly>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Kelurahan Objek Pajak</div>' +
                '<input type="text" value="' + result.NAMA_KELURAHAN + '" readonly>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '<li class="item-content item-input">' +
                '<div class="item-inner">' +
                '<div class="item-input-wrap">' +
                '<div class="item-title item-label">Alamat Objek Pajak</div>' +
                '<input type="text" value="' + result.ALAMAT + '" readonly>' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>';

              result.SPPT.forEach(function (item) {
                content += '<div class="card">' +
                  '<div class="card-header bg-color-green text-color-white">Tahun Pajak: ' + item.THN_PAJAK + '</div>' +
                  '<div class="card-content card-content-padding">' +
                  '<div class="list">' +
                  '<ul>' +
                  '<li class="item-content item-input">' +
                  '<div class="item-inner">' +
                  '<div class="item-input-wrap">' +
                  '<div class="item-title item-label">Tanggal Jatuh Tempo</div>' +
                  '<input type="text" value="' + (new Date(item.TGL_JATUH_TEMPO)).toDateIndoFormat() + '" readonly>' +
                  '</div>' +
                  '</div>' +
                  '</li>' +
                  '<li class="item-content item-input">' +
                  '<div class="item-inner">' +
                  '<div class="item-input-wrap">' +
                  '<div class="item-title item-label">Pokok</div>' +
                  '<input type="text" value="Rp ' + toIdrFormat(item.POKOK) + '" readonly>' +
                  '</div>' +
                  '</div>' +
                  '</li>' +
                  '<li class="item-content item-input">' +
                  '<div class="item-inner">' +
                  '<div class="item-input-wrap">' +
                  '<div class="item-title item-label">Denda</div>' +
                  '<input type="text" value="Rp ' + toIdrFormat(item.DENDA) + '" readonly>' +
                  '</div>' +
                  '</div>' +
                  '</li>' +
                  '<li class="item-content item-input">' +
                  '<div class="item-inner">' +
                  '<div class="item-input-wrap">' +
                  '<div class="item-title item-label">PBB yang Harus Dibayar</div>' +
                  '<input type="text" value="Rp ' + toIdrFormat(item.JUMLAH_BAYAR) + '" readonly>' +
                  '</div>' +
                  '</div>' +
                  '</li>' +
                  '<li class="item-content item-input">' +
                  '<div class="item-inner">' +
                  '<div class="item-input-wrap">' +
                  '<div class="item-title item-label">Status Bayar</div>' +
                  '<input type="text" value="' + (item.STS_BAYAR == 1 ? 'LUNAS' : 'BELUM BAYAR') + '" readonly>' +
                  '</div>' +
                  '</div>' +
                  '</li>' +
                  '</ul>' +
                  '</div>' +
                  '</div>' +
                  '</div>';
              });
              $$('#form_pajak_sppt').html(content);
            }
          }, function () {
            app.dialog.alert('Pencarian Gagal, Mohon Coba Lagi Nanti');
          }, 'json');
        } else {
          app.dialog.alert('Mohon Mengisi NOP Terlebih Dahulu!');
        }
      });
    },
  }
};