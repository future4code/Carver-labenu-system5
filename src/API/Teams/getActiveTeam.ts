import { Request, Response } from "express";
import { TeamDataBase } from "../../Data/TeamDataBase";
import { Team } from "../../Types/class_team";

export const getActiveTeam = async (req: Request, resp: Response):Promise<any> => {

    let errorCode = 400
    try {
        const teamData = new TeamDataBase()
        const results: Team[] = await teamData.get_activeTeams()

        resp.status(200).send(results[0])
    } catch (error: any) {
        resp.status(errorCode).send( error.message || error.sqlMessage )
    }
}