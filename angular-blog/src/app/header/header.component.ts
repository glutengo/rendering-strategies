import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { BackendService } from '../backend.service';

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

  constructor(private http: HttpClient,
              private router: Router,
              @Inject(DOCUMENT) private document: Document,
              private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.http.get(`${this.backendService.getBaseURL()}/options`).subscribe((options: any) => this.options = options);
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
