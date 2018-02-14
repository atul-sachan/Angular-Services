import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { LoggerTestComponent } from "./logger-test/logger-test.component";

import { LogService } from "./shared/logger.service";
import { LogPublisher } from "./shared/log.publisher.base";
import { LogConsole } from "./shared/log.publisher.console";
import { LogLocalStorage } from "./shared/log.publisher.localstorage";
import { environment } from "../environments/environment";
import { LogPublishersService } from "./shared/log.publisher.service";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient
} from "@angular/common/http";
import { MyInterceptor } from "./shared/MyInterceptor";

@NgModule({
  declarations: [AppComponent, LoggerTestComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [
    LogService,
    {
      provide: LogPublishersService,
      useClass: LogPublishersService,
      deps: [HttpClient]
    }, // LogPublishersService,
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true }
    // { provide: LogPublisher, useClass: LogConsole },
    // {
    //   provide: LogPublisher,
    //   useClass: environment.production ? LogLocalStorage : LogConsole
    //   // useFactory: () => {
    //   //   if (environment.production) {
    //   //     return new LogLocalStorage();
    //   //   } else {
    //   //     return new LogConsole();
    //   //   }
    //   // }
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
