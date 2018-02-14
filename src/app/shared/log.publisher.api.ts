import { LogPublisher } from "./log.publisher.base";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHandler,
  HttpClientModule
} from "@angular/common/http";
import { LogHelper } from "./log.helper";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Inject, ReflectiveInjector, Injector, Type } from "@angular/core";
import { MyInterceptor } from "./MyInterceptor";
declare let Reflect: any;
export class LogApiService extends LogPublisher {
  constructor() {
    super();

    this.location = "http://localhost:56590/api/log";
  }

  log(record: LogHelper): Observable<boolean> {
    // const headers = new Headers({ "Content-Type": "application/json" });
    // const options = new Headers({ headers: headers });
    const injector = ReflectiveInjector.resolveAndCreate(
      this.getAnnotations(HttpClientModule)[0].providers
    );
    const inst = injector.get(HttpClient);
    // // const a = inst
    const a = inst
      // const a = this.httpClient
      .post("http://localhost.com", record)
      .catch(this.handleErrors);

    a.subscribe(
      succ => {
        console.log("Heoloo");
      },
      error => {
        console.log("Hefelsdfds");
      }
    );
    return Observable.of(true);
  }

  clear(): Observable<boolean> {
    // TODO: Call Web API to clear all log entries
    return Observable.of(true);
  }

  private handleErrors(error: HttpErrorResponse): Observable<any> {
    const errors: string[] = [];
    let msg = "";

    msg = "Status: " + error.status;
    msg += " - Status Text: " + error.statusText;
    if (error) {
      msg += " - Exception Message: " + error.message;
    }

    errors.push(msg);

    console.log("An error occurredgththtyht", JSON.stringify(errors));

    return Observable.throw(errors);
  }

  getAnnotations(typeOrFunc: Type<any>): any[] | null {
    // Prefer the direct API.
    if ((<any>typeOrFunc).annotations) {
      let annotations = (<any>typeOrFunc).annotations;
      if (typeof annotations === "function" && annotations.annotations) {
        annotations = annotations.annotations;
      }
      return annotations;
    }

    // API of tsickle for lowering decorators to properties on the class.
    if ((<any>typeOrFunc).decorators) {
      return this.convertTsickleDecoratorIntoMetadata(
        (<any>typeOrFunc).decorators
      );
    }

    // API for metadata created by invoking the decorators.
    if (Reflect && Reflect.getOwnMetadata) {
      return Reflect.getOwnMetadata("annotations", typeOrFunc);
    }
    return null;
  }

  convertTsickleDecoratorIntoMetadata(decoratorInvocations: any[]): any[] {
    if (!decoratorInvocations) {
      return [];
    }
    return decoratorInvocations.map(decoratorInvocation => {
      const decoratorType = decoratorInvocation.type;
      const annotationCls = decoratorType.annotationCls;
      const annotationArgs = decoratorInvocation.args
        ? decoratorInvocation.args
        : [];
      return new annotationCls(...annotationArgs);
    });
  }
}
