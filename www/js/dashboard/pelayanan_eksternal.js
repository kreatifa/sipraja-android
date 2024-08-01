var eksternal_kejaksaan_chat = {
    name: 'eksternal_kejaksaan_chat',
    path: '/pelayanan_eksternal/kejaksaan_negeri/chat',
    url: './pages/dashboard/eksternal_kejaksaan_chat.html',
    options: {
        transition: 'f7-parallax',
    },
    on: {
        pageInit: function () {
            app.dialog.preloader('Loading...');
            var datatables = $('#datatables').DataTable({
                ajax: {
                    url: site_url_mobile + '/dashboard_mobile/eksternal_kejaksaan_negeri/count_chat',
                    data: [iamthedoor],
                    type: 'POST'
                },
                columns: [
                    { data: 'nama' },
                    { data: 'jumlah' },
                    { data: 'pidana' },
                    { data: 'perdata' },
                ],
                searching: false,
                paging: false,
                ordering: false,
                info: false,
                initComplete: function (settings, json) {
                    app.dialog.close();
                    $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
                },
                rowCallback: function (row, data) {
                }
            });
            app.request.post(site_url_mobile + '/dashboard_mobile/eksternal_kejaksaan_negeri/kecamatan_kelurahan', iamthedoor, function (response) {
                var list_kecamatan = '<option value="000">SEMUA</option>';

                response.kecamatan.forEach(function (value, index) {
                    list_kecamatan += '<option value="' + value.kode + '">' + value.nama + '</option>';
                });
                $$('#kecamatan_chat').html(list_kecamatan).change();
            }, 'json');

            $$('#kecamatan_chat').on('change', function () {
                var list_kelurahan = '';
                if ($$(this).val() != '000') {
                    app.dialog.preloader('Loading...');
                    app.request.post(site_url_mobile + '/dashboard_mobile/eksternal_kejaksaan_negeri/kelurahan/' + $$('#kecamatan_chat').val(), iamthedoor, function (response) {
                        app.dialog.close();
                        if (response.status) {
                            response.kelurahan.forEach(function (value, index) {
                                list_kelurahan += '<option value="' + value.kode + '">' + value.nama + '</option>';
                            });
                        }
                        $$('#kelurahan_chat').html(list_kelurahan).change();
                    }, 'json');
                } else {
                    list_kelurahan += '<option value=""> - </option>'
                    $$('#kelurahan_chat').html(list_kelurahan).change();
                }
            });

            $$('#cari_data_chat').on('click', function () {
                var post = {
                    'kecamatan': $$('#kecamatan_chat').val(),
                    'kelurahan': $$('#kelurahan_chat').val()
                }
                datatables.context[0].ajax.data = [iamthedoor, post];
                app.dialog.preloader('Loading...');
                $('#datatables').DataTable().ajax.reload(function (json) {
                    if (json.data) {
                        app.dialog.close();
                        let header = "KECAMATAN";
                        if (post['kecamatan'] != '000') {
                            header = "KELURAHAN";
                        }
                        $('th:first').text(header);
                        $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
                    } else {
                        app.dialog.close();
                        app.dialog.alert('Data tidak dapat ditemukan');
                    }
                });
            });

        }
    }
}

var eksternal_kejaksaan_sibotas = {
    name: 'eksternal_kejaksaan_sibotas',
    path: '/pelayanan_eksternal/kejaksaan_negeri/:tipe',
    url: './pages/dashboard/eksternal_kejaksaan_sibotas.html',
    options: {
        transition: 'f7-parallax',
    },
    on: {
        pageInit: function () {
            app.calendar.create({
                inputEl: '#tanggal',
                openIn: 'customModal',
                dateFormat: 'dd-mm-yyyy',
                header: true, footer: true, rangePicker: true
            });
            $$('#tanggal').val(`${get_today_date()} - ${get_today_date()}`)
            var tipe = mainView.router.currentRoute.params.tipe;
            $$('#title').text(tipe.toUpperCase());
            app.dialog.preloader('Loading...');
            var datatables = $('#datatables').DataTable({
                ajax: {
                    url: site_url_mobile + '/dashboard_mobile/eksternal_kejaksaan_negeri/count_sibotas',
                    data: [iamthedoor, { 'tipe': tipe, 'tanggal': $$('#tanggal').val() }],
                    type: 'POST'
                },
                columns: [
                    { data: 'nama' },
                    { data: 'jumlah' },
                    { data: 'laki' },
                    { data: 'perempuan' },
                ],
                searching: false,
                paging: false,
                ordering: false,
                info: false,
                initComplete: function (settings, json) {
                    app.dialog.close();
                    $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
                },
                rowCallback: function (row, data) {
                }
            });
            app.request.post(site_url_mobile + '/dashboard_mobile/eksternal_kejaksaan_negeri/kecamatan_kelurahan', iamthedoor, function (response) {
                var list_kecamatan = '<option value="000">SEMUA</option>';

                response.kecamatan.forEach(function (value, index) {
                    list_kecamatan += '<option value="' + value.kode + '">' + value.nama + '</option>';
                });
                $$('#kecamatan_sibotas').html(list_kecamatan).change();
            }, 'json');

            $$('#kecamatan_sibotas').on('change', function () {
                var list_kelurahan = '';
                if ($$(this).val() != '000') {
                    app.dialog.preloader('Loading...');
                    app.request.post(site_url_mobile + '/dashboard_mobile/eksternal_kejaksaan_negeri/kelurahan/' + $$('#kecamatan_sibotas').val(), iamthedoor, function (response) {
                        app.dialog.close();
                        if (response.status) {
                            response.kelurahan.forEach(function (value, index) {
                                list_kelurahan += '<option value="' + value.kode + '">' + value.nama + '</option>';
                            });
                        }
                        $$('#kelurahan_sibotas').html(list_kelurahan).change();
                    }, 'json');
                } else {
                    list_kelurahan += '<option value=""> - </option>'
                    $$('#kelurahan_sibotas').html(list_kelurahan).change();
                }
            });

            $$('#cari_data_sibotas').on('click', function () {
                var post = {
                    'kecamatan': $$('#kecamatan_sibotas').val(),
                    'kelurahan': $$('#kelurahan_sibotas').val(),
                    'tanggal': $$('#tanggal').val(),
                    'tipe': tipe
                }
                if (post['tanggal'].split('-').length <= 3) {
                    app.dialog.alert('Mohon pilih tanggal yang sesuai');
                    return false
                }
                datatables.context[0].ajax.data = [iamthedoor, post];
                app.dialog.preloader('Loading...');
                $('#datatables').DataTable().ajax.reload(function (json) {
                    if (json.data) {
                        app.dialog.close();
                        let header = "KECAMATAN";
                        if (post['kecamatan'] != '000') {
                            header = "KELURAHAN";
                        }
                        $('th:first').text(header);
                        $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
                    } else {
                        app.dialog.close();
                        app.dialog.alert('Data tidak dapat ditemukan');
                    }
                });
            });

        }
    }
}

var external_sibojo = {
    name: 'external_sibojo',
    path: '/pelayanan_eksternal/sibojo',
    url: './pages/dashboard/external_sibojo.html',
    options: {
      transition: 'f7-parallax',
    },
    on: {
      pageInit: function () {
        var chart_layout = { barmode: 'stack', bargroupgap: 0.1, height: 250, margin: { t: 10, b: 65, l: 30, r: 30 }, paper_bgcolor: 'rgba(0, 0, 0, 0)', yaxis: { fixedrange: true }, xaxis: { tickangle: -90 }, legend: { x: 0, y: 1.0, orientation: 'h' } };
        var chart_config = { responsive: true, displaylogo: false, displayModeBar: false };
        app.calendar.create({
            inputEl: '#tanggal_external_sibojo',
            openIn: 'customModal',
            dateFormat: 'dd-mm-yyyy',
            header: true, footer: true, rangePicker: true
        });

        $$('#tanggal_external_sibojo').val(`${get_today_date()} - ${get_today_date()}`)
        app.dialog.preloader('Loading...');
        var datatables = $('#datatables').DataTable({
            ajax: {
                url: site_url_mobile + '/dashboard_mobile/pelayanan_external/external_sibojo',
                data: [iamthedoor, { 'tanggal': $$('#tanggal_external_sibojo').val() }],
                type: 'POST'
            },
            columns: [
                { data: 'nama' },
                { data: 'jumlah' },
                { data: 'laki' },
                { data: 'perempuan' },
                { data: 'proses' },
                { data: 'selesai' },
            ],
            searching: false,
            paging: false,
            ordering: false,
            info: false,
            initComplete: function (settings, json) {
                app.dialog.close();
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            },
            rowCallback: function (row, data) {
            }
        });

        app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kecamatan_kelurahan', iamthedoor, function (response) {
            var list_kecamatan = '<option value="000">SEMUA</option>';

            response.kecamatan.forEach(function (value, index) {
            list_kecamatan += '<option value="' + value.kode + '">' + value.nama + '</option>';
            });
            $$('#kecamatan_external_sibojo').html(list_kecamatan).change();
        }, 'json');

        $$('#kecamatan_external_sibojo').on('change', function () {
            var list_kelurahan = '';
            if ($$(this).val() != '000') {
            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kelurahan/' + $$('#kecamatan_external_sibojo').val(), iamthedoor, function (response) {
                app.dialog.close();
                if (response.status) {
                response.kelurahan.forEach(function (value, index) {
                    list_kelurahan += '<option value="' + value.kode + '">' + value.nama + '</option>';
                });
                }
                $$('#kelurahan_external_sibojo').html(list_kelurahan).change();
            }, 'json');
            } else {
            list_kelurahan += '<option value=""> - </option>'
            $$('#kelurahan_external_sibojo').html(list_kelurahan).change();
            }
        });

        $$('#cari_data_external_sibojo').on('click', function () {
            var post = {
                'tanggal': $$('#tanggal_external_sibojo').val(),
                'kecamatan': $$('#kecamatan_external_sibojo').val(),
                'kelurahan': $$('#kelurahan_external_sibojo').val()
            }
            if (post['tanggal'].split('-').length <= 3) {
                app.dialog.alert('Mohon pilih tanggal yang sesuai');
                return false
            }
            datatables.context[0].ajax.data = [iamthedoor, post];
            app.dialog.preloader('Loading...');
            $('#datatables').DataTable().ajax.reload(function (json) {
            if (json.data) {
                app.dialog.close();
                let header = "KECAMATAN";
                if (post['kecamatan'] != '000') {
                header = "KELURAHAN";
                }
                $('th:first').text(header);
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            } else {
                app.dialog.close();
                app.dialog.alert('Data tidak dapat ditemukan');
            }
            });
        });

        $$('#lihat_grafik_external_sibojo').on('click', function () {
            if (getDiffDate($$('#tanggal_external_sibojo').val(), 14)) {
                app.dialog.alert('Durasi tanggal yang dipilih tidak boleh melebihi 14 hari');
                return false;
            }

            var post = {
                'tanggal': $$('#tanggal_external_sibojo').val(),
                'kecamatan': $$('#kecamatan_external_sibojo').val(),
                'kelurahan': $$('#kelurahan_external_sibojo').val()
            }

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/grafik_sibojo', [iamthedoor, post], function (response) {
                app.dialog.close();
                var grafik1 = { x: [], y: [], name: 'Laki-Laki', type: 'bar' };
                var grafik2 = { x: [], y: [], name: 'Perempuan', type: 'bar' };
                var grafik3 = { x: [], y: [], name: 'Selesai', type: 'bar' };
                var grafik4 = { x: [], y: [], name: 'Proses', type: 'bar' };

                if (response.status) {
                    var jml_lk = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik1.x.push('.' + val.waktu_buat);
                        grafik1.y.push(val.jumlah_laki);
                        jml_lk = jml_lk + parseInt(val.jumlah_laki);
                    });
                    $$('#jml_lk').html(jml_lk);

                    var jml_pr = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik2.x.push('.' + val.waktu_buat);
                        grafik2.y.push(val.jumlah_perempuan);
                        jml_pr = jml_pr + parseInt(val.jumlah_perempuan);
                    });
                    $$('#jml_pr').html(jml_pr);

                    var jml_selesai = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik3.x.push('.' + val.waktu_buat);
                        grafik3.y.push(val.jumlah_selesai);
                        jml_selesai = jml_selesai + parseInt(val.jumlah_selesai);
                    });
                    $$('#jml_selesai').html(jml_selesai);
                    
                    var jml_proses = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik4.x.push('.' + val.waktu_buat);
                        grafik4.y.push(val.jumlah_proses);
                        jml_proses = jml_proses + parseInt(val.jumlah_proses);
                    });
                    $$('#jml_proses').html(jml_proses);
                }

                var chart_data = [grafik1, grafik2, grafik3, grafik4];
                Plotly.newPlot('chart_external_sibojo', chart_data, chart_layout, chart_config);
            }, 'json');
        });
      }
    }
}

