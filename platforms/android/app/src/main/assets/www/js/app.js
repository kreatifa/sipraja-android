// Dom7
var $$ = Dom7;
var site_url_mobile = base_url + "/index.php";
var site_url_mobile_layanan = site_url_mobile + "/mobile";
var app = new Framework7({
  id: "go.id.sidoarjokab.sipraja",
  name: "SIPRAJA",
  dialog: {
    title: "SIPRAJA",
    buttonOk: "OK",
  },
  root: "#app",
  routes: routes,
  theme: "md",
  touch: {
    disableContextMenu: false,
  },
});
var mainView = app.views.create(".view-main");
var datauser, iamthedoor, dataparsed;
$$(document).on("deviceready", function () {
  // sess_destroy();
  Attachment.openDatabase();

  app.request.post(
    site_url_mobile + "/siurban_mobile/vers_check",
    { vers: "3.4.1" },
    function (data) {
      if (data == 1) {
        if (
          localStorage.logged_in &&
          JSON.parse(localStorage.logged_in) === true &&
          localStorage.datauser
        ) {
          datauser = JSON.parse(localStorage.datauser);
          app.request.post(
            site_url_mobile + "/siurban_mobile/sess_update",
            { user_id: datauser.bf_users_id },
            function (data) {
              localStorage.setItem("datauser", JSON.stringify(data));
              sess_update();
            },
            "json"
          );
        } else {
          mainView.router.navigate("/login/");
        }
      } else {
        var playstore_popup = app.popup.create({
          content:
            '<div class="popup">' +
            '<div class="block">' +
            "<p>Mohon Update Versi Sipraja Terbaru di PlayStore</p>" +
            '<p><a href="https://play.google.com/store/apps/details?id=go.id.sidoarjokab.sipraja&hl=in" class="link external popup-close">OK</a></p>' +
            "</div>" +
            "</div>",
        });
        playstore_popup.open();
      }
    },
    "json"
  );

  $$(document).on("page:init", function () {
    addformupload_status = true;
  });

  $$(document).on("backbutton", function () {
    mainView.router.back();
  });
});
function sess_update() {
  datauser = JSON.parse(localStorage.datauser);
  iamthedoor = {
    user_id: datauser.bf_users_id,
    kecamatan_id: datauser.kecamatan,
    kelurahan_id: datauser.kode_desa,
    role_id: datauser.role_id,
  };
  currentUserID = iamthedoor.user_id;
  currentUser = { userId: currentUserID };
  app.dialog.alert("Selamat Datang " + datauser.nama);
  mainView.router.navigate("/home/");
}
function logout() {
  $$("#logout").prop("disabled", true);
  app.dialog.confirm(
    "Apakah Anda yakin akan keluar?",
    function () {
      sess_destroy();
    },
    function () {
      $$("#logout").prop("disabled", false);
    }
  );
}
function sess_destroy() {
  localStorage.setItem("logged_in", "false");
  localStorage.removeItem("datauser");
  datauser = {};
  iamthedoor = {};
  mainView.router.back("/login/", { ignoreCache: true, force: true });
}
$$(document).on("page:init", '.page[data-name="login"]', function () {
  $$("#submitlogin").on("click", function () {
    var nik = $$("#login").val();
    var password = $$("#password").val();
    if (nik == "" || password == "") {
      app.dialog.alert("Lengkapi form login");
    } else {
      app.dialog.preloader("Logging In...");
      app.request.post(
        site_url_mobile + "/siurban_mobile/login",
        { NIK: nik, password: password },
        function (data) {
          if (data == 0) {
            app.dialog.close();
            app.dialog.alert("NIK Anda salah");
          } else if (data == 1) {
            app.dialog.close();
            app.dialog.alert("Password salah");
          } else {
            if (data.id) {
              if (
                data.role_id == 3 ||
                data.role_id == 5 ||
                data.role_id == 7 ||
                data.role_id == 9
              ) {
                app.dialog.close();
                app.dialog.alert(
                  "Dimohon bagi Operator maupun Admin untuk menggunakan Sipraja versi Web. Karna versi Mobile hanya untuk User dan TTD saja."
                );
                return false;
              }

              localStorage.setItem("logged_in", "true");
              localStorage.setItem("datauser", JSON.stringify(data));
              app.dialog.close();
              sess_update();
            } else {
              app.dialog.close();
              app.dialog.alert(data.msg);
            }
          }
        },
        "json"
      );
    }
  });

  $$("#daftar").on("click", function () {
    mainView.router.navigate("/register/");
  });
});

