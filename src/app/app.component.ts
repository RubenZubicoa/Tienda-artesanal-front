import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/components/header/header.component';
import { SidenavComponent } from './layout/components/sidenav/sidenav.component';
import { CurrentUserService } from './core/services/current-user.service';
import { UsersService } from './users/services/users.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'tienda';
  private readonly currentUserService = inject(CurrentUserService);
  private readonly usersService = inject(UsersService);

  ngOnInit(): void {
    this.usersService.getUserByEmail("rubenzubicoatic@gmail.com").subscribe((user) => {
      this.currentUserService.setCurrentUser(user);
    });
  }
} 
