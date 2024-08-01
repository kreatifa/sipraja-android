var survey = {
    name: 'survey',
    path: '/survey_penduduk/:tipe',
    url: './pages/dashboard/survey.html',
    options: {
        transition: 'f7-parallax',
    },
    on: {
        pageInit: function () {
            var tipe = mainView.router.currentRoute.params.tipe;
            var chart_layout = { barmode: 'stack', bargroupgap: 0.1, height: 250, margin: { t: 10, b: 65, l: 30, r: 30 }, paper_bgcolor: 'rgba(0, 0, 0, 0)', yaxis: { fixedrange: true }, xaxis: { tickangle: -90 }, legend: { x: 0, y: 1.0, orientation: 'h' } };
            var chart_config = { responsive: true, displaylogo: false, displayModeBar: false };
            var title = tipe.replace(/_/g, " ");
            title = title.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
            $$('#title').text(title);
            var today = new Date();
            app.picker.create({
                inputEl: '#tahun',
                value: [today.getFullYear()],
                cols: [
                    {
                        textAlign: 'center',
                        values: (function () {
                            let arr = [];
                            for (var i = 1950; i <= today.getFullYear(); i++) { arr.push(i); }
                            return arr;
                        })()
                    }
                ]
            });
            app.dialog.preloader('Loading...');
            var datatables = $('#datatables').DataTable({
                ajax: {
                    url: site_url_mobile + `/dashboard_mobile/survey/count_new`,
                    data: [iamthedoor, { 'tahun': today.getFullYear(), 'tipe': tipe }],
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
                }
            });
            app.request.post(site_url_mobile + `/dashboard_mobile/survey/kecamatan_kelurahan`, iamthedoor, function (response) {
                var list_kecamatan = '<option value="000">SEMUA</option>';

                response.kecamatan.forEach(function (value, index) {
                    list_kecamatan += '<option value="' + value.kode + '">' + value.nama + '</option>';
                });
                $$('#kecamatan').html(list_kecamatan).change();
            }, 'json');

            $$('#kecamatan').on('change', function () {
                var list_kelurahan = '';
                if ($$(this).val() != '000') {
                    app.dialog.preloader('Loading...');
                    app.request.post(site_url_mobile + `/dashboard_mobile/survey/kelurahan/${$$(`#kecamatan`).val()}`, iamthedoor, function (response) {
                        app.dialog.close();
                        if (response.status) {
                            response.kelurahan.forEach(function (value, index) {
                                list_kelurahan += '<option value="' + value.kode + '">' + value.nama + '</option>';
                            });
                        }
                        $$(`#kelurahan`).html(list_kelurahan).change();
                    }, 'json');
                } else {
                    list_kelurahan += '<option value=""> - </option>'
                    $$(`#kelurahan`).html(list_kelurahan).change();
                }
            });

            $$(`#cari_data`).on('click', function () {
                var post = {
                    'kecamatan': $$(`#kecamatan`).val(),
                    'kelurahan': $$(`#kelurahan`).val(),
                    'tahun': $$(`#tahun`).val(),
                    'tipe': tipe
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

            $$('#lihat_grafik_survey').on('click', function () {
                var post = {
                    'kecamatan': $$(`#kecamatan`).val(),
                    'kelurahan': $$(`#kelurahan`).val(),
                    'tahun': $$(`#tahun`).val(),
                    'tipe': tipe
                }

                app.dialog.preloader('Loading...');
                app.request.post(site_url_mobile + '/dashboard_mobile/survey/grafik', [iamthedoor, post], function (response) {
                    app.dialog.close();
                    var grafik1 = { x: [], y: [], name: 'Laki-Laki', type: 'bar' };
                    var grafik2 = { x: [], y: [], name: 'Perempuan', type: 'bar' };

                    if (response.status) {
                        var jml_lk = 0;
                        response.chart_data.forEach(function (val, index) {
                            grafik1.x.push('.' + val.nama);
                            grafik1.y.push(val.laki);
                            jml_lk = jml_lk + parseInt(val.laki);
                        });
                        $$('#jml_lk').html(jml_lk);

                        var jml_pr = 0;
                        response.chart_data.forEach(function (val, index) {
                            grafik2.x.push('.' + val.nama);
                            grafik2.y.push(val.perempuan);
                            jml_pr = jml_pr + parseInt(val.perempuan);
                        });
                        $$('#jml_pr').html(jml_pr);
                    }

                    var chart_data = [grafik1, grafik2];
                    Plotly.newPlot('chart_survey', chart_data, chart_layout, chart_config);
                }, 'json');
            });
        }
    }
}