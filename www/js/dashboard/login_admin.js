var login_admin = {
  name: 'login_admin',
  path: '/login_admin/',
  url: './pages/dashboard/login_admin.html',
  options: {
    transition: 'f7-circle',
  },
  on: {
    pageInit: function () {
      $$('#login_admin').on('click', function () {
        var nik = $$('#username_admin').val();
        var password = $$('#password_admin').val();
        if (nik == '' || password == '') {
          app.dialog.alert('Lengkapi form login');
        } else {
          app.dialog.preloader('Logging In...');
          app.request.post(site_url_mobile + '/siurban_mobile/login', { NIK: nik, password: password }, function (data) {
            app.dialog.close();
            if (data == 0) {
              app.dialog.alert('NIK Anda salah');
            } else if (data == 1) {
              app.dialog.alert('Password salah');
            } else {
              if (data.id) {
                if (data.role_id == 1 || data.role_id == 8 || data.role_id == 10) {
                  const dest = 'dashboard';
                  localStorage.setItem('logged_in', 'true');
                  localStorage.setItem('datauser', JSON.stringify(data));
                  localStorage.setItem('destination', JSON.stringify(dest));
                  sess_update();
                } else {
                  app.dialog.alert('Anda tidak diperbolehkan masuk ke halaman ini.', function () {
                    mainView.router.navigate('/login/');
                  });
                  return false;
                }
              } else {
                app.dialog.alert(data.msg);
              }
            }
          }, 'json');
        }
      });
    }
  }
}