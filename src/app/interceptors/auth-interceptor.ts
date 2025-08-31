import { HttpContextToken, HttpInterceptorFn } from "@angular/common/http";

export const ADD_AUTH_HEADER = new HttpContextToken<boolean>(() => true);
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.context.get(ADD_AUTH_HEADER)) {
    return next(req);
  }

  const token = localStorage.getItem("token");

  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(clonedReq);
};
