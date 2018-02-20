import { ErrorHandler, Injectable } from "@angular/core";
import { LogService } from "./logger.service";
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private logService: LogService) {}
  handleError(error) {
    this.logService.Error(error.message, error.stack);
    // throw error;
  }
}
