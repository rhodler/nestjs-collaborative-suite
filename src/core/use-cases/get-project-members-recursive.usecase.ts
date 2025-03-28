import { Injectable } from '@nestjs/common';

import { ProjectMemberRepository } from '../repositories/member-project.repository';

@Injectable()
export class GetProjectMembersRecursiveUseCase {
    constructor(private projectMemberRepository: ProjectMemberRepository) {}

    async execute(id: number) {
        const projectMembers = await this.projectMemberRepository.getProjectMembersRecursive(id);

        return projectMembers;
    }
}
