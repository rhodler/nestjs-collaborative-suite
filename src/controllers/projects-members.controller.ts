import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { HttpResponse } from 'src/application/http/http-response';

import { User } from 'src/core/domain/user/entities/user.entity';
import { AddMembersToProjectUseCase } from 'src/core/use-cases/add-members-to-project.usecase';
import { DeleteMemberFromProjectUseCase } from 'src/core/use-cases/delete-member-from-project.usecase';
import { GetProjectMembersRecursiveUseCase } from 'src/core/use-cases/get-project-members-recursive.usecase';
import { GetProjectsMembersUseCase } from 'src/core/use-cases/get-projects-members.usecase';

@Controller('/projects')
export class ProjectsMembersController {
    constructor(
        private readonly getProjectsMembersUseCase: GetProjectsMembersUseCase,
        private readonly addMembersToProjectUsecase: AddMembersToProjectUseCase,
        private readonly deleteMemberFromProjectUsecase: DeleteMemberFromProjectUseCase,
        private readonly getProjectMembersRecursiveUseCase: GetProjectMembersRecursiveUseCase
    ) {}

    @Get(':id/members')
    async getProjectMembersById(@Param('id') id: string): Promise<HttpResponse<{ id: number; name: string; groups?: string[] }[] | []>> {
        // Retrieve a list of members for a specific project.
        // const members = await this.getProjectsMembersUseCase.execute(Number(id));

        // Retrieve a list of members for a specific project, including members of groups recursively.
        const members = await this.getProjectMembersRecursiveUseCase.execute(Number(id));

        return HttpResponse.success(members);
    }

    @Post(':id/members')
    async addMembersToProject(@Param('id') id: string, @Body() data: { user_ids: [] }): Promise<HttpResponse<Partial<User> | Partial<User>[]>> {
        const members = await this.addMembersToProjectUsecase.execute(Number(id), data);

        return HttpResponse.created(members);
    }

    @Delete(':id/members/:userId')
    async deleteMemberFromProject(@Param('id') id: string, @Param('userId') userId: string): Promise<HttpResponse<null>> {
        await this.deleteMemberFromProjectUsecase.execute(Number(id), { userId: Number(userId) });

        return HttpResponse.deleted();
    }
}
