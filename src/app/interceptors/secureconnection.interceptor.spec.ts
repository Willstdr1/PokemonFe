import { TestBed } from '@angular/core/testing';

import { SecureconnectionInterceptor } from './secureconnection.interceptor';

describe('SecureconnectionInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SecureconnectionInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SecureconnectionInterceptor = TestBed.inject(SecureconnectionInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
