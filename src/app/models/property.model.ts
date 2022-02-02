import { Comment } from './comments.model';
import { User } from './user.model';
import { Departmens, Cities, Barrios } from './cities_departmens.model';
export class Property {
    _id?: string;
    NombreInmueble: string;
    DescripcionInmueble: string;
    Precio: string;
    TipoOferta: string;
    TipoInmueble: string;
    Departamento: Departmens;
    Ciudad: Cities;
    Barrio: Barrios;
    Banios?: string;
    Habitaciones?: string;
    Garaje?: string;
    Asensor?: string;
    Images?: FileList;
    Imagenes? : string;
    createdAt?: Date;
    user?: User;
    comment?: Comment[];
    
    constructor(
      NombreInmueble: string,
      DescripcionInmueble: string,
      Precio: string,
      TipoOferta: string,
      TipoInmueble: string,
      Departamento: Departmens,
      Ciudad: Cities,
      Barrio: Barrios,
      Banios?: string,
      Habitaciones?: string,
      Garaje?: string,
      Asensor?: string,
      Images?: FileList,
      Imagenes?: string,
      createdAt?: Date,
      user?: User
    ) {
      this._id = '1';
      this.NombreInmueble = NombreInmueble;
      this.DescripcionInmueble = DescripcionInmueble;
      this.Precio = Precio;
      this.TipoOferta = TipoOferta;
      this.TipoInmueble = TipoInmueble;
      this.Departamento = Departamento;
      this.Ciudad = Ciudad;
      this.Barrio = Barrio;
      this.Banios = Banios;
      this.Habitaciones = Habitaciones;
      this.Garaje = Garaje;
      this.Asensor = Asensor;
      this.Images = Images;
      this.Imagenes = Imagenes;
      this.createdAt = createdAt;
      this.user = user;
      this.comment = [];
     }

  }