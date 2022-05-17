import { IsInt, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;
}
