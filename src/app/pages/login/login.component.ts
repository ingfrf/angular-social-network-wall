import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  login() {
    this.userService.getUserByEmail(this.loginForm.value.email).subscribe(
      response => {
        console.log(response);
        if (response.toString().length === 0) {
          console.error('Account doesn\'t exist');
          this.snackBar.open('Account does not exist', 'ok');
        } else {
          if (response[0].password === this.loginForm.value.password) {
            console.log('matched');
            this.snackBar.open('Login successful', 'ok');
            this.userService.user = response[0];
            localStorage.setItem('user', JSON.stringify(response[0]));
            this.router.navigate(['/posts']);
          } else {
            console.error('incorrect password');
            this.snackBar.open('Incorrect password', 'ok');
          }
        }
      },
      error => console.error(error)
    );
  }

}
