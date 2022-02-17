import { connection } from "./connection";

const errorMesage = (error: any) => { error.sqlMessage || error.message }

const createTables = () => connection.raw(`
CREATE TABLE IF NOT EXISTS labesystem_team(
	id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    module ENUM('0', '1', '2', '3', '4', '5', '6') NOT NULL DEFAULT '0'
    );


CREATE TABLE IF NOT EXISTS labesystem_students(
	id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    birthDate DATE NOT NULL,
    team_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (team_id) REFERENCES labesystem_team(id)
    );
CREATE TABLE IF NOT EXISTS labesystem_Hobby(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
    );
CREATE TABLE IF NOT EXISTS labesystem_studentHobby(
    id VARCHAR(255) PRIMARY KEY,
    student_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES labesystem_students(id),
    hobby_id VARCHAR (255) NOT NULL,
    FOREIGN KEY (hobby_id) REFERENCES labesystem_Hobby(id)
    );


CREATE TABLE IF NOT EXISTS labesystem_teachers(
	id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    birthDate DATE NOT NULL,
    team_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (team_id) REFERENCES labesystem_team(id)
    );
CREATE TABLE IF NOT EXISTS labesystem_Speciality(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
    );
CREATE TABLE IF NOT EXISTS labesystem_teacherSpeciality(
    id VARCHAR(255) PRIMARY KEY,
    teacher_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES labesystem_teachers(id),
    speciality_id VARCHAR (255) NOT NULL,
    FOREIGN KEY (speciality_id) REFERENCES labesystem_Speciality(id)
    );
`)
.then(() => console.log("Tabelas Criadas com sucesso!"))
.catch(errorMesage)


const closeConnection = () => { connection.destroy() }

createTables()
    .then()
    .finally(closeConnection)