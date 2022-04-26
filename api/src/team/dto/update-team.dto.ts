import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class UpdateTeamDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsOptional()
  readonly name: string;
}
