import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(
    @Query('firstName') firstName: string,
    @Query('city') city: string,
  ): User[] {
    let list = this.usersService.getAllUsers();

    if (firstName) {
      // BUG: Should filter with toLowerCase method
      // BUG: Should filter with === operator
      list = list.filter((item) => item.firstName.includes(firstName));
    }

    if (city) {
      // BUG: Should filter with toLowerCase method
      // BUG: Should filter with === operator
      list = list.filter((item) => item.city.includes(city));
    }

    return list;
  }

  @Post()
  create(@Body() user: User) {
    // BUG: missing user object validation
    this.usersService.createUser(user);

    return { success: true };
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    const user: User = this.usersService.getUser(id);
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() user: User) {
    // BUG: missing updatedUser object validations
    const res: boolean = this.usersService.updateUser(id, user);

    return {
      success: res,
    };
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    // BUG: Allow deleting user that does not exist
    const user = this.usersService.getUser(id);
    this.usersService.deleteUser(id);

    return {
      success: true,
      message: `${user?.firstName} ${user?.lastName} deleted successfully`,
    };
  }
}
