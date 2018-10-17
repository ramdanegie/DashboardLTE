import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYW5hZ2VtZW50In0.7deJBpwcQwNKlt8WXbedSRxpGfMRch37Om96SELitrmWiKUO2DzaWjWiwu-dOQKPrP2tsLyVTciY9nHy4hfoXQ';

let authorization = localStorage.getItem('X-AUTH-TOKEN');
if (authorization == null)
  authorization = token

const httpHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-AUTH-TOKEN': authorization
  })
};

@Injectable({
  providedIn: 'root'
})

export class AppService {
  dataPasienRajal: any[];
  dataTempatTidurTerpakai: any[];
  dataSourceInfoKedatangan: any[];
  http: HttpClient;
  urlPrefix: string;
  urlLogin: string;
  urlLogin2: string;
  urlLogout: string;
  urlLogout2: string;


  constructor(http: HttpClient, @Inject(Window) private window: Window) {

    this.http = http;
    if (this.window.location.hostname.indexOf('localhost') > -1) {
      this.urlPrefix = 'http://localhost:8000/service/transaksi/';
      this.urlLogin = 'http://localhost:8000/service/auth/sign-in';
      this.urlLogout = 'http://localhost:8000/service/auth/sign-out';
    } else {
      this.urlPrefix = 'https://smart.rsabhk.co.id:2222/simrs_harkit/service/transaksi/';
      this.urlLogin = 'https://smart.rsabhk.co.id:2222/jasamedika-web/auth/sign-in';
      this.urlLogout = 'https://smart.rsabhk.co.id:2222/jasamedika-web/auth/sign-out';
    }
  }

  getTransaksi(url) {
    return this.http.get(this.urlPrefix + url, httpHeaders);
  }

  postTransaksi(url, data) {
    return this.http.post(this.urlPrefix + url, data, httpHeaders);
  }

  postLogin(data) {
    return this.http.post(this.urlLogin, data);
  }

  logout(datauserlogin, headersPost) {
    return this.http.post(this.urlLogout, datauserlogin, headersPost);
  }

  getColor() {
    return ['#7cb5ec', '#FF0000', '#C71585', '#434348', '#90ed7d', '#f7a35c',
      '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b',
      '#91e8e1', '#CD5C5C', '#FF69B4', '#FF8C00', '#9370DB', '#ADFF2F',
      '#00FF00', '#9ACD32', '#66CDAA', '#00FFFF', '#4682B4', '#800000',
      '#CD853F', '#191970', '#1E90FF', '#00CED1'];
  }
  getColorGiw() {
    return ['#7cb5ec', '#75b2a3', '#9ebfcc', '#acdda8', '#d7f4d2', '#ccf2e8',
      '#468499', '#088da5', '#00ced1', '#3399ff', '#00ff7f',
      '#b4eeb4', '#a0db8e', '#999999', '#6897bb', '#0099cc', '#3b5998',
      '#000080', '#191970', '#8a2be2', '#31698a', '#87ff8a', '#49e334',
      '#13ec30', '#7faf7a', '#408055', '#09790e'];
  }
  getUrlExternal(url) {
    return this.http.get(url);
  }

}
