import {CommonModule, registerLocaleData} from "@angular/common";
import localeEN from '@angular/common/locales/en';
import {LOCALE_ID, NgModule} from "@angular/core";
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BaseUrlInterceptor} from "../../../kernel/api.interceptor";
import {API_BASE_URL, ApiClient} from "../../../kernel/services/api-client";
import {environment} from "../../../kernel/environments/environment";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {NgxsModule} from "@ngxs/store";
import {isLocalEnv} from "../../../kernel/helpers/environment.helper";
import {NgxsRouterPluginModule} from "@ngxs/router-plugin";
import {NgxsStoragePluginModule, STORAGE_ENGINE} from "@ngxs/storage-plugin";
import {MyStorageEngine} from "../../../kernel/storage.engine";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {UserState} from "../../../kernel/store/state/user.state";
import {AuthModule} from "../auth-area/auth.module";
import {AppComponent} from "./app/app.component";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {CommonCiywModule} from "../../common/common-ciyw.module";
import {PersonalAreaModule} from "../personal-area/personal-area.module";
import {APOLLO_OPTIONS, ApolloModule} from "apollo-angular";
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import {DictionariesState} from "../../../kernel/store/state/dictionary.state";
import {AdminAreaModule} from "../admin-area/admin-area.module";
import {AppRoutingModule, routes} from "../../../kernel/app-routing.module";
import {RouterModule} from "@angular/router";

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

registerLocaleData(localeEN, 'en');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,

    NgxsModule.forRoot([UserState, DictionariesState], {
      developmentMode: isLocalEnv(),
    }),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    // NgxsLoggerPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot(),

    HttpClientModule,

    ApolloModule,

    AuthModule,
    CommonCiywModule,
    PersonalAreaModule,
    AdminAreaModule,
  ],
  providers: [ {
    provide: APOLLO_OPTIONS,
    useFactory(httpLink: HttpLink) {
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: environment.graphQLUrl,
        }),
      };
    },
    deps: [HttpLink],
  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
    {provide: API_BASE_URL, useValue: environment.apiUrl},
    {provide: LOCALE_ID, useValue: 'en-US'},
    {
      provide: STORAGE_ENGINE,
      useClass: MyStorageEngine,
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ApiClient,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
