import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_BASE_URL } from '../config';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

interface Option {
  platform: string;
  technique: string;
  url: string;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-header]',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  options: Option[];

  activeOption;

  constructor(private http: HttpClient,
              private router: Router,
              @Inject(DOCUMENT) private document: Document,
              @Inject(BACKEND_BASE_URL) private baseUrl: string) {
  }

  ngOnInit(): void {
    this.http.get(`${this.baseUrl}/options.json`).subscribe((options: any) => {
      this.options = options;
      this.activeOption = this.options.find(o => this.isActive(o));
    });
  }

  getURL(option: Option) {
    return this.getPageURL(option.url);
  }

  getPageURL(optionUrl: string) {
    return `${optionUrl}${this.router.url}`;
  }

  isActive(option: Option) {
    const url = new URL(option.url);
    return url.protocol === this.document.location.protocol &&
      url.hostname === this.document.location.hostname &&
      url.port === this.document.location.port;
  }

  onSelectChanged(url: string) {
    window.location.href = this.getPageURL(url);
  }

  onClickMenu() {
    this.document.body.classList.toggle('menu-open');
  }
}
