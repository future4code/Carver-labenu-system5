import { Request, Response } from "express";
import { StudentDataBase } from "../../Data/StudentsDataBase";
import { Student } from "../../Types/class_student";

export const createStudent = async (req: Request, resp: Response):Promise<void> => {
    let errorCode = 400
    try {
        const { name, email, birthDate, team_id, hobbies } = req.body

        const id = "StudentId" + Date.now().toString()

        if (!name || !email || !birthDate || !team_id){
            errorCode = 422
            throw new Error('Verifique se todos os campos pedidos foram preenchidos.')
        }

        if (hobbies === ""){
        const studentData = new StudentDataBase()
        const results: Hobbies[] = await studentData.get_Hobby(hobbies)

            if(results.length === 0){
                errorCode = 422
                throw new Error('Hobbie ainda não existe!')
            }

        resp.status(200).send(results[0])
        }

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

        
        const studentStats: Student = new Student(id, name, email, birthDate, team_id, hobbies)
        await studentData.create_newStudent(studentStats)



        resp.status(200).send("Um(a) novo(a) estudante foi criado(a)!")
    } catch (error: any) {
        resp.status(errorCode).send( error.message || error.sqlMessage )
    }
}