var external_sipatas = {
    name: 'external_sipatas',
    path: '/pelayanan_eksternal/sipatas',
    url: './pages/dashboard/external_sipatas.html',
    options: {
      transition: 'f7-parallax',
    },
    on: {
      pageInit: function () {
        var chart_layout = { barmode: 'stack', bargroupgap: 0.1, height: 250, margin: { t: 10, b: 65, l: 30, r: 30 }, paper_bgcolor: 'rgba(0, 0, 0, 0)', yaxis: { fixedrange: true }, xaxis: { tickangle: -90 }, legend: { x: 0, y: 1.0, orientation: 'h' } };
        var chart_config = { responsive: true, displaylogo: false, displayModeBar: false };
        app.calendar.create({
            inputEl: '#tanggal_external_sipatas',
            openIn: 'customModal',
            dateFormat: 'dd-mm-yyyy',
            header: true, footer: true, rangePicker: true
        });

        $$('#tanggal_external_sipatas').val(`${get_today_date()} - ${get_today_date()}`)
        app.dialog.preloader('Loading...');
        var datatables = $('#datatables').DataTable({
            ajax: {
                url: site_url_mobile + '/dashboard_mobile/pelayanan_external/external_sipatas',
                data: [iamthedoor, { 'tanggal': $$('#tanggal_external_sipatas').val() }],
                type: 'POST'
            },
            columns: [
                { data: 'nama' },
                { data: 'jumlah' },
                { data: 'laki' },
                { data: 'perempuan' },
                { data: 'proses' },
                { data: 'selesai' },
            ],
            searching: false,
            paging: false,
            ordering: false,
            info: false,
            initComplete: function (settings, json) {
                app.dialog.close();
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            },
            rowCallback: function (row, data) {
            }
        });

        app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kecamatan_kelurahan', iamthedoor, function (response) {
            var list_kecamatan = '<option value="000">SEMUA</option>';

            response.kecamatan.forEach(function (value, index) {
            list_kecamatan += '<option value="' + value.kode + '">' + value.nama + '</option>';
            });
            $$('#kecamatan_external_sipatas').html(list_kecamatan).change();
        }, 'json');

        $$('#kecamatan_external_sipatas').on('change', function () {
            var list_kelurahan = '';
            if ($$(this).val() != '000') {
            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kelurahan/' + $$('#kecamatan_external_sipatas').val(), iamthedoor, function (response) {
                app.dialog.close();
                if (response.status) {
                response.kelurahan.forEach(function (value, index) {
                    list_kelurahan += '<option value="' + value.kode + '">' + value.nama + '</option>';
                });
                }
                $$('#kelurahan_external_sipatas').html(list_kelurahan).change();
            }, 'json');
            } else {
            list_kelurahan += '<option value=""> - </option>'
            $$('#kelurahan_external_sipatas').html(list_kelurahan).change();
            }
        });

        $$('#cari_data_external_sipatas').on('click', function () {
            var post = {
                'tanggal': $$('#tanggal_external_sipatas').val(),
                'kecamatan': $$('#kecamatan_external_sipatas').val(),
                'kelurahan': $$('#kelurahan_external_sipatas').val()
            }
            if (post['tanggal'].split('-').length <= 3) {
                app.dialog.alert('Mohon pilih tanggal yang sesuai');
                return false
            }
            datatables.context[0].ajax.data = [iamthedoor, post];
            app.dialog.preloader('Loading...');
            $('#datatables').DataTable().ajax.reload(function (json) {
            if (json.data) {
                app.dialog.close();
                let header = "KECAMATAN";
                if (post['kecamatan'] != '000') {
                header = "KELURAHAN";
                }
                $('th:first').text(header);
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            } else {
                app.dialog.close();
                app.dialog.alert('Data tidak dapat ditemukan');
            }
            });
        });

        $$('#lihat_grafik_external_sipatas').on('click', function () {
            if (getDiffDate($$('#tanggal_external_sipatas').val(), 14)) {
                app.dialog.alert('Durasi tanggal yang dipilih tidak boleh melebihi 14 hari');
                return false;
            }

            var post = {
                'tanggal': $$('#tanggal_external_sipatas').val(),
                'kecamatan': $$('#kecamatan_external_sipatas').val(),
                'kelurahan': $$('#kelurahan_external_sipatas').val()
            }

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/grafik_sipatas', [iamthedoor, post], function (response) {
                app.dialog.close();
                var grafik1 = { x: [], y: [], name: 'Laki-Laki', type: 'bar' };
                var grafik2 = { x: [], y: [], name: 'Perempuan', type: 'bar' };
                var grafik3 = { x: [], y: [], name: 'Selesai', type: 'bar' };
                var grafik4 = { x: [], y: [], name: 'Proses', type: 'bar' };

                if (response.status) {
                    var jml_lk = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik1.x.push('.' + val.waktu_buat);
                        grafik1.y.push(val.jumlah_laki);
                        jml_lk = jml_lk + parseInt(val.jumlah_laki);
                    });
                    $$('#jml_lk').html(jml_lk);

                    var jml_pr = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik2.x.push('.' + val.waktu_buat);
                        grafik2.y.push(val.jumlah_perempuan);
                        jml_pr = jml_pr + parseInt(val.jumlah_perempuan);
                    });
                    $$('#jml_pr').html(jml_pr);

                    var jml_selesai = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik3.x.push('.' + val.waktu_buat);
                        grafik3.y.push(val.jumlah_selesai);
                        jml_selesai = jml_selesai + parseInt(val.jumlah_selesai);
                    });
                    $$('#jml_selesai').html(jml_selesai);
                    
                    var jml_proses = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik4.x.push('.' + val.waktu_buat);
                        grafik4.y.push(val.jumlah_proses);
                        jml_proses = jml_proses + parseInt(val.jumlah_proses);
                    });
                    $$('#jml_proses').html(jml_proses);
                }

                var chart_data = [grafik1, grafik2, grafik3, grafik4];
                Plotly.newPlot('chart_external_sipatas', chart_data, chart_layout, chart_config);
            }, 'json');
        });
      }
    }
}

var external_kis = {
    name: 'external_kis',
    path: '/pelayanan_eksternal/kis',
    url: './pages/dashboard/external_kis.html',
    options: {
      transition: 'f7-parallax',
    },
    on: {
      pageInit: function () {
        var chart_layout = { barmode: 'stack', bargroupgap: 0.1, height: 250, margin: { t: 10, b: 65, l: 30, r: 30 }, paper_bgcolor: 'rgba(0, 0, 0, 0)', yaxis: { fixedrange: true }, xaxis: { tickangle: -90 }, legend: { x: 0, y: 1.0, orientation: 'h' } };
        var chart_config = { responsive: true, displaylogo: false, displayModeBar: false };
        app.calendar.create({
            inputEl: '#tanggal_external_kis',
            openIn: 'customModal',
            dateFormat: 'dd-mm-yyyy',
            header: true, footer: true, rangePicker: true
        });

        $$('#tanggal_external_kis').val(`${get_today_date()} - ${get_today_date()}`)
        app.dialog.preloader('Loading...');
        var datatables = $('#datatables').DataTable({
            ajax: {
                url: site_url_mobile + '/dashboard_mobile/pelayanan_external/external_kis',
                data: [iamthedoor, { 'tanggal': $$('#tanggal_external_kis').val() }],
                type: 'POST'
            },
            columns: [
                { data: 'nama' },
                { data: 'jumlah' },
                { data: 'laki' },
                { data: 'perempuan' },
            ],
            searching: false,
            paging: false,
            ordering: false,
            info: false,
            initComplete: function (settings, json) {
                app.dialog.close();
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            },
            rowCallback: function (row, data) {
            }
        });

        app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kecamatan_kelurahan', iamthedoor, function (response) {
            var list_kecamatan = '<option value="000">SEMUA</option>';

            response.kecamatan.forEach(function (value, index) {
            list_kecamatan += '<option value="' + value.kode + '">' + value.nama + '</option>';
            });
            $$('#kecamatan_external_kis').html(list_kecamatan).change();
        }, 'json');

        $$('#kecamatan_external_kis').on('change', function () {
            var list_kelurahan = '';
            if ($$(this).val() != '000') {
            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kelurahan/' + $$('#kecamatan_external_kis').val(), iamthedoor, function (response) {
                app.dialog.close();
                if (response.status) {
                response.kelurahan.forEach(function (value, index) {
                    list_kelurahan += '<option value="' + value.kode + '">' + value.nama + '</option>';
                });
                }
                $$('#kelurahan_external_kis').html(list_kelurahan).change();
            }, 'json');
            } else {
            list_kelurahan += '<option value=""> - </option>'
            $$('#kelurahan_external_kis').html(list_kelurahan).change();
            }
        });

        $$('#cari_data_external_kis').on('click', function () {
            var post = {
                'tanggal': $$('#tanggal_external_kis').val(),
                'kecamatan': $$('#kecamatan_external_kis').val(),
                'kelurahan': $$('#kelurahan_external_kis').val()
            }
            if (post['tanggal'].split('-').length <= 3) {
                app.dialog.alert('Mohon pilih tanggal yang sesuai');
                return false
            }
            datatables.context[0].ajax.data = [iamthedoor, post];
            app.dialog.preloader('Loading...');
            $('#datatables').DataTable().ajax.reload(function (json) {
            if (json.data) {
                app.dialog.close();
                let header = "KECAMATAN";
                if (post['kecamatan'] != '000') {
                header = "KELURAHAN";
                }
                $('th:first').text(header);
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            } else {
                app.dialog.close();
                app.dialog.alert('Data tidak dapat ditemukan');
            }
            });
        });

        $$('#lihat_grafik_external_kis').on('click', function () {
            if (getDiffDate($$('#tanggal_external_kis').val(), 14)) {
                app.dialog.alert('Durasi tanggal yang dipilih tidak boleh melebihi 14 hari');
                return false;
            }

            var post = {
                'tanggal': $$('#tanggal_external_kis').val(),
                'kecamatan': $$('#kecamatan_external_kis').val(),
                'kelurahan': $$('#kelurahan_external_kis').val()
            }

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/grafik_kis', [iamthedoor, post], function (response) {
                app.dialog.close();
                var grafik1 = { x: [], y: [], name: 'Laki-Laki', type: 'bar' };
                var grafik2 = { x: [], y: [], name: 'Perempuan', type: 'bar' };

                if (response.status) {
                    var jml_lk = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik1.x.push('.' + val.tgl_buat);
                        grafik1.y.push(val.jumlah_laki);
                        jml_lk = jml_lk + parseInt(val.jumlah_laki);
                    });
                    $$('#jml_lk').html(jml_lk);

                    var jml_pr = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik2.x.push('.' + val.tgl_buat);
                        grafik2.y.push(val.jumlah_perempuan);
                        jml_pr = jml_pr + parseInt(val.jumlah_perempuan);
                    });
                    $$('#jml_pr').html(jml_pr);
                }

                var chart_data = [grafik1, grafik2];
                Plotly.newPlot('chart_external_kis', chart_data, chart_layout, chart_config);
            }, 'json');
        });
      }
    }
}

