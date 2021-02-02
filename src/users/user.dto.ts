import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/interfaces/user.interface';

export class UserDto implements User {
  @ApiProperty({
    readOnly: true,
  })
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  city: string;

  @ApiProperty({
    required: false,
  })
  zipCode?: string;

  @ApiProperty()
  dateOfBirth: Date;
}
