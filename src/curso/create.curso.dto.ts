import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, IsInt, IsOptional } from 'class-validator';

export class CreateCursoDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    nome: string

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    cargaHoraria: number

}
