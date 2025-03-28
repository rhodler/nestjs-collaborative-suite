import { Module } from '@nestjs/common';

import { IdGeneratorRepository } from 'src/core/repositories/id-generator.repository';

import { UuidIdGenerator } from './uuid-id-generator';
// import { NanoidIdGenerator } from './nanoid-id-generator';

@Module({
    providers: [
        {
            provide: IdGeneratorRepository,
            useClass: UuidIdGenerator,
        },
    ],
    exports: [IdGeneratorRepository],
})
export class IdGeneratorModule {}
