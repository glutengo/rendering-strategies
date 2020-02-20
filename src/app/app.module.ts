import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostListModule } from './post-list/post-list.module';
import { PostModule } from './post/post.module';
import { HeaderModule } from './header/header.module';
import { NotFoundModule } from './not-found/not-found.module';
import { BackendBaseUrlProvider } from './config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    PostListModule,
    PostModule,
    HeaderModule,
    NotFoundModule,
    TransferHttpCacheModule
  ],
  providers: [
    BackendBaseUrlProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
