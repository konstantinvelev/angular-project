import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/shared/interfaces/post';
import { IUser } from 'src/app/shared/interfaces/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() post : IPost

  get currentUser(): IUser {
    return this.userService.currentUser;
  }
  get aboutYou(): boolean {
    return this.userService.currentUser.userInfo.length > 0 ? true : false;
  }
  get postsForCurrentUser(): any{
    return this.currentUser.posts.filter(s=> s.userId._id === this.userService.currentUser._id);
  } 

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
