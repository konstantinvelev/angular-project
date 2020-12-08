import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  isLoading = false;
  errorMessege = '';

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  submitFormHandler(fromValue: { title: string, imageUrl: string, description: string }): void {
    this.isLoading = true;
    this.errorMessege = '';
    this.postService.create(fromValue).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/post/all']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessege = err.message;
        this.router.navigate(['/post/create']);
      }
    });
  }

}
