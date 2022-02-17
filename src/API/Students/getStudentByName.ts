import { Request, Response } from "express";
import { StudentDataBase } from "../../Data/StudentsDataBase";
import { Student } from "../../Types/class_student";

export const getStudentByName = async (req: Request, resp: Response):Promise<void> => {
    let errorCode = 400
    try {
        const name: string = req.params.nome

        const studentData = new StudentDataBase()
        const results: Student[] = await studentData.get_studentByName(name)

        if(results.length === 0){
            errorCode = 404
            throw new Error('Estudante não encontrado!')
        }

        resp.status(200).send(results[0])
    } catch (error: any) {
        resp.status(errorCode).send( error.message || error.sqlMessage )
    }
}
