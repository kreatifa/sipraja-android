var $$ = Dom7;
var app = new Framework7({
  id: 'go.id.sidoarjokab.sipraja',
  name: 'SIPRAJA',
  dialog: {
    title: 'SIPRAJA',
    buttonOk: 'OK',
  },
  root: '#app',
  routes: routes,
  theme: 'md',
  touch: {
    disableContextMenu: false,
  },
});
var mainView = app.views.create('.view-main');
var datauser, iamthedoor, dataparsed, userencoded;
$$(document).on('deviceready', async function () {
  Attachment.openDatabase();
  vers_check();
  if (localStorage.logged_in && JSON.parse(localStorage.logged_in) === true && localStorage.datauser) {
    datauser = JSON.parse(localStorage.datauser);
    sess_update();
    app.request.post(site_url_mobile + '/siurban_mobile/sess_update', { user_id: datauser.bf_users_id }, function (data) {
      localStorage.setItem('datauser', JSON.stringify(data));
      sess_store();
    }, 'json');
  } else {
    mainView.router.navigate('/login/');
  }

  $$(document).on('page:init', function () {
    addformupload_status = true;
  });

  $$(document).on('backbutton', function () {
    mainView.router.back();
  });
});

function vers_check() {
  app.request.post(site_url_mobile + '/siurban_mobile/vers_check', { vers: '3.6.1' }, function (data) {
    if (data != 1) {
      var playstore_popup = app.popup.create({
        content:
          `<div class="popup">
            <div class="block">
            <p>Mohon Update Versi Sipraja Terbaru di PlayStore</p>
            <p><a href="https://play.google.com/store/apps/details?id=go.id.sidoarjokab.sipraja" class="link external popup-close">OK</a></p>
            </div>
          </div>`
      });
      playstore_popup.open();
    }
  }, 'json');
}

function sess_update() {
  datauser = JSON.parse(localStorage.datauser);
  let destination = JSON.parse(localStorage.destination);
  iamthedoor = { user_id: datauser.bf_users_id, kecamatan_id: datauser.kecamatan, kelurahan_id: datauser.kode_desa, role_id: datauser.role_id };
  currentUserID = iamthedoor.user_id;
  currentUser = { userId: currentUserID };
  userencoded = window.btoa(datauser.email + ':' + datauser.nik).replace(/=/g, '');

  app.dialog.alert('Selamat Datang ' + datauser.nama);
  if (iamthedoor.role_id == 1 || destination == 'dashboard') {
    mainView.router.navigate('/dashboard/');
  } else if (iamthedoor.role_id == 46 || destination == 'segmen') {
    mainView.router.navigate('/segmen_home/');
  } else if (destination == 'pelayanan') {
    mainView.router.navigate('/home/');
    // mainView.router.navigate('/tipe-a/new_sk_domisili_kurma/');
  }
}

function sess_store() {
  datauser = JSON.parse(localStorage.datauser);
  iamthedoor = { user_id: datauser.bf_users_id, kecamatan_id: datauser.kecamatan, kelurahan_id: datauser.kode_desa, role_id: datauser.role_id };
  currentUserID = iamthedoor.user_id;
  currentUser = { userId: currentUserID };
}

function logout() {
  $$('#logout').prop('disabled', true);
  app.dialog.confirm('Apakah Anda yakin akan keluar?', function () {
    sess_destroy();
  }, function () {
    $$('#logout').prop('disabled', false);
  });
}

function sess_destroy() {
  localStorage.setItem('logged_in', 'false');
  localStorage.removeItem('datauser');
  localStorage.removeItem('destination');
  datauser = {};
  iamthedoor = {};
  userencoded = null;
  mainView.router.back('/login/', { ignoreCache: true, force: true });
}

$$(document).on('page:init', '.page[data-name="login"]', function () {
  $$('#submitlogin').on('click', function () {
    var nik = $$('#login').val();
    var password = $$('#password').val();
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
            if (data.role_id == 3 || data.role_id == 5 || data.role_id == 7 || data.role_id == 9 || data.role_id == 57) {
              app.dialog.close();
              app.dialog.alert('Dimohon bagi Operator, Admin dan pengguna luar sidoarjo untuk menggunakan Sipraja versi Web. Karna versi Mobile hanya untuk User dan TTD saja.');
              return false;
            }
            const dest = 'pelayanan';

            localStorage.setItem('logged_in', 'true');
            localStorage.setItem('datauser', JSON.stringify(data));
            localStorage.setItem('destination', JSON.stringify(dest));
            app.dialog.close();
            sess_update();
          } else {
            app.dialog.close();
            app.dialog.alert(data.msg);
          }
        }
      }, 'json');
    }
  });

  $$('#daftar').on('click', function () {
    mainView.router.navigate('/register/');
  });
});

function homeLoad() {
  $$('#reload').on('click', function () {
    mainView.router.navigate('/home/', {
      ignoreCache: true,
      reloadCurrent: true
    });
  });

  if (iamthedoor.role_id == 4) {
    $('#dom_multi').css('display', 'block');
  } else {
    $('#dom_single').css('display', 'block');
  }

  if (iamthedoor.role_id != '4') {
    if (iamthedoor.role_id == '7' || iamthedoor.role_id == '8') {
      $$("#tipe-c").remove();
      $$("#button-c").remove();
      $$('#tipe-d').remove();
      $$('#button-d').remove();
      $$(".tab-link-highlight").css("width", "50%");
      app.request.post(site_url_mobile + '/siurban_mobile/dashboard_data', iamthedoor, function (data) {
        $$('#count_tipe_a').html(data.tipe_a);
        $$('#count_surat_kelahiran').html(data.surat_kelahiran);
        $$('#count_surat_kematian').html(data.surat_kematian);
        $$('#count_sk_tidak_mampu').html(data.sk_tidak_mampu);
        $$('#count_sk_biodata_penduduk').html(data.sk_biodata_penduduk);
        $$('#count_sk_umum_desa').html(data.sk_belum_pernah_kawin);
        $$('#count_sk_domisili_usaha').html(data.sk_domisili_usaha);
        $$('#count_sk_domisili_luar').html(data.sk_domisili_luar);
        $$('#count_surat_pengantar_kua').html(data.surat_pengantar_kua);
        $$('#count_tipe_b').html(data.tipe_b);
        $$('#count_kartu_keluarga').html(data.sp_kartu_keluarga);
        $$('#count_permohonan_ktp').html(data.permohonan_ktp);
        $$('#count_skck').html(data.sp_skck);
        $$('#count_sk_pindah').html(data.sk_pindah);
        $$('#count_sk_umum_kecamatan').html(data.sku_kec);
        $$('#count_sktm_kecamatan').html(data.sktm_kec);
        $$('#count_waris').html(data.waris);
        $$('#count_ijin_keramaian').html(data.ijin_keramaian);
      }, 'json');
    }

    if (iamthedoor.role_id == '9' || iamthedoor.role_id == '10') {
      $$("#tipe-a").remove();
      $$("#button-a").remove();
      $$('#tipe-d').remove();
      $$('#button-d').remove();
      $$("#tipe-b").addClass('tab-active');
      $$(".tab-link-highlight").css("width", "50%");
      app.request.post(site_url_mobile + '/siurban_mobile/dashboard_data', iamthedoor, function (data) {
        $$('#count_tipe_b').html(data.tipe_b);
        $$('#count_kartu_keluarga').html(data.sp_kartu_keluarga);
        $$('#count_permohonan_ktp').html(data.permohonan_ktp);
        $$('#count_skck').html(data.sp_skck);
        $$('#count_sk_pindah').html(data.sk_pindah);
        $$('#count_sk_umum_kecamatan').html(data.sku_kec);
        $$('#count_sktm_kecamatan').html(data.sktm_kec);
        $$('#count_waris').html(data.waris);
        $$('#count_ijin_keramaian').html(data.ijin_keramaian);
        $$('#count_tipe_c').html(data.tipe_c);
        $$('#count_imb').html(data.imb);
        $$('#count_imb_luar').html(data.imb_luar);
        $$('#count_kpk').html(data.kpk);
        $$('#count_siup').html(data.siup);
        $$('#count_tdp').html(data.tdp);
      }, 'json');
    }

    if (iamthedoor.role_id == '24') {
      $$("#tipe-a").remove();
      $$("#button-a").remove();
      $$("#tipe-c").remove();
      $$("#button-c").remove();
      $$("#tipe-b").addClass('tab-active');
      $$(".tab-link-highlight").css("width", "50%");
      $$(".not_dinsos").remove();
      $$("#sktm_dinsos").show();
      app.request.post(site_url_mobile + '/siurban_mobile/dashboard_data', iamthedoor, function (data) {
        $$('#count_tipe_b').html(data.tipe_b);
        $$('#count_sktm_dinsos').html(data.sktm_dinsos);
      }, 'json');
    }

    if (iamthedoor.role_id == '38') {
      $$("#tipe-a").remove();
      $$("#button-a").remove();
      $$("#tipe-b").remove();
      $$("#button-b").remove();
      $$("#tipe-c").remove();
      $$("#button-c").remove();
      $$("#tipe-d").addClass('tab-active');
      $$(".tab-link-highlight").css("width", "50%");
    }

    $$('#notif_surat').remove();
    $$('#move_dom').remove();
    $$('#list_komplain').remove();
  } else if (iamthedoor.role_id == '4') {
    $$('#domi_luar').remove();
    $$('#imb_luar').remove();
    $$('.badge').remove();
    $$('#gen_token').remove();
    $$('#cek_lowongan').on('click', function () {
      app.request.post(site_url_mobile_layanan + '/user_support/cek_ak1', { nik: datauser.nik }, function (data) {
        if (parseInt(data) > 0) {
          mainView.router.navigate('/tipe-d/disnaker/cek_lowongan/');
        } else if (parseInt(data) < 1) {
          app.dialog.confirm('Anda harus mendaftar Kartu Pencari Kerja (AK 1) pada TIPE-C terlebih dahulu sebelum melihat layanan Cek Lowongan', 'SIPRAJA', function () {
            mainView.router.navigate('/tipe-c/kartupencarikerja');
          });
        } else {
          app.dialog.alert('Terjadi Kesalahan')
        }
      }, function (error) {
        alert(error);
      });
    });

    function check_nop() {
      if (!datauser.nop || !datauser.status_nop) {
        var nop_popup = app.popup.create({
          content:
            `<div class="popup">
            <div class="block">
                <br>
                <p>NOP PBB Anda Belum Terdaftar, Mohon Lengkapi Data Berikut :</p>
                <div class="list">
                <ul>
                    <li class="item-content item-input">
                    <div class="item-inner">
                        <div class="item-title item-label">NOP</div>
                        <div class="item-input-wrap">
                        <input type="number" id="nop" min="0" placeholder="NOP">
                        </div>
                    </div>
                    </li>
                    <li class="item-content item-input">
                    <div class="item-inner">
                        <div class="item-title item-label">Status NOP</div>
                        <div class="item-input-wrap input-dropdown-wrap">
                        <select id="status_nop">
                            <option value="Milik Saya">Milik Saya</option>
                            <option value="Dalam Penguasaan Saya">Dalam Penguasaan Saya</option>
                            <option value="Dalam Pemanfaatan Saya">Dalam Pemanfaatan Saya</option>
                            <option value="Milik Keluarga Saya">Milik Keluarga Saya</option>
                            <option value="Milik Kerabat Saya">Milik Kerabat Saya</option>
                        </select>
                        </div>
                    </div>
                    </li>
                </ul>
                </div>
                <div class="row">
                <button class="col-50 button button-fill" id="save_nop">Simpan</button>
                <a href="#" class="col-50 button button-fill color-red popup-close">Tutup</a>
                </div>
            </div>
            </div>`,
          on: {
            opened: function () {
              $$('#save_nop').on('click', function () {
                if ($$('#nop').val().length != 18) {
                  app.dialog.alert('NOP harus berisi 18 Digit!');
                  return false;
                }

                app.dialog.preloader('Tunggu Sebentar...');
                var send_nop = {
                  user: {
                    nik: datauser.nik,
                    bf_users_id: datauser.bf_users_id,
                  },
                  nop: $$('#nop').val(),
                  status_nop: $$('#status_nop').val(),
                };
                app.request.post(site_url_mobile_layanan + '/user_support/send_nop', send_nop, function (data) {
                  datauser.nop = send_nop.nop;
                  datauser.status_nop = send_nop.status_nop;
                  localStorage.setItem('datauser', JSON.stringify(datauser));
                  sess_update();
                  app.dialog.close();
                  nop_popup.close();
                  show_pbb(data);
                }, 'json');
              });
            },
          }
        });
        nop_popup.open();
      } else if (parseInt(datauser.pbb_terutang) > 0) {
        show_pbb({ pbb_terutang: parseInt(datauser.pbb_terutang) });
      }
    }

    function show_pbb({ status = 0, pbb_terutang = 0, doc_path_nop = '' }) {
      let alert_text = 'Mohon Maaf, Data NOP Anda tidak dapat Ditemukan.';
      if (pbb_terutang > 0) {
        alert_text = 'Mohon untuk Segera Melunasi Tagihan PBB Anda dengan Nilai Sebesar:<br>Rp. ' + toIdrFormat(pbb_terutang);
      }

      app.dialog.alert(alert_text, function () {
        check_survey_regsosek();
        check_survey();
      });
    }

    function check_survey() {
      app.request.post(base_url + '/kuisioner/get_id_survey/' + datauser.bf_users_id, function (data) {
        if (data.id_survey != 0) {
          let encoded = window.btoa(datauser.bf_users_id + 'e' + data.id_survey).replace(/=/g, '');
          if (data.individu == 0 || data.keluarga == 0) {
            app.dialog.confirm('Untuk Pembaharuan Data Anda. Mohon untuk Mengisi Form Survey SDGS berikut ini!', function () {
              cordova.InAppBrowser.open(base_url + '/kuisioner/index/' + encoded, '_system');
            });
          }
        }
      }, 'json');
    }

    function check_survey_regsosek() {
      app.request.post(base_url + '/kuisioner_rt_rw/get_id_survey/' + datauser.bf_users_id, function (data) {
        if (data.id_survey != 0) {
          let encoded = window.btoa(datauser.bf_users_id + 'e' + data.id_survey).replace(/=/g, '');
          if (data.cek_survey == 0) {
            app.dialog.confirm('Untuk Pembaharuan Data Anda. Mohon untuk Mengisi Form Survey Regsosek berikut ini!', function () {
              cordova.InAppBrowser.open(base_url + '/kuisioner_rt_rw/index/' + encoded, '_system');
            });
          }
        }
      }, 'json');
    }

    function update_rt_rw() {
      app.dialog.alert(`
        <div>
          <p>Pembaharuan Data mohon lengkapi RT & RW</p>
          <div class="item-inner">
            <div class="item-input-wrap">
              <input type="text" class="pop_rt" style="width:100%;" value="DESA ${(datauser.nama_kel) ? datauser.nama_kel : ''}" placeholder="DESA" readonly>
            </div>
          </div><br>
          <div class="item-inner">
            <div class="item-input-wrap">
              <input type="number" class="pop_rt" style="width:100%;" id="data_rt" min="0" placeholder="RT (Cth: 001)" value="${(datauser.rt) ? datauser.rt : ''}">
            </div>
          </div><br>
          <div class="item-inner">
            <div class="item-input-wrap">
              <input type="number" class="pop_rt" style="width:100%;" id="data_rw" min="0" placeholder="RW (Cth: 001)" value="${(datauser.rw) ? datauser.rw : ''}">
            </div>
          </div>
        </div>
        `,
        'SIPRAJA',
        function () {
          var alert = '';
          var rt = $('#data_rt').val();
          var rw = $('#data_rw').val();
          if (!rt || parseInt(rt) < 0) {
            alert = 'Mohon Isi Data RT';
          } else if (!rw || parseInt(rw) < 0) {
            alert = 'Mohon Isi Data RW';
          } else {
            if (rt.length > 3) {
              alert = 'Mohon Isi Data RT sesuai dengan KTP';
            } else if (rw.length > 3) {
              alert = 'Mohon Isi Data RW sesuai dengan KTP';
            }
          }

          if (alert) {
            app.dialog.alert(alert, 'SIPRAJA', function () {
              update_rt_rw()
            });
            return false;
          }

          app.dialog.preloader('Loading...');
          let data = [];
          data.push(iamthedoor);
          data.push({
            rt: ((rt.length < 3) ? rt.padStart(3, '0') : rt),
            rw: ((rw.length < 3) ? rw.padStart(3, '0') : rw)
          });
          app.request.post(site_url_mobile_layanan + '/user_support/update_rt_rw', data, function (data) {
            if (data) {
              datauser.rt = rt;
              datauser.rw = rw;
              localStorage.setItem('datauser', JSON.stringify(datauser));
              sess_update();
              app.dialog.close();
              app.dialog.alert('Data Berhasil Disimpan', 'SIPRAJA', function () {
                check_survey_regsosek();
                check_survey();
                // check_nop();
              });
            } else {
              app.dialog.close()
              app.dialog.alert('Terjadi Kesalahan');
            }
          }, function (error) {
            alert(error);
          });
        });
    }

    if (!datauser.rt || !datauser.rw) {
      update_rt_rw();
    } else {
      // check_nop();
    }
  }
}

