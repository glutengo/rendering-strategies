import { Inject, Injectable, Optional } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { DOCUMENT } from '@angular/common';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(@Inject(DOCUMENT) private document: Document,
              @Optional() @Inject(REQUEST) protected request?: Request
  ) {
  }

  getBaseURL() {
    return environment.BACKEND_URL;
  }
}
