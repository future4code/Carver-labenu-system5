
export class Hobby {
  protected id: string
  protected name: string

    constructor(
        id: string, 
        name: string
    ){
      this.id = id, 
      this.name = name
    } 

    public get_id(): string {
      return this.id
      }
    public get_name(): string {
      return this.name
      }
}



