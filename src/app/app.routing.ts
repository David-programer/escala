import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentityGuard } from './services/identity.guard';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { LayoutComponent } from './containers/layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  // { path: '404', component: P404Component, data: { title: 'Page 404' } },
  // { path: '500', component: P500Component, data: { title: 'Page 500' } },
  // canActivate: [LoginGuard]
  { path: 'login', component: LoginComponent, data: { title: 'Login Page' }},
  { path: '', component: LayoutComponent, data: { title: '' }, canActivate: [IdentityGuard],
    children: [
      { path: 'home',component: HomeComponent, data: { title: 'Inicio' } },
     ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
