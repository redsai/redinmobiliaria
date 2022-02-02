import { Component, OnInit, Output, Input, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { UploadFilesService } from '../services/upload-files.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Departmens, Cities, Barrios } from '../models/cities_departmens.model';
import { CitiesDepartmensService } from '../services/cities-departmens.service';
import { Property } from '../models/property.model';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  providers:[CitiesDepartmensService]
})

export class UploadFileComponent implements OnInit {
  myForm: FormGroup;
  public selectDepartmens: Departmens = { id: 0, name: ''};
  public departmens: Departmens[];
  public cities: Cities[];
  public barrios: Barrios[];
  archivo: File;
  
  message = '';
  public data = [];
  public data2 = [];
  fileInfos: Observable<any>;
  images = [];
  public keyword = 'name';
  files: any = [];
  data1 = this.dataDvc.getDepartmens();

  constructor(private uploadService: UploadFilesService,
              private dataDvc: CitiesDepartmensService,
              private router: Router,
              private authService: AuthService) { }

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
  // tslint:disable-next-line: typedef
  selectEvent(event): void{
   this.cities = this.dataDvc.getCities().filter(item => item.DepartmensId = event.id);
   //console.log('id->', this.cities);
   // tslint:disable-next-line: align
   this.data = this.cities;
  }
  selectEventBarrios(event): void{
    this.barrios = this.dataDvc.getBarrios().filter(item => item.CitiesId = event.id);
    //console.log('id->', this.cities);
    // tslint:disable-next-line: align
    this.data2 = this.barrios;
   }   

   files2: FileList;
   uploadFile(event) {
     for (let index = 0; index < event.length; index++) {
       const element = event[index];
       this.files.push(element.name)
       this.files2 = event;
     }      
   }
   deleteAttachment(index) {
     this.files.splice(index, 1)
   }

  selectFiles(event) {
    this.files = event.target.files;
    let isImage = true;
    console.log('archivo-> '+this.archivo)
    //console.log('file-> '+files)
    
  }
/*
  // tslint:disable-next-line: typedef
  uploadFiles() {
    this.message = '';
    for (let i = 0; i < this.files.length; i++) {
      this.upload(i, this.files[i]);
    }    
  }

  // tslint:disable-next-line: typedef
  upload(idx, file) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    this.files = file;
    this.uploadService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progressInfos[idx].percentage = 0;
        this.message = 'No se pudo cargar el archivo:' + file.name;
      });
  }
  */
  format(input){
    var num = input.value.replace(/\./g,'');
    if(!isNaN(num)){
      num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
      num = num.split('').reverse().join('').replace(/^[\.]/,'');
      input.value = num;
    }else{ 
      alert('Solo se permiten numeros');
      input.value = input.value.replace(/[^\d\.]*/g,'');
    }
  }

  ngOnInit(): void {
    this.departmens = this.dataDvc.getDepartmens();
    this.cities = this.dataDvc.getCities();

    //this.fileInfos = this.uploadService.getFiles();
    this.myForm = new FormGroup({      
      NombreInmueble: new FormControl(null, Validators.required),
      DescripcionInmueble: new FormControl(null, Validators.required),
      Precio: new FormControl(null, Validators.required),
      TipoOferta: new FormControl(null, Validators.required),
      TipoInmueble: new FormControl(null, Validators.required),
      Departamento: new FormControl(null, Validators.required),
      Ciudad: new FormControl(null, Validators.required),
      Barrio: new FormControl(null, Validators.required),
      Banios: new FormControl(null),
      Habitaciones: new FormControl(null),
      Garaje: new FormControl(null),
      Asensor: new FormControl(null),
      file: new FormControl(null),
    });
  }

  onSubmit() {       
    if (this.myForm.valid) {
      const { NombreInmueble, DescripcionInmueble, Precio, TipoOferta, TipoInmueble, Departamento,
         Ciudad, Barrio, Banios, Habitaciones, Garaje, Asensor
        } = this.myForm.value;
      const property = new Property(NombreInmueble, DescripcionInmueble, Precio, TipoOferta, TipoInmueble,
         Departamento, Ciudad, Barrio, Banios, Habitaciones, Garaje, Asensor, this.files2
      );
      console.log(JSON.stringify(this.files2));
      console.log('files22-> '+ this.files2)
      this.uploadService.property(property)
        .subscribe(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Tu propiedad ha sido guardada',
              showConfirmButton: false,
              timer: 1500
            }),
            window.location.reload(),
            this.authService.handleError;
          }
        );
    }
  }
}