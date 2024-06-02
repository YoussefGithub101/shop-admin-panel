import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
 
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
 
import { CheckOutComponent } from './lazy-loading/check-out/check-out.component';
import { isAuthenticatedGuard } from './Route Guard/is-authenticated.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'DashBoard' },
 

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: "checkOut", component: CheckOutComponent, canActivate: [isAuthenticatedGuard] },
  { path: 'store', loadChildren: () => import('./lazy-loading/lazy-loading.module').then(m => m.LazyLoadingModule) },
  { path: 'DashBoard', loadChildren: () => import('./dash-board/dash-board.module').then(m => m.DashBoardModule) },
  { path: '**', component: PageNotFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
