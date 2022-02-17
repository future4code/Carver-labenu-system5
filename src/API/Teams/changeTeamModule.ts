import { Request, Response } from "express";
import { TeamDataBase } from "../../Data/TeamDataBase";

export const changeTeamModule = async (req: Request, resp: Response):Promise<void> => {
    let errorCode = 400
    try {
        const id: string = req.params.id
        const module: string = req.body.module

        if (module > "6"){
            errorCode = 422
            throw new Error('Este modulo não existe')
        }

        const teamData = new TeamDataBase()
        await teamData.chance_module(id, module)


        resp.status(200).send("Modulo da turma alterado")
    } catch ( error: any) {
        resp.status(errorCode).send( error.message || error.sqlMessage )
    }
}