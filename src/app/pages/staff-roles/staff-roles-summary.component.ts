import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Chart, ChartType, ChartConfiguration, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables); // ✔️ Required!

@Component({
  selector: 'app-staff-roles-summary',
  standalone: true,
  imports: [CommonModule, HttpClientModule, BaseChartDirective],
  templateUrl: './staff-roles-summary.component.html',
  styleUrls: ['./staff-roles-summary.component.scss'],
})
export class StaffRolesSummaryComponent implements OnInit {
  roles: any[] = [];
  viewMode: 'summary' | 'graph' = 'summary';

  grouped: {
    [category: string]: {
      [subCategory: string]: {
        name: string;
        staffCount: number;
      }[];
    };
  } = {};

  pieData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#29b573', '#3EF6A2', '#FF6384', '#FFCE56', '#36A2EB'],
        hoverOffset: 8,
      },
    ],
  };

  pieOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  pieType: ChartType = 'pie';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any[]>('https://smt-backend-five.vercel.app/api/staff_roles').subscribe((data) => {
      this.roles = data;
      this.groupByCategory();
      this.preparePieChartData();
    });
  }

  toggleView(mode: 'summary' | 'graph') {
    this.viewMode = mode;
  }

  groupByCategory() {
    for (const role of this.roles) {
      const category = role.subcategories.categories.name;
      const subcategory = role.subcategories.name;

      if (!this.grouped[category]) this.grouped[category] = {};
      if (!this.grouped[category][subcategory]) this.grouped[category][subcategory] = [];

      this.grouped[category][subcategory].push({
        name: role.name,
        staffCount: role.staffCount,
      });
    }
  }

  preparePieChartData() {
    const categoryTotals: { [key: string]: number } = {};

    for (const role of this.roles) {
      const category = role.subcategories.categories.name;
      categoryTotals[category] = (categoryTotals[category] || 0) + role.staffCount;
    }

    this.pieData.labels = Object.keys(categoryTotals);
    this.pieData.datasets[0].data = Object.values(categoryTotals);
  }
}