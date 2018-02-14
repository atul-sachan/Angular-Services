import { LogLevel } from "./log.enum";
import { environment } from "../../environments/environment";
import { LogConsole } from "./log.publisher.console";
import { LogPublisher } from "./log.publisher.base";
import { LogLocalStorage } from "./log.publisher.localstorage";

export class LogConfig {
  static logFactory: Array<LogModel> = [
    { logPublisher: new LogConsole() },
    { logPublisher: new LogLocalStorage() }
  ];
  static logWithDate = true;
  static logLevel = LogLevel.All;
}

export class LogModel {
  logPublisher: LogPublisher;
}
