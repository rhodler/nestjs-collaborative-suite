import { IdGeneratorRepository } from 'src/core/repositories/id-generator.repository';

import { nanoid } from 'nanoid';

export class NanoidIdGenerator implements IdGeneratorRepository {
    generate(): string {
        return nanoid();
    }
}
