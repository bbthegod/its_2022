interface User {
  _id: string;
  studentClass: string;
  studentCode: string;
  studentName: string;
  studentPhone: string;
  isOnline: boolean;
  password: string;
  role?: string;
  status?: number;
}
