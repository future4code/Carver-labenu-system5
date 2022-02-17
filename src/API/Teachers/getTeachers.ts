import { Request, Response } from "express";
import { TeacherDataBase } from "../../Data/TeachersDataBase";
import { Teacher } from "../../Types/class_teacher";

export const getTeachers = async (req: Request, resp: Response):Promise<void> => {
    let errorCode = 400
    try {
        const teacherData = new TeacherDataBase()
        const results: Teacher[] = await teacherData.get_teachers()

        resp.status(200).send(results[0])
    } catch (error: any) {
        resp.status(errorCode).send( error.message || error.sqlMessage )
    }
}
