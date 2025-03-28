import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetProjectUseCase } from '../../../src/core/use-cases/get-project.usecase';
import { ProjectRepository } from '../../../src/core/repositories/project.repository';

describe('GetProjectUseCase', () => {
    let useCase: GetProjectUseCase;
    let mockRepository: ProjectRepository;
    const projectRepository = { findById: vi.fn() };

    beforeEach(() => {
        vi.resetAllMocks();
        mockRepository = projectRepository;
        useCase = new GetProjectUseCase(mockRepository);
    });

    it('should get project successfully', async () => {
        const projectId = 1;
        const mockProject = { id: projectId, name: 'Test Project' };

        vi.mocked(mockRepository.findById).mockResolvedValue(mockProject);

        const result = await useCase.execute(projectId);

        expect(result).toEqual(mockProject);
        expect(mockRepository.findById).toHaveBeenCalledWith(projectId);
    });

    it('should throw error if project not found', async () => {
        const projectId = 1;

        vi.mocked(mockRepository.findById).mockResolvedValue(null);

        await expect(useCase.execute(projectId)).rejects.toThrow('Project not found');
    });
});
