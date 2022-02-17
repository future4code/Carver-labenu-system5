import { Request, Response } from "express";
import { TeamDataBase } from "../../Data/TeamDataBase";
import { Team } from "../../Types/class_team";

export const createTeam = async (req: Request, resp: Response):Promise<any> => {
    let errorCode = 400
    try {
        const { name, module } = req.body

        const id = "TeamId" + Date.now().toString()

        if (!name || !module){
            errorCode = 422
            throw new Error('Verifique se todos os campos pedidos foram preenchidos.')
        }

        const teamData = new TeamDataBase()
        const teamStats: Team = new Team(id, name, module)
        await teamData.create_newTeam(teamStats)



        resp.status(200).send("Nova turma criada com sucesso!")
    } catch (error: any) {
        resp.status(errorCode).send( error.message || error.sqlMessage )
    }
}

