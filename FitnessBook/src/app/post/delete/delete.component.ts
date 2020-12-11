import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'src/app/comment/comment.service';
import { IComment } from 'src/app/shared/interfaces/comment';
import { IPost } from 'src/app/shared/interfaces/post';
import { UserService } from 'src/app/user/user.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {


  get isCreator(): boolean{
    return this.post.userId._id === this.userService.currentUser._id;
  }

  isLoading = false;

  post: IPost<IComment> = null;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router,
    private commentService: CommentService,
    activatedRoute: ActivatedRoute
  ) {
    const id = activatedRoute.snapshot.params.id;
    postService.details(id).subscribe(post => {
      this.post = post;
    });
  }

  ngOnInit(): void {
  }

  deletePost(id): void {
    this.isLoading = true;
    this.postService.delete(id).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['post/all']);
      },
      error: (err) => {
        this.isLoading = false;
        //this.errorMessage = err.message;
      }
    })
  }

}
