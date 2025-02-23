import { IsOptional, IsString, MaxLength } from "class-validator";

export class GetResourceDto {
    @IsString()
    @IsOptional()
    @MaxLength(100)
    searchName?: string;
}