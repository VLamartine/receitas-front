import {
  ApplicationConfig,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { authInterceptor } from "@interceptors/auth-interceptor";
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { errorInterceptor } from "@interceptors/error-interceptor";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  provideMomentDateAdapter,
} from "@angular/material-moment-adapter";
import "moment/locale/pt-br";
import localePt from "@angular/common/locales/pt";
import { registerLocaleData } from "@angular/common";
export const MY_FORMATS = {
  parse: {
    dateInput: "DD/MM/YYYY",
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MMMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

registerLocaleData(localePt);
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: "pt-BR" },
    { provide: MAT_DATE_LOCALE, useValue: "pt-br" },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS,
    },
    provideMomentDateAdapter(MY_FORMATS),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "outline", subscriptSizing: "dynamic" },
    },
  ],
};
