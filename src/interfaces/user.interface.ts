export interface User {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  zipCode?: string;
  dateOfBirth: Date;
}