function menuLoad() {
  if (iamthedoor.role_id != '4') {
    $$('#notif_surat').remove();
    $$('#move_dom').remove();
    $$('#list_komplain').remove();
  } else if (iamthedoor.role_id == '4') {
    $$('#gen_token').remove();
  }

  $$('#logout').on('click', logout);
  app.request.post(`${site_url_mobile_layanan}/pusat_informasi/total`, iamthedoor, function (data) {
    $$('.informasi').text(data ? data : 0);
  }, 'json');
}

$$(document).on('page:init', '.page[data-class="new_layanan"]', function () {
  app.request.post(site_url_mobile + '/siurban_mobile/get_kecamatan_kelurahan/' + datauser.kecamatan + '/' + datauser.kode_desa, function (data) {
    app.dialog.close();
    dataparsed = JSON.parse(data);
    $$("input[name='kecamatan_pemohon']").val(dataparsed.kecamatan);
    $$("input[name='kelurahan_pemohon']").val(dataparsed.kelurahan);
  });
  $$("input[name='nama_pemohon']").val(datauser.nama);
  $$("input[name='alamat_pemohon']").val(datauser.alamat);
  $$("input[name='no_kk']").val(datauser.no_kk);
  $$("input[name='nik_pemohon']").val(datauser.nik);
  $$("input[name='agama']").val(datauser.agama);
  $$("input[name='kwn']").val(datauser.kwn);
  $$("input[name='email_pelapor']").val(datauser.email);
  $$("input[name='telp_pemohon']").val(datauser.no_telp_pendaftar);
});
$$(document).on('page:init', '.page[data-class="new_layanan_d"]', function () {
  app.request.post(site_url_mobile + '/siurban_mobile/get_kecamatan_kelurahan/' + datauser.kecamatan + '/' + datauser.kode_desa, function (data) {
    app.dialog.close();
    dataparsed = JSON.parse(data);
    $$("input[name='kecamatan_pemohon']").val(dataparsed.kecamatan);
    $$("input[name='kelurahan_pemohon']").val(dataparsed.kelurahan);
  });
  $$("input[name='nama_pemohon']").val(datauser.nama);
  $$("#alamat_pemohon").val(datauser.alamat);
  $$("input[name='nik_pemohon']").val(datauser.nik);
  $$("input[name='agama_pemohon']").val(datauser.agama);
  $$("input[name='pekerjaan_pemohon']").val(datauser.pekerjaan);
  $$("input[name='pendidikan_terakhir_pemohon']").val(datauser.pendidikan_terakhir);
  $$("input[name='jenis_kelamin_pemohon']").val(datauser.jenis_kelamin);
  $$("input[name='tempat_lahir_pemohon']").val(datauser.tempat_lahir);
  $$("input[name='tgl_lahir_pemohon']").val(new Date(datauser.tanggal_lahir).toDateIndoFormat());
  $$("input[name='email_pemohon']").val(datauser.email);
  $$("input[name='telp_pemohon']").val(datauser.no_telp_pendaftar);
  $$("input[name='no_kk']").val(datauser.no_kk);
  $$("input[name='kwn']").val(datauser.kwn);
});
$$(document).on('page:init', '.page[data-class="new_layanan_kartu_keluarga"]', function () {
  app.request.post(site_url_mobile + '/siurban_mobile/get_kecamatan_kelurahan/' + datauser.kecamatan + '/' + datauser.kode_desa, function (data) {
    app.dialog.close();
    dataparsed = JSON.parse(data);
    $$("input[name='kecamatan_pemohon']").val(dataparsed.kecamatan);
    $$("input[name='kelurahan_pemohon']").val(dataparsed.kelurahan);
  });
  $$("input[name='nik_pemohon']").val(datauser.nik);
  $$("input[name='nama_pemohon']").val(datauser.nama);
  $$("input[name='jenis_kelamin_pemohon']").val(datauser.jenis_kelamin);
  $$("input[name='agama_pemohon']").val(datauser.agama);
  $$("input[name='status_kawin_pemohon']").val(datauser.status_kawin);
  $$("input[name='tempat_lahir_pemohon']").val(datauser.tempat_lahir);
  $$("input[name='tanggal_lahir_pemohon']").val(datauser.tanggal_lahir);
  $$("input[name='pekerjaan_pemohon']").val(datauser.pekerjaan);
  $$("input[name='alamat_pemohon']").val(datauser.alamat);
  $$("input[name='email_pemohon']").val(datauser.email);
  $$("input[name='telp_pemohon']").val(datauser.no_telp_pendaftar);
  app.dialog.close();
});
$$(document).on('page:init', '.page[data-class="new_layanan_b"]', function () {
  app.request.post(site_url_mobile + '/siurban_mobile/get_kecamatan_kelurahan/' + datauser.kecamatan + '/' + datauser.kode_desa, function (data) {
    app.dialog.close();
    dataparsed = JSON.parse(data);
    $$("input[name='kecamatan_pemohon']").val(dataparsed.kecamatan);
    $$("input[name='kelurahan_pemohon']").val(dataparsed.kelurahan);
  });
  $$("input[name='nik_pemohon']").val(datauser.nik);
  $$("input[name='nama_pemohon']").val(datauser.nama);
  $$("input[name='jenis_kelamin_pemohon']").val(datauser.jenis_kelamin);
  $$("input[name='agama_pemohon']").val(datauser.agama);
  $$("input[name='status_kawin_pemohon']").val(datauser.status_kawin);
  $$("input[name='tempat_lahir_pemohon']").val(datauser.tempat_lahir);
  $$("input[name='tanggal_lahir_pemohon']").val(datauser.tanggal_lahir);
  $$("input[name='pekerjaan_pemohon']").val(datauser.pekerjaan);
  $$("input[name='alamat_pemohon']").val(datauser.alamat);
  $$("input[name='email_pelapor']").val(datauser.email);
  $$("input[name='telp_pemohon']").val(datauser.no_telp_pendaftar);
  $$("input[name='nomor_kk']").val(datauser.no_kk);
  $$("input[name='alamat_kk']").val(datauser.alamat);
  $$("input[name='tempat_tinggal']").val(datauser.alamat);
  $$("input[name='nik']").val(datauser.nik);
  $$("input[name='nama']").val(datauser.nama);
  $$("input[name='email']").val(datauser.email);
  $$("input[name='no_telp']").val(datauser.no_telp_pendaftar);
  app.dialog.close();
});
$$(document).on('page:init', '.page[data-class="new_kartu_pencari_kerja"', function (argument) {
  app.request.post(site_url_mobile + '/siurban_mobile/get_kecamatan_kelurahan/' + datauser.kecamatan + '/' + datauser.kode_desa, function (data) {
    app.dialog.close();
    dataparsed = JSON.parse(data);
    $$("input[name='kecamatan_pemohon']").val(dataparsed.kecamatan);
    $$("input[name='kelurahan_pemohon']").val(dataparsed.kelurahan);
  });
  $$("input[name='nik_pemohon']").val(datauser.nik);
  $$("input[name='nama_pemohon']").val(datauser.nama);
  $$("input[name='tempat_lahir_pemohon']").val(datauser.tempat_lahir);
  $$("input[name='jenis_kelamin_pemohon']").val(datauser.jenis_kelamin);
  $$("input[name='agama_pemohon']").val(datauser.agama);
  $$("input[name='status_kawin_pemohon']").val(datauser.status_kawin);
  $$("input[name='tanggal_lahir_pemohon']").val(datauser.tanggal_lahir);
  $$("input[name='pekerjaan_pemohon']").val(datauser.pekerjaan);
  $$("input[name='alamat_pemohon']").val(datauser.alamat);
  $$("input[name='email_pemohon']").val(datauser.email);
  app.dialog.close();
});
$$(document).on('page:init', '.page[data-class="new_layanan_c"', function (argument) {
  app.request.post(site_url_mobile + '/siurban_mobile/get_kecamatan_kelurahan/' + datauser.kecamatan + '/' + datauser.kode_desa, function (data) {
    dataparsed = JSON.parse(data);
    $$("input[name='kecamatan_pemohon']").val(dataparsed.kecamatan);
    $$("input[name='kelurahan_pemohon']").val(dataparsed.kelurahan);
  });
  $$("input[name='nik_pemohon']").val(datauser.nik);
  $$("input[name='nama_pemohon']").val(datauser.nama);
  $$("input[name='tempat_lahir_pemohon']").val(datauser.tempat_lahir);
  $$("input[name='jenis_kelamin_pemohon']").val(datauser.jenis_kelamin);
  $$("input[name='agama_pemohon']").val(datauser.agama);
  $$("input[name='status_kawin_pemohon']").val(datauser.status_kawin);
  $$("input[name='tanggal_lahir_pemohon']").val(datauser.tanggal_lahir);
  $$("input[name='pekerjaan_pemohon']").val(datauser.pekerjaan);
  $$("input[name='alamat_pemohon']").val(datauser.alamat);
  $$("input[name='email_pemohon']").val(datauser.email);
  $$("input[name='telp_pemohon']").val(datauser.no_telp_pendaftar);
  $$("input[name='rt_pemohon']").val(datauser.rt);
  $$("input[name='rw_pemohon']").val(datauser.rw);
  $$("input[name='kode_pos_pemohon']").val(datauser.kode_pos);
});
$$(document).on('page:init', '.page[data-class="siup"]', function (argument) {
  app.request.post(site_url_mobile + '/siurban_mobile/get_kecamatan_kelurahan/' + datauser.kecamatan + '/' + datauser.kode_desa, function (data) {
    dataparsed = JSON.parse(data);
    $$("input[name='kecamatan_pemohon']").val(dataparsed.kecamatan);
    $$("input[name='kelurahan_pemohon']").val(dataparsed.kelurahan);
  });
  $$("input[name='nik_pemohon']").val(datauser.nik);
  $$("input[name='nama_pemohon']").val(datauser.nama);
  $$("input[name='tempat_lahir_pemohon']").val(datauser.tempat_lahir);
  $$("input[name='jenis_kelamin_pemohon']").val(datauser.jenis_kelamin);
  $$("input[name='agama_pemohon']").val(datauser.agama);
  $$("input[name='status_kawin_pemohon']").val(datauser.status_kawin);
  $$("input[name='tanggal_lahir_pemohon']").val(datauser.tanggal_lahir);
  $$("input[name='pekerjaan_pemohon']").val(datauser.pekerjaan);
  $$("input[name='alamat_pemohon']").val(datauser.alamat);
  $$("input[name='email_pemohon']").val(datauser.email);
  $$("input[name='kwn_pemohon']").val(datauser.kwn);
});
$$(document).on('page:init', '.page[data-class="layanan_sk_umum"', function (argument) {
  app.request.post(site_url_mobile + '/siurban_mobile/get_kecamatan_kelurahan/' + datauser.kecamatan + '/' + datauser.kode_desa, function (data) {
    dataparsed = JSON.parse(data);
    $$("input[name='kecamatan_pemohon']").val(dataparsed.kecamatan);
    $$("input[name='kelurahan_pemohon']").val(dataparsed.kelurahan);
  });
  $$("input[name='nik_pemohon']").val(datauser.nik);
  $$("input[name='nama_pemohon']").val(datauser.nama);
  $$("input[name='tempat_lahir_pemohon']").val(datauser.tempat_lahir);
  $$("input[name='jenis_kelamin_pemohon']").val(datauser.jenis_kelamin);
  $$("input[name='agama_pemohon']").val(datauser.agama);
  $$("input[name='status_kawin_pemohon']").val(datauser.status_kawin);
  $$("input[name='tanggal_lahir_pemohon']").val(datauser.tanggal_lahir);
  $$("input[name='pekerjaan_pemohon']").val(datauser.pekerjaan);
  $$("input[name='alamat_pemohon']").val(datauser.alamat);
});
$$(document).on('page:init', '.page[data-class="layanan_domisili_usaha"', function (argument) {
  app.request.post(site_url_mobile + '/siurban_mobile/get_kecamatan_kelurahan/' + datauser.kecamatan + '/' + datauser.kode_desa, function (data) {
    dataparsed = JSON.parse(data);
    $$("input[name='kecamatan_pemohon']").val(dataparsed.kecamatan);
    $$("input[name='kelurahan_pemohon']").val(dataparsed.kelurahan);
  });
  app.request.post(site_url_mobile + '/siurban_mobile/get_kode_kecamatan/', function (kecamatan) {
    var kecamatan_html = '';
    for (var i = 0; i < kecamatan.length; i++) {
      kecamatan_html += '<option value="' + kecamatan[i].kode + '">' + kecamatan[i].nama + '</option>';
    }
    $$("select[name='kecamatan']").html(kecamatan_html).change();
    var kecamatan_kode = $$("select[name='kecamatan']").val();
    get_data_kelurahan(kecamatan_kode);
    $$("select[name='kecamatan']").on("change", function () {
      kecamatan_kode = $$("select[name='kecamatan']").val();
      get_data_kelurahan(kecamatan_kode);
    });
  }, 'json');
  $$("input[name='nik_pemohon']").val(datauser.nik);
  $$("input[name='nama_pemohon']").val(datauser.nama);
  $$("input[name='tempat_lahir_pemohon']").val(datauser.tempat_lahir);
  $$("input[name='jenis_kelamin_pemohon']").val(datauser.jenis_kelamin);
  $$("input[name='agama_pemohon']").val(datauser.agama);
  $$("input[name='status_kawin_pemohon']").val(datauser.status_kawin);
  $$("input[name='tanggal_lahir_pemohon']").val(datauser.tanggal_lahir);
  $$("input[name='pekerjaan_pemohon']").val(datauser.pekerjaan);
  $$("input[name='alamat_pemohon']").val(datauser.alamat);
});
$$(document).on('page:init', '.page[data-class="ijin_mendirikan_bangunan_form"', function (argument) {
  app.request.post(site_url_mobile + '/siurban_mobile/get_kecamatan_kelurahan/' + datauser.kecamatan + '/' + datauser.kode_desa, function (data) {
    dataparsed = JSON.parse(data);
    $$("input[name='kecamatan_pemohon']").val(dataparsed.kecamatan);
    $$("input[name='kelurahan_pemohon']").val(dataparsed.kelurahan);
  });
  app.request.post(site_url_mobile + '/siurban_mobile/get_kode_kecamatan/', function (kecamatan) {
    var kecamatan_html = '';
    for (var i = 0; i < kecamatan.length; i++) {
      kecamatan_html += '<option value="' + kecamatan[i].kode + '">' + kecamatan[i].nama + '</option>';
    }
    $$("select[name='kode_kecamatan_bangunan']").html(kecamatan_html).change();
    var kecamatan_kode = $$("select[name='kode_kecamatan_bangunan']").val();
    get_kelurahan(kecamatan_kode);
    $$("select[name='kode_kecamatan_bangunan']").on("change", function () {
      kecamatan_kode = $$("select[name='kode_kecamatan_bangunan']").val();
      get_kelurahan(kecamatan_kode);
    });
  }, 'json');
  $$("input[name='nik_pemohon']").val(datauser.nik);
  $$("input[name='nama_pemohon']").val(datauser.nama);
  $$("input[name='alamat_pemohon']").val(datauser.alamat);
});

