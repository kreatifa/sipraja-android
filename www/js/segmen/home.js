var home_segmen = {
  name: 'segmen_home',
  path: '/segmen_home/',
  url: './pages/segmen/home.html',
  options: {
    transition: 'f7-circle',
  },
  on: {
    pageInit: function() {
      $$('#nama_user').html(datauser.nama)
    }
  }
}