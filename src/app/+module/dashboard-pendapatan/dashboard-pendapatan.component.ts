import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Prism from 'prismjs';
import { AppService } from 'src/app/shared/app.service';
import { Chart, Highcharts, MapChart } from 'angular-highcharts';
import { CHARTs } from 'highcharts-drilldown';
import { Observable } from 'rxjs';
import { getLocaleDateFormat } from '@angular/common';


@Component({
    selector: 'app-dashboard-pendapatan',
    templateUrl: './dashboard-pendapatan.component.html',
    styleUrls: ['./dashboard-pendapatan.component.css']
})
export class DashboardPendapatanComponent implements AfterViewInit, OnInit {
    public now: Date = new Date();
    colorNyieun = ['#7cb5ec', '#75b2a3', '#9ebfcc', '#acdda8', '#d7f4d2', '#ccf2e8',
        '#468499', '#088da5', '#00ced1', '#3399ff', '#00ff7f',
        '#b4eeb4', '#a0db8e', '#999999', '#6897bb', '#0099cc', '#3b5998',
        '#000080', '#191970', '#8a2be2', '#31698a', '#87ff8a', '#49e334',
        '#13ec30', '#7faf7a', '#408055', '#09790e'];
    colors = Highcharts.getOptions().colors;
    chartPendapatan: any;
    dataChartPendapatan: any;
    tampung: any;
    isShowTrend = false
    isShowTrendPen = false
    isShowCapaianTarget = false
    chartPerKelompokPasien: any;
    chartPenerimaan: any;
    dataChartPenerimaan: any;
    chartPenerimaanNonLayanan: any;
    chartTargetRealisiRJ: any;
    chartTargetRealisiRI: any;
    cols: any[];
    dataGrid: any;
    loading: boolean;
    chartPerKelompokPasienPie: any;
    chartTrendPendapatan: any;
    dataChartTend: any;
    resultRealisasiCapaian: any;
    constructor(public httpservice: AppService) {
    }

    ngOnInit() {

        this.getPendapatanRS();
        this.getPenerimaan();
        this.getTrendPendapatan();
        this.getTargetRealisasi();

        this.cols = [
            { field: 'noregistrasi', header: 'No Registrasi' },
            { field: 'namapasien', header: 'Nama' },
            { field: 'nocm', header: 'No CM' },
            { field: 'namaruangan', header: 'Ruangan' }
        ];
    }
    /**
      * @method ngAfterViewInit
      */
    ngAfterViewInit() {
        Prism.highlightAll();
    }

