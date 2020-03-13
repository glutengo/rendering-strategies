import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-blog';

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  onClickMenu() {
    this.document.body.classList.remove('menu-open');
  }
}
