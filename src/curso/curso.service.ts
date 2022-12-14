import {
    Repository,
} from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CursoEntity } from './curso.entity';
import { CreateCursoDto } from './create.curso.dto';
import { UpdateCursoDto } from './update.curso.dto';

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

    async read(id: number): Promise<CursoEntity> {
        return await this.cursoRepository.findOneBy({ id: id });
    }

    async update(id: number, updateCursoDto: UpdateCursoDto): Promise<CursoEntity> {
        let cursoEntity = await this.cursoRepository.findOneBy({ id: id });

        if (!!cursoEntity) {
            return this.cursoRepository.save({
                id: id,
                nome: updateCursoDto.nome,
                cargaHoraria: updateCursoDto.cargaHoraria,
            });
        }

        return null;
    }

    async delete(id: number): Promise<CursoEntity> {
        let cursoEntity = await this.cursoRepository.findOneBy({ id: id });

        if (!!cursoEntity) {
            cursoEntity = await this.cursoRepository.remove(cursoEntity);

            cursoEntity.id = id;
        }

        return cursoEntity;
    }

}
