import {
    Repository,
} from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DisciplinaEntity } from './disciplina.entity';
import { CreateDisciplinaDto } from './create.disciplina.dto';
import { UpdateDisciplinaDto } from './update.disciplina.dto';

import { PaginationRequestDto } from '../pagination.request.dto';

@Injectable()
export class DisciplinaService {

    constructor(
        @InjectRepository(DisciplinaEntity)
        private readonly disciplinaRepository: Repository<DisciplinaEntity>,
    ) { }

    async create(createDisciplinaDto: CreateDisciplinaDto): Promise<DisciplinaEntity> {
        return await this.disciplinaRepository.save({
            nome: createDisciplinaDto.nome,
            cargaHoraria: createDisciplinaDto.cargaHoraria,
            cursoId: createDisciplinaDto.cursoId,
        });
    }

    async read(id: number): Promise<DisciplinaEntity> {
        return await this.disciplinaRepository.findOneBy({ id: id });
    }

    async update(id: number, updateDisciplinaDto: UpdateDisciplinaDto): Promise<DisciplinaEntity> {
        let disciplinaEntity = await this.disciplinaRepository.findOneBy({ id: id });

        if (!!disciplinaEntity) {
            return this.disciplinaRepository.save({
                id: id,
                nome: updateDisciplinaDto.nome,
                cargaHoraria: updateDisciplinaDto.cargaHoraria,
                cursoId: updateDisciplinaDto.cursoId,
            });
        }

        return null;
    }

    async delete(id: number): Promise<DisciplinaEntity> {
        let disciplinaEntity = await this.disciplinaRepository.findOneBy({ id: id });

        if (!!disciplinaEntity) {
            disciplinaEntity = await this.disciplinaRepository.remove(disciplinaEntity);

            disciplinaEntity.id = id;
        }

        return disciplinaEntity;
    }

    async readMany(paginationRequestDto: PaginationRequestDto): Promise<[DisciplinaEntity[], number]> {
        return this.disciplinaRepository.findAndCount({
            skip: paginationRequestDto.pageSize * (paginationRequestDto.page - 1),
            take: paginationRequestDto.pageSize,
        });
    }

}
