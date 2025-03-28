import { IsNotEmpty, IsNumber, IsArray, ArrayNotEmpty } from 'class-validator';

export class AddMembersToProjectDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsArray()
  @ArrayNotEmpty({ message: 'Please add at least one member' })
  user_ids: string[];
}
