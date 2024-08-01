var login_segmen = {
  name: 'login_segmen',
  path: '/login_segmen/',
  url: './pages/segmen/login_segmen.html',
  options: {
    transition: 'f7-circle',
  },
  on: {
    pageInit: function() {
      $$('#login_segmen').on('click', function () {
        var nik = $$('#username_segmen').val();
        var password = $$('#password_segmen').val();
        if (nik == '' || password == '') {
          app.dialog.alert('Lengkapi form login');
        } else {
          app.dialog.preloader('Logging In...');
          app.request.post(site_url_mobile + '/siurban_mobile/login', { NIK: nik, password: password }, function (data) {
            if (data == 0) {
              app.dialog.close();
              app.dialog.alert('NIK Anda salah');
            } else if (data == 1) {
              app.dialog.close();
              app.dialog.alert('Password salah');
            } else {
              if (data.id) {
                if (data.role_id == 1 || data.role_id == 46) {
                  const dest = 'segmen';
                  localStorage.setItem('logged_in', 'true');
                  localStorage.setItem('datauser', JSON.stringify(data));
                  localStorage.setItem('destination', JSON.stringify(dest));
                  app.dialog.close();

                  // fungsi dari sesupdate
                  datauser = JSON.parse(localStorage.datauser);
                  iamthedoor = { user_id: datauser.bf_users_id, kecamatan_id: datauser.kecamatan, kelurahan_id: datauser.kode_desa, role_id: datauser.role_id };
                  currentUserID = iamthedoor.user_id;
                  currentUser = { userId: currentUserID };
                  app.dialog.alert('Selamat Datang ' + datauser.nama);

                  mainView.router.navigate('/segmen_home/');
                } else {
                  app.dialog.close();
                  app.dialog.alert('Anda tidak diperbolehkan masuk ke halaman ini.', function () {
                    mainView.router.navigate('/login/');
                  });
                  return false;
                }
              } else {
                app.dialog.close();
                app.dialog.alert(data.msg);
              }
            }
          }, 'json');
        }
      });
    }
  }
}