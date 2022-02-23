import { User } from "./class_user";

export class Teacher extends User {
    constructor(
        id: string, 
        name: string, 
        email: string, 
        birthDate: string, 
        team_id: string,
        protected Specialities: string[]
    ) { super(id, name, email, birthDate, team_id)}

    public get_Speciality(): string[] {
        return this.Specialities
    }
}