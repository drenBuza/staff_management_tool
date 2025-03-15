import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../services/staff.service';
import { StaffMember } from '../../models/staff';
import { Role } from '../../models/role';
import { Department } from '../../models/department';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule], // ✅ Import FormsModule for [(ngModel)]
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {
  staff: StaffMember[] = [];
  filteredStaff: StaffMember[] = [];
  groupedStaff: { [key: string]: StaffMember[] } = {};
  collapsedGroups: { [key: string]: boolean } = {};
  searchTerm: string = '';
  groupBy: string = '';

  roles: Role[] = [];
  departments: Department[] = [];

  constructor(private staffService: StaffService) {}

  ngOnInit() {
    this.roles = this.staffService.getRoles();
    this.departments = this.staffService.getDepartments();

    this.staffService.getStaff().subscribe(data => {
      this.staff = data;
      this.filteredStaff = [...this.staff];
      this.groupStaff(); // Initialize grouping
    });
  }

  filterStaff() {
    const term = this.searchTerm.toLowerCase();
    this.filteredStaff = this.staff.filter(member =>
      member.name.toLowerCase().includes(term) ||
      member.surname.toLowerCase().includes(term) ||
      this.getRoleName(member.roleId).toLowerCase().includes(term) ||
      this.getDepartmentName(member.departmentId).toLowerCase().includes(term) ||
      this.getSupervisorName(member.supervisorId).toLowerCase().includes(term)
    );
    this.groupStaff(); // Reapply grouping after filtering
  }

  groupStaff() {
    this.groupedStaff = {};
    this.filteredStaff.forEach(member => {
      let key = 'All Staff';
      if (this.groupBy === 'role') key = this.getRoleName(member.roleId);
      if (this.groupBy === 'department') key = this.getDepartmentName(member.departmentId);
      if (this.groupBy === 'supervisor') key = this.getSupervisorName(member.supervisorId);

      if (!this.groupedStaff[key]) this.groupedStaff[key] = [];
      this.groupedStaff[key].push(member);
    });
  }

  toggleCollapse(groupKey: string) {
    this.collapsedGroups[groupKey] = !this.collapsedGroups[groupKey];
  }

  getRoleName(roleId: number): string {
    return this.roles.find(role => role.id === roleId)?.name || 'Unknown Role';
  }

  getDepartmentName(departmentId?: number): string {
    return departmentId ? this.departments.find(dept => dept.id === departmentId)?.name || 'Unknown Department' : 'None';
  }

  getSupervisorName(supervisorId?: number): string {
    if (!supervisorId) return 'No Supervisor';
    const supervisor = this.staff.find(member => member.id === supervisorId);
    return supervisor ? `${supervisor.name} ${supervisor.surname}` : 'Unknown';
  }

  deleteStaff(id: number) {
    if (confirm('Are you sure you want to delete this staff member?')) {
      this.staffService.deleteStaffMember(id);
      this.filterStaff(); // Refresh list after deletion
    }
  }
}