import { Injectable } from "@angular/core";
import { LogLevel } from "./log.enum";
import { LogHelper } from "./log.helper";
import { LogPublisher } from "./log.publisher.base";
import { LogConfig } from "./log.config";
import { LogPublishersService } from "./log.publisher.service";

@Injectable()
export class LogService {
  constructor(private publisherService: LogPublishersService) {
    this.publishers = this.publisherService.publishers;
  }

  publishers: LogPublisher[];
  logLevel: LogLevel = LogConfig.logLevel;
  logWithDate = LogConfig.logWithDate;
  Log(message: string, ...optionalParams: any[]) {
    this.writeToLog(message, LogLevel.All, optionalParams);
  }

  Debug(message: string, ...optionalParams: any[]) {
    this.writeToLog(message, LogLevel.Debug, optionalParams);
  }

  Info(message: string, ...optionalParams: any[]) {
    this.writeToLog(message, LogLevel.Info, optionalParams);
  }

  Warn(message: string, ...optionalParams: any[]) {
    this.writeToLog(message, LogLevel.Warn, optionalParams);
  }

  Error(message: string, ...optionalParams: any[]) {
    this.writeToLog(message, LogLevel.Error, optionalParams);
  }

  Fatal(message: string, ...optionalParams: any[]) {
    this.writeToLog(message, LogLevel.Fatal, optionalParams);
  }

  Clear() {
    // this.logPublisher.clear().subscribe();
    for (const logger of this.publishers) {
      logger.clear().subscribe();
    }
  }

  private shouldLog(level: LogLevel): boolean {
    let flag = false;
    if (this.logLevel !== LogLevel.Off && level >= this.logLevel) {
      flag = true;
    }
    return flag;
  }

  private writeToLog(message: string, level: LogLevel, params: any[]) {
    if (this.shouldLog(level)) {
      const entry: LogHelper = new LogHelper();
      entry.message = message;
      entry.level = level;
      entry.logWithDate = this.logWithDate;
      entry.extraInfo = params;

      for (const logger of this.publishers) {
        logger.log(entry).subscribe();
      }

      // this.logPublisher.log(entry).subscribe();
      // console.log(entry.buildLogString());
    }
  }
}
