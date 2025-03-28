export class User {
    id: number;
    first_name: string;
    last_name: string;
    created_at: Date;

    constructor(params: { id: number; first_name: string; last_name: string; created_at: Date }) {
        this.id = params.id;
        this.first_name = params.first_name;
        this.last_name = params.last_name;
        this.created_at = params.created_at || new Date();
    }

    static instance(user: User) {
        return new User({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            created_at: user.created_at ?? new Date(),
        });
    }
}