var external_stp = {
    name: 'external_stp',
    path: '/pelayanan_eksternal/stp',
    url: './pages/dashboard/external_stp.html',
    options: {
      transition: 'f7-parallax',
    },
    on: {
      pageInit: function () {
        var chart_layout = { barmode: 'stack', bargroupgap: 0.1, height: 250, margin: { t: 10, b: 65, l: 30, r: 30 }, paper_bgcolor: 'rgba(0, 0, 0, 0)', yaxis: { fixedrange: true }, xaxis: { tickangle: -90 }, legend: { x: 0, y: 1.0, orientation: 'h' } };
        var chart_config = { responsive: true, displaylogo: false, displayModeBar: false };
        app.calendar.create({
            inputEl: '#tanggal_external_stp',
            openIn: 'customModal',
            dateFormat: 'dd-mm-yyyy',
            header: true, footer: true, rangePicker: true
        });

        $$('#tanggal_external_stp').val(`${get_today_date()} - ${get_today_date()}`)
        app.dialog.preloader('Loading...');
        var datatables = $('#datatables').DataTable({
            ajax: {
                url: site_url_mobile + '/dashboard_mobile/pelayanan_external/external_stp',
                data: [iamthedoor, { 'tanggal': $$('#tanggal_external_stp').val() }],
                type: 'POST'
            },
            columns: [
                { data: 'nama' },
                { data: 'jumlah' },
                { data: 'laki' },
                { data: 'perempuan' },
            ],
            searching: false,
            paging: false,
            ordering: false,
            info: false,
            initComplete: function (settings, json) {
                app.dialog.close();
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            },
            rowCallback: function (row, data) {
            }
        });

        app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kecamatan_kelurahan', iamthedoor, function (response) {
            var list_kecamatan = '<option value="000">SEMUA</option>';

            response.kecamatan.forEach(function (value, index) {
            list_kecamatan += '<option value="' + value.kode + '">' + value.nama + '</option>';
            });
            $$('#kecamatan_external_stp').html(list_kecamatan).change();
        }, 'json');

        $$('#kecamatan_external_stp').on('change', function () {
            var list_kelurahan = '';
            if ($$(this).val() != '000') {
            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kelurahan/' + $$('#kecamatan_external_stp').val(), iamthedoor, function (response) {
                app.dialog.close();
                if (response.status) {
                response.kelurahan.forEach(function (value, index) {
                    list_kelurahan += '<option value="' + value.kode + '">' + value.nama + '</option>';
                });
                }
                $$('#kelurahan_external_stp').html(list_kelurahan).change();
            }, 'json');
            } else {
            list_kelurahan += '<option value=""> - </option>'
            $$('#kelurahan_external_stp').html(list_kelurahan).change();
            }
        });

        $$('#cari_data_external_stp').on('click', function () {
            var post = {
                'tanggal': $$('#tanggal_external_stp').val(),
                'kecamatan': $$('#kecamatan_external_stp').val(),
                'kelurahan': $$('#kelurahan_external_stp').val()
            }
            if (post['tanggal'].split('-').length <= 3) {
                app.dialog.alert('Mohon pilih tanggal yang sesuai');
                return false
            }
            datatables.context[0].ajax.data = [iamthedoor, post];
            app.dialog.preloader('Loading...');
            $('#datatables').DataTable().ajax.reload(function (json) {
            if (json.data) {
                app.dialog.close();
                let header = "KECAMATAN";
                if (post['kecamatan'] != '000') {
                header = "KELURAHAN";
                }
                $('th:first').text(header);
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            } else {
                app.dialog.close();
                app.dialog.alert('Data tidak dapat ditemukan');
            }
            });
        });

        $$('#lihat_grafik_external_stp').on('click', function () {
            if (getDiffDate($$('#tanggal_external_stp').val(), 14)) {
                app.dialog.alert('Durasi tanggal yang dipilih tidak boleh melebihi 14 hari');
                return false;
            }

            var post = {
                'tanggal': $$('#tanggal_external_stp').val(),
                'kecamatan': $$('#kecamatan_external_stp').val(),
                'kelurahan': $$('#kelurahan_external_stp').val()
            }

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/grafik_stp', [iamthedoor, post], function (response) {
                app.dialog.close();
                var grafik1 = { x: [], y: [], name: 'Laki-Laki', type: 'bar' };
                var grafik2 = { x: [], y: [], name: 'Perempuan', type: 'bar' };

                if (response.status) {
                    var jml_lk = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik1.x.push('.' + val.tgl_buat);
                        grafik1.y.push(val.jumlah_laki);
                        jml_lk = jml_lk + parseInt(val.jumlah_laki);
                    });
                    $$('#jml_lk').html(jml_lk);

                    var jml_pr = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik2.x.push('.' + val.tgl_buat);
                        grafik2.y.push(val.jumlah_perempuan);
                        jml_pr = jml_pr + parseInt(val.jumlah_perempuan);
                    });
                    $$('#jml_pr').html(jml_pr);
                }

                var chart_data = [grafik1, grafik2];
                Plotly.newPlot('chart_external_stp', chart_data, chart_layout, chart_config);
            }, 'json');
        });
      }
    }
}

var external_rpa = {
    name: 'external_rpa',
    path: '/pelayanan_eksternal/rpa',
    url: './pages/dashboard/external_rpa.html',
    options: {
      transition: 'f7-parallax',
    },
    on: {
      pageInit: function () {
        var chart_layout = { barmode: 'stack', bargroupgap: 0.1, height: 250, margin: { t: 10, b: 65, l: 30, r: 30 }, paper_bgcolor: 'rgba(0, 0, 0, 0)', yaxis: { fixedrange: true }, xaxis: { tickangle: -90 }, legend: { x: 0, y: 1.0, orientation: 'h' } };
        var chart_config = { responsive: true, displaylogo: false, displayModeBar: false };
        app.calendar.create({
            inputEl: '#tanggal_external_rpa',
            openIn: 'customModal',
            dateFormat: 'dd-mm-yyyy',
            header: true, footer: true, rangePicker: true
        });

        $$('#tanggal_external_rpa').val(`${get_today_date()} - ${get_today_date()}`)
        app.dialog.preloader('Loading...');
        var datatables = $('#datatables').DataTable({
            ajax: {
                url: site_url_mobile + '/dashboard_mobile/pelayanan_external/external_rpa',
                data: [iamthedoor, { 'tanggal': $$('#tanggal_external_rpa').val() }],
                type: 'POST'
            },
            columns: [
                { data: 'nama' },
                { data: 'jumlah' },
                { data: 'laki' },
                { data: 'perempuan' },
            ],
            searching: false,
            paging: false,
            ordering: false,
            info: false,
            initComplete: function (settings, json) {
                app.dialog.close();
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            },
            rowCallback: function (row, data) {
            }
        });

        app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kecamatan_kelurahan', iamthedoor, function (response) {
            var list_kecamatan = '<option value="000">SEMUA</option>';

            response.kecamatan.forEach(function (value, index) {
            list_kecamatan += '<option value="' + value.kode + '">' + value.nama + '</option>';
            });
            $$('#kecamatan_external_rpa').html(list_kecamatan).change();
        }, 'json');

        $$('#kecamatan_external_rpa').on('change', function () {
            var list_kelurahan = '';
            if ($$(this).val() != '000') {
            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kelurahan/' + $$('#kecamatan_external_rpa').val(), iamthedoor, function (response) {
                app.dialog.close();
                if (response.status) {
                response.kelurahan.forEach(function (value, index) {
                    list_kelurahan += '<option value="' + value.kode + '">' + value.nama + '</option>';
                });
                }
                $$('#kelurahan_external_rpa').html(list_kelurahan).change();
            }, 'json');
            } else {
            list_kelurahan += '<option value=""> - </option>'
            $$('#kelurahan_external_rpa').html(list_kelurahan).change();
            }
        });

        $$('#cari_data_external_rpa').on('click', function () {
            var post = {
                'tanggal': $$('#tanggal_external_rpa').val(),
                'kecamatan': $$('#kecamatan_external_rpa').val(),
                'kelurahan': $$('#kelurahan_external_rpa').val()
            }
            if (post['tanggal'].split('-').length <= 3) {
                app.dialog.alert('Mohon pilih tanggal yang sesuai');
                return false
            }
            datatables.context[0].ajax.data = [iamthedoor, post];
            app.dialog.preloader('Loading...');
            $('#datatables').DataTable().ajax.reload(function (json) {
            if (json.data) {
                app.dialog.close();
                let header = "KECAMATAN";
                if (post['kecamatan'] != '000') {
                header = "KELURAHAN";
                }
                $('th:first').text(header);
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            } else {
                app.dialog.close();
                app.dialog.alert('Data tidak dapat ditemukan');
            }
            });
        });

        $$('#lihat_grafik_external_rpa').on('click', function () {
            if (getDiffDate($$('#tanggal_external_rpa').val(), 14)) {
                app.dialog.alert('Durasi tanggal yang dipilih tidak boleh melebihi 14 hari');
                return false;
            }

            var post = {
                'tanggal': $$('#tanggal_external_rpa').val(),
                'kecamatan': $$('#kecamatan_external_rpa').val(),
                'kelurahan': $$('#kelurahan_external_rpa').val()
            }

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/grafik_rpa', [iamthedoor, post], function (response) {
                app.dialog.close();
                var grafik1 = { x: [], y: [], name: 'Laki-Laki', type: 'bar' };
                var grafik2 = { x: [], y: [], name: 'Perempuan', type: 'bar' };

                if (response.status) {
                    var jml_lk = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik1.x.push('.' + val.tgl_buat);
                        grafik1.y.push(val.jumlah_laki);
                        jml_lk = jml_lk + parseInt(val.jumlah_laki);
                    });
                    $$('#jml_lk').html(jml_lk);

                    var jml_pr = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik2.x.push('.' + val.tgl_buat);
                        grafik2.y.push(val.jumlah_perempuan);
                        jml_pr = jml_pr + parseInt(val.jumlah_perempuan);
                    });
                    $$('#jml_pr').html(jml_pr);
                }

                var chart_data = [grafik1, grafik2];
                Plotly.newPlot('chart_external_rpa', chart_data, chart_layout, chart_config);
            }, 'json');
        });
      }
    }
}

