import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from '../../services/staff.service';
import { StaffMember } from '../../models/staff';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-staff',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.scss']
})
export class EditStaffComponent implements OnInit {
  staffForm!: FormGroup;
  staffId!: number;
  staffMember!: StaffMember | undefined;

  constructor(
    private fb: FormBuilder,
    public staffService: StaffService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.staffId = Number(this.route.snapshot.paramMap.get('id'));

    this.staffService.getStaff().subscribe(staff => {
      this.staffMember = staff.find(member => member.id === this.staffId);
      if (!this.staffMember) {
        alert('Staff member not found!');
        this.router.navigate(['/staff']);
        return;
      }

      this.staffForm = this.fb.group({
        name: [this.staffMember.name, Validators.required],
        surname: [this.staffMember.surname, Validators.required],
        age: [this.staffMember.age, [Validators.required, Validators.min(18), Validators.max(70)]],
        roleId: [this.staffMember.roleId, Validators.required],
        departmentId: [this.staffMember.departmentId, Validators.required],
        supervisorId: [this.staffMember.supervisorId]
      });
    });
  }

  updateStaff() {
    if (this.staffForm.valid) {
      this.staffService.updateStaffMember(this.staffId, this.staffForm.value);
      this.router.navigate(['/staff']);
    }
  }
}