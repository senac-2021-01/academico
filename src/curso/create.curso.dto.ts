import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, IsInt, IsOptional } from 'class-validator';

export class CreateCursoDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    nome: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    cargaHoraria: number;

}