var external_kpk = {
    name: 'external_kpk',
    path: '/pelayanan_eksternal/kpk',
    url: './pages/dashboard/external_kpk.html',
    options: {
      transition: 'f7-parallax',
    },
    on: {
      pageInit: function () {
        var chart_layout = { barmode: 'stack', bargroupgap: 0.1, height: 250, margin: { t: 10, b: 65, l: 30, r: 30 }, paper_bgcolor: 'rgba(0, 0, 0, 0)', yaxis: { fixedrange: true }, xaxis: { tickangle: -90 }, legend: { x: 0, y: 1.0, orientation: 'h' } };
        var chart_config = { responsive: true, displaylogo: false, displayModeBar: false };
        app.calendar.create({
            inputEl: '#tanggal_external_kpk',
            openIn: 'customModal',
            dateFormat: 'dd-mm-yyyy',
            header: true, footer: true, rangePicker: true
        });

        $$('#tanggal_external_kpk').val(`${get_today_date()} - ${get_today_date()}`)
        app.dialog.preloader('Loading...');
        var datatables = $('#datatables').DataTable({
            ajax: {
                url: site_url_mobile + '/dashboard_mobile/pelayanan_external/external_kpk',
                data: [iamthedoor, { 'tanggal': $$('#tanggal_external_kpk').val() }],
                type: 'POST'
            },
            columns: [
                { data: 'nama' },
                { data: 'jumlah' },
                { data: 'laki' },
                { data: 'perempuan' },
            ],
            searching: false,
            paging: false,
            ordering: false,
            info: false,
            initComplete: function (settings, json) {
                app.dialog.close();
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            },
            rowCallback: function (row, data) {
            }
        });

        app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kecamatan_kelurahan', iamthedoor, function (response) {
            var list_kecamatan = '<option value="000">SEMUA</option>';

            response.kecamatan.forEach(function (value, index) {
            list_kecamatan += '<option value="' + value.kode + '">' + value.nama + '</option>';
            });
            $$('#kecamatan_external_kpk').html(list_kecamatan).change();
        }, 'json');

        $$('#kecamatan_external_kpk').on('change', function () {
            var list_kelurahan = '';
            if ($$(this).val() != '000') {
            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kelurahan/' + $$('#kecamatan_external_kpk').val(), iamthedoor, function (response) {
                app.dialog.close();
                if (response.status) {
                response.kelurahan.forEach(function (value, index) {
                    list_kelurahan += '<option value="' + value.kode + '">' + value.nama + '</option>';
                });
                }
                $$('#kelurahan_external_kpk').html(list_kelurahan).change();
            }, 'json');
            } else {
            list_kelurahan += '<option value=""> - </option>'
            $$('#kelurahan_external_kpk').html(list_kelurahan).change();
            }
        });

        $$('#cari_data_external_kpk').on('click', function () {
            var post = {
                'tanggal': $$('#tanggal_external_kpk').val(),
                'kecamatan': $$('#kecamatan_external_kpk').val(),
                'kelurahan': $$('#kelurahan_external_kpk').val()
            }
            if (post['tanggal'].split('-').length <= 3) {
                app.dialog.alert('Mohon pilih tanggal yang sesuai');
                return false
            }
            datatables.context[0].ajax.data = [iamthedoor, post];
            app.dialog.preloader('Loading...');
            $('#datatables').DataTable().ajax.reload(function (json) {
            if (json.data) {
                app.dialog.close();
                let header = "KECAMATAN";
                if (post['kecamatan'] != '000') {
                header = "KELURAHAN";
                }
                $('th:first').text(header);
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            } else {
                app.dialog.close();
                app.dialog.alert('Data tidak dapat ditemukan');
            }
            });
        });

        $$('#lihat_grafik_external_kpk').on('click', function () {
            if (getDiffDate($$('#tanggal_external_kpk').val(), 14)) {
                app.dialog.alert('Durasi tanggal yang dipilih tidak boleh melebihi 14 hari');
                return false;
            }

            var post = {
                'tanggal': $$('#tanggal_external_kpk').val(),
                'kecamatan': $$('#kecamatan_external_kpk').val(),
                'kelurahan': $$('#kelurahan_external_kpk').val()
            }

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/grafik_kpk', [iamthedoor, post], function (response) {
                app.dialog.close();
                var grafik1 = { x: [], y: [], name: 'Laki-Laki', type: 'bar' };
                var grafik2 = { x: [], y: [], name: 'Perempuan', type: 'bar' };

                if (response.status) {
                    var jml_lk = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik1.x.push('.' + val.tgl_buat);
                        grafik1.y.push(val.jumlah_laki);
                        jml_lk = jml_lk + parseInt(val.jumlah_laki);
                    });
                    $$('#jml_lk').html(jml_lk);

                    var jml_pr = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik2.x.push('.' + val.tgl_buat);
                        grafik2.y.push(val.jumlah_perempuan);
                        jml_pr = jml_pr + parseInt(val.jumlah_perempuan);
                    });
                    $$('#jml_pr').html(jml_pr);
                }

                var chart_data = [grafik1, grafik2];
                Plotly.newPlot('chart_external_kpk', chart_data, chart_layout, chart_config);
            }, 'json');
        });
      }
    }
}

var external_jobseeker = {
    name: 'external_jobseeker',
    path: '/pelayanan_eksternal/jobseeker',
    url: './pages/dashboard/external_jobseeker.html',
    options: {
      transition: 'f7-parallax',
    },
    on: {
      pageInit: function () {
        var chart_layout = { barmode: 'stack', bargroupgap: 0.1, height: 250, margin: { t: 10, b: 65, l: 30, r: 30 }, paper_bgcolor: 'rgba(0, 0, 0, 0)', yaxis: { fixedrange: true }, xaxis: { tickangle: -90 }, legend: { x: 0, y: 1.0, orientation: 'h' } };
        var chart_config = { responsive: true, displaylogo: false, displayModeBar: false };
        app.calendar.create({
            inputEl: '#tanggal_external_jobseeker',
            openIn: 'customModal',
            dateFormat: 'dd-mm-yyyy',
            header: true, footer: true, rangePicker: true
        });

        $$('#tanggal_external_jobseeker').val(`${get_today_date()} - ${get_today_date()}`)
        app.dialog.preloader('Loading...');
        var datatables = $('#datatables').DataTable({
            ajax: {
                url: site_url_mobile + '/dashboard_mobile/pelayanan_external/external_jobseeker',
                data: [iamthedoor, { 'tanggal': $$('#tanggal_external_jobseeker').val() }],
                type: 'POST'
            },
            columns: [
                { data: 'nama' },
                { data: 'jumlah' },
                { data: 'laki' },
                { data: 'perempuan' },
            ],
            searching: false,
            paging: false,
            ordering: false,
            info: false,
            initComplete: function (settings, json) {
                app.dialog.close();
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            },
            rowCallback: function (row, data) {
            }
        });

        app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kecamatan_kelurahan', iamthedoor, function (response) {
            var list_kecamatan = '<option value="000">SEMUA</option>';

            response.kecamatan.forEach(function (value, index) {
            list_kecamatan += '<option value="' + value.kode + '">' + value.nama + '</option>';
            });
            $$('#kecamatan_external_jobseeker').html(list_kecamatan).change();
        }, 'json');

        $$('#kecamatan_external_jobseeker').on('change', function () {
            var list_kelurahan = '';
            if ($$(this).val() != '000') {
            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kelurahan/' + $$('#kecamatan_external_jobseeker').val(), iamthedoor, function (response) {
                app.dialog.close();
                if (response.status) {
                response.kelurahan.forEach(function (value, index) {
                    list_kelurahan += '<option value="' + value.kode + '">' + value.nama + '</option>';
                });
                }
                $$('#kelurahan_external_jobseeker').html(list_kelurahan).change();
            }, 'json');
            } else {
            list_kelurahan += '<option value=""> - </option>'
            $$('#kelurahan_external_jobseeker').html(list_kelurahan).change();
            }
        });

        $$('#cari_data_external_jobseeker').on('click', function () {
            var post = {
                'tanggal': $$('#tanggal_external_jobseeker').val(),
                'kecamatan': $$('#kecamatan_external_jobseeker').val(),
                'kelurahan': $$('#kelurahan_external_jobseeker').val()
            }
            if (post['tanggal'].split('-').length <= 3) {
                app.dialog.alert('Mohon pilih tanggal yang sesuai');
                return false
            }
            datatables.context[0].ajax.data = [iamthedoor, post];
            app.dialog.preloader('Loading...');
            $('#datatables').DataTable().ajax.reload(function (json) {
            if (json.data) {
                app.dialog.close();
                let header = "KECAMATAN";
                if (post['kecamatan'] != '000') {
                header = "KELURAHAN";
                }
                $('th:first').text(header);
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            } else {
                app.dialog.close();
                app.dialog.alert('Data tidak dapat ditemukan');
            }
            });
        });

        $$('#lihat_grafik_external_jobseeker').on('click', function () {
            if (getDiffDate($$('#tanggal_external_jobseeker').val(), 14)) {
                app.dialog.alert('Durasi tanggal yang dipilih tidak boleh melebihi 14 hari');
                return false;
            }

            var post = {
                'tanggal': $$('#tanggal_external_jobseeker').val(),
                'kecamatan': $$('#kecamatan_external_jobseeker').val(),
                'kelurahan': $$('#kelurahan_external_jobseeker').val()
            }

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/grafik_jobseeker', [iamthedoor, post], function (response) {
                app.dialog.close();
                var grafik1 = { x: [], y: [], name: 'Laki-Laki', type: 'bar' };
                var grafik2 = { x: [], y: [], name: 'Perempuan', type: 'bar' };

                if (response.status) {
                    var jml_lk = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik1.x.push('.' + val.tgl_buat);
                        grafik1.y.push(val.jumlah_laki);
                        jml_lk = jml_lk + parseInt(val.jumlah_laki);
                    });
                    $$('#jml_lk').html(jml_lk);

                    var jml_pr = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik2.x.push('.' + val.tgl_buat);
                        grafik2.y.push(val.jumlah_perempuan);
                        jml_pr = jml_pr + parseInt(val.jumlah_perempuan);
                    });
                    $$('#jml_pr').html(jml_pr);
                }

                var chart_data = [grafik1, grafik2];
                Plotly.newPlot('chart_external_jobseeker', chart_data, chart_layout, chart_config);
            }, 'json');
        });
      }
    }
}

