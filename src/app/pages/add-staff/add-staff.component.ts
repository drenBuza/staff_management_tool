import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StaffService } from '../../services/staff.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StaffMember } from '../../models/staff';
import { ActivityLog } from '../../models/activityLog';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-add-staff',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent {
  staffForm: FormGroup;
  supervisors: StaffMember[] = [];
  roles: { id: number; name: string }[] = [];
  departments: { id: number; name: string }[] = [];

  constructor(private fb: FormBuilder, private staffService: StaffService, private router: Router, private logService: LogService, // ✅ Inject LogService
  ) {
    this.roles = this.staffService.getRoles();
    this.departments = this.staffService.getDepartments();

    this.staffService.getStaff().subscribe(staff => {
      this.supervisors = staff; // Get all staff as potential supervisors
    });

    this.staffForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(65)]],
      supervisorId: [null],
      roleId: [null, Validators.required],
      departmentId: [null]
    });
  }

  addStaff() {
    if (this.staffForm.valid) {
      // Get staff details from the form
      const newStaff = this.staffForm.value;
  
      // Add staff member
      this.staffService.addStaffMember(newStaff);
      this.router.navigate(['/staff']);
  
      // ✅ Dynamically set log details
      const log: ActivityLog = {
        id: Date.now(), // Use timestamp as unique ID
        user: 'Admin', // Replace with actual user if available
        action: 'Added Staff',
        details: `Added ${newStaff.name} ${newStaff.surname} as ${this.staffService.getRoleName(newStaff.roleId)} to ${this.staffService.getDepartmentName(newStaff.departmentId)}`,
        timestamp: new Date()
      };
  
      // ✅ Save the log
      this.logService.addLog(log);
    }
  }
  
  clearForm(): void {
    this.staffForm.reset();
  }
}