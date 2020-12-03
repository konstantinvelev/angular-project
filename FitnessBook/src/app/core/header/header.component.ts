import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //get isLogged(): boolean{
  //  return this.userService.isLogged
  //}

  constructor() { }

  ngOnInit(): void {
  }

}
`
  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  logoutHandler(): void {
    this.userService.logout().subscribe(() => this.router.navigate(['/user/login']));
  }

  ngOnDestroy(): void {
  }
}`