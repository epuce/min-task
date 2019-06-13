import { Component, OnInit } from '@angular/core';
import {UserFormService} from "../store/user-form.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
    show_spinner = false;

    user = {
        email: null,
        password: null
    };

  constructor(
      private service: UserFormService,
      private router: Router
  ) { }

  ngOnInit() {
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
      console.log(email)
  }
}
