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
