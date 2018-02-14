import { LogPublisher } from "./log.publisher.base";
import { LogHelper } from "./log.helper";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";

export class LogLocalStorage extends LogPublisher {
  constructor() {
    super();
    this.location = "logging";
  }

  log(record: LogHelper): Observable<boolean> {
    let flag = false;
    let values: Array<string>;
    try {
      values = JSON.parse(localStorage.getItem(this.location)) || [];
      values.push(record.buildLogString());
      localStorage.setItem(this.location, JSON.stringify(values));
      flag = true;
    } catch (ex) {
      console.log(ex);
    }
    return Observable.of(true);
  }

  clear(): Observable<boolean> {
    localStorage.removeItem(this.location);
    return Observable.of(true);
  }

  getAll(): Observable<Array<string>> {
    let values: Array<string>;
    values = JSON.parse(localStorage.getItem(this.location)) || [];
    return Observable.of(values);
  }
}
