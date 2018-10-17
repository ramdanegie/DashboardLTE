import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-dashboard-persediaan',
  templateUrl: './dashboard-persediaan.component.html',
  styleUrls: ['./dashboard-persediaan.component.css']
})
export class DashboardPersediaanComponent implements OnInit {
  public now: Date = new Date();
  chartRealisasi : any;
  constructor() { }

  ngOnInit() {


  }


  getChartRealisasiPendapatan(){
   
  }
}
