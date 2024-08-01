var routes = [
  // Home page
  {
    path: '/home/',
    url: './pages/home.html',
    name: 'home',
    on: {
      pageInit: function () {
        homeLoad();
      }
    }
  },
  // Login page
  {
    path: '/login/',
    url: './pages/login.html',
    name: 'login',
    on: {
      pageInit: function () {
        $$('#lupa_password').attr('href', site_url_mobile + '/forgot_password');
      }
    }
  },
  {
    path: '/menu/',
    url: './pages/menu.html',
    name: 'menu',
    on: {
      pageInit: function () {
        menuLoad();
      }
    }
  },
  // About page
  {
    path: '/about/',
    url: './pages/about.html',
    name: 'about',
  },
  // Check Bill page
  {
    path: '/cek_tagihan/',
    url: './pages/cek_tagihan.html',
    name: 'cek_tagihan',
    on: {
      pageInit: function () {
        cek_tagihanLoad();
      }
    }
  },
  // Change Pass page
  {
    path: '/change_pass/',
    url: './pages/change_pass.html',
    name: 'change_pass',
    on: {
      pageInit: function () {
        change_passLoad();
      }
    }
  },
  // Move Domisili page
  {
    path: '/move_dom/',
    url: './pages/move_dom_list.html',
    name: 'move_dom',
    on: {
      pageInit: function () {
        move_domList();
      }
    }
  },
  {
    path: '/create_move_dom/',
    url: './pages/move_dom.html',
    name: 'move_dom',
    on: {
      pageInit: function () {
        move_domLoad();
      }
    }
  },
  {
    path: '/edit_move_dom/:id',
    url: './pages/move_dom_edit.html',
    name: 'move_dom',
    on: {
      pageInit: function () {
        let id = mainView.router.currentRoute.params.id;
        move_domEdit(id);
      }
    }
  },
  // Register User page
  {
    path: '/register/',
    url: './pages/register.html',
    name: 'register',
    on: {
      pageInit: function () {
        registerLoad();
      }
    }
  },
  // Token Notif page
  {
    path: '/gen_token/',
    url: './pages/gen_token.html',
    name: 'gen_token',
    on: {
      pageInit: function () {
        gen_tokenLoad();
      }
    }
  },
  // Notif Surat page
  {
    path: '/notif_surat/',
    url: './pages/notif_surat.html',
    name: 'notif_surat',
    on: {
      pageInit: function () {
        notif_suratLoad();
      }
    }
  },
  // Komplain page
  {
    path: '/komplain/',
    url: './pages/komplain/komplain.html',
    name: 'komplain',
    on: {
      pageInit: function () {
        komplainLoad();
      }
    }
  },
  // List komplain page
  {
    path: '/list_komplain/',
    url: './pages/komplain/list_komplain.html',
    name: 'list_komplain',
    on: {
      pageInit: function () {
        listKomplainLoad();
      }
    }
  },
  // Edit komplain page
  {
    path: '/edit_komplain/:id/',
    url: './pages/komplain/edit_komplain.html',
    name: 'edit_komplain',
    on: {
      pageInit: function () {
        editKomplainLoad();
      }
    }
  },
  // Pusat Informasi
  {
    path: '/pusat_informasi/',
    url: './pages/pusat_informasi.html',
    name: 'pusat_informasi',
    on: {
      pageInit: function () {
        pusat_informasi()
      }
    }
  },

  // Kurir
  list_kurir,
  new_kurir,
  edit_kurir,

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
  {
    path: '/tipe-a/sk_domisili_usaha/index/',
    url: './pages/tipe-a/index_domisili.html',
    name: 'domisili_usaha',
    on: {
      pageInit: function () {
      }
    }
  },
  sk_domisili_usaha,
  new_sk_domisili_usaha,
  edit_sk_domisili_usaha,

  sk_domisili_kurma,
  new_sk_domisili_kurma,
  new_sk_domisili_kurma_difabel,
  edit_sk_domisili_kurma_pertama,
  edit_sk_domisili_kurma,
  tracking_sk_domisili_kurma,
  sk_domisili_revisi_kurma,
  edit_sk_domisili_revisi_kurma,

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

  waarmeking,
  new_waarmeking,
  edit_waarmeking,

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
    path: '/tipe-d/bppd_pajak/index/',
    url: './pages/tipe-d/bppd_pajak/index.html',
    name: 'bppd_pajak',
    on: {
      pageInit: function () {
        $('.page-instansi a.link').on('click', function () {
          let record = { id_user: iamthedoor.user_id, id_instansi_layanan: $(this).data('id') };
          app.request.post(site_url_mobile_layanan + '/user_support/record_instansi_riwayat', record);
        });
      }
    }
  },
  cek_pbb,
  {
    path: '/tipe-d/disnaker/index/',
    url: './pages/tipe-d/disnaker/index.html',
    name: 'disnaker',
    on: {
      pageInit: function () {
        $('.page-instansi a.link').on('click', function () {
          let record = { id_user: iamthedoor.user_id, id_instansi_layanan: $(this).data('id') };
          app.request.post(site_url_mobile_layanan + '/user_support/record_instansi_riwayat', record);
        });
      }
    }
  },
  cek_lowongan,
  detail_lowongan,
  jenis_usaha,
  list_lowongan,
  new_lowongan,
  detail_lowongan_pekerjaan,
  {
    path: '/tipe-d/kejaksaan_negeri/index/',
    url: './pages/tipe-d/kejaksaan_negeri/index.html',
    name: 'kejaksaan_negeri',
    on: {
      pageInit: function () {
        var role_chat = [4, 47];
        var role_sibotas = [4, 38];
        if (!role_chat.includes(parseInt(iamthedoor.role_id))) {
          $$('.chat').remove();
        }
        if (!role_sibotas.includes(parseInt(iamthedoor.role_id))) {
          $$('.sibotas').remove();
        }
        if (iamthedoor.role_id == 4) {
          $$('#chat_as_staff').remove();
        } else if (iamthedoor.role_id == 47) {
          $$('#chat_as_user').remove();
        }

        $('.page-instansi a.link').on('click', function () {
          let record = { id_user: iamthedoor.user_id, id_instansi_layanan: $(this).data('id') };
          app.request.post(site_url_mobile_layanan + '/user_support/record_instansi_riwayat', record);
        });
      }
    }
  },
  {
    path: '/tipe-d/kejaksaan_negeri/chatting',
    url: './pages/tipe-d/kejaksaan_negeri/chatting.html',
    name: 'chatting',
    on: {
      pageInit: function (e, page) {
        if (iamthedoor.role_id == 4) {
          $$('div[id=chat_as_staff]').remove();
        } else if (iamthedoor.role_id == 47) {
          $$('div[id=chat_as_user]').remove();
        }
      }
    }
  },
  {
    path: '/tipe-d/kejaksaan_negeri/kontak_pidana',
    url: './pages/tipe-d/kejaksaan_negeri/kontak_pidana.html',
    name: 'kontak_pidana',
    on: {
      pageInit: function (e, page) {
        initContactPidana(e, page);
      }
    }
  },
  {
    path: '/tipe-d/kejaksaan_negeri/chat_pidana/:id/:category',
    url: './pages/tipe-d/kejaksaan_negeri/chat_pidana.html',
    name: 'chat_pidana',
    on: {
      pageInit: function (e, page) {
        initChat(e, page);
      }
    }
  },
  {
    path: '/tipe-d/kejaksaan_negeri/kontak_perdata',
    url: './pages/tipe-d/kejaksaan_negeri/kontak_perdata.html',
    name: 'kontak_perdata',
    on: {
      pageInit: function (e, page) {
        initContactPerdata(e, page);
      }
    }
  },
  {
    path: '/tipe-d/kejaksaan_negeri/chat_perdata/:id/:category',
    url: './pages/tipe-d/kejaksaan_negeri/chat_perdata.html',
    name: 'chat_pidana',
    on: {
      pageInit: function (e, page) {
        initChatPerdata(e, page);
      }
    }
  },
  {
    path: '/tipe-d/kejaksaan_negeri/kontak_pidana_staf',
    url: './pages/tipe-d/kejaksaan_negeri/kontak_pidana_staf.html',
    name: 'kontak_pidana_staf',
    on: {
      pageInit: function (e, page) {
        initContactPidanaStaff(e, page);
      }
    }
  },
  {
    path: '/tipe-d/kejaksaan_negeri/chat_pidana_staf/:id/:category',
    url: './pages/tipe-d/kejaksaan_negeri/chat_pidana_staf.html',
    name: 'chat_pidana_staf',
    on: {
      pageInit: function (e, page) {
        initChatStaff(e, page);
      }
    }
  },
  {
    path: '/tipe-d/kejaksaan_negeri/kontak_perdata_staf',
    url: './pages/tipe-d/kejaksaan_negeri/kontak_perdata_staf.html',
    name: 'kontak_perdata_staf',
    on: {
      pageInit: function (e, page) {
        initContactPerdataStaff(e, page);
      }
    }
  },
  {
    path: '/tipe-d/kejaksaan_negeri/chat_perdata_staf/:id/:category',
    url: './pages/tipe-d/kejaksaan_negeri/chat_perdata_staf.html',
    name: 'chat_perdata_staf',
    on: {
      pageInit: function (e, page) {
        initChatStaffPerdata(e, page);
      }
    }
  },
  {
    path: '/tipe-d/kejaksaan_negeri/sibojo_sipatas/',
    url: './pages/tipe-d/kejaksaan_negeri/sibojo_sipatas.html',
    name: 'sibojo_sipatas',
  },
  {
    path: '/tipe-d/atr_bpn/index/',
    url: './pages/tipe-d/atr_bpn/index.html',
    name: 'atr_bpn',
    on: {
      pageInit: function () {
        $('.page-instansi a.link').on('click', function () {
          let record = { id_user: iamthedoor.user_id, id_instansi_layanan: $(this).data('id') };
          app.request.post(site_url_mobile_layanan + '/user_support/record_instansi_riwayat', record);
        });
      }
    }
  },
  {
    path: '/tipe-d/bpbd/index/',
    url: './pages/tipe-d/bpbd/index.html',
    name: 'bpbd',
    on: {
      pageInit: function () {
        $('.page-instansi a.link').on('click', function () {
          let record = { id_user: iamthedoor.user_id, id_instansi_layanan: $(this).data('id') };
          app.request.post(site_url_mobile_layanan + '/user_support/record_instansi_riwayat', record);
        });
      }
    }
  },
  {
    path: '/tipe-d/bank_jatim/index/',
    url: './pages/tipe-d/bank_jatim/index.html',
    name: 'bank_jatim',
    on: {
      pageInit: function () {
        $('.page-instansi a.link').on('click', function () {
          let record = { id_user: iamthedoor.user_id, id_instansi_layanan: $(this).data('id') };
          app.request.post(site_url_mobile_layanan + '/user_support/record_instansi_riwayat', record);
        });
      }
    }
  },
  {
    path: '/tipe-d/bpjs_ketenagakerjaan/index/',
    url: './pages/tipe-d/bpjs_ketenagakerjaan/index.html',
    name: 'bpjs_ketenagakerjaan',
    on: {
      pageInit: function () {
        $('.page-instansi a.link').on('click', function () {
          let record = { id_user: iamthedoor.user_id, id_instansi_layanan: $(this).data('id') };
          app.request.post(site_url_mobile_layanan + '/user_support/record_instansi_riwayat', record);
        });
      }
    }
  },
  {
    path: '/tipe-d/disperindag/index/',
    url: './pages/tipe-d/disperindag/index.html',
    name: 'disperindag',
    on: {
      pageInit: function () {
        $('.page-instansi a.link').on('click', function () {
          let record = { id_user: iamthedoor.user_id, id_instansi_layanan: $(this).data('id') };
          app.request.post(site_url_mobile_layanan + '/user_support/record_instansi_riwayat', record);
        });
      }
    }
  },
  {
    path: '/tipe-d/dpmptsp/index/',
    url: './pages/tipe-d/dpmptsp/index.html',
    name: 'dpmptsp',
    on: {
      pageInit: function () {
        $('.page-instansi a.link').on('click', function () {
          let record = { id_user: iamthedoor.user_id, id_instansi_layanan: $(this).data('id') };
          app.request.post(site_url_mobile_layanan + '/user_support/record_instansi_riwayat', record);
        });
      }
    }
  },
  {
    path: '/tipe-d/kantor_imigrasi/index/',
    url: './pages/tipe-d/kantor_imigrasi/index.html',
    name: 'kantor_imigrasi',
    on: {
      pageInit: function () {
        $('.page-instansi a.link').on('click', function () {
          let record = { id_user: iamthedoor.user_id, id_instansi_layanan: $(this).data('id') };
          app.request.post(site_url_mobile_layanan + '/user_support/record_instansi_riwayat', record);
        });
      }
    }
  },
  {
    path: '/tipe-d/lhk/index/',
    url: './pages/tipe-d/lhk/index.html',
    name: 'lhk',
    on: {
      pageInit: function () {
        $('.page-instansi a.link').on('click', function () {
          let record = { id_user: iamthedoor.user_id, id_instansi_layanan: $(this).data('id') };
          app.request.post(site_url_mobile_layanan + '/user_support/record_instansi_riwayat', record);
        });
      }
    }
  },
  {
    path: '/tipe-d/pln/index/',
    url: './pages/tipe-d/pln/index.html',
    name: 'pln',
    on: {
      pageInit: function () {
        $('.page-instansi a.link').on('click', function () {
          let record = { id_user: iamthedoor.user_id, id_instansi_layanan: $(this).data('id') };
          app.request.post(site_url_mobile_layanan + '/user_support/record_instansi_riwayat', record);
        });
      }
    }
  },
  {
    path: '/tipe-d/polresta_sidoarjo/index/',
    url: './pages/tipe-d/polresta_sidoarjo/index.html',
    name: 'polresta_sidoarjo',
    on: {
      pageInit: function () {
        $('.page-instansi a.link').on('click', function () {
          let record = { id_user: iamthedoor.user_id, id_instansi_layanan: $(this).data('id') };
          app.request.post(site_url_mobile_layanan + '/user_support/record_instansi_riwayat', record);
        });
      }
    }
  },
  laporan_kehilangan,
  laporan_kehilangan_new,
  laporan_kehilangan_edit,
  {
    path: '/tipe-d/rsud_sidoarjo/index/',
    url: './pages/tipe-d/rsud_sidoarjo/index.html',
    name: 'rsud_sidoarjo',
    on: {
      pageInit: function () {
        $('.page-instansi a.link').on('click', function () {
          let record = { id_user: iamthedoor.user_id, id_instansi_layanan: $(this).data('id') };
          app.request.post(site_url_mobile_layanan + '/user_support/record_instansi_riwayat', record);
        });
      }
    }
  },
  ketersediaan_kamar,
  antrian_klinik_spesialis,
  antrian_klinik_eksekutif,
  antrian_ambil,
  antrian_nomor,
  // SIBOJO
  pendaftaran_sibojo,
  new_pendaftaran_sibojo,
  edit_pendaftaran_sibojo,
  // SIPATAS
  pendaftaran_sipatas,
  new_pendaftaran_sipatas,
  edit_pendaftaran_sipatas,
  {
    path: '/tipe-d/samsat/index/',
    url: './pages/tipe-d/samsat/index.html',
    name: 'samsat',
    on: {
      pageInit: function () {
        $('.page-instansi a.link').on('click', function () {
          let record = { id_user: iamthedoor.user_id, id_instansi_layanan: $(this).data('id') };
          app.request.post(site_url_mobile_layanan + '/user_support/record_instansi_riwayat', record);
        });
      }
    }
  },
  {
    path: '/tipe-d/telkom/index/',
    url: './pages/tipe-d/telkom/index.html',
    name: 'telkom',
    on: {
      pageInit: function () {
        $('.page-instansi a.link').on('click', function () {
          let record = { id_user: iamthedoor.user_id, id_instansi_layanan: $(this).data('id') };
          app.request.post(site_url_mobile_layanan + '/user_support/record_instansi_riwayat', record);
        });
      }
    }
  },
  {
    path: '/tipe-d/dinsos/index/',
    url: './pages/tipe-d/dinsos/index.html',
    name: 'dinsos',
    on: {
      pageInit: function () {
        if (iamthedoor.role_id != '4' && iamthedoor.role_id != '24') {
          $$('.row').remove();
        }

        $('.page-instansi a.link').on('click', function () {
          let record = { id_user: iamthedoor.user_id, id_instansi_layanan: $(this).data('id') };
          app.request.post(site_url_mobile_layanan + '/user_support/record_instansi_riwayat', record);
        });
      }
    }
  },
  {
    path: '/tipe-d/pdam/index/',
    url: './pages/tipe-d/pdam/index.html',
    name: 'pdam',
    on: {
      pageInit: function () {
        if (iamthedoor.role_id != '4' && iamthedoor.role_id != '24') {
          $$('.row').remove();
        }

        $('.page-instansi a.link').on('click', function () {
          let record = { id_user: iamthedoor.user_id, id_instansi_layanan: $(this).data('id') };
          app.request.post(site_url_mobile_layanan + '/user_support/record_instansi_riwayat', record);
        });
      }
    }
  },
  tagihan_pdam,
  daftar_pasang_baru_pdam,
  new_daftar_pasang_baru_pdam,
  {
    path: '/tipe-d/dinas_koperasi/index/',
    url: './pages/tipe-d/dinas_koperasi/index.html',
    name: 'dinas_koperasi',
    on: {
      pageInit: function () {
        if (iamthedoor.role_id != '4' && iamthedoor.role_id != '1') {
          $$('.row').remove();
        }

        $('.page-instansi a.link').on('click', function () {
          let record = { id_user: iamthedoor.user_id, id_instansi_layanan: $(this).data('id') };
          app.request.post(site_url_mobile_layanan + '/user_support/record_instansi_riwayat', record);
        });
      }
    }
  },
  umkm,
  umkm_new,
  umkm_edit,
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
    path: '/tipe-d/pengadilan_agama/index/',
    url: './pages/tipe-d/pengadilan_agama/index.html',
    name: 'pengadilan_agama',
    on: {
      pageInit: function () {
        if (iamthedoor.role_id != '4' && iamthedoor.role_id != '24') {
          $$('.row').remove();
        }

        $('.page-instansi a.link').on('click', function () {
          let record = { id_user: iamthedoor.user_id, id_instansi_layanan: $(this).data('id') };
          app.request.post(site_url_mobile_layanan + '/user_support/record_instansi_riwayat', record);
        });
      }
    }
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
  laporan_polisi,
  laporan_polisi_new,
  laporan_polisi_edit,
  {
    path: '/tipe-d/bpr_delta_artha/index/',
    url: './pages/tipe-d/bpr_delta_artha/index.html',
    name: 'bpr_delta_artha',
    on: {
      pageInit: function () {
        $('.page-instansi a.link').on('click', function () {
          let record = { id_user: iamthedoor.user_id, id_instansi_layanan: $(this).data('id') };
          app.request.post(site_url_mobile_layanan + '/user_support/record_instansi_riwayat', record);
        });
      }
    }
  },
  pembukaan_rekening_tabungan,
  new_pembukaan_rekening_tabungan,
  edit_pembukaan_rekening_tabungan,

  pembukaan_deposito_bpr,
  pembukaan_deposito_bpr_new,
  pembukaan_deposito_bpr_edit,
  pembukaan_kredit_bpr,
  pembukaan_kredit_bpr_new,
  pembukaan_kredit_bpr_edit,

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
  detail_transaksi_saldo,

  // TIPE F
  seller_marketplace,
  shop,
  new_produk_marketplace,
  new_produk_marketplace_food,
  edit_produk_marketplace,
  edit_produk_marketplace_food,
  all_produk,
  menu,
  list_menu,
  penilaian,
  komplain,
  komplain_penjual,
  komplain_edit,
  pengembalian,
  tb_pengembalian,
  list_all,
  kategori_produk,
  keranjang,
  checkout,
  product_by_id,
  edit_produk_keranjang,
  detail_toko,
  produkPerkategori,
  product_toko,
  all_product_toko,
  list_alamat,
  new_alamat,
  edit_alamat,
  maps_checkout,
  tracking_pesanan,
  packing,
  orderan,
  edit_orderan,
  history_toko,
  pembatalan,
  detail_product,
  tracking,
  claim_penjual,
  serah_terima,

  list_all_jasa,
  kategori_jasa,
  jasa_by_id,
  keranjang_jasa,
  checkout_jasa,
  maps_checkout_jasa,
  menu_jasa,
  list_menu_jasa,
  packing_jasa,
  informasi,
  orderan_jasa,
  edit_orderan_jasa,
  komplain_jasa,
  komplain_penjual_jasa,
  komplain_edit_jasa,
  penilaian_jasa,
  tracking_pesanan_jasa,
  informasi_pengiriman_jasa,
  pembatalan_jasa,
  history_toko_jasa,
  claim_penjual_jasa,

  list_all_food,
  kategori_food,
  keranjang_food,
  checkout_food,
  menu_food,
  list_menu_food,
  penilaian_food,
  komplain_food,
  pengembalian_food,
  maps_checkout_food,
  tracking_pesanan_food,
  food_by_id,
  edit_food_keranjang,
  komplain_penjual_food,
  komplain_edit_food,
  // detail_toko_food,
  // produkPerkategori_food,
  // product_toko_food,
  // all_product_toko,
  tb_pengembalian_food,
  packing_food,
  orderan_food,
  edit_orderan_food,
  history_toko_food,
  pembatalan_food,
  detail_food,
  tracking_food,
  claim_penjual_food,
  serah_terima_food,

  // Aplikasi Dashboard Admin
  login_admin,
  dashboard_home,
  dinamika_penduduk,
  sub_menu_penyebaran_penduduk,
  survey_penduduk,
  jaminan_kesehatan,
  pelayanan_eksternal,
  data_pendaftar,
  kelahiran,
  kematian,
  penyebaran_penduduk,
  pindah,
  segmen_view,
  alokasi_view,
  alokasi_detail,
  alokasi_detail_list,
  usulan_penambahan,
  rekonsiliasi,
  pelayanan_sktm,
  kejaksaan_negeri_pop_up,
  external_sibojo,
  external_sipatas,
  dinsos_pop_up,
  external_kis,
  external_stp,
  external_rpa,
  disnaker_pop_up,
  external_kpk,
  external_jobseeker,
  polresta_pop_up,
  external_skck,
  external_ijin_keramaian,
  external_laporan_kehilangan,
  bpr_pop_up,
  external_tabungan,
  external_deposito,
  external_kredit,
  external_pasang_baru,

  // Aplikasi Segmen
  home_segmen,
  login_segmen,
  bpjs_segmen,
  segmen_alokasi,
  segmen_alokasi_detail,
  segmen_alokasi_detail_list,

  // Survey
  survey,

  //Pelayanan Eksternal
  eksternal_kejaksaan_negeri,
  eksternal_kejaksaan_chat,
  eksternal_kejaksaan_sibotas
];