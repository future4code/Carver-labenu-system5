import { Request, Response } from "express";
import { ConnectionData } from "../../Data/ConnectionData";
import { StudentDataBase } from "../../Data/StudentsDataBase";
import { HobbyDataBase } from "../../Data/HobbyDataBase";
import { Student } from "../../Types/class_student";
import { Hobby } from "../../Types/class_hobby";

export const createStudent = async (req: Request, resp: Response):Promise<void> => {
    let errorCode = 400
    try {
        const { name, email, birthDate, team_id, hobbies } = req.body

        if (!name || !email || !birthDate || !team_id){
            errorCode = 422
            throw new Error('Verifique se todos os campos pedidos foram preenchidos.')
        }

        if (hobbies.length === 0){
            throw new Error('O campo hobbies precisa ser preenchido.')
        }else {
            const hobbyDataBase = new HobbyDataBase()
            
            for (let n = 0; n < hobbies.length; n++) {
                const results: Hobby[] = await hobbyDataBase.get_hobbyByName(hobbies[n])
                console.log(results)
                if(results.length === 0){
                    errorCode = 422
                    throw new Error('Hobbie ainda não existe!')
                }

            }
         
        }

        // const StudentId = (): string => {
        //     return ("StudentId" + Date.now().toString())
        // }

        // if(!StudentId === ""){
            
        // }

        // const Verification = async(): string =>  {
        //     const results: Hobby[] = await hobbyDataBase.get_hobbyByName(hobbies[n])

        //     const idVerification: string = await ConnectionData.connection.raw(`
        //         SELECT id WHERE id LIKE "%${StudentId()}%" FROM labesystem_Hobby;
        //         `)
                
        //         if(!idVerification){
        //             let errorCode = 422
        //             throw new Error('Hobbie já existe!')
        //         }
        //         return idVerification
        // }



    


        
        const studentData = new StudentDataBase()
        const studentStats: Student = new Student(id, name, email, birthDate, team_id, hobbies)
        await studentData.create_newStudent(studentStats)



        resp.status(200).send("Um(a) novo(a) estudante foi criado(a)!")
    } catch (error: any) {
        resp.status(errorCode).send( error.message || error.sqlMessage )
    }
}

