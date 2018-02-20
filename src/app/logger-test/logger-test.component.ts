import { Component, OnInit } from "@angular/core";
import { LogService } from "../shared/logger.service";
import { LogLevel } from "../shared/log.enum";
import { Observable } from "rxjs/Observable";
import { LogLocalStorage } from "../shared/log.publisher.localstorage";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-logger-test",
  templateUrl: "./logger-test.component.html",
  styleUrls: ["./logger-test.component.css"]
})
export class LoggerTestComponent implements OnInit {
  LogMessage: Array<string>;
  constructor(private logger: LogService, private httpClient: HttpClient) {
    this.LogMessage = new Array<string>();
  }

  ngOnInit() {}

  WriteLog(): void {
    this.logger.Log("Test This Method", "User Name:  Atul Sachan");
    this.getLocalStorage();
  }

  ClearLog() {
    this.logger.Clear();
  }

  getLocalStorage(): void {
    // this.LogMessage = JSON.parse(localStorage.getItem("logging")) || [];
    const tmp = this.logger.publishers.find(
      p => p.constructor.name === "LogLocalStorage"
    );
    if (tmp !== null) {
      const local = tmp as LogLocalStorage;
      local.getAll().subscribe(response => (this.LogMessage = response));
    }
  }

  PostLog() {
    console.log("Hi");
    this.httpClient.get("http://localhost:222").subscribe(
      succ => {
        console.log("success");
      },
      error => {
        console.log("error");
      }
    );
  }

  ThrowError() {
    throw new DOMException("Hello Exception Handler");
  }
}
