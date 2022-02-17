import { Request, Response } from "express";
import { TeacherDataBase } from "../../Data/TeachersDataBase";


export const changeTeacherTeamWithId = async (req: Request, resp: Response):Promise<void> => {
    let errorCode = 400
    try {
        const id: string = req.params.id
        const team_id: string = req.body.team_id

        if (!team_id){
            throw new Error('Você não informou nenhum ID no body.')
        }

        const teacherData = new TeacherDataBase()
        await teacherData.change_teacherFromTeam(id, team_id)

        resp.status(200).send("Professor(a) alterado(a) de turma!")
    } catch ( error: any) {
        resp.status(errorCode).send( error.message || error.sqlMessage )
    }
}