import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { ProjectMemberRepository } from 'src/core/repositories/member-project.repository';
import { ProjectMember } from 'src/core/domain/project-member/entities/project-member.entity';
import { User } from 'src/core/domain/user/entities/user.entity';

@Injectable()
export class PrismaProjectMemberRepository implements ProjectMemberRepository {
    constructor(private prisma: PrismaService) {}

    async findManyById(id: number): Promise<{ id: number; name: string }[] | []> {
        const projectsMembers = await this.prisma.projects_members.findMany({
            take: 7,
            where: { project_id: id },
            include: { user: true },
        });

        if (projectsMembers.length === 0) return [];

        return projectsMembers.map(ProjectMember.getMemberDetails);
    }

    async addMembersToProject(id: number, data: ProjectMember[]): Promise<Partial<User> | Partial<User>[]> {
        await this.prisma.projects_members.createMany({ data });

        const result = await this.prisma.projects_members.findMany({
            where: {
                user_id: {
                    in: data.map((projectMember) => projectMember.user_id),
                },
                project_id: id,
            },
            include: { user: true },
        });

        if (result.length === 1) return ProjectMember.getMemberDetails(result[0]);

        return result.map(ProjectMember.getMemberDetails);
    }

    async deleteMemberFromProject(id: number, userId: number): Promise<void> {
        await this.prisma.projects_members.deleteMany({
            where: {
                user_id: userId,
                project_id: id,
            },
        });
    }

    async checkUsersInProject(id: number, userIds: number[]): Promise<ProjectMember[] | null> {
        const project = await this.prisma.projects_members.findMany({
            where: { project_id: id, user_id: { in: userIds } },
            include: { user: true },
        });

        if (project.length === 0) return null;

        return project.map(ProjectMember.instance);
    }

    async getProjectMembersRecursive(id: number): Promise<{ id: number; name: string; groups: string[] }[] | []> {
        const results: { id: number; name: string; groups: string[] }[] = [];

        const projectMembers = await this.prisma.projects_members.findMany({
            take: 7,
            where: { project_id: id },
            include: { user: true },
        });

        if (!projectMembers) return [];

        for (const projectMember of projectMembers) {
            const user = User.instance(projectMember.user);
            const groups = await this.getMemberGroups(projectMember.user_id);

            results.push(ProjectMember.getMemberDetails({ user, groups }));
        }

        return results;
    }

    async getMemberGroups(userId: number, depth = 0) {
        if (depth >= 5) return [];

        const groupMembers = await this.prisma.group_members.findMany({
            where: { member_id: userId, member_type: depth === 0 ? 'user' : 'group' },
            include: { group: true },
        });

        let groupNames = groupMembers.map((groupMember) => groupMember.group.name);

        for (const member of groupMembers) {
            if (member.group.parent_id) {
                const nestedGroupMembers = await this.getMemberGroups(member.group_id, depth + 1);

                groupNames = [...groupNames, ...nestedGroupMembers];
            }
        }

        return [...new Set(groupNames)];
    }
}
