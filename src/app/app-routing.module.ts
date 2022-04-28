import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {CreateAccountComponent} from './pages/create-account/create-account.component';
import {PostsComponent} from './pages/posts/posts.component';
import {AuthGuardService} from './services/auth-guard.service';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'create-account', component: CreateAccountComponent},
  {path: 'posts', component: PostsComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
