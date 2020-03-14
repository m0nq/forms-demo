import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { UserSettings } from '../data/user-settings';

@Component({
  selector: 'cq-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  originalUserSettings: UserSettings = {
    name: null,
    emailOffers: null,
    interfaceStyle: null,
    subscriptionType: null,
    notes: null
  };

  userSettings: UserSettings = { ...this.originalUserSettings };
  postError = false;
  postErrorMessage = '';
  subscriptionTypes$: Observable<string[]>;
  singleModel = 'On';
  startDate: Date;
  startTime: string;
  userRating: number;
  maxRating: number;
  isReadonly: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscriptionTypes$ = this.dataService.getSubscriptionTypes();
    this.startDate = new Date();
    this.startTime = `${this.startDate.getUTCHours()}:${this.startDate.getUTCMinutes()}`;
    this.userRating = 0;
    this.maxRating = 10;
    this.isReadonly = false;
  }

  onSubmit(form: NgForm) {
    console.log('In onSubmit: ', form.value);
  }

  onBlur(field: NgModel) {
    console.log('in onBlur: ', field.valid);
  }

  private onHttpError(err: any) {
    console.log('Error –≥ ', err);
    this.postError = true;
    this.postErrorMessage = 'Some error goes here...';
  }
}
