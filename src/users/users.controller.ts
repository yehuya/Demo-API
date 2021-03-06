import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/interfaces/user.interface';
import { UserDto } from './user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiQuery({ name: 'firstName', required: false })
  @ApiQuery({ name: 'city', required: false })
  @Get()
  findAll(
    @Query('firstName') firstName?: string,
    @Query('city') city?: string,
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
  create(@Body() user: UserDto) {
    // BUG: missing user object validation
    this.usersService.createUser(user);

    return { success: true };
  }

  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 200, description: 'Users list' })
  @Get(':id')
  getUser(@Param('id') id: number) {
    const user: User = this.usersService.getUser(id);
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() user: UserDto) {
    // BUG: missing updatedUser object validations
    const res: boolean = this.usersService.updateUser(id, user);

    return {
      success: res,
    };
  }

  @ApiResponse({ status: 404, description: 'User not found' }) // BUG: will never happened
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
