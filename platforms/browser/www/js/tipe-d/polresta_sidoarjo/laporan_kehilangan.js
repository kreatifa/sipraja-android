
var laporan_kehilangan = {
  path: '/tipe-d/polresta_sidoarjo/laporan_kehilangan/',
  url: './pages/tipe-d/polresta_sidoarjo/laporan_kehilangan.html',
  name: 'laporan_kehilangan',
  on: {
    pageAfterIn: function() {
      $$('#nama').val(datauser.nama);
      $$('#tempat_lahir').val(datauser.tempat_lahir);
      $$('#tgl_lahir').val(datauser.tanggal_lahir);
      $$('#pekerjaan').val(datauser.pekerjaan);
      if (datauser.kwn == 'WNI') {
        $$('#kewarganegaraan').val('Warga Negara Indonesia');
      } else if (datauser.kwn == 'WNA') {
        $$('#kewarganegaraan').val('Warga Negara Asing');
      }
      $$('#no_hp').val(datauser.no_telp_pendaftar);
      $$('#alamat').val(datauser.alamat);
      $$('#tgl_kejadian').val(new Date().toDateFormat());
    },
  }
};
