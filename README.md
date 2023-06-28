#RETO INCENTIVO

## Description del script SQL y sus correcpciones
La tabla pais parece tener un error ya que el nombre del pais esta definido como un valor entero 
/* CREATE TABLE pais(
    idPais int NOT NULL AUTO_INCREMENT,
    nombrePais int NOT NULL,
    CONSTRAINT pk_pais PRIMARY KEY (idPais)
); */

La tabla campers tiene una llave primaria como varchar
/* CREATE TABLE campers(
    idCamper varchar(20) NOT NULL,
    nombreCamper varchar(50) NOT NULL,
    apellidoCamper varchar(50) NOT NULL,
    fechaNac date NOT NULL,
    idReg int,
    CONSTRAINT pk_campers PRIMARY KEY (idCamper),
    CONSTRAINT fk_RegCampers FOREIGN KEY (idReg) REFERENCES region (idReg)
); */
