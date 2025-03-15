import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  logs: any[] = [];

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.logService.getLogs().subscribe(data => {
      this.logs = data;
    });
  }
}