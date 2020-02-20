import { InjectionToken } from '@angular/core';

export const BACKEND_BASE_URL = new InjectionToken('BACKEND_BASE_URL');

// TODO: get from env variable
export const BackendBaseUrlProvider = { provide: BACKEND_BASE_URL, useValue: 'http://localhost:8082' };