function get_kelurahan(kecamatan_kode) {
  app.request.post(site_url_mobile + '/siurban_mobile/get_kode_kelurahan/' + kecamatan_kode, function (kelurahan) {
    var kelurahan_html = '';
    for (var i = 0; i < kelurahan.length; i++) {
      kelurahan_html += '<option value="' + kelurahan[i].kode + '">' + kelurahan[i].nama + '</option>'
    }
    $$("select[name='kode_kelurahan_bangunan']").html(kelurahan_html).change();
  }, 'json');
}

function get_data_kelurahan(kecamatan_kode, kelurahan_kode = null) {
  app.request.post(site_url_mobile + '/siurban_mobile/get_kode_kelurahan/' + kecamatan_kode, function (kelurahan) {
    var kelurahan_html = '';
    for (var i = 0; i < kelurahan.length; i++) {
      kelurahan_html += '<option value="' + kelurahan[i].kode + '">' + kelurahan[i].nama + '</option>'
    }
    $$("select[name='kelurahan']").html(kelurahan_html).change();
    if (kelurahan_kode != null) {
      $$("select[name='kelurahan']").val(kelurahan_kode).change();
    }
  }, 'json');
}

function get_data_kelurahan_2(kecamatan_kode, kelurahan_kode = null) {
  app.request.post(site_url_mobile + '/siurban_mobile/get_kode_kelurahan/' + kecamatan_kode, function (kelurahan) {
    var kelurahan_html = '';
    for (var i = 0; i < kelurahan.length; i++) {
      kelurahan_html += '<option value="' + kelurahan[i].kode + '">' + kelurahan[i].nama + '</option>'
    }
    $$("select[name='kode_kelurahan']").html(kelurahan_html).change();
    if (kelurahan_kode != null) {
      $$("select[name='kode_kelurahan']").val(kelurahan_kode).change();
    }
  }, 'json');
}

function get_data_kelurahan_3(kecamatan_kode, kelurahan_kode = null) {
  app.request.post(site_url_mobile + '/siurban_mobile/get_kode_kelurahan/' + kecamatan_kode, function (kelurahan) {
    var kelurahan_html = '';
    for (var i = 0; i < kelurahan.length; i++) {
      kelurahan_html += '<option value="' + kelurahan[i].kode + '">' + kelurahan[i].nama + '</option>'
    }
    $$("select[name='kode_kelurahan_bangunan']").html(kelurahan_html).change();
    if (kelurahan_kode != null) {
      $$("select[name='kode_kelurahan_bangunan']").val(kelurahan_kode).change();
    }
  }, 'json');
}

function get_current_date() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth();
  var monthname = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  var today = dd + '-' + monthname[mm] + '-' + yyyy;
  return today;
}

function get_today_date() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  var today = dd + '-' + mm + '-' + yyyy;
  return today;
}

function getDiffDate(data, maxDays) {
  var tanggal = data.split(' - ');

  var firstDate = new Date(tanggal[0]);
  var secondDate = new Date(tanggal[1]);

  var diffDays = secondDate.getDate() - firstDate.getDate();

  if (diffDays > maxDays) {
    return true;
  } else {
    return false;
  }
}

function get_today() {
  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return today;
}

function cek_iumk() {
  var nomor_iumk = $$("input[name='no_iumk']").val();
  app.request({
    url: site_url_mobile + '/siurban_mobile/get_iumk/',
    async: false,
    method: 'POST',
    data: { no_iumk: nomor_iumk },
    success: function (iumk) {
      if (iumk) {
        $('#nama_usaha').val(iumk['nama_usaha']);
        $('#npwp_usaha').val(iumk['npwp_usaha']);
        $('#status_usaha').val(iumk['status_usaha']);
        $('#alamat_usaha').val(iumk['alamat_usaha']);
        $('#kec_usaha').val(iumk['kec_usaha']);
        $('#nama_kec_usaha').val(iumk['nama_kec_usaha']);
        $('#kel_usaha').val(iumk['kel_usaha']);
        $('#nama_kel_usaha').val(iumk['nama_kel_usaha']);
        $('#pos_usaha').val(iumk['pos_usaha']);
        $('#telp_usaha').val(iumk['telp_usaha']);
        $('#fax_usaha').val(iumk['fax_usaha']);
        $('#email_usaha').val(iumk['email_usaha']);
        $('#modal_usaha').val(iumk['modal_usaha']);
        $('#omzet_usaha').val(iumk['omzet_usaha']);
        $('#tenaga_jumlah_usaha').val(iumk['tenaga_jumlah_usaha']);
        $('#sarana_usaha').val(iumk['sarana_usaha']);
        $('#kegiatan_usaha').val(iumk['nama_kegiatan_usaha']);
        app.dialog.alert('IUMK dengan Nama Perusahaan : "' + iumk['nama_usaha'] + '" Ditemukan.');
        return_val = true;
      } else {
        $('#nama_usaha').val('');
        $('#npwp_usaha').val('');
        $('#status_usaha').val('');
        $('#alamat_usaha').val('');
        $('#kec_usaha').val('');
        $('#nama_kec_usaha').val('');
        $('#kel_usaha').val('');
        $('#nama_kel_usaha').val('');
        $('#pos_usaha').val('');
        $('#telp_usaha').val('');
        $('#fax_usaha').val('');
        $('#email_usaha').val('');
        $('#modal_usaha').val('');
        $('#omzet_usaha').val('');
        $('#tenaga_jumlah_usaha').val('');
        $('#sarana_usaha').val('');
        $('#kegiatan_usaha').val('');
        app.dialog.alert('IUMK Tidak Ditemukan, Mohon Cek Nomor IUMK Anda Kembali.');
        return_val = false;
      }
    },
    dataType: 'json',
  });
  return return_val;
}

