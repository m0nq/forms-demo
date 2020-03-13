import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserSettings } from './user-settings';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  postUserSettingsForm(userSettings: UserSettings): Observable<any> {
    return this.http.post('https://putsreq.com/dRu68Zaq4a33aaobSt29', userSettings);
  }

  getSubscriptionTypes() {
    return of(['Monthly', 'Annual', 'Lifetime']);

  }
}
