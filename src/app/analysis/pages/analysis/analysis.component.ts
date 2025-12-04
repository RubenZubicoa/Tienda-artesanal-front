import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analysis',
  imports: [CommonModule, BreadcrumbsComponent],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss'
})
export class AnalysisComponent {

}
