var cek_lowongan = {
  path: '/tipe-d/disnaker/cek_lowongan/',
  url: './pages/tipe-d/disnaker/cek_lowongan.html',
  name: 'cek_lowongan',
  on: {
    pageInit: function () {
      app.dialog.preloader('Mohon Tunggu Sebentar...');
      app.request.get(`${site_url_mobile_layanan}/siap_kerja/cek_lowongan`, iamthedoor, function (result) {
        app.dialog.close();
        $('#table_lowongan').DataTable({
          data: result,
          columns: [
            { data: 'id' },
            { data: 'position_name' },
            { data: 'company.company_name' },
            { data: 'company.province.name' },
            { data: 'company.city.name' },
            { data: 'company.district.name' },
            { data: 'company.sub_district.name' },
            { data: 'salary_from' },
            { data: 'salary_to' },
            { data: 'open_until' },
            { data: 'id' }
          ],
          initComplete: function () {
            $$('#table_lowongan_length').hide();
            $$('#table_lowongan_filter').hide();
          },
          rowCallback: function (row, data) {
            $('td:eq(0)', row).html('<a href="/tipe-d/disnaker/detail_lowongan/' + data.id + '/" class="button button-raised color-green">' +
              '<i class="icon f7-icons">square_pencil_fill</i> Detail</a>');
            $('td:eq(7)', row).html('Rp ' + toIdrFormat(data.salary_from));
            $('td:eq(8)', row).html('Rp ' + toIdrFormat(data.salary_to));
            $('td:eq(9)', row).html((new Date(data.open_until)).toDateIndoFormat());
            $('td:eq(10)', row).html(`<button type="button" class="button button-raised button-fill brochure" data-storage="${data.brosur}">Lihat</button>`);
          }
        });

        $$('#table_lowongan').on('click', '.brochure', function () {
          cordova.InAppBrowser.open('https://siapkerja.sidoarjokab.go.id/storage/' + $$(this).data('storage'), '_blank', 'location=no');
        });
      }, 'json');
    },
  }
};

function clear_regex_text(text) {
  return text.replace(/<br>/g, "\n")
    .replace(/<span>/g, "").replace(/<\/span>/g, "")
    .replace(/<b>/g, "").replace(/<\/b>/g, "")
    .replace(/<i>/g, "").replace(/<\/i>/g, "")
    .replace(/<u>/g, "").replace(/<\/u>/g, "")
    .replace(/<\/div><div>/g, "\n").replace(/<div>/g, "").replace(/<\/div>/g, "")
    .replace(/<ol>/g, "").replace(/<\/ol>/g, "")
    .replace(/<ul>/g, "").replace(/<\/ul>/g, "")
    .replace(/<\/li><li>/g, "\n").replace(/<li>/g, "\n").replace(/<\/li>/g, "\n")
    .replace(/&amp;/g, "&").trim();
}

