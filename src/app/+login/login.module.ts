import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MatCardModule, MatFormFieldModule,MatCheckboxModule, MatProgressSpinnerModule, MatInputModule, MatButtonModule, MatToolbarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {GrowlModule} from 'primeng/growl';
@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    ToastModule,
    // ToastModule.forRoot(),
    MatCheckboxModule,
    ProgressSpinnerModule,
    GrowlModule
  ],
  declarations: [LoginComponent],

})
export class LoginModule { }