function homeLoad() {
  $$("#reload").on("click", function () {
    mainView.router.navigate("/home/", {
      ignoreCache: true,
      reloadCurrent: true,
    });
  });
  if (iamthedoor.role_id != "4") {
    if (iamthedoor.role_id == "7" || iamthedoor.role_id == "8") {
      $$("#tipe-c").remove();
      $$("#button-c").remove();
      $$("#tipe-d").remove();
      $$("#button-d").remove();
      $$(".tab-link-highlight").css("width", "50%");
      app.request.post(
        site_url_mobile + "/siurban_mobile/dashboard_data",
        iamthedoor,
        function (data) {
          $$("#count_tipe_a").html(data.tipe_a);
          $$("#count_surat_kelahiran").html(data.surat_kelahiran);
          $$("#count_surat_kematian").html(data.surat_kematian);
          $$("#count_sk_tidak_mampu").html(data.sk_tidak_mampu);
          $$("#count_sk_biodata_penduduk").html(data.sk_biodata_penduduk);
          $$("#count_sk_umum_desa").html(data.sk_belum_pernah_kawin);
          $$("#count_sk_domisili_usaha").html(data.sk_domisili_usaha);
          $$("#count_sk_domisili_luar").html(data.sk_domisili_luar);
          $$("#count_surat_pengantar_kua").html(data.surat_pengantar_kua);
          $$("#count_surat_pengantar_kua_luar").html(
            data.surat_pengantar_kua_luar
          );
          $$("#count_tipe_b").html(data.tipe_b);
          $$("#count_kartu_keluarga").html(data.sp_kartu_keluarga);
          $$("#count_permohonan_ktp").html(data.permohonan_ktp);
          $$("#count_skck").html(data.sp_skck);
          $$("#count_sk_pindah").html(data.sk_pindah);
          $$("#count_sk_umum_kecamatan").html(data.sku_kec);
          $$("#count_sktm_kecamatan").html(data.sktm_kec);
          $$("#count_waris").html(data.waris);
          $$("#count_ijin_keramaian").html(data.ijin_keramaian);
        },
        "json"
      );
    }
    if (iamthedoor.role_id == "9" || iamthedoor.role_id == "10") {
      $$("#tipe-a").remove();
      $$("#button-a").remove();
      $$("#tipe-d").remove();
      $$("#button-d").remove();
      $$("#tipe-b").addClass("tab-active");
      $$(".tab-link-highlight").css("width", "50%");
      app.request.post(
        site_url_mobile + "/siurban_mobile/dashboard_data",
        iamthedoor,
        function (data) {
          $$("#count_tipe_b").html(data.tipe_b);
          $$("#count_kartu_keluarga").html(data.sp_kartu_keluarga);
          $$("#count_permohonan_ktp").html(data.permohonan_ktp);
          $$("#count_skck").html(data.sp_skck);
          $$("#count_sk_pindah").html(data.sk_pindah);
          $$("#count_sk_umum_kecamatan").html(data.sku_kec);
          $$("#count_sktm_kecamatan").html(data.sktm_kec);
          $$("#count_waris").html(data.waris);
          $$("#count_ijin_keramaian").html(data.ijin_keramaian);
          $$("#count_tipe_c").html(data.tipe_c);
          $$("#count_imb").html(data.imb);
          $$("#count_imb_luar").html(data.imb_luar);
          $$("#count_kpk").html(data.kpk);
          $$("#count_siup").html(data.siup);
          $$("#count_tdp").html(data.tdp);
        },
        "json"
      );
    }
    if (iamthedoor.role_id == "24") {
      $$("#tipe-a").remove();
      $$("#button-a").remove();
      $$("#tipe-c").remove();
      $$("#button-c").remove();
      // $$('#tipe-d').remove();
      // $$('#button-d').remove();
      $$("#tipe-b").addClass("tab-active");
      $$(".tab-link-highlight").css("width", "50%");
      $$(".not_dinsos").remove();
      $$("#sktm_dinsos").show();
      app.request.post(
        site_url_mobile + "/siurban_mobile/dashboard_data",
        iamthedoor,
        function (data) {
          $$("#count_tipe_b").html(data.tipe_b);
          $$("#count_sktm_dinsos").html(data.sktm_dinsos);
        },
        "json"
      );
    }
    if (iamthedoor.role_id == "38") {
      $$("#tipe-a").remove();
      $$("#button-a").remove();
      $$("#tipe-b").remove();
      $$("#button-b").remove();
      $$("#tipe-c").remove();
      $$("#button-c").remove();
      $$("#tipe-d").addClass("tab-active");
      $$(".tab-link-highlight").css("width", "50%");
    }
    $$("#notif_surat").remove();
    $$("#move_dom").remove();
    $$("#list_komplain").remove();
  } else if (iamthedoor.role_id == "4") {
    $$("#kua_luar").remove();
    $$("#domi_luar").remove();
    $$("#imb_luar").remove();
    $$(".badge").remove();
    $$("#gen_token").remove();

    if (!datauser.nop || !datauser.status_nop) {
      var nop_popup = app.popup.create({
        content:
          '<div class="popup">' +
          '<div class="block">' +
          '<p><a href="#" class="link popup-close">Tutup</a></p>' +
          "<p>NOP PBB Anda Belum Terdaftar, Mohon Lengkapi Data Berikut :</p>" +
          '<div class="list">' +
          "<ul>" +
          '<li class="item-content item-input">' +
          '<div class="item-inner">' +
          '<div class="item-title item-label">NOP</div>' +
          '<div class="item-input-wrap">' +
          '<input type="number" id="nop" min="0" placeholder="NOP">' +
          "</div>" +
          "</div>" +
          "</li>" +
          '<li class="item-content item-input">' +
          '<div class="item-inner">' +
          '<div class="item-title item-label">Status NOP</div>' +
          '<div class="item-input-wrap input-dropdown-wrap">' +
          '<select id="status_nop">' +
          '<option value="Milik Saya">Milik Saya</option>' +
          '<option value="Dalam Penguasaan Saya">Dalam Penguasaan Saya</option>' +
          '<option value="Dalam Pemanfaatan Saya">Dalam Pemanfaatan Saya</option>' +
          '<option value="Milik Keluarga Saya">Milik Keluarga Saya</option>' +
          '<option value="Milik Kerabat Saya">Milik Kerabat Saya</option>' +
          "</select>" +
          "</div>" +
          "</div>" +
          "</li>" +
          "</ul>" +
          "</div>" +
          '<div class="row">' +
          '<button class="col-50 button button-fill" id="save_nop">Simpan</button>' +
          "</div>" +
          "</div>" +
          "</div>",
        on: {
          opened: function () {
            $$("#save_nop").on("click", function () {
              if ($$("#nop").val().length != 18) {
                alert("NOP harus berisi 18 Digit!");
                return false;
              }

              app.dialog.preloader("Tunggu Sebentar...");
              let post = {
                user: datauser,
                nop: $$("#nop").val(),
                status_nop: $$("#status_nop").val(),
              };
              app.request.post(
                site_url_mobile_layanan + "/user_support/send_nop",
                post,
                function (data) {
                  app.dialog.close();
                  nop_popup.close();
                  show_pbb(data);
                },
                "json"
              );
            });
          },
        },
      });
      nop_popup.open();
    } else if (parseInt(datauser.pbb_terutang) > 0) {
      show_pbb({ pbb_terutang: parseInt(datauser.pbb_terutang) });
    } else {
      check_survey();
    }
  }

  function show_pbb({ status = 0, pbb_terutang = 0, doc_path_nop = "" }) {
    let alert_text = "Mohon Maaf, Data NOP Anda tidak dapat Ditemukan.";
    if (pbb_terutang > 0) {
      alert_text =
        "Mohon untuk Segera Melunasi Tagihan PBB Anda dengan Nilai Sebesar:<br>Rp. " +
        toIdrFormat(pbb_terutang);
    }

    app.dialog.alert(alert_text, function () {
      check_survey();
    });
  }

  function check_survey() {
    app.request.post(
      base_url + "/kuisioner/get_id_survey/" + datauser.bf_users_id,
      function (data) {
        if (data.id_survey != 0) {
          let encoded = window
            .btoa(datauser.bf_users_id + "e" + data.id_survey)
            .replace(/=/g, "");
          if (data.individu == 0 || data.keluarga == 0) {
            app.dialog.confirm(
              "Untuk Pembaharuan Data Anda. Mohon untuk Mengisi Form Survey berikut ini!",
              function () {
                cordova.InAppBrowser.open(
                  base_url + "/kuisioner/index/" + encoded,
                  "_system"
                );
              }
            );
          }
        }
      },
      "json"
    );
  }
}
$$(document).on("page:init", '.page[data-class="new_layanan"]', function () {
  app.request.post(
    site_url_mobile +
      "/siurban_mobile/get_kecamatan_kelurahan/" +
      datauser.kecamatan +
      "/" +
      datauser.kode_desa,
    function (data) {
      app.dialog.close();
      dataparsed = JSON.parse(data);
      $$("input[name='kecamatan_pemohon']").val(dataparsed.kecamatan);
      $$("input[name='kelurahan_pemohon']").val(dataparsed.kelurahan);
    }
  );
  $$("input[name='nama_pemohon']").val(datauser.nama);
  $$("input[name='alamat_pemohon']").val(datauser.alamat);
  $$("input[name='no_kk']").val(datauser.no_kk);
  $$("input[name='nik_pemohon']").val(datauser.nik);
  $$("input[name='agama']").val(datauser.agama);
  $$("input[name='kwn']").val(datauser.kwn);
  $$("input[name='email_pelapor']").val(datauser.email);
  $$("input[name='telp_pemohon']").val(datauser.no_telp_pendaftar);
});
$$(document).on(
  "page:init",
  '.page[data-class="new_layanan_kartu_keluarga"]',
  function () {
    app.request.post(
      site_url_mobile +
        "/siurban_mobile/get_kecamatan_kelurahan/" +
        datauser.kecamatan +
        "/" +
        datauser.kode_desa,
      function (data) {
        app.dialog.close();
        dataparsed = JSON.parse(data);
        $$("input[name='kecamatan_pemohon']").val(dataparsed.kecamatan);
        $$("input[name='kelurahan_pemohon']").val(dataparsed.kelurahan);
      }
    );
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
  }
);
$$(document).on("page:init", '.page[data-class="new_layanan_b"]', function () {
  app.request.post(
    site_url_mobile +
      "/siurban_mobile/get_kecamatan_kelurahan/" +
      datauser.kecamatan +
      "/" +
      datauser.kode_desa,
    function (data) {
      app.dialog.close();
      dataparsed = JSON.parse(data);
      $$("input[name='kecamatan_pemohon']").val(dataparsed.kecamatan);
      $$("input[name='kelurahan_pemohon']").val(dataparsed.kelurahan);
    }
  );
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
$$(document).on(
  "page:init",
  '.page[data-class="new_kartu_pencari_kerja"',
  function (argument) {
    app.request.post(
      site_url_mobile +
        "/siurban_mobile/get_kecamatan_kelurahan/" +
        datauser.kecamatan +
        "/" +
        datauser.kode_desa,
      function (data) {
        app.dialog.close();
        dataparsed = JSON.parse(data);
        $$("input[name='kecamatan_pemohon']").val(dataparsed.kecamatan);
        $$("input[name='kelurahan_pemohon']").val(dataparsed.kelurahan);
      }
    );
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
  }
);
$$(document).on(
  "page:init",
  '.page[data-class="new_layanan_c"',
  function (argument) {
    app.request.post(
      site_url_mobile +
        "/siurban_mobile/get_kecamatan_kelurahan/" +
        datauser.kecamatan +
        "/" +
        datauser.kode_desa,
      function (data) {
        dataparsed = JSON.parse(data);
        $$("input[name='kecamatan_pemohon']").val(dataparsed.kecamatan);
        $$("input[name='kelurahan_pemohon']").val(dataparsed.kelurahan);
      }
    );
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
  }
);
$$(document).on("page:init", '.page[data-class="siup"]', function (argument) {
  app.request.post(
    site_url_mobile +
      "/siurban_mobile/get_kecamatan_kelurahan/" +
      datauser.kecamatan +
      "/" +
      datauser.kode_desa,
    function (data) {
      dataparsed = JSON.parse(data);
      $$("input[name='kecamatan_pemohon']").val(dataparsed.kecamatan);
      $$("input[name='kelurahan_pemohon']").val(dataparsed.kelurahan);
    }
  );
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
$$(document).on(
  "page:init",
  '.page[data-class="layanan_sk_umum"',
  function (argument) {
    app.request.post(
      site_url_mobile +
        "/siurban_mobile/get_kecamatan_kelurahan/" +
        datauser.kecamatan +
        "/" +
        datauser.kode_desa,
      function (data) {
        dataparsed = JSON.parse(data);
        $$("input[name='kecamatan_pemohon']").val(dataparsed.kecamatan);
        $$("input[name='kelurahan_pemohon']").val(dataparsed.kelurahan);
      }
    );
    $$("input[name='nik_pemohon']").val(datauser.nik);
    $$("input[name='nama_pemohon']").val(datauser.nama);
    $$("input[name='tempat_lahir_pemohon']").val(datauser.tempat_lahir);
    $$("input[name='jenis_kelamin_pemohon']").val(datauser.jenis_kelamin);
    $$("input[name='agama_pemohon']").val(datauser.agama);
    $$("input[name='status_kawin_pemohon']").val(datauser.status_kawin);
    $$("input[name='tanggal_lahir_pemohon']").val(datauser.tanggal_lahir);
    $$("input[name='pekerjaan_pemohon']").val(datauser.pekerjaan);
    $$("input[name='alamat_pemohon']").val(datauser.alamat);
  }
);
$$(document).on(
  "page:init",
  '.page[data-class="layanan_domisili_usaha"',
  function (argument) {
    app.request.post(
      site_url_mobile +
        "/siurban_mobile/get_kecamatan_kelurahan/" +
        datauser.kecamatan +
        "/" +
        datauser.kode_desa,
      function (data) {
        dataparsed = JSON.parse(data);
        $$("input[name='kecamatan_pemohon']").val(dataparsed.kecamatan);
        $$("input[name='kelurahan_pemohon']").val(dataparsed.kelurahan);
      }
    );
    app.request.post(
      site_url_mobile + "/siurban_mobile/get_kode_kecamatan/",
      function (kecamatan) {
        var kecamatan_html = "";
        for (var i = 0; i < kecamatan.length; i++) {
          kecamatan_html +=
            '<option value="' +
            kecamatan[i].kode +
            '">' +
            kecamatan[i].nama +
            "</option>";
        }
        $$("select[name='kecamatan']").html(kecamatan_html).change();
        var kecamatan_kode = $$("select[name='kecamatan']").val();
        get_data_kelurahan(kecamatan_kode);
        $$("select[name='kecamatan']").on("change", function () {
          kecamatan_kode = $$("select[name='kecamatan']").val();
          get_data_kelurahan(kecamatan_kode);
        });
      },
      "json"
    );
    $$("input[name='nik_pemohon']").val(datauser.nik);
    $$("input[name='nama_pemohon']").val(datauser.nama);
    $$("input[name='tempat_lahir_pemohon']").val(datauser.tempat_lahir);
    $$("input[name='jenis_kelamin_pemohon']").val(datauser.jenis_kelamin);
    $$("input[name='agama_pemohon']").val(datauser.agama);
    $$("input[name='status_kawin_pemohon']").val(datauser.status_kawin);
    $$("input[name='tanggal_lahir_pemohon']").val(datauser.tanggal_lahir);
    $$("input[name='pekerjaan_pemohon']").val(datauser.pekerjaan);
    $$("input[name='alamat_pemohon']").val(datauser.alamat);
  }
);
$$(document).on(
  "page:init",
  '.page[data-class="ijin_mendirikan_bangunan_form"',
  function (argument) {
    app.request.post(
      site_url_mobile +
        "/siurban_mobile/get_kecamatan_kelurahan/" +
        datauser.kecamatan +
        "/" +
        datauser.kode_desa,
      function (data) {
        dataparsed = JSON.parse(data);
        $$("input[name='kecamatan_pemohon']").val(dataparsed.kecamatan);
        $$("input[name='kelurahan_pemohon']").val(dataparsed.kelurahan);
      }
    );
    app.request.post(
      site_url_mobile + "/siurban_mobile/get_kode_kecamatan/",
      function (kecamatan) {
        var kecamatan_html = "";
        for (var i = 0; i < kecamatan.length; i++) {
          kecamatan_html +=
            '<option value="' +
            kecamatan[i].kode +
            '">' +
            kecamatan[i].nama +
            "</option>";
        }
        $$("select[name='kode_kecamatan_bangunan']")
          .html(kecamatan_html)
          .change();
        var kecamatan_kode = $$("select[name='kode_kecamatan_bangunan']").val();
        get_kelurahan(kecamatan_kode);
        $$("select[name='kode_kecamatan_bangunan']").on("change", function () {
          kecamatan_kode = $$("select[name='kode_kecamatan_bangunan']").val();
          get_kelurahan(kecamatan_kode);
        });
      },
      "json"
    );
    $$("input[name='nik_pemohon']").val(datauser.nik);
    $$("input[name='nama_pemohon']").val(datauser.nama);
    $$("input[name='alamat_pemohon']").val(datauser.alamat);
  }
);

function get_kelurahan(kecamatan_kode) {
  app.request.post(
    site_url_mobile + "/siurban_mobile/get_kode_kelurahan/" + kecamatan_kode,
    function (kelurahan) {
      var kelurahan_html = "";
      for (var i = 0; i < kelurahan.length; i++) {
        kelurahan_html +=
          '<option value="' +
          kelurahan[i].kode +
          '">' +
          kelurahan[i].nama +
          "</option>";
      }
      $$("select[name='kode_kelurahan_bangunan']")
        .html(kelurahan_html)
        .change();
    },
    "json"
  );
}

function get_data_kelurahan(kecamatan_kode, kelurahan_kode = null) {
  app.request.post(
    site_url_mobile + "/siurban_mobile/get_kode_kelurahan/" + kecamatan_kode,
    function (kelurahan) {
      var kelurahan_html = "";
      for (var i = 0; i < kelurahan.length; i++) {
        kelurahan_html +=
          '<option value="' +
          kelurahan[i].kode +
          '">' +
          kelurahan[i].nama +
          "</option>";
      }
      $$("select[name='kelurahan']").html(kelurahan_html).change();
      if (kelurahan_kode != null) {
        $$("select[name='kelurahan']").val(kelurahan_kode).change();
      }
    },
    "json"
  );
}

function get_data_kelurahan_2(kecamatan_kode, kelurahan_kode = null) {
  app.request.post(
    site_url_mobile + "/siurban_mobile/get_kode_kelurahan/" + kecamatan_kode,
    function (kelurahan) {
      var kelurahan_html = "";
      for (var i = 0; i < kelurahan.length; i++) {
        kelurahan_html +=
          '<option value="' +
          kelurahan[i].kode +
          '">' +
          kelurahan[i].nama +
          "</option>";
      }
      $$("select[name='kode_kelurahan']").html(kelurahan_html).change();
      if (kelurahan_kode != null) {
        $$("select[name='kode_kelurahan']").val(kelurahan_kode).change();
      }
    },
    "json"
  );
}

function get_data_kelurahan_3(kecamatan_kode, kelurahan_kode = null) {
  app.request.post(
    site_url_mobile + "/siurban_mobile/get_kode_kelurahan/" + kecamatan_kode,
    function (kelurahan) {
      var kelurahan_html = "";
      for (var i = 0; i < kelurahan.length; i++) {
        kelurahan_html +=
          '<option value="' +
          kelurahan[i].kode +
          '">' +
          kelurahan[i].nama +
          "</option>";
      }
      $$("select[name='kode_kelurahan_bangunan']")
        .html(kelurahan_html)
        .change();
      if (kelurahan_kode != null) {
        $$("select[name='kode_kelurahan_bangunan']")
          .val(kelurahan_kode)
          .change();
      }
    },
    "json"
  );
}

function get_current_date() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth();
  var monthname = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  var today = dd + "-" + monthname[mm] + "-" + yyyy;
  return today;
}

function get_today() {
  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return today;
}

function cek_iumk() {
  var nomor_iumk = $$("input[name='no_iumk']").val();
  app.request({
    url: site_url_mobile + "/siurban_mobile/get_iumk/",
    async: false,
    method: "POST",
    data: { no_iumk: nomor_iumk },
    success: function (iumk) {
      if (iumk) {
        $("#nama_usaha").val(iumk["nama_usaha"]);
        $("#npwp_usaha").val(iumk["npwp_usaha"]);
        $("#status_usaha").val(iumk["status_usaha"]);
        $("#alamat_usaha").val(iumk["alamat_usaha"]);
        $("#kec_usaha").val(iumk["kec_usaha"]);
        $("#nama_kec_usaha").val(iumk["nama_kec_usaha"]);
        $("#kel_usaha").val(iumk["kel_usaha"]);
        $("#nama_kel_usaha").val(iumk["nama_kel_usaha"]);
        $("#pos_usaha").val(iumk["pos_usaha"]);
        $("#telp_usaha").val(iumk["telp_usaha"]);
        $("#fax_usaha").val(iumk["fax_usaha"]);
        $("#email_usaha").val(iumk["email_usaha"]);
        $("#modal_usaha").val(iumk["modal_usaha"]);
        $("#omzet_usaha").val(iumk["omzet_usaha"]);
        $("#tenaga_jumlah_usaha").val(iumk["tenaga_jumlah_usaha"]);
        $("#sarana_usaha").val(iumk["sarana_usaha"]);
        $("#kegiatan_usaha").val(iumk["nama_kegiatan_usaha"]);
        app.dialog.alert(
          'IUMK dengan Nama Perusahaan : "' +
            iumk["nama_usaha"] +
            '" Ditemukan.'
        );
        return_val = true;
      } else {
        $("#nama_usaha").val("");
        $("#npwp_usaha").val("");
        $("#status_usaha").val("");
        $("#alamat_usaha").val("");
        $("#kec_usaha").val("");
        $("#nama_kec_usaha").val("");
        $("#kel_usaha").val("");
        $("#nama_kel_usaha").val("");
        $("#pos_usaha").val("");
        $("#telp_usaha").val("");
        $("#fax_usaha").val("");
        $("#email_usaha").val("");
        $("#modal_usaha").val("");
        $("#omzet_usaha").val("");
        $("#tenaga_jumlah_usaha").val("");
        $("#sarana_usaha").val("");
        $("#kegiatan_usaha").val("");
        app.dialog.alert(
          "IUMK Tidak Ditemukan, Mohon Cek Nomor IUMK Anda Kembali."
        );
        return_val = false;
      }
    },
    dataType: "json",
  });
  return return_val;
}

function approve(function_url, this_user_is_the_last_index, esign = "") {
  data = $.extend(app.form.convertToData("#approval"), iamthedoor);
  var url =
    site_url_mobile_layanan +
    function_url +
    "/" +
    iamthedoor.user_id +
    "/" +
    iamthedoor.kecamatan_id +
    "/" +
    iamthedoor.kelurahan_id +
    "/";
  if (
    this_user_is_the_last_index == true &&
    $$("select[name='status']").val() == 2 &&
    esign.length == 0
  ) {
    app.dialog.alert("Passphrase Tidak Boleh Kosong");
  } else {
    app.dialog.preloader("Sedang Proses...");
    data["esign"] = window.btoa(esign).replace(/=/g, "");
    app.request.post(
      url,
      data,
      function (data) {
        if (isNaN(data)) {
          app.dialog.close();
          if (data.status == "wrong") {
            app.dialog.alert(data.message);
          } else if (data.status == "success") {
            app.dialog.alert("Berhasil");
          } else {
            app.dialog.alert("Terjadi Kesalahan Dalam Sistem.");
          }
          $("#datatables").DataTable().ajax.reload();
          mainView.router.back();
        } else {
          app.dialog.close();
          app.dialog.alert("Terjadi Kesalahan Dalam Sistem.");
          mainView.router.back();
          $("#datatables").DataTable().ajax.reload();
        }
      },
      function () {
        app.dialog.close();
        app.dialog.alert(
          "Peringatan",
          "Anda Sedang Tidak Tersambung Dengan Internet."
        );
        mainView.router.back();
        $("#datatables").DataTable().ajax.reload();
      },
      "json"
    );
  }
}

function download_doc(doc_path) {
  let encoded = window.btoa("dasarnakal" + "dummy").replace(/=/g, "");
  Attachment.download(
    doc_path,
    site_url_mobile.replace("/index.php", "") +
      "/esign/acquire_doc/" +
      encoded +
      "/" +
      doc_path
  );
}

function download_external(subdir, doc_path) {
  Attachment.download(
    doc_path,
    site_url_mobile.replace("/index.php", "") +
      "/esign/acquire_external/" +
      subdir +
      "/" +
      doc_path
  );
}

function preview_doc(doc_path, subdir = "logs") {
  let encoded = window
    .btoa(doc_path + "dasarnakal" + "dummy")
    .replace(/=/g, "");
  // let url = 'https://docs.google.com/gview?embedded=true&url=' + site_url_mobile + '/esign/access_doc/' + encoded;
  let url =
    base_url + "/pdfjs/web/viewer.php?encoded=" + encoded + "&dir=" + subdir;
  inAppBrowser = cordova.InAppBrowser.open(
    url,
    "_blank",
    "hidden=yes,location=no,zoom=no"
  );
  inAppBrowser.addEventListener("loadstop", function () {
    app.dialog.close();
    inAppBrowser.show();
  });
  inAppBrowser.addEventListener("loaderror", function () {
    app.dialog.close();
    inAppBrowser.close();
    app.dialog.alert("Mohon Maaf, Sedang Terjadi Kesalahan.");
  });
}

function ttdview(database64) {
  var canvas_static = document.getElementById("signature_pad_static");
  if (canvas_static) {
    var signaturePad_static = new SignaturePad(canvas_static);
    signaturePad_static.fromDataURL("data:image/png;base64," + database64, {
      ratio: 1,
    });
    signaturePad_static.off();
  }
}

function document_look(std, ptd) {
  switch (std) {
    case "1":
      std = "Menunggu";
      break;
    case "2":
      std = "Disetujui";
      break;
    case "3":
      std = "Ditolak";
      break;
    default:
      std = "Belum Diterima";
      break;
  }
  $$("#std").html(std);
  $$("#ptd").html(ptd);
}

function change_passLoad() {
  $$("#email").val(datauser.email);
  $$("#username").val(datauser.nik);
  $$("#display_name").val(datauser.nama);
  $$("#no_telp_pendaftar").val(datauser.no_telp_pendaftar);
  $$("#simpan").on("click", function () {
    if ($$("#password").val().length > 0) {
      if ($$("#password").val().length < 8) {
        app.dialog.alert("Password Harus Lebih dari 8 Karakter");
        return false;
      }
      if ($$("#password").val() != $$("#confirm_password").val()) {
        app.dialog.alert("Password Tidak Sama");
        return false;
      }
    }
    app.input.validateInputs("#change_pass_form");
    if ($$("#change_pass_form")[0].checkValidity() == true) {
      let ajax_data = [];
      let form_data = app.form.convertToData("#change_pass_form");
      ajax_data.push(datauser);
      ajax_data.push(form_data);
      app.request.post(
        site_url_mobile_layanan + "/user_support/change_pass",
        ajax_data,
        function (callback) {
          if (callback) {
            app.dialog.alert("Sandi/Nomor Handphone Anda Berhasil Diubah!");
            datauser.no_telp_pendaftar = form_data.no_telp_pendaftar;
            localStorage.setItem("datauser", JSON.stringify(datauser));
            sess_update();
          } else {
            app.dialog.alert(callback.desc);
          }
        },
        function () {
          app.dialog.alert("Perubahan Gagal, Mohon Coba Lagi Nanti");
        },
        "json"
      );
    }
  });
}

function get_kelurahan_reg(kode_kec, elem_kel) {
  app.request.post(
    site_url_mobile_layanan + "/user_support/get_kelurahan/" + kode_kec,
    function (callback) {
      let options =
        '<option value="000" selected style="display: none"> -- PILIH DESA/KELURAHAN BERIKUT -- </option>';
      for (var i = 0; i < callback.length; i++) {
        options +=
          '<option value="' +
          callback[i].kode +
          '">' +
          callback[i].nama +
          "</option>";
      }
      $$(elem_kel).html(options).change();
    },
    "json"
  );
}

function get_kelurahan_dom(kode_kec, elem_kel) {
  app.request.post(
    site_url_mobile_layanan + "/user_support/get_kelurahan/" + kode_kec,
    function (callback) {
      let options = "";
      for (var i = 0; i < callback.length; i++) {
        options +=
          '<option value="' +
          callback[i].kode +
          '">' +
          callback[i].nama +
          "</option>";
      }
      $$(elem_kel).html(options).change();
    },
    "json"
  );
}

function get_kecamatan_dom(elem_kec, elem_kel) {
  app.request.post(
    site_url_mobile_layanan + "/user_support/get_kecamatan",
    function (callback) {
      let options = "";
      for (var i = 0; i < callback.length; i++) {
        options +=
          '<option value="' +
          callback[i].kode +
          '">' +
          callback[i].nama +
          "</option>";
      }
      $$(elem_kec).html(options).change();
    },
    "json"
  );
}

// Fungsi Get Provinsi, Kabupaten, Kecamatan, Kelurahan
function get_kelurahan_new(
  district = datauser.id_district,
  elem_kel,
  def_kelurahan = datauser.id_village
) {
  Attachment.getDbWhere(
    {
      table: "kt_reg_villages",
      where: [{ district_id: district }],
      order_by: "name",
    },
    function (result) {
      let options = "";
      result.forEach(function (row) {
        options +=
          '<option value="' +
          row.id +
          '" ' +
          (row.id == def_kelurahan ? "selected" : "") +
          ">" +
          row.name +
          "</option>";
      });
      $$(elem_kel).html(options).change();
    }
  );
}

function get_kecamatan_new(
  regency = "3515",
  elem_kec,
  def_kecamatan = datauser.id_district
) {
  Attachment.getDbWhere(
    {
      table: "kt_reg_districts",
      where: [{ regency_id: regency }],
      order_by: "name",
    },
    function (result) {
      let options = "";
      result.forEach(function (row) {
        options +=
          '<option value="' +
          row.id +
          '" ' +
          (row.id == def_kecamatan ? "selected" : "") +
          ">" +
          row.name +
          "</option>";
      });
      $$(elem_kec).html(options).change();
    }
  );
}

function get_kabupaten_new(province = "35", elem_kab, def_kabupaten = "3515") {
  Attachment.getDbWhere(
    {
      table: "kt_reg_regencies",
      where: [{ province_id: province }],
      order_by: "name",
    },
    function (result) {
      let options = "";
      result.forEach(function (row) {
        options +=
          '<option value="' +
          row.id +
          '" ' +
          (row.id == def_kabupaten ? "selected" : "") +
          ">" +
          row.name +
          "</option>";
      });
      $$(elem_kab).html(options).change();
    }
  );
}

function get_provinsi_new(elem_prov, def_provinsi = "35") {
  Attachment.getDbWhere(
    {
      table: "kt_reg_provinces",
      order_by: "name",
    },
    function (result) {
      let options = "";
      result.forEach(function (row) {
        options +=
          '<option value="' +
          row.id +
          '" ' +
          (row.id == def_provinsi ? "selected" : "") +
          ">" +
          row.name +
          "</option>";
      });
      $$(elem_prov).html(options).change();
    }
  );
}
// End of Function

// Fungsi Get Faskes
function get_faskes(elem_faskes, def_faskes = "") {
  app.request.post(
    site_url_mobile_layanan + "/user_support/get_faskes",
    function (result) {
      let options = "";
      result.forEach(function (row) {
        options +=
          '<option value="' +
          row.id +
          '" ' +
          (row.id == def_faskes ? "selected" : "") +
          ">" +
          row.nama +
          "</option>";
      });
      $$(elem_faskes).html(options).change();
    },
    "json"
  );
}
//End

function get_pilihan_umum({
  pend_elem = "",
  pend_def = "",
  kerja_elem = "",
  kerja_def = "",
  hub_elem = "",
  hub_def = "",
  gol_dar_elem = "",
  gol_dar_def = "",
  kelainan_elem = "",
  kelainan_def = "",
  kecacatan_elem = "",
  kecacatan_def = "",
}) {
  app.request.post(
    site_url_mobile_layanan + "/user_support/get_opt_umum",
    function (result) {
      if (pend_elem.length) {
        if (Array.isArray(pend_elem)) {
          pend_elem.forEach(function (elem, n) {
            let options = "";
            for (let i = 0; i < result.pend.length; i++) {
              let def =
                Array.isArray(pend_def) && pend_def[n] && pend_def[n].length
                  ? pend_def[n]
                  : "";
              options +=
                '<option value="' +
                result.pend[i].name +
                '" ' +
                (result.pend[i].name == def ? "selected" : "") +
                ">" +
                result.pend[i].name +
                "</option>";
            }
            $$(elem).html(options);
          });
        } else {
          let options = "";
          for (let i = 0; i < result.pend.length; i++) {
            options +=
              '<option value="' +
              result.pend[i].name +
              '" ' +
              (result.pend[i].name == pend_def ? "selected" : "") +
              ">" +
              result.pend[i].name +
              "</option>";
          }
          $$(pend_elem).html(options);
        }
      }

      if (kerja_elem.length) {
        if (Array.isArray(kerja_elem)) {
          kerja_elem.forEach(function (elem, n) {
            let options = "";
            for (let i = 0; i < result.kerja.length; i++) {
              let def =
                Array.isArray(kerja_def) && kerja_def[n] && kerja_def[n].length
                  ? kerja_def[n]
                  : "";
              options +=
                '<option value="' +
                result.kerja[i].name +
                '" ' +
                (result.kerja[i].name == def ? "selected" : "") +
                ">" +
                result.kerja[i].name +
                "</option>";
            }
            $$(elem).html(options);
          });
        } else {
          let options = "";
          for (let i = 0; i < result.kerja.length; i++) {
            options +=
              '<option value="' +
              result.kerja[i].name +
              '" ' +
              (result.kerja[i].name == kerja_def ? "selected" : "") +
              ">" +
              result.kerja[i].name +
              "</option>";
          }
          $$(kerja_elem).html(options);
        }
      }

      if (hub_elem.length) {
        if (Array.isArray(hub_elem)) {
          hub_elem.forEach(function (elem, n) {
            let options = "";
            for (let i = 0; i < result.hub.length; i++) {
              let def =
                Array.isArray(hub_def) && hub_def[n] && hub_def[n].length
                  ? hub_def[n]
                  : "";
              options +=
                '<option value="' +
                result.hub[i].name +
                '" ' +
                (result.hub[i].name == def ? "selected" : "") +
                ">" +
                result.hub[i].name +
                "</option>";
            }
            $$(elem).html(options);
          });
        } else {
          let options = "";
          for (let i = 0; i < result.hub.length; i++) {
            options +=
              '<option value="' +
              result.hub[i].name +
              '" ' +
              (result.hub[i].name == hub_def ? "selected" : "") +
              ">" +
              result.hub[i].name +
              "</option>";
          }
          $$(hub_elem).html(options);
        }
      }

      if (gol_dar_elem.length) {
        if (Array.isArray(gol_dar_elem)) {
          gol_dar_elem.forEach(function (elem, n) {
            let options = "";
            for (let i = 0; i < result.gol_dar.length; i++) {
              let def =
                Array.isArray(gol_dar_def) &&
                gol_dar_def[n] &&
                gol_dar_def[n].length
                  ? gol_dar_def[n]
                  : "";
              options +=
                '<option value="' +
                result.gol_dar[i].name +
                '" ' +
                (result.gol_dar[i].name == def ? "selected" : "") +
                ">" +
                result.gol_dar[i].name +
                "</option>";
            }
            $$(elem).html(options);
          });
        } else {
          let options = "";
          for (let i = 0; i < result.gol_dar.length; i++) {
            options +=
              '<option value="' +
              result.gol_dar[i].name +
              '" ' +
              (result.gol_dar[i].name == gol_dar_def ? "selected" : "") +
              ">" +
              result.gol_dar[i].name +
              "</option>";
          }
          $$(gol_dar_elem).html(options);
        }
      }

      if (kelainan_elem.length) {
        if (Array.isArray(kelainan_elem)) {
          kelainan_elem.forEach(function (elem, n) {
            let options = "";
            for (let i = 0; i < result.kelainan.length; i++) {
              let def =
                Array.isArray(kelainan_def) &&
                kelainan_def[n] &&
                kelainan_def[n].length
                  ? kelainan_def[n]
                  : "";
              options +=
                '<option value="' +
                result.kelainan[i].name +
                '" ' +
                (result.kelainan[i].name == def ? "selected" : "") +
                ">" +
                result.kelainan[i].name +
                "</option>";
            }
            $$(elem).html(options);
          });
        } else {
          let options = "";
          for (let i = 0; i < result.kelainan.length; i++) {
            options +=
              '<option value="' +
              result.kelainan[i].name +
              '" ' +
              (result.kelainan[i].name == kelainan_def ? "selected" : "") +
              ">" +
              result.kelainan[i].name +
              "</option>";
          }
          $$(kelainan_elem).html(options);
        }
      }

      if (kecacatan_elem.length) {
        if (Array.isArray(kecacatan_elem)) {
          kecacatan_elem.forEach(function (elem, n) {
            let options = "";
            for (let i = 0; i < result.kecacatan.length; i++) {
              let def =
                Array.isArray(kecacatan_def) &&
                kecacatan_def[n] &&
                kecacatan_def[n].length
                  ? kecacatan_def[n]
                  : "";
              options +=
                '<option value="' +
                result.kecacatan[i].name +
                '" ' +
                (result.kecacatan[i].name == def ? "selected" : "") +
                ">" +
                result.kecacatan[i].name +
                "</option>";
            }
            $$(elem).html(options);
          });
        } else {
          let options = "";
          for (let i = 0; i < result.kecacatan.length; i++) {
            options +=
              '<option value="' +
              result.kecacatan[i].name +
              '" ' +
              (result.kecacatan[i].name == kecacatan_def ? "selected" : "") +
              ">" +
              result.kecacatan[i].name +
              "</option>";
          }
          $$(kecacatan_elem).html(options);
        }
      }
    },
    "json"
  );
}

function move_domLoad() {
  $$("#nama").val(datauser.nama);
  $$("#ttl").val(datauser.tempat_lahir + ", " + datauser.tanggal_lahir);
  $$("#jenis_kelamin").val(datauser.jenis_kelamin);
  $$("#agama").val(datauser.agama);
  $$("#status_kawin").val(datauser.status_kawin);
  $$("#kec_asal").val(datauser.kecamatan);
  $$("#kel_asal").val(datauser.kode_desa);
  $$("#alamat").val(datauser.alamat);
  app.request.post(
    site_url_mobile_layanan + "/user_support/get_dom",
    datauser,
    function (callback) {
      $$("#nama_kec_asal").val(callback.kecamatan.nama);
      $$("#nama_kel_asal").val(callback.kelurahan.nama);
    },
    function () {
      app.dialog.alert("Terjadi Kesalahan, Mohon Coba Lagi Nanti");
    },
    "json"
  );
  get_kecamatan_dom("#kec_baru", "#kel_baru");
  $$("#kec_baru").on("change", function () {
    get_kelurahan_dom($$("#kec_baru").val(), "#kel_baru");
  });
  $$("#addformupload").on("touchend", add_row_pindah);
  $$("#simpan").on("click", function () {
    filecode = [];
    $("input[name^=filecode]").each(function () {
      filecode.push($(this).val());
    });
    if (!filecode[0]) {
      app.dialog.alert("Harap Lengkapi Dokumen");
      return false;
    }
    keteranganid = [];
    $("input[name^=keteranganid]").each(function () {
      keteranganid.push($(this).val());
    });
    app.input.validateInputs("#move_dom_form");
    if ($$("#move_dom_form")[0].checkValidity() == true) {
      let ajax_data = [];
      let form_data = app.form.convertToData("#move_dom_form");
      ajax_data.push(datauser);
      ajax_data.push(form_data);
      ajax_data.push(filecode);
      ajax_data.push(keteranganid);
      app.request.post(
        site_url_mobile_layanan + "/user_support/move_dom",
        ajax_data,
        function (callback) {
          if (callback == 2) {
            app.dialog.alert("Password Anda Salah");
          } else if (callback == 3) {
            app.dialog.alert(
              "Gagal Diajukan, Karna Pengajuan Sebelumnya Masih Berjalan"
            );
          } else if (callback) {
            app.dialog.alert("Data Berhasil Diajukan");
            mainView.router.back();
          } else {
            app.dialog.alert(callback.desc);
          }
        },
        function () {
          app.dialog.alert("Data Gagal Diajukan, Mohon Coba Lagi Nanti");
        },
        "json"
      );
    }
  });
}

function registerLoad() {
  var maplet;
  var maplayer;
  app.request.post(
    site_url_mobile_layanan + "/user_support/get_kecamatan",
    function (callback) {
      let options =
        '<option value="000" data-lat="-7.4497718" data-lng="112.7015495" selected style="display: none"> -- PILIH KECAMATAN BERIKUT -- </option>';
      for (var i = 0; i < callback.length; i++) {
        options +=
          '<option value="' +
          callback[i].kode +
          '" data-lat="' +
          callback[i].latitude +
          '" data-lng="' +
          callback[i].longitude +
          '">' +
          callback[i].nama +
          "</option>";
      }
      $$("#kecamatan").html(options);
      get_kelurahan_reg($$("#kecamatan").val(), "#kode_desa");

      if (!maplet) {
        maplet = L.map("mapid").setView(
          [
            $("#kecamatan").find("option:selected").data("lat"),
            $("#kecamatan").find("option:selected").data("lng"),
          ],
          14
        );
        L.tileLayer(
          "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
              '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken:
              "pk.eyJ1IjoibGVhc3RsaWVzdCIsImEiOiJja3Z0MHk2MjIwaG40MnZvMm5wcHg0Yjh2In0.ihOdlQzN55Q6UZkaI3cZMg",
          }
        ).addTo(maplet);
        maplayer = L.layerGroup().addTo(maplet);
        maplet.on("click", function (evt) {
          maplayer.clearLayers();
          L.marker([evt.latlng.lat, evt.latlng.lng]).addTo(maplayer);
          $("#lat").val(evt.latlng.lat);
          $("#lng").val(evt.latlng.lng);
        });
      }
    },
    "json"
  );
  $$("#kecamatan").on("change", function () {
    maplet.setView(
      [
        $(this).find("option:selected").data("lat"),
        $(this).find("option:selected").data("lng"),
      ],
      14
    );
    get_kelurahan_reg($$("#kecamatan").val(), "#kode_desa");
  });

  $$("#simpan").on("click", function () {
    if ($("#nik").val().length != 16) {
      app.dialog.alert("NIK Harus Memiliki Panjang 16 Digit");
      return false;
    }
    if ($("#kecamatan").val() == "000" || $("#kode_desa").val() == "000") {
      app.dialog.alert(
        "Mohon Pilih Kecamatan dan Desa/Kelurahan Terlebih Dahulu"
      );
      return false;
    }
    if ($("#sandi").val().length < 8) {
      app.dialog.alert("Kata Sandi Minimal 8 Angka");
      return false;
    }
    if ($("#sandi").val() != $("#re_sandi").val()) {
      app.dialog.alert("Kata Sandi Tidak Sama");
      return false;
    }
    filecode = [];
    $("input[name^=filecode]").each(function () {
      filecode.push($(this).val());
    });
    if (!filecode[0]) {
      app.dialog.alert("Harap Lengkapi Dokumen");
      return false;
    }
    keteranganid = [];
    $("input[name^=keteranganid]").each(function () {
      keteranganid.push($(this).val());
    });
    app.input.validateInputs("#register_form");
    if ($$("#register_form")[0].checkValidity() == true) {
      let ajax_data = [];
      let form_data = app.form.convertToData("#register_form");
      ajax_data.push(form_data);
      ajax_data.push(filecode);
      ajax_data.push(keteranganid);
      app.request.post(
        site_url_mobile_layanan + "/user_support/register",
        ajax_data,
        function (callback) {
          if (callback.status) {
            app.dialog.alert(callback.status);
            mainView.router.back();
          } else {
            app.dialog.alert("Terjadi Kesalahan, Mohon Coba Lagi Nanti.");
          }
        },
        function () {
          app.dialog.alert("Terjadi Kesalahan, Mohon Coba Lagi Nanti.");
        },
        "json"
      );
    }
  });
}

function gen_tokenLoad() {
  app.request.post(
    site_url_mobile_layanan + "/user_support/get_token",
    { user_id: iamthedoor.user_id },
    function (response) {
      $$("#token").val(response.token);
    },
    function () {
      app.dialog.alert("Terjadi Kesalahan, Mohon Coba Lagi Nanti");
    },
    "json"
  );
  $$("#generate").on("click", function () {
    window.FirebasePlugin.onTokenRefresh(
      function (token) {
        app.request.post(
          site_url_mobile_layanan + "/user_support/insert_token",
          { token: token, user_id: iamthedoor.user_id },
          function (response) {
            let msg = response ? "Berhasil!" : "Gagal! Mohon Coba Lagi Nanti.";
            app.dialog.alert(msg);
            mainView.router.back();
          },
          "",
          "json"
        );
      },
      function (error) {
        app.dialog.alert("Gagal Mendapatkan Token: " + error);
      }
    );
  });
}

function notif_suratLoad() {
  app.request.post(
    site_url_mobile_layanan + "/user_support/get_notif",
    { user_id: iamthedoor.user_id },
    function (response) {
      if (response) {
        let content = "";
        response.forEach(function (val) {
          let color = val.status == 1 ? "bg-color-blue" : "bg-color-red";
          let status = val.status == 1 ? "Selesai" : "Ditolak";
          let message =
            val.status == 1
              ? "Selesai dan dapat Diambil di Kelurahan / Kecamatan Masing-masing"
              : "Ditolak dengan Alasan " + val.keterangan;
          content +=
            "<li>" +
            '<div class="card">' +
            '<div class="card-header align-items-flex-end ' +
            color +
            ' text-color-white">' +
            val.nama_layanan +
            "</div>" +
            '<div class="card-content card-content-padding">' +
            '<p class="date">' +
            status +
            " pada " +
            val.waktu +
            "</p>" +
            "<p>Permohonan Anda dengan Kode Transaksi " +
            val.kode_transaksi +
            " telah " +
            message +
            ".</p>" +
            "</div>" +
            "</div>" +
            "</li>";
        });
        $$("#notif_surat_list").html(content);
      } else {
        app.dialog.alert(
          "Data Notifikasi Anda Kosong / Surat Anda Belum Ada yang Selesai"
        );
      }
    },
    function () {
      app.dialog.alert("Terjadi Kesalahan, Mohon Coba Lagi Nanti");
    },
    "json"
  );
}

function komplainLoad() {
  app.dialog.preloader("Mohon Tunggu...");
  $$("#addformupload").on("touchend", addrow);
  app.request.post(
    site_url_mobile_layanan + "/komplain_pengguna/get_layanan_komplain",
    iamthedoor,
    function (result) {
      $$("#kode_komplain").val(result.kode_komplain);

      let options = "";
      for (var i = 0; i < result.layanan.length; i++) {
        options +=
          '<option value="' +
          result.layanan[i].kode +
          '" >' +
          result.layanan[i].nama +
          "</option>";
      }

      let transaksi = "";
      if (result.kode_transaksi.length > 0) {
        for (var i = 0; i < result.kode_transaksi.length; i++) {
          transaksi +=
            '<option value="' +
            result.kode_transaksi[i].id +
            '" >' +
            result.kode_transaksi[i].kode_transaksi +
            " - " +
            result[i].tgl_buat +
            "</option>";
        }
      } else {
        transaksi += '<option value="0" >Kosong</option>';
      }

      $$("#kode_transaksi").html(transaksi);
      $$("#layanan").html(options);
      $$("#nama").val(datauser.nama);
      app.dialog.close();
    },
    "json"
  );

  $$("#layanan").on("change", function () {
    get_kode_transaksi_komplain($$("#layanan").val());
  });

  $$("#simpan").on("click", function () {
    app.input.validateInputs("#komplain_pengguna_form");
    if ($$("#komplain_pengguna_form")[0].checkValidity() == true) {
      if ($$("#kode_transaksi").val() == 0) {
        app.dialog.alert(
          "Mohon Memilih Data Layanan yang akan Di-Komplain, Serta Lengkapi Form"
        );
        return false;
      }
      let ajax_data = [];
      let form_data = app.form.convertToData("#komplain_pengguna_form");
      keteranganid = [];
      filecode = [];
      $("input[name^=keteranganid]").each(function () {
        keteranganid.push($(this).val());
      });
      $("input[name^=filecode]").each(function () {
        filecode.push($(this).val());
      });
      ajax_data.push(iamthedoor);
      ajax_data.push(form_data);
      ajax_data.push(keteranganid);
      ajax_data.push(filecode);

      app.request.post(
        site_url_mobile_layanan + "/komplain_pengguna/create_komplain_pengguna",
        ajax_data,
        function (callback) {
          if (callback) {
            app.dialog.alert("Data Berhasil Diajukan");
            mainView.router.back();
            $("#datatables").DataTable().ajax.reload();
          } else {
            app.dialog.alert(callback.desc);
          }
        },
        function () {
          app.dialog.alert("Data Gagal Diajukan, Mohon Coba Lagi Nanti");
        },
        "json"
      );
    }
  });
}

function get_kode_transaksi_komplain(id_layanan) {
  app.dialog.preloader("Mohon Tunggu...");
  app.request.post(
    site_url_mobile_layanan +
      "/komplain_pengguna/get_kode_transaksi_komplain/" +
      id_layanan +
      "/" +
      datauser.bf_users_id,
    iamthedoor,
    function (result) {
      let options = "";
      if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
          options +=
            '<option value="' +
            result[i].id +
            '" >' +
            result[i].kode_transaksi +
            " - " +
            new Date(result[i].tgl_buat).toDateIndoFormat() +
            "</option>";
        }
      } else {
        options += '<option value="0" >Kosong</option>';
      }
      $$("#kode_transaksi").html(options);
      app.dialog.close();
    },
    "json"
  );
}

