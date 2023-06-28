let myForm = document.querySelector("#myForm");
myForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    console.log(data);
    //postUser(data)
})

let myForm1 = document.querySelector("#myForm1");
myForm1.addEventListener("submit", (e)=>{
    e.preventDefault();
    let data1 = Object.fromEntries(new FormData(e.target));
    putUser(data1)
})

let config = {
    headers:new Headers({
        "Content-Type": "application/json"//espera que el API o servidor le devuelva un JSON // es para decirle que la informacion que le va a mandar es json
    }), 
};

let idModificar=0
const getUserAll = async()=>{
    config.method = "GET";//para designar el metodo que se ejecutara
    let resultado = await ( await fetch("http://localhost/ApolT01-033/reto-incentivo/uploads/campers",config)).json();//await es para esperar que algo suceda
    let contenido=document.getElementById("contenido")
    console.log(resultado);
    let plantilla=""
    let lista_ext=[]
    let region=[0,'Bucaramanga','Bogota']
    //nombreCamper,apellidoCamper,fechaNac,idReg
    resultado.forEach(element => {
        lista_ext.push(element.id)
        plantilla+=`<tr>
        <th scope="row">${element.idCamper}</th>
        <td>${element.nombreCamper}</td>
        <td>${element.apellidoCamper}</td>
        <td>${element.fechaNac}</td>
        <td>${region[element.idReg]}</td>
        <td>
            <button class="action-icon btn btn-light a1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 action-icon1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
            </button>
            <button class="action-icon btn btn-light b1" data-posicion="1" data-toggle="modal" data-target="#exampleModal2" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                    </svg>
            </button>
        </td>
        </tr>`
    });
    contenido.insertAdjacentHTML("beforeend",plantilla)
    let b = document.querySelectorAll(".b1");
    console.log(b);

    b.forEach((boton, posicion) => {
    boton.addEventListener('click', (event) => {
        const botonClicado = event.target;
        let nombrePUT=document.getElementById("nombrePUT")
        let celularPUT=document.getElementById("celularPUT")
        idModificar=resultado[posicion].id
        nombrePUT.value=resultado[posicion].nombre
        celularPUT.value=resultado[posicion].celular
        });
    });

    let a = document.querySelectorAll(".a1");
    console.log(a);
    a.forEach((boton1, posicion1) => {
        boton1.addEventListener('click', (event) => {
            const botonClicado1 = event.target;
            deleteUser(lista_ext[posicion1].toString())
        });
    });
}
const postUser = async(data)=>{
    config.method = "POST";
    config.body = JSON.stringify(data);// JSON.stringify(data) es para converitr un objeto literal en json, en este caso le pone ese json en config.body
    let resPOST = await ( await fetch("http://localhost/ApolT01-033/reto-incentivo/uploads/campers",config)).json();
    //console.log(resPOST);//para que aparezca en la consola
    //location.reload(true);
}
const putUser = async(data1)=>{
    config.method = "PUT";
    config.body = JSON.stringify(data1);
    let res = await ( await fetch(`http://localhost/ApolT01-033/reto-incentivo/uploads/campers/${idModificar}`,config)).json();
    console.log(res);
    location.reload(true);
}
const deleteUser = async(id) => {
    config.method = "DELETE";
    const response = await fetch(`http://localhost/ApolT01-033/reto-incentivo/uploads/campers`, config);
    const data = await response.json();
    //location.reload(true);
};
getUserAll()
