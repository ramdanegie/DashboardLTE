import { Component, AfterViewInit, OnInit, PipeTransform, Pipe, ViewChild } from '@angular/core';
import * as Prism from 'prismjs';
import { AppService } from '../shared/app.service';
import { Chart, Highcharts, MapChart, HIGHCHARTS_MODULES } from 'angular-highcharts';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';


let $;
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements AfterViewInit, OnInit {
    apiTimer: any;
    counter = 10;
    colorNyieun = ['#7cb5ec', '#75b2a3', '#9ebfcc', '#acdda8', '#d7f4d2', '#ccf2e8',
        '#468499', '#088da5', '#00ced1', '#3399ff', '#00ff7f',
        '#b4eeb4', '#a0db8e', '#999999', '#6897bb', '#0099cc', '#3b5998',
        '#000080', '#191970', '#8a2be2', '#31698a', '#87ff8a', '#49e334',
        '#13ec30', '#7faf7a', '#408055', '#09790e'];
    // colorNyieun = ['#C71585'];
    // colorNyieun = ['#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000',
    //     '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000',
    //     '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000',
    //     '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000',
    //     '#FF0000', '#FF0000', '#FF0000', '#FF0000'];
    // ['#7cb5ec', '#FF0000', '#C71585', '#434348', '#90ed7d', '#f7a35c',
    // '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b',
    // '#91e8e1', '#CD5C5C', '#FF69B4', '#FF8C00', '#9370DB', '#ADFF2F',
    // '#00FF00', '#9ACD32', '#66CDAA', '#00FFFF', '#4682B4', '#800000',
    // '#CD853F', '#191970', '#1E90FF', '#00CED1']
    colorPenjadwalan = ['#00FF00', '#00CED1', '#6495ED', '#D2B48C', '#9932CC'];
    displayedColumns = ['namaruangan', 'total', 'belumperiksa', 'diperiksa', 'batalregistrasi'];
    dataSource: MatTableDataSource<dataGridInfoRuangan>;
    // displayedColumnsBor = ['bulan', 'bor', 'alos', 'bto', 'toi', 'gdr', 'ndr'];
    // dataSourceBor: MatTableDataSource<dataGridBorLos>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    // @ViewChild(MatPaginator) paginator2: MatPaginator;
    // @ViewChild(MatSort) sort2: MatSort;
    dataPasien: any;
    countRajal: any;
    countIgd: any;
    countRanap: any;
    countRadiologi: any;
    countLab: any;
    countBedah: any;
    countRehab: any;
    countTotal: any;
    countGeriatri: any;
    countCeweDewasa: any;
    countAnakLaki: any;
    countAnakCewe: any;
    countBalitaLaki: any;
    countBalitaCewe: any;
    ttKelas1: any;
    ttKelas2: any;
    ttKelas3: any;
    ttVipA: any;
    ttVipB: any;
    ttNonKelas: any;
    ttJumlah: any;
    gridInfoKedatangan: any;
    gridBorLos: any;
    tempatTidurTerpakai: any;
    tempatTidurKosong: any;
    trendKunjungan: any;
    public now: Date = new Date();
    tanggal = new Date().toLocaleDateString();
    arr = this.tanggal.split('/');
    series = [];
    categories = [];
    data1 = [];
    data2 = [];
    data3 = [];
    data4 = [];
    data5 = [];

    colors = Highcharts.getOptions().colors;
    dataChartKunjunganRs: any;
    resChartKunjunganRs: any;
    chartKunjunganRs: any;
    chart: any;
    chartKunjungnJenisPasien: any;
    datachartKunjungnJenisPasien: any;
    data10PerujukBpjs: any;
    chart10PerujukBpjs: any;
    chart10Diagnosa: any;
    data10Diagnosa: any;
    dataKunjunganRanap: any;
    chartKunjunganRanap: any;
    chartJenisPelayanan: any;
    dataJenisPelayanan: any;
    chartJenisPenjadwalanPie: any;
    dataJenisPenjadwalanPie: any;
    chartJenisPenjadwalanLine: any;
    datajenisPenjadwalanLine: any;
    dataPenjadwalan: any;
    tahun: any;
    JmlBulan: number;
    JmlBOR: string;
    JmlLOS: string;
    JmlTOI: string;
    JmlNDR: string;
    JmlGDR: string;
    JmlBTO: string;
    chartCaraDaftarRajal: any;
    chartCaraDaftarRanap: any;
    chartCaraDaftarIgd: any;
    chartCaraDaftarRehab: any;
    chartCaraDaftarLab: any;
    chartCaraDaftarRad: any;
    isShowTrend = false;
    isShowCaraDaftar = false;
    mapChartDKI: any;
    dataMap: any;
    lat: number = 51.678418;
    lng: number = 7.809007;
    chartDetailKelompokPasien: any;
    showRawatJalan: boolean = false;
    showIGD: boolean = false;
    showRawatInap: boolean = false;
    showLab: boolean = false;
    showRad: boolean = false;
    showRehab: boolean = false;
    dataTableRajal: any;
    dataTableFarmasi: any;
    totalRecords: any;
    idRuanganSearch: any;
    items: any;
    showTerlayani: boolean = false
    showFarmasi: boolean = false;
    showMendaftar: boolean = true;
    dataPasienTerlayni: any;
    countRajalTerlayani: number = 0;
    countIgdTerlayani: number = 0;
    countRanapTerlayani: number = 0;
    countRadiologiTerlayani: number = 0;
    countLabTerlayani: number = 0;
    countBedahTerlayani: number = 0;
    countRehabTerlayani: number = 0;
    countTotalTerlayani: number = 0;
    countFarmasiTerlayani: number = 0;
    countMasihDirawatTerlayani: number = 0;
    types: any[];
    constructor(public appservice: AppService) {
        this.types = [
            { label: 'Pasien Terlayani', value: this.showTerlayani = true, icon: 'fa fa-fw fa-user' },
            { label: 'Pasien Mendaftar', value: this.showTerlayani = false, icon: 'fa fa-fw fa-users' },

        ];
    }


    ngOnInit() {
        this.apiTimer = setInterval(() => {
            this.getCountPasienDaftar();
            this.getCountTerlayani();
            this.getTempatTidur()
            this.getBorLos()
            this.getTrendRajal()
            this.getChartPenjadwalan()
            this.getKunjunganRsandJenisPasien()
            this.getDiagnosaAsalPerujuk()
        }, (this.counter * 6000)); //60 detik

        this.items = [
            {
                label: 'Pasien Daftar', icon: 'fa fa-refresh', command: () => {
                    // this.update();
                }
            },
            {
                label: 'Antrian', icon: 'fa fa-close', command: () => {
                    // this.delete();
                }
            }
        ];
        this.countRajal = 0;
        this.countIgd = 0;
        this.countRanap = 0;
        this.countRadiologi = 0;
        this.countLab = 0;
        this.countBedah = 0;
        this.countRehab = 0;
        this.countTotal = 0;
        this.countGeriatri = 0;
        this.countCeweDewasa = 0;
        this.countAnakLaki = 0;
        this.countAnakCewe = 0;
        this.countBalitaLaki = 0;
        this.countBalitaCewe = 0;
        this.ttKelas1 = 0;
        this.ttKelas2 = 0;
        this.ttKelas3 = 0;
        this.ttVipA = 0;
        this.ttVipB = 0;
        this.ttNonKelas = 0;
        this.ttJumlah = 0;

        this.getCountPasienDaftar();
        this.getCountTerlayani();
        this.getTempatTidur()
        this.getBorLos()
        this.getTrendRajal()
        this.getChartPenjadwalan()
        this.getKunjunganRsandJenisPasien()
        this.getDiagnosaAsalPerujuk()
    }

    getCountPasienDaftar() {
        this.appservice.getTransaksi('eis/get-count-pasien').subscribe(data => {
            this.dataPasien = data;
            this.countRajal = this.dataPasien.rawat_jalan;
            this.countIgd = this.dataPasien.igd;
            this.countRanap = this.dataPasien.rawat_inap;
            this.countRadiologi = this.dataPasien.radiologi;
            this.countLab = this.dataPasien.laboratorium;
            this.countBedah = this.dataPasien.operasi;
            this.countRehab = this.dataPasien.rehab_medik;
            this.countTotal = this.dataPasien.jumlah;
        })
    }
    getCountTerlayani() {
        this.appservice.getTransaksi('eis/get-count-pasien-terlayani').subscribe(data => {
            this.dataPasienTerlayni = data;
            this.countRajalTerlayani = this.dataPasienTerlayni.data.rawat_jalan;
            this.countIgdTerlayani = this.dataPasienTerlayni.data.igd;
            this.countRanapTerlayani = this.dataPasienTerlayni.rawat_inap;
            this.countRadiologiTerlayani = this.dataPasienTerlayni.data.radiologi;
            this.countLabTerlayani = this.dataPasienTerlayni.data.laboratorium;
            this.countBedahTerlayani = this.dataPasienTerlayni.data.operasi;
            this.countRehabTerlayani = this.dataPasienTerlayni.data.rehab_medik;
            this.countTotalTerlayani = this.dataPasienTerlayni.data.jumlah;
            this.countFarmasiTerlayani = this.dataPasienTerlayni.farmasi;
            this.countMasihDirawatTerlayani = this.dataPasienTerlayni.masihDirawat;


        })

    }
    getTempatTidur() {
        this.appservice.getTransaksi('eis/get-tempattidur-terpakai').subscribe(data2 => {
            this.tempatTidurTerpakai = data2;
            this.countGeriatri = this.tempatTidurTerpakai.geriatri;
            this.countCeweDewasa = this.tempatTidurTerpakai.perempuandewasa;
            this.countAnakLaki = this.tempatTidurTerpakai.anaklaki;
            this.countAnakCewe = this.tempatTidurTerpakai.anakperempuan;
            this.countBalitaLaki = this.tempatTidurTerpakai.balitalaki;
            this.countBalitaCewe = this.tempatTidurTerpakai.balitaperempuan;
        })
        this.appservice.getTransaksi('eis/get-tempattidur-perkelas').subscribe(data => {
            this.tempatTidurKosong = data;
            this.ttKelas1 = this.tempatTidurKosong.kelas_1;
            this.ttKelas2 = this.tempatTidurKosong.kelas_2;
            this.ttKelas3 = this.tempatTidurKosong.kelas_3;
            this.ttVipA = this.tempatTidurKosong.vip_a;
            this.ttVipB = this.tempatTidurKosong.vip_b;
            this.ttNonKelas = this.tempatTidurKosong.non_kelas;
            this.ttJumlah = this.tempatTidurKosong.jumlah;

        })
        this.appservice.getTransaksi('eis/get-info-kunjungan-rawatjalan').subscribe(data3 => {
            this.gridInfoKedatangan = data3;
            this.dataSource = new MatTableDataSource(this.gridInfoKedatangan);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

        })
    }
    getBorLos() {
        this.appservice.getTransaksi('eis/get-borlostoi').subscribe(data => {
            this.gridBorLos = data;

            // let tahun;
            let Bulan = 0;
            let BOR = 0;
            let LOS = 0;
            let TOI = 0;
            let NDR = 0;
            let GDR = 0;
            let BTO = 0;
            for (let i in this.gridBorLos) {
                this.tahun = this.gridBorLos[i].tahun
                Bulan += 1;
                BOR += this.gridBorLos[i].bor;
                LOS += this.gridBorLos[i].alos;
                TOI += this.gridBorLos[i].toi;
                NDR += this.gridBorLos[i].ndr;
                GDR += this.gridBorLos[i].gdr;
                BTO += this.gridBorLos[i].bto;
            }
            this.JmlBOR = (BOR / Bulan).toFixed(2);
            this.JmlLOS = (LOS / Bulan).toFixed(2);
            this.JmlTOI = (TOI / Bulan).toFixed(2);
            this.JmlNDR = (NDR / Bulan).toFixed(2);
            this.JmlGDR = (GDR / Bulan).toFixed(2);
            this.JmlBTO = (BTO / Bulan).toFixed(2);


            // this.dataSourceBor = new MatTableDataSource(this.gridBorLos);
            // this.dataSourceBor.paginator = this.paginator2;
            // this.dataSourceBor.sort = this.sort2;

        })
    }
    getTrendRajal() {
        this.isShowTrend = true;
        this.appservice.getTransaksi('eis/get-trend-kunjungan-rawatjalan').subscribe(data => {
            this.isShowTrend = false;
           let trend = data;
           let data1 =[]
           let data2 =[]
           let data3 =[]
           let data4 =[]
           let categories=[]
            for (let i in trend) {
                data1.push({
                    y: parseFloat(trend[i].totalterdaftar),
                    color: this.colorNyieun[i]
                });
            }
            for (let i in trend) {
                data2.push({
                    y: parseFloat(trend[i].diperiksa),
                    color: this.colorNyieun[i]
                });
            }
            for (let i in trend) {
                data3.push({
                    y: parseFloat(trend[i].belumperiksa),
                    color: this.colorNyieun[i]
                });
            }
            for (let i in trend) {
                data4.push({
                    y: parseFloat(trend[i].batalregistrasi),
                    color: this.colorNyieun[i]
                });
            }
            for (let i in trend) {
               categories.push(trend[i].tanggal);
            }
            // console.log(this.categories);
            this.chart = new Chart({
                chart: {
                    zoomType: 'x',
                    spacingRight: 20
                },
                title: {
                    text: ''
                },

                xAxis: {
                    categories: categories,
                    crosshair: true,
                    // type: 'datetime',
                    //  maxZoom: 24 * 3600 * 1000, // fourteen days
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    title: {
                        text: 'Jumlah Pasien'
                    }
                },
                tooltip: {
                    shared: true
                },
                legend: {
                    enabled: true,
                    borderRadius: 5,
                    borderWidth: 1,
                    // backgroundColor:undefined
                },
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                // [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0])]
                            ]
                        },
                        lineWidth: 1,
                        marker: {
                            enabled: true
                        },
                        shadow: false,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    },
                    column: {
                        cursor: 'pointer',

                        dataLabels: {
                            enabled: true,
                            color: this.colors[1],

                            formatter: function () {
                                return Highcharts.numberFormat(this.y, 0, '.', ',');
                            }
                        },
                        showInLegend: true
                    },
                    //line: {
                    //    cursor: 'pointer',

                    //    dataLabels: {
                    //        enabled: true,
                    //        color: colors[0],
                    //        style: {
                    //            fontWeight: 'bold'
                    //        },
                    //        formatter: function () {
                    //            return Highcharts.numberFormat(this.y, 0, '.', ',');
                    //        }
                    //    },
                    //    showInLegend: true
                    //}
                },
                credits: {
                    enabled: false
                },

                series: [{
                    type: 'column',
                    name: 'Total Terdaftar',
                    // pointInterval: 24 * 3600 * 1000,
                    // pointStart: Date.UTC(parseFloat(this.arr[2]), parseFloat(this.arr[1]) - 1, parseFloat('01')),
                    data: data1,

                },
                {
                    type: 'line',
                    name: 'Sudah Diperiksa',
                    // pointInterval: 24 * 3600 * 1000,
                    // pointStart: Date.UTC(parseFloat(this.arr[2]), parseFloat(this.arr[1]) - 1, parseFloat('01')),
                    data: data2,
                },
                {
                    type: 'line',
                    name: 'Belum Diperiksa',
                    // pointInterval: 24 * 3600 * 1000,
                    // pointStart: Date.UTC(parseFloat(this.arr[2]), parseFloat(this.arr[1]) - 1, parseFloat('01')),
                    data: data3,
                },
                {
                    type: 'line',
                    name: 'Batal Registrasi',
                    // pointInterval: 24 * 3600 * 1000,
                    // pointStart: Date.UTC(parseFloat(this.arr[2]), parseFloat(this.arr[1]) - 1, parseFloat('01')),
                    data: data4,
                }
                ]

            })

        })
    }
    getChartPenjadwalan() {
        // chart jenis penjadwalan pie
        this.isShowCaraDaftar = true;
        this.appservice.getTransaksi('eis/get-pasien-perjenis-penjadwalan').subscribe(data => {
            this.dataPenjadwalan = data;
            this.isShowCaraDaftar = false;
            let series = [];
            let categories = [];
            let loopIndex = 0;
            let dataPie = [];
            let ranap = [];
            let rajal = [];
            let rehab = [];
            let igd = [];
            let lab = [];
            let rad = [];
            for (let i in this.dataPenjadwalan.data) {
                categories.push(this.dataPenjadwalan.data[i].keterangan);
                let dataz2 = [];
                let dataRajal = [];
                let dataRanap = [];
                let dataRehab = [];
                let dataIGD = [];
                let dataLab = [];
                let dataRad = [];
                dataz2.push({
                    y: parseFloat(this.dataPenjadwalan.data[i].jumlah),
                    color: this.colors[i]
                });
                dataRajal.push({
                    y: parseFloat(this.dataPenjadwalan.data[i].rawatjalan),
                    color: this.colors[i]
                });
                dataRanap.push({
                    y: parseFloat(this.dataPenjadwalan.data[i].rawat_inap),
                    color: this.colors[i]
                });
                dataRehab.push({
                    y: parseFloat(this.dataPenjadwalan.data[i].rehab_medik),
                    color: this.colors[i]
                });
                dataIGD.push({
                    y: parseFloat(this.dataPenjadwalan.data[i].igd),
                    color: this.colors[i]
                });
                dataLab.push({
                    y: parseFloat(this.dataPenjadwalan.data[i].laboratorium),
                    color: this.colors[i]
                });
                dataRad.push({
                    y: parseFloat(this.dataPenjadwalan.data[i].radiologi),
                    color: this.colors[i]
                });
                // asupkeun kabeh data

                dataPie.push([
                    this.dataPenjadwalan.data[i].keterangan,
                    parseFloat(this.dataPenjadwalan.data[i].jumlah)
                ]);
                series.push({
                    name: this.dataPenjadwalan.data[i].keterangan,
                    data: dataz2
                });
                rajal.push({
                    name: this.dataPenjadwalan.data[i].keterangan,
                    data: dataRajal
                });
                ranap.push({
                    name: this.dataPenjadwalan.data[i].keterangan,
                    data: dataRanap
                });
                igd.push({
                    name: this.dataPenjadwalan.data[i].keterangan,
                    data: dataIGD
                });
                rehab.push({
                    name: this.dataPenjadwalan.data[i].keterangan,
                    data: dataRehab
                });
                lab.push({
                    name: this.dataPenjadwalan.data[i].keterangan,
                    data: dataLab
                });
                rad.push({
                    name: this.dataPenjadwalan.data[i].keterangan,
                    data: dataRad
                });
                //end  asupkeun kabeh data

            }
            // console.log(dataPie);
            this.chartJenisPenjadwalanPie = new Chart({
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45
                    }
                },
                title: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: true,
                    borderRadius: 5,
                    borderWidth: 1
                },
                plotOptions: {
                    pie: {
                        innerSize: 100,
                        depth: 45,
                        dataLabels: {
                            enabled: true,
                            color: this.colors[1],
                            style: {
                                fontWeight: 'none'
                            },
                            formatter: function () {
                                return Highcharts.numberFormat(this.y, 0, '.', ',') + ' Pasien';
                            }
                        },
                        showInLegend: true
                    }
                },

                series: [{
                    name: 'Jumlah Kunjungan',
                    data: dataPie
                    // [
                    //     ['Bananas', 8],
                    //     ['Kiwi', 3],
                    //     ['Mixed nuts', 1],
                    //     ['Oranges', 6],
                    //     ['Apples', 8],
                    //     ['Pears', 4],
                    //     ['Clementines', 4],
                    //     ['Reddish (bag)', 1],
                    //     ['Grapes (bunch)', 1]
                    // ]
                }]
            })

            // line
            this.chartJenisPenjadwalanLine = new Chart({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['Jumlah'],
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
                        text: 'Kunjungan Pasien'
                    }
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        cursor: 'pointer',

                        dataLabels: {
                            enabled: true,
                            color: this.colors[1],
                            style: {
                                fontWeight: 'none'
                            },
                            formatter: function () {
                                return Highcharts.numberFormat(this.y, 0, '.', ',') + ' Pasien';
                            }
                        },
                        showInLegend: true
                    }
                },

                series: series,
                legend: {
                    borderRadius: 5,
                    borderWidth: 1,
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
                // responsive: {
                //     rules: [{
                //         condition: {
                //             maxWidth: 500
                //         },
                //         chartOptions: {
                //             legend: {
                //                 layout: 'horizontal',
                //                 align: 'center',
                //                 verticalAlign: 'bottom'
                //             }
                //         }
                //     }]
                // }
            })
            // rawat jalan
            this.chartCaraDaftarRajal = new Chart({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['Jumlah'],
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
                        text: 'Kunjungan Pasien'
                    }
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        cursor: 'pointer',

                        dataLabels: {
                            enabled: true,
                            color: this.colors[1],
                            style: {
                                fontWeight: 'none'
                            },
                            formatter: function () {
                                return Highcharts.numberFormat(this.y, 0, '.', ',') + ' Pasien';
                            }
                        },
                        showInLegend: true
                    }
                },

                series: rajal,
                legend: {
                    borderRadius: 5,
                    borderWidth: 1,
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

            })
            // end rajal
            // rawat inap
            this.chartCaraDaftarRanap = new Chart({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['Jumlah'],
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
                        text: 'Kunjungan Pasien'
                    }
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        cursor: 'pointer',

                        dataLabels: {
                            enabled: true,
                            color: this.colors[1],
                            style: {
                                fontWeight: 'none'
                            },
                            formatter: function () {
                                return Highcharts.numberFormat(this.y, 0, '.', ',') + ' Pasien';
                            }
                        },
                        showInLegend: true
                    }
                },

                series: ranap,
                legend: {
                    borderRadius: 5,
                    borderWidth: 1,
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

            })
            // end ranap
            // rehab
            this.chartCaraDaftarRehab = new Chart({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['Jumlah'],
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
                        text: 'Kunjungan Pasien'
                    }
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        cursor: 'pointer',

                        dataLabels: {
                            enabled: true,
                            color: this.colors[1],
                            style: {
                                fontWeight: 'none'
                            },
                            formatter: function () {
                                return Highcharts.numberFormat(this.y, 0, '.', ',') + ' Pasien';
                            }
                        },
                        showInLegend: true
                    }
                },

                series: rehab,
                legend: {
                    borderRadius: 5,
                    borderWidth: 1,
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

            })
            // end rehab
            // igd
            this.chartCaraDaftarIgd = new Chart({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['Jumlah'],
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
                        text: 'Kunjungan Pasien'
                    }
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        cursor: 'pointer',

                        dataLabels: {
                            enabled: true,
                            color: this.colors[1],
                            style: {
                                fontWeight: 'none'
                            },
                            formatter: function () {
                                return Highcharts.numberFormat(this.y, 0, '.', ',') + ' Pasien';
                            }
                        },
                        showInLegend: true
                    }
                },

                series: igd,
                legend: {
                    borderRadius: 5,
                    borderWidth: 1,
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

            })
            // end igd
            // lab
            this.chartCaraDaftarLab = new Chart({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['Jumlah'],
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
                        text: 'Kunjungan Pasien'
                    }
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        cursor: 'pointer',

                        dataLabels: {
                            enabled: true,
                            color: this.colors[1],
                            style: {
                                fontWeight: 'none'
                            },
                            formatter: function () {
                                return Highcharts.numberFormat(this.y, 0, '.', ',') + ' Pasien';
                            }
                        },
                        showInLegend: true
                    }
                },

                series: lab,
                legend: {
                    borderRadius: 5,
                    borderWidth: 1,
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

            })
            // end lab
            // rad
            this.chartCaraDaftarRad = new Chart({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['Jumlah'],
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
                        text: 'Kunjungan Pasien'
                    }
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        cursor: 'pointer',

                        dataLabels: {
                            enabled: true,
                            color: this.colors[1],
                            style: {
                                fontWeight: 'none'
                            },
                            formatter: function () {
                                return Highcharts.numberFormat(this.y, 0, '.', ',') + ' Pasien';
                            }
                        },
                        showInLegend: true
                    }
                },

                series: rad,
                legend: {
                    borderRadius: 5,
                    borderWidth: 1,
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

            })
            // end rad
        })
        // end pie
    }
    getKunjunganRsandJenisPasien() {

        this.appservice.getTransaksi('eis/get-kunjungan-rs').subscribe(data => {
            this.resChartKunjunganRs = data;
            this.chartKunjunganRs = new Chart({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['Jumlah'],
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
                        text: 'Kunjungan Pasien'
                    }
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        cursor: 'pointer',

                        dataLabels: {
                            enabled: true,
                            color: this.colors[1],
                            style: {
                                fontWeight: 'none'
                            },
                            formatter: function () {
                                return Highcharts.numberFormat(this.y, 0, '.', ',') + ' Pasien';
                            }
                        },
                        showInLegend: true
                    }
                },
                legend: {
                    borderRadius: 5,
                    borderWidth: 1,
                    // layout: 'vertical',
                    // align: 'right',
                    // verticalAlign: 'middle'
                },
                series: [
                    {
                        name: 'Instalasi Rawat Jalan',
                        data: [this.resChartKunjunganRs.rawatjalan]
                    },
                    {
                        name: 'Instalasi Rawat Inap',
                        data: [this.resChartKunjunganRs.rawatinap]
                    }, {
                        name: 'Instalasi Gawat Darurat',
                        data: [this.resChartKunjunganRs.igd]
                    },
                    {
                        name: 'Instalasi Rehabilitasi Medik',
                        data: [this.resChartKunjunganRs.rehabmedik]
                    },

                ]
            })

        })
        //   chart kunjungan berdasarkan jenispasien
        this.appservice.getTransaksi('eis/get-kunjungan-perjenispasien').subscribe(data => {
            this.datachartKunjungnJenisPasien = data;

            let dataz = [];
            let slice = true;
            let jmlPasien = 0;
            for (let i in this.datachartKunjungnJenisPasien.dataAll) {
                // let sum = _.reduce( this.datachartKunjungnJenisPasien[i],
                //     function (memo, num) {
                //         return memo + Number(num.SumPatient);
                //     }, 0);
                dataz.push({
                    name: this.datachartKunjungnJenisPasien.dataAll[i].kelompokpasien,
                    y: parseFloat(this.datachartKunjungnJenisPasien.dataAll[i].jumlah),
                    sliced: slice,
                    selected: slice
                });
                slice = false;
                jmlPasien = jmlPasien + parseFloat(this.datachartKunjungnJenisPasien.dataAll[i].jumlah)
            }
            this.chartKunjungnJenisPasien = new Chart({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: '',

                },
                // tooltip: {
                //     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                // },
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
                    text: 'Total Pasien ' + jmlPasien,
                    // enabled: false
                },
                legend: {
                    enabled: true,
                    borderRadius: 5,
                    borderWidth: 1
                },
                series: [{
                    type: 'pie',
                    name: 'Persentase Kunjungan Pasien',
                    // colorByPoint: true,
                    data: dataz

                }]
            })

            let categoriesss = [];
            let bpjs = [];
            let asuransi = [];
            let umum = [];
            let perusahaan = [];
            let perjanjian = [];
            for (let i in this.datachartKunjungnJenisPasien.data) {
                categoriesss.push(this.datachartKunjungnJenisPasien.data[i].namadepartemen);
                bpjs.push(
                    parseFloat(this.datachartKunjungnJenisPasien.data[i].jmlBPJS)
                );
                asuransi.push(
                    parseFloat(this.datachartKunjungnJenisPasien.data[i].jmlAsuransiLain)
                );
                umum.push(
                    parseFloat(this.datachartKunjungnJenisPasien.data[i].jmlUmum)
                );
                perusahaan.push(
                    parseFloat(this.datachartKunjungnJenisPasien.data[i].jmlPerusahaan)
                );
                perjanjian.push(
                    parseFloat(this.datachartKunjungnJenisPasien.data[i].jmlPerjanjian)
                );
            }
            this.chartDetailKelompokPasien = new Chart({
                chart: {
                    type: 'column'
                },

                title: {
                    text: ''
                },

                xAxis: {
                    categories: categoriesss//['REGULER', 'EKSEKUTIF']
                },

                yAxis: {
                    allowDecimals: false,
                    min: 0,
                    title: {
                        text: 'Jumlah Pasien'
                    }
                },

                tooltip: {
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' +
                            this.series.name + ': ' + this.y + '<br/>' +
                            'Total: ' + this.point.stackTotal;
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        cursor: 'pointer',

                        dataLabels: {
                            enabled: true,
                            color: this.colors[1],
                            style: {
                                fontWeight: 'none'
                            },
                            formatter: function () {
                                return Highcharts.numberFormat(this.y, 0, '.', ',');
                            }
                        },
                        showInLegend: true
                    }
                },
                // plotOptions: {
                //     column: {
                //         stacking: 'normal'
                //     }
                // },
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: true,
                    reversed: false,
                    borderRadius: 5,
                    borderWidth: 1
                },
                series: [
                    {
                        name: 'BPJS',
                        data: bpjs
                    },
                    {
                        name: 'Umum/Pribadi',
                        data: umum
                    },
                    {
                        name: 'Perusahaan',
                        data: perusahaan
                    },
                    {
                        name: 'Asuransi Lain',
                        data: asuransi
                    },
                    {
                        name: 'Perjanjian',
                        data: perjanjian
                    }

                ]
            })
        })
        // end
    }
    getDiagnosaAsalPerujuk() {
        //   chart 10 Besar Asal Perujuk Pasien BPJS
        this.appservice.getTransaksi('eis/get-topten-asalperujuk-bpjs').subscribe(data => {
            this.data10PerujukBpjs = data;

            let pie1 = 2;
            let series = [];
            let categories = [];
            let loopIndex = 0;
            for (let i in this.data10PerujukBpjs) {
                categories.push(this.data10PerujukBpjs[i].ppkrujukan);
                let dataz2 = [];
                dataz2.push({
                    y: parseFloat(this.data10PerujukBpjs[i].jumlah),
                    color: this.colors[i]
                });
                if (loopIndex < 10)
                    series.push({
                        name: this.data10PerujukBpjs[i].ppkrujukan,
                        data: dataz2
                    });
                loopIndex++;

            }
            this.chart10PerujukBpjs = new Chart({
                chart: {
                    type: 'column',
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
                        text: 'Kunjungan Pasien'
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
                                return Highcharts.numberFormat(this.y, 0, '.', ',') + ' Pasien';
                            }
                        },
                        showInLegend: true
                    }
                },
                tooltip: {
                    formatter: function () {
                        let point = this.point,
                            s = this.x + ':' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' Pasien <br/>';
                        return s;

                    }
                    // headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    // pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    //     '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                    // footerFormat: '</table>',
                    // shared: true,
                    // useHTML: true
                },
                series: series,
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: true,
                    borderRadius: 5,
                    borderWidth: 1
                },

            })
        })
        // end
        //   chart 10 Besar Diagnosa
        this.appservice.getTransaksi('eis/get-topten-diagnosa').subscribe(data => {
            this.data10Diagnosa = data;

            let pie1 = 2;
            let series = [];
            let categories = [];
            let loopIndex = 0;
            for (let i in this.data10Diagnosa) {
                categories.push(this.data10Diagnosa[i].kddiagnosa);
                let dataz2 = [];
                dataz2.push({
                    y: parseFloat(this.data10Diagnosa[i].jumlah),
                    color: this.colors[i]
                });
                if (loopIndex < 10)
                    series.push({
                        name: this.data10Diagnosa[i].kddiagnosa,
                        data: dataz2
                    });
                loopIndex++;

            }
            this.chart10Diagnosa = new Chart({
                chart: {
                    type: 'column',
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
                        text: 'Kunjungan Pasien'
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
                                return Highcharts.numberFormat(this.y, 0, '.', ',') + ' Pasien';
                            }
                        },
                        showInLegend: true
                    }
                },
                tooltip: {
                    formatter: function () {
                        let point = this.point,
                            s = this.x + ':' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' Pasien <br/>';
                        return s;

                    }
                    // headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    // pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    //     '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                    // footerFormat: '</table>',
                    // shared: true,
                    // useHTML: true
                },
                series: series,
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: true,
                    borderRadius: 5,
                    borderWidth: 1
                },

            })
        })
        // end

        this.appservice.getTransaksi('eis/get-kunjungan-jenis-pelayanan').subscribe(data => {
            this.dataJenisPelayanan = data;
            let categories = [];
            let dataz2 = [];
            let dataz1 = [];
            for (let i in this.dataJenisPelayanan.data) {
                categories.push(this.dataJenisPelayanan.data[i].namadepartemen);
                dataz2.push(
                    parseFloat(this.dataJenisPelayanan.data[i].reguler)

                );
                dataz1.push(
                    parseFloat(this.dataJenisPelayanan.data[i].eksekutif)

                );
            }
            this.chartJenisPelayanan = new Chart({
                chart: {
                    type: 'column'
                },

                title: {
                    text: ''
                },

                xAxis: {
                    categories: categories//['REGULER', 'EKSEKUTIF']
                },

                yAxis: {
                    allowDecimals: false,
                    min: 0,
                    title: {
                        text: 'Jumlah Pasien'
                    }
                },

                tooltip: {
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' +
                            this.series.name + ': ' + this.y + '<br/>' +
                            'Total: ' + this.point.stackTotal;
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        cursor: 'pointer',

                        dataLabels: {
                            enabled: true,
                            color: this.colors[1],
                            style: {
                                fontWeight: 'none'
                            },
                            formatter: function () {
                                return Highcharts.numberFormat(this.y, 0, '.', ',');
                            }
                        },
                        showInLegend: true
                    }
                },
                // plotOptions: {
                //     column: {
                //         stacking: 'normal'
                //     }
                // },
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: true,
                    reversed: false,
                    borderRadius: 5,
                    borderWidth: 1
                },
                series: [
                    {
                        name: 'REGULER',
                        data: dataz2
                    },
                    {
                        name: 'EKSEKUTIF',
                        data: dataz1
                    }

                ]
            })
            // this.chartJenisPelayanan = new Chart({
            //     chart: {
            //         type: 'column'
            //     },
            //     title: {
            //         text: ''
            //     },
            //     xAxis: {
            //         categories: ['Jumlah ' + this.dataJenisPelayanan.total],
            //         labels: {
            //             align: 'center',
            //             style: {
            //                 fontSize: '13px',
            //                 fontFamily: 'Verdana, sans-serif'
            //             }
            //         }
            //     },
            //     yAxis: {
            //         title: {
            //             text: 'Kunjungan Pasien'
            //         }
            //     },
            //     credits: {
            //         enabled: false
            //     },
            //     plotOptions: {
            //         column: {
            //             cursor: 'pointer',

            //             dataLabels: {
            //                 enabled: true,
            //                 color: this.colors[1],
            //                 style: {
            //                     fontWeight: 'none'
            //                 },
            //                 formatter: function () {
            //                     return Highcharts.numberFormat(this.y, 0, '.', ',') + ' Pasien';
            //                 }
            //             },
            //             showInLegend: true
            //         }
            //     },
            //     legend: {
            //         enabled: true,
            //         borderRadius: 5,
            //         borderWidth: 1
            //     },
            //     series: [
            //         {
            //             name: 'REGULER',
            //             data: [this.dataJenisPelayanan.reguler]
            //         },
            //         {
            //             name: 'EKSEKUTIF',
            //             data: [this.dataJenisPelayanan.eksekutif]
            //         },

            //     ]
            // })


        })

        //   chart kunjungan Pasien Rawat Inap
        this.appservice.getTransaksi('eis/get-kunjungan-rawatinap').subscribe(data => {
            this.dataKunjunganRanap = data;

            let series = [];
            let categories = [];
            let jumlah = 0;
            for (let i in this.dataKunjunganRanap) {
                categories.push(this.dataKunjunganRanap[i].namaruangan);
                let dataz2 = [];
                dataz2.push({
                    y: parseFloat(this.dataKunjunganRanap[i].jumlah),
                    color: this.colors[i]
                });
                jumlah = jumlah + parseFloat(this.dataKunjunganRanap[i].jumlah);
                // if (loopIndex > 0)
                series.push({
                    name: this.dataKunjunganRanap[i].namaruangan,
                    data: dataz2
                });
                // loopIndex++;

            }
            this.chartKunjunganRanap = new Chart({
                chart: {
                    type: 'column',
                },

                title: {
                    text: ''
                },
                xAxis: {
                    categories: ["Jumlah " + jumlah],
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
                        text: 'Jumlah Pasien'
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
                                return Highcharts.numberFormat(this.y, 0, '.', ',') + ' Pasien';
                            }
                        },
                        showInLegend: true
                    }
                },
                tooltip: {
                    formatter: function () {
                        let point = this.point,
                            s = this.x + ':' + Highcharts.numberFormat(this.y, 0, '.', ',') + '<br/>';
                        return s;

                    }
                    // headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    // pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    //     '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                    // footerFormat: '</table>',
                    // shared: true,
                    // useHTML: true
                },
                series: series,
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: true,
                    borderRadius: 5,
                    borderWidth: 1
                },

            })
        })
        // end
    }
    // get Service detail Pasien Mendaftar
    klikDetails(idDep, terlayani) {
        this.appservice.getTransaksi('eis/get-count-pasien').subscribe(data => {
            this.dataPasien = data;
            this.countRajal = this.dataPasien.rawat_jalan;
            this.countIgd = this.dataPasien.igd;
            this.countRanap = this.dataPasien.rawat_inap;
            this.countRadiologi = this.dataPasien.radiologi;
            this.countLab = this.dataPasien.laboratorium;
            this.countBedah = this.dataPasien.operasi;
            this.countRehab = this.dataPasien.rehab_medik;
            this.countTotal = this.dataPasien.jumlah;
        })

        this.appservice.getTransaksi('eis/get-count-pasien-terlayani').subscribe(data => {
            this.dataPasienTerlayni = data;
            this.countRajalTerlayani = this.dataPasienTerlayni.data.rawat_jalan;
            this.countIgdTerlayani = this.dataPasienTerlayni.data.igd;
            this.countRanapTerlayani = this.dataPasienTerlayni.rawat_inap;
            this.countRadiologiTerlayani = this.dataPasienTerlayni.data.radiologi;
            this.countLabTerlayani = this.dataPasienTerlayni.data.laboratorium;
            this.countBedahTerlayani = this.dataPasienTerlayni.data.operasi;
            this.countRehabTerlayani = this.dataPasienTerlayni.data.rehab_medik;
            this.countTotalTerlayani = this.dataPasienTerlayni.data.jumlah;
            this.countFarmasiTerlayani = this.dataPasienTerlayni.farmasi;
            this.countMasihDirawatTerlayani = this.dataPasienTerlayni.masihDirawat;


        })
        if (idDep == 14 && terlayani == false) {
            this.showFarmasi = true;
            this.getServicePasienTerlayani(idDep);
        } else if (terlayani == true) {
            this.getServicePasienTerlayani(idDep);
            this.showRawatJalan = true;
        } else {
            this.getServiceTableMoreInfo(idDep);
            this.showRawatJalan = true;
        }
    }
    getServiceTableMoreInfo(idDep) {
        this.appservice.getTransaksi('eis/detail-pasien-rj?idRuangan=' + idDep).subscribe(table => {
            this.dataTableRajal = [];
            this.dataTableRajal = table;
            this.totalRecords = this.dataTableRajal.count;
            this.dataTableRajal = this.dataTableRajal.data;
        });
    }

    // end detail Pasien Mendaftar

    // get Service detail Pasien Terlayani

    getServicePasienTerlayani(idDep) {
        this.appservice.getTransaksi('eis/detail-pasien-teralayani/' + idDep).subscribe(table => {
            this.dataTableRajal = [];
            this.dataTableFarmasi = [];
            if (idDep == 14) {
                this.dataTableFarmasi = table;
                this.totalRecords = this.dataTableFarmasi.count;
                this.dataTableFarmasi = this.dataTableFarmasi.data;
            } else {
                this.dataTableRajal = table;
                this.totalRecords = this.dataTableRajal.count;
                this.dataTableRajal = this.dataTableRajal.data;
            }

        });
    }

    // end detail Pasien Terlayani
    togglePasienMendaftar() {
        this.showTerlayani = true;
        this.showMendaftar = false;
        // this.getServiceTableMoreInfo(18);
    }


    /**
     * @method ngAfterViewInit
     */
    ngAfterViewInit() {
        Prism.highlightAll();

    }


    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
    // applyFilterss(filterValue: string) {
    //     filterValue = filterValue.trim(); // Remove whitespace
    //     filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    //     this.dataSourceBor.filter = filterValue;
    // }




}
// function createNewUser(id: number): UserData {
//     const name =
//         NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//         NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//     return {
//       id: id.toString(),
//       name: name,
//       progress: Math.round(Math.random() * 100).toString(),
//       color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
//     };
//   }

/** Constants used to fill up our data base. */
//   const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
//     'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
//   const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
//     'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
//     'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface dataGridInfoRuangan {
    namaruangan: string;
    belumperiksa: string;
    diperiksa: string;
    batalregistrasi: string;
    total: string;
}

// export interface dataGridBorLos {
//     bulan: string;
//     bor: string;
//     alos: string;
//     bto: string;
//     toi: string;
//     gdr: string;
//     ndr: string;
// }

