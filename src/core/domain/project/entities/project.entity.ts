export class Projet {
    id: number;
    name: string;
    created_at?: Date;

    constructor(params: { id: number; name: string; created_at: Date }) {
        this.id = params.id;
        this.name = params.name;
        this.created_at = params.created_at || new Date();
    }

    static instance(project: Projet) {
        return new Projet({
            id: project.id,
            name: project.name,
            created_at: project.created_at ?? new Date(),
        });
    }
}