function approve(function_url, this_user_is_the_last_index, esign = '') {
  data = $.extend(app.form.convertToData('#approval'), iamthedoor);
  var url = site_url_mobile_layanan + function_url + '/' + iamthedoor.user_id + '/' + iamthedoor.kecamatan_id + '/' + iamthedoor.kelurahan_id + '/';
  if (this_user_is_the_last_index == true && $$("select[name='status']").val() == 2 && esign.length == 0) {
    app.dialog.alert('Passphrase Tidak Boleh Kosong');
  } else {
    app.dialog.preloader('Sedang Proses...');
    data['esign'] = window.btoa(esign).replace(/=/g, '');
    app.request.post(url, data, function (data) {
      if (isNaN(data)) {
        app.dialog.close();
        if (data.status == 'wrong') {
          app.dialog.alert(data.message);
        } else if (data.status == 'success') {
          app.dialog.alert('Berhasil');
        } else {
          app.dialog.alert('Terjadi Kesalahan Dalam Sistem.');
        }
        $('#datatables').DataTable().ajax.reload();
        mainView.router.back();
      } else {
        app.dialog.close();
        app.dialog.alert('Terjadi Kesalahan Dalam Sistem.');
        mainView.router.back();
        $('#datatables').DataTable().ajax.reload();
      }
    }, function () {
      app.dialog.close();
      app.dialog.alert('Peringatan', 'Anda Sedang Tidak Tersambung Dengan Internet.');
      mainView.router.back();
      $('#datatables').DataTable().ajax.reload();
    }, 'json');
  }
}

function download_doc(doc_path) {
  let encoded = window.btoa('dasarnakal' + 'dummy').replace(/=/g, '');
  Attachment.download(doc_path,
    base_url + '/esign/acquire_doc/' + encoded + '/' + doc_path
  );
}

function download_external(subdir, doc_path) {
  Attachment.download(doc_path,
    base_url + '/esign/acquire_external/' + subdir + '/' + doc_path
  );
}

function preview_doc(doc_path, subdir = 'logs') {
  let encoded = window.btoa(doc_path + 'dasarnakal' + 'dummy').replace(/=/g, '');
  // let url = 'https://docs.google.com/gview?embedded=true&url=' + site_url_mobile + '/esign/access_doc/' + encoded;
  let url = base_url + '/pdfjs/web/viewer.php?encoded=' + encoded + '&dir=' + subdir;
  inAppBrowser = cordova.InAppBrowser.open(url, '_blank', 'hidden=yes,location=no,zoom=no');
  inAppBrowser.addEventListener('loadstop', function () {
    app.dialog.close();
    inAppBrowser.show();
  });
  inAppBrowser.addEventListener('loaderror', function () {
    app.dialog.close();
    inAppBrowser.close();
    app.dialog.alert('Mohon Maaf, Sedang Terjadi Kesalahan.');
  });
}

function ttdview(database64) {
  var canvas_static = document.getElementById("signature_pad_static");
  if (canvas_static) {
    var signaturePad_static = new SignaturePad(canvas_static);
    signaturePad_static.fromDataURL("data:image/png;base64," + database64, { ratio: 1 });
    signaturePad_static.off();
  }
}

function document_look(std, ptd) {
  switch (std) {
    case '1':
      std = 'Menunggu';
      break;
    case '2':
      std = 'Disetujui';
      break;
    case '3':
      std = 'Ditolak';
      break;
    default:
      std = 'Belum Diterima';
      break;
  }
  $$("#std").html(std);
  $$("#ptd").html(ptd);
}

function cek_tagihanLoad() {
  app.dialog.preloader();
  app.request.post(site_url_mobile_layanan + '/user_support/get_tagihan', [iamthedoor, { nik: datauser.nik }], function (response) {
    app.dialog.close();
    let error = '';
    if (response.error) {
      error = `
      <div class="card bg-color-red text-color-white">
        <div class="card-header">Terjadi Kesalahan :</div>
        <div class="card-content card-content-padding">
        ${response.error}
        </div>
      </div>`;
    }
    let fields = response.field.reduce((acc, val) => (acc[val] = null, acc), {});
    let datas = response.data;
    if (datas.length == 0) {
      app.dialog.confirm('Maaf anda belum Mendaftarkan nomor tagihan, tekan OK untuk mengisi form tagihan.', 'SIPRAJA', () => mainView.router.navigate('/change_pass/'), () => mainView.router.back());
    }
    let contentTable = '';
    fields['nop'] = '/tipe-d/bppd_pajak/cek_pbb';
    fields['pdam'] = '/tipe-d/pdam/cek_tagihan';
    for (let field in fields) {
      let title = (field.includes('_')) ? field.replace(/_/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()) : field.toUpperCase();
      let contentSubRow = '';
      let contentRow = `
            <td>-</td>
            <td>-</td>
            <td>-</td>
        `;
      if (datas.hasOwnProperty(field)) {
        let arrayData = Object.keys(datas[field]);
        let href = ``;
        contentRow = `
                <td>-</td>
                <td>-</td>
                <td>
                    <button class="button button-small button-fill color-green collapsed" data-buka=".collapse${field}" type="button">Lihat</button>
                </td>
            `;
        if (arrayData.length < 2) {
          if (fields[field]) {
            href = `
                        href="${fields[field]}/${btoa(arrayData[0]).replace(/=/g, "")}" target="_blank"
                    `;
          }
          contentRow = `
                    <td>${arrayData[0]}</td>
                    <td>${toIdrFormat(datas[field][arrayData[0]])}</td>
                    <td>
                    <a ${href} class="button button-small button-fill color-red">Detail</a>
                    </td>
                `;
        } else {
          for (let nomor in datas[field]) {
            if (fields[field]) {
              href = `
                            href="${fields[field]}/${btoa(nomor).replace(/=/g, "")}" target="_blank"
                        `;
            }
            contentSubRow += `
                        <tr class="collapse${field}" style="display:none">
                        <td>-</td>
                        <td>${nomor}</td>
                        <td>${toIdrFormat(datas[field][nomor])}</td>
                        <td>
                            <a ${href} class="button button-small button-fill color-red">Detail</a>
                        </td>
                        </tr>
                    `;
          }
        }
      }
      contentTable += `
            <tr style="background-color: #f9f9f9">
                <td>${title}</td>
                ${contentRow}
            </tr>
            ${contentSubRow}
        `;
    }
    var table_tagihan = `
    ${error}
    <div class="card data-table">
      <table class="table">
          <thead>
          <tr>
              <th><b>Jenis Tagihan</b></th>
              <th><b>Nomor</b></th>
              <th><b>Total tagihan</b></th>
              <th><b>Aksi</b></th>
          </tr>
          </thead>
          <tbody>
          ${contentTable}
          </tbody>
      </table>
    </div>
    `;
    $$('#list_tagihan').html(table_tagihan);
    $('.collapsed').on('click', function () {
      let child = $($(this).data('buka'));
      (child.is(':hidden')) ? child.show() : child.hide();
    });
  }, function () {
    app.dialog.close();
    app.dialog.alert('Terjadi Kesalahan mohon cek berulang', 'SIPRAJA', () => mainView.router.back());
  }, 'json');
}

function change_passLoad() {
  tablename = "kt_data_pendaftar";
  find_profile(datauser.id);
  $$('#nik').val(datauser.nik);
  $$('#nama').val(datauser.nama);
  $$('#no_telp_pendaftar').val(datauser.no_telp_pendaftar);
  $$('#pendidikan_terakhir').val(datauser.pendidikan_terakhir);
  $$('#aktif_organisasi').val(datauser.aktif_organisasi);
  $$('#status_kb').val(datauser.status_kb);
  ($$('#berat_badan').val() == '') ? $$('#berat_badan').val(0) : $$('#berat_badan').val(datauser.berat_badan);
  $$('#kode_pos').val(datauser.kode_pos);
  $$('#rw').val(datauser.rw);
  $$('#rt').val(datauser.rt);
  $$('#facebook').val(datauser.facebook);
  $$('#linkedin').val(datauser.linkedin);
  $$('#twitter').val(datauser.twitter);
  $$('#instagram').val(datauser.instagram);
  $$('#angkatan_kerja').val(datauser.angkatan_kerja);
  $$('#keahlian').val(datauser.keahlian);
  ($$('#tinggi_badan').val() == '') ? $$('#tinggi_badan').val(0) : $$('#tinggi_badan').val(datauser.tinggi_badan);
  $$('#deskripsi_diri').val(datauser.deskripsi_diri);

  app.request.post(site_url_mobile_layanan + '/user_support/cek_nomor_tagihan/', [iamthedoor, { nik: datauser.nik }], function (data) {
    if (data.length == 0) return false;
    let element = {};
    data.forEach(function (val, index) {
      for (let field in val) {
        let title = (field.includes('_')) ? field.replace(/_/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()) : field.toUpperCase();
        if (val[field]) {
          if (!element.hasOwnProperty(field)) element[field] = '';
          element[field] += `
          <div class="item-input-wrap ${field}"  data-id="${index}">
            <input type="text" name="${field}[${index}]" value="${val[field] || ''}" placeholder="${title}">
          </div>`;
        }
      }
    });
    for (let key in element) {
      if (element[key]) $$(`div.content-${key}`).html(element[key]);
    }
  }, 'json');

  $$('.addTagihan').on('click', function (e) {
    e.preventDefault();
    let el = $$(this).data('attr');
    let lastId = $(`div.${el}:last`);
    let id = lastId.data('id') + 1;
    let title = (el.includes('_')) ? el.replace(/_/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()) : el.toUpperCase();
    lastId.after(`
    <div class="item-input-wrap ${el}" data-id="${id}">
     <input type="text" name="${el}[${id}]" placeholder="${title}">
    </div>`);
  });

  $$('.removeTagihan').on('click', function (e) {
    e.preventDefault();
    let el = $$(this).data('attr');
    let lastId = $(`div.${el}:last`);
    if ($(`div.${el}`).length <= 1) return false;
    lastId.remove();
  });

  $$('#sinkronisasi').on('click', function (event) {
    event.preventDefault();
    if (!$('#sinkronisasi_siap_kerja').is(':checked')) {
      app.dialog.alert('Mohon untuk Menyetujui Sinkronisasi Aplikasi Siap Kerja!');
      return false;
    }

    app.dialog.confirm('Apakah Anda yakin untuk menyambungkan data profil Sipraja dengan Siap Kerja?<br>Untuk info lebih lanjut mengenai Aplikasi Siap Kerja <a href="http://siapkerja.sidoarjokab.go.id/" class="link external">Klik di Sini</a>.', 'Peringatan', function () {
      app.dialog.preloader('Tunggu Sebentar...');
      app.request.post(site_url_mobile_layanan + '/user_support/cek_siap_kerja', { nik: datauser.nik }, function (response) {
        app.dialog.close();
        if (response.id) {
          $$('#berat_badan').val(response.weight);
          $$('#kode_pos').val(response.poscode);
          $$('#facebook').val(response.facebook);
          $$('#linkedin').val(response.linkedin);
          $$('#twitter').val(response.twitter);
          $$('#instagram').val(response.instagram);
          $$('#angkatan_kerja').val(response.job_status).trigger('change');
          $$('#slogan').val(response.head_professional);
          $$('#deskripsi_diri').val(response.description);
          app.dialog.alert('Sinkronisasi dengan Data Siap Kerja Berhasil!');
        } else {
          var sinkronisasi_popup = app.popup.create({
            content:
              `<div class="popup">
                <div class="block">
                  <br>
                  <p>Data Anda belum terdaftar di Siap Kerja, Anda yakin melanjutkan pendaftaran?</p>
                  <div class="list">
                    <ul>
                      <li class="item-content item-input">
                        <div class="item-inner">
                          <div class="item-title item-label">Password Siap Kerja</div>
                          <div class="item-input-wrap">
                            <input type="password" id="sandi_siap_kerja" min="0" placeholder="Isi Password untuk Akun Siap Kerja Anda">
                          </div>
                        </div>
                      </li>
                      <li class="item-content item-input">
                        <div class="item-inner">
                          <div class="item-title item-label">Ulangi Password Siap Kerja</div>
                          <div class="item-input-wrap">
                            <input type="password" id="resandi_siap_kerja" min="0" placeholder="Isi Ulang Password untuk Akun Siap Kerja Anda">
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="row">
                    <button class="col-50 button button-fill" id="save_sinkronisasi">Lanjutkan</button>
                    <a href="#" class="col-50 button button-fill color-red popup-close">Batal</a>
                  </div>
                </div>
              </div>`,
            on: {
              opened: function () {
                $$('#save_sinkronisasi').on('click', function () {
                  if ($$('#sandi_siap_kerja').val().length != 8 || $$('#resandi_siap_kerja').val().length != 8) {
                    alert('Password dan Isi Ulang Password harus berisi 8 Digit!');
                    return false;
                  } else if ($$('#sandi_siap_kerja').val() != $$('#resandi_siap_kerja').val()) {
                    alert('Password dan Isi Ulang Password harus harus sama!');
                    return false;
                  }

                  app.dialog.preloader('Tunggu Sebentar...');
                  let daftar_siap_kerja = {
                    user: iamthedoor,
                    sandi_siap_kerja: $$('#sandi_siap_kerja').val(),
                  };
                  app.request.post(site_url_mobile_layanan + '/user_support/daftar_siap_kerja', daftar_siap_kerja, function (response) {
                    app.dialog.close();
                    sinkronisasi_popup.close();
                    if (response.error) {
                      app.dialog.alert(response.error);
                    } else if (response.id) {
                      app.dialog.alert("Akun Siap Kerja berhasil Dibuat. Gunakan Email Sipraja Anda dan Password Siap Kerja yang Baru Saja Anda Inputkan untuk Masuk ke dalam Aplikasi Siap Kerja <a href='http://siapkerja.sidoarjokab.go.id/' target='_blank'>Klik di Sini</a>.");
                    } else {
                      app.dialog.alert('Terjadi Kesalahan, Mohon Coba Kembali Lagi Nanti');
                    }
                  }, 'json');
                });
              },
            }
          });
          sinkronisasi_popup.open();
        }
      }, 'json');
    });
  });

  $$('#simpan').on('click', function () {
    if ($$('#password').val().length > 0) {
      if ($$('#password').val().length < 8) {
        app.dialog.alert('Password Harus Lebih dari 8 Karakter');
        return false;
      }
      if ($$('#password').val() != $$('#confirm_password').val()) {
        app.dialog.alert('Password Tidak Sama');
        return false;
      }
    }
    app.input.validateInputs('#change_pass_form');
    if ($$('#change_pass_form')[0].checkValidity() == true) {
      let ajax_data = [];
      let keteranganid = [];
      let filecode = [];
      $('input[name^=keteranganid]').each(function () {
        keteranganid.push($(this).val());
      });
      $('input[name^=filecode]').each(function () {
        filecode.push($(this).val());
      });
      let form_data = app.form.convertToData('#change_pass_form');
      ajax_data.push(iamthedoor);
      ajax_data.push(form_data);
      ajax_data.push(keteranganid);
      ajax_data.push(filecode);

      form_data['pdam'] = [];
      form_data['pln'] = [];
      form_data['nop'] = [];
      form_data['stnk'] = [];
      form_data['bpjs_ketenagakerjaan'] = [];
      form_data['bpjs_kesehatan'] = [];
      form_data['telkom_indihome'] = [];
      form_data['telkom_pascabayar'] = [];

      $('input[name^=pdam]').each(function () {
        if ($(this).val()) form_data['pdam'].push($(this).val());
      });

      $('input[name^=pln]').each(function () {
        if ($(this).val()) form_data['pln'].push($(this).val());
      });

      $('input[name^=nop]').each(function () {
        if ($(this).val()) form_data['nop'].push($(this).val());
      });

      $('input[name^=stnk]').each(function () {
        if ($(this).val()) form_data['stnk'].push($(this).val());
      });

      $('input[name^=bpjs_ketenagakerjaan]').each(function () {
        if ($(this).val()) form_data['bpjs_ketenagakerjaan'].push($(this).val());
      });

      $('input[name^=bpjs_kesehatan]').each(function () {
        if ($(this).val()) form_data['bpjs_kesehatan'].push($(this).val());
      });

      $('input[name^=telkom_pascabayar]').each(function () {
        if ($(this).val()) form_data['telkom_pascabayar'].push($(this).val());
      });

      $('input[name^=telkom_indihome]').each(function () {
        if ($(this).val()) form_data['telkom_indihome'].push($(this).val());
      });

      app.dialog.preloader('Loading...');
      app.request.post(site_url_mobile_layanan + '/user_support/change_pass', ajax_data, function (callback) {
        if (callback.status) {
          app.dialog.close();
          app.dialog.alert('Data Anda Berhasil Diubah!');
          datauser.no_telp_pendaftar = form_data.no_telp_pendaftar;
          datauser.pendidikan_terakhir = form_data.pendidikan_terakhir;
          datauser.aktif_organisasi = form_data.aktif_organisasi;
          datauser.status_kb = form_data.status_kb;
          datauser.berat_badan = form_data.berat_badan;
          datauser.kode_pos = form_data.kode_pos;
          datauser.rw = form_data.rw;
          datauser.rt = form_data.rt;
          datauser.facebook = form_data.facebook;
          datauser.linkedin = form_data.linkedin;
          datauser.twitter = form_data.twitter;
          datauser.instagram = form_data.instagram;
          datauser.angkatan_kerja = form_data.angkatan_kerja;
          datauser.keahlian = form_data.keahlian;
          datauser.tinggi_badan = form_data.tinggi_badan;
          datauser.deskripsi_diri = form_data.deskripsi_diri;
          localStorage.setItem('datauser', JSON.stringify(datauser));
          sess_update();
        } else {
          app.dialog.close();
          app.dialog.alert(callback.msg || 'Data Gagal Diubah');
        }
      }, function () {
        app.dialog.alert('Perubahan Gagal, Mohon Coba Lagi Nanti');
      }, 'json');
    }
  });
}