var external_skck = {
    name: 'external_skck',
    path: '/pelayanan_eksternal/skck',
    url: './pages/dashboard/external_skck.html',
    options: {
      transition: 'f7-parallax',
    },
    on: {
      pageInit: function () {
        var chart_layout = { barmode: 'stack', bargroupgap: 0.1, height: 250, margin: { t: 10, b: 65, l: 30, r: 30 }, paper_bgcolor: 'rgba(0, 0, 0, 0)', yaxis: { fixedrange: true }, xaxis: { tickangle: -90 }, legend: { x: 0, y: 1.0, orientation: 'h' } };
        var chart_config = { responsive: true, displaylogo: false, displayModeBar: false };
        app.calendar.create({
            inputEl: '#tanggal_external_skck',
            openIn: 'customModal',
            dateFormat: 'dd-mm-yyyy',
            header: true, footer: true, rangePicker: true
        });

        $$('#tanggal_external_skck').val(`${get_today_date()} - ${get_today_date()}`)
        app.dialog.preloader('Loading...');
        var datatables = $('#datatables').DataTable({
            ajax: {
                url: site_url_mobile + '/dashboard_mobile/pelayanan_external/external_skck',
                data: [iamthedoor, { 'tanggal': $$('#tanggal_external_skck').val() }],
                type: 'POST'
            },
            columns: [
                { data: 'nama' },
                { data: 'jumlah' },
                { data: 'laki' },
                { data: 'perempuan' },
                { data: 'proses' },
                { data: 'selesai' },
            ],
            searching: false,
            paging: false,
            ordering: false,
            info: false,
            initComplete: function (settings, json) {
                app.dialog.close();
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            },
            rowCallback: function (row, data) {
            }
        });

        app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kecamatan_kelurahan', iamthedoor, function (response) {
            var list_kecamatan = '<option value="000">SEMUA</option>';

            response.kecamatan.forEach(function (value, index) {
            list_kecamatan += '<option value="' + value.kode + '">' + value.nama + '</option>';
            });
            $$('#kecamatan_external_skck').html(list_kecamatan).change();
        }, 'json');

        $$('#kecamatan_external_skck').on('change', function () {
            var list_kelurahan = '';
            if ($$(this).val() != '000') {
            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kelurahan/' + $$('#kecamatan_external_skck').val(), iamthedoor, function (response) {
                app.dialog.close();
                if (response.status) {
                response.kelurahan.forEach(function (value, index) {
                    list_kelurahan += '<option value="' + value.kode + '">' + value.nama + '</option>';
                });
                }
                $$('#kelurahan_external_skck').html(list_kelurahan).change();
            }, 'json');
            } else {
            list_kelurahan += '<option value=""> - </option>'
            $$('#kelurahan_external_skck').html(list_kelurahan).change();
            }
        });

        $$('#cari_data_external_skck').on('click', function () {
            var post = {
                'tanggal': $$('#tanggal_external_skck').val(),
                'kecamatan': $$('#kecamatan_external_skck').val(),
                'kelurahan': $$('#kelurahan_external_skck').val()
            }
            if (post['tanggal'].split('-').length <= 3) {
                app.dialog.alert('Mohon pilih tanggal yang sesuai');
                return false
            }
            datatables.context[0].ajax.data = [iamthedoor, post];
            app.dialog.preloader('Loading...');
            $('#datatables').DataTable().ajax.reload(function (json) {
            if (json.data) {
                app.dialog.close();
                let header = "KECAMATAN";
                if (post['kecamatan'] != '000') {
                header = "KELURAHAN";
                }
                $('th:first').text(header);
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            } else {
                app.dialog.close();
                app.dialog.alert('Data tidak dapat ditemukan');
            }
            });
        });

        $$('#lihat_grafik_external_skck').on('click', function () {
            if (getDiffDate($$('#tanggal_external_skck').val(), 14)) {
                app.dialog.alert('Durasi tanggal yang dipilih tidak boleh melebihi 14 hari');
                return false;
            }

            var post = {
                'tanggal': $$('#tanggal_external_skck').val(),
                'kecamatan': $$('#kecamatan_external_skck').val(),
                'kelurahan': $$('#kelurahan_external_skck').val()
            }

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/grafik_skck', [iamthedoor, post], function (response) {
                app.dialog.close();
                var grafik1 = { x: [], y: [], name: 'Laki-Laki', type: 'bar' };
                var grafik2 = { x: [], y: [], name: 'Perempuan', type: 'bar' };
                var grafik3 = { x: [], y: [], name: 'Selesai', type: 'bar' };
                var grafik4 = { x: [], y: [], name: 'Proses', type: 'bar' };

                if (response.status) {
                    var jml_lk = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik1.x.push('.' + val.tanggal_buat);
                        grafik1.y.push(val.jumlah_laki);
                        jml_lk = jml_lk + parseInt(val.jumlah_laki);
                    });
                    $$('#jml_lk').html(jml_lk);

                    var jml_pr = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik2.x.push('.' + val.tanggal_buat);
                        grafik2.y.push(val.jumlah_perempuan);
                        jml_pr = jml_pr + parseInt(val.jumlah_perempuan);
                    });
                    $$('#jml_pr').html(jml_pr);

                    var jml_selesai = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik3.x.push('.' + val.tanggal_buat);
                        grafik3.y.push(val.jumlah_selesai);
                        jml_selesai = jml_selesai + parseInt(val.jumlah_selesai);
                    });
                    $$('#jml_selesai').html(jml_selesai);
                    
                    var jml_proses = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik4.x.push('.' + val.tanggal_buat);
                        grafik4.y.push(val.jumlah_proses);
                        jml_proses = jml_proses + parseInt(val.jumlah_proses);
                    });
                    $$('#jml_proses').html(jml_proses);
                }

                var chart_data = [grafik1, grafik2, grafik3, grafik4];
                Plotly.newPlot('chart_external_skck', chart_data, chart_layout, chart_config);
            }, 'json');
        });
      }
    }
}

var external_ijin_keramaian = {
    name: 'external_ijin_keramaian',
    path: '/pelayanan_eksternal/ijin_keramaian',
    url: './pages/dashboard/external_ijin_keramaian.html',
    options: {
      transition: 'f7-parallax',
    },
    on: {
      pageInit: function () {
        var chart_layout = { barmode: 'stack', bargroupgap: 0.1, height: 250, margin: { t: 10, b: 65, l: 30, r: 30 }, paper_bgcolor: 'rgba(0, 0, 0, 0)', yaxis: { fixedrange: true }, xaxis: { tickangle: -90 }, legend: { x: 0, y: 1.0, orientation: 'h' } };
        var chart_config = { responsive: true, displaylogo: false, displayModeBar: false };
        app.calendar.create({
            inputEl: '#tanggal_external_ijin_keramaian',
            openIn: 'customModal',
            dateFormat: 'dd-mm-yyyy',
            header: true, footer: true, rangePicker: true
        });

        $$('#tanggal_external_ijin_keramaian').val(`${get_today_date()} - ${get_today_date()}`)
        app.dialog.preloader('Loading...');
        var datatables = $('#datatables').DataTable({
            ajax: {
                url: site_url_mobile + '/dashboard_mobile/pelayanan_external/external_ijin_keramaian',
                data: [iamthedoor, { 'tanggal': $$('#tanggal_external_ijin_keramaian').val() }],
                type: 'POST'
            },
            columns: [
                { data: 'nama' },
                { data: 'jumlah' },
                { data: 'laki' },
                { data: 'perempuan' },
            ],
            searching: false,
            paging: false,
            ordering: false,
            info: false,
            initComplete: function (settings, json) {
                app.dialog.close();
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            },
            rowCallback: function (row, data) {
            }
        });

        app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kecamatan_kelurahan', iamthedoor, function (response) {
            var list_kecamatan = '<option value="000">SEMUA</option>';

            response.kecamatan.forEach(function (value, index) {
            list_kecamatan += '<option value="' + value.kode + '">' + value.nama + '</option>';
            });
            $$('#kecamatan_external_ijin_keramaian').html(list_kecamatan).change();
        }, 'json');

        $$('#kecamatan_external_ijin_keramaian').on('change', function () {
            var list_kelurahan = '';
            if ($$(this).val() != '000') {
            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kelurahan/' + $$('#kecamatan_external_ijin_keramaian').val(), iamthedoor, function (response) {
                app.dialog.close();
                if (response.status) {
                response.kelurahan.forEach(function (value, index) {
                    list_kelurahan += '<option value="' + value.kode + '">' + value.nama + '</option>';
                });
                }
                $$('#kelurahan_external_ijin_keramaian').html(list_kelurahan).change();
            }, 'json');
            } else {
            list_kelurahan += '<option value=""> - </option>'
            $$('#kelurahan_external_ijin_keramaian').html(list_kelurahan).change();
            }
        });

        $$('#cari_data_external_ijin_keramaian').on('click', function () {
            var post = {
                'tanggal': $$('#tanggal_external_ijin_keramaian').val(),
                'kecamatan': $$('#kecamatan_external_ijin_keramaian').val(),
                'kelurahan': $$('#kelurahan_external_ijin_keramaian').val()
            }
            if (post['tanggal'].split('-').length <= 3) {
                app.dialog.alert('Mohon pilih tanggal yang sesuai');
                return false
            }
            datatables.context[0].ajax.data = [iamthedoor, post];
            app.dialog.preloader('Loading...');
            $('#datatables').DataTable().ajax.reload(function (json) {
            if (json.data) {
                app.dialog.close();
                let header = "KECAMATAN";
                if (post['kecamatan'] != '000') {
                header = "KELURAHAN";
                }
                $('th:first').text(header);
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            } else {
                app.dialog.close();
                app.dialog.alert('Data tidak dapat ditemukan');
            }
            });
        });

        $$('#lihat_grafik_external_ijin_keramaian').on('click', function () {
            if (getDiffDate($$('#tanggal_external_ijin_keramaian').val(), 14)) {
                app.dialog.alert('Durasi tanggal yang dipilih tidak boleh melebihi 14 hari');
                return false;
            }

            var post = {
                'tanggal': $$('#tanggal_external_ijin_keramaian').val(),
                'kecamatan': $$('#kecamatan_external_ijin_keramaian').val(),
                'kelurahan': $$('#kelurahan_external_ijin_keramaian').val()
            }

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/grafik_ijin_keramaian', [iamthedoor, post], function (response) {
                app.dialog.close();
                var grafik1 = { x: [], y: [], name: 'Laki-Laki', type: 'bar' };
                var grafik2 = { x: [], y: [], name: 'Perempuan', type: 'bar' };

                if (response.status) {
                    var jml_lk = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik1.x.push('.' + val.tgl_buat);
                        grafik1.y.push(val.jumlah_laki);
                        jml_lk = jml_lk + parseInt(val.jumlah_laki);
                    });
                    $$('#jml_lk').html(jml_lk);

                    var jml_pr = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik2.x.push('.' + val.tgl_buat);
                        grafik2.y.push(val.jumlah_perempuan);
                        jml_pr = jml_pr + parseInt(val.jumlah_perempuan);
                    });
                    $$('#jml_pr').html(jml_pr);
                }

                var chart_data = [grafik1, grafik2];
                Plotly.newPlot('chart_external_ijin_keramaian', chart_data, chart_layout, chart_config);
            }, 'json');
        });
      }
    }
}

