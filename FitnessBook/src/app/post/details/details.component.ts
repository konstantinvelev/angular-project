import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/comment/comment.service';
import { IComment } from 'src/app/shared/interfaces/comment';
import { IPost } from 'src/app/shared/interfaces/post';
import { UserService } from 'src/app/user/user.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  get isCreator(): boolean {
    return this.post.userId._id === this.userService.currentUser._id;
  }

  get isLiked(): boolean {
    return this.post.likes.includes(this.userService.currentUser._id);
  }

  isLoading = false;
  errorMessage = '';

  post: IPost<IComment> = null;

  constructor(
    private postService: PostService,
    private userService: UserService,
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

  submitFormHandler(content): void {
    const data = { content: content.comment, postId: this.post._id, userId: this.post.userId._id };
    this.isLoading = true;
    this.errorMessage = '';
    this.commentService.postComment(data).subscribe({
      next: () => {
        this.isLoading = false;
        window.location.reload();
      },
      error: (err) => {
        this.errorMessage = err.message;
        console.log(err.message);
      }
    })
  }


  likeHandler(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.postService.like({ postId: this.post._id, user: this.userService.currentUser }).subscribe({
      next: () => {
        this.isLoading = false;
        window.location.reload();
      },
      error: (err) => {
        this.errorMessage = err.message;
        console.log(err.message);
      }
    })
  }

}
