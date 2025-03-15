export interface StaffMember {
    id: number;
    name: string;
    surname: string;
    age: number;
    supervisorId?: number;
    roleId: number;
    departmentId?: number;
  }  