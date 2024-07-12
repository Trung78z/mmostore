// src/types/user.ts

import { Role } from "./enums/enums"; // Import Role enum from enums file or define it here

export interface User {
  id: number;
  email: string;
  username: string | null;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  profiles?: Profile;
}

export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  accountBalance: string;
  user: User;
  userId: number;
}

export interface RegistrationData {
  email: string;
  username?: string;
  password: string;
  role: Role;
}