function get_kelurahan_reg(kode_kec, elem_kel, value_kel = null) {
  app.request.post(site_url_mobile_layanan + '/user_support/get_kelurahan/' + kode_kec, function (callback) {
    let options = '<option value="000" selected style="display: none"> -- PILIH DESA/KELURAHAN BERIKUT -- </option>';
    for (var i = 0; i < callback.length; i++) {
      options += '<option value="' + callback[i].kode + '">' + callback[i].nama + '</option>';
    }
    $$(elem_kel).html(options).change();
    if (value_kel) {
      $$(elem_kel).val(value_kel).change();
    }
  }, 'json');
}

async function get_kecamatan_dom(elem_kec, def_kec = null, trigger = 'change') {
  app.request.post(site_url_mobile_layanan + '/user_support/get_kecamatan', function (callback) {
    let options = '';
    callback.forEach(function (row) {
      options += '<option value="' + row.kode + '" ' + (row.kode == def_kec ? 'selected' : '') + '>' + row.nama + '</option>';
    });
    $$(elem_kec).html(options).trigger(trigger);
  }, 'json');
}

async function get_kelurahan_dom(kode_kec, elem_kel, def_kel = null, trigger = 'change') {
  app.request.post(site_url_mobile_layanan + '/user_support/get_kelurahan/' + kode_kec, function (callback) {
    let options = '';
    callback.forEach(function (row) {
      options += '<option value="' + row.kode + '" ' + (row.kode == def_kel ? 'selected' : '') + '>' + row.nama + '</option>';
    });
    $$(elem_kel).html(options).trigger(trigger);
  }, 'json');
}

/** Fungsi Get Provinsi, Kabupaten, Kecamatan, Kelurahan */
async function get_provinsi_new(elem_prov, def_provinsi = '35', trigger = 'change') {
  Attachment.getDbWhere({
    table: 'kt_reg_provinces',
    order_by: 'name'
  }, function (result) {
    let options = '';
    result.forEach(function (row) {
      options += '<option value="' + row.id + '" ' + (row.id == def_provinsi ? 'selected' : '') + '>' + row.name + '</option>';
    });
    $$(elem_prov).html(options).trigger(trigger);
  });
}

async function get_kabupaten_new(province = '35', elem_kab, def_kabupaten = '3515', trigger = 'change') {
  Attachment.getDbWhere({
    table: 'kt_reg_regencies',
    where: [{ 'province_id': province }],
    order_by: 'name'
  }, function (result) {
    let options = '';
    result.forEach(function (row) {
      options += '<option value="' + row.id + '" ' + (row.id == def_kabupaten ? 'selected' : '') + '>' + row.name + '</option>';
    });
    $$(elem_kab).html(options).trigger(trigger);
  });
}

async function get_kecamatan_new(regency = '3515', elem_kec, def_kecamatan = datauser.id_district, trigger = 'change') {
  Attachment.getDbWhere({
    table: 'kt_reg_districts',
    where: [{ 'regency_id': regency }],
    order_by: 'name'
  }, function (result) {
    let options = '';
    result.forEach(function (row) {
      options += '<option value="' + row.id + '" ' + (row.id == def_kecamatan ? 'selected' : '') + '>' + row.name + '</option>';
    });
    $$(elem_kec).html(options).trigger(trigger);
  });
}

async function get_kelurahan_new(district = datauser.id_district, elem_kel, def_kelurahan = datauser.id_village, trigger = 'change') {
  Attachment.getDbWhere({
    table: 'kt_reg_villages',
    where: [{ 'district_id': district }],
    order_by: 'name'
  }, function (result) {
    let options = '';
    result.forEach(function (row) {
      options += '<option value="' + row.id + '" ' + (row.id == def_kelurahan ? 'selected' : '') + '>' + row.name + '</option>';
    });
    $$(elem_kel).html(options).trigger(trigger);
  });
}
/** End */

/** Fungsi Get Faskes */
function get_faskes(elem_faskes, def_faskes = '', form = 'view') {
  app.request.post(site_url_mobile_layanan + '/user_support/get_faskes/' + form, function (result) {
    let options = '';
    result.forEach(function (row) {
      options += '<option value="' + row.id + '" ' + (row.id == def_faskes ? 'selected' : '') + '>' + row.nama + '</option>';
    });
    $$(elem_faskes).html(options).change();
  }, 'json');
}
/** End */

/** Fungsi Get Produk Tabungan BPR */
function get_kode_produk(elem_produk, def_produk = '') {
  app.request.post(site_url_mobile_layanan + '/user_support/get_produk', function (result) {
    let options = '';
    result.data.forEach(function (row) {
      options += '<option value="' + row.kode + '" ' + (row.kode == def_produk ? 'selected' : '') + '>' + row.keterangan + '</option>';
    });
    $$(elem_produk).html(options).change();
  }, 'json');
}
/** End */

/** Fungsi Get Deposito BPR */
function get_kode_deposito(elem_produk, def_produk = '') {
  app.request.post(site_url_mobile_layanan + '/user_support/get_deposito', function (result) {
    let options = '';
    result.data.forEach(function (row) {
      options += '<option value="' + row.kode + '" ' + (row.kode == def_produk ? 'selected' : '') + '>' + row.keterangan + '</option>';
    });
    $$(elem_produk).html(options).change();
  }, 'json');
}

function get_kode_kredit(elem_produk, def_produk = '') {
  app.request.post(site_url_mobile_layanan + '/user_support/get_kredit', function (result) {
    let options = '';
    result.data.forEach(function (row) {
      options += '<option value="' + row.kode + '" ' + (row.kode == def_produk ? 'selected' : '') + '>' + row.keterangan + '</option>';
    });
    $$(elem_produk).html(options).change();
  }, 'json');
}
/** End */

