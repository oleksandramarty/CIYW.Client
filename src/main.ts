import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './kernel/app.config';
import { AppComponent } from './modules/app/app/app.component';
import {environment} from "./kernel/environments/environment";
import {enableProdMode} from "@angular/core";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./modules/app/app.module";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
