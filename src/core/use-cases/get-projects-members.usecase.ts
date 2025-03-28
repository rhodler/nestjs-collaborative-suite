import { Injectable } from '@nestjs/common';

import { ProjectMemberRepository } from '../repositories/member-project.repository';

@Injectable()
export class GetProjectsMembersUseCase {
    constructor(private projectMemberRepository: ProjectMemberRepository) {}

    async execute(id: number) {
        const projectsMembers = await this.projectMemberRepository.findManyById(id);

        return projectsMembers;
    }
}
