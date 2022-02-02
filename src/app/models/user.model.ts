import { Cities} from './cities_departmens.model';
export class User {
  _id?: string;
  public email: string;
  public password: string;
  public nombres?: string;
  public apellidos?: string;
  public celular?: string;
  public fechaNacimiento?: string;      
  public sexo?: string;
  public foto?: File;
  public cedula?: File;
  public Ciudad?: Cities;
  public PerfilFacebook?: string;
  public NombreEmpresa?: string;
  public NitEmpresa?: string;
  public inmobiliarioIndep?: string;
  public aniosInmobiliario?: string;
  public tarjetaPresntacion?: File;
  public brochureEmpresarial?: File;
    constructor(
      email: string,
      password: string,
      nombres?: string,
      apellidos?: string,
      celular?: string,
      fechaNacimiento?: string,      
      sexo?: string,
      foto?: File,
      cedula?: File,
      Ciudad?: Cities,
      PerfilFacebook?: string,
      NombreEmpresa?: string,
      NitEmpresa?: string,
      inmobiliarioIndep?: string,
      aniosInmobiliario?: string,
      tarjetaPresntacion?: File,
      brochureEmpresarial?: File,
      _id?: string
    ) {
      this.email = email,
      this.password =  password,
      this.nombres = nombres,
      this.apellidos = apellidos,
      this.celular = celular,
      this.fechaNacimiento = fechaNacimiento,      
      this.sexo = sexo,
      this.foto = foto,
      this.cedula = cedula,
      this.Ciudad = Ciudad,
      this.PerfilFacebook = PerfilFacebook,
      this.NombreEmpresa =  NombreEmpresa,
      this.NitEmpresa = NitEmpresa,
      this.inmobiliarioIndep = inmobiliarioIndep,
      this.aniosInmobiliario = aniosInmobiliario,
      this.tarjetaPresntacion = tarjetaPresntacion,
      this.brochureEmpresarial = brochureEmpresarial
     }

    fullName() {
      return `${this.nombres} ${this.apellidos}`;
    }
  }