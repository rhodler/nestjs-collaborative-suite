import { Injectable } from '@nestjs/common';

import { ProjectMemberRepository } from '../repositories/member-project.repository';

@Injectable()
export class CheckUsersInProjectUseCase {
    constructor(private projectMemberRepository: ProjectMemberRepository) {}

    async execute(id: number, userIds: number[]) {
        const project = await this.projectMemberRepository.checkUsersInProject(id, userIds);

        return project;
    }
}
