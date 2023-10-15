import {Inject, Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpHeaders, HttpParams
} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {SpotifyService} from "../../services/spotify.service";
import {API_Config, API_CONFIG} from "../../config/spotify-api.config";
import {AuthorizationService} from "../../services/authorization.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
      private authService: AuthorizationService,
      @Inject(API_CONFIG) private apiConfig: API_Config
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      let modifiedReq: HttpRequest<unknown>;
      if(req.method === 'GET')
          modifiedReq = this.manipulateGetReq(req);
      else
          modifiedReq = this.manipulatePostReq(req);

      return next.handle(modifiedReq).pipe(
          catchError(err => {
              this.authService.getRefreshedToken();
              throw err
          }),
    );
  }

  // Manipulate the intercepted get requests
  manipulateGetReq(req: HttpRequest<unknown>){
      const token = this.authService.getToken()?.access_token;
      return req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
  }

  // Manipulate the intercepted post requests
  manipulatePostReq(req: HttpRequest<unknown>){
      const headers = new HttpHeaders({
          Authorization: `Basic ${btoa(
              `${this.apiConfig.client_id}:${this.apiConfig.client_secret}`
          )}`,
          'Content-Type': 'application/x-www-form-urlencoded',
      });
      const body = new HttpParams().set('grant_type', 'client_credentials');
      return req.clone({ headers: headers, body: body });
  }
}