    getPendapatanRS() {
        this.isShowTrend = true;
        let tgl = this.now.toLocaleDateString();
        let tipe ='sehari';
        this.httpservice.getTransaksi('eis-pendapatan/get-pendapatan-rs?tipe=' + tipe ).subscribe(data => {
            this.dataChartPendapatan = data
            let array = this.dataChartPendapatan.data
            let series = [];

            // totalkeun hela
            for (let i in array) {
                array[i].total = parseFloat(array[i].total)//total
            }
            // looping nu sarua deapartemena na jumlahkeun
            let samateuuu = false
            let resultSumRuangan = [];
            for (let i in array) {
                samateuuu = false
                for (let x in resultSumRuangan) {
                    if (resultSumRuangan[x].namaruangan == array[i].namaruangan) {
                        resultSumRuangan[x].total = parseFloat(resultSumRuangan[x].total) + parseFloat(array[i].total)
                        // resultSumRuangan[x].namaruangan = array[i].namaruangan
                        samateuuu = true;
                    }
                }
                if (samateuuu == false) {
                    let result = {
                        namaruangan: array[i].namaruangan,
                        total: array[i].total,
                        namadepartemen: array[i].namadepartemen,
                        kelompokpasien: array[i].kelompokpasien,
                    }
                    resultSumRuangan.push(result)
                }
            }


            let sama = false
            let resultSumDep = [];
            for (let i in array) {
                sama = false
                for (let x in resultSumDep) {
                    if (resultSumDep[x].namadepartemen == array[i].namadepartemen) {
                        sama = true;
                        resultSumDep[x].total = parseFloat(resultSumDep[x].total) + parseFloat(array[i].total)
                        // resultSumDep[x].namadepartemen = array[i].namadepartemen
                    }
                }
                // let resultGroupingRuangan = []
                if (sama == false) {
                    var dataDetail0 = [];
                    for (var f = 0; f < resultSumRuangan.length; f++) {
                        if (array[i].namadepartemen == resultSumRuangan[f].namadepartemen) {
                            dataDetail0.push([resultSumRuangan[f].namaruangan, resultSumRuangan[f].total]);
                        };
                    }
                    let result = {
                        id: array[i].namadepartemen,
                        name: array[i].namadepartemen,
                        namadepartemen: array[i].namadepartemen,
                        total: array[i].total,
                        data: dataDetail0
                    }
                    resultSumDep.push(result)
                }
            }

            console.log(resultSumDep)
            // drilldown ruangan
            // asupkeun kana series data di CHART
            let totalAll = 0;
            for (let z in resultSumDep) {
                totalAll = totalAll + parseFloat(resultSumDep[z].total)
                let datana = [];
                datana.push({
                    y: parseFloat(resultSumDep[z].total),
                    color: this.colors[z],
                    drilldown: resultSumDep[z].namadepartemen
                });
                series.push({
                    name: resultSumDep[z].namadepartemen,
                    data: datana
                });
            }

            this.isShowTrend = false;
            this.chartPendapatan = new Chart({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    // categories: [" "],
                    // labels: {
                    //     align: 'center',
                    //     style: {
                    //         fontSize: '7px',
                    //         fontFamily: 'Verdana, sans-serif'
                    //     }
                    // },
                    type: 'category'
                },
                yAxis: {
                    title: {
                        text: 'Realisasi Pendapatan'
                    }
                },
                legend: {
                    enabled: true,
                    borderRadius: 5,
                    borderWidth: 1
                },
                // legend: {
                //     enabled: false
                // },
                plotOptions: {
                    column: {
                        // url:"#",
                        cursor: 'pointer',

                        dataLabels: {
                            enabled: true,
                            color: this.colors[1],

                            formatter: function () {
                                return 'Rp. ' + Highcharts.numberFormat(this.y, 0, '.', ',');
                            }
                        },
                        showInLegend: true
                    },
                    series: {
                        cursor: 'pointer',
                    }
                },
                // tooltip: {
                //     formatter: function () {
                //         let point = this.point,
                //             s = this.series.name + ': Rp. ' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' <br/>';
                //         return s;

                //     }

                // },
                credits: {
                    text: 'Total : Rp. ' + Highcharts.numberFormat(totalAll, 0, '.', ',')
                },
                series: series,
                drilldown: {
                    series: resultSumDep,

                }

            })


            //   kelompok pasien
            let samakan = false
            let resultSumKelPasien = [];
            for (let i in array) {
                samakan = false
                for (let x in resultSumKelPasien) {
                    if (resultSumKelPasien[x].namaruangan == array[i].namaruangan &&
                        resultSumKelPasien[x].kelompokpasien == array[i].kelompokpasien) {
                        samakan = true;
                        resultSumKelPasien[x].total = parseFloat(resultSumKelPasien[x].total) + parseFloat(array[i].total)
                        // resultSumKelPasien[x].namaruangan = array[i].namaruangan
                    }
                }
                if (samakan == false) {
                    let result = {
                        namaruangan: array[i].namaruangan,
                        total: array[i].total,
                        namadepartemen: array[i].namadepartemen,
                        kelompokpasien: array[i].kelompokpasien,
                    }
                    resultSumKelPasien.push(result)
                }
            }
            let seriesKelPasien = []
            let sarua = false
            let resultSumKelompokPasien = [];
            for (let i in array) {
                sarua = false
                for (let x in resultSumKelompokPasien) {
                    if (resultSumKelompokPasien[x].kelompokpasien == array[i].kelompokpasien) {
                        sarua = true;
                        resultSumKelompokPasien[x].total = parseFloat(resultSumKelompokPasien[x].total) + parseFloat(array[i].total)
                        // resultSumKelompokPasien[x].kelompokpasien = array[i].kelompokpasien
                    }
                }
                if (sarua == false) {
                    var details = [];
                    var rinci = [];
                    for (var f = 0; f < resultSumKelPasien.length; f++) {
                        if (array[i].kelompokpasien == resultSumKelPasien[f].kelompokpasien) {
                            details.push([resultSumKelPasien[f].namaruangan, resultSumKelPasien[f].total]);
                            rinci.push(resultSumKelPasien[f]);
                        };
                    }
                    let result = {
                        kelompokpasien: array[i].kelompokpasien,
                        total: array[i].total,
                        id: array[i].kelompokpasien,
                        name: array[i].kelompokpasien,
                        data: details,
                        rincian: rinci
                    }
                    resultSumKelompokPasien.push(result)
                }
            }
            console.log(resultSumKelompokPasien)
            // asupkeun kana series data di CHART
            let dataKelPasienPie = []
            let slice = true
            for (let z in resultSumKelompokPasien) {
                let datana = [];
                datana.push({
                    y: parseFloat(resultSumKelompokPasien[z].total),
                    color: this.colors[z],
                    drilldown: resultSumKelompokPasien[z].kelompokpasien
                });

                seriesKelPasien.push({
                    name: resultSumKelompokPasien[z].kelompokpasien,
                    data: datana
                });
                dataKelPasienPie.push({
                    name: resultSumKelompokPasien[z].kelompokpasien,
                    y: parseFloat(resultSumKelompokPasien[z].total),
                    sliced: slice,
                    selected: slice
                });
                slice = false;
            }

            this.chartPerKelompokPasien = new Chart({
                chart: {
                    type: 'column',

                },

                title: {
                    text: ''
                },
                xAxis: {
                    type: 'category',
                    // categories: ["Jumlah "],
                    // labels: {
                    //     align: 'center',
                    //     style: {
                    //         fontSize: '13px',
                    //         fontFamily: 'Verdana, sans-serif'
                    //     }
                    // }
                },
                yAxis: {
                    title: {
                        text: 'Realisasi Pendapatan'
                    }
                },
                plotOptions: {
                    column: {
                        // url:"#",
                        cursor: 'pointer',

                        dataLabels: {
                            enabled: true,
                            color: this.colors[1],

                            formatter: function () {
                                return 'Rp. ' + Highcharts.numberFormat(this.y, 0, '.', ',');
                            }
                        },
                        showInLegend: true
                    },
                    series: {
                        cursor: 'pointer',
                    }
                },
                // tooltip: {
                //     formatter: function () {
                //         let point = this.point,
                //             s = this.series.name + ': Rp. ' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' <br/>';
                //         return s;

                //     }

                // },
                series: seriesKelPasien,
                drilldown: {
                    series: resultSumKelompokPasien
                },
                exporting: {
                    enabled: false
                },
                credits: {
                    // enabled: false
                    text: 'Total : Rp. ' + Highcharts.numberFormat(totalAll, 0, '.', ',')
                },
                legend: {
                    enabled: true,
                    borderRadius: 5,
                    borderWidth: 1
                },

            })
            this.chartPerKelompokPasienPie = new Chart({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: '',

                },
                tooltip: {
                    formatter: function (e) {
                        let point = this.point,
                            s = this.series.name + ': Rp. ' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' <br/>';
                        return s;

                    }

                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            connectorColor: '#000000',
                            formatter: function () {
                                return this.percentage.toFixed(2) + ' %';
                            }
                        },
                        showInLegend: true
                    },

                },
                credits: {
                    text: 'Total : Rp. ' + Highcharts.numberFormat(totalAll, 0, '.', ',')
                    // enabled: false
                },
                legend: {
                    enabled: true,
                    borderRadius: 5,
                    borderWidth: 1
                },
                series: [{
                    type: 'pie',
                    name: 'Total',
                    // colorByPoint: true,
                    data: dataKelPasienPie

                }]
            })
            // end
        })
    }

    getPenerimaan() {
        this.loading = true;
        let awal = this.now.toLocaleDateString() + ' 00:00';
        let akhir = this.now.toLocaleDateString() + ' 23:59';
        this.httpservice.getTransaksi('eis-penerimaan/get-penerimaan-rs?tglAwal=' + awal + '&tglAkhir=' + akhir).subscribe(data => {
            this.dataChartPenerimaan = data
            this.loading = false;
            this.dataGrid = this.dataChartPenerimaan.data
            let array = this.dataChartPenerimaan.data
            let seriesTerima = [];
            let seriesTerimaNonLayanan = [];

            // looping nu sarua deapartemena na jumlahkeun
            let sama = false
            let resultSum = [];
            for (let i in array) {

                sama = false
                for (let x in resultSum) {
                    if (resultSum[x].namadepartemen == array[i].namadepartemen) {
                        sama = true;
                        resultSum[x].totaldibayar = parseFloat(resultSum[x].totaldibayar) + parseFloat(array[i].totaldibayar)
                        resultSum[x].namadepartemen = array[i].namadepartemen
                    }
                }
                if (sama == false) {
                    let result = {
                        namadepartemen: array[i].namadepartemen,
                        totaldibayar: array[i].totaldibayar,
                    }
                    resultSum.push(result)
                }
            }
            // asupkeun kana series data di CHART
            let totalAll = 0;
            let totalNonLayanan = 0
            for (let z in resultSum) {
                if (resultSum[z].namadepartemen != null) {
                    totalAll = totalAll + parseFloat(resultSum[z].totaldibayar)
                    let datana = [];
                    datana.push({
                        y: parseFloat(resultSum[z].totaldibayar),
                        color: this.colors[z],
                        drilldown: true
                    });

                    seriesTerima.push({
                        type: 'column',
                        name: resultSum[z].namadepartemen,
                        data: datana
                    });
                } else {
                    totalNonLayanan = totalNonLayanan + parseFloat(resultSum[z].totaldibayar)
                    let datana = [];
                    datana.push({
                        y: parseFloat(resultSum[z].totaldibayar),
                        color: this.colors[0],
                        drilldown: true
                    });

                    seriesTerimaNonLayanan.push({
                        type: 'column',
                        name: 'Non Layanan',
                        data: datana
                    });
                }

            }

            this.chartPenerimaan = new Chart({
                chart: {
                    // type: 'column',
                    events: {
                        drilldown: function (e) {
                            if (!e.seriesOptions) {

                                var chart = this,
                                    drilldowns = {
                                        'Animals': {
                                            name: 'Animals',
                                            data: [
                                                ['Cows', 2],
                                                ['Sheep', 3]
                                            ]
                                        },
                                        'Fruits': {
                                            name: 'Fruits',
                                            data: [
                                                ['Apples', 5],
                                                ['Oranges', 7],
                                                ['Bananas', 2]
                                            ]
                                        },
                                        'Cars': {
                                            name: 'Cars',
                                            data: [
                                                ['Toyota', 1],
                                                ['Volkswagen', 2],
                                                ['Opel', 5]
                                            ]
                                        }
                                    },
                                    series = drilldowns[e.point.name];

                                // Show the loading label
                                // chart.showLoading('Simulating Ajax ...');

                                setTimeout(function () {
                                    chart.hideLoading();
                                    chart.addSeriesAsDrilldown(e.point, series);
                                }, 1000);
                            }

                        }
                    }
                },

                title: {
                    text: ''
                },
                xAxis: {
                    categories: ["Jumlah "],
                    labels: {
                        align: 'center',
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Penerimaan'
                    }
                },
                plotOptions: {
                    column: {
                        // url:"#",
                        cursor: 'pointer',

                        dataLabels: {
                            enabled: true,
                            color: this.colors[1],

                            formatter: function () {
                                return 'Rp. ' + Highcharts.numberFormat(this.y, 0, '.', ',');
                            }
                        },
                        showInLegend: true
                    },
                    series: {
                        cursor: 'pointer',
                    }
                },
                tooltip: {
                    formatter: function () {
                        let point = this.point,
                            s = this.series.name + ': Rp. ' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' <br/>';
                        return s;

                    }

                },
                series: seriesTerima,
                drilldown: {
                    series: []
                },
                exporting: {
                    enabled: false
                },
                credits: {
                    // enabled: false
                    text: 'Total : Rp. ' + Highcharts.numberFormat(totalAll, 0, '.', ',')
                },
                legend: {
                    enabled: true,
                    borderRadius: 5,
                    borderWidth: 1
                },

            })
            // chart Penerimaan Non Layanan
            this.chartPenerimaanNonLayanan = new Chart({
                chart: {
                    // type: 'column',
                    events: {
                        drilldown: function (e) {
                            if (!e.seriesOptions) {

                                var chart = this,
                                    drilldowns = {
                                        'Animals': {
                                            name: 'Animals',
                                            data: [
                                                ['Cows', 2],
                                                ['Sheep', 3]
                                            ]
                                        },
                                        'Fruits': {
                                            name: 'Fruits',
                                            data: [
                                                ['Apples', 5],
                                                ['Oranges', 7],
                                                ['Bananas', 2]
                                            ]
                                        },
                                        'Cars': {
                                            name: 'Cars',
                                            data: [
                                                ['Toyota', 1],
                                                ['Volkswagen', 2],
                                                ['Opel', 5]
                                            ]
                                        }
                                    },
                                    series = drilldowns[e.point.name];

                                // Show the loading label
                                // chart.showLoading('Simulating Ajax ...');

                                setTimeout(function () {
                                    chart.hideLoading();
                                    chart.addSeriesAsDrilldown(e.point, series);
                                }, 1000);
                            }

                        }
                    }
                },

                title: {
                    text: ''
                },
                xAxis: {
                    categories: ["Jumlah "],
                    labels: {
                        align: 'center',
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Penerimaan'
                    }
                },
                plotOptions: {
                    column: {
                        // url:"#",
                        cursor: 'pointer',

                        dataLabels: {
                            enabled: true,
                            color: this.colors[1],

                            formatter: function () {
                                return 'Rp. ' + Highcharts.numberFormat(this.y, 0, '.', ',');
                            }
                        },
                        showInLegend: true
                    },
                    series: {
                        cursor: 'pointer',
                    }
                },
                tooltip: {
                    formatter: function () {
                        let point = this.point,
                            s = this.series.name + ': Rp. ' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' <br/>';
                        return s;

                    }

                },
                series: seriesTerimaNonLayanan,
                drilldown: {
                    series: []
                },
                exporting: {
                    enabled: false
                },
                credits: {
                    // enabled: false
                    text: 'Total : Rp. ' + Highcharts.numberFormat(totalNonLayanan, 0, '.', ',')
                },
                legend: {
                    enabled: true,
                    borderRadius: 5,
                    borderWidth: 1
                },

            })
            // end NOn Layanan
        })
    }

    getTargetRealisasi() {
        this.isShowCapaianTarget = true
        this.httpservice.getTransaksi('eis-penerimaan/get-realisasitarget').subscribe(data => {
            this.resultRealisasiCapaian = data
            let resultRJ = this.resultRealisasiCapaian.Rajal
            let seriesRJTarget = []
            let seriesRJCapaian = []

            for (let i in resultRJ) {
                seriesRJTarget.push({
                    y: parseFloat(resultRJ[i].totaltarget),
                    color: this.colorNyieun[i]
                })
                seriesRJCapaian.push(
                    parseFloat(resultRJ[i].total)
                )
            }
            this.isShowCapaianTarget = false

            this.chartTargetRealisiRJ = new Chart({
                
                chart: {
                    zoomType: 'xy'
                },
                title: {
                    text: ''
                },

                subtitle: {
                    text: ''
                },
                xAxis: [{
                    categories: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
                    crosshair: true
                }],
                yAxis: [{
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: 'Realisasi Pendapatan',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }, { // Secondary yAxis
                    title: {
                        text: '',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    opposite: true
                }],
                tooltip: {
                    shared: true
                },
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                // legend: {
                //     layout: 'vertical',
                //     align: 'left',
                //     x: 120,
                //     verticalAlign: 'top',
                //     y: 100,
                //     floating: true,
                //     backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                // },
                legend: {
                    enabled: true,
                    borderRadius: 5,
                    borderWidth: 1
                },
                series: [{
                    name: 'Target',
                    type: 'column',
                    yAxis: 1,
                    data: seriesRJTarget,
                    // tooltip: {
                    //     valueSuffix: ' mm'
                    // }

                }, {
                    name: 'Capaian',
                    type: 'spline',
                    data: seriesRJCapaian,
                    // tooltip: {
                    //     valueSuffix: '°C'
                    // }
                }]
            });
        })
    }
    formatDate(value) {
        if (value == null || value == undefined) {
            return null
        } else {
            let hari = ("0" + value.getDate()).slice(-2)
            let bulan = ("0" + (value.getMonth() + 1)).slice(-2)
            let tahun = value.getFullYear()
            let format = hari + '. ' + bulan
            return format
        }
    }
    getTrendPendapatan() {
        let tipe = 'seminggu';
        this.isShowTrendPen = true
        // tglna di backend
        this.httpservice.getTransaksi('eis-pendapatan/get-pendapatan-rs?tipe='+tipe).subscribe(data => {

            this.dataChartTend = data
            let array = this.dataChartTend.data
            let categories = []
            let periodeCatego = []
            // totalkeun hela
            for (let i in array) {
                array[i].tgl = new Date(array[i].tglpencarian).toDateString()//.substring(4, 10)
                array[i].total = parseFloat(array[i].total)
            }
            let samateuuu = false
            let sumKeun = [];
            for (let i in array) {
                samateuuu = false
                for (let x in sumKeun) {
                    if (sumKeun[x].tgl == array[i].tgl) {
                        sumKeun[x].total = parseFloat(sumKeun[x].total) + parseFloat(array[i].total)
                        sumKeun[x].tgl = array[i].tgl
                        samateuuu = true;
                    }
                }
                if (samateuuu == false) {
                    let result = {
                        tgl: array[i].tgl,
                        total: array[i].total,
                    }
                    sumKeun.push(result)
                }
            }
            let dataSeries = []
            for (let i in sumKeun) {
                dataSeries.push(sumKeun[i].total
                );
                categories.push(sumKeun[i].tgl.substring(4, 10))
                periodeCatego.push(sumKeun[i].tgl)
            }
            this.isShowTrendPen = false
            console.log(sumKeun)
            this.chartTrendPendapatan = new Chart({
                chart: {
                    type: 'area',
                    spacingBottom: 30
                },
                title: {
                    text: ''
                },

                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: categories,
                },
                yAxis: {
                    title: {
                        text: 'Jumlah'
                    }
                },

                legend: {
                    layout: 'vertical',
                    align: 'right',
                    borderRadius: 5,
                    borderWidth: 1,
                    verticalAlign: 'middle'
                },
                plotOptions: {
                    // area: {
                    //     stacking: 'normal',
                    //     lineColor: '#666666',
                    //     lineWidth: 1,
                    //     marker: {
                    //         lineWidth: 1,
                    //         lineColor: '#666666'
                    //     }
                    // },
                    // line: {
                    //     dataLabels: {
                    //         enabled: true,
                    //         color: this.colors[1],

                    //         formatter: function () {
                    //             return 'Rp. ' + Highcharts.numberFormat(this.y, 0, '.', ',');
                    //         }
                    //     },
                    //     enableMouseTracking: false
                    // },
                    area: {
                        // url:"#",
                        cursor: 'pointer',

                        dataLabels: {
                            enabled: true,
                            color: this.colors[1],

                            formatter: function () {
                                return 'Rp. ' + Highcharts.numberFormat(this.y, 0, '.', ',');
                            }
                        },
                        showInLegend: true
                    },
                    series: {
                        cursor: 'pointer',
                    }
                },
                tooltip: {
                    formatter: function () {
                        let point = this.point,
                            s = this.series.name + ': Rp. ' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' <br/>';
                        return s;

                    }

                },
                // plotOptions: {
                //     series: {
                //         label: {
                //             connectorAllowed: false
                //         },
                //         pointStart: 2010
                //     }
                // },

                series: [{
                    name: 'Trend Pendapatan RS',
                    data: dataSeries,
                    color: '#00c0ef'
                }],
                credits: {
                    enabled: false
                },

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
            })
        })
    }
}
