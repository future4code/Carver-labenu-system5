
export abstract class StudentHobby {
  protected id: string
  protected student_id: string
  protected hobby_id: string
    constructor(
        id: string, 
        student_id: string,
        hobby_id: string
    ){
      this.id = id, 
      this.student_id = student_id,
      this.hobby_id = hobby_id
    } 

    public get_id(): string {
      return this.id
      }
    public get_student_id(): string {
      return this.student_id
      }
    public get_hobby_id(): string {
      return this.hobby_id
      }
}



