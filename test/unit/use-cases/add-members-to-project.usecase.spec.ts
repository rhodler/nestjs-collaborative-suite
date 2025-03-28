import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AddMembersToProjectUseCase } from '../../../src/core/use-cases/add-members-to-project.usecase';
import { ProjectMemberRepository } from '../../../src/core/repositories/member-project.repository';
import { CheckUsersInProjectUseCase } from '../../../src/core/use-cases/check-users-in-project.usecase';
import { HttpException } from '@nestjs/common';

describe('AddMembersToProjectUseCase', () => {
    let useCase: AddMembersToProjectUseCase;
    let mockRepository: ProjectMemberRepository;
    let mockCheckUsersUseCase: CheckUsersInProjectUseCase;

    const addMembersToProjectRepository = {
        addMembersToProject: vi.fn(),
        findManyById: vi.fn(),
        deleteMemberFromProject: vi.fn(),
        checkUsersInProject: vi.fn(),
        getProjectMembersRecursive: vi.fn(),
    };
    const checkUsersInProjectUseCase = { execute: vi.fn() };

    beforeEach(() => {
        vi.resetAllMocks();
        mockRepository = addMembersToProjectRepository;
        mockCheckUsersUseCase = checkUsersInProjectUseCase;

        useCase = new AddMembersToProjectUseCase(mockRepository, mockCheckUsersUseCase);
    });

    it('should add members to project successfully', async () => {
        const projectId = 1;
        const userIds = [1, 2, 3];
        const projectMembers = userIds.map((userId) => ({
            project_id: projectId,
            user_id: userId,
        }));
        const mockResponse = [
            { id: 1, name: 'User 1' },
            { id: 2, name: 'User 2' },
            { id: 3, name: 'User 3' },
        ];

        vi.mocked(mockCheckUsersUseCase.execute).mockResolvedValue(null);
        vi.mocked(mockRepository.addMembersToProject).mockResolvedValue(mockResponse);

        const result = await useCase.execute(projectId, { user_ids: userIds });

        expect(mockCheckUsersUseCase.execute).toHaveBeenCalledWith(projectId, userIds);
        expect(mockRepository.addMembersToProject).toHaveBeenCalledWith(projectId, projectMembers);
        expect(result).toEqual(mockResponse);
    });

    it('should throw HttpException when users are already in project', async () => {
        const projectId = 1;
        const userIds = [1, 2, 3];
        const existingMembers = [{ id: 1, name: 'Existing User', project_id: projectId, user_id: 1 }];

        vi.mocked(mockCheckUsersUseCase.execute).mockResolvedValue(existingMembers);

        await expect(useCase.execute(projectId, { user_ids: userIds })).rejects.toThrow(HttpException);

        expect(mockCheckUsersUseCase.execute).toHaveBeenCalledWith(projectId, userIds);
        expect(mockRepository.addMembersToProject).not.toHaveBeenCalled();
    });

    it('should throw error if repository fails', async () => {
        const projectId = 1;
        const userIds = [1, 2, 3];

        vi.mocked(mockCheckUsersUseCase.execute).mockResolvedValue(null);
        vi.mocked(mockRepository.addMembersToProject).mockRejectedValue(new Error('Database error'));

        await expect(useCase.execute(projectId, { user_ids: userIds })).rejects.toThrow('Database error');
    });

    it('should handle empty user_ids array', async () => {
        const projectId = 1;
        const userIds: number[] = [];

        vi.mocked(mockCheckUsersUseCase.execute).mockResolvedValue(null);
        vi.mocked(mockRepository.addMembersToProject).mockResolvedValue([]);

        const result = await useCase.execute(projectId, { user_ids: userIds });

        expect(result).toEqual([]);
        expect(mockCheckUsersUseCase.execute).toHaveBeenCalledWith(projectId, userIds);
        expect(mockRepository.addMembersToProject).toHaveBeenCalledWith(projectId, []);
    });
});
