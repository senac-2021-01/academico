import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DisciplinaEntity } from './disciplina.entity';

import { DisciplinaService } from './disciplina.service';

import { DisciplinaController } from './disciplina.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            DisciplinaEntity,
        ]),
    ],
    providers: [
        DisciplinaService,
    ],
    controllers: [
        DisciplinaController,
    ],
})
export class DisciplinaModule { }
