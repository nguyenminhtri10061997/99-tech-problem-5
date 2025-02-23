
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateResourceDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name!: string;

    @IsString()
    @IsOptional()
    description?: string;
}