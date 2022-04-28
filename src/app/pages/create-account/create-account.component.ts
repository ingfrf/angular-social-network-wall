import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  createAccountForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.maxLength(10)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
  }

  create() {
    console.log(this.createAccountForm.value);
    this.userService.createNewUser(this.createAccountForm.value).subscribe(
      (response) => {
        console.log(response);
        this.userService.user = response;
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/posts']);
      },
      (error) => console.error(error)
    );
  }

}
