import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class PaginationRequestDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    @Min(1)
    page: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    @Min(5)
    @Max(100)
    pageSize: number;

}
