import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  isLoading = false;
  errorMessage = '';

  constructor(
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  submitFormHandler(formValue: { title: string, imageUrl: string, description: string }): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.postService.create(formValue).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/'])
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message;
        this.router.navigate(['/post/create']);
      }
    });
  }

}
