import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { IdentityGuard } from './services/identity.guard';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { LayoutComponent } from './containers/layout/layout.component';
import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    IconModule, IconSetModule,
    AppRoutingModule
  ],
  providers: [
    IdentityGuard, 
    IconSetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
