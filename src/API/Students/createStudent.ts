import { Request, Response } from "express";
import { ConnectionData } from "../../Data/ConnectionData";
import { StudentDataBase } from "../../Data/StudentsDataBase";
import { HobbyDataBase } from "../../Data/HobbyDataBase";
import { Student } from "../../Types/class_student";
import { StudentHobby } from "../../Types/class_studentHobby";
import { Hobby } from "../../Types/class_hobby";

export const createStudent = async (req: Request, resp: Response):Promise<void> => {
    let errorCode = 400
    try {
        const { name, email, birthDate, team_id, hobbies } = req.body

        if (!name || !email || !team_id){
            errorCode = 422
            throw new Error('Verifique se todos os campos pedidos foram preenchidos.')
        }

        if (birthDate != "0000-00-00"){
            errorCode = 422
            throw new Error('O formato deve ser YYYY-MM-DD.')
        }


        if (hobbies.length === 0){
            throw new Error('O campo hobbies precisa ser preenchido.')
        }

        const studentData = new StudentDataBase()
        const genId = (): string => {
            return "StudentId" + Date.now().toString()
        }
        const studentId = genId()
        
        console.log('studentId', studentId)
        const studentStats: Student = new Student(studentId, name, email, birthDate, team_id)
        await studentData.create_newStudent(studentStats)

        async function relateStudentHobby(studentId: string, hobbyId: string) {
            const studenthobby_id = () => {
                return "HobbyId" + Date.now().toString()
            }
            const studentHobby = new StudentHobby(studenthobby_id(), studentId, hobbyId)
            await hobbyDataBase.insert_newHobby(studentHobby)
        }
      
        const hobbyDataBase = new HobbyDataBase()             
        for (let n = 0; n < hobbies.length; n++) {
            const hobbyName = hobbies[n]
            const hobbiesFinded: Hobby[] = await hobbyDataBase.get_hobbiesByName(hobbyName)

            if(hobbiesFinded.length > 0){
                await relateStudentHobby(studentId, hobbiesFinded[0].get_id())
            } else {
                await hobbyDataBase.create_newHobby(hobbyName)
                const [hobby]: Hobby[] = await hobbyDataBase.get_hobbiesByName(hobbyName)
                const hobby_id = hobby.get_id()
                await relateStudentHobby(studentId, hobby_id)
            }
        }

        //Inner join 
        //const student = await studentData.get_studentAnHobbiesById(studentId)

        resp.status(200).send("Um(a) novo(a) estudante foi criado(a)!")
    } catch (error: any) {
        resp.status(errorCode).send( error.message || error.sqlMessage )
    }
}

