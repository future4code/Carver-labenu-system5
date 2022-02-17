import { app } from "./app";

import { createStudent } from "./API/Students/createStudent";
import { getStudentByName } from "./API/Students/getStudentByName";
import { createTeacher } from "./API/Teachers/createTeacher";
import { getTeachers } from "./API/Teachers/getTeachers";
import { createTeam } from "./API/Teams/createTeam";
import { getActiveTeam } from "./API/Teams/getActiveTeam";
import { changeTeamModule } from "./API/Teams/changeTeamModule";
import { changeStudentTeamWithId } from "./API/Students/changeStudentTeamWithId";
import { changeTeacherTeamWithId } from "./API/Teachers/changeTeacherTeamWithId";

app.get('/turmas', getActiveTeam)
app.post('/turmas', createTeam)
app.put('/turmas/:id', changeTeamModule)

app.get('/estudantes/:nome', getStudentByName)
app.post('/estudantes', createStudent)
app.put('/estudantes/:id', changeStudentTeamWithId)

app.get('/docentes', getTeachers)
app.post('/docentes', createTeacher)
app.put('/docentes/:id', changeTeacherTeamWithId)