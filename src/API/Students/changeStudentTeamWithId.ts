import { Request, Response } from "express";
import { StudentDataBase } from "../../Data/StudentsDataBase";
import { Student } from "../../Types/class_student";



export const changeStudentTeamWithId = async (req: Request, resp: Response):Promise<void> => {
    let errorCode = 400
    try {
        const id: string = req.params.id
        const team_id: string = req.body.team_id

        if (!team_id){
            throw new Error('Você não informou nenhum ID no body.')
        }
        const studentData = new StudentDataBase()
        await studentData.change_studentFromTeam(id, team_id)

        resp.status(200).send("Estudante alterado de turma!")
    } catch ( error: any) {
        resp.status(errorCode).send( error.message || error.sqlMessage )
    }
}