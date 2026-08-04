//Conecta o TypeORM ao sistema de módulos do NestJS.
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { createDatabaseOptions } from './database-options';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (): TypeOrmModuleOptions => {
                const databaseOptions = createDatabaseOptions();

                return {
                    ...databaseOptions, 

                    autoLoadEntities: true,

                    retryAttempts: 10,
                    retryDelay: 3000,
                }
            }
        })
    ]
})
export class DatabaseModule {}