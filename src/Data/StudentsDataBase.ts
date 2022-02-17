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

        const hobbies = student.get_Hobby()

        const hobby_id = (): string => {
            return ("HobbyId" + Date.now().toString())
        }

        const studentHobby_id = (): string => {
            return ("StudentHobbyId" + Date.now().toString())
        }

        for (let hobby of hobbies) {

            await ConnectionData.connection.raw(`
                INSERT INTO labesystem_Hobby (id, name)
                VALUES
                    ("${hobby_id()}", "${hobby}");
            `)

            await ConnectionData.connection.raw(`
                INSERT INTO labesystem_studentHobby (id, student_id, hobby_id)
                VALUES
                    ("${studentHobby_id()}", "${student.get_id()}", "${hobby_id()}");
            `)
        }
    }

    async get_studentByName(name: string): Promise<Student[]>{
        const results: Student[] = await ConnectionData.connection.raw(`
            SELECT * FROM labesystem_students WHERE name LIKE "%${name}%";
        `)
        return results
    }

    async get_studentsId():Promise<any>{
        const results: Student[] = await ConnectionData.connection.raw(`
            SELECT id FROM labesystem_students;
        `)
        return results
    }

    async change_studentFromTeam(id: string, team_id: string){
        await ConnectionData.connection.raw(`
            UPDATE labesystem_students SET team_id = "${team_id}" WHERE id = "${id}";
        `)
    }

    async get_hobbies(Hobbies: string[]): Promise<Student[]>{
        const results: Student[] = await ConnectionData.connection.raw(`
            SELECT * FROM labesystem_studentHobby WHERE Hobbies LIKE "%${Hobbies}%";
        `)
        return results
    }

}