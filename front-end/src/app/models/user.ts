export class User {
    constructor(_id = '', nombre = '', email = '', password = '', estado = false, telefono ='', rol = 'USER', terms = false, norms = false){
        this._id = _id;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.estado = estado;
        this.telefono = telefono;
        this.rol = rol;
        this.terms = terms;
        this.norms = norms;
    }
    _id: string;
    nombre: string;
    email: string;
    password: string;
    estado: boolean;
    telefono: string;
    rol: string;
    terms : boolean;
    norms : boolean;
}
