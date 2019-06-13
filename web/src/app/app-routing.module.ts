import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {UserFormComponent} from "./pages/user/user-form/user-form.component";
import {IndexComponent} from "./pages/index/index.component";
import {AccessControlService} from "./services/access-control.service";

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    }, {
        path: 'sign-up',
        component: UserFormComponent,
    }, {
        path: '**',
        redirectTo: '/',
        canActivate: [AccessControlService],
    }, {
        path: '',
        component: IndexComponent,
        canActivate: [AccessControlService],
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
