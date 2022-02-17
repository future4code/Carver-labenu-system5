import { Request, Response } from "express";
import { StudentDataBase } from "../../Data/StudentsDataBase";
import { Student } from "../../Types/class_student";

export const createStudent = async (req: Request, resp: Response):Promise<void> => {
    let errorCode = 400
    try {
        const { name, email, birthDate, team_id, specialities } = req.body

        const id = "StudentId" + Date.now().toString()

        if (!name || !email || !birthDate || !team_id || specialities){
            errorCode = 422
            throw new Error('Verifique se todos os campos pedidos foram preenchidos.')
        }

        const studentData = new StudentDataBase()
        const studentStats: Student = new Student(id, name, email, birthDate, team_id, specialities)
        await studentData.create_newStudent(studentStats)



        resp.status(200).send("Um(a) novo(a) estudante foi criado(a)!")
    } catch (error: any) {
        resp.status(errorCode).send( error.message || error.sqlMessage )
    }
}

