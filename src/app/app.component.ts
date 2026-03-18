import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/components/header/header.component';
import { SidenavComponent } from './layout/components/sidenav/sidenav.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { CurrentLanguegeService } from './core/services/current-languege.service';
import { TokenService } from './core/services/token.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidenavComponent, LoadingComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Artis';
  private readonly currentLanguegeService = inject(CurrentLanguegeService);
  private readonly tokenService = inject(TokenService);

  constructor() {
    this.currentLanguegeService.setCurrentLanguege('eus');
    this.tokenService.verifyToken();
  }
} 
