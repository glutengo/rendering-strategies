import { Inject, Injectable, Optional } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(@Inject(DOCUMENT) private document: Document,
              @Optional() @Inject(REQUEST) protected request?: Request
  ) {
  }

  getBaseURL() {
    return `${this.document.location.protocol}//${this.document.location.hostname}:8082`;
  }
}
