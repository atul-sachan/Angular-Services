import { Injectable, Inject, ReflectiveInjector } from "@angular/core";
import {
  HttpClient,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import { LogPublishersService } from "./log.publisher.service";
import { LogService } from "./logger.service";
import { LogConfig } from "./log.config";

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .do(evt => {
        if (evt instanceof HttpErrorResponse) {
          console.log("---> status:", evt.status);
          console.log("---> filter:", req.params.get("filter"));
        }
      })
      .catch(error => {
        // intercept the respons error and displace it to the console
        console.log("Error Occurred");
        console.log(error);
        const Injector = ReflectiveInjector.resolveAndCreate([
          LogService,
          LogPublishersService,
          LogConfig
        ]);
        const inst = Injector.resolveAndInstantiate(LogService);
        inst.Error(JSON.stringify(error));
        return Observable.throw(error);
      }) as any;
  }
}
