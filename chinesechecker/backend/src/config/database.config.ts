import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const DATABASE_CONFIG: TypeOrmModuleOptions = {
    type: 'postgres',
    username: 'postgres',
    password: 'akpol46in&',
    host: 'localhost',
    port: 5432,
    database: 'chinese_checker_db',
    synchronize: true,
    entities: ['src/models/entities/*.entity{.ts,.js}']
}