var routes = [
  // Home page
  {
    path: "/home/",
    url: "./pages/home.html",
    name: "home",
    on: {
      pageInit: function () {
        homeLoad();
      },
    },
  },
  // Login page
  {
    path: "/login/",
    url: "./pages/login.html",
    name: "login",
    on: {
      pageInit: function () {
        $$("#daftar").attr("href", site_url_mobile + "/data_pendaftar");
        $$("#lupa_password").attr("href", site_url_mobile + "/forgot_password");
      },
    },
  },
  // About page
  {
    path: "/about/",
    url: "./pages/about.html",
    name: "about",
  },
  // Change Pass page
  {
    path: "/change_pass/",
    url: "./pages/change_pass.html",
    name: "change_pass",
    on: {
      pageInit: function () {
        change_passLoad();
      },
    },
  },
  // Move Domisili page
  {
    path: "/move_dom/",
    url: "./pages/move_dom.html",
    name: "move_dom",
    on: {
      pageInit: function () {
        move_domLoad();
      },
    },
  },
  // Register User page
  {
    path: "/register/",
    url: "./pages/register.html",
    name: "register",
    on: {
      pageInit: function () {
        registerLoad();
      },
    },
  },
  // Token Notif page
  {
    path: "/gen_token/",
    url: "./pages/gen_token.html",
    name: "gen_token",
    on: {
      pageInit: function () {
        gen_tokenLoad();
      },
    },
  },
  // Notif Surat page
  {
    path: "/notif_surat/",
    url: "./pages/notif_surat.html",
    name: "notif_surat",
    on: {
      pageInit: function () {
        notif_suratLoad();
      },
    },
  },
  // Komplain page
  {
    path: "/komplain/",
    url: "./pages/komplain/komplain.html",
    name: "komplain",
    on: {
      pageInit: function () {
        komplainLoad();
      },
    },
  },
  // List komplain page
  {
    path: "/list_komplain/",
    url: "./pages/komplain/list_komplain.html",
    name: "list_komplain",
    on: {
      pageInit: function () {
        listKomplainLoad();
      },
    },
  },
  // Edit komplain page
  {
    path: "/edit_komplain/:id/",
    url: "./pages/komplain/edit_komplain.html",
    name: "edit_komplain",
    on: {
      pageInit: function () {
        editKomplainLoad();
      },
    },
  },

  // Scanner package
  scanner_view,
  tracking_view,

  // TIPE A
  surat_kelahiran,
  new_suratkelahiran,
  edit_suratkelahiran,

  surat_kematian,
  new_suratkematian,
  edit_suratkematian,

  sk_tidak_mampu,
  new_sk_tidak_mampu,
  edit_sk_tidak_mampu,

  sk_biodata_penduduk,
  new_sk_biodata_penduduk,
  edit_sk_biodata_penduduk,

  sk_umum_desa,
  new_sk_umum_desa,
  edit_sk_umum_desa,

  sk_domisili_usaha,
  new_sk_domisili_usaha,
  edit_sk_domisili_usaha,

  sk_domisili_luar,
  edit_sk_domisili_luar,

  surat_pengantar_kua,
  new_surat_pengantar_kua,
  edit_surat_pengantar_kua,

  surat_pengantar_kua_luar,
  edit_surat_pengantar_kua_luar,

  // TIPE B
  sk_pindah,
  new_sk_pindah,
  edit_sk_pindah,

  permohonan_ktp,
  new_permohonan_ktp,
  edit_permohonan_ktp,

  kartu_keluarga,
  new_kartu_keluarga,
  edit_kartu_keluarga,

  sk_umum_kecamatan,
  new_sk_umum_kecamatan,
  edit_sk_umum_kecamatan,

  sktm_kecamatan,
  perpanjangan_sktm_kecamatan,
  new_sktm_kecamatan,
  edit_sktm_kecamatan,

  sktm_dinsos,
  edit_sktm_dinsos,

  waris,
  new_waris,
  edit_waris,

  //TIPE C
  kartupencarikerja,
  kartupencarikerja_new,
  kartupencarikerja_edit,

  siup,
  siup_new,
  siup_edit,
  siup_sub,

  ijin_mendirikan_bangunan,
  // ijin_mendirikan_bangunan_new,
  ijin_mendirikan_bangunan_edit,

  tanda_daftar_perusahaan,
  // tanda_daftar_perusahaan_new,
  tanda_daftar_perusahaan_edit,

  ijin_mendirikan_bangunan_luar,
  ijin_mendirikan_bangunan_luar_edit,

  //TIPE C
  kartupencarikerja_new,
  kartupencarikerja_edit,

  siup,
  siup_new,
  siup_edit,
  siup_sub,

  ijin_mendirikan_bangunan,
  // ijin_mendirikan_bangunan_new,
  ijin_mendirikan_bangunan_edit,

  tanda_daftar_perusahaan,
  // tanda_daftar_perusahaan_new,
  tanda_daftar_perusahaan_edit,

  // TIPE D
  {
    path: "/tipe-d/bppd_pajak/index/",
    url: "./pages/tipe-d/bppd_pajak/index.html",
    name: "bppd_pajak",
    on: {
      pageInit: function () {
        $(".page-instansi a.link").on("click", function () {
          let record = {
            id_user: iamthedoor.user_id,
            id_instansi_layanan: $(this).data("id"),
          };
          app.request.post(site_url_mobile_layanan + "/user_support/record_instansi_riwayat", record);
        });
      },
    },
  },
  cek_pbb,
  {
    path: "/tipe-d/disnaker/index/",
    url: "./pages/tipe-d/disnaker/index.html",
    name: "disnaker",
    on: {
      pageInit: function () {
        $(".page-instansi a.link").on("click", function () {
          let record = {
            id_user: iamthedoor.user_id,
            id_instansi_layanan: $(this).data("id"),
          };
          app.request.post(site_url_mobile_layanan + "/user_support/record_instansi_riwayat", record);
        });
      },
    },
  },
  cek_lowongan,
  detail_lowongan,
  {
    path: "/tipe-d/kejaksaan_negeri/index/",
    url: "./pages/tipe-d/kejaksaan_negeri/index.html",
    name: "kejaksaan_negeri",
    on: {
      pageInit: function () {
        if (iamthedoor.role_id == "4") {
          $$("#chat_as_staff").remove();
        } else {
          $$("#chat_as_user").remove();
        }

        $(".page-instansi a.link").on("click", function () {
          let record = {
            id_user: iamthedoor.user_id,
            id_instansi_layanan: $(this).data("id"),
          };
          app.request.post(site_url_mobile_layanan + "/user_support/record_instansi_riwayat", record);
        });
      },
    },
  },
  {
    path: "/tipe-d/kejaksaan_negeri/kontak",
    url: "./pages/tipe-d/kejaksaan_negeri/kontak.html",
    name: "kontak",
    on: {
      pageInit: function (e, page) {
        initContact(e, page);
      },
    },
  },
  {
    path: "/tipe-d/kejaksaan_negeri/chat/:id",
    url: "./pages/tipe-d/kejaksaan_negeri/chat.html",
    name: "chat",
    on: {
      pageInit: function (e, page) {
        initChat(e, page);
      },
    },
  },
  {
    path: "/tipe-d/kejaksaan_negeri/kontak-staf",
    url: "./pages/tipe-d/kejaksaan_negeri/kontak_staf.html",
    name: "kontak_staf",
    on: {
      pageInit: function (e, page) {
        initContactStaff(e, page);
      },
    },
  },
  {
    path: "/tipe-d/kejaksaan_negeri/chat-staff/:id",
    url: "./pages/tipe-d/kejaksaan_negeri/chat_staf.html",
    name: "chat_staf",
    on: {
      pageInit: function (e, page) {
        initChatStaff(e, page);
      },
    },
  },
  {
    path: "/tipe-d/kejaksaan_negeri/sibojo_sipatas/",
    url: "./pages/tipe-d/kejaksaan_negeri/sibojo_sipatas.html",
    name: "sibojo_sipatas",
  },
  {
    path: "/tipe-d/atr_bpn/index/",
    url: "./pages/tipe-d/atr_bpn/index.html",
    name: "atr_bpn",
    on: {
      pageInit: function () {
        $(".page-instansi a.link").on("click", function () {
          let record = {
            id_user: iamthedoor.user_id,
            id_instansi_layanan: $(this).data("id"),
          };
          app.request.post(site_url_mobile_layanan + "/user_support/record_instansi_riwayat", record);
        });
      },
    },
  },
  {
    path: "/tipe-d/bpbd/index/",
    url: "./pages/tipe-d/bpbd/index.html",
    name: "bpbd",
    on: {
      pageInit: function () {
        $(".page-instansi a.link").on("click", function () {
          let record = {
            id_user: iamthedoor.user_id,
            id_instansi_layanan: $(this).data("id"),
          };
          app.request.post(site_url_mobile_layanan + "/user_support/record_instansi_riwayat", record);
        });
      },
    },
  },
  {
    path: "/tipe-d/bank_jatim/index/",
    url: "./pages/tipe-d/bank_jatim/index.html",
    name: "bank_jatim",
    on: {
      pageInit: function () {
        $(".page-instansi a.link").on("click", function () {
          let record = {
            id_user: iamthedoor.user_id,
            id_instansi_layanan: $(this).data("id"),
          };
          app.request.post(site_url_mobile_layanan + "/user_support/record_instansi_riwayat", record);
        });
      },
    },
  },
  {
    path: "/tipe-d/bpjs_ketenagakerjaan/index/",
    url: "./pages/tipe-d/bpjs_ketenagakerjaan/index.html",
    name: "bpjs_ketenagakerjaan",
    on: {
      pageInit: function () {
        $(".page-instansi a.link").on("click", function () {
          let record = {
            id_user: iamthedoor.user_id,
            id_instansi_layanan: $(this).data("id"),
          };
          app.request.post(site_url_mobile_layanan + "/user_support/record_instansi_riwayat", record);
        });
      },
    },
  },
  {
    path: "/tipe-d/disperindag/index/",
    url: "./pages/tipe-d/disperindag/index.html",
    name: "disperindag",
    on: {
      pageInit: function () {
        $(".page-instansi a.link").on("click", function () {
          let record = {
            id_user: iamthedoor.user_id,
            id_instansi_layanan: $(this).data("id"),
          };
          app.request.post(site_url_mobile_layanan + "/user_support/record_instansi_riwayat", record);
        });
      },
    },
  },
  {
    path: "/tipe-d/dpmptsp/index/",
    url: "./pages/tipe-d/dpmptsp/index.html",
    name: "dpmptsp",
    on: {
      pageInit: function () {
        $(".page-instansi a.link").on("click", function () {
          let record = {
            id_user: iamthedoor.user_id,
            id_instansi_layanan: $(this).data("id"),
          };
          app.request.post(site_url_mobile_layanan + "/user_support/record_instansi_riwayat", record);
        });
      },
    },
  },
  {
    path: "/tipe-d/kantor_imigrasi/index/",
    url: "./pages/tipe-d/kantor_imigrasi/index.html",
    name: "kantor_imigrasi",
    on: {
      pageInit: function () {
        $(".page-instansi a.link").on("click", function () {
          let record = {
            id_user: iamthedoor.user_id,
            id_instansi_layanan: $(this).data("id"),
          };
          app.request.post(site_url_mobile_layanan + "/user_support/record_instansi_riwayat", record);
        });
      },
    },
  },
  {
    path: "/tipe-d/lhk/index/",
    url: "./pages/tipe-d/lhk/index.html",
    name: "lhk",
    on: {
      pageInit: function () {
        $(".page-instansi a.link").on("click", function () {
          let record = {
            id_user: iamthedoor.user_id,
            id_instansi_layanan: $(this).data("id"),
          };
          app.request.post(site_url_mobile_layanan + "/user_support/record_instansi_riwayat", record);
        });
      },
    },
  },
  {
    path: "/tipe-d/pln/index/",
    url: "./pages/tipe-d/pln/index.html",
    name: "pln",
    on: {
      pageInit: function () {
        $(".page-instansi a.link").on("click", function () {
          let record = {
            id_user: iamthedoor.user_id,
            id_instansi_layanan: $(this).data("id"),
          };
          app.request.post(site_url_mobile_layanan + "/user_support/record_instansi_riwayat", record);
        });
      },
    },
  },
  {
    path: "/tipe-d/polresta_sidoarjo/index/",
    url: "./pages/tipe-d/polresta_sidoarjo/index.html",
    name: "polresta_sidoarjo",
    on: {
      pageInit: function () {
        $(".page-instansi a.link").on("click", function () {
          let record = {
            id_user: iamthedoor.user_id,
            id_instansi_layanan: $(this).data("id"),
          };
          app.request.post(site_url_mobile_layanan + "/user_support/record_instansi_riwayat", record);
        });
      },
    },
  },
  laporan_kehilangan,
  {
    path: "/tipe-d/rsud_sidoarjo/index/",
    url: "./pages/tipe-d/rsud_sidoarjo/index.html",
    name: "rsud_sidoarjo",
    on: {
      pageInit: function () {
        $(".page-instansi a.link").on("click", function () {
          let record = {
            id_user: iamthedoor.user_id,
            id_instansi_layanan: $(this).data("id"),
          };
          app.request.post(site_url_mobile_layanan + "/user_support/record_instansi_riwayat", record);
        });
      },
    },
  },
  ketersediaan_kamar,
  antrian_klinik_spesialis,
  antrian_klinik_eksekutif,
  antrian_ambil,
  antrian_nomor,
  {
    path: "/tipe-d/samsat/index/",
    url: "./pages/tipe-d/samsat/index.html",
    name: "samsat",
    on: {
      pageInit: function () {
        $(".page-instansi a.link").on("click", function () {
          let record = {
            id_user: iamthedoor.user_id,
            id_instansi_layanan: $(this).data("id"),
          };
          app.request.post(site_url_mobile_layanan + "/user_support/record_instansi_riwayat", record);
        });
      },
    },
  },
  {
    path: "/tipe-d/telkom/index/",
    url: "./pages/tipe-d/telkom/index.html",
    name: "telkom",
    on: {
      pageInit: function () {
        $(".page-instansi a.link").on("click", function () {
          let record = {
            id_user: iamthedoor.user_id,
            id_instansi_layanan: $(this).data("id"),
          };
          app.request.post(site_url_mobile_layanan + "/user_support/record_instansi_riwayat", record);
        });
      },
    },
  },
  {
    path: "/tipe-d/dinsos/index/",
    url: "./pages/tipe-d/dinsos/index.html",
    name: "dinsos",
    on: {
      pageInit: function () {
        if (iamthedoor.role_id != "4" && iamthedoor.role_id != "24") {
          $$(".row").remove();
        }

        $(".page-instansi a.link").on("click", function () {
          let record = {
            id_user: iamthedoor.user_id,
            id_instansi_layanan: $(this).data("id"),
          };
          app.request.post(site_url_mobile_layanan + "/user_support/record_instansi_riwayat", record);
        });
      },
    },
  },
  {
    path: "/tipe-d/pdam/index/",
    url: "./pages/tipe-d/pdam/index.html",
    name: "pdam",
    on: {
      pageInit: function () {
        if (iamthedoor.role_id != "4" && iamthedoor.role_id != "24") {
          $$(".row").remove();
        }

        $(".page-instansi a.link").on("click", function () {
          let record = {
            id_user: iamthedoor.user_id,
            id_instansi_layanan: $(this).data("id"),
          };
          app.request.post(site_url_mobile_layanan + "/user_support/record_instansi_riwayat", record);
        });
      },
    },
  },
  tagihan_pdam,
  pengunduran_jkn_kis,
  new_pengunduran_jkn_kis,
  edit_pengunduran_jkn_kis,
  penerbitan_stp,
  new_penerbitan_stp,
  edit_penerbitan_stp,
  pengangkatan_anak,
  new_pengangkatan_anak,
  edit_pengangkatan_anak,
  {
    path: "/tipe-d/pengadilan_agama/index/",
    url: "./pages/tipe-d/pengadilan_agama/index.html",
    name: "pengadilan_agama",
    on: {
      pageInit: function () {
        if (iamthedoor.role_id != "4" && iamthedoor.role_id != "24") {
          $$(".row").remove();
        }

        $(".page-instansi a.link").on("click", function () {
          let record = {
            id_user: iamthedoor.user_id,
            id_instansi_layanan: $(this).data("id"),
          };
          app.request.post(site_url_mobile_layanan + "/user_support/record_instansi_riwayat", record);
        });
      },
    },
  },
  perceraian,
  new_perceraian,
  edit_perceraian,
  skck,
  new_skck,
  new_skck_data_keluarga,
  new_skck_data_pidana,
  ijin_keramaian,
  new_ijin_keramaian,
  edit_ijin_keramaian,

  // Layanan Tipe E
  pulsa,
  paket_data,
  pulsa_transfer,
  paket_telepon_sms,
  token_listrik,
  listrik_pascabayar,
  listrik_nontaglis,
  telkom,
  pdam,
  bpjs,
  seluler_pascabayar,
  e_wallet,
  e_wallet_dana,
  e_wallet_grab_driver,
  e_wallet_gopay,
  e_wallet_gojek_driver,
  e_wallet_shopee_pay,
  e_wallet_ovo,
  e_wallet_link_aja,
  e_wallet_m_cash,
  e_wallet_qiwi_card,
  e_wallet_my_card,
  e_wallet_mtix,
  e_wallet_tixid,
  e_wallet_e_tol,
  e_wallet_cherry_credit,

  saldo_sipraja,
  form_isi_saldo,
  bayar_isi_saldo,

  // TIPE F
  seller_marketplace,
  shop,
  new_produk_marketplace,
  edit_produk_marketplace,
  all_produk,
  list_all,
  kategori_produk,
  keranjang,
  product_by_id,
  edit_produk_keranjang,
  detail_toko,
  produkPerkategori,
  product_toko
];
