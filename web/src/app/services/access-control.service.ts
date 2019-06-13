import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AppConfig} from "./app-config.serive";

@Injectable({
    providedIn: 'root'
})

export class AccessControlService implements CanActivate {
    constructor(
        private appConfig: AppConfig,
        private router: Router
    ) {
    }

    canActivate() {
        if (this.appConfig.getConfig.user_permissions.indexOf('IS_AUTHENTICATED_ANONYMOUSLY') !== -1) {
            return this.router.navigate(['/login']);
        }

        return true;
    }
}