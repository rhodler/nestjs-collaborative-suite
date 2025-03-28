import { IdGeneratorRepository } from 'src/core/repositories/id-generator.repository';
import { v4 as uuidv4 } from 'uuid';

export class UuidIdGenerator implements IdGeneratorRepository {
    generate(): string {
        return uuidv4();
    }
}
