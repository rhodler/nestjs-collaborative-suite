import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

import { PrismaProjectRepository } from './repositories/prisma-project.repository';
import { PrismaProjectMemberRepository } from './repositories/prisma-project-member.repository';

import { ProjectRepository } from 'src/core/repositories/project.repository';
import { ProjectMemberRepository } from 'src/core/repositories/member-project.repository';

@Module({
    imports: [], // set .env
    providers: [
        PrismaService,
        {
            provide: ProjectRepository,
            useClass: PrismaProjectRepository,
        },
        {
            provide: ProjectMemberRepository,
            useClass: PrismaProjectMemberRepository,
        },
    ],
    exports: [PrismaService, ProjectRepository, ProjectMemberRepository],
})
export class PrismaModule {}
