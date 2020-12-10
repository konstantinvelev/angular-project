import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { IPost } from 'src/app/shared/interfaces/post';
import { IUser } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/user/user.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  @Input() post: IPost;

  allPosts: IPost[] | null;

  get isEmpty(): boolean {
    return this.allPosts === undefined ? true : false;
  }

  constructor(
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    this.postService.all().subscribe(allposts => {
      this.allPosts = allposts
    });
  }

}
