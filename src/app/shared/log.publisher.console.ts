import { LogPublisher } from "./log.publisher.base";
import { LogHelper } from "./log.helper";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";

export class LogConsole extends LogPublisher {
  log(record: LogHelper): Observable<boolean> {
    console.log(record.buildLogString());
    return Observable.of(true);
  }

  clear(): Observable<boolean> {
    console.clear();
    return Observable.of(true);
  }
}
