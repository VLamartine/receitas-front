import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { authInterceptor } from "@interceptors/auth-interceptor";
import { provideDateFnsAdapter } from "@angular/material-date-fns-adapter";
import { ptBR } from "date-fns/locale";
import { MAT_DATE_LOCALE } from "@angular/material/core";

export const appConfig: ApplicationConfig = {
  providers: [
    provideDateFnsAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: ptBR },
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
