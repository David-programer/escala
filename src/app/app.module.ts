import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { IdentityGuard } from './services/identity.guard';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { LayoutComponent } from './containers/layout/layout.component';
import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';
import { UsersComponent } from './views/users/users.component';
import { DatatableComponent } from './components/datatable/datatable.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    HomeComponent,
    UsersComponent,
    DatatableComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    IconModule, IconSetModule,
  ],
  providers: [
    IdentityGuard, 
    IconSetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
