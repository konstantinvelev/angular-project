import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/interfaces/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  isLoading = false;
  errorMessage = '';

  get currentUser(): IUser{
    return this.userService.currentUser;
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  submitFormHandler(data): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.userService.editProfile({ userId: this.currentUser._id, formData: data }).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/user/profile']);
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    })
  }
}
