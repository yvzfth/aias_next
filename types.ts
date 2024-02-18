interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  phone?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  token?: string;
}

interface Activity {
  id: number;
  academic_activity_type: string;
  activity_id: string;
  description: string;
  point: number;
}

interface Coefficient {
  id: number;
  value: number;
}

interface Application {
  [key: string]: string | File | null;
  submission_period: string;
  name: string;
  surname: string;
  email: string;
  title: string;
  faculty: string;
  department: string;
  work_name: string;
  basic_field: string;
  scientific_field: string;
  persons: string;
  academic_activity_type: string;
  activity: string;
  doi_number: string;
  file: File | null;
}
