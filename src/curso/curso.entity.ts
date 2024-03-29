import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';

import {
    ApiProperty,
} from '@nestjs/swagger';

import { DisciplinaEntity } from '../disciplina/disciplina.entity';

@Entity('curso')
export class CursoEntity {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    public id: number;

    @Column({
        name: 'nome',
        type: 'varchar',
        length: 50,
    })
    @ApiProperty()
    public nome: string;

    @Column({
        name: 'carga_horaria',
        type: 'int',
    })
    @ApiProperty()
    public cargaHoraria: number;

    @OneToMany(() => DisciplinaEntity, disciplina => disciplina.curso)
    disciplinas: DisciplinaEntity[];

}
