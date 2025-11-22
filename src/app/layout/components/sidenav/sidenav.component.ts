import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Section, SIDENAV_SECTIONS } from '../../../core/models/Section';
import { SectionButtonComponent } from '../../../shared/components/section-button/section-button.component';

@Component({
  selector: 'app-sidenav',
  imports: [RouterModule, CommonModule, MatIconModule, SectionButtonComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  public sections: Section[] = SIDENAV_SECTIONS;

}