function listKomplainLoad() {
  $$("#btnnew").hide();
  if (datauser.role_id == "4") {
    $$("#btnnew").show();
  }

  var statusselect = app.smartSelect.create({
    el: ".statusselect",
    on: {
      close: function () {
        app.dialog.preloader("Mohon Tunggu...");
        datatables.context[0].ajax.url =
          site_url_mobile_layanan +
          "/komplain_pengguna/get_list_komplain/" +
          $$("#statusselect").val();
        $("#datatables")
          .DataTable()
          .ajax.reload(function (json) {
            if (json.data) {
              app.dialog.close();
            } else {
              app.dialog.close();
              app.dialog.alert("Data tidak dapat ditemukan");
            }
          });
      },
    },
  });
  app.dialog.preloader("Mohon Tunggu...");
  var datatables = $("#datatables").DataTable({
    serverSide: true,
    ajax: {
      url: site_url_mobile_layanan + "/komplain_pengguna/get_list_komplain/0",
      data: iamthedoor,
      type: "GET",
    },
    columns: [
      { data: "id" },
      { data: "kode_transaksi" },
      { data: "nama_pengguna" },
      { data: "tanggal_jam" },
      { data: "nama_layanan" },
      { data: "nama_operator" },
      { data: "status_komplain" },
    ],
    initComplete: function (settings, json) {
      app.dialog.close();
      $$("#datatables_length").hide();
      $$("#datatables_filter").hide();
    },
    rowCallback: function (row, data) {
      $("td:eq(0)", row).html(
        '<a href="/edit_komplain/' +
          data.id +
          '/" class="button button-small button-fill color-blue">' +
          '<i class="icon f7-icons" style="font-size: 12pt;">doc_text_fill</i> Detail</a>'
      );
      if (data.status_komplain) {
        if (data.status_komplain == 1) {
          data.status = "Dijawab";
          var color = "#FF9800";
        } else if (data.status_komplain == 0) {
          data.status = "Berjalan";
          var color = "#17A05E";
        } else {
          data.status = "Selesai";
          var color = "#808080";
        }
        $("td:eq(6)", row).html(
          '<span style="background-color:' +
            color +
            '; padding:5px; border-radius:10px; color:white;">' +
            data.status +
            "</span>"
        );
      }
    },
  });
}

