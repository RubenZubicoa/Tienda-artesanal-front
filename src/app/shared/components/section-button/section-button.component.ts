import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Section } from '../../../core/models/Section';
import { MatBadgeModule } from '@angular/material/badge';


@Component({
  selector: 'app-section-button',
  imports: [RouterModule, MatIconModule, CommonModule, MatBadgeModule],
  templateUrl: './section-button.component.html',
  styleUrl: './section-button.component.scss'
})
export class SectionButtonComponent {

  public section = input.required<Section>();
}
