var ijin_keramaian = {
  path: "/tipe-b/ijin_keramaian",
  url: "./pages/tipe-b/ijin_keramaian.html",
  name: "ijin_keramaian",
  on: {
    pageInit: function () {
      var statusselect = app.smartSelect.create({
        el: ".statusselect",
        on: {
          close: function () {
            app.dialog.preloader("Loading...");
            datatables.context[0].ajax.url = site_url_mobile_layanan + "/ijin_keramaian/get_data/" + $$("#statusselect").val();
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

      app.dialog.preloader("Loading...");
      var datatables = $("#datatables").DataTable({
        serverSide: true,
        ajax: {
          url: site_url_mobile_layanan + "/ijin_keramaian/get_data/1",
          data: iamthedoor,
          type: "GET",
        },
        columns: [
          { data: "id" },
          { data: "kode_transaksi" },
          { data: "nomor" },
          { data: "nama" },
          { data: "alamat" },
          { data: "acara" },
          { data: "tempat" },
          { data: "display_name" },
          { data: "id" },
        ],
        initComplete: function (settings, json) {
          app.dialog.close();
          $$("#datatables_length").hide();
          $$("#datatables_filter").hide();
        },
        rowCallback: function (row, data) {
          var color = "#17A05E";
          $("td:eq(8)", row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px; color:white;">Bisa Diambil</span>');
          if (data.val_status) {
            if (data.val_status == "Ditolak") {
              color = "#DE4E42";
            } else if (data.val_status == "Menunggu") {
              color = "#FF9800";
            }
            $("td:eq(8)", row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px; color:white;">' + data.val_status + "</span>");
          }
          if (data.val_status == "Menunggu") {
            if (datauser.role_id == "4") {
              $("td:eq(0)", row).html(
                '<a href="/tipe-b/edit_ijin_keramaian/' +
                  data.id +
                  '/edit/" class="button button-small button-fill color-blue">' +
                  '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>'
              );
            } else {
              $("td:eq(0)", row).html(
                '<a href="/tipe-b/edit_ijin_keramaian/' +
                  data.id +
                  '/approve/" class="button button-small button-fill color-green">' +
                  '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Approve</a>'
              );
            }
          } else {
            $("td:eq(0)", row).html(
              '<a href="/tipe-b/edit_ijin_keramaian/' +
                data.id +
                '/view/" class="button button-small button-fill color-green">' +
                '<i class="icon f7-icons" style="font-size: 12pt;">zoom_in</i> Lihat</a>'
            );
          }
        },
      });
    },
  },
};

var new_ijin_keramaian = {
  path: "/tipe-b/new_ijin_keramaian/",
  url: "./pages/tipe-b/new_ijin_keramaian.html",
  name: "new_ijin_keramaian",
  on: {
    pageInit: function () {
      $$("#addformupload").on("touchend", addrow);

      $$("#nik_pemohon").val(datauser.nik);
      $$("#nama").val(datauser.nama);
      $$("#tempat_lahir").val(datauser.tempat_lahir);
      $$("#tgl_lahir").val(datauser.tanggal_lahir);
      $$("#jenis_kelamin").val(datauser.jenis_kelamin);
      $$("#kecamatan").val(datauser.namakec);
      $$("#kelurahan").val(datauser.namakel);
      $$("#alamat").val(datauser.alamat);
      $$("#pekerjaan").val(datauser.pekerjaan);
      $$("#telepon").val(datauser.no_telp_pendaftar);

      $$("#simpan").on("click", function () {
        app.input.validateInputs("#form_new_ijin_keramaian");
        if ($$("#form_new_ijin_keramaian")[0].checkValidity() == true) {
          let form_data = app.form.convertToData("#form_new_ijin_keramaian");
          let filecode = new Array();
          $("#formupload-wrapper .filecode").each((i, el) => filecode.push(el.value));
          let filedesc = new Array();
          $("#formupload-wrapper .filedesc").each((i, el) => filedesc.push(el.value));

          let ajax_data = new Array();
          ajax_data.push(iamthedoor);
          ajax_data.push(form_data);
          ajax_data.push(filecode);
          ajax_data.push(filedesc);

          app.dialog.preloader("Loading...");
          app.request.post(
            site_url_mobile_layanan + "/ijin_keramaian/create",
            ajax_data,
            function (data) {
              app.dialog.close();
              if (data) {
                app.dialog.alert("Data Berhasil Diajukan");
                mainView.router.back();
                $("#datatables").DataTable().ajax.reload();
              } else {
                app.dialog.alert(data.desc);
              }
            },
            function () {
              app.dialog.close();
              app.dialog.alert("Data Gagal Diajukan, Mohon Coba Lagi Nanti");
            },
            "json"
          );
        }
      });
    },
  },
};

var edit_ijin_keramaian = {
  path: "/tipe-b/edit_ijin_keramaian/:id/:tipe/",
  url: "./pages/tipe-b/edit_ijin_keramaian.html",
  name: "edit_ijin_keramaian",
  on: {
    pageInit: function () {
      tablename = "kt_ijin_keramaian";
      var id = mainView.router.currentRoute.params.id;
      var tipe = mainView.router.currentRoute.params.tipe;

      $$("#approval").hide();

      app.dialog.preloader("Loading...");
      app.request.post(
        site_url_mobile_layanan + "/ijin_keramaian/find/" + id,
        iamthedoor,
        function (data) {
          app.dialog.close();

          if (data.check_approved === true) {
            $$(".savebutton").remove();
            $$("#btndeletelayanan").remove();
            $("#form_edit_ijin_keramaian input").prop("readonly", true);
            $$(".checked_approval_button").show();
          }

          if (data.layanan.nomor == null || data.layanan.nomor == "") $$("#nomor_form").hide();
          $$("#kode_transaksi").val(data.layanan.kode_transaksi);
          $$("#nomor").val(data.layanan.nomor);

          $$("#nik_pemohon").val(datauser.nik);
          $$("#nama").val(data.layanan.nama);
          $$("#tempat_lahir").val(data.layanan.tempat_lahir);
          $$("#tgl_lahir").val(data.layanan.tgl_lahir);
          $$("#jenis_kelamin").val(datauser.jenis_kelamin);
          $$("#kecamatan").val(datauser.namakec);
          $$("#kelurahan").val(datauser.namakel);
          $$("#alamat").val(data.layanan.alamat);
          $$("#pekerjaan").val(data.layanan.pekerjaan);
          $$("#telepon").val(datauser.no_telp_pendaftar);
          $$("#jabatan").val(data.layanan.jabatan);

          $$("#acara").val(data.layanan.acara);
          $$("#tempat").val(data.layanan.tempat);
          $$("#tgl_kegiatan_mulai").val(data.layanan.tgl_kegiatan_mulai);
          $$("#tgl_kegiatan_selesai").val(data.layanan.tgl_kegiatan_selesai);
          $$("#waktu").val(data.layanan.waktu);
          $$("#hiburan").val(data.layanan.hiburan);
          $$("#undangan").val(data.layanan.undangan);

          $$("#addformupload").on("touchend", addrow);
          if (data.layanan.file_code !== null) {
            if (tipe == "edit") {
              find_document(id, false);
            } else {
              find_document(id, true);
            }
          }

          if (data.report_ijin_keramaian !== null) {
            $$("#file_id_spt").val(data.report_ijin_keramaian.id);
            $$("#file_code_spt").val(data.report_ijin_keramaian.code);
            $$("#file_url_spt").val(data.report_ijin_keramaian.file_name);
            $$(".preview_files_spt").html(
              '<a id="preview_doc_spt" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>'
            );
            $$("#preview_doc_spt").on("click", function () {
              app.dialog.preloader("Mohon Tunggu Sebentar...");
              preview_doc(data.report_ijin_keramaian.file_actual, "layanan");
            });
          }

          this_user_is_the_last_index = data.this_user_is_the_last_index;
          if (data.approve !== null && iamthedoor.role_id != 4) {
            $$("input[name='approve_items_id']").val(data.approve.id);
            $$("input[name='type_ttd']").val(data.approve.author_type);
            document_look(data.latest_status.status_approval, data.latest_status.display_name);
            if (data.approve.ttd) {
              ttdview(data.approve.ttd);
            }
          }

          var table_chron = "";
          if (data.chron.length) {
            $$("#btndeletelayanan").hide();
            $$(".savebutton").hide();
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
            table_chron = "<tr>" + "<td></td>" + "<td>Belum Ada Approval</td>" + "<td></td>" + "<td></td>" + "<td></td>" + "</tr>";
          }
          $$(".table-chron").html(table_chron);

          $$("#print_preview_button").on("click", function () {
            app.dialog.preloader("Mohon Tunggu Sebentar...");
            preview_doc(data.report_ijin_keramaian.file_actual, "layanan");
          });

          if (data.layanan.doc_path != null || data.layanan.doc_path != "") {
            $$("#cetak_report").on("click", function () {
              app.dialog.preloader("Mohon Tunggu Sebentar...");
              download_doc(data.layanan.doc_path + "_signed.pdf");
            });
          }
        },
        function () {
          app.dialog.close();
          app.dialog.alert("Terjadi Kesalahan Saat Mengambil Data Anda, Mohon Coba Lagi Nanti");
          mainView.router.back();
          $("#datatables").DataTable().ajax.reload();
        },
        "json"
      );

      $$("#simpan").on("click", function () {
        app.input.validateInputs("#form_edit_ijin_keramaian");
        if ($$("#form_edit_ijin_keramaian")[0].checkValidity() == true) {
          if (iamthedoor.role_id == 4) {
            let form_data = app.form.convertToData("#form_edit_ijin_keramaian");
            let filecode = new Array();
            $("#formupload-wrapper .filecode").each((i, el) => filecode.push(el.value));
            let filedesc = new Array();
            $('#formupload-wrapper input[name="keteranganid[]"]').each((i, el) => filedesc.push(el.value));

            if (filecode.length < 1 || filedesc.length < 1) {
              app.dialog.alert("Mohon Isi Berkas Lampiran Anda Terlebih Dahulu");
              return false;
            }

            let ajax_data = new Array();
            ajax_data.push(iamthedoor);
            ajax_data.push(form_data);
            ajax_data.push(filecode);
            ajax_data.push(filedesc);

            app.dialog.preloader("Loading...");
            app.request.post(
              site_url_mobile_layanan + "/ijin_keramaian/update/" + id,
              ajax_data,
              function (data) {
                app.dialog.close();
                if (data) {
                  app.dialog.alert("Data Berhasil Diajukan");
                  mainView.router.back();
                  $("#datatables").DataTable().ajax.reload();
                } else {
                  app.dialog.alert(data.desc);
                }
              },
              function () {
                app.dialog.close();
                app.dialog.alert("Data Gagal Diajukan, Mohon Coba Lagi Nanti");
              },
              "json"
            );
          } else {
            if (this_user_is_the_last_index == true && $$("select[name='status']").val() == 2) {
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
                if ($$("#type_ttd").val() == "Desa") {
                  approve("/ijin_keramaian/ustatus/" + id, this_user_is_the_last_index, $$("#esign").val());
                  approval.close();
                } else if ($$("#type_ttd").val() == "Kecamatan") {
                  approve("/ijin_keramaian/ustatus/" + id, this_user_is_the_last_index, $$("#esign").val());
                  approval.close();
                }
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
                approve("/ijin_keramaian/ustatus/" + id, this_user_is_the_last_index);
                approval.close();
              });
            }
          }
        }
      });

      $$("#deletelayanan").on("click", function () {
        app.dialog.confirm("Apakah anda yakin Menghapus Data ini?", function () {
          app.dialog.preloader("Loading...");
          app.request.post(
            site_url_mobile_layanan + "/ijin_keramaian/delete/" + id,
            iamthedoor,
            function (data) {
              app.dialog.close();
              if (data.success) {
                app.dialog.alert("Data Berhasil Dihapus");
                mainView.router.back();
                $("#datatables").DataTable().ajax.reload();
              } else {
                app.dialog.alert(data.desc);
              }
            },
            function () {
              app.dialog.close();
              app.dialog.alert("Data Gagal Dihapus, Mohon Coba Lagi Nanti");
            },
            "json"
          );
        });
      });

      $$("#preview_doc_spt").on("click", function () {
        app.dialog.preloader("Mohon Tunggu Sebentar...");
        preview_doc(data.report_ijin_keramaian.file_actual, "layanan");
      });
    },
  },
};
