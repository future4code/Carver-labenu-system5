import { Hobby } from "../Types/class_hobby";
import { StudentHobby } from "../Types/class_studentHobby";
import { ConnectionData } from "./ConnectionData";

export class HobbyDataBase extends ConnectionData {

      async get_hobbyByName(name: string): Promise<Hobby[]>{
        const results: Hobby[] = await ConnectionData.connection.raw(`
            SELECT id WHERE name LIKE "%${name}%" FROM labesystem_Hobby;
        `)
        return results
      }

      async create_newHobby(hobby: Hobby){
          const hobby_id = (): string => {
            return ("HobbyId" + Date.now().toString())
        }
        await ConnectionData.connection.raw(`
            INSERT INTO labesystem_Hobby (id, name)
            VALUES
                ("${hobby_id}", "${hobby.get_name()}");
        `)
      }  

      async insert_newHobby(hobby: StudentHobby){
        const studenthobby_id = (): string => {
          return ("HobbyId" + Date.now().toString())
      }
      await ConnectionData.connection.raw(`
          INSERT INTO labesystem_studentHobby (id, student_id, hobby_id)
          VALUES
              ("${studenthobby_id}", "${hobby.get_student_id()}", "${hobby.get_hobby_id()}");
      `)
    }

  

}