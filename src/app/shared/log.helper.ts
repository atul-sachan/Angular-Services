import { LogLevel } from "./log.enum";

export class LogHelper {
  message = "";
  level: LogLevel = LogLevel.All;
  extraInfo: any[] = [];
  logWithDate = true;

  buildLogString(): string {
    let logString = "";
    if (this.logWithDate) {
      logString += new Date() + " - ";
    }
    logString += "Type: " + LogLevel[this.level];
    logString += " - Message: " + this.message;
    if (this.extraInfo.length) {
      logString += " - Extra Info: " + this.formatParameters(this.extraInfo);
    }
    return logString;
  }

  private formatParameters(params: any[]) {
    let ret: string = params.join(",");

    if (params.some(p => typeof p === "object")) {
      ret = "";
      for (const item of params) {
        ret += JSON.stringify(item) + ",";
      }
    }
    return ret;
  }
}