function get_pilihan_umum({
  pend_elem = '', pend_def = '',
  kerja_elem = '', kerja_def = '',
  hub_elem = '', hub_def = '',
  gol_dar_elem = '', gol_dar_def = '',
  kelainan_elem = '', kelainan_def = '',
  kecacatan_elem = '', kecacatan_def = '',
}) {
  app.request.post(site_url_mobile_layanan + '/user_support/get_opt_umum', function (result) {
    if (pend_elem.length) {
      if (Array.isArray(pend_elem)) {
        pend_elem.forEach(function (elem, n) {
          let options = '';
          for (let i = 0; i < result.pend.length; i++) {
            let def = (Array.isArray(pend_def) && pend_def[n] && pend_def[n].length) ? pend_def[n] : '';
            options += '<option value="' + result.pend[i].name + '" ' + (result.pend[i].name == def ? 'selected' : '') + '>' + result.pend[i].name + '</option>';
          }
          $$(elem).html(options);
        });
      } else {
        let options = '';
        for (let i = 0; i < result.pend.length; i++) {
          options += '<option value="' + result.pend[i].name + '" ' + (result.pend[i].name == pend_def ? 'selected' : '') + '>' + result.pend[i].name + '</option>';
        }
        $$(pend_elem).html(options);
      }
    }

    if (kerja_elem.length) {
      if (Array.isArray(kerja_elem)) {
        kerja_elem.forEach(function (elem, n) {
          let options = '';
          for (let i = 0; i < result.kerja.length; i++) {
            let def = (Array.isArray(kerja_def) && kerja_def[n] && kerja_def[n].length) ? kerja_def[n] : '';
            options += '<option value="' + result.kerja[i].name + '" ' + (result.kerja[i].name == def ? 'selected' : '') + '>' + result.kerja[i].name + '</option>';
          }
          $$(elem).html(options);
        });
      } else {
        let options = '';
        for (let i = 0; i < result.kerja.length; i++) {
          options += '<option value="' + result.kerja[i].name + '" ' + (result.kerja[i].name == kerja_def ? 'selected' : '') + '>' + result.kerja[i].name + '</option>';
        }
        $$(kerja_elem).html(options);
      }
    }

    if (hub_elem.length) {
      if (Array.isArray(hub_elem)) {
        hub_elem.forEach(function (elem, n) {
          let options = '';
          for (let i = 0; i < result.hub.length; i++) {
            let def = (Array.isArray(hub_def) && hub_def[n] && hub_def[n].length) ? hub_def[n] : '';
            options += '<option value="' + result.hub[i].name + '" ' + (result.hub[i].name == def ? 'selected' : '') + '>' + result.hub[i].name + '</option>';
          }
          $$(elem).html(options);
        });
      } else {
        let options = '';
        for (let i = 0; i < result.hub.length; i++) {
          options += '<option value="' + result.hub[i].name + '" ' + (result.hub[i].name == hub_def ? 'selected' : '') + '>' + result.hub[i].name + '</option>';
        }
        $$(hub_elem).html(options);
      }
    }

    if (gol_dar_elem.length) {
      if (Array.isArray(gol_dar_elem)) {
        gol_dar_elem.forEach(function (elem, n) {
          let options = '';
          for (let i = 0; i < result.gol_dar.length; i++) {
            let def = (Array.isArray(gol_dar_def) && gol_dar_def[n] && gol_dar_def[n].length) ? gol_dar_def[n] : '';
            options += '<option value="' + result.gol_dar[i].name + '" ' + (result.gol_dar[i].name == def ? 'selected' : '') + '>' + result.gol_dar[i].name + '</option>';
          }
          $$(elem).html(options);
        });
      } else {
        let options = '';
        for (let i = 0; i < result.gol_dar.length; i++) {
          options += '<option value="' + result.gol_dar[i].name + '" ' + (result.gol_dar[i].name == gol_dar_def ? 'selected' : '') + '>' + result.gol_dar[i].name + '</option>';
        }
        $$(gol_dar_elem).html(options);
      }
    }

    if (kelainan_elem.length) {
      if (Array.isArray(kelainan_elem)) {
        kelainan_elem.forEach(function (elem, n) {
          let options = '';
          for (let i = 0; i < result.kelainan.length; i++) {
            let def = (Array.isArray(kelainan_def) && kelainan_def[n] && kelainan_def[n].length) ? kelainan_def[n] : '';
            options += '<option value="' + result.kelainan[i].name + '" ' + (result.kelainan[i].name == def ? 'selected' : '') + '>' + result.kelainan[i].name + '</option>';
          }
          $$(elem).html(options);
        });
      } else {
        let options = '';
        for (let i = 0; i < result.kelainan.length; i++) {
          options += '<option value="' + result.kelainan[i].name + '" ' + (result.kelainan[i].name == kelainan_def ? 'selected' : '') + '>' + result.kelainan[i].name + '</option>';
        }
        $$(kelainan_elem).html(options);
      }
    }

    if (kecacatan_elem.length) {
      if (Array.isArray(kecacatan_elem)) {
        kecacatan_elem.forEach(function (elem, n) {
          let options = '';
          for (let i = 0; i < result.kecacatan.length; i++) {
            let def = (Array.isArray(kecacatan_def) && kecacatan_def[n] && kecacatan_def[n].length) ? kecacatan_def[n] : '';
            options += '<option value="' + result.kecacatan[i].name + '" ' + (result.kecacatan[i].name == def ? 'selected' : '') + '>' + result.kecacatan[i].name + '</option>';
          }
          $$(elem).html(options);
        });
      } else {
        let options = '';
        for (let i = 0; i < result.kecacatan.length; i++) {
          options += '<option value="' + result.kecacatan[i].name + '" ' + (result.kecacatan[i].name == kecacatan_def ? 'selected' : '') + '>' + result.kecacatan[i].name + '</option>';
        }
        $$(kecacatan_elem).html(options);
      }
    }
  }, 'json');
}

function move_domList() {
  app.dialog.preloader('Mohon Tunggu...');

  var table_move_dom = $("#table_move_dom").DataTable({
    serverSide: true,
    ajax: {
      url: site_url_mobile_layanan + "/pindah_user/get_data",
      data: iamthedoor,
      type: "GET",
    },
    columns: [
      { data: 'username' },
      { data: 'asal_kec' },
      { data: 'asal_kel' },
      { data: 'namakec' },
      { data: 'namakel' },
      { data: 'alamat_baru' },
      { data: 'status' }
    ],
    initComplete: function (settings, json) {
      app.dialog.close();
    },
    rowCallback: function (row, data) {
      $('td:eq(0)', row).html('<a href="/edit_move_dom/' + data.id + '/" class="button button-small button-fill color-green">' +
        '<i class="icon f7-icons" style="font-size: 12pt;">zoom_in</i> Detail</a>');

      let color = '';
      let text = '';

      if (data.status == 'f') {
        color = '#F0AD4E';
        text = 'Proses Verif Desa Asal';
      } else if (data.status_kel_asal == 2) {
        color = '#DD4B39';
        text = 'Ditolak Desa Asal';
      } else if (data.status_kel_baru == 2) {
        color = '#DD4B39';
        text = 'Ditolak Desa Tujuan';
      } else if (data.status_kel_baru == 1) {
        color = '#00A65A';
        text = 'Selesai Pindah';
      } else if (data.status_kel_asal == 1 && data.status_kel_baru == 0) {
        color = '#F0AD4E';
        text = 'Proses Verif Desa Tujuan';
      }

      $('td:eq(6)', row).html('<span style="background-color: ' + color + '; padding: 5px; border-radius: 10px; color: white;">' + text + '</span>');

    },
    searching: false,
    lengthChange: false
  });
}

function move_domLoad() {
  $$('#nama').val(datauser.nama);
  $$('#ttl').val(datauser.tempat_lahir + ', ' + datauser.tanggal_lahir);
  $$('#jenis_kelamin').val(datauser.jenis_kelamin);
  $$('#agama').val(datauser.agama);
  $$('#status_kawin').val(datauser.status_kawin);
  $$('#kec_asal').val(datauser.kecamatan);
  $$('#kel_asal').val(datauser.kode_desa);
  $$('#alamat_asal').val(datauser.alamat);
  $$('#rw_asal').val(datauser.rw);
  $$('#rt_asal').val(datauser.rt);
  $$('#nama_kec_asal').val(datauser.nama_kec);
  $$('#nama_kel_asal').val(datauser.nama_kel);

  var maplet; var maplayer;
  app.request.post(site_url_mobile_layanan + '/user_support/get_kecamatan', function (callback) {
    let options = '';
    for (var i = 0; i < callback.length; i++) {
      options += '<option value="' + callback[i].kode +
        '" data-lat="' + callback[i].latitude +
        '" data-lng="' + callback[i].longitude + '">' +
        callback[i].nama +
        '</option>';
    }
    $$('#kec_baru').html(options);
    get_kelurahan_dom($$('#kec_baru').val(), '#kel_baru');

    if (!maplet) {
      maplet = L.map('mapid', { minZoom: 2 }).setView([
        $('#kec_baru').find('option:selected').data('lat'),
        $('#kec_baru').find('option:selected').data('lng')
      ], 14);
      let osmLayer = new L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
      maplet.addLayer(osmLayer);
      maplayer = L.layerGroup().addTo(maplet);
      maplet.on('click', function (evt) {
        maplayer.clearLayers();
        L.marker([evt.latlng.lat, evt.latlng.lng]).addTo(maplayer);
        $$('#lat').val(evt.latlng.lat);
        $$('#lng').val(evt.latlng.lng);
      });
    }
  }, 'json');

  $$('#kec_baru').on('change', function () {
    maplet.setView([
      $(this).find('option:selected').data('lat'),
      $(this).find('option:selected').data('lng')
    ], 14);
    get_kelurahan_dom($$('#kec_baru').val(), '#kel_baru');
  });
  $$('#addformupload').on('touchend', add_row_pindah);

  $$('#simpan').on('click', function () {
    filecode = [];
    $('input[name^=filecode]').each(function () {
      filecode.push($(this).val());
    });
    if ($$('#password').val() != $$('#confirm_password').val()) {
      app.dialog.alert('Ulangi Password Tidak Sama');
      return false;
    }
    keteranganid = [];
    $('input[name^=keteranganid]').each(function () {
      keteranganid.push($(this).val());
    });

    app.input.validateInputs('#move_dom_form');
    if ($$('#move_dom_form')[0].checkValidity() == true) {
      let ajax_data = [];
      let form_data = app.form.convertToData('#move_dom_form');
      ajax_data.push(iamthedoor);
      ajax_data.push(form_data);
      ajax_data.push(filecode);
      ajax_data.push(keteranganid);

      app.dialog.preloader('Mohon Tunggu...');
      app.request.post(site_url_mobile_layanan + '/pindah_user/save_dom', ajax_data, function (callback) {
        if (callback == 1) {
          app.dialog.close();
          app.dialog.alert('Data Berhasil Diajukan');
          mainView.router.back();
          $('#table_move_dom').DataTable().ajax.reload();
        } else if (callback == 2) {
          app.dialog.close();
          app.dialog.alert('Password Anda Salah');
        } else if (callback == 3) {
          app.dialog.close();
          app.dialog.alert('Gagal Diajukan, Karna Pengajuan Sebelumnya Masih Berjalan');
        } else if (callback == 4) {
          app.dialog.close();
          app.dialog.alert('Peringatan! Terdapat Pengajuan Surat Layanan Anda yang Belum Selesai atau Tertolak (Jika tertolak mohon datanya dihapus).');
        } else {
          app.dialog.close();
          app.dialog.alert(callback.desc);
        }
      }, function () {
        app.dialog.alert('Data Gagal Diajukan, Mohon Coba Lagi Nanti');
      }, 'json');
    }
  });
}

function move_domEdit(id) {
  $$('#nama').val(datauser.nama);
  $$('#ttl').val(datauser.tempat_lahir + ', ' + datauser.tanggal_lahir);
  $$('#jenis_kelamin').val(datauser.jenis_kelamin);
  $$('#agama').val(datauser.agama);
  $$('#status_kawin').val(datauser.status_kawin);
  app.request.post(site_url_mobile_layanan + '/pindah_user/get_dom/' + id, iamthedoor, function (callback) {
    $$('#kec_asal').val(callback.kec_asal ?? '');
    $$('#kel_asal').val(callback.kel_asal ?? '');
    $$('#nama_kec_asal').val(callback.nama_kec_asal ?? '');
    $$('#nama_kel_asal').val(callback.nama_kel_asal ?? '');
    $$('#alamat_asal').val(callback.alamat_asal ?? '');
    $$('#rw_asal').val(callback.rw_asal ?? '');
    $$('#rt_asal').val(callback.rt_asal ?? '');

    $$('#kec_baru').html('<option value="' + callback.kecamatan + '">' + callback.nama_kec_baru + '</option>');
    $$('#kel_baru').html('<option value="' + callback.kelurahan + '">' + callback.nama_kel_baru + '</option>');
    $$('#alamat_baru').val(callback.alamat_baru);
    $$('#rt_baru').val(callback.rt_baru);
    $$('#rw_baru').val(callback.rw_baru);

    tablename = 'kt_pindah_user';
    find_document(id, true);

    var maplet = L.map('mapid', { minZoom: 2 }).setView([
      callback.latitude,
      callback.longitude
    ], 14);
    let osmLayer = new L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    maplet.addLayer(osmLayer);
    var maplayer = L.layerGroup().addTo(maplet);
    L.marker([callback.latitude, callback.longitude]).addTo(maplayer);

    if (callback.status != 'f') {
      $$('#btndeletelayanan').hide();
    }

    if (callback.chron.length) {
      let table_chron = '';
      $$('#btndeletelayanan').hide();
      for (var i = 0; i < callback.chron.length; i++) {
        table_chron += '<tr>' +
          '<td>' + (callback.chron[i].status == 1 ? 'Disetujui' : 'Ditolak') + '</td>' +
          '<td>' + callback.chron[i].author_type + '</td>' +
          '<td>' + callback.chron[i].username + '</td>' +
          '<td>' + (callback.chron[i].keterangan ?? '') + '</td>' +
          '<td>' + callback.chron[i].tanggal + '</td>' +
          '</tr>';
      }

      $$(".table-chron").html(table_chron);
    }
  }, function () {
    app.dialog.alert('Terjadi Kesalahan, Mohon Coba Lagi Nanti');
  }, 'json');

  $$('#deletelayanan').on('click', function () {
    app.dialog.confirm('Apakah Anda yakin menghapus permintaan ?', function () {
      app.dialog.preloader('Mohon Tunggu...');
      app.request.post(site_url_mobile_layanan + '/pindah_user/delete_dom/' + id, iamthedoor, function (callback) {
        if (callback) {
          app.dialog.close();
          app.dialog.alert('Permintaan berhasil dihapus');
          mainView.router.back();
          $('#table_move_dom').DataTable().ajax.reload();
        } else {
          app.dialog.close();
          app.dialog.alert('Terjadi kesalahan');
        }
      }, 'json');
    });
  });
}

