import { Request, Response } from "express";
import { TeacherDataBase } from "../../Data/TeachersDataBase";
import { Teacher } from "../../Types/class_teacher";

export const createTeacher = async (req: Request, resp: Response):Promise<void> => {
    let errorCode = 400
    try {
        const { name, email, birthDate, team_id, specialities } = req.body

        const id = "TeacherId" + Date.now().toString()

        if (!name || !email || !birthDate || !team_id || !specialities){
            errorCode = 422
            throw new Error('Verifique se todos os campos pedidos foram preenchidos.')
        }

        const teacherData = new TeacherDataBase()
        const teacherStats: Teacher = new Teacher(id, name, email, birthDate, team_id, specialities)
        await teacherData.create_newTeacher(teacherStats)



        resp.status(200).send("Um(a) novo(a) professor(a) foi criado(a)!")
    } catch (error: any) {
        resp.status(errorCode).send( error.message || error.sqlMessage )
    }
}

