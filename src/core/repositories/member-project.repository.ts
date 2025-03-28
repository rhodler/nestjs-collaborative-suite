import { User } from '../domain/user/entities/user.entity';
import { ProjectMember } from '../domain/project-member/entities/project-member.entity';

export abstract class ProjectMemberRepository {
    abstract findManyById(id: number): Promise<{ id: number; name: string }[] | []>;
    abstract addMembersToProject(id: number, data: ProjectMember[]): Promise<Partial<User> | Partial<User>[]>;
    abstract deleteMemberFromProject(id: number, userId: number): Promise<void>;
    abstract checkUsersInProject(id: number, userIds: number[]): Promise<ProjectMember[] | null>;
    abstract getProjectMembersRecursive(id: number): Promise<{ id: number; name: string; groups?: string[] }[] | []>;
}
