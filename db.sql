SHOW DATABASES; 
DROP DATABASE campuslands;
SHOW DATABASES;
CREATE DATABASE campuslands;
SHOW DATABASES;

USE campuslands;

--la tabla pais parece tener un error ya que el nombre del pais esta definido como un valor entero 
CREATE TABLE pais(
    idPais int NOT NULL AUTO_INCREMENT,
    nombrePais int NOT NULL,
    CONSTRAINT pk_pais PRIMARY KEY (idPais)
);
--CORREGIDO
--la tabla pais le cambie el tipo de dato a VARCHAR(50) debido a que es el nombre de un pais y este deberia ser un string
CREATE TABLE pais(
    idPais int NOT NULL AUTO_INCREMENT,
    nombrePais varchar(50) NOT NULL,
    CONSTRAINT pk_pais PRIMARY KEY (idPais)
);

CREATE TABLE departamento(
    idDep int NOT NULL AUTO_INCREMENT,
    nombreDep varchar(50) NOT NULL,
    idPais int,
    CONSTRAINT pk_departamento PRIMARY KEY (idDep),
    CONSTRAINT fk_PaisDep FOREIGN KEY (idPais) REFERENCES pais(idPais)
);

CREATE TABLE region(
    idReg int NOT NULL AUTO_INCREMENT,
    nombreReg varchar(60) NOT NULL,
    idDep int,
    CONSTRAINT pk_region PRIMARY KEY (idReg),
    CONSTRAINT fk_DepRegion FOREIGN KEY (idDep) REFERENCES departamento (idDep)
);
    
-- la tabla campers tiene una llave primaria como varchar
CREATE TABLE campers(
    idCamper varchar(20) NOT NULL,
    nombreCamper varchar(50) NOT NULL,
    apellidoCamper varchar(50) NOT NULL,
    fechaNac date NOT NULL,
    idReg int,
    CONSTRAINT pk_campers PRIMARY KEY (idCamper),
    CONSTRAINT fk_RegCampers FOREIGN KEY (idReg) REFERENCES region (idReg)
);
--CORREGIDO:
-- cambie de la tabla campers la columna idCamper como INT y con autoincremento para buenas practicas, ademas por ser llave primaria
CREATE TABLE campers(
    idCamper int NOT NULL AUTO_INCREMENT,
    nombreCamper varchar(50) NOT NULL,
    apellidoCamper varchar(50) NOT NULL,
    fechaNac date NOT NULL,
    idReg int,
    CONSTRAINT pk_campers PRIMARY KEY (idCamper),
    CONSTRAINT fk_RegCampers FOREIGN KEY (idReg) REFERENCES region (idReg)
);

SHOW TABLES;