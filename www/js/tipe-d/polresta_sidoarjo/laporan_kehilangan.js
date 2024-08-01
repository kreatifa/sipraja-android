var laporan_kehilangan = {
  path: '/tipe-d/laporan_kehilangan/',
  url: './pages/tipe-d/polresta_sidoarjo/laporan_kehilangan.html',
  name: 'laporan_kehilangan',
  on: {
    pageInit: function () {
      app.dialog.preloader('Loading...');
      var datatables = $('#laporan_kehilangan_table').DataTable({
        serverSide: true,
        ajax: {
          "url": site_url_mobile_layanan + '/laporan_kehilangan/get_data',
          "data": iamthedoor,
          "type": "GET"
        },
        columns: [
          { data: 'id' },
          { data: 'kode_transaksi' },
          { data: 'nama' },
          { data: 'alamat' },
          { data: 'pekerjaan' },
          { data: 'no_hp' },
          { data: 'tgl_kejadian' },
          { data: 'lokasi' },
          { data: 'keterangan_kehilangan' },
          { data: 'status' },
          { data: 'doc_path' },
        ],
        initComplete: function (settings, json) {
          app.dialog.close();
          $$('#datatables_length').hide();
          $$('#datatables_filter').hide();
        },
        rowCallback: function (row, data) {
          $('td:eq(0)', row).html('<a href="/tipe-d/laporan_kehilangan_edit/' + data.id + '" class="button button-small button-fill color-blue">' +
            '<i class="icon f7-icons" style="font-size: 12pt;">pencil_circle_fill</i> Edit</a>');
          let color, status;
          if (data.status == 0) {
            color = '#FF9800';
            status = 'Belum Diproses';
          } else if (data.status == 1) {
            color = '#17A05E';
            status = 'Sudah Diproses';
          } else if (data.status == 2) {
            color = '#DE4E42';
            status = 'Ditolak';
          }
          $('td:eq(9)', row).html('<span style="background-color:' + color + '; padding:5px; border-radius:10px; color:white;">' + status + '</span>');

          $('td:eq(10)', row).html('<button class="col button button-fill" onclick="filepolres(' + data.id + ')"><i class="icon f7-icons color-white">printer_fill</i> Cetak</button>');
        }
      });
      var statusselect = app.smartSelect.create({
        el: '.statusselect',
        on: {
          close: function () {
            app.dialog.preloader('Loading...');
            datatables.context[0].ajax.url = site_url_mobile_layanan + '/laporan_kehilangan/get_data/' + $$('#statusselect').val();
            $('#laporan_kehilangan_table').DataTable().ajax.reload(function (json) {
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
    }
  }
};

function filepolres(id) {
  app.dialog.preloader('Mohon Tunggu Sebentar...');
  app.request.post(site_url_mobile_layanan + '/laporan_kehilangan/print_doc/' + id, iamthedoor, function (doc_path) {
    // console.log(doc_path);
    download_doc(doc_path);
  }, 'json');
}

var laporan_kehilangan_new = {
  path: '/tipe-d/laporan_kehilangan_new/',
  url: './pages/tipe-d/polresta_sidoarjo/laporan_kehilangan_new.html',
  name: 'laporan_kehilangan_new',
  on: {
    pageAfterIn: function () {
      $$("#addformupload").on("touchend", add_row_kehilangan);

      // DataPemohon
      $$('#nik').val(datauser.nik);
      $$('#nama_pemohon').val(datauser.nama);
      $$('#kecamatan_pemohon').val(datauser.nama_kec);
      $$('#kelurahan_pemohon').val(datauser.nama_kel);
      $$('#alamat').val(datauser.alamat);
      $$('#no_hp').val(datauser.no_telp_pendaftar);
      $$('#tempat_lahir_pemohon').val(datauser.tempat_lahir);
      $$('#tgl_lahir_pemohon').val(datauser.tanggal_lahir);
      $$('#jenis_kelamin_pemohon').val(datauser.jenis_kelamin);
      $$('#status_kawin_pemohon').val(datauser.status_kawin);
      $$('#pekerjaan_pemohon').val(datauser.pekerjaan);
      $$('#kewarganegaraan_pemohon').val(datauser.kwn);
      $$('#kewarganegaraan_pemohon').val(datauser.kwn);
      // $$('#email_pemohon').val(datauser.email);
      $$('#alamat_pemohon').val(datauser.alamat);
      $$('#telp_pemohon').val(datauser.no_telp_pendaftar);

      //DataPengajuan
      $$('#nama').val(datauser.nama);
      $$('#tempat_lahir').val(datauser.tempat_lahir);
      $$('#tgl_lahir').val(datauser.tanggal_lahir);
      $$('#kewarganegaraan').val(datauser.kwn);
      $$('#pekerjaan').val(datauser.pekerjaan);
      $$('#tgl_kejadian').val(new Date().toDateFormat());
      $$('#agama').val(datauser.agama);
      let hours   = (new Date().getHours().toString().length == 2)? new Date().getHours() : "0"+new Date().getHours();
      let minutes = (new Date().getMinutes().toString().length == 2)? new Date().getMinutes() : "0"+new Date().getMinutes();
      $$('#waktu_kejadian').val(hours + ":" + minutes);

      //Penyiapan form
      $.get(site_url_mobile_layanan + '/laporan_kehilangan/request_form_create', iamthedoor, function(response) {

        //Kecamatan
        var kec = '';
        response.kec.forEach(function (val, index) {
          kec += '<option value="' + val.id + '">' + val.name + '</option>';
        });
        $('#kec_list').html(kec);
        $('#kec_list').val(datauser.id_district).trigger('chosen:updated').change();
        $('#kec_list').show();


        //Jenis kehilangan
        let jenis_kehilangans = '';
        response.jenis_kehilangan.forEach(function(val, index) {
          jenis_kehilangans += `<option value="${val.jenis_kehilangan}">${val.jenis_kehilangan}</option>`;
        });
        $('#jenis_kehilangan').html(jenis_kehilangans);

      }, 'json')
      .fail(function(xhr, status, error) {
        console.log(xhr.responseText);
      }, 'json');

      if ($('#kec_list').length && !$('#kode_transaksi').length) {
        var tujuan_berkas = '<option value="POLRESTA SIDOARJO">POLRESTA SIDOARJO</option>';
        tujuan_berkas += '<option value="POLSEK ' + $('#kec_list option:selected').text(); + '">POLSEK ' + $('#kec_list option:selected').text(); + '</option>';
        $('#tujuan_berkas').html(tujuan_berkas).trigger('chosen:updated');
      }

      $('#kec_list').on('change', function () {
          var content   = '';
          let selected  = $(this).find(':selected').text(); 
          content += '<option value="POLRESTA SIDOARJO">POLRESTA SIDOARJO</option>';
          content += '<option value="POLSEK ' + selected + '">POLSEK ' + selected + '</option>';
          $('#tujuan_berkas').html(content).trigger('chosen:updated');
          $('#tujuan_berkas').show();
      });

      $('#jenis_kehilangan').on('change', function() {
            get_persyaratan($(this).val());
      });

      $$('#simpan').on('click', function () {
        // $$('#simpan').on('click', function () {
        app.input.validateInputs("#form_laporan_kehilangan");
        if ($$('#form_laporan_kehilangan')[0].checkValidity() == true) {
          if($('#pernyataan_kehilangan').is(':checked') == false) return app.dialog.alert('Centang Pernyataan Kehilangan');
          let mydata = app.form.convertToData("#form_laporan_kehilangan");
          let ajaxdata = new Array();

          ajaxdata.push(iamthedoor);
          ajaxdata.push(mydata);
          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/laporan_kehilangan/create_laporan_kehilangan', ajaxdata, function (data) {
            app.dialog.close();
            // console.log(data);
            if(data){
              app.dialog.alert('Terimakasih atas pengajuannya');
              mainView.router.back();
              $('#laporan_kehilangan_table').DataTable().ajax.reload();
            }else{
              app.dialog.alert('Data gagal diajukan');
            }
          }, 'json')
        }
      });
    },
  }
};

var laporan_kehilangan_edit = {
  path: '/tipe-d/laporan_kehilangan_edit/:id',
  url: './pages/tipe-d/polresta_sidoarjo/laporan_kehilangan_edit.html',
  name: 'laporan_kehilangan_edit',
  on: {
    pageAfterIn: function () {
      var id = mainView.router.currentRoute.params.id;
      app.dialog.preloader('Loading...');

      app.request.post(site_url_mobile_layanan + '/laporan_kehilangan/get_pengajuan/' + id, iamthedoor, function (callback) {
        app.dialog.close();
        // DataPemohon
        $$("#addformupload").on("touchend", add_row_kehilangan);
        $$('#nik').val(datauser.nik);
        $$('#nama_pemohon').val(datauser.nama);
        $$('#kecamatan_pemohon').val(datauser.nama_kec);
        $$('#kelurahan_pemohon').val(datauser.nama_kel);
        $$('#alamat').val(datauser.alamat);
        $$('#no_hp').val(datauser.no_telp_pendaftar);
        $$('#tempat_lahir_pemohon').val(datauser.tempat_lahir);
        $$('#tgl_lahir_pemohon').val(datauser.tanggal_lahir);
        $$('#jenis_kelamin_pemohon').val(datauser.jenis_kelamin);
        $$('#status_kawin_pemohon').val(datauser.status_kawin);
        $$('#pekerjaan_pemohon').val(datauser.pekerjaan);
        $$('#kewarganegaraan_pemohon').val(datauser.kwn);
        $$('#kewarganegaraan_pemohon').val(datauser.kwn);
        // $$('#email_pemohon').val(datauser.email);
        $$('#alamat_pemohon').val(datauser.alamat);
        $$('#telp_pemohon').val(datauser.no_telp_pendaftar);

        $$('#nama').val(callback.laporan_kehilangan.nama);
        $$('#alamat').val(callback.laporan_kehilangan.alamat);
        $$('#no_hp').val(callback.laporan_kehilangan.no_hp);
        $$('#tempat_lahir').val(callback.laporan_kehilangan.tempat_lahir);
        $$('#tgl_lahir').val(callback.laporan_kehilangan.tgl_lahir);
        $$('#kewarganegaraan').val(callback.laporan_kehilangan.kewarganegaraan);
        $$('#agama').val(callback.laporan_kehilangan.agama);
        $$('#pekerjaan').val(callback.laporan_kehilangan.pekerjaan);
        $$('#tgl_kejadian').val(callback.laporan_kehilangan.tgl_kejadian);
        $$('#waktu_kejadian').val(callback.laporan_kehilangan.waktu_kejadian);
        $$('#lokasi').val(callback.laporan_kehilangan.lokasi);
        $$('#jenis_kehilangan').val(callback.jenis_kehilangan);

        if(callback.laporan_kehilangan.status != "0"){
          $('#btndeletelayanan').hide();
        }
        //Persyaratan
        let persyaratan = '';
        callback.jenis_kehilangan.forEach(function(val, index) {
          persyaratan += `<li style="font-weight: bold">- ${val}:</li><hr>`;
          callback.persyaratan[index]?.forEach(function(vall, indexx) {
              persyaratan += `<li>${vall.lampiran_persyaratan}:</li><hr>`;
          });
        });
        $('#persyaratan').html(persyaratan);

        if(callback.lampiran?.length){
          attachments_pengajuan(callback.lampiran);
        }

		/*==================== <Get kecamatan> ====================*/
        $.get(site_url_mobile_layanan + '/laporan_kehilangan/get_kecamatan', iamthedoor, function (data) {
			var kec = '';
			data.kec.forEach(function (val, index) {
				kec += '<option value="' + val.id + '">' + val.name + '</option>';
			});
			$('#kec_list').html(kec);
			$('#kec_list').val(callback.laporan_kehilangan.id_kecamatan).trigger('chosen:updated').change();
			$('#kec_list').show();
        }, 'json');
		/*==================== </> ====================*/

		/*==================== <Jika list kecamatan tidak kosong dan kode dan trasaksi masih kosong> ====================*/
        if ($('#kec_list').length && !$('#kode_transaksi').length) {
          var tujuan_berkas = '<option value="POLRESTA SIDOARJO">POLRESTA SIDOARJO</option>';
          tujuan_berkas += '<option value="POLSEK ' + $('#kec_list option:selected').text(); + '">POLSEK ' + $('#kec_list option:selected').text(); + '</option>';
          $('#tujuan_berkas').html(tujuan_berkas).trigger('chosen:updated');
        }
		/*==================== </> ====================*/

        $('#kec_list').on('change', function () {
			$.post(site_url_mobile_layanan + '/laporan_kehilangan/get_polsek/' + this.value, iamthedoor, function (response) {
				// console.log(response);
				var content = '';
				content += '<option value="POLRESTA SIDOARJO">POLRESTA SIDOARJO</option>';
				response.tujuan.forEach(function (val, i) {
				content += '<option value="POLSEK ' + val.nama + '">POLSEK ' + val.nama + '</option>';
				});
				$('#tujuan_berkas').val(callback.laporan_kehilangan.tujuan_berkas).trigger('chosen:updated').change();
				$('#tujuan_berkas').html(content).trigger('chosen:updated');
				$('#tujuan_berkas').show();
			}, 'json');
		});
	}, function () {
		app.dialog.close();
		app.dialog.alert('Gagal Mendapatkan Data Anda, Mohon Coba Lagi Nanti');
	}, 'json');

	  	/*==================== <Get syarat kehilangan> ====================*/
      	$('#jenis_kehilangan').on('change', function() {
		  	get_persyaratan($(this).val());
		});
		/*==================== </> ====================*/

		/*==================== <Save Button for edit> ====================*/
		$$('#simpan').on('click', function () {
			app.input.validateInputs('#edit_laporan_kehilangan');
			if ($$('#edit_laporan_kehilangan')[0].checkValidity() == true) {
				// if($('#pernyataan_kehilangan').is(':checked') == false) return app.dialog.alert('Centang Pernyataan Kehilangan');
				if (datauser.role_id == 4) {
					let form_data = app.form.convertToData('#edit_laporan_kehilangan');

					let ajax_data = new Array();
					ajax_data.push(iamthedoor);
					ajax_data.push(form_data);

					app.request.post(site_url_mobile_layanan + '/laporan_kehilangan/update_laporan_kehilangan/' + id, ajax_data, function (callback) {
					app.dialog.close();
					if (callback) {
						app.dialog.alert('Data Berhasil Diedit');
						mainView.router.back();
						$('#laporan_kehilangan_table').DataTable().ajax.reload();
					} else {
						app.dialog.alert(callback.desc);
					}
					}, function () {
					app.dialog.close();
					app.dialog.alert('Data Gagal Diedit, Mohon Coba Lagi Nanti');
					}, 'json');
				}
			}
		});
		/*==================== </> ====================*/

		/*==================== <Delete data action> ====================*/
        $$('#btndeletelayanan').on('click', function() {
            app.dialog.confirm("Hapus data ini?", function(){
                let form_data = app.form.convertToData('#edit_laporan_kehilangan');
                let ajax_data = new Array();
                ajax_data.push(iamthedoor);
                ajax_data.push(form_data);
        
                app.request.post(site_url_mobile_layanan + '/laporan_kehilangan/delete_laporan_kehilangan/' + id, ajax_data, function (callback) {
                    app.dialog.close();
                    if (callback.success) {
                        app.dialog.alert('Data Berhasil Dihapus');
                        mainView.router.back();
                        $('#laporan_kehilangan_table').DataTable().ajax.reload();
                    } else {
                        app.dialog.alert(callback.desc);
                    }
                }, function () {
                    app.dialog.close();
                    app.dialog.alert('Data Gagal Dihapus, Mohon Coba Lagi Nanti');
                }, 'json');
            });
        });
		/*==================== </> ====================*/
    },
  }
};

function attachments_pengajuan(data){
  let attachments_html = '';
  data.forEach(function(item) {
    if(item){
      attachments_html +=
        `<li class="item-content item-input">
          <div class="item-inner">
            <div class="row">
              <div class="col-60">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="item-title item-label">${item.desc}</div>
                    <input type="hidden" id="file_id_${counter}" name="file_id_${counter}" value="${item.id}">
                    <input type="hidden" class="file_code" id="file_code_${counter}" name="file_code_${counter}" value="${item.code}">
                    <input type="hidden" class="file_desc" id="file_desc_${counter}" name="file_desc_${counter}" value="${item.desc}">
                    <input type="text" id="file_url_${counter}" name="file_url_${counter}" value="${item.file_name}" readonly>
                  </div>
                </div>
              </div>
              <div class="col-20 preview_file_${counter}">
                <a onClick="preview_file_kurma(${item.id})" class="button button-round button-fill color-orange" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i></a>
              </div>
              <div class="col-20">
                <a id="${counter}" onClick="upload_file_kurma(this.id)" class="button button-round button-fill" style="margin-top: 10px;"><i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i></a>
              </div>
            </div>
          </div>
        </li>`;
      counter++;
    }
  });

  $$('#formupload-wrapper-list').append(attachments_html);
}

function get_persyaratan(data){
    if(data?.length){
        let formData = new Array();
        formData.push(iamthedoor);
        formData.push(data);

        app.request.post(site_url_mobile_layanan + '/laporan_kehilangan/get_persyaratan', formData, function(response){
            let persyaratan = '';
            data.forEach(function(val, index) {
                persyaratan += `<li style="font-weight: bold">- ${val}:</li><hr>`;
                response[index]?.forEach(function(vall, indexx) {
                    persyaratan += `<li>${vall.lampiran_persyaratan}:</li><hr>`;
                });
            });

            $('#persyaratan').html(persyaratan);

        }, function(error) {
            console.log(error);
        }, 'json');
    }
}