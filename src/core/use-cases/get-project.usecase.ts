import { HttpException, Injectable } from '@nestjs/common';

import { ProjectRepository } from '../repositories/project.repository';
import { HttpResponse } from 'src/application/http/http-response';
import { StatusCodes } from 'src/application/http/http-response';

@Injectable()
export class GetProjectUseCase {
    constructor(private projectRepository: ProjectRepository) {}

    async execute(id: number) {
        const project = await this.projectRepository.findById(id);

        if (!project) throw new HttpException(HttpResponse.error('Project not found', StatusCodes.NOT_FOUND), StatusCodes.NOT_FOUND);

        return project;
    }
}
