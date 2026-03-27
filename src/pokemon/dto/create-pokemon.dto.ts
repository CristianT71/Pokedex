import { IsBoolean, IsInt, IsOptional, IsPositive, IsString, Min, MinLength, } from "class-validator";

export class CreatePokemonDto {
    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;

    @IsString()
    @MinLength(1)
    name: string;

    @IsOptional()
    @IsBoolean()
    isCaptured?: boolean;
}


//reglas del body en post