import { HttpException, Injectable } from '@nestjs/common';

import { ProjectMemberRepository } from '../repositories/member-project.repository';
import { CheckUsersInProjectUseCase } from './check-users-in-project.usecase';
import { StatusCodes, HttpResponse } from 'src/application/http/http-response';

@Injectable()
export class AddMembersToProjectUseCase {
    constructor(
        private projectMemberRepository: ProjectMemberRepository,
        private checkUsersInProjectUseCase: CheckUsersInProjectUseCase
    ) {}

    async execute(id: number, data: { user_ids: number[] }) {
        const checkUsersInProject = await this.checkUsersInProjectUseCase.execute(id, data.user_ids);

        if (checkUsersInProject) throw new HttpException(HttpResponse.error('Some users are already involved in this project', StatusCodes.NOT_FOUND), StatusCodes.NOT_FOUND);

        const projectsMembersInput = data.user_ids.map((user_id) => ({
            project_id: id,
            user_id,
        }));

        const members = await this.projectMemberRepository.addMembersToProject(id, projectsMembersInput);

        return members;
    }
}
