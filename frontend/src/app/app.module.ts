import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TuiRootModule, TuiAlertModule, TUI_SANITIZER, TuiDialogModule } from '@taiga-ui/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE } from '@taiga-ui/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
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
import { ApolloLink, InMemoryCache, split } from '@apollo/client/core';
import { ClientCardModule } from './modules/client-card/client-card.module';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import localeRu from '@angular/common/locales/ru';
registerLocaleData(localeRu);

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
    ClientCardModule,


    //TUI
    TuiRootModule,
    TuiAlertModule,
    TuiDialogModule,

  ],
  providers: [
    { provide: LOCALE_ID, useValue: "ru-RU" },
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

        // Create a WebSocket link:
        // const ws = new WebSocketLink({
        //   uri: 'ws://localhost:3000/',
        //   options: {
        //     reconnect: true,
        //     connectionParams: {
        //       authToken: localStorage.getItem(localStorage.getItem('token') || ""),
        //     }    
        //   }
        // })
        const wsLink = new GraphQLWsLink(createClient({
          url: 'ws://localhost:3000/graphql',
          connectionParams: () => {
            const token = localStorage.getItem('token') || null;
            if (!token) {
              return {};
            }
            return {
              Authorization: `Bearer ${token}`,
            };
          },      
        }));
        
        // const error = onError(({ networkError }) => {
        //   if (networkError) {
        //     console.log("404" + networkError)
        //   }
        // })

        // const link = middleware.concat(http);
        // link = error.concat(http)
        const link = middleware.concat( split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === 'OperationDefinition' &&
              definition.operation === 'subscription'
            );
          },
          wsLink,
          http
        ))


        return {
          link,
          cache: new InMemoryCache(),//{resultCaching:false}
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
