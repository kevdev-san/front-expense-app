
const API_URL = process.env.NEXT_PUBLIC_API_URL; //Aqui definimos la url de nuestro backend


//hacemos una funcion para registrar los usuarios, definimos el tipo que es un objeto que se llama data, el cual tendra atributos que son los que estaremos pidiendo y tipamos el tipo de dato que vamos a estar esperando, despues hacemos una peticion con fetch y la guardamos en la constante res, dentro del fetch pondremos la url que definimos en api url, mas lo que le sigue segun el nombre o la url que hayamos hecho en el back para registrar los usuarios y mediante un metodo post mandaremos los datos que el usuario ingrese para hacer el registro del usuario
export async function registerUser(data: {username: string; email: string; password: string;}){
    const res = await fetch (`${API_URL}/register/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al registrar el usuario");
    return res.json(); 
}


//creamos una funcion para que el usuario haga login mediante su contraseña y correo
export async function loginUser(data: { username: string; password: string }): Promise<{ access: string; refresh: string }> {
    const res = await fetch(`${API_URL}/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if(!res.ok) throw new Error("Error al iniciar sesión");
    return res.json();
}