import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../services/staff.service';
import { Staff } from '../../models/staff';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {
  staff: Staff[] = [];
  filteredStaff: Staff[] = [];
  groupedStaff: { [key: string]: Staff[] } = {};
  collapsedGroups: { [key: string]: boolean } = {};
  searchTerm: string = '';
  groupBy: string = 'role';

  viewingDetails: Staff | null = null;

  constructor(private staffService: StaffService) { }

  ngOnInit() {
    this.staffService.getStaff().subscribe(data => {
      this.staff = data;
      this.filteredStaff = [...this.staff];
      this.groupStaff();
    });
  }

  getRoleString(role: Staff['staff_roles']): string {
    return `${role.name} (${role.subcategories.name})`;
  }

  getGamertag(member: Staff): string {
    return `${member.gamertag} (${member.name} ${member.surname})`;
  }

  showDetails(member: Staff) {
    this.viewingDetails = member;
  }

  filterStaff() {
    const term = this.searchTerm.toLowerCase();
    this.filteredStaff = this.staff.filter(member =>
      this.getGamertag(member).toLowerCase().includes(term) ||
      this.getRoleString(member.staff_roles).toLowerCase().includes(term) ||
      (member.workgroup?.toLowerCase().includes(term) ?? false)
    );
    this.groupStaff();
  }

  groupStaff() {
    this.groupedStaff = {};
    this.filteredStaff.forEach(member => {
      let key = 'All Staff';
      if (this.groupBy === 'role') key = this.getRoleString(member.staff_roles);

      if (!this.groupedStaff[key]) this.groupedStaff[key] = [];
      this.groupedStaff[key].push(member);
    });
  }

  toggleCollapse(key: string) {
    this.collapsedGroups[key] = !this.collapsedGroups[key];
  }
}