function registerLoad() {
  var unique = Date.now() * 1000;
  var token = window.btoa(CryptoJSAesJson.encrypt(unique, "k3Y-C0De_s1PR@j4")).replace(/=/g, '');
  var ptr = app.ptr.create('.ptr-content');
  $$('.ptr-content').on('ptr:refresh', function () {
    unique = Date.now() * 1000;
    token = window.btoa(CryptoJSAesJson.encrypt(unique, "k3Y-C0De_s1PR@j4")).replace(/=/g, '');
    ptr.done();
  });

  get_pilihan_umum({
    gol_dar_elem: '#register_form #gol_dar',
    pend_elem: '#register_form #pendidikan_terakhir',
    kerja_elem: '#register_form #pekerjaan'
  });

  var maplet; var maplayer;
  app.request.post(site_url_mobile_layanan + '/user_support/get_kecamatan', function (callback) {
    let options = '<option value="000" data-lat="-7.4497718" data-lng="112.7015495" selected style="display: none"> -- PILIH KECAMATAN BERIKUT -- </option>';
    for (var i = 0; i < callback.length; i++) {
      options += '<option value="' + callback[i].kode +
        '" data-lat="' + callback[i].latitude +
        '" data-lng="' + callback[i].longitude + '">' +
        callback[i].nama +
        '</option>';
    }
    $$('#kecamatan').html(options);
    get_kelurahan_reg($$('#kecamatan').val(), '#kode_desa');

    if (!maplet) {
      maplet = L.map('mapid', { minZoom: 2 }).setView([
        $('#kecamatan').find('option:selected').data('lat'),
        $('#kecamatan').find('option:selected').data('lng')
      ], 14);
      let osmLayer = new L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
      maplet.addLayer(osmLayer);
      maplayer = L.layerGroup().addTo(maplet);
      maplet.on('click', function (evt) {
        maplayer.clearLayers();
        L.marker([evt.latlng.lat, evt.latlng.lng]).addTo(maplayer);
        $$('#lat').val(evt.latlng.lat);
        $$('#lng').val(evt.latlng.lng);
      });
    }
  }, 'json');

  $$('#kecamatan').on('change', function () {
    maplet.setView([
      $(this).find('option:selected').data('lat'),
      $(this).find('option:selected').data('lng')
    ], 14);
    get_kelurahan_reg($$('#kecamatan').val(), '#kode_desa');
  });

  $$('#cari_nik').on('click', function () {
    if ($$('#nik').val().length != 16) {
      app.dialog.alert('NIK Harus Memiliki Panjang 16 Digit');
      return false;
    }

    app.request.post(site_url_mobile_layanan + '/user_support/cari_nik/' + $$('#nik').val(), { 'token': token }, function (record) {
      if (record.status == 1) {
        let decrypted = CryptoJSAesJson.decrypt(atob(record.dump), atob(record.chip));
        let data = JSON.parse(decrypted);
        $$('#nik').val(data.nik);
        $$('#email').val(data.email);
        $$('#no_kk').val(data.no_kk);
        $$('#jenis_kelamin').val(data.jenis_kelamin);
        $$('#nama').val(data.nama);
        $$('#gol_dar').val(data.gol_dar);
        $$('#tempat_lahir').val(data.tempat_lahir);
        $$('#agama').val(data.agama);
        $$('#tanggal_lahir').val(data.tanggal_lahir);
        $$('#status_kawin').val(data.status_kawin);
        $$('#no_telp_pendaftar').val(data.no_telp_pendaftar);
        $$('#kwn').val(data.kwn);
        $$('#pekerjaan').val(data.pekerjaan);
        $$('#pendidikan_terakhir').val(data.pendidikan_terakhir);
        $$('#alamat').val(data.alamat);
        $$('#kecamatan').val(data.kecamatan);
        maplet.setView([
          $('#kecamatan').find('option:selected').data('lat'),
          $('#kecamatan').find('option:selected').data('lng')
        ], 14);
        get_kelurahan_reg($$('#kecamatan').val(), '#kode_desa', data.desa);
        app.dialog.alert(record.message);
      } else {
        app.dialog.alert(record.message);
      }
    }, 'json');
  });

  $$('#simpan').on('click', function submit_handler() {
    if ($$('#nik').val().length != 16) {
      app.dialog.alert('NIK Harus Memiliki Panjang 16 Digit');
      return false;
    }
    if ($$('#no_kk').val().length != 16) {
      app.dialog.alert('Nomor KK Harus Memiliki Panjang 16 Digit');
      return false;
    }
    if ($$('#kecamatan').val() == '000' || $$('#kode_desa').val() == '000') {
      app.dialog.alert('Mohon Pilih Kecamatan dan Desa/Kelurahan Terlebih Dahulu');
      return false;
    }
    if ($$('#rw').val().length != 3) {
      app.dialog.alert('RW Harus Memiliki Panjang 3 Digit');
      return false;
    }
    if ($$('#rt').val().length != 3) {
      app.dialog.alert('RT Harus Memiliki Panjang 3 Digit');
      return false;
    }
    if ($$('#sandi').val().length < 8) {
      app.dialog.alert('Kata Sandi Minimal 8 Angka');
      return false;
    }
    if ($$('#sandi').val() != $$('#re_sandi').val()) {
      app.dialog.alert('Kata Sandi Tidak Sama');
      return false;
    }
    if (!$$('#lat').val() || !$$('#lng').val()) {
      app.dialog.alert('Mohon untuk Memilih Titik Koordinat di Peta');
      return false;
    }
    if (!$('#privacy_policy').is(':checked')) {
      app.dialog.alert('Mohon untuk Menyetujui Kebijakan Privasi');
      return false;
    }

    let filecode = [];
    $('.filecode').each(function () {
      if (this.value) {
        filecode.push(this.value);
      }
    });
    if (filecode.length != $('.filecode').length) {
      app.dialog.alert('Harap Lengkapi Dokumen');
      return false;
    }
    let keteranganid = [];
    $('.keteranganid').each(function () {
      keteranganid.push(this.value);
    });

    app.input.validateInputs('#register_form');
    if ($$('#register_form')[0].checkValidity() == true) {
      let ajax_data = [];
      let form_data = app.form.convertToData('#register_form');
      ajax_data.push(form_data);
      ajax_data.push(filecode);
      ajax_data.push(keteranganid);

      app.dialog.preloader('Mohon Tunggu...');
      $$('#simpan').off('click');
      app.request.post(site_url_mobile_layanan + '/user_support/check_pendaftar', ajax_data, function (callback) {
        if (callback.status == 'success') {
          app.dialog.close();
          var pendaftar_popup = app.popup.create({
            content:
              `<div class="popup">
                <div class="block">
                  <br>
                  <p>${callback.message}</p>
                  <div class="list">
                  <ul>
                      <li class="item-content item-input">
                        <div class="item-inner">
                            <div class="item-title item-label">Kode Verifikasi</div>
                            <div class="item-input-wrap">
                              <input type="number" id="kode" name="kode" placeholder="Masukkan Kode Verifikasi dari Email/WA Anda di Sini" required>
                            </div>
                        </div>
                      </li>
                  </ul>
                  </div>
                  <div class="row">
                    <button class="col-50 button button-fill color-red" id="resend">Kirim Ulang Tunggu: 60</button>
                    <button class="col-50 button button-fill" id="verif">Verifikasi</button>
                  </div>
                </div>
              </div>`,
            on: {
              opened: function () {
                function resend_handler() {
                  app.dialog.preloader('Mohon Tunggu...');

                  app.request.post(site_url_mobile_layanan + '/user_support/resend_code', ajax_data, function (response) {
                    app.dialog.close();
                    app.dialog.alert(response.message || 'Terjadi Kesalahan');
                    interval_handler();
                  }, 'json');
                }

                function interval_handler() {
                  $$('#resend').off('click');
                  $$('#resend').removeClass('color-green').addClass('color-red').text('Kirim Ulang: 60s');

                  var resend_cooldown = 60000;
                  var resend_interval = setInterval(function () {
                    if (resend_cooldown > 0) {
                      resend_cooldown = resend_cooldown - 1000;
                      $$('#resend').text('Kirim Ulang: ' + (resend_cooldown / 1000));
                    } else {
                      clearInterval(resend_interval);
                      $$('#resend').on('click', resend_handler);
                      $$('#resend').removeClass('color-red').addClass('color-green').text('Kirim Ulang');
                    }
                  }, 1000);
                }

                interval_handler();

                $$('#verif').on('click', function verif_handler() {
                  $$('#verif').off('click');
                  ajax_data[0]['kode'] = $$('#kode').val();

                  app.dialog.preloader('Mohon Tunggu...');

                  app.request.post(site_url_mobile_layanan + '/user_support/register', ajax_data, function (callback) {
                    if (callback.status == 'success') {
                      app.dialog.close();
                      app.dialog.alert(callback.message);
                      pendaftar_popup.close();
                      mainView.router.back();
                    } else {
                      app.dialog.alert(callback.message || 'Terjadi Kesalahan, Mohon Coba Lagi Nanti.');
                    }
                    $$('#verif').on('click', verif_handler);
                  }, 'json');

                });
              },
            }
          });
          pendaftar_popup.open();
        } else {
          app.dialog.close();
          app.dialog.alert(callback.message || 'Terjadi Kesalahan');
        }
      }, 'json');

    } else {
      app.dialog.alert('Mohon lengkapi Form Isian.');
    }

    $$('#simpan').on('click', submit_handler);
  });
}

function gen_tokenLoad() {
  app.request.post(site_url_mobile_layanan + '/user_support/get_token', { user_id: iamthedoor.user_id }, function (response) {
    $$('#token').val(response.token);
  }, function () {
    app.dialog.alert('Terjadi Kesalahan, Mohon Coba Lagi Nanti');
  }, 'json');
  $$('#generate').on('click', function () {
    window.FirebasePlugin.onTokenRefresh(function (token) {
      app.request.post(site_url_mobile_layanan + '/user_support/insert_token', { token: token, user_id: iamthedoor.user_id }, function (response) {
        let msg = response ? 'Berhasil!' : 'Gagal! Mohon Coba Lagi Nanti.';
        app.dialog.alert(msg);
        mainView.router.back();
      }, '', 'json');
    }, function (error) {
      app.dialog.alert('Gagal Mendapatkan Token: ' + error);
    });
  });
}

function notif_suratLoad() {
  app.request.post(site_url_mobile_layanan + '/user_support/get_notif', { user_id: iamthedoor.user_id }, function (response) {
    if (response) {
      let content = '';
      response.forEach(function (val) {
        let color = val.status == 1 ? 'bg-color-blue' : 'bg-color-red';
        let status = val.status == 1 ? 'Selesai' : 'Ditolak';
        let message = val.status == 1 ? 'Selesai dan dapat Diambil di Kelurahan / Kecamatan Masing-masing' : 'Ditolak dengan Alasan ' + val.keterangan;
        content +=
          `<li>
            <div class="card">
              <div class="card-header align-items-flex-end ${color} text-color-white">${val.nama_layanan}</div>
              <div class="card-content card-content-padding">
                <p class="date">${status} pada ${val.waktu}</p>
                <p>Permohonan Anda dengan Kode Transaksi ${val.kode_transaksi} telah ${message}.</p>
              </div>
            </div>
          </li>`;
      });
      $$('#notif_surat_list').html(content);
    } else {
      app.dialog.alert('Data Notifikasi Anda Kosong / Surat Anda Belum Ada yang Selesai');
    }
  }, function () {
    app.dialog.alert('Terjadi Kesalahan, Mohon Coba Lagi Nanti');
  }, 'json');
}

