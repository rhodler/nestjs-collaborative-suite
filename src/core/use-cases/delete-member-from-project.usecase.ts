import { HttpException, Injectable } from '@nestjs/common';

import { ProjectMemberRepository } from '../repositories/member-project.repository';
import { StatusCodes } from 'src/application/http/http-response';
import { HttpResponse } from 'src/application/http/http-response';
import { CheckUsersInProjectUseCase } from './check-users-in-project.usecase';

@Injectable()
export class DeleteMemberFromProjectUseCase {
    constructor(
        private projectMemberRepository: ProjectMemberRepository,
        private checkUsersInProjectUseCase: CheckUsersInProjectUseCase
    ) {}

    async execute(id: number, data: { userId: number }) {
        const checkUsersInProject = await this.checkUsersInProjectUseCase.execute(id, [data.userId]);

        if (!checkUsersInProject) throw new HttpException(HttpResponse.error('User not found in project', StatusCodes.NOT_FOUND), StatusCodes.NOT_FOUND);

        await this.projectMemberRepository.deleteMemberFromProject(id, data.userId);
    }
}
