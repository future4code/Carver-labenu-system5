import { Hobby } from "../Types/class_hobby";
import { StudentHobby } from "../Types/class_studentHobby";
import { ConnectionData } from "./ConnectionData";

export class HobbyDataBase extends ConnectionData {

      async get_hobbiesByName(name: string): Promise<Hobby[]>{
        const [results]: [any][] = await ConnectionData.connection.raw(`
            SELECT id, name FROM labesystem_Hobby WHERE name LIKE "${name}";
        `)
    
        return results.map(v => new Hobby(v.id, v.name))
      }

      async create_newHobby(name: string): Promise<void>{
        const hobby_id = (): string => {
            return ("HobbyId" + Date.now().toString())
        }
        const id = hobby_id()
        return ConnectionData.connection.raw(`
            INSERT INTO labesystem_Hobby (id, name)
            VALUES
                ("${id}", "${name}");
        `)
      }  

      async insert_newHobby(hobby: StudentHobby){
        
      await ConnectionData.connection.raw(`
          INSERT INTO labesystem_studentHobby (id, student_id, hobby_id)
          VALUES
              ("${hobby.get_id()}", "${hobby.get_student_id()}", "${hobby.get_hobby_id()}");
      `)
    }

  

}