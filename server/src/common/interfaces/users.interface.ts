class User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  hashedRT?: string;
  hashedPassword: string;
  role: 'user' | 'admin';
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Student extends User{
  studentNo: number;
  departmentId: number;
}

export interface Coordinator extends User {
  departmentId: number;
}

export interface Superviser extends User {
  position: string;
  companyId: number;
}