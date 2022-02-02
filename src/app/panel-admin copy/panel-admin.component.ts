import { Component, OnInit, NgModule } from '@angular/core';
import { Validators, FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.scss'],
  
})
export class PanelAdminComponent implements OnInit {
  users: User[];
 
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUserNew()
    .then((users: User[]) => {
      this.users = users;
    });
  }

}
