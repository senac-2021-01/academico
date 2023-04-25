import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, IsInt, IsOptional } from 'class-validator';

export class PaginationResultDto<T> {

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    count: number;

    @ApiProperty()
    @IsNotEmpty()
    rows: T[]

}
