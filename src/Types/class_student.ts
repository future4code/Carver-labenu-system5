import { User } from "./class_user";

export class Student extends User {
    constructor(
        id: string, 
        name: string, 
        email: string, 
        birthDate: string, 
        team_id: string,
    ) { 
        super(id, name, email, birthDate, team_id)
    }
}