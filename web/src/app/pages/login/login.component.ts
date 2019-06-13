import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  show_spinner = false;

  user = {
      email: null,
      password: null
  };

  constructor(
      private http: HttpClient,
      private router: Router,
  ) { }

  ngOnInit() {
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