var external_laporan_kehilangan = {
    name: 'external_laporan_kehilangan',
    path: '/pelayanan_eksternal/laporan_kehilangan',
    url: './pages/dashboard/external_laporan_kehilangan.html',
    options: {
      transition: 'f7-parallax',
    },
    on: {
      pageInit: function () {
        var chart_layout = { barmode: 'stack', bargroupgap: 0.1, height: 250, margin: { t: 10, b: 65, l: 30, r: 30 }, paper_bgcolor: 'rgba(0, 0, 0, 0)', yaxis: { fixedrange: true }, xaxis: { tickangle: -90 }, legend: { x: 0, y: 1.0, orientation: 'h' } };
        var chart_config = { responsive: true, displaylogo: false, displayModeBar: false };
        app.calendar.create({
            inputEl: '#tanggal_external_laporan_kehilangan',
            openIn: 'customModal',
            dateFormat: 'dd-mm-yyyy',
            header: true, footer: true, rangePicker: true
        });

        $$('#tanggal_external_laporan_kehilangan').val(`${get_today_date()} - ${get_today_date()}`)
        app.dialog.preloader('Loading...');
        var datatables = $('#datatables').DataTable({
            ajax: {
                url: site_url_mobile + '/dashboard_mobile/pelayanan_external/external_laporan_kehilangan',
                data: [iamthedoor, { 'tanggal': $$('#tanggal_external_laporan_kehilangan').val() }],
                type: 'POST'
            },
            columns: [
                { data: 'nama' },
                { data: 'jumlah' },
                { data: 'laki' },
                { data: 'perempuan' },
                { data: 'proses' },
                { data: 'selesai' },
                { data: 'tolak' },
            ],
            searching: false,
            paging: false,
            ordering: false,
            info: false,
            initComplete: function (settings, json) {
                app.dialog.close();
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            },
            rowCallback: function (row, data) {
            }
        });

        app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kecamatan_kelurahan', iamthedoor, function (response) {
            var list_kecamatan = '<option value="000">SEMUA</option>';

            response.kecamatan.forEach(function (value, index) {
            list_kecamatan += '<option value="' + value.kode + '">' + value.nama + '</option>';
            });
            $$('#kecamatan_external_laporan_kehilangan').html(list_kecamatan).change();
        }, 'json');

        $$('#kecamatan_external_laporan_kehilangan').on('change', function () {
            var list_kelurahan = '';
            if ($$(this).val() != '000') {
            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kelurahan/' + $$('#kecamatan_external_laporan_kehilangan').val(), iamthedoor, function (response) {
                app.dialog.close();
                if (response.status) {
                response.kelurahan.forEach(function (value, index) {
                    list_kelurahan += '<option value="' + value.kode + '">' + value.nama + '</option>';
                });
                }
                $$('#kelurahan_external_laporan_kehilangan').html(list_kelurahan).change();
            }, 'json');
            } else {
            list_kelurahan += '<option value=""> - </option>'
            $$('#kelurahan_external_laporan_kehilangan').html(list_kelurahan).change();
            }
        });

        $$('#cari_data_external_laporan_kehilangan').on('click', function () {
            var post = {
                'tanggal': $$('#tanggal_external_laporan_kehilangan').val(),
                'kecamatan': $$('#kecamatan_external_laporan_kehilangan').val(),
                'kelurahan': $$('#kelurahan_external_laporan_kehilangan').val()
            }
            if (post['tanggal'].split('-').length <= 3) {
                app.dialog.alert('Mohon pilih tanggal yang sesuai');
                return false
            }
            datatables.context[0].ajax.data = [iamthedoor, post];
            app.dialog.preloader('Loading...');
            $('#datatables').DataTable().ajax.reload(function (json) {
            if (json.data) {
                app.dialog.close();
                let header = "KECAMATAN";
                if (post['kecamatan'] != '000') {
                header = "KELURAHAN";
                }
                $('th:first').text(header);
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            } else {
                app.dialog.close();
                app.dialog.alert('Data tidak dapat ditemukan');
            }
            });
        });

        $$('#lihat_grafik_external_laporan_kehilangan').on('click', function () {
            if (getDiffDate($$('#tanggal_external_laporan_kehilangan').val(), 14)) {
                app.dialog.alert('Durasi tanggal yang dipilih tidak boleh melebihi 14 hari');
                return false;
            }

            var post = {
                'tanggal': $$('#tanggal_external_laporan_kehilangan').val(),
                'kecamatan': $$('#kecamatan_external_laporan_kehilangan').val(),
                'kelurahan': $$('#kelurahan_external_laporan_kehilangan').val()
            }

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/grafik_laporan_kehilangan', [iamthedoor, post], function (response) {
                app.dialog.close();
                var grafik1 = { x: [], y: [], name: 'Laki-Laki', type: 'bar' };
                var grafik2 = { x: [], y: [], name: 'Perempuan', type: 'bar' };
                var grafik3 = { x: [], y: [], name: 'Selesai', type: 'bar' };
                var grafik4 = { x: [], y: [], name: 'Tolak', type: 'bar' };
                var grafik5 = { x: [], y: [], name: 'Proses', type: 'bar' };

                if (response.status) {
                    var jml_lk = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik1.x.push('.' + val.created_at);
                        grafik1.y.push(val.jumlah_laki);
                        jml_lk = jml_lk + parseInt(val.jumlah_laki);
                    });
                    $$('#jml_lk').html(jml_lk);

                    var jml_pr = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik2.x.push('.' + val.created_at);
                        grafik2.y.push(val.jumlah_perempuan);
                        jml_pr = jml_pr + parseInt(val.jumlah_perempuan);
                    });
                    $$('#jml_pr').html(jml_pr);

                    var jml_selesai = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik3.x.push('.' + val.created_at);
                        grafik3.y.push(val.jumlah_selesai);
                        jml_selesai = jml_selesai + parseInt(val.jumlah_selesai);
                    });
                    $$('#jml_selesai').html(jml_selesai);
                    
                    var jml_tolak = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik4.x.push('.' + val.created_at);
                        grafik4.y.push(val.jumlah_tolak);
                        jml_tolak = jml_tolak + parseInt(val.jumlah_tolak);
                    });
                    $$('#jml_tolak').html(jml_tolak);

                    var jml_proses = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik5.x.push('.' + val.created_at);
                        grafik5.y.push(val.jumlah_proses);
                        jml_proses = jml_proses + parseInt(val.jumlah_proses);
                    });
                    $$('#jml_proses').html(jml_proses);
                }

                var chart_data = [grafik1, grafik2, grafik3, grafik4, grafik5];
                Plotly.newPlot('chart_external_laporan_kehilangan', chart_data, chart_layout, chart_config);
            }, 'json');
        });
      }
    }
}

