import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DeleteMemberFromProjectUseCase } from '../../../src/core/use-cases/delete-member-from-project.usecase';
import { ProjectMemberRepository } from '../../../src/core/repositories/member-project.repository';
import { ProjectMember } from '../../../src/core/domain/project-member/entities/project-member.entity';
import { CheckUsersInProjectUseCase } from '../../../src/core/use-cases/check-users-in-project.usecase';
import { HttpException } from '@nestjs/common';

describe('DeleteMemberFromProjectUseCase', () => {
    let useCase: DeleteMemberFromProjectUseCase;
    let mockRepository: ProjectMemberRepository;
    let mockCheckUsersUseCase: CheckUsersInProjectUseCase;

    const deleteMemberFromProjectRepository = {
        deleteMemberFromProject: vi.fn(),
        checkUsersInProject: vi.fn(),
        findManyById: vi.fn(),
        addMembersToProject: vi.fn(),
        getProjectMembersRecursive: vi.fn(),
    };

    beforeEach(() => {
        vi.resetAllMocks();
        mockRepository = deleteMemberFromProjectRepository;
        mockCheckUsersUseCase = { execute: vi.fn() };

        useCase = new DeleteMemberFromProjectUseCase(mockRepository, mockCheckUsersUseCase);
    });

    it('should delete member from project successfully', async () => {
        const projectId = 1;
        const userId = 1;

        vi.mocked(mockCheckUsersUseCase.execute).mockResolvedValue([new ProjectMember({ project_id: projectId, user_id: userId })]);
        vi.mocked(mockRepository.deleteMemberFromProject).mockResolvedValue();

        await useCase.execute(projectId, { userId: userId });

        expect(mockCheckUsersUseCase.execute).toHaveBeenCalledWith(projectId, [userId]);
        expect(mockRepository.deleteMemberFromProject).toHaveBeenCalledWith(projectId, userId);
    });

    it('should throw HttpException if user not in project', async () => {
        const projectId = 1;
        const userId = 1;

        vi.mocked(mockCheckUsersUseCase.execute).mockResolvedValue(null);

        await expect(useCase.execute(projectId, { userId: userId })).rejects.toThrow(HttpException);

        expect(mockCheckUsersUseCase.execute).toHaveBeenCalledWith(projectId, [userId]);
        expect(mockRepository.deleteMemberFromProject).not.toHaveBeenCalled();
    });
});
