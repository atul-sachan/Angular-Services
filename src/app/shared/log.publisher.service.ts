import { Injectable, Inject } from "@angular/core";
import { LogPublisher } from "./log.publisher.base";
import { LogConsole } from "./log.publisher.console";
import { LogLocalStorage } from "./log.publisher.localstorage";
import { HttpClient } from "@angular/common/http";
import { LogApiService } from "./log.publisher.api";

@Injectable()
export class LogPublishersService {
  constructor() {
    this.buildPublishers();
  }

  publishers: LogPublisher[] = [];

  buildPublishers(): void {
    this.publishers.push(new LogConsole());
    this.publishers.push(new LogLocalStorage());
    this.publishers.push(new LogApiService());
  }
}
