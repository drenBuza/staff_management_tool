import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StaffMember } from '../models/staff';
import { Role } from '../models/role';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private staffMembers: StaffMember[] = [];

  private staffSubject = new BehaviorSubject<StaffMember[]>(this.loadStaffFromStorage());
  staff$ = this.staffSubject.asObservable();

  private roles: Role[] = [
    { id: 1, name: 'Director' },
    { id: 2, name: 'Coordinator' },
    { id: 3, name: 'Chief' },
    { id: 4, name: 'Angel' }
  ];

  private departments: Department[] = [
    { id: 1, name: 'Tournament' },
    { id: 2, name: 'IT' },
    { id: 3, name: 'Production' },
    { id: 4, name: 'Communication' },
    { id: 5, name: 'Logistics' }
  ];

  constructor() {}

  getStaff(): Observable<StaffMember[]> {
    return this.staff$;
  }

  getSupervisors(): StaffMember[] {
    return this.staffMembers;
  }

  getRoles(): { id: number; name: string }[] {
    return this.roles;
  }

  getDepartments(): { id: number; name: string }[] {
    return this.departments;
  }

  getRoleName(roleId: number): string {
    return this.roles.find(role => role.id === roleId)?.name || 'Unknown Role';
  }
  
  getDepartmentName(departmentId?: number): string {
    return departmentId ? this.departments.find(dept => dept.id === departmentId)?.name || 'Unknown Department' : 'No Department';
  }

  addStaffMember(newMember: Omit<StaffMember, 'id'>) {
    const id = this.staffMembers.length + 1;
    const staff: StaffMember = {
      id,
      ...newMember,
      roleId: Number(newMember.roleId),
      departmentId: Number(newMember.departmentId),
      supervisorId: newMember.supervisorId ? Number(newMember.supervisorId) : undefined,
    };
    this.staffMembers.push(staff);
    this.saveStaffToStorage();
    this.staffSubject.next(this.staffMembers);
  }

  updateStaffMember(id: number, updatedData: Partial<StaffMember>) {
    const index = this.staffMembers.findIndex(member => member.id === id);
    if (index !== -1) {
      this.staffMembers[index] = { ...this.staffMembers[index], ...updatedData };
      this.saveStaffToStorage();
      this.staffSubject.next(this.staffMembers);
    }
  }
  
  deleteStaffMember(id: number) {
    this.staffMembers = this.staffMembers.filter(member => member.id !== id);
    this.saveStaffToStorage();
    this.staffSubject.next(this.staffMembers);
  }
  

  private loadStaffFromStorage(): StaffMember[] {
    const savedStaff = localStorage.getItem('StaffMembers');
    const staff = savedStaff ? JSON.parse(savedStaff) : [];
    return staff;
  }
  

  private saveStaffToStorage() {
    localStorage.setItem('StaffMembers', JSON.stringify(this.staffMembers));
  }
}
