import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';
import * as faker from 'faker';

@Injectable()
export class UsersService {
  private users: User[];

  constructor() {
    this.users = this.generateAllUsers();
  }

  generateUser(id: number): User {
    return {
      id: id,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      city: faker.address.city(),
      zipCode: faker.address.zipCode(),
      dateOfBirth: faker.date.past(),
    };
  }

  generateAllUsers(len = 100): User[] {
    const list: User[] = [];

    for (let i = 0; i < len; i++) {
      list.push(this.generateUser(i + 1));
    }

    return list;
  }

  getAllUsers() {
    return this.users;
  }

  getUser(id: number): User {
    return this.getAllUsers().find((item) => item.id == id);
  }

  createUser(user: User) {
    this.users = [...this.users, { ...user, id: this.users.length + 1 }];
  }

  updateUser(id: number, updatedUser: User): boolean {
    const user = this.getUser(id);
    if (!user) return false;

    const users = this.getAllUsers().filter((item) => item.id != id);

    this.users = [...users, { ...user, ...updatedUser }];

    return true;
  }

  deleteUser(id: number) {
    const users = this.getAllUsers().filter((item) => item.id != id);
    this.users = [...users];
  }
}
