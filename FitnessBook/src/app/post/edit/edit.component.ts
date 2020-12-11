import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost } from 'src/app/shared/interfaces/post';
import { UserService } from 'src/app/user/user.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  errorMessege = '';
  isLoading = false;

  post: IPost | null;

  constructor(
    private postService: PostService,
    // private userService: UserService,
    private router: Router,
    // private commentService: CommentService,
    activatedRoute: ActivatedRoute
  ) {
    const id = activatedRoute.snapshot.params.id;
    postService.details(id).subscribe(post => {
      this.post = post;
    });
  }
  ngOnInit(): void {
  }

  submitFormHandler(data): void {
    this.isLoading = true;
    this.errorMessege = '';
    this.postService.edit({ postId: this.post._id, formData: data }).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/post/details/', this.post._id]);
      },
      error: (err) => {
        this.errorMessege = err.message;
      }
    })
  }
}
