var new_daftar_pasang_baru_pdam = {
    path: '/tipe-d/pdam/new_daftar_pasang_baru_pdam/',
    url: './pages/tipe-d/pdam/new_daftar_pasang_baru.html',
    name: 'new_daftar_pasang_baru',
    on: {
        pageInit: function () {
            $$('#btnnew').hide();
            if (datauser.role_id == '4') {
                $$('#btnnew').show();
            }

            app.dialog.preloader('Loading...')
            $$('#nik_pemohon').val(datauser.nik);
            $$('#nama_pemohon').val(datauser.nama);
            $$('#tempat_lahir').val(datauser.tempat_lahir);
            $$('#tanggal_lahir').val(new Date(datauser.tanggal_lahir).toDateIndoFormat());
            $$('#jenis_kelamin').val(datauser.jenis_kelamin);
            $$('#telepon').val(datauser.no_telp_pendaftar);
            $$('#kecamatan').val(datauser.nama_kec);
            $$('#kelurahan').val(datauser.nama_kel);
            $$('#email').val(datauser.email);
            $$('#alamat').val(datauser.alamat);
            $$('#nama_pemohon').val(datauser.nama);
            dataAlamat = {
                kecamatan: datauser.kecamatan,
                kelurahan: datauser.kode_desa,
            }
            let data = [iamthedoor, dataAlamat]
            app.request.post(`${site_url_mobile_layanan}/daftar_pasang_baru_pdam/kecamatanKelurahan`, data, function (data) {
                app.dialog.close()
                $$('#id_kec').val(data.kecamatan);
                $$('#id_kel').val(data.kelurahan);

            }, function () {
                app.dialog.close()
                app.dialog.alert('Data gagal diterapkan')
            }, 'json')
            $$('#simpan').on('click', function () {
                app.input.validateInputs('#new_daftar_pasang_baru');
                if ($$('#new_daftar_pasang_baru')[0].checkValidity() == true) {
                    let form_data = app.form.convertToData('#new_daftar_pasang_baru');
                    form_data.id_pemohon = iamthedoor.user_id;
                    let ajax_data = new Array();
                    ajax_data.push(iamthedoor);
                    ajax_data.push(form_data);
                    app.dialog.preloader('Loading...');
                    app.request.post(site_url_mobile_layanan + '/daftar_pasang_baru_pdam/create', ajax_data, function (callback) {
                        if (callback) {
                            app.dialog.close();
                            app.dialog.alert(callback.msg);
                            mainView.router.back();
                            $('#datatables').DataTable().ajax.reload();
                        }
                    }, function () {
                        app.dialog.close();
                        app.dialog.alert('Data Gagal Diajukan, Mohon Coba Lagi Nanti');
                    }, 'json');
                }

            });

        }
    }
}