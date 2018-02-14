import { LogHelper } from "./log.helper";
import { Observable } from "rxjs/Observable";

export abstract class LogPublisher {
  location: string;

  abstract log(record: LogHelper): Observable<boolean>;
  abstract clear(): Observable<boolean>;
}
