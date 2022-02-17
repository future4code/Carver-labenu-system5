export abstract class User {
    protected id: string
    protected name: string
    protected email: string
    protected birthDate: string
    protected team_id: string

    constructor(
        id: string, 
        name: string, 
        email: string, 
        birthDate: string, 
        team_id: string
    ){
        this.id = id, 
        this.name = name,
        this.email = email,
        this.birthDate = birthDate,
        this.team_id = team_id
    }

    public get_id(): string {
        return this.id
        }
    public get_name(): string {
        return this.name
        }
    public get_email(): string {
        return this.email
        }
    public get_birthDate(): string {
        return this.birthDate
        }
    public get_teamId(): string {
        return this.team_id
        }
}