import {
    Repository,
} from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CursoEntity } from './curso.entity';
import { CreateCursoDto } from './create.curso.dto';

@Injectable()
export class CursoService {

    constructor(
        @InjectRepository(CursoEntity)
        private readonly cursoRepository: Repository<CursoEntity>,
    ) { }

    async create(createCursoDto: CreateCursoDto): Promise<CursoEntity> {
        return await this.cursoRepository.save({
            nome: createCursoDto.nome,
            cargaHoraria: createCursoDto.cargaHoraria,
        });
    }

}
