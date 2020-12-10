import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { buffer, debounceTime, filter, map } from 'rxjs/operators';
import { IUser } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  subscription: Subscription;

  get isLogged(): boolean {
    return this.userService.isLogged;
  }
  get currentUser(): IUser{
    return this.userService.currentUser;
  }

  constructor(
    title: Title,
    public userService: UserService,
    private router: Router) { 

      router.events.pipe(
        filter(e => e instanceof ActivationEnd),
        buffer(router.events.pipe(filter(e=>e instanceof NavigationEnd), debounceTime(0))),
        map((events: ActivationEnd[]) => events.reduce((acc,curr) => ({...acc, ...curr.snapshot.data}))),
      ).subscribe(console.log);
    }

  logoutHandler(): void {
    this.userService.logout().subscribe(() => this.router.navigate(['/user/login']));
  }
}