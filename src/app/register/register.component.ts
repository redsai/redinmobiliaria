import { Component, OnInit, Directive, Output, Input, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { Validators, FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Departmens, Cities, Barrios } from '../models/cities_departmens.model';
import { CitiesDepartmensService } from '../services/cities-departmens.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[CitiesDepartmensService]
})
export class RegisterComponent implements OnInit {
  public cities: Cities[];
  
  data = this.dataDvc.getCities();
  errorMessage = "";
  natural: Boolean = false;
  juridica: Boolean = false;
  public keyword = 'name';
  correoElec: Boolean = true;

  myForm =  this.formBuilder.group({
    nombres: [null, [
      Validators.required
    ]],
    apellidos: [null, [
      Validators.required
    ]],
    celular: [null, [
      Validators.required
    ]],
    fechaNacimiento: [null, [
      Validators.required
    ]],
    sexo: [null, [
      Validators.required
    ]],
    email: [null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    ]],
    password: [null, 
      [Validators.required, 
      Validators.minLength(6)
    ]],
    foto: [null, [
      Validators.required
    ]],
    cedula: [null, [
      Validators.required
    ]],
    Ciudad: [null, [
      Validators.required
    ]],
    PerfilFacebook: [null, [
      Validators.required
    ]],
    NombreEmpresa: [null],
    NitEmpresa: [null],
    inmobiliarioIndep: [null, [
      Validators.required
    ]],
    aniosInmobiliario: [null, [
      Validators.required
    ]],
    tarjetaPresntacion: [null],
    brochureEmpresarial: [null]
  });

  constructor(private authService: AuthService,
    private dataDvc: CitiesDepartmensService,
     private formBuilder: FormBuilder) {}

    @Output() onFileDropped = new EventEmitter<any>();
	
    @HostBinding('style.background-color') private background = '#f5fcff'
    @HostBinding('style.opacity') private opacity = '1'
    
    //Dragover listener
    @HostListener('dragover', ['$event']) onDragOver(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.background = '#9ecbec';
      this.opacity = '0.8'
    }
    
    //Dragleave listener
    @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.background = '#f5fcff'
      this.opacity = '1'
    }
    
    //Drop listener
    @HostListener('drop', ['$event']) public ondrop(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.background = '#f5fcff'
      this.opacity = '1'
      let files = evt.dataTransfer.files;
      if (files.length > 0) {
        this.onFileDropped.emit(files)
      }
    }
  
    files: any = [];
    file: File;
    uploadFile(event) {
      const element = event[0];
      this.files.push(element.name)
      this.file = event[0];
    }
    deleteAttachment(index) {
      this.files.splice(index, 1)
      this.file = null;
    }
  
    cedula: any = [];
    file2: File;
    uploadFileCedula(event) {
        const element = event[0];
        this.cedula.push(element.name)
        this.file2 = event[0];
    }
    deleteAttachmentCedula(index) {
      this.cedula.splice(index, 1);
      this.file2 = null;

    }

    tarjetaPresntacion: any = [];
    file3: File;
    uploadFileTarjetaPresenta(event) {
        const element = event[0];
        this.tarjetaPresntacion.push(element.name)
        this.file3 = event[0];
    }
    deleteAttachmentTarjetaPresenta(index) {
      this.tarjetaPresntacion.splice(index, 1)
      this.file3 = null;
    }
    brochureEmpresarial: any = [];
    file4: File;
    uploadFileBrochureEmpresarial(event) {
        const element = event[0];
        this.brochureEmpresarial.push(element.name)
        this.file4 = event[0];
    }
    deleteAttachmentBrochureEmpresarial(index) {
      this.brochureEmpresarial.splice(index, 1)
      this.file4 = null;
    }
  
  ngOnInit() {
     }

  btnNatural(){
    this.natural = true;
    this.juridica = false;
  }
  btnJuridica(){
    this.juridica = true;
    this.natural = false;
  }

  onSubmit() {
    if (this.myForm.valid) {
      const { nombres, apellidos,celular, fechaNacimiento, sexo, email, password, Ciudad, PerfilFacebook,  
        NombreEmpresa, NitEmpresa, inmobiliarioIndep, aniosInmobiliario } = this.myForm.value;
      const user = new User(email, password, nombres, apellidos, celular, fechaNacimiento, sexo, this.file, this.file2, Ciudad, PerfilFacebook,
        NombreEmpresa, NitEmpresa, inmobiliarioIndep, aniosInmobiliario, this.file3, this.file4 );
      this.authService.signup(user)
      .subscribe(
        res => {
          Swal.fire({
            icon: 'success',
            title: 'Acabas de inscribirte en RedSai una ves procedamos con la verificación de tu identidad podrás acceder a nuestra plataforma.',
            showConfirmButton: false,
            timer: 3500
          }),
          window.location.reload(),
          this.authService.handleError;
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'El correo electronico ya está en uso.',
            showConfirmButton: false,
            timer: 2500
          }),
          this.correoElec = false;
          this.errorMessage = error;
        }
      );       
    }
  }
}