var external_tabungan = {
    name: 'external_tabungan',
    path: '/pelayanan_eksternal/tabungan',
    url: './pages/dashboard/external_tabungan.html',
    options: {
      transition: 'f7-parallax',
    },
    on: {
      pageInit: function () {
        var chart_layout = { barmode: 'stack', bargroupgap: 0.1, height: 250, margin: { t: 10, b: 65, l: 30, r: 30 }, paper_bgcolor: 'rgba(0, 0, 0, 0)', yaxis: { fixedrange: true }, xaxis: { tickangle: -90 }, legend: { x: 0, y: 1.0, orientation: 'h' } };
        var chart_config = { responsive: true, displaylogo: false, displayModeBar: false };
        app.calendar.create({
            inputEl: '#tanggal_external_tabungan',
            openIn: 'customModal',
            dateFormat: 'dd-mm-yyyy',
            header: true, footer: true, rangePicker: true
        });

        $$('#tanggal_external_tabungan').val(`${get_today_date()} - ${get_today_date()}`)
        app.dialog.preloader('Loading...');
        var datatables = $('#datatables').DataTable({
            ajax: {
                url: site_url_mobile + '/dashboard_mobile/pelayanan_external/external_tabungan',
                data: [iamthedoor, { 'tanggal': $$('#tanggal_external_tabungan').val() }],
                type: 'POST'
            },
            columns: [
                { data: 'nama' },
                { data: 'jumlah' },
                { data: 'laki' },
                { data: 'perempuan' },
                { data: 'proses' },
                { data: 'selesai' },
            ],
            searching: false,
            paging: false,
            ordering: false,
            info: false,
            initComplete: function (settings, json) {
                app.dialog.close();
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            },
            rowCallback: function (row, data) {
            }
        });

        app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kecamatan_kelurahan', iamthedoor, function (response) {
            var list_kecamatan = '<option value="000">SEMUA</option>';

            response.kecamatan.forEach(function (value, index) {
            list_kecamatan += '<option value="' + value.kode + '">' + value.nama + '</option>';
            });
            $$('#kecamatan_external_tabungan').html(list_kecamatan).change();
        }, 'json');

        $$('#kecamatan_external_tabungan').on('change', function () {
            var list_kelurahan = '';
            if ($$(this).val() != '000') {
            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kelurahan/' + $$('#kecamatan_external_tabungan').val(), iamthedoor, function (response) {
                app.dialog.close();
                if (response.status) {
                response.kelurahan.forEach(function (value, index) {
                    list_kelurahan += '<option value="' + value.kode + '">' + value.nama + '</option>';
                });
                }
                $$('#kelurahan_external_tabungan').html(list_kelurahan).change();
            }, 'json');
            } else {
            list_kelurahan += '<option value=""> - </option>'
            $$('#kelurahan_external_tabungan').html(list_kelurahan).change();
            }
        });

        $$('#cari_data_external_tabungan').on('click', function () {
            var post = {
                'tanggal': $$('#tanggal_external_tabungan').val(),
                'kecamatan': $$('#kecamatan_external_tabungan').val(),
                'kelurahan': $$('#kelurahan_external_tabungan').val()
            }
            if (post['tanggal'].split('-').length <= 3) {
                app.dialog.alert('Mohon pilih tanggal yang sesuai');
                return false
            }
            datatables.context[0].ajax.data = [iamthedoor, post];
            app.dialog.preloader('Loading...');
            $('#datatables').DataTable().ajax.reload(function (json) {
            if (json.data) {
                app.dialog.close();
                let header = "KECAMATAN";
                if (post['kecamatan'] != '000') {
                header = "KELURAHAN";
                }
                $('th:first').text(header);
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            } else {
                app.dialog.close();
                app.dialog.alert('Data tidak dapat ditemukan');
            }
            });
        });

        $$('#lihat_grafik_external_tabungan').on('click', function () {
            if (getDiffDate($$('#tanggal_external_tabungan').val(), 14)) {
                app.dialog.alert('Durasi tanggal yang dipilih tidak boleh melebihi 14 hari');
                return false;
            }

            var post = {
                'tanggal': $$('#tanggal_external_tabungan').val(),
                'kecamatan': $$('#kecamatan_external_tabungan').val(),
                'kelurahan': $$('#kelurahan_external_tabungan').val()
            }

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/grafik_tabungan', [iamthedoor, post], function (response) {
                app.dialog.close();
                var grafik1 = { x: [], y: [], name: 'Laki-Laki', type: 'bar' };
                var grafik2 = { x: [], y: [], name: 'Perempuan', type: 'bar' };
                var grafik3 = { x: [], y: [], name: 'Selesai', type: 'bar' };
                var grafik4 = { x: [], y: [], name: 'Proses', type: 'bar' };

                if (response.status) {
                    var jml_lk = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik1.x.push('.' + val.tgl_buat);
                        grafik1.y.push(val.jumlah_laki);
                        jml_lk = jml_lk + parseInt(val.jumlah_laki);
                    });
                    $$('#jml_lk').html(jml_lk);

                    var jml_pr = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik2.x.push('.' + val.tgl_buat);
                        grafik2.y.push(val.jumlah_perempuan);
                        jml_pr = jml_pr + parseInt(val.jumlah_perempuan);
                    });
                    $$('#jml_pr').html(jml_pr);

                    var jml_selesai = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik3.x.push('.' + val.tgl_buat);
                        grafik3.y.push(val.jumlah_selesai);
                        jml_selesai = jml_selesai + parseInt(val.jumlah_selesai);
                    });
                    $$('#jml_selesai').html(jml_selesai);

                    var jml_proses = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik4.x.push('.' + val.tgl_buat);
                        grafik4.y.push(val.jumlah_proses);
                        jml_proses = jml_proses + parseInt(val.jumlah_proses);
                    });
                    $$('#jml_proses').html(jml_proses);
                }

                var chart_data = [grafik1, grafik2, grafik3, grafik4];
                Plotly.newPlot('chart_external_tabungan', chart_data, chart_layout, chart_config);
            }, 'json');
        });
      }
    }
}

var external_deposito = {
    name: 'external_deposito',
    path: '/pelayanan_eksternal/deposito',
    url: './pages/dashboard/external_deposito.html',
    options: {
      transition: 'f7-parallax',
    },
    on: {
      pageInit: function () {
        var chart_layout = { barmode: 'stack', bargroupgap: 0.1, height: 250, margin: { t: 10, b: 65, l: 30, r: 30 }, paper_bgcolor: 'rgba(0, 0, 0, 0)', yaxis: { fixedrange: true }, xaxis: { tickangle: -90 }, legend: { x: 0, y: 1.0, orientation: 'h' } };
        var chart_config = { responsive: true, displaylogo: false, displayModeBar: false };
        app.calendar.create({
            inputEl: '#tanggal_external_deposito',
            openIn: 'customModal',
            dateFormat: 'dd-mm-yyyy',
            header: true, footer: true, rangePicker: true
        });

        $$('#tanggal_external_deposito').val(`${get_today_date()} - ${get_today_date()}`)
        app.dialog.preloader('Loading...');
        var datatables = $('#datatables').DataTable({
            ajax: {
                url: site_url_mobile + '/dashboard_mobile/pelayanan_external/external_deposito',
                data: [iamthedoor, { 'tanggal': $$('#tanggal_external_deposito').val() }],
                type: 'POST'
            },
            columns: [
                { data: 'nama' },
                { data: 'jumlah' },
                { data: 'laki' },
                { data: 'perempuan' },
                { data: 'proses' },
                { data: 'selesai' },
            ],
            searching: false,
            paging: false,
            ordering: false,
            info: false,
            initComplete: function (settings, json) {
                app.dialog.close();
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            },
            rowCallback: function (row, data) {
            }
        });

        app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kecamatan_kelurahan', iamthedoor, function (response) {
            var list_kecamatan = '<option value="000">SEMUA</option>';

            response.kecamatan.forEach(function (value, index) {
            list_kecamatan += '<option value="' + value.kode + '">' + value.nama + '</option>';
            });
            $$('#kecamatan_external_deposito').html(list_kecamatan).change();
        }, 'json');

        $$('#kecamatan_external_deposito').on('change', function () {
            var list_kelurahan = '';
            if ($$(this).val() != '000') {
            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kelurahan/' + $$('#kecamatan_external_deposito').val(), iamthedoor, function (response) {
                app.dialog.close();
                if (response.status) {
                response.kelurahan.forEach(function (value, index) {
                    list_kelurahan += '<option value="' + value.kode + '">' + value.nama + '</option>';
                });
                }
                $$('#kelurahan_external_deposito').html(list_kelurahan).change();
            }, 'json');
            } else {
            list_kelurahan += '<option value=""> - </option>'
            $$('#kelurahan_external_deposito').html(list_kelurahan).change();
            }
        });

        $$('#cari_data_external_deposito').on('click', function () {
            var post = {
                'tanggal': $$('#tanggal_external_deposito').val(),
                'kecamatan': $$('#kecamatan_external_deposito').val(),
                'kelurahan': $$('#kelurahan_external_deposito').val()
            }
            if (post['tanggal'].split('-').length <= 3) {
                app.dialog.alert('Mohon pilih tanggal yang sesuai');
                return false
            }
            datatables.context[0].ajax.data = [iamthedoor, post];
            app.dialog.preloader('Loading...');
            $('#datatables').DataTable().ajax.reload(function (json) {
            if (json.data) {
                app.dialog.close();
                let header = "KECAMATAN";
                if (post['kecamatan'] != '000') {
                header = "KELURAHAN";
                }
                $('th:first').text(header);
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            } else {
                app.dialog.close();
                app.dialog.alert('Data tidak dapat ditemukan');
            }
            });
        });

        $$('#lihat_grafik_external_deposito').on('click', function () {
            if (getDiffDate($$('#tanggal_external_deposito').val(), 14)) {
                app.dialog.alert('Durasi tanggal yang dipilih tidak boleh melebihi 14 hari');
                return false;
            }

            var post = {
                'tanggal': $$('#tanggal_external_deposito').val(),
                'kecamatan': $$('#kecamatan_external_deposito').val(),
                'kelurahan': $$('#kelurahan_external_deposito').val()
            }

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/grafik_deposito', [iamthedoor, post], function (response) {
                app.dialog.close();
                var grafik1 = { x: [], y: [], name: 'Laki-Laki', type: 'bar' };
                var grafik2 = { x: [], y: [], name: 'Perempuan', type: 'bar' };
                var grafik3 = { x: [], y: [], name: 'Selesai', type: 'bar' };
                var grafik4 = { x: [], y: [], name: 'Proses', type: 'bar' };

                if (response.status) {
                    var jml_lk = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik1.x.push('.' + val.tgl_buat);
                        grafik1.y.push(val.jumlah_laki);
                        jml_lk = jml_lk + parseInt(val.jumlah_laki);
                    });
                    $$('#jml_lk').html(jml_lk);

                    var jml_pr = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik2.x.push('.' + val.tgl_buat);
                        grafik2.y.push(val.jumlah_perempuan);
                        jml_pr = jml_pr + parseInt(val.jumlah_perempuan);
                    });
                    $$('#jml_pr').html(jml_pr);

                    var jml_selesai = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik3.x.push('.' + val.tgl_buat);
                        grafik3.y.push(val.jumlah_selesai);
                        jml_selesai = jml_selesai + parseInt(val.jumlah_selesai);
                    });
                    $$('#jml_selesai').html(jml_selesai);

                    var jml_proses = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik4.x.push('.' + val.tgl_buat);
                        grafik4.y.push(val.jumlah_proses);
                        jml_proses = jml_proses + parseInt(val.jumlah_proses);
                    });
                    $$('#jml_proses').html(jml_proses);
                }

                var chart_data = [grafik1, grafik2, grafik3, grafik4];
                Plotly.newPlot('chart_external_deposito', chart_data, chart_layout, chart_config);
            }, 'json');
        });
      }
    }
}

