import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule, MatProgressSpinnerModule, MatSidenavModule,
    MatTableModule,
    MatToolbarModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './pages/login/login.component';
import { UserFormComponent } from './pages/user/user-form/user-form.component';
import {UserFormService} from "./pages/user/store/user-form.service";
import { IndexComponent } from './pages/index/index.component';
import {AppConfig} from "./services/app-config.serive";
import {AccessControlService} from "./services/access-control.service";

const ngMaterial: any = [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        UserFormComponent,
        IndexComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        ngMaterial,
    ],
    providers: [
        UserFormService,
        AppConfig,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
