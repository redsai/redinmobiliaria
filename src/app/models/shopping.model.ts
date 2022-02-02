import { User } from './user.model';
import { CommentShopping } from './commentsShopping.model';
import { Departmens, Cities, Barrios } from './cities_departmens.model';
export class Shopping {
  _id?: string;
  NombreInmueble: string;
  DescripcionInmueble: string;
  Departamento: Departmens;
  Ciudad: Cities;
  Barrio: Barrios;
  createdAt?: Date;
  user?: User;
  comment: CommentShopping[];
    constructor(
      NombreInmueble: string,
      DescripcionInmueble: string,
      Departamento: Departmens,
      Ciudad: Cities,
      Barrio: Barrios,
      createdAt?: Date,
      user?: User,
    ) {
      this._id = '1';
      this.NombreInmueble = NombreInmueble;
      this.DescripcionInmueble = DescripcionInmueble;
      this.Departamento = Departamento;
      this.Ciudad = Ciudad;
      this.Barrio = Barrio;
      this.createdAt = createdAt;
      this.user = user;
      this.comment = [];
    }

  }