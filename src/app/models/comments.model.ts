import { Property } from './property.model';
import { User } from './user.model';

export class Comment {
  constructor(
    public descripcion: string,
    public property: Property,
    public createdAt?: Date,
    public user?: User
  ) { }
}
