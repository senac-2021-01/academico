import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, IsInt } from 'class-validator';

export class CreateDisciplinaDto {

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

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    cursoId: number;

}
