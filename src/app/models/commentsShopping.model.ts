import { User } from './user.model';
import { Shopping } from './shopping.model';

export class CommentShopping {
  constructor(
    public descripcion: string,
    public shopping: Shopping,
    public createdAt?: Date,
    public user?: User
  ) { }
}
