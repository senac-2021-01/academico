import {
    Body,
    Controller,
    Post,
} from '@nestjs/common';

import {
    ApiCreatedResponse,
    ApiTags,
    ApiOperation,
} from '@nestjs/swagger';

import { CursoEntity } from './curso.entity';

import { CreateCursoDto } from './create.curso.dto';

import { CursoService } from './curso.service';

@ApiTags('Cursos')
@Controller('cursos')
export class CursoController {

    constructor(
        private readonly cursoService: CursoService,
    ) { }

    @ApiOperation({ operationId: 'criarCurso' })
    @Post()
    @ApiCreatedResponse({
        status: 201,
        description: 'Created',
        type: CursoEntity,
    })
    async create(@Body() createCursoDto: CreateCursoDto): Promise<CursoEntity> {
        return await this.cursoService.create(createCursoDto);
    }

}
