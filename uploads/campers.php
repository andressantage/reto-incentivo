<?php
    header("Access-Control-Allow-Origin: *");
    require '../vendor/autoload.php';
    $router = new \Bramus\Router\Router();
    //el env es para las variables del sistema
    $dotenv = Dotenv\Dotenv::createImmutable("../")->load();
    //el archivo .env deve estar al mismo archivo que donde se pone la variable: $dotenv
    $router->get("/campers", function() {
        //echo $_ENV["HOST"];        
        $cox= new \App\connect();
        $res=$cox->con->prepare("SELECT * FROM campers");
        $res->execute();
        $res=$res->fetchAll(\PDO::FETCH_ASSOC);
        echo json_encode($res);
    });

    //INSERT INTO campers (nombreCamper,apellidoCamper,fechaNac,idReg) VALUES('Cesar','Santana','1990-03-25',1);
    $router->put('/campers', function() {
        $_DATA=json_decode(file_get_contents("php://input"),true);
        $cox= new \App\connect();
        $res=$cox->con->prepare("UPDATE campers SET nombreCamper = :NOMBRE, apellidoCamper= :APELLIDO, fechaNac=:FECHA, idReg=:REG WHERE idCamper=:CEDULA");
        $res->bindValue("NOMBRE",$_DATA["nombre"]);
        $res->bindValue("APELLIDO",$_DATA["apellido"]);
        $res->bindValue("FECHA",$_DATA["fecha"]);
        $res->bindValue("REG",$_DATA["region"]);
        $res->bindValue("CEDULA",$_DATA["id"]);
        $res->execute();
        $res=$res->rowCount();//es para obtener el número de filas afectadas por la actualización
        echo json_encode($res);
    });

    $router->delete("/campers", function(){
        $_DATA = json_decode(file_get_contents("php://input"), true);
        $cox = new \App\connect();
        $res = $cox->con->prepare("DELETE FROM campers WHERE idCamper = :ID"); 
        $res->bindValue("ID", $_DATA["id"]);
        $res->execute();
        $res = $res->rowCount();//es para obtener el número de filas afectadas por la actualización
        echo json_encode($res);
    });

   $router->post("/campers", function(){
        $_DATA = json_decode(file_get_contents("php://input"), true); 
        $cox = new \App\connect();
        $res = $cox->con->prepare("INSERT INTO campers (nombreCamper,apellidoCamper,fechaNac,idReg) VALUES(:NOMBRE,:APELLIDO,:FECHA,:REG)");

        $res->bindValue("NOMBRE",$_DATA["nombre"]);
        $res->bindValue("APELLIDO",$_DATA["apellido"]);
        $res->bindValue("FECHA",$_DATA["fecha"]);
        $res->bindValue("REG",$_DATA["region"]);
        
        $res->execute();
        $resi=$res->rowCount(); 
        echo json_encode($res);
    });

    $router->run();
?>