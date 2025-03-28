import { DynamicModule, Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';

interface DatabaseOptions {
    type: 'prisma' | 'mongoose';
    global?: boolean;
}

@Module({})
export class DatabaseModule {
    static async register({ global = false }: DatabaseOptions): Promise<DynamicModule> {
        return {
            global,
            module: DatabaseModule,
            imports: [PrismaModule],
            exports: [PrismaModule],
        };
    }
}
