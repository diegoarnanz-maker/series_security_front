import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (user && user.username && user.password) {
    const authHeader = 'Basic ' + btoa(`${user.username}:${user.password}`);

    const authReq = req.clone({
      setHeaders: { Authorization: authHeader },
    });

    return next(authReq);
  }

  return next(req);
};
