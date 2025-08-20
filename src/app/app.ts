import { Component, signal } from '@angular/core';
import { ThemeSwitcher } from './utils/theme-switcher/theme-switcher';
import { AuthLayout } from './layouts/auth-layout/auth-layout';

@Component({
  selector: 'app-root',
  imports: [ThemeSwitcher, AuthLayout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('frontend');
}
