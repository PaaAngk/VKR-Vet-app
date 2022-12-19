import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TuiRootModule, TuiAlertModule, TUI_SANITIZER, TuiDialogModule } from '@taiga-ui/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE } from '@taiga-ui/i18n';
import { CommonModule } from '@angular/common';
import {
  HttpClientModule,
  HttpHeaders,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { HttpTokenInterceptor } from './core';
import { of } from 'rxjs';
import { LayoutModule } from './layout/layout.module';
import { CoreModule } from './core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { MedicalCardModule } from './modules/medical-card/medical-card.module';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ApolloModule,
    BrowserAnimationsModule,
    
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    //Modules
    CoreModule,
    LayoutModule,
    MedicalCardModule,


    //TUI
    TuiRootModule,
    TuiAlertModule,
    TuiDialogModule,

  ],
  providers: [
    {
      provide: TUI_LANGUAGE,
      useValue: of(TUI_RUSSIAN_LANGUAGE),
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true,
    },

    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer,
    },

    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        const http = httpLink.create({ uri: 'http://localhost:3000/graphql' });
        const middleware = new ApolloLink((operation, forward) => {
          operation.setContext({
            headers: new HttpHeaders().set(
              'Authorization',
              `Bearer ${localStorage.getItem('token') || null}`
            ),
          });
          return forward(operation);
        });

        // const error = onError(({ networkError }) => {
        //   if (networkError) {
        //     console.log("404" + networkError)
        //   }
        // })

        const link = middleware.concat(http);
        // link = error.concat(http)

        return {
          link,
          cache: new InMemoryCache(),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
