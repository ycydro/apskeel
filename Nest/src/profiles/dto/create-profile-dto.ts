import { IsString, Length } from 'class-validator';

export class CreateProfileDTO {
  @IsString()
  @Length(1, 5)
  name: string;
  @IsString()
  description: string;
}
