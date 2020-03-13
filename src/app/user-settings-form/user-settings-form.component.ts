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

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscriptionTypes$ = this.dataService.getSubscriptionTypes();
  }

  onSubmit(form: NgForm) {
    console.log('In onSubmit: ', form.valid);
    if (form.valid) {
      this.postError = false;
      this.postErrorMessage = '';
      this.dataService.postUserSettingsForm(this.userSettings)
        .subscribe(
          result => console.log('Success ->', result),
          err => this.onHttpError(err)
        );
    } else {
      this.postError = true;
      this.postErrorMessage = 'Please fix the above errors';
    }
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
