import { Module } from '@nestjs/common';

import { ProjetsController } from './projects.controller';
import { ProjectsMembersController } from './projects-members.controller';

import { IdGeneratorModule } from 'src/infrastructure/providers/id-generator/id-generator.module';

import { GetProjectUseCase } from 'src/core/use-cases/get-project.usecase';
import { GetProjectsMembersUseCase } from 'src/core/use-cases/get-projects-members.usecase';
import { AddMembersToProjectUseCase } from 'src/core/use-cases/add-members-to-project.usecase';
import { DeleteMemberFromProjectUseCase } from 'src/core/use-cases/delete-member-from-project.usecase';
import { CheckUsersInProjectUseCase } from 'src/core/use-cases/check-users-in-project.usecase';
import { GetProjectMembersRecursiveUseCase } from 'src/core/use-cases/get-project-members-recursive.usecase';

@Module({
    imports: [IdGeneratorModule],
    controllers: [ProjetsController, ProjectsMembersController],
    providers: [GetProjectsMembersUseCase, GetProjectUseCase, AddMembersToProjectUseCase, DeleteMemberFromProjectUseCase, CheckUsersInProjectUseCase, GetProjectMembersRecursiveUseCase],
})
export class ControllerModule {}
