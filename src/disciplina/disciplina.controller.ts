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

import { DisciplinaEntity } from './disciplina.entity';

import { CreateDisciplinaDto } from './create.disciplina.dto';
import { UpdateDisciplinaDto } from './update.disciplina.dto';

import { DisciplinaService } from './disciplina.service';

import { PaginationRequestDto } from '../pagination.request.dto';
import { PaginationResultDto } from '../pagination.result.dto';

@ApiTags('Disciplinas')
@Controller('disciplinas')
export class DisciplinaController {

    constructor(
        private readonly disciplinaService: DisciplinaService,
    ) { }

    @ApiOperation({ operationId: 'createDisciplina' })
    @Post()
    @ApiCreatedResponse({
        status: 201,
        description: 'Created',
        type: DisciplinaEntity,
    })
    async create(@Body() createDisciplinaDto: CreateDisciplinaDto): Promise<DisciplinaEntity> {
        return await this.disciplinaService.create(createDisciplinaDto);
    }

    @ApiOperation({ operationId: 'readDisciplina' })
    @Get(':disciplinaId')
    @ApiResponse({
        status: 200,
        description: 'OK',
        type: DisciplinaEntity,
    })
    @ApiResponse({
        status: 404,
        description: 'Not Found',
    })
    async read(@Param('disciplinaId', ParseIntPipe) disciplinaId: number): Promise<DisciplinaEntity> {
        const disciplinaEntity = await this.disciplinaService.read(disciplinaId);

        if (!!disciplinaEntity) {
            return disciplinaEntity;
        }

        throw new NotFoundException();
    }

    @ApiOperation({ operationId: 'updateDisciplina' })
    @Put(':disciplinaId')
    @ApiResponse({
        status: 200,
        description: 'OK',
        type: DisciplinaEntity,
    })
    @ApiResponse({
        status: 404,
        description: 'Not Found',
    })
    async update(@Param('disciplinaId', ParseIntPipe) disciplinaId: number, @Body() updateDisciplinaDto: UpdateDisciplinaDto): Promise<DisciplinaEntity> {
        const disciplinaEntity = await this.disciplinaService.update(disciplinaId, updateDisciplinaDto);

        if (!!disciplinaEntity) {
            return disciplinaEntity;
        }

        throw new NotFoundException();
    }

    @ApiOperation({ operationId: 'deleteDisciplina' })
    @Delete(':disciplinaId')
    @ApiResponse({
        status: 200,
        description: 'OK',
        type: DisciplinaEntity,
    })
    @ApiResponse({
        status: 404,
        description: 'Not Found',
    })
    async delete(@Param('disciplinaId', ParseIntPipe) disciplinaId: number): Promise<DisciplinaEntity> {
        const disciplinaEntity = await this.disciplinaService.delete(disciplinaId);

        if (!!disciplinaEntity) {
            return disciplinaEntity;
        }

        throw new NotFoundException();
    }

    @ApiOperation({ operationId: 'readDisciplinas' })
    @Get()
    @ApiOkResponse({
        schema: {
            allOf: [
                { $ref: getSchemaPath(PaginationResultDto) },
                {
                    properties: {
                        rows: {
                            type: 'array',
                            items: { $ref: getSchemaPath(DisciplinaEntity) },
                        },
                    },
                },
            ],
        },
    })
    async readMany(@Query() paginationReQuestDto: PaginationRequestDto): Promise<PaginationResultDto<DisciplinaEntity>> {
        const result = await this.disciplinaService.readMany(paginationReQuestDto);

        return {
            rows: result[0],
            count: result[1],
        };
    }

}
