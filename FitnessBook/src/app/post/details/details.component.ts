import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  get isCreator(): boolean{
    return this.post.userId._id === this.userService.currentUser._id;
  }

  isLoading = false;

  post: IPost<IComment> = null;

  constructor(
    postService: PostService,
    private userService: UserService,
    private router: Router,
    private commentService: CommentService,
    activatedRoute: ActivatedRoute
  ) {
    const id = activatedRoute.snapshot.params.id;
    postService.details(id).subscribe(post => {
      this.post = post;
      commentService.getAllForPost(id).subscribe(comments => {
        this.post.comments = comments
      });
    });
  }

  ngOnInit(): void {

  }

  submitFormHandler(content ): void {
    const data = { content:content.comment, postId: this.post._id, userId: this.post.userId._id };
    this.isLoading = true;
    this.commentService.postComment(data).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl(`/post/details/${this.post._id}`);
      },
      error: (err) => {
        console.log(err.message);
      }
    })
  }

}
