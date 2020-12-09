import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComment } from 'src/app/shared/interfaces/comment';
import { IPost } from 'src/app/shared/interfaces/post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  post: IPost<IComment> = null;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) { 
    const id = activatedRoute.snapshot.params.id;
    postService.details(id).subscribe(post => {
      this.post = post;
    });
  }

  ngOnInit(): void {
   
  }

}
