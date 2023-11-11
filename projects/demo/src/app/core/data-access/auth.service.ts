import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = of({
    cardnet: {
      customerId: 50546,
    },
  });
}
