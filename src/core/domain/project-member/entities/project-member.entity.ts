import { User } from '../../user/entities/user.entity';

export class ProjectMember {
    project_id: number;
    user_id: number;
    created_at?: Date;

    constructor(params: ProjectMember) {
        this.project_id = params.project_id;
        this.user_id = params.user_id;
        this.created_at = params.created_at ?? new Date();
    }

    static instance(projectMember: ProjectMember) {
        return new ProjectMember({
            project_id: projectMember.project_id,
            user_id: projectMember.user_id,
            created_at: projectMember.created_at ?? new Date(),
        });
    }

    static getMemberDetails({ user, groups }: { user: User; groups?: string[] }) {
        return {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            ...(groups && { groups }),
        };
    }
}
