import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import {
    ApiProperty,
} from '@nestjs/swagger';

import { CursoEntity } from '../curso/curso.entity';

@Entity('disciplina')
export class DisciplinaEntity {

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

    @Column({
        name: 'curso_id',
        type: 'int',
    })
    @ApiProperty()
    public cursoId: number;

    @ManyToOne(() => CursoEntity, curso => curso.disciplinas)
    @JoinColumn({ name: 'curso_id' })
    curso: CursoEntity;

}
