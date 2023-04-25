import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
} from '@nestjs/common';

import {
    ApiCreatedResponse,
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiOkResponse,
    getSchemaPath,
} from '@nestjs/swagger';

import { CursoEntity } from './curso.entity';

import { CreateCursoDto } from './create.curso.dto';
import { UpdateCursoDto } from './update.curso.dto';

import { CursoService } from './curso.service';

import { PaginationRequestDto } from '../pagination.request.dto';
import { PaginationResultDto } from '../pagination.result.dto';

@ApiTags('Cursos')
@Controller('cursos')
export class CursoController {

    constructor(
        private readonly cursoService: CursoService,
    ) { }

    @ApiOperation({ operationId: 'createCurso' })
    @Post()
    @ApiCreatedResponse({
        status: 201,
        description: 'Created',
        type: CursoEntity,
    })
    async create(@Body() createCursoDto: CreateCursoDto): Promise<CursoEntity> {
        return await this.cursoService.create(createCursoDto);
    }

    @ApiOperation({ operationId: 'readCurso' })
    @Get(':cursoId')
    @ApiResponse({
        status: 200,
        description: 'OK',
        type: CursoEntity,
    })
    @ApiResponse({
        status: 404,
        description: 'Not Found',
    })
    async read(@Param('cursoId', ParseIntPipe) cursoId: number): Promise<CursoEntity> {
        const cursoEntity = await this.cursoService.read(cursoId);

        if (!!cursoEntity) {
            return cursoEntity;
        }

        throw new NotFoundException();
    }

    @ApiOperation({ operationId: 'updateCurso' })
    @Put(':cursoId')
    @ApiResponse({
        status: 200,
        description: 'OK',
        type: CursoEntity,
    })
    @ApiResponse({
        status: 404,
        description: 'Not Found',
    })
    async update(@Param('cursoId', ParseIntPipe) cursoId: number, @Body() updateCursoDto: UpdateCursoDto): Promise<CursoEntity> {
        const cursoEntity = await this.cursoService.update(cursoId, updateCursoDto);

        if (!!cursoEntity) {
            return cursoEntity;
        }

        throw new NotFoundException();
    }

    @ApiOperation({ operationId: 'deleteCurso' })
    @Delete(':cursoId')
    @ApiResponse({
        status: 200,
        description: 'OK',
        type: CursoEntity,
    })
    @ApiResponse({
        status: 404,
        description: 'Not Found',
    })
    async delete(@Param('cursoId', ParseIntPipe) cursoId: number): Promise<CursoEntity> {
        const cursoEntity = await this.cursoService.delete(cursoId);

        if (!!cursoEntity) {
            return cursoEntity;
        }

        throw new NotFoundException();
    }

    @ApiOperation({ operationId: 'readCursos' })
    @Get()
    @ApiOkResponse({
        schema: {
            allOf: [
                { $ref: getSchemaPath(PaginationResultDto) },
                {
                    properties: {
                        rows: {
                            type: 'array',
                            items: { $ref: getSchemaPath(CursoEntity) },
                        },
                    },
                },
            ],
        },
    })
    async readMany(@Query() paginationReQuestDto: PaginationRequestDto): Promise<PaginationResultDto<CursoEntity>> {
        const result = await this.cursoService.readMany(paginationReQuestDto);

        return {
            rows: result[0],
            count: result[1],
        };
    }

}
