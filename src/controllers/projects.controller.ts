import { Controller, Get, Param } from '@nestjs/common';
import { HttpResponse } from 'src/application/http/http-response';
import { Projet } from 'src/core/domain/project/entities/project.entity';
import { GetProjectUseCase } from 'src/core/use-cases/get-project.usecase';

@Controller('/project')
export class ProjetsController {
    constructor(private readonly getProjectUseCase: GetProjectUseCase) {}

    @Get(':id')
    async getProjectById(@Param('id') id: string): Promise<HttpResponse<Projet | null>> {
        const project = await this.getProjectUseCase.execute(Number(id));

        return HttpResponse.success(project);
    }
}
