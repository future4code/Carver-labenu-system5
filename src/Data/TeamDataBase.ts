import { Team } from "../Types/class_team";
import { ConnectionData } from "./ConnectionData";

export class TeamDataBase extends ConnectionData {

    async create_newTeam(team: Team){
        await ConnectionData.connection.raw(`
            INSERT INTO labesystem_team (id, name, module)
            VALUES
                ("${team.get_id}", "${team.get_name}", "${team.get_module}");
        `)
    }

    async get_activeTeams(): Promise<Team[]> {
        const results: Team[] = await ConnectionData.connection.raw(`
            SELECT * FROM labesystem_team WHERE module > "0";
        `)
        return results
    }

    async chance_module(id: string, module: string){
        await ConnectionData.connection.raw(`
            UPDATE labesystem_team SET module = "${module}" WHERE id = "${id}";
        `)
    }
}