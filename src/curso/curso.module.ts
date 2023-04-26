import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CursoEntity } from './curso.entity';
import { DisciplinaEntity } from '../disciplina/disciplina.entity';

import { CursoService } from './curso.service';
import { DisciplinaService } from '../disciplina/disciplina.service';

import { CursoController } from './curso.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CursoEntity,
            DisciplinaEntity,
        ]),
    ],
    providers: [
        CursoService,
        DisciplinaService,
    ],
    controllers: [
        CursoController,
    ],
})
export class CursoModule { }
