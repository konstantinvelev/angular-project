import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoading = false;
  errorMessege = ''
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submitFormHandler(fromValue: { username: string, email: string, userInfo: string, password: string, rePassword: string }) {
    this.isLoading = true;
    this.errorMessege = '';
    this.userService.register(fromValue).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessege = err.error.message;
      }
    })

  }

}
