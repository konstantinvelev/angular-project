import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { CommentModule } from './comment/comment.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    AboutComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    PostModule,
    CommentModule,
    UserModule,
  ],
  providers: [],
  bootstrap: [
    HeaderComponent,
    AppComponent,
    FooterComponent]
})
export class AppModule { }
