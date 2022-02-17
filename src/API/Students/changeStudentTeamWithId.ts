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

        // const studentData = new StudentDataBase() 

        // const idParamsOK: any = await studentData.get_studentsId

        // if(!idParamsOK[0].length){

        // }
        // const idVerification = await connection.raw(`
        // SELECT id FROM labecommerce_purchases WHERE id = "${id}"
        // `)

        //     if(!idVerification[0].length){
        //         errorCode = 422
        //         throw new Error('este ID não existe')
        //     }

        const studentData = new StudentDataBase()
        await studentData.change_studentFromTeam(id, team_id)

        resp.status(200).send("Estudante alterado de turma!")
    } catch ( error: any) {
        resp.status(errorCode).send( error.message || error.sqlMessage )
    }
}