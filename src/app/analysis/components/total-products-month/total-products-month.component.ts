// import { CommonModule, isPlatformBrowser } from '@angular/common';
// import {
//   ChangeDetectorRef,
//   Component,
//   effect,
//   inject,
//   PLATFORM_ID,
// } from '@angular/core';
// import { ChartModule } from 'primeng/chart';

// @Component({
//   selector: 'app-total-products-month',
//   imports: [CommonModule, ChartModule],
//   templateUrl: './total-products-month.component.html',
//   styleUrl: './total-products-month.component.scss',
// })
// export class TotalProductsMonthComponent {
//   data: any;

//   options: any;

//   platformId = inject(PLATFORM_ID);



//   constructor(private cd: ChangeDetectorRef) {}


//   ngOnInit() {
//       this.initChart();
//   }

//   initChart() {
//     if (isPlatformBrowser(this.platformId)) {
//         const documentStyle = getComputedStyle(document.documentElement);
//         const textColor = documentStyle.getPropertyValue('--p-text-color');
//         const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
//         const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

//         this.data = {
//             labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//             datasets: [
//                 {
//                     label: 'Total de productos vendidos por mes',
//                     data: [65, 59, 80, 81, 56, 55, 40],
//                     fill: false,
//                     borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
//                     tension: 0.4
//                 }
//             ]
//         };

//         this.options = {
//             maintainAspectRatio: false,
//             aspectRatio: 0.6,
//             plugins: {
//                 legend: {
//                     labels: {
//                         color: textColor
//                     }
//                 }
//             },
//             scales: {
//                 x: {
//                     ticks: {
//                         color: textColorSecondary
//                     },
//                     grid: {
//                         color: surfaceBorder,
//                         drawBorder: false
//                     }
//                 },
//                 y: {
//                     ticks: {
//                         color: textColorSecondary
//                     },
//                     grid: {
//                         color: surfaceBorder,
//                         drawBorder: false
//                     }
//                 }
//             }
//         };
//         this.cd.markForCheck()
//     }
// }
// }
