tablename = "sk_tidak_mampu";

function send_dtks() {
  const encodedNik = btoa($("input[name='nik_pemohon']").val()).replace(
    /=/g,
    ""
  );
  app.request.post(
    site_url_mobile_layanan + "/sktm_kecamatan/cek_dtks/" + encodedNik,
    iamthedoor,
    function (response) {
      if (response.jumlah == 0) {
        app.dialog.confirm(
          "Data NIK Anda Tidak Terdaftar di DTKS! Apakah Anda Yakin untuk Melanjutkan?",
          function () {
            $("#tipe_dtks").val(0);
          },
          function () {
            mainView.router.back();
            $("#datatables").DataTable().ajax.reload();
          }
        );
      }
    },
    "json"
  );
}

var new_sktm_kecamatan = {
  path: "/tipe-b/new_sktm_kecamatan/",
  url: "./pages/tipe-b/new_sktm_kecamatan.html",
  name: "new_sktm_kecamatan",
  on: {
    pageInit: function () {
      // State Pertama
      $(".sekolahgroup").show();
      $(".jkmm_skmm_group").hide();
      $(".jkmm_group").hide();
      $(".skmm_group").hide();
      $(".default_upload").show();

      get_faskes("#id_faskes");

      app.request.post(
        site_url_mobile_layanan + "/sktm_kecamatan/get_berkas",
        iamthedoor,
        function (result) {
          $("#jenis_surat").on("change", function () {
            if ($(this).val() == "sekolah") {
              $("#tipe_dtks").val(1);
              $(".sekolahgroup").show();
              $(".jkmm_skmm_group").hide();
              $(".jkmm_group").hide();
              $(".skmm_group").hide();
              $(".default_upload").show();
              $$("#formupload-wrapper-list").html("");
              addformupload_status = true;
            } else if ($(this).val() == "jkmm") {
              send_dtks();
              $(".sekolahgroup").hide();
              $(".jkmm_skmm_group").show();
              $(".jkmm_group").show();
              $(".skmm_group").hide();
              $(".default_upload").hide();
              get_berkas_sktm(result.berkas_jkmm);
            } else if ($(this).val() == "skmm") {
              send_dtks();
              $(".sekolahgroup").hide();
              $(".jkmm_skmm_group").show();
              $(".jkmm_group").hide();
              $(".skmm_group").show();
              $(".default_upload").hide();
              get_berkas_sktm(result.berkas_skmm);
            } else if ($(this).val() == "lain") {
              $("#tipe_dtks").val(1);
              $(".sekolahgroup").show();
              $(".jkmm_skmm_group").hide();
              $(".jkmm_group").hide();
              $(".skmm_group").hide();
              $(".default_upload").show();
              $$("#formupload-wrapper-list").html("");
              addformupload_status = true;
            } else {
              $("#tipe_dtks").val(1);
              $(".sekolahgroup").hide();
              $(".jkmm_skmm_group").hide();
              $(".jkmm_group").hide();
              $(".skmm_group").hide();
              $(".default_upload").show();
              $$("#formupload-wrapper-list").html("");
              addformupload_status = true;
            }
          });
        },
        "json"
      );

      $$("#telp_pemohon").val(datauser.no_telp_pendaftar);
      $$("#alamat").val(datauser.alamat);
      $$("#addformupload").on("touchend", addrow);
      $$("#simpan").on("click", function () {
        app.input.validateInputs("#new_sktm_kecamatan");
        if ($$("#new_sktm_kecamatan")[0].checkValidity() == true) {
          data = new Array();
          keteranganid = [];
          filecode = [];
          var cek_file = true;
          let jenis_surat = $$("#jenis_surat").val();
          let jenis_layanan = $$("#jenis_layanan").val();
          $(".filecode").each(function (i, el) {
            if (jenis_surat == "jkmm" && jenis_layanan == "Rawat Inap") {
              if (
                (i == 0 && !el.value) ||
                (i == 1 && !el.value) ||
                (i == 2 && !el.value) ||
                (i == 3 && !el.value)
              ) {
                app.dialog.alert("Harap Isi file pada pilihan Rawat Inap");
                cek_file = false;
                return false;
              }
            } else if (
              jenis_surat == "jkmm" &&
              jenis_layanan == "Rawat Jalan"
            ) {
              if (i != 5 && !el.value) {
                app.dialog.alert("Harap Isi file dan Surat Rujukan");
                cek_file = false;
                return false;
              }
            } else if (jenis_surat == "skmm") {
              if (i != 4 && !el.value) {
                app.dialog.alert("Harap Isi file");
                cek_file = false;
                return false;
              }
            }

            filecode.push(el.value);
          });
          if (!cek_file) {
            return false;
          }
          $("input[name^=keteranganid]").each((i, el) =>
            keteranganid.push(el.value)
          );
          mydata = app.form.convertToData("#new_sktm_kecamatan");
          data.push(mydata);
          data.push(iamthedoor);
          data.push(keteranganid);
          data.push(filecode);
          app.request.post(
            site_url_mobile_layanan + "/sktm_kecamatan/save_sktm_kecamatan",
            data,
            function (data) {
              if (isNaN(data)) {
                app.dialog.alert(data.desc);
                mainView.router.back();
              } else {
                app.dialog.alert("Penyimpanan Berhasil");
                mainView.router.back();
                $("#datatables").DataTable().ajax.reload();
              }
            },
            function () {
              app.dialog.alert("Penyimpanan Gagal, Coba lagi di lain waktu");
            },
            "json"
          );
        }
      });
    },
  },
};
var sktm_kecamatan = {
  path: "/tipe-b/sktm_kecamatan",
  url: "./pages/tipe-b/sktm_kecamatan.html",
  name: "sktm_kecamatan",
  on: {
    pageInit: function () {
      $$("#btnnew").hide();
      if (datauser.role_id == "4") {
        $$("#btnnew").show();
      }
      var statusselect = app.smartSelect.create({
        el: ".statusselect",
        on: {
          close: function () {
            datatables.context[0].ajax.url =
              site_url_mobile_layanan +
              "/sktm_kecamatan/layanan/" +
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
      var datatables = $("#datatables").DataTable({
        serverSide: true,
        ajax: {
          url: site_url_mobile_layanan + "/sktm_kecamatan/layanan/1",
          data: iamthedoor,
          type: "GET",
        },
        columns: [
          { data: "id" },
          { data: "kode_transaksi" },
          { data: "nomor" },
          { data: "nama_pemohon" },
          { data: "tujuan" },
          { data: "display_name" },
          { data: "val_status", width: "20%" },
        ],
        initComplete: function (settings, json) {
          app.dialog.close();
          $$("#datatables_length").hide();
          $$("#datatables_filter").hide();
        },
        rowCallback: function (row, data) {
          $("td:eq(7)", row).html(
            '<span style="background-color:transparent; padding:5px; border-radius:10px; ">Bisa<br>Diambil</span>'
          );
          if (data.val_status) {
            var color = "transparent";
            if (data.val_status == "Ditolak") var color = "transparent";
            if (data.val_status == "Menunggu") var color = "transparent";
            if (data.val_status == "Belum Dikirim") var color = "transparent";
            $("td:eq(7)", row).html(
              '<span style="background-color:' +
                color +
                '; padding:5px; border-radius:10px;">' +
                data.val_status +
                "</span>"
            );
          }
          if (data.val_status == "Menunggu") {
            if (datauser.role_id == "4") {
              $("td:eq(0)", row).html(
                '<a href="/tipe-b/edit_sktm_kecamatan/' +
                  data.id +
                  '/edit/" class="button button-small button-fill color-blue">' +
                  '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>'
              );
            } else {
              $("td:eq(0)", row).html(
                '<a href="/tipe-b/edit_sktm_kecamatan/' +
                  data.id +
                  '/approve/" class="button button-small button-fill color-green">' +
                  '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Approve</a>'
              );
            }
          } else {
            $("td:eq(0)", row).html(
              '<a href="/tipe-b/edit_sktm_kecamatan/' +
                data.id +
                '/lihat/" class="button button-small button-fill color-green">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">zoom_in</i> Lihat</a>'
            );
          }
          if (!data.display_name) {
            $("td:eq(6)", row).html("---");
          }
          if (!data.nomor) {
            $("td:eq(2)", row).html("---");
          }
        },
      });
    },
  },
};

var perpanjangan_sktm_kecamatan = {
  path: "/tipe-b/perpanjangan_sktm_kecamatan/",
  url: "./pages/tipe-b/perpanjangan_sktm_kecamatan.html",
  name: "perpanjangan_sktm",
  on: {
    pageInit: function () {
      $$("#btnperpanjangan").hide();
      if (datauser.role_id == "4") {
        $$("#btnperpanjangan").show();
      }
      var datatablesperpanjangan = $("#datatablesperpanjangan").DataTable({
        serverSide: true,
        ajax: {
          url: site_url_mobile_layanan + "/sktm_kecamatan/get_perpanjangan/2",
          data: iamthedoor,
          type: "GET",
        },
        columns: [
          { data: "id" },
          { data: "kode_transaksi" },
          { data: "nomor" },
          { data: "nama_pemohon" },
          { data: "tujuan" },
          { data: "display_name" },
          { data: "jumlah_perpanjangan", width: "20%" },
        ],
        initComplete: function (settings, json) {
          app.dialog.close();
          $$("#datatables_length").hide();
          $$("#datatables_filter").hide();
        },
        rowCallback: function (row, data) {
          if (data.jumlah_perpanjangan <= "0") {
            $("td:eq(6)", row).html(
              '<span style="background-color:transparent; padding:5px; border-radius:10px; ">Belum <br>diperpanjang</span>'
            );
          } else {
            $("td:eq(6)", row).html(
              '<span style="background-color:transparent; padding:5px; border-radius:10px; ">Sudah <br>diperpanjang ' +
                // data.jumlah_perpanjangan +
                "</span>"
            );
          }
          if (datauser.role_id == "4") {
            $("td:eq(0)", row).html(
              '<button type="submit" class="button button-fill color-blue perpanjagan" data-id="' +
                data.id +
                '">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Perpanjang</button>'
            );
          }
        },
      });
      $("#datatablesperpanjangan").on("click", ".perpanjagan", function () {
        var id = $(this).data("id");
        app.dialog.confirm(
          "Apakah anda ingin memperpanjang sktm?",
          function () {
            app.request.get(
              "https://tes-sipraja.global-inovasi.com/index.php/mobile/sktm_kecamatan/get_id_perpanjangan/2/" +
                id,
              iamthedoor,
              function (data) {
                var tes = data;
                var perpanjangan = tes.data[0];
                var approval = tes.data;
                var data = [];
                data.push(iamthedoor);
                data.push(perpanjangan);
                data.push(approval);
                app.request.post(
                  site_url_mobile_layanan + "/sktm_kecamatan/save_perpanjangan",
                  data,
                  function (data) {
                    $$("#perpanjangan").html(data);
                  },
                  "json"
                );
              },
              "json"
            );
            app.dialog.alert("Data anda sudah diperpanjang.");
            mainView.router.back();
            $("#datatablesperpanjangan").DataTable().ajax.reload();
          }
        );
      });
    },
  },
};

var edit_sktm_kecamatan = {
  path: "/tipe-b/edit_sktm_kecamatan/:id/:tipe",
  url: "./pages/tipe-b/edit_sktm_kecamatan.html",
  name: "edit_sktm_kecamatan",
  on: {
    pageInit: function () {
      tablename = "sk_tidak_mampu";
      $$("#addformupload").hide();
      var this_user_is_the_last_index = false;
      var id = mainView.router.currentRoute.params.id;
      var tipe = mainView.router.currentRoute.params.tipe;

      if (tipe == "edit") {
        $$("#approval").hide();
        $$("#addformupload").show();
        $$("#addformupload").on("touchend", addrow);
      }

      $$("#print_button").on("click", function () {
        app.dialog.preloader("Mohon Tunggu Sebentar...");
        app.request.post(
          site_url_mobile_layanan + "/sktm_kecamatan/print_doc/" + id,
          iamthedoor,
          function (doc_path) {
            download_doc(doc_path);
          },
          "json"
        );
      });
      $$("#print_preview_button").on("click", function () {
        app.dialog.preloader("Mohon Tunggu Sebentar...");
        app.request.post(
          site_url_mobile_layanan + "/sktm_kecamatan/print_doc/" + id,
          iamthedoor,
          function (doc_path) {
            preview_doc(doc_path);
          },
          "json"
        );
      });
      data = [];
      data.push(iamthedoor);
      app.dialog.preloader("Loading...");
      $$(".checked_approval_button").hide();
      app.request.post(
        site_url_mobile_layanan +
          "/sktm_kecamatan/find_layanan/" +
          id +
          "/" +
          datauser.bf_users_id,
        data,
        function (data) {
          if (data == false) {
            app.dialog.close();
            app.dialog.alert("Data tidak ditemukan");
            mainView.router.back();
          } else {
            this_user_is_the_last_index = data.this_user_is_the_last_index;
            app.request.post(
              site_url_mobile +
                "/siurban_mobile/get_kecamatan_kelurahan/" +
                data.pemohon.kecamatan +
                "/" +
                data.pemohon.kode_desa,
              function (keckel) {
                $$("input[name='kecamatan_pemohon']").val(keckel.kecamatan);
                $$("input[name='kelurahan_pemohon']").val(keckel.kelurahan);
                $$("input[name='nama_pemohon']").val(data.pemohon.nama);
                $$("input[name='alamat_pemohon']").val(data.pemohon.alamat);
                $$("input[name='telp_pemohon']").val(data.layanan.telp_pemohon);
                if (data.approve !== null) {
                  $$("input[name='approve_items_id']").val(data.approve.id);
                  $$("input[name='type_ttd']").val(data.approve.author_type);
                  document_look(
                    data.latest_status.status_approval,
                    data.latest_status.display_name
                  );
                  if (data.approve.ttd !== null) {
                    ttdview(data.approve.ttd);
                  }
                }
                // if (data.layanan.nama_ortu !== null) {
                $$("select[name='jenis_surat']").val("sekolah").change();
                $$("input[name='tujuan']").val(data.layanan.tujuan);
                $$("input[name='nama_ortu']").val(data.layanan.nama_ortu);
                $$("input[name='pekerjaan']").val(data.layanan.pekerjaan);
                $$("input[name='alamat']").val(data.layanan.alamat_pemohon);
                get_faskes("#id_faskes", data.layanan.id_faskes);
                $$("input[name='nama_pasien']").val(data.layanan.nama_pasien);
                $$("select[name='jenis_layanan']")
                  .val(data.layanan.jenis_layanan)
                  .change();
                $$("select[name='tujuan_skmm']").val(data.layanan.tujuan_skmm);
                // } else {
                //   $(".sekolahgroup").hide();
                // }
                $$("select[name='jenis_surat']")
                  .val(data.layanan.jenis_surat)
                  .change();
                if (data.layanan.doc_dinsos) {
                  $$("#print_dinsos_button").removeClass("bg-color-gray");
                  $$("#print_dinsos_button").addClass("bg-color-green");
                  $$("#print_dinsos_button").on("click", function () {
                    app.dialog.preloader("Mohon Tunggu Sebentar...");
                    app.request.post(
                      site_url_mobile_layanan + "/sktm_dinsos/print_doc/" + id,
                      iamthedoor,
                      function (doc_path) {
                        download_doc(doc_path);
                      },
                      "json"
                    );
                  });
                }
                table_chron = "";
                if (data.chron.length) {
                  $$("#btndeletelayanan").hide();
                  for (var i = 0; i < data.chron.length; i++) {
                    table_chron +=
                      "<tr>" +
                      "<td>" +
                      data.chron[i].val_status +
                      "</td>" +
                      "<td>" +
                      data.chron[i].author_type +
                      "</td>" +
                      "<td>" +
                      data.chron[i].name +
                      "</td>" +
                      "<td>" +
                      data.chron[i].keterangan +
                      "</td>" +
                      "<td>" +
                      data.chron[i].tglinsert +
                      "</td>" +
                      "</tr>";
                  }
                } else {
                  table_chron =
                    "<tr>" +
                    "<td></td>" +
                    "<td>Belum Ada Approval</td>" +
                    "<td></td>" +
                    "<td></td>" +
                    "<td></td>" +
                    "</tr>";
                }
                $$(".table-chron").html(table_chron);
                if (datauser.role_id == "4") {
                  var jenis_surat = $("#jenis_surat").val();

                  if (jenis_surat == "sekolah") {
                    $(".sekolahgroup").show();
                    $(".jkmm_skmm_group").hide();
                    $(".jkmm_group").hide();
                    $(".skmm_group").hide();
                    $(".default_upload").show();
                  } else if (jenis_surat == "jkmm") {
                    $(".sekolahgroup").hide();
                    $(".jkmm_skmm_group").show();
                    $(".jkmm_group").show();
                    $(".skmm_group").hide();
                    $(".default_upload").hide();
                  } else if (jenis_surat == "skmm") {
                    $(".sekolahgroup").hide();
                    $(".jkmm_skmm_group").show();
                    $(".jkmm_group").hide();
                    $(".skmm_group").show();
                    $(".default_upload").hide();
                  } else {
                    $(".sekolahgroup").hide();
                    $(".jkmm_skmm_group").hide();
                    $(".jkmm_group").hide();
                    $(".skmm_group").hide();
                    $(".default_upload").hide();
                  }

                  // $("#jenis_surat").on('change', function() {
                  //   if ($(this).val() == 'rs') {
                  //     $(".sekolahgroup").hide();
                  //     $(".sekolahgroup :input").each(function() {
                  //       $(this).prop('required', false);
                  //     });
                  //   } else {
                  //     $(".sekolahgroup").show();
                  //     $(".sekolahgroup :input").each(function() {
                  //       $(this).prop('required', true);
                  //     });
                  //   }
                  // });
                  $$("#btndeletelayanan").html(
                    '<a class="button button-round button-fill color-red" id="deletelayanan" style="margin-top: 10px;">' +
                      '<i class="f7-icons" style="font-size: 14pt; margin-top: 7px;">xmark_square_fill</i> <span>Hapus Data</span></a>'
                  );
                  if (tipe == "edit") {
                    prep_penyimpanan();
                  } else {
                    $$("#edit_sktm_kecamatan input").prop("disabled", true);
                    $$("#edit_sktm_kecamatan textarea").prop("disabled", true);
                    if (data.check_approved) {
                      $$(".savebutton").hide();
                      $$(".checked_approval_button").show();
                    } else {
                      $$("#simpan").html(
                        '<i class="icon f7-icons">arrow_left_circle_fill</i> Kembali'
                      );
                      $$("#simpan").on("click", function () {
                        mainView.router.back();
                        $("#datatables").DataTable().ajax.reload();
                      });
                    }
                  }
                } else {
                  $$("#edit_sktm_kecamatan input").prop("disabled", true);
                  $$("#edit_sktm_kecamatan textarea").prop("disabled", true);
                  if (tipe == "approve") {
                    $$("#simpan").html(
                      '<i class="icon f7-icons">checkmark_seal_fill</i> Approve'
                    );
                    $$("#print_preview_button").show();
                    prep_penyimpanan();
                  } else {
                    if (data.check_approved) {
                      $$(".savebutton").hide();
                      $$(".checked_approval_button").show();
                    } else {
                      $$("#simpan").html(
                        '<i class="icon f7-icons">arrow_left_circle_fill</i> Kembali'
                      );
                      $$("#simpan").on("click", function () {
                        mainView.router.back();
                        $("#datatables").DataTable().ajax.reload();
                      });
                    }
                  }
                }
                if (data.layanan.file_code !== null) {
                  if (
                    tipe == "edit" &&
                    (jenis_surat == "jkmm" || jenis_surat == "skmm")
                  ) {
                    if (jenis_surat == "jkmm") {
                      get_berkas_sktm(
                        data.deskripsi_dokumen_jkmm,
                        data.attachments,
                        "edit"
                      );
                    } else if (jenis_surat == "skmm") {
                      get_berkas_sktm(
                        data.deskripsi_dokumen_skmm,
                        data.attachments,
                        "edit"
                      );
                    }
                  } else if (tipe == "edit") {
                    find_document(id, false);
                  } else {
                    find_document(id, true);
                  }
                }
                $$("#deletelayanan").on("click", function () {
                  app.dialog.confirm(
                    "Apakah anda yakin menghapus data ini?",
                    function () {
                      data = [];
                      data.push(iamthedoor);
                      app.request.post(
                        site_url_mobile_layanan +
                          "/sktm_kecamatan/delete_layanan/" +
                          id,
                        data,
                        function (data) {
                          if (data == false) {
                            app.dialog.close();
                            app.dialog.alert("Data tidak ditemukan");
                            mainView.router.back();
                            $("#datatables").DataTable().ajax.reload();
                          } else {
                            app.dialog.close();
                            app.dialog.alert("Berhasil Menghapus Data");
                            mainView.router.back();
                            $("#datatables").DataTable().ajax.reload();
                          }
                        },
                        function () {
                          app.dialog.close();
                          app.dialog.alert(
                            "Data Gagal dihapus, Coba lagi di lain waktu"
                          );
                        },
                        "json"
                      );
                    }
                  );
                });
                app.dialog.close();
              },
              function () {},
              "json"
            );
          }
        },
        function () {
          app.dialog.close();
          app.dialog.alert("Gagal");
          mainView.router.back();
        },
        "json"
      );

      function prep_penyimpanan() {
        $$("#simpan").on("click", function () {
          app.input.validateInputs("#edit_sktm_kecamatan");
          if ($$("#edit_sktm_kecamatan")[0].checkValidity() == true) {
            data = new Array();
            if (datauser.role_id == "4") {
              app.dialog.preloader("Proses Penyimpanan...");
              keteranganid = [];
              filecode = [];

              var cek_file = true;
              let jenis_surat = $$("#jenis_surat").val();
              let jenis_layanan = $$("#jenis_layanan").val();
              $(".filecode").each(function (i, el) {
                if (jenis_surat == "jkmm" && jenis_layanan == "Rawat Inap") {
                  if (
                    (i == 0 && !el.value) ||
                    (i == 1 && !el.value) ||
                    (i == 2 && !el.value) ||
                    (i == 3 && !el.value)
                  ) {
                    app.dialog.alert("Harap Isi file pada pilihan Rawat Inap");
                    cek_file = false;
                    return false;
                  }
                } else if (
                  jenis_surat == "jkmm" &&
                  jenis_layanan == "Rawat Jalan"
                ) {
                  if (i != 5 && !el.value) {
                    app.dialog.alert("Harap Isi file dan Surat Rujukan");
                    cek_file = false;
                    return false;
                  }
                } else if (jenis_surat == "skmm") {
                  if (i != 4 && !el.value) {
                    app.dialog.alert("Harap Isi file");
                    cek_file = false;
                    return false;
                  }
                }

                filecode.push(el.value);
              });
              if (!cek_file) {
                return false;
              }
              $("input[name^=keteranganid]").each((i, el) =>
                keteranganid.push(el.value)
              );

              // $('input[name^=keteranganid]').each(function() {
              //   keteranganid.push($(this).val());
              // });
              // $('input[name^=filecode]').each(function() {
              //   filecode.push($(this).val());
              // });
              mydata = app.form.convertToData("#edit_sktm_kecamatan");
              data.push(mydata);
              data.push(iamthedoor);
              data.push(keteranganid);
              data.push(filecode);
              var url =
                site_url_mobile_layanan +
                "/sktm_kecamatan/save_sktm_kecamatan/update/" +
                id;
              app.request.post(
                url,
                data,
                function (data) {
                  if (isNaN(data)) {
                    app.dialog.close();
                    if (data.status == "fail") {
                      app.dialog.alert("Proses Gagal");
                    } else if (data.status == "success") {
                      app.dialog.alert("Berhasil !");
                    } else {
                      app.dialog.alert("proses gagal");
                    }
                    $("#datatables").DataTable().ajax.reload();
                    mainView.router.back();
                  } else {
                    app.dialog.close();
                    app.dialog.alert("Penyimpanan Berhasil");
                    mainView.router.back();
                    $("#datatables").DataTable().ajax.reload();
                  }
                },
                function () {
                  app.dialog.close();
                  app.dialog.alert(
                    "Penyimpanan Gagal, Coba lagi di lain waktu"
                  );
                  mainView.router.back();
                  $("#datatables").DataTable().ajax.reload();
                },
                "json"
              );
            } else {
              if (
                this_user_is_the_last_index == true &&
                $$("select[name='status']").val() == 2
              ) {
                var approval = app.popup.create({
                  content:
                    '<div class="popup">' +
                    '<div class="block">' +
                    '<p class="row"><a href="#" class="col-25 button button-raised button-fill popup-close">TUTUP</a></p>' +
                    '<p style="text-align: center;">Ketika Anda mengubah status, maka status dokumen ini <b>tidak dapat diubah kembali</b>.</p>' +
                    '<div class="list">' +
                    "<ul>" +
                    '<li class="item-content item-input">' +
                    '<div class="item-inner">' +
                    '<div class="item-title item-label">Masukkan Passphrase Anda</div>' +
                    '<div class="item-input-wrap">' +
                    '<input type="password" id="esign" name="esign" placeholder="Passphrase Anda" autocomplete="off">' +
                    '<span class="input-clear-button"></span>' +
                    "</div>" +
                    "</div>" +
                    "</li>" +
                    "</ul>" +
                    "</div>" +
                    '<br><button class="col color-green button button-big button-raised button-fill" id="approve_button">APPROVE</button>' +
                    "</div>" +
                    "</div>",
                });
                approval.open();
                $$("#approve_button").on("click", function () {
                  approve(
                    "/sktm_kecamatan/save_sktm_kecamatan/ustatus/" + id,
                    this_user_is_the_last_index,
                    $$("#esign").val()
                  );
                  approval.close();
                });
              } else {
                var approval = app.popup.create({
                  content:
                    '<div class="popup">' +
                    '<div class="block">' +
                    '<p><a href="#" class="link popup-close">< Kembali</a></p><br>' +
                    '<h3 style="text-align:center;">Ketika Anda mengubah status, maka status dokumen ini <b>tidak dapat diubah kembali</b></h3>' +
                    '<button class="col button button-big button-raised button-fill" id="approve_button">APPROVE</button>' +
                    "</div>" +
                    "</div>",
                });
                approval.open();
                $$("#approve_button").on("touchend", function () {
                  approve(
                    "/sktm_kecamatan/save_sktm_kecamatan/ustatus/" + id,
                    this_user_is_the_last_index
                  );
                  approval.close();
                });
              }
            }
          }
        });
      }
    },
  },
};

function default_berkas_sktm_kecamatan() {
  var counter = 0;
  var default_berkas =
    '<li data-index="' +
    counter +
    '" ><ul>' +
    '<li class="item-content item-input">' +
    '<div class="item-inner">' +
    '<div class="row">' +
    '<div class="col-60">' +
    '<div class="item-inner">' +
    '<div class="item-input-wrap">' +
    '<input id="fileid' +
    counter +
    '" class="fileid" type="hidden" name="fileid[' +
    counter +
    ']">' +
    '<input class="filecode" id="filecode' +
    counter +
    '" type="hidden" readonly="" name="filecode[]">' +
    '<input class="fileurl" id="fileurl' +
    counter +
    '" type="text" name="fileurl[' +
    counter +
    ']" placeholder="URL file">' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div class="col-20 preview_files">' +
    "</div>" +
    '<div class="col-20">' +
    '<a id="' +
    counter +
    '" onclick="uploadfile(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</li>" +
    '<li class="item-content item-input">' +
    '<div class="item-inner">' +
    '<div class="row">' +
    '<div class="col-80">' +
    '<div class="item-inner">' +
    '<div class="item-input-wrap">' +
    '<input type="text" name="keteranganid[]" placeholder="Keterangan File">' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div class="col-20">' +
    '<a id="' +
    counter +
    '" onclick="deleterow(this.id)" class="button button-round button-fill color-red" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">trash_fill</i></a>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</li></ul></li>";
  $$("#formupload-wrapper-list").html(default_berkas);
}
