export interface User {
  id: number;
  email: string;
  username: string | null;
  password: string;
  role: Role; // Ensure Role type is correctly referenced
  createdAt?: Date;
  updatedAt?: Date;
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
}
