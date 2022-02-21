import { Student } from "../Types/class_student";
import { ConnectionData } from "./ConnectionData";

export class StudentDataBase extends ConnectionData {

    async create_newStudent(student: Student){
            await ConnectionData.connection.raw(`
            INSERT INTO labesystem_students (id, name, email, birthDate, team_id)
            VALUES
                ("${student.get_id()}", "${student.get_name()}", "${student.get_email()}", 
                 "${student.get_birthDate()}", "${student.get_teamId()}");
        `)

    }

    async get_studentByName(name: string): Promise<Student[]>{
        const results: Student[] = await ConnectionData.connection.raw(`
            SELECT * FROM labesystem_students WHERE name LIKE "%${name}%";
        `)
        return results
    }


    async change_studentFromTeam(id: string, team_id: string){
        await ConnectionData.connection.raw(`
            UPDATE labesystem_students SET team_id = "${team_id}" WHERE id = "${id}";
        `)
    }

    async get_studentAnHobbiesById(id: string): Promise<Student[]>{
        const results: Student[] = await ConnectionData.connection.raw(`
            SELECT * FROM labesystem_students st WHERE st.id = "${id}";
            
        `)
        return results
    }

}