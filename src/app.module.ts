import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CursoModule } from './curso/curso.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: '127.0.0.1',
            port: 5432,
            username: 'postgres',
            password: 'P@ssw0rd',
            database: 'academico',
            autoLoadEntities: true,
            synchronize: true,
        }),
        CursoModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
