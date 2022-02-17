export class Team{
    constructor(
    private id: string,
    private name: string,
    private module: string
    ){}

    public get_id(): string{
        return this.id
        }
    public get_name(): string{
        return this.name
        }
    public get_module(): string{
        return this.module
        }
}