var external_kredit = {
    name: 'external_kredit',
    path: '/pelayanan_eksternal/kredit',
    url: './pages/dashboard/external_kredit.html',
    options: {
      transition: 'f7-parallax',
    },
    on: {
      pageInit: function () {
        var chart_layout = { barmode: 'stack', bargroupgap: 0.1, height: 250, margin: { t: 10, b: 65, l: 30, r: 30 }, paper_bgcolor: 'rgba(0, 0, 0, 0)', yaxis: { fixedrange: true }, xaxis: { tickangle: -90 }, legend: { x: 0, y: 1.0, orientation: 'h' } };
        var chart_config = { responsive: true, displaylogo: false, displayModeBar: false };
        app.calendar.create({
            inputEl: '#tanggal_external_kredit',
            openIn: 'customModal',
            dateFormat: 'dd-mm-yyyy',
            header: true, footer: true, rangePicker: true
        });

        $$('#tanggal_external_kredit').val(`${get_today_date()} - ${get_today_date()}`)
        app.dialog.preloader('Loading...');
        var datatables = $('#datatables').DataTable({
            ajax: {
                url: site_url_mobile + '/dashboard_mobile/pelayanan_external/external_kredit',
                data: [iamthedoor, { 'tanggal': $$('#tanggal_external_kredit').val() }],
                type: 'POST'
            },
            columns: [
                { data: 'nama' },
                { data: 'jumlah' },
                { data: 'laki' },
                { data: 'perempuan' },
                { data: 'proses' },
                { data: 'selesai' },
            ],
            searching: false,
            paging: false,
            ordering: false,
            info: false,
            initComplete: function (settings, json) {
                app.dialog.close();
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            },
            rowCallback: function (row, data) {
            }
        });

        app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kecamatan_kelurahan', iamthedoor, function (response) {
            var list_kecamatan = '<option value="000">SEMUA</option>';

            response.kecamatan.forEach(function (value, index) {
            list_kecamatan += '<option value="' + value.kode + '">' + value.nama + '</option>';
            });
            $$('#kecamatan_external_kredit').html(list_kecamatan).change();
        }, 'json');

        $$('#kecamatan_external_kredit').on('change', function () {
            var list_kelurahan = '';
            if ($$(this).val() != '000') {
            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kelurahan/' + $$('#kecamatan_external_kredit').val(), iamthedoor, function (response) {
                app.dialog.close();
                if (response.status) {
                response.kelurahan.forEach(function (value, index) {
                    list_kelurahan += '<option value="' + value.kode + '">' + value.nama + '</option>';
                });
                }
                $$('#kelurahan_external_kredit').html(list_kelurahan).change();
            }, 'json');
            } else {
            list_kelurahan += '<option value=""> - </option>'
            $$('#kelurahan_external_kredit').html(list_kelurahan).change();
            }
        });

        $$('#cari_data_external_kredit').on('click', function () {
            var post = {
                'tanggal': $$('#tanggal_external_kredit').val(),
                'kecamatan': $$('#kecamatan_external_kredit').val(),
                'kelurahan': $$('#kelurahan_external_kredit').val()
            }
            if (post['tanggal'].split('-').length <= 3) {
                app.dialog.alert('Mohon pilih tanggal yang sesuai');
                return false
            }
            datatables.context[0].ajax.data = [iamthedoor, post];
            app.dialog.preloader('Loading...');
            $('#datatables').DataTable().ajax.reload(function (json) {
            if (json.data) {
                app.dialog.close();
                let header = "KECAMATAN";
                if (post['kecamatan'] != '000') {
                header = "KELURAHAN";
                }
                $('th:first').text(header);
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            } else {
                app.dialog.close();
                app.dialog.alert('Data tidak dapat ditemukan');
            }
            });
        });

        $$('#lihat_grafik_external_kredit').on('click', function () {
            if (getDiffDate($$('#tanggal_external_kredit').val(), 14)) {
                app.dialog.alert('Durasi tanggal yang dipilih tidak boleh melebihi 14 hari');
                return false;
            }

            var post = {
                'tanggal': $$('#tanggal_external_kredit').val(),
                'kecamatan': $$('#kecamatan_external_kredit').val(),
                'kelurahan': $$('#kelurahan_external_kredit').val()
            }

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/grafik_kredit', [iamthedoor, post], function (response) {
                app.dialog.close();
                var grafik1 = { x: [], y: [], name: 'Laki-Laki', type: 'bar' };
                var grafik2 = { x: [], y: [], name: 'Perempuan', type: 'bar' };
                var grafik3 = { x: [], y: [], name: 'Selesai', type: 'bar' };
                var grafik4 = { x: [], y: [], name: 'Proses', type: 'bar' };

                if (response.status) {
                    var jml_lk = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik1.x.push('.' + val.tgl_buat);
                        grafik1.y.push(val.jumlah_laki);
                        jml_lk = jml_lk + parseInt(val.jumlah_laki);
                    });
                    $$('#jml_lk').html(jml_lk);

                    var jml_pr = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik2.x.push('.' + val.tgl_buat);
                        grafik2.y.push(val.jumlah_perempuan);
                        jml_pr = jml_pr + parseInt(val.jumlah_perempuan);
                    });
                    $$('#jml_pr').html(jml_pr);

                    var jml_selesai = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik3.x.push('.' + val.tgl_buat);
                        grafik3.y.push(val.jumlah_selesai);
                        jml_selesai = jml_selesai + parseInt(val.jumlah_selesai);
                    });
                    $$('#jml_selesai').html(jml_selesai);

                    var jml_proses = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik4.x.push('.' + val.tgl_buat);
                        grafik4.y.push(val.jumlah_proses);
                        jml_proses = jml_proses + parseInt(val.jumlah_proses);
                    });
                    $$('#jml_proses').html(jml_proses);
                }

                var chart_data = [grafik1, grafik2, grafik3, grafik4];
                Plotly.newPlot('chart_external_kredit', chart_data, chart_layout, chart_config);
            }, 'json');
        });
      }
    }
}

var external_pasang_baru = {
    name: 'external_pasang_baru',
    path: '/pelayanan_eksternal/pasang_baru',
    url: './pages/dashboard/external_pasang_baru.html',
    options: {
      transition: 'f7-parallax',
    },
    on: {
      pageInit: function () {
        var chart_layout = { barmode: 'stack', bargroupgap: 0.1, height: 250, margin: { t: 10, b: 65, l: 30, r: 30 }, paper_bgcolor: 'rgba(0, 0, 0, 0)', yaxis: { fixedrange: true }, xaxis: { tickangle: -90 }, legend: { x: 0, y: 1.0, orientation: 'h' } };
        var chart_config = { responsive: true, displaylogo: false, displayModeBar: false };
        app.calendar.create({
            inputEl: '#tanggal_external_pasang_baru',
            openIn: 'customModal',
            dateFormat: 'dd-mm-yyyy',
            header: true, footer: true, rangePicker: true
        });

        $$('#tanggal_external_pasang_baru').val(`${get_today_date()} - ${get_today_date()}`)
        app.dialog.preloader('Loading...');
        var datatables = $('#datatables').DataTable({
            ajax: {
                url: site_url_mobile + '/dashboard_mobile/pelayanan_external/external_pasang_baru',
                data: [iamthedoor, { 'tanggal': $$('#tanggal_external_pasang_baru').val() }],
                type: 'POST'
            },
            columns: [
                { data: 'nama' },
                { data: 'jumlah' },
                { data: 'laki' },
                { data: 'perempuan' },
            ],
            searching: false,
            paging: false,
            ordering: false,
            info: false,
            initComplete: function (settings, json) {
                app.dialog.close();
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            },
            rowCallback: function (row, data) {
            }
        });

        app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kecamatan_kelurahan', iamthedoor, function (response) {
            var list_kecamatan = '<option value="000">SEMUA</option>';

            response.kecamatan.forEach(function (value, index) {
            list_kecamatan += '<option value="' + value.kode + '">' + value.nama + '</option>';
            });
            $$('#kecamatan_external_pasang_baru').html(list_kecamatan).change();
        }, 'json');

        $$('#kecamatan_external_pasang_baru').on('change', function () {
            var list_kelurahan = '';
            if ($$(this).val() != '000') {
            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/kelurahan/' + $$('#kecamatan_external_pasang_baru').val(), iamthedoor, function (response) {
                app.dialog.close();
                if (response.status) {
                response.kelurahan.forEach(function (value, index) {
                    list_kelurahan += '<option value="' + value.kode + '">' + value.nama + '</option>';
                });
                }
                $$('#kelurahan_external_pasang_baru').html(list_kelurahan).change();
            }, 'json');
            } else {
            list_kelurahan += '<option value=""> - </option>'
            $$('#kelurahan_external_pasang_baru').html(list_kelurahan).change();
            }
        });

        $$('#cari_data_external_pasang_baru').on('click', function () {
            var post = {
                'tanggal': $$('#tanggal_external_pasang_baru').val(),
                'kecamatan': $$('#kecamatan_external_pasang_baru').val(),
                'kelurahan': $$('#kelurahan_external_pasang_baru').val()
            }
            if (post['tanggal'].split('-').length <= 3) {
                app.dialog.alert('Mohon pilih tanggal yang sesuai');
                return false
            }
            datatables.context[0].ajax.data = [iamthedoor, post];
            app.dialog.preloader('Loading...');
            $('#datatables').DataTable().ajax.reload(function (json) {
            if (json.data) {
                app.dialog.close();
                let header = "KECAMATAN";
                if (post['kecamatan'] != '000') {
                header = "KELURAHAN";
                }
                $('th:first').text(header);
                $('tr:last').css({ "font-weight": "bold", "border-top": "3px solid black" });
            } else {
                app.dialog.close();
                app.dialog.alert('Data tidak dapat ditemukan');
            }
            });
        });

        $$('#lihat_grafik_external_pasang_baru').on('click', function () {
            if (getDiffDate($$('#tanggal_external_pasang_baru').val(), 14)) {
                app.dialog.alert('Durasi tanggal yang dipilih tidak boleh melebihi 14 hari');
                return false;
            }

            var post = {
                'tanggal': $$('#tanggal_external_pasang_baru').val(),
                'kecamatan': $$('#kecamatan_external_pasang_baru').val(),
                'kelurahan': $$('#kelurahan_external_pasang_baru').val()
            }

            app.dialog.preloader('Loading...');
            app.request.post(site_url_mobile + '/dashboard_mobile/pelayanan_external/grafik_pasang_baru', [iamthedoor, post], function (response) {
                app.dialog.close();
                var grafik1 = { x: [], y: [], name: 'Laki-Laki', type: 'bar' };
                var grafik2 = { x: [], y: [], name: 'Perempuan', type: 'bar' };

                if (response.status) {
                    var jml_lk = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik1.x.push('.' + val.createAt);
                        grafik1.y.push(val.jumlah_laki);
                        jml_lk = jml_lk + parseInt(val.jumlah_laki);
                    });
                    $$('#jml_lk').html(jml_lk);

                    var jml_pr = 0;
                    response.chart_data.forEach(function (val, index) {
                        grafik2.x.push('.' + val.createAt);
                        grafik2.y.push(val.jumlah_perempuan);
                        jml_pr = jml_pr + parseInt(val.jumlah_perempuan);
                    });
                    $$('#jml_pr').html(jml_pr);
                }

                var chart_data = [grafik1, grafik2];
                Plotly.newPlot('chart_external_pasang_baru', chart_data, chart_layout, chart_config);
            }, 'json');
        });
      }
    }
}