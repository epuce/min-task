import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserFormService {
    constructor(
        private http: HttpClient
    ) {
    }

    saveUser(data: any) {
        if (data.id) {
            return this.http.put(window.location.origin + `/api/user/${data.id}`, data)
                .toPromise();
        }

        return this.http.post(window.location.origin + `/api/user`, data)
            .toPromise();
    }

    checkEmail(email: any) {
        this.http.get(window.location.origin + `/api/user${JSON.stringify({email: email})}`)
    }
}