import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_BASE_URL } from '../config';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

interface Option {
  platform: string;
  csr: string;
  ssr: string;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-header]',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  options: Option[];

  constructor(private http: HttpClient,
              private router: Router,
              @Inject(DOCUMENT) private document: Document,
              @Inject(BACKEND_BASE_URL) private baseUrl: string) { }

  ngOnInit(): void {
    this.http.get(`${this.baseUrl}/options.json`).subscribe((options: any) => this.options = options);
  }

  getURL(option: Option, technique: 'ssr' | 'csr') {
    return `${option[technique]}${this.router.url}`;
  }

  isActive(option: Option, technique: 'ssr' | 'csr') {
    if (option[technique]) {
      const url = new URL(option[technique]);
      return url.protocol === this.document.location.protocol &&
        url.hostname === this.document.location.hostname &&
        url.port === this.document.location.port;
    }
  }

}
