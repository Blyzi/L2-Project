import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly name!: string;
}
