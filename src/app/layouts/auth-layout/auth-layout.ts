import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {Login} from '../../utils/login/login';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [MatCardModule, MatButtonModule, Login, RouterOutlet],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {}
