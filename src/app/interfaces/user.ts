export class User {
    _id?: string;
    nombre: string;
    apellidos: string;
    correo? : string;
    contrasena? : string;
    token?: string;

    constructor(nombre: string = "", apellidos: string = "", correo:string = "", contrasena:string = "",) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.contrasena = contrasena;
    }
    
}
