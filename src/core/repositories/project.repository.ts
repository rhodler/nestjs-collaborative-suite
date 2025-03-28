import { Projet } from '../domain/project/entities/project.entity';

export abstract class ProjectRepository {
    abstract findById(id: number): Promise<Projet | null>;
}
