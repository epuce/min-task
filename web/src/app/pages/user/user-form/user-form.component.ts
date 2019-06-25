import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserFormService} from "../store/user-form.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
    show_spinner = false;
    emailError = false;
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
        private service: UserFormService,
        private router: Router,
        private changeDetector: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.form = new FormGroup(this.controls);
    }

    saveUser() {
        this.service.saveUser(this.user).then(
            () => {
                this.router.navigate(['/login'])
            },
            () => {
                alert('Something went wrong, please try again')
            })
    }

    checkEmail(email) {
        this.emailError = false;

        if (this.controls.email.valid) {
            this.service.checkEmail(email).then((response: any) => {
                this.emailError = response.content.email_exists;

                if (this.emailError) {
                    this.controls.email.setErrors({email: true});
                    this.controls.email.markAsTouched();
                }

                this.changeDetector.markForCheck();
            });
        }
    }
}