var detail_lowongan = {
  path: '/tipe-d/disnaker/detail_lowongan/:id/',
  url: './pages/tipe-d/disnaker/detail_lowongan.html',
  name: 'detail_lowongan',
  on: {
    pageInit: function () {
      var id = mainView.router.currentRoute.params.id;
      mainView.router.clearPreviousHistory();
      app.dialog.preloader('Mohon Tunggu Sebentar...');
      let data_user = {
        user_data: iamthedoor,
        id_siap_kerja: datauser.id_siap_kerja,
      };
      app.request.post(`${site_url_mobile_layanan}/siap_kerja/detail_lowongan/${id}`, data_user, function (response) {
        app.dialog.close();
        if (response.job_vacancy?.id) {
          $$('#id_job_vacancy').val(response.job_vacancy.id);
          $$('#position_name').val(response.job_vacancy.position_name);
          $$('#category').val(response.job_vacancy.category.name);
          $$('#sub_category').val(response.job_vacancy.sub_category.name);

          $$('#business_field').val(response.job_vacancy.company.business_field);
          $$('#province_id').val(response.job_vacancy.company.province_id);
          $$('#city_id').val(response.job_vacancy.company.city_id);
          $$('#district_id').val(response.job_vacancy.company.district_id);
          $$('#sub_district_id').val(response.job_vacancy.company.sub_district_id);
          $$('#company_branch_address').val(response.job_vacancy.company.company_branch_address);
          $$('#age_min').val(response.job_vacancy.age_min);
          $$('#age_max').val(response.job_vacancy.age_max);
          $$('#salary_from').val(response.job_vacancy.salary_from);
          $$('#salary_to').val(response.job_vacancy.salary_to);
          $$('#open_until').val(response.job_vacancy.open_until);

          $$('#card_lowongan .card-header').text('Posisi: ' + response.job_vacancy.position_name);
          $$('#company_name').val(response.job_vacancy.company.company_name);
          $$('#nama_HRD').val(response.job_vacancy.company.nama_HRD);
          $$('#province').val(response.job_vacancy.company.province.name);
          $$('#city').val(response.job_vacancy.company.city.name);
          $$('#district').val(response.job_vacancy.company.district.name);
          $$('#sub_district').val(response.job_vacancy.company.sub_district.name);
          $$('#address').val(response.job_vacancy.company.address);
          $$('#age').val(response.job_vacancy.age_min + ' - ' + response.job_vacancy.age_max + ' Tahun');
          $$('#salary').val('Rp. ' + toIdrFormat(response.job_vacancy.salary_from) + ' - Rp. ' + toIdrFormat(response.job_vacancy.salary_to));
          $$('#open').val((new Date(response.job_vacancy.open_until)).toMonthString());
          $$('#description').val(clear_regex_text(response.job_vacancy.description));
          $$('#requirement').val(clear_regex_text(response.job_vacancy.requirement));

          $$('#brochure').on('click', function () {
            cordova.InAppBrowser.open('https://siapkerja.sidoarjokab.go.id/storage/' + response.job_vacancy.brosur, '_blank', 'location=no');
          });

          if (response.lamaran?.id_lamaran) {
            $$('#card_requirement .card-header').html('Anda Sudah Pernah Melakukan Lamaran kepada Pekerjaan Ini.<br>Silakan Tunggu Kabar Lamaran Anda dari Perusahaan yang Bersangkutan.<br>Cek Detail Informasi Lamaran Anda di Aplikasi Siap Kerja.');
            $$('#input_requirement ul').html(`
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="row">
                      <a href="https://siapkerja.sidoarjokab.go.id" type="button" class="col-100 button button-raised button-fill external">Menuju ke Siap Kerja</a>
                    </div>
                  </div>
                </div>
              </li>
            `);
            $$('#upload_requirement ul').remove();
            $$('.save_button').remove();
          } else if (response.requirements && response.attachments) {
            app.request.post(`${site_url_mobile_layanan}/siap_kerja/get_kartu_pencari_kerja`, iamthedoor, function (result) {
              if (Array.isArray(result) && result.length) {
                var options = '';
                result.forEach(function (row) {
                  options += '<option value="' + row.id + '">' + row.kode_transaksi + '</option>';
                });
                $$('#id_kartu_pencari_kerja select').html(options);
                app.smartSelect.create({
                  el: '#id_kartu_pencari_kerja',
                });
              } else {
                $$('#card_requirement .card-header').removeClass('bg-color-green').addClass('bg-color-red').html('Anda Tidak Memiliki Pengajuan AK-I yang Masih Berlaku.<br>Mohon Buat Pengajuan Terlebih Dahulu.');
                $$('#input_requirement ul').html(`
                  <li class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-input-wrap">
                        <div class="row">
                          <a href="/tipe-c/kartupencarikerja_new/" type="button" class="col-100 button button-raised button-fill">Buat AK-I</a>
                        </div>
                      </div>
                    </div>
                  </li>
                `);
                $$('#upload_requirement ul').remove();
                $$('.save_button').remove();
              }
            }, 'json');

            let attachments_html = '';
            response.requirements.forEach(function (req) {
              var item = new Object();
              response.attachments.forEach(function (att) {
                if (att.requirement_id == req.id) {
                  item = att;
                  let array_name = item.file.split('/');
                  item.file_name = array_name[array_name.length - 1];
                }
              });

              attachments_html +=
                `<li class="item-content item-input">
                  <div class="item-inner">
                    <div class="row">
                      <div class="col-100">
                        <div class="item-inner">
                          <div class="item-input-wrap">
                            <input type="text" class="file_desc" name="file_desc[]" value="${req.name}" readonly>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="item-content item-input">
                  <div class="item-inner">
                    <div class="row">
                      <div class="col-60">
                        <div class="item-inner">
                          <div class="item-input-wrap">
                            <input type="text" id="file_name_${req.id}" value="${(item.file_name ?? '')}" placeholder="Nama File" readonly>
                            <input type="hidden" class="file_code" id="file_code_${req.id}" name="file_code[]">
                            <input type="hidden" class="file_req_id" name="file_req_id[]" value="${req.id}">
                          </div>
                        </div>
                      </div>
                      <div class="col-20">
                        <button type="button" class="button button-fill color-orange file_preview" id="file_preview_${req.id}" data-link="${(item.file?.length ? 'https://siapkerja.sidoarjokab.go.id/storage/' + item.file : '')}" style="display: ${(item.file?.length ? 'block' : 'none')}; margin-top: 10px;">
                          <i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">zoom_in</i>
                        </button>
                      </div>
                      <div class="col-20">
                        <button type="button" class="button button-fill file_upload" data-req_id="${req.id}" style="margin-top: 10px;">
                          <i class="f7-icons" style="font-size: 16pt; margin-top: 7px;">folder_fill</i>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                <hr>`;
              counter++;
            });
            $$('#upload_requirement ul').append(attachments_html);
            $$('#upload_requirement').on('click', '.file_preview', function () {
              if ($$(this).data('link')?.length) {
                cordova.InAppBrowser.open($$(this).data('link'), '_blank', 'location=no');
              }
            });
            $$('#upload_requirement').on('click', '.file_upload', function () {
              var req_id = $$(this).data('req_id');
              Attachment.openGallery({
                onSuccess: function (fileURL, fileName) {
                  let params = { subdir: 'lamaran_kerja' };
                  Attachment.upload(fileURL, fileName, params, function (success) {
                    // let upload = JSON.parse(success.response);
                    let upload = JSON.parse(success.data);
                    $$('#file_name_' + req_id).val(upload[0].file_actual);
                    $$('#file_code_' + req_id).val(upload[0].code);
                    $$('#file_preview_' + req_id).data('link', base_url + '/file/get_file/' + upload[0]['file_actual']);
                    $$('#file_preview_' + req_id).show();
                  });
                },
              });
            });
          } else {
            $$('#card_requirement .card-header').removeClass('bg-color-green').addClass('bg-color-red').html('Anda Belum Dapat Melakukan Lamaran Pekerjaan, Karna Akun Sipraja Anda Belum Terhubung Dengan Aplikasi Siap Kerja.<br>Segera Lakukan Sinkronisasi.');
            $$('#input_requirement ul').html(`
              <li class="item-content item-input">
                <div class="item-inner">
                  <div class="item-input-wrap">
                    <div class="row">
                      <a href="/change_pass/" type="button" class="col-100 button button-raised button-fill">Sinkronisasi Profile</a>
                    </div>
                  </div>
                </div>
              </li>
            `);
            $$('#upload_requirement ul').remove();
            $$('.save_button').remove();
          }
        } else {
          $$('#card_lowongan .card-header').removeClass('bg-color-green').addClass('bg-color-red').text('Lowongan Tidak Dapat Ditemukan');
          $$('#card_lowongan ul').empty();
          $$('#card_requirement ul').remove();
          $$('.save_button').remove();
        }
      }, 'json');

      $$('#save').on('click', function () {
        if ($$('#id_kartu_pencari_kerja select').val()?.length == 0) {
          app.dialog.alert('Mohon Pilih AK-I Terlebih Dahulu');
          return false;
        }

        if ($$('#keterangan').val()?.length == 0) {
          app.dialog.alert('Mohon Lengkapi Keterangan Lamaran');
          return false;
        }

        app.dialog.preloader('Mohon Tunggu Sebentar...');
        let form_data = app.form.convertToData('#form_lowongan');
        let file_req_id = new Array();
        $('.file_req_id').each((i, el) => file_req_id.push(el.value));
        let file_code = new Array();
        $('.file_code').each((i, el) => file_code.push(el.value));
        let file_desc = new Array();
        $('.file_desc').each((i, el) => file_desc.push(el.value));

        let data_lowongan = {
          user_data: iamthedoor,
          form_data: form_data,
          file_req_id: file_req_id,
          file_code: file_code,
          file_desc: file_desc,
        };
        app.request.post(site_url_mobile_layanan + '/siap_kerja/lamar_lowongan/' + id, data_lowongan, function (response) {
          app.dialog.close();
          if (response.error) {
            app.dialog.alert(response.error);
          } else if (response.success?.id) {
            app.dialog.alert('Lamaran Pekerjaan Anda Berhasil Diajukan melalui Aplikasi Siap Kerja, Silakan Tunggu Kabar Lamaran Anda dari Perusahaan yang Bersangkutan.', function () {
              mainView.router.back('/tipe-d/disnaker/cek_lowongan/', { force: true, ignoreCache: true });
            });
          } else {
            app.dialog.alert('Terjadi Kesalahan, Mohon Coba Kembali Lagi Nanti');
          }
        }, function () {
          app.dialog.close();
          app.dialog.alert('Terjadi Kesalahan, Mohon Coba Kembali Lagi Nanti');
        }, 'json');
      });
    },
  }
};