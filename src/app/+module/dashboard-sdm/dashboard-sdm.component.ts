import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Highcharts, Chart } from 'angular-highcharts';
import { AppService } from 'src/app/shared/app.service';
import * as Prism from 'prismjs';

@Component({
  selector: 'app-dashboard-sdm',
  templateUrl: './dashboard-sdm.component.html',
  styleUrls: ['./dashboard-sdm.component.css'],
  styles: [`
  /* Column Priorities */
  @media only all {
      th.ui-p-6,
      td.ui-p-6,
      th.ui-p-5,
      td.ui-p-5,
      th.ui-p-4,
      td.ui-p-4,
      th.ui-p-3,
      td.ui-p-3,
      th.ui-p-2,
      td.ui-p-2,
      th.ui-p-1,
      td.ui-p-1 {
          display: none;
      }
  }
  
  /* Show priority 1 at 320px (20em x 16px) */
  @media screen and (min-width: 20em) {
      th.ui-p-1,
      td.ui-p-1 {
          display: table-cell;
      }
  }
  
  /* Show priority 2 at 480px (30em x 16px) */
  @media screen and (min-width: 30em) {
      th.ui-p-2,
      td.ui-p-2 {
          display: table-cell;
      }
  }
  
  /* Show priority 3 at 640px (40em x 16px) */
  @media screen and (min-width: 40em) {
      th.ui-p-3,
      td.ui-p-3 {
          display: table-cell;
      }
  }
  
  /* Show priority 4 at 800px (50em x 16px) */
  @media screen and (min-width: 50em) {
      th.ui-p-4,
      td.ui-p-4 {
          display: table-cell;
      }
  }
  
  /* Show priority 5 at 960px (60em x 16px) */
  @media screen and (min-width: 60em) {
      th.ui-p-5,
      td.ui-p-5 {
          display: table-cell;
      }
  }
  
  /* Show priority 6 at 1,120px (70em x 16px) */
  @media screen and (min-width: 70em) {
      th.ui-p-6,
      td.ui-p-6 {
          display: table-cell;
      }
  }
`]
})
export class DashboardSdmComponent implements AfterViewInit, OnInit {
  public now: Date = new Date();
  colors = Highcharts.getOptions().colors;
  chartStatusPegawai: any;
  chart: any;
  chartKelompokJabatan: any;
  chartJK: any;
  chartUnitKerja: any;
  resultData: any;
  resultDataLayanan: any;
  totalPaegawai: number = 0;
  totalAktif: number = 0;
  totalNonAktif: number = 0;
  totalPensiun: number = 0;
  cols: any[];
  dataSourceLayanan: any;
  showDetailDokter: boolean = false;
  constructor(public httpservice: AppService) {
  }
  ngOnInit() {
    this.getData();
    this.getLayananDokter()
    this.cols = [
      { field: 'dokter', header: 'Dokter' },
      { field: 'count', header: 'Jumlah Layanan' }
    ];
  }
  /**
     * @method ngAfterViewInit
     */
  ngAfterViewInit() {
    Prism.highlightAll();
  }
  selectedGridDokter(row) {
    this.showDetailDokter = true
    let rows = row;
    // this.messageService.add({severity:'info', summary:'Car Selected', detail:'Vin: ' + car.vin});
  }
  getData() {
    this.httpservice.getTransaksi('eis-sdm/get-count-pegawai').subscribe(data => {
      this.resultData = data

      /**
     * @method chart Kategori Pegawai
     */
      let jumlahKatPegawai = this.resultData.kategoripegawai
      // let sama = false
      // let jumlahKatPegawai = []
      // for (let i = 0; i < kategoriPegawai.length; i++) {
      //   // for (let i in kategoriPegawai) {
      //   kategoriPegawai[i].total = 0
      //   if (kategoriPegawai[i].kategorypegawai == null) {
      //     kategoriPegawai[i].kategorypegawai = '-'
      //   }
      //   sama = false
      //   for (let x = 0; x < jumlahKatPegawai.length; x++) {
      //     // for (let x in jumlahKatPegawai) {
      //     if (jumlahKatPegawai[x].kategorypegawai == kategoriPegawai[i].kategorypegawai) {
      //       sama = true;

      //       jumlahKatPegawai[x].total = parseFloat(jumlahKatPegawai[x].total) + 1
      //     }
      //   }
      //   if (sama == false) {
      //     let result = {
      //       kategorypegawai: kategoriPegawai[i].kategorypegawai,
      //       total: parseFloat(kategoriPegawai[i].total),
      //     }
      //     jumlahKatPegawai.push(result)
      //   }
      // }

      // console.log(jumlahKatPegawai)
      // asupkeun kana series data di CHART
      let seriesKatPegawai = []
      let slice = true
      let totalAll = 0
      for (let z in jumlahKatPegawai) {
        if (jumlahKatPegawai[z].kategorypegawai == null)
          jumlahKatPegawai[z].kategorypegawai = '-'
        totalAll = totalAll + parseFloat(jumlahKatPegawai[z].total)
        let datana = [];
        datana.push({
          y: parseFloat(jumlahKatPegawai[z].total),
          color: this.colors[z],
          drilldown: jumlahKatPegawai[z].kategorypegawai
        });
        seriesKatPegawai.push({
          name: jumlahKatPegawai[z].kategorypegawai,
          y: parseFloat(jumlahKatPegawai[z].total),
          sliced: slice,
          selected: slice
        });
        slice = false;
      }
      console.log(seriesKatPegawai)
      // total Pegawai kabeh

      let statusPegawaiss = this.resultData.statuspegawai
      let totalAktifs = 0
      let totalNonAktifs = 0
      let totalPensiuns = 0
      for (let s in statusPegawaiss) {
        if (statusPegawaiss[s].statuspegawai == 'Aktif') {
          totalAktifs = parseFloat(statusPegawaiss[s].total)
        }
        if (statusPegawaiss[s].statuspegawai == 'Pensiun') {
          totalPensiuns = parseFloat(statusPegawaiss[s].total)
        }
        if (statusPegawaiss[s].statuspegawai != 'Pensiun' && statusPegawaiss[s].statuspegawai != 'Aktif') {
          totalNonAktifs = totalNonAktifs + parseFloat(statusPegawaiss[s].total)
        }

      }
      this.totalAktif = totalAktifs
      this.totalNonAktif = totalNonAktifs //this.totalPaegawai - totalAktifs - totalPensiuns
      this.totalPensiun = totalPensiuns
      this.totalPaegawai = totalAktifs + totalNonAktifs + totalPensiuns
      // total Pegawai kabeh

      this.chartStatusPegawai = new Chart({
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
              s = this.percentage.toFixed(2) + ' %';//this.key + ': ' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' <br/>';
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
                return this.key + ': ' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' <br/>';// this.percentage.toFixed(2) + ' %';
              }
            },
            showInLegend: true
          },

        },
        credits: {
          text: 'Total : ' + totalAll
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
          data: seriesKatPegawai

        }]
      })

      /**
      * @method Endchart Kategori Pegawai
      */

      /**
     * @method chart Kelompok Pegawai
     */
      let jumlahkelompokJabatan = this.resultData.kelompokjabatan
      // let samateu = false
      // let jumlahkelompokJabatan = []
      // for (let i in arrKelompokJabatan) {
      //   arrKelompokJabatan[i].total = 0
      //   if (arrKelompokJabatan[i].namakelompokjabatan == null) {
      //     arrKelompokJabatan[i].namakelompokjabatan = '-'
      //   }
      //   samateu = false
      //   for (let x in jumlahkelompokJabatan) {
      //     if (jumlahkelompokJabatan[x].namakelompokjabatan == arrKelompokJabatan[i].namakelompokjabatan) {
      //       samateu = true;
      //       jumlahkelompokJabatan[x].total = parseFloat(jumlahkelompokJabatan[x].total) + 1
      //     }
      //   }
      //   if (samateu == false) {
      //     let result = {
      //       namakelompokjabatan: arrKelompokJabatan[i].namakelompokjabatan,
      //       total: parseFloat(arrKelompokJabatan[i].total),
      //     }
      //     jumlahkelompokJabatan.push(result)
      //   }
      // }

      // console.log(jumlahkelompokJabatan)
      // asupkeun kana series data di CHART
      let serieskelompokJabatan = []
      let slices = true

      for (let z in jumlahkelompokJabatan) {
        if (jumlahkelompokJabatan[z].namakelompokjabatan == null)
          jumlahkelompokJabatan[z].namakelompokjabatan = '-'
        let datana = [];
        datana.push({
          y: parseFloat(jumlahkelompokJabatan[z].total),
          color: this.colors[z],
          drilldown: jumlahkelompokJabatan[z].namakelompokjabatan
        });
        serieskelompokJabatan.push({
          name: jumlahkelompokJabatan[z].namakelompokjabatan,
          y: parseFloat(jumlahkelompokJabatan[z].total),
          sliced: slices,
          selected: slices
        });
        slices = false;
      }
      console.log(serieskelompokJabatan)
      this.chartKelompokJabatan = new Chart({
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
              s = this.percentage.toFixed(2) + ' %';//this.key + ': ' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' <br/>';
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
                return this.key + ': ' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' <br/>';// this.percentage.toFixed(2) + ' %';
              }
            },
            showInLegend: true
          },

        },
        credits: {
          text: 'Total : ' + totalAll
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
          data: serieskelompokJabatan

        }]
      })

      /**
    * @method Endchart Kelompok Pegawai
    */

      /**
      * @method chart Jenis Kelamin
      */
      let jumlahJK = this.resultData.jeniskelamin
      // let samateusih = false
      // let jumlahJK = []
      // for (let i in arrJK) {
      //   arrJK[i].total = 0
      //   if (arrJK[i].jeniskelamin == null) {
      //     arrJK[i].jeniskelamin = '-'
      //   }
      //   samateusih = false
      //   for (let x in jumlahJK) {
      //     if (jumlahJK[x].jeniskelamin == arrJK[i].jeniskelamin) {
      //       samateusih = true;
      //       jumlahJK[x].total = parseFloat(jumlahJK[x].total) + 1
      //     }
      //   }
      //   if (samateusih == false) {
      //     let result = {
      //       jeniskelamin: arrJK[i].jeniskelamin,
      //       total: parseFloat(arrJK[i].total),
      //     }
      //     jumlahJK.push(result)
      //   }
      // }

      // console.log(jumlahJK)
      // asupkeun kana series data di CHART
      let seriesJK = []
      let slicess = true

      for (let z in jumlahJK) {
        if (jumlahJK[z].jeniskelamin == null)
          jumlahJK[z].jeniskelamin = '-'
        let datana = [];
        datana.push({
          y: parseFloat(jumlahJK[z].total),
          color: this.colors[z],
          drilldown: jumlahJK[z].jeniskelamin
        });
        seriesJK.push({
          name: jumlahJK[z].jeniskelamin,
          y: parseFloat(jumlahJK[z].total),
          sliced: slicess,
          selected: slicess
        });
        slicess = false;
      }
      this.chartJK = new Chart({
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
              s = this.percentage.toFixed(2) + ' %';//this.key + ': ' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' <br/>';
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
                return this.key + ': ' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' <br/>';// this.percentage.toFixed(2) + ' %';
              }
            },
            showInLegend: true
          },

        },
        credits: {
          text: 'Total : ' + totalAll
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
          data: seriesJK

        }]
      })

      /**
    * @method Endchart Jenis Kelamin
    */


      /**
    * @method chartunitKerja
    */
      let jumlahUnitKerja = this.resultData.unitkerjapegawai
      // let samateusihah = false
      // let jumlahUnitKerja = []
      // for (let i in arrUnitKerja) {
      //   arrUnitKerja[i].total = 0
      //   if (arrUnitKerja[i].unitkerja == null) {
      //     arrUnitKerja[i].unitkerja = '-'
      //   }
      //   samateusihah = false
      //   for (let x in jumlahUnitKerja) {
      //     if (jumlahUnitKerja[x].unitkerja == arrUnitKerja[i].unitkerja) {
      //       samateusihah = true;
      //       jumlahUnitKerja[x].total = parseFloat(jumlahUnitKerja[x].total) + 1
      //     }
      //   }
      //   if (samateusihah == false) {
      //     let result = {
      //       unitkerja: arrUnitKerja[i].unitkerja,
      //       total: parseFloat(arrUnitKerja[i].total),
      //     }
      //     jumlahUnitKerja.push(result)
      //   }
      // }

      // console.log(jumlahUnitKerja)
      // asupkeun kana series data di CHART
      let seriesUnitKerja = []
      let slicesss = true

      for (let z in jumlahUnitKerja) {
        if (jumlahUnitKerja[z].unitkerja == null)
          jumlahUnitKerja[z].unitkerja = '-'
        let datana = [];
        datana.push({
          y: parseFloat(jumlahUnitKerja[z].total),
          color: this.colors[z],
          drilldown: jumlahUnitKerja[z].unitkerja
        });
        seriesUnitKerja.push({
          name: jumlahUnitKerja[z].unitkerja,
          y: parseFloat(jumlahUnitKerja[z].total),
          sliced: slicesss,
          selected: slicesss
        });
        slicesss = false;
      }
      this.chartUnitKerja = new Chart({
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
              s = this.percentage.toFixed(2) + ' %';//this.key + ': ' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' <br/>';
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
                return this.key + ': ' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' <br/>';//this.percentage.toFixed(2) + ' %';
              }
            },
            showInLegend: true
          },

        },
        credits: {
          text: 'Total : ' + totalAll
          // enabled: false
        },
        legend: {
          enabled: false,
          borderRadius: 5,
          borderWidth: 1
        },
        series: [{
          type: 'pie',
          name: 'Total',
          // colorByPoint: true,
          data: seriesUnitKerja

        }]
      })
      //   this.chartUnitKerja = new Chart({
      //     chart: {
      //         zoomType: 'x',
      //         spacingRight: 20
      //     },
      //     title: {
      //         text: ''
      //     },

      //     xAxis: {
      //         categories: '',
      //         crosshair: true,
      //         // type: 'datetime',
      //         //  maxZoom: 24 * 3600 * 1000, // fourteen days
      //         title: {
      //             text: null
      //         }
      //     },
      //     yAxis: {
      //         title: {
      //             text: 'Jumlah Pasien'
      //         }
      //     },
      //     tooltip: {
      //         shared: true
      //     },
      //     legend: {
      //         enabled: true,
      //         borderRadius: 5,
      //         borderWidth: 1,
      //         // backgroundColor:undefined
      //     },
      //     plotOptions: {
      //         area: {
      //             fillColor: {
      //                 linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
      //                 stops: [
      //                     [0, Highcharts.getOptions().colors[0]],
      //                     // [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
      //                     [1, Highcharts.Color(Highcharts.getOptions().colors[0])]
      //                 ]
      //             },
      //             lineWidth: 1,
      //             marker: {
      //                 enabled: true
      //             },
      //             shadow: false,
      //             states: {
      //                 hover: {
      //                     lineWidth: 1
      //                 }
      //             },
      //             threshold: null
      //         },
      //         column: {
      //             cursor: 'pointer',

      //             dataLabels: {
      //                 enabled: true,
      //                 color: this.colors[1],

      //                 formatter: function () {
      //                     return Highcharts.numberFormat(this.y, 0, '.', ',');
      //                 }
      //             },
      //             showInLegend: true
      //         },

      //     },
      //     credits: {
      //         enabled: false
      //     },

      //     series: [{
      //         type: 'column',
      //         name: 'Unit Kerja',
      //         // pointInterval: 24 * 3600 * 1000,
      //         // pointStart: Date.UTC(parseFloat(this.arr[2]), parseFloat(this.arr[1]) - 1, parseFloat('01')),
      //         data: seriesUnitKerja,

      //     },

      //     ]

      // })
      /**
    * @method EndchartUNITKERJA
    */
    })
  }
  getLayananDokter() {
    let awal = this.now.toLocaleDateString() + ' 00:00';
    let akhir = this.now.toLocaleDateString() + ' 23:59';
    this.httpservice.getTransaksi('laporan/get-detail-layanan?tglAwal=' + awal + '&tglAkhir=' + akhir +
      '&idDept=&idRuangan=&idKelompok=&idDokter=&tindakan=&kondisi=&kelas=&PetugasPe=').subscribe(data => {
        this.resultDataLayanan = data
        let arrayDok = this.resultDataLayanan.data
        let sama = false
        let groupingDok = []
        for (let i = 0; i < arrayDok.length; i++) {
          arrayDok[i].count = 1
          sama = false
          for (let x = 0; x < groupingDok.length; x++) {
            if (groupingDok[x].dokter == arrayDok[i].dokter) {
              sama = true;
              groupingDok[x].count = parseFloat(arrayDok[x].count) + parseFloat(groupingDok[x].count)
            }
          }
          if (sama == false) {
            let result = {
              dokter: arrayDok[i].dokter,
              count: parseFloat(arrayDok[i].count),
            }
            groupingDok.push(result)
          }
        }
        console.log(groupingDok)
        this.dataSourceLayanan = groupingDok
      })
  }

  /**
  * @method EndOfFile
  */
}
