import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import {UserState} from "./store/state/user.state";

export const HTTP_METHODS = {
  GET: 'GET',
  HEAD: 'HEAD',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  CONNECT: 'CONNECT',
  OPTIONS: 'OPTIONS',
  TRACE: 'TRACE',
};

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  private sso_req = null;


  constructor(
    private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = UserState.localRememberMeStatus
      ? UserState.localToken
      : UserState.sessionToken || '';
    const apiReq = this.getMainReq(request, request.url, token);
    return next.handle(apiReq).pipe(
      catchError((error: HttpErrorCustomResponse) => {
        if (error.status === 401) {
          return throwError(error);
        }
        if (typeof error === 'string') {
          error = JSON.parse(error);
        }
        return throwError(error);
      })
      // finalize(() => {
      //   // this.store.dispatch(new EndLoading({ key }))
      // })
    );
  }

  getMainReq(
    request: HttpRequest<any>,
    url: string,
    token: string
  ): HttpRequest<any> {
    return request.clone({
      setHeaders:
        {
          Authorization: token ? `JwtCIYW ${token}` : token,
          accept: 'application/json',
          'Cache-Control': 'public, max-age=691200, s-maxage=691200'
        },
      url,
    });
  }
}

export declare class HttpErrorCustomResponse extends HttpErrorResponse {
  fields: any;
}