function komplainLoad() {
  app.dialog.preloader('Mohon Tunggu...');
  $$("#addformupload").on("touchend", addrow);
  app.request.post(site_url_mobile_layanan + '/komplain_pengguna/get_layanan_komplain', iamthedoor, function (result) {
    $$('#kode_komplain').val(result.kode_komplain);

    let options = '';
    for (var i = 0; i < result.layanan.length; i++) {
      options += '<option value="' + result.layanan[i].kode + '">' + result.layanan[i].nama + '</option>';
    }

    let transaksi = '';
    if (result.kode_transaksi.length > 0) {
      for (var i = 0; i < result.kode_transaksi.length; i++) {
        transaksi += '<option value="' + result.kode_transaksi[i].id + '">' + result.kode_transaksi[i].kode_transaksi + ' - ' + result[i].tgl_buat + '</option>';
      }
    } else {
      transaksi += '<option value="0" >Kosong</option>';
    }

    $$('#kode_transaksi').html(transaksi);
    $$('#layanan').html(options);
    $$('#nama').val(datauser.nama);
    app.dialog.close();
  }, 'json');

  $$('#layanan').on('change', function () {
    get_kode_transaksi_komplain($$('#layanan').val());
  });

  $$('#simpan').on('click', function () {
    app.input.validateInputs('#komplain_pengguna_form');
    if ($$('#komplain_pengguna_form')[0].checkValidity() == true) {
      if ($$('#kode_transaksi').val() == 0) {
        app.dialog.alert('Mohon Memilih Data Layanan yang akan Di-Komplain, Serta Lengkapi Form');
        return false;
      }
      let ajax_data = [];
      let form_data = app.form.convertToData('#komplain_pengguna_form');
      keteranganid = [];
      filecode = [];
      $('input[name^=keteranganid]').each(function () {
        keteranganid.push($(this).val());
      });
      $('input[name^=filecode]').each(function () {
        filecode.push($(this).val());
      });
      ajax_data.push(iamthedoor);
      ajax_data.push(form_data);
      ajax_data.push(keteranganid);
      ajax_data.push(filecode);

      app.request.post(site_url_mobile_layanan + '/komplain_pengguna/create_komplain_pengguna', ajax_data, function (callback) {
        if (callback) {
          app.dialog.alert('Data Berhasil Diajukan');
          mainView.router.back();
          $('#datatables').DataTable().ajax.reload();
        } else {
          app.dialog.alert(callback.desc);
        }
      }, function () {
        app.dialog.alert('Data Gagal Diajukan, Mohon Coba Lagi Nanti');
      }, 'json');
    }
  });
}

function get_kode_transaksi_komplain(id_layanan) {
  app.dialog.preloader('Mohon Tunggu...');
  app.request.post(site_url_mobile_layanan + '/komplain_pengguna/get_kode_transaksi_komplain/' + id_layanan + '/' + datauser.bf_users_id, iamthedoor, function (result) {
    let options = '';
    if (result.length > 0) {
      for (var i = 0; i < result.length; i++) {
        options += '<option value="' + result[i].id + '">' + result[i].kode_transaksi + ' - ' + (new Date(result[i].tgl_buat)).toDateIndoFormat() + '</option>';
      }
    } else {
      options += '<option value="0" >Kosong</option>';
    }
    $$('#kode_transaksi').html(options);
    app.dialog.close();
  }, 'json');
}

function listKomplainLoad() {
  $$("#btnnew").hide();
  if (datauser.role_id == "4") {
    $$("#btnnew").show();
  }

  var statusselect = app.smartSelect.create({
    el: '.statusselect',
    on: {
      close: function () {
        app.dialog.preloader('Mohon Tunggu...');
        datatables.context[0].ajax.url = site_url_mobile_layanan + '/komplain_pengguna/get_list_komplain/' + $$('#statusselect').val();
        $('#datatables').DataTable().ajax.reload(function (json) {
          if (json.data) {
            app.dialog.close();
          } else {
            app.dialog.close();
            app.dialog.alert('Data tidak dapat ditemukan');
          }
        });
      }
    }
  });
  app.dialog.preloader('Mohon Tunggu...');
  var datatables = $('#datatables').DataTable({
    "serverSide": true,
    "ajax": {
      "url": site_url_mobile_layanan + '/komplain_pengguna/get_list_komplain/0',
      "data": iamthedoor,
      "type": "GET"
    },
    "columns": [
      { data: 'id' },
      { data: 'kode_transaksi' },
      { data: 'nama_pengguna' },
      { data: 'tanggal_jam' },
      { data: 'nama_layanan' },
      { data: 'nama_operator' },
      { data: 'status_komplain' },
    ],
    "initComplete": function (settings, json) {
      app.dialog.close();
      $$('#datatables_length').hide();
      $$('#datatables_filter').hide();
    },
    "rowCallback": function (row, data) {
      $('td:eq(0)', row).html('<a href="/edit_komplain/' + data.id + '/" class="button button-small button-fill color-blue">' +
        '<i class="icon f7-icons" style="font-size: 12pt;">doc_text_fill</i> Detail</a>');
      if (data.status_komplain) {
        if (data.status_komplain == 1) {
          data.status = 'Dijawab';
          var color = '#FF9800';
        } else if (data.status_komplain == 0) {
          data.status = 'Berjalan';
          var color = '#17A05E';
        } else {
          data.status = 'Selesai';
          var color = '#808080';
        }
        $('td:eq(6)', row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px; color:white;">' + data.status + '</span>');
      }
    }
  });
}

function editKomplainLoad() {
  var id = mainView.router.currentRoute.params.id;
  $$("#addformupload").on("touchend", addrow);
  $$('#id_komplain').val(id);

  app.dialog.preloader('Mohon Tunggu...');
  app.request.post(site_url_mobile_layanan + '/komplain_pengguna/edit_komplain_load/' + id, iamthedoor, function (result) {
    tablename = 'kt_komplain_pengguna_rinci';
    var content = '';
    for (var i = 0; i < result.komplain.length; i++) {
      if (result.komplain[i].status_komplain == 2) {
        $$("#save_button").hide();
        $$("#komplain_pengguna_form").hide();
      } else {
        $$("#save_button").show();
        $$("#komplain_pengguna_form").show();
      }

      if (result.komplain[i].jenis == 0) {
        var color = 'bg-color-blue';
        var title = 'Keluhan Pengguna';
      } else {
        var color = 'bg-color-green';
        var title = 'Jawaban';
      }

      if (i == 0) {
        $$('#kode_komplain').val(result.komplain[i].kode_komplain);
        $$('#nama').val(result.komplain[i].nama_pengguna);
        $$('#layanan').val(result.komplain[i].nama_layanan);
        $$('#kode_transaksi').val(result.komplain[i].kode_transaksi);
        $$('#deskripsi_komplain').val(result.komplain[i].isi_komplain);
        var attachments_html = '';
        for (var j = 0; j < result.lampiran[0].length; j++) {
          attachments_html +=
            `<li class="item-content">
              <div class="item-inner">
                <div class="item-title-row">
                  <div class="item-title">${result.lampiran[0][j].file_name}</div>
                </div>
                <div class="item-subtitle">Ket : ${result.lampiran[0][j].desc}</div>
              </div>
              <div class="item-media" style="padding-right: 20px;">
                <a onclick="preview_files(${result.lampiran[0][j].id})" class="button button-round button-fill color-orange" style="margin-top: 5px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>
              </div>
            </li>'`;
        }
        $$('#list_lampiran_komplain').append(attachments_html);
      } else {
        content +=
          `<div class="card">
            <div class="card-header ${color} text-color-white">${title}</div>
            <div class="card-content card-content-padding">
              <div class="list">
                <ul>
                  <li class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-input-wrap">
                        <div class="item-title item-label">Tanggal & Jam*</div>
                        <input type="text" id="tanggal_jam" name="tanggal_jam" value="${result.komplain[i].tanggal_jam_komplain}" required validate readonly>
                      </div>
                    </div>
                  </li>
                  <li class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-input-wrap">
                        <div class="item-title item-label">Jawaban*</div>
                        <input type="text" id="jawaban" name="jawaban" value="${result.komplain[i].isi_komplain}" required validate readonly >
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="card-footer bg-color-blue text-color-white">Lampiran</div>
                <div id="card-content">
                  <div class="list media-list no-ios-edges">
                    <ul>`;
        for (var j = 0; j < result.lampiran[i].length; j++) {
          content +=
            `<li class="item-content">
              <div class="item-inner">
                <div class="item-title-row">
                  <div class="item-title">${result.lampiran[i][j].file_name}</div>
                </div>
                <div class="item-subtitle">Ket : ${result.lampiran[i][j].desc}</div>
              </div>
              <div class="item-media" style="padding-right: 20px;">
                <a onclick="preview_files(${result.lampiran[i][j].id})" class="button button-round button-fill color-orange" style="margin-top: 5px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>
              </div>
            </li>`;
        }
        content +=
          `</ul>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
      }
    }
    app.dialog.close();
    $$('#edit_komplain_page').html(content);

    tablename = 'kt_komplain_pengguna_rinci';
  }, 'json');

  $$('#simpan').on('click', function () {
    app.input.validateInputs('#komplain_pengguna_form');
    if ($$('#komplain_pengguna_form')[0].checkValidity() == true) {
      let ajax_data = [];
      let form_data = app.form.convertToData('#komplain_pengguna_form');
      keteranganid = [];
      filecode = [];
      $('input[name^=keteranganid]').each(function () {
        keteranganid.push($(this).val());
      });
      $('input[name^=filecode]').each(function () {
        filecode.push($(this).val());
      });
      ajax_data.push(iamthedoor);
      ajax_data.push(form_data);
      ajax_data.push(keteranganid);
      ajax_data.push(filecode);

      app.request.post(site_url_mobile_layanan + '/komplain_pengguna/edit_komplain_pengguna', ajax_data, function (callback) {
        if (callback) {
          app.dialog.alert('Data Berhasil Diajukan');
          mainView.router.back();
          $('#datatables').DataTable().ajax.reload();
        } else {
          app.dialog.alert(callback.desc);
        }
      }, function () {
        app.dialog.alert('Data Gagal Diajukan, Mohon Coba Lagi Nanti');
      }, 'json');
    }
  });
}

function pusat_informasi() {
  var select = app.smartSelect.create({
    el: '.smart-select',
    on: {
      close: function () {
        app.dialog.preloader('Loading...');
        app.request.get(site_url_mobile_layanan + '/pusat_informasi/index/' + $$('#selected').val(), iamthedoor, function (data) {
          app.dialog.close();
          var info = ``;
          for (let i = 0; i < data.length; i++) {
            info +=
              `<div class="col-100 tablet-33 vessel">
                <div class="card">
                  <div class="card-header">
                    <div class="swiper-container swiper-init demo-swiper">
                      <div class="swiper-wrapper" data-id="${data[i].id}"></div>
                    </div>
                  </div>
                  <div class="card-content card-content-padding">
                    <div class="titl">${data[i].judul}</div>
                    <div class="deskripsi">${data[i].deskripsi}</div>
                    <div class="tanggal float-right">${data[i].tanggal_mulai} sd ${data[i].tanggal_selesai}</div><br>
                  </div>
                </div>
              </div>`
          }
          $$('#vessel').html(info);

          app.request.get(`${site_url_mobile_layanan}/pusat_informasi/foto`, iamthedoor, function (data) {
            for (let i = 0; i < data.length; i++) {
              $$(`.swiper-wrapper[data-id="${data[i].id}"]`).append(`<div class="swiper-slide"><img src="${base_url}/file/get_file/${data[i].file_actual}" alt="image"></div>`);
            }
          }, 'json');

          var swiper = app.swiper.create('.swiper-container', {
            speed: 400,
            spaceBetween: 10,
            slidesPerView: 'auto',
            observer: true
          });
        }, 'json');
      }
    }
  });

  app.request.get(`${site_url_mobile_layanan}/pusat_informasi/instansi`, iamthedoor, function (data) {
    var html = ``;
    for (let i = 0; i < data.length; i++) {
      html += `<option value="${data[i].id_instansi}">${data[i].instansi}</option>`
    }
    $$('#selected').append(html);
  }, 'json');

  app.dialog.preloader('Loading...');
  app.request.get(site_url_mobile_layanan + '/pusat_informasi/index/semua', iamthedoor, function (data) {
    app.dialog.close();
    if (data.length === 0) {
      app.dialog.alert('Informasi saat ini belum ada');
    } else {
      var info = ``;
      for (let i = 0; i < data.length; i++) {
        info +=
          `<div class="col-100 tablet-33 vessel">
            <div class="card">
              <div class="card-header">
                <div class="swiper-container swiper-init demo-swiper">
                  <div class="swiper-wrapper" data-id="${data[i].id}"></div>
                </div>
              </div>
              <div class="card-content card-content-padding">
                <div class="titl">${data[i].judul}</div>
                <div class="deskripsi">${data[i].deskripsi}</div>
                <div class="tanggal float-right">${data[i].tanggal_mulai} sd ${data[i].tanggal_selesai}</div><br>
              </div>
            </div>
          </div>`
      }
      $$('#vessel').html(info);
    }

    app.request.get(`${site_url_mobile_layanan}/pusat_informasi/foto`, iamthedoor, function (data) {
      for (let i = 0; i < data.length; i++) {
        $$(`.swiper-wrapper[data-id="${data[i].id}"]`).append(`<div class="swiper-slide"><img src="${base_url}/file/get_file/${data[i].file_actual}" alt="image"></div>`);
      }
    }, 'json');

    var swiper = app.swiper.create('.swiper-container', {
      speed: 400,
      spaceBetween: 10,
      slidesPerView: 'auto',
      loopedSlides: 2,
      observer: true
    });
  }, 'json');
}