function editKomplainLoad() {
  var id = mainView.router.currentRoute.params.id;
  $$("#addformupload").on("touchend", addrow);
  $$("#id_komplain").val(id);

  app.dialog.preloader("Mohon Tunggu...");
  app.request.post(
    site_url_mobile_layanan + "/komplain_pengguna/edit_komplain_load/" + id,
    iamthedoor,
    function (result) {
      tablename = "kt_komplain_pengguna_rinci";
      var content = "";
      for (var i = 0; i < result.komplain.length; i++) {
        if (result.komplain[i].status_komplain == 2) {
          $$("#save_button").hide();
          $$("#komplain_pengguna_form").hide();
        } else {
          $$("#save_button").show();
          $$("#komplain_pengguna_form").show();
        }

        if (result.komplain[i].jenis == 0) {
          var color = "bg-color-blue";
          var title = "Keluhan Pengguna";
        } else {
          var color = "bg-color-green";
          var title = "Jawaban";
        }

        if (i == 0) {
          $$("#kode_komplain").val(result.komplain[i].kode_komplain);
          $$("#nama").val(result.komplain[i].nama_pengguna);
          $$("#layanan").val(result.komplain[i].nama_layanan);
          $$("#kode_transaksi").val(result.komplain[i].kode_transaksi);
          $$("#deskripsi_komplain").val(result.komplain[i].isi_komplain);
          var attachments_html = "";
          for (var j = 0; j < result.lampiran[0].length; j++) {
            attachments_html +=
              '<li class="item-content">' +
              '<div class="item-inner">' +
              '<div class="item-title-row">' +
              '<div class="item-title">' +
              result.lampiran[0][j].file_name +
              "</div>" +
              "</div>" +
              '<div class="item-subtitle">Ket : ' +
              result.lampiran[0][j].desc +
              "</div>" +
              "</div>" +
              '<div class="item-media" style="padding-right: 20px;">' +
              '<a onclick="preview_files(' +
              result.lampiran[0][j].id +
              ')" class="button button-round button-fill color-orange" style="margin-top: 5px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>' +
              "</div>" +
              "</li>";
          }
          $$("#list_lampiran_komplain").append(attachments_html);
        } else {
          content +=
            '<div class="card">' +
            '<div class="card-header ' +
            color +
            ' text-color-white">' +
            title +
            "</div>" +
            '<div class="card-content card-content-padding">' +
            '<div class="list">' +
            "<ul>" +
            '<li class="item-content item-input">' +
            '<div class="item-inner">' +
            '<div class="item-input-wrap">' +
            '<div class="item-title item-label">Tanggal & Jam*</div>' +
            '<input type="text" id="tanggal_jam" name="tanggal_jam" value="' +
            result.komplain[i].tanggal_jam_komplain +
            '" required validate readonly>' +
            "</div>" +
            "</div>" +
            "</li>" +
            '<li class="item-content item-input">' +
            '<div class="item-inner">' +
            '<div class="item-input-wrap">' +
            '<div class="item-title item-label">Jawaban*</div>' +
            '<input type="text" id="jawaban" name="jawaban" value="' +
            result.komplain[i].isi_komplain +
            '" required validate readonly >' +
            "</div>" +
            "</div>" +
            "</li>" +
            "</ul>" +
            '<div class="card-footer bg-color-blue text-color-white">Lampiran</div>' +
            '<div id="card-content">' +
            '<div class="list media-list no-ios-edges">' +
            "<ul>";
          for (var j = 0; j < result.lampiran[i].length; j++) {
            content +=
              '<li class="item-content">' +
              '<div class="item-inner">' +
              '<div class="item-title-row">' +
              '<div class="item-title">' +
              result.lampiran[i][j].file_name +
              "</div>" +
              "</div>" +
              '<div class="item-subtitle">Ket : ' +
              result.lampiran[i][j].desc +
              "</div>" +
              "</div>" +
              '<div class="item-media" style="padding-right: 20px;">' +
              '<a onclick="preview_files(' +
              result.lampiran[i][j].id +
              ')" class="button button-round button-fill color-orange" style="margin-top: 5px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>' +
              "</div>" +
              "</li>";
          }
          content +=
            "</ul>" + "</div>" + "</div>" + "</div>" + "</div>" + "</div>";
        }
      }
      app.dialog.close();
      $$("#edit_komplain_page").html(content);

      tablename = "kt_komplain_pengguna_rinci";
    },
    "json"
  );

  $$("#simpan").on("click", function () {
    app.input.validateInputs("#komplain_pengguna_form");
    if ($$("#komplain_pengguna_form")[0].checkValidity() == true) {
      let ajax_data = [];
      let form_data = app.form.convertToData("#komplain_pengguna_form");
      keteranganid = [];
      filecode = [];
      $("input[name^=keteranganid]").each(function () {
        keteranganid.push($(this).val());
      });
      $("input[name^=filecode]").each(function () {
        filecode.push($(this).val());
      });
      ajax_data.push(iamthedoor);
      ajax_data.push(form_data);
      ajax_data.push(keteranganid);
      ajax_data.push(filecode);

      app.request.post(
        site_url_mobile_layanan + "/komplain_pengguna/edit_komplain_pengguna",
        ajax_data,
        function (callback) {
          if (callback) {
            app.dialog.alert("Data Berhasil Diajukan");
            mainView.router.back();
            $("#datatables").DataTable().ajax.reload();
          } else {
            app.dialog.alert(callback.desc);
          }
        },
        function () {
          app.dialog.alert("Data Gagal Diajukan, Mohon Coba Lagi Nanti");
        },
        "json"
      );
    }
  });
}
