import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { CommonModule } from '@angular/common';
import { TotalProductsMonthComponent } from '../../components/total-products-month/total-products-month.component';

@Component({
  selector: 'app-analysis',
  imports: [CommonModule, BreadcrumbsComponent, TotalProductsMonthComponent],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss'
})
export class AnalysisComponent {

}
