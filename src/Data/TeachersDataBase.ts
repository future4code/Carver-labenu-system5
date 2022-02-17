import { Teacher } from "../Types/class_teacher";
import { ConnectionData } from "./ConnectionData";

export class TeacherDataBase extends ConnectionData {

    async create_newTeacher(teacher: Teacher){
        await ConnectionData.connection.raw(`
            INSERT INTO labesystem_teachers (id, name, email, birthDate, team_id)
            VALUES
                ("${teacher.get_id()}", "${teacher.get_name()}", "${teacher.get_email()}", 
                "${teacher.get_birthDate()}", "${teacher.get_teamId()}");
        `)

        const specialities = teacher.get_Speciality()

        const speciality_id = (): string => {
            return ("SpecialityId" + Date.now().toString())
        }

        const teacherSpeciality_id = (): string => {
            return ("TeacherSpecialityId" + Date.now().toString())
        }

        for (let speciality of specialities) {

            await ConnectionData.connection.raw(`
                INSERT INTO labesystem_Speciality (id, name)
                VALUES
                    ("${speciality_id()}", "${speciality}");
            `)

            await ConnectionData.connection.raw(`
                INSERT INTO labesystem_teacherSpeciality (id, student_id, hobby_id)
                VALUES
                    ("${teacherSpeciality_id()}", "${teacher.get_id()}", "${speciality_id()}");
            `)
        }
    }

    async get_teachers(): Promise<Teacher[]>{
        const results: Teacher[] = await ConnectionData.connection.raw(`
            SELECT * FROM labesystem_teachers;
        `)
        return results
    }

    async change_teacherFromTeam(id: string, team_id: string){
        await ConnectionData.connection.raw(`
            UPDATE labesystem_teachers SET team_id = "${team_id}" WHERE id = "${id}";
        `)
    }

}