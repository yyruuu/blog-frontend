import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class ConfigService {
  public path = 'http://localhost:3000';

  constructor() { }
}
