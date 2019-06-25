import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    show_spinner = false;
    form: FormGroup;

    user = {
        email: null,
        password: null
    };

    controls: any = {
        email: new FormControl('', [Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]),
        password: new FormControl('', [Validators.required])
    };

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.form = new FormGroup(this.controls);
    }

    login() {
        this.show_spinner = true;

        this.http.post('/api/login', this.user).toPromise().then((response) => {
            const content = response['content'];

            if (content.user_has_access) {
                window.location.href = '/';
            } else {
                this.show_spinner = false;

                alert('Wrong credentials, please try again.');
            }
        });
    }

    signUp() {
        this.router.navigate(['/sign-up'])
    }
}
