
var cek_lowongan = {
  path: '/tipe-d/disnaker/cek_lowongan/',
  url: './pages/tipe-d/disnaker/cek_lowongan.html',
  name: 'cek_lowongan',
  on: {
    pageInit: function () {
      app.dialog.preloader('Mohon Tunggu Sebentar...');
      app.request.get(`${site_url_mobile_layanan}/user_support/siap_kerja_job_vacancy`, function (result) {
        app.dialog.close();
        var lowongan_table = $('#lowongan_table').DataTable({
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
            $$('#lowongan_table_length').hide();
            $$('#lowongan_table_filter').hide();
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

        $('#lowongan_table').on('click', '.brochure', function () {
          cordova.InAppBrowser.open('https://siapkerja.sidoarjokab.go.id/storage/' + $(this).data('storage'), '_blank', 'location=no');
        });
      }, 'json');
    },
  }
};

var detail_lowongan = {
  path: '/tipe-d/disnaker/detail_lowongan/:id/',
  url: './pages/tipe-d/disnaker/detail_lowongan.html',
  name: 'detail_lowongan',
  on: {
    pageInit: function () {
      var id = mainView.router.currentRoute.params.id;
      app.dialog.preloader('Mohon Tunggu Sebentar...');
      const query = new URLSearchParams({
        id: id
      }).toString();
      app.request.get(`${site_url_mobile_layanan}/user_support/siap_kerja_job_vacancy?${query}`, function (result) {
        app.dialog.close();
        var item = {};
        result.forEach(function (row) {
          if (row.id == id) {
            item = row;
          }
        });
        $$('#lowongan_card .card-header').html('Posisi: ' + item.position_name);
        var content = `
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-input-wrap">
              <div class="item-title item-label">Nama Perusahaan</div>
              <input type="text" value="${item.company.company_name}" readonly>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-input-wrap">
              <div class="item-title item-label">Nama HRD</div>
              <input type="text" value="${item.company.nama_HRD}" readonly>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-input-wrap">
              <div class="item-title item-label">Provinsi</div>
              <input type="text" value="${item.company.province.name}" readonly>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-input-wrap">
              <div class="item-title item-label">Kota/Kabupaten</div>
              <input type="text" value="${item.company.city.name}" readonly>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-input-wrap">
              <div class="item-title item-label">Kecamatan</div>
              <input type="text" value="${item.company.district.name}" readonly>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-input-wrap">
              <div class="item-title item-label">Kelurahan</div>
              <input type="text" value="${item.company.sub_district.name}" readonly>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-input-wrap">
              <div class="item-title item-label">Alamat</div>
              <input type="text" value="${item.company.address}" readonly>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-input-wrap">
              <div class="item-title item-label">Upah</div>
              <input type="text" value="Rp ${toIdrFormat(item.salary_from)} - Rp ${toIdrFormat(item.salary_to)}" readonly>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-input-wrap">
              <div class="item-title item-label">Buka Sampai</div>
              <input type="text" value="${(new Date(item.open_until)).toDateIndoFormat()}" readonly>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-input-wrap">
              <div class="item-title item-label">Deskripsi Pekerjaan</div>
              <textarea readonly style="height: 200px !important">${item.description
            .replace(/<br>/g, "\n").replace(/<span>/g, "").replace(/<\/span>/g, "")
            .replace(/<b>/g, "").replace(/<\/b>/g, "")
            .replace(/<i>/g, "").replace(/<\/i>/g, "")
            .replace(/<u>/g, "").replace(/<\/u>/g, "")
            .replace(/<\/div><div>/g, "\n").replace(/<div>/g, "").replace(/<\/div>/g, "")
            .replace(/<ol>/g, "").replace(/<\/ol>/g, "")
            .replace(/<ul>/g, "").replace(/<\/ul>/g, "")
            .replace(/<\/li><li>/g, "\n").replace(/<li>/g, "\n").replace(/<\/li>/g, "\n")
          }</textarea>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-input-wrap">
              <div class="item-title item-label">Persyaratan</div>
              <textarea readonly style="height: 200px !important">${item.requirement
            .replace(/<br>/g, "\n").replace(/<span>/g, "").replace(/<\/span>/g, "")
            .replace(/<b>/g, "").replace(/<\/b>/g, "")
            .replace(/<i>/g, "").replace(/<\/i>/g, "")
            .replace(/<u>/g, "").replace(/<\/u>/g, "")
            .replace(/<\/div><div>/g, "\n").replace(/<div>/g, "").replace(/<\/div>/g, "")
            .replace(/<ol>/g, "").replace(/<\/ol>/g, "")
            .replace(/<ul>/g, "").replace(/<\/ul>/g, "")
            .replace(/<\/li><li>/g, "\n").replace(/<li>/g, "\n").replace(/<\/li>/g, "\n")
          }</textarea>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-input-wrap">
              <button type="button" class="button button-raised button-fill" id="brochure">Brosur</button>
            </div>
          </div>
        </li>`;
        $$('#lowongan_card ul').html(content);
        $('#brochure').on('click', function () {
          cordova.InAppBrowser.open('https://siapkerja.sidoarjokab.go.id/storage/' + item.brosur, '_blank', 'location=no');
        });
      }, 'json');
    },
  }
};

var jenis_usaha = {
  path: '/tipe-d/disnaker/buka_lowongan/',
  url: './pages/tipe-d/disnaker/buka_lowongan.html',
  name: 'buka_lowongan',
  on: {
    pageInit: function () {
      app.dialog.preloader('Mohon Tunggu Sebentar...');
      var datatables = $('#buka_lowongan').DataTable({
        serverSide: true,
        ajax: {
          url: site_url_mobile_layanan + '/buka_lowongan/get_usaha_toko',
          data: iamthedoor,
          type: 'GET'
        },
        columns: [
          { data: 'id' },
          { data: 'nama_usaha' },
          { data: 'kelembagaan' },
          { data: 'nib' },
          { data: 'jenis_usaha' },
          { data: 'id' },
        ],
        initComplete: function (settings, json) {
          app.dialog.close();
          if (json.recordsTotal < 1) {
            app.dialog.confirm('Anda belum memiliki Perusahaan / Usaha Yang terdaftar.' + "\n" + 'Apakah anda yakin untuk mendaftarkan Perusahaan / Usaha anda?', function () {
              mainView.router.navigate('/tipe-d/dinas_koperasi/umkm_new/');
            });
          }
        },
        rowCallback: function (row, data) {
          $('td:eq(0)', row).html('<a href="/tipe-d/disnaker/list_lowongan/' + data.company_id + '" class="button button-small button-fill color-green">' +
            '<i class="icon f7-icons" style="font-size: 12pt;">zoom_in</i> Buka Lowongan</a>');
          if (data.singkron_umkm == '0') {
            $("td:eq(5)", row).html('<button type="submit" class="button button-fill color-blue singkron" data-id="' + data.id + '">' + '<i class="icon f7-icons" style="font-size: 12pt;">arrow_clockwise_circle_fill</i> Sinkronisasi UMKM</button>');
          } else {
            $('td:eq(5)', row).html('<a href="" class="button button-small button-fill color-blue">' +
              '<i class="icon f7-icons">checkmark_alt_circle</i></a>');
          }
        }
      });
      $("#buka_lowongan").on("click", ".singkron", function () {
        var id = $(this).data("id");
        app.dialog.confirm("Apakah anda ingin sinkronisasi ke umkm?", function () {
          app.request.get(site_url_mobile_layanan + "/buka_lowongan/get_singkron/" + id, iamthedoor, function (data) {
            var ajax_data = [];
            ajax_data.push(iamthedoor);
            ajax_data.push(data);
            app.request.post(site_url_mobile_layanan + "/buka_lowongan/save_singkron/" + id, ajax_data, function (data) {
              // $$("#perpanjangan").html(data);
            }, "json");
          }, "json");
          app.dialog.alert("Data anda sudah disingkron ke umkm.");
          mainView.router.back();
          $("#buka_lowongan").DataTable().ajax.reload();
        });
      });
    },
  }
}

var list_lowongan = {
  path: '/tipe-d/disnaker/list_lowongan/:company_id',
  url: './pages/tipe-d/disnaker/list_lowongan.html',
  name: 'list_lowongan',
  on: {
    pageInit: function () {
      var company_id = mainView.router.currentRoute.params.company_id;
      $$("#newlowongan").attr("href", "/tipe-d/disnaker/new_lowongan/" + company_id);
      app.dialog.preloader('Mohon Tunggu Sebentar...');
      $('#list_lowongan').DataTable({
        serverSide: true,
        ajax: {
          url: site_url_mobile_layanan + '/buka_lowongan/list_lowongan/' + company_id,
          data: iamthedoor,
          type: 'GET'
        },
        columns: [
          { data: 'id' },
          { data: 'position_name' },
          { data: 'category_ket' },
          { data: 'sub_category_ket' },
          { data: 'salary_from' },
          { data: 'open_until' },
          { data: 'age_min' },
        ],
        initComplete: function (settings, json) {
          app.dialog.close();
          $$('#datatables_length').hide();
          $$('#datatables_filter').hide();
        },
        rowCallback: function (row, data) {
          $('td:eq(6)', row).html(+ data.age_min + ' - ' + data.age_max + ' thn');

          $('td:eq(4)', row).html('Rp ' + toIdrFormat(data.salary_from) + ' - Rp ' + toIdrFormat(data.salary_to) + '');

          $('td:eq(0)', row).html('<a href="/tipe-d/disnaker/detail_lowongan_pekerjaan/' + data.id + '/' + data.company_id + '" class="button button-small button-fill color-green">' +
            '<i class="icon f7-icons" style="font-size: 12pt;">zoom_in</i> Detail Lowongan</a>');
        }
      });
    },
  }
}

var new_lowongan = {
  path: '/tipe-d/disnaker/new_lowongan/:company_id',
  url: './pages/tipe-d/disnaker/new_lowongan.html',
  name: 'new_lowongan',
  on: {
    pageInit: function () {
      var company_id = mainView.router.currentRoute.params.company_id;
      app.request.post(site_url_mobile_layanan + '/buka_lowongan/get_data_usaha/' + company_id, iamthedoor, function (data) {
        $$('#nib').val(data.data.nib);
        $$('#tgl_terbit').val(data.data.tgl_terbit_ijin_usaha);
        $$('#nama_perusahaan').val(data.data.nama_usaha);
        $$('#tgl_berdiri').val(data.data.tgl_berdiri);
        $$('#kelembagaan').val(data.data.kelembagaan);
        $$('#jenis_usaha').val(data.data.jenis_usaha);
        $$('#tahun_pendataan').val(data.data.tahun_pendataan);
        $$('#no_hp').val(data.data.telp);
        $$('#alamat').val(data.data.alamat_usaha);
        var kategori = '';
        data.kategori.forEach(function (item, index) {
          kategori += '<option value="' + item.id + '">' + item.name + '</option>';
          $$('#category').html(kategori);
        });
        var pendidikan = '';
        data.pendidikan.forEach(function (item, index) {
          pendidikan += '<option value="' + item.id + '">' + item.name + '</option>';
          $$('#educational_type_id').html(pendidikan);
        });
      }, 'json');

      $$('#category').on('change', function () {
        var category_id = $('#category').val();
        app.request.post(site_url_mobile_layanan + '/buka_lowongan/get_sub_kategori/' + category_id, iamthedoor, function (response) {
          var option = '<option selected>Pilih Kategori</option>';
          response.forEach(function (val, index) {
            option += '<option value="' + val.id + '">' + val.name + '</option>';
          });
          $('#sub_category').html(option).trigger('chosen:updated');
        }, 'json');
      });

      $('#educational_type_id').on('change', function () {
        var pendidikan_id = $('#educational_type_id').val();
        app.request.post(site_url_mobile_layanan + '/buka_lowongan/get_jurusan/' + pendidikan_id, iamthedoor, function (response) {
          var option = '';
          option += '<option selected>Pilih Pendidikan</option>';
          response.forEach(function (val, index) {
            option += '<option value="' + val.id + '">' + val.name + '</option>';
          });
          $('#educational_major_id').html(option).trigger('chosen:updated');
        }, 'json');
      })

      $$('#simpan').on('click', function () {
        app.input.validateInputs("#new_lowongan");
        if ($$('#new_lowongan')[0].checkValidity() == true) {
          let mydata = app.form.convertToData("#new_lowongan");
          let ajaxdata = new Array();

          ajaxdata.push(iamthedoor);
          ajaxdata.push(mydata);
          ajaxdata.push(company_id);
          app.dialog.preloader('Loading...');
          app.request.post(site_url_mobile_layanan + '/buka_lowongan/create_lowongan', ajaxdata, function (data) {
          }, 'json')
          app.dialog.close()
          app.dialog.alert('Data berhasil disimpan')
          mainView.router.back();
          $('#list_lowongan').DataTable().ajax.reload();
        }
      })
    }
  }
};

var detail_lowongan_pekerjaan = {
  path: '/tipe-d/disnaker/detail_lowongan_pekerjaan/:id/:company_id',
  url: './pages/tipe-d/disnaker/detail_lowongan_pekerjaan.html',
  name: 'detail_lowongan_pekerjaan',
  on: {
    pageInit: function () {
      var id = mainView.router.currentRoute.params.id;
      var company_id = mainView.router.currentRoute.params.company_id;
      app.request.post(site_url_mobile_layanan + '/buka_lowongan/detail_lowongan/' + id + '/' + company_id, iamthedoor, function (data) {
        $$('#nib').val(data.nib);
        $$('#tgl_terbit').val(data.tgl_terbit_ijin_usaha);
        $$('#nama_perusahaan').val(data.nama_usaha);
        $$('#tgl_berdiri').val(data.tgl_berdiri);
        $$('#kelembagaan').val(data.kelembagaan);
        $$('#jenis_usaha').val(data.jenis_usaha);
        $$('#tahun_pendataan').val(data.tahun_pendataan);
        $$('#no_hp').val(data.telp);
        $$('#alamat').val(data.alamat_usaha);
        $$('#tgl_berdiri').val(data.tgl_berdiri);
        $$('#position_name').val(data.position_name);
        $$('#category').val(data.category);
        $$('#sub_category').val(data.sub_category);
        $$('#salary_from').val(data.salary_from);
        $$('#salary_to').val(data.salary_to);
        $$('#open_until').val(data.open_until);
        $$('#total_requirement').val(data.total_requirement);
        $$('#age_min').val(data.age_min);
        $$('#age_max').val(data.age_max);
        $$('#educational_type_id').val(data.educational_type_id);
        $$('#educational_major_id').val(data.educational_major_id);
        $$('#description').html(data.description);
        $$('#requirement').html(data.requirement);
      }, 'json');

    }
  }
};
