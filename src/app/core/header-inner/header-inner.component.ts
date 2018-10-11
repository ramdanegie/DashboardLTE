import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AppService } from '../../shared/app.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-header-inner',
  templateUrl: './header-inner.component.html',
  providers: [MessageService]
})
export class HeaderInnerComponent implements OnInit {
  constructor(public appservice: AppService, private messageService: MessageService, private router: Router,
  ) { }
  http: HttpClient;
  listMenuHeader: any;
  userLogin: string;
  resultLogout: any;
  ngOnInit() {
    var temp = [];
    var pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
    if (pegawai == undefined) {
      this.router.navigate(['/']);
    }
    this.userLogin = pegawai.namaLengkap;
    temp.push({
      caption: "Logout (" + pegawai.namaLengkap + ")",
      link: "/app/Logout",
    });
    this.listMenuHeader = temp;
  }
  logout(): void {
    var urlLogout = '#/login';
    var datauserlogin = JSON.parse(window.localStorage.getItem("datauserlogin"));
    var dataRuangan = JSON.parse(window.localStorage.getItem('dataRuangan'));
    if (datauserlogin == undefined || datauserlogin == null) {
      return null;
    }

    if (dataRuangan == undefined || dataRuangan == null) {
      dataRuangan = {
        ruanganId: 0
      };
    }

    var headersPost = {
      headers: {
        "AlamatUrlForm": urlLogout,
        "kdRuangan": dataRuangan.ruanganId
      }
    }

    this.appservice.logout(datauserlogin, headersPost).subscribe(data => {
      this.resultLogout = data;
      window.localStorage.clear();
      this.router.navigate(['/login']);
    }, error => {
      console.log(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Logout Gagal' });
    });
  }
}
