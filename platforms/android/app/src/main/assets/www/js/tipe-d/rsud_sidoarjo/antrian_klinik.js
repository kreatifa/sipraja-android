// var api_antrian_json = '{"status":200,"data":[{"id":12,"nama":"HAJI, K","polyclinic_id":1},{"id":13,"nama":"TRAUMA CENTER, K","polyclinic_id":1},{"id":14,"nama":"REKAM MEDIS","polyclinic_id":1},{"id":24,"nama":"PSIKOLOGI, K","polyclinic_id":1},{"id":53,"nama":"Akupuntur, K","polyclinic_id":1},{"id":54,"nama":"Estetika, K","polyclinic_id":1},{"id":55,"nama":"Paliatif, K","polyclinic_id":1},{"id":25,"nama":"ANAK, K","polyclinic_id":1},{"id":1,"nama":"PARU, K","polyclinic_id":1},{"id":2,"nama":"BEDAH UMUM, K","polyclinic_id":1},{"id":3,"nama":"BEDAH UROLOGY, K","polyclinic_id":1},{"id":4,"nama":"GIGI DAN MULUT, K","polyclinic_id":1},{"id":5,"nama":"JANTUNG, K","polyclinic_id":1},{"id":6,"nama":"MATA, K","polyclinic_id":1},{"id":7,"nama":"KANDUNGAN, K","polyclinic_id":1},{"id":8,"nama":"HAMIL, K","polyclinic_id":1},{"id":10,"nama":"MAWAR MERAH, K","polyclinic_id":1},{"id":11,"nama":"GENERAL CHECK-UP, K","polyclinic_id":1},{"id":15,"nama":"THT, K","polyclinic_id":1},{"id":16,"nama":"KULIT KELAMIN, K","polyclinic_id":1},{"id":17,"nama":"PSIKIATRI, K","polyclinic_id":1},{"id":18,"nama":"BEDAH ORTHOPAEDI, K","polyclinic_id":1},{"id":19,"nama":"SYARAF, K","polyclinic_id":1},{"id":21,"nama":"PENYAKIT DALAM, K","polyclinic_id":1},{"id":22,"nama":"BEDAH SYARAF, K","polyclinic_id":1},{"id":23,"nama":"GIZI, K","polyclinic_id":1},{"id":27,"nama":"BEDAH PLASTIK, K","polyclinic_id":1},{"id":28,"nama":"HEMODIALISIS (HD)","polyclinic_id":1},{"id":56,"nama":"Geriatri, K","polyclinic_id":1},{"id":26,"nama":"TUMBUH KEMBANG, K","polyclinic_id":1},{"id":9,"nama":"ANDROLOGI, K","polyclinic_id":1},{"id":20,"nama":"REHAB MEDIK","polyclinic_id":1},{"id":65,"nama":"ANASTESI, K","polyclinic_id":1},{"id":69,"nama":"BEDAH DIGESTIF, K","polyclinic_id":1}]}';
// var api_jadwal_json = '{"status":200,"data":[{"time_start":"08:00:00","time_end":"12:00:00","klinik_name":"KULIT KELAMIN, K","nama":null,"dokter_id":null,"schedule_id":59939}]}';
// var api_jadwal_json = '{"status":200,"data":[{"time_start":"08:00:00","time_end":"09:00:00","klinik_name":"Jantung (Pav)","nama":"HAIRUDI, dr., SpJP","dokter_id":25,"schedule_id":60026},{"time_start":"08:30:00","time_end":"09:30:00","klinik_name":"Jantung (Pav)","nama":"SANY RAHMAWANSA SISWARDANA, dr, M.Biomed, Sp.JP,FIHA","dokter_id":73,"schedule_id":60025},{"time_start":"11:00:00","time_end":"12:00:00","klinik_name":"Jantung (Pav)","nama":"UMIRA dr. SpJP","dokter_id":54,"schedule_id":60019}]}';
// var api_nomor_json = '{"status":200,"data":{"order_id":1325670},"order_id":1325670,"nomor_antrian":1,"jadwal_tanggal":"2022-04-29","jadwal_mulai":"08:00:00","klinik":"KULIT KELAMIN, K"}';
// var api_nomor_json = '{"status":200,"data":[],"order_id":1333663,"nomor_antrian":1,"jadwal_tanggal":"2022-05-11","jadwal_mulai":"09:00:00","klinik":"THT (Pav)"}';
var antrian_klinik_spesialis = {
  path: '/tipe-d/rsud_sidoarjo/antrian_klinik_spesialis/',
  url: './pages/tipe-d/rsud_sidoarjo/antrian_klinik_spesialis.html',
  name: 'antrian_klinik_spesialis',
  on: {
    pageAfterIn: function() {
      // 1 untuk Klinik Spesialis, 2 untuk Klinik Eksekutif
      let polyclinic_id = 1;
      let today = new Date();
      let cal_disabled_to = today;
      let cal_value = new Date().addDays(1);
      if (cal_disabled_to.getHours() < 9) {
        cal_disabled_to = new Date().subDays(1);
        cal_value = today;
      }

      app.dialog.preloader('Mohon Tunggu Sebentar...');
      let body = {user_id: datauser.bf_users_id, jadwal_tanggal: cal_value.toDateFormat()};
      app.request.post(site_url_mobile_layanan + '/user_support/cek_nomor_antrian', body, function(nomor) {
        if (nomor && nomor.id) {
          app.dialog.close();
          mainView.router.navigate('/tipe-d/rsud_sidoarjo/antrian_nomor/' + nomor.id + '/' + btoa(JSON.stringify(nomor)) + '/');
        } else {
          app.request.get('https://api.rsudsidoarjo.co.id/rest_smartcity/antrian/klinik/' + polyclinic_id, function(result) {
            app.dialog.close();
            // var result = JSON.parse(api_antrian_json);
            result.data.sort(function(a, b) {
              return a.nama.localeCompare(b.nama);
            });
            let options = '';
            result.data.forEach(function(item) {
              options += '<option value="' + item.id + '">' + item.nama + '</option>';
            });
            $$('#klinik select').html(options);
            $$('#klinik .item-after').text(result.data[0].nama);
          }, 'json');
        }
      }, 'json');

      var monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus' , 'September' , 'Oktober', 'November', 'Desember'];
      var dayNames = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
      var calendarInline = app.calendar.create({
        containerEl: '#jadwal',
        disabled: {
          from: new Date(Date.UTC(-271821, 3, 20)),
          to: cal_disabled_to
        },
        value: [cal_value],
        renderToolbar: function() {
          return '<div class="toolbar calendar-custom-toolbar no-shadow">' +
            '<div class="toolbar-inner">' +
              '<div class="left">' +
                '<a href="#" class="link icon-only"><i class="icon icon-back ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
              '</div>' +
              '<div class="center"></div>' +
              '<div class="right">' +
                '<a href="#" class="link icon-only"><i class="icon icon-forward ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
              '</div>' +
            '</div>' +
          '</div>';
        },
        on: {
          init: function(cal) {
            $$('.calendar-custom-toolbar .center').text(monthNames[cal.currentMonth] +', ' + cal.currentYear);
            $$('.calendar-custom-toolbar .left .link').on('click', function() {
              calendarInline.prevMonth();
            });
            $$('.calendar-custom-toolbar .right .link').on('click', function() {
              calendarInline.nextMonth();
            });
            $('.calendar-week-day:eq(0)').text(dayNames[0]);
            $('.calendar-week-day:eq(1)').text(dayNames[1]);
            $('.calendar-week-day:eq(2)').text(dayNames[2]);
            $('.calendar-week-day:eq(3)').text(dayNames[3]);
            $('.calendar-week-day:eq(4)').text(dayNames[4]);
            $('.calendar-week-day:eq(5)').text(dayNames[5]);
            $('.calendar-week-day:eq(6)').text(dayNames[6]);
          },
          monthYearChangeStart: function(cal) {
            $$('.calendar-custom-toolbar .center').text(monthNames[cal.currentMonth] +', ' + cal.currentYear);
          }
        }
      });

      $$('#cari_jadwal').on('click', function() {
        let id_klinik = $$('#klinik select').val();
        let tgl_periksa = calendarInline.value[0].toDateFormat();
        // var result = JSON.parse(api_jadwal_json);
        app.request.get('https://api.rsudsidoarjo.co.id/rest_smartcity/antrian/jadwal/' + id_klinik + '/' + tgl_periksa, function(result) {
          if (result.status == 200) {
            let options = {weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'};
            result.date = calendarInline.value[0].toLocaleDateString('id-ID', options);
            result.id_klinik = id_klinik;
            result.type = polyclinic_id;
            mainView.router.navigate('/tipe-d/rsud_sidoarjo/antrian_ambil/' + btoa(JSON.stringify(result)) + '/');
          } else {
            app.dialog.alert(result.message);
          }
        }, 'json');
      });
    },
  }
};

var antrian_klinik_eksekutif = {
  path: '/tipe-d/rsud_sidoarjo/antrian_klinik_eksekutif/',
  url: './pages/tipe-d/rsud_sidoarjo/antrian_klinik_eksekutif.html',
  name: 'antrian_klinik_eksekutif',
  on: {
    pageAfterIn: function() {
      // 1 untuk Klinik Spesialis, 2 untuk Klinik Eksekutif
      let polyclinic_id = 2;
      let today = new Date();
      let cal_disabled_to = today;
      let cal_value = new Date().addDays(1);
      if (cal_disabled_to.getHours() < 9) {
        cal_disabled_to = new Date().subDays(1);
        cal_value = today;
      }

      app.dialog.preloader('Mohon Tunggu Sebentar...');
      let body = {user_id: datauser.bf_users_id, jadwal_tanggal: cal_value.toDateFormat()};
      app.request.post(site_url_mobile_layanan + '/user_support/cek_nomor_antrian', body, function(nomor) {
        if (nomor && nomor.id) {
          app.dialog.close();
          mainView.router.navigate('/tipe-d/rsud_sidoarjo/antrian_nomor/' + nomor.id + '/' + btoa(JSON.stringify(nomor)) + '/');
        } else {
          app.request.get('https://api.rsudsidoarjo.co.id/rest_smartcity/antrian/klinik/' + polyclinic_id, function(result) {
            app.dialog.close();
            // var result = JSON.parse(api_antrian_json);
            result.data.sort(function(a, b) {
              return a.nama.localeCompare(b.nama);
            });
            let options = '';
            result.data.forEach(function(item) {
              options += '<option value="' + item.id + '">' + item.nama + '</option>';
            });
            $$('#klinik select').html(options);
            $$('#klinik .item-after').text(result.data[0].nama);
          }, 'json');
        }
      }, 'json');

      var monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus' , 'September' , 'Oktober', 'November', 'Desember'];
      var dayNames = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
      var calendarInline = app.calendar.create({
        containerEl: '#jadwal',
        disabled: {
          from: new Date(Date.UTC(-271821, 3, 20)),
          to: cal_disabled_to
        },
        value: [cal_value],
        renderToolbar: function() {
          return '<div class="toolbar calendar-custom-toolbar no-shadow">' +
            '<div class="toolbar-inner">' +
              '<div class="left">' +
                '<a href="#" class="link icon-only"><i class="icon icon-back ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
              '</div>' +
              '<div class="center"></div>' +
              '<div class="right">' +
                '<a href="#" class="link icon-only"><i class="icon icon-forward ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
              '</div>' +
            '</div>' +
          '</div>';
        },
        on: {
          init: function(cal) {
            $$('.calendar-custom-toolbar .center').text(monthNames[cal.currentMonth] +', ' + cal.currentYear);
            $$('.calendar-custom-toolbar .left .link').on('click', function() {
              calendarInline.prevMonth();
            });
            $$('.calendar-custom-toolbar .right .link').on('click', function() {
              calendarInline.nextMonth();
            });
            $('.calendar-week-day:eq(0)').text(dayNames[0]);
            $('.calendar-week-day:eq(1)').text(dayNames[1]);
            $('.calendar-week-day:eq(2)').text(dayNames[2]);
            $('.calendar-week-day:eq(3)').text(dayNames[3]);
            $('.calendar-week-day:eq(4)').text(dayNames[4]);
            $('.calendar-week-day:eq(5)').text(dayNames[5]);
            $('.calendar-week-day:eq(6)').text(dayNames[6]);
          },
          monthYearChangeStart: function(cal) {
            $$('.calendar-custom-toolbar .center').text(monthNames[cal.currentMonth] +', ' + cal.currentYear);
          }
        }
      });

      $$('#cari_jadwal').on('click', function() {
        let id_klinik = $$('#klinik select').val();
        let tgl_periksa = calendarInline.value[0].toDateFormat();
        // var result = JSON.parse(api_jadwal_json);
        app.request.get('https://api.rsudsidoarjo.co.id/rest_smartcity/antrian/jadwal/' + id_klinik + '/' + tgl_periksa, function(result) {
          if (result.status == 200) {
            let options = {weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'};
            result.date = calendarInline.value[0].toLocaleDateString('id-ID', options);
            result.id_klinik = id_klinik;
            result.type = polyclinic_id;
            mainView.router.navigate('/tipe-d/rsud_sidoarjo/antrian_ambil/' + btoa(JSON.stringify(result)) + '/');
          } else {
            app.dialog.alert(result.message);
          }
        }, 'json');
      });
    },
  }
};

var antrian_ambil = {
  path: '/tipe-d/rsud_sidoarjo/antrian_ambil/:jadwal/',
  url: './pages/tipe-d/rsud_sidoarjo/antrian_ambil.html',
  name: 'antrian_ambil',
  on: {
    pageInit: function() {
      let jadwal = JSON.parse(atob(mainView.router.currentRoute.params.jadwal));
      jadwal.data.forEach(function(item, index) {
        let content = '<div class="card">' +
          '<div class="card-content">' +
            '<div class="list media-list chevron-center">' +
              '<ul>' +
                '<li>' +
                  '<a href="#" class="item-link item-content item-profile" data-index="' + index + '">' +
                    '<div class="item-media"><img src="images/doctor.png" width="80"></div>' +
                    '<div class="item-inner">' +
                      '<div class="item-title-row">' +
                        '<div class="item-title">' + item.klinik_name + '</div>' +
                      '</div>' +
                      '<div class="item-subtitle">' + (item.nama ? item.nama : '-') + '</div>' +
                      '<div class="item-text">' + jadwal.date + '</div>' +
                      '<div class="item-text">' + item.time_start.slice(0, 5) + ' - ' + item.time_end.slice(0, 5) + '</div>' +
                    '</div>' +
                  '</a>' +
                '</li>' +
              '</ul>' +
            '</div>' +
          '</div>' +
        '</div>';
        $$('#form_antrian_ambil').append(content);
      });

      $$('#form_antrian_ambil .item-profile').on('click', function() {
        let index = $$(this).data('index');
        app.dialog.confirm('Apakah Anda Yakin untuk Memilih Jadwal Tersebut?', function () {
          let body = {
            nik: datauser.nik,
            nama_pasien: datauser.nama.toUpperCase(),
            gender: (datauser.jenis_kelamin == 'Perempuan' ? 'P' : 'L'),
            kota: datauser.tempat_lahir.toUpperCase(),
            tgl_lahir: datauser.tanggal_lahir,
            alamat: datauser.alamat.toUpperCase(),
            hp: datauser.no_telp_pendaftar,
            schedule_id: parseInt(jadwal.data[index].schedule_id),
            clinic_id: parseInt(jadwal.id_klinik)
          };

          // var result = JSON.parse(api_nomor_json);
          app.request.post('https://api.rsudsidoarjo.co.id/rest_smartcity/antrian/ambil_nomor', body, function(result) {
            console.log(result);
            if (result.status == 200) {
              result.jadwal_selesai = jadwal.data[index].time_end;
              result.nama = jadwal.data[index].nama;
              result.dokter_id = jadwal.data[index].dokter_id;
              result.schedule_id = jadwal.data[index].schedule_id;
              result.clinic_id = jadwal.id_klinik;
              result.user_id = datauser.bf_users_id;
              result.type = jadwal.type;
              app.request.post(site_url_mobile_layanan + '/user_support/ambil_antrian', result, function(nomor) {
                if (nomor && nomor.id) {
                  mainView.router.navigate('/tipe-d/rsud_sidoarjo/antrian_nomor/' + nomor.id + '/' + btoa(JSON.stringify(nomor)) + '/');
                } else {
                  app.dialog.alert('Sedang Terjadi Kesalahan, Mohon Coba Kembali Nanti.');
                }
              }, 'json');
            } else {
              if (result.message) {
                app.dialog.alert(result.message);
              } else if (result.datapostgre) {
                app.dialog.alert(result.datapostgre);
              }
            }
          }, 'json');
        });
      });
    },
  }
};

var antrian_nomor = {
  path: '/tipe-d/rsud_sidoarjo/antrian_nomor/:antrian_id/:nomor/',
  url: './pages/tipe-d/rsud_sidoarjo/antrian_nomor.html',
  name: 'antrian_nomor',
  on: {
    pageInit: function() {
      let antrian_id = mainView.router.currentRoute.params.antrian_id;
      let nomor = JSON.parse(atob(mainView.router.currentRoute.params.nomor));

      let type = '';
      if (nomor.type == 1) {
        type = 'Klinik Spesialis';
      } else if (nomor.type == 2) {
        type = 'Klinik Eksekutif';
      }

      $$('.item-profile #type').html('<i class="icon f7-icons size-20">bag_fill_badge_plus</i>&emsp;' + type);
      $$('.item-profile #klinik').html('<i class="icon f7-icons size-20">placemark_fill</i>&emsp;' + nomor.klinik);
      if (nomor.nama)
        $$('.item-profile .item-subtitle').html('<i class="icon f7-icons size-20">person_fill</i>&emsp;' + nomor.nama);
      let options = {weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'};
      let date = new Date(nomor.jadwal_tanggal).toLocaleDateString('id-ID', options);
      $$('.item-profile #tanggal_antrian').html('<i class="icon f7-icons size-20">calendar_today</i>&emsp;' + date);
      let time = nomor.jadwal_mulai.slice(0, 5) + ' - ' + nomor.jadwal_selesai.slice(0, 5);
      $$('.item-profile #jam_antrian').html('<i class="icon f7-icons size-20">clock_fill</i>&emsp;' + time);
    },
  }
};