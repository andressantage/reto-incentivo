addEventListener("DOMContenedLoaded",async(e)=>{
    let res = await ( await fetch("http://localhost:4001/usuarios",config)).json();
})